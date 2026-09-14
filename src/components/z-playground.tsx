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

// The stage element is what the reader sees and what the snippet shows, but it
// is not always what the knobs drive. An example whose subject only makes sense
// in context — z-inline, which has no size of its own and has to sit inside a
// sized z-text — slots the wrapper. `tag-name` names the element the controls
// belong to, so they find it inside the stage instead of writing z-inline's
// attributes onto its parent.
const readControlledElement = (stageElement: Element, tagName: string): Element => {
	if (!tagName) return stageElement

	const isStageItself = stageElement.tagName.toLowerCase() === tagName.toLowerCase()
	if (isStageItself) return stageElement

	return stageElement.querySelector(tagName) ?? stageElement
}

// The snippet is what a reader would paste, so it carries what the example
// author wrote plus whatever the reader has since turned — and nothing the
// component wrote onto itself while rendering. z-separator sets role="separator"
// and a matching aria-orientation on its own host; echoing those back reads as
// markup you are supposed to type, when in fact typing them is exactly what
// the component exists to save you from.
//
// Only the stage root is filtered, and only when an authored list was actually
// supplied. Everything deeper is left whole: an icon-only z-button inside an
// example carries an aria-label the author really did write, and really does
// have to write.
const readAuthoredNames = (value: unknown): Set<string> | null => {
	if (!Array.isArray(value)) return null

	const names = value.filter((entry) => typeof entry === 'string')
	return new Set(names)
}

// Reset means "back to the element as authored" — which, for an attribute
// the example itself set (z-terminal's `shell`, z-marquee's `duration`), is
// that authored value, not gone entirely. Only an attribute a reader turned
// on that the example never had should disappear. Keyed by name because that
// is all `readAuthoredNames` above ever had; this carries the value too.
const readAuthoredAttributeValues = (value: unknown): Record<string, string> => {
	const isRecord = value && typeof value === 'object' && !Array.isArray(value)
	if (!isRecord) return {}

	const entries = Object.entries(value as Record<string, unknown>)
	const stringEntries = entries.filter((entry): entry is [string, string] => typeof entry[1] === 'string')
	return Object.fromEntries(stringEntries)
}

// Void elements never carry children, so they never get a closing tag or an
// indented body — just the one open tag, same as a reader would type it.
const VOID_ELEMENT_NAMES = new Set([
	'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'
])

const buildAttributePart = (attribute: Attr): string => {
	const hasEmptyValue = attribute.value === ''
	if (hasEmptyValue) return attribute.name
	return `${attribute.name}="${attribute.value}"`
}

const buildOpenTag = (element: Element): string => {
	const tagName = element.tagName.toLowerCase()
	const attributeParts = [...element.attributes].map((attribute) => buildAttributePart(attribute))
	const attributeText = attributeParts.length ? ` ${attributeParts.join(' ')}` : ''
	return `<${tagName}${attributeText}>`
}

const buildCloseTag = (element: Element): string => `</${element.tagName.toLowerCase()}>`

const hasElementChildren = (element: Element): boolean => element.children.length > 0

// A reader pastes this snippet, so it has to read the way the rest of the
// library's own example markup does: one attribute line for the tag, one
// line per child, never a wall of nested elements run together. An element
// with only text (a label, an icon-free leaf) stays on its own single line —
// breaking "Bold" onto three lines would be noise, not clarity.
const formatMarkupElement = (element: Element, depth: number): string => {
	const indent = '	'.repeat(depth)
	const tagName = element.tagName.toLowerCase()
	const isVoid = VOID_ELEMENT_NAMES.has(tagName)
	if (isVoid) return `${indent}${buildOpenTag(element)}`

	const isTextOnly = !hasElementChildren(element)
	if (isTextOnly) return `${indent}${buildOpenTag(element)}${element.textContent ?? ''}${buildCloseTag(element)}`

	const childLines = [...element.children].map((child) => formatMarkupElement(child, depth + 1))
	return [`${indent}${buildOpenTag(element)}`, ...childLines, `${indent}${buildCloseTag(element)}`].join('\n')
}

