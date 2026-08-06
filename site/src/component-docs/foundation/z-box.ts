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
		<z-badge label="Left" size="sm"></z-badge>
		<z-badge label="Right" size="sm"></z-badge>
	`
	return box
}

export const zBoxDoc: ComponentDocT = {
	tag: 'z-box',
	title: 'z-box',
	tagline: 'The one generic layout primitive — flex, grid, or block, with the whole spacing scale as attributes.',
	status: ComponentStatus.stable,

	description:
		'Everything else in the layout category is either a specialisation of this or built on it. `z-box` is a flex container: direction, alignment on both axes, gap, margin, padding and sizing, all as attributes resolved against the design system scale, so a layout never hardcodes a pixel value. The idea worth internalising is that `aligns-x` and `aligns-y` always mean horizontal and vertical, regardless of flow direction. In a vertical box, `aligns-x` still means horizontal even though CSS would call that the cross axis. You describe the result you want, and the component works out which CSS property that maps to. For a grid, reach for `z-grid` — a box used to switch between seven display modes and that made it a display switch rather than a layout primitive.',

	playground: {
		buildElement: buildPlaygroundBox,
		controlNames: ['direction', 'is-inline', 'does-wrap', 'gap', 'aligns-x', 'aligns-y', 'padding', 'is-full-width'],
		slotLabel: 'Two badges'
	},

	usageGuidance: [
		'Prefer `z-row` and `z-column` for the everyday cases. They are this element with the direction locked, and the tag name says what the layout does.',
		'Reach for `z-box` directly when the direction is conditional. For a grid, use `z-grid`; for inline flow, add `is-inline`.',
		'Spacing values should be tokens (`sm`, `md`, `lg`) or bare numbers off the spacing scale. A raw length works, but it steps outside the system.',
		'`inset` is a padding shorthand and the explicit `padding*` props win over it, which is what makes "inset everywhere, override one edge" work.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The box contents.' },
		{ name: 'direction', description: 'Horizontal by default. `is-inline` upgrades the box to inline-flex without changing anything else.' },
		{
			name: 'aligns-x / aligns-y',
			description:
				'Always the horizontal and vertical relationship. They map to justify-content and align-items, swapping which one drives the main axis when `direction="vertical"` is set.'
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
				<z-box direction="horizontal" gap="3" padding="4" style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-badge label="Two" size="sm"></z-badge>
				  <z-badge label="Three" size="sm"></z-badge>
				</z-box>

				<z-box direction="vertical" gap="3" padding="4" style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-badge label="One" size="sm"></z-badge>
				  <z-badge label="Two" size="sm"></z-badge>
				  <z-badge label="Three" size="sm"></z-badge>
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
				<z-box direction="horizontal" aligns-x="start" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="start" size="sm"></z-badge>
				  <z-badge label="start" size="sm"></z-badge>
				</z-box>

				<z-box direction="horizontal" aligns-x="center" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="center" size="sm"></z-badge>
				  <z-badge label="center" size="sm"></z-badge>
				</z-box>

				<z-box direction="horizontal" aligns-x="between" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="between" size="sm"></z-badge>
				  <z-badge label="between" size="sm"></z-badge>
				</z-box>

				<z-box direction="horizontal" aligns-x="evenly" gap="2" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="evenly" size="sm"></z-badge>
				  <z-badge label="evenly" size="sm"></z-badge>
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
				<z-box direction="horizontal" aligns-x="center" gap="2" padding="4" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="row" size="sm"></z-badge>
				  <z-badge label="row" size="sm"></z-badge>
				</z-box>

				<z-box direction="vertical" aligns-x="center" gap="2" padding="4" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="column" size="sm"></z-badge>
				  <z-badge label="column" size="sm"></z-badge>
				</z-box>
			`
		}),



		defineMarkupExample({
			id: 'wrapping',
			title: 'Wrapping',
			description: '`wrap` lets a row break onto more lines — the right behaviour for a bag of tags of unknown length.',
			layout: ExampleLayout.fill,
			markup: `
				<z-box direction="horizontal" does-wrap gap="2" style="max-width: 22rem">
				  <z-badge label="typescript" size="sm"></z-badge>
				  <z-badge label="web-components" size="sm"></z-badge>
				  <z-badge label="design-system" size="sm"></z-badge>
				  <z-badge label="atomico" size="sm"></z-badge>
				  <z-badge label="shadow-dom" size="sm"></z-badge>
				  <z-badge label="css-tokens" size="sm"></z-badge>
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
				<z-box direction="horizontal" gap="xs" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="gap=xs" size="sm"></z-badge>
				  <z-badge label="token" size="sm"></z-badge>
				</z-box>

				<z-box direction="horizontal" gap="6" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="gap=6" size="sm"></z-badge>
				  <z-badge label="spacing scale" size="sm"></z-badge>
				</z-box>

				<z-box direction="horizontal" gap="2rem" padding="3" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="gap=2rem" size="sm"></z-badge>
				  <z-badge label="raw length" size="sm"></z-badge>
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
				<z-box inset="lg" padding-bottom="0" is-full-width style="border: 1px solid var(--border)">
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
				<z-box direction="horizontal" aligns-x="between" aligns-y="center" padding="4" is-full-width
				       style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-heading size="xs" tag="h3">Analytics</z-heading>
				  <z-row gap="2">
				    <z-button kind="ghost" size="sm">Export</z-button>
				    <z-button accent="dom" size="sm">New report</z-button>
				  </z-row>
				</z-box>
			`
		})
	],

	attributes: [
		{ name: 'direction', type: 'horizontal | vertical', defaultValue: 'horizontal', description: 'Flow direction. Also decides which axis aligns-x and aligns-y drive.' },
		{ name: 'is-inline', type: 'boolean', defaultValue: '—', description: 'inline-flex instead of flex. The one display modifier that composes rather than replaces.' },
		{ name: 'aligns-x', type: 'start | center | end | between | around | evenly | stretch', defaultValue: '—', description: 'Horizontal relationship, whatever the flow direction.' },
		{ name: 'aligns-y', type: 'start | center | end | between | around | evenly | stretch', defaultValue: '—', description: 'Vertical relationship, whatever the flow direction.' },
		{ name: 'does-wrap', type: 'boolean', defaultValue: '—', description: 'flex-wrap: wrap.' },
		{ name: 'does-wrap-text', type: 'boolean', defaultValue: '—', description: 'Allows text inside to wrap.' },
		{ name: 'gap', type: 'string', defaultValue: '—', description: 'Spacing between children. Size token, bare number, or any CSS length.' },
		{ name: 'row-gap', type: 'string', defaultValue: '—', description: 'Row gap only.' },
		{ name: 'column-gap', type: 'string', defaultValue: '—', description: 'Column gap only.' },
		{ name: 'padding', type: 'string', defaultValue: '—', description: 'Inner spacing on every edge.' },
		{ name: 'padding-x', type: 'string', defaultValue: '—', description: 'Inner spacing, left and right.' },
		{ name: 'padding-y', type: 'string', defaultValue: '—', description: 'Inner spacing, top and bottom.' },
		{ name: 'padding-top', type: 'string', defaultValue: '—', description: 'Inner spacing, top edge.' },
		{ name: 'padding-right', type: 'string', defaultValue: '—', description: 'Inner spacing, right edge.' },
		{ name: 'padding-bottom', type: 'string', defaultValue: '—', description: 'Inner spacing, bottom edge.' },
		{ name: 'padding-left', type: 'string', defaultValue: '—', description: 'Inner spacing, left edge.' },
		{ name: 'margin', type: 'string', defaultValue: '—', description: 'Outer spacing on every edge.' },
		{ name: 'margin-x', type: 'string', defaultValue: '—', description: 'Outer spacing, left and right.' },
		{ name: 'margin-y', type: 'string', defaultValue: '—', description: 'Outer spacing, top and bottom.' },
		{ name: 'margin-top', type: 'string', defaultValue: '—', description: 'Outer spacing, top edge.' },
		{ name: 'margin-right', type: 'string', defaultValue: '—', description: 'Outer spacing, right edge.' },
		{ name: 'margin-bottom', type: 'string', defaultValue: '—', description: 'Outer spacing, bottom edge.' },
		{ name: 'margin-left', type: 'string', defaultValue: '—', description: 'Outer spacing, left edge.' },
		{ name: 'inset', type: 'string', defaultValue: '—', description: 'Padding shorthand. The specific padding props win when both are set.' },
		{ name: 'inset-x', type: 'string', defaultValue: '—', description: 'Padding shorthand, left and right.' },
		{ name: 'inset-y', type: 'string', defaultValue: '—', description: 'Padding shorthand, top and bottom.' },
		{ name: 'width', type: 'string', defaultValue: '—', description: 'Width. A bare number is treated as px.' },
		{ name: 'min-width', type: 'string', defaultValue: '—', description: 'Minimum width.' },
		{ name: 'max-width', type: 'string', defaultValue: '—', description: 'Maximum width.' },
		{ name: 'height', type: 'string', defaultValue: '—', description: 'Height. A bare number is treated as px.' },
		{ name: 'min-height', type: 'string', defaultValue: '—', description: 'Minimum height.' },
		{ name: 'max-height', type: 'string', defaultValue: '—', description: 'Maximum height.' },
		{ name: 'is-full-width', type: 'boolean', defaultValue: '—', description: 'width: 100%.' },
		{ name: 'is-full-height', type: 'boolean', defaultValue: '—', description: 'height: 100%.' }
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
