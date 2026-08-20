import { defineElement } from '../shared/define-element'
import { c, css, event, useEffect, useRef, useState } from 'atomico'

/*
 * z-playground — one live instance driven by a declarative control list, with
 * the markup it produces echoed underneath.
 *
 *   <z-playground tag-name="z-button">
 *     <z-button slot="stage">Save</z-button>
 *   </z-playground>
 *
 *   playground.controls = [
 *     { name: 'kind', kind: 'enum', options: ['solid', 'outline'], defaultValue: 'solid' }
 *   ]
 *
 * The element under test is slotted rather than constructed from a string, so
 * it is a real instance with real listeners and real state — the thing the
 * reader is about to paste, not a picture of it.
 *
 * Serialization lives here rather than in the host, and that is the whole
 * point: the snippet is read back off the live element after every change, so
 * the code sample cannot drift from what is on screen. A host that formatted
 * its own snippet would be maintaining a second source of truth.
 */
const styles = css`
	:host {
		display: block;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--material-surface);
		overflow: hidden;
	}

	:host([is-hidden]) {
		display: none;
	}

	/* Three bands, separated by rules rather than gaps — the stage has to read
	   as a surface the component sits on, not as a floating group. */
	.stage {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-base);
		padding: var(--space-xl) var(--space-base);
		min-height: 5rem;
	}

	:host([layout='center']) .stage {
		justify-content: center;
	}

	:host([layout='stack']) .stage {
		flex-direction: column;
		align-items: flex-start;
	}

	:host([layout='fill']) .stage ::slotted(*) {
		width: 100%;
	}

	.controls {
		padding: var(--space-base);
		border-top: 1px solid var(--border);
		background: var(--background-light);
	}

	.output {
		border-top: 1px solid var(--border);
	}

	.reset {
		display: inline-flex;
		align-items: center;
		margin-top: var(--space-sm);
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		font-family: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
	}

	.reset:hover {
		color: var(--foreground);
		border-color: color-mix(in oklch, var(--foreground) 50%, transparent);
	}

	.reset:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}
`

type ControlT = {
	name: string
	kind: string
	options?: string[]
	defaultValue?: string
}

const readControls = (value: unknown): ControlT[] => {
	if (!Array.isArray(value)) return []

	const controls: ControlT[] = []
	for (const entry of value) {
		const hasShape = entry && typeof entry.name === 'string'
		if (hasShape) controls.push(entry as ControlT)
	}
	return controls
}

// The instance's own markup is the output, minus the slot attribute the
// playground put on it — readers should see what they would paste, not the
// plumbing that got it onto the stage.
const readStageMarkup = (stageElement: Element): string => {
	const copy = stageElement.cloneNode(true) as HTMLElement
	copy.removeAttribute('slot')
	return copy.outerHTML
}

const readCurrentValues = (stageElement: Element | null, controls: ControlT[]): Record<string, string> => {
	if (!stageElement) return {}

	const values: Record<string, string> = {}
	for (const control of controls) {
		const isPresent = stageElement.hasAttribute(control.name)
		if (isPresent) values[control.name] = stageElement.getAttribute(control.name) || ''
	}
	return values
}

export const ZPlayground = c(
	(props) => {
		const slotRef = useRef<HTMLSlotElement>()
		const panelRef = useRef<HTMLElement>()
		const [markup, setMarkup] = useState<string>('')
		const [values, setValues] = useState<Record<string, string>>({})

		const controls = readControls(props.controls)

		const readStage = (): Element | null => {
			const assigned = slotRef.current?.assignedElements({ flatten: true })
			if (!assigned || !assigned.length) return null
			return assigned[0]
		}

		const sync = () => {
			const stageElement = readStage()
			if (!stageElement) return

			setMarkup(readStageMarkup(stageElement))
			setValues(readCurrentValues(stageElement, controls))
		}

		useEffect(() => sync(), [props.controls])

		const handleControlChange = (changeEvent: CustomEvent<{ name: string; value: unknown }>) => {
			const stageElement = readStage()
			if (!stageElement) return

			const rawValue = changeEvent.detail.value
			const nextValue = rawValue == null ? null : String(rawValue)
			const changedControl = controls.find((control) => control.name === changeEvent.detail.name)
			const isBooleanControl = changedControl?.kind === 'boolean'
			// A present boolean attribute intentionally has an empty-string value.
			// Other control kinds use an empty string to mean "unset".
			const shouldRemove = nextValue === null || (!isBooleanControl && nextValue.trim() === '')

			if (shouldRemove) stageElement.removeAttribute(changeEvent.detail.name)
			if (!shouldRemove) stageElement.setAttribute(changeEvent.detail.name, nextValue as string)

			sync()
		}

		useEffect(() => {
			const panel = panelRef.current
			if (!panel) return

			const listener = (changeEvent: Event) => {
				handleControlChange(changeEvent as CustomEvent<{ name: string; value: unknown }>)
			}
			panel.addEventListener('change', listener)
			return () => panel.removeEventListener('change', listener)
		}, [props.controls])

		// Reset means "back to the element as authored", which is every
		// controlled attribute removed — the component's own defaults are the
		// baseline, not whatever the last reader left behind.
		const handleReset = () => {
			const stageElement = readStage()
			if (!stageElement) return

			for (const control of controls) stageElement.removeAttribute(control.name)
			sync()
			props.reset()
		}

		const hasControls = controls.length > 0

		return (
			<host shadowDom>
				<div class='stage'>
					<slot name='stage' ref={slotRef} onslotchange={sync} />
				</div>

				{hasControls && (
					<div class='controls'>
						<z-control-panel ref={panelRef} controls={controls} values={values} />
						<button type='button' class='reset' onclick={handleReset}>
							Reset
						</button>
					</div>
				)}

				<div class='output'>
					<z-code-block language='html' code={markup} />
				</div>
			</host>
		)
	},
	{
		props: {
			controls: { type: Array },
			tagName: { type: String, reflect: true },
			layout: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			reset: event<void>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-playground', ZPlayground)
