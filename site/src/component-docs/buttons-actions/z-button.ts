import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundButton = (): HTMLElement => {
	const button = document.createElement('z-button')
	button.setAttribute('tone', 'primary')
	button.textContent = 'Save changes'
	return button
}

export const zButtonDoc: ComponentDocT = {
	tag: 'z-button',
	title: 'z-button',
	tagline: 'The primary action control — three independent axes of tone, treatment, and size.',
	status: ComponentStatus.stable,

	description:
		'z-button separates what a button means from how loud it looks. `tone` picks the colour family, `kind` picks the visual treatment, and `size` picks the density. The three compose freely, so a quiet destructive action and a loud one are the same component with a different `kind`. Every tone carries the same weight at the same `kind`, which is what keeps a row of mixed-tone buttons from looking like it was assembled by accident.',

	playground: {
		buildElement: buildPlaygroundButton,
		controlNames: [],
		slotLabel: 'Save changes'
	},

	usageGuidance: [
		'Exactly one solid button per view or per dialog. The moment a screen has two, neither is the primary action anymore.',
		'Reach for tone to encode meaning, not decoration: danger for anything destructive, success only for a confirming action, neutral for everything else.',
		'Outline and ghost are the workhorses. Most buttons in a dense interface should be one of the two, with a single solid button carrying the main action.',
		'Use z-link, not a ghost button, when the target is a destination rather than an action. Navigation should look like navigation.'
	],

	anatomy: [
		{ name: 'label', description: 'The text, set either through the `label` attribute or by slotting children.' },
		{ name: 'default slot', description: 'Anything you place inside — icons, text, or both. Overridden when `label` is set.' },
		{
			name: 'spinner',
			description:
				'Added ahead of the label while `is-loading` is set. The label stays visible, and the underlying button is disabled for the duration.'
		}
	],

	examples: [
		defineMarkupExample({
			id: 'tones',
			title: 'Tones',
			description:
				'Six colour families. All of them are the same weight at the same kind, so tone reads as meaning rather than emphasis.',
			markup: `
				<z-button tone="neutral">Neutral</z-button>
				<z-button tone="primary">Primary</z-button>
				<z-button tone="secondary">Secondary</z-button>
				<z-button tone="success">Success</z-button>
				<z-button tone="warning">Warning</z-button>
				<z-button tone="danger">Danger</z-button>
			`
		}),

		defineMarkupExample({
			id: 'kinds',
			title: 'Kinds',
			description:
				'The treatment axis, from loudest to quietest. Solid claims the page, plain disappears into it until you hover.',
			markup: `
				<z-button tone="primary" kind="solid">Solid</z-button>
				<z-button tone="primary" kind="outline">Outline</z-button>
				<z-button tone="primary" kind="soft">Soft</z-button>
				<z-button tone="primary" kind="ghost">Ghost</z-button>
				<z-button tone="primary" kind="plain">Plain</z-button>
			`
		}),

		defineMarkupExample({
			id: 'tone-kind-matrix',
			title: 'Tone and kind together',
			description:
				'The two axes are fully independent. This is the whole surface of the component in one grid — every cell is a valid combination.',
			layout: ExampleLayout.stack,
			markup: `
				<z-row gap="3">
				  <z-button tone="neutral" kind="solid">Neutral</z-button>
				  <z-button tone="neutral" kind="outline">Neutral</z-button>
				  <z-button tone="neutral" kind="soft">Neutral</z-button>
				  <z-button tone="neutral" kind="ghost">Neutral</z-button>
				</z-row>
				<z-row gap="3">
				  <z-button tone="primary" kind="solid">Primary</z-button>
				  <z-button tone="primary" kind="outline">Primary</z-button>
				  <z-button tone="primary" kind="soft">Primary</z-button>
				  <z-button tone="primary" kind="ghost">Primary</z-button>
				</z-row>
				<z-row gap="3">
				  <z-button tone="success" kind="solid">Success</z-button>
				  <z-button tone="success" kind="outline">Success</z-button>
				  <z-button tone="success" kind="soft">Success</z-button>
				  <z-button tone="success" kind="ghost">Success</z-button>
				</z-row>
				<z-row gap="3">
				  <z-button tone="danger" kind="solid">Danger</z-button>
				  <z-button tone="danger" kind="outline">Danger</z-button>
				  <z-button tone="danger" kind="soft">Danger</z-button>
				  <z-button tone="danger" kind="ghost">Danger</z-button>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities. Keep one size per cluster — mixed sizes in a single row read as a mistake.',
			markup: `
				<z-button tone="primary" size="small">Small</z-button>
				<z-button tone="primary" size="medium">Medium</z-button>
				<z-button tone="primary" size="large">Large</z-button>
			`
		}),

		defineMarkupExample({
			id: 'icons',
			title: 'With icons',
			description:
				'Icons go in the default slot alongside the label. There is no icon attribute on purpose: slotting means you own the SVG, its size, and its position.',
			markup: `
				<z-button tone="primary">
				  ${Icons.plus} New project
				</z-button>

				<z-button kind="outline">
				  ${Icons.download} Export
				</z-button>

				<z-button kind="ghost">
				  Continue ${Icons.arrowRight}
				</z-button>
			`
		}),

		defineMarkupExample({
			id: 'label-attribute',
			title: 'Label attribute',
			description:
				'For plain text buttons, `label` avoids a slot round-trip. It wins over slotted children, so never set both.',
			markup: `
				<z-button tone="primary" label="Publish"></z-button>
				<z-button kind="outline" label="Save draft"></z-button>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description:
				'Disabled buttons drop their fill and stop taking pointer or keyboard events. Prefer explaining why an action is unavailable over silently disabling it.',
			markup: `
				<z-button tone="primary" is-disabled>Solid</z-button>
				<z-button kind="outline" is-disabled>Outline</z-button>
				<z-button kind="ghost" is-disabled>Ghost</z-button>
			`
		}),

		defineInteractiveExample({
			id: 'loading',
			title: 'Loading',
			description:
				'`is-loading` adds a spinner ahead of the label and disables the underlying button, so you never need to also set `is-disabled`. Keep the label meaningful — it stays visible. Click Save to watch a round trip.',
			layout: ExampleLayout.center,
			markup: `
				<z-button tone="primary" id="saveButton">Save changes</z-button>
			`,
			script: `
				const saveButton = document.querySelector('#saveButton')

				saveButton.addEventListener('click', async () => {
				  saveButton.setAttribute('is-loading', '')
				  await saveRecord()
				  saveButton.removeAttribute('is-loading')
				})
			`,
			wire: (root) => {
				const saveButton = queryPreview<HTMLElement>(root, '#saveButton')

				saveButton.addEventListener('click', () => {
					const isAlreadySaving = saveButton.hasAttribute('is-loading')
					if (isAlreadySaving) return

					saveButton.setAttribute('is-loading', '')
					window.setTimeout(() => {
						saveButton.removeAttribute('is-loading')
					}, 1600)
				})
			}
		}),

		defineMarkupExample({
			id: 'full-width',
			title: 'Full width',
			description:
				'`is-full-width` stretches the button to its container. Standard for the submit action in a narrow form or a mobile sheet.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="3" style="width: 320px">
				  <z-button tone="primary" is-full-width>Create account</z-button>
				  <z-button kind="ghost" is-full-width>I already have one</z-button>
				</z-column>
			`
		}),

		defineInteractiveExample({
			id: 'destructive-confirm',
			title: 'Destructive confirmation',
			description:
				'The pattern behind every "are you sure": the danger action is the quiet one until it is confirmed, and cancel stays visually available throughout.',
			layout: ExampleLayout.center,
			markup: `
				<z-row gap="3" id="confirmRow">
				  <z-button tone="danger" kind="outline" id="deleteButton">
				    ${Icons.trash} Delete workspace
				  </z-button>
				</z-row>
			`,
			script: `
				const deleteButton = document.querySelector('#deleteButton')

				deleteButton.addEventListener('click', () => {
				  // swap the quiet trigger for an explicit confirm pair
				  showConfirmationStep()
				})
			`,
			wire: (root) => {
				const confirmRow = queryPreview<HTMLElement>(root, '#confirmRow')
				const deleteButton = queryPreview<HTMLElement>(root, '#deleteButton')

				const restoreTrigger = (): void => {
					confirmRow.replaceChildren(deleteButton)
				}

				const showConfirmationStep = (): void => {
					const confirmButton = document.createElement('z-button')
					confirmButton.setAttribute('tone', 'danger')
					confirmButton.textContent = 'Yes, delete it'

					const cancelButton = document.createElement('z-button')
					cancelButton.setAttribute('kind', 'ghost')
					cancelButton.textContent = 'Cancel'

					confirmButton.addEventListener('click', () => {
						confirmButton.setAttribute('is-loading', '')
						window.setTimeout(restoreTrigger, 1200)
					})
					cancelButton.addEventListener('click', restoreTrigger)

					confirmRow.replaceChildren(confirmButton, cancelButton)
				}

				deleteButton.addEventListener('click', showConfirmationStep)
			}
		}),

		defineInteractiveExample({
			id: 'form-submit',
			title: 'Inside a form',
			description:
				'`type="submit"` participates in native form submission, so Enter in a text field submits exactly as it would with a plain button.',
			layout: ExampleLayout.fill,
			markup: `
				<form id="inviteForm">
				  <z-row gap="3" align="end">
				    <z-input placeholder="teammate@company.com" label="Email"></z-input>
				    <z-button tone="primary" type="submit">Send invite</z-button>
				  </z-row>
				</form>
			`,
			script: `
				const inviteForm = document.querySelector('#inviteForm')

				inviteForm.addEventListener('submit', (submitEvent) => {
				  submitEvent.preventDefault()
				  sendInvite()
				})
			`,
			wire: (root) => {
				const inviteForm = queryPreview<HTMLFormElement>(root, '#inviteForm')
				const submitButton = queryPreview<HTMLElement>(root, 'z-button[type="submit"]')

				inviteForm.addEventListener('submit', (submitEvent) => {
					submitEvent.preventDefault()

					submitButton.setAttribute('is-loading', '')
					window.setTimeout(() => {
						submitButton.removeAttribute('is-loading')
						submitButton.setAttribute('tone', 'success')
						submitButton.textContent = 'Invite sent'
					}, 1200)
				})
			}
		})
	],

	attributes: [
		{
			name: 'tone',
			type: 'neutral | primary | secondary | success | warning | danger',
			defaultValue: 'neutral',
			description: 'Colour family. Encodes what the action means, not how loud it is.'
		},
		{
			name: 'kind',
			type: 'solid | outline | ghost | soft | plain',
			defaultValue: 'solid',
			description: 'Visual treatment, from loudest to quietest.'
		},
		{ name: 'size', type: 'small | medium | large', defaultValue: 'medium', description: 'Control density.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Text content. Takes precedence over slotted children.' },
		{ name: 'type', type: 'button | submit | reset', defaultValue: 'button', description: 'Native button type for form participation.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Blocks pointer and keyboard interaction.' },
		{
			name: 'is-loading',
			type: 'boolean',
			defaultValue: '—',
			description: 'Shows a spinner and blocks interaction. No need to also disable.'
		},
		{ name: 'is-full-width', type: 'boolean', defaultValue: '—', description: 'Stretches the button to fill its container.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the button from layout.' }
	],

	properties: [],

	slots: [
		{
			name: '(default)',
			description: 'Button content — label text, icons, or both. Ignored when the label attribute is set.'
		}
	],

	events: [
		{
			name: 'click',
			detail: '—',
			description: 'The native click event. Suppressed while is-loading or is-disabled is set.'
		}
	],

	cssVariables: [],

	accessibilityNotes: [
		'Renders a real native button, so Enter and Space activate it and it lands in the tab order without any extra work.',
		'An icon-only button has no accessible name from its SVG — give it an aria-label, or keep a text label alongside the icon.',
		'is-loading sets the native disabled attribute. That blocks the click, but it also drops the button out of the tab order and announces nothing about why — if the wait is long enough to notice, put the status in a live region nearby.',
		'The component draws no focus style of its own, so keyboard focus falls back to the browser default ring. That default is not guaranteed to have adequate contrast against every tone, and unlike z-toggle there is no :focus-visible rule here to lean on.'
	],

	related: [
		{ tag: 'z-button-group', route: '/c/buttons-actions/z-button-group', description: 'Join buttons into a segmented control.' },
		{ tag: 'z-toggle', route: '/c/buttons-actions/z-toggle', description: 'A button that stays pressed.' },
		{ tag: 'z-link', route: '/c/buttons-actions/z-link', description: 'For navigation rather than action.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'An action strip with roving focus.' }
	]
}
