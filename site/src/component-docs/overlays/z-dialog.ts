import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundDialog = (): HTMLElement => {
	const dialog = document.createElement('z-dialog')
	dialog.setAttribute('heading', 'Invite teammates')
	dialog.setAttribute('description', 'They will get an email with a link to join this workspace.')

	dialog.innerHTML = `
		<z-button slot="trigger" accent="dom" kind="solid">Open dialog</z-button>
		<z-field label="Email addresses">
		  <z-input placeholder="ada@example.com, alan@example.com"></z-input>
		</z-field>
		<z-button slot="footer" kind="outline" accent="neutral">Cancel</z-button>
		<z-button slot="footer" kind="solid" accent="dom">Send invites</z-button>
	`

	return dialog
}

export const zDialogDoc: ComponentDocT = {
	tag: 'z-dialog',
	title: 'z-dialog',
	tagline: 'A modal on the platform’s own foundation — focus trap, Esc, and top layer included.',
	status: ComponentStatus.stable,

	description:
		'Built on the native `<dialog>` element with `showModal()`, which is a deliberate choice rather than an implementation detail: focus trapping, Escape-to-close, top-layer stacking above every z-index you have ever written, and the backdrop all come from the browser instead of from JavaScript that has to be right. A `[slot="trigger"]` opens it, `heading` and `description` fill the top of the body, and `[slot="footer"]` holds the actions. `is-open` reflects and is two-way, so opening it from code is one assignment.',

	playground: {
		buildElement: buildPlaygroundDialog,
		controlNames: ['heading', 'description', 'size', 'has-close', 'is-static'],
		slotLabel: 'trigger, body, and footer'
	},

	usageGuidance: [
		'Use a dialog when the task genuinely blocks: it needs an answer before anything else can proceed. Everything else belongs in a `z-popover`, a `z-sheet`, or the page itself.',
		'Keep it to one job. A dialog that scrolls is usually a page that has not been written yet.',
		'Name the action in the button. "Send invites" beats "OK" — the user should be able to read the footer and know what will happen without re-reading the heading.',
		'`is-static` disables backdrop dismissal. Reserve it for a form mid-flight where a stray click would lose work; for everything else, letting people click away is a kindness.',
		'For a destructive confirmation, use `z-alert-dialog` — it owns its two actions and refuses light dismissal, which is exactly the shape that decision needs.',
		'On narrow screens, a `z-sheet` or `z-drawer` usually beats a centred modal. Same foundation, better ergonomics for a thumb.'
	],

	anatomy: [
		{ name: 'trigger slot', description: 'Anything clickable. Opening is wired for you, so no listener is needed.' },
		{ name: 'header', description: 'The heading and the close button. Rendered when either is present.' },
		{ name: 'description', description: 'A muted line under the heading, for the sentence that explains the decision.' },
		{ name: 'default slot', description: 'The body — a form, a summary, whatever the dialog is for.' },
		{ name: 'footer slot', description: 'The actions. Hidden entirely when nothing is slotted into it.' },
		{ name: 'backdrop', description: 'The native ::backdrop — a dim and a small blur, no shadow on the panel itself.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'A trigger, a body, and two actions. Escape closes it, and so does a click on the backdrop.',
			layout: ExampleLayout.start,
			markup: `
				<z-dialog heading="Invite teammates" description="They will get an email with a link to join this workspace.">
				  <z-button slot="trigger" accent="dom" kind="solid">Invite teammates</z-button>
				  <z-field label="Email addresses">
				    <z-input placeholder="ada@example.com, alan@example.com"></z-input>
				  </z-field>
				  <z-button slot="footer" kind="outline" accent="neutral">Cancel</z-button>
				  <z-button slot="footer" kind="solid" accent="dom">Send invites</z-button>
				</z-dialog>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description:
				'Three widths. Small is for a single question, medium for a short form, large for something with structure — a diff, a table, a preview.',
			layout: ExampleLayout.start,
			markup: `
				<z-dialog size="sm" heading="Rename project">
				  <z-button slot="trigger" kind="outline">Small</z-button>
				  <z-field label="Name"><z-input value="Untitled"></z-input></z-field>
				  <z-button slot="footer" kind="solid" accent="dom">Rename</z-button>
				</z-dialog>
				<z-dialog size="md" heading="Project settings">
				  <z-button slot="trigger" kind="outline">Medium</z-button>
				  <z-text size="sm" color="muted">The default width — enough for a short form without feeling empty.</z-text>
				  <z-button slot="footer" kind="solid" accent="dom">Save</z-button>
				</z-dialog>
				<z-dialog size="lg" heading="Review changes">
				  <z-button slot="trigger" kind="outline">Large</z-button>
				  <z-text size="sm" color="muted">Room for structured content — a diff, a table, a preview.</z-text>
				  <z-button slot="footer" kind="solid" accent="dom">Apply</z-button>
				</z-dialog>
			`
		}),

		defineMarkupExample({
			id: 'no-footer',
			title: 'Without a footer',
			description: 'The footer collapses when nothing is slotted into it, so an informational dialog does not carry an empty bar.',
			layout: ExampleLayout.start,
			markup: `
				<z-dialog heading="What changed in 2.0" description="A short summary of the release.">
				  <z-button slot="trigger" kind="outline">Read the notes</z-button>
				  <z-text size="sm">Every overlay now sits in the browser’s top layer, so stacking bugs against third-party widgets are gone.</z-text>
				</z-dialog>
			`
		}),

		defineMarkupExample({
			id: 'static',
			title: 'Static',
			description:
				'`is-static` ignores backdrop clicks. Escape still closes — the platform owns that key, and taking it away strands keyboard users.',
			layout: ExampleLayout.start,
			markup: `
				<z-dialog is-static heading="Finish setting up billing" description="Clicking outside will not dismiss this.">
				  <z-button slot="trigger" kind="outline">Open a static dialog</z-button>
				  <z-field label="Card number"><z-input placeholder="4242 4242 4242 4242"></z-input></z-field>
				  <z-button slot="footer" kind="solid" accent="dom">Save card</z-button>
				</z-dialog>
			`
		}),

		defineMarkupExample({
			id: 'has-close',
			title: 'Without the close button',
			description:
				'`has-close` removes the ✕. Only reasonable when the footer already offers a way out — never combine it with `is-static`, or the dialog becomes a trap.',
			layout: ExampleLayout.start,
			markup: `
				<z-dialog has-close heading="Confirm your email" description="We sent a link to ada@example.com.">
				  <z-button slot="trigger" kind="outline">Open</z-button>
				  <z-button slot="footer" kind="outline" accent="neutral">Not now</z-button>
				  <z-button slot="footer" kind="solid" accent="dom">Resend</z-button>
				</z-dialog>
			`
		}),

		defineInteractiveExample({
			id: 'imperative',
			title: 'Opening from code',
			description: '`isOpen` is a two-way property, so a dialog with no trigger is opened by assignment — which is how you open one in response to something else.',
			layout: ExampleLayout.stack,
			markup: `
				<z-button id="openButton" kind="outline">Open without a trigger slot</z-button>
				<z-dialog id="codeDialog" heading="Opened from code" description="No trigger slot — isOpen was set directly.">
				  <z-text size="sm">Setting isOpen back to false closes it, and the close event fires either way.</z-text>
				  <z-button slot="footer" id="dismissButton" kind="solid" accent="dom">Close</z-button>
				</z-dialog>
				<z-text size="sm" color="muted" id="dialogStatus">Closed.</z-text>
			`,
			script: `
				const codeDialog = document.querySelector('#codeDialog')

				document.querySelector('#openButton').addEventListener('click', () => {
				  codeDialog.isOpen = true
				})

				codeDialog.addEventListener('close', () => {
				  restoreFocus()
				})
			`,
			wire: (root) => {
				type DialogElementT = HTMLElement & { isOpen: boolean }

				const codeDialog = queryPreview<DialogElementT>(root, '#codeDialog')
				const openButton = queryPreview<HTMLElement>(root, '#openButton')
				const dismissButton = queryPreview<HTMLElement>(root, '#dismissButton')
				const dialogStatus = queryPreview<HTMLElement>(root, '#dialogStatus')

				openButton.addEventListener('click', () => {
					codeDialog.isOpen = true
				})

				dismissButton.addEventListener('click', () => {
					codeDialog.isOpen = false
				})

				codeDialog.addEventListener('open', () => {
					dialogStatus.textContent = 'Open.'
				})

				codeDialog.addEventListener('close', () => {
					dialogStatus.textContent = 'Closed.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'form-dialog',
			title: 'A form that closes itself',
			description:
				'The common shape: collect something, act on it, close. Closing in the handler rather than on the button is what keeps a failed submit from dismissing the work.',
			layout: ExampleLayout.stack,
			markup: `
				<z-dialog id="renameDialog" size="sm" heading="Rename project" is-static>
				  <z-button slot="trigger" kind="outline">Rename project</z-button>
				  <z-field label="Project name">
				    <z-input id="renameInput" value="Untitled project"></z-input>
				  </z-field>
				  <z-button slot="footer" id="renameCancel" kind="outline" accent="neutral">Cancel</z-button>
				  <z-button slot="footer" id="renameConfirm" kind="solid" accent="dom">Rename</z-button>
				</z-dialog>
				<z-text size="sm" color="muted" id="renameStatus">Current name: Untitled project</z-text>
			`,
			script: `
				const renameDialog = document.querySelector('#renameDialog')
				const renameInput = document.querySelector('#renameInput')

				document.querySelector('#renameConfirm').addEventListener('click', async () => {
				  const [saved, saveError] = await wrap(renameProject(renameInput.value))
				  if (saveError) return showError(saveError)

				  renameDialog.isOpen = false
				})
			`,
			wire: (root) => {
				type DialogElementT = HTMLElement & { isOpen: boolean }

				const renameDialog = queryPreview<DialogElementT>(root, '#renameDialog')
				const renameInput = queryPreview<HTMLElement & { value: string }>(root, '#renameInput')
				const renameCancel = queryPreview<HTMLElement>(root, '#renameCancel')
				const renameConfirm = queryPreview<HTMLElement>(root, '#renameConfirm')
				const renameStatus = queryPreview<HTMLElement>(root, '#renameStatus')

				renameCancel.addEventListener('click', () => {
					renameDialog.isOpen = false
				})

				renameConfirm.addEventListener('click', () => {
					const nextName = (renameInput.value || '').trim()
					const isEmpty = nextName.length === 0
					if (isEmpty) {
						renameInput.setAttribute('is-invalid', '')
						return
					}

					renameInput.removeAttribute('is-invalid')
					renameStatus.textContent = `Current name: ${nextName}`
					renameDialog.isOpen = false
				})
			}
		})
	],

	attributes: [
		{ name: 'is-open', type: 'boolean', defaultValue: '—', description: 'Whether the dialog is showing. Reflects and is two-way — set it to open or close from code.' },
		{ name: 'heading', type: 'string', defaultValue: '—', description: 'Title in the header.' },
		{ name: 'description', type: 'string', defaultValue: '—', description: 'A muted line under the heading.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Panel width — 24rem, 30rem, or 42rem, capped to the viewport.' },
		{ name: 'has-close', type: 'boolean', defaultValue: '—', description: 'Removes the ✕. Only safe when the footer offers another way out.' },
		{ name: 'is-static', type: 'boolean', defaultValue: '—', description: 'Ignores backdrop clicks. Escape still closes.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Stops the trigger from opening the dialog.' }
	],

	properties: [],

	slots: [
		{ name: 'trigger', description: 'The element that opens the dialog. Wired for you.' },
		{ name: '(default)', description: 'The body.' },
		{ name: 'footer', description: 'Actions. The footer bar is hidden when this is empty.' }
	],

	events: [
		{ name: 'open', detail: '—', description: 'Fires after the dialog has been shown.' },
		{ name: 'close', detail: '—', description: 'Fires after it closes, however it closed — button, backdrop, or Escape.' }
	],

	cssVariables: [
		{ name: '--z-dialog-width', defaultValue: '30rem', description: 'Panel width. Set by the size attribute, and overridable for a one-off.' }
	],

	accessibilityNotes: [
		'showModal() gives real modality: focus is trapped in the dialog, the rest of the page is inert to assistive technology, and Escape closes — none of it hand-rolled.',
		'The dialog sits in the browser’s top layer, so it renders above every stacking context on the page regardless of z-index. This is the main reason to build on the platform element.',
		'Focus returns to the trigger on close, because the native element restores it. Opening from code without a trigger means you own returning focus somewhere sensible.',
		'Never pair has-close with is-static. That combination removes every dismissal route except a footer button that may not exist.',
		'Set a heading. It is the dialog’s accessible name, and a modal announced with no name gives a screen-reader user nothing to orient against.'
	],

	related: [
		{ tag: 'z-alert-dialog', route: '/c/overlays/z-alert-dialog', description: 'For destructive confirmations — two actions, no light dismiss.' },
		{ tag: 'z-sheet', route: '/c/overlays/z-sheet', description: 'The same foundation, sliding in from an edge.' },
		{ tag: 'z-drawer', route: '/c/overlays/z-drawer', description: 'A bottom sheet with drag-to-dismiss.' },
		{ tag: 'z-popover', route: '/c/overlays/z-popover', description: 'For content that does not need to block.' }
	]
}
