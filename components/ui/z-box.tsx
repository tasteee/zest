import * as React from 'react'
import { cn } from '@/lib/utils'
import { prop } from '@/lib/prop'
import './z-box.css'

type ZBoxDirectionPropT = 'isRow' | 'isColumn'
type ZBoxDisplayPropT = 'isFlex' | 'isInline' | 'isBlock' | 'isInlineBlock' | 'isInlineFlex' | 'isGrid' | 'isInlineGrid'
type ZBoxAxisPropT =
	| 'xStart'
	| 'xCenter'
	| 'xEnd'
	| 'xBetween'
	| 'xAround'
	| 'xEvenly'
	| 'xStretch'
	| 'yStart'
	| 'yCenter'
	| 'yEnd'
	| 'yBetween'
	| 'yAround'
	| 'yEvenly'
	| 'yStretch'
	| 'doesWrap'
	| 'doesWrapText'
	| 'isCenteredX'
	| 'isCenteredY'

type ZBoxDirectionT = 'row' | 'column'
type ZBoxSpacingValueT = string | number
type ZBoxLengthValueT = string | number
type ZBoxGridTemplateValueT = string | number
type ZBoxHtmlPropsT = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style' | 'color'>

type ZBoxOwnPropsT = ComponentPropsT &
	ZBoxHtmlPropsT &
	ZeroOrOneTruePropT<ZBoxDirectionPropT> &
	ZeroOrOneTruePropT<ZBoxDisplayPropT> &
	Partial<Record<ZBoxAxisPropT, boolean>> & {
		margin?: ZBoxSpacingValueT
		marginTop?: ZBoxSpacingValueT
		marginRight?: ZBoxSpacingValueT
		marginBottom?: ZBoxSpacingValueT
		marginLeft?: ZBoxSpacingValueT
		marginX?: ZBoxSpacingValueT
		marginY?: ZBoxSpacingValueT
		padding?: ZBoxSpacingValueT
		paddingTop?: ZBoxSpacingValueT
		paddingRight?: ZBoxSpacingValueT
		paddingBottom?: ZBoxSpacingValueT
		paddingLeft?: ZBoxSpacingValueT
		paddingX?: ZBoxSpacingValueT
		paddingY?: ZBoxSpacingValueT
		gap?: ZBoxSpacingValueT
		rowGap?: ZBoxSpacingValueT
		columnGap?: ZBoxSpacingValueT
		columns?: ZBoxGridTemplateValueT
		smallColumns?: ZBoxGridTemplateValueT
		mediumColumns?: ZBoxGridTemplateValueT
		largeColumns?: ZBoxGridTemplateValueT
		extraLargeColumns?: ZBoxGridTemplateValueT
		rows?: ZBoxGridTemplateValueT
		gridTemplateColumns?: string
		gridTemplateRows?: string
		gridAutoColumns?: string
		gridAutoRows?: string
		gridAutoFlow?: string
		gridColumn?: string
		gridRow?: string
		gridColumnStart?: string | number
		gridColumnEnd?: string | number
		gridRowStart?: string | number
		gridRowEnd?: string | number
		justifyItems?: string
		alignContent?: string
		justifySelf?: string
		alignSelf?: string
		width?: ZBoxLengthValueT
		minWidth?: ZBoxLengthValueT
		maxWidth?: ZBoxLengthValueT
		height?: ZBoxLengthValueT
		minHeight?: ZBoxLengthValueT
		maxHeight?: ZBoxLengthValueT
		border?: string
		bg?: string
		background?: string
		color?: string
		borderRadius?: string | number
		borderColor?: string
		borderWidth?: string | number
		outline?: string
		outlineColor?: string
		outlineWidth?: string | number
		outlineOffset?: string | number
		boxShadow?: string
		zIndex?: string | number
		font?: string
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
		alignX?: string
		alignY?: string
		justifyContent?: string
		alignItems?: string
		flexDirection?: string
		flexWrap?: string
	}

type ZBoxPropsT = ZBoxOwnPropsT

type ZBoxComponentT = React.FC<ZBoxPropsT> & {
	row: React.FC<ZBoxPropsT>
	column: React.FC<ZBoxPropsT>
}

