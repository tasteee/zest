import { c, css, event, useProp, useRef, useState } from 'atomico'

/*
 * z-example — one documented example: a live preview frame with its source
 * tucked behind a toggle. The default slot is the preview and holds real DOM
 * (live listeners, mutable state), so an example demonstrates the component
 * rather than describing it.
 *
 * The label is `heading`, not `title`: `title` is a global HTML attribute and
 * reflecting it would hang a browser tooltip off the whole example.
 *
 * Source comes from the `snippets` array property:
 *   el.snippets = [{ label, language, code }]
 * One snippet renders a bare z-code-block; several render as z-tabs, because
 * markup plus the script that wires it reads as one thing, not two stacked
 * blocks with no relationship between them.
 *
 * `layout` arranges the preview (center / start / stack / fill).
 * `is-source-open` reflects the disclosure state. `has-background-grid` lays a
 * hairline rule grid behind the preview so transparent or floating components
 * have something to sit against. `is-resizable` adds a drag edge for showing
 * how a component reflows.
 */
const styles = css`
	:host {
		display: block;
		--example-preview-inset: var(--space-2xl) var(--space-lg);
	}

	:host([is-hidden]) {
		display: none;
	}

	.example {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		scroll-margin-top: var(--space-lg);
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.heading {
		margin: 0;
		font-size: var(--font-size-h4);
		line-height: var(--line-height-h4);
		font-weight: 600;
		color: var(--foreground);
	}

	.description {
		margin: 0;
		font-size: var(--font-size-small);
		line-height: var(--line-height-small);
		color: var(--muted-foreground);
	}

	.frame {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card, var(--background));
	}

	.previewTrack {
		display: flex;
		min-width: 0;
	}

	.preview {
		position: relative;
		display: flex;
		flex: 1;
		min-width: 0;
		min-height: 5rem;
		padding: var(--example-preview-inset);
		box-sizing: border-box;
	}

	/* Hairline rule grid. Hard color stops only — this is a measuring
	   backdrop, not a shaded surface. */
	:host([has-background-grid]) .preview {
		background-image:
			repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px 1.5rem),
			repeating-linear-gradient(to bottom, var(--border) 0 1px, transparent 1px 1.5rem);
		background-position: center center;
	}

	/* The slotted preview root is the single element an example builds. */
	::slotted(*) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-md);
		min-width: 0;
	}

	:host([layout='center']) .preview {
		align-items: center;
		justify-content: center;
	}

	:host([layout='center']) ::slotted(*) {
		justify-content: center;
	}

	:host([layout='start']) .preview {
		align-items: center;
		justify-content: flex-start;
	}

	/* Stacked previews show several independent rows of the same component,
	   so each row needs its own line rather than wrapping into its neighbour. */
	:host([layout='stack']) .preview {
		justify-content: center;
	}

	:host([layout='stack']) ::slotted(*) {
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
	}

	:host([layout='fill']) ::slotted(*) {
		flex-direction: column;
		align-items: stretch;
		width: 100%;
	}

	.resizeHandle {
		flex: none;
		width: 0.75rem;
		cursor: col-resize;
		border-left: 1px solid var(--border);
		background: var(--muted, transparent);
		touch-action: none;
	}

	.resizeHandle:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -3px;
	}

	.toolbar {
		display: flex;
		justify-content: flex-end;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		border-top: 1px solid var(--border);
	}

	.source {
		border-top: 1px solid var(--border);
		padding: var(--space-md);
	}

	.source[hidden] {
		display: none;
	}

	.sourcePanel {
		min-width: 0;
	}
`

type ExampleSnippetT = {
	label: string
	language: string
	code: string
}

const MINIMUM_PREVIEW_WIDTH = 200

const getSnippets = (rawSnippets: unknown): ExampleSnippetT[] => {
	const isSnippetArray = Array.isArray(rawSnippets)
	if (!isSnippetArray) return []
	return rawSnippets as ExampleSnippetT[]
}

const getSnippetValue = (index: number): string => {
	return `snippet-${index}`
}

