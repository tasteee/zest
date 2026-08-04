import { defineInteractiveExample, queryAllPreview, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

type SelectOptionT = {
	value: string
	label: string
	isDisabled?: boolean
}

type SelectElementT = HTMLElement & {
	options: SelectOptionT[]
	value: string
}

const TIMEZONE_OPTIONS: SelectOptionT[] = [
	{ value: 'utc', label: 'UTC' },
	{ value: 'lisbon', label: 'Lisbon — GMT+1' },
	{ value: 'berlin', label: 'Berlin — GMT+2' },
	{ value: 'tokyo', label: 'Tokyo — GMT+9' }
]

const buildPlaygroundSelect = (): HTMLElement => {
	const select = document.createElement('z-select') as SelectElementT
	select.setAttribute('placeholder', 'Choose a timezone')
	select.setAttribute('label', 'Timezone')
	select.options = TIMEZONE_OPTIONS
	return select
}

export const zSelectDoc: ComponentDocT = {
	tag: 'z-select',
	title: 'z-select',
	tagline: 'A dropdown you can actually style, without giving up the keyboard.',
	status: ComponentStatus.stable,

	description:
		'A custom listbox: the trigger shows the selected label or a placeholder, and the panel drops below as a bordered, shadow-free surface. Options are a property, not markup — `element.options = [{ value, label, isDisabled }]` — which keeps the option list a data structure you can map from your own model rather than a block of DOM you have to keep in sync. Arrow keys move, Enter picks, Escape closes, and clicking outside closes.',

	playground: {
		buildElement: buildPlaygroundSelect,
		controlNames: ['placeholder', 'size', 'accent', 'is-invalid', 'is-disabled', 'is-inline'],
		slotLabel: 'options set as a property'
	},

	usageGuidance: [
		'Set `options` as a property. There is no markup form on purpose — the list comes from your data, and a property assignment is the honest way to express that.',
		'Use a select when the options are known, mutually exclusive, and too many to show at once. Under about five, `z-radio-group` shows all of them for the same vertical cost and requires no click to read.',
		'Give it a `placeholder` when there is no sensible default. "Select…" is honest; pre-selecting the first option to avoid an empty state silently answers for the user.',
		'Keep labels short enough to read in the closed trigger. If an option only makes sense with two lines of explanation, radios are the right control.',
		'Mark unavailable options `isDisabled` rather than removing them. A greyed-out row tells the user the option exists and why it is not for them; a missing row tells them nothing.',
		'When the list runs past a dozen or so, use `z-combobox` — filtering beats scrolling once scanning stops being instant.'
	],

	anatomy: [
		{ name: 'trigger', description: 'The closed control. Shows the selected label, or the placeholder in muted type.' },
		{ name: 'chevron', description: 'The affordance that says this opens. Rotates with the panel state.' },
		{ name: 'panel', description: 'The listbox. A bordered surface, no shadow, positioned directly beneath the trigger.' },
		{ name: 'option', description: 'One row. Carries active (keyboard or hover) and selected states independently.' },
		{ name: 'tick', description: 'The checkmark on the selected row, so selection survives the highlight moving away.' }
	],

	examples: [
		defineInteractiveExample({
			id: 'basic',
			title: 'Basic',
			description: 'Options assigned as a property. Open it, arrow through the list, press Enter.',
			layout: ExampleLayout.stack,
			markup: `
				<z-select id="timezoneSelect" label="Timezone" placeholder="Choose a timezone"></z-select>
			`,
			script: `
				const timezoneSelect = document.querySelector('#timezoneSelect')

				timezoneSelect.options = [
				  { value: 'utc', label: 'UTC' },
				  { value: 'lisbon', label: 'Lisbon — GMT+1' },
				  { value: 'berlin', label: 'Berlin — GMT+2' },
				  { value: 'tokyo', label: 'Tokyo — GMT+9' }
				]
			`,
			wire: (root) => {
				const timezoneSelect = queryPreview<SelectElementT>(root, '#timezoneSelect')
				timezoneSelect.options = TIMEZONE_OPTIONS
			}
		}),

		defineInteractiveExample({
			id: 'preselected',
			title: 'With a value',
			description: 'Set `value` to the option’s value and the trigger shows its label. This is how you render a select for something already configured.',
			layout: ExampleLayout.stack,
			markup: `
				<z-select id="preselectedSelect" label="Timezone" value="berlin"></z-select>
			`,
			script: `
				const preselectedSelect = document.querySelector('#preselectedSelect')
				preselectedSelect.options = timezoneOptions
				preselectedSelect.value = 'berlin'
			`,
			wire: (root) => {
				const preselectedSelect = queryPreview<SelectElementT>(root, '#preselectedSelect')
				preselectedSelect.options = TIMEZONE_OPTIONS
				preselectedSelect.value = 'berlin'
			}
		}),

		defineInteractiveExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities, matched to z-input and z-button so a row of mixed controls sits on one baseline.',
			layout: ExampleLayout.stack,
			markup: `
				<z-select class="sizedSelect" size="sm" label="Small" placeholder="Small"></z-select>
				<z-select class="sizedSelect" size="md" label="Medium" placeholder="Medium"></z-select>
				<z-select class="sizedSelect" size="lg" label="Large" placeholder="Large"></z-select>
			`,
			script: `
				for (const select of document.querySelectorAll('.sizedSelect')) {
				  select.options = timezoneOptions
				}
			`,
			wire: (root) => {
				const selects = queryAllPreview<SelectElementT>(root, '.sizedSelect')
				for (const select of selects) {
					select.options = TIMEZONE_OPTIONS
				}
			}
		}),

		defineInteractiveExample({
			id: 'disabled-options',
			title: 'Unavailable options',
			description:
				'`isDisabled` on an option keeps it visible but unpickable, and the keyboard skips it. Better than hiding it — the user learns the option exists.',
			layout: ExampleLayout.stack,
			markup: `
				<z-select id="planSelect" label="Plan" placeholder="Choose a plan"></z-select>
			`,
			script: `
				const planSelect = document.querySelector('#planSelect')

				planSelect.options = [
				  { value: 'personal', label: 'Personal' },
				  { value: 'team', label: 'Team' },
				  { value: 'enterprise', label: 'Enterprise — contact sales', isDisabled: true }
				]
			`,
			wire: (root) => {
				const planSelect = queryPreview<SelectElementT>(root, '#planSelect')

				planSelect.options = [
					{ value: 'personal', label: 'Personal' },
					{ value: 'team', label: 'Team' },
					{ value: 'enterprise', label: 'Enterprise — contact sales', isDisabled: true }
				]
			}
		}),

		defineInteractiveExample({
			id: 'states',
			title: 'States',
			description: 'Invalid and disabled. An empty option list is a state too, and says so rather than opening onto nothing.',
			layout: ExampleLayout.stack,
			markup: `
				<z-select id="invalidSelect" label="Invalid" is-invalid placeholder="Pick one"></z-select>
				<z-select id="disabledSelect" label="Disabled" is-disabled placeholder="Unavailable"></z-select>
				<z-select id="emptySelect" label="No options" placeholder="Nothing to choose"></z-select>
			`,
			script: `
				invalidSelect.options = timezoneOptions
				disabledSelect.options = timezoneOptions
				emptySelect.options = []
			`,
			wire: (root) => {
				const invalidSelect = queryPreview<SelectElementT>(root, '#invalidSelect')
				const disabledSelect = queryPreview<SelectElementT>(root, '#disabledSelect')
				const emptySelect = queryPreview<SelectElementT>(root, '#emptySelect')

				invalidSelect.options = TIMEZONE_OPTIONS
				disabledSelect.options = TIMEZONE_OPTIONS
				emptySelect.options = []
			}
		}),

		defineInteractiveExample({
			id: 'change-event',
			title: 'Reading the selection',
			description: '`change` fires once, when an option is committed — not while arrowing through the list. Moving the highlight is not choosing.',
			layout: ExampleLayout.stack,
			markup: `
				<z-select id="regionSelect" accent="dom" label="Region" placeholder="Choose a region"></z-select>
				<z-text size="sm" color="muted" id="regionStatus">No region selected.</z-text>
			`,
			script: `
				const regionSelect = document.querySelector('#regionSelect')
				regionSelect.options = regions

				regionSelect.addEventListener('change', (changeEvent) => {
				  loadRegion(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const regionSelect = queryPreview<SelectElementT>(root, '#regionSelect')
				const regionStatus = queryPreview<HTMLElement>(root, '#regionStatus')

				const regionOptions: SelectOptionT[] = [
					{ value: 'us-east', label: 'US East (Virginia)' },
					{ value: 'us-west', label: 'US West (Oregon)' },
					{ value: 'eu-west', label: 'EU West (Ireland)' },
					{ value: 'ap-south', label: 'AP South (Mumbai)' }
				]

				regionSelect.options = regionOptions

				regionSelect.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: string }>).detail
					const chosen = regionOptions.find((option) => option.value === detail.value)
					regionStatus.textContent = chosen ? `Selected: ${chosen.label}` : 'No region selected.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'dependent-selects',
			title: 'Dependent selects',
			description:
				'The second list is rebuilt from the first answer. Clearing its value on every change matters — a stale selection that no longer exists in the new list is worse than an empty one.',
			layout: ExampleLayout.stack,
			markup: `
				<z-select id="countrySelect" accent="dom" label="Country" placeholder="Choose a country"></z-select>
				<z-select id="citySelect" accent="dom" label="City" placeholder="Choose a country first" is-disabled></z-select>
			`,
			script: `
				const countrySelect = document.querySelector('#countrySelect')
				const citySelect = document.querySelector('#citySelect')

				countrySelect.addEventListener('change', (changeEvent) => {
				  citySelect.options = citiesByCountry[changeEvent.detail.value]
				  citySelect.value = ''
				  citySelect.isDisabled = false
				})
			`,
			wire: (root) => {
				const countrySelect = queryPreview<SelectElementT>(root, '#countrySelect')
				const citySelect = queryPreview<SelectElementT>(root, '#citySelect')

				const citiesByCountry: Record<string, SelectOptionT[]> = {
					portugal: [
						{ value: 'lisbon', label: 'Lisbon' },
						{ value: 'porto', label: 'Porto' }
					],
					japan: [
						{ value: 'tokyo', label: 'Tokyo' },
						{ value: 'osaka', label: 'Osaka' },
						{ value: 'kyoto', label: 'Kyoto' }
					]
				}

				countrySelect.options = [
					{ value: 'portugal', label: 'Portugal' },
					{ value: 'japan', label: 'Japan' }
				]

				countrySelect.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: string }>).detail

					citySelect.options = citiesByCountry[detail.value] ?? []
					citySelect.value = ''
					citySelect.removeAttribute('is-disabled')
					citySelect.setAttribute('placeholder', 'Choose a city')
				})
			}
		})
	],

	attributes: [
		{ name: 'value', type: 'string', defaultValue: '—', description: 'The selected option’s value. Reflects, so it is both the seed and the live answer.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Accessible name for the trigger. Set for you inside a z-field.' },
		{ name: 'placeholder', type: 'string', defaultValue: 'Select…', description: 'Shown in muted type while nothing is selected.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Control density.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent family for the focus border and the selected row.' },
		{ name: 'is-invalid', type: 'boolean', defaultValue: '—', description: 'Paints the error border on the trigger.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Blocks opening and removes the trigger from the tab order.' },
		{ name: 'is-inline', type: 'boolean', defaultValue: '—', description: 'Shrinks the trigger to its natural width instead of filling its container.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the select from layout.' }
	],

	properties: [
		{
			name: 'options',
			type: 'Array<{ value: string, label: string, isDisabled?: boolean }>',
			defaultValue: '[]',
			description: 'The option list. Property only — assign it from your own data rather than authoring option markup.'
		}
	],

	slots: [],

	events: [
		{ name: 'change', detail: '{ value: string }', description: 'Fires once when an option is committed. Arrowing through the list does not fire it.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The trigger is a real button with aria-haspopup="listbox" and aria-expanded, and the panel carries role="listbox" with role="option" rows and aria-selected.',
		'Full keyboard support: Enter or Space opens, ↑/↓ move the active row and skip disabled options, Enter commits, Escape closes.',
		'Set `label` (or nest the select in a z-field) — the shadow boundary means an outside <label for> will not name the trigger.',
		'Active and selected are separate states by design: the highlight follows the keyboard, and the tick stays on the committed choice.',
		'An empty list renders "No options" rather than an empty panel, so an open-and-nothing-happens moment reads as a state instead of a bug.'
	],

	related: [
		{ tag: 'z-combobox', route: '/c/forms/z-combobox', description: 'The same panel, with typing to filter.' },
		{ tag: 'z-radio-group', route: '/c/forms/z-radio-group', description: 'When every option is worth showing at once.' },
		{ tag: 'z-menu', route: '/c/navigation-disclosure/z-menu', description: 'For actions rather than a value.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label, help text, and error treatment.' }
	]
}
