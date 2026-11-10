import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { useAccessibleName } from '../shared/accessible'
import { c, css, event, useProp, useRef } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-slider, a range control built on a native input[type=range] so keyboard
 * and a11y come for free, then fully restyled: hairline track, accent-filled
 * progress, and a solid accent thumb. The filled portion is driven by a
 * --fill custom property computed from the current value.
 *
 * An optional header sits above the track: a `label` on the left, and, when
 * `show-value` is set, the live value on the right as an accent-tinted pill
 * (with optional `value-prefix`/`value-suffix` for units like $ or %).
 */
const styles = css`
	:host {
		display: block;
		width: 100%;
		--tone: var(--accent-primary);
	}

	/* Header row: label left, value pill right. */
	.header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		line-height: var(--line-height-tight);
	}

	.value {
		/* margin-left keeps the value flush-right even when there's no label. */
		margin-inline-start: auto;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		color: var(--tone);
		background: color-mix(in oklch, var(--tone) 12%, transparent);
		padding: var(--space-0-5) var(--space-2);
		border-radius: var(--radius-full);
		line-height: var(--line-height-snug);
		white-space: nowrap;
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

	:host([is-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}

	input {
		appearance: none;
		width: 100%;
		height: 1rem;
		margin: 0;
		background: transparent;
		cursor: pointer;
	}

	/* WebKit track */
	input::-webkit-slider-runnable-track {
		height: 4px;
		border-radius: var(--radius-full);
		background: linear-gradient(
			to right,
			var(--tone) 0%,
			var(--tone) var(--fill, 0%),
			var(--border-default) var(--fill, 0%),
			var(--border-default) 100%
		);
	}

	/* Firefox track + progress */
	input::-moz-range-track {
		height: 4px;
		border-radius: var(--radius-full);
		background: var(--border-default);
	}
	input::-moz-range-progress {
		height: 4px;
		border-radius: var(--radius-full);
		background: var(--tone);
	}

	input::-webkit-slider-thumb {
		appearance: none;
		width: 1rem;
		height: 1rem;
		margin-top: -6px;
		border-radius: var(--radius-full);
		background: var(--tone);
		border: 2px solid var(--surface-page);
		transition: transform var(--motion-instant) var(--ease-enter);
	}
	input::-webkit-slider-thumb:active {
		transform: scale(1.15);
	}

	/* Firefox thumb */
	input::-moz-range-thumb {
		width: 1rem;
		height: 1rem;
		border-radius: var(--radius-full);
		background: var(--tone);
		border: 2px solid var(--surface-page);
	}

	input:focus-visible::-webkit-slider-thumb {
		outline: 3px solid var(--border-focus);
		outline-offset: 2px;
	}
	input:focus-visible::-moz-range-thumb {
		outline: 3px solid var(--border-focus);
		outline-offset: 2px;
	}
`

export const ZSlider = c(
	(props) => {
		const [value, setValue] = useProp<number>('value')
		const inputRef = useRef<HTMLInputElement>()
		const defaultValue = useRef(value)
		const accessibleName = useAccessibleName(props.label)

		const min = props.min ?? 0
		const max = props.max ?? 100
		const current = Math.min(max, Math.max(min, value ?? min))
		// A range always has a value, so it always submits one, as native does.
		const { isFormDisabled } = useFormControl({
			value: String(current),
			isDisabled: props.isDisabled,
			control: inputRef,
			onReset: () => setValue(defaultValue.current),
			onRestore: (state) => { if (typeof state === 'string' && state !== '') setValue(Number(state)) }
		})
		const isDisabled = props.isDisabled || isFormDisabled
		const fill = max > min ? ((current - min) / (max - min)) * 100 : 0

		const showHeader = Boolean(props.label) || props.doesShowValue

		return (
			<host shadowDom={{ delegatesFocus: true }} style={{ '--fill': `${fill}%` }}>
				{showHeader && (
					<div class="header">
						{props.label && <span class="label">{props.label}</span>}
						{props.doesShowValue && (
							<span class="value">
								{props.valuePrefix}
								{current}
								{props.valueSuffix}
							</span>
						)}
					</div>
				)}
				<input
					ref={inputRef}
					type="range"
					min={min}
					max={max}
					step={props.step ?? 1}
					value={current}
					disabled={isDisabled}
					aria-label={accessibleName}
					oninput={(e: any) => {
						e.stopPropagation()
						const next = Number(e.target.value)
						setValue(next)
						props.input({ value: next })
					}}
					onchange={(e: any) => {
						e.stopPropagation()
						props.change({ value: Number(e.target.value) })
					}}
				/>
			</host>
		)
	},
	{
		props: {
			value: { type: Number, reflect: true },
			min: { type: Number, reflect: true },
			max: { type: Number, reflect: true },
			step: { type: Number, reflect: true },
			name: { type: String, reflect: true },
			label: String,
			doesShowValue: { type: Boolean, reflect: true },
			valuePrefix: String,
			valueSuffix: String,
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			input: event<{ value: number }>({ bubbles: true, composed: true }),
			change: event<{ value: number }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles],
		form: true
	}
)

defineFormElement('z-slider', ZSlider)
