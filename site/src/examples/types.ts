// The authored shape of a showcase example.
//
// Component pages document one element at a time. An example is the other
// half of the story: several elements composed into something a reader would
// actually ship — an inbox, a settings page, a whole site. Each entry owns
// the DOM it builds, the source it wants to show, and the metadata the gallery
// filters on.

import type { CodeSnippetT } from '../component-docs/types'

// An organism is a self-contained region of a product (a comment thread, a
// checkout form) and runs live inside its docs page. A page is a complete
// screen, chrome and all: it needs the whole viewport, so the docs show a
// scaled render and the real thing opens in its own tab.
export const ExampleKind = {
	organism: 'organism',
	page: 'page'
} as const

export type ExampleKindT = (typeof ExampleKind)[keyof typeof ExampleKind]

export const EXAMPLE_KIND_LABELS: Record<ExampleKindT, string> = {
	organism: 'Organism',
	page: 'Page'
}

// The widths an example is worth looking at. A three-pane inbox has nothing
// to say at phone width, so an entry lists only the viewports it supports and
// the page offers only those.
export const ExampleViewport = {
	desktop: 'desktop',
	tablet: 'tablet',
	phone: 'phone'
} as const

export type ExampleViewportT = (typeof ExampleViewport)[keyof typeof ExampleViewport]

export const EXAMPLE_VIEWPORT_WIDTHS: Record<ExampleViewportT, string> = {
	desktop: '100%',
	tablet: '820px',
	phone: '400px'
}

// What `build` hands back. `dispose` is for anything the example started that
// outlives its DOM — a demo that fakes replies on a timer has to stop when the
// reader navigates away.
export type ExampleInstanceT = {
	root: HTMLElement
	dispose?: () => void
}

export type ExampleEntryT = {
	slug: string
	title: string
	// One line, shown on the gallery card and under the page title.
	tagline: string
	// A short paragraph or two: what the example shows and how it is put
	// together. Backtick-delimited inline code is rendered as code.
	description: string
	kind: ExampleKindT
	// Free-form topic tags the gallery can filter on ("chat", "forms").
	tags: string[]
	// Every z-* element the example composes, in roughly the order they
	// appear. Linked to their reference pages where one exists.
	elements: string[]
	viewports: ExampleViewportT[]
	// The live stage's height on the example page. Examples are usually
	// height-driven layouts (a thread scrolls inside a fixed frame), so the
	// entry says how tall it needs to be rather than letting content decide.
	stageHeight: string
	// The design size the gallery card renders the example at before scaling
	// it down to fit. Wide enough that a multi-pane layout keeps its panes.
	thumbnail: { width: number; height: number }
	snippets: CodeSnippetT[]
	build: () => ExampleInstanceT
}
