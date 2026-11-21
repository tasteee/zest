import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, event, useEffect, useHost, useListener, useProp } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import './z-step'

/*
 * z-stepper, progress through an ordered flow: checkout, onboarding, a
 * multi-page form. Slot one z-step per stage; `value` is the index of
 * the current one, from 0.
 *
 *   <z-stepper value="1">
 *     <z-step label="Account"></z-step>
 *     <z-step label="Profile"></z-step>
 *     <z-step label="Review"></z-step>
 *   </z-stepper>
 *
 * Steps before `value` are complete, the one at it is current, the rest
 * are upcoming. A value past the last step marks the flow finished.
 * The stepper writes each step's `state`, `index`, `is-last` and layout
 * flags, so a step needs only its label.
 *
 * `is-navigable` lets people click back to a completed step; the stepper
 * moves `value` and fires `change`. Moving forward stays with the app,
 * which knows whether the current step is valid.
 */
const styles = css`
	:host {
		display: flex;
		align-items: center;
		width: 100%;
		min-width: 0;
		--z-step-accent: var(--accent-primary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-vertical]) {
		flex-direction: column;
		align-items: stretch;
	}

	:host([tone='secondary']) { --z-step-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-step-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-step-accent: var(--status-success); }
`

type StepElementT = HTMLElement & {
	state?: string
	index?: number
	isLast?: boolean
	isVertical?: boolean
	isNavigable?: boolean
	isDisabled?: boolean
	size?: string
	label?: string
}

type StepSelectDetailT = { index: number }

const readSteps = (host: HTMLElement): StepElementT[] => {
	const children = [...host.children] as StepElementT[]
	return children.filter((child) => child.localName === 'z-step')
}

const getStepState = (position: number, current: number): string => {
	if (position < current) return 'complete'
	if (position === current) return 'current'
	return 'upcoming'
}

export const ZStepper = c(
	(props) => {
		const t = useLocale()
		const host = useHost()
		const [value, setValue] = useProp<number>('value')
		const current = Math.max(0, Math.floor(value ?? 0))

		const syncSteps = () => {
			const steps = readSteps(host.current)
			const lastPosition = steps.length - 1
			for (const [position, step] of steps.entries()) {
				const state = getStepState(position, current)
				const isComplete = state === 'complete'
				const isStepDisabled = step.hasAttribute('is-disabled')
				step.state = state
				step.index = position + 1
				step.isLast = position === lastPosition
				step.isVertical = Boolean(props.isVertical)
				step.isNavigable = Boolean(props.isNavigable) && isComplete && !isStepDisabled
				step.size = props.size
			}
		}

		useEffect(syncSteps, [current, props.isVertical, props.isNavigable, props.size])

		useListener(host, 'select', (rawEvent: unknown) => {
			const stepEvent = rawEvent as CustomEvent<StepSelectDetailT>
			const step = stepEvent.target as StepElementT
			const isFromStep = step.localName === 'z-step'
			if (!isFromStep) return
			stepEvent.stopPropagation()
			const nextValue = stepEvent.detail.index - 1
			const canMove = Boolean(props.isNavigable) && nextValue < current
			if (!canMove) return
			setValue(nextValue)
			props.change({ value: nextValue })
		})

		return (
			<host shadowDom role="list" aria-label={props.label || t('steps')}>
				<slot onslotchange={syncSteps} />
			</host>
		)
	},
	{
		props: {
			value: { type: Number, reflect: true },
			label: String,
			size: { type: oneOf('sm', 'md'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success'), reflect: true },
			isVertical: { type: Boolean, reflect: true },
			isNavigable: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: number }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-stepper', ZStepper)
