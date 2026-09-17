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

// Status is earned, not declared. A page may say `stable` only when every
// row of its evidence record is green; src/_tests/doc-status.test.ts holds
// the line. `unverified` means nobody has checked, not that it is broken.
export const EvidenceLevel = {
	verified: 'verified',
	partial: 'partial',
	unverified: 'unverified'
} as const

export type EvidenceLevelT = (typeof EvidenceLevel)[keyof typeof EvidenceLevel]

export type EvidenceT = {
	/** Takes part in a <form> through ElementInternals, proven in the browser suite. `null` for elements that are not controls. */
	formAssociated: boolean | null
	/** Every row of the documented key map has a browser test. */
	keyboard: EvidenceLevelT
	/** A manual NVDA and VoiceOver pass, recorded on the page. */
	screenReader: EvidenceLevelT
	/** Behaviour tests run in a real browser, not only registration and mount checks. */
	browserTests: boolean
	/** State × theme screenshots with committed baselines. */
	screenshots: boolean
}

export const isStableEvidence = (evidence: EvidenceT): boolean =>
	evidence.formAssociated !== false &&
	evidence.keyboard === EvidenceLevel.verified &&
	evidence.screenReader === EvidenceLevel.verified &&
	evidence.browserTests &&
	evidence.screenshots

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
	// What the example claims, proven: runs in the browser test project against
	// the mounted preview. An example that says "clicking submit shows an
	// error" asserts it here, so the docs cannot describe behaviour the
	// element no longer has.
	assert?: (preview: HTMLElement) => void | Promise<void>
}

// One row of an attribute or property reference table.
//
// `controlOptions` exists for the attributes whose documented type is honest
// but unhelpful as a knob: `weight` really does accept any value from 1 to
// 1000, and a text box is the only control that can express that — while the
// values anyone actually reaches for are the nine hundreds. Listing them here
// gives the playground a select without narrowing what the table claims.
export type ApiRowT = {
	name: string
	type: string
	defaultValue: string
	description: string
	controlOptions?: string[]
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

// A documented key map is a contract: every row here has a browser test in
// src/_tests/browser/keyboard.test.ts, and `evidence.keyboard` says
// `verified` only when that is true.
export type KeyboardRowT = {
	keys: string
	action: string
}

export type ComponentDocT = {
	tag: string
	title: string
	tagline: string
	description: string
	status: ComponentStatusT
	evidence: EvidenceT
	playground: PlaygroundSpecT | null
	anatomy: AnatomyPartT[]
	examples: ExampleT[]
	attributes: ApiRowT[]
	properties: ApiRowT[]
	slots: SlotRowT[]
	events: EventRowT[]
	cssVariables: CssVariableRowT[]
	accessibilityNotes: string[]
	keyboard?: KeyboardRowT[]
	usageGuidance: string[]
	related: RelatedComponentT[]
}
