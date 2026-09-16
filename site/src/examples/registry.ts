// The ordered list of showcase examples.
//
// Order is editorial: the gallery renders entries in this sequence, so the
// strongest example goes first. Lookups are by slug, which is also the route
// segment (#/examples/<slug>).

import './example-elements'
import { chatThreadExample } from './chat-thread'
import type { ExampleEntryT } from './types'

const EXAMPLES: ExampleEntryT[] = [chatThreadExample]

const examplesBySlug = new Map(EXAMPLES.map((example) => [example.slug, example]))

export const getAllExamples = (): ExampleEntryT[] => {
	return EXAMPLES
}

export const getExample = (slug: string): ExampleEntryT | null => {
	return examplesBySlug.get(slug) ?? null
}

// Every distinct tag across the registry, in first-seen order, so the
// gallery's tag row follows the same editorial order as the cards.
export const getAllExampleTags = (): string[] => {
	const tags: string[] = []
	for (const example of EXAMPLES) {
		for (const tag of example.tags) {
			if (!tags.includes(tag)) tags.push(tag)
		}
	}
	return tags
}