type ZBoxStyleVariablesT = React.CSSProperties & {
	'--z-box-margin'?: string
	'--z-box-margin-top'?: string
	'--z-box-margin-right'?: string
	'--z-box-margin-bottom'?: string
	'--z-box-margin-left'?: string
	'--z-box-padding'?: string
	'--z-box-padding-top'?: string
	'--z-box-padding-right'?: string
	'--z-box-padding-bottom'?: string
	'--z-box-padding-left'?: string
	'--z-box-gap'?: string
	'--z-box-row-gap'?: string
	'--z-box-column-gap'?: string
	'--z-box-grid-template-columns'?: string
	'--z-box-small-grid-template-columns'?: string
	'--z-box-medium-grid-template-columns'?: string
	'--z-box-large-grid-template-columns'?: string
	'--z-box-extra-large-grid-template-columns'?: string
	'--z-box-grid-template-rows'?: string
	'--z-box-grid-auto-columns'?: string
	'--z-box-grid-auto-rows'?: string
	'--z-box-grid-auto-flow'?: string
	'--z-box-grid-column'?: string
	'--z-box-grid-row'?: string
	'--z-box-grid-column-start'?: string
	'--z-box-grid-column-end'?: string
	'--z-box-grid-row-start'?: string
	'--z-box-grid-row-end'?: string
	'--z-box-justify-items'?: string
	'--z-box-align-content'?: string
	'--z-box-justify-self'?: string
	'--z-box-align-self'?: string
	'--z-box-width'?: string
	'--z-box-min-width'?: string
	'--z-box-max-width'?: string
	'--z-box-height'?: string
	'--z-box-min-height'?: string
	'--z-box-max-height'?: string
	'--z-box-border'?: string
	'--z-box-background'?: string
	'--z-box-color'?: string
	'--z-box-border-radius'?: string
	'--z-box-border-color'?: string
	'--z-box-border-width'?: string
	'--z-box-outline'?: string
	'--z-box-outline-color'?: string
	'--z-box-outline-width'?: string
	'--z-box-outline-offset'?: string
	'--z-box-box-shadow'?: string
	'--z-box-z-index'?: string
	'--z-box-font-family'?: string
	'--z-box-font-size'?: string
	'--z-box-font-weight'?: string
	'--z-box-line-height'?: string
	'--z-box-font-style'?: string
	'--z-box-font-variant'?: string
	'--z-box-font-stretch'?: string
	'--z-box-text-align'?: string
	'--z-box-text-decoration'?: string
	'--z-box-text-transform'?: string
	'--z-box-text-overflow'?: string
	'--z-box-white-space'?: string
	'--z-box-justify-content'?: string
	'--z-box-align-items'?: string
	'--z-box-flex-direction'?: string
	'--z-box-flex-wrap'?: string
}

const spacingScaleMap: Record<number, string> = {
	0: '0',
	1: 'var(--space-xs)',
	2: 'var(--space-sm)',
	3: 'var(--space-md)',
	4: 'var(--space-base)',
	5: 'var(--space-lg)',
	6: 'var(--space-xl)',
	7: 'var(--space-2xl)',
	8: 'var(--space-3xl)'
}

