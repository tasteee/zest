import { defineInteractiveExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

type ToastInputT = {
	accent?: string
	title?: string
	description?: string
	duration?: number
}

type ToastElementT = HTMLElement & {
	push: (input: ToastInputT) => number
	dismiss: (id: number) => void
}

const buildPlaygroundToast = (): HTMLElement => {
	const toaster = document.createElement('z-toast')
	toaster.setAttribute('position', 'bottom-end')
	return toaster
}

export const zToastDoc: ComponentDocT = {
	tag: 'z-toast',
	title: 'z-toast',
	tagline: 'A region that stacks transient notifications and cleans up after itself.',
	status: ComponentStatus.stable,

	description:
		'This element is the toaster, not the toast. Put one on the page, park it in a corner with `position`, and push notifications into it imperatively: `toaster.push({ title, description, accent, duration })` returns an id you can pass to `toaster.dismiss(id)`. Each toast expires on its own after `duration`, or sticks around forever with `duration: 0`. A `dismiss` event fires with the id whenever one leaves.',

	playground: {
		buildElement: buildPlaygroundToast,
		controlNames: ['position'],
		slotLabel: 'toasts are pushed imperatively'
	},

	usageGuidance: [
		'One toaster per application, mounted once. Several regions means toasts appear in unrelated corners with no shared stacking order.',
		'Toasts are for confirmations and background outcomes — saved, sent, upload finished. Anything the user must act on belongs in the page, not in something that disappears.',
		'Put the outcome in the title and the detail in the description. "Invite sent" then "Ada will get an email in a minute" — the first line should be enough on its own.',
		'`duration: 0` makes a toast sticky. Use it for failures, which the user may need to read twice and copy an error out of.',
		'An undo offered in a toast is usually better than a confirmation dialog beforehand. It costs nothing for the users who meant it, and rescues the ones who did not.',
		'Do not stack more than a few. If a batch operation produces twenty outcomes, push one toast that summarises them.'
	],

	anatomy: [
		{ name: 'region', description: 'The host — a fixed, corner-parked stack with role="region".' },
		{ name: 'toast', description: 'One notification. A bordered card with a accent accent down its edge.' },
		{ name: 'title', description: 'The outcome, in one short line.' },
		{ name: 'description', description: 'Supporting detail, in muted type.' },
		{ name: 'close', description: 'Dismisses this toast immediately, ahead of its timer.' }
	],

	examples: [
		defineInteractiveExample({
			id: 'basic',
			title: 'Basic',
			description: 'Push a toast and watch it expire. The toaster itself renders nothing until something is in it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-button id="basicToastButton" kind="outline">Save changes</z-button>
				<z-toast id="basicToaster" position="bottom-end"></z-toast>
			`,
			script: `
				const basicToaster = document.querySelector('#basicToaster')

				document.querySelector('#basicToastButton').addEventListener('click', () => {
				  basicToaster.push({ title: 'Changes saved', description: 'Everything is up to date.' })
				})
			`,
			wire: (root) => {
				const basicToaster = queryPreview<ToastElementT>(root, '#basicToaster')
				const basicToastButton = queryPreview<HTMLElement>(root, '#basicToastButton')

				basicToastButton.addEventListener('click', () => {
					basicToaster.push({ title: 'Changes saved', description: 'Everything is up to date.' })
				})
			}
		}),

		defineInteractiveExample({
			id: 'accents',
			title: 'Tones',
			description: 'Four accents plus neutral. Keep them honest — a success toast for a failure teaches people to stop reading the colour.',
			layout: ExampleLayout.stack,
			markup: `
				<z-row gap="sm" wrap>
				  <z-button class="accentButton" data-accent="neutral" size="sm" kind="outline">Neutral</z-button>
				  <z-button class="accentButton" data-accent="dom" size="sm" kind="outline">Info</z-button>
				  <z-button class="accentButton" data-accent="success" size="sm" kind="outline">Success</z-button>
				  <z-button class="accentButton" data-accent="warning" size="sm" kind="outline">Warning</z-button>
				  <z-button class="accentButton" data-accent="error" size="sm" kind="outline">Danger</z-button>
				</z-row>
				<z-toast id="accentToaster" position="bottom-end"></z-toast>
			`,
			script: `
				const accentToaster = document.querySelector('#accentToaster')

				accentToaster.push({ accent: 'success', title: 'Deploy finished', description: 'Live in 4 seconds.' })
			`,
			wire: (root) => {
				const accentToaster = queryPreview<ToastElementT>(root, '#accentToaster')
				const accentButtons = root.querySelectorAll('.accentButton')

				const messagesByAccent: Record<string, ToastInputT> = {
					neutral: { title: 'Draft saved', description: 'Autosaved a moment ago.' },
					info: { accent: 'dom', title: 'Sync started', description: 'This usually takes under a minute.' },
					success: { accent: 'success', title: 'Deploy finished', description: 'Live in 4 seconds.' },
					warning: { accent: 'warning', title: 'Approaching your limit', description: '92% of this month’s allowance used.' },
					danger: { accent: 'error', title: 'Upload failed', description: 'The connection dropped. Nothing was saved.', duration: 0 }
				}

				for (const accentButton of accentButtons) {
					accentButton.addEventListener('click', () => {
						const requestedAccent = (accentButton as HTMLElement).dataset.accent ?? 'neutral'
						accentToaster.push(messagesByAccent[requestedAccent])
					})
				}
			}
		}),

		defineInteractiveExample({
			id: 'positions',
			title: 'Positions',
			description:
				'Six corners. Bottom-end is the quiet default; top-center is the loudest, and worth reserving for something that genuinely interrupts.',
			layout: ExampleLayout.stack,
			markup: `
				<z-row gap="sm" wrap>
				  <z-button class="positionButton" data-position="top-start" size="sm" kind="outline">top-start</z-button>
				  <z-button class="positionButton" data-position="top-center" size="sm" kind="outline">top-center</z-button>
				  <z-button class="positionButton" data-position="top-end" size="sm" kind="outline">top-end</z-button>
				  <z-button class="positionButton" data-position="bottom-start" size="sm" kind="outline">bottom-start</z-button>
				  <z-button class="positionButton" data-position="bottom-center" size="sm" kind="outline">bottom-center</z-button>
				  <z-button class="positionButton" data-position="bottom-end" size="sm" kind="outline">bottom-end</z-button>
				</z-row>
				<z-toast id="positionToaster" position="bottom-end"></z-toast>
			`,
			script: `
				const positionToaster = document.querySelector('#positionToaster')

				positionToaster.position = 'top-center'
				positionToaster.push({ title: 'Up here now' })
			`,
			wire: (root) => {
				const positionToaster = queryPreview<ToastElementT>(root, '#positionToaster')
				const positionButtons = root.querySelectorAll('.positionButton')

				for (const positionButton of positionButtons) {
					positionButton.addEventListener('click', () => {
						const requestedPosition = (positionButton as HTMLElement).dataset.position ?? 'bottom-end'
						positionToaster.setAttribute('position', requestedPosition)
						positionToaster.push({ accent: 'dom', title: requestedPosition, description: 'The stack parks in this corner.' })
					})
				}
			}
		}),

		defineInteractiveExample({
			id: 'duration',
			title: 'Duration',
			description:
				'Four seconds by default. `duration: 0` makes it sticky, which is the right choice for a failure the user may need to read twice.',
			layout: ExampleLayout.stack,
			markup: `
				<z-row gap="sm">
				  <z-button id="quickToast" size="sm" kind="outline">1.5s</z-button>
				  <z-button id="defaultToast" size="sm" kind="outline">Default (4s)</z-button>
				  <z-button id="stickyToast" size="sm" kind="outline">Sticky</z-button>
				</z-row>
				<z-toast id="durationToaster" position="bottom-end"></z-toast>
			`,
			script: `
				const durationToaster = document.querySelector('#durationToaster')

				durationToaster.push({ title: 'Sticky', description: 'Stays until dismissed.', duration: 0 })
			`,
			wire: (root) => {
				const durationToaster = queryPreview<ToastElementT>(root, '#durationToaster')
				const quickToast = queryPreview<HTMLElement>(root, '#quickToast')
				const defaultToast = queryPreview<HTMLElement>(root, '#defaultToast')
				const stickyToast = queryPreview<HTMLElement>(root, '#stickyToast')

				quickToast.addEventListener('click', () => {
					durationToaster.push({ title: 'Copied', duration: 1500 })
				})

				defaultToast.addEventListener('click', () => {
					durationToaster.push({ title: 'Saved', description: 'Gone in four seconds.' })
				})

				stickyToast.addEventListener('click', () => {
					durationToaster.push({
						accent: 'error',
						title: 'Upload failed',
						description: 'Stays until you dismiss it.',
						duration: 0
					})
				})
			}
		}),

		defineInteractiveExample({
			id: 'dismiss-by-id',
			title: 'Dismissing by id',
			description:
				'`push` returns an id. Hold it, and a pending toast can be replaced by its outcome — a loading state that resolves rather than a second toast piling on top.',
			layout: ExampleLayout.stack,
			markup: `
				<z-button id="uploadButton" kind="outline">Upload file</z-button>
				<z-toast id="uploadToaster" position="bottom-end"></z-toast>
				<z-text size="sm" color="muted" id="uploadStatus">Idle.</z-text>
			`,
			script: `
				const uploadToaster = document.querySelector('#uploadToaster')

				document.querySelector('#uploadButton').addEventListener('click', async () => {
				  const pendingId = uploadToaster.push({ title: 'Uploading…', duration: 0 })

				  const [uploaded, uploadError] = await wrap(uploadFile())
				  uploadToaster.dismiss(pendingId)

				  if (uploadError) return uploadToaster.push({ accent: 'error', title: 'Upload failed', duration: 0 })
				  uploadToaster.push({ accent: 'success', title: 'Upload finished' })
				})
			`,
			wire: (root) => {
				const uploadToaster = queryPreview<ToastElementT>(root, '#uploadToaster')
				const uploadButton = queryPreview<HTMLElement>(root, '#uploadButton')
				const uploadStatus = queryPreview<HTMLElement>(root, '#uploadStatus')

				uploadButton.addEventListener('click', () => {
					const pendingId = uploadToaster.push({ title: 'Uploading…', description: 'sunset.jpg', duration: 0 })
					uploadStatus.textContent = `Pending toast id: ${pendingId}`

					setTimeout(() => {
						uploadToaster.dismiss(pendingId)
						uploadToaster.push({ accent: 'success', title: 'Upload finished', description: 'sunset.jpg is ready.' })
						uploadStatus.textContent = 'Idle.'
					}, 1800)
				})
			}
		}),

		defineInteractiveExample({
			id: 'dismiss-event',
			title: 'The dismiss event',
			description: 'Fires with the id whenever a toast leaves — expired, closed by the user, or dismissed from code. One hook for all three.',
			layout: ExampleLayout.stack,
			markup: `
				<z-button id="notifyButton" kind="outline">Push a toast</z-button>
				<z-toast id="eventToaster" position="bottom-end"></z-toast>
				<z-text size="sm" color="muted" id="eventStatus">No toasts dismissed yet.</z-text>
			`,
			script: `
				const eventToaster = document.querySelector('#eventToaster')

				eventToaster.addEventListener('dismiss', (dismissEvent) => {
				  forgetToast(dismissEvent.detail.id)
				})
			`,
			wire: (root) => {
				const eventToaster = queryPreview<ToastElementT>(root, '#eventToaster')
				const notifyButton = queryPreview<HTMLElement>(root, '#notifyButton')
				const eventStatus = queryPreview<HTMLElement>(root, '#eventStatus')

				notifyButton.addEventListener('click', () => {
					eventToaster.push({ accent: 'dom', title: 'Notification', description: 'Close it, or wait for it to expire.' })
				})

				eventToaster.addEventListener('dismiss', (dismissEvent) => {
					const detail = (dismissEvent as CustomEvent<{ id: number }>).detail
					eventStatus.textContent = `Dismissed toast #${detail.id}.`
				})
			}
		})
	],

	attributes: [
		{
			name: 'position',
			type: 'top-start | top-center | top-end | bottom-start | bottom-center | bottom-end',
			defaultValue: 'bottom-end',
			description: 'Which corner the stack parks in.'
		}
	],

	properties: [
		{
			name: 'push(input)',
			type: '(input: { accent?, title?, description?, duration? }) => number',
			defaultValue: '—',
			description: 'Adds a toast and returns its id. duration defaults to 4000ms; 0 makes it sticky.'
		},
		{ name: 'dismiss(id)', type: '(id: number) => void', defaultValue: '—', description: 'Removes a toast early and clears its timer.' }
	],

	slots: [],

	events: [
		{ name: 'dismiss', detail: '{ id: number }', description: 'Fires whenever a toast leaves — by timer, by close button, or by dismiss().' }
	],

	cssVariables: [
		{ name: '--toast-accent', defaultValue: 'per accent', description: 'The accent on a toast’s edge, set from its accent.' }
	],

	accessibilityNotes: [
		'The region carries role="region" with an accessible name of "Notifications", and each toast is a role="status" live region — so new toasts are announced without stealing focus.',
		'Because focus never moves, a toast can never be the only way to complete a task. Anything actionable has to exist in the page too.',
		'Every toast has a close button, which matters for anyone who reads more slowly than a four-second timer allows.',
		'Use duration: 0 for errors. An error that vanishes before it has been read is worse than no error at all.',
		'Do not push a queue of toasts at once — a stack of six live-region announcements is noise, and screen readers will read every one of them.'
	],

	related: [
		{ tag: 'z-alert', route: '/c/overlays/z-alert', description: 'An in-flow banner for something that should not disappear.' },
		{ tag: 'z-alert-dialog', route: '/c/overlays/z-alert-dialog', description: 'When you must ask first rather than offer an undo.' },
		{ tag: 'z-status-dot', route: '/c/data-display/z-status-dot', description: 'For persistent state rather than a moment.' }
	]
}
