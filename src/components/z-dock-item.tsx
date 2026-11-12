import { defineElement } from '../shared/define-element'
import { c, css, event } from 'atomico'

/*
 * z-dock-item, one icon slot inside a z-dock. Its magnification is driven
 * from outside: the parent z-dock tracks the pointer and pushes a
 * `--dock-scale` custom property onto each item directly (see z-dock), and
 * this component just renders `transform: scale(var(--dock-scale))` off of
 * it, the physics live in the parent, the paint lives here.
 */
const styles = css`
	:host {
		display: inline-flex;
		position: relative;
		--dock-scale: 1;
		--dock-size: var(--dock-item-size, 3rem);
		transform: scale(var(--dock-scale));
		transform-origin: bottom center;
		transition: transform var(--motion-fast) var(--ease-enter);
	}

	:host([is-hidden]) {
		display: none;
	}

	.item {
		box-sizing: border-box;
		width: var(--dock-size);
		height: var(--dock-size);
		border-radius: var(--radius-lg);
		background: var(--surface-default);
		border: 1px solid var(--border-default);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary);
		cursor: pointer;
		text-decoration: none;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.item:hover,
	.item:focus-visible {
		border-color: color-mix(in oklch, var(--text-primary) 45%, transparent);
	}

	.item:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	::slotted(*) {
		width: calc(var(--dock-size) * 0.5);
		height: calc(var(--dock-size) * 0.5);
	}

	.tooltip {
		position: absolute;
		bottom: calc(100% + 0.6rem);
		left: 50%;
		transform: translateX(-50%) translateY(4px);
		box-sizing: border-box;
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		color: var(--text-primary);
		font-size: var(--font-size-xs);
		font-family: var(--font-sans);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			transform var(--motion-fast) var(--ease-enter);
	}

	:host(:hover) .tooltip,
	:host(:focus-within) .tooltip {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}

	.active-dot {
		position: absolute;
		bottom: -0.4rem;
		left: 50%;
		transform: translateX(-50%);
		width: 0.25rem;
		height: 0.25rem;
		border-radius: var(--radius-full);
		background: var(--text-primary);
	}

	@media (prefers-reduced-motion: reduce) {
		:host,
		.tooltip {
			transition: none;
		}
	}
`

export const ZDockItem = c(
	(props) => {
		const handleClick = () => props.select()

		return (
			<host shadowDom>
				{props.href ? (
					<a class="item" href={props.href} aria-label={props.label} onclick={handleClick}>
						<slot />
					</a>
				) : (
					<button type="button" class="item" aria-label={props.label} onclick={handleClick}>
						<slot />
					</button>
				)}
				{props.label && (
					<span class="tooltip" role="tooltip">
						{props.label}
					</span>
				)}
				{props.isActive && <span class="active-dot" aria-hidden="true"></span>}
			</host>
		)
	},
	{
		props: {
			label: String,
			href: String,
			isActive: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			select: event({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-dock-item', ZDockItem)
