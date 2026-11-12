import { expect, it } from 'vitest'
import { mount } from './form-helpers'

it('uses neutral by default and applies explicit tones', async () => {
	const wrapper = await mount('<div style="--accent-primary: rgb(20, 180, 200); --status-danger: rgb(200, 30, 40)"><z-toggle-button>Default</z-toggle-button><z-toggle-button tone="primary">Primary</z-toggle-button><z-toggle-button tone="danger">Danger</z-toggle-button></div>')
	const buttons = wrapper.querySelectorAll('z-toggle-button')
	const neutralButton = buttons[0].shadowRoot!.querySelector('button')!
	const primaryButton = buttons[1].shadowRoot!.querySelector('button')!
	const dangerButton = buttons[2].shadowRoot!.querySelector('button')!
	expect(getComputedStyle(neutralButton).borderColor).not.toBe(getComputedStyle(primaryButton).borderColor)
	expect(getComputedStyle(primaryButton).color).toBe('rgb(20, 180, 200)')
	expect(getComputedStyle(dangerButton).color).toBe('rgb(200, 30, 40)')
	expect(getComputedStyle(neutralButton.querySelector('.label')!).transform).not.toBe('none')
	wrapper.remove()
})
