import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSendButton = (): HTMLElement => {
	return document.createElement('z-send-button')
}

export const zSendButtonDoc: ComponentDocT = {
	tag: 'z-send-button',
	title: 'z-send-button',
	tagline: 'The circular composer control that becomes a stop button while a response streams.',
	status: ComponentStatus.stable,

	description:
		'One control with two jobs. Idle, it shows a send arrow and emits `send`. With `is-streaming` set it shows a stop square and emits `stop` instead. Keeping both states in a single element is what makes the transition feel like one control changing its mind rather than two controls swapping places — and it means the target never moves out from under a cursor that is already on it. `is-disabled` is deliberately ignored while streaming, so a user can always abort a response they did not want.',

	playground: {
		buildElement: buildPlaygroundSendButton,
		controlNames: [],
		slotLabel: '(no slot)'
	},

	usageGuidance: [
		'Disable it while the composer is empty. An enabled send button that does nothing is worse than a visibly unavailable one.',
		'Flip `is-streaming` the moment the request goes out, not when the first token lands. The gap between the two is exactly when a user is most likely to want to cancel.',
		'Never disable the streaming state. Stop must always be reachable — the component enforces this, and you should not work around it.',
		'Pair it with `z-composer`, which already positions it correctly against the textarea.'
	],

	anatomy: [
		{ name: 'send arrow', description: 'The idle state. Clicking emits `send`.' },
		{ name: 'stop square', description: 'The streaming state, shown while `is-streaming` is set. Clicking emits `stop`.' },
		{ name: 'accessible name', description: '`label` names the idle state; streaming always announces "Stop".' }
	],

	examples: [
		defineMarkupExample({
			id: 'states',
			title: 'The two states',
			description: 'Idle, streaming, and disabled. Note that the streaming button stays live even next to its disabled sibling.',
			markup: `
				<z-send-button></z-send-button>
				<z-send-button is-streaming></z-send-button>
				<z-send-button is-disabled></z-send-button>
			`
		}),

		defineInteractiveExample({
			id: 'send-stop-cycle',
			title: 'Send and stop',
			description:
				'The full cycle. Click to send, and the same button becomes stop for the duration of the response — click it again to abort.',
			layout: ExampleLayout.stack,
			markup: `
				<z-send-button id="cycleButton"></z-send-button>
				<z-text size="sm" color="muted" id="cycleStatus">Ready to send.</z-text>
			`,
			script: `
				const cycleButton = document.querySelector('#cycleButton')

				cycleButton.addEventListener('send', () => {
				  cycleButton.setAttribute('is-streaming', '')
				  startCompletion()
				})

				cycleButton.addEventListener('stop', () => {
				  cycleButton.removeAttribute('is-streaming')
				  abortCompletion()
				})
			`,
			wire: (root) => {
				const cycleButton = queryPreview<HTMLElement>(root, '#cycleButton')
				const cycleStatus = queryPreview<HTMLElement>(root, '#cycleStatus')

				let completionTimer = 0

				cycleButton.addEventListener('send', () => {
					cycleButton.setAttribute('is-streaming', '')
					cycleStatus.textContent = 'Streaming a response…'

					completionTimer = window.setTimeout(() => {
						cycleButton.removeAttribute('is-streaming')
						cycleStatus.textContent = 'Response complete.'
					}, 2600)
				})

				cycleButton.addEventListener('stop', () => {
					window.clearTimeout(completionTimer)
					cycleButton.removeAttribute('is-streaming')
					cycleStatus.textContent = 'Stopped by the user.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'empty-composer',
			title: 'Disabled until there is something to send',
			description:
				'The standard composer rule: the button stays disabled while the input is empty, and enables as soon as there is content.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row gap="3" align="end" style="width: 420px">
				  <z-input id="composerInput" placeholder="Ask anything…"></z-input>
				  <z-send-button id="guardedButton" is-disabled></z-send-button>
				</z-row>
			`,
			script: `
				const composerInput = document.querySelector('#composerInput')
				const guardedButton = document.querySelector('#guardedButton')

				composerInput.addEventListener('input', (inputEvent) => {
				  const hasContent = inputEvent.detail.value.trim() !== ''
				  guardedButton.toggleAttribute('is-disabled', !hasContent)
				})
			`,
			wire: (root) => {
				const composerInput = queryPreview<HTMLElement>(root, '#composerInput')
				const guardedButton = queryPreview<HTMLElement>(root, '#guardedButton')

				composerInput.addEventListener('input', (inputEvent) => {
					const detail = (inputEvent as CustomEvent<{ value: string }>).detail
					const hasContent = detail.value.trim() !== ''
					guardedButton.toggleAttribute('is-disabled', !hasContent)
				})
			}
		}),

		defineMarkupExample({
			id: 'custom-label',
			title: 'Custom label',
			description:
				'`label` renames the idle state for screen readers. The streaming state always announces "Stop" regardless, because that is what it does.',
			markup: `
				<z-send-button label="Send message"></z-send-button>
				<z-send-button label="Run prompt"></z-send-button>
			`
		})
	],

	attributes: [
		{
			name: 'is-streaming',
			type: 'boolean',
			defaultValue: '—',
			description: 'Shows the stop square instead of the send arrow, and switches which event fires.'
		},
		{
			name: 'is-disabled',
			type: 'boolean',
			defaultValue: '—',
			description: 'Disables the idle state. Deliberately ignored while streaming so stop is always clickable.'
		},
		{
			name: 'label',
			type: 'string',
			defaultValue: 'Send',
			description: 'Accessible name for the idle state. Streaming always announces "Stop".'
		},
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the button from layout.' }
	],

	properties: [],
	slots: [],

	events: [
		{ name: 'send', detail: '—', description: 'Clicked while idle.' },
		{ name: 'stop', detail: '—', description: 'Clicked while streaming.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The accessible name changes with the state, so a screen reader user hears "Stop" when the button will stop rather than a stale "Send".',
		'is-disabled is ignored while streaming by design — a user must always be able to abort a response in flight.',
		'It is a native button, so Enter and Space activate it and it sits in the tab order without extra work.',
		'When the composer submits on Enter, keep the button as a second route to the same action rather than the only one.'
	],

	related: [
		{ tag: 'z-composer', route: '/c/chat/z-composer', description: 'The message input this button belongs to.' },
		{ tag: 'z-button', route: '/c/buttons-actions/z-button', description: 'The general-purpose action control.' },
		{ tag: 'z-thinking', route: '/c/chat/z-thinking', description: 'The other half of the streaming state.' }
	]
}
