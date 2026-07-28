import { createElement } from './dom-helpers'
import { getComponentPlaygroundData } from './docs-data'
import type { AttributeControlT, DocPageT } from './docs-data'

// z-code-block has no ambient DOM typings — see the note in main.ts.
type ZCodeBlockElementT = HTMLElement & {
	code: string
}

// Pulls the single element matching the page's own tag out of the primary
// example (e.g. the first `<z-button tone="primary">Save</z-button>` out of
// z-button.md's five variations) to use as the one instance the playground's
// controls drive. Falls back to a bare element for the handful of docs whose
// slug isn't a real tag (e.g. z-drag-drop.md, which documents z-draggable /
// z-drop-target instead).
const getCanonicalElement = (primaryExampleHtml: string, tagName: string): Element => {
	const parsedDocument = new DOMParser().parseFromString(primaryExampleHtml, 'text/html')
	const matchedElement = parsedDocument.body.querySelector(tagName)
	if (matchedElement) return matchedElement.cloneNode(true) as Element
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

const buildBooleanControl = (canonicalElement: Element, control: AttributeControlT, onChange: () => void): HTMLInputElement => {
	const checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.className = 'playgroundToggle'
	checkbox.checked = canonicalElement.hasAttribute(control.name)

	checkbox.addEventListener('change', () => {
		const shouldSetAttribute = checkbox.checked
		if (shouldSetAttribute) canonicalElement.setAttribute(control.name, '')
		if (!shouldSetAttribute) canonicalElement.removeAttribute(control.name)
		onChange()
	})

	return checkbox
}

const buildEnumControl = (canonicalElement: Element, control: AttributeControlT, onChange: () => void): HTMLSelectElement => {
	const select = document.createElement('select')
	select.className = 'playgroundControlInput'

	const unsetOption = document.createElement('option')
	unsetOption.value = ''
	unsetOption.textContent = '—'
	select.append(unsetOption)

	for (const optionValue of control.options) {
		const option = document.createElement('option')
		option.value = optionValue
		option.textContent = optionValue
		select.append(option)
	}

	const currentValue = canonicalElement.getAttribute(control.name)
	select.value = currentValue ?? control.defaultValue ?? ''

	select.addEventListener('change', () => {
		const hasValue = select.value !== ''
		if (hasValue) canonicalElement.setAttribute(control.name, select.value)
		if (!hasValue) canonicalElement.removeAttribute(control.name)
		onChange()
	})

	return select
}

const buildTextOrNumberControl = (canonicalElement: Element, control: AttributeControlT, onChange: () => void): HTMLInputElement => {
	const input = document.createElement('input')
	input.type = control.kind === 'number' ? 'number' : 'text'
	input.className = 'playgroundControlInput'

	const currentValue = canonicalElement.getAttribute(control.name)
	input.value = currentValue ?? control.defaultValue ?? ''
	if (control.defaultValue) input.placeholder = control.defaultValue

	input.addEventListener('input', () => {
		const hasValue = input.value.trim() !== ''
		if (hasValue) canonicalElement.setAttribute(control.name, input.value)
		if (!hasValue) canonicalElement.removeAttribute(control.name)
		onChange()
	})

	return input
}

const buildControlField = (canonicalElement: Element, control: AttributeControlT, onChange: () => void): HTMLElement => {
	const field = createElement('label', 'playgroundControlField')

	const fieldLabel = createElement('span', 'playgroundControlLabel')
	fieldLabel.textContent = control.name
	field.append(fieldLabel)

	if (control.kind === 'boolean') {
		field.append(buildBooleanControl(canonicalElement, control, onChange))
		return field
	}

	if (control.kind === 'enum') {
		field.append(buildEnumControl(canonicalElement, control, onChange))
		return field
	}

	field.append(buildTextOrNumberControl(canonicalElement, control, onChange))
	return field
}

const buildControlsBar = (canonicalElement: Element, controls: AttributeControlT[], onChange: () => void): HTMLElement => {
	const controlsBar = createElement('div', 'playgroundControls')
	for (const control of controls) {
		controlsBar.append(buildControlField(canonicalElement, control, onChange))
	}
	return controlsBar
}

const buildCodeBlock = (language: string): ZCodeBlockElementT => {
	const codeBlock = document.createElement('z-code-block') as ZCodeBlockElementT
	codeBlock.setAttribute('language', language)
	codeBlock.setAttribute('hide-copy', '')
	return codeBlock
}

const buildSetupSection = (pairedScript: string): HTMLElement => {
	const wrap = createElement('div', 'playgroundSetup')

	const label = createElement('p', 'playgroundSetupLabel')
	label.textContent = 'Setup'

	const codeBlock = buildCodeBlock('js')
	codeBlock.code = pairedScript

	wrap.append(label, codeBlock)
	return wrap
}

const buildJsOnlyFootnote = (propertyNames: string[]): HTMLElement => {
	const callout = createElement('z-callout', 'playgroundFootnote')
	callout.setAttribute('kind', 'note')
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
	const playgroundData = getComponentPlaygroundData(page.rawMarkdown)

	const playground = createElement('z-surface', 'playground')
	playground.setAttribute('level', '1')
	playground.setAttribute('radius', 'lg')

	const preview = createElement('div', 'playgroundPreview')
	preview.append(canonicalElement)
	playground.append(preview)

	const codeSection = createElement('div', 'playgroundCodeSection')
	const codeBlock = buildCodeBlock('html')
	codeBlock.classList.add('playgroundCode')
	codeSection.append(codeBlock)

	const refreshCodeOutput = (): void => {
		codeBlock.code = canonicalElement.outerHTML
	}
	refreshCodeOutput()

	const hasControls = playgroundData.controls.length > 0
	if (hasControls) {
		playground.append(buildControlsBar(canonicalElement, playgroundData.controls, refreshCodeOutput))
	}

	playground.append(codeSection)

	if (playgroundData.pairedScript) {
		const pairedScript = playgroundData.pairedScript
		playground.append(buildSetupSection(pairedScript))

		// Runs after this element is connected to the live document (the
		// caller appends the returned node synchronously; microtasks flush
		// right after), since these scripts do `document.querySelector(...)`.
		queueMicrotask(() => {
			runPairedScriptSafely(pairedScript)
			refreshCodeOutput()
		})
	}

	if (playgroundData.jsOnlyPropertyNames.length > 0) {
		playground.append(buildJsOnlyFootnote(playgroundData.jsOnlyPropertyNames))
	}

	return playground
}
