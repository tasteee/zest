import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-line — a one-pixel rule. Horizontal is the default; the presence of the
 * `vertical` attribute switches its axis.
 */
const styles = css`
	:host {
		display: block;
		flex-shrink: 0;
		background: var(--border);
		height: 1px;
		width: 100%;
	}

	:host([vertical]) {
		align-self: stretch;
		height: auto;
		width: 1px;
	}
`

export const ZLine = c(
	(props) => {
		const ariaOrientation = props.vertical ? 'vertical' : 'horizontal'

		return <host shadowDom role='separator' aria-orientation={ariaOrientation}></host>
	},
	{
		props: {
			vertical: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-line', ZLine)
