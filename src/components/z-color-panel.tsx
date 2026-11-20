import { c, css, event, useEffect, useHost, useProp, useRef, useState } from 'atomico'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { interactionStyles } from '../shared/interaction-styles'
import { useLocale, type LocaleKeyT } from '../shared/locale'
import { oneOf } from '../shared/prop-types'
import { copyText, COPY_FEEDBACK_DURATION } from '../shared/clipboard'
import { applyPosition, autoUpdate, computePosition, hideFloating, showFloating } from '../shared/overlay'
import {
	ALPHA_CHANNEL,
	COLOR_GROUPS,
	FORMAT_DEFINITIONS,
	SPACE_LAYOUTS,
	buildColorDetail,
	buildStateFromChannels,
	clampNumber,
	convertState,
	formatColor,
	formatHex,
	getAreaPixel,
	getAreaPoint,
	getFormatSpace,
	getSliderFraction,
	getSliderStops,
	parseColor,
	readChannels,
	resolveAllowedFormats,
	resolveColor,
	roundNumber,
	setAreaPoint,
	setSliderFraction,
	stateToRgba,
	type ChannelKeyT,
	type ChannelT,
	type ColorDetailT,
	type ColorFormatT,
	type ColorGroupT,
	type ColorStateT
} from '../shared/color'

// z-color-panel: the picker itself, without a trigger. Drop it
// inline in an inspector or settings form, or let
// z-color-picker float it from a swatch.
//
//   area        2D field for the active format's space
//   sliders     hue (or lightness), plus opacity with has-alpha
//   value row   format menu · editable CSS string · copy
//   channels    per-format number fields (R G B, L C H, ...)
//   swatches    opt-in quick picks
//
// The format decides the space the area draws: HSB for hex,
// RGB, HWB and P3; HSL for HSL; chroma × lightness for LCH
// and OKLCH; the a × b plane for LAB and OKLAB. Perceptual
// areas show the sRGB gamut edge and keep picks inside it.
const styles = css`
	:host {
		display: block;
		min-width: 14rem;
		--tone: var(--accent-primary);
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
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.color-panel {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
	}

	.color-area {
		position: relative;
		height: 9rem;
		border-radius: var(--radius-sm);
		background: var(--surface-subtle);
		cursor: crosshair;
		touch-action: none;
		outline: none;
	}

	.color-area-canvas {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}

	.color-area::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		border: 1px solid color-mix(in oklch, var(--text-primary) 10%, transparent);
		pointer-events: none;
	}

	.color-area:focus-visible,
	.color-track:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
	}

	/* Thumbs sit on raw color, not on a themed surface, so their
	   ring is absolute white with a hairline of absolute black. */
	.color-thumb {
		position: absolute;
		width: 0.875rem;
		height: 0.875rem;
		border-radius: var(--radius-full);
		background: var(--thumb-color);
		border: 2px solid #fff;
		outline: 1px solid rgb(0 0 0 / 0.35);
		transform: translate(-50%, -50%);
		pointer-events: none;
		box-sizing: border-box;
	}

	.color-sliders-row {
		display: flex;
		align-items: center;
		gap: var(--space-2-5);
	}

	.color-sliders {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: var(--space-2-5);
	}

	.color-track {
		position: relative;
		height: 0.75rem;
		border-radius: var(--radius-full);
		cursor: pointer;
		touch-action: none;
		outline: none;
		background: var(--track-fill);
	}

	.color-track.isAlpha {
		background:
			linear-gradient(to right, transparent, var(--track-color)),
			repeating-conic-gradient(var(--surface-strong) 0 25%, var(--surface-default) 0 50%) 0 0 / 0.5rem 0.5rem;
	}

	.color-track::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		border: 1px solid color-mix(in oklch, var(--text-primary) 10%, transparent);
		pointer-events: none;
	}

	/* Track thumbs travel inside the track, so 0% and 100%
	   sit flush with its ends instead of hanging past them. */
	.color-track {
		--thumb-size: 1rem;
	}

	.color-track .color-thumb {
		top: 50%;
		left: calc(var(--thumb-size) / 2 + var(--position) * (100% - var(--thumb-size)));
		width: var(--thumb-size);
		height: var(--thumb-size);
	}

	.color-icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.75rem;
		height: 1.75rem;
		padding: 0;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.color-icon-button:hover {
		color: var(--text-primary);
		background: var(--surface-subtle);
	}

	.color-icon-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: -2px;
	}

	.color-icon-button.isConfirmed {
		color: var(--tone);
	}

	.color-icon {
		width: 0.875rem;
		height: 0.875rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.color-value-row {
		display: flex;
		align-items: center;
		height: var(--control-height-sm);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-sm);
		transition: border-color var(--motion-fast) var(--ease-enter);
	}

	.color-value-row:focus-within {
		border-color: var(--tone);
	}

	.color-format-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		flex-shrink: 0;
		height: 100%;
		padding-inline: var(--space-2-5) var(--space-2);
		border: 0;
		border-inline-end: 1px solid var(--border-default);
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
		background: transparent;
		color: var(--text-secondary);
		font-family: var(--font-sans);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.06em;
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.color-format-button:hover,
	.color-format-button.isOpen {
		color: var(--text-primary);
		background: var(--surface-subtle);
	}

	.color-format-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: -2px;
	}

	.color-format-button.isStatic {
		cursor: default;
		background: transparent;
		color: var(--text-secondary);
	}

	.color-format-chevron {
		width: 0.625rem;
		height: 0.625rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: rotate var(--motion-fast) var(--ease-enter);
	}

	.color-format-button.isOpen .color-format-chevron {
		rotate: 180deg;
	}

	.color-value-input {
		flex: 1;
		min-width: 0;
		height: 100%;
		padding-inline: var(--space-2-5);
		border: 0;
		background: transparent;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		outline: none;
		text-overflow: ellipsis;
	}

	.color-value-row .color-icon-button {
		width: var(--control-height-sm);
		height: 100%;
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}

	.color-format-menu {
		position: fixed;
		inset: auto;
		top: 0;
		left: 0;
		margin: 0;
		box-sizing: border-box;
		min-width: 13rem;
		padding: var(--space-1);
		background: var(--surface-overlay);
		color: var(--text-primary);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-md);
		opacity: 0;
		translate: 0 calc(var(--motion-distance-sm) * var(--motion-travel) * -0.5);
		transition:
			opacity var(--motion-exit-fast) var(--ease-exit),
			translate var(--motion-exit-fast) var(--ease-exit);
	}

	.color-format-menu[data-state='open'] {
		opacity: 1;
		translate: 0 0;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			translate var(--motion-fast) var(--ease-enter);
	}

	.color-format-group + .color-format-group {
		margin-top: var(--space-1);
		padding-top: var(--space-1);
		border-top: 1px solid var(--border-default);
	}

	.color-format-group-label {
		padding: var(--space-1-5) var(--space-2) var(--space-1);
		color: var(--text-tertiary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.color-format-option {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
		height: 1.75rem;
		padding-inline: var(--space-2);
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.04em;
		text-align: start;
		cursor: pointer;
		outline: none;
	}

	.color-format-option:hover,
	.color-format-option:focus-visible {
		background: var(--surface-subtle);
	}

	.color-format-option.isSelected {
		color: var(--tone);
	}

	.color-format-option-preview {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		color: var(--text-tertiary);
		font-family: var(--font-mono);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-regular);
		letter-spacing: 0;
		text-align: end;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.color-channels {
		display: grid;
		grid-auto-columns: minmax(0, 1fr);
		grid-auto-flow: column;
		gap: var(--space-1-5);
	}

	.color-channel {
		display: flex;
		align-items: center;
		height: var(--control-height-sm);
		min-width: 0;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-sm);
		transition: border-color var(--motion-fast) var(--ease-enter);
	}

	.color-channel:focus-within {
		border-color: var(--tone);
	}

	.color-channel-symbol {
		flex-shrink: 0;
		padding-inline: var(--space-2) var(--space-1);
		color: var(--text-tertiary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		cursor: ew-resize;
		touch-action: none;
		user-select: none;
	}

	.color-channel-input {
		width: 100%;
		min-width: 0;
		height: 100%;
		padding-inline: 0 var(--space-1-5);
		border: 0;
		background: transparent;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-variant-numeric: tabular-nums;
		text-align: end;
		outline: none;
	}

	.color-swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(1.25rem, 1fr));
		gap: var(--space-1-5);
		padding-top: var(--space-3);
		border-top: 1px solid var(--border-default);
	}

	.color-swatch-button {
		aspect-ratio: 1;
		padding: 0;
		border: 0;
		border-radius: var(--radius-sm);
		background:
			linear-gradient(var(--swatch-color), var(--swatch-color)),
			repeating-conic-gradient(var(--surface-strong) 0 25%, var(--surface-default) 0 50%) 0 0 / 0.5rem 0.5rem;
		outline: 1px solid color-mix(in oklch, var(--text-primary) 14%, transparent);
		outline-offset: -1px;
		cursor: pointer;
		transition: scale var(--motion-instant) var(--ease-enter);
	}

	.color-swatch-button:hover {
		scale: 1.1;
	}

	.color-swatch-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 1px;
	}

	.color-swatch-button.isSelected {
		outline: 2px solid var(--text-primary);
		outline-offset: 1px;
	}
`

