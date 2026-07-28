// Renders one documented example: a titled preview frame with its source
// tucked behind a toggle, so a page of twelve examples still scans as a page
// of twelve examples rather than a wall of markup.

import { buildCodeBlock, buildHeading, buildRichText, buildTabPanel, buildTabs, createElement } from './zest-elements'
import type { ZTabT } from './zest-elements'
import type { CodeSnippetT, ExampleT } from '../component-docs/types'

const buildExampleHeader = (example: ExampleT): HTMLElement => {
	const header = createElement('div', 'exampleHeader')

	const heading = buildHeading(example.title, 'sm', 'h3')
	heading.id = `example-${example.id}`
	header.append(heading)

	const hasDescription = example.description.length > 0
	if (hasDescription) header.append(buildRichText(example.description, 'sm', 'muted'))

	return header
}

const buildPreviewBand = (example: ExampleT): HTMLElement => {
	const band = createElement('div', `examplePreview is-${example.layout}`)
	band.append(example.buildPreview())
	return band
}

const buildSingleSnippet = (snippet: CodeSnippetT): HTMLElement => {
	return buildCodeBlock({ code: snippet.code, language: snippet.language, filename: '', hasCopyButton: true })
}

// More than one snippet (markup plus the script that wires it) reads better
// as tabs than as two stacked blocks with no relationship between them.
const buildSnippetTabs = (snippets: CodeSnippetT[]): HTMLElement => {
	const tabDefinitions: ZTabT[] = snippets.map((snippet) => {
		return { value: snippet.language, label: snippet.label }
	})

	const tabs = buildTabs(tabDefinitions)

	for (const snippet of snippets) {
		const panel = buildTabPanel(snippet.language, 'exampleSourcePanel')
		panel.append(buildSingleSnippet(snippet))
		tabs.append(panel)
	}

	return tabs
}

const buildSourceBand = (example: ExampleT): HTMLElement => {
	const band = createElement('div', 'exampleSource')

	const hasMultipleSnippets = example.snippets.length > 1
	if (hasMultipleSnippets) {
		band.append(buildSnippetTabs(example.snippets))
		return band
	}

	band.append(buildSingleSnippet(example.snippets[0]))
	return band
}

const buildSourceToggle = (sourceBand: HTMLElement): HTMLElement => {
	const bar = createElement('div', 'exampleToolbar')

	const toggle = createElement('z-button')
	toggle.setAttribute('kind', 'ghost')
	toggle.setAttribute('size', 'small')
	toggle.textContent = 'Show code'

	toggle.addEventListener('click', () => {
		const willOpen = sourceBand.hidden
		sourceBand.hidden = !willOpen
		toggle.textContent = willOpen ? 'Hide code' : 'Show code'
	})

	bar.append(toggle)
	return bar
}

export const buildExampleCard = (example: ExampleT): HTMLElement => {
	const card = createElement('article', 'exampleCard')
	card.append(buildExampleHeader(example))

	const frame = createElement('z-surface', 'exampleFrame')
	frame.setAttribute('level', '1')
	frame.setAttribute('radius', 'lg')
	frame.setAttribute('inset', '0')
	frame.setAttribute('border', '')

	const sourceBand = buildSourceBand(example)
	sourceBand.hidden = true

	frame.append(buildPreviewBand(example), buildSourceToggle(sourceBand), sourceBand)
	card.append(frame)

	return card
}
