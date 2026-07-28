import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSwap = (): HTMLElement => {
	const swap = document.createElement('z-swap')
	swap.setAttribute('label', 'Toggle theme')
	swap.innerHTML = `
		<span slot="off">${Icons.settings}</span>
		<span slot="on">${Icons.check}</span>
	`
	return swap
}

export const zSwapDoc: ComponentDocT = {
	tag: 'z-swap',
	title: 'z-swap',
	tagline: 'Toggles between two faces with a transition — play/pause, sun/moon, menu/close.',
	status: ComponentStatus.stable,

	description:
		'Two slotted faces and a transition between them. `kind` decides how they occupy space: `stack` overlaps both in a single footprint and crossfades, so the control never changes size; `beside` gives each its own space and moves between them. It owns a hidden checkbox, which is what makes it clickable and keyboard-operable for free — but that also means `label` is doing real work as the checkbox\'s accessible name rather than being decoration.',

	playground: {
		buildElement: buildPlaygroundSwap,
		controlNames: ['kind', 'effect', 'has-ghost', 'is-active', 'is-disabled', 'label'],
		slotLabel: 'Two icon faces'
	},

	usageGuidance: [
		'Always set `label`. It names the hidden checkbox, and without it the control is announced as an unlabelled checkbox.',
		'`stack` is the right default for an icon button — the footprint stays fixed, so nothing around it shifts when the state flips.',
		'The two faces should mean opposite things. A swap that changes between unrelated icons reads as a glitch rather than a state.',
		'`has-ghost` only applies to `beside`, where the inactive face stays as a faint silhouette instead of disappearing.'
	],

	anatomy: [
		{ name: 'off slot', description: 'The face shown when inactive.' },
		{ name: 'on slot', description: 'The face shown when active.' },
		{ name: 'hidden checkbox', description: 'Provides the click target, the keyboard behaviour, and the accessible name from `label`.' }
	],

	examples: [
		defineMarkupExample({
			id: 'kinds',
			title: 'Stack and beside',
			description:
				'`stack` keeps one footprint and crossfades. `beside` gives each face its own space. Click either to compare.',
			layout: ExampleLayout.center,
			markup: `
				<z-swap kind="stack" label="Stack example">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>

				<z-swap kind="beside" label="Beside example">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>
			`
		}),

		defineMarkupExample({
			id: 'effects',
			title: 'Effects',
			description: 'Three transitions. Fade is the quietest; rotate and flip draw more attention to the change.',
			layout: ExampleLayout.center,
			markup: `
				<z-swap effect="fade" label="Fade">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>

				<z-swap effect="rotate" label="Rotate">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>

				<z-swap effect="flip" label="Flip">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>
			`
		}),

		defineMarkupExample({
			id: 'ghost',
			title: 'Ghosting the inactive face',
			description:
				'`has-ghost` keeps the inactive face visible as a faint silhouette. It applies to `beside` only, since `stack` has nowhere to show it.',
			layout: ExampleLayout.center,
			markup: `
				<z-swap kind="beside" label="Without ghost">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>

				<z-swap kind="beside" has-ghost label="With ghost">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>
			`
		}),

		defineMarkupExample({
			id: 'states',
			title: 'Initial and disabled states',
			description: '`is-active` sets the starting face and reflects as it changes. `is-disabled` freezes it.',
			layout: ExampleLayout.center,
			markup: `
				<z-swap label="Starts off">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>

				<z-swap is-active label="Starts on">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>

				<z-swap is-disabled label="Disabled">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>
			`
		}),

		defineInteractiveExample({
			id: 'change-event',
			title: 'Reading the state',
			description: '`change` fires on every toggle with the new value, and `is-active` reflects the same thing.',
			layout: ExampleLayout.stack,
			markup: `
				<z-swap id="themeSwap" effect="rotate" label="Toggle theme">
				  <span slot="off">${Icons.settings}</span>
				  <span slot="on">${Icons.check}</span>
				</z-swap>
				<z-text size="sm" color="muted" id="themeStatus">Currently off.</z-text>
			`,
			script: `
				const themeSwap = document.querySelector('#themeSwap')

				themeSwap.addEventListener('change', (changeEvent) => {
				  setTheme(changeEvent.detail.active ? 'dark' : 'light')
				})
			`,
			wire: (root) => {
				const themeSwap = queryPreview<HTMLElement>(root, '#themeSwap')
				const themeStatus = queryPreview<HTMLElement>(root, '#themeStatus')

				themeSwap.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ active: boolean }>).detail
					themeStatus.textContent = detail.active ? 'Currently on.' : 'Currently off.'
				})
			}
		}),

		defineMarkupExample({
			id: 'text-faces',
			title: 'Text faces',
			description: 'The faces do not have to be icons. `beside` suits text well, since the two labels rarely share a width.',
			layout: ExampleLayout.center,
			markup: `
				<z-swap kind="beside" label="Toggle visibility">
				  <z-text slot="off" size="sm">Show</z-text>
				  <z-text slot="on" size="sm">Hide</z-text>
				</z-swap>
			`
		})
	],

	attributes: [
		{
			name: 'kind',
			type: 'stack | beside',
			defaultValue: 'stack',
			description: 'Whether the faces share one footprint and crossfade, or each hold their own space.'
		},
		{ name: 'effect', type: 'fade | rotate | flip', defaultValue: 'fade', description: 'The transition between faces.' },
		{
			name: 'has-ghost',
			type: 'boolean',
			defaultValue: '—',
			description: 'Keeps the inactive face as a faint silhouette. Applies to the beside kind only.'
		},
		{ name: 'is-active', type: 'boolean', defaultValue: '—', description: 'The on/off state. Reflects, so it is both initial and live.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Blocks interaction.' },
		{
			name: 'label',
			type: 'string',
			defaultValue: '—',
			description: 'Accessible name for the hidden checkbox. Effectively required.'
		},
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the swap from layout.' }
	],

	properties: [],

	slots: [
		{ name: 'off', description: 'The face shown when inactive.' },
		{ name: 'on', description: 'The face shown when active.' }
	],

	events: [{ name: 'change', detail: '{ active: boolean }', description: 'Fires on every toggle, carrying the new state.' }],

	cssVariables: [
		{ name: '--swap-ghost-opacity', defaultValue: '—', description: 'Strength of the ghosted inactive face.' },
		{ name: '--swap-duration', defaultValue: '—', description: 'Transition duration.' },
		{ name: '--swap-gap', defaultValue: '—', description: 'Spacing between the faces in the beside kind.' }
	],

	accessibilityNotes: [
		'It is built on a real checkbox, so it is focusable, toggles with Space, and is announced with a checked state — none of which you have to add.',
		'label supplies the checkbox\'s accessible name. Without it the control is announced as an unlabelled checkbox, which tells the user nothing.',
		'Name the control by what it does, not by the current face — "Toggle theme" rather than "Dark mode", since the state is already announced separately.',
		'The rotate and flip effects are motion. Honour prefers-reduced-motion at the page level, or keep to fade where motion sensitivity is a concern.'
	],

	related: [
		{ tag: 'z-toggle', route: '/c/buttons-actions/z-toggle', description: 'A pressed-state button rather than two faces.' },
		{ tag: 'z-switch', route: '/c/forms/z-switch', description: 'The settings-row on/off control.' },
		{ tag: 'z-send-button', route: '/c/buttons-actions/z-send-button', description: 'A purpose-built two-state control.' }
	]
}