const FORMAT_GROUP_LABEL_KEYS: Record<ColorGroupT, LocaleKeyT> = {
	standard: 'colorFormatsStandard',
	perceptual: 'colorFormatsPerceptual',
	wideGamut: 'colorFormatsWideGamut'
}

const CHANNEL_LABEL_KEYS: Record<ChannelKeyT, LocaleKeyT> = {
	red: 'channelRed',
	green: 'channelGreen',
	blue: 'channelBlue',
	hue: 'hue',
	saturation: 'channelSaturation',
	lightness: 'lightness',
	brightness: 'channelBrightness',
	whiteness: 'channelWhiteness',
	blackness: 'channelBlackness',
	chroma: 'channelChroma',
	greenRed: 'channelGreenRed',
	blueYellow: 'channelBlueYellow',
	alpha: 'opacity'
}

const AREA_STEP = 0.01
const AREA_LARGE_STEP = 0.1
const HUE_STEP = 1 / 360
const LIGHTNESS_STEP = 0.01
const LARGE_STEP_MULTIPLIER = 10

type DragKindT = 'area' | 'slider' | 'alpha'

type EyeDropperResultT = { sRGBHex: string }
type EyeDropperT = { open: () => Promise<EyeDropperResultT> }
type EyeDropperConstructorT = new () => EyeDropperT

