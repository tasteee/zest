import { css } from 'atomico'

/*
 * Shared chrome for the text-editor floating family (selection toolbar, slash
 * menu, mention popover, bubble menu, table toolbar, drag/table handles).
 * These don't ride the Popover API like z-popover/z-menu, they need a
 * fade-only exit distinct from the fade+rise entrance (spec: enter 120ms
 * ease-out with a 4px rise, exit 80ms fade only, no position change), which
 * the Popover API's discrete show/hide doesn't give us for free. Instead each
 * component is a persistent singleton (same shape as z-toaster) positioned via
 * shared/overlay.ts, and drives these three classes from useVisibilityPhase
 * (shared/transition.ts):
 *
 *  - .surface            base: invisible, resting 4px below its open position
 *  - .surface.is-open     entrance: fades + rises in over 120ms ease-out
 *  - .surface.is-closing  exit: fades in place over 80ms, no transform change
 *
 * Floating, so it takes the same elevation as every overlay: a hairline border on
 * --surface-overlay plus --shadow-overlay.
 */
export const floatingSurfaceStyles = css`
	.surface {
		position: fixed;
		left: 0; /* physical: shared/overlay.ts positions from measured rects */
		top: 0;
		margin: 0;
		box-sizing: border-box;
		background: var(--surface-overlay);
		color: var(--text-primary);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		opacity: 0;
		transform: translateY(4px);
		pointer-events: none;
	}

	.surface.is-open {
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			transform var(--motion-fast) var(--ease-enter);
		pointer-events: auto;
	}

	.surface.is-closing {
		opacity: 0;
		transform: translateY(0);
		transition: opacity var(--motion-instant) var(--ease-enter);
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.surface,
		.surface.is-open,
		.surface.is-closing {
			transition: none;
		}
	}
`

/* A pill-shaped toolbar strip, selection toolbar, bubble menu, table toolbar. */
export const floatingToolbarStyles = css`
	.surface {
		z-index: var(--z-toolbar, 40);
		display: flex;
		align-items: center;
		gap: 1px;
		padding: var(--space-1);
	}
`

/* A vertical listbox/menu panel, slash menu, mention popover. */
export const floatingMenuStyles = css`
	.surface {
		z-index: var(--z-menu, 50);
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-width: 14rem;
		max-width: 20rem;
		max-height: 18rem;
		overflow-y: auto;
		padding: var(--space-1-5);
	}
`

/* Shared row chrome for menu-style items (slash menu, mention popover),
 * mirrors z-menu.tsx's .item/.is-active/.is-disabled language exactly. */
export const floatingMenuItemStyles = css`
	.item {
		display: flex;
		align-items: center;
		gap: var(--space-2-5);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		cursor: pointer;
		user-select: none;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: start;
		width: 100%;
		box-sizing: border-box;
	}

	.item.is-active {
		background: color-mix(in oklch, var(--tone, var(--accent-primary)) 14%, transparent);
		color: var(--tone, var(--accent-primary));
	}

	.item.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.item .icon {
		display: inline-flex;
		width: 1.125rem;
		height: 1.125rem;
		flex-shrink: 0;
		color: var(--text-secondary);
	}

	.item .label {
		flex: 1;
		min-width: 0;
	}

	.item .description {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
	}

	.empty {
		padding: var(--space-3);
		text-align: center;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
	}
`

/* A small icon-only button, toolbar actions, gutter/drag handle grips. */
export const floatingIconButtonStyles = css`
	.icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		flex-shrink: 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.icon-button:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
	}

	.icon-button.is-active {
		color: var(--tone, var(--accent-primary));
		background: color-mix(in oklch, var(--tone, var(--accent-primary)) 14%, transparent);
	}

	.icon-button:disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.icon-button svg {
		width: 1.125rem;
		height: 1.125rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.sep {
		width: 1px;
		align-self: stretch;
		margin: var(--space-1) var(--space-0-5);
		background: var(--border-default);
	}
`
