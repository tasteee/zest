import { c, css } from 'atomico'

const styles = css`
	:host {
		display: block;
		box-sizing: border-box;
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		transition: border-color 0.1s linear;
		background: var(--card);
		border: 1px solid var(--border);
		color: var(--foreground);
	}

	:host([is-flex]) {
		display: flex;
		flex-direction: row;
		gap: var(--z-card-gap);
	}

	:host([is-row]) {
		flex-direction: row;
	}

	:host([is-column]) {
		flex-direction: column;
	}

	:host([is-purple]) {
		background: color-mix(in oklch, var(--card) 92%, var(--neon-purple) 8%);
		border-color: color-mix(in oklch, var(--neon-purple) 30%, var(--border));
	}

	:host([is-pink]) {
		background: color-mix(in oklch, var(--card) 92%, var(--neon-pink) 8%);
		border-color: color-mix(in oklch, var(--neon-pink) 30%, var(--border));
	}

	:host(:hover),
	:host(:focus-within) {
		border-color: color-mix(in oklch, var(--foreground) 50%, transparent);
	}

	:host([is-purple]:hover),
	:host([is-purple]:focus-within) {
		border-color: color-mix(in oklch, var(--neon-purple) 55%, transparent);
	}

	:host([is-pink]:hover),
	:host([is-pink]:focus-within) {
		border-color: color-mix(in oklch, var(--neon-pink) 55%, transparent);
	}

	:host([is-hidden]) {
		display: none;
	}
`

export const ZCard = c(
	(props) => (
		<host shadowDom style={{ '--z-card-gap': props.gap || '' }}>
			<slot />
		</host>
	),
	{
		props: {
			isPurple: { type: Boolean, reflect: true },
			isPink: { type: Boolean, reflect: true },
			isNeutral: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			isFlex: { type: Boolean, reflect: true },
			isRow: { type: Boolean, reflect: true },
			isColumn: { type: Boolean, reflect: true },
			gap: String
		},
		styles
	}
)

customElements.define('z-card', ZCard)