const getEyeDropperConstructor = (): EyeDropperConstructorT | null => {
	const hasWindow = typeof window !== 'undefined'
	if (!hasWindow) return null
	const candidate = (window as unknown as { EyeDropper?: EyeDropperConstructorT }).EyeDropper
	return candidate ?? null
}

const buildIndexes = (count: number): number[] => {
	return Array.from({ length: count }, (_unused, index) => index)
}

// ─── Area painting ───────────────────────────────────────────

const paintAreaRow = (pixels: Uint8ClampedArray, state: ColorStateT, row: number, width: number, height: number) => {
	const y = row / Math.max(1, height - 1)
	for (const column of buildIndexes(width)) {
		const x = column / Math.max(1, width - 1)
		const pixel = getAreaPixel(state, { x, y })
		if (!pixel) continue
		const offset = (row * width + column) * 4
		pixels[offset] = Math.round(pixel[0] * 255)
		pixels[offset + 1] = Math.round(pixel[1] * 255)
		pixels[offset + 2] = Math.round(pixel[2] * 255)
		pixels[offset + 3] = 255
	}
}

// Up to two canvas pixels per CSS pixel, so the gamut edge
// stays crisp on dense screens. Out-of-gamut pixels stay transparent, so the area's
// own surface shows where sRGB ends.
const paintArea = (canvas: HTMLCanvasElement, state: ColorStateT) => {
	const pixelRatio = Math.min(2, window.devicePixelRatio || 1)
	const width = Math.round(canvas.clientWidth * pixelRatio)
	const height = Math.round(canvas.clientHeight * pixelRatio)
	const hasSize = width > 0 && height > 0
	if (!hasSize) return
	const context = canvas.getContext('2d')
	if (!context) return
	canvas.width = width
	canvas.height = height
	const image = context.createImageData(width, height)
	for (const row of buildIndexes(height)) paintAreaRow(image.data, state, row, width, height)
	context.putImageData(image, 0, 0)
}

const buildFormatButtonClass = (isLocked: boolean, isOpen: boolean): string => {
	if (isLocked) return 'color-format-button isStatic'
	if (isOpen) return 'color-format-button isOpen'
	return 'color-format-button'
}

// ─── Icons ───────────────────────────────────────────────────

const CopyIcon = () => (
	<svg class="color-icon" viewBox="0 0 16 16" aria-hidden="true">
		<rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
		<path d="M10.5 5.5V3.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
	</svg>
)

const CheckIcon = () => (
	<svg class="color-icon" viewBox="0 0 16 16" aria-hidden="true">
		<path d="M3.5 8.5l3 3 6-7" />
	</svg>
)

const EyedropperIcon = () => (
	<svg class="color-icon" viewBox="0 0 16 16" aria-hidden="true">
		<path d="M10.5 2.5l3 3-1.5 1.5-3-3z" />
		<path d="M9.5 5l1.5 1.5-6 6H3.5V11z" />
	</svg>
)

const ChevronIcon = () => (
	<svg class="color-format-chevron" viewBox="0 0 10 10" aria-hidden="true">
		<path d="M2.5 4l2.5 2.5L7.5 4" />
	</svg>
)

// ─── Component ───────────────────────────────────────────────

