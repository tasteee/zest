import { c, css } from 'atomico'

const styles = css`
	:host {
		color: var(--foreground);
	}

	:host([is-hidden]) {
		display: none;
	}

	.text {
		margin: 0;
		padding: 0;
		color: inherit;
		font-family: inherit;
		font-style: normal;
		font-weight: 400;
		text-decoration: none;
		text-transform: none;
		box-sizing: border-box;
	}

	/* ---------------------------------------------
	   heading
	--------------------------------------------- */

	.text.is-heading {
		font-weight: 700;
	}

	.text.is-heading.is-xxl {
		font-size: 64px;
		line-height: 72px;
		letter-spacing: -0.96px;
	}

	.text.is-heading.is-xl {
		font-size: 56px;
		line-height: 64px;
		letter-spacing: -0.8px;
	}

	.text.is-heading.is-lg {
		font-size: 48px;
		line-height: 56px;
		letter-spacing: -0.64px;
	}

	.text.is-heading.is-md {
		font-size: 40px;
		line-height: 52px;
		letter-spacing: -0.54px;
	}

	.text.is-heading.is-sm {
		font-size: 32px;
		line-height: 40px;
		letter-spacing: -0.48px;
	}

	.text.is-heading.is-xs {
		font-size: 24px;
		line-height: 32px;
		letter-spacing: -0.1px;
	}

	/* ---------------------------------------------
	   subheading
	--------------------------------------------- */

	.text.is-subheading {
		text-transform: uppercase;
		font-weight: 600;
	}

	.text.is-subheading.is-xl {
		font-size: 20px;
		line-height: 24px;
		letter-spacing: 1.2px;
	}

	.text.is-subheading.is-lg {
		font-size: 18px;
		line-height: 24px;
		letter-spacing: 1.2px;
	}

	.text.is-subheading.is-md {
		font-size: 16px;
		line-height: 20px;
		letter-spacing: 1.2px;
	}

	.text.is-subheading.is-sm {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.8px;
	}

	.text.is-subheading.is-xs {
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.8px;
	}

	/* ---------------------------------------------
	   text / paragraph
	--------------------------------------------- */

	.text.is-text {
		font-weight: 400;
	}

	.text.is-text.is-xxl {
		font-size: 24px;
		line-height: 40px;
		letter-spacing: -0.44px;
	}

	.text.is-text.is-xl {
		font-size: 20px;
		line-height: 32px;
		letter-spacing: -0.32px;
	}

	.text.is-text.is-lg {
		font-size: 18px;
		line-height: 32px;
		letter-spacing: -0.26px;
	}

	.text.is-text.is-md {
		font-size: 16px;
		line-height: 28px;
		letter-spacing: -0.18px;
	}

	.text.is-text.is-sm {
		font-size: 14px;
		line-height: 24px;
		letter-spacing: -0.08px;
	}

	.text.is-text.is-xs {
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0;
	}

	/* ---------------------------------------------
	   label
	--------------------------------------------- */

	.text.is-label {
		font-weight: 500;
	}

	.text.is-label.is-lg {
		font-size: 18px;
		line-height: 24px;
		letter-spacing: -0.24px;
	}

	.text.is-label.is-md {
		font-size: 16px;
		line-height: 24px;
		letter-spacing: -0.18px;
	}

	.text.is-label.is-sm {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: -0.08px;
	}

	.text.is-label.is-xs {
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0;
	}

	/* ---------------------------------------------
	   colors
	--------------------------------------------- */

	.text.is-neutral {
		color: var(--foreground);
	}

	.text.is-primary {
		color: var(--purple);
	}

	.text.is-secondary {
		color: var(--pink);
	}

	.text.is-muted {
		color: var(--muted-foreground);
	}

	/* ---------------------------------------------
	   weight overrides
	--------------------------------------------- */

	.text.is-weight-900 {
		font-weight: 900;
	}

	.text.is-weight-700 {
		font-weight: 700;
	}

	.text.is-weight-600 {
		font-weight: 600;
	}

	.text.is-weight-400 {
		font-weight: 400;
	}

	.text.is-weight-300 {
		font-weight: 300;
	}

	/* ---------------------------------------------
	   decoration overrides
	--------------------------------------------- */

	.text.is-italic {
		font-style: italic;
	}

	.text.is-underlined {
		text-decoration: underline;
	}

	.text.is-strikethrough {
		text-decoration: line-through;
	}

	.text.is-underlined.is-strikethrough {
		text-decoration: underline line-through;
	}
`

