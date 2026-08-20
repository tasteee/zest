import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'
import { directionLockedBoxProps, getBoxHostStyle } from '../shared/box-schema'
import { boxLayoutStyles } from '../shared/box-styles'

const baseStyles = css`
	:host {
		box-sizing: border-box;
	}
`

/*
 * z-row — z-box with the flow direction locked to a horizontal row. A thin
 * wrapper: every other z-box prop (gap, aligns-x/aligns-y, does-wrap,
 * padding/margin, inset, is-full-width/is-full-height, ...) works the same way.
 */
export const ZRow = c(
	(props) => (
		<host shadowDom direction='horizontal' style={getBoxHostStyle(props)}>
			<slot />
		</host>
	),
	{
		props: directionLockedBoxProps,
		styles: [baseStyles, boxLayoutStyles]
	}
)

defineElement('z-row', ZRow)