const CUSTOM_PROPS = [
	'isRow',
	'isColumn',
	'isFlex',
	'isInline',
	'isBlock',
	'isInlineBlock',
	'isInlineFlex',
	'isGrid',
	'isInlineGrid',
	'doesWrap',
	'doesWrapText',
	'xStart',
	'xCenter',
	'xEnd',
	'xBetween',
	'xAround',
	'xEvenly',
	'xStretch',
	'yStart',
	'yCenter',
	'yEnd',
	'yBetween',
	'yAround',
	'yEvenly',
	'yStretch',
	'isCenteredX',
	'isCenteredY',
	'margin',
	'marginTop',
	'marginRight',
	'marginBottom',
	'marginLeft',
	'marginX',
	'marginY',
	'padding',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',
	'paddingX',
	'paddingY',
	'gap',
	'rowGap',
	'columnGap',
	'columns',
	'smallColumns',
	'mediumColumns',
	'largeColumns',
	'extraLargeColumns',
	'rows',
	'gridTemplateColumns',
	'gridTemplateRows',
	'gridAutoColumns',
	'gridAutoRows',
	'gridAutoFlow',
	'gridColumn',
	'gridRow',
	'gridColumnStart',
	'gridColumnEnd',
	'gridRowStart',
	'gridRowEnd',
	'justifyItems',
	'alignContent',
	'justifySelf',
	'alignSelf',
	'width',
	'minWidth',
	'maxWidth',
	'height',
	'minHeight',
	'maxHeight',
	'border',
	'bg',
	'background',
	'color',
	'borderRadius',
	'borderColor',
	'borderWidth',
	'outline',
	'outlineColor',
	'outlineWidth',
	'outlineOffset',
	'boxShadow',
	'zIndex',
	'font',
	'fontSize',
	'fontWeight',
	'lineHeight',
	'fontStyle',
	'fontVariant',
	'fontStretch',
	'textAlign',
	'textDecoration',
	'textTransform',
	'textOverflow',
	'whitespace',
	'alignX',
	'alignY',
	'justifyContent',
	'alignItems',
	'flexDirection',
	'flexWrap',
	'as',
	'className',
	'children',
	'style',
	'testId'
]

const getDirectionClass = prop.classNameSwitch({
	isRow: 'isRow',
	isColumn: 'isColumn',
	default: ''
})

const getDisplayClass = prop.classNameSwitch({
	isInlineGrid: 'isInlineGrid',
	isGrid: 'isGrid',
	isInlineFlex: 'isInlineFlex',
	isFlex: 'isFlex',
	isBlock: 'isBlock',
	isInlineBlock: 'isInlineBlock',
	isInline: 'isInline',
	default: ''
})

const getAxisClasses = prop.classNamesBuilder({
	doesWrap: 'doesWrap',
	doesWrapText: 'doesWrapText',
	xStart: 'xStart',
	xCenter: 'xCenter',
	xEnd: 'xEnd',
	xBetween: 'xBetween',
	xAround: 'xAround',
	xEvenly: 'xEvenly',
	xStretch: 'xStretch',
	yStart: 'yStart',
	yCenter: 'yCenter',
	yEnd: 'yEnd',
	yBetween: 'yBetween',
	yAround: 'yAround',
	yEvenly: 'yEvenly',
	yStretch: 'yStretch',
	isCenteredX: 'xCenter',
	isCenteredY: 'yCenter'
})

const getSplitProps = prop.splitter(CUSTOM_PROPS)

const resolveSpacingValue = (value?: ZBoxSpacingValueT): string | undefined => {
	const isUndefined = value === undefined
	if (isUndefined) return undefined

	const isNumber = typeof value === 'number'
	if (!isNumber) return value

	const scaledValue = spacingScaleMap[value]
	if (scaledValue !== undefined) return scaledValue

	return `calc(var(--space-base) * ${value})`
}

const resolveLengthValue = (value?: ZBoxLengthValueT): string | undefined => {
	const isUndefined = value === undefined
	if (isUndefined) return undefined

	const isNumber = typeof value === 'number'
	if (!isNumber) return value

	return `${value}px`
}

const resolveGridTemplateValue = (value?: ZBoxGridTemplateValueT): string | undefined => {
	const isUndefined = value === undefined
	if (isUndefined) return undefined

	const isNumber = typeof value === 'number'
	if (!isNumber) return value

	return `repeat(${value}, minmax(0, 1fr))`
}

const setVariable = (
	styles: ZBoxStyleVariablesT,
	variableName: keyof ZBoxStyleVariablesT,
	value?: string | number
): void => {
	const isDefined = value !== undefined
	if (!isDefined) return

	const styleRecord = styles as Record<string, string>
	styleRecord[String(variableName)] = String(value)
}

