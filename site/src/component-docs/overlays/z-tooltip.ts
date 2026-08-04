import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundTooltip = (): HTMLElement => {
	const tooltip = document.createElement('z-tooltip')
	tooltip.setAttribute('content', 'Save changes')
	tooltip.setAttribute('placement', 'top')

	tooltip.innerHTML = `<z-button kind="outline">Hover me</z-button>`

	return tooltip
}

export const zTooltipDoc: ComponentDocT = {
	tag: 'z-tooltip',
	title: 'z-tooltip',
	tagline: 'A short label that appears where you are already looking.',
	status: ComponentStatus.stable,

	description:
		'Wrap anything: `<z-tooltip content="Save"><z-button>…</z-button></z-tooltip>`. The label opens on hover or focus after `open-delay` and closes on leave, blur, or Escape. Like every anchored overlay here it uses the shared positioning core — a top-layer `[popover]` surface that escapes overflow and flips near an edge — with tighter padding and a plain-text body, because a tooltip that holds anything more than a phrase is the wrong component.',

	playground: {
		buildElement: buildPlaygroundTooltip,
		controlNames: ['content', 'placement', 'offset', 'open-delay', 'accent', 'is-disabled'],
		slotLabel: 'the trigger element'
	},

	usageGuidance: [
		'Use it to name an icon-only control. That is the case tooltips are unambiguously good at, and it is most of what they should be doing.',
		'`content` is plain text and that is deliberate. A tooltip cannot hold a link or a button — nobody can reach one that vanishes when the pointer leaves the trigger. Use `z-popover` or `z-hover-card` for that.',
		'Never put essential information only in a tooltip. It is invisible on touch, where there is no hover at all.',
		'A tooltip is not a substitute for a label. An icon button still needs an `aria-label`; the tooltip repeats it for sighted users.',
		'Keep the delay short but non-zero. The default 150ms is enough to stop tooltips flashing as the pointer crosses a toolbar on its way somewhere else.',
		'Do not wrap a disabled control. A disabled element receives no pointer events, so the tooltip never opens — put the explanation next to it instead.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The trigger. The host hugs it and acts as the positioning anchor.' },
		{ name: 'surface', description: 'The label — a small top-layer panel with role="tooltip".' },
		{ name: 'open delay', description: 'The pause before opening, so passing over a toolbar does not set off a chain of labels.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Hover the button, or tab to it — focus opens the tooltip too, which is what makes it work without a pointer.',
			layout: ExampleLayout.start,
			markup: `
				<z-tooltip content="Save changes">
				  <z-button kind="outline">Save</z-button>
				</z-tooltip>
			`
		}),

		defineMarkupExample({
			id: 'icon-buttons',
			title: 'Naming icon buttons',
			description:
				'The main event. Note that each control keeps its own `aria-label` — the tooltip is the sighted user’s version of the same information, not a replacement for it.',
			layout: ExampleLayout.start,
			markup: `
				<z-toolbar>
				  <z-tooltip content="Bold">
				    <z-toggle kind="ghost" is-icon aria-label="Bold">${Icons.bold}</z-toggle>
				  </z-tooltip>
				  <z-tooltip content="Italic">
				    <z-toggle kind="ghost" is-icon aria-label="Italic">${Icons.italic}</z-toggle>
				  </z-tooltip>
				  <z-tooltip content="Insert link">
				    <z-toggle kind="ghost" is-icon aria-label="Insert link">${Icons.link}</z-toggle>
				  </z-tooltip>
				</z-toolbar>
			`
		}),

		defineMarkupExample({
			id: 'placements',
			title: 'Placements',
			description: 'Top by default, because it is the least likely to cover what you are about to click. Any side works, and all of them flip near an edge.',
			layout: ExampleLayout.start,
			markup: `
				<z-tooltip content="Above" placement="top">
				  <z-button kind="outline">Top</z-button>
				</z-tooltip>
				<z-tooltip content="Below" placement="bottom">
				  <z-button kind="outline">Bottom</z-button>
				</z-tooltip>
				<z-tooltip content="To the left" placement="left">
				  <z-button kind="outline">Left</z-button>
				</z-tooltip>
				<z-tooltip content="To the right" placement="right">
				  <z-button kind="outline">Right</z-button>
				</z-tooltip>
			`
		}),

		defineMarkupExample({
			id: 'delay',
			title: 'Open delay',
			description:
				'Zero opens instantly, which is right for a single control and wrong for a toolbar. A longer delay suits a tooltip on something people hover over incidentally.',
			layout: ExampleLayout.start,
			markup: `
				<z-tooltip content="Instant" open-delay="0">
				  <z-button kind="outline">0ms</z-button>
				</z-tooltip>
				<z-tooltip content="The default">
				  <z-button kind="outline">150ms</z-button>
				</z-tooltip>
				<z-tooltip content="Deliberate" open-delay="600">
				  <z-button kind="outline">600ms</z-button>
				</z-tooltip>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Tones',
			description: 'The accent used inside the label. Neutral suits almost everything; reserve the others for a tooltip that carries a warning.',
			layout: ExampleLayout.start,
			markup: `
				<z-tooltip content="Neutral" accent="neutral">
				  <z-button kind="outline">Neutral</z-button>
				</z-tooltip>
				<z-tooltip content="Primary" accent="dom">
				  <z-button kind="outline">Primary</z-button>
				</z-tooltip>
				<z-tooltip content="Secondary" accent="sub">
				  <z-button kind="outline">Secondary</z-button>
				</z-tooltip>
			`
		}),

		defineMarkupExample({
			id: 'any-trigger',
			title: 'Any trigger',
			description:
				'It wraps whatever you give it. A truncated table cell, an avatar, a status dot — anything whose meaning is not fully visible.',
			layout: ExampleLayout.start,
			markup: `
				<z-tooltip content="ada.lovelace@analytical-engine.example.com">
				  <z-text size="sm" style="max-width: 12rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block">ada.lovelace@analytical-engine.example.com</z-text>
				</z-tooltip>
				<z-tooltip content="Deployed 4 minutes ago">
				  <z-badge accent="success">Live</z-badge>
				</z-tooltip>
			`
		}),

		defineInteractiveExample({
			id: 'dynamic-content',
			title: 'Changing the label',
			description: '`content` is a plain property, so a tooltip that reports state is one assignment — the classic copy-to-clipboard confirmation.',
			layout: ExampleLayout.start,
			markup: `
				<z-tooltip id="copyTooltip" content="Copy to clipboard">
				  <z-button id="copyButton" kind="outline">Copy link</z-button>
				</z-tooltip>
			`,
			script: `
				const copyTooltip = document.querySelector('#copyTooltip')
				const copyButton = document.querySelector('#copyButton')

				copyButton.addEventListener('click', async () => {
				  await navigator.clipboard.writeText(shareUrl)
				  copyTooltip.content = 'Copied'
				  setTimeout(() => { copyTooltip.content = 'Copy to clipboard' }, 1500)
				})
			`,
			wire: (root) => {
				type TooltipElementT = HTMLElement & { content: string }

				const copyTooltip = queryPreview<TooltipElementT>(root, '#copyTooltip')
				const copyButton = queryPreview<HTMLElement>(root, '#copyButton')

				copyButton.addEventListener('click', () => {
					copyTooltip.content = 'Copied'
					setTimeout(() => {
						copyTooltip.content = 'Copy to clipboard'
					}, 1500)
				})
			}
		})
	],

	attributes: [
		{ name: 'content', type: 'string', defaultValue: '—', description: 'The label. Plain text only — an empty content means the tooltip never opens.' },
		{ name: 'placement', type: 'top | bottom | left | right | top-start | top-end | bottom-start | bottom-end | left-start | left-end | right-start | right-end', defaultValue: 'top', description: 'Preferred side and alignment. Flips when there is no room.' },
		{ name: 'offset', type: 'number', defaultValue: '8', description: 'Gap in pixels between the trigger and the label.' },
		{ name: 'open-delay', type: 'number', defaultValue: '150', description: 'Milliseconds to wait before opening.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent used inside the label.' },
		{ name: 'is-disabled', type: 'boolean', defaultValue: '—', description: 'Stops the tooltip from opening at all.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the tooltip and its trigger from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The trigger element the tooltip is anchored to.' }],

	events: [],

	cssVariables: [
		{ name: '--z-overlay-max-width', defaultValue: '20rem', description: 'Caps the label width. Worth lowering for tooltips — a wide one is usually too wordy.' },
		{ name: '--z-overlay-padding', defaultValue: 'tightened', description: 'Inner padding, already reduced from the shared floating surface.' }
	],

	accessibilityNotes: [
		'The surface carries role="tooltip". It supplements the trigger’s accessible name — it does not supply one, which is why an icon button still needs its own aria-label.',
		'Focus opens the tooltip and blur closes it, so keyboard users get the same information as pointer users. Escape closes it without moving focus.',
		'Tooltips do not exist on touch. Anything a user must know to proceed belongs in visible text, not here.',
		'A tooltip can never hold an interactive element. It closes when the pointer leaves the trigger, so a link inside it is unreachable — that is what z-hover-card is for.',
		'The panel sits in the top layer, so it is never clipped by a scrolling ancestor — the failure mode that makes hand-rolled tooltips in tables so unreliable.'
	],

	related: [
		{ tag: 'z-hover-card', route: '/c/overlays/z-hover-card', description: 'When the hover content needs to be reachable.' },
		{ tag: 'z-popover', route: '/c/overlays/z-popover', description: 'Click-opened, and interactive.' },
		{ tag: 'z-kbd', route: '/c/foundation/z-kbd', description: 'For showing the shortcut a tooltip mentions.' }
	]
}
