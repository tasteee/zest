import { defineElement } from '../shared/define-element'
import { c, css, useEffect, useState } from 'atomico'

/*
 * z-reading-progress — a hairline rule showing how far down the page you are.
 *
 *   <z-reading-progress for="#content"></z-reading-progress>
 *
 * Scroll is listened for in the capture phase on `document` rather than bound
 * to `window`, for the same reason z-toc does it: the page may scroll inside a
 * container — z-docs-shell scrolls a z-chassis screen, not the document — and
 * scroll events do not bubble.
 *
 * The bar is `aria-hidden` and carries no role. A progress bar announces a
 * task the user is waiting on; this measures a position they already know
 * from the act of scrolling, so announcing it is noise.
 */
const styles = css`
	:host {
		display: block;
		position: sticky;
		top: 0;
		z-index: 3;
		height: var(--reading-progress-height, 2px);
		background: transparent;
		pointer-events: none;
	}

	:host([is-hidden]) {
		display: none;
	}

	.bar {
		height: 100%;
		width: var(--reading-progress-width, 0%);
		background: var(--purple);
		transition: width 0.08s linear;
	}
`

const readProgress = (scroller: Element): number => {
	const scrollable = scroller.scrollHeight - scroller.clientHeight
	const hasRoom = scrollable > 0
	if (!hasRoom) return 0

	const ratio = scroller.scrollTop / scrollable
	return Math.min(100, Math.max(0, ratio * 100))
}

export const ZReadingProgress = c(
	(props) => {
		const [percent, setPercent] = useState(0)

		useEffect(() => {
			const selector = props.for as string | undefined

			const resolveScroller = (eventTarget: EventTarget | null): Element | null => {
				if (selector) return document.querySelector(selector)

				const isElement = eventTarget instanceof Element
				return isElement ? eventTarget : document.documentElement
			}

			const handleScroll = (scrollEvent: Event) => {
				const scroller = resolveScroller(scrollEvent.target)
				if (!scroller) return
				setPercent(readProgress(scroller))
			}

			document.addEventListener('scroll', handleScroll, { capture: true, passive: true })
			return () => document.removeEventListener('scroll', handleScroll, { capture: true })
		}, [props.for])

		const barStyle = { '--reading-progress-width': `${percent}%` }

		return (
			<host shadowDom aria-hidden='true'>
				<div class='bar' style={barStyle} />
			</host>
		)
	},
	{
		props: {
			for: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-reading-progress', ZReadingProgress)
