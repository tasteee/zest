import { c, css, event, useEffect, useState } from 'atomico'
import { COPY_FEEDBACK_DURATION, copyText } from '../shared/clipboard'

/*
 * z-copy-button — copy-to-clipboard with confirmation state. Pass the text via
 * the `value` property; the button swaps to a check and "Copied" for a moment
 * after a successful write, then reverts.
 *
 * `kind="icon"` drops the label for tight rows (a token swatch, a table cell).
 * `kind="ghost"` drops the border for use inside a surface that already has
 * one. Slotted content overrides the resting label.
 *
 * Fires `copy` with { value } only on success — a failed write (insecure
 * origin, denied permission) leaves the button untouched and emits nothing,
 * so a consumer never records a copy that did not happen.
 */
const styles = css`
	:host {
		display: inline-flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	.copy {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		flex-shrink: 0;
		padding: 0.25rem 0.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-family: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
		transition:
			color 0.12s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
	}

	.copy:hover {
		color: var(--foreground);
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.copy:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.copy:disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.copy.is-copied {
		color: var(--success);
		border-color: color-mix(in oklch, var(--success) 50%, transparent);
	}

	:host([kind='ghost']) .copy {
		border-color: transparent;
	}

	:host([kind='ghost']) .copy:hover {
		border-color: transparent;
		background: var(--muted);
	}

	:host([kind='icon']) .copy {
		padding: 0.25rem;
	}

	:host([size='sm']) .copy {
		padding: 0.125rem 0.375rem;
	}

	:host([size='sm'][kind='icon']) .copy {
		padding: 0.125rem;
	}

	.icon {
		display: inline-flex;
		width: 0.875rem;
		height: 0.875rem;
	}

	:host([size='sm']) .icon {
		width: 0.75rem;
		height: 0.75rem;
	}

	.icon svg {
		width: 100%;
		height: 100%;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.label {
		white-space: nowrap;
	}
`

const CHECK_ICON = (
	<svg viewBox="0 0 24 24">
		<polyline points="4 12 10 18 20 6" />
	</svg>
)

const CLIPBOARD_ICON = (
	<svg viewBox="0 0 24 24">
		<rect x="9" y="9" width="11" height="11" rx="2" />
		<path d="M5 15V5a2 2 0 0 1 2-2h10" />
	</svg>
)

export const ZCopyButton = c(
	(props) => {
		const [isCopied, setIsCopied] = useState(false)

		const value = (props.value as string) ?? ''
		const label = (props.label as string) || 'Copy'
		const copiedLabel = (props.copiedLabel as string) || 'Copied'
		const isIconOnly = props.kind === 'icon'

		const restingTitle = isIconOnly ? label : undefined
		const icon = isCopied ? CHECK_ICON : CLIPBOARD_ICON

		// Slotted content is the resting label only. The confirmation has to
		// replace it outright, or a consumer-supplied label would swallow it.
		const labelContent = isCopied ? copiedLabel : <slot>{label}</slot>

		// The confirmation is a timer, so it has to be cancelled if the button
		// unmounts (or copies again) before it elapses.
		useEffect(() => {
			if (!isCopied) return
			const revertTimer = setTimeout(() => setIsCopied(false), COPY_FEEDBACK_DURATION)
			return () => clearTimeout(revertTimer)
		}, [isCopied])

		const handleClick = async () => {
			const copyResult = await copyText(value)
			if (!copyResult.isCopied) {
				props.error({ error: copyResult.error })
				return
			}

			setIsCopied(true)
			props.copy({ value })
		}

		return (
			<host shadowDom>
				<button
					type="button"
					class={isCopied ? 'copy is-copied' : 'copy'}
					disabled={props.isDisabled}
					title={restingTitle}
					aria-label={restingTitle}
					aria-live="polite"
					onclick={handleClick}
				>
					<span class="icon" aria-hidden="true">
						{icon}
					</span>
					{!isIconOnly && <span class="label">{labelContent}</span>}
				</button>
			</host>
		)
	},
	{
		props: {
			value: { type: String },
			label: { type: String, reflect: true },
			copiedLabel: { type: String, reflect: true },
			kind: { type: String, reflect: true },
			size: { type: String, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			copy: event<{ value: string }>({ bubbles: true, composed: true }),
			error: event<{ error: Error | null }>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-copy-button', ZCopyButton)
