import { defineInteractiveExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

type CommandItemT = {
	value?: string
	label: string
	group?: string
	shortcut?: string
	keywords?: string
	isDisabled?: boolean
}

type CommandElementT = HTMLElement & {
	items: CommandItemT[]
	isOpen: boolean
}

const DEMO_COMMANDS: CommandItemT[] = [
	{ value: 'new-project', label: 'New project', group: 'Create', shortcut: '⌘N', keywords: 'add create' },
	{ value: 'new-doc', label: 'New document', group: 'Create', shortcut: '⌘⇧N', keywords: 'add file page' },
	{ value: 'goto-settings', label: 'Go to settings', group: 'Navigate', shortcut: '⌘,', keywords: 'preferences config' },
	{ value: 'goto-members', label: 'Go to members', group: 'Navigate', keywords: 'people team users' },
	{ value: 'toggle-theme', label: 'Toggle dark mode', group: 'Preferences', keywords: 'theme light appearance' },
	{ value: 'sign-out', label: 'Sign out', group: 'Account', keywords: 'logout leave' }
]

const buildPlaygroundCommand = (): HTMLElement => {
	const command = document.createElement('z-command') as CommandElementT
	command.setAttribute('placeholder', 'Type a command or search…')
	command.items = DEMO_COMMANDS

	const trigger = document.createElement('z-button')
	trigger.setAttribute('slot', 'trigger')
	trigger.setAttribute('kind', 'outline')
	trigger.textContent = 'Open command palette'
	command.append(trigger)

	return command
}

export const zCommandDoc: ComponentDocT = {
	tag: 'z-command',
	title: 'z-command',
	tagline: 'Everything the app can do, one search away.',
	status: ComponentStatus.stable,

	description:
		'A command palette on the native `<dialog>` foundation, so focus trapping, Escape, and the backdrop are free. Commands come from an `items` array; typing filters on the label plus an optional `keywords` string, so a command can be findable by words that are not on screen. Results stay grouped as they narrow, arrow keys move past disabled rows, and Enter runs the active one.',

	playground: {
		buildElement: buildPlaygroundCommand,
		controlNames: ['placeholder', 'empty-text'],
		slotLabel: 'items set as a property'
	},

	usageGuidance: [
		'One palette per application, opened from a global shortcut — ⌘K is the convention and worth following rather than inventing.',
		'Use `keywords` for the words people would search but you would not print. "Sign out" should be findable by "logout", because half your users call it that.',
		'Group by verb, not by feature area — Create, Navigate, Preferences. The user is searching for what they want to do, not where it lives.',
		'Show `shortcut` on anything that has one. A palette is the best shortcut discovery surface you have; people learn the chord while using the slow path.',
		'A palette is an accelerator, not the interface. Every command in it must exist somewhere clickable too.',
		'Keep the list to the commands that are actually available right now. Mark the rest `isDisabled` rather than letting a search find something that will not run.'
	],

	anatomy: [
		{ name: 'trigger slot', description: 'Optional. The palette also opens from code, which is how a keyboard shortcut drives it.' },
		{ name: 'search', description: 'The filter field, focused automatically on open.' },
		{ name: 'list', description: 'Grouped, filtered results. The active row is kept scrolled into view.' },
		{ name: 'group label', description: 'A quiet heading above each group. Groups appear in first-seen order.' },
		{ name: 'shortcut', description: 'The chord, right-aligned in the row.' },
		{ name: 'empty state', description: '`empty-text` in place of the rows when nothing matches.' }
	],

	examples: [
		defineInteractiveExample({
			id: 'basic',
			title: 'Basic',
			description: 'Open it and type. Try "logout" — it finds "Sign out" through its keywords, which is the point of having them.',
			layout: ExampleLayout.start,
			markup: `
				<z-command id="basicCommand" placeholder="Type a command or search…">
				  <z-button slot="trigger" kind="outline">Open command palette</z-button>
				</z-command>
			`,
			script: `
				const basicCommand = document.querySelector('#basicCommand')

				basicCommand.items = [
				  { value: 'new-project', label: 'New project', group: 'Create', shortcut: '⌘N', keywords: 'add create' },
				  { value: 'new-doc', label: 'New document', group: 'Create', shortcut: '⌘⇧N', keywords: 'add file page' },
				  { value: 'goto-settings', label: 'Go to settings', group: 'Navigate', shortcut: '⌘,', keywords: 'preferences config' },
				  { value: 'goto-members', label: 'Go to members', group: 'Navigate', keywords: 'people team users' },
				  { value: 'toggle-theme', label: 'Toggle dark mode', group: 'Preferences', keywords: 'theme light appearance' },
				  { value: 'sign-out', label: 'Sign out', group: 'Account', keywords: 'logout leave' }
				]
			`,
			wire: (root) => {
				const basicCommand = queryPreview<CommandElementT>(root, '#basicCommand')
				basicCommand.items = DEMO_COMMANDS
			}
		}),

		defineInteractiveExample({
			id: 'select-event',
			title: 'Running a command',
			description: '`select` carries the item’s `value`, falling back to its label. The palette closes itself first, so your handler runs against a clean screen.',
			layout: ExampleLayout.stack,
			markup: `
				<z-command id="runCommand" placeholder="Search commands…">
				  <z-button slot="trigger" kind="outline">Open palette</z-button>
				</z-command>
				<z-text size="sm" color="muted" id="runStatus">No command run yet.</z-text>
			`,
			script: `
				const runCommand = document.querySelector('#runCommand')
				runCommand.items = commands

				runCommand.addEventListener('select', (selectEvent) => {
				  runCommandByValue(selectEvent.detail.value)
				})
			`,
			wire: (root) => {
				const runCommand = queryPreview<CommandElementT>(root, '#runCommand')
				const runStatus = queryPreview<HTMLElement>(root, '#runStatus')

				runCommand.items = DEMO_COMMANDS

				runCommand.addEventListener('select', (selectEvent) => {
					const detail = (selectEvent as CustomEvent<{ value: string }>).detail
					const chosen = DEMO_COMMANDS.find((command) => command.value === detail.value)
					runStatus.textContent = chosen ? `Ran: ${chosen.label} (${detail.value})` : `Ran: ${detail.value}`
				})
			}
		}),

		defineInteractiveExample({
			id: 'keyboard-shortcut',
			title: 'Opening with ⌘K',
			description:
				'How a palette is actually opened in production. `isOpen` is two-way, so a global key handler is the whole integration.',
			layout: ExampleLayout.stack,
			markup: `
				<wired-row y="center" gap="sm">
				  <z-button id="shortcutButton" kind="outline">Open</z-button>
				  <z-text size="sm" color="muted">or press <z-kbd>⌘</z-kbd> <z-kbd>K</z-kbd> while this page has focus</z-text>
				</wired-row>
				<z-command id="shortcutCommand" placeholder="Type a command or search…"></z-command>
			`,
			script: `
				const shortcutCommand = document.querySelector('#shortcutCommand')
				shortcutCommand.items = commands

				document.addEventListener('keydown', (keyEvent) => {
				  const isPaletteChord = keyEvent.key === 'k' && (keyEvent.metaKey || keyEvent.ctrlKey)
				  if (!isPaletteChord) return

				  keyEvent.preventDefault()
				  shortcutCommand.isOpen = true
				})
			`,
			wire: (root) => {
				const shortcutCommand = queryPreview<CommandElementT>(root, '#shortcutCommand')
				const shortcutButton = queryPreview<HTMLElement>(root, '#shortcutButton')

				shortcutCommand.items = DEMO_COMMANDS

				shortcutButton.addEventListener('click', () => {
					shortcutCommand.isOpen = true
				})

				document.addEventListener('keydown', (keyEvent) => {
					const isPaletteChord = keyEvent.key === 'k' && (keyEvent.metaKey || keyEvent.ctrlKey)
					if (!isPaletteChord) return

					const isStillOnPage = root.isConnected
					if (!isStillOnPage) return

					keyEvent.preventDefault()
					shortcutCommand.isOpen = true
				})
			}
		}),

		defineInteractiveExample({
			id: 'disabled-items',
			title: 'Unavailable commands',
			description:
				'`isDisabled` keeps a command visible but unrunnable, and the arrow keys skip it. Better than hiding it — the user learns the command exists and can go and earn it.',
			layout: ExampleLayout.start,
			markup: `
				<z-command id="disabledCommand" placeholder="Search commands…">
				  <z-button slot="trigger" kind="outline">Open palette</z-button>
				</z-command>
			`,
			script: `
				const disabledCommand = document.querySelector('#disabledCommand')

				disabledCommand.items = [
				  { value: 'undo', label: 'Undo', group: 'Edit', shortcut: '⌘Z' },
				  { value: 'redo', label: 'Redo', group: 'Edit', shortcut: '⌘⇧Z', isDisabled: true },
				  { value: 'publish', label: 'Publish — needs an owner role', group: 'Project', isDisabled: true }
				]
			`,
			wire: (root) => {
				const disabledCommand = queryPreview<CommandElementT>(root, '#disabledCommand')

				disabledCommand.items = [
					{ value: 'undo', label: 'Undo', group: 'Edit', shortcut: '⌘Z' },
					{ value: 'redo', label: 'Redo', group: 'Edit', shortcut: '⌘⇧Z', isDisabled: true },
					{ value: 'publish', label: 'Publish — needs an owner role', group: 'Project', isDisabled: true }
				]
			}
		}),

		defineInteractiveExample({
			id: 'empty-text',
			title: 'The empty state',
			description: 'Search for something that does not exist. `empty-text` is your chance to say what would help rather than just reporting a zero.',
			layout: ExampleLayout.start,
			markup: `
				<z-command id="emptyCommand" placeholder="Search commands…" empty-text="Nothing matches. Try “new”, “settings”, or “theme”.">
				  <z-button slot="trigger" kind="outline">Open palette</z-button>
				</z-command>
			`,
			script: `
				document.querySelector('#emptyCommand').items = commands
			`,
			wire: (root) => {
				const emptyCommand = queryPreview<CommandElementT>(root, '#emptyCommand')
				emptyCommand.items = DEMO_COMMANDS
			}
		}),

		defineInteractiveExample({
			id: 'ungrouped',
			title: 'Without groups',
			description: 'Omit `group` and the list renders flat. Right for a short palette, where headings add ceremony to six rows.',
			layout: ExampleLayout.start,
			markup: `
				<z-command id="flatCommand" placeholder="Search actions…">
				  <z-button slot="trigger" kind="outline">Open palette</z-button>
				</z-command>
			`,
			script: `
				document.querySelector('#flatCommand').items = [
				  { value: 'rename', label: 'Rename' },
				  { value: 'duplicate', label: 'Duplicate' },
				  { value: 'archive', label: 'Archive' }
				]
			`,
			wire: (root) => {
				const flatCommand = queryPreview<CommandElementT>(root, '#flatCommand')

				flatCommand.items = [
					{ value: 'rename', label: 'Rename' },
					{ value: 'duplicate', label: 'Duplicate' },
					{ value: 'archive', label: 'Archive' }
				]
			}
		})
	],

	attributes: [
		{ name: 'is-open', type: 'boolean', defaultValue: '—', description: 'Whether the palette is showing. Reflects and is two-way — this is how a shortcut opens it.' },
		{ name: 'placeholder', type: 'string', defaultValue: 'Type a command or search…', description: 'Placeholder in the search field.' },
		{ name: 'empty-text', type: 'string', defaultValue: 'No results found.', description: 'Shown when nothing matches the query.' }
	],

	properties: [
		{
			name: 'items',
			type: 'Array<{ value?: string, label: string, group?: string, shortcut?: string, keywords?: string, isDisabled?: boolean }>',
			defaultValue: '[]',
			description: 'The command list. Property only. Filtering matches against label plus keywords.'
		}
	],

	slots: [{ name: 'trigger', description: 'Optional element that opens the palette. Most palettes open from a keyboard shortcut instead.' }],

	events: [
		{ name: 'select', detail: '{ value: string }', description: 'A command was run. Carries value, falling back to the label when no value was given.' },
		{ name: 'open', detail: '—', description: 'Fires after the palette opens. The query and active row are reset first.' },
		{ name: 'close', detail: '—', description: 'Fires after it closes, however it closed.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'Built on showModal(), so focus is trapped, the page behind is inert, and Escape closes — none of it re-implemented.',
		'The search field takes focus on open and the list carries role="listbox" with role="option" rows and aria-selected, so the active row is announced as the user arrows through it.',
		'Arrow keys skip disabled rows rather than landing on something that cannot run, and the active row is scrolled into view as it moves.',
		'Filtering matches label plus keywords, which means a command can be reachable by the word a user actually thinks in without that word cluttering the row.',
		'Keep every command available elsewhere in the interface. A palette-only action is invisible to anyone who does not know the palette exists.'
	],

	related: [
		{ tag: 'z-combobox', route: '/c/forms/z-combobox', description: 'The same filtering idea, for choosing a value.' },
		{ tag: 'z-menu', route: '/c/navigation-disclosure/z-menu', description: 'A short action list anchored to a trigger.' },
		{ tag: 'z-kbd', route: '/c/foundation/z-kbd', description: 'For rendering the shortcuts a palette advertises.' },
		{ tag: 'z-dialog', route: '/c/overlays/z-dialog', description: 'The general modal on the same foundation.' }
	]
}
