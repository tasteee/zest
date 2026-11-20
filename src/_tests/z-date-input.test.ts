import { describe, expect, it } from 'vitest'
import '../components/z-date-input'
import { getShadowRoot, waitForRender } from './test-helpers'

const mountDateInput = async (attributes: Record<string, string>) => {
	const element = document.createElement('z-date-input')
	for (const name of Object.keys(attributes)) element.setAttribute(name, attributes[name])
	document.body.append(element)
	await waitForRender()
	return element
}

const readFields = (element: HTMLElement) => [...getShadowRoot(element).querySelectorAll('input')] as HTMLInputElement[]

const typeInto = async (field: HTMLInputElement, text: string) => {
	field.value = text
	field.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertText' }))
	await waitForRender()
}

describe('<z-date-input>', () => {
	it('shows the value in the requested format and the format as the placeholder', async () => {
		const element = await mountDateInput({ value: '2026-11-20', format: 'MM/DD/YYYY' })
		const field = readFields(element)[0]

		expect(field.value).toBe('11/20/2026')
		expect(field.placeholder).toBe('MM/DD/YYYY')
	})

	it('shapes typing, and holds an ISO value once the date is complete', async () => {
		const element = await mountDateInput({ format: 'MM/DD/YYYY' })
		const field = readFields(element)[0]
		const inputs: unknown[] = []
		element.addEventListener('input', (event) => inputs.push((event as CustomEvent).detail.value))

		await typeInto(field, '1120')
		expect(field.value).toBe('11/20/')
		expect(inputs).toEqual([])

		await typeInto(field, '11/20/2026')
		expect(inputs).toEqual(['2026-11-20'])
		expect(element.getAttribute('value')).toBe('2026-11-20')
	})

	it('reverts an incomplete date on blur and announces a committed one once', async () => {
		const element = await mountDateInput({ value: '2026-11-20' })
		const field = readFields(element)[0]
		const changes: unknown[] = []
		element.addEventListener('change', (event) => changes.push((event as CustomEvent).detail.value))

		field.dispatchEvent(new FocusEvent('focus'))
		await typeInto(field, '2026-11')
		field.dispatchEvent(new FocusEvent('blur'))
		await waitForRender()
		expect(field.value).toBe('2026-11-20')
		expect(changes).toEqual([])

		field.dispatchEvent(new FocusEvent('focus'))
		await typeInto(field, '2026-12-01')
		field.dispatchEvent(new FocusEvent('blur'))
		await waitForRender()
		expect(changes).toEqual(['2026-12-01'])
	})

	it('pulls a date outside min and max back inside on blur', async () => {
		const element = await mountDateInput({ min: '2026-11-10', max: '2026-11-25' })
		const field = readFields(element)[0]

		field.dispatchEvent(new FocusEvent('focus'))
		await typeInto(field, '2026-12-31')
		expect(element.getAttribute('value')).toBeNull()
		field.dispatchEvent(new FocusEvent('blur'))
		await waitForRender()

		expect(element.getAttribute('value')).toBe('2026-11-25')
		expect(field.value).toBe('2026-11-25')
	})

	it('renders two fields for a range and pins a start that passes the end', async () => {
		const element = await mountDateInput({ 'is-range': '', value: '2026-11-09/2026-11-14' })
		const fields = readFields(element)
		expect(fields).toHaveLength(2)
		expect(fields[0].value).toBe('2026-11-09')
		expect(fields[1].value).toBe('2026-11-14')

		fields[0].dispatchEvent(new FocusEvent('focus'))
		await typeInto(fields[0], '2026-11-20')
		fields[0].dispatchEvent(new FocusEvent('blur'))
		await waitForRender()

		expect(element.getAttribute('value')).toBe('2026-11-14/2026-11-14')
	})

	it('steps the date with the arrow keys', async () => {
		const element = await mountDateInput({ value: '2026-11-20' })
		const field = readFields(element)[0]

		field.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
		await waitForRender()

		expect(element.getAttribute('value')).toBe('2026-11-21')
	})

	it('only offers the calendar when has-calendar is set', async () => {
		const plain = await mountDateInput({})
		expect(getShadowRoot(plain).querySelector('.calendar-button')).toBeNull()

		const withCalendar = await mountDateInput({ 'has-calendar': '' })
		const button = getShadowRoot(withCalendar).querySelector('.calendar-button')
		expect(button?.getAttribute('aria-haspopup')).toBe('dialog')
		expect(getShadowRoot(withCalendar).querySelector('z-calendar')).not.toBeNull()
	})
})
