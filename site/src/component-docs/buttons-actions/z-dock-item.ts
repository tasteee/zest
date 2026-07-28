import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundItem = (): HTMLElement => {
	const dock = document.createElement('z-dock')

	const item = document.createElement('z-dock-item')
	item.setAttribute('label', 'Mail')
	item.setAttribute('is-active', '')
	item.innerHTML = Icons.mail

	dock.append(item)
	return dock
}

export const zDockItemDoc: ComponentDocT = {
	tag: 'z-dock-item',
	title: 'z-dock-item',
	tagline: 'One icon in a dock — renders the glyph, its tooltip, and the active indicator.',
	status: ComponentStatus.stable,

	description:
		'Deliberately passive. The item does not track the pointer or decide how large it should be; the parent `z-dock` measures cursor distance and pushes a `--dock-scale` onto it, and the item simply renders `transform: scale(var(--dock-scale))`. Everything it owns is local: the icon in its slot, the tooltip drawn from `label`, the active dot, and whether it renders as a button or a link. Setting `href` makes it a real anchor, which matters more than it sounds — a dock is navigation, and navigation should support middle-click.',

	playground: {
		buildElement: buildPlaygroundItem,
		controlNames: [],
		slotLabel: 'Mail icon'
	},

	usageGuidance: [
		'Always set `label`. It is the tooltip and the accessible name at once, and an icon on its own is neither.',
		'Use `href` when the item navigates and leave it off when the item runs an action. The element changes from an anchor to a button accordingly.',
		'Keep icons visually consistent — one stroke weight and one optical size across the whole dock, or the magnification will make the mismatch obvious.',
		'`is-active` is yours to manage. The dock does not move it for you.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The icon.' },
		{ name: 'tooltip', description: 'Drawn from `label`, shown on hover and on keyboard focus.' },
		{ name: 'indicator', description: 'The active dot, shown while `is-active` is set.' },
		{ name: '--dock-scale', description: 'Written by the parent dock each frame; the item renders its transform from it.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Icons and tooltips',
			description: 'Hover or tab to any item — the `label` surfaces as a tooltip and doubles as the accessible name.',
			layout: ExampleLayout.center,
			markup: `
				<z-dock>
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				  <z-dock-item label="Music">${Icons.music}</z-dock-item>
				</z-dock>
			`
		}),

		defineMarkupExample({
			id: 'active',
			title: 'Active indicator',
			description: 'A dot under the item marks the current destination. Only one should carry it at a time.',
			layout: ExampleLayout.center,
			markup: `
				<z-dock>
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail" is-active>${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				</z-dock>
			`
		}),

		defineMarkupExample({
			id: 'links',
			title: 'As links',
			description:
				'`href` renders a real anchor instead of a button, so middle-click and cmd-click open in a new tab exactly as a user expects from navigation.',
			layout: ExampleLayout.center,
			markup: `
				<z-dock>
				  <z-dock-item label="Docs" href="#/">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Buttons" href="#/c/buttons-actions/z-button" is-active>${Icons.settings}</z-dock-item>
				  <z-dock-item label="Toolbar" href="#/c/buttons-actions/z-toolbar">${Icons.terminal}</z-dock-item>
				</z-dock>
			`
		}),

		defineInteractiveExample({
			id: 'select-event',
			title: 'The select event',
			description:
				'A button-mode item emits `select` on click. The event bubbles, so a single listener on the dock covers every item in it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-dock id="actionDock">
				  <z-dock-item label="Finder" data-app="finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail" data-app="mail">${Icons.mail}</z-dock-item>
				  <z-dock-item label="Terminal" data-app="terminal">${Icons.terminal}</z-dock-item>
				</z-dock>
				<z-text size="sm" color="muted" id="selectStatus">Click an item.</z-text>
			`,
			script: `
				const mailItem = document.querySelector('z-dock-item[data-app="mail"]')

				mailItem.addEventListener('select', () => {
				  openApp('mail')
				})
			`,
			wire: (root) => {
				const actionDock = queryPreview<HTMLElement>(root, '#actionDock')
				const selectStatus = queryPreview<HTMLElement>(root, '#selectStatus')

				actionDock.addEventListener('select', (selectEvent) => {
					const selectedItem = selectEvent.target as HTMLElement
					selectStatus.textContent = `Launched ${selectedItem.dataset.app}`
				})
			}
		}),

		defineMarkupExample({
			id: 'sizing',
			title: 'Inheriting size from the dock',
			description:
				'Items read their footprint from the parent\'s `item-size`, so a dock resizes as one piece rather than item by item.',
			layout: ExampleLayout.stack,
			markup: `
				<z-dock item-size="2.5rem">
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail" is-active>${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				</z-dock>

				<z-dock item-size="3.75rem">
				  <z-dock-item label="Finder">${Icons.finder}</z-dock-item>
				  <z-dock-item label="Mail" is-active>${Icons.mail}</z-dock-item>
				  <z-dock-item label="Calendar">${Icons.calendar}</z-dock-item>
				</z-dock>
			`
		})
	],

	attributes: [
		{
			name: 'label',
			type: 'string',
			defaultValue: '—',
			description: 'The hover and focus tooltip, and the accessible name.'
		},
		{ name: 'href', type: 'string', defaultValue: '—', description: 'Renders the item as a link instead of a button.' },
		{ name: 'is-active', type: 'boolean', defaultValue: '—', description: 'Shows the active indicator dot.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the item from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The icon.' }],

	events: [
		{ name: 'select', detail: '—', description: 'The item was clicked. Bubbles, so the parent dock can handle every item at once.' }
	],

	cssVariables: [
		{ name: '--dock-scale', defaultValue: '1', description: 'Written by the parent dock; the item renders transform: scale() from it.' },
		{ name: '--dock-item-size', defaultValue: '3rem', description: 'Inherited from the parent dock\'s item-size attribute.' }
	],

	accessibilityNotes: [
		'label becomes the aria-label, so an icon-only item is still announced by name.',
		'The tooltip appears on keyboard focus as well as hover, so the label is discoverable without a pointer.',
		'With href it renders an anchor and without it a button, which keeps the announced role honest about what will happen.',
		'The active state is conveyed by the indicator dot rather than by scale, so it survives at any magnification setting.'
	],

	related: [
		{ tag: 'z-dock', route: '/c/buttons-actions/z-dock', description: 'The parent that drives the magnification.' },
		{ tag: 'z-tooltip', route: '/c/overlays/z-tooltip', description: 'The standalone tooltip primitive.' },
		{ tag: 'z-link', route: '/c/buttons-actions/z-link', description: 'Inline text navigation.' }
	]
}
