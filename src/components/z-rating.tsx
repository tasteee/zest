import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { describableProps, describedBy, renderDescriptions, srOnlyStyles, useAccessibleName } from '../shared/accessible'
import { c, css, event, useProp, useRef, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'

/*
 * z-rating, a row of icons that picks a score. Hover previews, click
 * commits, and the keyboard works it like a slider: arrows step, Home
 * and End jump, a digit sets the value directly.
 *
 * `step="0.5"` allows half marks; the pointer picks the half it is over.
 * `is-read-only` turns it into a display: no focus, no hover, and it
 * renders any fraction (3.7 fills 70% of the fourth icon), named for a
 * screen reader as "Rated 3.7 of 5".
 *
 * Each icon is an empty shape with a filled copy clipped over it, so a
 * fraction is a width, and right-to-left fills from the right for free.
 */
const styles = css`
	:host {
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-1);
		--tone: var(--accent-primary);
		--z-rating-size: 1.25rem;
		--z-rating-empty: color-mix(in oklch, var(--text-primary) 14%, transparent);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	:host([tone='success']) { --tone: var(--status-success); }
	:host([tone='warning']) { --tone: var(--status-warning); }
	:host([tone='danger']) { --tone: var(--status-danger); }

	:host([size='sm']) { --z-rating-size: 1rem; }
	:host([size='lg']) { --z-rating-size: 1.75rem; }

	.row {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2-5);
	}

	.icons {
		display: inline-flex;
		align-items: center;
		gap: calc(var(--z-rating-size) * 0.18);
		border-radius: var(--radius-sm);
		outline: none;
		touch-action: none;
	}

	.icons.is-interactive {
		cursor: pointer;
	}

	.icons:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
	}

	.icons.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.icon {
		position: relative;
		display: inline-flex;
		width: var(--z-rating-size);
		height: var(--z-rating-size);
		flex-shrink: 0;
		transition: transform var(--motion-instant) var(--ease-enter);
	}

	.icons.is-interactive .icon.is-hovered {
		transform: scale(1.12);
	}

	.icon svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.empty svg {
		fill: var(--z-rating-empty);
		stroke: var(--z-rating-empty);
	}

	.fill {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		overflow: hidden;
		transition: width var(--motion-fast) var(--ease-enter);
	}

	.fill svg {
		width: var(--z-rating-size);
		fill: var(--tone);
		stroke: var(--tone);
	}

	svg {
		stroke-width: 1.5;
		stroke-linejoin: round;
	}

	.icons.is-previewing .fill svg {
		fill: color-mix(in oklch, var(--tone) 70%, transparent);
		stroke: color-mix(in oklch, var(--tone) 70%, transparent);
	}

	.value {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		font-variant-numeric: tabular-nums;
		line-height: var(--line-height-none);
	}

	:host([size='lg']) .value {
		font-size: var(--font-size-md);
	}
`

type ShapeT = 'star' | 'heart' | 'circle'

const STAR_PATH = 'M12 2.8l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 17.24l-5.66 2.97 1.08-6.3-4.57-4.46 6.32-.92z'
const HEART_PATH = 'M12 20.3s-7.6-4.55-9.2-9.1C1.6 7.8 3.75 4.6 7.05 4.6c2.05 0 3.6 1.15 4.95 2.95 1.35-1.8 2.9-2.95 4.95-2.95 3.3 0 5.45 3.2 4.25 6.6-1.6 4.55-9.2 9.1-9.2 9.1z'

const Shape = (shapeProps: { shape: ShapeT }) => {
	const isHeart = shapeProps.shape === 'heart'
	const isCircle = shapeProps.shape === 'circle'
	if (isCircle) {
		return (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<circle cx="12" cy="12" r="8.5" />
			</svg>
		)
	}
	const path = isHeart ? HEART_PATH : STAR_PATH
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d={path} />
		</svg>
	)
}

const clamp = (value: number, lowest: number, highest: number): number => {
	return Math.min(highest, Math.max(lowest, value))
}

const roundToStep = (value: number, step: number): number => {
	return Math.round(value / step) * step
}

const formatScore = (value: number): string => {
	const isWhole = Number.isInteger(value)
	if (isWhole) return String(value)
	return value.toFixed(1)
}

// Where on icon `position` the pointer is, as a score: the far half of
// an icon is the whole mark, the near half is a half mark when allowed.
const getPointerScore = (pointerEvent: PointerEvent, iconElement: HTMLElement, position: number, step: number): number => {
	const bounds = iconElement.getBoundingClientRect()
	const isRightToLeft = getComputedStyle(iconElement).direction === 'rtl'
	const offsetFromStart = isRightToLeft ? bounds.right - pointerEvent.clientX : pointerEvent.clientX - bounds.left
	const fraction = clamp(offsetFromStart / bounds.width, 0, 1)
	const allowsHalves = step < 1
	const isNearHalf = allowsHalves && fraction <= 0.5
	if (isNearHalf) return position + 0.5
	return position + 1
}

const getKeyScore = (key: string, current: number, step: number, max: number): number | null => {
	const isIncrease = key === 'ArrowRight' || key === 'ArrowUp'
	if (isIncrease) return clamp(current + step, 0, max)
	const isDecrease = key === 'ArrowLeft' || key === 'ArrowDown'
	if (isDecrease) return clamp(current - step, 0, max)
	if (key === 'Home') return 0
	if (key === 'End') return max
	const isDigit = /^[0-9]$/.test(key)
	if (isDigit) return clamp(Number(key), 0, max)
	return null
}

