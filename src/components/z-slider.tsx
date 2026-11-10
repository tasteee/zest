import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { useAccessibleName } from '../shared/accessible'
import { c, css, event, useProp, useRef, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-slider, a range control built on a native input[type=range] so keyboard
 * and a11y come for free, then fully restyled: hairline track, accent-filled
 * progress, and a solid accent thumb. The filled portion is driven by a
 * --fill custom property computed from the current value.
 *
 * An optional header sits above the track: a `label` on the left, custom DOM in
 * the `center` slot between the two, and, when `does-show-value` is set, the
 * live value anchored right as an accent-tinted pill (with optional
 * `value-prefix`/`value-suffix` for units like $ or %).
 *
 * `can-reset` lets a double click on the thumb or the label restore the value
 * the slider started with.
 */
const styles = css`
	:host {
		display: block;
		width: 100%;
		--tone: var(--accent-primary);
	}

	/* Header row: label left, center slot in the middle, value pill right. */
	.header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.header[hidden] {
		display: none;
	}

	.center {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex: 1;
		min-width: 0;
	}

	:host([can-reset]) .label {
		-webkit-user-select: none;
		user-select: none;
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
		const [hasCenter, setHasCenter] = useState(false)
		// Where the thumb sat before the current click sequence began. A first click
		// on the track moves the thumb under the pointer, so the second click of a
		// double click would otherwise always look like it landed on the thumb.
		const press = useRef({ at: 0, fill: 0 })
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

		const showHeader = Boolean(props.label) || props.doesShowValue || hasCenter

		// Restore the value the slider started with, announcing it like a drag would.
		const reset = () => {
			if (!props.canReset || isDisabled) return
			const original = Math.min(max, Math.max(min, defaultValue.current ?? min))
			if (original === current) return
			setValue(original)
			props.input({ value: original })
			props.change({ value: original })
		}

		// The native range has no thumb element to listen on, so a double click
		// counts when it lands within reach of where the thumb is drawn.
		const rememberThumb = (e: PointerEvent) => {
			const isNewSequence = e.timeStamp - press.current.at > 600
			press.current = { at: e.timeStamp, fill: isNewSequence ? fill : press.current.fill }
		}
		const resetFromThumb = (e: MouseEvent) => {
			const input = e.currentTarget as HTMLInputElement
			const thumb = 16
			const center = thumb / 2 + ((input.clientWidth - thumb) * press.current.fill) / 100
			if (Math.abs(e.offsetX - center) <= thumb) reset()
		}

		return (
			<host shadowDom={{ delegatesFocus: true }} style={{ '--fill': `${fill}%` }}>
				<div class="header" hidden={!showHeader}>
					{props.label && (
						<span class="label" ondblclick={reset}>
							{props.label}
						</span>
					)}
					<slot
						name="center"
						class="center"
						onslotchange={(e: any) => setHasCenter(e.target.assignedNodes().length > 0)}
					></slot>
					{props.doesShowValue && (
						<span class="value">
							{props.valuePrefix}
							{current}
							{props.valueSuffix}
						</span>
					)}
				</div>
				<input
					ref={inputRef}
					type="range"
					min={min}
					max={max}
					step={props.step ?? 1}
					value={current}
					disabled={isDisabled}
					aria-label={accessibleName}
					onpointerdown={props.canReset ? rememberThumb : undefined}
					ondblclick={props.canReset ? resetFromThumb : undefined}
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
			canReset: { type: Boolean, reflect: true },
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
