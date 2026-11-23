import { afterEach, describe, expect, it } from 'vitest'
import '../../tokens.css'
import { mount } from './form-helpers'

afterEach(() => {
	document.body.replaceChildren()
})

const press = (target: Element, button: number) => {
	const box = target.getBoundingClientRect()
	const init = { bubbles: true, composed: true, button, isPrimary: true, pointerId: 1, clientX: box.left + 4, clientY: box.top + 4 }
	target.dispatchEvent(new PointerEvent('pointerdown', init))
}

describe('<z-sortable>', () => {
	it('starts a drag on the primary button', async () => {
		const wrapper = await mount('<z-sortable><div>One</div><div>Two</div></z-sortable>')
		const sortable = wrapper.querySelector('z-sortable')!
		press(sortable.children[0], 0)
		expect(sortable.querySelector('.placeholder')).not.toBeNull()
		sortable.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true, pointerId: 1 }))
	})

	it('ignores a right-click, which would otherwise start a drag that never ends', async () => {
		const wrapper = await mount('<z-sortable><div>One</div><div>Two</div></z-sortable>')
		const sortable = wrapper.querySelector('z-sortable')!
		press(sortable.children[0], 2)
		expect(sortable.querySelector('.placeholder')).toBeNull()
		expect((sortable.children[0] as HTMLElement).style.position).toBe('')
	})
})
