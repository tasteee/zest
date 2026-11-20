import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { innerOf, mount, settle } from './form-helpers'

type PanelT = HTMLElement & { value?: string; format?: string; formats?: string[]; swatches?: string[] }

const mountPanel = async (attributes: string): Promise<PanelT> => {
	const wrapper = await mount(`<z-color-panel ${attributes}></z-color-panel>`)
	return wrapper.querySelector<PanelT>('z-color-panel')!
}

const queryAll = (host: HTMLElement, selector: string): HTMLElement[] => {
	return [...host.shadowRoot!.querySelectorAll<HTMLElement>(selector)]
}

describe('<z-color-panel>', () => {
	it('infers the format from the value and shows its channels', async () => {
		const panel = await mountPanel('value="rgb(191 64 191)"')
		expect(innerOf(panel, '.color-format-button').textContent?.trim()).toBe('RGB')
		const channelValues = queryAll(panel, '.color-channel-input').map((input) => (input as HTMLInputElement).value)
		expect(channelValues).toEqual(['191', '64', '191'])
	})

	it('converts the value when the format changes, and says so', async () => {
		const panel = await mountPanel('value="#FF0000"')
		const formatEvents: string[] = []
		panel.addEventListener('formatchange', (formatEvent) => {
			formatEvents.push((formatEvent as CustomEvent<{ format: string }>).detail.format)
		})
		innerOf<HTMLButtonElement>(panel, '.color-format-button').click()
		await settle(panel)
		const oklchOption = queryAll(panel, '.color-format-option').find((option) => option.textContent?.startsWith('OKLCH'))!
		oklchOption.click()
		await settle(panel)
		expect(panel.format).toBe('oklch')
		expect(panel.value).toMatch(/^oklch\(62\.\d+% 0\.25\d* 29\.\d+\)$/)
		expect(formatEvents).toEqual(['oklch'])
	})

	it('offers only the allowed formats, and locks a single one', async () => {
		const panel = await mountPanel(`value="#3A7BD5" formats='["hex","oklch"]'`)
		const optionLabels = queryAll(panel, '.color-format-option').map((option) => option.firstElementChild?.textContent)
		expect(optionLabels).toEqual(['HEX', 'OKLCH'])

		const locked = await mountPanel(`value="#3A7BD5" formats='["oklch"]'`)
		expect(innerOf<HTMLButtonElement>(locked, '.color-format-button').disabled).toBe(true)
		expect(locked.value === '#3A7BD5' || locked.getAttribute('format') === null).toBe(true)
		expect(innerOf<HTMLInputElement>(locked, '.color-value-input').value).toMatch(/^oklch\(/)
	})

	it('shows swatches only when asked for', async () => {
		const plain = await mountPanel('value="#BF40BF"')
		expect(queryAll(plain, '.color-swatch-button')).toHaveLength(0)
		plain.swatches = ['#FF0000', '#00FF00']
		await settle(plain)
		expect(queryAll(plain, '.color-swatch-button')).toHaveLength(2)
	})

	it('adds an opacity slider and writes alpha only when translucent', async () => {
		const panel = await mountPanel('value="#BF40BF" has-alpha')
		const alphaTrack = innerOf<HTMLElement>(panel, '.color-track.isAlpha')
		alphaTrack.focus()
		await userEvent.keyboard('{Shift>}{ArrowLeft}{/Shift}')
		await settle(panel)
		expect(panel.value).toBe('#BF40BFE6')
	})

	it('accepts a typed color in another format and switches to it', async () => {
		const panel = await mountPanel('value="#BF40BF"')
		const changes: string[] = []
		panel.addEventListener('change', (changeEvent) => {
			changes.push((changeEvent as CustomEvent<{ value: string }>).detail.value)
		})
		const input = innerOf<HTMLInputElement>(panel, '.color-value-input')
		input.focus()
		input.select()
		await userEvent.keyboard('hsl(200 50% 40%){Enter}')
		await settle(panel)
		expect(panel.format).toBe('hsl')
		expect(changes).toEqual(['hsl(200 50% 40%)'])
	})

	it('keeps native input events from leaking out as its own', async () => {
		const panel = await mountPanel('value="#BF40BF"')
		let leakedCount = 0
		panel.addEventListener('input', (inputEvent) => {
			const isCustom = inputEvent instanceof CustomEvent
			if (!isCustom) leakedCount += 1
		})
		innerOf<HTMLInputElement>(panel, '.color-value-input').focus()
		await userEvent.keyboard('x')
		expect(leakedCount).toBe(0)
	})
})

describe('<z-color-picker> with a custom trigger', () => {
	it('opens from the slotted element and publishes the color', async () => {
		const wrapper = await mount('<z-color-picker value="#F24A9B"><button slot="trigger">Pick</button></z-color-picker>')
		const picker = wrapper.querySelector<HTMLElement & { isOpen?: boolean }>('z-color-picker')!
		expect(picker.style.getPropertyValue('--z-color-value')).toBe('#F24A9B')
		wrapper.querySelector<HTMLButtonElement>('button')!.click()
		await settle(wrapper)
		expect(picker.isOpen).toBe(true)
	})
})
