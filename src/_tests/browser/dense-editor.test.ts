import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import '../../tokens.css'
import { mount, settle } from './form-helpers'
import { expectNoA11yViolations } from './a11y-helpers'

/*
 * Primitives for dense editor UI: icon-only buttons, the xs control height,
 * and the "dense region" recipe (scoped control-height tokens). Checked
 * against real layout in Chromium.
 */

afterEach(() => {
	document.body.replaceChildren()
})

const innerButtonBox = (host: Element): DOMRect => {
	return host.shadowRoot!.querySelector('button')!.getBoundingClientRect()
}

describe('<z-button is-icon>', () => {
	it.each(['xs', 'sm', 'md', 'lg'])('is square at size="%s"', async (size) => {
		const svg = '<svg aria-hidden="true" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"></circle></svg>'
		const wrapper = await mount(`<z-button is-icon size="${size}" aria-label="Undo">${svg}</z-button>`)
		const box = innerButtonBox(wrapper.querySelector('z-button')!)
		expect(box.width).toBeGreaterThan(0)
		expect(Math.round(box.width)).toBe(Math.round(box.height))
	})

	it('takes its accessible name from aria-label', async () => {
		const wrapper = await mount('<z-button is-icon aria-label="Go to start"><svg aria-hidden="true"></svg></z-button>')
		const button = wrapper.querySelector('z-button')!.shadowRoot!.querySelector('button')!
		expect(button.getAttribute('aria-label')).toBe('Go to start')
	})

	it('xs reads --control-height-xs', async () => {
		const wrapper = await mount('<z-button size="xs">Small</z-button>')
		const box = innerButtonBox(wrapper.querySelector('z-button')!)
		expect(Math.round(box.height)).toBe(28)
	})
})

describe('dense region', () => {
	it('scoped control-height tokens resize every Zest control inside', async () => {
		const markup = `
			<div data-zest-scope style="--control-height-sm: 1.75rem; --control-height-md: 1.875rem">
				<z-button size="sm">Small</z-button>
				<z-button>Medium</z-button>
			</div>`
		const wrapper = await mount(markup)
		await settle()
		const [small, medium] = [...wrapper.querySelectorAll('z-button')]
		expect(Math.round(innerButtonBox(small).height)).toBe(28)
		expect(Math.round(innerButtonBox(medium).height)).toBe(30)
	})
})

const ROOTS = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B']

const rootPickerMarkup = (attributes = 'columns="6"', disabledValue = ''): string => {
	const items = ROOTS.map((root) => {
		const disabled = root === disabledValue ? ' is-disabled' : ''
		return `<z-toggle-button-group-item value="${root}"${disabled}>${root}</z-toggle-button-group-item>`
	}).join('')
	return `<button id="before">Before</button><z-toggle-button-group aria-label="Root" ${attributes}>${items}</z-toggle-button-group><button id="after">After</button>`
}

const focusedItemValue = (): string | undefined => {
	const active = document.activeElement as (HTMLElement & { value?: string }) | null
	return active?.localName === 'z-toggle-button-group-item' ? active.value : undefined
}

