import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-unread-divider, the accented "New messages" line marking where unread
 * messages begin in a thread. Like z-date-divider but toned to draw the eye.
 *
 *   <z-unread-divider></z-unread-divider>
 *   <z-unread-divider label="12 new messages"></z-unread-divider>
 */
const styles = css`
	:host {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin: var(--space-2) 0;
		--tone: var(--accent-primary);
	}
	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}
	:host([is-hidden]) {
		display: none;
	}
	.line {
		flex: 1;
		height: 1px;
		background: color-mix(in oklch, var(--tone) 45%, transparent);
	}
	.label {
		font-size: var(--font-size-2xs);
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--tone);
		white-space: nowrap;
	}
`

export const ZUnreadDivider = c(
	(props) => (
		<host shadowDom role="separator" aria-label={props.label || 'New messages'}>
			<span class="line" aria-hidden="true"></span>
			<span class="label">{props.label || 'New messages'}<slot /></span>
			<span class="line" aria-hidden="true"></span>
		</host>
	),
	{
		props: {
			label: { type: String, reflect: true },
			tone: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-unread-divider', ZUnreadDivider)
