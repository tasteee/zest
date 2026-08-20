import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundToggle = (): HTMLElement => {
	const toggle = document.createElement('z-toggle')
	toggle.setAttribute('accent', 'dom')
	toggle.innerHTML = `${Icons.bold} Bold`
	return toggle
}

export const zToggleDoc: ComponentDocT = {
	tag: 'z-toggle',
	title: 'z-toggle',
	tagline: 'A button that stays pressed — on/off state you can see without reading a label.',
	status: ComponentStatus.stable,

	description:
		'A standalone two-state button. `is-pressed` reflects, so the attribute is both how you set the initial state and how you read the current one, and the element fires `press` with the new value on every change. Reach for this when the state belongs to the button itself — bold, mute, pin, favourite. When several toggles are alternatives to one another, use `z-toggle-group` so only one can win.',

	playground: {
		buildElement: buildPlaygroundToggle,
		controlNames: [],
		slotLabel: 'Bold'
	},

	usageGuidance: [
		'Use a toggle when the control shows the state of the thing it affects. A button that opens a dialog is not a toggle.',
		'Use `z-switch` instead for a settings row where the label carries the meaning and the control just says on or off. A toggle is for toolbars; a switch is for forms.',
		'The label should name the state being turned on, not the action — "Bold", not "Make bold".',
		'For a set of mutually exclusive options, use `z-toggle-group` in single mode rather than wiring several toggles together by hand.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The label, the icon, or both.' },
		{ name: 'pressed state', description: '`is-pressed` reflects to the attribute and drives both the fill and `aria-pressed`.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Unpressed and pressed, side by side. Pressed fills with the accent; unpressed keeps only its outline.',
			markup: `
				<z-toggle>${Icons.bold} Bold</z-toggle>
				<z-toggle is-pressed>${Icons.bold} Bold</z-toggle>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'Three colour families. The accent only shows once the toggle is pressed.',
			markup: `
				<z-toggle accent="neutral" is-pressed>Neutral</z-toggle>
				<z-toggle accent="dom" is-pressed>Primary</z-toggle>
				<z-toggle accent="sub" is-pressed>Secondary</z-toggle>
			`
		}),

		defineMarkupExample({
			id: 'kinds',
			title: 'Kinds',
			description:
				'`outline` keeps a visible border at rest, `ghost` shows nothing until hover or press. Ghost suits dense toolbars where a grid of borders would be noise.',
			markup: `
				<z-toggle kind="outline">Outline</z-toggle>
				<z-toggle kind="outline" is-pressed>Outline</z-toggle>
				<z-toggle kind="ghost">Ghost</z-toggle>
				<z-toggle kind="ghost" is-pressed>Ghost</z-toggle>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities, matching the z-button scale so the two sit together cleanly in one strip.',
			markup: `
				<z-toggle size="sm" is-pressed>Small</z-toggle>
				<z-toggle size="md" is-pressed>Medium</z-toggle>
				<z-toggle size="lg" is-pressed>Large</z-toggle>
			`
		}),

		defineMarkupExample({
			id: 'icon-only',
			title: 'Icon only',
			description:
				'`is-icon` squares the button for a lone glyph. It carries no accessible name of its own, so add an `aria-label`.',
			markup: `
				<z-toggle is-icon aria-label="Bold" is-pressed>${Icons.bold}</z-toggle>
				<z-toggle is-icon aria-label="Italic">${Icons.italic}</z-toggle>
				<z-toggle is-icon aria-label="Underline">${Icons.underline}</z-toggle>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description: 'Disabled in either state. The pressed state stays legible so the user can still see what is set.',
			markup: `
				<z-toggle disabled>Off and disabled</z-toggle>
				<z-toggle is-pressed disabled>On and disabled</z-toggle>
			`
		}),

		defineInteractiveExample({
			id: 'press-event',
			title: 'Reading the state',
			description:
				'`press` fires with the new value on every change. Because `is-pressed` reflects, reading the attribute afterwards gives you the same answer.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toggle id="muteToggle" accent="dom">Mute notifications</z-toggle>
				<z-text size="sm" color="muted" id="muteStatus">Notifications are on.</z-text>
			`,
			script: `
				const muteToggle = document.querySelector('#muteToggle')

				muteToggle.addEventListener('press', (pressEvent) => {
				  setNotificationsMuted(pressEvent.detail.pressed)
				})
			`,
			wire: (root) => {
				const muteToggle = queryPreview<HTMLElement>(root, '#muteToggle')
				const muteStatus = queryPreview<HTMLElement>(root, '#muteStatus')

				muteToggle.addEventListener('press', (pressEvent) => {
					const detail = (pressEvent as CustomEvent<{ pressed: boolean }>).detail
					muteStatus.textContent = detail.pressed ? 'Notifications are muted.' : 'Notifications are on.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'formatting-bar',
			title: 'In a formatting bar',
			description:
				'Independent toggles, each owning its own state — bold and italic can both be on. That independence is exactly what separates loose toggles from a toggle group.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toolbar id="formatBar">
				  <z-toggle is-icon kind="ghost" aria-label="Bold" data-format="bold">${Icons.bold}</z-toggle>
				  <z-toggle is-icon kind="ghost" aria-label="Italic" data-format="italic">${Icons.italic}</z-toggle>
				  <z-toggle is-icon kind="ghost" aria-label="Underline" data-format="underline">${Icons.underline}</z-toggle>
				</z-toolbar>
				<z-text size="sm" color="muted" id="formatStatus">No formatting applied.</z-text>
			`,
			script: `
				const formatBar = document.querySelector('#formatBar')

				formatBar.addEventListener('press', (pressEvent) => {
				  const format = pressEvent.target.dataset.format
				  applyFormat(format, pressEvent.detail.pressed)
				})
			`,
			wire: (root) => {
				const formatBar = queryPreview<HTMLElement>(root, '#formatBar')
				const formatStatus = queryPreview<HTMLElement>(root, '#formatStatus')

				const describeActiveFormats = (): string => {
					const toggles = [...formatBar.querySelectorAll('z-toggle')]
					const pressedToggles = toggles.filter((toggle) => toggle.hasAttribute('is-pressed'))
					const formatNames = pressedToggles.map((toggle) => (toggle as HTMLElement).dataset.format)

					const hasAnyFormat = formatNames.length > 0
					if (!hasAnyFormat) return 'No formatting applied.'

					return `Active: ${formatNames.join(', ')}.`
				}

				formatBar.addEventListener('press', () => {
					formatStatus.textContent = describeActiveFormats()
				})
			}
		})
	],

	attributes: [
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Colour family of the pressed state.' },
		{ name: 'kind', type: 'outline | ghost', defaultValue: 'outline', description: 'Whether a border shows at rest.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Control density.' },
		{ name: 'is-icon', type: 'boolean', defaultValue: '—', description: 'Squares the button for a single icon with no label.' },
		{
			name: 'is-pressed',
			type: 'boolean',
			defaultValue: '—',
			description: 'The on/off state. Reflects, so it is both the initial value and the live one.'
		},
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Blocks pointer and keyboard interaction.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the toggle from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'Label text, an icon, or both.' }],

	events: [
		{ name: 'press', detail: '{ pressed: boolean }', description: 'Fires after every state change, carrying the new value.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'Renders a native button with aria-pressed kept in sync, which is what makes assistive technology announce it as a toggle rather than a plain button.',
		'Enter and Space both activate it, and it takes its natural place in the tab order.',
		'An is-icon toggle has no accessible name — always pair it with an aria-label.',
		'The label should stay constant across states. Changing it from "Mute" to "Unmute" while aria-pressed also flips double-announces the state.'
	],

	related: [
		{ tag: 'z-toggle-group', route: '/c/buttons-actions/z-toggle-group', description: 'Coordinate several toggles as one control.' },
		{ tag: 'z-switch', route: '/c/forms/z-switch', description: 'The settings-row equivalent.' },
		{ tag: 'z-button', route: '/c/buttons-actions/z-button', description: 'For actions with no persistent state.' }
	]
}
