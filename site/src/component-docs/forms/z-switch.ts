import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSwitch = (): HTMLElement => {
	const toggle = document.createElement('z-switch')
	toggle.setAttribute('is-checked', '')
	toggle.setAttribute('accent', 'dom')
	toggle.textContent = 'Two-factor authentication'
	return toggle
}

export const zSwitchDoc: ComponentDocT = {
	tag: 'z-switch',
	title: 'z-switch',
	tagline: 'On or off, applied the moment it moves.',
	status: ComponentStatus.stable,

	description:
		'A track and a knob. Off is a hairline pill; on fills with the accent and slides the knob to the right. The distinction from `z-checkbox` is not visual, it is temporal: a switch takes effect immediately, a checkbox waits for submit. That is the only question worth asking when choosing between them.',

	playground: {
		buildElement: buildPlaygroundSwitch,
		controlNames: ['size', 'accent', 'is-checked', 'disabled', 'is-block'],
		slotLabel: 'Two-factor authentication'
	},

	usageGuidance: [
		'Use a switch for settings that apply on the spot. If the value only matters once a form is submitted, use `z-checkbox`.',
		'Never put a switch in a form with a Save button. The user cannot tell whether the switch already took effect or is waiting on the button — and neither reading is safe to assume.',
		'Label the setting, not the state. "Two-factor authentication" with the switch showing on; not "Enable two-factor authentication" that becomes a lie once it is on.',
		'The track stays compact, but its clickable label occupies the shared control height. Beside a top-labelled input, use `z-field is-label-reserved` around the switch to align their control bands.',
		'For a settings row, `is-block` plus a row layout puts the label on the left and the switch on the right, which is where the eye looks for it.',
		'A switch is not for toolbars — that is `z-toggle`, which reads as a pressed button rather than a setting.',
		'If flipping it is destructive or slow, confirm afterwards rather than making the switch pending. A switch that snaps back is worse than one that asks.'
	],

	anatomy: [
		{ name: 'track', description: 'The pill. Hairline border when off, accent fill when on.' },
		{ name: 'knob', description: 'The solid disc that slides between the two ends. Flat — no shadow, no bevel.' },
		{ name: 'default slot', description: 'The label, inside the clickable region.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Off and on. The knob slides and the track fills — two signals for one state change.',
			markup: `
				<z-switch>Off</z-switch>
				<z-switch is-checked>On</z-switch>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'The accent that fills the track. Only visible in the on state.',
			markup: `
				<z-switch accent="neutral" is-checked>Neutral</z-switch>
				<z-switch accent="dom" is-checked>Primary</z-switch>
				<z-switch accent="sub" is-checked>Secondary</z-switch>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities. Small suits a dense settings table; large suits a single prominent setting.',
			markup: `
				<z-switch size="sm" is-checked>Small</z-switch>
				<z-switch size="md" is-checked>Medium</z-switch>
				<z-switch size="lg" is-checked>Large</z-switch>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description: 'Disabled in both states. The on state stays readable so the user can still see what is configured.',
			markup: `
				<z-switch disabled>Off and disabled</z-switch>
				<z-switch is-checked disabled>On and disabled</z-switch>
			`
		}),

		defineMarkupExample({
			id: 'settings-row',
			title: 'Settings rows',
			description:
				'The canonical layout: the label and its explanation on the left, the switch pinned right. The switch column is what makes a list of settings scannable.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="none" style="width: 100%">
				  <wired-row x="between" y="center" gap="md" style="padding: 0.875rem 0">
				    <wired-column gap="2xs">
				      <z-text size="sm">Two-factor authentication</z-text>
				      <z-text size="xs" color="muted">Require a code from your authenticator app.</z-text>
				    </wired-column>
				    <z-switch accent="dom" is-checked aria-label="Two-factor authentication"></z-switch>
				  </wired-row>
				  <z-separator></z-separator>
				  <wired-row x="between" y="center" gap="md" style="padding: 0.875rem 0">
				    <wired-column gap="2xs">
				      <z-text size="sm">Public profile</z-text>
				      <z-text size="xs" color="muted">Anyone with the link can see your work.</z-text>
				    </wired-column>
				    <z-switch accent="dom" aria-label="Public profile"></z-switch>
				  </wired-row>
				</wired-column>
			`
		}),

		defineInteractiveExample({
			id: 'change-event',
			title: 'Applying the change',
			description:
				'`change` fires with the new state. Because the switch means "already applied", the work belongs right here in the handler — not behind a later Save.',
			layout: ExampleLayout.stack,
			markup: `
				<z-switch id="previewSwitch" accent="dom" is-block>Show previews in the sidebar</z-switch>
				<z-text size="sm" color="muted" id="previewStatus">Previews are off.</z-text>
			`,
			script: `
				const previewSwitch = document.querySelector('#previewSwitch')

				previewSwitch.addEventListener('change', (changeEvent) => {
				  savePreference('sidebarPreviews', changeEvent.detail.checked)
				})
			`,
			wire: (root) => {
				const previewSwitch = queryPreview<HTMLElement>(root, '#previewSwitch')
				const previewStatus = queryPreview<HTMLElement>(root, '#previewStatus')

				previewSwitch.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ checked: boolean }>).detail
					previewStatus.textContent = detail.checked ? 'Previews are on — saved.' : 'Previews are off — saved.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'dependent-settings',
			title: 'Dependent settings',
			description:
				'A master switch that disables what it governs. Disabling the dependents is more honest than hiding them — the user can still see what they would get.',
			layout: ExampleLayout.stack,
			markup: `
				<z-switch id="notificationsSwitch" accent="dom" is-block is-checked>Email notifications</z-switch>
				<wired-column gap="xs" style="padding-left: 1rem">
				  <z-switch is-block size="sm" class="notificationChannel" is-checked>Mentions</z-switch>
				  <z-switch is-block size="sm" class="notificationChannel">Weekly digest</z-switch>
				</wired-column>
			`,
			script: `
				const notificationsSwitch = document.querySelector('#notificationsSwitch')
				const channels = document.querySelectorAll('.notificationChannel')

				notificationsSwitch.addEventListener('change', (changeEvent) => {
				  for (const channel of channels) channel.disabled = !changeEvent.detail.checked
				})
			`,
			wire: (root) => {
				const notificationsSwitch = queryPreview<HTMLElement>(root, '#notificationsSwitch')

				notificationsSwitch.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ checked: boolean }>).detail
					const channels = root.querySelectorAll('.notificationChannel')

					for (const channel of channels) {
						if (detail.checked) channel.removeAttribute('disabled')
						if (!detail.checked) channel.setAttribute('disabled', '')
					}
				})
			}
		})
	],

	attributes: [
		{ name: 'is-checked', type: 'boolean', defaultValue: '—', description: 'The on state. Reflects, so it is both the initial value and the live one.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks pointer and keyboard interaction.' },
		{ name: 'is-block', type: 'boolean', defaultValue: '—', description: 'Makes the switch fill its row rather than sit inline.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Size of the track and knob. The label scale is unchanged.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent family of the on state.' },
		{ name: 'name', type: 'string', defaultValue: '—', description: 'Name passed to the inner input.' },
		{ name: 'value', type: 'string', defaultValue: '—', description: 'Value echoed back in the change event, for one handler serving several switches.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the switch from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The label. Omit it and set aria-label when the surrounding row already names the setting.' }],

	events: [
		{ name: 'change', detail: '{ checked: boolean, value?: string }', description: 'Fires after every state change, carrying the new value.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'The inner input carries role="switch", so it is announced as on or off rather than checked or unchecked.',
		'Space toggles it and it sits in the tab order naturally — the visible track and knob are aria-hidden decoration over a real control.',
		'When the label lives outside the switch, as in a settings row, give the switch an aria-label. A switch with no accessible name is announced only as "switch".',
		'Do not change the label text as the state flips. The role already announces on and off; a changing label doubles the announcement and contradicts itself.',
		'The knob position carries the state as well as the fill colour, so the control is readable without colour perception.'
	],

	related: [
		{ tag: 'z-checkbox', route: '/c/forms/z-checkbox', description: 'When the value is committed on submit rather than applied immediately.' },
		{ tag: 'z-toggle', route: '/c/buttons-actions/z-toggle', description: 'The toolbar equivalent — a button that stays pressed.' },
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'Label and help text treatment.' }
	]
}