export const ZExample = c(
	(props) => {
		const [isSourceOpen, setIsSourceOpen] = useProp<boolean>('isSourceOpen')
		const [previewWidth, setPreviewWidth] = useState<number | null>(null)
		const trackRef = useRef<HTMLElement>()

		const snippets = getSnippets(props.snippets)
		const heading = props.heading as string | undefined
		const description = props.description as string | undefined

		const hasHeading = Boolean(heading)
		const hasDescription = Boolean(description)
		const hasHeader = hasHeading || hasDescription
		const hasSource = snippets.length > 0
		const hasMultipleSnippets = snippets.length > 1

		const toggleLabel = isSourceOpen ? 'Hide code' : 'Show code'

		const handleToggleSource = () => {
			setIsSourceOpen(!isSourceOpen)
		}

		// z-code-block's own `copy` is composed, so it would escape this shadow
		// root alongside the richer one below. Swallow it and re-emit with the
		// snippet the consumer actually wants to identify.
		const handleSnippetCopy = (copyEvent: Event, snippet: ExampleSnippetT) => {
			copyEvent.stopPropagation()
			props.copy({ code: snippet.code, label: snippet.label })
		}

		// Width is dragged rather than bound to a prop: it is a reading aid
		// for this one visit, not authored state worth reflecting.
		const handleResizeStart = (pointerEvent: PointerEvent) => {
			const track = trackRef.current
			if (!track) return

			pointerEvent.preventDefault()
			const trackLeft = track.getBoundingClientRect().left
			const maximumWidth = track.getBoundingClientRect().width

			const handleMove = (moveEvent: PointerEvent) => {
				const desiredWidth = moveEvent.clientX - trackLeft
				const clampedWidth = Math.min(Math.max(desiredWidth, MINIMUM_PREVIEW_WIDTH), maximumWidth)
				setPreviewWidth(clampedWidth)
			}

			const handleRelease = () => {
				window.removeEventListener('pointermove', handleMove)
				window.removeEventListener('pointerup', handleRelease)
			}

			window.addEventListener('pointermove', handleMove)
			window.addEventListener('pointerup', handleRelease)
		}

		const previewStyle = previewWidth === null ? undefined : `flex: none; width: ${previewWidth}px`

		const buildCodeBlock = (snippet: ExampleSnippetT) => {
			return (
				<z-code-block
					code={snippet.code}
					language={snippet.language}
					oncopy={(copyEvent: Event) => handleSnippetCopy(copyEvent, snippet)}
				/>
			)
		}

		const tabDefinitions = snippets.map((snippet, index) => {
			return { value: getSnippetValue(index), label: snippet.label }
		})

		const singleSnippetSource = hasSource && !hasMultipleSnippets ? buildCodeBlock(snippets[0]) : null

		const tabbedSource = (
			<z-tabs tabs={tabDefinitions}>
				{snippets.map((snippet, index) => (
					<div key={getSnippetValue(index)} class="sourcePanel" slot={getSnippetValue(index)}>
						{buildCodeBlock(snippet)}
					</div>
				))}
			</z-tabs>
		)

		const sourceContent = hasMultipleSnippets ? tabbedSource : singleSnippetSource

		return (
			<host shadowDom>
				<article class="example">
					{hasHeader && (
						<div class="header">
							{hasHeading && <h3 class="heading">{heading}</h3>}
							{hasDescription && <p class="description">{description}</p>}
						</div>
					)}

					<div class="frame">
						<div class="previewTrack" ref={trackRef}>
							<div class="preview" style={previewStyle}>
								<slot />
							</div>
							{props.isResizable && (
								<div
									class="resizeHandle"
									role="separator"
									aria-orientation="vertical"
									aria-label="Resize preview"
									tabindex="0"
									onpointerdown={handleResizeStart}
								/>
							)}
						</div>

						{hasSource && (
							<div class="toolbar">
								<z-button kind="ghost" size="sm" onclick={handleToggleSource}>
									{toggleLabel}
								</z-button>
							</div>
						)}

						{hasSource && (
							<div class="source" hidden={!isSourceOpen}>
								{sourceContent}
							</div>
						)}
					</div>
				</article>
			</host>
		)
	},
	{
		props: {
			heading: { type: String, reflect: true },
			description: { type: String, reflect: true },
			snippets: { type: Array },
			layout: { type: String, reflect: true, value: 'center' },
			isSourceOpen: { type: Boolean, reflect: true },
			hasBackgroundGrid: { type: Boolean, reflect: true },
			isResizable: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			copy: event<{ code: string; label: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-example', ZExample)
