// Adapts an authored ExampleT onto <z-example>, which owns the frame, the
// preview layout, the source disclosure, and the per-language tabs.
//
// Nothing here renders chrome any more — it maps doc data onto element
// properties and hands over the preview root the example built.

import { createElement } from './zest-elements'
import type { ExampleT } from '../component-docs/types'

type ZExampleSnippetT = {
	label: string
	language: string
	code: string
}

type ZExampleElementT = HTMLElement & {
	heading: string
	description: string
	snippets: ZExampleSnippetT[]
}

export const buildExampleCard = (example: ExampleT): HTMLElement => {
	const card = createElement('z-example') as ZExampleElementT
	card.id = `example-${example.id}`
	card.setAttribute('layout', example.layout)

	card.heading = example.title
	card.description = example.description
	card.snippets = example.snippets

	card.append(example.buildPreview())
	return card
}
