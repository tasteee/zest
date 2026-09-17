import { c, css, event, useEffect, useState } from 'atomico'
import { defineElement } from '../shared/define-element'

export type ChatAiMessageT = {
	id: string
	role: 'user' | 'assistant'
	content: string
}

const styles = css`
	:host {
		position: sticky;
		z-index: 4;
		display: block;
		bottom: var(--space-sm);
		width: min(46rem, calc(100% - 2 * var(--space-md)));
		margin: var(--space-md) auto var(--space-sm);
	}
	:host([is-hidden]) {
		display: none;
	}
	.dock {
		position: relative;
		border: 1px solid color-mix(in oklch, var(--border) 82%, var(--primary));
		border-radius: 1.35rem;
		background: color-mix(in oklch, var(--card) 96%, transparent);
		box-shadow: 0 14px 40px color-mix(in oklch, var(--foreground) 16%, transparent);
		backdrop-filter: blur(18px);
	}
	.discussion {
		position: absolute;
		left: 0;
		right: 0;
		bottom: calc(100% + var(--space-sm));
		display: flex;
		flex-direction: column;
		max-height: min(26rem, 55vh);
		border: 1px solid var(--border);
		border-radius: 1.25rem;
		background: var(--card);
		box-shadow: 0 18px 48px color-mix(in oklch, var(--foreground) 18%, transparent);
		overflow: hidden;
		transform-origin: bottom center;
		animation: discussion-in var(--duration-normal) var(--easing-decelerate);
	}
	.discussion[hidden] {
		display: none;
	}
	.discussion-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		border-bottom: 1px solid var(--border);
	}
	.discussion-title {
		font-size: 0.8125rem;
		font-weight: 650;
	}
	.discussion-context {
		display: block;
		margin-top: 0.1rem;
		font-size: 0.6875rem;
		font-weight: 400;
		color: var(--muted-foreground);
	}
	.close,
	.discussion-toggle,
	.send {
		border: 0;
		font: inherit;
		cursor: pointer;
	}
	.close {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 999px;
		background: transparent;
		color: var(--muted-foreground);
		font-size: 1.1rem;
	}
	.close:hover {
		background: color-mix(in oklch, var(--foreground) 7%, transparent);
		color: var(--foreground);
	}
	.history {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		overflow-y: auto;
		padding: var(--space-md);
	}
	.ai-message {
		width: fit-content;
		max-width: 82%;
		padding: 0.5rem 0.7rem;
		border-radius: 1rem 1rem 1rem 0.25rem;
		background: color-mix(in oklch, var(--foreground) 7%, transparent);
		font-size: 0.8125rem;
		line-height: 1.45;
	}
	.ai-message.user {
		align-self: flex-end;
		border-radius: 1rem 1rem 0.25rem 1rem;
		background: color-mix(in oklch, var(--primary) 16%, transparent);
	}
	.empty {
		padding: var(--space-md);
		color: var(--muted-foreground);
		font-size: 0.8125rem;
		text-align: center;
	}
	.composer {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: end;
		gap: var(--space-xs);
		padding: 0.35rem;
	}
	.discussion-toggle {
		display: grid;
		place-items: center;
		width: 2.5rem;
		min-height: 2.5rem;
		padding: 0;
		border-radius: 1rem;
		background: color-mix(in oklch, var(--primary) 12%, transparent);
		color: var(--foreground);
	}
	.spark {
		color: var(--primary);
		font-size: 1rem;
	}
	textarea {
		width: 100%;
		min-height: 2.5rem;
		max-height: 8rem;
		box-sizing: border-box;
		resize: vertical;
		border: 0;
		outline: 0;
		padding: 0.62rem 0.4rem;
		background: transparent;
		color: var(--foreground);
		font: inherit;
		font-size: 0.875rem;
		line-height: 1.35;
	}
	textarea::placeholder {
		color: var(--muted-foreground);
	}
	.send {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 999px;
		background: var(--primary);
		color: var(--primary-foreground);
		font-size: 1rem;
	}
	.send:disabled {
		opacity: 0.45;
		cursor: default;
	}
	@keyframes discussion-in {
		from { opacity: 0; transform: translateY(0.5rem) scale(0.985); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}
	@media (prefers-reduced-motion: reduce) {
		.discussion { animation: none; }
	}
	@media (max-width: 36rem) {
		:host { width: calc(100% - 2 * var(--space-sm)); }
	}
`

export const ZChatAiDock = c(
	(props) => {
		const [draft, setDraft] = useState('')
		const [isOpen, setIsOpen] = useState(Boolean(props.isOpen))
		const messages = Array.isArray(props.messages) ? props.messages as ChatAiMessageT[] : []
		useEffect(() => setIsOpen(Boolean(props.isOpen)), [props.isOpen])
		const setOpen = (value: boolean) => {
			setIsOpen(value)
			props.openchange({ isOpen: value })
		}
		const submit = (event: Event) => {
			event.preventDefault()
			const value = draft.trim()
			if (!value) return
			props.ask({ value })
			setDraft('')
			if (!isOpen) setOpen(true)
		}

		return (
			<host shadowDom>
				<div class="dock">
					<section class="discussion" hidden={!isOpen} aria-label="AI discussion">
						<header class="discussion-header">
							<div class="discussion-title">AI discussion<span class="discussion-context">Visible conversation context</span></div>
							<button class="close" type="button" aria-label="Close AI discussion" onclick={() => setOpen(false)}>×</button>
						</header>
						<div class="history" aria-live="polite">
							<slot name="history">
								{messages.length ? messages.map((message) => (
									<div class={`ai-message ${message.role}`}>{message.content}</div>
								)) : <div class="empty">Ask anything about this conversation.</div>}
							</slot>
						</div>
					</section>
					<form class="composer" onsubmit={submit}>
						<button class="discussion-toggle" type="button" aria-label="Open AI discussion" aria-expanded={isOpen ? 'true' : 'false'} onclick={() => setOpen(!isOpen)}>
							<span class="spark" aria-hidden="true">✦</span>
						</button>
						<textarea
							rows={1}
							value={draft}
							placeholder={props.placeholder || 'Ask about this conversation…'}
							oninput={(event: Event) => setDraft((event.target as HTMLTextAreaElement).value)}
							onkeydown={(event: KeyboardEvent) => {
								if (event.key === 'Enter' && !event.shiftKey) submit(event)
							}}
						/>
						<button class="send" type="submit" disabled={!draft.trim()} aria-label="Ask AI">↑</button>
					</form>
				</div>
			</host>
		)
	},
	{
		props: {
			messages: { type: Array },
			placeholder: { type: String, reflect: true },
			isOpen: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			ask: event<{ value: string }>({ bubbles: true, composed: true }),
			openchange: event<{ isOpen: boolean }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-chat-ai-dock', ZChatAiDock)
