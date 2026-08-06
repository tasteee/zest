import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSpacer = (): HTMLElement => {
	const row = document.createElement('z-row')
	row.setAttribute('full-width', '')
	row.setAttribute('aligns-y', 'center')
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
	tagline: 'Empty space in a flex layout — fixed, or growing to fill what is left.',
	status: ComponentStatus.stable,

	description:
		'An empty element whose only job is to take up room. `can-grow` is the interesting mode: it soaks up whatever space is left, which pushes everything after it to the end of the container. That is more precise than `aligns-x="between"` once a row has more than two children, because it puts the break exactly where you place it rather than spreading every gap equally. A fixed `size` applies to both axes, so the same element works in a row or a column without knowing which it is in.',

	playground: {
		buildElement: buildPlaygroundSpacer,
		controlNames: ['size', 'can-grow'],
		slotLabel: '(no slot)'
	},

	usageGuidance: [
		'`can-grow` is the main use — pushing trailing items to the end of a toolbar, header, or sidebar.',
		'Prefer a `gap` on the parent for even spacing between all children. A fixed spacer is for one deliberate exception to that rhythm.',
		'Two growing spacers split the leftover space evenly, which centres whatever sits between them.',
		'It only works in a flex container. Inside a grid or a block, it does nothing.'
	],

	anatomy: [{ name: 'the element', description: 'Empty by design — it has no slot and renders nothing.' }],

	examples: [
		defineMarkupExample({
			id: 'canGrow',
			title: 'Growing',
			description: 'Everything after the spacer is pushed to the end of the row.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row aligns-y="center" padding="3" is-full-width style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-heading size="xs" tag="h3">Project</z-heading>
				  <z-spacer can-grow></z-spacer>
				  <z-button kind="ghost" size="sm">Settings</z-button>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'precise-break',
			title: 'Choosing where the break falls',
			description:
				'`between` spreads every gap equally. A spacer puts the whole gap in one place, which keeps the first two items together.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row aligns-x="between" aligns-y="center" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-badge label="Two" size="sm"></z-badge>
				  <z-badge label="Three" size="sm"></z-badge>
				</z-row>

				<z-row aligns-y="center" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-badge label="Two" size="sm"></z-badge>
				  <z-spacer can-grow></z-spacer>
				  <z-badge label="Three" size="sm"></z-badge>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'centering',
			title: 'Centring with two spacers',
			description: 'A growing spacer on each side splits the leftover space evenly, centring what sits between them.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row aligns-y="center" gap="2" padding="3" is-full-width style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-badge label="Left" size="sm"></z-badge>
				  <z-spacer can-grow></z-spacer>
				  <z-badge accent="dom" label="Centred" size="sm"></z-badge>
				  <z-spacer can-grow></z-spacer>
				  <z-badge label="Right" size="sm"></z-badge>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'in-a-column',
			title: 'In a column',
			description: 'The same element, pinning content to the bottom instead of the end of a row.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="3" padding="4" is-full-width
				          style="border: 1px solid var(--border); border-radius: var(--radius-md); height: 12rem">
				  <z-heading size="xs" tag="h3">Storage</z-heading>
				  <z-text size="sm" color="muted">8.2 GB of 20 GB used.</z-text>
				  <z-spacer can-grow></z-spacer>
				  <z-button kind="outline" size="sm" is-full-width>Upgrade plan</z-button>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'fixed-size',
			title: 'A fixed size',
			description:
				'`size` applies to both axes, so the same value works whichever direction the parent runs. This is the exception to `gap`, not a replacement for it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row aligns-y="center" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-spacer size="xs"></z-spacer>
				  <z-badge label="Close" size="sm"></z-badge>
				  <z-spacer size="2xl"></z-spacer>
				  <z-badge label="Far" size="sm"></z-badge>
				</z-row>
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
		{ name: 'can-grow', type: 'boolean', defaultValue: '—', description: 'flex-grow, soaking up the remaining space.' }
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
		{ tag: 'z-row', route: '/c/layout/z-row', description: 'The container this usually sits in.' },
		{ tag: 'z-column', route: '/c/layout/z-column', description: 'The vertical counterpart.' },
		{ tag: 'z-separator', route: '/c/foundation/z-separator', description: 'When the gap should be a visible boundary.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'Which has its own trailing overflow slot.' }
	]
}
