// The authored shape of a component documentation page.
//
// These pages are TypeScript rather than markdown on purpose: a premium
// component doc needs examples that own real DOM — live event handlers,
// mutable state, elements whose properties are set from JS. A fenced markup
// string can't carry any of that, so every example here builds and returns
// its own element tree and declares the source it wants to display.

export const ComponentStatus = {
	stable: 'stable',
	beta: 'beta',
	experimental: 'experimental'
} as const

export type ComponentStatusT = (typeof ComponentStatus)[keyof typeof ComponentStatus]

// How an example's preview area arranges whatever the example builds.
// Previews vary a lot — a row of buttons wants centering, a full-width bar
// wants to stretch, a dock wants breathing room underneath it.
export const ExampleLayout = {
	center: 'center',
	start: 'start',
	stack: 'stack',
	fill: 'fill'
} as const

export type ExampleLayoutT = (typeof ExampleLayout)[keyof typeof ExampleLayout]

export type CodeSnippetT = {
	label: string
	language: string
	code: string
}

export type ExampleT = {
	id: string
	title: string
	description: string
	layout: ExampleLayoutT
	snippets: CodeSnippetT[]
	buildPreview: () => HTMLElement
}

// One row of an attribute or property reference table.
export type ApiRowT = {
	name: string
	type: string
	defaultValue: string
	description: string
}

export type SlotRowT = {
	name: string
	description: string
}

export type EventRowT = {
	name: string
	detail: string
	description: string
}

export type CssVariableRowT = {
	name: string
	defaultValue: string
	description: string
}

// A named piece of the component's internal structure, so readers can map
// what they see in the preview onto the part names they'd target in CSS or
// the slots they'd fill.
export type AnatomyPartT = {
	name: string
	description: string
}

export type RelatedComponentT = {
	tag: string
	route: string
	description: string
}

// The playground is the one controllable instance at the top of the page.
// It is driven by the attribute table, so it stays in sync with the API
// reference without a second hand-maintained list of knobs.
export type PlaygroundControlKindT = 'boolean' | 'enum' | 'number' | 'text'

export type PlaygroundControlT = {
	name: string
	kind: PlaygroundControlKindT
	options: string[]
	defaultValue: string
	description: string
}

export type PlaygroundSpecT = {
	buildElement: () => HTMLElement
	controlNames: string[]
	slotLabel: string
}

export type ComponentDocT = {
	tag: string
	title: string
	tagline: string
	description: string
	status: ComponentStatusT
	playground: PlaygroundSpecT | null
	anatomy: AnatomyPartT[]
	examples: ExampleT[]
	attributes: ApiRowT[]
	properties: ApiRowT[]
	slots: SlotRowT[]
	events: EventRowT[]
	cssVariables: CssVariableRowT[]
	accessibilityNotes: string[]
	usageGuidance: string[]
	related: RelatedComponentT[]
}
