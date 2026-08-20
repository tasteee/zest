import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-type-badge — a monospace pill for one type token.
 *
 *   <z-type-badge value="boolean"></z-type-badge>
 *   <z-type-badge value="'solid' | 'ghost'"></z-type-badge>
 *
 * The category is inferred from the token rather than declared, because an
 * API table has hundreds of these and hand-classifying each one is how a
 * reference drifts. `kind` overrides when the guess is wrong.
 *
 * Colour carries meaning here: scanning a table for "which of these take a
 * fixed set of values" should be a glance, not a read.
 */
const TYPE_KINDS = {
	primitive: 'primitive',
	literal: 'literal',
	union: 'union',
	function: 'function',
	object: 'object'
} as const

const PRIMITIVES = ['string', 'number', 'boolean', 'null', 'undefined', 'any', 'unknown', 'void', 'symbol', 'bigint', 'date']

// Order matters: a union of literals is a union first. Function tests come
// before object so `() => void` is not read as a brace-less object.
const inferKind = (value: string): string => {
	const token = value.trim()

	const isUnion = token.includes('|')
	if (isUnion) return TYPE_KINDS.union

	const isFunction = token.includes('=>') || token.includes('(')
	if (isFunction) return TYPE_KINDS.function

	const isPrimitive = PRIMITIVES.includes(token.toLowerCase())
	if (isPrimitive) return TYPE_KINDS.primitive

	const isQuoted = /^['"].*['"]$/.test(token)
	if (isQuoted) return TYPE_KINDS.literal

	const isObjectish = token.startsWith('{') || token.endsWith('[]') || token.startsWith('Record<')
	if (isObjectish) return TYPE_KINDS.object

	return TYPE_KINDS.literal
}

const styles = css`
	:host {
		display: inline-block;
	}

	:host([is-hidden]) {
		display: none;
	}

	.badge {
		display: inline-block;
		box-sizing: border-box;
		padding: 0.0625rem 0.375rem;
		border: 1px solid var(--type-badge-border, var(--border));
		border-radius: var(--radius-sm);
		background: color-mix(in oklch, var(--type-badge-color, var(--muted-foreground)) 8%, transparent);
		color: var(--type-badge-color, var(--muted-foreground));
		font-family: var(--font-mono);
		font-size: 0.8125em;
		line-height: 1.5;
		white-space: nowrap;
	}

	/* Wrapping is allowed only for the long ones. A union of six values has to
	   be readable; a bare primitive should never break. */
	.badge[data-kind='union'],
	.badge[data-kind='object'],
	.badge[data-kind='function'] {
		white-space: normal;
	}

	.badge[data-kind='primitive'] {
		--type-badge-color: var(--purple);
		--type-badge-border: color-mix(in oklch, var(--purple) 30%, transparent);
	}

	.badge[data-kind='literal'] {
		--type-badge-color: var(--pink);
		--type-badge-border: color-mix(in oklch, var(--pink) 30%, transparent);
	}

	.badge[data-kind='union'] {
		--type-badge-color: var(--foreground);
		--type-badge-border: var(--border);
	}

	.badge[data-kind='function'] {
		--type-badge-color: var(--success);
		--type-badge-border: color-mix(in oklch, var(--success) 30%, transparent);
	}

	.badge[data-kind='object'] {
		--type-badge-color: var(--warning);
		--type-badge-border: color-mix(in oklch, var(--warning) 30%, transparent);
	}
`

export const ZTypeBadge = c(
	(props) => {
		const value = ((props.value as string) || '').trim()
		const resolvedKind = (props.kind as string) || inferKind(value)

		return (
			<host shadowDom>
				<span class='badge' data-kind={resolvedKind}>
					{value}
				</span>
			</host>
		)
	},
	{
		props: {
			value: { type: String, reflect: true },
			kind: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-type-badge', ZTypeBadge)