export const ZRating = c(
	(props) => {
		const t = useLocale()
		const accessibleName = useAccessibleName(props.label)
		const iconsRef = useRef<HTMLDivElement>()
		const [value, setValue] = useProp<number>('value')
		const [previewScore, setPreviewScore] = useState<number | null>(null)
		const defaultValue = useRef(value ?? 0)

		const max = Math.max(1, Math.round(props.max ?? 5))
		const step = props.step === 0.5 ? 0.5 : 1
		const shape: ShapeT = props.shape ?? 'star'
		const score = clamp(value ?? 0, 0, max)
		const hasScore = score > 0
		const isReadOnly = Boolean(props.isReadOnly)

		const missingValidity = { flags: { valueMissing: true }, message: t('selectOneOfTheseOptions') }
		const isMissing = Boolean(props.isRequired) && !hasScore

		const formControl = useFormControl({
			value: hasScore ? String(score) : null,
			isDisabled: props.isDisabled,
			isReadOnly,
			control: iconsRef,
			validity: isMissing ? missingValidity : { flags: {} },
			onReset: () => setValue(defaultValue.current),
			onRestore: (state) => {
				const isText = typeof state === 'string'
				if (isText) setValue(Number(state))
			}
		})
		const isDisabled = Boolean(props.isDisabled) || formControl.isFormDisabled
		const isInteractive = !isDisabled && !isReadOnly

		const commitScore = (nextScore: number) => {
			const shouldClear = Boolean(props.canClear) && nextScore === score
			const finalScore = shouldClear ? 0 : roundToStep(nextScore, step)
			const isUnchanged = finalScore === score
			if (isUnchanged) return
			setValue(finalScore)
			props.change({ value: finalScore })
		}

		const handlePointerMove = (pointerEvent: PointerEvent, position: number) => {
			if (!isInteractive) return
			const iconElement = pointerEvent.currentTarget as HTMLElement
			setPreviewScore(getPointerScore(pointerEvent, iconElement, position, step))
		}

		const handleClick = (clickEvent: PointerEvent, position: number) => {
			if (!isInteractive) return
			const iconElement = clickEvent.currentTarget as HTMLElement
			commitScore(getPointerScore(clickEvent, iconElement, position, step))
			setPreviewScore(null)
		}

		const handlePointerLeave = () => setPreviewScore(null)

		const handleKeyDown = (keyEvent: KeyboardEvent) => {
			if (!isInteractive) return
			const nextScore = getKeyScore(keyEvent.key, score, step, max)
			const isHandled = nextScore !== null
			if (!isHandled) return
			keyEvent.preventDefault()
			const isSame = nextScore === score
			if (isSame) return
			setValue(nextScore)
			props.change({ value: nextScore })
		}

		const isPreviewing = previewScore !== null
		const shownScore = isPreviewing ? (previewScore as number) : score
		const positions = Array.from({ length: max }, (_unused, position) => position)
		const valueText = t('ratingValue', { value: formatScore(score), max })
		const readonlyName = t('ratedValue', { value: formatScore(score), max })
		const nameForReadonly = accessibleName ? `${accessibleName}, ${readonlyName}` : readonlyName

		const iconsClass = ['icons']
			.concat(isInteractive ? ['is-interactive'] : [])
			.concat(isPreviewing ? ['is-previewing'] : [])
			.concat(isDisabled ? ['is-disabled'] : [])
			.join(' ')

		const interactiveAttributes = {
			role: 'slider',
			tabindex: isDisabled ? '-1' : '0',
			'aria-label': accessibleName ?? t('rating'),
			'aria-valuemin': '0',
			'aria-valuemax': String(max),
			'aria-valuenow': String(score),
			'aria-valuetext': valueText,
			'aria-disabled': isDisabled ? 'true' : undefined,
			'aria-required': props.isRequired ? 'true' : undefined,
			'aria-invalid': props.error ? 'true' : undefined,
			'aria-describedby': describedBy(props.description, props.error)
		}
		const readonlyAttributes = { role: 'img', 'aria-label': nameForReadonly }
		const iconsAttributes = isReadOnly ? readonlyAttributes : interactiveAttributes

		const renderIcon = (position: number) => {
			const fillFraction = clamp(shownScore - position, 0, 1)
			const fillWidth = `${fillFraction * 100}%`
			const isHovered = isPreviewing && position < shownScore
			const iconClass = isHovered ? 'icon is-hovered' : 'icon'
			return (
				<span
					class={iconClass}
					onpointermove={(pointerEvent: PointerEvent) => handlePointerMove(pointerEvent, position)}
					onclick={(clickEvent: PointerEvent) => handleClick(clickEvent, position)}
				>
					<span class="empty">
						<Shape shape={shape} />
					</span>
					<span class="fill" style={{ width: fillWidth }}>
						<Shape shape={shape} />
					</span>
				</span>
			)
		}

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<div class="row">
					<div
						ref={iconsRef}
						class={iconsClass}
						part="icons"
						onkeydown={handleKeyDown}
						onpointerleave={handlePointerLeave}
						{...iconsAttributes}
					>
						{positions.map(renderIcon)}
					</div>
					{props.doesShowValue && (
						<span class="value" aria-hidden="true">
							{formatScore(shownScore)}
						</span>
					)}
				</div>
				{renderDescriptions(props.description, props.error)}
			</host>
		)
	},
	{
		props: {
			...describableProps,
			value: { type: Number, reflect: true },
			max: { type: Number, reflect: true },
			step: { type: Number, reflect: true },
			name: { type: String, reflect: true },
			label: String,
			shape: { type: oneOf('star', 'heart', 'circle'), reflect: true },
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			doesShowValue: { type: Boolean, reflect: true },
			canClear: { type: Boolean, reflect: true },
			isReadOnly: { type: Boolean, reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: number }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles, srOnlyStyles],
		form: true
	}
)

defineFormElement('z-rating', ZRating)
