import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundLine = (): HTMLElement => {
	const wrapper = document.createElement('div')
	wrapper.className = 'demoConstrained demoFullWidth'
	wrapper.append(document.createElement('z-line'))
	return wrapper
}

export const zLineDoc: ComponentDocT = {
	tag: 'z-line',
	title: 'z-line',
	tagline: 'A bare 1px hairline — the smallest divider in the system.',
	status: ComponentStatus.stable,

	description:
		'One rule, nothing else. It has no label, no spacing, and no options beyond its orientation, which is what makes it the right choice inside dense layouts where a divider should be invisible until you look for it. It still exposes `role="separator"` with the matching `aria-orientation`, so it divides content structurally rather than only visually. When the divider needs a centred label, `z-separator` is the same idea with room for one.',

	playground: {
		buildElement: buildPlaygroundLine,
		controlNames: [],
		slotLabel: '(no slot)'
	},

	usageGuidance: [
		'Use it when a boundary needs to exist but should not attract attention — between list rows, inside a card, between toolbar clusters.',
		'It carries no margin. The surrounding layout owns the spacing, usually through a `gap` on the parent.',
		'A vertical line needs a parent with a resolvable height. In a flex row with stretched items it fills naturally; in a block container it will collapse.',
		'Reach for `z-separator` the moment the divider needs a label, and for a `border` on the element itself when you are only outlining a box.'
	],

	anatomy: [{ name: 'rule', description: 'The 1px line. There is no slot — the element is only ever the rule.' }],

	examples: [
		defineMarkupExample({
			id: 'horizontal',
			title: 'Horizontal',
			description: 'The default. It fills the width of whatever contains it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="4" style="width: 22rem">
				  <z-text size="sm">Above the line</z-text>
				  <z-line></z-line>
				  <z-text size="sm">Below the line</z-text>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'vertical',
			title: 'Vertical',
			description: '`is-vertical` fills the height instead — the divider between clusters in a row.',
			layout: ExampleLayout.center,
			markup: `
				<z-row gap="3" aligns-y="center">
				  <z-text size="sm">Drafts</z-text>
				  <z-line is-vertical></z-line>
				  <z-text size="sm">Sent</z-text>
				  <z-line is-vertical></z-line>
				  <z-text size="sm">Archived</z-text>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'list-rows',
			title: 'Between list rows',
			description: 'The densest use, and the one it is really for — a hairline between each row and nothing else.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column style="width: 26rem">
				  <z-row aligns-x="between" aligns-y="center" padding-y="3">
				    <z-text size="sm">Production</z-text>
				    <z-badge tone="success" kind="soft" size="small" label="Healthy"></z-badge>
				  </z-row>
				  <z-line></z-line>
				  <z-row aligns-x="between" aligns-y="center" padding-y="3">
				    <z-text size="sm">Staging</z-text>
				    <z-badge tone="warning" kind="soft" size="small" label="Degraded"></z-badge>
				  </z-row>
				  <z-line></z-line>
				  <z-row aligns-x="between" aligns-y="center" padding-y="3">
				    <z-text size="sm">Preview</z-text>
				    <z-badge tone="neutral" kind="soft" size="small" label="Idle"></z-badge>
				  </z-row>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'in-a-card',
			title: 'Splitting a card',
			description: 'Dividing a card body from its footer without adding a second surface.',
			layout: ExampleLayout.fill,
			markup: `
				<z-card style="max-width: 24rem">
				  <z-column gap="4">
				    <z-column gap="1">
				      <z-heading size="xs" tag="h3">Monthly usage</z-heading>
				      <z-text size="sm" color="muted">48 of 100 seats in use.</z-text>
				    </z-column>
				    <z-line></z-line>
				    <z-row aligns-x="between" aligns-y="center">
				      <z-text size="xs" color="muted">Resets 1 August</z-text>
				      <z-link href="#" size="small">Manage seats</z-link>
				    </z-row>
				  </z-column>
				</z-card>
			`
		}),

		defineMarkupExample({
			id: 'explicit-horizontal',
			title: 'Explicit orientation',
			description:
				'`is-horizontal` states the default outright. Worth setting when the orientation is toggled from script, so both branches read the same.',
			layout: ExampleLayout.fill,
			markup: `
				<z-line is-horizontal></z-line>
			`
		})
	],

	attributes: [
		{
			name: 'is-vertical',
			type: 'boolean',
			defaultValue: '—',
			description: 'Renders a full-height vertical rule instead of a horizontal one.'
		},
		{ name: 'is-horizontal', type: 'boolean', defaultValue: '—', description: 'States the default horizontal orientation explicitly.' }
	],

	properties: [],
	slots: [],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Exposes role="separator" with aria-orientation matching the direction, so the division is announced rather than merely drawn.',
		'A separator is not focusable and not interactive — it only marks a boundary between groups of content.',
		'Do not scatter lines where whitespace would do. Every announced separator is one more thing between a screen reader user and the content.',
		'A vertical line inside a container with no resolvable height renders as nothing. That is a layout bug, not a styling one.'
	],

	related: [
		{ tag: 'z-separator', route: '/c/foundation/z-separator', description: 'The same divider, with room for a label.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'Where vertical rules divide control clusters.' },
		{ tag: 'z-list', route: '/c/data-display/z-list', description: 'Row separation handled for you.' }
	]
}
