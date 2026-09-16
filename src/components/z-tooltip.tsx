import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, useRef, useState, useEffect, useHost } from 'atomico'
import { floatingSurfaceStyles } from '../shared/overlay-styles'
import {
	computePosition,
	autoUpdate,
	applyPosition,
	applyArrowPosition,
	showFloating,
	hideFloating,
	overlayPositionProps,
	type Placement
} from '../shared/overlay'

/*
 * z-tooltip — a hover/focus label anchored to its slotted trigger. Wrap any
 * element: <z-tooltip content="Save"><z-button>…</z-button></z-tooltip>.
 * Built on the shared overlay core: a [popover=manual] surface positioned by
 * shared/overlay.ts, so it escapes overflow/stacking and flips near edges.
 * Opens after `open-delay` ms on pointerenter/focusin; closes on leave/blur or
 * Esc. Reuses the floating-surface chrome, just tighter.
 *
 * The arrow is on by default — a tooltip that does not point at anything is
 * just a floating box, and at this size the tie to the trigger is the whole
 * job. `does-hide-arrow` drops it for the rare dense cluster where several
 * tooltips share an edge.
 */
const ARROW_SIZE = 8

const styles = css`
	.surface {
		--tooltip-surface: var(--foreground);
		--tooltip-edge: color-mix(in srgb, var(--foreground) 78%, var(--background));
		padding: 0.4375rem 0.625rem;
		max-width: 16rem;
		font-size: var(--font-size-caption);
		font-weight: 500;
		line-height: 1.35;
		pointer-events: none;
		width: max-content;
		user-select: none;
		-webkit-user-select: none;
		background: var(--tooltip-surface);
		color: var(--background);
		border: 1px solid var(--tooltip-edge);
		border-radius: var(--radius-sm);
		box-shadow: none;
	}

	/* A square rotated onto its corner, centred exactly on the surface edge:
	   the outer half is the point, and the inner half's own background covers
	   the 1px border it straddles, so the two read as one shape. Only two of
	   its borders are drawn — the pair that meets at the leading corner. */
	.arrow {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--tooltip-surface);
		rotate: 45deg;
	}

	.surface[data-side='top'] .arrow {
		bottom: -4px;
		left: var(--arrow-x, 50%);
		margin-left: -4px;
		border-right: 1px solid var(--tooltip-edge);
		border-bottom: 1px solid var(--tooltip-edge);
	}

	.surface[data-side='bottom'] .arrow {
		top: -4px;
		left: var(--arrow-x, 50%);
		margin-left: -4px;
		border-left: 1px solid var(--tooltip-edge);
		border-top: 1px solid var(--tooltip-edge);
	}

	.surface[data-side='left'] .arrow {
		right: -4px;
		top: var(--arrow-y, 50%);
		margin-top: -4px;
		border-top: 1px solid var(--tooltip-edge);
		border-right: 1px solid var(--tooltip-edge);
	}

	.surface[data-side='right'] .arrow {
		left: -4px;
		top: var(--arrow-y, 50%);
		margin-top: -4px;
		border-bottom: 1px solid var(--tooltip-edge);
		border-left: 1px solid var(--tooltip-edge);
	}
`

export const ZTooltip = c(
	(props) => {
		const host = useHost()
		const floatRef = useRef<HTMLDivElement>()
		const timer = useRef<ReturnType<typeof setTimeout>>()
		const [isOpen, setIsOpen] = useState(false)

		useEffect(() => {
			const floating = floatRef.current
			if (!floating || !isOpen) {
				if (floating) hideFloating(floating)
				return
			}
			showFloating(floating)
			const update = () => {
				const position = computePosition(host.current, floating, {
					placement: (props.placement as Placement) || 'top',
					offset: props.offset ?? 8
				})
				applyPosition(floating, position)
				applyArrowPosition(floating, host.current, position, ARROW_SIZE)
			}
			const cleanup = autoUpdate(host.current, floating, update)
			return () => {
				cleanup()
				hideFloating(floating)
			}
		}, [isOpen, props.placement, props.offset])

		const open = () => {
			if (props.isDisabled || !props.content) return
			clearTimeout(timer.current)
			timer.current = setTimeout(() => setIsOpen(true), props.openDelay ?? 150)
		}
		const close = () => {
			clearTimeout(timer.current)
			setIsOpen(false)
		}

		return (
			<host
				shadowDom
				onpointerenter={open}
				onpointerleave={close}
				onfocusin={open}
				onfocusout={close}
				onkeydown={(e: KeyboardEvent) => e.key === 'Escape' && close()}
			>
				<slot />
				<div ref={floatRef} class="surface" popover="manual" role="tooltip">
					{props.content}
					{!props.doesHideArrow && <span class="arrow" aria-hidden="true" />}
				</div>
			</host>
		)
	},
	{
		props: {
			...overlayPositionProps,
			content: String,
			openDelay: { type: Number },
			doesHideArrow: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true }
		},
		styles: [floatingSurfaceStyles, styles, interactionStyles]
	}
)

defineElement('z-tooltip', ZTooltip)
