import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundRange = (): HTMLElement => {
	const range = document.createElement('z-range')
	range.setAttribute('label', 'Price')
	range.setAttribute('min', '0')
	range.setAttribute('max', '500')
	range.setAttribute('step', '10')
	range.setAttribute('show-value', '')
	range.setAttribute('value-prefix', '$')
	range.style.width = '100%'

	range.innerHTML = `
		<z-range-handle value="100" tone="primary"></z-range-handle>
		<z-range-handle value="350" tone="primary"></z-range-handle>
	`

	return range
}

export const zRangeDoc: ComponentDocT = {
	tag: 'z-range',
	title: 'z-range',
	tagline: 'Two handles on one track, so a span reads as a single value.',
	status: ComponentStatus.stable,

	description:
		'A lower and an upper bound that share one rail. `z-range` owns the domain — `min`, `max`, `step` — and its two `z-range-handle` children own their values, plus an optional per-handle `min`/`max` that limits how far each one can travel. The handles cannot cross: the left value always stays strictly below the right. Both are native range inputs stacked on the same track, which is what keeps the keyboard and screen-reader behaviour honest.',

	playground: {
		buildElement: buildPlaygroundRange,
		controlNames: ['label', 'min', 'max', 'step', 'show-value', 'value-prefix', 'value-suffix', 'is-disabled'],
		slotLabel: 'two z-range-handle children'
	},

	usageGuidance: [
		'Use it when the two numbers are one idea — a price band, a date window, an age bracket. Two separate sliders say nothing about the relationship between them.',
		'The first handle is the lower bound and the second is the upper. Order in markup is the whole API for that; there is no side attribute.',
		'Per-handle `min`/`max` are for hard limits inside the domain — "the lower bound can never go below 50". The track paints those unreachable ends as off-limits caps, so the constraint is visible rather than only felt.',
		'Turn on `show-value`. A two-handle control without a readout makes the user infer both numbers from thumb positions, which nobody can do accurately.',
		'Keep `step` coarse enough that the handles do not fight each other. On a 0–1000 domain, stepping by 1 makes the last few pixels of separation a chore.',
		'For a single value, use `z-slider` — a range with one handle pinned is a slider with extra explaining to do.'
	],

	anatomy: [
		{ name: 'header', description: 'Label on the left; with show-value, both ends of the span on the right, separated by an en dash.' },
		{ name: 'off-limits caps', description: 'The ends no handle can reach, from the outer per-handle bounds. Collapse to nothing when the handles inherit the full domain.' },
		{ name: 'rail', description: 'Reachable but unselected track.' },
		{ name: 'active range', description: 'The accent fill between the two handles — the selected span.' },
		{ name: 'handles', description: 'Two native range inputs sharing one coordinate system, each with its own tone.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Two handles, one domain. Drag either end; they refuse to cross.',
			layout: ExampleLayout.fill,
			markup: `
				<z-range min="0" max="100" style="width: 100%">
				  <z-range-handle value="25"></z-range-handle>
				  <z-range-handle value="75"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'label-and-value',
			title: 'Label and value',
			description: 'The header reports both ends. With a prefix or suffix, the span reads as a sentence rather than as two numbers.',
			layout: ExampleLayout.fill,
			markup: `
				<z-range label="Price" min="0" max="500" step="10" show-value value-prefix="$" style="width: 100%">
				  <z-range-handle value="100" tone="primary"></z-range-handle>
				  <z-range-handle value="350" tone="primary"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'handle-bounds',
			title: 'Per-handle bounds',
			description:
				'The lower handle cannot go under 20 and the upper cannot pass 80. Those unreachable ends are painted as caps, so the limit is something you can see before you hit it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-range label="Working hours" min="0" max="100" show-value value-suffix="%" style="width: 100%">
				  <z-range-handle value="35" min="20" tone="primary"></z-range-handle>
				  <z-range-handle value="70" max="80" tone="primary"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'tones',
			title: 'Per-handle tones',
			description: 'Each handle carries its own tone, which is useful when the two ends mean different things — a floor and a ceiling, a start and a deadline.',
			layout: ExampleLayout.stack,
			markup: `
				<z-range label="Matched tones" min="0" max="100" show-value style="width: 100%">
				  <z-range-handle value="30" tone="primary"></z-range-handle>
				  <z-range-handle value="70" tone="primary"></z-range-handle>
				</z-range>
				<z-range label="Mixed tones" min="0" max="100" show-value style="width: 100%">
				  <z-range-handle value="30" tone="primary"></z-range-handle>
				  <z-range-handle value="70" tone="secondary"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'steps',
			title: 'Step',
			description: 'The domain step applies to both handles unless a handle overrides it. Coarse steps keep the two ends from crowding each other.',
			layout: ExampleLayout.stack,
			markup: `
				<z-range label="Continuous" min="0" max="100" show-value style="width: 100%">
				  <z-range-handle value="20" tone="primary"></z-range-handle>
				  <z-range-handle value="80" tone="primary"></z-range-handle>
				</z-range>
				<z-range label="Steps of 25" min="0" max="100" step="25" show-value style="width: 100%">
				  <z-range-handle value="25" tone="primary"></z-range-handle>
				  <z-range-handle value="75" tone="primary"></z-range-handle>
				</z-range>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description: 'Both handles inert. The span stays readable, because a disabled control still has to report what is set.',
			layout: ExampleLayout.fill,
			markup: `
				<z-range label="Disabled" min="0" max="100" show-value value-suffix="%" is-disabled style="width: 100%">
				  <z-range-handle value="30"></z-range-handle>
				  <z-range-handle value="65"></z-range-handle>
				</z-range>
			`
		}),

		defineInteractiveExample({
			id: 'events',
			title: 'Reading the span',
			description:
				'One merged event carries both ends, whichever handle moved. `input` streams through the drag, `change` fires on release — preview on the first, persist on the second.',
			layout: ExampleLayout.stack,
			markup: `
				<z-range id="priceRange" label="Price" min="0" max="1000" step="25" show-value value-prefix="$" style="width: 100%">
				  <z-range-handle value="200" tone="primary"></z-range-handle>
				  <z-range-handle value="750" tone="primary"></z-range-handle>
				</z-range>
				<z-text size="sm" color="muted" id="priceLive">input: $200 – $750</z-text>
				<z-text size="sm" color="muted" id="priceCommitted">change: $200 – $750</z-text>
			`,
			script: `
				const priceRange = document.querySelector('#priceRange')

				priceRange.addEventListener('input', (inputEvent) => {
				  previewResults(inputEvent.detail.left, inputEvent.detail.right)
				})

				priceRange.addEventListener('change', (changeEvent) => {
				  applyPriceFilter(changeEvent.detail.left, changeEvent.detail.right)
				})
			`,
			wire: (root) => {
				const priceRange = queryPreview<HTMLElement>(root, '#priceRange')
				const priceLive = queryPreview<HTMLElement>(root, '#priceLive')
				const priceCommitted = queryPreview<HTMLElement>(root, '#priceCommitted')

				priceRange.addEventListener('input', (inputEvent) => {
					const detail = (inputEvent as CustomEvent<{ left: number; right: number }>).detail
					priceLive.textContent = `input: $${detail.left} – $${detail.right}`
				})

				priceRange.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ left: number; right: number }>).detail
					priceCommitted.textContent = `change: $${detail.left} – $${detail.right}`
				})
			}
		}),

		defineInteractiveExample({
			id: 'filtering',
			title: 'Filtering a list',
			description: 'The pattern this control exists for: a span that narrows a result set, with the count updating as you drag.',
			layout: ExampleLayout.stack,
			markup: `
				<z-range id="filterRange" label="Price range" min="0" max="400" step="20" show-value value-prefix="$" style="width: 100%">
				  <z-range-handle value="60" tone="primary"></z-range-handle>
				  <z-range-handle value="260" tone="primary"></z-range-handle>
				</z-range>
				<z-text size="sm" color="muted" id="filterCount">—</z-text>
			`,
			script: `
				const filterRange = document.querySelector('#filterRange')

				filterRange.addEventListener('input', (inputEvent) => {
				  const matches = products.filter((product) => {
				    return product.price >= inputEvent.detail.left && product.price <= inputEvent.detail.right
				  })
				  showCount(matches.length)
				})
			`,
			wire: (root) => {
				const filterRange = queryPreview<HTMLElement>(root, '#filterRange')
				const filterCount = queryPreview<HTMLElement>(root, '#filterCount')

				const productPrices = [15, 40, 45, 80, 95, 120, 140, 180, 210, 240, 280, 310, 360, 395]

				const describeMatches = (lowerBound: number, upperBound: number): string => {
					const matchingPrices = productPrices.filter((price) => {
						return price >= lowerBound && price <= upperBound
					})

					const isSingle = matchingPrices.length === 1
					if (isSingle) return '1 product in range.'

					return `${matchingPrices.length} products in range.`
				}

				filterCount.textContent = describeMatches(60, 260)

				filterRange.addEventListener('input', (inputEvent) => {
					const detail = (inputEvent as CustomEvent<{ left: number; right: number }>).detail
					filterCount.textContent = describeMatches(detail.left, detail.right)
				})
			}
		})
	],

	attributes: [
		{ name: 'min', type: 'number', defaultValue: '0', description: 'Lower end of the domain. Per-handle bounds are clamped inside it.' },
		{ name: 'max', type: 'number', defaultValue: '100', description: 'Upper end of the domain.' },
		{ name: 'step', type: 'number', defaultValue: '1', description: 'Default increment for both handles. A handle may override it.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Shown in the header and used as the group’s accessible name.' },
		{ name: 'show-value', type: 'boolean', defaultValue: '—', description: 'Renders both ends of the span in the header.' },
		{ name: 'value-prefix', type: 'string', defaultValue: '—', description: 'Text before each value — a currency mark.' },
		{ name: 'value-suffix', type: 'string', defaultValue: '—', description: 'Text after each value — a unit.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Blocks both handles.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the range from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'Exactly two z-range-handle children. The first is the lower bound, the second the upper.' }],

	events: [
		{ name: 'input', detail: '{ left: number, right: number }', description: 'Fires continuously while either handle moves, always carrying both ends.' },
		{ name: 'change', detail: '{ left: number, right: number }', description: 'Fires once the interaction settles.' }
	],

	cssVariables: [
		{ name: '--left-accent', defaultValue: 'var(--primary)', description: 'Accent for the lower handle, derived from that handle’s tone.' },
		{ name: '--right-accent', defaultValue: 'var(--primary)', description: 'Accent for the upper handle, derived from that handle’s tone.' }
	],

	accessibilityNotes: [
		'Both handles are native range inputs, so arrow keys, Home, and End work on each one independently. Each takes its accessible name from its handle’s `label`, falling back to "Lower value" and "Upper value".',
		'The host carries role="group" with the label as its name, which is what ties the two inputs together into one announced control.',
		'The non-crossing rule is enforced on the value, not just visually — a keyboard user pressing ArrowRight at the boundary stops rather than jumping past the other handle.',
		'Off-limits caps are a visual reflection of real per-handle min/max bounds, so what a sighted user sees as unreachable is genuinely unreachable by keyboard too.',
		'show-value gives the span a visible readout, which matters most for the case where two thumbs sit close together and their positions are ambiguous.'
	],

	related: [
		{ tag: 'z-range-handle', route: '/c/forms/z-range-handle', description: 'The two children this component reads.' },
		{ tag: 'z-slider', route: '/c/forms/z-slider', description: 'A single value on the same visual language.' },
		{ tag: 'z-filter', route: '/c/forms/z-filter', description: 'Faceting by category rather than by span.' }
	]
}
