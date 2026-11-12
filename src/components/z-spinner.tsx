import { c, css } from 'atomico'
import { defineElement } from '../shared/define-element'
import { interactionStyles } from '../shared/interaction-styles'
import { useLocale } from '../shared/locale'
import { oneOf } from '../shared/prop-types'

const styles = css`
	:host { display: inline-flex; color: inherit; }
	:host([is-hidden]) { display: none; }
	.spinner {
		box-sizing: border-box;
		width: var(--control-height-sm);
		height: var(--control-height-sm);
		border: 2px solid color-mix(in oklab, currentColor 25%, transparent);
		border-top-color: currentColor;
		border-radius: var(--radius-full);
		animation: spin var(--motion-spin-duration, 1s) linear infinite;
	}
	:host([size='sm']) .spinner { width: var(--space-4); height: var(--space-4); }
	:host([size='lg']) .spinner { width: var(--control-height-lg); height: var(--control-height-lg); }
	@keyframes spin { to { transform: rotate(360deg); } }
`

export const ZSpinner = c(
	(props) => {
		const translate = useLocale()
		const label = props.label || translate('loading')
		return <host shadowDom><span class="spinner" role="status" aria-label={label}></span></host>
	},
	{
		props: {
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			label: String,
			isHidden: { type: Boolean, reflect: true }
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-spinner', ZSpinner)
