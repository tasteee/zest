import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { srOnlyStyles } from '../shared/accessible'
import { c, css, event, useEffect, useHost, useProp, useRef, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import './z-slider'

/*
 * z-image-cropper, frame part of an image: an avatar, a cover, a
 * thumbnail. The crop frame stays still in the middle; the image moves
 * and scales under it, so the frame can never leave the picture.
 *
 *   drag             pan              wheel / pinch   zoom at the pointer
 *   arrow keys       pan (Shift: more)  + / −         zoom
 *   0                reset
 *
 * `aspect` fixes the frame's shape ("1", "16/9", "4:3"); `shape="circle"`
 * rounds it for avatars. The zoom slider under the stage can be hidden
 * with `is-zoom-hidden`.
 *
 * The crop is in the image's own pixels. Read it from the `input` and
 * `change` events or `getCrop()`, or let the element cut the image:
 *
 *   const blob = await cropper.toBlob('image/webp', 0.9)
 *   const canvas = cropper.toCanvas({ width: 256 })
 *
 * A circle exports with transparent corners (use PNG or WebP). A remote
 * image needs `cross-origin="anonymous"` and CORS headers to export.
 */
const styles = css`
	:host {
		display: block;
		width: 100%;
		min-width: 0;
		--z-image-cropper-height: 20rem;
		--frame-color: color-mix(in oklch, var(--text-strong) 90%, transparent);
		--grid-color: color-mix(in oklch, var(--text-strong) 35%, transparent);
	}

	:host([is-hidden]) {
		display: none;
	}

	.stage {
		position: relative;
		height: var(--z-image-cropper-height);
		overflow: hidden;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		background: var(--surface-subtle);
		cursor: grab;
		touch-action: none;
		user-select: none;
		-webkit-user-select: none;
		outline: none;
	}

	.stage:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.stage.is-dragging {
		cursor: grabbing;
	}

	.stage.is-disabled {
		cursor: default;
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.stage.is-empty {
		cursor: default;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		max-width: none;
		transform-origin: 0 0;
		will-change: transform;
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--motion-slow) var(--ease-enter);
	}

	img.is-ready {
		opacity: 1;
	}

	.overlay {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.veil {
		fill: var(--surface-scrim);
		fill-rule: evenodd;
	}

	.frame-line {
		fill: none;
		stroke: var(--frame-color);
		stroke-width: 1;
	}

	.corner {
		fill: none;
		stroke: var(--frame-color);
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.grid {
		stroke: var(--grid-color);
		stroke-width: 1;
		opacity: 0;
		transition: opacity var(--motion-fast) var(--ease-enter);
	}

	.stage.is-dragging .grid,
	.stage.is-zooming .grid {
		opacity: 1;
	}

	.placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-tertiary);
	}

	.placeholder svg {
		width: 1.75rem;
		height: 1.75rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-top: var(--space-3);
	}

	.controls[hidden] {
		display: none;
	}

	.controls z-slider {
		flex: 1 1 auto;
	}

	.zoom-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: var(--control-height-sm);
		height: var(--control-height-sm);
		padding: 0;
		border: none;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			background-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
	}

	.zoom-button:hover {
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
		color: var(--text-primary);
	}

	.zoom-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.zoom-button:disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.zoom-button svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}
`

export type CropRectT = { x: number; y: number; width: number; height: number }
export type CropDetailT = CropRectT & { zoom: number }
export type CropCanvasOptionsT = { width?: number; height?: number }
// The <canvas> toCanvas() returns, described by the parts a caller uses.
// Public declarations name no DOM element types (JSR checks them without
// the DOM library); cast to HTMLCanvasElement to insert it into a page.
export type CropCanvasT = {
	width: number
	height: number
	toBlob: (callback: (blob: Blob | null) => void, type?: string, quality?: number) => void
	toDataURL: (type?: string, quality?: number) => string
}
export type ImageCropperMethodsT = {
	getCrop: () => CropRectT | null
	toCanvas: (options?: CropCanvasOptionsT) => CropCanvasT | null
	toBlob: (type?: string, quality?: number) => Promise<Blob | null>
	toDataURL: (type?: string, quality?: number) => string | null
	reset: () => void
}

type SizeT = { width: number; height: number }
type PointT = { x: number; y: number }

const FRAME_INSET = 24
const KEY_PAN_STEP = 10
const KEY_PAN_STEP_LARGE = 50
const KEY_ZOOM_STEP = 0.1
const WHEEL_SETTLE_MS = 220

const clamp = (value: number, lowest: number, highest: number): number => {
	return Math.min(highest, Math.max(lowest, value))
}

// "1", "16/9", "4:3" and "1.5" all read as width ÷ height.
const parseAspect = (aspect?: string): number => {
	if (!aspect) return 1
	const parts = aspect.replace(':', '/').split('/')
	const width = Number(parts[0])
	const height = parts.length > 1 ? Number(parts[1]) : 1
	const isValid = width > 0 && height > 0
	if (!isValid) return 1
	return width / height
}

const getFrameSize = (stage: SizeT, aspect: number): SizeT => {
	const availableWidth = Math.max(0, stage.width - FRAME_INSET * 2)
	const availableHeight = Math.max(0, stage.height - FRAME_INSET * 2)
	const isAvailableWider = availableWidth / Math.max(availableHeight, 1) > aspect
	if (isAvailableWider) return { width: availableHeight * aspect, height: availableHeight }
	return { width: availableWidth, height: availableWidth / aspect }
}

const getBaseScale = (frame: SizeT, natural: SizeT): number => {
	const hasImage = natural.width > 0 && natural.height > 0
	if (!hasImage) return 1
	return Math.max(frame.width / natural.width, frame.height / natural.height)
}

// Keeps the frame inside the picture: the centre may only travel as far
// as half a frame from each edge, measured in image pixels.
const clampCenter = (center: PointT, frame: SizeT, natural: SizeT, scale: number): PointT => {
	const halfWidth = frame.width / 2 / scale
	const halfHeight = frame.height / 2 / scale
	const x = clamp(center.x, halfWidth, Math.max(halfWidth, natural.width - halfWidth))
	const y = clamp(center.y, halfHeight, Math.max(halfHeight, natural.height - halfHeight))
	return { x, y }
}

const roundRect = (rect: CropRectT): CropRectT => {
	return { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) }
}

