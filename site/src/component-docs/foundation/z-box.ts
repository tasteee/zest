import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundBox = (): HTMLElement => {
	const box = document.createElement('z-box')
	box.setAttribute('is-row', '')
	box.setAttribute('gap', 'md')
	box.setAttribute('aligns-x', 'between')
	box.setAttribute('aligns-y', 'center')
	box.setAttribute('padding', 'lg')
	box.innerHTML = `
		<z-badge label="Left" size="small"></z-badge>
		<z-badge label="Right" size="small"></z-badge>
	`
	return box
}

export const zBoxDoc: ComponentDocT = {
	tag: 'z-box',
	title: 'z-box',
	tagline: 'The one generic layout primitive — flex, grid, or block, with the whole spacing scale as attributes.',
	status: ComponentStatus.stable,

	description:
		'Everything else in the layout category is either a specialisation of this or built on it. `z-box` gives you a display mode, alignment on both axes, gap, margin, padding, sizing, and grid templates — all as attributes resolved against the design system scale, so a layout never hardcodes a pixel value. The idea worth internalising is that `aligns-x` and `aligns-y` always mean horizontal and vertical, regardless of flow direction. In a column, `aligns-x` still means horizontal even though CSS would call that the cross axis. You describe the result you want, and the component works out which CSS property that maps to.',

	playground: {
		buildElement: buildPlaygroundBox,
		controlNames: ['is-row', 'is-column', 'is-grid', 'wrap', 'gap', 'aligns-x', 'aligns-y', 'padding', 'full-width'],
		slotLabel: 'Two badges'
	},

	usageGuidance: [
		'Prefer `z-row` and `z-column` for the everyday cases. They are this element with the direction locked, and the tag name says what the layout does.',
		'Reach for `z-box` directly when the display mode is conditional, or when you need a mode the wrappers do not cover — grid, inline-flex, block.',
		'Spacing values should be tokens (`sm`, `md`, `lg`) or bare numbers off the spacing scale. A raw length works, but it steps outside the system.',
		'`inset` is a padding shorthand and the explicit `padding*` props win over it, which is what makes "inset everywhere, override one edge" work.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The box contents.' },
		{ name: 'display mode', description: 'Flex by default; `is-grid`, `is-block`, and the inline variants switch it.' },
		{
			name: 'aligns-x / aligns-y',
			description:
				'Always the horizontal and vertical relationship. In flex they map to justify/align and swap when `is-column` is set; in grid they map to justify-items/align-items with no swap.'
		},
		{ name: 'spacing scale', description: 'Gap, margin, padding, and inset all resolve through the same token scale.' }
	],

	examples: [
		defineMarkupExample({
			id: 'row-and-column',
			title: 'Direction',
			description: 'Flex is the default; `is-row` and `is-column` pick the axis.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box is-row gap="3" padding="4" style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-badge label="One" size="small"></z-badge>
				  <z-badge label="Two" size="small"></z-badge>
				  <z-badge label="Three" size="small"></z-badge>
				</z-box>

				<z-box is-column gap="3" padding="4" style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-badge label="One" size="small"></z-badge>
				  <z-badge label="Two" size="small"></z-badge>
				  <z-badge label="Three" size="small"></z-badge>
				</z-box>
			`
		}),

		defineMarkupExample({
			id: 'aligns-x',
			title: 'Horizontal distribution',
			description:
				'`aligns-x` in a row distributes along the main axis. `between` is the one that makes a header lay itself out.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box is-row aligns-x="start" gap="2" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="start" size="small"></z-badge>
				  <z-badge label="start" size="small"></z-badge>
				</z-box>

				<z-box is-row aligns-x="center" gap="2" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="center" size="small"></z-badge>
				  <z-badge label="center" size="small"></z-badge>
				</z-box>

				<z-box is-row aligns-x="between" gap="2" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="between" size="small"></z-badge>
				  <z-badge label="between" size="small"></z-badge>
				</z-box>

				<z-box is-row aligns-x="evenly" gap="2" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="evenly" size="small"></z-badge>
				  <z-badge label="evenly" size="small"></z-badge>
				</z-box>
			`
		}),

		defineMarkupExample({
			id: 'axis-independence',
			title: 'The axes never swap on you',
			description:
				'Both boxes below set `aligns-x="center"`, and in both it means horizontally centred — even though for the column that is the CSS cross axis. This is the part that saves you from thinking in main-and-cross.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box is-row aligns-x="center" gap="2" padding="4" full-width style="border: 1px solid var(--border)">
				  <z-badge label="row" size="small"></z-badge>
				  <z-badge label="row" size="small"></z-badge>
				</z-box>

				<z-box is-column aligns-x="center" gap="2" padding="4" full-width style="border: 1px solid var(--border)">
				  <z-badge label="column" size="small"></z-badge>
				  <z-badge label="column" size="small"></z-badge>
				</z-box>
			`
		}),

		defineMarkupExample({
			id: 'grid-mode',
			title: 'Grid mode',
			description:
				'`is-grid` with `columns`. A bare number becomes `repeat(n, minmax(0, 1fr))`; anything else passes through as a raw template.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box is-grid columns="3" gap="3">
				  <z-card><z-text size="sm">1</z-text></z-card>
				  <z-card><z-text size="sm">2</z-text></z-card>
				  <z-card><z-text size="sm">3</z-text></z-card>
				  <z-card><z-text size="sm">4</z-text></z-card>
				  <z-card><z-text size="sm">5</z-text></z-card>
				  <z-card><z-text size="sm">6</z-text></z-card>
				</z-box>
			`
		}),

		defineMarkupExample({
			id: 'responsive-columns',
			title: 'Responsive grid columns',
			description:
				'`small-columns` through `extra-large-columns` set the count at breakpoints of 40, 48, 64, and 80rem. Resize the page to watch this one reflow.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box is-grid columns="1" small-columns="2" large-columns="4" gap="3">
				  <z-card><z-text size="sm">One</z-text></z-card>
				  <z-card><z-text size="sm">Two</z-text></z-card>
				  <z-card><z-text size="sm">Three</z-text></z-card>
				  <z-card><z-text size="sm">Four</z-text></z-card>
				</z-box>
			`
		}),

		defineMarkupExample({
			id: 'wrapping',
			title: 'Wrapping',
			description: '`wrap` lets a row break onto more lines — the right behaviour for a bag of tags of unknown length.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box is-row wrap gap="2" style="max-width: 22rem">
				  <z-badge label="typescript" size="small"></z-badge>
				  <z-badge label="web-components" size="small"></z-badge>
				  <z-badge label="design-system" size="small"></z-badge>
				  <z-badge label="atomico" size="small"></z-badge>
				  <z-badge label="shadow-dom" size="small"></z-badge>
				  <z-badge label="css-tokens" size="small"></z-badge>
				</z-box>
			`
		}),

		defineMarkupExample({
			id: 'spacing-scale',
			title: 'The value scale',
			description:
				'Spacing props take a size token, a bare number off the `--spacing-N` scale, or any CSS length. Tokens first — a raw length works but steps outside the system.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box is-row gap="xs" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="gap=xs" size="small"></z-badge>
				  <z-badge label="token" size="small"></z-badge>
				</z-box>

				<z-box is-row gap="6" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="gap=6" size="small"></z-badge>
				  <z-badge label="spacing scale" size="small"></z-badge>
				</z-box>

				<z-box is-row gap="2rem" padding="3" full-width style="border: 1px solid var(--border)">
				  <z-badge label="gap=2rem" size="small"></z-badge>
				  <z-badge label="raw length" size="small"></z-badge>
				</z-box>
			`
		}),

		defineMarkupExample({
			id: 'padding-precedence',
			title: 'Inset and padding together',
			description:
				'`inset` sets padding on every edge; a specific `padding-*` prop wins where both apply. That precedence is what makes "pad everything, then override one side" work.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box inset="lg" padding-bottom="0" full-width style="border: 1px solid var(--border)">
				  <z-text size="sm">Inset on three edges, no padding at the bottom.</z-text>
				</z-box>
			`
		}),

		defineMarkupExample({
			id: 'header-pattern',
			title: 'A header bar',
			description: 'The layout this element gets used for most: brand on the left, actions on the right, aligned on the centre line.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box is-row aligns-x="between" aligns-y="center" padding="4" full-width
				       style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-heading size="xs" tag="h3">Analytics</z-heading>
				  <z-row gap="2">
				    <z-button kind="ghost" size="small">Export</z-button>
				    <z-button tone="primary" size="small">New report</z-button>
				  </z-row>
				</z-box>
			`
		})
	],

	attributes: [
		{ name: 'is-row', type: 'boolean', defaultValue: '—', description: 'Horizontal flex direction.' },
		{ name: 'is-column', type: 'boolean', defaultValue: '—', description: 'Vertical flex direction.' },
		{ name: 'is-flex', type: 'boolean', defaultValue: 'flex', description: 'display: flex. The default mode.' },
		{ name: 'is-inline-flex', type: 'boolean', defaultValue: '—', description: 'display: inline-flex.' },
		{ name: 'is-grid', type: 'boolean', defaultValue: '—', description: 'display: grid.' },
		{ name: 'is-inline-grid', type: 'boolean', defaultValue: '—', description: 'display: inline-grid.' },
		{ name: 'is-block', type: 'boolean', defaultValue: '—', description: 'display: block.' },
		{ name: 'is-inline-block', type: 'boolean', defaultValue: '—', description: 'display: inline-block.' },
		{ name: 'is-inline', type: 'boolean', defaultValue: '—', description: 'display: inline.' },
		{
			name: 'aligns-x',
			type: 'start | center | end | between | around | evenly | stretch',
			defaultValue: '—',
			description: 'Horizontal relationship, whatever the flow direction.'
		},
		{
			name: 'aligns-y',
			type: 'start | center | end | between | around | evenly | stretch',
			defaultValue: '—',
			description: 'Vertical relationship, whatever the flow direction.'
		},
		{ name: 'wrap', type: 'boolean', defaultValue: '—', description: 'flex-wrap: wrap.' },
		{ name: 'does-wrap-text', type: 'boolean', defaultValue: '—', description: 'Allows text inside to wrap.' },
		{ name: 'full-width', type: 'boolean', defaultValue: '—', description: 'width: 100%.' },
		{ name: 'full-height', type: 'boolean', defaultValue: '—', description: 'height: 100%.' },
		{ name: 'gap', type: 'string', defaultValue: '—', description: 'Spacing between children. Size token, bare number, or length.' },
		{ name: 'row-gap', type: 'string', defaultValue: '—', description: 'Row gap only.' },
		{ name: 'column-gap', type: 'string', defaultValue: '—', description: 'Column gap only.' },
		{ name: 'padding', type: 'string', defaultValue: '—', description: 'Inner spacing on every edge.' },
		{ name: 'padding-x', type: 'string', defaultValue: '—', description: 'Inner spacing on the left and right.' },
		{ name: 'padding-y', type: 'string', defaultValue: '—', description: 'Inner spacing on the top and bottom.' },
		{ name: 'margin', type: 'string', defaultValue: '—', description: 'Outer spacing on every edge.' },
		{ name: 'margin-x', type: 'string', defaultValue: '—', description: 'Outer spacing on the left and right.' },
		{ name: 'margin-y', type: 'string', defaultValue: '—', description: 'Outer spacing on the top and bottom.' },
		{
			name: 'inset',
			type: 'string',
			defaultValue: '—',
			description: 'Padding shorthand. Overridden by the specific padding props when both are set.'
		},
		{ name: 'width', type: 'string', defaultValue: '—', description: 'Width. A bare number is treated as px.' },
		{ name: 'height', type: 'string', defaultValue: '—', description: 'Height. A bare number is treated as px.' },
		{ name: 'max-width', type: 'string', defaultValue: '—', description: 'Maximum width.' },
		{ name: 'max-height', type: 'string', defaultValue: '—', description: 'Maximum height.' },
		{
			name: 'columns',
			type: 'string',
			defaultValue: '—',
			description: 'Grid columns. A bare number becomes repeat(n, minmax(0, 1fr)).'
		},
		{ name: 'rows', type: 'string', defaultValue: '—', description: 'Grid rows, with the same number handling as columns.' },
		{ name: 'small-columns', type: 'string', defaultValue: '—', description: 'Grid columns from the 40rem breakpoint.' },
		{ name: 'medium-columns', type: 'string', defaultValue: '—', description: 'Grid columns from the 48rem breakpoint.' },
		{ name: 'large-columns', type: 'string', defaultValue: '—', description: 'Grid columns from the 64rem breakpoint.' },
		{ name: 'extra-large-columns', type: 'string', defaultValue: '—', description: 'Grid columns from the 80rem breakpoint.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The box contents.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'A box is presentational and has no role. Visual grouping is not announced grouping — use a landmark, a list, or a heading when the structure carries meaning.',
		'Layout order should match DOM order. Reordering visually while leaving the DOM alone desynchronises the reading and tab order from what is on screen.',
		'Alignment and gap are the safe tools here. Avoid negative margins to pull elements around, which is where overlap and clipped focus rings come from.',
		'Sizes given in rem scale with the user font size; pixel values do not. Prefer the token scale, which is rem-based throughout.'
	],

	related: [
		{ tag: 'z-row', route: '/c/layout/z-row', description: 'This element with the direction locked to a row.' },
		{ tag: 'z-column', route: '/c/layout/z-column', description: 'This element with the direction locked to a column.' },
		{ tag: 'z-grid', route: '/c/layout/z-grid', description: 'A dedicated grid with responsive auto-fit.' },
		{ tag: 'z-center', route: '/c/layout/z-center', description: 'Centring, without spelling it out each time.' }
	]
}
