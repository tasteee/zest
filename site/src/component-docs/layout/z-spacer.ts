import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSpacer = (): HTMLElement => {
	const row = document.createElement('wired-row')
	row.setAttribute('full-width', '')
	row.setAttribute('y', 'center')
	row.className = 'demoFrame demoPadded'
	row.innerHTML = `
		<z-badge label="Start" size="sm"></z-badge>
		<z-spacer can-grow></z-spacer>
		<z-badge label="End" size="sm"></z-badge>
	`
	return row
}

export const zSpacerDoc: ComponentDocT = {
	tag: 'z-spacer',
	title: 'z-spacer',
	tagline: 'Empty, non-semantic space — fixed, or growing to fill what is left.',
	status: ComponentStatus.stable,

	description:
		'An empty element whose only job is to take up room. A fixed `size` creates a deliberate gap on both axes. In a parent layout that distributes free space, `can-grow` can absorb what remains and put the break exactly where the spacer sits.',

	playground: {
		buildElement: buildPlaygroundSpacer,
		controlNames: ['size', 'can-grow'],
		slotLabel: '(no slot)'
	},

	usageGuidance: [
		'`can-grow` is the main use — pushing trailing items to the end of a toolbar, header, or sidebar.',
		'Prefer a `gap` on the parent for even spacing between all children. A fixed spacer is for one deliberate exception to that rhythm.',
		'Two growing spacers split the leftover space evenly, which centres whatever sits between them.',
		'Fixed size works anywhere; growing depends on a parent layout that distributes free space.'
	],

	anatomy: [{ name: 'the element', description: 'Empty by design — it has no slot and renders nothing.' }],

	examples: [
		defineMarkupExample({
			id: 'canGrow',
			title: 'Growing',
			description: 'Everything after the spacer is pushed to the end of the row.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row y="center" style="border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--spacing-3); width: 100%">
				  <z-heading size="xs" tag="h3">Project</z-heading>
				  <z-spacer can-grow></z-spacer>
				  <z-button kind="ghost" size="sm">Settings</z-button>
				</wired-row>
			`
		}),

		defineMarkupExample({
			id: 'precise-break',
			title: 'Choosing where the break falls',
			description:
				'`between` spreads every gap equally. A spacer puts the whole gap in one place, which keeps the first two items together.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row x="between" y="center" gap="xs" style="border: 1px solid var(--border); padding: var(--spacing-3); width: 100%">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-badge label="Two" size="sm"></z-badge>
				  <z-badge label="Three" size="sm"></z-badge>
				</wired-row>

				<wired-row y="center" gap="xs" style="border: 1px solid var(--border); padding: var(--spacing-3); width: 100%">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-badge label="Two" size="sm"></z-badge>
				  <z-spacer can-grow></z-spacer>
				  <z-badge label="Three" size="sm"></z-badge>
				</wired-row>
			`
		}),

		defineMarkupExample({
			id: 'centering',
			title: 'Centring with two spacers',
			description: 'A growing spacer on each side splits the leftover space evenly, centring what sits between them.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row y="center" gap="xs" style="border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--spacing-3); width: 100%">
				  <z-badge label="Left" size="sm"></z-badge>
				  <z-spacer can-grow></z-spacer>
				  <z-badge accent="dom" label="Centred" size="sm"></z-badge>
				  <z-spacer can-grow></z-spacer>
				  <z-badge label="Right" size="sm"></z-badge>
				</wired-row>
			`
		}),

		defineMarkupExample({
			id: 'in-a-column',
			title: 'In a column',
			description: 'The same element, pinning content to the bottom instead of the end of a row.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="sm"
				          style="border: 1px solid var(--border); border-radius: var(--radius-md); height: 12rem; padding: var(--spacing-4); width: 100%">
				  <z-heading size="xs" tag="h3">Storage</z-heading>
				  <z-text size="sm" color="muted">8.2 GB of 20 GB used.</z-text>
				  <z-spacer can-grow></z-spacer>
				  <z-button kind="outline" size="sm" is-full-width>Upgrade plan</z-button>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'fixed-size',
			title: 'A fixed size',
			description:
				'`size` applies to both axes, so the same value works whichever direction the parent runs. This is the exception to `gap`, not a replacement for it.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row y="center" style="border: 1px solid var(--border); padding: var(--spacing-3); width: 100%">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-spacer size="xs"></z-spacer>
				  <z-badge label="Close" size="sm"></z-badge>
				  <z-spacer size="2xl"></z-spacer>
				  <z-badge label="Far" size="sm"></z-badge>
				</wired-row>
			`
		})
	],

	attributes: [
		{
			name: 'size',
			type: 'string',
			defaultValue: '—',
			description: 'Fixed size on both axes. Size token, bare number, or length.'
		},
		{ name: 'can-grow', type: 'boolean', defaultValue: '—', description: 'Absorbs remaining space in a compatible parent layout.' }
	],

	properties: [],
	slots: [],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'It renders nothing and is not announced, so it adds no noise to the accessibility tree.',
		'Because it is a real element in the DOM, it sits between its neighbours in source order — which is harmless here, since it has no content to read.',
		'It does not separate content semantically. Use z-separator or z-line when the gap marks a real boundary.',
		'Spacing alone should not carry grouping. Related controls that look grouped because of a spacer still need real grouping semantics.'
	],

	related: [
		{ tag: 'wired-row', route: '/c/layout/wired-row', description: 'The container this usually sits in.' },
		{ tag: 'wired-column', route: '/c/layout/wired-column', description: 'The vertical counterpart.' },
		{ tag: 'z-separator', route: '/c/foundation/z-separator', description: 'When the gap should be a visible boundary.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'Which has its own trailing overflow slot.' }
	]
}
