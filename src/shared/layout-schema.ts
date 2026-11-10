import { css } from 'atomico'

/*
 * Shared token resolvers and prop helpers for the layout primitives
 * (z-row, z-column, z-grid, z-center, z-container, z-section, z-surface,
 * z-scroll, z-spacer). Each component computes a handful of CSS custom
 * properties in JS, resolving the design-system size/width/radius tokens and
 * the axis-based alignment model, then consumes them through plain `:host`
 * rules. Same approach as box-schema.ts, kept separate so the new axis API
 * (`aligns-x`/`aligns-y`) doesn't have to live alongside z-box's `x-*`/`y-*`.
 */

/* ZSizeT -> spacing scale. Anchored on the --space-N primitives in tokens.css. */
const sizeScale: Record<string, string> = {
	'0': '0',
	'2xs': 'var(--space-1)',
	xs: 'var(--space-2)',
	sm: 'var(--space-3)',
	md: 'var(--space-4)',
	lg: 'var(--space-6)',
	xl: 'var(--space-8)',
	'2xl': 'var(--space-12)',
	'3xl': 'var(--space-16)',
	'4xl': 'var(--space-24)'
}

/* ZWidthT -> max content widths. Unknown values pass through (e.g. "32rem", "60ch"). */
const widthScale: Record<string, string> = {
	xs: '20rem',
	sm: '30rem',
	md: '48rem',
	lg: '64rem',
	xl: '80rem',
	'2xl': '96rem',
	'3xl': '120rem',
	full: '100%',
	screen: '100vw'
}

/* ZRadiusT -> radius scale. */
const radiusScale: Record<string, string> = {
	none: '0',
	sm: 'var(--radius-sm)',
	md: 'var(--radius-md)',
	lg: 'var(--radius-lg)',
	xl: 'var(--radius-xl)',
	'2xl': 'calc(var(--radius) + 8px)',
	full: '9999px'
}

/* ZAxisDistributeT -> justify-content / justify-items values. */
const distributeMap: Record<string, string> = {
	start: 'flex-start',
	center: 'center',
	end: 'flex-end',
	between: 'space-between',
	around: 'space-around',
	evenly: 'space-evenly',
	stretch: 'stretch'
}

/* Cross-axis alignment. The distribution-only values collapse to stretch since
 * align-items can't space things out. */
const alignMap: Record<string, string> = {
	start: 'flex-start',
	center: 'center',
	end: 'flex-end',
	stretch: 'stretch',
	between: 'stretch',
	around: 'stretch',
	evenly: 'stretch'
}

/* Grid item alignment (justify-items / align-items take grid keywords). */
const gridAlignMap: Record<string, string> = {
	start: 'start',
	center: 'center',
	end: 'end',
	stretch: 'stretch',
	between: 'stretch',
	around: 'stretch',
	evenly: 'stretch'
}

const lookup =
	(table: Record<string, string>, passthrough: boolean) =>
	(value?: string): string | undefined => {
		if (value == null || value === '') return undefined
		return table[value] ?? (passthrough ? value : undefined)
	}

export const resolveSize = lookup(sizeScale, true)
export const resolveWidth = lookup(widthScale, true)
export const resolveRadius = lookup(radiusScale, true)
export const resolveJustify = lookup(distributeMap, false)
export const resolveAlign = lookup(alignMap, false)
export const resolveGridAlign = lookup(gridAlignMap, false)

/*
 * Coerce a size prop (string or number) into a CSS value. Numeric values map
 * to the spacing token variables (e.g. `6` -> `var(--space-6)`). Non-numeric
 * strings are passed through `resolveSize` so tokens ("sm") and lengths
 * ("24px", "1rem") continue to work.
 */
export const coerceSize = (value?: string | number): string | undefined => {
	if (value == null || value === '') return undefined
	if (typeof value === 'number' || /^\d+$/.test(String(value))) {
		const n = typeof value === 'number' ? value : Number(value)
		return `var(--space-${n})`
	}
	return resolveSize(String(value))
}

/* Prop descriptor shared by size-like props (gap, gutter, size).
 * Use this in component `props` blocks: `gap: sizeProp`.
 * The runtime accepts numeric property assignments or numeric strings; the
 * `coerceSize` helper resolves them into spacing tokens or lengths.
 */
export const sizeProp = { type: String } as const

/* Maps the simple start/center/end edge values used by z-center. */
export const resolveEdge = (value?: string): string | undefined => {
	if (value === 'start') return 'flex-start'
	if (value === 'center') return 'center'
	if (value === 'end') return 'flex-end'
	return undefined
}

type InsetPropsT = { inset?: string; insetX?: string; insetY?: string }

/*
 * Resolves inset / inset-x / inset-y into four padding custom properties under
 * the given prefix (e.g. "--z-row" -> "--z-row-pad-top" ...). The axis
 * shortcuts win over the all-sides `inset`.
 */
export const insetVars = (props: InsetPropsT, prefix: string): Record<string, string> => {
	const all = resolveSize(props.inset)
	const x = resolveSize(props.insetX)
	const y = resolveSize(props.insetY)
	const top = y ?? all
	const bottom = y ?? all
	const left = x ?? all
	const right = x ?? all

	const out: Record<string, string> = {}
	if (top) out[`${prefix}-pad-top`] = top
	if (bottom) out[`${prefix}-pad-bottom`] = bottom
	if (left) out[`${prefix}-pad-left`] = left
	if (right) out[`${prefix}-pad-right`] = right
	return out
}

/* The inset / inset-x / inset-y props, shared by most layout primitives. */
export const insetProps = {
	inset: String,
	insetX: String,
	insetY: String
} as const

/* id/class/style/role/aria-* are native global attributes and need no props;
 * `hidden` is native too but :host display rules override it, so each component
 * re-asserts it via baseStyles below. */
/*
 * Custom properties inherit. A layout primitive that reads `--z-row-gap` etc.
 * would otherwise pick up the value an ancestor z-row set, so a nested layout
 * with no gap prop gets its parent's gap and padding. Declaring each variable
 * as `initial` on :host cuts the inheritance: the var() fallbacks apply, and a
 * value set inline from the element's own props still wins.
 */
export const resetInheritedVars = (names: string[]) => {
	const declarations = names.map((name) => name + ': initial;').join(' ')
	return css`
		:host {
			${declarations}
		}
	`
}

export const padVarNames = (prefix: string): string[] => [
	prefix + '-pad-top',
	prefix + '-pad-bottom',
	prefix + '-pad-left',
	prefix + '-pad-right'
]

export const baseStyles = css`
	:host {
		box-sizing: border-box;
	}
	:host([hidden]) {
		display: none !important;
	}
`
