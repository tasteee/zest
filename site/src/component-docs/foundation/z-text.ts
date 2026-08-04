import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'
import { TEXT_FAMILY_RELATED, buildTextFamilyAttributes } from './text-family'

const buildPlaygroundText = (): HTMLElement => {
	const text = document.createElement('z-text')
	text.textContent = 'The quick brown fox jumps over the lazy dog.'
	return text
}

export const zTextDoc: ComponentDocT = {
	tag: 'z-text',
	title: 'z-text',
	tagline: 'Body copy — the base of the type family everything else is measured against.',
	status: ComponentStatus.stable,

	description:
		'`z-text` and its siblings `z-heading`, `z-subheading`, and `z-label` are one component with four defaults. They take the same `size`, `color`, `weight`, and `tag` props and share one type scale; what separates them is the weight they start at, whether they uppercase, and which element they render. Learning the props here means you already know the other three. Renders a `<p>` unless `tag` says otherwise.',

	playground: {
		buildElement: buildPlaygroundText,
		controlNames: [],
		slotLabel: 'The quick brown fox…'
	},

	usageGuidance: [
		'Pick `size` for the visual scale and `tag` for the semantics. They default to matching, and should only diverge when you have a specific reason.',
		'`color="muted"` is the workhorse for secondary copy. Reaching for a lower `weight` to make text recede usually reads as a rendering bug instead.',
		'Cap measure with the layout, not the type — a `z-container` or a `max-width` on the parent. Long lines are a layout problem.',
		'Use `z-inline` for a styled fragment inside a paragraph. Nesting a `z-text` inside another resets the size and breaks the rhythm.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The text content.' },
		{ name: 'rendered tag', description: 'A `<p>` by default, overridable with `tag` when the semantics differ from the look.' }
	],

	examples: [
		defineMarkupExample({
			id: 'sizes',
			title: 'The scale',
			description: 'Six steps shared by the whole family, so a heading and a paragraph at the same size line up exactly.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text size="xxl">Extra extra large</z-text>
				<z-text size="xl">Extra large</z-text>
				<z-text size="lg">Large</z-text>
				<z-text size="md">Medium — the default</z-text>
				<z-text size="sm">Small</z-text>
				<z-text size="xs">Extra small</z-text>
			`
		}),

		defineMarkupExample({
			id: 'colors',
			title: 'Colours',
			description: 'Five theme colours. Every one is a token, so they follow the theme rather than pinning a literal value.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text color="neutral">Neutral — default body colour</z-text>
				<z-text color="muted">Muted — secondary and supporting copy</z-text>
				<z-text color="dom">Primary — accent</z-text>
				<z-text color="sub">Secondary — the other accent</z-text>
				<z-text color="strong">White — for use on filled surfaces</z-text>
			`
		}),

		defineMarkupExample({
			id: 'weights',
			title: 'Weights',
			description: 'Overrides the variant default. `z-text` starts at 400, so anything heavier reads as emphasis.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text weight="300">Three hundred — light</z-text>
				<z-text weight="400">Four hundred — the z-text default</z-text>
				<z-text weight="600">Six hundred — semibold</z-text>
				<z-text weight="700">Seven hundred — bold</z-text>
				<z-text weight="900">Nine hundred — black</z-text>
			`
		}),

		defineMarkupExample({
			id: 'decorations',
			title: 'Decorations',
			description: 'Italic, underline, and strikethrough. The last two combine when both are set.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text is-italic>Italic</z-text>
				<z-text is-underlined>Underlined</z-text>
				<z-text is-strikethrough>Struck through</z-text>
				<z-text is-underlined is-strikethrough>Both at once</z-text>
			`
		}),

		defineMarkupExample({
			id: 'semantic-tag',
			title: 'Separating look from semantics',
			description:
				'`tag` changes the element without touching the styling — a `<span>` that looks like a paragraph, or a `<div>` when a `<p>` would nest illegally.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text tag="span" size="sm" color="muted">Rendered as a span</z-text>
				<z-text tag="div">Rendered as a div</z-text>
				<z-text tag="figcaption" size="xs" color="muted">Rendered as a figcaption</z-text>
			`
		}),

		defineMarkupExample({
			id: 'lede',
			title: 'A lede and its body',
			description:
				'The everyday pairing: one size up and muted for the lede, default for the body. Two sizes is usually the whole hierarchy a block of prose needs.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="4" style="max-width: 44rem">
				  <z-text size="lg" color="muted">
				    Every component ships its own encapsulated styles, so dropping one into
				    an existing page never inherits anything you did not ask for.
				  </z-text>
				  <z-text>
				    That isolation is what makes the library safe to adopt incrementally.
				    You can put a single control into a page built with something else
				    entirely and it will look exactly as it does here.
				  </z-text>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'with-inline',
			title: 'With inline fragments',
			description:
				'`z-inline` patches colour and weight on a fragment while inheriting the size from its parent — which is exactly what nesting a second `z-text` would fail to do.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text size="lg" style="max-width: 44rem">
				  A lede-sized sentence with
				  <z-inline color="dom" weight="600">an emphasised phrase</z-inline>
				  and <z-inline color="muted">a quieter aside</z-inline>, both holding the
				  surrounding size.
				</z-text>
			`
		})
	],

	attributes: buildTextFamilyAttributes({
		sizes: 'xxl | xl | lg | md | sm | xs',
		defaultSize: 'md',
		defaultWeight: '400',
		defaultTag: 'p',
		defaultColor: 'neutral',
		sizeDescription: 'Step on the shared type scale.'
	}),

	properties: [],
	slots: [{ name: '(default)', description: 'The text content.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Set tag to match the document structure. Visual size carries no meaning to a screen reader — only the element does.',
		'Colour alone should never be the only signal. Muted text that conveys something important needs a second cue.',
		'Avoid weight 300 below the sm size; the thin stroke loses contrast against the background at small sizes.',
		'Never use a heading tag purely to make text large. Use z-text with a bigger size instead, so the outline stays honest.'
	],

	related: [
		TEXT_FAMILY_RELATED.heading,
		TEXT_FAMILY_RELATED.subheading,
		TEXT_FAMILY_RELATED.label,
		TEXT_FAMILY_RELATED.inline
	]
}
