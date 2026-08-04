import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundAlertDialog = (): HTMLElement => {
	const alertDialog = document.createElement('z-alert-dialog')
	alertDialog.setAttribute('heading', 'Delete this project?')
	alertDialog.setAttribute('description', 'Everything in it will be removed. This cannot be undone.')
	alertDialog.setAttribute('confirm-label', 'Delete project')
	alertDialog.setAttribute('accent', 'error')

	alertDialog.innerHTML = `
		<z-button slot="trigger" kind="outline" accent="neutral">Delete project</z-button>
	`

	return alertDialog
}

export const zAlertDialogDoc: ComponentDocT = {
	tag: 'z-alert-dialog',
	title: 'z-alert-dialog',
	tagline: 'The one modal that will not let you click away from the question.',
	status: ComponentStatus.stable,

	description:
		'Same native `<dialog>` foundation as `z-dialog`, with two deliberate differences. It owns its actions — a cancel and a confirm, no free-form footer — and it refuses light dismissal: a backdrop click does nothing, and Escape resolves as an explicit cancel rather than an ambiguous close. That is the right shape for a consequential choice, because "the user clicked somewhere" should never be recorded as an answer. `accent="error"` paints the confirm in the destructive colour.',

	playground: {
		buildElement: buildPlaygroundAlertDialog,
		controlNames: ['heading', 'description', 'confirm-label', 'cancel-label', 'accent'],
		slotLabel: 'trigger slot'
	},

	usageGuidance: [
		'Reserve it for decisions that are hard or impossible to undo — deleting, revoking, discarding unsaved work, anything that leaves the building.',
		'Name the consequence in the confirm button. "Delete project" is answerable; "OK" makes the user re-read the heading to find out what they are agreeing to.',
		'Ask the question in the heading, and put the consequence in the description. "Delete this project?" then "Everything in it will be removed. This cannot be undone."',
		'Use `accent="error"` when the action destroys something. Save the red for cases that deserve it — a red button on every confirmation teaches people to ignore red.',
		'If the action is undoable, do not ask at all. Perform it and offer an undo in a `z-toast`; that is faster for the ninety-nine per cent who meant it.',
		'One question per dialog. If confirming needs a form — typing a project name, choosing what to keep — that is a `z-dialog`, not this.'
	],

	anatomy: [
		{ name: 'trigger slot', description: 'The element that opens the dialog. Wired for you.' },
		{ name: 'heading', description: 'The question. Also the dialog’s accessible name.' },
		{ name: 'description', description: 'The consequence, in muted type.' },
		{ name: 'default slot', description: 'Optional extra context under the description. Keep it to a sentence.' },
		{ name: 'footer', description: 'The two owned actions — cancel on the left, confirm on the right.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'A question, its consequence, and two ways to answer. Try the backdrop — it will not dismiss.',
			layout: ExampleLayout.start,
			markup: `
				<z-alert-dialog
				  heading="Delete this project?"
				  description="Everything in it will be removed. This cannot be undone."
				  confirm-label="Delete project"
				  accent="error">
				  <z-button slot="trigger" kind="outline" accent="neutral">Delete project</z-button>
				</z-alert-dialog>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Tones',
			description:
				'The accent paints the confirm button. Danger for destruction, primary for a consequential but constructive choice — publishing, sending, going live.',
			layout: ExampleLayout.start,
			markup: `
				<z-alert-dialog
				  heading="Publish to production?"
				  description="Everyone on the plan will see this change immediately."
				  confirm-label="Publish"
				  accent="dom">
				  <z-button slot="trigger" kind="outline">Primary</z-button>
				</z-alert-dialog>
				<z-alert-dialog
				  heading="Revoke this API key?"
				  description="Anything using it will stop working within a minute."
				  confirm-label="Revoke key"
				  accent="error">
				  <z-button slot="trigger" kind="outline">Danger</z-button>
				</z-alert-dialog>
			`
		}),

		defineMarkupExample({
			id: 'labels',
			title: 'Naming the actions',
			description:
				'Both labels are yours. A cancel button that names the safe outcome — "Keep editing" — is often clearer than the word Cancel, which in a discard dialog is genuinely ambiguous.',
			layout: ExampleLayout.start,
			markup: `
				<z-alert-dialog
				  heading="Discard your changes?"
				  description="You have unsaved edits to three files."
				  cancel-label="Keep editing"
				  confirm-label="Discard changes"
				  accent="error">
				  <z-button slot="trigger" kind="outline" accent="neutral">Close without saving</z-button>
				</z-alert-dialog>
			`
		}),

		defineMarkupExample({
			id: 'extra-context',
			title: 'Extra context',
			description: 'The default slot takes a little more detail. Keep it short — a confirmation the user has to study has already failed.',
			layout: ExampleLayout.start,
			markup: `
				<z-alert-dialog
				  heading="Remove Ada from this workspace?"
				  description="She will lose access immediately."
				  confirm-label="Remove member"
				  accent="error">
				  <z-button slot="trigger" kind="outline" accent="neutral">Remove member</z-button>
				  <z-text size="sm" color="muted">Her 14 open issues stay assigned to her and will need reassigning.</z-text>
				</z-alert-dialog>
			`
		}),

		defineInteractiveExample({
			id: 'events',
			title: 'confirm and cancel',
			description:
				'Two events, both explicit. Escape fires `cancel` rather than closing silently, which is what makes the outcome unambiguous however the dialog was answered.',
			layout: ExampleLayout.stack,
			markup: `
				<z-alert-dialog
				  id="revokeDialog"
				  heading="Revoke this API key?"
				  description="Anything using it will stop working within a minute."
				  confirm-label="Revoke key"
				  accent="error">
				  <z-button slot="trigger" kind="outline" accent="neutral">Revoke key</z-button>
				</z-alert-dialog>
				<z-text size="sm" color="muted" id="revokeStatus">Key is active.</z-text>
			`,
			script: `
				const revokeDialog = document.querySelector('#revokeDialog')

				revokeDialog.addEventListener('confirm', () => {
				  revokeApiKey()
				})

				revokeDialog.addEventListener('cancel', () => {
				  // fired by the cancel button and by Escape
				  logDeclined()
				})
			`,
			wire: (root) => {
				const revokeDialog = queryPreview<HTMLElement>(root, '#revokeDialog')
				const revokeStatus = queryPreview<HTMLElement>(root, '#revokeStatus')

				revokeDialog.addEventListener('confirm', () => {
					revokeStatus.textContent = 'Key revoked.'
				})

				revokeDialog.addEventListener('cancel', () => {
					revokeStatus.textContent = 'Key is active — you cancelled.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'opening-from-code',
			title: 'Opening from code',
			description:
				'`isOpen` is two-way, so a confirmation can be raised from anywhere — a keyboard shortcut, a drag that would overwrite something, a row action in a table.',
			layout: ExampleLayout.stack,
			markup: `
				<z-row gap="sm">
				  <z-button id="deleteRowOne" size="sm" kind="outline" accent="neutral">Delete “Q3 report”</z-button>
				  <z-button id="deleteRowTwo" size="sm" kind="outline" accent="neutral">Delete “Roadmap”</z-button>
				</z-row>
				<z-alert-dialog id="deleteDialog" heading="Delete this file?" confirm-label="Delete" accent="error"></z-alert-dialog>
				<z-text size="sm" color="muted" id="deleteStatus">Nothing deleted.</z-text>
			`,
			script: `
				const deleteDialog = document.querySelector('#deleteDialog')
				let pendingFile = null

				const askToDelete = (fileName) => {
				  pendingFile = fileName
				  deleteDialog.description = \`“\${fileName}” will be removed permanently.\`
				  deleteDialog.isOpen = true
				}

				deleteDialog.addEventListener('confirm', () => {
				  deleteFile(pendingFile)
				})
			`,
			wire: (root) => {
				type AlertDialogElementT = HTMLElement & { isOpen: boolean; description: string }

				const deleteDialog = queryPreview<AlertDialogElementT>(root, '#deleteDialog')
				const deleteRowOne = queryPreview<HTMLElement>(root, '#deleteRowOne')
				const deleteRowTwo = queryPreview<HTMLElement>(root, '#deleteRowTwo')
				const deleteStatus = queryPreview<HTMLElement>(root, '#deleteStatus')

				let pendingFileName = ''

				const askToDelete = (fileName: string): void => {
					pendingFileName = fileName
					deleteDialog.description = `“${fileName}” will be removed permanently.`
					deleteDialog.isOpen = true
				}

				deleteRowOne.addEventListener('click', () => askToDelete('Q3 report'))
				deleteRowTwo.addEventListener('click', () => askToDelete('Roadmap'))

				deleteDialog.addEventListener('confirm', () => {
					deleteStatus.textContent = `Deleted “${pendingFileName}”.`
				})

				deleteDialog.addEventListener('cancel', () => {
					deleteStatus.textContent = `Kept “${pendingFileName}”.`
				})
			}
		})
	],

	attributes: [
		{ name: 'is-open', type: 'boolean', defaultValue: '—', description: 'Whether the dialog is showing. Reflects and is two-way.' },
		{ name: 'heading', type: 'string', defaultValue: '—', description: 'The question. Also the accessible name of the dialog.' },
		{ name: 'description', type: 'string', defaultValue: '—', description: 'The consequence, in muted type under the heading.' },
		{ name: 'confirm-label', type: 'string', defaultValue: 'Confirm', description: 'Label of the confirming action. Name the consequence here.' },
		{ name: 'cancel-label', type: 'string', defaultValue: 'Cancel', description: 'Label of the declining action.' },
		{ name: 'accent', type: 'dom | sub | error', defaultValue: 'dom', description: 'Colour of the confirm button.' }
	],

	properties: [],

	slots: [
		{ name: 'trigger', description: 'The element that opens the dialog.' },
		{ name: '(default)', description: 'Optional extra context under the description.' }
	],

	events: [
		{ name: 'confirm', detail: '—', description: 'The confirming action was chosen.' },
		{ name: 'cancel', detail: '—', description: 'The user declined — via the cancel button or Escape.' }
	],

	cssVariables: [
		{ name: '--z-dialog-width', defaultValue: '26rem', description: 'Panel width. Narrower than z-dialog on purpose — a question, not a form.' }
	],

	accessibilityNotes: [
		'The panel carries role="alertdialog", which tells assistive technology this is an interruption that needs an answer rather than an ordinary modal.',
		'Escape is intercepted and resolved as an explicit cancel, so the outcome is always one of two known answers rather than "the dialog went away".',
		'Backdrop clicks do nothing. That is a deliberate departure from every other overlay here — a consequential choice should not be dismissible by a stray click.',
		'Focus is trapped by the native dialog and returns to the trigger on close, which matters most in a table of row actions where the user needs to land back on the row they came from.',
		'Make the confirm label name the action rather than agreeing abstractly. "Delete project" is understandable out of context; "OK" is not.'
	],

	related: [
		{ tag: 'z-dialog', route: '/c/overlays/z-dialog', description: 'When the modal needs a form or a free-form footer.' },
		{ tag: 'z-toast', route: '/c/overlays/z-toast', description: 'Offer an undo instead of asking, when the action is reversible.' },
		{ tag: 'z-alert', route: '/c/overlays/z-alert', description: 'An in-flow warning that does not interrupt.' }
	]
}
