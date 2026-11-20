import { css } from 'atomico'

/*
 * The one chip. z-chip renders it as a toggle, z-tag-input renders it
 * as a removable token, and both read these rules, so a chip looks the
 * same wherever it appears.
 *
 * Group-level variants travel by inheritance. z-chip-group sets the
 * --z-chip-* properties below on itself; they cross into every slotted
 * chip's shadow root. A chip with its own tone, size or kind gets a
 * class that sets the value directly, which wins over the inherited one.
 *
 *   --z-chip-accent        the tone
 *   --z-chip-height        md 2rem
 *   --z-chip-padding       inline padding
 *   --z-chip-font-size
 *   --z-chip-rest-bg       resting fill (soft kind tints it)
 *   --z-chip-rest-border   resting border
 */
export const chipStyles = css`
	.chip {
		--tone: var(--z-chip-accent, var(--accent-primary));
		--chip-height: var(--z-chip-height, 2rem);
		--chip-padding: var(--z-chip-padding, var(--space-3));
		--chip-font-size: var(--z-chip-font-size, var(--font-size-sm));
		--chip-rest-bg: var(--z-chip-rest-bg, transparent);
		--chip-rest-border: var(--z-chip-rest-border, var(--border-default));

		position: relative;
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
		box-sizing: border-box;
		height: var(--chip-height);
		max-width: 100%;
		padding-inline: var(--chip-padding);
		border: 1px solid var(--chip-rest-border);
		border-radius: var(--radius-full);
		background: var(--chip-rest-bg);
		color: var(--text-primary);
		font-family: inherit;
		font-size: var(--chip-font-size);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-none);
		white-space: nowrap;
		user-select: none;
		-webkit-user-select: none;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
	}

	/* Own size, tone and kind win over what a group passes down. */
	.chip.is-sm {
		--chip-height: 1.5rem;
		--chip-padding: var(--space-2-5);
		--chip-font-size: var(--font-size-xs);
	}
	.chip.is-md {
		--chip-height: 2rem;
		--chip-padding: var(--space-3);
		--chip-font-size: var(--font-size-sm);
	}
	.chip.is-lg {
		--chip-height: 2.5rem;
		--chip-padding: var(--space-4);
		--chip-font-size: var(--font-size-md);
	}

	.chip.is-primary { --tone: var(--accent-primary); }
	.chip.is-secondary { --tone: var(--accent-secondary); }
	.chip.is-tertiary { --tone: var(--accent-tertiary); }
	.chip.is-success { --tone: var(--status-success); }
	.chip.is-warning { --tone: var(--status-warning); }
	.chip.is-danger { --tone: var(--status-danger); }

	.chip.is-outline {
		--chip-rest-bg: transparent;
		--chip-rest-border: var(--border-default);
	}
	.chip.is-soft {
		--chip-rest-bg: var(--surface-subtle);
		--chip-rest-border: transparent;
	}

	.chip.is-interactive {
		cursor: pointer;
	}
	.chip.is-interactive:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
		background: color-mix(in oklch, var(--text-primary) 5%, var(--chip-rest-bg));
	}

	/* Selected: a tint of the tone, a tone border, and a check that grows in. */
	.chip.is-selected,
	.chip.is-selected.is-interactive:hover {
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		border-color: color-mix(in oklch, var(--tone) 55%, transparent);
		color: color-mix(in oklab, var(--tone) 70%, var(--text-strong));
	}

	.chip.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.chip:has(.main:focus-visible),
	.chip:has(.token:focus-visible) {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	/* The main hit area fills the pill, so the whole chip is clickable. */
	.main {
		all: unset;
		position: absolute;
		inset: 0;
		border-radius: inherit;
		cursor: inherit;
	}

	.content {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
		min-width: 0;
		pointer-events: none;
	}

	.label {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.check {
		display: inline-flex;
		width: 0;
		height: 0.875em;
		margin-inline-end: calc(var(--space-1-5) * -1);
		overflow: hidden;
		opacity: 0;
		transition:
			width var(--motion-fast) var(--ease-enter),
			margin var(--motion-fast) var(--ease-enter),
			opacity var(--motion-fast) var(--ease-enter);
	}
	.chip.is-selected .check {
		width: 0.875em;
		margin-inline-end: 0;
		opacity: 1;
	}
	.check svg {
		width: 0.875em;
		height: 0.875em;
		flex-shrink: 0;
		fill: none;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.remove {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.125em;
		height: 1.125em;
		margin-inline-end: calc(var(--space-1) * -1);
		padding: 0;
		border: none;
		border-radius: var(--radius-full);
		background: transparent;
		color: currentColor;
		cursor: pointer;
		opacity: 0.6;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}
	.remove:hover,
	.remove:focus-visible {
		opacity: 1;
		background: color-mix(in oklch, var(--text-primary) 16%, transparent);
	}
	.remove:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
	.remove svg {
		width: 0.625em;
		height: 0.625em;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
	}
`

export const resolveChipSizeClass = (size?: string): string => {
	if (size === 'sm') return 'is-sm'
	if (size === 'md') return 'is-md'
	if (size === 'lg') return 'is-lg'
	return ''
}

export const resolveChipToneClass = (tone?: string): string => {
	if (!tone) return ''
	return `is-${tone}`
}

export const resolveChipKindClass = (kind?: string): string => {
	if (kind === 'soft') return 'is-soft'
	if (kind === 'outline') return 'is-outline'
	return ''
}

export const CheckIcon = () => (
	<span class="check" aria-hidden="true">
		<svg viewBox="0 0 24 24">
			<polyline points="4 12 10 18 20 6" />
		</svg>
	</span>
)

export const RemoveIcon = () => (
	<svg viewBox="0 0 12 12" aria-hidden="true">
		<path d="M3 3l6 6M9 3l-6 6" />
	</svg>
)
