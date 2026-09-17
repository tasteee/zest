import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, EvidenceLevel, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundGroup = (): HTMLElement => {
	const group = document.createElement('z-toggle-button-group')
	group.setAttribute('accent', 'dom')
	group.setAttribute('kind', 'outline')
	group.innerHTML = `
		<z-toggle-button-group-item value="left" aria-label="Align left" is-pressed>${Icons.alignLeft}</z-toggle-button-group-item>
		<z-toggle-button-group-item value="center" aria-label="Align center">${Icons.alignCenter}</z-toggle-button-group-item>
		<z-toggle-button-group-item value="right" aria-label="Align right">${Icons.alignRight}</z-toggle-button-group-item>
	`
	return group
}

export const zToggleButtonGroupDoc: ComponentDocT = {
	tag: 'z-toggle-button-group',
	title: 'z-toggle-button-group',
	tagline: 'A segmented control that owns which of its items are pressed.',
	status: ComponentStatus.beta,
	evidence: {
		formAssociated: true,
		keyboard: EvidenceLevel.unverified,
		screenReader: EvidenceLevel.unverified,
		browserTests: false,
		screenshots: false
	},

	description:
		'Coordinates a set of `z-toggle-button-group-item` children and reports the result as a single value. In `single` mode — the default — pressing one item releases the others, which is the right model for a set of alternatives like text alignment. In `multiple` mode any number can stay pressed, which suits filters and formatting marks. The group also owns the shared appearance: the accent, size, and kind flags set CSS variables the items read, so you style the group once instead of every item.',

	playground: {
		buildElement: buildPlaygroundGroup,
		controlNames: ['is-multiple', 'direction', 'accent', 'size', 'kind'],
		slotLabel: 'Alignment items'
	},

	usageGuidance: [
		'Single mode is for alternatives — exactly one answer is correct at a time. Multiple mode is for independent flags that happen to be displayed together.',
		'Set accent, size, and kind on the group rather than on each item. That is what the shared variables are for, and it keeps the seam consistent.',
		'Keep the item count low enough to see at a glance. Past roughly six segments, a `z-select` is easier to scan than a wall of buttons.',
		'`z-button-group` is the right choice when the segments are actions rather than a selection.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The `z-toggle-button-group-item` children.' },
		{ name: 'shared variant variables', description: 'Accent, size, and kind flags on the group become CSS variables each item inherits.' },
		{ name: 'seam', description: 'Items are joined into one control, with the outer radii applied to the first and last.' }
	],

	examples: [
		defineMarkupExample({
			id: 'single',
			title: 'Single selection',
			description: 'The default. Pressing one item releases whichever was pressed before.',
			markup: `
				<z-toggle-button-group accent="dom" kind="outline">
				  <z-toggle-button-group-item value="left" aria-label="Align left" is-pressed>${Icons.alignLeft}</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="center" aria-label="Align center">${Icons.alignCenter}</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="right" aria-label="Align right">${Icons.alignRight}</z-toggle-button-group-item>
				</z-toggle-button-group>
			`
		}),

		defineMarkupExample({
			id: 'multiple',
			title: 'Multiple selection',
			description:
				'`is-multiple` lets any number stay pressed at once, and `change` reports a `string[]` instead of a single value.',
			markup: `
				<z-toggle-button-group is-multiple accent="dom" kind="outline">
				  <z-toggle-button-group-item value="bold" aria-label="Bold" is-pressed>${Icons.bold}</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="italic" aria-label="Italic" is-pressed>${Icons.italic}</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="underline" aria-label="Underline">${Icons.underline}</z-toggle-button-group-item>
				</z-toggle-button-group>
			`
		}),

		defineMarkupExample({
			id: 'text-labels',
			title: 'Text segments',
			description: 'Items take text as readily as icons. Text is the safer default when the options are not universally recognisable.',
			markup: `
				<z-toggle-button-group accent="dom" kind="outline">
				  <z-toggle-button-group-item value="day" is-pressed>Day</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="week">Week</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="month">Month</z-toggle-button-group-item>
				</z-toggle-button-group>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Shared accents',
			description: 'One flag on the group re-accents every item inside it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toggle-button-group accent="neutral" kind="outline">
				  <z-toggle-button-group-item value="a" is-pressed>Neutral</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="b">Neutral</z-toggle-button-group-item>
				</z-toggle-button-group>

				<z-toggle-button-group accent="dom" kind="outline">
				  <z-toggle-button-group-item value="a" is-pressed>Purple</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="b">Purple</z-toggle-button-group-item>
				</z-toggle-button-group>

				<z-toggle-button-group accent="sub" kind="outline">
				  <z-toggle-button-group-item value="a" is-pressed>Pink</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="b">Pink</z-toggle-button-group-item>
				</z-toggle-button-group>
			`
		}),

		defineMarkupExample({
			id: 'kinds-sizes',
			title: 'Shared kind and size',
			description: '`kind` drops the resting borders; `size` and `size` shift the whole group at once.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toggle-button-group accent="dom" kind="ghost" size="sm">
				  <z-toggle-button-group-item value="a" is-pressed>Ghost small</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="b">Ghost small</z-toggle-button-group-item>
				</z-toggle-button-group>

				<z-toggle-button-group accent="dom" kind="outline" size="lg">
				  <z-toggle-button-group-item value="a" is-pressed>Outlined large</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="b">Outlined large</z-toggle-button-group-item>
				</z-toggle-button-group>
			`
		}),

		defineMarkupExample({
			id: 'vertical',
			title: 'Vertical',
			description: 'Stacks the segments and shares the vertical seam instead of the horizontal one.',
			markup: `
				<z-toggle-button-group direction="vertical" accent="dom" kind="outline">
				  <z-toggle-button-group-item value="list" is-pressed>List</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="board">Board</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="timeline">Timeline</z-toggle-button-group-item>
				</z-toggle-button-group>
			`
		}),

		defineInteractiveExample({
			id: 'change-single',
			title: 'Reading the value in single mode',
			description:
				'`change.detail.value` is a string in single mode, and `undefined` when the pressed item is released and nothing takes its place.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toggle-button-group id="viewGroup" accent="dom" kind="outline">
				  <z-toggle-button-group-item value="list" is-pressed>List</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="board">Board</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="timeline">Timeline</z-toggle-button-group-item>
				</z-toggle-button-group>
				<z-text size="sm" color="muted" id="viewStatus">Current view: list</z-text>
			`,
			script: `
				const viewGroup = document.querySelector('#viewGroup')

				viewGroup.addEventListener('change', (changeEvent) => {
				  renderView(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const viewGroup = queryPreview<HTMLElement>(root, '#viewGroup')
				const viewStatus = queryPreview<HTMLElement>(root, '#viewStatus')

				viewGroup.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value?: string }>).detail
					const hasValue = Boolean(detail.value)
					viewStatus.textContent = hasValue ? `Current view: ${detail.value}` : 'No view selected'
				})
			}
		}),

		defineInteractiveExample({
			id: 'change-multiple',
			title: 'Reading the value in multiple mode',
			description: 'The same event, but `value` arrives as an array of every currently pressed item.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toggle-button-group id="filterGroup" is-multiple accent="dom" kind="outline">
				  <z-toggle-button-group-item value="open" is-pressed>Open</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="in-review">In review</z-toggle-button-group-item>
				  <z-toggle-button-group-item value="merged">Merged</z-toggle-button-group-item>
				</z-toggle-button-group>
				<z-text size="sm" color="muted" id="filterStatus">Showing: open</z-text>
			`,
			script: `
				const filterGroup = document.querySelector('#filterGroup')

				filterGroup.addEventListener('change', (changeEvent) => {
				  applyFilters(changeEvent.detail.value)
				})
			`,
			wire: (root) => {
				const filterGroup = queryPreview<HTMLElement>(root, '#filterGroup')
				const filterStatus = queryPreview<HTMLElement>(root, '#filterStatus')

				filterGroup.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value?: string | string[] }>).detail
					const selectedValues = Array.isArray(detail.value) ? detail.value : []

					const hasSelection = selectedValues.length > 0
					filterStatus.textContent = hasSelection ? `Showing: ${selectedValues.join(', ')}` : 'Showing: nothing'
				})
			}
		})
	],

	attributes: [
		{ name: 'name', type: 'string', defaultValue: '—', description: 'The FormData entry name. The pressed value is submitted; with is-multiple, every pressed value under the same name.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Marks the group disabled for the form and assistive technology.' },
		{ name: 'is-multiple', type: 'boolean', defaultValue: '—', description: 'Lets any number of items stay pressed at once, instead of just one.' },
		{ name: 'direction', type: 'horizontal | vertical', defaultValue: 'horizontal', description: 'Sets the segment layout axis.' },
		{ name: 'accent', type: 'dom | sub | neutral | success | warning | error', defaultValue: '—', description: 'Shared accent for every item.' },
		{ name: 'size', type: 'xs | sm | md | lg', defaultValue: 'md', description: 'Shared density for every item.' },
		{ name: 'kind', type: 'solid | outline | ghost | soft | plain', defaultValue: 'ghost', description: 'Shared treatment for every item.' },
		{ name: 'is-icon', type: 'boolean', defaultValue: '—', description: 'Square icon-only items. Composes with any kind, which is why it stayed a boolean when the other flags became enums.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the group from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The z-toggle-button-group-item children.' }],

	events: [
		{
			name: 'change',
			detail: '{ value?: string | string[] }',
			description: 'A string in single mode (undefined when cleared), or an array of pressed values in multiple mode.'
		}
	],

	cssVariables: [],

	accessibilityNotes: [
		'Each item is a native button with its own aria-pressed, so the group reads as a set of toggles rather than a custom widget.',
		'Give the group an aria-label naming what is being chosen — "Text alignment", "Status filter".',
		'Icon-only items need an aria-label each; the group label does not name them individually.',
		'Every item stays its own tab stop. Wrap the group in z-toolbar if you want one tab stop with arrow-key movement.'
	],

	related: [
		{ tag: 'z-toggle-button-group-item', route: '/elements/actionables/z-toggle-button-group-item', description: 'The individual segments.' },
		{ tag: 'z-toggle-button', route: '/elements/actionables/z-toggle-button', description: 'A standalone toggle.' },
		{ tag: 'z-button-group', route: '/elements/actionables/z-button-group', description: 'A segmented control of actions.' },
		{ tag: 'z-radio-group', route: '/elements/actionables/z-radio-group', description: 'The form-field equivalent of single selection.' }
	]
}
