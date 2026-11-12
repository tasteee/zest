import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-line, a bare hairline rule. `is-vertical` stands it up
 * between items in a row; it stretches to the row's height.
 */
const styles = css`
	:host {
		display: block;
		flex-shrink: 0;
		background: var(--border-default);
		height: 1px;
		width: 100%;
	}

	:host([is-vertical]) {
		align-self: stretch;
		height: auto;
		min-height: var(--font-size-sm);
		width: 1px;
	}
`

export const ZLine = c(
	(props) => {
		const isVertical = props.isVertical
		const orientation = isVertical ? 'vertical' : 'horizontal'

		return <host shadowDom role="separator" aria-orientation={orientation}></host>
	},
	{
		props: {
			isVertical: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-line', ZLine)
