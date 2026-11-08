import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, event, useProp } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-collapsible, a single disclosure section. A trigger row (the `label` prop,
 * or a slotted [slot="trigger"] for richer content) toggles a content region
 * (the default slot). Borders only, accent chevron, no shadows. Fires a
 * `toggle` event carrying { value, open } so a parent <z-accordion> can
 * coordinate single/multiple open behavior.
 */
const styles = css`
	:host {
		display: block;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	.trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 0;
		padding: 0.875rem 0;
		font-family: inherit;
		font-size: var(--font-size-md);
		font-weight: 500;
		color: var(--text-primary);
		text-align: start;
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter);
	}

	.trigger:hover {
		color: var(--tone);
	}

	.trigger:focus-visible {
		outline: 3px solid var(--border-focus);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	.trigger:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--text-secondary);
		transition:
			transform var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.trigger:hover .chevron,
	:host([is-open]) .chevron {
		color: var(--tone);
	}

	:host([is-open]) .chevron {
		transform: rotate(180deg);
	}

	.content {
		display: none;
		padding: 0 0 1rem;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}

	:host([is-open]) .content {
		display: block;
	}
`

export const ZCollapsible = c(
	(props) => {
		const [isOpen, setIsOpen] = useProp<boolean>('isOpen')

		const toggle = () => {
			if (props.isDisabled) return
			const next = !isOpen
			setIsOpen(next)
			props.toggle({ value: props.value || '', open: next })
		}

		return (
			<host shadowDom>
				<button
					type="button"
					id="trigger"
					class="trigger"
					disabled={props.isDisabled}
					aria-expanded={isOpen ? 'true' : 'false'}
					onclick={toggle}
				>
					<slot name="trigger">{props.label}</slot>
					<svg class="chevron" viewBox="0 0 24 24">
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</button>
				<div class="content" role="region" aria-labelledby="trigger">
					<slot />
				</div>
			</host>
		)
	},
	{
		props: {
			value: { type: String, reflect: true },
			label: String,
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isOpen: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			toggle: event<{ value: string; open: boolean }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-collapsible', ZCollapsible)
