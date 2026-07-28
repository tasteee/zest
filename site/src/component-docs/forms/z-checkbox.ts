import { defineInteractiveExample, defineMarkupExample, queryAllPreview, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundCheckbox = (): HTMLElement => {
	const checkbox = document.createElement('z-checkbox')
	checkbox.setAttribute('is-checked', '')
	checkbox.textContent = 'Email me about product updates'
	return checkbox
}

export const zCheckboxDoc: ComponentDocT = {
	tag: 'z-checkbox',
	title: 'z-checkbox',
	tagline: 'A square that fills when it means yes — including the half-yes.',
	status: ComponentStatus.stable,

	description:
		'Unchecked is a hairline outline; checked fills with the accent and strikes a checkmark through it. The slotted label sits to the right and is part of the hit area, so the whole row is clickable. `is-checked` reflects, which makes the attribute both the way you set the initial state and the way you read the current one. `is-indeterminate` renders the third state — the one a parent checkbox needs when only some of its children are on.',

	playground: {
		buildElement: buildPlaygroundCheckbox,
		controlNames: ['size', 'tone', 'is-checked', 'is-indeterminate', 'is-disabled', 'is-block'],
		slotLabel: 'Email me about product updates'
	},

	usageGuidance: [
		'Use a checkbox when each option is independent. When exactly one of several must win, that is `z-radio-group`.',
		'A lone checkbox is a yes/no that only matters on submit — terms accepted, subscribe to the newsletter. If the change takes effect the instant it is made, use `z-switch` instead.',
		'Write the label as the thing being turned on, in the affirmative. "Email me about updates" reads clearly checked or not; "Do not email me" checked is a puzzle.',
		'Indeterminate is a display state, not a value. A checkbox is never indeterminate because the user clicked it — you set it because its children disagree.',
		'`is-block` when the checkbox owns its own row in a stacked list; leave it off when several sit side by side.'
	],

	anatomy: [
		{ name: 'box', description: 'The square. Hairline border when off, accent fill when on or indeterminate.' },
		{ name: 'check', description: 'The stroked tick, revealed with a short scale as the box fills.' },
		{ name: 'dash', description: 'The indeterminate bar, shown in place of the tick.' },
		{ name: 'default slot', description: 'The label. Inside the clickable label element, so clicking the text toggles the box.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Off, on, and the third state. All three are one attribute away from each other.',
			layout: ExampleLayout.stack,
			markup: `
				<z-checkbox>Unchecked</z-checkbox>
				<z-checkbox is-checked>Checked</z-checkbox>
				<z-checkbox is-indeterminate>Indeterminate</z-checkbox>
			`
		}),

		defineMarkupExample({
			id: 'tones',
			title: 'Tones',
			description: 'Three accent families for the fill. The tone is invisible until the box is checked.',
			markup: `
				<z-checkbox tone="neutral" is-checked>Neutral</z-checkbox>
				<z-checkbox tone="primary" is-checked>Primary</z-checkbox>
				<z-checkbox tone="secondary" is-checked>Secondary</z-checkbox>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities. The label type scale stays constant — only the box changes — so a dense list still reads at full size.',
			markup: `
				<z-checkbox size="small" is-checked>Small</z-checkbox>
				<z-checkbox size="medium" is-checked>Medium</z-checkbox>
				<z-checkbox size="large" is-checked>Large</z-checkbox>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description: 'Disabled in both states. The checked one stays legible — the user still needs to see what is set, even when they cannot change it.',
			markup: `
				<z-checkbox is-disabled>Off and disabled</z-checkbox>
				<z-checkbox is-checked is-disabled>On and disabled</z-checkbox>
			`
		}),

		defineMarkupExample({
			id: 'block',
			title: 'Stacked list',
			description: '`is-block` gives each checkbox its own row, so the boxes align down a single edge and the list scans vertically.',
			layout: ExampleLayout.stack,
			markup: `
				<z-checkbox is-block is-checked>Weekly digest</z-checkbox>
				<z-checkbox is-block>Product announcements</z-checkbox>
				<z-checkbox is-block>Security alerts</z-checkbox>
			`
		}),

		defineInteractiveExample({
			id: 'change-event',
			title: 'Reading the state',
			description: '`change` carries the new checked state and the checkbox’s `value`, which is what lets one handler serve a whole group.',
			layout: ExampleLayout.stack,
			markup: `
				<z-checkbox id="termsCheckbox" tone="primary" value="terms">I accept the terms of service</z-checkbox>
				<z-text size="sm" color="muted" id="termsStatus">Not accepted.</z-text>
			`,
			script: `
				const termsCheckbox = document.querySelector('#termsCheckbox')

				termsCheckbox.addEventListener('change', (changeEvent) => {
				  setSubmitEnabled(changeEvent.detail.checked)
				})
			`,
			wire: (root) => {
				const termsCheckbox = queryPreview<HTMLElement>(root, '#termsCheckbox')
				const termsStatus = queryPreview<HTMLElement>(root, '#termsStatus')

				termsCheckbox.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ checked: boolean; value?: string }>).detail
					termsStatus.textContent = detail.checked ? 'Accepted.' : 'Not accepted.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'select-all',
			title: 'Select all',
			description:
				'The reason indeterminate exists. The parent is checked when every child is, unchecked when none are, and indeterminate in between — and clicking it forces every child to match.',
			layout: ExampleLayout.stack,
			markup: `
				<z-checkbox id="allScopes" is-block tone="primary">All scopes</z-checkbox>
				<z-column gap="xs" style="padding-left: 1.75rem">
				  <z-checkbox is-block class="scope" value="read">Read</z-checkbox>
				  <z-checkbox is-block class="scope" value="write">Write</z-checkbox>
				  <z-checkbox is-block class="scope" value="delete">Delete</z-checkbox>
				</z-column>
			`,
			script: `
				const allScopes = document.querySelector('#allScopes')
				const scopes = document.querySelectorAll('.scope')

				allScopes.addEventListener('change', (changeEvent) => {
				  for (const scope of scopes) scope.isChecked = changeEvent.detail.checked
				})

				for (const scope of scopes) {
				  scope.addEventListener('change', () => {
				    const checkedCount = [...scopes].filter((one) => one.isChecked).length
				    allScopes.isChecked = checkedCount === scopes.length
				    allScopes.isIndeterminate = checkedCount > 0 && checkedCount < scopes.length
				  })
				}
			`,
			wire: (root) => {
				type CheckboxElementT = HTMLElement & { isChecked: boolean; isIndeterminate: boolean }

				const allScopes = queryPreview<CheckboxElementT>(root, '#allScopes')
				const scopes = queryAllPreview<CheckboxElementT>(root, '.scope')

				const syncParent = (): void => {
					const checkedScopes = scopes.filter((scope) => scope.isChecked)
					const isEveryChecked = checkedScopes.length === scopes.length
					const isSomeChecked = checkedScopes.length > 0 && !isEveryChecked

					allScopes.isChecked = isEveryChecked
					allScopes.isIndeterminate = isSomeChecked
				}

				allScopes.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ checked: boolean }>).detail
					for (const scope of scopes) {
						scope.isChecked = detail.checked
					}
					allScopes.isIndeterminate = false
				})

				for (const scope of scopes) {
					scope.addEventListener('change', syncParent)
				}
			}
		})
	],

	attributes: [
		{ name: 'is-checked', type: 'boolean', defaultValue: '—', description: 'The on state. Reflects, so it is both the initial value and the live one.' },
		{ name: 'is-indeterminate', type: 'boolean', defaultValue: '—', description: 'The third state, for a parent whose children disagree. Sets aria-checked="mixed".' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Blocks pointer and keyboard interaction.' },
		{ name: 'is-block', type: 'boolean', defaultValue: '—', description: 'Makes the checkbox fill its row rather than sit inline.' },
		{ name: 'size', type: 'small | medium | large', defaultValue: 'medium', description: 'Size of the box. The label scale is unchanged.' },
		{ name: 'tone', type: 'neutral | primary | secondary', defaultValue: 'neutral', description: 'Accent family of the checked fill.' },
		{ name: 'name', type: 'string', defaultValue: '—', description: 'Name passed to the inner input for form submission.' },
		{ name: 'value', type: 'string', defaultValue: '—', description: 'The value submitted when checked, and echoed back in the change event.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the checkbox from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The label. Inside the clickable region, so the text toggles the box.' }],

	events: [
		{ name: 'change', detail: '{ checked: boolean, value?: string }', description: 'Fires after every state change, carrying the new value.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'A real input[type=checkbox] drives the control, so it is focusable, Space toggles it, and it sits in the tab order naturally.',
		'The visible box is aria-hidden — assistive technology reads the input, not the drawing.',
		'Indeterminate sets aria-checked="mixed", which is announced as a partial state rather than as unchecked.',
		'The slotted label is inside the <label> element, which is what makes the whole row a hit target rather than just the 18px box.',
		'Never rely on the fill colour alone. The checkmark itself is the state indicator, which is why it is a stroked shape rather than a tinted square.'
	],

	related: [
		{ tag: 'z-switch', route: '/c/forms/z-switch', description: 'When the change takes effect immediately.' },
		{ tag: 'z-radio-group', route: '/c/forms/z-radio-group', description: 'When exactly one option must win.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label and error treatment around a group of checkboxes.' }
	]
}