describe('<z-toggle-button-group columns>', () => {
	it('lays items out in rows of `columns`', async () => {
		const wrapper = await mount(rootPickerMarkup())
		const items = [...wrapper.querySelectorAll<HTMLElement>('z-toggle-button-group-item')]
		const rowTops = new Set(items.map((item) => Math.round(item.getBoundingClientRect().top)))
		const firstRowCount = items.filter((item) => Math.round(item.getBoundingClientRect().top) === Math.round(items[0].getBoundingClientRect().top)).length
		expect(rowTops.size).toBe(2)
		expect(firstRowCount).toBe(6)
	})

	it('is one tab stop, landing on the pressed item', async () => {
		const wrapper = await mount(rootPickerMarkup())
		const items = [...wrapper.querySelectorAll<HTMLElement & { isPressed?: boolean }>('z-toggle-button-group-item')]
		items[3].isPressed = true
		await settle(wrapper)
		wrapper.querySelector<HTMLButtonElement>('#before')!.focus()
		await userEvent.keyboard('{Tab}')
		expect(focusedItemValue()).toBe('E♭')
		await userEvent.keyboard('{Tab}')
		expect(document.activeElement?.id).toBe('after')
	})

	it('arrow keys move in two dimensions, wrapping across rows', async () => {
		await mount(rootPickerMarkup())
		document.querySelector<HTMLButtonElement>('#before')!.focus()
		await userEvent.keyboard('{Tab}')
		expect(focusedItemValue()).toBe('C')
		await userEvent.keyboard('{ArrowDown}')
		expect(focusedItemValue()).toBe('F♯')
		await userEvent.keyboard('{ArrowLeft}')
		expect(focusedItemValue()).toBe('F')
		await userEvent.keyboard('{ArrowRight}{ArrowRight}')
		expect(focusedItemValue()).toBe('G')
		await userEvent.keyboard('{ArrowUp}')
		expect(focusedItemValue()).toBe('C♯')
		await userEvent.keyboard('{ArrowUp}')
		expect(focusedItemValue()).toBe('C♯')
		await userEvent.keyboard('{End}')
		expect(focusedItemValue()).toBe('B')
		await userEvent.keyboard('{ArrowRight}')
		expect(focusedItemValue()).toBe('C')
		await userEvent.keyboard('{Home}')
		expect(focusedItemValue()).toBe('C')
	})

	it('skips disabled items', async () => {
		await mount(rootPickerMarkup('columns="6"', 'C♯'))
		document.querySelector<HTMLButtonElement>('#before')!.focus()
		await userEvent.keyboard('{Tab}{ArrowRight}')
		expect(focusedItemValue()).toBe('D')
	})

	it('arrows move focus without pressing; Space presses', async () => {
		const wrapper = await mount(rootPickerMarkup())
		const group = wrapper.querySelector<HTMLElement>('z-toggle-button-group')!
		const values: unknown[] = []
		group.addEventListener('change', (changeEvent) => values.push((changeEvent as CustomEvent).detail.value))
		document.querySelector<HTMLButtonElement>('#before')!.focus()
		await userEvent.keyboard('{Tab}{ArrowRight}')
		expect(values).toEqual([])
		await userEvent.keyboard(' ')
		await settle(wrapper)
		expect(values).toEqual(['C♯'])
	})

	it('warns when columns and is-vertical are both set', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		await mount(rootPickerMarkup('columns="6" is-vertical'))
		const conflictWarnings = warn.mock.calls.filter((call) => String(call[0]).includes('columns and is-vertical'))
		expect(conflictWarnings).toHaveLength(1)
		warn.mockRestore()
	})
})

describe('<z-toggle-button-group> single line', () => {
	it('→ / ← move along the line and Tab leaves the group', async () => {
		await mount(rootPickerMarkup(''))
		document.querySelector<HTMLButtonElement>('#before')!.focus()
		await userEvent.keyboard('{Tab}{ArrowRight}{ArrowRight}')
		expect(focusedItemValue()).toBe('D')
		await userEvent.keyboard('{ArrowLeft}')
		expect(focusedItemValue()).toBe('C♯')
		await userEvent.keyboard('{Tab}')
		expect(document.activeElement?.id).toBe('after')
	})
})

const foldMenuMarkup = `
	<z-menu align="end">
		<z-button slot="trigger">Fold</z-button>
		<z-menu-label>Fold rows</z-menu-label>
		<z-menu-item value="off" kind="radio" is-checked description="Show every pitch">Off</z-menu-item>
		<z-menu-item value="notes" kind="radio" description="Only rows with notes">Notes</z-menu-item>
		<z-menu-item value="scale" kind="radio" is-disabled description="Pick a key first">In key</z-menu-item>
		<z-menu-separator></z-menu-separator>
		<z-menu-item value="reset">Reset view</z-menu-item>
	</z-menu>`

const openMenu = async (wrapper: HTMLElement): Promise<ShadowRoot> => {
	const trigger = wrapper.querySelector('z-button')!.shadowRoot!.querySelector('button')!
	trigger.focus()
	await userEvent.keyboard('{ArrowDown}')
	await settle(wrapper)
	return wrapper.querySelector('z-menu')!.shadowRoot!
}

const deepActiveText = (): string => {
	let active: Element | null = document.activeElement
	while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement
	const slot = active?.querySelector<HTMLSlotElement>('.label slot')
	const slottedText = slot?.assignedNodes({ flatten: true }).map((node) => node.textContent).join('').trim()
	return slottedText || active?.querySelector('.label')?.textContent?.trim() || ''
}

