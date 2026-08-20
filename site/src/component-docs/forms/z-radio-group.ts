import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundRadioGroup = (): HTMLElement => {
	const group = document.createElement('z-radio-group')
	group.setAttribute('label', 'Billing period')
	group.setAttribute('value', 'monthly')
	group.setAttribute('accent', 'dom')

	group.innerHTML = `
		<z-radio value="monthly" is-checked>Monthly</z-radio>
		<z-radio value="annual">Annual</z-radio>
	`

	return group
}

export const zRadioGroupDoc: ComponentDocT = {
	tag: 'z-radio-group',
	title: 'z-radio-group',
	tagline: 'Turns a pile of radios into one control with one answer.',
	status: ComponentStatus.stable,

	description:
		'The coordinator for `z-radio`. It listens for the `select` event bubbling up from its children, clears every other radio, records the winner on its own `value`, and re-emits a single `change`. That means you bind one listener to the group rather than one per option, and read one property rather than hunting for whichever child is checked. `value` works in both directions: assign it and the matching child is checked for you; leave it unset and the group adopts whichever child was seeded with `is-checked`. The same model as `z-toggle-group`.',

	playground: {
		buildElement: buildPlaygroundRadioGroup,
		controlNames: ['label', 'direction', 'accent'],
		slotLabel: 'Two z-radio children'
	},

	usageGuidance: [
		'Bind to `change` on the group, not to each radio. One handler, one value — that is the reason the group exists.',
		'Set `label`. It becomes the group’s accessible name, which is the difference between hearing "Billing period, Monthly" and just "Monthly".',
		'Set `accent` on the group when its radios should share neutral, dom, or sub emphasis. An accent on an individual radio can still override it.',
		'Seed the initial answer either way — `value` on the group or `is-checked` on a child. Prefer `value` when the answer comes from your data, and `is-checked` when the markup is static.',
		'Stack vertically by default. `direction` is for two or three short labels — anything longer becomes a line the eye has to hunt across.',
		'Always give the user a real default when one exists. A group where nothing is chosen forces a decision before the user has read the options.',
		'Past five or so options, switch to `z-select`. Radios spend vertical space to make every option visible; that trade stops paying off quickly.'
	],

	anatomy: [
		{ name: 'radiogroup role', description: 'Set on the host, with the label as its accessible name.' },
		{ name: 'default slot', description: 'The z-radio children. Nothing else belongs here.' },
		{ name: 'select listener', description: 'Catches the bubbling select from any child, clears the siblings, and re-emits change.' },
		{ name: 'value sync', description: 'Keeps the children and value agreeing in both directions, including when children are slotted in later.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'A label, two options, one answer. `is-checked` on a child sets where the group starts.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group label="Billing period" value="monthly" accent="dom">
				  <z-radio value="monthly" is-checked>Monthly</z-radio>
				  <z-radio value="annual">Annual — save 20%</z-radio>
				</z-radio-group>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'Accent belongs to the group, so every option uses the same selection colour.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group label="Neutral choice" value="a" accent="neutral" direction="horizontal">
				  <z-radio value="a">A</z-radio><z-radio value="b">B</z-radio>
				</z-radio-group>
				<z-radio-group label="Dom choice" value="a" accent="dom" direction="horizontal">
				  <z-radio value="a">A</z-radio><z-radio value="b">B</z-radio>
				</z-radio-group>
				<z-radio-group label="Sub choice" value="a" accent="sub" direction="horizontal">
				  <z-radio value="a">A</z-radio><z-radio value="b">B</z-radio>
				</z-radio-group>
			`
		}),

		defineInteractiveExample({
			id: 'value-driven',
			title: 'Driving it from value',
			description:
				'No `is-checked` anywhere — the group checks whichever child matches its `value`. This is the shape you want when the answer comes from your data rather than from the markup.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group id="themeGroup" label="Theme">
				  <z-radio value="system" accent="dom">Match system</z-radio>
				  <z-radio value="light" accent="dom">Light</z-radio>
				  <z-radio value="dark" accent="dom">Dark</z-radio>
				</z-radio-group>
				<wired-row gap="sm">
				  <z-button id="pickLight" size="sm" kind="outline">Set to light</z-button>
				  <z-button id="pickDark" size="sm" kind="outline">Set to dark</z-button>
				</wired-row>
			`,
			script: `
				const themeGroup = document.querySelector('#themeGroup')

				// assigning value checks the matching radio
				themeGroup.value = savedPreferences.theme
			`,
			wire: (root) => {
				type RadioGroupElementT = HTMLElement & { value: string }

				const themeGroup = queryPreview<RadioGroupElementT>(root, '#themeGroup')
				const pickLight = queryPreview<HTMLElement>(root, '#pickLight')
				const pickDark = queryPreview<HTMLElement>(root, '#pickDark')

				themeGroup.value = 'system'

				pickLight.addEventListener('click', () => {
					themeGroup.value = 'light'
				})

				pickDark.addEventListener('click', () => {
					themeGroup.value = 'dark'
				})
			}
		}),

		defineMarkupExample({
			id: 'horizontal',
			title: 'Horizontal',
			description: '`direction` lays the options in a row. Reserve it for short labels — a wrapped row is harder to scan than a column.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group label="Alignment" value="left" direction="horizontal">
				  <z-radio value="left" accent="dom" is-checked>Left</z-radio>
				  <z-radio value="center" accent="dom">Center</z-radio>
				  <z-radio value="right" accent="dom">Right</z-radio>
				</z-radio-group>
			`
		}),

		defineMarkupExample({
			id: 'in-a-field',
			title: 'Inside a field',
			description:
				'`z-field` supplies the visible label and help text; the group keeps its own `label` for the accessible name. Both are cheap, and they do different jobs.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="Default branch protection" description="Applies to every new repository in this workspace.">
				  <z-radio-group label="Default branch protection" value="review">
				    <z-radio value="none" accent="dom">No protection</z-radio>
				    <z-radio value="review" accent="dom" is-checked>Require a review</z-radio>
				    <z-radio value="checks" accent="dom">Require a review and passing checks</z-radio>
				  </z-radio-group>
				</z-field>
			`
		}),

		defineInteractiveExample({
			id: 'change-event',
			title: 'Reading the answer',
			description:
				'One listener on the group. `change` carries the chosen value, and the group’s own `value` property holds the same answer if you would rather read it later.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group id="planGroup" label="Plan" value="team">
				  <z-radio value="personal" accent="dom">Personal</z-radio>
				  <z-radio value="team" accent="dom" is-checked>Team</z-radio>
				  <z-radio value="enterprise" accent="dom">Enterprise</z-radio>
				</z-radio-group>
				<z-text size="sm" color="muted" id="planStatus">Selected: team</z-text>
			`,
			script: `
				const planGroup = document.querySelector('#planGroup')

				planGroup.addEventListener('change', (changeEvent) => {
				  selectPlan(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const planGroup = queryPreview<HTMLElement>(root, '#planGroup')
				const planStatus = queryPreview<HTMLElement>(root, '#planStatus')

				planGroup.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value?: string }>).detail
					planStatus.textContent = `Selected: ${detail.value ?? '—'}`
				})
			}
		}),

		defineInteractiveExample({
			id: 'dependent-fields',
			title: 'Revealing what the answer needs',
			description:
				'A choice that changes the rest of the form. Reveal the follow-up rather than disabling it — a field that appears is easier to understand than one that was greyed out all along.',
			layout: ExampleLayout.stack,
			markup: `
				<z-radio-group id="deliveryGroup" label="Delivery" value="email">
				  <z-radio value="email" accent="dom" is-checked>Email</z-radio>
				  <z-radio value="webhook" accent="dom">Webhook</z-radio>
				</z-radio-group>
				<z-field id="targetField" label="Email address">
				  <z-input id="targetInput" type="email" placeholder="alerts@example.com"></z-input>
				</z-field>
			`,
			script: `
				const deliveryGroup = document.querySelector('#deliveryGroup')
				const targetField = document.querySelector('#targetField')
				const targetInput = document.querySelector('#targetInput')

				deliveryGroup.addEventListener('change', (changeEvent) => {
				  const isWebhook = changeEvent.detail.value === 'webhook'
				  targetField.label = isWebhook ? 'Webhook URL' : 'Email address'
				  targetInput.placeholder = isWebhook ? 'https://example.com/hooks/alerts' : 'alerts@example.com'
				  targetInput.type = isWebhook ? 'url' : 'email'
				})
			`,
			wire: (root) => {
				const deliveryGroup = queryPreview<HTMLElement>(root, '#deliveryGroup')
				const targetField = queryPreview<HTMLElement & { label: string }>(root, '#targetField')
				const targetInput = queryPreview<HTMLElement & { value: string }>(root, '#targetInput')

				deliveryGroup.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value?: string }>).detail
					const isWebhook = detail.value === 'webhook'

					targetField.label = isWebhook ? 'Webhook URL' : 'Email address'
					targetInput.setAttribute('placeholder', isWebhook ? 'https://example.com/hooks/alerts' : 'alerts@example.com')
					targetInput.setAttribute('type', isWebhook ? 'url' : 'email')
					targetInput.value = ''
				})
			}
		})
	],

	attributes: [
		{
			name: 'value',
			type: 'string',
			defaultValue: '—',
			description: 'The chosen value. Reflects, two-way — assigning it checks the matching child, and it updates as the selection changes.'
		},
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Accessible name for the group. Set this even when a z-field already shows a visible label.' },
		{ name: 'accent', type: 'neutral | dom | sub | success | warning | error', defaultValue: 'neutral', description: 'Shared selection accent for the radios in the group.' },
		{ name: 'direction', type: 'vertical | horizontal', defaultValue: 'vertical', description: 'Sets the option layout axis.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the group from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The z-radio children.' }],

	events: [
		{ name: 'change', detail: '{ value?: string }', description: 'Fires once per selection, after the siblings have been cleared.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The host carries role="radiogroup" with `label` as its accessible name, so the set is announced as one control — "Billing period, radio group" — rather than as unrelated radios.',
		'Coordination happens on the bubbling select event, so radios added to the group later are picked up without re-registering anything.',
		'Value sync runs on slot changes as well as on assignment, so a group whose options arrive asynchronously still ends up showing the right answer.',
		'Provide a sensible default selection where one exists. An empty group makes every user answer a question they may not have needed to.',
		'Keep the option order stable between renders. A list that reorders under the keyboard cursor is disorienting for everyone and unusable with a screen reader.'
	],

	related: [
		{ tag: 'z-radio', route: '/c/forms/z-radio', description: 'The options this group coordinates.' },
		{ tag: 'z-toggle-group', route: '/c/buttons-actions/z-toggle-group', description: 'The same single-selection model, drawn as buttons.' },
		{ tag: 'z-select', route: '/c/forms/z-select', description: 'When the list is too long to show all at once.' }
	]
}
