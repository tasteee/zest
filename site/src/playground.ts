import { applySiteBaseUrl, createElement } from './dom-helpers'
import { getComponentPlaygroundData } from './docs-data'
import { buildCodeBlock, buildLabel } from './render/zest-elements'

type ZPlaygroundElementT = HTMLElement & {
	controls: unknown[]
	authoredAttributes: string[]
	authoredAttributeValues: Record<string, string>
}
import type { ZCodeBlockElementT } from './render/zest-elements'
import type { DocPageT } from './docs-data'

// Pulls the single element matching the page's own tag out of the primary
// example (e.g. the first `<z-button accent="dom">Save</z-button>` out of
// z-button.md's five variations) to use as the one instance the playground's
// controls drive.
//
// Returns null when the slug names nothing real. A few docs are named for a
// concept rather than a tag — z-drag-drop.md documents z-draggable and
// z-drop-target, z-comment-thread.md documents z-comment-mark and friends —
// and those pages have no single instance to drive. Creating the element
// anyway produced an undefined custom element: an empty inline box sitting
// under a "Playground" heading, which reads as a broken demo. Those pages
// fall through to getConceptStageElements below instead.
const getCanonicalElement = (primaryExampleHtml: string, tagName: string): Element | null => {
	const parsedDocument = new DOMParser().parseFromString(primaryExampleHtml, 'text/html')
	const matchedElement = parsedDocument.body.querySelector(tagName)

	if (matchedElement) {
		const clonedElement = document.importNode(matchedElement, true) as Element
		applySiteBaseUrl(clonedElement)
		return clonedElement
	}

	const isRealElement = Boolean(customElements.get(tagName))
	if (!isRealElement) return null

	return document.createElement(tagName)
}

// A concept page has no single canonical tag, so there is nothing for the
// controls to drive — but the example markup still names real, registered
// elements (z-draggable, z-drop-target) that are worth more than a static
// code block. Clones every root element of the primary example so the
// playground can slot them all in as one uncontrolled, but genuinely live
// and working, demo.
const getConceptStageElements = (primaryExampleHtml: string): Element[] => {
	const parsedDocument = new DOMParser().parseFromString(primaryExampleHtml, 'text/html')
	const rootElements = [...parsedDocument.body.children]

	return rootElements.map((rootElement) => {
		const clonedElement = document.importNode(rootElement, true) as Element
		applySiteBaseUrl(clonedElement)
		return clonedElement
	})
}

// The paired ```js block (e.g. z-select's `.options = [...]`) is trusted,
// repo-authored content, same as the HTML it sits next to — safe to execute
// so property-driven components actually show real content instead of an
// empty shell. Never let one bad snippet take the whole page down with it.
const runPairedScriptSafely = (script: string, root: HTMLElement): void => {
	if (!root.isConnected) return
	try {
		const scopedDocument = new Proxy(document, {
			get(target, key) {
				if (key === 'querySelector') return root.querySelector.bind(root)
				if (key === 'querySelectorAll') return root.querySelectorAll.bind(root)
				if (key === 'getElementById') return (id: string) => root.querySelector(`#${CSS.escape(id)}`)
				const value = Reflect.get(target, key, target)
				return typeof value === 'function' ? value.bind(target) : value
			}
		})
		const runScript = new Function('document', script)
		runScript(scopedDocument)
	} catch (scriptError) {
		console.warn('zest docs: paired example script failed to run', scriptError)
	}
}

const buildPlaygroundCodeBlock = (language: string, code: string): ZCodeBlockElementT => {
	return buildCodeBlock({ code, language, filename: '', hasCopyButton: false })
}

const buildSetupSection = (pairedScript: string): HTMLElement => {
	const wrap = createElement('div', 'playgroundSetup')

	const label = buildLabel('Setup')
	label.classList.add('playgroundSetupLabel')

	wrap.append(label, buildPlaygroundCodeBlock('js', pairedScript))
	return wrap
}

const buildJsOnlyFootnote = (propertyNames: string[]): HTMLElement => {
	const callout = createElement('z-callout', 'playgroundFootnote')
	callout.setAttribute('accent', 'dom')
	callout.textContent = `Also configurable via JS property: ${propertyNames.join(', ')}.`
	return callout
}

// Builds a z-playground with no controls and no single driven instance —
// every root element of the example slotted in side by side, live and
// wired up. This is the concept-page fallback: z-playground already skips
// its controls panel when `controls` is empty, and already reads every
// slotted stage element (not just one) into the output snippet, so an empty
// controls array is all it takes to get an honest, uncontrolled demo instead
// of the broken "no demo at all" a canonical-element mismatch used to leave
// behind.
const buildConceptPlayground = (page: DocPageT): HTMLElement | null => {
	const stageElements = getConceptStageElements(page.primaryExampleHtml)
	if (!stageElements.length) return null

	for (const stageElement of stageElements) stageElement.setAttribute('slot', 'stage')

	const playground = createElement('z-playground') as ZPlaygroundElementT
	playground.setAttribute('tag-name', page.slug)
	playground.controls = []
	playground.append(...stageElements)

	return playground
}

// Builds the whole "Playground" card for a component doc page: a live,
// controllable instance on top, a controls toolbar generated from the doc's
// own Attributes table, and the resulting HTML underneath — kept in sync on
// every control change. Returns null for pages with no example to drive
// (standalone/meta docs).
export const buildPlayground = (page: DocPageT): HTMLElement | null => {
	if (!page.primaryExampleHtml) return null

	const playgroundData = getComponentPlaygroundData(page.rawMarkdown)

	const canonicalElement = getCanonicalElement(page.primaryExampleHtml, page.slug)

	const wrap = createElement('div', 'playgroundGroup')

	if (canonicalElement) {
		// Snapshotted before the element joins the document and renders, so the
		// snippet shows the markdown's own markup rather than the attributes the
		// component adds to itself. See buildPlayground in render/playground.ts.
		// The values ride along too — z-playground's Reset restores each control
		// to what the markdown actually wrote, not just to "gone".
		const authoredAttributes = canonicalElement.getAttributeNames()
		const authoredAttributeValues = Object.fromEntries(
			authoredAttributes.map((name) => [name, canonicalElement.getAttribute(name) ?? ''])
		)
		canonicalElement.setAttribute('slot', 'stage')

		const playground = createElement('z-playground') as ZPlaygroundElementT
		playground.setAttribute('tag-name', page.slug)
		playground.controls = playgroundData.controls
		playground.authoredAttributes = authoredAttributes
		playground.authoredAttributeValues = authoredAttributeValues
		playground.append(canonicalElement)
		wrap.append(playground)
	}

	if (!canonicalElement) {
		const conceptPlayground = buildConceptPlayground(page)
		if (!conceptPlayground) return null
		wrap.append(conceptPlayground)
	}

	// The markdown path has two things the TypeScript pages do not: a paired
	// setup script, and properties that can only be set from JS. Both hang off
	// the playground rather than inside it, since neither is a knob.
	if (playgroundData.pairedScript) {
		const pairedScript = playgroundData.pairedScript
		wrap.append(buildSetupSection(pairedScript))

		// Runs after this element is connected to the live document (the
		// caller appends the returned node synchronously; microtasks flush
		// right after), since these scripts do `document.querySelector(...)`.
		queueMicrotask(() => runPairedScriptSafely(pairedScript, wrap))
	}

	if (playgroundData.jsOnlyPropertyNames.length > 0) {
		wrap.append(buildJsOnlyFootnote(playgroundData.jsOnlyPropertyNames))
	}

	return wrap
}
