import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'
import { TEXT_FAMILY_RELATED, buildTextFamilyAttributes } from './text-family'

const buildPlaygroundHeading = (): HTMLElement => {
	const heading = document.createElement('z-heading')
	heading.setAttribute('size', 'lg')
	heading.textContent = 'A section title'
	return heading
}

export const zHeadingDoc: ComponentDocT = {
	tag: 'z-heading',
	title: 'z-heading',
	tagline: 'Headings whose semantic level is derived from their visual size.',
	status: ComponentStatus.stable,

	description:
		'The `z-text` family at weight 700, with one addition that matters: the rendered tag is derived from `size`, mapping `xxl` to `h1` down through `xs` to `h6`. Visual hierarchy and document outline stay in sync by default instead of by discipline, which is the usual way outlines rot. When the two genuinely need to diverge — an `h2` that should look small, a heading inside a card that must not claim a level — `tag` overrides the derivation without touching the styling.',

	playground: {
		buildElement: buildPlaygroundHeading,
		controlNames: [],
		slotLabel: 'A section title'
	},

	usageGuidance: [
		'Let `size` pick the tag. Reach for `tag` only when the visual weight and the outline position genuinely disagree.',
		'Never skip a level to get a size. Set `size` for the look and `tag` for the level — that is the whole point of them being separate.',
		'One `h1` per page. If a `size="xxl"` heading appears twice, the second one wants an explicit `tag`.',
		'Card and panel titles usually want `size="xs"` or `sm` with an explicit `tag`, since they sit inside a section that already owns the real level.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The heading text.' },
		{
			name: 'derived tag',
			description: 'Mapped from `size` — xxl→h1, xl→h2, lg→h3, md→h4, sm→h5, xs→h6 — unless `tag` overrides it.'
		}
	],

	examples: [
		defineMarkupExample({
			id: 'scale',
			title: 'The scale and its tags',
			description: 'Each size renders the heading level shown beside it, with no extra markup.',
			layout: ExampleLayout.fill,
			markup: `
				<z-heading size="xxl">Extra extra large — h1</z-heading>
				<z-heading size="xl">Extra large — h2</z-heading>
				<z-heading size="lg">Large — h3</z-heading>
				<z-heading size="md">Medium — h4, the default</z-heading>
				<z-heading size="sm">Small — h5</z-heading>
				<z-heading size="xs">Extra small — h6</z-heading>
			`
		}),

		defineMarkupExample({
			id: 'tag-override',
			title: 'Overriding the tag',
			description:
				'The case the override exists for: a heading that must sit at a particular level in the outline while looking like something else entirely.',
			layout: ExampleLayout.fill,
			markup: `
				<z-heading size="md" tag="h2">Looks like an h4, is an h2</z-heading>
				<z-heading size="xl" tag="h3">Looks like an h2, is an h3</z-heading>
				<z-heading size="sm" tag="div">Styled like a heading, no outline level at all</z-heading>
			`
		}),

		defineMarkupExample({
			id: 'colors',
			title: 'Colours',
			description: 'The same five theme colours as the rest of the family.',
			layout: ExampleLayout.fill,
			markup: `
				<z-heading size="lg" color="neutral">Neutral</z-heading>
				<z-heading size="lg" color="dom">Primary</z-heading>
				<z-heading size="lg" color="sub">Secondary</z-heading>
				<z-heading size="lg" color="muted">Muted</z-heading>
			`
		}),

		defineMarkupExample({
			id: 'weights',
			title: 'Weights',
			description: 'Headings start at 700. Dropping to 400 gives a large-but-quiet title for editorial layouts.',
			layout: ExampleLayout.fill,
			markup: `
				<z-heading size="xl" weight="300">Three hundred</z-heading>
				<z-heading size="xl" weight="400">Four hundred</z-heading>
				<z-heading size="xl" weight="700">Seven hundred — the default</z-heading>
				<z-heading size="xl" weight="900">Nine hundred</z-heading>
			`
		}),

		defineMarkupExample({
			id: 'with-eyebrow',
			title: 'Section header pattern',
			description:
				'The standard three-part header: an eyebrow for category, a heading for the title, and muted body copy underneath.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="xs" style="max-width: 40rem">
				  <z-eyebrow label="Design system"></z-eyebrow>
				  <z-heading size="xl">Built on tokens, not values</z-heading>
				  <z-text color="muted">
				    Every colour, space, and radius in the library resolves through a
				    custom property, so retheming never means touching a component.
				  </z-text>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'outline',
			title: 'A well-formed outline',
			description:
				'Sizes descend, levels descend with them, and nothing is skipped. This is what the derivation gives you for free.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="md" style="max-width: 40rem">
				  <z-heading size="xxl">Getting started</z-heading>
				  <z-text color="muted">Install the package and import two files.</z-text>

				  <z-heading size="lg">Installation</z-heading>
				  <z-text color="muted">One dependency, zero runtime deps.</z-text>

				  <z-heading size="md">With a bundler</z-heading>
				  <z-text color="muted">Import the module and the token stylesheet.</z-text>

				  <z-heading size="md">From a CDN</z-heading>
				  <z-text color="muted">No build step required.</z-text>
				</wired-column>
			`
		})
	],

	attributes: buildTextFamilyAttributes({
		sizes: 'xxl | xl | lg | md | sm | xs',
		defaultSize: 'md',
		defaultWeight: '700',
		defaultTag: 'derived from size',
		defaultColor: 'neutral',
		sizeDescription: 'Step on the shared type scale. Also derives the rendered heading level.'
	}),

	properties: [],
	slots: [{ name: '(default)', description: 'The heading text.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Screen reader users navigate by heading level, so the outline is a primary navigation structure rather than a formality.',
		'Do not skip levels — an h2 followed by an h4 reads as a missing section. Use tag to keep the sequence intact when the sizes jump.',
		'A visually large heading that should not claim a level needs tag set explicitly, otherwise size will claim one for it.',
		'The derived mapping only holds if you let it. Setting size without checking the surrounding levels is how outlines break.'
	],

	related: [
		TEXT_FAMILY_RELATED.text,
		TEXT_FAMILY_RELATED.display,
		TEXT_FAMILY_RELATED.subheading,
		TEXT_FAMILY_RELATED.eyebrow
	]
}
