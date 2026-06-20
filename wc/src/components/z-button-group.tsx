import { c, css } from 'atomico'

const styles = css`
	:host {
		display: flex;
		width: fit-content;
		align-items: stretch;
	}

	:host([is-vertical]) {
		flex-direction: column;
	}

	::slotted(*) {
		--z-button-radius: 0;
		flex-shrink: 0;
	}

	::slotted(:only-child) {
		--z-button-radius: var(--radius-md);
	}

	:host(:not([is-vertical])) ::slotted(:first-child) {
		--z-button-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	:host(:not([is-vertical])) ::slotted(:last-child) {
		--z-button-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	:host(:not([is-vertical])) ::slotted(:not(:first-child)) {
		margin-left: -1px;
	}

	:host([is-vertical]) ::slotted(:first-child) {
		--z-button-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	:host([is-vertical]) ::slotted(:last-child) {
		--z-button-radius: 0 0 var(--radius-md) var(--radius-md);
	}

	:host([is-vertical]) ::slotted(:not(:first-child)) {
		margin-top: -1px;
	}

	::slotted(:focus-visible) {
		position: relative;
		z-index: 1;
	}
`

export const ZButtonGroup = c(
	(props) => (
		<host shadowDom role="group">
			<slot />
		</host>
	),
	{
		props: {
			isVertical: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-button-group', ZButtonGroup)
