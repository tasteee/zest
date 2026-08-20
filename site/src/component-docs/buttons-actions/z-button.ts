import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundButton = (): HTMLElement => {
	const button = document.createElement('z-button')
	button.setAttribute('accent', 'dom')
	button.textContent = 'Save changes'
	return button
}

export const zButtonDoc: ComponentDocT = {
	tag: 'z-button',
	title: 'z-button',
	tagline: 'The action control — neutral by default, with explicit accents when emphasis requires them.',
	status: ComponentStatus.stable,

	description:
		'z-button separates meaning from emphasis. `kind` picks the visual treatment and `size` picks the density. With no accent it is neutral; explicit `dom` and `sub` accents use their purple and pink families, while status accents communicate success, warning, or error.',

	playground: {
		buildElement: buildPlaygroundButton,
		controlNames: [],
		slotLabel: 'Save changes'
	},

	usageGuidance: [
		'Exactly one solid button per view or per dialog. The moment a screen has two, neither is the primary action anymore.',
		'Leave temporary and supporting actions neutral. Use dom or sub for deliberate brand emphasis, and status accents only when they communicate status.',
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
			id: 'accents',
			title: 'Action accents',
			description:
				'Neutral is the default. Explicit dom and sub values use the purple and pink accent families.',
			markup: `
				<z-button accent="neutral">Neutral</z-button>
				<z-button accent="dom">Dom</z-button>
				<z-button accent="sub">Sub</z-button>
				<z-button accent="success">Success</z-button>
				<z-button accent="warning">Warning</z-button>
				<z-button accent="error">Danger</z-button>
			`
		}),

		defineMarkupExample({
			id: 'kinds',
			title: 'Kinds',
			description:
				'The treatment axis, from loudest to quietest. Solid claims the page, plain disappears into it until you hover.',
			markup: `
				<z-button accent="dom" kind="solid">Solid</z-button>
				<z-button accent="dom" kind="outline">Outline</z-button>
				<z-button accent="dom" kind="soft">Soft</z-button>
				<z-button accent="dom" kind="ghost">Ghost</z-button>
				<z-button accent="dom" kind="plain">Plain</z-button>
			`
		}),

		defineMarkupExample({
			id: 'accent-kind-matrix',
			title: 'Accent and kind together',
			description:
				'The two axes are fully independent. This is the whole surface of the component in one grid — every cell is a valid combination.',
			layout: ExampleLayout.stack,
			markup: `
				<wired-row gap="sm">
				  <z-button accent="neutral" kind="solid">Neutral</z-button>
				  <z-button accent="neutral" kind="outline">Neutral</z-button>
				  <z-button accent="neutral" kind="soft">Neutral</z-button>
				  <z-button accent="neutral" kind="ghost">Neutral</z-button>
				</wired-row>
				<wired-row gap="sm">
				  <z-button accent="dom" kind="solid">Primary</z-button>
				  <z-button accent="dom" kind="outline">Primary</z-button>
				  <z-button accent="dom" kind="soft">Primary</z-button>
				  <z-button accent="dom" kind="ghost">Primary</z-button>
				</wired-row>
				<wired-row gap="sm">
				  <z-button accent="success" kind="solid">Success</z-button>
				  <z-button accent="success" kind="outline">Success</z-button>
				  <z-button accent="success" kind="soft">Success</z-button>
				  <z-button accent="success" kind="ghost">Success</z-button>
				</wired-row>
				<wired-row gap="sm">
				  <z-button accent="error" kind="solid">Danger</z-button>
				  <z-button accent="error" kind="outline">Danger</z-button>
				  <z-button accent="error" kind="soft">Danger</z-button>
				  <z-button accent="error" kind="ghost">Danger</z-button>
				</wired-row>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities. Keep one size per cluster — mixed sizes in a single row read as a mistake.',
			markup: `
				<z-button accent="dom" size="sm">Small</z-button>
				<z-button accent="dom" size="md">Medium</z-button>
				<z-button accent="dom" size="lg">Large</z-button>
			`
		}),

		defineMarkupExample({
			id: 'icons',
			title: 'With icons',
			description:
				'Icons go in the default slot alongside the label. There is no icon attribute on purpose: slotting means you own the SVG, its size, and its position.',
			markup: `
				<z-button accent="dom">
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
				<z-button accent="dom" label="Publish"></z-button>
				<z-button kind="outline" label="Save draft"></z-button>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description:
				'Disabled buttons drop their fill and stop taking pointer or keyboard events. Prefer explaining why an action is unavailable over silently disabling it.',
			markup: `
				<z-button accent="dom" disabled>Solid</z-button>
				<z-button kind="outline" disabled>Outline</z-button>
				<z-button kind="ghost" disabled>Ghost</z-button>
			`
		}),

		defineInteractiveExample({
			id: 'loading',
			title: 'Loading',
			description:
				'`is-loading` adds a spinner ahead of the label and disables the underlying button, so you never need to also set `disabled`. Keep the label meaningful — it stays visible. Click Save to watch a round trip.',
			layout: ExampleLayout.center,
			markup: `
				<z-button accent="dom" id="saveButton">Save changes</z-button>
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
			id: 'is-full-width',
			title: 'Full width',
			description:
				'`is-full-width` stretches the button to its container. Standard for the submit action in a narrow form or a mobile sheet.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="sm" style="width: 320px">
				  <z-button accent="dom" is-full-width>Create account</z-button>
				  <z-button kind="ghost" is-full-width>I already have one</z-button>
				</wired-column>
			`
		}),

		defineInteractiveExample({
			id: 'destructive-confirm',
			title: 'Destructive confirmation',
			description:
				'The pattern behind every "are you sure": the danger action is the quiet one until it is confirmed, and cancel stays visually available throughout.',
			layout: ExampleLayout.center,
			markup: `
				<wired-row gap="sm" id="confirmRow">
				  <z-button accent="error" kind="outline" id="deleteButton">
				    ${Icons.trash} Delete workspace
				  </z-button>
				</wired-row>
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
					confirmButton.setAttribute('accent', 'error')
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
				  <wired-row gap="sm" y="end">
				    <z-input placeholder="teammate@company.com" label="Email"></z-input>
				    <z-button accent="dom" type="submit">Send invite</z-button>
				  </wired-row>
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
						submitButton.setAttribute('accent', 'success')
						submitButton.textContent = 'Invite sent'
					}, 1200)
				})
			}
		})
	],

	attributes: [
		{
			name: 'accent',
			type: 'neutral | dom | sub | success | warning | error',
			defaultValue: 'neutral',
			description: 'Accent family. Defaults to neutral; dom and sub apply purple and pink explicitly.'
		},
		{
			name: 'kind',
			type: 'solid | outline | ghost | soft | plain',
			defaultValue: 'solid',
			description: 'Visual treatment, from loudest to quietest.'
		},
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Control density.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Text content. Takes precedence over slotted children.' },
		{ name: 'type', type: 'button | submit | reset', defaultValue: 'button', description: 'Native button type for form participation.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks pointer and keyboard interaction.' },
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
			description: 'The native click event. Suppressed while is-loading or disabled is set.'
		}
	],

	cssVariables: [],

	accessibilityNotes: [
		'Renders a real native button, so Enter and Space activate it and it lands in the tab order without any extra work.',
		'An icon-only button has no accessible name from its SVG — give it an aria-label, or keep a text label alongside the icon.',
		'is-loading sets the native disabled attribute. That blocks the click, but it also drops the button out of the tab order and announces nothing about why — if the wait is long enough to notice, put the status in a live region nearby.',
		'Keyboard focus uses a theme-aware focus-visible ring without showing the ring for pointer clicks.'
	],

	related: [
		{ tag: 'z-button-group', route: '/c/buttons-actions/z-button-group', description: 'Join buttons into a segmented control.' },
		{ tag: 'z-toggle', route: '/c/buttons-actions/z-toggle', description: 'A button that stays pressed.' },
		{ tag: 'z-link', route: '/c/buttons-actions/z-link', description: 'For navigation rather than action.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'An action strip with roving focus.' }
	]
}
