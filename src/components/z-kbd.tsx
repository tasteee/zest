import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-kbd, a single keyboard key cap for documenting shortcuts (⌘, Ctrl, Enter,
 * ↑). Renders a bordered, mono-font box with a subtle raised edge so it reads as
 * a physical key. Label comes from the `label` prop or the default slot. Five
 * sizes (xs → xl); the medium default matches inline body text. Combine several
 * with plain "+" text between them for a chord: ⌘ + ⇧ + K.
 */
const styles = css`
	:host {
		display: inline-flex;
		vertical-align: middle;
	}

	:host([is-hidden]) {
		display: none;
	}

	.kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		font-family: var(--font-mono);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-none);
		white-space: nowrap;
		color: var(--text-primary);
		background: color-mix(in oklch, var(--surface-subtle) 70%, transparent);
		border: 1px solid var(--border-default);
		/* the keycap edge: a thicker bottom border, no shadow */
		border-bottom-width: 2px;
		border-radius: var(--radius-sm);
	}

	/* sizes, height, padding and font-size scale together */
	.kbd.is-xs {
		min-width: 1.25rem;
		height: 1.25rem;
		padding-inline: var(--space-1-5);
		font-size: var(--font-size-2xs);
	}
	.kbd.is-sm {
		min-width: 1.5rem;
		height: 1.5rem;
		padding-inline: var(--space-1-5);
		font-size: var(--font-size-xs);
	}
	.kbd.is-md {
		min-width: 1.875rem;
		height: 1.875rem;
		padding-inline: var(--space-2);
		font-size: var(--font-size-sm);
	}
	.kbd.is-lg {
		min-width: 2.25rem;
		height: 2.25rem;
		padding-inline: var(--space-2-5);
		font-size: var(--font-size-md);
	}
	.kbd.is-xl {
		min-width: 2.75rem;
		height: 2.75rem;
		padding-inline: var(--space-3);
		font-size: var(--font-size-md);
	}
`

const resolveSizeClass = (props: any): string => {
	if (props.size === 'xs') return 'is-xs'
	if (props.size === 'sm') return 'is-sm'
	if (props.size === 'lg') return 'is-lg'
	if (props.size === 'xl') return 'is-xl'
	return 'is-md'
}

export const ZKbd = c(
	(props) => {
		const kbdClass = ['kbd', resolveSizeClass(props)].join(' ')

		return (
			<host shadowDom>
				<kbd class={kbdClass}>{props.label ? props.label : <slot />}</kbd>
			</host>
		)
	},
	{
		props: {
			size: { type: oneOf('xs', 'sm', 'md', 'lg', 'xl'), reflect: true },
			label: String,
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-kbd', ZKbd)
