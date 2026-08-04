import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'
import { TEXT_FAMILY_RELATED, buildTextFamilyAttributes } from './text-family'

const buildPlaygroundSubheading = (): HTMLElement => {
	const subheading = document.createElement('z-subheading')
	subheading.setAttribute('size', 'sm')
	subheading.textContent = 'Now in beta'
	return subheading
}

export const zSubheadingDoc: ComponentDocT = {
	tag: 'z-subheading',
	title: 'z-subheading',
	tagline: 'Uppercase, letter-spaced overline text.',
	status: ComponentStatus.stable,

	description:
		'The `z-text` family at weight 600 with `text-transform: uppercase` and widened tracking. It is the overline that sits above a title or opens a group of settings — short, quiet, and structural rather than something anyone reads as prose. Renders a `<p>` by default. For the mono, accent-tinted kicker with an optional trailing rule, `z-eyebrow` is the more decorative sibling.',

	playground: {
		buildElement: buildPlaygroundSubheading,
		controlNames: [],
		slotLabel: 'Now in beta'
	},

	usageGuidance: [
		'Keep it to a few words. Uppercase at wide tracking is markedly slower to read, which is fine for two words and hostile for a sentence.',
		'It is a label, not a heading. If it belongs in the document outline, use `z-heading` with a small size instead.',
		'Choose between this and `z-eyebrow` by texture: `z-subheading` follows the body typeface, `z-eyebrow` is mono with an accent accent and an optional rule.',
		'Do not uppercase the source text yourself — the transform handles it, and leaving the original casing keeps it readable to screen readers and to whoever edits it next.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The overline text, in its natural casing.' },
		{ name: 'transform', description: 'Uppercasing and letter-spacing are applied in CSS, not baked into the content.' }
	],

	examples: [
		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Five steps. The two smallest carry the most tracking, since uppercase needs more air as it shrinks.',
			layout: ExampleLayout.fill,
			markup: `
				<z-subheading size="xl">Extra large</z-subheading>
				<z-subheading size="lg">Large</z-subheading>
				<z-subheading size="md">Medium — the default</z-subheading>
				<z-subheading size="sm">Small</z-subheading>
				<z-subheading size="xs">Extra small</z-subheading>
			`
		}),

		defineMarkupExample({
			id: 'colors',
			title: 'Colours',
			description: 'Accent colours suit an overline well — it is short enough that a strong colour never becomes tiring.',
			layout: ExampleLayout.fill,
			markup: `
				<z-subheading color="neutral">Neutral</z-subheading>
				<z-subheading color="muted">Muted</z-subheading>
				<z-subheading color="dom">Primary</z-subheading>
				<z-subheading color="sub">Secondary</z-subheading>
			`
		}),

		defineMarkupExample({
			id: 'above-heading',
			title: 'As an overline',
			description: 'The primary use: categorising the heading directly beneath it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="1" style="max-width: 38rem">
				  <z-subheading size="sm" color="dom">Now in beta</z-subheading>
				  <z-heading size="xl">Collaborative editing</z-heading>
				  <z-text color="muted">Multiple cursors, presence, and conflict-free merges.</z-text>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'group-labels',
			title: 'As a group label',
			description:
				'Splitting a long form or settings panel into named runs. Small, muted, and repeated is exactly the right register here.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="5" style="max-width: 32rem">
				  <z-column gap="2">
				    <z-subheading size="xs" color="muted">Account</z-subheading>
				    <z-text size="sm">Name, email, and password.</z-text>
				  </z-column>

				  <z-column gap="2">
				    <z-subheading size="xs" color="muted">Notifications</z-subheading>
				    <z-text size="sm">What we send you, and how often.</z-text>
				  </z-column>

				  <z-column gap="2">
				    <z-subheading size="xs" color="muted">Danger zone</z-subheading>
				    <z-text size="sm">Transfer ownership or delete the workspace.</z-text>
				  </z-column>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'semantic-tag',
			title: 'Choosing the tag',
			description:
				'It renders a `<p>`, which is right when the overline is decorative. When it genuinely titles the section, give it a real heading tag.',
			layout: ExampleLayout.fill,
			markup: `
				<z-subheading size="xs" color="muted">Decorative — stays a p</z-subheading>
				<z-subheading size="xs" color="muted" tag="h3">Structural — rendered as an h3</z-subheading>
			`
		})
	],

	attributes: buildTextFamilyAttributes({
		sizes: 'xl | lg | md | sm | xs',
		defaultSize: 'md',
		defaultWeight: '600',
		defaultTag: 'p',
		defaultColor: 'neutral',
		sizeDescription: 'Step on the shared type scale.'
	}),

	properties: [],
	slots: [{ name: '(default)', description: 'The overline text.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Write the content in normal casing and let CSS uppercase it. Some screen readers spell out all-caps source text letter by letter.',
		'It renders a p by default, so it adds nothing to the document outline. Set tag to a heading element when it genuinely titles a section.',
		'Uppercase at wide tracking is harder to read for dyslexic users — keep it to a few words and never use it for running text.',
		'An overline paired with a heading reads as two separate items to a screen reader; make sure the heading alone still makes sense.'
	],

	related: [
		TEXT_FAMILY_RELATED.eyebrow,
		TEXT_FAMILY_RELATED.heading,
		TEXT_FAMILY_RELATED.label,
		TEXT_FAMILY_RELATED.text
	]
}
