import { defineInteractiveExample, defineMarkupExample, queryAllPreview, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundDock = (): HTMLElement => {
	const dock = document.createElement('z-dock')
	dock.innerHTML = `
		<z-dock-item label="Finder">${Icons.finder}</z-dock-item>
		<z-dock-item label="Mail" is-active>${Icons.mail}</z-dock-item>
		<z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
		<z-dock-item label="Music">${Icons.music}</z-dock-item>
	`
	return dock
}

export const zDockDoc: ComponentDocT = {
	tag: 'z-dock',
	title: 'z-dock',
	tagline: 'A macOS-style dock that magnifies its items as the pointer sweeps across them.',
	status: ComponentStatus.stable,

	description:
		'The dock owns the physics; the items only paint. As the pointer moves across the strip, the dock measures the distance from the cursor to each item and pushes a `--dock-scale` custom property onto it with a linear falloff. That split is what keeps the magnification smooth — one element reads the pointer once per frame instead of every item running its own listener. The per-item scale is also capped so a growing neighbour can never overlap into the next item\'s layout gap.',

	playground: {
		buildElement: buildPlaygroundDock,
		controlNames: ['magnification', 'distance', 'item-size', 'gap', 'floating'],
		slotLabel: 'Dock items'
	},

	usageGuidance: [
		'A dock is for a small, stable set of destinations the user returns to constantly. It is not a nav menu and it does not scale past a dozen or so items.',
		'`magnification` is clamped to 1–1.12 on purpose. The effect should register as responsiveness, not as an animation the user has to wait out.',
		'`floating` fixes the dock to the bottom-centre of the viewport. Leave it off when the dock belongs to a panel rather than to the window.',
		'Raise `distance` for a soft, wide swell across several neighbours; lower it so only the item directly under the cursor responds.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The `z-dock-item` children.' },
		{ name: 'pointer tracking', description: 'The dock measures cursor distance per item and writes `--dock-scale` onto each one.' },
		{ name: 'falloff', description: '`distance` sets how far the magnification reaches; `magnification` sets its peak.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic dock',
			description: 'Sweep the pointer across it — the magnification follows the cursor with a linear falloff to either side.',
			layout: ExampleLayout.center,
			markup: `
				<z-dock>
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail" is-active>${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				  <z-dock-item label="Music">${Icons.music}</z-dock-item>
				  <z-dock-item label="Terminal">${Icons.terminal}</z-dock-item>
				</z-dock>
			`
		}),

		defineMarkupExample({
			id: 'magnification',
			title: 'Magnification',
			description:
				'The peak scale, clamped to 1–1.12. The top row is subtle enough to feel like a hover state; the bottom is the maximum the component allows.',
			layout: ExampleLayout.stack,
			markup: `
				<z-dock magnification="1.02">
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				  <z-dock-item label="Music">${Icons.music}</z-dock-item>
				</z-dock>

				<z-dock magnification="1.12">
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				  <z-dock-item label="Music">${Icons.music}</z-dock-item>
				</z-dock>
			`
		}),

		defineMarkupExample({
			id: 'distance',
			title: 'Falloff distance',
			description:
				'How far the effect reaches, in pixels. A short distance magnifies only what is under the cursor; a long one swells the whole neighbourhood.',
			layout: ExampleLayout.stack,
			markup: `
				<z-dock distance="40">
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				  <z-dock-item label="Music">${Icons.music}</z-dock-item>
				  <z-dock-item label="Terminal">${Icons.terminal}</z-dock-item>
				</z-dock>

				<z-dock distance="180">
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				  <z-dock-item label="Music">${Icons.music}</z-dock-item>
				  <z-dock-item label="Terminal">${Icons.terminal}</z-dock-item>
				</z-dock>
			`
		}),

		defineMarkupExample({
			id: 'sizing',
			title: 'Item size and gap',
			description:
				'`item-size` sets the resting footprint, which children read through `--dock-item-size`. `gap` accepts a size token or a raw length.',
			layout: ExampleLayout.stack,
			markup: `
				<z-dock item-size="2.25rem" gap="xs">
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				</z-dock>

				<z-dock item-size="4rem" gap="lg">
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				</z-dock>
			`
		}),

		defineInteractiveExample({
			id: 'active-item',
			title: 'Tracking the active item',
			description:
				'`is-active` draws the indicator dot. The dock does not manage it — move it yourself when the destination changes, the same way you would with any router-driven nav.',
			layout: ExampleLayout.stack,
			markup: `
				<z-dock id="appDock">
				  <z-dock-item label="Finder" data-app="finder" is-active>${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail" data-app="mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar" data-app="calendar">${Icons.calendar}</z-dock-item>
				  <z-dock-item label="Music" data-app="music">${Icons.music}</z-dock-item>
				</z-dock>
				<z-text size="sm" color="muted" id="appStatus">Open: finder</z-text>
			`,
			script: `
				const appDock = document.querySelector('#appDock')
				const dockItems = appDock.querySelectorAll('z-dock-item')

				appDock.addEventListener('select', (selectEvent) => {
				  for (const dockItem of dockItems) {
				    dockItem.removeAttribute('is-active')
				  }
				  selectEvent.target.setAttribute('is-active', '')
				  openApp(selectEvent.target.dataset.app)
				})
			`,
			wire: (root) => {
				const appDock = queryPreview<HTMLElement>(root, '#appDock')
				const appStatus = queryPreview<HTMLElement>(root, '#appStatus')
				const dockItems = queryAllPreview<HTMLElement>(root, 'z-dock-item')

				appDock.addEventListener('select', (selectEvent) => {
					const selectedItem = selectEvent.target as HTMLElement

					for (const dockItem of dockItems) {
						dockItem.removeAttribute('is-active')
					}
					selectedItem.setAttribute('is-active', '')
					appStatus.textContent = `Open: ${selectedItem.dataset.app}`
				})
			}
		})
	],

	attributes: [
		{
			name: 'magnification',
			type: 'number',
			defaultValue: '1.08',
			description: 'Peak scale factor under the cursor, clamped to the 1–1.12 range.'
		},
		{ name: 'distance', type: 'number', defaultValue: '96', description: 'Pointer falloff reach, in pixels.' },
		{
			name: 'item-size',
			type: 'string',
			defaultValue: '3rem',
			description: 'Resting item footprint, read by children through --dock-item-size.'
		},
		{ name: 'gap', type: 'string', defaultValue: '0.75rem', description: 'Gap between items. Takes a size token or a raw length.' },
		{
			name: 'floating',
			type: 'boolean',
			defaultValue: '—',
			description: 'Fixes the dock to the bottom-centre of the viewport.'
		},
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the dock from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The z-dock-item children.' }],

	events: [
		{
			name: 'select',
			detail: '—',
			description: 'Bubbles from a clicked z-dock-item. Read event.target to find which one.'
		}
	],

	cssVariables: [
		{ name: '--dock-item-size', defaultValue: '3rem', description: 'Set from item-size and read by each child for its base footprint.' },
		{ name: '--dock-scale', defaultValue: '1', description: 'Written per-item every frame; children render transform: scale() from it.' }
	],

	accessibilityNotes: [
		'Magnification is decorative. Every item stays a real button or link at its resting hit area, so pointer precision is never required to activate one.',
		'Each item needs a label — it becomes both the hover tooltip and the aria-label.',
		'Items are individually focusable and the indicator is not conveyed by scale alone, so keyboard users get the same information.',
		'Respect reduced-motion preferences at the page level if you raise magnification near its ceiling.'
	],

	related: [
		{ tag: 'z-dock-item', route: '/c/buttons-actions/z-dock-item', description: 'The icons this dock magnifies.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'An action strip rather than a destination strip.' },
		{ tag: 'z-nav-menu', route: '/c/navigation-disclosure/z-nav-menu', description: 'Navigation that scales past a handful of items.' }
	]
}
