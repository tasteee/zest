import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundBentoGrid = (): HTMLElement => {
	const grid = document.createElement('z-bento-grid')
	grid.setAttribute('columns', '3')
	grid.setAttribute('row-height', '8rem')
	grid.className = 'demoFullWidth'
	grid.innerHTML = `
		<z-bento-item col-span="2"><z-heading size="xs" tag="h3">Wide</z-heading></z-bento-item>
		<z-bento-item><z-heading size="xs" tag="h3">Square</z-heading></z-bento-item>
		<z-bento-item><z-heading size="xs" tag="h3">Square</z-heading></z-bento-item>
		<z-bento-item col-span="2"><z-heading size="xs" tag="h3">Wide</z-heading></z-bento-item>
	`
	return grid
}

export const zBentoGridDoc: ComponentDocT = {
	tag: 'z-bento-grid',
	title: 'z-bento-grid',
	tagline: 'A fixed-row-height grid whose cells choose their own footprint.',
	status: ComponentStatus.stable,

	description:
		'The grid behind a feature showcase — the layout where cells are deliberately different sizes and the composition is part of the message. It does very little on its own: it sets the column count and the height of one row unit, and each `z-bento-item` declares how many of those units it wants through `col-span` and `row-span`. Fixing the row height is what keeps a ragged set of spans reading as a deliberate composition instead of a collapsed mess.',

	playground: {
		buildElement: buildPlaygroundBentoGrid,
		controlNames: ['columns', 'row-height', 'gap'],
		slotLabel: 'Four bento items'
	},

	usageGuidance: [
		'Design the composition first. Bento layouts work when the spans are chosen deliberately; a random assortment just looks broken.',
		'Keep the total span per row equal to the column count, or the grid will leave gaps where cells could not fit.',
		'`row-height` is a fixed unit, so content that overflows will spill. Size the row for the tallest cell you actually have.',
		'For a uniform list of cards, `z-grid` is the simpler tool. Bento is for when the cells are meant to differ.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The `z-bento-item` children.' },
		{ name: 'columns', description: 'How many tracks the grid has.' },
		{ name: 'row-height', description: 'The height of one row unit, which `row-span` multiplies.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'A basic composition',
			description: 'Three columns, with the first cell taking two of them.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="3" row-height="9rem" gap="md">
				  <z-bento-item col-span="2">
				    <z-heading size="xs" tag="h3">Deploy previews</z-heading>
				    <z-text size="sm" color="muted">Every branch gets a URL.</z-text>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Logs</z-heading>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Metrics</z-heading>
				  </z-bento-item>
				  <z-bento-item col-span="2">
				    <z-heading size="xs" tag="h3">Rollbacks</z-heading>
				    <z-text size="sm" color="muted">One click, any previous build.</z-text>
				  </z-bento-item>
				</z-bento-grid>
			`
		}),

		defineMarkupExample({
			id: 'row-spans',
			title: 'Spanning rows',
			description: 'A cell with `row-span="2"` takes two row units, which is where the fixed row height earns its keep.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="3" row-height="7rem" gap="md">
				  <z-bento-item row-span="2">
				    <z-heading size="xs" tag="h3">Tall</z-heading>
				    <z-text size="sm" color="muted">Two row units.</z-text>
				  </z-bento-item>
				  <z-bento-item col-span="2">
				    <z-heading size="xs" tag="h3">Wide</z-heading>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">One</z-heading>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Two</z-heading>
				  </z-bento-item>
				</z-bento-grid>
			`
		}),

		defineMarkupExample({
			id: 'column-counts',
			title: 'Column counts',
			description: 'Two columns give a calmer, more editorial rhythm than four.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="2" row-height="8rem" gap="md">
				  <z-bento-item col-span="2">
				    <z-heading size="xs" tag="h3">Full width</z-heading>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Half</z-heading>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Half</z-heading>
				  </z-bento-item>
				</z-bento-grid>
			`
		}),

		defineMarkupExample({
			id: 'row-heights',
			title: 'Row height',
			description: 'The unit every span is measured in. A shorter unit gives a denser board.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="3" row-height="5rem" gap="sm">
				  <z-bento-item><z-text size="sm">5rem rows</z-text></z-bento-item>
				  <z-bento-item><z-text size="sm">Dense</z-text></z-bento-item>
				  <z-bento-item><z-text size="sm">Compact</z-text></z-bento-item>
				</z-bento-grid>

				<z-bento-grid columns="3" row-height="10rem" gap="sm">
				  <z-bento-item><z-text size="sm">10rem rows</z-text></z-bento-item>
				  <z-bento-item><z-text size="sm">Roomier</z-text></z-bento-item>
				  <z-bento-item><z-text size="sm">Generous</z-text></z-bento-item>
				</z-bento-grid>
			`
		}),

		defineMarkupExample({
			id: 'feature-showcase',
			title: 'A feature showcase',
			description: 'The layout it exists for: a hero cell anchoring the composition with supporting cells around it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="3" row-height="8rem" gap="md">
				  <z-bento-item col-span="2" row-span="2" href="#">
				    <z-heading size="sm" tag="h3">Encapsulated by default</z-heading>
				    <z-text size="sm" color="muted">
				      Styles live inside each component's shadow root, so nothing leaks
				      in either direction.
				    </z-text>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Zero deps</z-heading>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Any framework</z-heading>
				  </z-bento-item>
				  <z-bento-item col-span="3">
				    <z-heading size="xs" tag="h3">One import registers every element</z-heading>
				  </z-bento-item>
				</z-bento-grid>
			`
		})
	],

	attributes: [
		{ name: 'columns', type: 'number', defaultValue: '3', description: 'Number of column tracks.' },
		{
			name: 'row-height',
			type: 'string',
			defaultValue: '14rem',
			description: 'Height of one row unit, which row-span multiplies.'
		},
		{ name: 'gap', type: 'string', defaultValue: 'var(--spacing-4)', description: 'Grid gap. Size token or length.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the grid from layout.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The z-bento-item children.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'A layout grid with no role. The visual prominence of a large cell says nothing to a screen reader — importance has to come from the content and its heading level.',
		'Reading order follows the DOM, not the composition. A cell that looks like it comes first must also be first in the source.',
		'Fixed row heights do not grow with the user font size, so content can overflow at large text settings. Check it at 200% zoom.',
		'On a narrow screen the spans collapse and the careful composition disappears — make sure the content still reads sensibly in one column.'
	],

	related: [
		{ tag: 'z-bento-item', route: '/c/layout/z-bento-item', description: 'The cells this grid arranges.' },
		{ tag: 'z-grid', route: '/c/layout/z-grid', description: 'For uniform cells.' },
		{ tag: 'z-card', route: '/c/foundation/z-card', description: 'The simpler content block.' }
	]
}
