import { expect, it } from 'vitest'
import { mount } from './form-helpers'

it('keeps the default neutral and applies a custom primary to outlined buttons', async () => {
	const markup = '<div style="--accent-primary: rgb(20, 180, 200)"><z-button kind="plain">Cancel</z-button><z-button kind="outline" tone="primary">Outline</z-button></div>'
	const wrapper = await mount(markup)
	const buttons = wrapper.querySelectorAll('z-button')
	const neutralButton = buttons[0].shadowRoot!.querySelector('button')!
	const primaryButton = buttons[1].shadowRoot!.querySelector('button')!
	const neutralColor = getComputedStyle(neutralButton).color
	const primaryStyle = getComputedStyle(primaryButton)
	expect(neutralColor).not.toBe('rgb(20, 180, 200)')
	expect(primaryStyle.color).toBe('rgb(20, 180, 200)')
	expect(primaryStyle.borderColor).toBe('rgb(20, 180, 200)')
	wrapper.remove()
})
