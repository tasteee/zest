// Authoring helpers for component doc pages.
//
// Every example needs two things that must never drift apart: the live DOM a
// reader sees, and the source they copy. These builders derive both from one
// declaration, so an example can't show markup it doesn't actually render.

import { ExampleLayout } from './types'
import type { CodeSnippetT, ExampleLayoutT, ExampleT } from './types'

// Strips the shared leading indentation off a template literal so example
// source can be written at its natural nesting depth in this file and still
// render flush-left in the code block.
export const dedent = (source: string): string => {
	const withoutEdgeBlankLines = source.replace(/^\n+/, '').replace(/\s+$/, '')
	const lines = withoutEdgeBlankLines.split('\n')
	const contentLines = lines.filter((line) => line.trim().length > 0)

	const hasContent = contentLines.length > 0
	if (!hasContent) return ''

	const indentWidths = contentLines.map((line) => line.length - line.trimStart().length)
	const smallestIndent = Math.min(...indentWidths)
	const trimmedLines = lines.map((line) => line.slice(smallestIndent))

	return trimmedLines.join('\n')
}

// Parses trusted, repo-authored markup into a real element tree, upgraded and
// ready for an example's wiring to assign properties to it.
//
// Both steps here are load-bearing. Template content lives in an inert
// document that has no custom element registry, so `cloneNode` would hand back
// elements that can never upgrade; `importNode` adopts them into this document
// instead. They are still only *upgrade candidates* until they are inserted,
// though, and wiring runs before insertion — so `upgrade` is what makes the
// component's accessors exist in time. Skip either and an assignment like
// `.code = …` writes a plain own property that shadows the accessor for the
// life of the element, and the component silently never sees the value.
export const buildFragmentFromMarkup = (markup: string): DocumentFragment => {
	const template = document.createElement('template')
	template.innerHTML = dedent(markup)

	const fragment = document.importNode(template.content, true)
	customElements.upgrade(fragment)
	return fragment
}

const buildPreviewRoot = (markup: string): HTMLElement => {
	const root = document.createElement('div')
	root.className = 'examplePreviewRoot'
	root.append(buildFragmentFromMarkup(markup))
	return root
}

const resolveLayout = (layout: ExampleLayoutT | undefined): ExampleLayoutT => {
	if (layout) return layout
	return ExampleLayout.center
}

type MarkupExampleInputT = {
	id: string
	title: string
	description: string
	markup: string
	layout?: ExampleLayoutT
}

// The common case: an example that is purely declarative markup.
export const defineMarkupExample = (input: MarkupExampleInputT): ExampleT => {
	const markup = dedent(input.markup)

	const snippets: CodeSnippetT[] = [{ label: 'HTML', language: 'html', code: markup }]

	return {
		id: input.id,
		title: input.title,
		description: input.description,
		layout: resolveLayout(input.layout),
		snippets,
		buildPreview: () => buildPreviewRoot(markup)
	}
}

type InteractiveExampleInputT = {
	id: string
	title: string
	description: string
	markup: string
	script: string
	wire: (root: HTMLElement) => void
	layout?: ExampleLayoutT
}

// An example whose behaviour matters — event listeners, state that changes as
// you click, properties assigned from JS. `wire` receives the real preview
// root and does the work; `script` is the equivalent source shown to readers.
export const defineInteractiveExample = (input: InteractiveExampleInputT): ExampleT => {
	const markup = dedent(input.markup)
	const script = dedent(input.script)

	const snippets: CodeSnippetT[] = [
		{ label: 'HTML', language: 'html', code: markup },
		{ label: 'JavaScript', language: 'js', code: script }
	]

	const buildPreview = (): HTMLElement => {
		const root = buildPreviewRoot(markup)
		input.wire(root)
		return root
	}

	return {
		id: input.id,
		title: input.title,
		description: input.description,
		layout: resolveLayout(input.layout),
		snippets,
		buildPreview
	}
}

type ComposedExampleInputT = {
	id: string
	title: string
	description: string
	snippets: CodeSnippetT[]
	build: () => HTMLElement
	layout?: ExampleLayoutT
}

// The escape hatch: the example constructs its own tree from scratch and
// declares exactly which snippets to display alongside it.
export const defineComposedExample = (input: ComposedExampleInputT): ExampleT => {
	const dedentedSnippets = input.snippets.map((snippet) => {
		return { label: snippet.label, language: snippet.language, code: dedent(snippet.code) }
	})

	const buildPreview = (): HTMLElement => {
		const root = document.createElement('div')
		root.className = 'examplePreviewRoot'
		root.append(input.build())
		return root
	}

	return {
		id: input.id,
		title: input.title,
		description: input.description,
		layout: resolveLayout(input.layout),
		snippets: dedentedSnippets,
		buildPreview
	}
}

// Typed lookup inside an example's preview root. Examples own their markup,
// so a miss is an authoring bug worth surfacing loudly rather than a runtime
// condition worth handling.
export const queryPreview = <ElementT extends Element>(root: HTMLElement, selector: string): ElementT => {
	const found = root.querySelector(selector)
	if (!found) throw new Error(`zest docs: example markup has no match for "${selector}"`)
	return found as ElementT
}

export const queryAllPreview = <ElementT extends Element>(root: HTMLElement, selector: string): ElementT[] => {
	return [...root.querySelectorAll(selector)] as ElementT[]
}
