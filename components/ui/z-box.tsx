// Primitive layout component for applying spacing, backgrounds,
// and borders. A flexible container for building custom layouts.

type ZBoxPropsT = ComponentPropsT & {
	margin?: string | number
	marginTop?: string | number
	marginRight?: string | number
	marginBottom?: string | number
	marginLeft?: string | number
	marginX?: string | number
	marginY?: string | number
	padding?: string | number

	paddingTop?: string | number
	paddingRight?: string | number
	paddingBottom?: string | number
	paddingLeft?: string | number
	paddingX?: string | number
	paddingY?: string | number

	isColumn?: boolean
	isRow?: boolean
	isInline?: boolean
	isFlex?: boolean
	isBlock?: boolean
	isInlineBlock?: boolean
	isInlineFlex?: boolean

	isCenteredX?: boolean
	isCenteredY?: boolean

	flexDirection?: string
	justifyContent?: string
	alignItems?: string
	alignContent?: string
	flexWrap?: string
	alignX?: string // when row, justifyContent; when column, alignItems
	alignY?: string // when row, alignItems; when column, justifyContent
	gap?: string | number

	background?: string
	color?: string

	font?: string // "DM Sans", "Inter", etc.
	fontSize?: string | number
	fontWeight?: string | number
	lineHeight?: string | number
	fontStyle?: string
	fontVariant?: string
	fontStretch?: string
	textAlign?: string
	textDecoration?: string
	textTransform?: string
	textOverflow?: string

	whitespace?: string
	doesWrapText?: boolean // alias for whitespace

	border?: string
	borderColor?: string
	borderWidth?: string | number
	borderRadius?: string | number

	outline?: string
	outlineColor?: string
	outlineWidth?: string | number
	outlineOffset?: string | number

	boxShadow?: string
	zIndex?: string | number
}

export const ZBox = (props: ZBoxPropsT) => {
	const Element = props.as || 'div'
	const margin = getMarginStyles(props)
	const textStyles = getTextStyles(props)
	const displayStyles = getDisplayStyles(props)
	const padding = getPaddingStyles(props)
	const other = getOtherStyles(props)

	const styles = {
		...margin,
		...textStyles,
		...displayStyles,
		...padding,
		...other,
		...props.style
	}

	return (
		<Element data-testid={props.testId} className={props.className} style={styles}>
			{props.children}
		</Element>
	)
}

// get final padding styles.
const getPaddingStyles = (props: ZBoxPropsT) => {
	const paddingStyles = {} as any

	if (props.padding) paddingStyles.padding = props.padding
	if (props.paddingTop) paddingStyles.paddingTop = props.paddingTop
	if (props.paddingRight) paddingStyles.paddingRight = props.paddingRight
	if (props.paddingBottom) paddingStyles.paddingBottom = props.paddingBottom
	if (props.paddingLeft) paddingStyles.paddingLeft = props.paddingLeft

	if (props.paddingX) {
		paddingStyles.paddingLeft = props.paddingX
		paddingStyles.paddingRight = props.paddingX
	}

	if (props.paddingY) {
		paddingStyles.paddingTop = props.paddingY
		paddingStyles.paddingBottom = props.paddingY
	}

	return paddingStyles
}

// get final margin styles.
const getMarginStyles = (props: ZBoxPropsT) => {
	const marginStyles = {} as any

	if (props.margin) marginStyles.margin = props.margin
	if (props.marginTop) marginStyles.marginTop = props.marginTop
	if (props.marginRight) marginStyles.marginRight = props.marginRight
	if (props.marginBottom) marginStyles.marginBottom = props.marginBottom
	if (props.marginLeft) marginStyles.marginLeft = props.marginLeft

	if (props.marginX) {
		marginStyles.marginLeft = props.marginX
		marginStyles.marginRight = props.marginX
	}

	if (props.marginY) {
		marginStyles.marginTop = props.marginY
		marginStyles.marginBottom = props.marginY
	}

	return marginStyles
}

// get final text styles.
const getTextStyles = (props: ZBoxPropsT) => {
	const textStyles = {} as any

	if (props.textAlign) textStyles.textAlign = props.textAlign
	if (props.textDecoration) textStyles.textDecoration = props.textDecoration
	if (props.textTransform) textStyles.textTransform = props.textTransform
	if (props.textOverflow) textStyles.textOverflow = props.textOverflow

	return textStyles
}

const getDisplayStyles = (props: ZBoxPropsT) => {
	const flexStyles = {} as any

	if (props.isFlex) {
		if (props.isColumn) flexStyles.flexDirection = 'column'
		if (props.isRow) flexStyles.flexDirection = 'row'
		if (props.gap) flexStyles.gap = props.gap

		if (props.isInline) flexStyles.display = 'inline-flex'
		else if (props.isInlineFlex) flexStyles.display = 'inline-flex'
		else flexStyles.display = 'flex'

		if (props.isColumn) {
			if (props.alignX === 'center') flexStyles.alignItems = 'center'
			if (props.alignY === 'center') flexStyles.justifyContent = 'center'
		}

		if (props.alignX) {
			if (props.isColumn) flexStyles.alignItems = props.alignX
			if (props.isRow) flexStyles.justifyContent = props.alignX
		}

		if (props.alignY) {
			if (props.isColumn) flexStyles.justifyContent = props.alignY
			if (props.isRow) flexStyles.alignItems = props.alignY
		}
	}

	if (props.isBlock) flexStyles.display = 'block'
	if (props.isInlineBlock) flexStyles.display = 'inline-block'

	return flexStyles
}

const getOtherStyles = (props: ZBoxPropsT) => {
	const borderStyles = {} as any

	if (props.border) borderStyles.border = props.border
	if (props.borderColor) borderStyles.borderColor = props.borderColor
	if (props.borderWidth) borderStyles.borderWidth = props.borderWidth
	if (props.borderRadius) borderStyles.borderRadius = props.borderRadius
	if (props.outline) borderStyles.outline = props.outline
	if (props.outlineColor) borderStyles.outlineColor = props.outlineColor
	if (props.outlineWidth) borderStyles.outlineWidth = props.outlineWidth
	if (props.outlineOffset) borderStyles.outlineOffset = props.outlineOffset
	if (props.boxShadow) borderStyles.boxShadow = props.boxShadow
	if (props.zIndex) borderStyles.zIndex = props.zIndex

	return borderStyles
}
