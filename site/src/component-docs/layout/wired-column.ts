import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundColumn = (): HTMLElement => {
	const column = document.createElement('wired-column')
	column.setAttribute('gap', 'md')
	column.innerHTML = `
		<z-badge label="One" size="sm"></z-badge>
		<z-badge label="Two" size="sm"></z-badge>
		<z-badge label="Three" size="sm"></z-badge>
	`
	return column
}

export const wiredColumnDoc: ComponentDocT = {
	tag: 'wired-column',
	title: 'wired-column',
	tagline: 'A focused vertical layout primitive from @tasteee/wired.',
	status: ComponentStatus.stable,
	description:
		'`wired-column` stacks children vertically and keeps spacing on the container. Zest re-exports the implementation from `@tasteee/wired`, giving applications one consistent column API.',
	playground: {
		buildElement: buildPlaygroundColumn,
		controlNames: ['gap', 'x', 'y', 'constrain'],
		slotLabel: 'Three badges'
	},
	usageGuidance: [
		'Use `gap` instead of margins on children so spacing survives reordering.',
		'Use `x` for horizontal alignment and `y` for vertical distribution.',
		'Nest columns with different gap values to establish spacing hierarchy.'
	],
	anatomy: [{ name: 'default slot', description: 'The vertically stacked children.' }],
	examples: [
		defineMarkupExample({
			id: 'stack',
			title: 'A content stack',
			description: 'Group related content with a single semantic gap.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="sm" style="max-width: 24rem">
				  <z-heading size="sm" tag="h3">Account</z-heading>
				  <z-text color="muted">Profile, security, and notification settings.</z-text>
				  <z-button accent="neutral" size="sm">Open settings</z-button>
				</wired-column>
			`
		}),
		defineMarkupExample({
			id: 'distribution',
			title: 'Vertical distribution',
			description: 'A taller column can distribute its children along the vertical axis.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="sm" y="between" style="height: 10rem; width: 100%">
				  <z-badge label="Top" size="sm"></z-badge>
				  <z-badge label="Bottom" size="sm"></z-badge>
				</wired-column>
			`
		})
	],
	attributes: [
		{ name: 'gap', type: 'none | 2xs | xs | sm | md | lg | xl | 2xl', defaultValue: 'none', description: 'Spacing between children.' },
		{ name: 'x', type: 'start | center | end | stretch', defaultValue: 'stretch', description: 'Horizontal alignment.' },
		{ name: 'y', type: 'start | center | end | between | around | evenly', defaultValue: 'start', description: 'Vertical distribution.' },
		{ name: 'constrain', type: 'xs | sm | md | lg | xl | 2xl', defaultValue: '—', description: 'Centers the column and applies a maximum inline size.' }
	],
	properties: [],
	slots: [{ name: '(default)', description: 'The column children.' }],
	events: [],
	cssVariables: [],
	accessibilityNotes: ['Presentational by default; use semantic children and preserve their DOM order.'],
	related: [
		{ tag: 'wired-row', route: '/c/layout/wired-row', description: 'The horizontal counterpart.' },
		{ tag: 'wired-grid', route: '/c/layout/wired-grid', description: 'Two-dimensional layouts.' }
	]
}
