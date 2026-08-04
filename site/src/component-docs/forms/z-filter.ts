import { defineInteractiveExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

type FilterOptionT = {
	value: string
	label: string
	isDisabled?: boolean
	children?: FilterOptionT[]
}

type FilterElementT = HTMLElement & {
	options: FilterOptionT[]
}

const STATUS_OPTIONS: FilterOptionT[] = [
	{ value: 'all', label: 'All' },
	{ value: 'open', label: 'Open' },
	{ value: 'merged', label: 'Merged' },
	{ value: 'closed', label: 'Closed' }
]

const buildPlaygroundFilter = (): HTMLElement => {
	const filter = document.createElement('z-filter') as FilterElementT
	filter.setAttribute('label', 'Status')
	filter.options = STATUS_OPTIONS
	return filter
}

export const zFilterDoc: ComponentDocT = {
	tag: 'z-filter',
	title: 'z-filter',
	tagline: 'Pills that collapse to the one you picked — and, if you want, drill deeper.',
	status: ComponentStatus.stable,

	description:
		'A faceting control made of pills. Flat by default: the options sit in a row, and choosing one collapses the rest away and reveals a reset. Set `is-drilldown` and options may carry `children` — choosing a branch pushes it into a breadcrumb and reveals the next level, while choosing a leaf simply activates it and leaves its siblings in place. One rule separates the two modes: a leaf selection collapses its level in flat mode and keeps it in drill-down.',

	playground: {
		buildElement: buildPlaygroundFilter,
		controlNames: ['label', 'size', 'accent', 'reset-label', 'is-drilldown', 'is-disabled'],
		slotLabel: 'options set as a property'
	},

	usageGuidance: [
		'Use it when the facets are few and worth showing without a click. Once the list needs scrolling, a `z-select` costs less room.',
		'The collapse is the point: after choosing, the row shows the current answer and a way out, not a wall of alternatives. That is what keeps it usable above a result list.',
		'Reach for `is-drilldown` only when the hierarchy is real — Region → Country, Category → Subcategory. Nesting flat options just to get breadcrumbs makes a simple choice feel like navigation.',
		'`change` reports both the chosen `value` and the full `path`. In drill-down mode the path is the answer; the value alone loses the context of where it sat.',
		'Include an explicit "All" option when no filter is a legitimate state. The reset ✕ clears everything, but a visible "All" pill says so before the user has to look for it.',
		'Keep labels to one or two words. A row of pills is scanned, not read, and a long label breaks the row into something that has to be parsed.'
	],

	anatomy: [
		{ name: 'pill', description: 'One option. Active pills carry the accent; candidates at a deeper level read muted.' },
		{ name: 'reset', description: 'The ✕, shown once anything is chosen. Clears the whole path.' },
		{ name: 'crumb', description: 'A collapsed ancestor in drill-down mode. Clickable, to step back up.' },
		{ name: 'separator', description: 'The chevron between the crumb trail and the current level.' }
	],

	examples: [
		defineInteractiveExample({
			id: 'basic',
			title: 'Flat',
			description: 'Pick a pill and the rest collapse away, leaving your choice and a reset. Click the ✕ to bring them all back.',
			layout: ExampleLayout.start,
			markup: `
				<z-filter id="statusFilter" label="Status"></z-filter>
			`,
			script: `
				const statusFilter = document.querySelector('#statusFilter')

				statusFilter.options = [
				  { value: 'all', label: 'All' },
				  { value: 'open', label: 'Open' },
				  { value: 'merged', label: 'Merged' },
				  { value: 'closed', label: 'Closed' }
				]
			`,
			wire: (root) => {
				const statusFilter = queryPreview<FilterElementT>(root, '#statusFilter')
				statusFilter.options = STATUS_OPTIONS
			}
		}),

		defineInteractiveExample({
			id: 'drilldown',
			title: 'Drill-down',
			description:
				'With `is-drilldown`, a branch collapses into a crumb and reveals its children. A leaf keeps its siblings visible, so you can switch between them without stepping back up.',
			layout: ExampleLayout.start,
			markup: `
				<z-filter id="regionFilter" is-drilldown label="Region"></z-filter>
			`,
			script: `
				const regionFilter = document.querySelector('#regionFilter')

				regionFilter.options = [
				  {
				    value: 'europe',
				    label: 'Europe',
				    children: [
				      { value: 'ireland', label: 'Ireland' },
				      { value: 'germany', label: 'Germany' },
				      { value: 'portugal', label: 'Portugal' }
				    ]
				  },
				  {
				    value: 'americas',
				    label: 'Americas',
				    children: [
				      { value: 'canada', label: 'Canada' },
				      { value: 'brazil', label: 'Brazil' }
				    ]
				  },
				  { value: 'global', label: 'Global' }
				]
			`,
			wire: (root) => {
				const regionFilter = queryPreview<FilterElementT>(root, '#regionFilter')

				regionFilter.options = [
					{
						value: 'europe',
						label: 'Europe',
						children: [
							{ value: 'ireland', label: 'Ireland' },
							{ value: 'germany', label: 'Germany' },
							{ value: 'portugal', label: 'Portugal' }
						]
					},
					{
						value: 'americas',
						label: 'Americas',
						children: [
							{ value: 'canada', label: 'Canada' },
							{ value: 'brazil', label: 'Brazil' }
						]
					},
					{ value: 'global', label: 'Global' }
				]
			}
		}),

		defineInteractiveExample({
			id: 'deep-drilldown',
			title: 'Three levels',
			description:
				'Crumbs accumulate as you descend, and each one is clickable to jump back to that level. Three levels is about where a pill row stops being the right shape.',
			layout: ExampleLayout.start,
			markup: `
				<z-filter id="catalogFilter" is-drilldown accent="dom" label="Catalog"></z-filter>
			`,
			script: `
				const catalogFilter = document.querySelector('#catalogFilter')
				catalogFilter.options = catalogTree
			`,
			wire: (root) => {
				const catalogFilter = queryPreview<FilterElementT>(root, '#catalogFilter')

				catalogFilter.options = [
					{
						value: 'audio',
						label: 'Audio',
						children: [
							{
								value: 'headphones',
								label: 'Headphones',
								children: [
									{ value: 'over-ear', label: 'Over-ear' },
									{ value: 'in-ear', label: 'In-ear' }
								]
							},
							{
								value: 'speakers',
								label: 'Speakers',
								children: [
									{ value: 'bookshelf', label: 'Bookshelf' },
									{ value: 'portable', label: 'Portable' }
								]
							}
						]
					},
					{
						value: 'video',
						label: 'Video',
						children: [
							{ value: 'cameras', label: 'Cameras' },
							{ value: 'lighting', label: 'Lighting' }
						]
					}
				]
			}
		}),

		defineInteractiveExample({
			id: 'disabled-options',
			title: 'Unavailable facets',
			description: 'An `isDisabled` option stays visible but cannot be picked — a facet with no results behind it, kept in place so the row does not reflow.',
			layout: ExampleLayout.start,
			markup: `
				<z-filter id="availabilityFilter" label="Availability"></z-filter>
			`,
			script: `
				const availabilityFilter = document.querySelector('#availabilityFilter')

				availabilityFilter.options = [
				  { value: 'any', label: 'Any' },
				  { value: 'in-stock', label: 'In stock' },
				  { value: 'preorder', label: 'Preorder', isDisabled: true }
				]
			`,
			wire: (root) => {
				const availabilityFilter = queryPreview<FilterElementT>(root, '#availabilityFilter')

				availabilityFilter.options = [
					{ value: 'any', label: 'Any' },
					{ value: 'in-stock', label: 'In stock' },
					{ value: 'preorder', label: 'Preorder', isDisabled: true }
				]
			}
		}),

		defineInteractiveExample({
			id: 'disabled',
			title: 'Disabled',
			description:
				'`is-disabled` freezes the whole row while a query is in flight. The current answer stays readable, which is the point — a filter that blanks itself while loading tells the user nothing.',
			layout: ExampleLayout.start,
			markup: `
				<z-filter id="frozenFilter" is-disabled label="Status"></z-filter>
			`,
			script: `
				const frozenFilter = document.querySelector('#frozenFilter')
				frozenFilter.options = statusOptions
				frozenFilter.isDisabled = isLoading
			`,
			wire: (root) => {
				const frozenFilter = queryPreview<FilterElementT>(root, '#frozenFilter')
				frozenFilter.options = STATUS_OPTIONS
			}
		}),

		defineInteractiveExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Two densities. Small suits a filter bar sitting directly above a dense table.',
			layout: ExampleLayout.stack,
			markup: `
				<z-filter id="smallFilter" size="sm" label="Small"></z-filter>
				<z-filter id="mediumFilter" label="Medium"></z-filter>
			`,
			script: `
				smallFilter.options = statusOptions
				mediumFilter.options = statusOptions
			`,
			wire: (root) => {
				const smallFilter = queryPreview<FilterElementT>(root, '#smallFilter')
				const mediumFilter = queryPreview<FilterElementT>(root, '#mediumFilter')

				smallFilter.options = STATUS_OPTIONS
				mediumFilter.options = STATUS_OPTIONS
			}
		}),

		defineInteractiveExample({
			id: 'filtering-a-list',
			title: 'Filtering a list',
			description: 'The whole point of the control — reading `change` and narrowing what is underneath. The reset clears the path, which is your cue to show everything.',
			layout: ExampleLayout.stack,
			markup: `
				<z-filter id="tableFilter" accent="dom" size="sm" label="Status"></z-filter>
				<z-text size="sm" color="muted" id="tableStatus">Showing all 12 pull requests.</z-text>
			`,
			script: `
				const tableFilter = document.querySelector('#tableFilter')

				tableFilter.addEventListener('change', (changeEvent) => {
				  // path is empty when the reset was clicked
				  applyStatusFilter(changeEvent.detail.value, changeEvent.detail.path)
				})
			`,
			wire: (root) => {
				const tableFilter = queryPreview<FilterElementT>(root, '#tableFilter')
				const tableStatus = queryPreview<HTMLElement>(root, '#tableStatus')

				const countsByStatus: Record<string, number> = { open: 5, merged: 6, closed: 1 }

				tableFilter.options = [
					{ value: 'open', label: 'Open' },
					{ value: 'merged', label: 'Merged' },
					{ value: 'closed', label: 'Closed' }
				]

				tableFilter.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ value?: string; path: string[] }>).detail
					const isCleared = detail.path.length === 0

					if (isCleared) {
						tableStatus.textContent = 'Showing all 12 pull requests.'
						return
					}

					const matchCount = countsByStatus[detail.value ?? ''] ?? 0
					tableStatus.textContent = `Showing ${matchCount} ${detail.value} pull requests.`
				})
			}
		})
	],

	attributes: [
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Accessible name for the pill group.' },
		{ name: 'size', type: 'sm | md', defaultValue: 'md', description: 'Pill density.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent family of the active pill.' },
		{ name: 'reset-label', type: 'string', defaultValue: 'Clear', description: 'Accessible name for the ✕ button.' },
		{ name: 'is-drilldown', type: 'boolean', defaultValue: '—', description: 'Switches to hierarchical mode: a leaf keeps its siblings visible instead of collapsing them.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Freezes the whole row — no selection, no reset — while keeping the current answer readable.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the filter from layout.' }
	],

	properties: [
		{
			name: 'options',
			type: 'Array<{ value: string, label: string, isDisabled?: boolean, children?: Option[] }>',
			defaultValue: '[]',
			description: 'The facet tree. Property only. Children are ignored outside drill-down mode.'
		}
	],

	slots: [],

	events: [
		{
			name: 'change',
			detail: '{ value?: string, path: string[] }',
			description: 'Fires on every selection and on reset. An empty path means the filter was cleared.'
		}
	],

	cssVariables: [],

	accessibilityNotes: [
		'The host carries role="group" with `label` as its name, so the pills are announced as one control rather than as a row of loose buttons.',
		'Every pill is a real button with aria-pressed reflecting whether it is the active choice.',
		'The reset button is icon-only and takes its accessible name from reset-label, which defaults to "Clear".',
		'Collapsing options on selection removes them from the tab order — that is intended, since the reset is right there, but it is worth knowing that the row’s focus targets change as you pick.',
		'Crumbs are buttons too, so stepping back up a drill-down is a keyboard operation rather than a pointer-only one.'
	],

	related: [
		{ tag: 'z-toggle-group', route: '/c/buttons-actions/z-toggle-group', description: 'Single selection that keeps every option visible.' },
		{ tag: 'z-select', route: '/c/forms/z-select', description: 'When the facet list is too long to show as pills.' },
		{ tag: 'z-breadcrumbs', route: '/c/navigation-disclosure/z-breadcrumbs', description: 'The same crumb idea, for navigation rather than filtering.' }
	]
}
