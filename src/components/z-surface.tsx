import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'
import { baseStyles, resolveRadius } from '../shared/layout-schema'

/*
 * z-surface — a neutral themed container panel. `level` steps through the
 * theme's surface ramp (0 = page base … 3 = overlay); `kind` chooses a plain,
 * filled, soft, outlined, or ghost treatment. Radius stays tokenized, and the
 * optional `interactive` state adds hover/focus feedback without elevation.
 */
const styles = css`
	:host {
		display: block;
		background: transparent;
		color: var(--foreground);
		border: 1px solid transparent;
		border-radius: var(--z-surface-radius, var(--radius-lg));
		padding: var(--space-md);
	}

	:host([is-full-width]) {
		width: 100%;
	}

	/* Neutral variants define the surface treatment. */
	:host([kind='plain']) {
		background: var(--background-light);
	}
	:host([kind='filled']) {
		background: var(--color-neutral-3);
		color: var(--foreground);
	}
	:host([kind='soft']) {
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
	}
	:host([kind='outline']) {
		background: transparent;
		border-color: var(--border);
	}
	:host([kind='ghost']) {
		background: transparent;
		border-color: transparent;
	}

	/* Neutral surface levels, stepped straight from the theme's neutral ramp
	   (level 0 = page base … 3 = overlay). The everyday way to layer UI without
	   selecting a separate kind. Each gets a hairline so it reads on its own. */
	:host([level]) {
		border-color: var(--border);
	}
	:host([level='0']) {
		background: var(--color-neutral-0);
	}
	:host([level='1']) {
		background: var(--color-neutral-1);
	}
	:host([level='2']) {
		background: var(--color-neutral-2);
	}
	:host([level='3']) {
		background: var(--color-neutral-3);
	}

	:host([interactive]) {
		cursor: pointer;
		transition: border-color var(--duration-fast) var(--easing-standard);
	}
	:host([interactive]:hover),
	:host([interactive]:focus-within) {
		border-color: color-mix(in oklch, var(--foreground) 40%, transparent);
	}
`

const getHostStyle = (props: { radius?: string }): Record<string, string> => {
	const style: Record<string, string> = {}
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
			level: { type: String, reflect: true },
			kind: { type: String, reflect: true },
			radius: String,
			interactive: { type: Boolean, reflect: true },
			isFullWidth: { type: Boolean, reflect: true },
		},
		styles: [baseStyles, styles]
	}
)

defineElement('z-surface', ZSurface)
