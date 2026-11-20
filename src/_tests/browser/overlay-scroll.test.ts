import { expect, it } from 'vitest'
import { applyPosition, autoUpdate, computePosition, containScroll } from '../../shared/overlay'

const buildTallPanel = (contentHeight: number): HTMLDivElement => {
	const panel = document.createElement('div')
	const content = document.createElement('div')
	panel.style.cssText = 'position: fixed; width: 120px; margin: 0'
	content.style.cssText = `height: ${contentHeight}px`
	panel.append(content)
	return panel
}

it('caps a panel taller than the viewport so it never runs off screen, and lets it scroll', () => {
	const anchor = document.createElement('button')
	const panel = buildTallPanel(window.innerHeight * 2)
	document.body.append(anchor, panel)

	const padding = 8
	const position = computePosition(anchor, panel, { placement: 'bottom-start', offset: 6, padding })
	applyPosition(panel, position)

	const panelBounds = panel.getBoundingClientRect()
	const isInsideTop = panelBounds.top >= padding - 1
	const isInsideBottom = panelBounds.bottom <= window.innerHeight - padding + 1
	expect(isInsideTop).toBe(true)
	expect(isInsideBottom).toBe(true)
	expect(getComputedStyle(panel).overflowY).toBe('auto')
	expect(panel.scrollHeight).toBeGreaterThan(panel.clientHeight)

	anchor.remove()
	panel.remove()
})

it('leaves a panel that already fits untouched', () => {
	const anchor = document.createElement('button')
	const panel = buildTallPanel(40)
	document.body.append(anchor, panel)

	const position = computePosition(anchor, panel, { placement: 'bottom-start', offset: 6 })
	applyPosition(panel, position)

	expect(position.maxHeight).toBeUndefined()
	expect(panel.style.maxHeight).toBe('')
	expect(panel.style.overflowY).toBe('')

	anchor.remove()
	panel.remove()
})

it('swallows wheel events at the scroll edge so the page behind never scrolls', () => {
	const panel = buildTallPanel(40)
	document.body.append(panel)
	containScroll(panel)

	const wheelEvent = new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true, composed: true })
	panel.firstElementChild?.dispatchEvent(wheelEvent)
	expect(wheelEvent.defaultPrevented).toBe(true)

	panel.remove()
})

it('lets a scrollable panel handle the wheel itself until it hits the end', () => {
	const panel = buildTallPanel(600)
	panel.style.cssText += '; height: 100px; overflow-y: auto'
	document.body.append(panel)
	containScroll(panel)

	const scrollDown = new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true, composed: true })
	panel.firstElementChild?.dispatchEvent(scrollDown)
	expect(scrollDown.defaultPrevented).toBe(false)

	panel.scrollTop = panel.scrollHeight
	const scrollPastEnd = new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true, composed: true })
	panel.firstElementChild?.dispatchEvent(scrollPastEnd)
	expect(scrollPastEnd.defaultPrevented).toBe(true)

	panel.remove()
})

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
