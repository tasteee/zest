import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundColumn = (): HTMLElement => {
	const column = document.createElement('z-column')
	column.setAttribute('gap', 'md')
	column.innerHTML = `
		<z-badge label="One" size="sm"></z-badge>
		<z-badge label="Two" size="sm"></z-badge>
		<z-badge label="Three" size="sm"></z-badge>
	`
	return column
}

export const zColumnDoc: ComponentDocT = {
	tag: 'z-column',
	title: 'z-column',
	tagline: 'A vertical flex container — z-box with the direction locked.',
	status: ComponentStatus.stable,

	description:
		'`z-box` with `is-column` fixed and the direction attributes removed. It is the most-used layout element in the library, because most interfaces are a stack of things with consistent spacing between them — and a `gap` on the column is a far better answer to that than a margin on every child. The axis names do not flip: `aligns-x` is still horizontal even though CSS would call it the cross axis here.',

	playground: {
		buildElement: buildPlaygroundColumn,
		controlNames: ['gap', 'aligns-x', 'aligns-y', 'padding', 'is-full-width'],
		slotLabel: 'Three badges'
	},

	usageGuidance: [
		'Use a column with a `gap` instead of margins on children. Spacing belongs to the container, so it stays right when children are added, removed, or reordered.',
		'`aligns-x` positions children horizontally — `start` is usually what you want, since `stretch` will widen a button to the full column.',
		'Nest columns to build spacing hierarchy: a large gap on the outer one, small gaps within each group.',
		'`aligns-y` only does something when the column is taller than its content, which means it needs a height from somewhere.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The column children.' },
		{ name: 'locked direction', description: 'Always `is-column`; the direction attributes are not exposed.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic column',
			description: 'Children stacked with one gap value doing all the spacing.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="3" style="max-width: 20rem">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-badge label="Two" size="sm"></z-badge>
				  <z-badge label="Three" size="sm"></z-badge>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'horizontal-alignment',
			title: 'Horizontal alignment',
			description:
				'`aligns-x` moves children across the column. Note `stretch` — it widens each child to the full width, which is how a stack of full-width buttons is built.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column aligns-x="start" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="start" size="sm"></z-badge>
				  <z-badge label="start" size="sm"></z-badge>
				</z-column>

				<z-column aligns-x="center" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="center" size="sm"></z-badge>
				  <z-badge label="center" size="sm"></z-badge>
				</z-column>

				<z-column aligns-x="stretch" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-button kind="outline" size="sm">stretch</z-button>
				  <z-button kind="outline" size="sm">stretch</z-button>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'nesting',
			title: 'Nesting for hierarchy',
			description:
				'An outer column with a large gap separating groups, and inner columns with small gaps holding each group together. This is how spacing rhythm is built.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="6" style="max-width: 26rem">
				  <z-column gap="1">
				    <z-subheading size="xs" color="muted">Account</z-subheading>
				    <z-text size="sm">Name, email, and password.</z-text>
				  </z-column>

				  <z-column gap="1">
				    <z-subheading size="xs" color="muted">Notifications</z-subheading>
				    <z-text size="sm">What we send you, and how often.</z-text>
				  </z-column>

				  <z-column gap="1">
				    <z-subheading size="xs" color="muted">Danger zone</z-subheading>
				    <z-text size="sm">Transfer ownership or delete the workspace.</z-text>
				  </z-column>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'vertical-distribution',
			title: 'Vertical distribution',
			description: '`aligns-y` needs the column to be taller than its content — here a fixed height provides the room.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column aligns-y="between" padding="3" is-full-width style="border: 1px solid var(--border); height: 8rem">
				  <z-badge label="top" size="sm"></z-badge>
				  <z-badge label="bottom" size="sm"></z-badge>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'form-stack',
			title: 'A form stack',
			description: 'The canonical column: fields stacked at one gap, with the submit action stretched across the bottom.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="4" style="width: 22rem">
				  <z-field label="Email">
				    <z-input placeholder="you@company.com"></z-input>
				  </z-field>
				  <z-field label="Password">
				    <z-input type="password" placeholder="••••••••"></z-input>
				  </z-field>
				  <z-button accent="dom" is-full-width>Sign in</z-button>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'with-spacer',
			title: 'Pinning content to the bottom',
			description: 'A growing spacer pushes everything after it to the end of the column.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="3" padding="4" is-full-width style="border: 1px solid var(--border); border-radius: var(--radius-md); height: 12rem">
				  <z-heading size="xs" tag="h3">Storage</z-heading>
				  <z-text size="sm" color="muted">8.2 GB of 20 GB used.</z-text>
				  <z-spacer can-grow></z-spacer>
				  <z-button kind="outline" size="sm" is-full-width>Upgrade plan</z-button>
				</z-column>
			`
		})
	],

	attributes: [
		{ name: 'is-inline', type: 'boolean', defaultValue: '—', description: 'inline-flex instead of flex. The one display modifier that composes rather than replaces.' },
		{ name: 'aligns-x', type: 'start | center | end | between | around | evenly | stretch', defaultValue: '—', description: 'Horizontal relationship, whatever the flow direction.' },
		{ name: 'aligns-y', type: 'start | center | end | between | around | evenly | stretch', defaultValue: '—', description: 'Vertical relationship, whatever the flow direction.' },
		{ name: 'does-wrap', type: 'boolean', defaultValue: '—', description: 'flex-wrap: wrap.' },
		{ name: 'does-wrap-text', type: 'boolean', defaultValue: '—', description: 'Allows text inside to wrap.' },
		{ name: 'gap', type: 'string', defaultValue: '—', description: 'Spacing between children. Size token, bare number, or any CSS length.' },
		{ name: 'row-gap', type: 'string', defaultValue: '—', description: 'Row gap only.' },
		{ name: 'column-gap', type: 'string', defaultValue: '—', description: 'Column gap only.' },
		{ name: 'padding', type: 'string', defaultValue: '—', description: 'Inner spacing on every edge.' },
		{ name: 'padding-x', type: 'string', defaultValue: '—', description: 'Inner spacing, left and right.' },
		{ name: 'padding-y', type: 'string', defaultValue: '—', description: 'Inner spacing, top and bottom.' },
		{ name: 'padding-top', type: 'string', defaultValue: '—', description: 'Inner spacing, top edge.' },
		{ name: 'padding-right', type: 'string', defaultValue: '—', description: 'Inner spacing, right edge.' },
		{ name: 'padding-bottom', type: 'string', defaultValue: '—', description: 'Inner spacing, bottom edge.' },
		{ name: 'padding-left', type: 'string', defaultValue: '—', description: 'Inner spacing, left edge.' },
		{ name: 'margin', type: 'string', defaultValue: '—', description: 'Outer spacing on every edge.' },
		{ name: 'margin-x', type: 'string', defaultValue: '—', description: 'Outer spacing, left and right.' },
		{ name: 'margin-y', type: 'string', defaultValue: '—', description: 'Outer spacing, top and bottom.' },
		{ name: 'margin-top', type: 'string', defaultValue: '—', description: 'Outer spacing, top edge.' },
		{ name: 'margin-right', type: 'string', defaultValue: '—', description: 'Outer spacing, right edge.' },
		{ name: 'margin-bottom', type: 'string', defaultValue: '—', description: 'Outer spacing, bottom edge.' },
		{ name: 'margin-left', type: 'string', defaultValue: '—', description: 'Outer spacing, left edge.' },
		{ name: 'inset', type: 'string', defaultValue: '—', description: 'Padding shorthand. The specific padding props win when both are set.' },
		{ name: 'inset-x', type: 'string', defaultValue: '—', description: 'Padding shorthand, left and right.' },
		{ name: 'inset-y', type: 'string', defaultValue: '—', description: 'Padding shorthand, top and bottom.' },
		{ name: 'width', type: 'string', defaultValue: '—', description: 'Width. A bare number is treated as px.' },
		{ name: 'min-width', type: 'string', defaultValue: '—', description: 'Minimum width.' },
		{ name: 'max-width', type: 'string', defaultValue: '—', description: 'Maximum width.' },
		{ name: 'height', type: 'string', defaultValue: '—', description: 'Height. A bare number is treated as px.' },
		{ name: 'min-height', type: 'string', defaultValue: '—', description: 'Minimum height.' },
		{ name: 'max-height', type: 'string', defaultValue: '—', description: 'Maximum height.' },
		{ name: 'is-full-width', type: 'boolean', defaultValue: '—', description: 'width: 100%.' },
		{ name: 'is-full-height', type: 'boolean', defaultValue: '—', description: 'height: 100%.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The column children.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Presentational, with no role. A stack of related items that should be announced as a set needs a list or an explicit role.',
		'DOM order is reading order. A column is the natural place for these to agree — keep it that way rather than reordering visually.',
		'Consistent gap between form fields helps everyone, but especially users with cognitive or motor impairments who rely on predictable rhythm.',
		'aligns-x="stretch" widens every child, including buttons. Check that a stretched control still looks like the control it is.'
	],

	related: [
		{ tag: 'z-row', route: '/c/layout/z-row', description: 'The horizontal counterpart.' },
		{ tag: 'z-box', route: '/c/foundation/z-box', description: 'The primitive underneath, with every mode.' },
		{ tag: 'z-spacer', route: '/c/layout/z-spacer', description: 'Pushing children apart inside a column.' },
		{ tag: 'z-section', route: '/c/layout/z-section', description: 'A page band with vertical rhythm built in.' }
	]
}
