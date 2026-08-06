import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundGrid = (): HTMLElement => {
	const grid = document.createElement('z-grid')
	grid.setAttribute('columns', '3')
	grid.setAttribute('gap', 'md')
	grid.className = 'demoFullWidth'
	grid.innerHTML = `
		<z-card><z-text size="sm">One</z-text></z-card>
		<z-card><z-text size="sm">Two</z-text></z-card>
		<z-card><z-text size="sm">Three</z-text></z-card>
	`
	return grid
}

export const zGridDoc: ComponentDocT = {
	tag: 'z-grid',
	title: 'z-grid',
	tagline: 'A CSS grid with either a fixed column count or responsive auto-fit tracks.',
	status: ComponentStatus.stable,

	description:
		'Two ways to describe a grid, and the choice between them is the whole API. `columns` gives a fixed count that stays fixed at every width. `min-column-width` instead says how narrow a column may get and lets the browser fit as many as it can, which reflows without a single media query. When both are set `min-column-width` wins, because a responsive instruction and a fixed one cannot both be honoured and the responsive one is almost always the newer intent.',

	playground: {
		buildElement: buildPlaygroundGrid,
		controlNames: ['columns', 'min-column-width', 'gap', 'aligns-x', 'aligns-y', 'is-full-width'],
		slotLabel: 'Three cards'
	},

	usageGuidance: [
		'Use `min-column-width` for anything of unknown length — card lists, galleries, search results. It handles every width without breakpoints.',
		'Use `columns` when the count is part of the design and must not change, such as a three-up feature row that is only ever three.',
		'Cells stretch to equal height by default. That is usually right for cards; set `aligns-y="start"` when it is not.',
		'The tracks use `minmax(0, 1fr)`, so a long unbreakable string inside a cell cannot blow out the column the way a bare `1fr` would.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The grid items.' },
		{ name: 'columns', description: 'A fixed count, expanded to `repeat(n, minmax(0, 1fr))`.' },
		{ name: 'min-column-width', description: 'A responsive auto-fit track floor. Overrides `columns` when both are set.' }
	],

	examples: [
		defineMarkupExample({
			id: 'fixed-columns',
			title: 'Fixed columns',
			description: 'Three equal tracks that stay three at every width.',
			layout: ExampleLayout.fill,
			markup: `
				<z-grid columns="3" gap="3">
				  <z-card><z-text size="sm">One</z-text></z-card>
				  <z-card><z-text size="sm">Two</z-text></z-card>
				  <z-card><z-text size="sm">Three</z-text></z-card>
				  <z-card><z-text size="sm">Four</z-text></z-card>
				  <z-card><z-text size="sm">Five</z-text></z-card>
				  <z-card><z-text size="sm">Six</z-text></z-card>
				</z-grid>
			`
		}),

		defineMarkupExample({
			id: 'responsive',
			title: 'Responsive auto-fit',
			description:
				'As many 14rem columns as fit, recalculated continuously. Resize the page and watch the count change with no breakpoints involved.',
			layout: ExampleLayout.fill,
			markup: `
				<z-grid min-column-width="14rem" gap="3">
				  <z-card><z-text size="sm">Analytics</z-text></z-card>
				  <z-card><z-text size="sm">Billing</z-text></z-card>
				  <z-card><z-text size="sm">Deployments</z-text></z-card>
				  <z-card><z-text size="sm">Logs</z-text></z-card>
				  <z-card><z-text size="sm">Members</z-text></z-card>
				</z-grid>
			`
		}),

		defineMarkupExample({
			id: 'gap-axes',
			title: 'Independent gaps',
			description: '`gap-x` and `gap-y` override the shared `gap` per axis — useful when rows need more air than columns.',
			layout: ExampleLayout.fill,
			markup: `
				<z-grid columns="3" gap-x="2" gap-y="6">
				  <z-card><z-text size="sm">One</z-text></z-card>
				  <z-card><z-text size="sm">Two</z-text></z-card>
				  <z-card><z-text size="sm">Three</z-text></z-card>
				  <z-card><z-text size="sm">Four</z-text></z-card>
				  <z-card><z-text size="sm">Five</z-text></z-card>
				  <z-card><z-text size="sm">Six</z-text></z-card>
				</z-grid>
			`
		}),

		defineMarkupExample({
			id: 'cell-alignment',
			title: 'Alignment within cells',
			description:
				'`stretch` is the default and equalises heights. `start` lets each cell size to its own content instead — note the ragged bottom edge.',
			layout: ExampleLayout.fill,
			markup: `
				<z-grid columns="3" gap="3" aligns-y="stretch">
				  <z-card><z-text size="sm">Short</z-text></z-card>
				  <z-card><z-text size="sm">A cell with rather more content in it than its neighbours have.</z-text></z-card>
				  <z-card><z-text size="sm">Short</z-text></z-card>
				</z-grid>

				<z-grid columns="3" gap="3" aligns-y="start">
				  <z-card><z-text size="sm">Short</z-text></z-card>
				  <z-card><z-text size="sm">A cell with rather more content in it than its neighbours have.</z-text></z-card>
				  <z-card><z-text size="sm">Short</z-text></z-card>
				</z-grid>
			`
		}),

		defineMarkupExample({
			id: 'stat-grid',
			title: 'A metrics grid',
			description: 'The most common use — a responsive row of figures that rewraps rather than shrinking past legibility.',
			layout: ExampleLayout.fill,
			markup: `
				<z-grid min-column-width="11rem" gap="3">
				  <z-card gap="1">
				    <z-label size="xs" color="muted">Requests</z-label>
				    <z-heading size="sm" tag="h3">1.2M</z-heading>
				  </z-card>
				  <z-card gap="1">
				    <z-label size="xs" color="muted">Errors</z-label>
				    <z-heading size="sm" tag="h3">0.02%</z-heading>
				  </z-card>
				  <z-card gap="1">
				    <z-label size="xs" color="muted">p95 latency</z-label>
				    <z-heading size="sm" tag="h3">84ms</z-heading>
				  </z-card>
				  <z-card gap="1">
				    <z-label size="xs" color="muted">Uptime</z-label>
				    <z-heading size="sm" tag="h3">99.98%</z-heading>
				  </z-card>
				</z-grid>
			`
		}),

		defineMarkupExample({
			id: 'inset',
			title: 'With inner padding',
			description: '`inset` pads inside the grid, so the tracks sit away from whatever border surrounds them.',
			layout: ExampleLayout.fill,
			markup: `
				<z-grid columns="2" gap="3" inset="lg" style="border: 1px solid var(--border); border-radius: var(--radius-lg)">
				  <z-card><z-text size="sm">One</z-text></z-card>
				  <z-card><z-text size="sm">Two</z-text></z-card>
				</z-grid>
			`
		})
	],

	attributes: [
		{
			name: 'columns',
			type: 'number',
			defaultValue: '—',
			description: 'Fixed column count, expanded to repeat(n, minmax(0, 1fr)).'
		},
		{
			name: 'min-column-width',
			type: 'string',
			defaultValue: '—',
			description: 'Responsive auto-fit track floor. Wins over columns when both are set.'
		},
		{ name: 'gap', type: 'string', defaultValue: '—', description: 'Row and column gap together.' },
		{ name: 'gap-x', type: 'string', defaultValue: '—', description: 'Column gap only.' },
		{ name: 'gap-y', type: 'string', defaultValue: '—', description: 'Row gap only.' },
		{
			name: 'aligns-x',
			type: 'start | center | end | stretch',
			defaultValue: 'stretch',
			description: 'Item alignment within its cell, horizontally.'
		},
		{
			name: 'aligns-y',
			type: 'start | center | end | stretch',
			defaultValue: 'stretch',
			description: 'Item alignment within its cell, vertically.'
		},
		{ name: 'is-full-width', type: 'boolean', defaultValue: '—', description: 'width: 100%.' },
		{ name: 'inset', type: 'string', defaultValue: '—', description: 'Inner padding on every edge.' },
		{ name: 'inset-x', type: 'string', defaultValue: '—', description: 'Inner padding on the left and right.' },
		{ name: 'inset-y', type: 'string', defaultValue: '—', description: 'Inner padding on the top and bottom.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The grid items.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'This is a layout grid, not a data table. Tabular data needs z-table so rows and headers are announced with their relationships intact.',
		'Grid placement can visually reorder items away from DOM order, which desynchronises the tab order from what is on screen. Keep them aligned.',
		'A responsive grid that reflows to one column on a phone should still read top to bottom in a sensible order.',
		'Grid items are not a list to assistive technology. If the collection is semantically a list, mark it up as one.'
	],

	related: [
		{ tag: 'z-box', route: '/c/foundation/z-box', description: 'Grid mode plus every other display mode.' },
		{ tag: 'z-bento-grid', route: '/c/layout/z-bento-grid', description: 'A grid whose cells span multiple tracks.' },
		{ tag: 'z-column', route: '/c/layout/z-column', description: 'When one column is all you need.' },
		{ tag: 'z-table', route: '/c/data-display/z-table', description: 'For data rather than layout.' }
	]
}
