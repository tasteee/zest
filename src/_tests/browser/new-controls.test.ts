import { afterEach, describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { deepActiveElement, entriesOf, innerOf, mount, mountForm, settle, trySubmit } from './form-helpers'

/*
 * Behaviour of the fieldset, checkbox group, chip family, rating, meter,
 * stepper, timeline, image and image cropper. Keys and clicks go through
 * Playwright, so what is asserted is what a person would get.
 */

type HostT = HTMLElement & Record<string, any>

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

const waitUntil = async (check: () => boolean): Promise<void> => {
	const deadline = performance.now() + 2000
	for (const _attempt of Array.from({ length: 200 })) {
		const isDone = check() || performance.now() > deadline
		if (isDone) return
		await nextFrame()
	}
}

const recordEvents = (target: EventTarget, type: string): CustomEvent[] => {
	const events: CustomEvent[] = []
	target.addEventListener(type, (event) => events.push(event as CustomEvent))
	return events
}

// A 400 × 200 image as a data URL, so the cropper needs no network.
const buildTestImage = (): string => {
	const canvas = document.createElement('canvas')
	canvas.width = 400
	canvas.height = 200
	const context = canvas.getContext('2d') as CanvasRenderingContext2D
	context.fillStyle = '#c0603c'
	context.fillRect(0, 0, 400, 200)
	return canvas.toDataURL('image/png')
}

afterEach(() => {
	document.body.replaceChildren()
})

describe('<z-fieldset>', () => {
	it('disables every control inside and restores only the ones it disabled', async () => {
		const wrapper = await mount(`
			<z-fieldset legend="Address">
				<z-input label="Street"></z-input>
				<z-input label="City" is-disabled></z-input>
				<button type="button">Native</button>
			</z-fieldset>
		`)
		const fieldset = wrapper.querySelector('z-fieldset') as HostT
		const inputs = wrapper.querySelectorAll<HostT>('z-input')
		const nativeButton = wrapper.querySelector('button') as HTMLButtonElement

		fieldset.isDisabled = true
		await settle(wrapper)
		expect(inputs[0].isDisabled).toBe(true)
		expect(nativeButton.disabled).toBe(true)

		fieldset.isDisabled = false
		await settle(wrapper)
		expect(inputs[0].isDisabled).toBe(false)
		expect(inputs[1].isDisabled).toBe(true)
		expect(nativeButton.disabled).toBe(false)
	})

	it('is a group named by its legend', async () => {
		const wrapper = await mount('<z-fieldset legend="Shipping"><z-input label="Street"></z-input></z-fieldset>')
		const fieldset = wrapper.querySelector('z-fieldset') as HostT
		expect(fieldset.getAttribute('role')).toBe('group')
		expect(fieldset.getAttribute('aria-label')).toBe('Shipping')
	})
})

describe('<z-checkbox-group>', () => {
	const boxes = `
		<z-checkbox value="a" is-checked>A</z-checkbox>
		<z-checkbox value="b">B</z-checkbox>
		<z-checkbox value="c">C</z-checkbox>
	`

	it('adopts the seeded children and submits one entry per checked value', async () => {
		const form = await mountForm(`<z-checkbox-group name="pick">${boxes}</z-checkbox-group>`)
		const group = form.querySelector('z-checkbox-group') as HostT
		expect(group.value).toEqual(['a'])
		expect(entriesOf(form)).toEqual([['pick', 'a']])
	})

	it('checks the children when value is set', async () => {
		const form = await mountForm(`<z-checkbox-group name="pick">${boxes}</z-checkbox-group>`)
		const group = form.querySelector('z-checkbox-group') as HostT
		group.value = ['b', 'c']
		await settle(form)
		const checkedStates = [...form.querySelectorAll<HostT>('z-checkbox')].map((box) => box.isChecked)
		expect(checkedStates).toEqual([false, true, true])
		expect(entriesOf(form)).toEqual([['pick', 'b'], ['pick', 'c']])
	})

	it('fires one change with the whole value and stops the child change', async () => {
		const wrapper = await mount(`<z-checkbox-group label="Pick">${boxes}</z-checkbox-group>`)
		const group = wrapper.querySelector('z-checkbox-group') as HostT
		const outerEvents = recordEvents(wrapper, 'change')
		const second = wrapper.querySelectorAll<HostT>('z-checkbox')[1]
		innerOf(second, 'input').click()
		await settle(wrapper)
		expect(group.value).toEqual(['a', 'b'])
		expect(outerEvents).toHaveLength(1)
		expect(outerEvents[0].detail).toEqual({ value: ['a', 'b'] })
	})

	it('select-all checks every enabled child', async () => {
		const wrapper = await mount(`<z-checkbox-group label="Pick" has-select-all>${boxes}<z-checkbox value="d" is-disabled>D</z-checkbox></z-checkbox-group>`)
		const group = wrapper.querySelector('z-checkbox-group') as HostT
		const selectAll = group.shadowRoot?.querySelector('z-checkbox') as HostT
		expect(selectAll.isIndeterminate).toBe(true)
		innerOf(selectAll, 'input').click()
		await settle(wrapper)
		expect(group.value).toEqual(['a', 'b', 'c'])
	})

	it('blocks a submit past max', async () => {
		const form = await mountForm(`<z-checkbox-group name="pick" max="1">${boxes}</z-checkbox-group>`)
		const group = form.querySelector('z-checkbox-group') as HostT
		group.value = ['a', 'b']
		await settle(form)
		expect(trySubmit(form)).toBe(false)
		expect(group.validity.rangeOverflow).toBe(true)
	})
})

describe('<z-chip-group>', () => {
	const chips = `
		<z-chip value="a">A</z-chip>
		<z-chip value="b">B</z-chip>
		<z-chip value="c">C</z-chip>
	`

	it('keeps one chip selected in single mode', async () => {
		const form = await mountForm(`<z-chip-group name="pick">${chips}</z-chip-group>`)
		const group = form.querySelector('z-chip-group') as HostT
		const allChips = form.querySelectorAll<HostT>('z-chip')
		await userEvent.click(innerOf(allChips[0], '.main'))
		await userEvent.click(innerOf(allChips[2], '.main'))
		await settle(form)
		expect(group.value).toEqual(['c'])
		expect(allChips[0].isSelected).toBe(false)
		expect(entriesOf(form)).toEqual([['pick', 'c']])
	})

	it('keeps several selected with is-multiple', async () => {
		const wrapper = await mount(`<z-chip-group label="Pick" is-multiple>${chips}</z-chip-group>`)
		const group = wrapper.querySelector('z-chip-group') as HostT
		const allChips = wrapper.querySelectorAll<HostT>('z-chip')
		const changes = recordEvents(wrapper, 'change')
		await userEvent.click(innerOf(allChips[0], '.main'))
		await userEvent.click(innerOf(allChips[1], '.main'))
		await settle(wrapper)
		expect(group.value).toEqual(['a', 'b'])
		expect(changes.at(-1)?.detail).toEqual({ value: ['a', 'b'] })
	})

	it('moves focus with the arrow keys', async () => {
		const wrapper = await mount(`<z-chip-group label="Pick">${chips}</z-chip-group>`)
		const allChips = wrapper.querySelectorAll<HostT>('z-chip')
		allChips[0].focus()
		await userEvent.keyboard('{ArrowRight}')
		expect(allChips[1].matches(':focus-within')).toBe(true)
		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
		expect(allChips[2].matches(':focus-within')).toBe(true)
	})
})

describe('<z-chip>', () => {
	it('toggles and reports aria-pressed', async () => {
		const wrapper = await mount('<z-chip value="x">X</z-chip>')
		const chip = wrapper.querySelector('z-chip') as HostT
		const selects = recordEvents(chip, 'select')
		const main = innerOf<HTMLButtonElement>(chip, '.main')
		await userEvent.click(main)
		await settle(wrapper)
		expect(chip.isSelected).toBe(true)
		expect(main.getAttribute('aria-pressed')).toBe('true')
		expect(selects[0].detail).toEqual({ value: 'x', selected: true })
	})

	it('fires remove from the Delete key', async () => {
		const wrapper = await mount('<z-chip value="x" is-removable>X</z-chip>')
		const chip = wrapper.querySelector('z-chip') as HostT
		const removes = recordEvents(chip, 'remove')
		chip.focus()
		await userEvent.keyboard('{Delete}')
		expect(removes).toHaveLength(1)
	})
})

describe('<z-tag-input>', () => {
	it('adds tags on Enter and the delimiter, and ignores duplicates', async () => {
		const form = await mountForm('<z-tag-input name="tags" label="Tags"></z-tag-input>')
		const tagInput = form.querySelector('z-tag-input') as HostT
		innerOf(tagInput, 'input').focus()
		await userEvent.keyboard('design{Enter}code,design{Enter}')
		await settle(form)
		expect(tagInput.value).toEqual(['design', 'code'])
		expect(entriesOf(form)).toEqual([['tags', 'design'], ['tags', 'code']])
	})

	it('steps into the tags with Backspace and removes one', async () => {
		const wrapper = await mount(`<z-tag-input label="Tags" value='["a","b","c"]'></z-tag-input>`)
		const tagInput = wrapper.querySelector('z-tag-input') as HostT
		const removes = recordEvents(tagInput, 'remove')
		innerOf(tagInput, 'input').focus()
		await userEvent.keyboard('{Backspace}')
		expect(deepActiveElement()?.getAttribute('aria-label')).toBe('Remove c')
		await userEvent.keyboard('{Backspace}')
		await settle(wrapper)
		expect(tagInput.value).toEqual(['a', 'b'])
		expect(removes[0].detail).toEqual({ value: 'c', index: 2 })
	})

	it('stops at max', async () => {
		const wrapper = await mount('<z-tag-input label="Tags" max="2"></z-tag-input>')
		const tagInput = wrapper.querySelector('z-tag-input') as HostT
		innerOf(tagInput, 'input').focus()
		await userEvent.keyboard('a{Enter}b{Enter}c{Enter}')
		await settle(wrapper)
		expect(tagInput.value).toEqual(['a', 'b'])
	})

	it('adds what is left on blur', async () => {
		const wrapper = await mount('<z-tag-input label="Tags"></z-tag-input><button type="button">Next</button>')
		const tagInput = wrapper.querySelector('z-tag-input') as HostT
		innerOf(tagInput, 'input').focus()
		await userEvent.keyboard('pending')
		;(wrapper.querySelector('button') as HTMLButtonElement).focus()
		await settle(wrapper)
		expect(tagInput.value).toEqual(['pending'])
	})
})

describe('<z-rating>', () => {
	it('steps with the arrow keys and jumps with Home, End and digits', async () => {
		const form = await mountForm('<z-rating name="score" label="Quality" value="2"></z-rating>')
		const rating = form.querySelector('z-rating') as HostT
		const slider = innerOf(rating, '[role="slider"]')
		slider.focus()
		await userEvent.keyboard('{ArrowRight}')
		expect(rating.value).toBe(3)
		await userEvent.keyboard('{End}')
		expect(rating.value).toBe(5)
		await userEvent.keyboard('{Home}')
		expect(rating.value).toBe(0)
		await userEvent.keyboard('4')
		await settle(form)
		expect(rating.value).toBe(4)
		expect(slider.getAttribute('aria-valuetext')).toBe('4 of 5')
		expect(entriesOf(form)).toEqual([['score', '4']])
	})

	it('is an image with a spoken score when read-only', async () => {
		const wrapper = await mount('<z-rating value="3.7" is-readonly></z-rating>')
		const rating = wrapper.querySelector('z-rating') as HostT
		const display = innerOf(rating, '[role="img"]')
		expect(display.getAttribute('aria-label')).toBe('Rated 3.7 of 5')
	})
})

describe('<z-meter>', () => {
	const readTone = (meter: HostT): string | undefined => {
		const className = innerOf(meter, '.meter').className
		return className.split(' ').find((name) => name.startsWith('is-'))
	}

	it('takes its tone from low, high and optimum', async () => {
		const wrapper = await mount(`
			<z-meter label="A" value="10" low="70" high="90" optimum="0"></z-meter>
			<z-meter label="B" value="80" low="70" high="90" optimum="0"></z-meter>
			<z-meter label="C" value="95" low="70" high="90" optimum="0"></z-meter>
			<z-meter label="D" value="50"></z-meter>
		`)
		const meters = [...wrapper.querySelectorAll<HostT>('z-meter')]
		expect(meters.map(readTone)).toEqual(['is-success', 'is-warning', 'is-danger', 'is-primary'])
		expect(meters[1].getAttribute('role')).toBe('meter')
		expect(meters[1].getAttribute('aria-valuenow')).toBe('80')
	})
})

describe('<z-stepper>', () => {
	const steps = '<z-step label="One"></z-step><z-step label="Two"></z-step><z-step label="Three"></z-step>'

	it('gives each step its state and number', async () => {
		const wrapper = await mount(`<z-stepper value="1">${steps}</z-stepper>`)
		const allSteps = [...wrapper.querySelectorAll<HostT>('z-step')]
		expect(allSteps.map((step) => step.state)).toEqual(['complete', 'current', 'upcoming'])
		expect(allSteps.map((step) => step.index)).toEqual([1, 2, 3])
		expect(allSteps[1].getAttribute('aria-current')).toBe('step')
		expect(allSteps[2].isLast).toBe(true)
	})

	it('goes back to a completed step when navigable', async () => {
		const wrapper = await mount(`<z-stepper value="2" is-navigable>${steps}</z-stepper>`)
		const stepper = wrapper.querySelector('z-stepper') as HostT
		const changes = recordEvents(stepper, 'change')
		const firstStep = wrapper.querySelector('z-step') as HostT
		await userEvent.click(innerOf(firstStep, 'button'))
		await settle(wrapper)
		expect(stepper.value).toBe(0)
		expect(changes[0].detail).toEqual({ value: 0 })
	})
})

describe('<z-image>', () => {
	it('shows a named fallback when the file fails', async () => {
		const wrapper = await mount('<z-image src="/does-not-exist.png" alt="Team photo" ratio="1"></z-image>')
		const image = wrapper.querySelector('z-image') as HostT
		const errors = recordEvents(image, 'error')
		await waitUntil(() => Boolean(image.shadowRoot?.querySelector('.fallback')))
		const fallback = innerOf(image, '.fallback')
		expect(fallback.getAttribute('aria-label')).toBe('Team photo. Image unavailable')
		expect(errors.length).toBeLessThanOrEqual(1)
	})

	it('fades in once loaded', async () => {
		const wrapper = await mount(`<z-image src="${buildTestImage()}" alt="Block" ratio="2"></z-image>`)
		const image = wrapper.querySelector('z-image') as HostT
		await waitUntil(() => innerOf(image, '.frame').classList.contains('is-loaded'))
		expect(innerOf(image, '.frame').classList.contains('is-loaded')).toBe(true)
	})
})

describe('<z-image-cropper>', () => {
	const mountCropper = async (attributes: string): Promise<HostT> => {
		const wrapper = await mount(`<z-image-cropper src="${buildTestImage()}" alt="Block" ${attributes} style="width: 400px; --z-image-cropper-height: 248px"></z-image-cropper>`)
		const cropper = wrapper.querySelector('z-image-cropper') as HostT
		await waitUntil(() => cropper.getCrop?.() !== null && cropper.getCrop?.() !== undefined)
		await settle(wrapper)
		return cropper
	}

	it('frames the centre of the image at zoom 1', async () => {
		const cropper = await mountCropper('aspect="1"')
		const crop = cropper.getCrop()
		expect(crop.height).toBe(200)
		expect(crop.width).toBe(200)
		expect(crop.x).toBe(100)
		expect(crop.y).toBe(0)
	})

	it('pans with the arrow keys and never leaves the image', async () => {
		const cropper = await mountCropper('aspect="1"')
		const changes = recordEvents(cropper, 'change')
		innerOf(cropper, '.stage').focus()
		await userEvent.keyboard('{Shift>}{ArrowLeft}{ArrowLeft}{ArrowLeft}{ArrowLeft}{ArrowLeft}{/Shift}')
		await settle(cropper.parentElement as HTMLElement)
		expect(cropper.getCrop().x).toBe(0)
		expect(changes.at(-1)?.detail.x).toBe(0)
	})

	it('zooms from the keyboard and exports a canvas at the asked size', async () => {
		const cropper = await mountCropper('aspect="16/9"')
		innerOf(cropper, '.stage').focus()
		await userEvent.keyboard('++')
		await settle(cropper.parentElement as HTMLElement)
		expect(cropper.zoom).toBeCloseTo(1.2, 5)
		const canvas = cropper.toCanvas({ width: 320 }) as HTMLCanvasElement
		expect(canvas.width).toBe(320)
		expect(canvas.height).toBe(180)
		const blob = await cropper.toBlob('image/png')
		expect(blob?.type).toBe('image/png')
	})
})
