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

/*
 * The box family is flex, always. It used to carry seven booleans for one CSS
 * display value — grid, inline-grid, block, inline-block and the rest — which
 * made z-box a general display switch rather than a layout primitive. Grid
 * lives in z-grid, which owns that job properly.
 *
 * What survives is the one modifier that genuinely composes with flex:
 * is-inline upgrades the box to inline-flex.
 */
export const boxBooleanProps = {
	isInline: { type: Boolean, reflect: true },
	doesWrap: { type: Boolean, reflect: true },
	doesWrapText: { type: Boolean, reflect: true },
	isFullWidth: { type: Boolean, reflect: true },
	isFullHeight: { type: Boolean, reflect: true }
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
	direction: { type: String, reflect: true },
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

/* z-row/z-column expose every box prop except direction — their own tag name
 * already fixes the flow, so reflecting a redundant (or contradictory)
 * direction attribute would just be confusing. */
export const directionLockedBoxProps = omitProps(boxProps, ['direction'])

type BoxHostPropsT = { [K in keyof typeof boxValueProps]?: string }

/*
 * z-box is the generic flex primitive. `aligns-x`/`aligns-y` are always the
 * horizontal/vertical relationship regardless of flow direction, so they swap
 * which axis they drive: in a horizontal box aligns-x is the main axis, in a
 * vertical box it's the cross axis. z-row/z-column are thin wrappers that lock
 * the direction.
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

	// aligns-x is always horizontal and aligns-y always vertical, so which one
	// drives the main axis flips with the flow direction.
	const isHorizontal = props.direction !== 'vertical'
	const mainAxisAlign = isHorizontal ? props.alignsX : props.alignsY
	const crossAxisAlign = isHorizontal ? props.alignsY : props.alignsX

	set('--z-box-justify', resolveJustify(mainAxisAlign))
	set('--z-box-align', resolveAlign(crossAxisAlign))

	return style
}
