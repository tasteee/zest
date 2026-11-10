import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { baseStyles, padVarNames, resetInheritedVars, insetProps, insetVars, resolveRadius } from '../shared/layout-schema'

/*
 * z-surface, a themed container panel. `level` is the everyday path: a neutral
 * elevation stepped from the theme ramp (0 = page base … 3 = overlay). For
 * accented surfaces, `tone` picks the colour family and `kind` the treatment
 * (solid / soft / outline / ghost / plain) layered on top of it. `radius` and
 * `inset` are tokenized; `is-bordered`, `is-elevated` and `is-interactive` are
 * explicit toggles. Tone drives a single `--tone` custom property that the
 * kinds compose against (same pattern as z-badge).
 */
const styles = css`
	:host {
		display: block;
		--tone: var(--text-secondary);
		background: transparent;
		color: var(--text-primary);
		border: 1px solid transparent;
		border-radius: var(--z-surface-radius, var(--radius-lg));
		padding-top: var(--z-surface-pad-top, var(--space-3));
		padding-bottom: var(--z-surface-pad-bottom, var(--space-3));
		padding-inline-start: var(--z-surface-pad-left, var(--space-3));
		padding-inline-end: var(--z-surface-pad-right, var(--space-3));
	}

	:host([is-full-width]) {
		width: 100%;
	}

	/* tones set --tone */
	:host([tone='primary']) {
		--tone: var(--text-secondary);
	}
	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}
	:host([tone='success']) {
		--tone: var(--status-success);
	}
	:host([tone='warning']) {
		--tone: var(--status-warning);
	}
	:host([tone='danger']) {
		--tone: var(--status-danger);
	}

	/* kinds compose the tone */
	:host([kind='plain']) {
		background: var(--surface-subtle);
	}
	:host([kind='solid']) {
		background: var(--tone);
		color: var(--on-accent);
	}
	/* purple/pink fills are light; dark text reads better on them */
	:host([kind='solid'][tone='secondary']),
	:host([kind='solid'][tone='tertiary']) {
		color: var(--text-primary);
	}
	/* Tone tints are mixed with transparent, NOT the background: the neutral
	   background carries a faint green hue, and interpolating hue against it in
	   oklch drags the result around the colour wheel (purple → olive). Mixing
	   with transparent keeps the tone's hue and just lowers its alpha, the same
	   approach z-badge uses. */
	:host([kind='soft']) {
		background: color-mix(in oklch, var(--tone) 16%, transparent);
	}
	:host([kind='outline']) {
		background: transparent;
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border-default));
	}
	:host([kind='ghost']) {
		background: transparent;
		border-color: transparent;
	}

	/* Neutral elevation levels, stepped straight from the theme's neutral ramp
	   (level 0 = page base … 3 = overlay). The everyday way to reach for a
	   surface, layering UI without touching tone/kind. Each gets a hairline
	   so it reads on its own. */
	:host([level]) {
		border-color: var(--border-default);
	}
	:host([level='0']) {
		background: var(--surface-page);
	}
	:host([level='1']) {
		background: var(--surface-default);
	}
	:host([level='2']) {
		background: var(--surface-subtle);
	}
	:host([level='3']) {
		background: var(--surface-strong);
	}

	/* explicit toggles */
	:host([is-bordered]) {
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border-default));
	}
	/* Resting elevation is a surface step plus a hairline ring, never a shadow;
	   only floating overlays take one. */
	:host([is-elevated]) {
		background: var(--surface-subtle);
		border-color: color-mix(in srgb, var(--tone) 30%, var(--border-default));
	}
	:host([is-interactive]) {
		cursor: pointer;
		transition: border-color var(--motion-fast) var(--ease-enter);
	}
	:host([is-interactive]:hover),
	:host([is-interactive]:focus-within) {
		border-color: color-mix(in oklch, var(--text-primary) 40%, transparent);
	}
`

const getHostStyle = (props: { radius?: string } & Parameters<typeof insetVars>[0]): Record<string, string> => {
	const style: Record<string, string> = { ...insetVars(props, '--z-surface') }
	const radius = resolveRadius(props.radius)
	if (radius) style['--z-surface-radius'] = radius
	return style
}

export const ZSurface = c(
	(props) => (
		<host shadowDom style={getHostStyle(props)}>
			<slot />
		</host>
	),
	{
		props: {
			level: { type: oneOf('0', '1', '2', '3'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			kind: { type: oneOf('solid', 'soft', 'outline', 'ghost', 'plain'), reflect: true },
			radius: String,
			isBordered: { type: Boolean, reflect: true },
			isElevated: { type: Boolean, reflect: true },
			isInteractive: { type: Boolean, reflect: true },
			isFullWidth: { type: Boolean, reflect: true },
			...insetProps
		},
		styles: [baseStyles, resetInheritedVars([...padVarNames('--z-surface'), '--z-surface-radius']), styles]
	}
)

defineElement('z-surface', ZSurface)