const getPointerDistance = (first: PointT, second: PointT): number => {
	return Math.hypot(first.x - second.x, first.y - second.y)
}

const getMidpoint = (first: PointT, second: PointT): PointT => {
	return { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
}

const buildVeilPath = (stage: SizeT, frame: SizeT, isCircle: boolean): string => {
	const left = (stage.width - frame.width) / 2
	const top = (stage.height - frame.height) / 2
	const outer = `M0 0H${stage.width}V${stage.height}H0Z`
	if (!isCircle) return `${outer}M${left} ${top}h${frame.width}v${frame.height}h${-frame.width}Z`
	const radiusX = frame.width / 2
	const radiusY = frame.height / 2
	const centerY = top + radiusY
	const hole = `M${left} ${centerY}a${radiusX} ${radiusY} 0 1 0 ${frame.width} 0a${radiusX} ${radiusY} 0 1 0 ${-frame.width} 0Z`
	return `${outer}${hole}`
}

const buildCornerPaths = (stage: SizeT, frame: SizeT): string[] => {
	const length = Math.min(16, frame.width / 4, frame.height / 4)
	const left = (stage.width - frame.width) / 2
	const top = (stage.height - frame.height) / 2
	const right = left + frame.width
	const bottom = top + frame.height
	return [
		`M${left} ${top + length}V${top}H${left + length}`,
		`M${right - length} ${top}H${right}V${top + length}`,
		`M${right} ${bottom - length}V${bottom}H${right - length}`,
		`M${left + length} ${bottom}H${left}V${bottom - length}`
	]
}

const buildGridPath = (stage: SizeT, frame: SizeT): string => {
	const left = (stage.width - frame.width) / 2
	const top = (stage.height - frame.height) / 2
	const thirdWidth = frame.width / 3
	const thirdHeight = frame.height / 3
	const verticals = `M${left + thirdWidth} ${top}v${frame.height}M${left + thirdWidth * 2} ${top}v${frame.height}`
	const horizontals = `M${left} ${top + thirdHeight}h${frame.width}M${left} ${top + thirdHeight * 2}h${frame.width}`
	return `${verticals}${horizontals}`
}

const PlaceholderIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<rect x="3" y="4" width="18" height="16" rx="2.5" />
		<circle cx="9" cy="10" r="1.75" />
		<path d="M21 16l-5-5-9 9" />
	</svg>
)

const MinusIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d="M6 12h12" />
	</svg>
)

const PlusIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d="M6 12h12M12 6v12" />
	</svg>
)