const readStageMarkup = (stageElement: Element, controls: ControlT[], authoredNames: Set<string> | null): string => {
	const copy = stageElement.cloneNode(true) as HTMLElement
	copy.removeAttribute('slot')

	const hasAuthoredNames = Boolean(authoredNames)
	if (hasAuthoredNames) {
		const keptNames = new Set([...(authoredNames as Set<string>), ...controls.map((control) => control.name)])
		for (const name of copy.getAttributeNames()) {
			if (!keptNames.has(name)) copy.removeAttribute(name)
		}
	}

	return formatMarkupElement(copy, 0)
}

const readCurrentValues = (controlledElement: Element | null, controls: ControlT[]): Record<string, string> => {
	if (!controlledElement) return {}

	const values: Record<string, string> = {}
	for (const control of controls) {
		const isPresent = controlledElement.hasAttribute(control.name)
		if (isPresent) values[control.name] = controlledElement.getAttribute(control.name) || ''
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

		// A concept page — z-drag-drop.md (z-draggable + z-drop-target),
		// z-comment-thread.md (z-comment-mark and friends) — has no single tag
		// matching its own slug, so it slots every root element from its example
		// as an uncontrolled stage instead of one driveable instance (see
		// buildStaticLiveDemo in playground.ts). The single-element case below is
		// just the one-item version of this same list.
		const readStageElements = (): Element[] => {
			return slotRef.current?.assignedElements({ flatten: true }) ?? []
		}

		const readControlled = (): Element | null => {
			const stageElement = readStage()
			if (!stageElement) return null
			return readControlledElement(stageElement, props.tagName as string)
		}

		const sync = () => {
			const stageElements = readStageElements()
			if (!stageElements.length) return

			const authoredNames = readAuthoredNames(props.authoredAttributes)
			const stageMarkup = stageElements.map((stageElement) => readStageMarkup(stageElement, controls, authoredNames)).join('\n')
			setMarkup(stageMarkup)
			setValues(readCurrentValues(readControlledElement(stageElements[0], props.tagName as string), controls))
		}

		useEffect(() => sync(), [props.controls])

		const handleControlChange = (changeEvent: CustomEvent<{ name: string; value: unknown }>) => {
			const controlledElement = readControlled()
			if (!controlledElement) return

			const changedControl = controls.find((control) => control.name === changeEvent.detail.name)
			// Only a z-control-panel's own { name, value } change is a real control
			// change. A stray `change` from an inner form control (e.g. z-input or
			// z-number-input firing their own on-blur `change`, shaped { value }
			// with no `name`) also bubbles out of the panel; matching it against a
			// known control name rejects that instead of writing an attribute
			// literally named "undefined".
			if (!changedControl) return

			// Every panel change carries a `value` key — `null` when the reader
			// unset the control. A detail without one is some other event that
			// happens to share the name, and acting on it would read as "unset"
			// and silently strip an attribute the reader is still editing.
			const hasValueKey = Object.prototype.hasOwnProperty.call(changeEvent.detail, 'value')
			if (!hasValueKey) return

			const rawValue = changeEvent.detail.value
			const nextValue = rawValue == null ? null : String(rawValue)
			const isBooleanControl = changedControl.kind === 'boolean'
			// A present boolean attribute intentionally has an empty-string value.
			// Other control kinds use an empty string to mean "unset".
			const shouldRemove = nextValue === null || (!isBooleanControl && nextValue.trim() === '')

			if (shouldRemove) controlledElement.removeAttribute(changeEvent.detail.name)
			if (!shouldRemove) controlledElement.setAttribute(changeEvent.detail.name, nextValue as string)

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

		// Reset means "back to the element as authored": a control the example
		// itself set (z-terminal's `shell`, z-marquee's `duration`) goes back to
		// that authored value, and a control the reader turned on that the
		// example never had is removed outright — the component's own defaults
		// are the baseline only for the second group, not the first.
		const handleReset = () => {
			const controlledElement = readControlled()
			if (!controlledElement) return

			const authoredValues = readAuthoredAttributeValues(props.authoredAttributeValues)
			for (const control of controls) {
				const wasAuthored = Object.prototype.hasOwnProperty.call(authoredValues, control.name)
				if (wasAuthored) controlledElement.setAttribute(control.name, authoredValues[control.name])
				if (!wasAuthored) controlledElement.removeAttribute(control.name)
			}
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
			authoredAttributes: { type: Array },
			authoredAttributeValues: { type: Object },
			tagName: { type: String, reflect: true },
			layout: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			reset: event<void>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-playground', ZPlayground)
