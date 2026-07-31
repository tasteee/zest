import { c, css, useEffect, useRef } from 'atomico'

/*
 * z-field — the standard visible label, guidance, and error treatment for a
 * single form control. It forwards its label to the slotted Zest control as an
 * accessible name, so custom-element shadow boundaries do not break labeling.
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

	:host([is-small]) { --z-field-control-height: var(--control-height-sm); }
	:host([is-large]) { --z-field-control-height: var(--control-height-lg); }

	/* minmax(0, 1fr) rather than the implicit auto track: an auto track is
	   floored at its content's min-content width, so a field in a narrow
	   container (a grid cell, a split pane) grew past it and overlapped its
	   neighbour instead of letting the control shrink. */
	.field { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--field-gap); }

	/* Fixed rather than left to line-height: a label that wraps, or one set in
	   a theme with different metrics, would otherwise change the height of the
	   whole row and break alignment with its neighbours. */
	.header { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; height: var(--field-label-height); }

	.label { color: var(--color-neutral-5); font-size: var(--font-size-small); font-weight: 600; line-height: 1; letter-spacing: 0.04em; text-transform: lowercase; font-variant-caps: all-small-caps; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
	.error { color: var(--destructive); }

	:host([is-label-hidden]) .header { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
`

export const ZField = c(
	(props) => {
		const slotRef = useRef<HTMLSlotElement>()
		const syncLabel = () => {
			const control = slotRef.current?.assignedElements({ flatten: true })[0] as HTMLElement | undefined
			if (!control || !props.label) return
			const alreadyNamed = control.hasAttribute('label') || control.hasAttribute('aria-label') || control.hasAttribute('aria-labelledby')
			if (!alreadyNamed) (control as HTMLElement & { label?: string }).label = props.label
		}

		useEffect(() => syncLabel(), [props.label])

		// An unlabelled field standing next to labelled ones has to keep the
		// label band or it rides 24px high in the row. Reserving renders the
		// band empty rather than rendering a blank label, so nothing is
		// announced to a screen reader that isn't there.
		const shouldReserveLabel = !props.label && props.isLabelReserved

		return (
			<host shadowDom>
				<div class="field">
					{props.label && <div class="header"><span class="label">{props.label}{props.isRequired && <span class="required" aria-hidden="true"> *</span>}</span></div>}
					{shouldReserveLabel && <div class="header" aria-hidden="true" />}
					<div class="control"><slot ref={slotRef} onslotchange={syncLabel} /></div>
					{props.error ? <div class="error"><slot name="error">{props.error}</slot></div> : props.description ? <div class="description"><slot name="description">{props.description}</slot></div> : null}
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
			isSmall: { type: Boolean, reflect: true },
			isLarge: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-field', ZField)