export const ZColorPanel = c(
	(props) => {
		const translate = useLocale()
		const host = useHost()
		const [value, setValue] = useProp<string>('value')
		const [format, setFormat] = useProp<ColorFormatT>('format')
		const [workingState, setWorkingState] = useState<ColorStateT | null>(null)
		const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false)
		const [wasCopied, setWasCopied] = useState(false)
		const defaultValue = useRef(value)
		const areaRef = useRef<HTMLDivElement>()
		const canvasRef = useRef<HTMLCanvasElement>()
		const formatButtonRef = useRef<HTMLButtonElement>()
		const formatMenuRef = useRef<HTMLDivElement>()
		const valueInputRef = useRef<HTMLInputElement>()
		const latestStateRef = useRef<ColorStateT | null>(null)
		const dragOriginRef = useRef<{ state: ColorStateT; value: string } | null>(null)
		const scrubOriginRef = useRef<{ startX: number; startValue: number } | null>(null)

		// ── What the value means right now ──
		const allowedFormats = resolveAllowedFormats(props.formats)
		const resolved = resolveColor(value, format, allowedFormats)
		const activeFormat = resolved.format
		const activeSpace = getFormatSpace(activeFormat)
		const activeDefinition = FORMAT_DEFINITIONS[activeFormat]
		const isWorkingStateCurrent =
			workingState !== null && workingState.space === activeSpace && formatColor(workingState, activeFormat) === resolved.text
		const currentState = isWorkingStateCurrent ? (workingState as ColorStateT) : resolved.state
		const displayValue = resolved.text
		latestStateRef.current = currentState

		const { isFormDisabled } = useFormControl({
			value: displayValue,
			isDisabled: props.isDisabled,
			control: areaRef,
			onReset: () => setValue(defaultValue.current),
			onRestore: (state) => {
				const isRestorable = typeof state === 'string' && state !== ''
				if (isRestorable) setValue(state as string)
			}
		})
		const isDisabled = Boolean(props.isDisabled || isFormDisabled)

		// ── Committing a new color ──
		const emitInput = (detail: ColorDetailT) => props.input(detail)
		const emitChange = (detail: ColorDetailT) => props.change(detail)

		// `input` fires on every move; `change` once the person
		// lets go, like a native color input.
		const applyState = (nextState: ColorStateT, isCommit: boolean) => {
			const detail = buildColorDetail(nextState, activeFormat)
			setWorkingState(nextState)
			setValue(detail.value)
			emitInput(detail)
			if (isCommit) emitChange(detail)
		}

		const applyFormat = (nextFormat: ColorFormatT) => {
			const nextSpace = getFormatSpace(nextFormat)
			const nextState = convertState(currentState, nextSpace, workingState)
			const nextValue = formatColor(nextState, nextFormat)
			setWorkingState(nextState)
			setFormat(nextFormat)
			setValue(nextValue)
			props.formatchange({ value: nextValue, format: nextFormat })
		}

		// ── Area and slider dragging ──
		// Tracks inset their thumb by half its width at each end,
		// so the pointer maps onto the same shortened run.
		const readPointerFraction = (pointerEvent: PointerEvent) => {
			const target = pointerEvent.currentTarget as HTMLElement
			const rect = target.getBoundingClientRect()
			const isTrack = target.classList.contains('color-track')
			const thumb = target.querySelector<HTMLElement>('.color-thumb')
			const thumbInset = isTrack && thumb ? thumb.offsetWidth / 2 : 0
			const usableWidth = Math.max(1, rect.width - thumbInset * 2)
			const x = clampNumber((pointerEvent.clientX - rect.left - thumbInset) / usableWidth, 0, 1)
			const y = clampNumber((pointerEvent.clientY - rect.top) / rect.height, 0, 1)
			return { x, y }
		}

		// Moves are applied to the state the drag began with, so a
		// hue sweep through a narrow gamut gives chroma back after.
		const buildDraggedState = (kind: DragKindT, pointerEvent: PointerEvent): ColorStateT => {
			const origin = dragOriginRef.current?.state ?? currentState
			const point = readPointerFraction(pointerEvent)
			const isArea = kind === 'area'
			if (isArea) return setAreaPoint(currentState, point)
			const isSlider = kind === 'slider'
			if (isSlider) return setSliderFraction(origin, point.x)
			return { ...currentState, alpha: roundNumber(point.x, 3) }
		}

		const handleDragStart = (kind: DragKindT) => (pointerEvent: PointerEvent) => {
			if (isDisabled) return
			const target = pointerEvent.currentTarget as HTMLElement
			target.setPointerCapture(pointerEvent.pointerId)
			target.focus()
			dragOriginRef.current = { state: currentState, value: displayValue }
			applyState(buildDraggedState(kind, pointerEvent), false)
		}

		const handleDragMove = (kind: DragKindT) => (pointerEvent: PointerEvent) => {
			const target = pointerEvent.currentTarget as HTMLElement
			const isDragging = target.hasPointerCapture(pointerEvent.pointerId)
			if (!isDragging) return
			applyState(buildDraggedState(kind, pointerEvent), false)
		}

		const handleDragEnd = () => {
			const origin = dragOriginRef.current
			dragOriginRef.current = null
			if (!origin) return
			const latestState = latestStateRef.current ?? currentState
			const detail = buildColorDetail(latestState, activeFormat)
			const hasChanged = detail.value !== origin.value
			if (hasChanged) emitChange(detail)
		}

		// ── Keyboard on the area and sliders ──
		const getArrowDelta = (keyEvent: KeyboardEvent, step: number): { x: number; y: number } | null => {
			const amount = keyEvent.shiftKey ? step * LARGE_STEP_MULTIPLIER : step
			const deltas: Record<string, { x: number; y: number }> = {
				ArrowLeft: { x: -amount, y: 0 },
				ArrowRight: { x: amount, y: 0 },
				ArrowUp: { x: 0, y: -amount },
				ArrowDown: { x: 0, y: amount }
			}
			return deltas[keyEvent.key] ?? null
		}

		const handleAreaKeyDown = (keyEvent: KeyboardEvent) => {
			const delta = getArrowDelta(keyEvent, AREA_STEP)
			if (!delta) return
			keyEvent.preventDefault()
			const point = getAreaPoint(currentState)
			const nextPoint = { x: clampNumber(point.x + delta.x, 0, 1), y: clampNumber(point.y + delta.y, 0, 1) }
			applyState(setAreaPoint(currentState, nextPoint), true)
		}

		const layout = SPACE_LAYOUTS[activeSpace]
		const isHueSlider = layout.sliderLabelKey === 'hue'
		const sliderStep = isHueSlider ? HUE_STEP : LIGHTNESS_STEP

		const handleSliderKeyDown = (keyEvent: KeyboardEvent) => {
			const delta = getArrowDelta(keyEvent, sliderStep)
			if (!delta) return
			keyEvent.preventDefault()
			const change = delta.x - delta.y
			const nextFraction = clampNumber(getSliderFraction(currentState) + change, 0, 1)
			applyState(setSliderFraction(currentState, nextFraction), true)
		}

		const handleAlphaKeyDown = (keyEvent: KeyboardEvent) => {
			const delta = getArrowDelta(keyEvent, AREA_STEP)
			if (!delta) return
			keyEvent.preventDefault()
			const change = delta.x - delta.y
			const nextAlpha = roundNumber(clampNumber(currentState.alpha + change, 0, 1), 3)
			applyState({ ...currentState, alpha: nextAlpha }, true)
		}

		// ── Typed value ──
		// A pasted color in another allowed format switches to it;
		// otherwise it is converted into the current one.
		const handleValueCommit = (changeEvent: Event) => {
			changeEvent.stopPropagation()
			const input = changeEvent.target as HTMLInputElement
			const parsed = parseColor(input.value)
			if (!parsed) {
				input.value = displayValue
				return
			}
			const isPastedFormatAllowed = allowedFormats.includes(parsed.format)
			const isDifferentFormat = parsed.format !== activeFormat
			const shouldSwitchFormat = isPastedFormatAllowed && isDifferentFormat
			const targetFormat = shouldSwitchFormat ? parsed.format : activeFormat
			const nextState = convertState(parsed.state, getFormatSpace(targetFormat), workingState)
			const detail = buildColorDetail(nextState, targetFormat)
			setWorkingState(nextState)
			if (shouldSwitchFormat) setFormat(targetFormat)
			setValue(detail.value)
			input.value = detail.value
			if (shouldSwitchFormat) props.formatchange({ value: detail.value, format: targetFormat })
			emitInput(detail)
			emitChange(detail)
		}

		// Native input events are composed; keep them from posing
		// as this element's own `input` event outside.
		const stopNativeInput = (inputEvent: Event) => inputEvent.stopPropagation()

		// ── Copy ──
		useEffect(() => {
			if (!wasCopied) return
			const timeout = setTimeout(() => setWasCopied(false), COPY_FEEDBACK_DURATION)
			return () => clearTimeout(timeout)
		}, [wasCopied])

		const handleCopy = async () => {
			const result = await copyText(displayValue)
			if (!result.isCopied) {
				valueInputRef.current?.select()
				return
			}
			setWasCopied(true)
			props.copy({ value: displayValue })
		}

		// ── Eyedropper ──
		const EyeDropperConstructor = getEyeDropperConstructor()
		const isEyedropperShown = Boolean(props.hasEyedropper) && EyeDropperConstructor !== null

		const handleEyedropper = async () => {
			if (!EyeDropperConstructor) return
			const dropper = new EyeDropperConstructor()
			const picked = await dropper.open().catch(() => null)
			if (!picked) return
			const parsed = parseColor(picked.sRGBHex)
			if (!parsed) return
			const nextState = convertState({ ...parsed.state, alpha: currentState.alpha }, activeSpace, workingState)
			applyState(nextState, true)
		}

		// ── Channels ──
		const channelValues = readChannels(currentState, activeFormat)

		const commitChannel = (channel: ChannelT, channelIndex: number, rawNumber: number) => {
			const nextNumber = clampNumber(rawNumber, channel.min, channel.max)
			const isAlpha = channel.key === 'alpha'
			if (isAlpha) {
				applyState({ ...currentState, alpha: roundNumber(nextNumber / 100, 3) }, true)
				return
			}
			const nextValues = channelValues.map((channelValue, index) => (index === channelIndex ? nextNumber : channelValue))
			const builtState = buildStateFromChannels(activeFormat, nextValues, currentState.alpha, currentState)
			applyState(convertState(builtState, activeSpace, currentState), true)
		}

		const getChannelValue = (channel: ChannelT, channelIndex: number): number => {
			const isAlpha = channel.key === 'alpha'
			if (isAlpha) return currentState.alpha * 100
			return channelValues[channelIndex]
		}

		const handleChannelChange = (channel: ChannelT, channelIndex: number) => (changeEvent: Event) => {
			changeEvent.stopPropagation()
			const input = changeEvent.target as HTMLInputElement
			const typedNumber = parseFloat(input.value)
			const isNumber = Number.isFinite(typedNumber)
			if (!isNumber) {
				input.value = String(roundNumber(getChannelValue(channel, channelIndex), channel.precision))
				return
			}
			commitChannel(channel, channelIndex, typedNumber)
		}

		const handleChannelKeyDown = (channel: ChannelT, channelIndex: number) => (keyEvent: KeyboardEvent) => {
			const directions: Record<string, number> = { ArrowUp: 1, ArrowDown: -1 }
			const direction = directions[keyEvent.key]
			if (!direction) return
			keyEvent.preventDefault()
			const stepSize = keyEvent.shiftKey ? channel.step * LARGE_STEP_MULTIPLIER : channel.step
			commitChannel(channel, channelIndex, getChannelValue(channel, channelIndex) + direction * stepSize)
		}

		// Drag a channel's letter sideways to scrub its value.
		const handleScrubStart = (channel: ChannelT, channelIndex: number) => (pointerEvent: PointerEvent) => {
			if (isDisabled) return
			const target = pointerEvent.currentTarget as HTMLElement
			target.setPointerCapture(pointerEvent.pointerId)
			scrubOriginRef.current = { startX: pointerEvent.clientX, startValue: getChannelValue(channel, channelIndex) }
			dragOriginRef.current = { state: currentState, value: displayValue }
		}

		const handleScrubMove = (channel: ChannelT, channelIndex: number) => (pointerEvent: PointerEvent) => {
			const origin = scrubOriginRef.current
			if (!origin) return
			const pixelsMoved = pointerEvent.clientX - origin.startX
			const stepSize = pointerEvent.shiftKey ? channel.step * LARGE_STEP_MULTIPLIER : channel.step
			const nextNumber = clampNumber(origin.startValue + pixelsMoved * stepSize, channel.min, channel.max)
			const isAlpha = channel.key === 'alpha'
			if (isAlpha) {
				applyState({ ...currentState, alpha: roundNumber(nextNumber / 100, 3) }, false)
				return
			}
			const nextValues = channelValues.map((channelValue, index) => (index === channelIndex ? nextNumber : channelValue))
			const builtState = buildStateFromChannels(activeFormat, nextValues, currentState.alpha, currentState)
			applyState(convertState(builtState, activeSpace, currentState), false)
		}

		const handleScrubEnd = () => {
			scrubOriginRef.current = null
			handleDragEnd()
		}

		// ── Format menu ──
		const isFormatLocked = allowedFormats.length === 1

		const getFormatOptions = (): HTMLButtonElement[] => {
			const menu = formatMenuRef.current
			if (!menu) return []
			return [...menu.querySelectorAll<HTMLButtonElement>('.color-format-option')]
		}

		const closeFormatMenu = (shouldFocusButton: boolean) => {
			setIsFormatMenuOpen(false)
			if (shouldFocusButton) formatButtonRef.current?.focus()
		}

		const handleFormatSelect = (nextFormat: ColorFormatT) => {
			closeFormatMenu(true)
			const isSameFormat = nextFormat === activeFormat
			if (isSameFormat) return
			applyFormat(nextFormat)
		}

		const handleFormatMenuKeyDown = (keyEvent: KeyboardEvent) => {
			const isEscape = keyEvent.key === 'Escape'
			if (isEscape) {
				keyEvent.preventDefault()
				keyEvent.stopPropagation()
				closeFormatMenu(true)
				return
			}
			const isTab = keyEvent.key === 'Tab'
			if (isTab) {
				closeFormatMenu(false)
				return
			}
			const options = getFormatOptions()
			const focusedIndex = options.findIndex((option) => option === host.current.shadowRoot?.activeElement)
			const lastIndex = options.length - 1
			const targets: Record<string, number> = {
				ArrowDown: focusedIndex >= lastIndex ? 0 : focusedIndex + 1,
				ArrowUp: focusedIndex <= 0 ? lastIndex : focusedIndex - 1,
				Home: 0,
				End: lastIndex
			}
			const targetIndex = targets[keyEvent.key]
			const isNavigationKey = targetIndex !== undefined
			if (!isNavigationKey) return
			keyEvent.preventDefault()
			options[targetIndex]?.focus()
		}

		const handleFormatButtonKeyDown = (keyEvent: KeyboardEvent) => {
			const isArrowDown = keyEvent.key === 'ArrowDown'
			if (!isArrowDown) return
			keyEvent.preventDefault()
			setIsFormatMenuOpen(true)
		}

		// The menu floats in the top layer, so it is never clipped
		// by the panel or by the popover holding the panel.
		useEffect(() => {
			const menu = formatMenuRef.current
			const button = formatButtonRef.current
			const canFloat = Boolean(menu && button && menu.showPopover)
			if (!canFloat) return
			const floatingMenu = menu as HTMLDivElement
			const anchor = button as HTMLButtonElement
			if (!isFormatMenuOpen) {
				hideFloating(floatingMenu)
				return
			}
			showFloating(floatingMenu)
			const placeMenu = () => {
				const position = computePosition(anchor, floatingMenu, { placement: 'bottom-start', offset: 6 })
				applyPosition(floatingMenu, position)
			}
			const stopUpdating = autoUpdate(anchor, floatingMenu, placeMenu)
			const selectedOption = floatingMenu.querySelector<HTMLButtonElement>('.color-format-option.isSelected')
			selectedOption?.focus()
			const handleOutsidePointer = (pointerEvent: Event) => {
				const path = pointerEvent.composedPath()
				const isInside = path.includes(floatingMenu) || path.includes(anchor)
				if (!isInside) setIsFormatMenuOpen(false)
			}
			document.addEventListener('pointerdown', handleOutsidePointer)
			return () => {
				stopUpdating()
				document.removeEventListener('pointerdown', handleOutsidePointer)
				hideFloating(floatingMenu)
			}
		}, [isFormatMenuOpen])

		// ── Painting the area ──
		const sliderCoord = currentState.coords[layout.slider.coordIndex]
		const areaPaintKey = `${activeSpace}:${sliderCoord}`

		useEffect(() => {
			const canvas = canvasRef.current
			if (!canvas) return
			const frame = requestAnimationFrame(() => {
				const latestState = latestStateRef.current
				if (latestState) paintArea(canvas, latestState)
			})
			return () => cancelAnimationFrame(frame)
		}, [areaPaintKey])

		// A panel inside a closed popover has no size yet; paint
		// again the moment it gets one.
		useEffect(() => {
			const canvas = canvasRef.current
			const hasObserver = typeof ResizeObserver !== 'undefined'
			if (!canvas || !hasObserver) return
			const observer = new ResizeObserver(() => {
				const latestState = latestStateRef.current
				if (latestState) paintArea(canvas, latestState)
			})
			observer.observe(canvas)
			return () => observer.disconnect()
		}, [])

		// ── Render values ──
		const currentRgba = stateToRgba(currentState)
		const opaqueHex = formatHex({ ...currentRgba, alpha: 1 })
		const areaPoint = getAreaPoint(currentState)
		const sliderFraction = getSliderFraction(currentState)
		const sliderStops = getSliderStops(currentState)
		const sliderFill = `linear-gradient(to right, ${sliderStops.join(', ')})`
		const sliderThumbStopIndex = Math.round(sliderFraction * (sliderStops.length - 1))
		const sliderThumbColor = isHueSlider ? sliderStops[sliderThumbStopIndex] : opaqueHex
		const sliderScale = isHueSlider ? 1 : 100 / layout.slider.max
		const sliderDisplayValue = Math.round(sliderCoord * sliderScale)
		const sliderMax = isHueSlider ? 360 : 100
		const alphaPercent = Math.round(currentState.alpha * 100)
		const areaLabel = translate(layout.areaLabelKey)
		const sliderLabel = translate(layout.sliderLabelKey)
		const areaValueText = `${Math.round(areaPoint.x * 100)}%, ${Math.round((1 - areaPoint.y) * 100)}%`

		const isAlphaShown = Boolean(props.hasAlpha)
		const hasFormatChannels = activeDefinition.channels.length > 0
		const isChannelsShown = !props.isChannelsHidden && hasFormatChannels
		const visibleChannels = isAlphaShown ? [...activeDefinition.channels, ALPHA_CHANNEL] : activeDefinition.channels
		const isCopyShown = !props.isCopyHidden
		const copyLabel = wasCopied ? translate('copied') : translate('copy')
		const swatchColors: string[] = Array.isArray(props.swatches) ? (props.swatches as string[]) : []
		const isSwatchesShown = swatchColors.length > 0
		const formatButtonClass = buildFormatButtonClass(isFormatLocked, isFormatMenuOpen)
		const formatMenuExpanded = isFormatMenuOpen ? 'true' : 'false'
		const formatButtonExpanded = isFormatLocked ? undefined : formatMenuExpanded
		const formatButtonPopup = isFormatLocked ? undefined : 'listbox'
		// The name starts with the visible text ("HEX"), so a voice-control
		// user who says what they see reaches the button (WCAG 2.5.3).
		const formatButtonName = [activeDefinition.label, translate('colorFormat')].join(', ')
		const copyButtonClass = wasCopied ? 'color-icon-button isConfirmed' : 'color-icon-button'
		const visibleGroups = COLOR_GROUPS.filter((group) => allowedFormats.some((allowed) => FORMAT_DEFINITIONS[allowed].group === group))

		const renderFormatOption = (optionFormat: ColorFormatT) => {
			const isSelected = optionFormat === activeFormat
			const optionClass = isSelected ? 'color-format-option isSelected' : 'color-format-option'
			const preview = formatColor(convertState(currentState, getFormatSpace(optionFormat)), optionFormat)
			return (
				<button
					type="button"
					class={optionClass}
					role="option"
					tabindex="-1"
					aria-selected={isSelected ? 'true' : 'false'}
					onclick={() => handleFormatSelect(optionFormat)}
				>
					<span>{FORMAT_DEFINITIONS[optionFormat].label}</span>
					<span class="color-format-option-preview" aria-hidden="true">
						{preview}
					</span>
				</button>
			)
		}

		const renderFormatGroup = (group: ColorGroupT) => {
			const groupFormats = allowedFormats.filter((allowed) => FORMAT_DEFINITIONS[allowed].group === group)
			const groupLabel = translate(FORMAT_GROUP_LABEL_KEYS[group])
			return (
				<div class="color-format-group" role="group" aria-label={groupLabel}>
					<div class="color-format-group-label" aria-hidden="true">
						{groupLabel}
					</div>
					{groupFormats.map(renderFormatOption)}
				</div>
			)
		}

		const renderChannel = (channel: ChannelT, channelIndex: number) => {
			const channelValue = roundNumber(getChannelValue(channel, channelIndex), channel.precision)
			const channelLabel = translate(CHANNEL_LABEL_KEYS[channel.key])
			return (
				<label class="color-channel">
					<span
						class="color-channel-symbol"
						aria-hidden="true"
						onpointerdown={handleScrubStart(channel, channelIndex)}
						onpointermove={handleScrubMove(channel, channelIndex)}
						onpointerup={handleScrubEnd}
						onlostpointercapture={handleScrubEnd}
					>
						{channel.symbol}
					</span>
					<input
						class="color-channel-input"
						type="text"
						inputmode="decimal"
						spellcheck={false}
						autocomplete="off"
						aria-label={channelLabel}
						value={String(channelValue)}
						disabled={isDisabled}
						oninput={stopNativeInput}
						onchange={handleChannelChange(channel, channelIndex)}
						onkeydown={handleChannelKeyDown(channel, channelIndex)}
					/>
				</label>
			)
		}

		const renderSwatch = (swatch: string) => {
			const parsedSwatch = parseColor(swatch)
			const isSelected = parsedSwatch !== null && formatHex(stateToRgba(parsedSwatch.state)) === formatHex(currentRgba)
			const swatchClass = isSelected ? 'color-swatch-button isSelected' : 'color-swatch-button'
			const handleSwatchClick = () => {
				if (!parsedSwatch) return
				applyState(convertState(parsedSwatch.state, activeSpace, workingState), true)
			}
			return (
				<button
					type="button"
					class={swatchClass}
					style={{ '--swatch-color': swatch }}
					aria-label={swatch}
					aria-pressed={isSelected ? 'true' : 'false'}
					disabled={isDisabled}
					onclick={handleSwatchClick}
				></button>
			)
		}

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<div class="color-panel">
					<div
						ref={areaRef}
						class="color-area"
						role="slider"
						tabindex={isDisabled ? '-1' : '0'}
						aria-label={areaLabel}
						aria-valuetext={areaValueText}
						aria-disabled={isDisabled ? 'true' : undefined}
						onpointerdown={handleDragStart('area')}
						onpointermove={handleDragMove('area')}
						onpointerup={handleDragEnd}
						onlostpointercapture={handleDragEnd}
						onkeydown={handleAreaKeyDown}
					>
						<canvas ref={canvasRef} class="color-area-canvas" aria-hidden="true"></canvas>
						<span
							class="color-thumb"
							style={{ left: `${areaPoint.x * 100}%`, top: `${areaPoint.y * 100}%`, '--thumb-color': opaqueHex }}
						></span>
					</div>

					<div class="color-sliders-row">
						{isEyedropperShown && (
							<button type="button" class="color-icon-button" aria-label={translate('pickFromScreen')} disabled={isDisabled} onclick={handleEyedropper}>
								<EyedropperIcon />
							</button>
						)}
						<div class="color-sliders">
							<div
								class="color-track"
								style={{ '--track-fill': sliderFill }}
								role="slider"
								tabindex={isDisabled ? '-1' : '0'}
								aria-label={sliderLabel}
								aria-valuemin="0"
								aria-valuemax={String(sliderMax)}
								aria-valuenow={String(sliderDisplayValue)}
								aria-disabled={isDisabled ? 'true' : undefined}
								onpointerdown={handleDragStart('slider')}
								onpointermove={handleDragMove('slider')}
								onpointerup={handleDragEnd}
								onlostpointercapture={handleDragEnd}
								onkeydown={handleSliderKeyDown}
							>
								<span class="color-thumb" style={{ '--position': String(sliderFraction), '--thumb-color': sliderThumbColor }}></span>
							</div>
							{isAlphaShown && (
								<div
									class="color-track isAlpha"
									style={{ '--track-color': opaqueHex }}
									role="slider"
									tabindex={isDisabled ? '-1' : '0'}
									aria-label={translate('opacity')}
									aria-valuemin="0"
									aria-valuemax="100"
									aria-valuenow={String(alphaPercent)}
									aria-disabled={isDisabled ? 'true' : undefined}
									onpointerdown={handleDragStart('alpha')}
									onpointermove={handleDragMove('alpha')}
									onpointerup={handleDragEnd}
									onlostpointercapture={handleDragEnd}
									onkeydown={handleAlphaKeyDown}
								>
									<span class="color-thumb" style={{ '--position': String(currentState.alpha), '--thumb-color': opaqueHex }}></span>
								</div>
							)}
						</div>
					</div>

					<div class="color-value-row">
						<button
							ref={formatButtonRef}
							type="button"
							class={formatButtonClass}
							aria-label={formatButtonName}
							aria-haspopup={formatButtonPopup}
							aria-expanded={formatButtonExpanded}
							disabled={isDisabled || isFormatLocked}
							onclick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
							onkeydown={handleFormatButtonKeyDown}
						>
							{activeDefinition.label}
							{!isFormatLocked && <ChevronIcon />}
						</button>
						<input
							ref={valueInputRef}
							class="color-value-input"
							type="text"
							spellcheck={false}
							autocomplete="off"
							aria-label={translate('colorValue')}
							value={displayValue}
							disabled={isDisabled}
							oninput={stopNativeInput}
							onchange={handleValueCommit}
						/>
						{isCopyShown && (
							<button type="button" class={copyButtonClass} aria-label={copyLabel} disabled={isDisabled} onclick={handleCopy}>
								{wasCopied ? <CheckIcon /> : <CopyIcon />}
							</button>
						)}
					</div>

					{!isFormatLocked && (
						<div
							ref={formatMenuRef}
							class="color-format-menu"
							popover="manual"
							role="listbox"
							aria-label={translate('colorFormat')}
							onkeydown={handleFormatMenuKeyDown}
						>
							{visibleGroups.map(renderFormatGroup)}
						</div>
					)}

					{isChannelsShown && (
						<div class="color-channels" role="group" aria-label={translate('colorChannels')}>
							{visibleChannels.map(renderChannel)}
						</div>
					)}

					{isSwatchesShown && (
						<div class="color-swatches" role="group" aria-label={translate('colorSwatches')}>
							{swatchColors.map(renderSwatch)}
						</div>
					)}
				</div>
			</host>
		)
	},
	{
		props: {
			value: { type: String, reflect: true },
			format: { type: oneOf('hex', 'rgb', 'hsl', 'hsb', 'hwb', 'oklch', 'oklab', 'lch', 'lab', 'p3'), reflect: true },
			formats: { type: Array },
			swatches: { type: Array },
			name: { type: String, reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			hasAlpha: { type: Boolean, reflect: true },
			hasEyedropper: { type: Boolean, reflect: true },
			isChannelsHidden: { type: Boolean, reflect: true },
			isCopyHidden: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			input: event<ColorDetailT>({ bubbles: true, composed: true }),
			change: event<ColorDetailT>({ bubbles: true, composed: true }),
			formatchange: event<{ value: string; format: ColorFormatT }>({ bubbles: true, composed: true }),
			copy: event<{ value: string }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles],
		form: true
	}
)

defineFormElement('z-color-panel', ZColorPanel)
