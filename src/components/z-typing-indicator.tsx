import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-typing-indicator, the animated "…" bubble shown while someone is typing.
 * Optional avatar (via `name` / `avatar-src`) to match a z-message-group on the
 * start side. Shared by general chat ("Alice is typing") and AI chat (assistant
 * composing a reply before the first token streams).
 *
 *   <z-typing-indicator name="Alice"></z-typing-indicator>
 */
const styles = css`
	:host {
		display: flex;
		align-items: flex-end;
		gap: var(--space-2);
		padding: var(--space-0-5) 0;
	}
	:host([is-hidden]) {
		display: none;
	}
	.bubble {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		background: color-mix(in oklch, var(--text-primary) 8%, var(--surface-default));
		border-radius: var(--radius-full);
		border-end-start-radius: 0.3rem;
		padding: var(--space-3) var(--space-3-5);
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: var(--radius-full);
		background: var(--text-secondary);
		animation: typing 1.4s infinite both;
	}
	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}
	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}
	@keyframes typing {
		0%,
		60%,
		100% {
			opacity: 0.3;
			transform: translateY(0);
		}
		30% {
			opacity: 1;
			transform: translateY(-3px);
		}
	}
`

export const ZTypingIndicator = c(
	(props) => {
		return (
			<host shadowDom aria-label={props.name ? `${props.name} is typing` : 'typing'}>
				{props.name && (
					<z-avatar size='sm' name={props.name} src={props.avatarSrc} />
				)}
				<span class='bubble'>
					<span class='dot'></span>
					<span class='dot'></span>
					<span class='dot'></span>
				</span>
			</host>
		)
	},
	{
		props: {
			name: { type: String, reflect: true },
			avatarSrc: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-typing-indicator', ZTypingIndicator)
