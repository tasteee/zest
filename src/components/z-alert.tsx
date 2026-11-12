import { defineElement } from '../shared/define-element'
import { interactionStyles } from '../shared/interaction-styles'
import { c, css, event, useProp, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'

/*
 * z-alert, an inline, in-flow status banner (not a floating overlay). A
 * bordered box tinted by `tone` (dom / success / warning / error / neutral),
 * with a leading status icon, an optional `heading`, slotted body copy, and an
 * optional close button (`is-dismissable`). The heading prop is shorthand for
 * plain text; [slot="heading"] takes rich content instead (an inline link, a
 * badge), [slot="icon"] replaces the status icon, and [slot="actions"] adds a
 * row of buttons under the body. Red/amber/green are reserved for
 * their semantic tones, everything else reads through the neutral border.
 */
const styles = css`
	:host {
		display: block;
		--alert-color: var(--text-secondary);
	}

	:host([tone='secondary']) {
		--alert-color: var(--accent-secondary);
	}
	:host([tone='success']) {
		--alert-color: var(--status-success);
	}
	:host([tone='warning']) {
		--alert-color: var(--status-warning);
	}
	:host([tone='danger']) {
		--alert-color: var(--status-danger);
	}

	:host([is-hidden]) {
		display: none;
	}

	.alert {
		display: flex;
		gap: var(--space-3);
		box-sizing: border-box;
		padding: var(--space-3) var(--space-4);
		/* srgb: oklch would drift the hue when mixing the chromatic alert colour
		   against the hue-carrying --border-default. */
		border: 1px solid color-mix(in srgb, var(--alert-color) 40%, var(--border-default));
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--alert-color) 8%, transparent);
		color: var(--text-primary);
	}

	.icon {
		display: inline-flex;
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		margin-top: 0.0625rem;
		color: var(--alert-color);
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

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-snug);
		color: var(--text-primary);
	}

	.title a,
	::slotted(a) {
		color: inherit;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-2-5);
	}

	.actions.is-empty {
		display: none;
	}

	.body {
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
		color: var(--text-secondary);
	}

	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;
		margin: -0.25rem -0.25rem 0 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.close:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
	}

	.close:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.close svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}
`

const ICONS: Record<string, any> = {
	primary: <circle cx="12" cy="12" r="9" />,
	success: <polyline points="5 13 10 18 19 6" />,
	warning: <path d="M12 3 2 20h20L12 3Z M12 10v5 M12 17.5v.5" />,
	danger: <path d="M12 3 2 20h20L12 3Z M12 10v5 M12 17.5v.5" />,
	neutral: <circle cx="12" cy="12" r="9" />
}

// Only the two accents that carry urgency interrupt a screen reader; the
// rest are ambient and announce politely.
const URGENT_TONES = ['danger', 'warning']

export const ZAlert = c(
	(props) => {
		const t = useLocale()
		const [isHidden, setIsHidden] = useProp<boolean>('isHidden')
		const tone = (props.tone as string) || 'neutral'
		const [hasHeadingSlot, setHasHeadingSlot] = useState(false)
		const [hasActions, setHasActions] = useState(false)
		const assigned = (e: Event) => (e.target as HTMLSlotElement).assignedNodes().length > 0
		const isUrgent = URGENT_TONES.includes(tone)
		const liveRole = isUrgent ? 'alert' : 'status'

		const dismiss = () => {
			setIsHidden(true)
			props.dismiss()
		}

		return (
			<host shadowDom>
				<div class="alert" role={liveRole}>
					<span class="icon" aria-hidden="true">
						<slot name="icon">
							<svg viewBox="0 0 24 24">{ICONS[tone] || ICONS.neutral}</svg>
						</slot>
					</span>
					<div class="content">
						<p class="title" style={props.heading || hasHeadingSlot ? '' : 'display: none'}>
							<slot name="heading" onslotchange={(e: Event) => setHasHeadingSlot(assigned(e))}>
								{props.heading}
							</slot>
						</p>
						<div class="body">
							<slot />
						</div>
						<div class={hasActions ? 'actions' : 'actions is-empty'}>
							<slot name="actions" onslotchange={(e: Event) => setHasActions(assigned(e))} />
						</div>
					</div>
					{props.isDismissable && (
						<button type="button" class="close" aria-label={t('dismiss')} onclick={dismiss}>
							<svg viewBox="0 0 24 24">
								<line x1="6" y1="6" x2="18" y2="18" />
								<line x1="18" y1="6" x2="6" y2="18" />
							</svg>
						</button>
					)}
				</div>
			</host>
		)
	},
	{
		props: {
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			heading: String,
			isDismissable: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			dismiss: event<void>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-alert', ZAlert)
