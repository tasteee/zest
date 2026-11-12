import { expect, it } from 'vitest'
import { applyPosition, autoUpdate, computePosition } from '../../shared/overlay'

it('keeps a floating panel aligned when its anchor moves inside a shadow scroller', async () => {
	const container = document.createElement('div')
	const shadowRoot = container.attachShadow({ mode: 'open' })
	const scroller = document.createElement('div')
	const content = document.createElement('div')
	const anchor = document.createElement('button')
	const panel = document.createElement('div')
	scroller.style.cssText = 'height: 100px; overflow: auto'
	content.style.cssText = 'height: 500px; padding-top: 150px'
	panel.style.cssText = 'position: fixed; width: 100px; height: 30px'
	content.append(anchor)
	scroller.append(content)
	shadowRoot.append(scroller)
	document.body.append(container, panel)
	const updatePosition = () => {
		const position = computePosition(anchor, panel, { placement: 'bottom-start', offset: 6 })
		applyPosition(panel, position)
	}
	const stopUpdating = autoUpdate(anchor, panel, updatePosition)
	scroller.scrollTop = 60
	await new Promise<void>((resolve) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => { resolve() })
		})
	})
	const anchorBounds = anchor.getBoundingClientRect()
	const panelBounds = panel.getBoundingClientRect()
	expect(Math.abs(panelBounds.top - anchorBounds.bottom - 6)).toBeLessThanOrEqual(1)
	stopUpdating()
	container.remove()
	panel.remove()
})
