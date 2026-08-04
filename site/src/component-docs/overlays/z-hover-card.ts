import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundHoverCard = (): HTMLElement => {
	const hoverCard = document.createElement('z-hover-card')
	hoverCard.setAttribute('placement', 'bottom-start')

	hoverCard.innerHTML = `
		<z-link slot="trigger" href="#">@ada</z-link>
		<z-column gap="xs">
		  <z-text size="sm">Ada Lovelace</z-text>
		  <z-text size="xs" color="muted">Works on the analytical engine. Joined in 1843.</z-text>
		</z-column>
	`

	return hoverCard
}

export const zHoverCardDoc: ComponentDocT = {
	tag: 'z-hover-card',
	title: 'z-hover-card',
	tagline: 'A preview that appears on hover — and stays put long enough to reach.',
	status: ComponentStatus.stable,

	description:
		'The hover-triggered sibling of `z-popover`: a trigger in `[slot="trigger"]`, rich content in the default slot. What separates it from a tooltip is the grace period — the card keeps itself open while the pointer travels from the trigger into it, and hovering the card itself cancels the pending close. That is what makes a link or a button inside it actually reachable, which a tooltip can never manage.',

	playground: {
		buildElement: buildPlaygroundHoverCard,
		controlNames: ['placement', 'offset', 'open-delay', 'close-delay', 'accent'],
		slotLabel: 'trigger and body'
	},

	usageGuidance: [
		'Use it for a preview of something the trigger refers to — a user behind a @mention, a repository behind a link, a page behind an internal reference.',
		'Everything in a hover card must be supplementary. It never appears on touch, so anything essential has to exist somewhere a tap can reach.',
		'Keep the open delay generous. This card appears without being asked for, so it should be slower to arrive than a tooltip — 200ms by default, not 150.',
		'The close delay is the grace period. Shorten it and the card snatches itself away as the pointer crosses the gap; lengthen it and cards linger after you have moved on.',
		'If the content needs a deliberate click to open — a form, a set of controls, anything the user goes looking for — use `z-popover`. Hover is for things you stumble across.',
		'For a plain text label, use `z-tooltip`. A hover card carrying one sentence is a tooltip with extra machinery.'
	],

	anatomy: [
		{ name: 'trigger slot', description: 'The anchor. Hover or focus opens the card after the open delay.' },
		{ name: 'surface', description: 'The panel — a top-layer bordered box with role="dialog".' },
		{ name: 'grace period', description: 'Hovering the card cancels the pending close, so the pointer can travel into it.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Hover the mention. Move the pointer down into the card — it stays open, which is the whole difference from a tooltip.',
			layout: ExampleLayout.start,
			markup: `
				<z-text size="sm">
				  Reviewed by
				  <z-hover-card placement="bottom-start">
				    <z-link slot="trigger" href="#">@ada</z-link>
				    <z-column gap="xs">
				      <z-text size="sm">Ada Lovelace</z-text>
				      <z-text size="xs" color="muted">Works on the analytical engine. Joined in 1843.</z-text>
				      <z-link href="#" size="sm">View profile</z-link>
				    </z-column>
				  </z-hover-card>
				  earlier today.
				</z-text>
			`
		}),

		defineMarkupExample({
			id: 'rich-preview',
			title: 'A richer preview',
			description:
				'Room for structure — a heading, a couple of stats, an action. Keep it to what someone can absorb without deciding to read.',
			layout: ExampleLayout.start,
			markup: `
				<z-hover-card placement="bottom-start" style="--z-overlay-max-width: 22rem">
				  <z-link slot="trigger" href="#">zest/components</z-link>
				  <z-column gap="sm">
				    <z-text size="sm">zest/components</z-text>
				    <z-text size="xs" color="muted">A flat, premium web component library. No shadows, no gradients.</z-text>
				    <z-row gap="md">
				      <z-text size="xs" color="muted">TypeScript</z-text>
				      <z-text size="xs" color="muted">140 components</z-text>
				    </z-row>
				  </z-column>
				</z-hover-card>
			`
		}),

		defineMarkupExample({
			id: 'placements',
			title: 'Placements',
			description: 'Bottom by default, since a card usually follows the text it belongs to. It flips upward when there is no room below.',
			layout: ExampleLayout.start,
			markup: `
				<z-hover-card placement="bottom-start">
				  <z-button slot="trigger" kind="outline">Bottom start</z-button>
				  <z-text size="sm">placement="bottom-start"</z-text>
				</z-hover-card>
				<z-hover-card placement="top">
				  <z-button slot="trigger" kind="outline">Top</z-button>
				  <z-text size="sm">placement="top"</z-text>
				</z-hover-card>
				<z-hover-card placement="right">
				  <z-button slot="trigger" kind="outline">Right</z-button>
				  <z-text size="sm">placement="right"</z-text>
				</z-hover-card>
			`
		}),

		defineMarkupExample({
			id: 'delays',
			title: 'Delays',
			description:
				'`open-delay` is how eager the card is; `close-delay` is how forgiving it is. The second one is what lets the pointer cross the gap without the card vanishing.',
			layout: ExampleLayout.start,
			markup: `
				<z-hover-card open-delay="0" close-delay="0">
				  <z-button slot="trigger" kind="outline">Eager, unforgiving</z-button>
				  <z-text size="sm">Opens instantly and closes the moment you leave — try reaching this text.</z-text>
				</z-hover-card>
				<z-hover-card>
				  <z-button slot="trigger" kind="outline">Defaults</z-button>
				  <z-text size="sm">200ms to open, 150ms of grace on the way out.</z-text>
				</z-hover-card>
				<z-hover-card open-delay="500" close-delay="400">
				  <z-button slot="trigger" kind="outline">Patient</z-button>
				  <z-text size="sm">Slower to arrive, slower to leave.</z-text>
				</z-hover-card>
			`
		}),

		defineMarkupExample({
			id: 'in-prose',
			title: 'In a paragraph',
			description:
				'The natural habitat. Several triggers in flowing text, each previewing what it links to — and none of them interrupting the sentence.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text size="sm" style="max-width: 34rem">
				  The change was proposed by
				  <z-hover-card placement="top-start">
				    <z-link slot="trigger" href="#">@grace</z-link>
				    <z-column gap="xs">
				      <z-text size="sm">Grace Hopper</z-text>
				      <z-text size="xs" color="muted">Compilers, standards, and a strong view on nanoseconds.</z-text>
				    </z-column>
				  </z-hover-card>
				  and landed in
				  <z-hover-card placement="top-start">
				    <z-link slot="trigger" href="#">v2.4.0</z-link>
				    <z-column gap="xs">
				      <z-text size="sm">v2.4.0</z-text>
				      <z-text size="xs" color="muted">Released three weeks ago. 14 commits, 2 breaking changes.</z-text>
				    </z-column>
				  </z-hover-card>
				  without any migration work.
				</z-text>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Tones',
			description: 'The accent used inside the card.',
			layout: ExampleLayout.start,
			markup: `
				<z-hover-card accent="neutral">
				  <z-button slot="trigger" kind="outline">Neutral</z-button>
				  <z-text size="sm">accent="neutral"</z-text>
				</z-hover-card>
				<z-hover-card accent="dom">
				  <z-button slot="trigger" kind="outline">Primary</z-button>
				  <z-text size="sm">accent="dom"</z-text>
				</z-hover-card>
				<z-hover-card accent="sub">
				  <z-button slot="trigger" kind="outline">Secondary</z-button>
				  <z-text size="sm">accent="sub"</z-text>
				</z-hover-card>
			`
		})
	],

	attributes: [
		{ name: 'placement', type: 'top | bottom | left | right | top-start | top-end | bottom-start | bottom-end | left-start | left-end | right-start | right-end', defaultValue: 'bottom', description: 'Preferred side and alignment. Flips when there is no room.' },
		{ name: 'offset', type: 'number', defaultValue: '8', description: 'Gap in pixels between the trigger and the card.' },
		{ name: 'open-delay', type: 'number', defaultValue: '200', description: 'Milliseconds of hover before the card opens.' },
		{ name: 'close-delay', type: 'number', defaultValue: '150', description: 'Grace period after leaving, so the pointer can travel into the card.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent used inside the card.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the card and its trigger from layout.' }
	],

	properties: [],

	slots: [
		{ name: 'trigger', description: 'The anchor. Hover or focus opens the card.' },
		{ name: '(default)', description: 'The card body, including links and buttons.' }
	],

	events: [],

	cssVariables: [
		{ name: '--z-overlay-max-width', defaultValue: '20rem', description: 'Caps the card width.' },
		{ name: '--z-overlay-padding', defaultValue: '1rem', description: 'Inner padding of the card.' }
	],

	accessibilityNotes: [
		'Focus opens the card as well as hover, so a keyboard user reaching the trigger gets the same preview. Escape closes it.',
		'The panel carries role="dialog" rather than role="tooltip", because it may contain interactive content that a tooltip role would misrepresent.',
		'Hover cards never appear on touch. Treat everything inside as supplementary, and make sure the same information is reachable by activating the trigger itself.',
		'The grace period is an accessibility feature as much as a comfort one — a card that closes the instant the pointer leaves is unusable for anyone with limited fine motor control.',
		'The surface lives in the browser’s top layer, so it is never clipped by an overflowing ancestor — the usual reason preview cards inside tables misbehave.'
	],

	related: [
		{ tag: 'z-popover', route: '/c/overlays/z-popover', description: 'The same panel, opened by a click.' },
		{ tag: 'z-tooltip', route: '/c/overlays/z-tooltip', description: 'When the content is one line of plain text.' },
		{ tag: 'z-mention-popover', route: '/c/text-editor/z-mention-popover', description: 'For picking a mention rather than previewing one.' }
	]
}
