import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'
import { sizeProp } from '../shared/layout-schema'
import { resolveBoxSpacing } from '../shared/box-schema'
import { oneOf } from '../shared/prop-types'

/*
 * z-card — a surface, and optionally a titled one. `heading` and `description`
 * render the same header the dialog family renders, which is the point: a card
 * title, a sheet title, and a dialog title are the same object at three sizes
 * of surface, and hand-sizing a z-heading in every card is how they drift
 * apart. Leave both unset and the card is exactly what it always was: a border
 * around a slot.
 *
 * The heading renders an h3 — deep enough not to fight a page title, shallow
 * enough to be a real landmark. A card whose title needs a different level
 * should skip the attribute and slot its own z-heading.
 */
const styles = css`
	/* A card is a flex column by default; direction="horizontal" lays its
	   children in a row, and gap spaces them on the spacing scale. */
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--z-card-gap, 0);
		box-sizing: border-box;
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		transition: border-color var(--motion-instant) linear;
		border: 1px solid var(--border-default);
		color: var(--text-primary);
		background: transparent;
	}

	:host([direction='horizontal']) {
		flex-direction: row;
		align-items: center;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-reactive]:hover),
	:host([is-reactive]:focus-within) {
		border-color: color-mix(in oklch, var(--text-primary) 50%, transparent);
	}

	/* Same title treatment as z-dialog, z-sheet, and z-drawer, from the same
	   tokens: every surface that can carry a title should title itself the same
	   way, and that consistency is the whole reason this lives in the component
	   instead of being retyped as a z-heading in every card. */
	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		/* Unconditional, because knowing whether anything was slotted below
		   would mean observing the slot — too much machinery for a card whose
		   header is nearly always followed by content. A heading-only card just
		   reads as slightly deeper bottom padding. */
		margin-bottom: var(--space-3);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-snug);
		color: var(--text-primary);
	}

	.description {
		margin: 0;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}
`

export const ZCard = c(
	(props) => {
		const hasHeader = Boolean(props.heading) || Boolean(props.description)
		// Same scale as z-box: gap="3" is a step on the space scale.
		const gap = resolveBoxSpacing(props.gap)
		const hostStyle = gap ? { '--z-card-gap': gap } : {}

		return (
			<host shadowDom style={hostStyle}>
				{hasHeader && (
					<div class="header">
						{props.heading && <h3 class="title">{props.heading}</h3>}
						{props.description && <p class="description">{props.description}</p>}
					</div>
				)}
				<slot />
			</host>
		)
	},
	{
		props: {
			heading: String,
			description: String,
			gap: sizeProp,
			direction: { type: oneOf('vertical', 'horizontal'), reflect: true },
			isReactive: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-card', ZCard)
