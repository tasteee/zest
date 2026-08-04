import { defineMarkupExample } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundGroup = (): HTMLElement => {
	const toolbar = document.createElement('z-toolbar')
	toolbar.innerHTML = `
		<z-toolbar-group label="Text style">
		  <z-button kind="ghost" aria-label="Bold">B</z-button>
		  <z-button kind="ghost" aria-label="Italic">I</z-button>
		</z-toolbar-group>
	`
	return toolbar
}

export const zToolbarGroupDoc: ComponentDocT = {
	tag: 'z-toolbar-group',
	title: 'z-toolbar-group',
	tagline: 'A labelled cluster of related controls inside a toolbar.',
	status: ComponentStatus.stable,

	description:
		'Tightens the spacing between a set of related controls and gives them an accessible name. A `z-separator` draws a boundary that sighted users can see; a toolbar group creates a boundary that is also announced. In a bar with several clusters — text style, alignment, insert — that name is the difference between "button, button, button" and "Text style group, Bold button".',

	playground: {
		buildElement: buildPlaygroundGroup,
		controlNames: [],
		slotLabel: 'Text style'
	},

	usageGuidance: [
		'Always set `label`. An unlabelled group adds visual grouping but no announced grouping, at which point a separator would have done the job with less markup.',
		'Name the category, not the controls: "Text style", not "Bold and italic".',
		'Use a plain `z-separator` for a purely visual break between things that do not form a named category.',
		'Two or three groups per bar is plenty. Past that the bar itself probably wants splitting.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The grouped controls.' },
		{ name: 'label', description: 'Becomes the group\'s `aria-label`, announced before the controls inside it.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'A single group',
			description: 'Controls inside a group sit tighter than the toolbar\'s own gap, which is what makes the cluster visible.',
			layout: ExampleLayout.fill,
			markup: `
				<z-toolbar>
				  <z-toolbar-group label="Text style">
				    <z-button kind="ghost" aria-label="Bold">${Icons.bold}</z-button>
				    <z-button kind="ghost" aria-label="Italic">${Icons.italic}</z-button>
				    <z-button kind="ghost" aria-label="Underline">${Icons.underline}</z-button>
				  </z-toolbar-group>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'several-groups',
			title: 'Several groups',
			description:
				'Three named clusters in one bar. The spacing between groups does the visual work; the labels do the announced work.',
			layout: ExampleLayout.fill,
			markup: `
				<z-toolbar>
				  <z-toolbar-group label="History">
				    <z-button kind="ghost" aria-label="Undo">${Icons.undo}</z-button>
				    <z-button kind="ghost" aria-label="Redo">${Icons.redo}</z-button>
				  </z-toolbar-group>

				  <z-separator direction="vertical"></z-separator>

				  <z-toolbar-group label="Text style">
				    <z-toggle is-icon kind="ghost" aria-label="Bold">${Icons.bold}</z-toggle>
				    <z-toggle is-icon kind="ghost" aria-label="Italic">${Icons.italic}</z-toggle>
				  </z-toolbar-group>

				  <z-separator direction="vertical"></z-separator>

				  <z-toolbar-group label="Alignment">
				    <z-toggle is-icon kind="ghost" aria-label="Align left" is-pressed>${Icons.alignLeft}</z-toggle>
				    <z-toggle is-icon kind="ghost" aria-label="Align center">${Icons.alignCenter}</z-toggle>
				    <z-toggle is-icon kind="ghost" aria-label="Align right">${Icons.alignRight}</z-toggle>
				  </z-toolbar-group>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'with-trailing-action',
			title: 'Groups plus a trailing action',
			description: 'Groups on the leading edge, the primary action pinned to the trailing edge via the toolbar\'s `overflow` slot.',
			layout: ExampleLayout.fill,
			markup: `
				<z-toolbar>
				  <z-toolbar-group label="Text style">
				    <z-toggle is-icon kind="ghost" aria-label="Bold">${Icons.bold}</z-toggle>
				    <z-toggle is-icon kind="ghost" aria-label="Italic">${Icons.italic}</z-toggle>
				  </z-toolbar-group>

				  <z-separator direction="vertical"></z-separator>

				  <z-toolbar-group label="Insert">
				    <z-button kind="ghost" aria-label="Insert link">${Icons.link}</z-button>
				    <z-button kind="ghost" aria-label="Insert image">${Icons.plus}</z-button>
				  </z-toolbar-group>

				  <z-button slot="overflow" accent="dom" size="sm">Save</z-button>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'vertical-toolbar',
			title: 'Inside a vertical toolbar',
			description: 'Groups follow the parent bar\'s axis, so the same markup works in either orientation.',
			markup: `
				<z-toolbar direction="vertical">
				  <z-toolbar-group label="Text style">
				    <z-button kind="ghost" aria-label="Bold">${Icons.bold}</z-button>
				    <z-button kind="ghost" aria-label="Italic">${Icons.italic}</z-button>
				  </z-toolbar-group>

				  <z-separator></z-separator>

				  <z-toolbar-group label="Insert">
				    <z-button kind="ghost" aria-label="Insert link">${Icons.link}</z-button>
				  </z-toolbar-group>
				</z-toolbar>
			`
		})
	],

	attributes: [
		{ name: 'label', type: 'string', defaultValue: '—', description: 'The accessible group name, exposed as aria-label.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the group from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The grouped controls.' }],

	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'The label becomes the group\'s accessible name, so assistive technology announces the category before the controls inside it.',
		'The parent toolbar\'s roving tabindex still walks straight through the group — grouping changes what is announced, not how focus moves.',
		'Controls inside a group keep needing their own accessible names; the group name does not substitute for them.',
		'Without a label the grouping is purely visual, which is a reason to use z-separator instead.'
	],

	related: [
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'The bar these groups live in.' },
		{ tag: 'z-separator', route: '/c/foundation/z-separator', description: 'A purely visual divider.' },
		{ tag: 'z-button-group', route: '/c/buttons-actions/z-button-group', description: 'Buttons joined into one seamless control.' }
	]
}
