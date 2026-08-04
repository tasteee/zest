import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundRadio = (): HTMLElement => {
	const radio = document.createElement('z-radio')
	radio.setAttribute('is-checked', '')
	radio.setAttribute('value', 'monthly')
	radio.textContent = 'Monthly'
	return radio
}

export const zRadioDoc: ComponentDocT = {
	tag: 'z-radio',
	title: 'z-radio',
	tagline: 'One option in a set — a ring that fills when chosen.',
	status: ComponentStatus.stable,

	description:
		'A single radio option: a hairline ring when off, an accent ring with a filled dot when on. It has no notion of its siblings — clearing the others is `z-radio-group`’s job, and it does that by listening for the `select` event this element bubbles. A radio used outside a group is a radio that can never be unchosen, so put it in one.',

	playground: {
		buildElement: buildPlaygroundRadio,
		controlNames: ['accent', 'is-checked', 'is-disabled'],
		slotLabel: 'Monthly'
	},

	usageGuidance: [
		'Always nest radios in a `z-radio-group`. On its own a radio can be turned on and never off, because nothing else knows to clear it.',
		'Radios are for two to about five visible options. Past that, a `z-select` costs less vertical space and less reading.',
		'If the user may pick more than one, you want checkboxes. The circle is a promise that only one answer survives.',
		'Give every radio a `value` — the group reports the chosen value, and without one the change event carries nothing useful.',
		'Do not use radios for an action. Choosing an option should set a value, not navigate or submit.'
	],

	anatomy: [
		{ name: 'ring', description: 'The circle. Hairline when off, accent when chosen.' },
		{ name: 'dot', description: 'The filled centre, scaled in as the option is chosen.' },
		{ name: 'default slot', description: 'The label, inside the clickable region.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Off and chosen. The dot is the state; the ring colour reinforces it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group label="Billing period" value="monthly">
				  <z-radio value="monthly" is-checked>Monthly</z-radio>
				  <z-radio value="annual">Annual</z-radio>
				</z-radio-group>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Tones',
			description: 'Three accent families for the chosen state. Set the accent on each radio — the group does not push one down.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group label="Tone demo" value="neutral">
				  <z-radio accent="neutral" value="neutral" is-checked>Neutral</z-radio>
				  <z-radio accent="dom" value="primary">Primary</z-radio>
				  <z-radio accent="sub" value="secondary">Secondary</z-radio>
				</z-radio-group>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description:
				'A disabled option that is chosen still shows its dot — the user needs to know what is set even when they cannot change it. A disabled option that is not chosen simply cannot be picked.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group label="Plan" value="team">
				  <z-radio value="personal">Personal</z-radio>
				  <z-radio value="team" is-checked>Team</z-radio>
				  <z-radio value="enterprise" is-disabled>Enterprise — contact sales</z-radio>
				</z-radio-group>
			`
		}),

		defineMarkupExample({
			id: 'rich-labels',
			title: 'Rich labels',
			description:
				'The slot takes markup, so an option can carry its own explanation. Keep the first line short — that is the part that gets read.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group label="Visibility" value="private">
				  <z-radio value="private" accent="dom" is-checked>
				    <z-column gap="2xs">
				      <z-text size="sm">Private</z-text>
				      <z-text size="xs" color="muted">Only you and people you invite.</z-text>
				    </z-column>
				  </z-radio>
				  <z-radio value="workspace" accent="dom">
				    <z-column gap="2xs">
				      <z-text size="sm">Workspace</z-text>
				      <z-text size="xs" color="muted">Anyone in your workspace can find it.</z-text>
				    </z-column>
				  </z-radio>
				</z-radio-group>
			`
		}),

		defineInteractiveExample({
			id: 'select-event',
			title: 'The select event',
			description:
				'Each radio fires `select` with its own value as it is chosen. The event bubbles, which is exactly how the group hears it — and how you can, if you need per-option behaviour.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group id="speedGroup" label="Playback speed" value="1">
				  <z-radio value="0.5" accent="dom">0.5×</z-radio>
				  <z-radio value="1" accent="dom" is-checked>1×</z-radio>
				  <z-radio value="2" accent="dom">2×</z-radio>
				</z-radio-group>
				<z-text size="sm" color="muted" id="speedStatus">Speed: 1×</z-text>
			`,
			script: `
				const speedGroup = document.querySelector('#speedGroup')

				speedGroup.addEventListener('select', (selectEvent) => {
				  // fired by the individual z-radio, on its way up
				  logChoice(selectEvent.target.value)
				})
			`,
			wire: (root) => {
				const speedGroup = queryPreview<HTMLElement>(root, '#speedGroup')
				const speedStatus = queryPreview<HTMLElement>(root, '#speedStatus')

				speedGroup.addEventListener('select', (selectEvent) => {
					const detail = (selectEvent as CustomEvent<{ value?: string }>).detail
					speedStatus.textContent = `Speed: ${detail.value ?? '—'}×`
				})
			}
		})
	],

	attributes: [
		{ name: 'is-checked', type: 'boolean', defaultValue: '—', description: 'The chosen state. Reflects, and is cleared by the parent group when a sibling wins.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Blocks pointer and keyboard interaction.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent family of the chosen ring and dot.' },
		{ name: 'value', type: 'string', defaultValue: '—', description: 'The value this option stands for. Reported by the group and carried in the select event.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the option from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The label — plain text or a small block of markup.' }],

	events: [
		{ name: 'select', detail: '{ value?: string }', description: 'Fires when this option is chosen. Bubbles, which is how the parent group hears it.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'Each option wraps a real input[type=radio], so it is focusable and Space chooses it.',
		'The parent z-radio-group carries role="radiogroup" and its label, which is what makes the set announce as one control with several options rather than as loose radios.',
		'The ring and dot are aria-hidden; assistive technology reads the input beneath them.',
		'The slotted label sits inside the <label> element, so the whole row is a hit target — worth remembering when an option carries a two-line description.',
		'A disabled but chosen option still announces its checked state, which is why it keeps its dot rather than fading to empty.'
	],

	related: [
		{ tag: 'z-radio-group', route: '/c/forms/z-radio-group', description: 'The coordinator. Radios belong inside one.' },
		{ tag: 'z-checkbox', route: '/c/forms/z-checkbox', description: 'When more than one option can be true.' },
		{ tag: 'z-select', route: '/c/forms/z-select', description: 'When the option list grows past what is worth showing at once.' }
	]
}
