import { describe, expect, it } from 'vitest'
import '../components/z-calendar'
import { getShadowRoot, waitForRender } from './test-helpers'

const mountCalendar = async (attributes: Record<string, string>) => {
	const element = document.createElement('z-calendar')
	for (const name of Object.keys(attributes)) element.setAttribute(name, attributes[name])
	document.body.append(element)
	await waitForRender()
	return element
}

const findDay = (element: HTMLElement, iso: string) => getShadowRoot(element).querySelector(`[data-iso="${iso}"]`) as HTMLButtonElement

describe('<z-calendar>', () => {
	it('shows the month of the value, six weeks tall, with outside days marked', async () => {
		const element = await mountCalendar({ value: '2026-11-20' })
		const root = getShadowRoot(element)

		expect(root.querySelectorAll('.day')).toHaveLength(42)
		expect(root.querySelector('.title.is-month')?.textContent).toBe('November')
		expect(root.querySelector('.title.is-year')?.textContent).toBe('2026')
		expect(findDay(element, '2026-11-20').classList.contains('is-selected')).toBe(true)
		expect(findDay(element, '2026-11-20').classList.contains('is-outside')).toBe(false)
		expect(findDay(element, '2026-11-01').classList.contains('is-outside')).toBe(false)
		expect(findDay(element, '2026-12-01').classList.contains('is-outside')).toBe(true)
	})

	it('emits input and change with one day when it is clicked', async () => {
		const element = await mountCalendar({ value: '2026-11-20' })
		const changes: unknown[] = []
		element.addEventListener('change', (event) => changes.push((event as CustomEvent).detail))

		findDay(element, '2026-11-12').click()
		await waitForRender()

		expect(changes).toEqual([{ value: '2026-11-12', start: '2026-11-12', end: '2026-11-12' }])
		expect(element.getAttribute('value')).toBe('2026-11-12')
	})

	it('selects a range in two clicks and swaps a backwards pick', async () => {
		const element = await mountCalendar({ 'is-range': '', month: '2026-11' })
		const inputs: unknown[] = []
		const changes: unknown[] = []
		element.addEventListener('input', (event) => inputs.push((event as CustomEvent).detail.value))
		element.addEventListener('change', (event) => changes.push((event as CustomEvent).detail.value))

		findDay(element, '2026-11-15').click()
		await waitForRender()
		expect(changes).toEqual([])
		expect(inputs).toEqual(['2026-11-15/'])

		findDay(element, '2026-11-09').click()
		await waitForRender()
		expect(changes).toEqual(['2026-11-09/2026-11-15'])

		const root = getShadowRoot(element)
		expect(root.querySelectorAll('.cell.is-in-range')).toHaveLength(5)
		expect(findDay(element, '2026-11-09').classList.contains('is-selected')).toBe(true)
		expect(findDay(element, '2026-11-15').classList.contains('is-selected')).toBe(true)
	})

	it('moves the month and the year with their own arrows', async () => {
		const element = await mountCalendar({ month: '2026-11' })
		const root = getShadowRoot(element)
		const months: string[] = []
		element.addEventListener('monthchange', (event) => months.push((event as CustomEvent).detail.month))
		const arrows = root.querySelectorAll<HTMLButtonElement>('.arrow')

		arrows[1].click()
		await waitForRender()
		expect(root.querySelector('.title.is-month')?.textContent).toBe('December')

		arrows[2].click()
		await waitForRender()
		expect(root.querySelector('.title.is-year')?.textContent).toBe('2025')
		expect(months).toEqual(['2026-12', '2025-12'])
	})

	it('does not select days outside min and max', async () => {
		const element = await mountCalendar({ month: '2026-11', min: '2026-11-10', max: '2026-11-25' })
		const changes: unknown[] = []
		element.addEventListener('change', (event) => changes.push((event as CustomEvent).detail))

		findDay(element, '2026-11-05').click()
		findDay(element, '2026-11-30').click()
		await waitForRender()

		expect(changes).toEqual([])
		expect(findDay(element, '2026-11-05').getAttribute('aria-disabled')).toBe('true')
		expect(findDay(element, '2026-11-12').getAttribute('aria-disabled')).toBeNull()
	})

	it('keeps exactly one day in the tab order and moves it with the arrow keys', async () => {
		const element = await mountCalendar({ value: '2026-11-20' })
		const root = getShadowRoot(element)
		expect(root.querySelectorAll('.day[tabindex="0"]')).toHaveLength(1)

		const grid = root.querySelector('[role="grid"]') as HTMLElement
		findDay(element, '2026-11-20').focus()
		grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
		await waitForRender()

		expect(root.querySelectorAll('.day[tabindex="0"]')).toHaveLength(1)
		expect(findDay(element, '2026-11-21').getAttribute('tabindex')).toBe('0')
	})
})
