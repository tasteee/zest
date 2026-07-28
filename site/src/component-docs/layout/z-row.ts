import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundRow = (): HTMLElement => {
	const row = document.createElement('z-row')
	row.setAttribute('gap', 'md')
	row.setAttribute('aligns-y', 'center')
	row.innerHTML = `
		<z-badge label="One" size="small"></z-badge>
		<z-badge label="Two" size="small"></z-badge>
		<z-badge label="Three" size="small"></z-badge>
	`
	return row
}

export const zRowDoc: ComponentDocT = {
	tag: 'z-row',
	title: 'z-row',
	tagline: 'A horizontal flex container — z-box with the direction locked.',
	status: ComponentStatus.stable,

	description:
		'`z-box` with `is-row` fixed and the direction attributes removed, so there is no way to contradict the tag name. Every other box attribute works identically: `gap`, `aligns-x`/`aligns-y`, `wrap`, padding, margin, sizing, even the grid props. Prefer it over `z-box is-row` — the tag alone tells the next reader what the layout does, which is worth more than the generality you give up.',

	playground: {
		buildElement: buildPlaygroundRow,
		controlNames: ['gap', 'aligns-x', 'aligns-y', 'wrap', 'padding', 'full-width'],
		slotLabel: 'Three badges'
	},

	usageGuidance: [
		'This is the default choice for anything laid out horizontally. Reach for `z-box` only when the direction is conditional.',
		'`aligns-x` distributes along the row and `aligns-y` aligns across it — the names mean what they say, with no main-axis translation to do in your head.',
		'`wrap` is essential for content of unknown length. A row of tags without it will overflow rather than break.',
		'Use `z-spacer grow` to push trailing items to the end when `aligns-x="between"` would separate the wrong pair.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The row children.' },
		{ name: 'locked direction', description: 'Always `is-row`; the direction attributes are not exposed.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic row',
			description: 'Children in a line with a token gap between them.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row gap="3">
				  <z-badge label="One" size="small"></z-badge>
				  <z-badge label="Two" size="small"></z-badge>
				  <z-badge label="Three" size="small"></z-badge>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'distribution',
			title: 'Distribution',
			description: '`aligns-x` spreads the children along the row.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row aligns-x="start" gap="2" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="start" size="small"></z-badge>
				  <z-badge label="start" size="small"></z-badge>
				</z-row>

				<z-row aligns-x="center" gap="2" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="center" size="small"></z-badge>
				  <z-badge label="center" size="small"></z-badge>
				</z-row>

				<z-row aligns-x="between" gap="2" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="between" size="small"></z-badge>
				  <z-badge label="between" size="small"></z-badge>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'cross-alignment',
			title: 'Vertical alignment',
			description: '`aligns-y` positions children of different heights against each other.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row aligns-y="start" gap="3" padding="3" full-width style="border: 1px solid var(--border); height: 5rem">
				  <z-badge label="start" size="small"></z-badge>
				  <z-card><z-text size="xs">Taller</z-text></z-card>
				</z-row>

				<z-row aligns-y="center" gap="3" padding="3" full-width style="border: 1px solid var(--border); height: 5rem">
				  <z-badge label="center" size="small"></z-badge>
				  <z-card><z-text size="xs">Taller</z-text></z-card>
				</z-row>

				<z-row aligns-y="end" gap="3" padding="3" full-width style="border: 1px solid var(--border); height: 5rem">
				  <z-badge label="end" size="small"></z-badge>
				  <z-card><z-text size="xs">Taller</z-text></z-card>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'wrapping',
			title: 'Wrapping',
			description: 'Without `wrap` this row would overflow its container instead of breaking onto a second line.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row wrap gap="2" style="max-width: 20rem">
				  <z-badge label="typescript" size="small"></z-badge>
				  <z-badge label="web-components" size="small"></z-badge>
				  <z-badge label="design-system" size="small"></z-badge>
				  <z-badge label="shadow-dom" size="small"></z-badge>
				  <z-badge label="tokens" size="small"></z-badge>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'with-spacer',
			title: 'Pushing with a spacer',
			description:
				'`between` splits the first and last child. When you need a different split, a growing spacer puts the break exactly where you want it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row gap="3" aligns-y="center" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-heading size="xs" tag="h3">Project</z-heading>
				  <z-badge tone="success" kind="soft" size="small" label="Live"></z-badge>
				  <z-spacer grow></z-spacer>
				  <z-button kind="ghost" size="small">Settings</z-button>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'toolbar-row',
			title: 'A page header',
			description: 'Title on one side, actions on the other, everything on the centre line.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row aligns-x="between" aligns-y="center" padding="4" full-width
				       style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-column gap="1">
				    <z-heading size="xs" tag="h3">Billing</z-heading>
				    <z-text size="xs" color="muted">Invoices and payment methods</z-text>
				  </z-column>
				  <z-row gap="2">
				    <z-button kind="ghost" size="small">Download</z-button>
				    <z-button tone="primary" size="small">Add method</z-button>
				  </z-row>
				</z-row>
			`
		})
	],

	attributes: [
		{ name: 'gap', type: 'string', defaultValue: '—', description: 'Spacing between children. Size token, bare number, or length.' },
		{
			name: 'aligns-x',
			type: 'start | center | end | between | around | evenly | stretch',
			defaultValue: '—',
			description: 'Distribution along the row.'
		},
		{
			name: 'aligns-y',
			type: 'start | center | end | stretch',
			defaultValue: '—',
			description: 'Alignment across the row.'
		},
		{ name: 'wrap', type: 'boolean', defaultValue: '—', description: 'Allows children to break onto more lines.' },
		{ name: 'padding', type: 'string', defaultValue: '—', description: 'Inner spacing on every edge.' },
		{ name: 'padding-x', type: 'string', defaultValue: '—', description: 'Inner spacing on the left and right.' },
		{ name: 'padding-y', type: 'string', defaultValue: '—', description: 'Inner spacing on the top and bottom.' },
		{ name: 'margin', type: 'string', defaultValue: '—', description: 'Outer spacing on every edge.' },
		{ name: 'inset', type: 'string', defaultValue: '—', description: 'Padding shorthand, overridden by the specific padding props.' },
		{ name: 'full-width', type: 'boolean', defaultValue: '—', description: 'width: 100%.' },
		{ name: 'full-height', type: 'boolean', defaultValue: '—', description: 'height: 100%.' },
		{ name: 'width', type: 'string', defaultValue: '—', description: 'Width. A bare number is treated as px.' },
		{ name: 'max-width', type: 'string', defaultValue: '—', description: 'Maximum width.' },
		{ name: 'height', type: 'string', defaultValue: '—', description: 'Height. A bare number is treated as px.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The row children.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Presentational, with no role. A row of related controls that should be announced as a set needs z-toolbar or an explicit role.',
		'Keep DOM order matching visual order — a row is the easiest place to accidentally desynchronise the tab order from what is on screen.',
		'A wrapping row can put a focused element on a line the user did not expect. Make sure the focus ring stays visible after a wrap.',
		'Gap is not a substitute for spacing between touch targets. Interactive children still need adequate hit areas of their own.'
	],

	related: [
		{ tag: 'z-column', route: '/c/layout/z-column', description: 'The vertical counterpart.' },
		{ tag: 'z-box', route: '/c/foundation/z-box', description: 'The primitive underneath, with every mode.' },
		{ tag: 'z-spacer', route: '/c/layout/z-spacer', description: 'Pushing children apart inside a row.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'A row of controls with real toolbar semantics.' }
	]
}
