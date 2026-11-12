import { expect, it } from 'vitest'
import '../../components/z-line'

it('stretches a vertical line to the height of a centered row', async () => {
	const row = document.createElement('div')
	row.style.cssText = 'display: flex; align-items: center; height: 48px'
	const line = document.createElement('z-line')
	line.setAttribute('is-vertical', '')
	row.append(line)
	document.body.append(row)
	await customElements.whenDefined('z-line')
	await new Promise<void>((resolve) => { requestAnimationFrame(() => { resolve() }) })
	const lineHeight = line.getBoundingClientRect().height
	expect(lineHeight).toBe(48)
	expect(line.getAttribute('aria-orientation')).toBe('vertical')
	row.remove()
})
