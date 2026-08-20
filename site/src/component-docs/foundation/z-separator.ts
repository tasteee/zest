import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
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
	tagline: 'A hairline divider that can carry a centred label.',
	status: ComponentStatus.stable,

	description:
		'The richer half of the divider pair. Given a `label` — or slotted content — it splits the rule and centres the label in the gap; given neither, it collapses to a single full-width hairline and behaves exactly like `z-line`. It detects slotted content at runtime, so a separator whose label is populated later still lays itself out correctly rather than leaving an empty notch in the rule.',

	playground: {
		buildElement: buildPlaygroundSeparator,
		controlNames: [],
		slotLabel: 'OR'
	},

	usageGuidance: [
		'Label it when the boundary means something — "OR" between two sign-in methods, a date between runs of messages. Leave it bare when the boundary is purely visual.',
		'Keep labels to a word or two. The label sits inside the rule, and a long one turns the divider into a heading.',
		'Use `z-line` when you know there will never be a label; it is the smaller primitive and says so.',
		'Use `z-line vertical` for a vertical rule. Labelled separators are always horizontal.'
	],

	anatomy: [
		{ name: 'rule', description: 'The hairline, split into two runs when a label is present.' },
		{ name: 'label', description: 'Centred content, from the `label` attribute or the default slot.' }
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
				<wired-column gap="5" style="width: 24rem">
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
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Text centred in the rule. Used when nothing is slotted.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the separator from layout.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'Custom label content. Used when the label attribute is not set.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Exposes role="separator" with horizontal orientation.',
		'A labelled separator is announced with its label, so the text should describe the boundary — "Today" or "or", not decoration.',
		'It is not focusable and not interactive; it marks a boundary and nothing more.',
		'A separator carrying a date or an unread count is meaningful content sitting in a decorative element. If losing it would confuse a screen reader user, put it in a real heading instead.'
	],

	related: [
		{ tag: 'z-line', route: '/c/foundation/z-line', description: 'The same divider without a label.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'A common home for vertical z-line dividers.' }
	]
}
