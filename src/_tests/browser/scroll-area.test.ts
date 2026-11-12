import { expect, it } from 'vitest'
import { mount } from './form-helpers'

it('supports a fixed scroll height and hiding the scroll area', async () => {
	const wrapper = await mount('<z-scroll-area height="80px"><div style="height: 300px">Content</div></z-scroll-area>')
	const scrollArea = wrapper.querySelector<HTMLElement>('z-scroll-area')!
	const viewport = scrollArea.shadowRoot!.querySelector<HTMLElement>('.viewport')!
	expect(viewport.clientHeight).toBe(80)
	expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight)
	scrollArea.setAttribute('is-hidden', '')
	expect(getComputedStyle(scrollArea).display).toBe('none')
	wrapper.remove()
})