export const ZImageCropper = c(
	(props) => {
		const t = useLocale()
		const host = useHost()
		const stageRef = useRef<HTMLDivElement>()
		const imageRef = useRef<HTMLImageElement>()
		const pointers = useRef(new Map<number, PointT>())
		const pinchStart = useRef<{ distance: number; zoom: number } | null>(null)
		const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
		const hasSeenSource = useRef(false)
		const [zoom, setZoom] = useProp<number>('zoom')
		const [stageSize, setStageSize] = useState<SizeT>({ width: 0, height: 0 })
		const [naturalSize, setNaturalSize] = useState<SizeT>({ width: 0, height: 0 })
		const [center, setCenter] = useState<PointT>({ x: 0, y: 0 })
		const [isDragging, setIsDragging] = useState(false)
		const [isZooming, setIsZooming] = useState(false)
		const [announcement, setAnnouncement] = useState('')

		const maxZoom = Math.max(1, props.maxZoom ?? 3)
		const currentZoom = clamp(zoom ?? 1, 1, maxZoom)
		const aspect = parseAspect(props.aspect)
		const isCircle = props.shape === 'circle'
		const isDisabled = Boolean(props.isDisabled)
		const hasImage = naturalSize.width > 0 && naturalSize.height > 0
		const frameSize = getFrameSize(stageSize, aspect)
		const baseScale = getBaseScale(frameSize, naturalSize)
		const scale = baseScale * currentZoom
		const safeCenter = clampCenter(center, frameSize, naturalSize, scale)

		const getCropFor = (cropCenter: PointT, cropScale: number): CropRectT => {
			const width = frameSize.width / cropScale
			const height = frameSize.height / cropScale
			return { x: cropCenter.x - width / 2, y: cropCenter.y - height / 2, width, height }
		}

		const buildDetail = (detailCenter: PointT, detailZoom: number): CropDetailT => {
			const crop = roundRect(getCropFor(detailCenter, baseScale * detailZoom))
			return { ...crop, zoom: detailZoom }
		}

		const describePosition = (describedCenter: PointT, describedZoom: number): string => {
			const x = Math.round((describedCenter.x / Math.max(naturalSize.width, 1)) * 100)
			const y = Math.round((describedCenter.y / Math.max(naturalSize.height, 1)) * 100)
			return t('cropPosition', { x, y, zoom: describedZoom.toFixed(1) })
		}

		// One writer for every move: clamps, stores, and reports `input`.
		const applyView = (nextCenter: PointT, nextZoom: number) => {
			const clampedZoom = clamp(nextZoom, 1, maxZoom)
			const nextScale = baseScale * clampedZoom
			const clampedCenter = clampCenter(nextCenter, frameSize, naturalSize, nextScale)
			setCenter(clampedCenter)
			setZoom(clampedZoom)
			props.input(buildDetail(clampedCenter, clampedZoom))
			return { center: clampedCenter, zoom: clampedZoom }
		}

		const commitView = (view: { center: PointT; zoom: number }) => {
			props.change(buildDetail(view.center, view.zoom))
		}

		// Zooms so the image point under `stagePoint` stays where it is.
		const zoomAbout = (nextZoom: number, stagePoint: PointT) => {
			const clampedZoom = clamp(nextZoom, 1, maxZoom)
			const offsetX = stagePoint.x - stageSize.width / 2
			const offsetY = stagePoint.y - stageSize.height / 2
			const imagePointX = safeCenter.x + offsetX / scale
			const imagePointY = safeCenter.y + offsetY / scale
			const nextScale = baseScale * clampedZoom
			const nextCenter = { x: imagePointX - offsetX / nextScale, y: imagePointY - offsetY / nextScale }
			return applyView(nextCenter, clampedZoom)
		}

		const getStageCenter = (): PointT => ({ x: stageSize.width / 2, y: stageSize.height / 2 })

		const toStagePoint = (clientX: number, clientY: number): PointT => {
			const bounds = stageRef.current?.getBoundingClientRect()
			if (!bounds) return { x: 0, y: 0 }
			return { x: clientX - bounds.left, y: clientY - bounds.top }
		}

		const resetView = () => {
			const imageCenter = { x: naturalSize.width / 2, y: naturalSize.height / 2 }
			const view = applyView(imageCenter, 1)
			commitView(view)
		}

		// Watch the stage size; the frame and scale follow it.
		useEffect(() => {
			const stage = stageRef.current
			if (!stage) return
			const canObserve = typeof ResizeObserver !== 'undefined'
			if (!canObserve) return
			const observer = new ResizeObserver((entries) => {
				const box = entries[0].contentRect
				setStageSize({ width: box.width, height: box.height })
			})
			observer.observe(stage)
			return () => observer.disconnect()
		}, [])

		// A new image starts centred. The first one keeps the `zoom` it
		// was given; a later swap starts over at 1.
		useEffect(() => {
			setNaturalSize({ width: 0, height: 0 })
			const isFirstSource = !hasSeenSource.current
			hasSeenSource.current = true
			if (isFirstSource) return
			setZoom(1)
		}, [props.src])

		const handleImageLoad = () => {
			const image = imageRef.current
			if (!image) return
			const loadedSize = { width: image.naturalWidth, height: image.naturalHeight }
			setNaturalSize(loadedSize)
			setCenter({ x: loadedSize.width / 2, y: loadedSize.height / 2 })
			props.load({ width: loadedSize.width, height: loadedSize.height })
		}

		const handlePointerDown = (pointerEvent: PointerEvent) => {
			const canDrag = hasImage && !isDisabled
			if (!canDrag) return
			const stage = stageRef.current
			stage?.setPointerCapture(pointerEvent.pointerId)
			pointers.current.set(pointerEvent.pointerId, { x: pointerEvent.clientX, y: pointerEvent.clientY })
			const isPinch = pointers.current.size === 2
			if (isPinch) {
				const points = [...pointers.current.values()]
				pinchStart.current = { distance: getPointerDistance(points[0], points[1]), zoom: currentZoom }
			}
			setIsDragging(true)
		}

		const handlePointerMove = (pointerEvent: PointerEvent) => {
			const previous = pointers.current.get(pointerEvent.pointerId)
			if (!previous) return
			const next = { x: pointerEvent.clientX, y: pointerEvent.clientY }
			pointers.current.set(pointerEvent.pointerId, next)

			const isPinching = pointers.current.size >= 2 && pinchStart.current !== null
			if (isPinching) {
				const points = [...pointers.current.values()]
				const distance = getPointerDistance(points[0], points[1])
				const ratio = distance / Math.max(1, (pinchStart.current as { distance: number }).distance)
				const midpoint = getMidpoint(points[0], points[1])
				const pinchZoom = (pinchStart.current as { zoom: number }).zoom * ratio
				zoomAbout(pinchZoom, toStagePoint(midpoint.x, midpoint.y))
				return
			}

			const deltaX = next.x - previous.x
			const deltaY = next.y - previous.y
			applyView({ x: safeCenter.x - deltaX / scale, y: safeCenter.y - deltaY / scale }, currentZoom)
		}

		const handlePointerUp = (pointerEvent: PointerEvent) => {
			const wasTracked = pointers.current.delete(pointerEvent.pointerId)
			if (!wasTracked) return
			const hasFewerThanTwo = pointers.current.size < 2
			if (hasFewerThanTwo) pinchStart.current = null
			const isLastPointer = pointers.current.size === 0
			if (!isLastPointer) return
			setIsDragging(false)
			commitView({ center: safeCenter, zoom: currentZoom })
		}

		const handleWheel = (wheelEvent: WheelEvent) => {
			const canZoom = hasImage && !isDisabled
			if (!canZoom) return
			wheelEvent.preventDefault()
			const factor = Math.exp(-wheelEvent.deltaY * 0.002)
			const view = zoomAbout(currentZoom * factor, toStagePoint(wheelEvent.clientX, wheelEvent.clientY))
			setIsZooming(true)
			if (wheelTimer.current) clearTimeout(wheelTimer.current)
			wheelTimer.current = setTimeout(() => {
				setIsZooming(false)
				commitView(view)
			}, WHEEL_SETTLE_MS)
		}

		// The platform marks wheel listeners passive by default; the stage
		// has to cancel the page scroll, so it registers its own.
		useEffect(() => {
			const stage = stageRef.current
			if (!stage) return
			stage.addEventListener('wheel', handleWheel, { passive: false })
			return () => stage.removeEventListener('wheel', handleWheel)
		})

		const getKeyView = (keyEvent: KeyboardEvent): { center: PointT; zoom: number } | null => {
			const panStep = (keyEvent.shiftKey ? KEY_PAN_STEP_LARGE : KEY_PAN_STEP) / scale
			if (keyEvent.key === 'ArrowLeft') return { center: { x: safeCenter.x - panStep, y: safeCenter.y }, zoom: currentZoom }
			if (keyEvent.key === 'ArrowRight') return { center: { x: safeCenter.x + panStep, y: safeCenter.y }, zoom: currentZoom }
			if (keyEvent.key === 'ArrowUp') return { center: { x: safeCenter.x, y: safeCenter.y - panStep }, zoom: currentZoom }
			if (keyEvent.key === 'ArrowDown') return { center: { x: safeCenter.x, y: safeCenter.y + panStep }, zoom: currentZoom }
			const isZoomIn = keyEvent.key === '+' || keyEvent.key === '='
			if (isZoomIn) return { center: safeCenter, zoom: currentZoom + KEY_ZOOM_STEP }
			const isZoomOut = keyEvent.key === '-' || keyEvent.key === '_'
			if (isZoomOut) return { center: safeCenter, zoom: currentZoom - KEY_ZOOM_STEP }
			if (keyEvent.key === '0') return { center: { x: naturalSize.width / 2, y: naturalSize.height / 2 }, zoom: 1 }
			return null
		}

		const handleKeyDown = (keyEvent: KeyboardEvent) => {
			const canMove = hasImage && !isDisabled
			if (!canMove) return
			const keyView = getKeyView(keyEvent)
			const isHandled = keyView !== null
			if (!isHandled) return
			keyEvent.preventDefault()
			const view = applyView(keyView.center, keyView.zoom)
			commitView(view)
			setAnnouncement(describePosition(view.center, view.zoom))
		}

		const handleSliderInput = (inputEvent: CustomEvent<{ value: number }>) => {
			inputEvent.stopPropagation()
			zoomAbout(inputEvent.detail.value, getStageCenter())
		}

		const handleSliderChange = (changeEvent: CustomEvent<{ value: number }>) => {
			changeEvent.stopPropagation()
			const view = zoomAbout(changeEvent.detail.value, getStageCenter())
			commitView(view)
		}

		const stepZoom = (direction: number) => {
			const view = zoomAbout(currentZoom + direction * KEY_ZOOM_STEP * 2, getStageCenter())
			commitView(view)
		}

		const drawCrop = (options?: CropCanvasOptionsT): HTMLCanvasElement | null => {
			const image = imageRef.current
			const canDraw = Boolean(image) && hasImage
			if (!canDraw) return null
			const crop = getCropFor(safeCenter, scale)
			const hasWidth = typeof options?.width === 'number'
			const hasHeight = typeof options?.height === 'number'
			const widthFromHeight = hasHeight ? (options?.height as number) * aspect : crop.width
			const outputWidth = Math.round(hasWidth ? (options?.width as number) : widthFromHeight)
			const outputHeight = Math.round(hasHeight ? (options?.height as number) : outputWidth / aspect)
			const canvas = document.createElement('canvas')
			canvas.width = Math.max(1, outputWidth)
			canvas.height = Math.max(1, outputHeight)
			const context = canvas.getContext('2d')
			if (!context) return null
			context.imageSmoothingQuality = 'high'
			if (isCircle) {
				context.beginPath()
				context.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2, 0, 0, Math.PI * 2)
				context.clip()
			}
			context.drawImage(image as HTMLImageElement, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height)
			return canvas
		}

		// The imperative surface, refreshed each render so it always reads
		// the current view.
		useEffect(() => {
			const methods: ImageCropperMethodsT = {
				getCrop: () => (hasImage ? roundRect(getCropFor(safeCenter, scale)) : null),
				toCanvas: (options) => drawCrop(options),
				toBlob: (type = 'image/png', quality) => {
					const canvas = drawCrop()
					if (!canvas) return Promise.resolve(null)
					return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
				},
				toDataURL: (type = 'image/png', quality) => {
					const canvas = drawCrop()
					if (!canvas) return null
					return canvas.toDataURL(type, quality)
				},
				reset: () => resetView()
			}
			Object.assign(host.current, methods)
		})

		const imageLeft = stageSize.width / 2 - safeCenter.x * scale
		const imageTop = stageSize.height / 2 - safeCenter.y * scale
		const imageStyle = {
			width: `${naturalSize.width}px`,
			height: `${naturalSize.height}px`,
			transform: `translate(${imageLeft}px, ${imageTop}px) scale(${scale})`
		}
		const imageClass = hasImage ? 'is-ready' : ''
		const hasSource = Boolean(props.src)
		const hasStage = stageSize.width > 0 && stageSize.height > 0
		const shouldDrawOverlay = hasStage && hasSource
		const veilPath = buildVeilPath(stageSize, frameSize, isCircle)
		const frameLeft = (stageSize.width - frameSize.width) / 2
		const frameTop = (stageSize.height - frameSize.height) / 2
		const cornerPaths = isCircle ? [] : buildCornerPaths(stageSize, frameSize)
		const gridPath = buildGridPath(stageSize, frameSize)
		const stageName = props.alt ? `${t('cropImage')}: ${props.alt}` : t('cropImage')
		const isAtMinZoom = currentZoom <= 1
		const isAtMaxZoom = currentZoom >= maxZoom
		const areControlsDisabled = isDisabled || !hasImage

		const stageClass = ['stage']
			.concat(isDragging ? ['is-dragging'] : [])
			.concat(isZooming ? ['is-zooming'] : [])
			.concat(isDisabled ? ['is-disabled'] : [])
			.concat(hasSource ? [] : ['is-empty'])
			.join(' ')

		return (
			<host shadowDom>
				<div
					ref={stageRef}
					class={stageClass}
					part="stage"
					role="group"
					aria-label={stageName}
					aria-roledescription={t('cropImage')}
					tabindex={isDisabled ? '-1' : '0'}
					onpointerdown={handlePointerDown}
					onpointermove={handlePointerMove}
					onpointerup={handlePointerUp}
					onpointercancel={handlePointerUp}
					onkeydown={handleKeyDown}
				>
					{hasSource && (
						<img
							ref={imageRef}
							class={imageClass}
							crossorigin={props.crossOrigin as any}
							src={props.src}
							alt=""
							draggable={false}
							style={imageStyle}
							onload={handleImageLoad}
						/>
					)}
					{!hasSource && (
						<div class="placeholder">
							<PlaceholderIcon />
						</div>
					)}
					{shouldDrawOverlay && (
						<svg class="overlay" viewBox={`0 0 ${stageSize.width} ${stageSize.height}`} aria-hidden="true">
							<path class="veil" d={veilPath} />
							<path class="grid" d={gridPath} />
							{isCircle ? (
								<ellipse
									class="frame-line"
									cx={stageSize.width / 2}
									cy={stageSize.height / 2}
									rx={frameSize.width / 2}
									ry={frameSize.height / 2}
								/>
							) : (
								<rect class="frame-line" x={frameLeft} y={frameTop} width={frameSize.width} height={frameSize.height} />
							)}
							{cornerPaths.map((cornerPath) => (
								<path class="corner" d={cornerPath} />
							))}
						</svg>
					)}
					<span class="sr-only" aria-live="polite">
						{announcement}
					</span>
				</div>
				<div class="controls" part="controls" hidden={Boolean(props.isZoomHidden)}>
					<button
						class="zoom-button"
						type="button"
						aria-label={t('zoomOut')}
						disabled={areControlsDisabled || isAtMinZoom}
						onclick={() => stepZoom(-1)}
					>
						<MinusIcon />
					</button>
					<z-slider
						aria-label={t('zoom')}
						min={1}
						max={maxZoom}
						step={0.01}
						value={currentZoom}
						isDisabled={areControlsDisabled}
						oninput={handleSliderInput}
						onchange={handleSliderChange}
					></z-slider>
					<button
						class="zoom-button"
						type="button"
						aria-label={t('zoomIn')}
						disabled={areControlsDisabled || isAtMaxZoom}
						onclick={() => stepZoom(1)}
					>
						<PlusIcon />
					</button>
				</div>
			</host>
		)
	},
	{
		props: {
			src: String,
			alt: String,
			aspect: String,
			zoom: { type: Number, reflect: true },
			maxZoom: { type: Number, reflect: true },
			shape: { type: oneOf('rect', 'circle'), reflect: true },
			crossOrigin: { type: oneOf('anonymous', 'use-credentials'), reflect: true },
			isZoomHidden: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			load: event<{ width: number; height: number }>({ bubbles: true, composed: true }),
			// Written out, not CropDetailT, so the generated JSX types can
			// carry it: they only keep shapes a consumer could write.
			input: event<{ x: number; y: number; width: number; height: number; zoom: number }>({ bubbles: true, composed: true }),
			change: event<{ x: number; y: number; width: number; height: number; zoom: number }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles, srOnlyStyles]
	}
)

defineElement('z-image-cropper', ZImageCropper)
