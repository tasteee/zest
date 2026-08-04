import { c, css } from 'atomico'
import { coerceSize, sizeProp } from '../shared/layout-schema'

const styles = css`
	/* A card is a column. If you need a row inside one, slot a z-row — the card
	   itself no longer switches its own display, which is what is-flex/is-row/
	   is-column used to do. */
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--z-card-gap);
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

	:host([is-hidden]) {
		display: none;
	}
`

export const ZCard = c(
	(props) => (
		<host shadowDom style={{ '--z-card-gap': coerceSize((props as any).gap) || '' }}>
			<slot />
		</host>
	),
	{
		props: {
			isHidden: { type: Boolean, reflect: true },
			isReactive: { type: Boolean, reflect: true },
			gap: sizeProp
		},
		styles
	}
)

customElements.define('z-card', ZCard)
