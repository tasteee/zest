import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundAlert = (): HTMLElement => {
	const alert = document.createElement('z-alert')
	alert.setAttribute('tone', 'info')
	alert.setAttribute('heading', 'Scheduled maintenance')
	alert.textContent = 'The API will be read-only on Sunday from 02:00 to 04:00 UTC.'
	return alert
}

export const zAlertDoc: ComponentDocT = {
	tag: 'z-alert',
	title: 'z-alert',
	tagline: 'A status banner that sits in the page rather than over it.',
	status: ComponentStatus.stable,

	description:
		'Despite the category, this is not a floating overlay — it is an in-flow bordered box tinted by `tone`, with a leading status icon, an optional `heading`, slotted body copy, and an optional close button. It takes up space, which is the point: an alert that has to be dismissed before the layout settles is one the user cannot miss. Red, amber, and green are reserved for the semantic tones; everything else reads through the neutral border.',

	playground: {
		buildElement: buildPlaygroundAlert,
		controlNames: ['tone', 'heading', 'is-dismissable'],
		slotLabel: 'The API will be read-only on Sunday…'
	},

	usageGuidance: [
		'Use an alert for a condition that persists — a degraded service, an expiring plan, a form that failed to submit. For a moment that passes, use `z-toast`.',
		'Put it where the condition applies. A billing warning belongs above the billing form, not pinned to the top of every page in the application.',
		'Match the tone to the consequence honestly. Danger for something broken, warning for something about to break, info for something worth knowing. A page of red alerts communicates nothing.',
		'Write the heading as the situation and the body as what to do about it. "Payment failed" then "Update your card to keep your projects running."',
		'`is-dismissable` for anything the user can reasonably acknowledge and move past. Never for a condition that is still true after the close button — the alert will just be gone, and the problem will not.',
		'For a note inside documentation or prose, use `z-callout`. An alert reports a system state; a callout emphasises a piece of writing.'
	],

	anatomy: [
		{ name: 'icon', description: 'The status glyph, chosen by tone. Decorative — the tone is also carried by the role and the copy.' },
		{ name: 'heading', description: 'Optional first line, naming the condition.' },
		{ name: 'default slot', description: 'The body copy, including links.' },
		{ name: 'close', description: 'Shown with is-dismissable. Sets is-hidden and fires dismiss.' }
	],

	examples: [
		defineMarkupExample({
			id: 'tones',
			title: 'Tones',
			description: 'Five tones, each with its own icon. The border and tint carry the meaning together with the copy — never colour alone.',
			layout: ExampleLayout.stack,
			markup: `
				<z-alert tone="neutral" heading="Draft saved">This project has not been shared with anyone yet.</z-alert>
				<z-alert tone="info" heading="Scheduled maintenance">The API will be read-only on Sunday from 02:00 to 04:00 UTC.</z-alert>
				<z-alert tone="success" heading="Domain verified">zest.app is now serving over HTTPS.</z-alert>
				<z-alert tone="warning" heading="Approaching your limit">You have used 92% of this month’s allowance.</z-alert>
				<z-alert tone="danger" heading="Payment failed">Update your card to keep your projects running.</z-alert>
			`
		}),

		defineMarkupExample({
			id: 'without-heading',
			title: 'Without a heading',
			description: 'A single line reads fine on its own. Reach for a heading when the body needs more than one sentence.',
			layout: ExampleLayout.stack,
			markup: `
				<z-alert tone="info">Two-factor authentication is now required for every member of this workspace.</z-alert>
				<z-alert tone="warning">This API version is deprecated and will stop responding in March.</z-alert>
			`
		}),

		defineMarkupExample({
			id: 'rich-body',
			title: 'With a link',
			description: 'The body is a slot, so an alert can carry the way out of the situation it describes. That is usually what makes it useful rather than annoying.',
			layout: ExampleLayout.stack,
			markup: `
				<z-alert tone="danger" heading="Payment failed">
				  We could not charge the card ending 4242. <z-link href="#">Update your payment method</z-link> to keep your projects running.
				</z-alert>
			`
		}),

		defineMarkupExample({
			id: 'dismissable',
			title: 'Dismissable',
			description:
				'The close button sets `is-hidden` on the alert and fires `dismiss`. Persist that decision yourself — otherwise the alert returns on the next render.',
			layout: ExampleLayout.stack,
			markup: `
				<z-alert tone="info" heading="New in this release" is-dismissable>
				  Overlays now render in the browser’s top layer, so stacking bugs are gone.
				</z-alert>
			`
		}),

		defineInteractiveExample({
			id: 'dismiss-event',
			title: 'Remembering the dismissal',
			description:
				'`dismiss` is your cue to record the choice. Without it the alert hides for exactly as long as the page stays open, which no user experiences as being dismissed.',
			layout: ExampleLayout.stack,
			markup: `
				<z-alert id="tipAlert" tone="info" heading="Keyboard shortcuts" is-dismissable>
				  Press ⌘K anywhere to open the command palette.
				</z-alert>
				<z-text size="sm" color="muted" id="tipStatus">Alert is showing.</z-text>
				<z-button id="restoreTip" size="small" kind="outline">Bring it back</z-button>
			`,
			script: `
				const tipAlert = document.querySelector('#tipAlert')

				tipAlert.addEventListener('dismiss', () => {
				  savePreference('hasDismissedShortcutTip', true)
				})
			`,
			wire: (root) => {
				const tipAlert = queryPreview<HTMLElement>(root, '#tipAlert')
				const tipStatus = queryPreview<HTMLElement>(root, '#tipStatus')
				const restoreTip = queryPreview<HTMLElement>(root, '#restoreTip')

				tipAlert.addEventListener('dismiss', () => {
					tipStatus.textContent = 'Dismissed — this is where you would persist the choice.'
				})

				restoreTip.addEventListener('click', () => {
					tipAlert.removeAttribute('is-hidden')
					tipStatus.textContent = 'Alert is showing.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'form-error',
			title: 'A form-level error',
			description:
				'The case field-level errors cannot cover: the submission failed as a whole. Put it directly above the form, where the user is already looking.',
			layout: ExampleLayout.stack,
			markup: `
				<z-alert id="submitAlert" tone="danger" heading="Could not save your changes" is-hidden>
				  The workspace name is already taken. Pick another and try again.
				</z-alert>
				<z-field label="Workspace name">
				  <z-input id="workspaceInput" value="acme"></z-input>
				</z-field>
				<z-button id="saveWorkspace" kind="solid" tone="primary">Save</z-button>
			`,
			script: `
				const submitAlert = document.querySelector('#submitAlert')

				document.querySelector('#saveWorkspace').addEventListener('click', async () => {
				  const [saved, saveError] = await wrap(saveWorkspace(workspaceInput.value))
				  submitAlert.isHidden = !saveError
				})
			`,
			wire: (root) => {
				const submitAlert = queryPreview<HTMLElement>(root, '#submitAlert')
				const workspaceInput = queryPreview<HTMLElement & { value: string }>(root, '#workspaceInput')
				const saveWorkspace = queryPreview<HTMLElement>(root, '#saveWorkspace')

				const takenNames = ['acme', 'zest']

				saveWorkspace.addEventListener('click', () => {
					const requestedName = (workspaceInput.value || '').trim().toLowerCase()
					const isTaken = takenNames.includes(requestedName)

					if (isTaken) {
						submitAlert.removeAttribute('is-hidden')
						return
					}

					submitAlert.setAttribute('is-hidden', '')
				})
			}
		})
	],

	attributes: [
		{ name: 'tone', type: 'neutral | info | success | warning | danger', defaultValue: 'neutral', description: 'The condition being reported. Picks the tint and the icon.' },
		{ name: 'heading', type: 'string', defaultValue: '—', description: 'Optional first line naming the condition.' },
		{ name: 'is-dismissable', type: 'boolean', defaultValue: '—', description: 'Shows a close button that hides the alert and fires dismiss.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the alert from layout. Set by the close button, and settable yourself.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The body copy, including links and inline markup.' }],

	events: [
		{ name: 'dismiss', detail: '—', description: 'The close button was used. The alert has already hidden itself — persist the choice here.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'Warning and danger alerts carry role="alert", so they are announced immediately; the quieter tones use role="status", which waits for a pause. That difference is deliberate — not every alert deserves to interrupt.',
		'The icon is aria-hidden. Meaning comes from the copy and the role, never from the glyph or the colour, both of which are unavailable to some users.',
		'An alert that appears in response to an action should be rendered where the user’s attention already is — usually directly above the control they just used.',
		'The close button is labelled "Dismiss". Dismissing only sets is-hidden; persisting that decision is your job, and skipping it makes the button feel broken.',
		'Do not use an alert for something transient. A live region that appears and vanishes on a timer is a toast, and this component has no timer.'
	],

	related: [
		{ tag: 'z-callout', route: '/c/overlays/z-callout', description: 'The prose equivalent — emphasis inside documentation.' },
		{ tag: 'z-toast', route: '/c/overlays/z-toast', description: 'For a moment rather than a condition.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'For an error about one field rather than the whole form.' },
		{ tag: 'z-badge', route: '/c/data-display/z-badge', description: 'For status attached to a single item.' }
	]
}