describe('<z-menu> choice rows', () => {
	it('renders radio rows with aria-checked and a check on the checked one', async () => {
		const wrapper = await mount(foldMenuMarkup)
		const root = await openMenu(wrapper)
		const radios = [...root.querySelectorAll('[role="menuitemradio"]')]
		expect(radios).toHaveLength(3)
		expect(radios.map((radio) => radio.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false'])
		expect(radios[0].querySelector('.check svg')).not.toBeNull()
		expect(radios[1].querySelector('.check svg')).toBeNull()
		expect(root.querySelector('[role="menuitem"]')).not.toBeNull()
	})

	it('describes a row with its description line', async () => {
		const wrapper = await mount(foldMenuMarkup)
		const root = await openMenu(wrapper)
		const notes = root.querySelectorAll('[role="menuitemradio"]')[1]
		const describedById = notes.getAttribute('aria-describedby')!
		expect(root.getElementById(describedById)?.textContent).toBe('Only rows with notes')
	})

	it('groups rows under a z-menu-label heading', async () => {
		const wrapper = await mount(foldMenuMarkup)
		const root = await openMenu(wrapper)
		const group = root.querySelector('[role="group"]')!
		const heading = root.getElementById(group.getAttribute('aria-labelledby')!)
		expect(heading?.textContent).toBe('Fold rows')
		expect(group.querySelectorAll('[role="menuitemradio"]')).toHaveLength(3)
		await expectNoA11yViolations(wrapper)
	})

	it('keyboard skips the heading and disabled rows; Enter reports the pick', async () => {
		const wrapper = await mount(foldMenuMarkup)
		const menu = wrapper.querySelector('z-menu')!
		const picks: string[] = []
		menu.addEventListener('select', (selectEvent) => picks.push((selectEvent as CustomEvent).detail.value))
		await openMenu(wrapper)
		expect(deepActiveText()).toBe('Off')
		await userEvent.keyboard('{ArrowDown}')
		await settle(wrapper)
		expect(deepActiveText()).toBe('Notes')
		await userEvent.keyboard('{ArrowDown}')
		await settle(wrapper)
		expect(deepActiveText()).toBe('Reset view')
		await userEvent.keyboard('{ArrowUp}{Enter}')
		await new Promise((resolve) => setTimeout(resolve, 400))
		await settle(wrapper)
		expect(picks).toEqual(['notes'])
	})

	it('never flips is-checked itself: the app owns it', async () => {
		const wrapper = await mount(foldMenuMarkup)
		await openMenu(wrapper)
		await userEvent.keyboard('{ArrowDown}{Enter}')
		await new Promise((resolve) => setTimeout(resolve, 400))
		await settle(wrapper)
		const notesItem = wrapper.querySelector('z-menu-item[value="notes"]')!
		expect(notesItem.hasAttribute('is-checked')).toBe(false)
	})

	it('warns when is-checked is set on an action row', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		await mount('<z-menu><z-button slot="trigger">Menu</z-button><z-menu-item value="a" is-checked>A</z-menu-item></z-menu>')
		await settle()
		const checkedWarnings = warn.mock.calls.filter((call) => String(call[0]).includes('is-checked but kind is not radio or checkbox'))
		expect(checkedWarnings).toHaveLength(1)
		warn.mockRestore()
	})
})

describe('<z-context-menu> choice rows', () => {
	it('shares the same row roles and description', async () => {
		const markup = `
			<z-context-menu>
				<div id="target" style="width: 120px; height: 60px">Right-click</div>
				<z-menu-item value="grid" kind="checkbox" is-checked description="Show grid lines">Grid</z-menu-item>
			</z-context-menu>`
		const wrapper = await mount(markup)
		const target = wrapper.querySelector<HTMLElement>('#target')!
		const box = target.getBoundingClientRect()
		target.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, composed: true, cancelable: true, clientX: box.left + 10, clientY: box.top + 10 }))
		await settle(wrapper)
		const root = wrapper.querySelector('z-context-menu')!.shadowRoot!
		const row = root.querySelector('[role="menuitemcheckbox"]')!
		expect(row.getAttribute('aria-checked')).toBe('true')
		expect(root.getElementById(row.getAttribute('aria-describedby')!)?.textContent).toBe('Show grid lines')
	})
})

const soundOptions = [
	{ value: 'midi', label: 'MIDI output' },
	{ value: 'keys', label: 'Keys', isGroup: true, children: [
		{ value: 'grand-piano', label: 'Grand Piano' },
		{ value: 'organ', label: 'Organ' }
	] },
	{ value: 'bass', label: 'Bass', isGroup: true, children: [
		{ value: 'sub-bass', label: 'Sub Bass' },
		{ value: '808', label: '808' }
	] }
]

type SelectHostT = HTMLElement & { options?: unknown[]; value?: string }

const mountSoundSelect = async (): Promise<{ wrapper: HTMLElement; host: SelectHostT; trigger: HTMLButtonElement }> => {
	const wrapper = await mount('<z-select aria-label="Sound" value="grand-piano"></z-select>')
	const host = wrapper.querySelector<SelectHostT>('z-select')!
	host.options = soundOptions
	await settle(wrapper)
	const trigger = host.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!
	return { wrapper, host, trigger }
}

const activeOptionText = (host: HTMLElement): string => {
	const trigger = host.shadowRoot!.querySelector('.trigger')!
	const activeId = trigger.getAttribute('aria-activedescendant')
	return activeId ? host.shadowRoot!.getElementById(activeId)?.textContent?.trim() ?? '' : ''
}