const resolveSizeClass = (props: any, fallback: string): string => {
	if (props.size === 'xxl') return 'is-xxl'
	if (props.size === 'xl') return 'is-xl'
	if (props.size === 'lg') return 'is-lg'
	if (props.size === 'md') return 'is-md'
	if (props.size === 'sm') return 'is-sm'
	if (props.size === 'xs') return 'is-xs'
	return fallback
}

const resolveColorClass = (props: any): string => {
	if (props.color === 'primary') return 'is-primary'
	if (props.color === 'secondary') return 'is-secondary'
	if (props.color === 'muted') return 'is-muted'
	return 'is-neutral'
}

const resolveWeightClass = (props: any): string => {
	if (props.weight === '900') return 'is-weight-900'
	if (props.weight === '700') return 'is-weight-700'
	if (props.weight === '600') return 'is-weight-600'
	if (props.weight === '400') return 'is-weight-400'
	if (props.weight === '300') return 'is-weight-300'
	// No explicit weight: emit no override class so each variant keeps its own
	// base weight (heading 700, label 500, text/subheading per their rules).
	// Returning is-weight-400 here previously clobbered the heading weight.
	return ''
}

/*
 * The visual size scale and the semantic heading levels are the same six steps,
 * so the tag is derived straight from `size` (xxl→h1 … xs→h6) rather than
 * carrying a separate `level` prop. When you need the element to diverge from
 * its visual weight — a large-looking h2, say — the `tag` prop overrides.
 */
const SIZE_TO_HEADING_TAG: Record<string, string> = {
	xxl: 'h1',
	xl: 'h2',
	lg: 'h3',
	md: 'h4',
	sm: 'h5',
	xs: 'h6'
}

const resolveHeadingTag = (props: any): string => {
	if (props.tag) return props.tag
	return SIZE_TO_HEADING_TAG[props.size] || 'h4'
}

const resolveTextClass = (props: any, variantClass: string, fallbackSizeClass: string): string => {
	const sizeClass = resolveSizeClass(props, fallbackSizeClass)
	const colorClass = resolveColorClass(props)
	const weightClass = resolveWeightClass(props)

	return ['text', variantClass, sizeClass, colorClass]
		.concat(weightClass ? [weightClass] : [])
		.concat(props.isItalic ? ['is-italic'] : [])
		.concat(props.isUnderlined ? ['is-underlined'] : [])
		.concat(props.isStrikethrough ? ['is-strikethrough'] : [])
		.join(' ')
}

const textProps = {
	size: { type: String, reflect: true },
	color: { type: String, reflect: true },
	weight: { type: String, reflect: true },
	tag: String,
	isHidden: { type: Boolean, reflect: true },
	isItalic: { type: Boolean, reflect: true },
	isUnderlined: { type: Boolean, reflect: true },
	isStrikethrough: { type: Boolean, reflect: true }
}

export const ZHeading = c(
	(props) => {
		const Tag = resolveHeadingTag(props) as any
		const className = resolveTextClass(props, 'is-heading', 'is-md')

		return (
			<host shadowDom>
				<Tag class={className}>
					<slot />
				</Tag>
			</host>
		)
	},
	{
		props: textProps,
		styles
	}
)

export const ZSubheading = c(
	(props) => {
		const Tag = (props.tag || 'p') as any
		const className = resolveTextClass(props, 'is-subheading', 'is-md')

		return (
			<host shadowDom>
				<Tag class={className}>
					<slot />
				</Tag>
			</host>
		)
	},
	{
		props: textProps,
		styles
	}
)

export const ZText = c(
	(props) => {
		const Tag = (props.tag || 'p') as any
		const className = resolveTextClass(props, 'is-text', 'is-md')

		return (
			<host shadowDom>
				<Tag class={className}>
					<slot />
				</Tag>
			</host>
		)
	},
	{
		props: textProps,
		styles
	}
)

export const ZLabel = c(
	(props) => {
		const Tag = (props.tag || 'span') as any
		const className = resolveTextClass(props, 'is-label', 'is-md')

		return (
			<host shadowDom>
				<Tag class={className}>
					<slot />
				</Tag>
			</host>
		)
	},
	{
		props: textProps,
		styles
	}
)

customElements.define('z-heading', ZHeading)
customElements.define('z-subheading', ZSubheading)
customElements.define('z-text', ZText)
customElements.define('z-label', ZLabel)
