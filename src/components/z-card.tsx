import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

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

`

export const ZCard = c(
	() => (
		<host shadowDom>
			<slot />
		</host>
	),
	{
		props: {
			isReactive: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-card', ZCard)
