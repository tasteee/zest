import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundField = (): HTMLElement => {
	const field = document.createElement('z-field')
	field.setAttribute('label', 'Workspace name')
	field.setAttribute('description', 'Visible to everyone you invite.')

	const input = document.createElement('z-input')
	input.setAttribute('placeholder', 'Acme Inc.')
	field.append(input)

	return field
}

export const zFieldDoc: ComponentDocT = {
	tag: 'z-field',
	title: 'z-field',
	tagline: 'The label, the help text, and the error — one wrapper, one treatment, every control.',
	status: ComponentStatus.stable,

	description:
		'A form control on its own is only half a field. The other half is the flush-left label above it, the guidance underneath, and the error that replaces that guidance when something is wrong. `z-field` owns all three without overlaying the control or adding a shadow, and — critically — forwards its `label` onto the slotted control as an accessible name, because a shadow boundary breaks the ordinary `<label for>` association that would otherwise do this for free. Set `error` and the description gives way; clear it and the description returns.',

	playground: {
		buildElement: buildPlaygroundField,
		controlNames: ['label', 'description', 'error', 'is-required'],
		slotLabel: 'z-input'
	},

	usageGuidance: [
		'Use it for every deliberate form input. Bare controls belong in toolbars and search boxes, not in forms someone is filling out.',
		'`description` is standing guidance — why the field exists, what format it wants. It should be true before the user has typed anything.',
		'`error` replaces the description rather than stacking under it. Keep the message specific: "Must be at least 8 characters", not "Invalid".',
		'The label should name the thing, not instruct. "Email", not "Enter your email". The field already implies the verb.',
		'When an inline-labelled switch or checkbox shares a row with a top-labelled field, wrap it in `z-field is-label-reserved`. The empty label band aligns the controls without moving the compact label above its track.',
		'Set `is-required` once on z-field. It renders the asterisk and forwards the required state to controls that support native validation.',
		'One field, one control. If two inputs belong together — a date range, a first and last name — give each its own z-field rather than slotting both into one.'
	],

	anatomy: [
		{ name: 'label', description: 'The visible name, forwarded onto the slotted control as its accessible name.' },
		{ name: 'required marker', description: 'The asterisk after the label. Decorative — aria-hidden — because the control carries the real constraint.' },
		{ name: 'default slot', description: 'The control itself: z-input, z-select, z-textarea, z-checkbox, anything.' },
		{ name: 'description slot', description: 'Standing help text under the control. Hidden while an error is showing.' },
		{ name: 'error slot', description: 'The failure message, which takes the description’s place.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'A label and a control. This is the shape most fields take.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="Workspace name">
				  <z-input placeholder="Acme Inc."></z-input>
				</z-field>
			`
		}),

		defineMarkupExample({
			id: 'description',
			title: 'With guidance',
			description: 'Standing help text sits under the control, where it is read after the field rather than in front of it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="Workspace URL" description="Lowercase letters, numbers, and hyphens. This cannot be changed later.">
				  <z-input placeholder="acme"></z-input>
				</z-field>
			`
		}),

		defineMarkupExample({
			id: 'required',
			title: 'Required',
			description:
				'One attribute owns both signals: the field renders the asterisk and forwards the required state to the input for native validation.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="Full name" is-required>
				  <z-input placeholder="Ada Lovelace"></z-input>
				</z-field>
			`
		}),

		defineMarkupExample({
			id: 'error',
			title: 'Error',
			description:
				'Setting `error` replaces the description. Pair it with `invalid` on the control so the border and the message agree with each other.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="Password" description="At least 8 characters." error="Must be at least 8 characters.">
				  <z-input type="password" invalid value="short"></z-input>
				</z-field>
			`
		}),

		defineMarkupExample({
			id: 'any-control',
			title: 'Any control',
			description:
				'The label is forwarded onto whatever is slotted, so a select, a textarea, and a slider all get the same treatment as an input.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="Notes" description="Markdown is supported.">
				  <z-textarea is-auto-resize rows="2" placeholder="Anything the team should know"></z-textarea>
				</z-field>
				<z-field label="Retention" description="How long we keep deleted items.">
				  <z-slider min="1" max="90" value="30" does-show-value value-suffix=" days"></z-slider>
				</z-field>
			`
		}),

		defineMarkupExample({
			id: 'mixed-control-row',
			title: 'Mixed control row',
			description:
				'The input uses the visible label band. The switch keeps its label beside the track and reserves that same band empty, so both interactive rows start and end together.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row y="start" gap="md" style="width: 100%">
				  <z-field label="Server address">
				    <z-input placeholder="api.example.com"></z-input>
				  </z-field>
				  <z-field is-label-reserved>
				    <z-switch>Use TLS</z-switch>
				  </z-field>
				</wired-row>
			`
		}),

		defineInteractiveExample({
			id: 'live-validation',
			title: 'Driving the error from code',
			description:
				'`error` is a plain property, so validation is a one-line assignment. Clearing it on the next keystroke keeps the user from typing against a red field.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field id="slugField" label="Workspace URL" description="Lowercase letters, numbers, and hyphens." is-required>
				  <z-input id="slugInput" placeholder="acme-inc"></z-input>
				</z-field>
			`,
			script: `
				const slugField = document.querySelector('#slugField')
				const slugInput = document.querySelector('#slugInput')

				slugInput.addEventListener('change', (changeEvent) => {
				  const isValidSlug = /^[a-z0-9-]+$/.test(changeEvent.detail.value)
				  slugInput.invalid = !isValidSlug
				  slugField.error = isValidSlug ? '' : 'Lowercase letters, numbers, and hyphens only.'
				})
			`,
			wire: (root) => {
				const slugField = queryPreview<HTMLElement & { error: string }>(root, '#slugField')
				const slugInput = queryPreview<HTMLElement>(root, '#slugInput')

				const checkSlug = (value: string): boolean => {
					const isEmpty = value.trim().length === 0
					if (isEmpty) return true
					return /^[a-z0-9-]+$/.test(value)
				}

				slugInput.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value: string }>).detail
					const isValidSlug = checkSlug(detail.value)

					if (isValidSlug) slugInput.removeAttribute('invalid')
					if (!isValidSlug) slugInput.setAttribute('invalid', '')
					slugField.error = isValidSlug ? '' : 'Lowercase letters, numbers, and hyphens only.'
				})

				slugInput.addEventListener('input', () => {
					slugInput.removeAttribute('invalid')
					slugField.error = ''
				})
			}
		}),

		defineMarkupExample({
			id: 'rich-messages',
			title: 'Rich messages',
			description:
				'The `description` and `error` slots override their attributes, for the cases where the message needs a link or emphasis rather than plain text.',
			layout: ExampleLayout.stack,
			markup: `
				<z-field label="API key">
				  <z-input type="password" placeholder="sk-…"></z-input>
				  <span slot="description">Find this in <z-link href="#">Settings → Developers</z-link>.</span>
				</z-field>
			`
		}),

		defineMarkupExample({
			id: 'form',
			title: 'A form',
			description: 'Several fields stacked. Consistent label placement is what makes a form scannable — the eye only has to learn the rhythm once.',
			layout: ExampleLayout.stack,
			markup: `
				<wired-column gap="md">
				  <z-field label="Name" is-required>
				    <z-input placeholder="Ada Lovelace"></z-input>
				  </z-field>
				  <z-field label="Email" description="We only use this for billing receipts." is-required>
				    <z-input type="email" placeholder="ada@example.com"></z-input>
				  </z-field>
				  <z-field label="Role">
				    <z-input placeholder="Engineering"></z-input>
				  </z-field>
				</wired-column>
			`
		})
	],

	attributes: [
		{ name: 'label', type: 'string', defaultValue: '—', description: 'The visible name, also forwarded onto the slotted control as its accessible name.' },
		{ name: 'description', type: 'string', defaultValue: '—', description: 'Standing help text under the control. Hidden while an error is set.' },
		{ name: 'error', type: 'string', defaultValue: '—', description: 'The failure message. Replaces the description while present.' },
		{ name: 'is-required', type: 'boolean', defaultValue: '—', description: 'Renders the required marker and forwards required state to a supporting slotted control.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Control-row height. Match it to the size of the slotted control.' },
		{ name: 'is-label-reserved', type: 'boolean', defaultValue: '—', description: 'Keeps an empty label band so an inline-labelled control or unlabelled action lines up with top-labelled fields.' },
		{ name: 'is-label-hidden', type: 'boolean', defaultValue: '—', description: 'Hides the label visually while still forwarding it as the accessible name.' }
	],

	properties: [],

	slots: [
		{ name: '(default)', description: 'The control this field wraps.' },
		{ name: 'description', description: 'Rich help text, overriding the description attribute.' },
		{ name: 'error', description: 'A rich error message, overriding the error attribute.' }
	],

	events: [],

	cssVariables: [],

	accessibilityNotes: [
		'Label forwarding is the whole point: a custom element’s shadow root means an external <label for="…"> never reaches the real input, so the field assigns its label to the control directly.',
		'Forwarding is polite — if the control already carries a label, aria-label, or aria-labelledby, that wins and the field leaves it alone.',
		'The required asterisk is aria-hidden. Screen readers should learn the constraint from the control’s own required state, not from punctuation.',
		'Use is-label-hidden rather than dropping the label when the surrounding layout already names the field. A hidden label is still an announced one.',
		'Keep error text specific and actionable. "Invalid" tells the user only that they failed, not what would succeed.'
	],

	related: [
		{ tag: 'z-input', route: '/c/forms/z-input', description: 'The control most often slotted here.' },
		{ tag: 'z-label', route: '/c/foundation/z-label', description: 'A bare label, for layouts that build their own field chrome.' },
		{ tag: 'z-alert', route: '/c/overlays/z-alert', description: 'For a form-level error rather than a field-level one.' }
	]
}
