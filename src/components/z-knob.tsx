import { c, css, event, useHost, useProp, useState } from 'atomico'

/*
 * z-knob — a rotary control, the hardware counterpart to z-slider.
 *
 * Built as three stacked rings so each can be themed independently: a carved
 * well sunk into the panel, an arc of LED travel drawn on top of it, and the
 * cap sitting proud in the middle with a pointer milled into it.
 *
 * The sweep is 270 degrees with the dead zone at the bottom, which is what
 * every piece of physical hardware does — a full 360 leaves no way to see
 * where the travel begins, and the eye reads the gap as the zero mark.
 *
 * Dragging is vertical, not rotational. Following the pointer around the
 * circle sounds more faithful and is much worse to use: it makes fine
 * adjustment near the centre impossible and flips wildly across the dead zone.
 * Every DAW resolved this the same way decades ago.
 */

const SWEEP_DEGREES = 270
const SWEEP_START_DEGREES = -135
const PIXELS_FOR_FULL_TRAVEL = 180
const FINE_DRAG_DIVISOR = 4

const styles = css`
	:host {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		user-select: none;
		-webkit-user-select: none;
		--knob-size: 3.5rem;
		--knob-tone: var(--accent);
		--knob-track: var(--color-neutral-3);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([size='sm']) {
		--knob-size: 2.5rem;
	}

	:host([size='lg']) {
		--knob-size: 5rem;
	}

	:host([accent='dom']) {
		--knob-tone: var(--purple);
	}

	:host([accent='sub']) {
		--knob-tone: var(--pink);
	}

	:host([accent='success']) {
		--knob-tone: var(--success);
	}

	:host([accent='warning']) {
		--knob-tone: var(--warning);
	}

	:host([accent='error']) {
		--knob-tone: var(--destructive);
	}

	:host([is-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}

	.dial {
		position: relative;
		width: var(--knob-size);
		height: var(--knob-size);
		border: none;
		padding: 0;
		border-radius: 50%;
		background: transparent;
		cursor: ns-resize;
		touch-action: none;
	}

	.dial:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 3px;
	}

	/* The well the cap sits in. Carved in the material themes, a plain ring in
	   the flat ones. */
	.well {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: var(--material-surface);
		box-shadow: var(--elevation-carved);
	}

	/* The travel arc, drawn as a conic gradient masked to a ring. Everything
	   before --knob-angle is lit, everything after is unlit track. The mask is
	   what makes it a ring rather than a pie. */
	.arc {
		position: absolute;
		inset: 3px;
		border-radius: 50%;
		background: conic-gradient(
			from 225deg,
			var(--knob-tone) 0deg var(--knob-angle),
			var(--knob-track) var(--knob-angle) 270deg,
			transparent 270deg 360deg
		);
		-webkit-mask: radial-gradient(closest-side, transparent 74%, black 76%);
		mask: radial-gradient(closest-side, transparent 74%, black 76%);
	}

	/* The lit portion of the arc glows in the material themes. Painted as a
	   separate blurred copy because a box-shadow cannot follow a conic sweep. */
	.arcGlow {
		position: absolute;
		inset: 3px;
		border-radius: 50%;
		background: conic-gradient(
			from 225deg,
			var(--knob-tone) 0deg var(--knob-angle),
			transparent var(--knob-angle) 360deg
		);
		-webkit-mask: radial-gradient(closest-side, transparent 74%, black 76%);
		mask: radial-gradient(closest-side, transparent 74%, black 76%);
		filter: blur(4px);
		opacity: var(--knob-glow-opacity, 0);
		pointer-events: none;
	}

	/* The cap. Raised in the material themes, flat in the others. */
	.cap {
		position: absolute;
		inset: 18%;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: var(--material-raised), var(--card);
		box-shadow: var(--elevation-raised);
		transform: rotate(var(--knob-rotation));
		transition: box-shadow var(--material-press-duration) ease;
	}

	.dial:active .cap {
		box-shadow: var(--elevation-pressed);
	}

	/* The milled pointer. A line rather than a dot, because a line reads its
	   angle at a glance and a dot has to be located first. */
	.pointer {
		position: absolute;
		left: 50%;
		top: 10%;
		width: 2px;
		height: 30%;
		margin-left: -1px;
		border-radius: 1px;
		background: var(--knob-tone);
	}

	.label {
		font-family: var(--font-mono);
		font-size: var(--font-size-0);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.value {
		font-family: var(--font-mono);
		font-size: var(--font-size-1);
		color: var(--foreground);
		font-variant-numeric: tabular-nums;
	}
`

const clampToRange = (candidate: number, min: number, max: number): number => {
	if (candidate < min) return min
	if (candidate > max) return max
	return candidate
}

const snapToStep = (candidate: number, min: number, step: number): number => {
	const isStepless = step <= 0
	if (isStepless) return candidate

	const stepsFromMin = Math.round((candidate - min) / step)
	return min + stepsFromMin * step
}

// Floating-point stepping leaves values like 0.30000000000000004, which look
// broken the moment they're displayed. Rounding to the step's own precision is
// enough to keep the number honest without introducing a formatting prop.
const roundToStepPrecision = (candidate: number, step: number): number => {
	const stepText = String(step)
	const decimalIndex = stepText.indexOf('.')
	const hasDecimals = decimalIndex !== -1
	if (!hasDecimals) return Math.round(candidate)

	const decimalPlaces = stepText.length - decimalIndex - 1
	return Number(candidate.toFixed(decimalPlaces))
}

