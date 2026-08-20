import { defineElement } from '../shared/define-element'
import { c, css, event, useRef, useProp, useEffect, useHost } from 'atomico'
import { floatingSurfaceStyles } from '../shared/overlay-styles'
import {
	computePosition,
	autoUpdate,
	applyPosition,
	showFloating,
	hideFloating,
	overlayPositionProps,
	type Placement
} from '../shared/overlay'

/*
 * z-popover — a click-triggered floating panel for rich content. The trigger
 * goes in [slot="trigger"]; the panel body is the default slot:
 *   <z-popover><z-button slot="trigger">Open</z-button><div>…</div></z-popover>
 * Uses the shared overlay core (a top-layer [popover=manual] surface positioned
 * by shared/overlay.ts). Dismiss is handled here — outside-click + Esc — mirroring
 * z-select / z-menu so behavior stays uniform. Fires `toggle` with { open }.
 *
 * `is-open` reflects and is two-way, matching the dialog family: assigning it
 * opens or closes the panel and fires the same `toggle` a click would.
 */
const styles = css`
	.trigger {
		display: inline-flex;
	}

	.surface {
		max-width: var(--z-overlay-max-width, 22rem);
		min-width: 12rem;
		pointer-events: auto;
	}
`

export const ZPopover = c(
	(props) => {
		const host = useHost()
		const floatRef = useRef<HTMLDivElement>()
		const [isOpen, setIsOpen] = useProp<boolean>('isOpen')
		const lastAnnouncedOpen = useRef<boolean | undefined>(undefined)

		// `toggle` is announced from the state itself rather than from the click
		// handler, so opening the panel by assigning `isOpen` fires the same
		// event as clicking the trigger. The initial state is not an event.
		useEffect(() => {
			const isCurrentlyOpen = Boolean(isOpen)

			const isFirstRun = lastAnnouncedOpen.current === undefined
			if (isFirstRun) {
				lastAnnouncedOpen.current = isCurrentlyOpen
				return
			}

			const hasChanged = lastAnnouncedOpen.current !== isCurrentlyOpen
			if (!hasChanged) return

			lastAnnouncedOpen.current = isCurrentlyOpen
			props.toggle({ open: isCurrentlyOpen })
		}, [isOpen])

		useEffect(() => {
			const floating = floatRef.current
			if (!floating || !isOpen) {
				if (floating) hideFloating(floating)
				return
			}
			showFloating(floating)
			const update = () =>
				applyPosition(
					floating,
					computePosition(host.current, floating, {
						placement: (props.placement as Placement) || 'bottom',
						offset: props.offset ?? 8
					})
				)
			const cleanup = autoUpdate(host.current, floating, update)

			const onDocumentPointerDown = (e: Event) => {
				if (!e.composedPath().includes(host.current as EventTarget)) setIsOpen(false)
			}
			const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
			document.addEventListener('pointerdown', onDocumentPointerDown)
			document.addEventListener('keydown', onKey)

			return () => {
				cleanup()
				document.removeEventListener('pointerdown', onDocumentPointerDown)
				document.removeEventListener('keydown', onKey)
				hideFloating(floating)
			}
		}, [isOpen, props.placement, props.offset])

		return (
			<host shadowDom>
				<div
					class="trigger"
					aria-haspopup="dialog"
					aria-expanded={isOpen ? 'true' : 'false'}
					onclick={() => !props.disabled && setIsOpen(!isOpen)}
				>
					<slot name="trigger" />
				</div>
				<div ref={floatRef} class="surface" popover="manual" role="dialog">
					<slot />
				</div>
			</host>
		)
	},
	{
		props: {
			...overlayPositionProps,
			isOpen: { type: Boolean, reflect: true },
			disabled: { type: Boolean, reflect: true },
			toggle: event<{ open: boolean }>({ bubbles: true, composed: true })
		},
		styles: [floatingSurfaceStyles, styles]
	}
)

defineElement('z-popover', ZPopover)