const getStyleVariables = (props: ZBoxPropsT): ZBoxStyleVariablesT => {
	const styleVariables: ZBoxStyleVariablesT = {}

	setVariable(styleVariables, '--z-box-margin', resolveSpacingValue(props.margin))
	setVariable(styleVariables, '--z-box-margin-top', resolveSpacingValue(props.marginTop))
	setVariable(styleVariables, '--z-box-margin-right', resolveSpacingValue(props.marginRight))
	setVariable(styleVariables, '--z-box-margin-bottom', resolveSpacingValue(props.marginBottom))
	setVariable(styleVariables, '--z-box-margin-left', resolveSpacingValue(props.marginLeft))

	const marginXValue = resolveSpacingValue(props.marginX)
	setVariable(styleVariables, '--z-box-margin-left', marginXValue)
	setVariable(styleVariables, '--z-box-margin-right', marginXValue)

	const marginYValue = resolveSpacingValue(props.marginY)
	setVariable(styleVariables, '--z-box-margin-top', marginYValue)
	setVariable(styleVariables, '--z-box-margin-bottom', marginYValue)

	setVariable(styleVariables, '--z-box-padding', resolveSpacingValue(props.padding))
	setVariable(styleVariables, '--z-box-padding-top', resolveSpacingValue(props.paddingTop))
	setVariable(styleVariables, '--z-box-padding-right', resolveSpacingValue(props.paddingRight))
	setVariable(styleVariables, '--z-box-padding-bottom', resolveSpacingValue(props.paddingBottom))
	setVariable(styleVariables, '--z-box-padding-left', resolveSpacingValue(props.paddingLeft))

	const paddingXValue = resolveSpacingValue(props.paddingX)
	setVariable(styleVariables, '--z-box-padding-left', paddingXValue)
	setVariable(styleVariables, '--z-box-padding-right', paddingXValue)

	const paddingYValue = resolveSpacingValue(props.paddingY)
	setVariable(styleVariables, '--z-box-padding-top', paddingYValue)
	setVariable(styleVariables, '--z-box-padding-bottom', paddingYValue)

	setVariable(styleVariables, '--z-box-gap', resolveSpacingValue(props.gap))
	setVariable(styleVariables, '--z-box-row-gap', resolveSpacingValue(props.rowGap))
	setVariable(styleVariables, '--z-box-column-gap', resolveSpacingValue(props.columnGap))
	setVariable(
		styleVariables,
		'--z-box-grid-template-columns',
		props.gridTemplateColumns ?? resolveGridTemplateValue(props.columns)
	)
	setVariable(styleVariables, '--z-box-small-grid-template-columns', resolveGridTemplateValue(props.smallColumns))
	setVariable(styleVariables, '--z-box-medium-grid-template-columns', resolveGridTemplateValue(props.mediumColumns))
	setVariable(styleVariables, '--z-box-large-grid-template-columns', resolveGridTemplateValue(props.largeColumns))
	setVariable(styleVariables, '--z-box-extra-large-grid-template-columns', resolveGridTemplateValue(props.extraLargeColumns))
	setVariable(styleVariables, '--z-box-grid-template-rows', props.gridTemplateRows ?? resolveGridTemplateValue(props.rows))
	setVariable(styleVariables, '--z-box-grid-auto-columns', props.gridAutoColumns)
	setVariable(styleVariables, '--z-box-grid-auto-rows', props.gridAutoRows)
	setVariable(styleVariables, '--z-box-grid-auto-flow', props.gridAutoFlow)
	setVariable(styleVariables, '--z-box-grid-column', props.gridColumn)
	setVariable(styleVariables, '--z-box-grid-row', props.gridRow)
	setVariable(styleVariables, '--z-box-grid-column-start', props.gridColumnStart)
	setVariable(styleVariables, '--z-box-grid-column-end', props.gridColumnEnd)
	setVariable(styleVariables, '--z-box-grid-row-start', props.gridRowStart)
	setVariable(styleVariables, '--z-box-grid-row-end', props.gridRowEnd)
	setVariable(styleVariables, '--z-box-justify-items', props.justifyItems)
	setVariable(styleVariables, '--z-box-align-content', props.alignContent)
	setVariable(styleVariables, '--z-box-justify-self', props.justifySelf)
	setVariable(styleVariables, '--z-box-align-self', props.alignSelf)
	setVariable(styleVariables, '--z-box-width', resolveLengthValue(props.width))
	setVariable(styleVariables, '--z-box-min-width', resolveLengthValue(props.minWidth))
	setVariable(styleVariables, '--z-box-max-width', resolveLengthValue(props.maxWidth))
	setVariable(styleVariables, '--z-box-height', resolveLengthValue(props.height))
	setVariable(styleVariables, '--z-box-min-height', resolveLengthValue(props.minHeight))
	setVariable(styleVariables, '--z-box-max-height', resolveLengthValue(props.maxHeight))
	setVariable(styleVariables, '--z-box-border', props.border)
	setVariable(styleVariables, '--z-box-background', props.bg ?? props.background)
	setVariable(styleVariables, '--z-box-color', props.color)
	setVariable(styleVariables, '--z-box-border-radius', props.borderRadius)
	setVariable(styleVariables, '--z-box-border-color', props.borderColor)
	setVariable(styleVariables, '--z-box-border-width', props.borderWidth)
	setVariable(styleVariables, '--z-box-outline', props.outline)
	setVariable(styleVariables, '--z-box-outline-color', props.outlineColor)
	setVariable(styleVariables, '--z-box-outline-width', props.outlineWidth)
	setVariable(styleVariables, '--z-box-outline-offset', props.outlineOffset)
	setVariable(styleVariables, '--z-box-box-shadow', props.boxShadow)
	setVariable(styleVariables, '--z-box-z-index', props.zIndex)
	setVariable(styleVariables, '--z-box-font-family', props.font)
	setVariable(styleVariables, '--z-box-font-size', props.fontSize)
	setVariable(styleVariables, '--z-box-font-weight', props.fontWeight)
	setVariable(styleVariables, '--z-box-line-height', props.lineHeight)
	setVariable(styleVariables, '--z-box-font-style', props.fontStyle)
	setVariable(styleVariables, '--z-box-font-variant', props.fontVariant)
	setVariable(styleVariables, '--z-box-font-stretch', props.fontStretch)
	setVariable(styleVariables, '--z-box-text-align', props.textAlign)
	setVariable(styleVariables, '--z-box-text-decoration', props.textDecoration)
	setVariable(styleVariables, '--z-box-text-transform', props.textTransform)
	setVariable(styleVariables, '--z-box-text-overflow', props.textOverflow)
	setVariable(styleVariables, '--z-box-white-space', props.whitespace)
	setVariable(styleVariables, '--z-box-justify-content', props.justifyContent ?? props.alignY)
	setVariable(styleVariables, '--z-box-align-items', props.alignItems ?? props.alignX)
	setVariable(styleVariables, '--z-box-flex-direction', props.flexDirection)
	setVariable(styleVariables, '--z-box-flex-wrap', props.flexWrap)

	return {
		...styleVariables,
		...props.style
	}
}

