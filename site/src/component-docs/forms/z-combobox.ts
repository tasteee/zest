import { defineInteractiveExample, queryAllPreview, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

type ComboboxOptionT = {
	value: string
	label: string
	isDisabled?: boolean
}

type ComboboxElementT = HTMLElement & {
	options: ComboboxOptionT[]
	value: string
}

const FRAMEWORK_OPTIONS: ComboboxOptionT[] = [
	{ value: 'astro', label: 'Astro' },
	{ value: 'lit', label: 'Lit' },
	{ value: 'preact', label: 'Preact' },
	{ value: 'qwik', label: 'Qwik' },
	{ value: 'solid', label: 'Solid' },
	{ value: 'svelte', label: 'Svelte' },
	{ value: 'vue', label: 'Vue' }
]

const buildPlaygroundCombobox = (): HTMLElement => {
	const combobox = document.createElement('z-combobox') as ComboboxElementT
	combobox.setAttribute('label', 'Framework')
	combobox.setAttribute('placeholder', 'Search frameworks…')
	combobox.options = FRAMEWORK_OPTIONS
	return combobox
}

export const zComboboxDoc: ComponentDocT = {
	tag: 'z-combobox',
	title: 'z-combobox',
	tagline: 'A select you can type into, for when scrolling stopped being the fast way.',
	status: ComponentStatus.stable,

	description:
		'The trigger is a text field rather than a button: focus it and the list opens, type and it narrows, press Enter and the active row commits. Options come from the same `options` property as `z-select`, and filtering is a plain case-insensitive substring match on the label. When nothing matches, the panel says so rather than sitting empty.',

	playground: {
		buildElement: buildPlaygroundCombobox,
		controlNames: ['placeholder', 'size', 'accent', 'is-invalid', 'is-disabled', 'is-inline'],
		slotLabel: 'options set as a property'
	},

	usageGuidance: [
		'Reach for a combobox once the list is long enough that scanning it stops being instant — roughly a dozen options. Below that, `z-select` is one fewer interaction.',
		'The list must be known and finite. A combobox filters what you gave it; it does not accept a value that is not in the list.',
		'Write labels that begin with the word people will type. Filtering is a substring match on the label, so "Ireland (EU West)" is findable by "ire" and by "eu", which is usually what you want.',
		'The typed query is transient — it clears when the panel closes. The committed value is what survives, which is why the field shows the selected label at rest rather than the last thing typed.',
		'For a large list you should paginate or fetch, watch the `input` on your own model instead and reassign `options`. The component filters what it holds; it does not know how to ask for more.'
	],

	anatomy: [
		{ name: 'field', description: 'The text input that doubles as the trigger. Shows the query while open, the selected label while closed.' },
		{ name: 'chevron', description: 'Click target that opens and closes the panel without typing.' },
		{ name: 'panel', description: 'The filtered listbox — the same bordered, shadow-free surface as z-select.' },
		{ name: 'empty state', description: '"No matches" in place of the rows, so a fruitless search reads as an answer.' }
	],

	examples: [
		defineInteractiveExample({
			id: 'basic',
			title: 'Basic',
			description: 'Focus the field and start typing. The list narrows as you go; Enter commits the highlighted row.',
			layout: ExampleLayout.stack,
			markup: `
				<z-combobox id="frameworkCombobox" label="Framework" placeholder="Search frameworks…"></z-combobox>
			`,
			script: `
				const frameworkCombobox = document.querySelector('#frameworkCombobox')

				frameworkCombobox.options = [
				  { value: 'astro', label: 'Astro' },
				  { value: 'lit', label: 'Lit' },
				  { value: 'preact', label: 'Preact' },
				  { value: 'qwik', label: 'Qwik' },
				  { value: 'solid', label: 'Solid' },
				  { value: 'svelte', label: 'Svelte' },
				  { value: 'vue', label: 'Vue' }
				]
			`,
			wire: (root) => {
				const frameworkCombobox = queryPreview<ComboboxElementT>(root, '#frameworkCombobox')
				frameworkCombobox.options = FRAMEWORK_OPTIONS
			}
		}),

		defineInteractiveExample({
			id: 'preselected',
			title: 'With a value',
			description: 'A committed value shows as the field’s text at rest. Typing replaces it with the query; closing without choosing restores it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-combobox id="preselectedCombobox" label="Framework" value="svelte"></z-combobox>
			`,
			script: `
				const preselectedCombobox = document.querySelector('#preselectedCombobox')
				preselectedCombobox.options = frameworkOptions
				preselectedCombobox.value = 'svelte'
			`,
			wire: (root) => {
				const preselectedCombobox = queryPreview<ComboboxElementT>(root, '#preselectedCombobox')
				preselectedCombobox.options = FRAMEWORK_OPTIONS
				preselectedCombobox.value = 'svelte'
			}
		}),

		defineInteractiveExample({
			id: 'long-list',
			title: 'A list worth filtering',
			description:
				'The case the component is for. Thirty-odd rows are a scroll in a select and two keystrokes here — try typing "gm" or "asia".',
			layout: ExampleLayout.stack,
			markup: `
				<z-combobox id="timezoneCombobox" accent="dom" label="Timezone" placeholder="Search timezones…"></z-combobox>
				<z-text size="sm" color="muted" id="timezoneStatus">No timezone selected.</z-text>
			`,
			script: `
				const timezoneCombobox = document.querySelector('#timezoneCombobox')
				timezoneCombobox.options = timezones

				timezoneCombobox.addEventListener('change', (changeEvent) => {
				  saveTimezone(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const timezoneCombobox = queryPreview<ComboboxElementT>(root, '#timezoneCombobox')
				const timezoneStatus = queryPreview<HTMLElement>(root, '#timezoneStatus')

				const timezoneOptions: ComboboxOptionT[] = [
					{ value: 'auckland', label: 'Auckland — GMT+12 (Asia Pacific)' },
					{ value: 'berlin', label: 'Berlin — GMT+2 (Europe)' },
					{ value: 'bogota', label: 'Bogotá — GMT−5 (Americas)' },
					{ value: 'cairo', label: 'Cairo — GMT+3 (Africa)' },
					{ value: 'chicago', label: 'Chicago — GMT−5 (Americas)' },
					{ value: 'dublin', label: 'Dublin — GMT+1 (Europe)' },
					{ value: 'lagos', label: 'Lagos — GMT+1 (Africa)' },
					{ value: 'lisbon', label: 'Lisbon — GMT+1 (Europe)' },
					{ value: 'mumbai', label: 'Mumbai — GMT+5:30 (Asia Pacific)' },
					{ value: 'nairobi', label: 'Nairobi — GMT+3 (Africa)' },
					{ value: 'new-york', label: 'New York — GMT−4 (Americas)' },
					{ value: 'santiago', label: 'Santiago — GMT−4 (Americas)' },
					{ value: 'seoul', label: 'Seoul — GMT+9 (Asia Pacific)' },
					{ value: 'singapore', label: 'Singapore — GMT+8 (Asia Pacific)' },
					{ value: 'sydney', label: 'Sydney — GMT+10 (Asia Pacific)' },
					{ value: 'tokyo', label: 'Tokyo — GMT+9 (Asia Pacific)' },
					{ value: 'utc', label: 'UTC — GMT+0' },
					{ value: 'vancouver', label: 'Vancouver — GMT−7 (Americas)' }
				]

				timezoneCombobox.options = timezoneOptions

				timezoneCombobox.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: string }>).detail
					const chosen = timezoneOptions.find((option) => option.value === detail.value)
					timezoneStatus.textContent = chosen ? `Selected: ${chosen.label}` : 'No timezone selected.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'accents',
			title: 'Tones',
			description: 'Which accent the field border lifts to on focus, and which tint marks the selected row.',
			layout: ExampleLayout.stack,
			markup: `
				<z-combobox id="neutralCombobox" accent="neutral" label="Neutral" placeholder="Neutral"></z-combobox>
				<z-combobox id="primaryCombobox" accent="dom" label="Primary" placeholder="Primary"></z-combobox>
				<z-combobox id="secondaryCombobox" accent="sub" label="Secondary" placeholder="Secondary"></z-combobox>
			`,
			script: `
				for (const combobox of document.querySelectorAll('z-combobox')) {
				  combobox.options = frameworkOptions
				}
			`,
			wire: (root) => {
				const comboboxes = [
					queryPreview<ComboboxElementT>(root, '#neutralCombobox'),
					queryPreview<ComboboxElementT>(root, '#primaryCombobox'),
					queryPreview<ComboboxElementT>(root, '#secondaryCombobox')
				]

				for (const combobox of comboboxes) {
					combobox.options = FRAMEWORK_OPTIONS
				}
			}
		}),

		defineInteractiveExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities on the same scale as z-input, so a combobox and a text field sit on one baseline in a mixed form.',
			layout: ExampleLayout.stack,
			markup: `
				<z-combobox class="sizedCombobox" size="sm" label="Small" placeholder="Small"></z-combobox>
				<z-combobox class="sizedCombobox" size="md" label="Medium" placeholder="Medium"></z-combobox>
				<z-combobox class="sizedCombobox" size="lg" label="Large" placeholder="Large"></z-combobox>
			`,
			script: `
				for (const combobox of document.querySelectorAll('.sizedCombobox')) {
				  combobox.options = frameworkOptions
				}
			`,
			wire: (root) => {
				const comboboxes = queryAllPreview<ComboboxElementT>(root, '.sizedCombobox')
				for (const combobox of comboboxes) {
					combobox.options = FRAMEWORK_OPTIONS
				}
			}
		}),

		defineInteractiveExample({
			id: 'states',
			title: 'States',
			description:
				'Invalid, disabled, and the empty-match state. Search for "zzz" in the last one to see what a fruitless query looks like.',
			layout: ExampleLayout.stack,
			markup: `
				<z-combobox id="invalidCombobox" label="Invalid" is-invalid placeholder="Pick a framework"></z-combobox>
				<z-combobox id="disabledCombobox" label="Disabled" is-disabled placeholder="Unavailable"></z-combobox>
				<z-combobox id="matchCombobox" label="Try searching zzz" placeholder="Search frameworks…"></z-combobox>
			`,
			script: `
				invalidCombobox.options = frameworkOptions
				disabledCombobox.options = frameworkOptions
				matchCombobox.options = frameworkOptions
			`,
			wire: (root) => {
				const invalidCombobox = queryPreview<ComboboxElementT>(root, '#invalidCombobox')
				const disabledCombobox = queryPreview<ComboboxElementT>(root, '#disabledCombobox')
				const matchCombobox = queryPreview<ComboboxElementT>(root, '#matchCombobox')

				invalidCombobox.options = FRAMEWORK_OPTIONS
				disabledCombobox.options = FRAMEWORK_OPTIONS
				matchCombobox.options = FRAMEWORK_OPTIONS
			}
		}),

		defineInteractiveExample({
			id: 'in-a-field',
			title: 'Inside a field',
			description: 'The usual production shape — a visible label, standing guidance, and the combobox doing one job.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="Primary framework" description="Used to pick which starter templates we show you.">
				  <z-combobox id="fieldCombobox" accent="dom" placeholder="Search frameworks…"></z-combobox>
				</z-field>
			`,
			script: `
				document.querySelector('#fieldCombobox').options = frameworkOptions
			`,
			wire: (root) => {
				const fieldCombobox = queryPreview<ComboboxElementT>(root, '#fieldCombobox')
				fieldCombobox.options = FRAMEWORK_OPTIONS
			}
		})
	],

	attributes: [
		{ name: 'value', type: 'string', defaultValue: '—', description: 'The committed option’s value. Reflects, so it is both the seed and the live answer.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Accessible name for the field. Set for you inside a z-field.' },
		{ name: 'placeholder', type: 'string', defaultValue: 'Search…', description: 'Shown while the field is empty and nothing is selected.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Control density, on the same scale as z-input.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent family for the focus border and the selected row.' },
		{ name: 'is-invalid', type: 'boolean', defaultValue: '—', description: 'Paints the error border and sets aria-invalid on the field.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Blocks typing and opening, and removes the field from the tab order.' },
		{ name: 'is-inline', type: 'boolean', defaultValue: '—', description: 'Shrinks the field to its natural width instead of filling its container.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the combobox from layout.' }
	],

	properties: [
		{
			name: 'options',
			type: 'Array<{ value: string, label: string, isDisabled?: boolean }>',
			defaultValue: '[]',
			description: 'The full option list. Filtering happens against this in memory — reassign it to change what is searchable.'
		}
	],

	slots: [],

	events: [
		{ name: 'change', detail: '{ value: string }', description: 'Fires once when an option is committed. Typing and arrowing do not fire it.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The field carries role="combobox" with aria-expanded and aria-autocomplete="list"; the panel is a listbox of role="option" rows with aria-selected.',
		'Keyboard: typing filters, ↑/↓ move the active row, Enter commits it, Escape closes and clears the query without changing the value.',
		'Set `label` (or nest it in a z-field). A combobox with only a placeholder is unlabelled to a screen reader.',
		'is-invalid sets aria-invalid on the field as well as painting the border, so the failure is announced rather than only drawn.',
		'Filtering is case-insensitive substring matching on the visible label — the same text a user reads is the text they can search, with no hidden keyword index to guess at.',
		'The "No matches" row is real content rather than an empty panel, so the outcome of a search is always announced.'
	],

	related: [
		{ tag: 'z-select', route: '/c/forms/z-select', description: 'The same panel without typing, for shorter lists.' },
		{ tag: 'z-command', route: '/c/overlays/z-command', description: 'Filtering over actions rather than over a value.' },
		{ tag: 'z-input', route: '/c/forms/z-input', description: 'Free text, when the answer is not from a known list.' }
	]
}
