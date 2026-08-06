import { c, css, event, useEffect, useState } from 'atomico'

/*
 * z-live-code — an editable snippet with its result beside it.
 *
 *   <z-live-code code="<z-button>Save</z-button>" assets="/zest.js /ink.css"></z-live-code>
 *
 * The editor is a plain textarea. A real code editor is out of scope on
 * purpose: syntax-aware editing means a tokenizer, an undo model, bracket
 * matching and a several-hundred-kilobyte dependency, to serve someone poking
 * at six lines of markup to see what happens. The textarea does that job.
 *
 * The preview is a z-sandbox rather than inline DOM, which is not a detail.
 * Reader-authored markup is arbitrary — it can open a dialog, register a
 * hotkey, or paint something fixed — and none of that should be able to reach
 * the docs page around it.
 *
 * Evaluation is debounced. Rebuilding the frame on every keystroke makes the
 * preview flicker and throws away the reader's scroll position inside it,
 * which is worse than a beat of latency.
 */
const EVALUATION_DELAY = 400

const styles = css`
	:host {
		display: block;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	:host([is-hidden]) {
		display: none;
	}

	.panes {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	:host([layout='stacked']) .panes {
		grid-template-columns: 1fr;
	}

	.pane {
		min-width: 0;
	}

	.pane + .pane {
		border-left: 1px solid var(--border);
	}

	:host([layout='stacked']) .pane + .pane {
		border-left: 0;
		border-top: 1px solid var(--border);
	}

	.label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.375rem 0.75rem;
		border-bottom: 1px solid var(--border);
		background: var(--background-light);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}

	.dirty {
		color: var(--warning);
	}

	textarea {
		display: block;
		box-sizing: border-box;
		width: 100%;
		min-height: var(--live-code-height, 20rem);
		padding: 0.875rem 1rem;
		border: 0;
		background: var(--color-neutral-0);
		color: var(--foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-small);
		line-height: 1.6;
		tab-size: 2;
		resize: vertical;
	}

	textarea:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -3px;
	}

	.reset {
		border: 0;
		background: transparent;
		color: var(--muted-foreground);
		font: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
	}

	.reset:hover {
		color: var(--foreground);
	}

	@media (max-width: 48rem) {
		.panes {
			grid-template-columns: 1fr;
		}

		.pane + .pane {
			border-left: 0;
			border-top: 1px solid var(--border);
		}
	}
`

export const ZLiveCode = c(
	(props) => {
		const authored = (props.code as string) || ''

		const [draft, setDraft] = useState(authored)
		const [evaluated, setEvaluated] = useState(authored)

		// A new `code` prop replaces the draft outright. The alternative is
		// merging an authored change into a reader's edit, which cannot be done
		// correctly and is confusing when attempted.
		useEffect(() => {
			setDraft(authored)
			setEvaluated(authored)
		}, [authored])

		useEffect(() => {
			const isSettled = draft === evaluated
			if (isSettled) return

			const timer = setTimeout(() => {
				setEvaluated(draft)
				props.change({ code: draft })
			}, EVALUATION_DELAY)

			return () => clearTimeout(timer)
		}, [draft, evaluated])

		const handleInput = (inputEvent: Event) => {
			setDraft((inputEvent.target as HTMLTextAreaElement).value)
		}

		const handleReset = () => {
			setDraft(authored)
			setEvaluated(authored)
			props.reset()
		}

		const isDirty = draft !== authored
		const isPending = draft !== evaluated

		return (
			<host shadowDom>
				<div class='panes'>
					<div class='pane'>
						<div class='label'>
							<span>{(props.editorLabel as string) || 'Edit'}</span>
							{isDirty && (
								<button type='button' class='reset' onclick={handleReset}>
									Reset
								</button>
							)}
						</div>
						<textarea
							spellcheck={false}
							aria-label={(props.editorLabel as string) || 'Editable example source'}
							value={draft}
							oninput={handleInput}
						/>
					</div>

					<div class='pane'>
						<div class='label'>
							<span>{(props.previewLabel as string) || 'Result'}</span>
							{isPending && <span class='dirty'>…</span>}
						</div>
						<z-sandbox
							is-bare={true}
							html={evaluated}
							assets={props.assets}
							theme={props.theme}
							height={(props.height as string) || '20rem'}
							title={(props.previewLabel as string) || 'Result'}
						/>
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			code: { type: String },
			assets: { type: String, reflect: true },
			theme: { type: String, reflect: true },
			height: { type: String, reflect: true },
			layout: { type: String, reflect: true },
			editorLabel: { type: String, reflect: true },
			previewLabel: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ code: string }>({ bubbles: true, composed: true }),
			reset: event<void>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-live-code', ZLiveCode)
