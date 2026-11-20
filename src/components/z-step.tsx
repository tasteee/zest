import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { srOnlyStyles } from '../shared/accessible'
import { c, css, event } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import type { LocaleKeyT } from '../shared/locale'

/*
 * z-step, one stage in a z-stepper. Give it a `label` (and optionally a
 * `description`); the stepper sets everything else: its `state`, its
 * number, whether it is last, its layout, and whether it can be clicked.
 *
 * The marker shows the number, a check once complete, or "!" with
 * `is-error`. The `icon` slot replaces the number. Horizontal steps run
 * a connector to the next marker; vertical ones drop it beneath, with
 * the default slot as room for the step's own content.
 */
const styles = css`
	:host {
		--tone: var(--z-step-accent, var(--accent-primary));
		--z-step-marker: 1.75rem;
		--z-step-line: var(--border-default);
		display: flex;
		flex: 1 1 auto;
		min-width: 0;
	}

	:host([is-last]:not([is-vertical])) {
		flex: 0 0 auto;
	}

	:host([size='sm']) {
		--z-step-marker: 1.375rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-error]) {
		--tone: var(--status-danger);
	}

	.step {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
		min-width: 0;
	}

	.hit {
		all: unset;
		display: flex;
		align-items: center;
		gap: var(--space-3);
		min-width: 0;
		border-radius: var(--radius-md);
	}

	button.hit {
		cursor: pointer;
	}
	button.hit:hover .label {
		color: var(--text-strong);
	}
	button.hit:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
	}

	.marker {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-sizing: border-box;
		width: var(--z-step-marker);
		height: var(--z-step-marker);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		line-height: var(--line-height-none);
		transition:
			background-color var(--motion-base) var(--ease-enter),
			border-color var(--motion-base) var(--ease-enter),
			color var(--motion-base) var(--ease-enter);
	}

	:host([size='sm']) .marker {
		font-size: var(--font-size-2xs);
	}

	:host([state='current']) .marker {
		border: 1.5px solid var(--tone);
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		color: color-mix(in oklab, var(--tone) 70%, var(--text-strong));
	}

	:host([state='complete']) .marker {
		border-color: var(--tone);
		background: var(--tone);
		color: var(--on-accent);
	}

	:host([is-error]) .marker {
		border: 1.5px solid var(--status-danger);
		background: color-mix(in oklch, var(--status-danger) 14%, transparent);
		color: var(--status-danger);
	}

	:host([is-disabled]) {
		opacity: var(--control-disabled-opacity);
	}

	.marker svg {
		width: 55%;
		height: 55%;
		fill: none;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.marker ::slotted(svg) {
		width: 55%;
		height: 55%;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
		min-width: 0;
	}

	.label {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color var(--motion-fast) var(--ease-enter);
	}

	:host([state='current']) .label,
	:host([state='complete']) .label {
		color: var(--text-primary);
	}

	:host([state='current']) .label {
		font-weight: var(--font-weight-semibold);
	}

	:host([is-error]) .label {
		color: var(--status-danger);
	}

	.description {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		line-height: var(--line-height-snug);
	}

	.description[hidden] {
		display: none;
	}

	:host(:not([is-vertical])) .description {
		white-space: nowrap;
	}

	/* Horizontal: a line fills the space to the next step. */
	.connector {
		flex: 1 1 auto;
		min-width: var(--space-4);
		height: 1px;
		background: var(--z-step-line);
		transition: background-color var(--motion-base) var(--ease-enter);
	}

	/* The line is progress, not status: an errored step still hands on
	   in the stepper's accent. */
	:host([state='complete']) .connector {
		background: var(--z-step-accent, var(--accent-primary));
	}

	:host([is-last]) .connector {
		display: none;
	}

	.body {
		display: none;
	}

	/* Vertical: marker column on the start side, the line drops from it. */
	:host([is-vertical]) .step {
		display: grid;
		grid-template-columns: var(--z-step-marker) minmax(0, 1fr);
		column-gap: var(--space-3);
		align-items: start;
	}

	:host([is-vertical]) .hit {
		grid-column: 1 / -1;
		grid-row: 1;
		align-items: flex-start;
	}

	:host([is-vertical]) .text {
		padding-top: calc((var(--z-step-marker) - 1.2em) / 2);
	}

	:host([is-vertical]) .label {
		white-space: normal;
	}

	/* The line runs from under this marker to the bottom of the step,
	   so it meets the next marker whatever the step holds. */
	:host([is-vertical]) .connector {
		position: absolute;
		inset-inline-start: calc(var(--z-step-marker) / 2 - 0.5px);
		top: calc(var(--z-step-marker) + var(--space-1-5));
		bottom: var(--space-1-5);
		width: 1px;
		height: auto;
		min-width: 0;
	}

	:host([is-vertical]) .body {
		display: block;
		grid-column: 2;
		grid-row: 2;
		min-width: 0;
		padding-top: var(--space-2);
		padding-bottom: var(--space-6);
	}

	:host([is-vertical][is-last]) .body {
		padding-bottom: 0;
	}
`

