import { defineElement } from '../shared/define-element'
import { c, css, useEffect, useHost, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-pointer-follow, a custom cursor that trails the pointer. Two modes:
 *
 *  - scoped (default): wraps slotted content, tracks the pointer within its
 *    own bounding box, hides the native cursor only over that region. Same
 *    shape as z-tooltip/z-hover-card, self-contained, composable.
 *  - fixed: a page-level singleton with no children. Drop one
 *    `<z-pointer-follow fixed>` anywhere in the document; it listens on
 *    `window`, renders a `position: fixed` dot, and toggles `cursor: none`
 *    on `document.body` as a scoped side effect (cleaned up on disconnect),
 *    the same pattern a modal uses for `overflow: hidden`. It does NOT wrap
 *    the page's content in shadow DOM; shadow encapsulation only covers this
 *    element's own dot/tag markup.
 */
const styles = css`
	:host {
		display: inline-block;
		position: relative;
		--tone: var(--text-secondary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}
	:host([tone='primary']) {
		--tone: var(--text-secondary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host(:not([is-fixed])) {
		cursor: none;
	}

	:host([is-fixed]) {
		display: block;
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: var(--z-toast);
	}

	.pointer {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		gap: var(--space-1-5);
		pointer-events: none;
		opacity: 0;
		will-change: transform;
		transition: opacity var(--motion-fast) var(--ease-enter);
	}

	.pointer.is-visible {
		opacity: 1;
	}

	.dot {
		width: 0.85rem;
		height: 0.85rem;
		border-radius: var(--radius-full);
		background: var(--tone);
		box-shadow: 0 0 0 3px color-mix(in oklch, var(--tone) 25%, transparent);
	}

	.tag {
		font-family: var(--font-sans);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--on-accent);
		background: var(--tone);
		padding: var(--space-0-5) var(--space-2);
		border-radius: var(--radius-sm);
		white-space: nowrap;
		transform: translateY(-0.1rem);
	}

	@media (prefers-reduced-motion: reduce) {
		.pointer {
			transition: none;
		}
	}
`

export const ZPointerFollow = c(
	(props) => {
		const host = useHost()
		const [pos, setPos] = useState({ x: 0, y: 0 })
		const [visible, setVisible] = useState(false)

		useEffect(() => {
			if (!props.isFixed) return
			const handleMove = (nativeEvent: PointerEvent) => {
				setPos({ x: nativeEvent.clientX, y: nativeEvent.clientY })
				setVisible(true)
			}
			window.addEventListener('pointermove', handleMove)
			const prevCursor = document.body.style.cursor
			document.body.style.cursor = 'none'
			return () => {
				window.removeEventListener('pointermove', handleMove)
				document.body.style.cursor = prevCursor
				setVisible(false)
			}
		}, [props.isFixed])

		const handleScopedMove = (nativeEvent: PointerEvent) => {
			const rect = (host.current as HTMLElement).getBoundingClientRect()
			setPos({ x: nativeEvent.clientX - rect.left, y: nativeEvent.clientY - rect.top })
			setVisible(true)
		}

		return (
			<host
				shadowDom
				onpointermove={props.isFixed ? undefined : handleScopedMove}
				onpointerleave={props.isFixed ? undefined : () => setVisible(false)}
			>
				{!props.isFixed && <slot />}
				<div class={visible ? 'pointer is-visible' : 'pointer'} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
					<span class="dot" aria-hidden="true"></span>
					{props.label && <span class="tag">{props.label}</span>}
				</div>
			</host>
		)
	},
	{
		props: {
			label: String,
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isFixed: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-pointer-follow', ZPointerFollow)
