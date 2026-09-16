import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, useEffect, useRef, useState } from 'atomico'

/*
 * z-field — the standard visible label, guidance, and error treatment for a
 * single form control. It forwards its label and required state to the slotted
 * Zest control, so custom-element shadow boundaries do not break the field's
 * accessible name or native validation contract.
 *
 * It is also what makes a row of mixed controls line up. Controls disagree
 * about their own height by nature — a switch track is 22px, a select is 40 —
 * and they label differently too: text controls take a label above, booleans
 * take one beside. Put any of them in a z-field and they all resolve to the
 * same three bands: label, gap, control.
 *
 *   --field-label-height  1.25rem
 *   --field-gap           0.25rem
 *   --control-height-md   2.5rem
 *                         ------- 4rem, or 64px at the default root size
 *
 * The control band is a fixed-height flex row, so a 22px switch centres inside
 * the same 40px as a select rather than collapsing the row around itself.
 */
const styles = css`
	:host {
		display: block;
		width: 100%;
		--z-field-control-height: var(--control-height-md);
	}

	:host([size='sm']) { --z-field-control-height: var(--control-height-sm); }
	:host([size='lg']) { --z-field-control-height: var(--control-height-lg); }

	/* minmax(0, 1fr) rather than the implicit auto track: an auto track is
	   floored at its content's min-content width, so a field in a narrow
	   container (a grid cell, a split pane) grew past it and overlapped its
	   neighbour instead of letting the control shrink. */
	.field { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--field-gap); }

	/* Labels stay in normal flow and align with the control's outer edge. This
	   works on every surface and for every control shape without painting a
	   theme-dependent patch or shadow over a border. The fixed height keeps
	   mixed rows aligned even when a theme uses different font metrics. */
	.header { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; height: var(--field-label-height); min-width: 0; }

	.label { color: var(--foreground); font-size: var(--font-size-small); font-weight: 500; line-height: 1.25; letter-spacing: normal; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; user-select: none; -webkit-user-select: none; }
	.required { color: var(--destructive); }

	/* The band. Whatever is slotted sits vertically centred in a row of the
	   control height, which is what lets a switch and a select agree. */
	.control { display: flex; align-items: center; min-width: 0; min-height: var(--z-field-control-height); }

	/* The slotted control is a flex item, so its automatic minimum size is its
	   own min-content — the last place the field could still be forced wider
	   than the space it was given. Controls set min-width: 0 on their inner
	   input already; this carries that the rest of the way out. */
	.control ::slotted(*) { min-width: 0; max-width: 100%; }

	.description, .error { font-size: var(--font-size-small); line-height: 1.45; }
	.description { color: var(--muted-foreground); }
	.description ::slotted(*) { color: var(--muted-foreground); }
	.error { color: var(--destructive); }

	:host([is-label-hidden]) .header { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
`

export const ZField = c(
	(props) => {
		const slotRef = useRef<HTMLSlotElement>()
		const [hasDescription, setHasDescription] = useState(false)
		const [hasError, setHasError] = useState(false)
		const forwarded = useRef<{ control: HTMLElement; label?: string; required?: boolean }>()
		const release = () => {
			const previous = forwarded.current
			if (!previous) return
			const control = previous.control as HTMLElement & { label?: string; isRequired?: boolean }
			if (previous.label !== undefined && control.label === previous.label) control.label = undefined
			if (previous.required && control.isRequired) control.isRequired = false
			forwarded.current = undefined
		}
		const syncControl = () => {
			const control = slotRef.current?.assignedElements({ flatten: true })[0] as (HTMLElement & { label?: string; isRequired?: boolean }) | undefined
			if (forwarded.current?.control !== control) release()
			if (!control) return
			const state = forwarded.current ?? { control }
			const ownsLabel = state.label !== undefined && control.label === state.label
			const explicitlyNamed = control.hasAttribute('label') || control.hasAttribute('aria-label') || control.hasAttribute('aria-labelledby')
			if ('label' in control && !explicitlyNamed && (ownsLabel || !control.label)) {
				control.label = props.label || undefined
				state.label = props.label || undefined
			}
			if ('isRequired' in control) {
				if (props.isRequired && !control.isRequired) { control.isRequired = true; state.required = true }
				else if (!props.isRequired && state.required) { control.isRequired = false; state.required = false }
			}
			forwarded.current = state
		}
		useEffect(() => syncControl(), [props.label, props.isRequired])
		useEffect(() => release, [])
		const focusControl = () => {
			const control = slotRef.current?.assignedElements({ flatten: true })[0] as HTMLElement | undefined
			const input = control?.shadowRoot?.querySelector<HTMLElement>('input, textarea, select')
				?? control?.shadowRoot?.querySelector<HTMLElement>('button, [tabindex="0"]')
			;(input ?? control)?.focus()
		}

		// An unlabelled field standing next to labelled ones has to keep the
		// label band or it rides 24px high in the row. Reserving renders the
		// band empty rather than rendering a blank label, so nothing is
		// announced to a screen reader that isn't there.
		const shouldReserveLabel = !props.label && props.isLabelReserved
		const showError = Boolean(props.error) || hasError

		return (
			<host shadowDom>
				<div class="field">
					{props.label && <div class="header"><span class="label" onclick={focusControl}>{props.label}{props.isRequired && <span class="required" aria-hidden="true"> *</span>}</span></div>}
					{shouldReserveLabel && <div class="header" aria-hidden="true" />}
					<div class="control"><slot ref={slotRef} onslotchange={syncControl} /></div>
					<div class="error" hidden={!showError}><slot name="error" onslotchange={(e: Event) => setHasError((e.target as HTMLSlotElement).assignedNodes().length > 0)}>{props.error}</slot></div>
					<div class="description" hidden={showError || (!props.description && !hasDescription)}><slot name="description" onslotchange={(e: Event) => setHasDescription((e.target as HTMLSlotElement).assignedNodes().length > 0)}>{props.description}</slot></div>
				</div>
			</host>
		)
	},
	{
		props: {
			label: String,
			description: String,
			error: String,
			isRequired: { type: Boolean, reflect: true },
			isLabelHidden: { type: Boolean, reflect: true },
			isLabelReserved: { type: Boolean, reflect: true },
			size: { type: String, reflect: true }
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-field', ZField)