const CheckMark = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<polyline points="5 12.5 10 17.5 19 7" />
	</svg>
)

const getStateText = (state: string | undefined, isError: boolean, t: (key: LocaleKeyT) => string): string => {
	if (isError) return t('stepError')
	if (state === 'complete') return t('stepComplete')
	if (state === 'current') return t('stepCurrent')
	return ''
}

export const ZStep = c(
	(props) => {
		const t = useLocale()
		const index = props.index ?? 1
		const isComplete = props.state === 'complete'
		const isCurrent = props.state === 'current'
		const isError = Boolean(props.isError)
		const isNavigable = Boolean(props.isNavigable) && !props.isDisabled
		const hasDescription = Boolean(props.description) || Boolean(props.isOptional)
		const descriptionText = props.description || t('stepOptional')

		const stateText = getStateText(props.state, isError, t)
		const optionalText = props.isOptional ? t('stepOptional') : ''
		const screenReaderParts = [stateText, optionalText].filter(Boolean)
		const screenReaderText = screenReaderParts.join(', ')

		const showCheck = isComplete && !isError
		const markerContent = isError ? '!' : String(index)

		const handleSelect = () => {
			if (!isNavigable) return
			props.select({ index })
		}

		const marker = (
			<span class="marker" part="marker" aria-hidden="true">
				<slot name="icon">{showCheck ? <CheckMark /> : markerContent}</slot>
			</span>
		)

		const text = (
			<span class="text">
				<span class="label" part="label">
					{props.label}
				</span>
				<span class="description" hidden={!hasDescription}>
					{descriptionText}
				</span>
				{screenReaderText && <span class="sr-only">{`, ${screenReaderText}`}</span>}
			</span>
		)

		const hitArea = isNavigable ? (
			<button class="hit" type="button" onclick={handleSelect}>
				{marker}
				{text}
			</button>
		) : (
			<span class="hit">
				{marker}
				{text}
			</span>
		)

		return (
			<host shadowDom role="listitem" aria-current={isCurrent ? 'step' : undefined}>
				<div class="step">
					{hitArea}
					<span class="connector" aria-hidden="true"></span>
					<div class="body">
						<slot />
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			label: String,
			description: String,
			state: { type: oneOf('upcoming', 'current', 'complete'), reflect: true },
			index: { type: Number, reflect: true },
			size: { type: oneOf('sm', 'md'), reflect: true },
			isError: { type: Boolean, reflect: true },
			isOptional: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isNavigable: { type: Boolean, reflect: true },
			isVertical: { type: Boolean, reflect: true },
			isLast: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			select: event<{ index: number }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles, srOnlyStyles]
	}
)

defineElement('z-step', ZStep)
