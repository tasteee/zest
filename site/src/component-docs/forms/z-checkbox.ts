import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
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
	tagline: 'A square that fills when it means yes.',
	status: ComponentStatus.stable,

	description:
		'Unchecked is a hairline outline; checked fills with the accent and strikes a checkmark through it. The slotted label sits to the right and is part of the hit area, so the whole row is clickable. `is-checked` reflects, which makes the attribute both the way you set the initial state and the way you read the current one.',

	playground: {
		buildElement: buildPlaygroundCheckbox,
		controlNames: ['size', 'accent', 'is-checked', 'disabled'],
		slotLabel: 'Email me about product updates'
	},

	usageGuidance: [
		'Use a checkbox when each option is independent. When exactly one of several must win, that is `z-radio-group`.',
		'A lone checkbox is a yes/no that only matters on submit — terms accepted, subscribe to the newsletter. If the change takes effect the instant it is made, use `z-switch` instead.',
		'Write the label as the thing being turned on, in the affirmative. "Email me about updates" reads clearly checked or not; "Do not email me" checked is a puzzle.',
		'The box stays compact, but its clickable label occupies the shared control height. Beside a top-labelled input, use `z-field is-label-reserved` around the checkbox to align their control bands.'
	],

	anatomy: [
		{ name: 'box', description: 'The square. Hairline border when off, accent fill when on.' },
		{ name: 'check', description: 'The stroked tick, revealed with a short scale as the box fills.' },
		{ name: 'default slot', description: 'The label. Inside the clickable label element, so clicking the text toggles the box.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'The unchecked and checked states.',
			layout: ExampleLayout.stack,
			markup: `
				<z-checkbox>Unchecked</z-checkbox>
				<z-checkbox is-checked>Checked</z-checkbox>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'Three accent families for the fill. The accent is invisible until the box is checked.',
			markup: `
				<z-checkbox accent="neutral" is-checked>Neutral</z-checkbox>
				<z-checkbox accent="dom" is-checked>Primary</z-checkbox>
				<z-checkbox accent="sub" is-checked>Secondary</z-checkbox>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities. The box and its label scale together.',
			markup: `
				<z-checkbox size="sm" is-checked>Small</z-checkbox>
				<z-checkbox size="md" is-checked>Medium</z-checkbox>
				<z-checkbox size="lg" is-checked>Large</z-checkbox>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description: 'Disabled in both states. The checked one stays legible — the user still needs to see what is set, even when they cannot change it.',
			markup: `
				<z-checkbox disabled>Off and disabled</z-checkbox>
				<z-checkbox is-checked disabled>On and disabled</z-checkbox>
			`
		}),

		defineInteractiveExample({
			id: 'change-event',
			title: 'Reading the state',
			description: '`change` carries the new checked state and the checkbox’s `value`, which is what lets one handler serve a whole group.',
			layout: ExampleLayout.stack,
			markup: `
				<z-checkbox id="termsCheckbox" accent="dom" value="terms">I accept the terms of service</z-checkbox>
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
		})
	],

	attributes: [
		{ name: 'is-checked', type: 'boolean', defaultValue: '—', description: 'The on state. Reflects, so it is both the initial value and the live one.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks pointer and keyboard interaction.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Size of the box and its label text.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent family of the checked fill.' },
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
		'The slotted label is inside the <label> element, which is what makes the whole row a hit target rather than just the 18px box.',
		'Never rely on the fill colour alone. The checkmark itself is the state indicator, which is why it is a stroked shape rather than a tinted square.'
	],

	related: [
		{ tag: 'z-switch', route: '/c/forms/z-switch', description: 'When the change takes effect immediately.' },
		{ tag: 'z-radio-group', route: '/c/forms/z-radio-group', description: 'When exactly one option must win.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label and error treatment around a group of checkboxes.' }
	]
}
