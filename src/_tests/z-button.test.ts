import { describe, expect, it, vi } from 'vitest'
import './test-helpers'
import '../components/z-button'
import { getShadowRoot, waitForRender } from './test-helpers'

describe('<z-button>', () => {
	it('renders a native button with its slotted label', async () => {
		const element = document.createElement('z-button')
		element.textContent = 'Save'
		document.body.append(element)
		await waitForRender()

		const button = getShadowRoot(element).querySelector('button')
		const slot = button?.querySelector('slot')
		expect(slot?.assignedNodes().map((node) => node.textContent).join('')).toBe('Save')
		expect(button?.type).toBe('button')
	})

	it('forwards disabled state to the native button', async () => {
		const element = document.createElement('z-button')
		element.setAttribute('is-disabled', '')
		document.body.append(element)
		await waitForRender()

		expect(getShadowRoot(element).querySelector('button')?.disabled).toBe(true)
	})

	it('accepts size="xs"', async () => {
		const element = document.createElement('z-button')
		element.setAttribute('size', 'xs')
		document.body.append(element)
		await waitForRender()

		expect(getShadowRoot(element).querySelector('button')?.classList.contains('is-xs')).toBe(true)
	})

	it('is-icon reflects and adds the square shape class', async () => {
		const element = document.createElement('z-button') as HTMLElement & { isIcon?: boolean }
		element.setAttribute('aria-label', 'Undo')
		element.isIcon = true
		document.body.append(element)
		await waitForRender()

		expect(element.hasAttribute('is-icon')).toBe(true)
		expect(getShadowRoot(element).querySelector('button')?.classList.contains('is-icon')).toBe(true)
	})

	it('warns once when an is-icon button has no accessible name', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		const element = document.createElement('z-button')
		element.setAttribute('is-icon', '')
		element.innerHTML = '<svg aria-hidden="true"></svg>'
		document.body.append(element)
		await waitForRender()
		element.setAttribute('size', 'sm')
		await waitForRender()

		const iconWarnings = warn.mock.calls.filter((call) => String(call[0]).includes('is-icon button has no accessible name'))
		expect(iconWarnings).toHaveLength(1)
		warn.mockRestore()
	})

	it('does not warn when an is-icon button is named by aria-label', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		const element = document.createElement('z-button')
		element.setAttribute('is-icon', '')
		element.setAttribute('aria-label', 'Undo')
		element.innerHTML = '<svg aria-hidden="true"></svg>'
		document.body.append(element)
		await waitForRender()

		expect(warn).not.toHaveBeenCalled()
		warn.mockRestore()
	})
})
