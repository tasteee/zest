import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundItem = (): HTMLElement => {
	const group = document.createElement('z-toggle-group')
	group.setAttribute('is-purple', '')
	group.setAttribute('is-outlined', '')

	const item = document.createElement('z-toggle-group-item')
	item.setAttribute('value', 'bold')
	item.setAttribute('is-pressed', '')
	item.textContent = 'Bold'

	group.append(item)
	return group
}

export const zToggleGroupItemDoc: ComponentDocT = {
	tag: 'z-toggle-group-item',
	title: 'z-toggle-group-item',
	tagline: 'One segment of a toggle group — carries a value and a pressed state.',
	status: ComponentStatus.stable,

	description:
		'The child half of `z-toggle-group`. It carries the `value` that identifies it in the group\'s `change` event and the `is-pressed` state that reflects whether it is currently selected. Appearance is inherited from the parent group through shared CSS variables, but every axis can be overridden per item when one segment genuinely needs to differ — a destructive option in an otherwise neutral set, say. Reaching for those overrides routinely is usually a sign the styling belongs on the group.',

	playground: {
		buildElement: buildPlaygroundItem,
		controlNames: [],
		slotLabel: 'Bold'
	},

	usageGuidance: [
		'Always give every item a `value`. Without one the group cannot report which segment changed.',
		'Let the parent group set tone, size, and kind. Per-item overrides exist for exceptions, not for styling a whole set one item at a time.',
		'Set `is-pressed` in the markup to establish the initial selection rather than pressing it from script after mount.',
		'The `press` event is plumbing between the item and its group — listen for `change` on the group instead.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The label, the icon, or both.' },
		{ name: 'value', description: 'The identifier reported in the parent group\'s change event.' },
		{ name: 'inherited variables', description: 'Tone, size, and kind read from the parent group unless overridden locally.' }
	],

	examples: [
		defineMarkupExample({
			id: 'values',
			title: 'Values and initial state',
			description: 'Each item declares its `value`; the one marked `is-pressed` is the initial selection.',
			markup: `
				<z-toggle-group is-purple is-outlined>
				  <z-toggle-group-item value="bold" is-pressed>Bold</z-toggle-group-item>
				  <z-toggle-group-item value="italic">Italic</z-toggle-group-item>
				  <z-toggle-group-item value="underline">Underline</z-toggle-group-item>
				</z-toggle-group>
			`
		}),

		defineMarkupExample({
			id: 'icon-items',
			title: 'Icon items',
			description: '`is-icon` squares the segment for a lone glyph. Each still needs its own `aria-label`.',
			markup: `
				<z-toggle-group is-purple is-outlined>
				  <z-toggle-group-item value="bold" is-icon aria-label="Bold" is-pressed>${Icons.bold}</z-toggle-group-item>
				  <z-toggle-group-item value="italic" is-icon aria-label="Italic">${Icons.italic}</z-toggle-group-item>
				  <z-toggle-group-item value="underline" is-icon aria-label="Underline">${Icons.underline}</z-toggle-group-item>
				</z-toggle-group>
			`
		}),

		defineMarkupExample({
			id: 'disabled-item',
			title: 'Disabling one segment',
			description:
				'A single unavailable option stays visible and labelled rather than disappearing, so the set does not silently change shape.',
			markup: `
				<z-toggle-group is-purple is-outlined>
				  <z-toggle-group-item value="draft" is-pressed>Draft</z-toggle-group-item>
				  <z-toggle-group-item value="review">In review</z-toggle-group-item>
				  <z-toggle-group-item value="published" is-disabled>Published</z-toggle-group-item>
				</z-toggle-group>
			`
		}),

		defineMarkupExample({
			id: 'overrides',
			title: 'Per-item overrides',
			description:
				'An item can override any inherited axis. Here the last segment breaks tone deliberately — use this sparingly, or the seam stops reading as one control.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toggle-group is-neutral is-outlined>
				  <z-toggle-group-item value="keep" is-pressed>Keep</z-toggle-group-item>
				  <z-toggle-group-item value="archive">Archive</z-toggle-group-item>
				  <z-toggle-group-item value="delete" is-pink>Delete</z-toggle-group-item>
				</z-toggle-group>
			`
		}),

		defineInteractiveExample({
			id: 'press-plumbing',
			title: 'The press event',
			description:
				'Items emit `press` and the group turns that into its own `change`. Listening at the item level is only worth it when you need to know which specific segment moved, independent of the resulting selection.',
			layout: ExampleLayout.stack,
			markup: `
				<z-toggle-group id="densityGroup" type="multiple" is-purple is-outlined>
				  <z-toggle-group-item value="compact">Compact</z-toggle-group-item>
				  <z-toggle-group-item value="comfortable" is-pressed>Comfortable</z-toggle-group-item>
				</z-toggle-group>
				<z-text size="sm" color="muted" id="pressStatus">Waiting for a press…</z-text>
			`,
			script: `
				const densityGroup = document.querySelector('#densityGroup')

				densityGroup.addEventListener('press', (pressEvent) => {
				  // fires per item, before the group re-emits change
				  logSegmentChange(pressEvent.detail.value, pressEvent.detail.pressed)
				})
			`,
			wire: (root) => {
				const densityGroup = queryPreview<HTMLElement>(root, '#densityGroup')
				const pressStatus = queryPreview<HTMLElement>(root, '#pressStatus')

				densityGroup.addEventListener('press', (pressEvent) => {
					const detail = (pressEvent as CustomEvent<{ pressed: boolean; value?: string }>).detail
					const stateLabel = detail.pressed ? 'pressed' : 'released'
					pressStatus.textContent = `${detail.value} was ${stateLabel}`
				})
			}
		})
	],

	attributes: [
		{ name: 'value', type: 'string', defaultValue: '—', description: 'Identifies this item in the parent group\'s change event.' },
		{ name: 'is-pressed', type: 'boolean', defaultValue: '—', description: 'Pressed state. Reflects, and is managed by the parent group.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Blocks pointer and keyboard interaction for this segment.' },
		{ name: 'is-icon', type: 'boolean', defaultValue: '—', description: 'Squares the segment for a single icon with no label.' },
		{ name: 'is-neutral', type: 'boolean', defaultValue: 'inherit', description: 'Overrides the inherited tone with neutral.' },
		{ name: 'is-purple', type: 'boolean', defaultValue: 'inherit', description: 'Overrides the inherited tone with purple.' },
		{ name: 'is-pink', type: 'boolean', defaultValue: 'inherit', description: 'Overrides the inherited tone with pink.' },
		{ name: 'is-small', type: 'boolean', defaultValue: 'inherit', description: 'Overrides the inherited density with small.' },
		{ name: 'is-medium', type: 'boolean', defaultValue: 'inherit', description: 'Overrides the inherited density with medium.' },
		{ name: 'is-large', type: 'boolean', defaultValue: 'inherit', description: 'Overrides the inherited density with large.' },
		{ name: 'is-ghost', type: 'boolean', defaultValue: 'inherit', description: 'Overrides the inherited treatment with ghost.' },
		{ name: 'is-outlined', type: 'boolean', defaultValue: 'inherit', description: 'Overrides the inherited treatment with outlined.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the item from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'Label text, an icon, or both.' }],

	events: [
		{
			name: 'press',
			detail: '{ pressed: boolean, value?: string }',
			description: 'Consumed by the parent group to drive its change event. Rarely worth listening to directly.'
		}
	],

	cssVariables: [],

	accessibilityNotes: [
		'Renders a native button with aria-pressed reflecting its state.',
		'An is-icon item needs an aria-label — the SVG contributes no accessible name.',
		'Disabled items stay in the accessibility tree and are announced as unavailable, which is more useful than removing them.',
		'Keep labels stable across pressed and unpressed states so the state is announced once, by aria-pressed.'
	],

	related: [
		{ tag: 'z-toggle-group', route: '/c/buttons-actions/z-toggle-group', description: 'The parent that coordinates these items.' },
		{ tag: 'z-toggle', route: '/c/buttons-actions/z-toggle', description: 'A standalone toggle with no group.' }
	]
}
