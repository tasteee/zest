import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-date-divider, a centered day separator between message groups
 * ("Today" / "Yesterday" / "March 3"). Pass `label`, or slot custom content.
 *
 *   <z-date-divider label="Today"></z-date-divider>
 */
const styles = css`
	:host {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin: var(--space-2) 0;
	}
	:host([is-hidden]) {
		display: none;
	}
	.line {
		flex: 1;
		height: 1px;
		background: var(--border-default);
	}
	.label {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--text-secondary);
		white-space: nowrap;
	}
`

export const ZDateDivider = c(
	(props) => {
		return (
			<host shadowDom>
				<span class='line' aria-hidden='true'></span>
				<span class='label'>{props.label}<slot /></span>
				<span class='line' aria-hidden='true'></span>
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

defineElement('z-date-divider', ZDateDivider)
