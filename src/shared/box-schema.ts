import { coerceSize, insetProps, resolveAlign, resolveGridAlign, resolveJustify, resolveSize } from './layout-schema'

const isPureNumber = (value: string): boolean => /^-?\d+$/.test(value)

const resolveLengthValue = (value?: string): string | undefined => {
	if (value == null || value === '') return undefined
	return isPureNumber(value) ? `${value}px` : value
}

const resolveGridTemplateValue = (value?: string): string | undefined => {
	if (value == null || value === '') return undefined
	return isPureNumber(value) ? `repeat(${value}, minmax(0, 1fr))` : value
}

export const boxBooleanProps = {
	isRow: { type: Boolean, reflect: true },
	isColumn: { type: Boolean, reflect: true },
	isFlex: { type: Boolean, reflect: true },
	isInlineFlex: { type: Boolean, reflect: true },
	isGrid: { type: Boolean, reflect: true },
	isInlineGrid: { type: Boolean, reflect: true },
	isBlock: { type: Boolean, reflect: true },
	isInlineBlock: { type: Boolean, reflect: true },
	isInline: { type: Boolean, reflect: true },
	wrap: { type: Boolean, reflect: true },
	doesWrapText: { type: Boolean, reflect: true },
	fullWidth: { type: Boolean, reflect: true },
	fullHeight: { type: Boolean, reflect: true }
} as const

export const boxValueProps = {
	gap: String,
	rowGap: String,
	columnGap: String,
	margin: String,
	marginTop: String,
	marginRight: String,
	marginBottom: String,
	marginLeft: String,
	marginX: String,
	marginY: String,
	padding: String,
	paddingTop: String,
	paddingRight: String,
	paddingBottom: String,
	paddingLeft: String,
	paddingX: String,
	paddingY: String,
	width: String,
	minWidth: String,
	maxWidth: String,
	height: String,
	minHeight: String,
	maxHeight: String,
	columns: String,
	rows: String,
	smallColumns: String,
	mediumColumns: String,
	largeColumns: String,
	extraLargeColumns: String,
	alignsX: String,
	alignsY: String,
	...insetProps
} as const

export const boxProps = { ...boxBooleanProps, ...boxValueProps }

const omitProps = (source: Record<string, unknown>, keys: string[]): Record<string, unknown> => {
	const result: Record<string, unknown> = {}
	for (const key of Object.keys(source)) {
		if (!keys.includes(key)) result[key] = source[key]
	}
	return result
}

/* z-row/z-column expose every box prop except is-row/is-column — their own
 * tag name already fixes the flow direction, so reflecting a redundant
 * (or contradictory) direction attribute would just be confusing. */
export const directionLockedBoxProps = omitProps(boxProps, ['isRow', 'isColumn'])

type BoxHostPropsT = { [K in keyof typeof boxValueProps]?: string } & {
	isRow?: boolean
	isColumn?: boolean
	isGrid?: boolean
	isInlineGrid?: boolean
}

/*
 * z-box is the one generic layout primitive: flex (the default), grid, or
 * block, picked with is-flex/is-grid/is-block etc. `aligns-x`/`aligns-y` are
 * always the horizontal/vertical relationship regardless of flow direction —
 * in flex mode they map to justify-content/align-items (swapped onto the
 * cross axis when is-column is set); in grid mode they map to
 * justify-items/align-items instead (grid alignment is per-cell, so there's
 * no axis swap). z-row/z-column are thin wrappers that just lock is-row/
 * is-column.
 */
export const getBoxHostStyle = (props: BoxHostPropsT): Record<string, string> => {
	const style: Record<string, string> = {}

	const set = (variable: string, value?: string) => {
		if (value !== undefined) style[variable] = value
	}

	// inset is a padding default; the explicit padding/paddingX/paddingY/
	// paddingTop... props below are computed after, so they win when both are set.
	const insetAll = resolveSize(props.inset)
	const insetX = resolveSize(props.insetX)
	const insetY = resolveSize(props.insetY)
	set('--z-box-padding-top', insetY ?? insetAll)
	set('--z-box-padding-bottom', insetY ?? insetAll)
	set('--z-box-padding-left', insetX ?? insetAll)
	set('--z-box-padding-right', insetX ?? insetAll)

	set('--z-box-gap', coerceSize(props.gap))
	set('--z-box-row-gap', coerceSize(props.rowGap))
	set('--z-box-column-gap', coerceSize(props.columnGap))

	set('--z-box-margin', coerceSize(props.margin))
	set('--z-box-margin-top', coerceSize(props.marginTop))
	set('--z-box-margin-right', coerceSize(props.marginRight))
	set('--z-box-margin-bottom', coerceSize(props.marginBottom))
	set('--z-box-margin-left', coerceSize(props.marginLeft))

	const marginX = coerceSize(props.marginX)
	set('--z-box-margin-left', marginX)
	set('--z-box-margin-right', marginX)

	const marginY = coerceSize(props.marginY)
	set('--z-box-margin-top', marginY)
	set('--z-box-margin-bottom', marginY)

	set('--z-box-padding', coerceSize(props.padding))
	set('--z-box-padding-top', coerceSize(props.paddingTop))
	set('--z-box-padding-right', coerceSize(props.paddingRight))
	set('--z-box-padding-bottom', coerceSize(props.paddingBottom))
	set('--z-box-padding-left', coerceSize(props.paddingLeft))

	const paddingX = coerceSize(props.paddingX)
	set('--z-box-padding-left', paddingX)
	set('--z-box-padding-right', paddingX)

	const paddingY = coerceSize(props.paddingY)
	set('--z-box-padding-top', paddingY)
	set('--z-box-padding-bottom', paddingY)

	set('--z-box-width', resolveLengthValue(props.width))
	set('--z-box-min-width', resolveLengthValue(props.minWidth))
	set('--z-box-max-width', resolveLengthValue(props.maxWidth))
	set('--z-box-height', resolveLengthValue(props.height))
	set('--z-box-min-height', resolveLengthValue(props.minHeight))
	set('--z-box-max-height', resolveLengthValue(props.maxHeight))

	set('--z-box-grid-template-columns', resolveGridTemplateValue(props.columns))
	set('--z-box-grid-template-rows', resolveGridTemplateValue(props.rows))
	set('--z-box-small-grid-template-columns', resolveGridTemplateValue(props.smallColumns))
	set('--z-box-medium-grid-template-columns', resolveGridTemplateValue(props.mediumColumns))
	set('--z-box-large-grid-template-columns', resolveGridTemplateValue(props.largeColumns))
	set('--z-box-extra-large-grid-template-columns', resolveGridTemplateValue(props.extraLargeColumns))

	const isGridMode = Boolean(props.isGrid) || Boolean(props.isInlineGrid)
	if (isGridMode) {
		set('--z-box-justify-items', resolveGridAlign(props.alignsX))
		set('--z-box-align-items', resolveGridAlign(props.alignsY))
		return style
	}

	// Flex (the default flow, or explicit is-flex/is-row/is-column): aligns-x is
	// always horizontal and aligns-y always vertical, so they swap which axis
	// they drive depending on flow direction.
	const isRow = !props.isColumn
	const main = isRow ? props.alignsX : props.alignsY
	const cross = isRow ? props.alignsY : props.alignsX
	set('--z-box-justify', resolveJustify(main))
	set('--z-box-align', resolveAlign(cross))

	return style
}
