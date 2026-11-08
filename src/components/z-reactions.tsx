import { defineElement } from '../shared/define-element'
import { c, css, event } from 'atomico'

/*
 * z-reactions, the row of emoji-count pills under a message. Data-driven:
 *
 *   el.reactions = [
 *     { emoji: '👍', count: 3, isMine: true },
 *     { emoji: '🎉', count: 1 }
 *   ]
 *
 * Clicking a pill emits `toggle` {emoji, isMine}; the trailing add (＋) button
 * emits `add` (open a z-emoji-picker in response). Hide the add button with
 * `no-add`. A pill the current user reacted with (`isMine`) is highlighted.
 */
type Reaction = { emoji: string; count: number; isMine?: boolean }

const styles = css`
	:host {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		vertical-align: middle;
	}
	:host([is-hidden]) {
		display: none;
	}
	button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		border: 1px solid var(--border-default);
		background: color-mix(in oklch, var(--text-primary) 5%, transparent);
		border-radius: var(--radius-full);
		padding: var(--space-0-5) var(--space-2);
		font-family: inherit;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
		color: var(--text-primary);
		cursor: pointer;
		transition:
			background-color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter);
	}
	button:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}
	button.is-mine {
		background: color-mix(in oklch, var(--accent-primary) 18%, transparent);
		border-color: color-mix(in oklch, var(--accent-primary) 45%, transparent);
	}
	.emoji {
		font-size: var(--font-size-md);
	}
	.count {
		font-variant-numeric: tabular-nums;
		color: var(--text-secondary);
	}
	button.is-mine .count {
		color: var(--text-primary);
	}
	.add {
		padding: var(--space-0-5) var(--space-2);
		color: var(--text-secondary);
	}
	.add svg {
		width: 0.9rem;
		height: 0.9rem;
		stroke: currentColor;
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
	}
`

export const ZReactions = c(
	(props) => {
		const reactions: Reaction[] = Array.isArray(props.reactions) ? (props.reactions as Reaction[]) : []

		return (
			<host shadowDom>
				{reactions.map((r) => (
					<button
						key={r.emoji}
						type="button"
						class={r.isMine ? 'is-mine' : ''}
						aria-pressed={r.isMine ? 'true' : 'false'}
						onclick={() => props.toggle({ emoji: r.emoji, isMine: Boolean(r.isMine) })}
					>
						<span class="emoji">{r.emoji}</span>
						<span class="count">{r.count}</span>
					</button>
				))}
				{!props.isAddDisabled && (
					<button class="add" type="button" aria-label="Add reaction" onclick={() => props.add()}>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M12 8v8M8 12h8" />
							<circle cx="12" cy="12" r="9" />
						</svg>
					</button>
				)}
			</host>
		)
	},
	{
		props: {
			reactions: { type: Array },
			isAddDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			toggle: event<{ emoji: string; isMine: boolean }>({ bubbles: true, composed: true }),
			add: event<void>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-reactions', ZReactions)
