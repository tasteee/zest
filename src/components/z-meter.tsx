import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-meter, a measurement inside a known range: disk used, battery left,
 * password strength. z-progress is for a task moving to done; a meter
 * is a level that can be good or bad.
 *
 * It reads its colour the way the native <meter> does. `low` and `high`
 * cut the range into three regions, `optimum` says which region is good:
 *
 *   value in the optimum's region         success
 *   one region away                       warning
 *   two regions away                      danger
 *
 * With no low or high it stays neutral. `tone` overrides all of that.
 *
 * `segments` splits the bar into equal cells, the battery and strength
 * look. The header (label, value pill) matches z-slider's.
 */
const styles = css`
	:host {
		display: block;
		width: 100%;
		--tone: var(--accent-primary);
		--z-meter-height: 0.5rem;
		--z-meter-track: color-mix(in oklch, var(--border-default) 70%, transparent);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([size='sm']) { --z-meter-height: 0.3125rem; }
	:host([size='lg']) { --z-meter-height: 0.75rem; }

	.meter.is-primary { --tone: var(--accent-primary); }
	.meter.is-secondary { --tone: var(--accent-secondary); }
	.meter.is-tertiary { --tone: var(--accent-tertiary); }
	.meter.is-success { --tone: var(--status-success); }
	.meter.is-warning { --tone: var(--status-warning); }
	.meter.is-danger { --tone: var(--status-danger); }

	.header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.header[hidden] {
		display: none;
	}

	.label {
		min-width: 0;
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
	}

	.value {
		margin-inline-start: auto;
		padding: var(--space-0-5) var(--space-2);
		border-radius: var(--radius-full);
		background: color-mix(in oklch, var(--tone) 12%, transparent);
		color: color-mix(in oklab, var(--tone) 70%, var(--text-primary));
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		line-height: var(--line-height-snug);
		white-space: nowrap;
		transition:
			color var(--motion-base) var(--ease-enter),
			background-color var(--motion-base) var(--ease-enter);
	}

	.track {
		position: relative;
		display: flex;
		gap: 3px;
		width: 100%;
		height: var(--z-meter-height);
	}

	.cell {
		position: relative;
		flex: 1 1 0;
		overflow: hidden;
		border-radius: var(--radius-full);
		background: var(--z-meter-track);
	}

	.track.is-segmented .cell {
		border-radius: var(--radius-xs);
	}

	.bar {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		border-radius: inherit;
		background: var(--tone);
		transition:
			width var(--motion-slow) var(--ease-enter),
			background-color var(--motion-base) var(--ease-enter);
	}
`

type RegionT = 0 | 1 | 2
type ToneT = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'

const isFiniteNumber = (candidate: unknown): candidate is number => {
	return typeof candidate === 'number' && Number.isFinite(candidate)
}

const clamp = (value: number, lowest: number, highest: number): number => {
	return Math.min(highest, Math.max(lowest, value))
}

const getRegion = (value: number, low: number, high: number): RegionT => {
	if (value < low) return 0
	if (value > high) return 2
	return 1
}

const TONE_BY_DISTANCE: ToneT[] = ['success', 'warning', 'danger']

export const ZMeter = c(
	(props) => {
		const min = isFiniteNumber(props.min) ? props.min : 0
		const maxCandidate = isFiniteNumber(props.max) ? props.max : 100
		const max = maxCandidate > min ? maxCandidate : min + 1
		const value = clamp(isFiniteNumber(props.value) ? props.value : min, min, max)

		const hasLow = isFiniteNumber(props.low)
		const hasHigh = isFiniteNumber(props.high)
		const hasRegions = hasLow || hasHigh
		const low = clamp(hasLow ? (props.low as number) : min, min, max)
		const high = clamp(hasHigh ? (props.high as number) : max, low, max)
		const midpoint = (min + max) / 2
		const optimum = clamp(isFiniteNumber(props.optimum) ? props.optimum : midpoint, min, max)

		const valueRegion = getRegion(value, low, high)
		const optimumRegion = getRegion(optimum, low, high)
		const regionDistance = Math.abs(valueRegion - optimumRegion)
		const derivedTone: ToneT = hasRegions ? TONE_BY_DISTANCE[regionDistance] : 'primary'
		const tone = props.tone ?? derivedTone

		const fraction = (value - min) / (max - min)
		const segmentCount = Math.max(1, Math.round(isFiniteNumber(props.segments) ? props.segments : 1))
		const isSegmented = segmentCount > 1
		const cellPositions = Array.from({ length: segmentCount }, (_unused, position) => position)

		const getCellWidth = (position: number): string => {
			const cellFill = clamp(fraction * segmentCount - position, 0, 1)
			return `${cellFill * 100}%`
		}

		const prefix = props.valuePrefix ?? ''
		const suffix = props.valueSuffix ?? ''
		const valueText = `${prefix}${value}${suffix}`
		const hasHeader = Boolean(props.label) || Boolean(props.doesShowValue)
		const meterClass = `meter is-${tone}`
		const trackClass = isSegmented ? 'track is-segmented' : 'track'

		return (
			<host
				shadowDom
				role="meter"
				aria-label={props.label || undefined}
				aria-valuemin={String(min)}
				aria-valuemax={String(max)}
				aria-valuenow={String(value)}
				aria-valuetext={valueText}
			>
				<div class={meterClass}>
					<div class="header" hidden={!hasHeader} aria-hidden="true">
						{props.label && <span class="label">{props.label}</span>}
						{props.doesShowValue && <span class="value">{valueText}</span>}
					</div>
					<div class={trackClass} part="track">
						{cellPositions.map((position) => (
							<span class="cell">
								<span class="bar" part="bar" style={{ width: getCellWidth(position) }}></span>
							</span>
						))}
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			value: { type: Number, reflect: true },
			min: { type: Number, reflect: true },
			max: { type: Number, reflect: true },
			low: { type: Number, reflect: true },
			high: { type: Number, reflect: true },
			optimum: { type: Number, reflect: true },
			segments: { type: Number, reflect: true },
			label: String,
			valuePrefix: String,
			valueSuffix: String,
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			doesShowValue: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-meter', ZMeter)
