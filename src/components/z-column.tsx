import { c, css } from 'atomico'
import { directionLockedBoxProps, getBoxHostStyle } from '../shared/box-schema'
import { boxLayoutStyles } from '../shared/box-styles'

const baseStyles = css`
	:host {
		box-sizing: border-box;
	}
`

/*
 * z-column — z-box with the flow direction locked to a vertical column. A thin
 * wrapper: every other z-box prop (gap, aligns-x/aligns-y, wrap,
 * padding/margin, inset, full-width/full-height, ...) works the same way.
 */
export const ZColumn = c(
	(props) => (
		<host shadowDom is-column style={getBoxHostStyle({ ...props, isColumn: true })}>
			<slot />
		</host>
	),
	{
		props: directionLockedBoxProps,
		styles: [baseStyles, boxLayoutStyles]
	}
)

customElements.define('z-column', ZColumn)
