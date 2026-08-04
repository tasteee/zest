import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundScroll = (): HTMLElement => {
	const scroll = document.createElement('z-scroll')
	scroll.setAttribute('max-height', '10rem')
	scroll.setAttribute('inset', 'sm')
	scroll.className = 'demoFullWidth demoFrame'

	const lines = Array.from({ length: 14 }, (_unused, index) => {
		return `<z-text size="sm">Scrollable line ${index + 1}</z-text>`
	})
	scroll.innerHTML = `<z-column gap="2">${lines.join('')}</z-column>`

	return scroll
}

export const zScrollDoc: ComponentDocT = {
	tag: 'z-scroll',
	title: 'z-scroll',
	tagline: 'An overflow container with the system\'s slim, themed scrollbars.',
	status: ComponentStatus.stable,

	description:
		'A viewport that scrolls, with the design system\'s scrollbar treatment instead of the platform default. Pick the axis with `direction`, bound it with `max-height` or `max-width`, and set `overscroll` to stop a scroll gesture from chaining out to the page behind it — which is what you want inside a dialog or a dropdown. The inner viewport carries `tabindex="0"`, so a scrollable region is reachable and scrollable by keyboard rather than being a mouse-only area.',

	playground: {
		buildElement: buildPlaygroundScroll,
		controlNames: ['direction', 'max-height', 'max-width', 'scrollbar', 'overscroll', 'inset'],
		slotLabel: 'Fourteen lines'
	},

	usageGuidance: [
		'Bound it with `max-height` or `max-width`. Without a bound there is no overflow, and the element does nothing.',
		'`overscroll="contain"` belongs on any scroller inside an overlay — it stops the page behind from scrolling once the inner one hits its end.',
		'`scrollbar="hidden"` hides the bar but keeps the scrolling. Only use it where another affordance makes the overflow obvious, since a hidden bar hides the fact that there is more.',
		'For a long list of rows, `z-virtual-list` renders only what is visible; this element scrolls everything you give it.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The scrollable content.' },
		{ name: 'viewport', description: 'The inner scrolling element, focusable so the keyboard can reach it.' },
		{ name: 'scrollbar', description: 'The themed bar, tuned by `scrollbar`.' }
	],

	examples: [
		defineMarkupExample({
			id: 'vertical',
			title: 'Vertical',
			description: 'The default axis. `max-height` is what creates the overflow.',
			layout: ExampleLayout.fill,
			markup: `
				<z-scroll max-height="12rem" inset="sm" style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-column gap="2">
				    <z-text size="sm">Deployment 1 — succeeded</z-text>
				    <z-text size="sm">Deployment 2 — succeeded</z-text>
				    <z-text size="sm">Deployment 3 — failed</z-text>
				    <z-text size="sm">Deployment 4 — succeeded</z-text>
				    <z-text size="sm">Deployment 5 — succeeded</z-text>
				    <z-text size="sm">Deployment 6 — cancelled</z-text>
				    <z-text size="sm">Deployment 7 — succeeded</z-text>
				    <z-text size="sm">Deployment 8 — succeeded</z-text>
				    <z-text size="sm">Deployment 9 — succeeded</z-text>
				    <z-text size="sm">Deployment 10 — succeeded</z-text>
				  </z-column>
				</z-scroll>
			`
		}),

		defineMarkupExample({
			id: 'horizontal',
			title: 'Horizontal',
			description: 'A row that scrolls sideways rather than wrapping — right for a strip of chips or thumbnails.',
			layout: ExampleLayout.fill,
			markup: `
				<z-scroll direction="horizontal" inset="sm" style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-row gap="2" style="width: max-content">
				    <z-badge label="typescript" size="sm"></z-badge>
				    <z-badge label="web-components" size="sm"></z-badge>
				    <z-badge label="design-system" size="sm"></z-badge>
				    <z-badge label="shadow-dom" size="sm"></z-badge>
				    <z-badge label="custom-elements" size="sm"></z-badge>
				    <z-badge label="css-tokens" size="sm"></z-badge>
				    <z-badge label="atomico" size="sm"></z-badge>
				  </z-row>
				</z-scroll>
			`
		}),

		defineMarkupExample({
			id: 'scrollbar-treatments',
			title: 'Scrollbar treatments',
			description:
				'`thin` is the default. `auto` restores the platform bar; `hidden` removes it while keeping the scrolling — use that one sparingly.',
			layout: ExampleLayout.fill,
			markup: `
				<z-scroll max-height="7rem" scrollbar="thin" inset="sm" style="border: 1px solid var(--border)">
				  <z-column gap="2">
				    <z-text size="sm">thin — the default</z-text>
				    <z-text size="sm">More content</z-text>
				    <z-text size="sm">More content</z-text>
				    <z-text size="sm">More content</z-text>
				    <z-text size="sm">More content</z-text>
				  </z-column>
				</z-scroll>

				<z-scroll max-height="7rem" scrollbar="hidden" inset="sm" style="border: 1px solid var(--border)">
				  <z-column gap="2">
				    <z-text size="sm">hidden — still scrolls</z-text>
				    <z-text size="sm">More content</z-text>
				    <z-text size="sm">More content</z-text>
				    <z-text size="sm">More content</z-text>
				    <z-text size="sm">More content</z-text>
				  </z-column>
				</z-scroll>
			`
		}),

		defineMarkupExample({
			id: 'overscroll',
			title: 'Containing the scroll chain',
			description:
				'`overscroll="contain"` stops the gesture from continuing into the page once this scroller reaches its end. Standard inside dialogs and dropdowns.',
			layout: ExampleLayout.fill,
			markup: `
				<z-scroll max-height="9rem" overscroll="contain" inset="sm" style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-column gap="2">
				    <z-text size="sm">Scroll to the bottom of this panel…</z-text>
				    <z-text size="sm">…and the page behind it stays put.</z-text>
				    <z-text size="sm">Line three</z-text>
				    <z-text size="sm">Line four</z-text>
				    <z-text size="sm">Line five</z-text>
				    <z-text size="sm">Line six</z-text>
				    <z-text size="sm">Line seven</z-text>
				  </z-column>
				</z-scroll>
			`
		}),

		defineMarkupExample({
			id: 'both-axes',
			title: 'Both axes',
			description: 'For content that overflows in two directions at once — a wide table, a diagram, a code block.',
			layout: ExampleLayout.fill,
			markup: `
				<z-scroll direction="both" max-height="10rem" inset="sm" style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <div style="width: 46rem">
				    <z-column gap="2">
				      <z-text size="sm">This content is both wider and taller than its viewport.</z-text>
				      <z-text size="sm">Row two, also stretching well past the right-hand edge.</z-text>
				      <z-text size="sm">Row three</z-text>
				      <z-text size="sm">Row four</z-text>
				      <z-text size="sm">Row five</z-text>
				      <z-text size="sm">Row six</z-text>
				      <z-text size="sm">Row seven</z-text>
				    </z-column>
				  </div>
				</z-scroll>
			`
		})
	],

	attributes: [
		{ name: 'direction', type: 'vertical | horizontal | both', defaultValue: 'vertical', description: 'Which axis scrolls.' },
		{ name: 'max-height', type: 'string', defaultValue: '—', description: 'Viewport maximum height — the usual source of vertical overflow.' },
		{ name: 'max-width', type: 'string', defaultValue: '—', description: 'Viewport maximum width.' },
		{ name: 'scrollbar', type: 'auto | thin | hidden', defaultValue: 'thin', description: 'Scrollbar treatment.' },
		{
			name: 'overscroll',
			type: 'auto | contain | none',
			defaultValue: '—',
			description: 'overscroll-behavior. Use contain inside overlays to stop scroll chaining.'
		},
		{ name: 'inset', type: 'string', defaultValue: '—', description: 'Inner padding of the viewport.' },
		{ name: 'inset-x', type: 'string', defaultValue: '—', description: 'Inner padding on the left and right.' },
		{ name: 'inset-y', type: 'string', defaultValue: '—', description: 'Inner padding on the top and bottom.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The scrollable content.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'The viewport carries tabindex="0", so a scrollable region is reachable by keyboard and can be scrolled with the arrow keys — which is required whenever a region scrolls.',
		'A focusable scroll region should have an accessible name. Give the element an aria-label describing what is inside it.',
		'scrollbar="hidden" removes the only visual cue that more content exists. Pair it with another affordance, or leave the bar visible.',
		'overscroll="contain" prevents the page behind a modal from scrolling away underneath it, which is disorienting for everyone and worse for screen magnifier users.'
	],

	related: [
		{ tag: 'z-scroll-area', route: '/c/specialized/z-scroll-area', description: 'A lighter pure-CSS variant.' },
		{ tag: 'z-virtual-list', route: '/c/data-display/z-virtual-list', description: 'Renders only the visible rows.' },
		{ tag: 'z-dialog', route: '/c/overlays/z-dialog', description: 'Where overscroll containment matters most.' }
	]
}
