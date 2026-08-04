import { c, css } from 'atomico'

/*
 * z-line — a one-pixel rule. It used to carry both is-vertical and
 * is-horizontal, which could be set at the same time with no defined result.
 * One `direction` says the same thing and can only mean one of them.
 */
const styles = css`
	:host {
		display: block;
		flex-shrink: 0;
		background: var(--border);
		height: 1px;
		width: 100%;
	}

	:host([direction='vertical']) {
		height: 100%;
		width: 1px;
	}
`

export const ZLine = c(
	(props) => {
		const isVertical = props.direction === 'vertical'
		const ariaOrientation = isVertical ? 'vertical' : 'horizontal'

		return <host shadowDom role='separator' aria-orientation={ariaOrientation}></host>
	},
	{
		props: {
			direction: { type: String, reflect: true }
		},
		styles
	}
)

customElements.define('z-line', ZLine)
