import { defineElement } from '../shared/define-element'
import { c, css, event, useEffect, useRef, useState } from 'atomico'

/*
 * z-mermaid — a diagram rendered from a fenced mermaid source.
 *
 *   <z-mermaid code="graph LR; A-->B"></z-mermaid>
 *
 * The renderer is loaded lazily, from a CDN, on first use. That is the whole
 * design constraint: zest ships with zero runtime dependencies, and mermaid is
 * roughly the size of the rest of the library put together. Bundling it to
 * serve the handful of pages with a diagram on them would be the single
 * worst trade in the package.
 *
 * So the import is dynamic, the URL is overridable for a self-hosted or
 * CSP-restricted deployment, and a page with no diagram never pays anything.
 * The module promise is cached, so ten diagrams on one page fetch once.
 *
 * The SVG mermaid returns is a string. It is parsed with DOMParser and adopted
 * as a node rather than assigned through innerHTML — the same rule the syntax
 * highlighter follows, and worth keeping for content this element did not
 * author.
 */
const DEFAULT_RENDERER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.1/mermaid.esm.min.mjs'

const styles = css`
	:host {
		display: block;
	}

	:host([is-hidden]) {
		display: none;
	}

	.frame {
		display: flex;
		justify-content: center;
		padding: var(--space-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--material-surface);
		overflow-x: auto;
	}

	.frame svg {
		max-width: 100%;
		height: auto;
	}

	.status {
		padding: var(--space-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
	}

	.status.is-error {
		border-color: color-mix(in oklch, var(--destructive) 40%, var(--border));
		background: color-mix(in oklch, var(--destructive) 8%, transparent);
		color: var(--foreground);
	}

	.detail {
		margin: var(--space-xs) 0 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
		white-space: pre-wrap;
	}
`

type MermaidModuleT = {
	initialize: (config: Record<string, unknown>) => void
	render: (id: string, source: string) => Promise<{ svg: string }>
}

// One promise per URL, so ten diagrams on a page cost one fetch and a page
// with none costs nothing at all.
const rendererByUrl = new Map<string, Promise<MermaidModuleT>>()

const loadRenderer = (url: string): Promise<MermaidModuleT> => {
	const existing = rendererByUrl.get(url)
	if (existing) return existing

	// The specifier is a variable on purpose: a literal would let the bundler
	// resolve it at build time and pull mermaid into dist/.
	const pending = import(/* @vite-ignore */ url).then((module) => {
		const renderer = (module.default || module) as MermaidModuleT
		return renderer
	})

	rendererByUrl.set(url, pending)
	return pending
}

// zest themes are not mermaid themes, and mermaid only understands its own.
// Dark-first, because everything else in the library is.
const readMermaidTheme = (): string => {
	const declared = document.documentElement.getAttribute('data-theme') || ''
	const isLight = declared === 'light' || declared === 'studio'
	return isLight ? 'neutral' : 'dark'
}

let diagramCounter = 0

const buildDiagramId = (): string => {
	diagramCounter += 1
	return `z-mermaid-${diagramCounter}`
}

const parseSvg = (markup: string): Element | null => {
	const parsed = new DOMParser().parseFromString(markup, 'image/svg+xml')
	const hasError = parsed.querySelector('parsererror')
	if (hasError) return null

	return parsed.documentElement
}

const RENDER_STATES = {
	idle: 'idle',
	loading: 'loading',
	ready: 'ready',
	failed: 'failed'
} as const

export const ZMermaid = c(
	(props) => {
		const frameRef = useRef<HTMLElement>()
		// The rendered SVG is held in a ref, not in state: it is a DOM node, and
		// putting it back after each render is cheaper and more predictable than
		// asking the renderer to diff foreign markup.
		const svgRef = useRef<Element>()
		const [state, setState] = useState<string>(RENDER_STATES.idle)
		const [failure, setFailure] = useState<string>('')

		const source = ((props.code as string) || '').trim()
		const rendererUrl = (props.src as string) || DEFAULT_RENDERER_URL

		useEffect(() => {
			const hasSource = source.length > 0
			if (!hasSource) return

			// Guards a resolve that lands after the element re-rendered with a
			// different source — the older diagram must not overwrite the newer.
			let isCurrent = true
			setState(RENDER_STATES.loading)

			const draw = async () => {
				try {
					const mermaid = await loadRenderer(rendererUrl)
					if (!isCurrent) return

					mermaid.initialize({ startOnLoad: false, theme: readMermaidTheme(), securityLevel: 'strict' })

					const result = await mermaid.render(buildDiagramId(), source)
					if (!isCurrent) return

					const svg = parseSvg(result.svg)
					if (!svg) {
						setFailure('The renderer returned markup that is not valid SVG.')
						setState(RENDER_STATES.failed)
						return
					}

					svgRef.current = document.importNode(svg, true)
					setState(RENDER_STATES.ready)
					props.render({ id: svg.id || '' })
				} catch (renderError) {
					if (!isCurrent) return
					setFailure((renderError as Error).message)
					setState(RENDER_STATES.failed)
				}
			}

			draw()

			return () => {
				isCurrent = false
			}
		}, [source, rendererUrl, props.theme])

		// Runs after every render, because the frame is a node the renderer owns
		// and its children do not survive a re-render — the loading status
		// disappearing is itself a re-render.
		useEffect(() => {
			const frame = frameRef.current
			const svg = svgRef.current
			if (!frame || !svg) return

			const isAlreadyMounted = frame.firstElementChild === svg
			if (!isAlreadyMounted) frame.replaceChildren(svg)
		})

		const isLoading = state === RENDER_STATES.loading
		const hasFailed = state === RENDER_STATES.failed
		const hasSource = source.length > 0

		if (!hasSource) return <host shadowDom></host>

		if (hasFailed) {
			return (
				<host shadowDom>
					<div class='status is-error'>
						Diagram could not be rendered.
						{failure && <p class='detail'>{failure}</p>}
					</div>
				</host>
			)
		}

		return (
			<host shadowDom>
				{isLoading && <div class='status'>Rendering diagram…</div>}
				<div class='frame' ref={frameRef} />
			</host>
		)
	},
	{
		props: {
			code: { type: String },
			src: { type: String, reflect: true },
			theme: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			render: event<{ id: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-mermaid', ZMermaid)