const getFraction = (value: number, min: number, max: number): number => {
	const span = max - min
	const isDegenerate = span <= 0
	if (isDegenerate) return 0
	return (value - min) / span
}

type DragOriginT = {
	pointerY: number
	value: number
}

export const ZKnob = c(
	(props) => {
		const host = useHost()
		const [value, setValue] = useProp<number>('value')
		const [dragOrigin, setDragOrigin] = useState<DragOriginT | null>(null)

		const min = props.min ?? 0
		const max = props.max ?? 100
		const step = props.step ?? 1
		const current = clampToRange(value ?? min, min, max)

		const fraction = getFraction(current, min, max)
		const sweptDegrees = fraction * SWEEP_DEGREES
		const rotationDegrees = SWEEP_START_DEGREES + sweptDegrees

		const commitValue = (candidate: number): void => {
			const snapped = snapToStep(candidate, min, step)
			const clamped = clampToRange(snapped, min, max)
			const rounded = roundToStepPrecision(clamped, step)

			const isUnchanged = rounded === current
			if (isUnchanged) return

			setValue(rounded)
			props.input({ value: rounded })
		}

		const handlePointerDown = (pointerEvent: PointerEvent): void => {
			const target = pointerEvent.currentTarget as HTMLElement
			target.setPointerCapture(pointerEvent.pointerId)
			setDragOrigin({ pointerY: pointerEvent.clientY, value: current })
		}

		const handlePointerMove = (pointerEvent: PointerEvent): void => {
			if (!dragOrigin) return

			// Up is more, which matches a fader and contradicts screen
			// coordinates — hence the negation.
			const travelledPixels = dragOrigin.pointerY - pointerEvent.clientY
			const sensitivity = pointerEvent.shiftKey ? FINE_DRAG_DIVISOR : 1
			const fractionMoved = travelledPixels / (PIXELS_FOR_FULL_TRAVEL * sensitivity)

			commitValue(dragOrigin.value + fractionMoved * (max - min))
		}

		const handlePointerUp = (pointerEvent: PointerEvent): void => {
			if (!dragOrigin) return

			const target = pointerEvent.currentTarget as HTMLElement
			target.releasePointerCapture(pointerEvent.pointerId)
			setDragOrigin(null)
			props.change({ value: current })
		}

		const handleKeyDown = (keyboardEvent: KeyboardEvent): void => {
			const coarseStep = step * 10

			const keyedDelta = getKeyedDelta(keyboardEvent.key, step, coarseStep)
			if (keyedDelta !== null) {
				keyboardEvent.preventDefault()
				commitValue(current + keyedDelta)
				props.change({ value: clampToRange(current + keyedDelta, min, max) })
				return
			}

			const isHome = keyboardEvent.key === 'Home'
			if (isHome) {
				keyboardEvent.preventDefault()
				commitValue(min)
				props.change({ value: min })
				return
			}

			const isEnd = keyboardEvent.key === 'End'
			if (!isEnd) return

			keyboardEvent.preventDefault()
			commitValue(max)
			props.change({ value: max })
		}

		const handleDoubleClick = (): void => {
			const hasDefault = props.defaultValue != null
			if (!hasDefault) return

			commitValue(props.defaultValue as number)
			props.change({ value: props.defaultValue as number })
		}

		const displayValue = `${props.valuePrefix ?? ''}${current}${props.valueSuffix ?? ''}`
		const accessibleLabel = props.label ?? 'Knob'

		const hostStyle = {
			'--knob-angle': `${sweptDegrees}deg`,
			'--knob-rotation': `${rotationDegrees}deg`,
			'--knob-glow-opacity': props.isGlowing ? '1' : '0'
		}

		return (
			<host shadowDom style={hostStyle}>
				{props.label && <span class="label">{props.label}</span>}
				<button
					class="dial"
					type="button"
					role="slider"
					aria-label={accessibleLabel}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={current}
					aria-valuetext={displayValue}
					aria-orientation="vertical"
					disabled={props.isDisabled}
					onpointerdown={handlePointerDown}
					onpointermove={handlePointerMove}
					onpointerup={handlePointerUp}
					onpointercancel={handlePointerUp}
					onkeydown={handleKeyDown}
					ondblclick={handleDoubleClick}
				>
					<span class="well" />
					<span class="arcGlow" />
					<span class="arc" />
					<span class="cap">
						<span class="pointer" />
					</span>
				</button>
				{props.doesShowValue && <span class="value">{displayValue}</span>}
			</host>
		)
	},
	{
		props: {
			value: { type: Number, reflect: true },
			min: { type: Number, reflect: true },
			max: { type: Number, reflect: true },
			step: { type: Number, reflect: true },
			defaultValue: { type: Number, reflect: true },
			label: String,
			doesShowValue: { type: Boolean, reflect: true },
			valuePrefix: String,
			valueSuffix: String,
			accent: { type: String, reflect: true },
			isGlowing: { type: Boolean, reflect: true },
			size: { type: String, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			input: event<{ value: number }>({ bubbles: true, composed: true }),
			change: event<{ value: number }>({ bubbles: true, composed: true })
		},
		styles
	}
)

// Arrow and page keys move a slider the same way everywhere; returning null
// for anything else keeps the handler above flat.
const getKeyedDelta = (key: string, step: number, coarseStep: number): number | null => {
	if (key === 'ArrowUp') return step
	if (key === 'ArrowRight') return step
	if (key === 'ArrowDown') return -step
	if (key === 'ArrowLeft') return -step
	if (key === 'PageUp') return coarseStep
	if (key === 'PageDown') return -coarseStep
	return null
}

customElements.define('z-knob', ZKnob)
