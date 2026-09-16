// A live, scaled-down render of an example.
//
// This is not a screenshot. The example mounts at its authored design size
// and that DOM is scaled to fit whatever width the stage is given, so a
// thumbnail can never drift from the page it stands for — and it re-themes
// with the site like everything else. It is inert: a picture of the example,
// not the example, so whatever wraps it owns the click.
//
// Shared by the gallery cards and by the preview on a page-kind example,
// whose real render lives in its own tab.

import type { ExampleEntryT, ExampleInstanceT } from '../examples/types'
import { createElement } from './zest-elements'

export type ExampleThumbnailT = {
	stage: HTMLElement
	// Builds the example into the stage. Idempotent — a second call is a no-op.
	mount: () => void
	dispose: () => void
}

// Keeps a mounted thumbnail sized to its stage. The scale is derived from the
// stage's rendered width so the same example fits a two-column grid, a
// three-column grid, and a page preview alike.
const fitCanvasToStage = (stage: HTMLElement, canvas: HTMLElement, designWidth: number): void => {
	const scale = stage.clientWidth / designWidth
	canvas.style.transform = `scale(${scale})`
}

export const buildExampleThumbnail = (example: ExampleEntryT): ExampleThumbnailT => {
	// Aspect ratio comes from the entry so the stage reserves its height
	// before anything mounts, and the layout never jumps when it does.
	const stage = createElement('div', 'exampleThumbnail')
	stage.style.aspectRatio = `${example.thumbnail.width} / ${example.thumbnail.height}`

	const canvas = createElement('div', 'exampleThumbnailCanvas')
	canvas.style.width = `${example.thumbnail.width}px`
	canvas.style.height = `${example.thumbnail.height}px`
	canvas.setAttribute('inert', '')
	canvas.setAttribute('aria-hidden', 'true')

	const skeleton = createElement('z-skeleton', 'exampleThumbnailSkeleton')
	skeleton.setAttribute('shape', 'rect')

	stage.append(skeleton, canvas)

	let instance: ExampleInstanceT | null = null
	let resizeObserver: ResizeObserver | null = null

	const mount = (): void => {
		if (instance) return

		instance = example.build()
		canvas.append(instance.root)
		stage.classList.add('is-mounted')

		// The observer covers every later size, including the first real one
		// when a stage built before insertion lands in the document.
		resizeObserver = new ResizeObserver(() => fitCanvasToStage(stage, canvas, example.thumbnail.width))
		resizeObserver.observe(stage)
		fitCanvasToStage(stage, canvas, example.thumbnail.width)
	}

	const dispose = (): void => {
		resizeObserver?.disconnect()
		instance?.dispose?.()
		instance = null
	}

	return { stage, mount, dispose }
}
