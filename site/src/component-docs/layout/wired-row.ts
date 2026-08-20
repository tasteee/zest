import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundRow = (): HTMLElement => {
	const row = document.createElement('wired-row')
	row.setAttribute('gap', 'md')
	row.setAttribute('y', 'center')
	row.innerHTML = `
		<z-badge label="One" size="sm"></z-badge>
		<z-badge label="Two" size="sm"></z-badge>
		<z-badge label="Three" size="sm"></z-badge>
	`
	return row
}

export const wiredRowDoc: ComponentDocT = {
	tag: 'wired-row',
	title: 'wired-row',
	tagline: 'A focused horizontal layout primitive from @tasteee/wired.',
	status: ComponentStatus.stable,
	description:
		'`wired-row` arranges children horizontally with a semantic spacing scale and direct axis names. Zest re-exports it from `@tasteee/wired`, so the root Zest import registers it without maintaining a competing row implementation.',
	playground: {
		buildElement: buildPlaygroundRow,
		controlNames: ['gap', 'x', 'y', 'wrap', 'constrain'],
		slotLabel: 'Three badges'
	},
	usageGuidance: [
		'Use `x` for horizontal distribution and `y` for vertical alignment.',
		'Enable `wrap` when the number or width of children is not fixed.',
		'Use `constrain` when the row should fill the available width up to a centered maximum.'
	],
	anatomy: [{ name: 'default slot', description: 'The row children.' }],
	examples: [
		defineMarkupExample({
			id: 'distribution',
			title: 'Distributed actions',
			description: 'Space the first and last groups apart and keep them vertically aligned.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row gap="md" x="between" y="center" style="width: 100%">
				  <z-heading size="xs" tag="h3">Billing</z-heading>
				  <wired-row gap="xs" y="center">
				    <z-button kind="ghost" size="sm">Download</z-button>
				    <z-button accent="dom" size="sm">Add method</z-button>
				  </wired-row>
				</wired-row>
			`
		}),
		defineMarkupExample({
			id: 'wrapping',
			title: 'Wrapping content',
			description: 'Allow unknown content to move onto another line instead of overflowing.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row wrap gap="xs" style="max-width: 20rem">
				  <z-badge label="typescript" size="sm"></z-badge>
				  <z-badge label="web-components" size="sm"></z-badge>
				  <z-badge label="design-system" size="sm"></z-badge>
				  <z-badge label="tokens" size="sm"></z-badge>
				</wired-row>
			`
		})
	],
	attributes: [
		{ name: 'gap', type: 'none | 2xs | xs | sm | md | lg | xl | 2xl', defaultValue: 'none', description: 'Spacing between children.' },
		{ name: 'x', type: 'start | center | end | between | around | evenly', defaultValue: 'start', description: 'Horizontal distribution.' },
		{ name: 'y', type: 'start | center | end | stretch | baseline', defaultValue: 'stretch', description: 'Vertical alignment.' },
		{ name: 'wrap', type: 'boolean', defaultValue: 'false', description: 'Allows children to wrap onto additional lines.' },
		{ name: 'constrain', type: 'xs | sm | md | lg | xl | 2xl', defaultValue: '—', description: 'Centers the row and applies a maximum inline size.' }
	],
	properties: [],
	slots: [{ name: '(default)', description: 'The row children.' }],
	events: [],
	cssVariables: [],
	accessibilityNotes: [
		'Presentational by default; add a semantic role only when the grouped content requires one.',
		'Keep DOM order aligned with visual order, especially when wrapping interactive controls.'
	],
	related: [
		{ tag: 'wired-column', route: '/c/layout/wired-column', description: 'The vertical counterpart.' },
		{ tag: 'wired-grid', route: '/c/layout/wired-grid', description: 'Two-dimensional layouts.' },
		{ tag: 'z-box', route: '/c/foundation/z-box', description: 'Zest’s general-purpose flex primitive.' }
	]
}
