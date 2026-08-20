import { defineInteractiveExample, defineMarkupExample, queryAllPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundGroup = (): HTMLElement => {
	const group = document.createElement('z-button-group')
	group.innerHTML = `
		<z-button kind="outline">Day</z-button>
		<z-button kind="outline">Week</z-button>
		<z-button kind="outline">Month</z-button>
	`
	return group
}

export const zButtonGroupDoc: ComponentDocT = {
	tag: 'z-button-group',
	title: 'z-button-group',
	tagline: 'Joins adjacent buttons into a single segmented control.',
	status: ComponentStatus.stable,

	description:
		'A layout wrapper, not a state container. It manages the three things that make a row of buttons look like one control instead of three: the corner radii on the first and last child, the 1px border overlap between neighbours, and the stacking order so a focused button draws its ring above its siblings. It holds no selection state of its own — if you need one item to stay pressed, that is `z-toggle-group`.',

	playground: {
		buildElement: buildPlaygroundGroup,
		controlNames: [],
		slotLabel: 'Day / Week / Month'
	},

	usageGuidance: [
		'Group actions that operate on the same object or sit on the same axis — a date range, a set of export formats, a paired confirm and cancel.',
		'Give every child the same `kind` and `size`. Mixed treatments defeat the seam and the group stops reading as one control.',
		'`outline` is the natural kind here: the shared borders are what make the seam visible.',
		'Reach for `z-toggle-group` instead when one of the segments should stay visibly selected after the click.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The `z-button` children. The first and last get the outer radii; the rest are squared.' },
		{ name: 'seam', description: 'Adjacent borders overlap by 1px so neighbours share a single hairline rather than stacking two.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Segmented row',
			description: 'The default: a horizontal row sharing one continuous border.',
			markup: `
				<z-button-group>
				  <z-button kind="outline">Day</z-button>
				  <z-button kind="outline">Week</z-button>
				  <z-button kind="outline">Month</z-button>
				</z-button-group>
			`
		}),

		defineMarkupExample({
			id: 'vertical',
			title: 'Vertical',
			description: '`vertical` stacks the children and equalises their widths, so labels of different lengths still line up.',
			markup: `
				<z-button-group vertical>
				  <z-button kind="outline">Duplicate</z-button>
				  <z-button kind="outline">Move to…</z-button>
				  <z-button kind="outline">Archive</z-button>
				</z-button-group>
			`
		}),

		defineMarkupExample({
			id: 'icons-only',
			title: 'Icon segments',
			description:
				'Icon-only segments need an accessible name each — the SVG contributes nothing to the accessibility tree.',
			markup: `
				<z-button-group>
				  <z-button kind="outline" aria-label="Align left">${Icons.alignLeft}</z-button>
				  <z-button kind="outline" aria-label="Align center">${Icons.alignCenter}</z-button>
				  <z-button kind="outline" aria-label="Align right">${Icons.alignRight}</z-button>
				</z-button-group>
			`
		}),

		defineMarkupExample({
			id: 'split-action',
			title: 'Split action',
			description:
				'The classic primary-plus-overflow pairing. The two segments carry different weights but the same accent and kind, so the seam survives.',
			markup: `
				<z-button-group>
				  <z-button accent="dom">${Icons.check} Approve</z-button>
				  <z-button accent="dom" aria-label="More approval options">⋯</z-button>
				</z-button-group>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Size is set on the children, not the group. Keep it uniform within a single group.',
			layout: ExampleLayout.stack,
			markup: `
				<z-button-group>
				  <z-button kind="outline" size="sm">Small</z-button>
				  <z-button kind="outline" size="sm">Small</z-button>
				  <z-button kind="outline" size="sm">Small</z-button>
				</z-button-group>

				<z-button-group>
				  <z-button kind="outline" size="lg">Large</z-button>
				  <z-button kind="outline" size="lg">Large</z-button>
				  <z-button kind="outline" size="lg">Large</z-button>
				</z-button-group>
			`
		}),

		defineInteractiveExample({
			id: 'selection',
			title: 'Driving selection yourself',
			description:
				'The group holds no state, so a "currently selected" segment is yours to manage — here by swapping `kind` on click. If this is all you need, `z-toggle-group` does it for you.',
			layout: ExampleLayout.center,
			markup: `
				<z-button-group id="rangeGroup">
				  <z-button kind="solid" accent="dom">Day</z-button>
				  <z-button kind="outline">Week</z-button>
				  <z-button kind="outline">Month</z-button>
				</z-button-group>
			`,
			script: `
				const rangeButtons = document.querySelectorAll('#rangeGroup z-button')

				for (const rangeButton of rangeButtons) {
				  rangeButton.addEventListener('click', () => {
				    for (const sibling of rangeButtons) {
				      sibling.setAttribute('kind', 'outline')
				      sibling.removeAttribute('accent')
				    }
				    rangeButton.setAttribute('kind', 'solid')
				    rangeButton.setAttribute('accent', 'dom')
				  })
				}
			`,
			wire: (root) => {
				const rangeButtons = queryAllPreview<HTMLElement>(root, '#rangeGroup z-button')

				for (const rangeButton of rangeButtons) {
					rangeButton.addEventListener('click', () => {
						for (const sibling of rangeButtons) {
							sibling.setAttribute('kind', 'outline')
							sibling.removeAttribute('accent')
						}
						rangeButton.setAttribute('kind', 'solid')
						rangeButton.setAttribute('accent', 'dom')
					})
				}
			}
		})
	],

	attributes: [
		{
			name: 'vertical',
			type: 'boolean',
			defaultValue: '—',
			description: 'Stacks the children vertically at equal width instead of laying them out in a row.'
		}
	],

	properties: [],

	slots: [
		{
			name: '(default)',
			description:
				'The z-button children. Up to eight get an explicit stacking order; beyond that they still work but share the base z-index.'
		}
	],

	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Exposes role="group", so assistive technology announces the segments as one related set rather than loose buttons.',
		'Give the group an aria-label when its purpose is not obvious from the surrounding content.',
		'Each child stays an independent tab stop. For a single-tab-stop strip with arrow-key navigation, use z-toolbar.',
		'Icon-only segments need their own aria-label — the group label does not name the individual buttons.'
	],

	related: [
		{ tag: 'z-button', route: '/c/buttons-actions/z-button', description: 'The children this group arranges.' },
		{ tag: 'z-toggle-group', route: '/c/buttons-actions/z-toggle-group', description: 'A segmented control that tracks selection.' },
		{ tag: 'z-toolbar', route: '/c/buttons-actions/z-toolbar', description: 'An action strip with roving tabindex.' }
	]
}
