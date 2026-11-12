import { expect, it } from 'vitest'
import { mount } from './form-helpers'

it('exposes a named loading status', async () => {
	const wrapper = await mount('<z-spinner label="Loading projects"></z-spinner>')
	const spinner = wrapper.querySelector('z-spinner')!
	const status = spinner.shadowRoot!.querySelector('[role="status"]')!
	expect(status.getAttribute('aria-label')).toBe('Loading projects')
	wrapper.remove()
})

it('renders the copy value and a named copy button', async () => {
	const wrapper = await mount('<z-copy-field label="Share link" value="https://example.com"></z-copy-field>')
	const field = wrapper.querySelector('z-copy-field')!
	const input = field.shadowRoot!.querySelector('input')!
	const button = field.shadowRoot!.querySelector('button')!
	expect(input.value).toBe('https://example.com')
	expect(input.getAttribute('aria-label')).toBe('Share link')
	expect(button.textContent).toBe('Copy')
	wrapper.remove()
})
