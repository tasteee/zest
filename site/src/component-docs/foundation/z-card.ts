import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundCard = (): HTMLElement => {
	const card = document.createElement('z-card')
	card.className = 'demoConstrained'
	card.innerHTML = `
		<z-heading size="xs" tag="h3">Card title</z-heading>
		<z-text size="sm" color="muted">Supporting copy inside the card.</z-text>
	`
	return card
}

export const zCardDoc: ComponentDocT = {
	tag: 'z-card',
	title: 'z-card',
	tagline: 'A bordered content block with comfortable padding.',
	status: ComponentStatus.stable,

	description:
		'The everyday container: a hairline border, a rounded corner, and enough padding that content never touches the edge. Depth comes from the border and the surface underneath rather than from a shadow, which is why a grid of cards reads as a flat plane rather than a pile. Use the layout primitives inside it when its content needs spacing. For accented or elevated panels — accents, variants, elevation levels — `z-surface` is the fuller instrument.',

	playground: {
		buildElement: buildPlaygroundCard,
		controlNames: [],
		slotLabel: 'Card title + copy'
	},

	usageGuidance: [
		'Use a card when content is a discrete unit you could reorder or remove without disturbing what is around it.',
		'`is-reactive` signals that the whole card responds to interaction. Do not set it on a static card — a border that lights up on hover promises a click.',
		'A card inside a card almost always means the inner one should be a `z-line` and some spacing instead.',
		'Reach for `z-surface` when you need a accent, a variant, or a specific elevation level; `z-card` deliberately has none of those.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The card contents.' },
		{ name: 'border', description: 'The hairline that separates the card from the surface beneath it.' },
		{ name: 'stack', description: 'The card is a column; a wired-column or wired-row inside it owns content spacing.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic card',
			description: 'Padding, border, radius. Content goes in and the card stays out of the way.',
			layout: ExampleLayout.fill,
			markup: `
				<z-card style="max-width: 24rem">
				  <wired-column gap="xs">
				    <z-heading size="xs" tag="h3">Deploy previews</z-heading>
				    <z-text size="sm" color="muted">
				      Every pull request gets its own URL, torn down when the branch merges.
				    </z-text>
				  </wired-column>
				</z-card>
			`
		}),

		defineMarkupExample({
			id: 'reactive',
			title: 'Reactive',
			description:
				'`is-reactive` brightens the border on hover and focus-within. Hover both to feel the difference — and only use it when the card really is interactive.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="sm" style="max-width: 24rem">
				  <z-card>
				    <z-text size="sm">Static — the border never changes.</z-text>
				  </z-card>
				  <z-card is-reactive>
				    <z-text size="sm">Reactive — hover me.</z-text>
				  </z-card>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'grid',
			title: 'A grid of cards',
			description:
				'Where the flat treatment pays off: many cards at once read as one plane, with the borders doing all the separating.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-grid min="13rem" gap="sm">
				  <z-card>
				    <wired-column gap="xs"><z-label>Requests</z-label><z-heading size="sm" tag="h3">1.2M</z-heading></wired-column>
				  </z-card>
				  <z-card>
				    <wired-column gap="xs"><z-label>Errors</z-label><z-heading size="sm" tag="h3">0.02%</z-heading></wired-column>
				  </z-card>
				  <z-card>
				    <wired-column gap="xs"><z-label>p95 latency</z-label><z-heading size="sm" tag="h3">84ms</z-heading></wired-column>
				  </z-card>
				</wired-grid>
			`
		}),

		defineMarkupExample({
			id: 'with-divider',
			title: 'With a divided footer',
			description: 'A `z-line` splits body from footer without introducing a second nested surface.',
			layout: ExampleLayout.fill,
			markup: `
				<z-card style="max-width: 24rem">
				  <wired-column gap="md">
				  <wired-column gap="2xs">
				    <z-heading size="xs" tag="h3">Danger zone</z-heading>
				    <z-text size="sm" color="muted">
				      Deleting a workspace removes every project inside it.
				    </z-text>
				  </wired-column>
				  <z-line></z-line>
				  <wired-row x="end">
				    <z-button accent="error" kind="outline" size="sm">Delete workspace</z-button>
				  </wired-row>
				  </wired-column>
				</z-card>
			`
		})
	],

	attributes: [
		{
			name: 'is-reactive',
			type: 'boolean',
			defaultValue: '—',
			description: 'Brightens the border on hover and focus-within.'
		}
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The card contents.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'A card is a presentational container with no role of its own. It does not group content for assistive technology — use a heading inside it, or a real landmark, when the grouping matters.',
		'is-reactive changes appearance on hover but adds no interactivity. If the whole card should be clickable, put a real link or button inside it.',
		'Avoid making a card clickable by attaching a handler to the container. A card-sized click target with no role or keyboard handling is unreachable without a mouse.',
		'When a card is a link, let the heading inside carry the anchor so the accessible name is the title rather than the entire card contents.'
	],

	related: [
		{ tag: 'z-surface', route: '/c/layout/z-surface', description: 'Neutral surface treatments and outlined panels.' },
		{ tag: 'z-bento-item', route: '/c/layout/z-bento-item', description: 'A richer card cell for feature grids.' },
		{ tag: 'z-list-row', route: '/c/data-display/z-list-row', description: 'For rows rather than blocks.' },
		{ tag: 'z-line', route: '/c/foundation/z-line', description: 'Dividing a card internally.' }
	]
}
