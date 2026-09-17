import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

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
	/* A card is a column. If you need a row inside one, slot a wired-row — the card
	   itself no longer switches its own display, which is what is-flex/is-row/
	   is-column used to do. */
	:host {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		transition: border-color 0.05s linear;
		border: 1px solid var(--border);
		color: var(--foreground);
		/* Inert in the flat themes, material in the rest. A card rests on the
		   page rather than floating above it, so it takes the flush stack. */
		background: var(--material-surface);
		box-shadow: var(--elevation-flush);
	}

	:host([is-reactive]:hover),
	:host([is-reactive]:focus-within) {
		border-color: color-mix(in oklch, var(--foreground) 50%, transparent);
	}

	/* Same title treatment as z-dialog, z-sheet, and z-drawer, from the same
	   tokens: every surface that can carry a title should title itself the same
	   way, and that consistency is the whole reason this lives in the component
	   instead of being retyped as a z-heading in every card. */
	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		/* Unconditional, because knowing whether anything was slotted below
		   would mean observing the slot — too much machinery for a card whose
		   header is nearly always followed by content. A heading-only card just
		   reads as slightly deeper bottom padding. */
		margin-bottom: var(--space-md);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-h4);
		font-weight: 600;
		line-height: var(--line-height-h4);
		color: var(--foreground);
	}

	.description {
		margin: 0;
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
		line-height: var(--line-height-body);
	}
`

export const ZCard = c(
	(props) => {
		const hasHeader = Boolean(props.heading) || Boolean(props.description)

		return (
			<host shadowDom>
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
			isReactive: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-card', ZCard)
