import { createElement } from './dom-helpers'
import { getComponentPlaygroundData } from './docs-data'
import { buildCodeBlock, buildLabel } from './render/zest-elements'

type ZPlaygroundElementT = HTMLElement & {
	controls: unknown[]
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
// under a "Playground" heading, which reads as a broken demo.
const getCanonicalElement = (primaryExampleHtml: string, tagName: string): Element | null => {
	const parsedDocument = new DOMParser().parseFromString(primaryExampleHtml, 'text/html')
	const matchedElement = parsedDocument.body.querySelector(tagName)
	if (matchedElement) return matchedElement.cloneNode(true) as Element

	const isRealElement = Boolean(customElements.get(tagName))
	if (!isRealElement) return null

	return document.createElement(tagName)
}

// The paired ```js block (e.g. z-select's `.options = [...]`) is trusted,
// repo-authored content, same as the HTML it sits next to — safe to execute
// so property-driven components actually show real content instead of an
// empty shell. Never let one bad snippet take the whole page down with it.
const runPairedScriptSafely = (script: string): void => {
	try {
		const runScript = new Function(script)
		runScript()
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

// Builds the whole "Playground" card for a component doc page: a live,
// controllable instance on top, a controls toolbar generated from the doc's
// own Attributes table, and the resulting HTML underneath — kept in sync on
// every control change. Returns null for pages with no example to drive
// (standalone/meta docs).
export const buildPlayground = (page: DocPageT): HTMLElement | null => {
	if (!page.primaryExampleHtml) return null

	const canonicalElement = getCanonicalElement(page.primaryExampleHtml, page.slug)
	if (!canonicalElement) return null

	const playgroundData = getComponentPlaygroundData(page.rawMarkdown)
	canonicalElement.setAttribute('slot', 'stage')

	const playground = createElement('z-playground') as ZPlaygroundElementT
	playground.setAttribute('tag-name', page.slug)
	playground.controls = playgroundData.controls
	playground.append(canonicalElement)

	// The markdown path has two things the TypeScript pages do not: a paired
	// setup script, and properties that can only be set from JS. Both hang off
	// the playground rather than inside it, since neither is a knob.
	const wrap = createElement('div', 'playgroundGroup')
	wrap.append(playground)

	if (playgroundData.pairedScript) {
		const pairedScript = playgroundData.pairedScript
		wrap.append(buildSetupSection(pairedScript))

		// Runs after this element is connected to the live document (the
		// caller appends the returned node synchronously; microtasks flush
		// right after), since these scripts do `document.querySelector(...)`.
		queueMicrotask(() => runPairedScriptSafely(pairedScript))
	}

	if (playgroundData.jsOnlyPropertyNames.length > 0) {
		wrap.append(buildJsOnlyFootnote(playgroundData.jsOnlyPropertyNames))
	}

	return wrap
}
