import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'
import { TEXT_FAMILY_RELATED, buildTextFamilyAttributes } from './text-family'

const buildPlaygroundDisplay = (): HTMLElement => {
	const display = document.createElement('z-display')
	display.setAttribute('size', 'md')
	display.textContent = 'Build faster.'
	return display
}

export const zDisplayDoc: ComponentDocT = {
	tag: 'z-display',
	title: 'z-display',
	tagline: 'Hero type that clamps with the viewport instead of stepping through fixed sizes.',
	status: ComponentStatus.stable,

	description:
		'The tier above `z-heading`. Where a heading tops out at a fixed size, a display title is fluid — it clamps against the viewport, so it fills a wide screen without overflowing a phone. That is the only structural difference; it shares the family\'s `color`, `weight`, and `tag` vocabulary. Because the size is fluid, there is no size-to-tag derivation here: `tag` defaults to `h1`, which is almost always what a hero title should be.',

	playground: {
		buildElement: buildPlaygroundDisplay,
		controlNames: [],
		slotLabel: 'Build faster.'
	},

	usageGuidance: [
		'One per page, at the top. A second display title on the same screen turns a hero into noise.',
		'Keep it to a handful of words. Fluid type at `xl` gets very large on a wide monitor, and a long line becomes unreadable rather than impressive.',
		'`z-heading size="xxl"` is the right call for anything below the hero — it is fixed, predictable, and composes with the rest of the outline.',
		'Check the smallest width you support. Fluid means the bottom of the clamp is doing real work on a phone.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The title text.' },
		{ name: 'fluid size', description: 'Clamped against the viewport rather than fixed, so it scales between a floor and a ceiling.' },
		{ name: 'rendered tag', description: 'An `<h1>` by default — no derivation from size, since the size is fluid.' }
	],

	examples: [
		defineMarkupExample({
			id: 'sizes',
			title: 'The four steps',
			description:
				'Each clamps against the viewport, so resizing this page changes them all. The gap between steps widens as the screen does.',
			layout: ExampleLayout.fill,
			markup: `
				<z-display size="sm">Small display</z-display>
				<z-display size="md">Medium display</z-display>
				<z-display size="lg">Large — the default</z-display>
				<z-display size="xl">Extra large</z-display>
			`
		}),

		defineMarkupExample({
			id: 'colors',
			title: 'Colours',
			description: 'The same theme colours as the rest of the family.',
			layout: ExampleLayout.fill,
			markup: `
				<z-display size="sm" color="neutral">Neutral</z-display>
				<z-display size="sm" color="dom">Primary</z-display>
				<z-display size="sm" color="muted">Muted</z-display>
			`
		}),

		defineMarkupExample({
			id: 'weights',
			title: 'Weights',
			description:
				'Display starts at 700. Dropping to 300 or 400 at this scale gives an editorial feel that bold cannot.',
			layout: ExampleLayout.fill,
			markup: `
				<z-display size="sm" weight="300">Three hundred</z-display>
				<z-display size="sm" weight="400">Four hundred</z-display>
				<z-display size="sm" weight="700">Seven hundred — the default</z-display>
				<z-display size="sm" weight="900">Nine hundred</z-display>
			`
		}),

		defineMarkupExample({
			id: 'hero',
			title: 'A hero block',
			description:
				'Eyebrow, display title, supporting copy, actions. Capping the measure is what keeps the title from running the full width of a large monitor.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="5" style="max-width: 46rem">
				  <z-eyebrow label="Zest" has-rule></z-eyebrow>
				  <z-display size="md">Components that stay out of your way.</z-display>
				  <z-text size="lg" color="muted">
				    Framework-agnostic web components with encapsulated styles and zero
				    runtime dependencies.
				  </z-text>
				  <wired-row gap="sm">
				    <z-button accent="dom">Get started</z-button>
				    <z-button kind="outline">Browse components</z-button>
				  </wired-row>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'two-accent',
			title: 'Two-accent titles',
			description: 'A `z-inline` inside a display title recolours a phrase while inheriting the fluid size.',
			layout: ExampleLayout.fill,
			markup: `
				<z-display size="sm" style="max-width: 34rem">
				  Ship interfaces that
				  <z-inline color="dom">feel inevitable</z-inline>
				</z-display>
			`
		}),

		defineMarkupExample({
			id: 'tag-override',
			title: 'Quieter section titles',
			description:
				'The default `h1` is right for a hero and wrong further down the page. Set `tag` when a display-scale title is not the page title.',
			layout: ExampleLayout.fill,
			markup: `
				<z-display size="sm" tag="h2" color="muted">A quieter section title</z-display>
			`
		})
	],

	attributes: buildTextFamilyAttributes({
		sizes: 'sm | md | lg | xl',
		defaultSize: 'lg',
		defaultWeight: '700',
		defaultTag: 'h1',
		defaultColor: 'neutral',
		sizeDescription: 'Viewport-clamped size step.'
	}),

	properties: [],
	slots: [{ name: '(default)', description: 'The title text.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'It renders an h1 by default, so a second one on the same page creates two top-level headings. Set tag on any that is not the page title.',
		'Fluid sizing must still honour user zoom. The clamp is viewport-relative, so verify the result at 200% zoom rather than only at different window widths.',
		'Very large type at low weight loses contrast against the background — check weight 300 against your theme before shipping it.',
		'Keep the title short enough to stay a single readable line at your narrowest supported width.'
	],

	related: [
		TEXT_FAMILY_RELATED.heading,
		TEXT_FAMILY_RELATED.eyebrow,
		TEXT_FAMILY_RELATED.text,
		{ tag: 'wired-column', route: '/c/layout/wired-column', description: 'Stacks display copy with supporting content.' }
	]
}