const getRootClassNames = (props: ZBoxPropsT, forcedDirection?: ZBoxDirectionT): string => {
	const directionProps =
		forcedDirection === 'row'
			? { ...props, isRow: true }
			: forcedDirection === 'column'
				? { ...props, isColumn: true }
				: props
	const displayProps = forcedDirection ? { ...directionProps, isFlex: true } : directionProps
	const directionClass = getDirectionClass(directionProps)
	const displayClass = getDisplayClass(displayProps)
	const axisClasses = getAxisClasses(directionProps)

	return cn('z-box', directionClass, displayClass, axisClasses, props.className)
}

const renderBox = (props: ZBoxPropsT, forcedDirection?: ZBoxDirectionT) => {
	const Element = props.as || 'div'
	const [customProps, otherProps] = getSplitProps(props)
	const className = getRootClassNames(props, forcedDirection)
	const styleVariables = getStyleVariables(props)

	return (
		<Element {...otherProps} data-testid={props.testId} className={className} style={styleVariables}>
			{props.children}
		</Element>
	)
}

const ZBoxBase = (props: ZBoxPropsT) => {
	return renderBox(props)
}

const ZBoxRow = (props: ZBoxPropsT) => {
	return renderBox(props, 'row')
}

const ZBoxColumn = (props: ZBoxPropsT) => {
	return renderBox(props, 'column')
}

const ZBox = Object.assign(ZBoxBase, {
	row: ZBoxRow,
	column: ZBoxColumn
}) as ZBoxComponentT

export { ZBox }
export type { ZBoxPropsT, ZBoxOwnPropsT, ZBoxDirectionT }
