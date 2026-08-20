import { defineMarkupExample } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundToolbar = (): HTMLElement => {
	const toolbar = document.createElement('z-toolbar')
	toolbar.innerHTML = `
		<z-button kind="ghost">Bold</z-button>
		<z-button kind="ghost">Italic</z-button>
		<z-line vertical></z-line>
		<z-button kind="ghost">Link</z-button>
	`
	return toolbar
}

export const zToolbarDoc: ComponentDocT = {
	tag: 'z-toolbar',
	title: 'z-toolbar',
	tagline: 'An action strip that is a single tab stop, with arrow keys moving between its controls.',
	status: ComponentStatus.stable,

	description:
		'A real toolbar, not a styled row. It sets `role="toolbar"` and implements roving tabindex: the whole strip takes one Tab, and the arrow keys move focus between the controls inside it, with Home and End jumping to the ends. That matters because a formatting bar with twelve buttons otherwise costs twelve Tab presses to step past. The roving index is recalculated on `focusin` and on any child mutation, so controls added or removed at runtime stay reachable.',

	playground: {
		buildElement: buildPlaygroundToolbar,
		controlNames: [],
		slotLabel: 'Formatting controls'
	},

	usageGuidance: [
		'Reach for a toolbar once a cluster has enough controls that tabbing through them individually would be tedious — roughly four or more.',
		'Divide unrelated clusters with `z-line vertical`, or name them with `z-toolbar-group` when the grouping needs to be announced rather than just seen.',
		'`kind="ghost"` on the children is the usual choice; a strip of outlined buttons turns into a grid of boxes.',
		'A toolbar is for actions on the current context. It is not navigation — use `z-nav-menu` for that.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The controls — buttons, toggles, groups, separators.' },
		{ name: 'overflow slot', description: 'Content pinned to the trailing edge with an automatic left margin.' },
		{ name: 'roving tabindex', description: 'One control holds tabindex 0 at a time; the arrows move it.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic strip',
			description: 'Ghost buttons divided by a vertical separator. Tab into it once, then use the arrow keys.',
			layout: ExampleLayout.fill,
			markup: `
				<z-toolbar>
				  <z-button kind="ghost">${Icons.bold} Bold</z-button>
				  <z-button kind="ghost">${Icons.italic} Italic</z-button>
				  <z-line vertical></z-line>
				  <z-button kind="ghost">${Icons.link} Link</z-button>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'icon-strip',
			title: 'Icon strip',
			description: 'The dense case a toolbar is really for. Each icon-only control carries its own `aria-label`.',
			layout: ExampleLayout.fill,
			markup: `
				<z-toolbar>
				  <z-button kind="ghost" aria-label="Undo">${Icons.undo}</z-button>
				  <z-button kind="ghost" aria-label="Redo">${Icons.redo}</z-button>
				  <z-line vertical></z-line>
				  <z-toggle is-icon kind="ghost" aria-label="Bold">${Icons.bold}</z-toggle>
				  <z-toggle is-icon kind="ghost" aria-label="Italic">${Icons.italic}</z-toggle>
				  <z-toggle is-icon kind="ghost" aria-label="Underline">${Icons.underline}</z-toggle>
				  <z-line vertical></z-line>
				  <z-button kind="ghost" aria-label="Insert link">${Icons.link}</z-button>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'mixed-controls',
			title: 'Mixed controls',
			description:
				'Toggles, buttons, and toggle groups coexist. The roving index walks all of them in document order regardless of type.',
			layout: ExampleLayout.fill,
			markup: `
				<z-toolbar>
				  <z-toggle-group accent="dom" kind="ghost">
				    <z-toggle-group-item value="left" is-icon aria-label="Align left" is-pressed>${Icons.alignLeft}</z-toggle-group-item>
				    <z-toggle-group-item value="center" is-icon aria-label="Align center">${Icons.alignCenter}</z-toggle-group-item>
				    <z-toggle-group-item value="right" is-icon aria-label="Align right">${Icons.alignRight}</z-toggle-group-item>
				  </z-toggle-group>
				  <z-line vertical></z-line>
				  <z-button kind="ghost" size="sm">${Icons.plus} Insert</z-button>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'overflow-slot',
			title: 'Trailing content',
			description:
				'The `overflow` slot pins content to the trailing edge, which is where a primary action or a status readout belongs.',
			layout: ExampleLayout.fill,
			markup: `
				<z-toolbar>
				  <z-button kind="ghost">${Icons.bold} Bold</z-button>
				  <z-button kind="ghost">${Icons.italic} Italic</z-button>
				  <z-button slot="overflow" accent="dom" size="sm">Publish</z-button>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'The `size` attribute sets the gap between controls. Match it to the size of the controls themselves.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toolbar size="sm">
				  <z-button kind="ghost" size="sm">Bold</z-button>
				  <z-button kind="ghost" size="sm">Italic</z-button>
				  <z-button kind="ghost" size="sm">Link</z-button>
				</z-toolbar>

				<z-toolbar size="lg">
				  <z-button kind="ghost" size="lg">Bold</z-button>
				  <z-button kind="ghost" size="lg">Italic</z-button>
				  <z-button kind="ghost" size="lg">Link</z-button>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'scroll-overflow',
			title: 'Narrow bars',
			description:
				'`overflow="scroll"` keeps a too-narrow strip usable by scrolling it; `overflow="wrap"` lets it break onto a second line instead.',
			layout: ExampleLayout.fill,
			markup: `
				<div style="width: 280px">
				  <z-toolbar overflow="scroll">
				    <z-button kind="ghost" aria-label="Undo">${Icons.undo}</z-button>
				    <z-button kind="ghost" aria-label="Redo">${Icons.redo}</z-button>
				    <z-button kind="ghost" aria-label="Bold">${Icons.bold}</z-button>
				    <z-button kind="ghost" aria-label="Italic">${Icons.italic}</z-button>
				    <z-button kind="ghost" aria-label="Underline">${Icons.underline}</z-button>
				    <z-button kind="ghost" aria-label="Align left">${Icons.alignLeft}</z-button>
				    <z-button kind="ghost" aria-label="Insert link">${Icons.link}</z-button>
				  </z-toolbar>
				</div>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description: '`disabled` on the bar takes every control in it out of service at once.',
			layout: ExampleLayout.fill,
			markup: `
				<z-toolbar disabled>
				  <z-button kind="ghost">${Icons.bold} Bold</z-button>
				  <z-button kind="ghost">${Icons.italic} Italic</z-button>
				  <z-button kind="ghost">${Icons.link} Link</z-button>
				</z-toolbar>
			`
		})
	],

	attributes: [
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Gap between controls.' },
		{
			name: 'overflow',
			type: 'scroll | wrap | menu',
			defaultValue: '—',
			description: 'How a too-narrow bar behaves. The menu value is not implemented yet.'
		},
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Disables every control in the bar.' }
	],

	properties: [],

	slots: [
		{ name: '(default)', description: 'Toolbar controls — buttons, toggles, toggle groups, separators.' },
		{ name: 'overflow', description: 'Content pinned to the trailing edge with an automatic left margin.' }
	],

	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Sets role="toolbar" and implements roving tabindex, so the bar is one tab stop and the arrow keys move within it — Home and End jump to the ends.',
		'The roving index is recalculated on focusin and on any child mutation, so controls added or removed at runtime stay keyboard-reachable.',
		'Give the toolbar an aria-label naming what it acts on. "Text formatting" is useful; "Toolbar" is not.',
		'Icon-only controls still need their own aria-label — the toolbar label names the strip, not its buttons.',
		'Use z-toolbar-group rather than a bare separator when a cluster needs to be announced as a named set, not just drawn as one.'
	],

	related: [
		{ tag: 'z-toolbar-group', route: '/c/buttons-actions/z-toolbar-group', description: 'A labelled cluster inside a toolbar.' },
		{ tag: 'z-button', route: '/c/buttons-actions/z-button', description: 'The usual toolbar control.' },
		{ tag: 'z-toggle', route: '/c/buttons-actions/z-toggle', description: 'Stateful toolbar controls.' },
		{ tag: 'z-line', route: '/c/foundation/z-line', description: 'Draws a vertical rule between clusters.' }
	]
}
