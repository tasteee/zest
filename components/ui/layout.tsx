import * as React from 'react'

type LayoutDirectionT = 'row' | 'column'
type LayoutAlignT = 'start' | 'end' | 'center' | 'stretch' | 'baseline'
type LayoutJustifyT = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'

type LayoutOwnPropsT = {
	column?: boolean
	gap?: number | string
	align?: LayoutAlignT
	justify?: LayoutJustifyT
	wrap?: boolean
	fill?: boolean
	fillX?: boolean
	fillY?: boolean
	inline?: boolean
	isCentered?: boolean
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

type LayoutItemOwnPropsT = {
	grow?: boolean | number
	shrink?: number
	basis?: number | string
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

type PolymorphicPropsT<ElementT extends React.ElementType, OwnPropsT> = OwnPropsT & {
	as?: ElementT
} & Omit<React.ComponentPropsWithoutRef<ElementT>, keyof OwnPropsT | 'as'>

type LayoutPropsT<ElementT extends React.ElementType> = PolymorphicPropsT<ElementT, LayoutOwnPropsT>

type LayoutItemPropsT<ElementT extends React.ElementType> = PolymorphicPropsT<ElementT, LayoutItemOwnPropsT>

type LayoutComponentFunctionT = <ElementT extends React.ElementType = 'div'>(
	props: LayoutPropsT<ElementT>
) => React.ReactElement | null

type LayoutItemComponentFunctionT = <ElementT extends React.ElementType = 'div'>(
	props: LayoutItemPropsT<ElementT>
) => React.ReactElement | null

type LayoutComponentT = LayoutComponentFunctionT & {
	Row: LayoutComponentFunctionT
	Column: LayoutComponentFunctionT
	Item: LayoutItemComponentFunctionT
}

const layoutAlignMap: Record<LayoutAlignT, React.CSSProperties['alignItems']> = {
	start: 'flex-start',
	end: 'flex-end',
	center: 'center',
	stretch: 'stretch',
	baseline: 'baseline'
}

const layoutJustifyMap: Record<LayoutJustifyT, React.CSSProperties['justifyContent']> = {
	start: 'flex-start',
	end: 'flex-end',
	center: 'center',
	between: 'space-between',
	around: 'space-around',
	evenly: 'space-evenly'
}

const layoutPropertyNamesToOmit = new Set<string>([
	'as',
	'column',
	'gap',
	'align',
	'justify',
	'wrap',
	'fill',
	'fillX',
	'fillY',
	'inline',
	'isCentered'
])

const layoutItemPropertyNamesToOmit = new Set<string>(['as', 'grow', 'shrink', 'basis'])

const getElementProperties = (
	properties: Record<string, unknown>,
	omittedPropertyNames: Set<string>
): Record<string, unknown> => {
	const elementProperties: Record<string, unknown> = {}
	const propertyNames = Object.keys(properties)

	for (const propertyName of propertyNames) {
		const isOmittedProperty = omittedPropertyNames.has(propertyName)
		if (isOmittedProperty) continue

		elementProperties[propertyName] = properties[propertyName]
	}

	return elementProperties
}

const getLayoutStyle = (properties: LayoutOwnPropsT, forcedDirection?: LayoutDirectionT): React.CSSProperties => {
	const layoutStyle: React.CSSProperties = {}

	const layoutDirection = forcedDirection ?? (properties.column === true ? 'column' : 'row')
	layoutStyle.display = properties.inline === true ? 'inline-flex' : 'flex'
	layoutStyle.flexDirection = layoutDirection

	const hasGap = properties.gap !== undefined
	if (hasGap) {
		layoutStyle.gap = properties.gap
	}

	const shouldWrap = properties.wrap === true
	if (shouldWrap) {
		layoutStyle.flexWrap = 'wrap'
	}

	const isCentered = properties.isCentered === true
	const alignValue = properties.align
	const justifyValue = properties.justify

	const resolvedAlign = alignValue ?? (isCentered ? 'center' : undefined)
	if (resolvedAlign !== undefined) {
		layoutStyle.alignItems = layoutAlignMap[resolvedAlign]
	}

	const resolvedJustify = justifyValue ?? (isCentered ? 'center' : undefined)
	if (resolvedJustify !== undefined) {
		layoutStyle.justifyContent = layoutJustifyMap[resolvedJustify]
	}

	const shouldFillBothAxes = properties.fill === true
	const shouldFillXAxis = properties.fillX === true || shouldFillBothAxes
	const shouldFillYAxis = properties.fillY === true || shouldFillBothAxes

	if (shouldFillXAxis) {
		layoutStyle.width = '100%'
	}

	if (shouldFillYAxis) {
		layoutStyle.height = '100%'
	}

	const inlineStyle = properties.style
	if (inlineStyle !== undefined) {
		return {
			...layoutStyle,
			...inlineStyle
		}
	}

	return layoutStyle
}

const getLayoutItemStyle = (properties: LayoutItemOwnPropsT): React.CSSProperties => {
	const layoutItemStyle: React.CSSProperties = {}

	const growValue = properties.grow
	const shouldApplyBooleanGrow = growValue === true
	const isNumberGrow = typeof growValue === 'number'

	if (shouldApplyBooleanGrow) {
		layoutItemStyle.flexGrow = 1
	}

	if (isNumberGrow) {
		layoutItemStyle.flexGrow = growValue
	}

	const shrinkValue = properties.shrink
	const hasShrinkValue = shrinkValue !== undefined
	if (hasShrinkValue) {
		layoutItemStyle.flexShrink = shrinkValue
	}

	const basisValue = properties.basis
	const hasBasisValue = basisValue !== undefined
	if (hasBasisValue) {
		layoutItemStyle.flexBasis = basisValue
	}

	const inlineStyle = properties.style
	if (inlineStyle !== undefined) {
		return {
			...layoutItemStyle,
			...inlineStyle
		}
	}

	return layoutItemStyle
}

const createLayoutComponent = (forcedDirection?: LayoutDirectionT): LayoutComponentFunctionT => {
	const LayoutComponent = <ElementT extends React.ElementType = 'div'>(
		properties: LayoutPropsT<ElementT>
	): React.ReactElement | null => {
		const elementType = properties.as ?? 'div'
		const Component = elementType as React.ElementType

		const elementProperties = getElementProperties(properties as Record<string, unknown>, layoutPropertyNamesToOmit)

		const layoutStyle = getLayoutStyle(properties, forcedDirection)

		return <Component {...elementProperties} className={properties.className} style={layoutStyle} />
	}

	return LayoutComponent
}

const LayoutItem: LayoutItemComponentFunctionT = <ElementT extends React.ElementType = 'div'>(
	properties: LayoutItemPropsT<ElementT>
): React.ReactElement | null => {
	const elementType = properties.as ?? 'div'
	const Component = elementType as React.ElementType

	const elementProperties = getElementProperties(properties as Record<string, unknown>, layoutItemPropertyNamesToOmit)

	const layoutItemStyle = getLayoutItemStyle(properties)

	return <Component {...elementProperties} className={properties.className} style={layoutItemStyle} />
}

const LayoutBase = createLayoutComponent()
const LayoutRow = createLayoutComponent('row')
const LayoutColumn = createLayoutComponent('column')

const Layout = LayoutBase as LayoutComponentT
Layout.Row = LayoutRow
Layout.Column = LayoutColumn
Layout.Item = LayoutItem

export { Layout }
