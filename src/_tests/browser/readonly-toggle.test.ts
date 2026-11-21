import { afterEach, describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { mount, settle } from './form-helpers'

// Atomico writes `readonly` as an attribute (the property is
// `readOnly`), so a raw `false` would leave readonly="false" on
// the inner control and keep it read-only. These tests turn
// read-only on, then off, and check a person can type again.

type ReadonlyHostT = HTMLElement & { isReadonly?: boolean }

type ReadonlyCaseT = {
	name: string
	markup: string
	tag: string
	selector: string
	typed: string
}

const readonlyCases: ReadonlyCaseT[] = [
	{ name: 'z-input', markup: '<z-input></z-input>', tag: 'z-input', selector: 'input', typed: 'zest' },
	{ name: 'z-textarea', markup: '<z-textarea></z-textarea>', tag: 'z-textarea', selector: 'textarea', typed: 'zest' },
	{ name: 'z-number-input', markup: '<z-number-input></z-number-input>', tag: 'z-number-input', selector: 'input', typed: '42' },
	{ name: 'z-date-input', markup: '<z-date-input></z-date-input>', tag: 'z-date-input', selector: 'input', typed: '12' },
	{ name: 'z-date-input range start', markup: '<z-date-input is-range></z-date-input>', tag: 'z-date-input', selector: 'input:first-of-type', typed: '12' },
	{ name: 'z-date-input range end', markup: '<z-date-input is-range></z-date-input>', tag: 'z-date-input', selector: 'input:last-of-type', typed: '12' }
]

const getDigits = (text: string): string => text.replace(/\D/g, '')

const findInner = (host: HTMLElement, selector: string): HTMLInputElement => {
	const inner = host.shadowRoot?.querySelector<HTMLInputElement>(selector)
	if (!inner) throw new Error(`Expected <${host.localName}> to render ${selector}`)
	return inner
}

const mountHost = async (readonlyCase: ReadonlyCaseT): Promise<ReadonlyHostT> => {
	const wrapper = await mount(readonlyCase.markup)
	const host = wrapper.querySelector<ReadonlyHostT>(readonlyCase.tag)
	if (!host) throw new Error(`Expected ${readonlyCase.markup} to mount`)
	return host
}

const expectTypingWorks = async (host: HTMLElement, readonlyCase: ReadonlyCaseT): Promise<void> => {
	const inner = findInner(host, readonlyCase.selector)
	expect(inner.readOnly).toBe(false)
	expect(inner.hasAttribute('readonly')).toBe(false)

	await userEvent.click(inner)
	await userEvent.keyboard(readonlyCase.typed)
	await settle(host.parentNode as ParentNode)

	const typedDigits = getDigits(readonlyCase.typed)
	const isDigitsOnly = typedDigits === readonlyCase.typed
	const receivedText = isDigitsOnly ? getDigits(inner.value) : inner.value
	expect(receivedText).toBe(readonlyCase.typed)
}

describe('read-only can be turned off again', () => {
	afterEach(() => {
		document.body.replaceChildren()
	})

	for (const readonlyCase of readonlyCases) {
		it(`${readonlyCase.name}: isReadonly true then false`, async () => {
			const host = await mountHost(readonlyCase)

			host.isReadonly = true
			await settle(host.parentNode as ParentNode)
			expect(findInner(host, readonlyCase.selector).readOnly).toBe(true)

			host.isReadonly = false
			await settle(host.parentNode as ParentNode)
			await expectTypingWorks(host, readonlyCase)
		})

		it(`${readonlyCase.name}: is-readonly attribute added then removed`, async () => {
			const host = await mountHost(readonlyCase)

			host.setAttribute('is-readonly', '')
			await settle(host.parentNode as ParentNode)
			expect(findInner(host, readonlyCase.selector).readOnly).toBe(true)

			host.removeAttribute('is-readonly')
			await settle(host.parentNode as ParentNode)
			await expectTypingWorks(host, readonlyCase)
		})
	}
})
