import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'
import { TEXT_FAMILY_RELATED } from './text-family'

const buildPlaygroundInline = (): HTMLElement => {
	const text = document.createElement('z-text')
	text.setAttribute('size', 'lg')

	const inline = document.createElement('z-inline')
	inline.setAttribute('color', 'primary')
	inline.textContent = 'an emphasised phrase'

	text.append('A lede-sized sentence with ', inline, ' inside it.')
	return text
}

export const zInlineDoc: ComponentDocT = {
	tag: 'z-inline',
	title: 'z-inline',
	tagline: 'A style patch for a fragment of text — carries no size of its own.',
	status: ComponentStatus.stable,

	description:
		'The one member of the text family with no `size` prop, and that absence is the entire design. Font size, line height, letter spacing, and family all inherit, so an inline fragment can sit inside a `z-text` or `z-heading` at any size without silently snapping back to a default. `color` and `weight` also inherit unless you set them, which makes a bare `<z-inline>` a visual no-op — it only ever changes what you explicitly ask it to change.',

	playground: {
		buildElement: buildPlaygroundInline,
		controlNames: [],
		slotLabel: 'an emphasised phrase'
	},

	usageGuidance: [
		'Use it for a fragment inside already-sized text. Nesting a `z-text` inside another resets the size and breaks the line.',
		'It patches style, not meaning. For semantic emphasis, set `tag` to `strong` or `em` so the emphasis survives being read aloud.',
		'Leave `color` and `weight` unset for anything you want to inherit — that is the difference between this and `z-text`.',
		'If the fragment needs its own size, it is not a fragment. Use `z-text` and let it be its own block.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The fragment of text.' },
		{ name: 'inherited metrics', description: 'Size, line height, tracking, and family always come from the parent — there is no size prop.' },
		{ name: 'rendered tag', description: 'A `<span>` by default; set `tag` to `strong` or `em` when the emphasis is semantic.' }
	],

	examples: [
		defineMarkupExample({
			id: 'size-inheritance',
			title: 'Size is always inherited',
			description:
				'The same `z-inline` markup inside three different parent sizes. It never resets — which is precisely what nesting a second `z-text` would do.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text size="xl">
				  Extra large, with <z-inline color="primary">an inline patch</z-inline> that holds the size.
				</z-text>
				<z-text size="md">
				  Medium, with <z-inline color="primary">an inline patch</z-inline> that holds the size.
				</z-text>
				<z-text size="xs">
				  Extra small, with <z-inline color="primary">an inline patch</z-inline> that holds the size.
				</z-text>
			`
		}),

		defineMarkupExample({
			id: 'colors',
			title: 'Colours',
			description: 'Recolour a phrase without touching anything else about it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text>
				  Neutral running text with <z-inline color="primary">primary</z-inline>,
				  <z-inline color="secondary">secondary</z-inline>, and
				  <z-inline color="muted">muted</z-inline> fragments inside it.
				</z-text>
			`
		}),

		defineMarkupExample({
			id: 'weights',
			title: 'Weights',
			description: 'Weight inherits unless set, so an unstyled fragment is indistinguishable from the text around it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text>
				  Body weight, with <z-inline weight="600">semibold</z-inline> and
				  <z-inline weight="700">bold</z-inline> fragments — and
				  <z-inline>one with no props at all</z-inline>, which changes nothing.
				</z-text>
			`
		}),

		defineMarkupExample({
			id: 'inside-headings',
			title: 'Inside a heading',
			description:
				'A two-tone headline. The second half inherits every metric from the heading and only swaps its colour and weight.',
			layout: ExampleLayout.fill,
			markup: `
				<z-heading size="xxl" style="max-width: 30rem">
				  Build interfaces
				  <z-inline color="primary" weight="400">that feel inevitable</z-inline>
				</z-heading>
			`
		}),

		defineMarkupExample({
			id: 'semantic-tags',
			title: 'Semantic emphasis',
			description:
				'`tag` makes the emphasis real. A coloured span says nothing to a screen reader; a `<strong>` does.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text>
				  This is <z-inline tag="strong" weight="700">strongly emphasised</z-inline>,
				  this is <z-inline tag="em" is-italic>stressed</z-inline>, and this is
				  <z-inline color="primary">only coloured</z-inline> — decorative, and silent
				  when read aloud.
				</z-text>
			`
		}),

		defineMarkupExample({
			id: 'decorations',
			title: 'Decorations',
			description: 'Useful for marking edits inline — a struck-through old value beside its replacement.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text>
				  Price reduced from <z-inline is-strikethrough color="muted">$49</z-inline>
				  to <z-inline weight="600">$29</z-inline> per seat.
				</z-text>
			`
		})
	],

	attributes: [
		{
			name: 'color',
			type: 'neutral | primary | secondary | muted | white',
			defaultValue: 'inherit',
			description: 'Text colour. Inherits when unset, unlike the rest of the family.'
		},
		{
			name: 'weight',
			type: '300 | 400 | 600 | 700 | 900',
			defaultValue: 'inherit',
			description: 'Font weight. Inherits when unset.'
		},
		{
			name: 'tag',
			type: 'string',
			defaultValue: 'span',
			description: 'The rendered element. Use strong or em when the emphasis is semantic.'
		},
		{ name: 'is-italic', type: 'boolean', defaultValue: '—', description: 'Italicises the fragment.' },
		{ name: 'is-underlined', type: 'boolean', defaultValue: '—', description: 'Underlines the fragment.' },
		{
			name: 'is-strikethrough',
			type: 'boolean',
			defaultValue: '—',
			description: 'Strikes the fragment through. Combine with is-underlined for both.'
		},
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the fragment from layout.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The text fragment.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Colour and weight alone convey nothing to a screen reader. Set tag to strong or em when the emphasis carries meaning rather than decoration.',
		'Do not use is-strikethrough alone to mean "removed" or "no longer valid" — pair it with text that says so, or with a del tag.',
		'Because there is no size prop, an inline fragment can never fall below the surrounding text size, which keeps it legible wherever it lands.',
		'A muted fragment inside already-muted text compounds the contrast reduction. Check the result rather than assuming it inherits safely.'
	],

	related: [
		TEXT_FAMILY_RELATED.text,
		TEXT_FAMILY_RELATED.heading,
		TEXT_FAMILY_RELATED.label,
		{ tag: 'z-link', route: '/c/buttons-actions/z-link', description: 'An inline fragment that navigates.' }
	]
}
