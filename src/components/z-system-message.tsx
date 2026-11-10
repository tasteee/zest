import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-system-message, a centered, muted status line for non-message events
 * ("Alice added Bob", "You started a call", "Messages are end-to-end
 * encrypted"). Pass `label` or slot content.
 *
 *   <z-system-message label="Alice added Bob to the chat"></z-system-message>
 */
const styles = css`
	:host {
		display: flex;
		justify-content: center;
		margin: var(--space-1) 0;
	}
	:host([is-hidden]) {
		display: none;
	}
	.pill {
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
		background: color-mix(in oklch, var(--text-primary) 6%, transparent);
		padding: var(--space-1) var(--space-2-5);
		border-radius: var(--radius-full);
		text-align: center;
		max-width: 80%;
	}
`

export const ZSystemMessage = c(
	(props) => {
		return (
			<host shadowDom>
				<span class='pill'>{props.label}<slot /></span>
			</host>
		)
	},
	{
		props: {
			label: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-system-message', ZSystemMessage)