describe('<z-select> headed groups', () => {
	it('shows group children inline under a heading, in a labelled group', async () => {
		const { wrapper, host, trigger } = await mountSoundSelect()
		trigger.focus()
		await userEvent.keyboard('{Enter}')
		await settle(wrapper)
		const root = host.shadowRoot!
		const groups = [...root.querySelectorAll('#select-options > [role="group"]')]
		expect(groups).toHaveLength(2)
		const keysHeading = root.getElementById(groups[0].getAttribute('aria-labelledby')!)
		expect(keysHeading?.textContent).toBe('Keys')
		expect(groups[0].querySelectorAll('[role="option"]')).toHaveLength(2)
		expect(root.querySelectorAll('.submenu')).toHaveLength(0)
		await expectNoA11yViolations(wrapper)
	})

	it('arrow keys walk straight across group boundaries, skipping headings', async () => {
		const { wrapper, host, trigger } = await mountSoundSelect()
		trigger.focus()
		await userEvent.keyboard('{Enter}')
		await settle(wrapper)
		expect(activeOptionText(host)).toBe('Grand Piano')
		await userEvent.keyboard('{ArrowDown}')
		await settle(wrapper)
		expect(activeOptionText(host)).toBe('Organ')
		await userEvent.keyboard('{ArrowDown}')
		await settle(wrapper)
		expect(activeOptionText(host)).toBe('Sub Bass')
		await userEvent.keyboard('{Home}')
		await settle(wrapper)
		expect(activeOptionText(host)).toBe('MIDI output')
	})

	it('typeahead reaches into a group, and picking reports a path without the group', async () => {
		const { wrapper, host, trigger } = await mountSoundSelect()
		const changes: Array<{ value: string; path: string[] }> = []
		host.addEventListener('change', (changeEvent) => changes.push((changeEvent as CustomEvent).detail))
		trigger.focus()
		await userEvent.keyboard('{Enter}')
		await settle(wrapper)
		await userEvent.keyboard('s')
		await settle(wrapper)
		expect(activeOptionText(host)).toBe('Sub Bass')
		await userEvent.keyboard('{Enter}')
		await settle(wrapper)
		expect(host.value).toBe('sub-bass')
		expect(changes.at(-1)).toEqual({ value: 'sub-bass', path: ['sub-bass'] })
	})
})

describe('<z-number-input> affix slots', () => {
	const tempoMarkup = '<z-number-input is-borderless is-inline min="20" max="300" value="120" aria-label="Tempo in BPM"><span slot="suffix">BPM</span></z-number-input>'

	it('keeps the suffix visible while focused and out of the value', async () => {
		const wrapper = await mount(`<form>${tempoMarkup.replace('<z-number-input ', '<z-number-input name="tempo" ')}</form>`)
		const host = wrapper.querySelector<HTMLElement & { value?: number }>('z-number-input')!
		const input = host.shadowRoot!.querySelector('input')!
		const suffix = host.shadowRoot!.querySelector<HTMLElement>('.adornment.is-suffix')!
		expect(suffix.getBoundingClientRect().width).toBeGreaterThan(0)
		input.focus()
		await settle(wrapper)
		expect(suffix.getBoundingClientRect().width).toBeGreaterThan(0)
		expect(input.value).toBe('120')
		expect(host.value).toBe(120)
		expect(new FormData(wrapper.querySelector('form')!).get('tempo')).toBe('120')
	})

	it('is not part of the accessible name', async () => {
		const wrapper = await mount(tempoMarkup)
		const input = wrapper.querySelector('z-number-input')!.shadowRoot!.querySelector('input')!
		expect(input.getAttribute('aria-label')).toBe('Tempo in BPM')
		expect(input.getAttribute('aria-valuetext')).toBeNull()
		await expectNoA11yViolations(wrapper)
	})

	it('hides an empty adornment box', async () => {
		const wrapper = await mount('<z-number-input value="4" aria-label="Count"></z-number-input>')
		const prefix = wrapper.querySelector('z-number-input')!.shadowRoot!.querySelector<HTMLElement>('.adornment.is-prefix')!
		expect(prefix.getBoundingClientRect().width).toBe(0)
	})

	it('warns when value-suffix and a suffix slot are both set', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		await mount('<z-number-input value="4" value-suffix=" BPM" aria-label="Tempo"><span slot="suffix">BPM</span></z-number-input>')
		await settle()
		const doubleWarnings = warn.mock.calls.filter((call) => String(call[0]).includes('value-suffix and a suffix slot'))
		expect(doubleWarnings).toHaveLength(1)
		warn.mockRestore()
	})
})
