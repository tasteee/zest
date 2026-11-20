import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import './z-timeline-item'

/*
 * z-timeline, events in order down a rail: an activity feed, a release
 * history, an order's journey. Slot z-timeline-item children.
 *
 * It owns the rail. Each item draws a marker and a line down to the
 * next; the last item's line is switched off from here, through the
 * --z-timeline-* properties, so items never need to know where they sit.
 *
 * `tone` sets the marker colour for every item; an item's own tone wins.
 */
const styles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 0;
		--z-timeline-accent: var(--text-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='primary']) { --z-timeline-accent: var(--accent-primary); }
	:host([tone='secondary']) { --z-timeline-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-timeline-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-timeline-accent: var(--status-success); }
	:host([tone='warning']) { --z-timeline-accent: var(--status-warning); }
	:host([tone='danger']) { --z-timeline-accent: var(--status-danger); }

	:host([size='sm']) {
		--z-timeline-gap: var(--space-4);
	}

	::slotted(:last-child) {
		--z-timeline-line: none;
		--z-timeline-gap: 0px;
	}
`

export const ZTimeline = c(
	(props) => {
		const t = useLocale()

		return (
			<host shadowDom role="list" aria-label={props.label || t('timeline')}>
				<slot />
			</host>
		)
	},
	{
		props: {
			label: String,
			size: { type: oneOf('sm', 'md'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-timeline', ZTimeline)
