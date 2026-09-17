import { defineMarkupExample } from '../authoring'
import { ComponentStatus, EvidenceLevel, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSeparator = (): HTMLElement => {
	const wrapper = document.createElement('div')
	wrapper.className = 'demoConstrained demoFullWidth'

	const separator = document.createElement('z-separator')
	separator.setAttribute('label', 'OR')
	wrapper.append(separator)

	return wrapper
}

export const zSeparatorDoc: ComponentDocT = {
	tag: 'z-separator',
	title: 'z-separator',
	tagline: 'The divider — a hairline rule, optionally labelled, optionally vertical.',
	status: ComponentStatus.beta,
	evidence: {
		formAssociated: null,
		keyboard: EvidenceLevel.unverified,
		screenReader: EvidenceLevel.unverified,
		browserTests: false,
		screenshots: false
	},

	description:
		'One element for every rule in the system. Given a `label` — or slotted content — it splits the hairline and centres the label in the gap; given neither, it collapses to a single continuous rule. `vertical` turns it into the 1px rule that divides clusters in a row. It detects slotted content at runtime, so a separator whose label is populated later still lays itself out correctly rather than leaving an empty notch in the rule. This absorbed `z-line`, which was this element with the label taken away. The unlabelled horizontal case rendered identically from either, so choosing between them was a coin toss with no consequence — the label is what is optional here, not the element.',

	playground: {
		buildElement: buildPlaygroundSeparator,
		controlNames: [],
		slotLabel: 'OR'
	},

	usageGuidance: [
		'Label it when the boundary means something — "OR" between two sign-in methods, a date between runs of messages. Leave it bare when the boundary is purely visual.',
		'Keep labels to a word or two. The label sits inside the rule, and a long one turns the divider into a heading.',
		'It carries no margin of its own. The surrounding layout owns the spacing, usually through a `gap` on the parent.',
		'`vertical` needs a parent with a resolvable height. In a flex row with stretched items it fills naturally; in a block container it collapses to nothing — that is a layout bug, not a styling one.',
		'A vertical rule is never labelled. Set both and the label is ignored rather than turned on its side.',
		'Do not scatter rules where whitespace would do. Every announced separator is one more thing between a screen reader user and the content.'
	],

	anatomy: [
		{ name: 'rule', description: 'The hairline, split into two runs when a label is present, and the whole element when vertical.' },
		{ name: 'label', description: 'Centred content, from the `label` attribute or the default slot. Horizontal only.' }
	],

	examples: [
		defineMarkupExample({
			id: 'bare',
			title: 'Without a label',
			description: 'With nothing to centre, it collapses to a single continuous rule.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="md" style="width: 24rem">
				  <z-text size="sm">Above</z-text>
				  <z-separator></z-separator>
				  <z-text size="sm">Below</z-text>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'labelled',
			title: 'With a label',
			description: 'The rule splits and the label sits in the gap.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="md" style="width: 24rem">
				  <z-separator label="OR"></z-separator>
				  <z-separator label="Yesterday"></z-separator>
				  <z-separator label="Archived items"></z-separator>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'slotted-label',
			title: 'Slotted labels',
			description: 'Slotting instead of using `label` lets the divider carry a badge, an icon, or anything else.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="lg" style="width: 24rem">
				  <z-separator>
				    <z-badge accent="dom" kind="soft" size="sm" label="New"></z-badge>
				  </z-separator>
				  <z-separator>
				    <z-label>3 unread</z-label>
				  </z-separator>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'auth-form',
			title: 'Between two paths',
			description: 'The canonical labelled divider — two ways to do the same thing, with the choice made explicit.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="md" style="width: 20rem">
				  <z-button accent="dom" is-full-width>Continue with email</z-button>
				  <z-separator label="or"></z-separator>
				  <z-button kind="outline" is-full-width>Continue with SSO</z-button>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'vertical',
			title: 'Vertical',
			description: '`vertical` fills the height instead — the rule between clusters in a row. Unlabelled, always.',
			layout: ExampleLayout.center,
			markup: `
				<wired-row gap="sm" y="center">
				  <z-text size="sm">Drafts</z-text>
				  <z-separator vertical></z-separator>
				  <z-text size="sm">Sent</z-text>
				  <z-separator vertical></z-separator>
				  <z-text size="sm">Archived</z-text>
				</wired-row>
			`
		}),

		defineMarkupExample({
			id: 'list-rows',
			title: 'Between list rows',
			description: 'The densest use — a hairline between each row and nothing else.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column style="width: 26rem">
				  <wired-row x="between" y="center" style="padding-block: var(--spacing-3)">
				    <z-text size="sm">Production</z-text>
				    <z-badge accent="success" kind="soft" size="sm" label="Healthy"></z-badge>
				  </wired-row>
				  <z-separator></z-separator>
				  <wired-row x="between" y="center" style="padding-block: var(--spacing-3)">
				    <z-text size="sm">Staging</z-text>
				    <z-badge accent="warning" kind="soft" size="sm" label="Degraded"></z-badge>
				  </wired-row>
				  <z-separator></z-separator>
				  <wired-row x="between" y="center" style="padding-block: var(--spacing-3)">
				    <z-text size="sm">Preview</z-text>
				    <z-badge accent="neutral" kind="soft" size="sm" label="Idle"></z-badge>
				  </wired-row>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'date-divider',
			title: 'Between runs of content',
			description: 'A labelled separator marking where one day of messages ends and the next begins.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="sm" style="width: 26rem">
				  <z-text size="sm" color="muted">…earlier messages</z-text>
				  <z-separator label="Today"></z-separator>
				  <z-text size="sm">Morning — did the deploy finish?</z-text>
				  <z-text size="sm">Yes, about an hour ago.</z-text>
				</wired-column>
			`
		})
	],

	attributes: [
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Text centred in the rule. Used when nothing is slotted, and ignored when vertical.' },
		{ name: 'vertical', type: 'boolean', defaultValue: '—', description: 'Makes the rule fill the available height instead of the width. Never labelled.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the separator from layout.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'Custom label content. Used when the label attribute is not set.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Exposes role="separator" with an aria-orientation matching its axis, so the division is announced rather than only drawn. You never write either yourself.',
		'A labelled separator is announced with its label, so the text should describe the boundary — "Today" or "or", not decoration.',
		'It is not focusable and not interactive; it marks a boundary and nothing more.',
		'A separator carrying a date or an unread count is meaningful content sitting in a decorative element. If losing it would confuse a screen reader user, put it in a real heading instead.'
	],

	related: [
		{ tag: 'z-toolbar', route: '/elements/actionables/z-toolbar', description: 'A common home for vertical dividers.' },
		{ tag: 'z-spacer', route: '/elements/structure/z-spacer', description: 'When the gap should be blank rather than ruled.' }
	]
}
