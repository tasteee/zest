import { defineElement } from '../shared/define-element'
import { c, css, useEffect, useRef } from 'atomico'

/*
 * z-steps + z-step — numbered instructions with a connector rail.
 *
 *   <z-steps>
 *     <z-step heading="Install">
 *       <z-code-block language="sh" code="npm i @tasteee/zest"></z-code-block>
 *     </z-step>
 *     <z-step heading="Import the stylesheet">…</z-step>
 *   </z-steps>
 *
 * A step takes arbitrary content — prose, a code block, a whole example — so
 * the marker column and the content column are separate tracks rather than a
 * list-item marker. An <ol> marker cannot be styled to sit inside a rail, and
 * anything tall enough to hold a code block breaks list numbering alignment.
 *
 * The number is assigned by the parent rather than authored on each step,
 * because a hand-numbered list is a list that eventually skips 4. z-steps
 * writes an `index` onto each slotted step whenever the slot changes, so
 * reordering the markup renumbers everything.
 *
 * `current` turns the list into a guided flow: steps before it read as done,
 * the current one is highlighted, the rest are pending. Without it every step
 * reads the same, which is right for documentation.
 */
const stepsStyles = css`
	:host {
		display: block;
		--steps-rail: var(--border);
		--steps-marker-size: 1.75rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	.list {
		display: flex;
		flex-direction: column;
	}
`

const stepStyles = css`
	:host {
		display: grid;
		grid-template-columns: var(--steps-marker-size, 1.75rem) 1fr;
		column-gap: var(--space-base);
	}

	:host([is-hidden]) {
		display: none;
	}

	/* The rail is drawn by the marker cell rather than by the host, so it
	   starts under the circle instead of beside it, and the last step simply
	   does not draw one. */
	.marker-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.marker {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-sizing: border-box;
		width: var(--steps-marker-size, 1.75rem);
		height: var(--steps-marker-size, 1.75rem);
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--background);
		color: var(--muted-foreground);
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-medium);
		font-variant-numeric: tabular-nums;
	}

	.rail {
		flex: 1;
		width: 1px;
		min-height: var(--space-sm);
		background: var(--steps-rail, var(--border));
	}

	:host([is-last]) .rail {
		background: transparent;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		min-width: 0;
		padding-bottom: var(--space-lg);
	}

	:host([is-last]) .content {
		padding-bottom: 0;
	}

	/* Matched to the marker's box rather than given a line-height, so the
	   heading stays optically centred against the circle at any marker size. */
	.heading {
		display: flex;
		align-items: center;
		margin: 0;
		min-height: var(--steps-marker-size, 1.75rem);
		font-size: var(--font-size-body);
		font-weight: var(--font-weight-medium);
		line-height: 1.3;
		color: var(--foreground);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		min-width: 0;
	}

	/* State reads on the marker alone. Recolouring the content as well would
	   make a completed step look disabled rather than done. */
	:host([state='done']) .marker {
		border-color: transparent;
		background: var(--success);
		color: var(--primary-foreground);
	}

	:host([state='current']) .marker {
		border-color: var(--purple);
		color: var(--foreground);
	}

	:host([state='current']) .heading {
		color: var(--foreground);
	}
`

const CHECK_GLYPH = '✓'

export const ZStep = c(
	(props) => {
		const isDone = props.state === 'done'
		const displayIndex = Number(props.index) || 1
		const marker = isDone ? CHECK_GLYPH : String(displayIndex)

		return (
			<host shadowDom>
				<div class='marker-cell'>
					<span class='marker' aria-hidden='true'>
						{marker}
					</span>
					<span class='rail' aria-hidden='true' />
				</div>
				<div class='content'>
					{props.heading && <p class='heading'>{props.heading}</p>}
					<div class='body'>
						<slot />
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			heading: { type: String, reflect: true },
			index: { type: Number, reflect: true },
			state: { type: String, reflect: true },
			isLast: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles: stepStyles
	}
)

defineElement('z-step', ZStep)

const readStepState = (stepIndex: number, current?: number): string => {
	const hasCurrent = typeof current === 'number' && current > 0
	if (!hasCurrent) return 'pending'

	if (stepIndex < current) return 'done'
	if (stepIndex === current) return 'current'
	return 'pending'
}

export const ZSteps = c(
	(props) => {
		const slotRef = useRef<HTMLSlotElement>()

		// Numbering is assigned here rather than authored per step, so
		// reordering the markup renumbers the list instead of silently
		// producing 1, 2, 2, 4.
		const numberSteps = () => {
			const steps = slotRef.current?.assignedElements({ flatten: true })
			if (!steps) return

			const lastIndex = steps.length - 1
			for (const [position, step] of steps.entries()) {
				const stepIndex = position + 1
				step.setAttribute('index', String(stepIndex))
				step.setAttribute('state', readStepState(stepIndex, Number(props.current) || 0))
				if (position === lastIndex) step.setAttribute('is-last', '')
				if (position !== lastIndex) step.removeAttribute('is-last')
			}
		}

		// Also re-runs when `current` moves, not only when the slot changes —
		// a guided flow advances without the markup changing at all.
		useEffect(() => numberSteps(), [props.current])

		return (
			<host shadowDom>
				<div class='list'>
					<slot ref={slotRef} onslotchange={numberSteps} />
				</div>
			</host>
		)
	},
	{
		props: {
			current: { type: Number, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles: stepsStyles
	}
)

defineElement('z-steps', ZSteps)
