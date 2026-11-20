import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-timeline-item, one event on a z-timeline. A marker on the rail, a
 * heading with its time beside it, an optional description, and any
 * content in the default slot (a quote, an attachment, a button).
 *
 * The marker is a small dot. Put an icon in the `icon` slot and it
 * becomes a ringed badge instead. `is-pending` draws a hollow marker and
 * a dashed line, for what has not happened yet. The `time` slot takes
 * a z-relative-time when the label should keep itself current.
 */
const styles = css`
	:host {
		--tone: var(--z-timeline-accent, var(--text-tertiary));
		--rail: 1.5rem;
		display: block;
		min-width: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='primary']) { --tone: var(--accent-primary); }
	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	:host([tone='success']) { --tone: var(--status-success); }
	:host([tone='warning']) { --tone: var(--status-warning); }
	:host([tone='danger']) { --tone: var(--status-danger); }

	.item {
		display: grid;
		grid-template-columns: var(--rail) minmax(0, 1fr);
		column-gap: var(--space-3);
	}

	.rail {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* The marker box is one heading line tall, so the dot centres on it. */
	.marker {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(var(--font-size-sm) * 1.4);
		flex-shrink: 0;
	}

	.dot {
		width: 0.5625rem;
		height: 0.5625rem;
		box-sizing: border-box;
		border-radius: var(--radius-full);
		background: var(--tone);
	}

	:host([is-pending]) .dot {
		border: 1.5px solid var(--tone);
		background: var(--surface-page);
	}

	.badge {
		display: none;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: var(--rail);
		height: var(--rail);
		margin-block: calc((var(--rail) - var(--font-size-sm) * 1.4) / -2);
		border: 1px solid color-mix(in oklch, var(--tone) 40%, var(--border-default));
		border-radius: var(--radius-full);
		background: var(--surface-default);
		color: var(--tone);
	}

	.item.has-icon .badge {
		display: inline-flex;
	}

	.item.has-icon .dot {
		display: none;
	}

	.badge ::slotted(svg) {
		width: 0.75rem;
		height: 0.75rem;
	}

	.line {
		flex: 1 1 auto;
		width: 1px;
		min-height: var(--space-3);
		margin-top: var(--space-1-5);
		display: var(--z-timeline-line, block);
		background: var(--border-default);
	}

	.item.has-icon .line {
		margin-top: calc((var(--rail) - var(--font-size-sm) * 1.4) / 2 + var(--space-1-5));
	}

	:host([is-pending]) .line {
		background: none;
		border-inline-start: 1px dashed var(--border-strong);
		width: 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		min-width: 0;
		padding-bottom: var(--z-timeline-gap, var(--space-6));
	}

	.header {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: var(--space-1) var(--space-2);
		min-width: 0;
	}

	.heading {
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-snug);
		min-width: 0;
	}

	:host([is-pending]) .heading {
		color: var(--text-secondary);
	}

	.time {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-variant-numeric: tabular-nums;
		line-height: var(--line-height-snug);
		white-space: nowrap;
	}

	.description {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
	}

	.description[hidden],
	.time[hidden],
	.body[hidden] {
		display: none;
	}

	.body {
		margin-top: var(--space-1-5);
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}
`

// Whitespace between tags is assigned to the default slot too; it is
// not content.
const isMeaningfulNode = (node: Node): boolean => {
	const isText = node.nodeType === Node.TEXT_NODE
	if (!isText) return true
	return (node.textContent ?? '').trim().length > 0
}

const hasAssignedNodes = (slotEvent: Event): boolean => {
	const slot = slotEvent.target as HTMLSlotElement
	return slot.assignedNodes().some(isMeaningfulNode)
}

export const ZTimelineItem = c(
	(props) => {
		const [hasIcon, setHasIcon] = useState(false)
		const [hasTimeSlot, setHasTimeSlot] = useState(false)
		const [hasBody, setHasBody] = useState(false)

		const hasTime = Boolean(props.time) || hasTimeSlot
		const hasDescription = Boolean(props.description)
		const itemClass = hasIcon ? 'item has-icon' : 'item'

		return (
			<host shadowDom role="listitem">
				<div class={itemClass}>
					<div class="rail" aria-hidden="true">
						<span class="marker" part="marker">
							<span class="dot"></span>
							<span class="badge">
								<slot name="icon" onslotchange={(slotEvent: Event) => setHasIcon(hasAssignedNodes(slotEvent))} />
							</span>
						</span>
						<span class="line" part="line"></span>
					</div>
					<div class="content">
						<div class="header">
							<span class="heading" part="heading">
								<slot name="heading">{props.heading}</slot>
							</span>
							<span class="time" hidden={!hasTime}>
								<slot name="time" onslotchange={(slotEvent: Event) => setHasTimeSlot(hasAssignedNodes(slotEvent))}>
									{props.time}
								</slot>
							</span>
						</div>
						<div class="description" hidden={!hasDescription}>
							{props.description}
						</div>
						<div class="body" hidden={!hasBody}>
							<slot onslotchange={(slotEvent: Event) => setHasBody(hasAssignedNodes(slotEvent))} />
						</div>
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			heading: String,
			description: String,
			time: String,
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			isPending: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-timeline-item', ZTimelineItem)
