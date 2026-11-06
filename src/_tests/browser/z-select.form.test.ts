import { describe, expect, it } from 'vitest'
import { describeFormContract, entriesOf, innerOf, mountForm, settle } from './form-helpers'
import type { FormHostT } from './form-helpers'

type SelectHostT = FormHostT & { options?: Array<{ value: string; label: string; isDisabled?: boolean }> }

const options = [
	{ value: 'a', label: 'Apple' },
	{ value: 'b', label: 'Banana' },
	{ value: 'c', label: 'Cherry', isDisabled: true }
]

describeFormContract({
	tag: 'z-select',
	filled: 'value="b"',
	expected: 'b',
	empty: '',
	emptyEntry: '',
	inner: 'button.trigger',
	mutate: (host) => { host.value = 'a' },
	read: (host) => host.value
})

describe('<z-select> in a form', () => {
	it('submits the option the user picked', async () => {
		const form = await mountForm('<z-select name="fruit"></z-select>')
		const host = form.querySelector<SelectHostT>('z-select')!
		host.options = options
		await settle(form)

		innerOf<HTMLButtonElement>(host, 'button.trigger').click()
		await settle(form)
		const banana = [...host.shadowRoot!.querySelectorAll<HTMLElement>('[role="option"]')].find((el) => el.textContent?.includes('Banana'))!
		banana.click()
		await settle(form)

		expect(entriesOf(form)).toEqual([['fruit', 'b']])
		expect(host.validity.valid).toBe(true)
	})

	it('marks the trigger required for assistive technology', async () => {
		const form = await mountForm('<z-select name="fruit" is-required></z-select>')
		const host = form.querySelector<SelectHostT>('z-select')!
		expect(innerOf<HTMLButtonElement>(host, 'button.trigger').getAttribute('aria-required')).toBe('true')
	})
})

describe('<z-select> nested options', () => {
	const nested = [
		{ value: 'fruit', label: 'Fruit', children: [{ value: 'apple', label: 'Apple' }, { value: 'lemon', label: 'Lemon' }] },
		{ value: 'water', label: 'Water' }
	]

	it('opens a submenu beside its branch and submits the chosen leaf', async () => {
		const form = await mountForm('<z-select name="food"></z-select>')
		const host = form.querySelector<SelectHostT>('z-select')!
		host.options = nested
		await settle(form)

		innerOf<HTMLButtonElement>(host, 'button.trigger').click()
		await settle(form)
		const branch = host.shadowRoot!.querySelector<HTMLElement>('#option-0')!
		branch.dispatchEvent(new MouseEvent('mouseenter'))
		await settle(form)

		const submenu = host.shadowRoot!.querySelector<HTMLElement>('.submenu')!
		expect(submenu.matches(':popover-open')).toBe(true)
		expect(submenu.getBoundingClientRect().left).toBeGreaterThanOrEqual(branch.getBoundingClientRect().right - 1)

		host.shadowRoot!.querySelector<HTMLElement>('#option-0-1')!.click()
		await settle(form)
		expect(entriesOf(form)).toEqual([['food', 'lemon']])
	})
})
