import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundPopover = (): HTMLElement => {
	const popover = document.createElement('z-popover')
	popover.setAttribute('placement', 'bottom')

	popover.innerHTML = `
		<z-button slot="trigger" kind="outline">Open popover</z-button>
		<wired-column gap="xs">
		  <z-text size="sm">Anything can live in here.</z-text>
		  <z-text size="xs" color="muted">Forms, lists, a small chart — it is a panel, not a tooltip.</z-text>
		</wired-column>
	`

	return popover
}

export const zPopoverDoc: ComponentDocT = {
	tag: 'z-popover',
	title: 'z-popover',
	tagline: 'A click-opened panel anchored to whatever opened it.',
	status: ComponentStatus.stable,

	description:
		'The trigger goes in `[slot="trigger"]`, the body in the default slot, and the panel appears anchored beside it. It rides the shared overlay core: the surface is a `[popover]` element in the browser’s top layer, so it escapes overflow clipping and every stacking context on the page, and its position is computed each frame it needs to be — flipping to the opposite side when there is no room and shifting to stay on screen. Outside clicks and Escape close it, matching every other dismissible surface here. `is-open` reflects and is two-way, so a popover can be opened from code exactly as the dialog family can.',

	playground: {
		buildElement: buildPlaygroundPopover,
		controlNames: ['placement', 'offset', 'accent', 'is-open', 'disabled'],
		slotLabel: 'trigger and body'
	},

	usageGuidance: [
		'Use a popover when the content is interactive but not blocking — a small form, a set of controls, a preview with a link in it.',
		'If it is a list of actions, use `z-menu`: roving focus and typeahead come with it, and a menu announces itself as one. If it is a static label, use `z-tooltip`.',
		'Keep it small. Once a popover needs to scroll, it wants to be a `z-sheet` or a `z-dialog` — an anchored panel that outgrows its anchor stops feeling attached to anything.',
		'Pick a placement that suits the trigger’s position, but do not fight the flip. A popover that reverses near the viewport edge is doing exactly what it should.',
		'Do not nest a popover inside a popover. The dismissal rules stop being predictable, and so does the focus order.',
		'Opening from code is fine, but be sparing — a panel the user did not ask for is an interruption, and this one does not take focus, so it can also go unnoticed.',
		'A popover does not trap focus, on purpose. If the content genuinely must be answered before anything else, that is a dialog.'
	],

	anatomy: [
		{ name: 'trigger slot', description: 'The anchor and the toggle. Carries aria-haspopup and aria-expanded.' },
		{ name: 'surface', description: 'The panel — a bordered, shadow-free box in the top layer, positioned by the shared overlay core.' },
		{ name: 'default slot', description: 'The body. Anything, including focusable content.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Click the trigger. Click outside or press Escape to dismiss.',
			layout: ExampleLayout.start,
			markup: `
				<z-popover>
				  <z-button slot="trigger" kind="outline">Show details</z-button>
				  <wired-column gap="xs">
				    <z-text size="sm">Deployed 4 minutes ago</z-text>
				    <z-text size="xs" color="muted">Commit 8f2ka91 by Ada Lovelace</z-text>
				  </wired-column>
				</z-popover>
			`
		}),

		defineMarkupExample({
			id: 'placements',
			title: 'Placements',
			description:
				'A side, optionally with an alignment — `bottom`, `bottom-start`, `right-end`, and so on. Whatever you pick, the panel flips when the preferred side has no room.',
			layout: ExampleLayout.start,
			markup: `
				<z-popover placement="top">
				  <z-button slot="trigger" kind="outline">Top</z-button>
				  <z-text size="sm">placement="top"</z-text>
				</z-popover>
				<z-popover placement="bottom-start">
				  <z-button slot="trigger" kind="outline">Bottom start</z-button>
				  <z-text size="sm">placement="bottom-start"</z-text>
				</z-popover>
				<z-popover placement="right">
				  <z-button slot="trigger" kind="outline">Right</z-button>
				  <z-text size="sm">placement="right"</z-text>
				</z-popover>
				<z-popover placement="left-end">
				  <z-button slot="trigger" kind="outline">Left end</z-button>
				  <z-text size="sm">placement="left-end"</z-text>
				</z-popover>
			`
		}),

		defineMarkupExample({
			id: 'offset',
			title: 'Offset',
			description: 'The gap between the trigger and the panel, in pixels. Eight is the default and usually right; zero makes the panel read as part of the trigger.',
			layout: ExampleLayout.start,
			markup: `
				<z-popover offset="0">
				  <z-button slot="trigger" kind="outline">Flush</z-button>
				  <z-text size="sm">offset="0"</z-text>
				</z-popover>
				<z-popover offset="16">
				  <z-button slot="trigger" kind="outline">Loose</z-button>
				  <z-text size="sm">offset="16"</z-text>
				</z-popover>
			`
		}),

		defineMarkupExample({
			id: 'interactive-content',
			title: 'Interactive content',
			description:
				'Unlike a tooltip, a popover can hold real controls. Focus is not trapped, so tabbing eventually leaves the panel — which is correct for something non-blocking.',
			layout: ExampleLayout.start,
			markup: `
				<z-popover placement="bottom-start" style="--z-overlay-max-width: 22rem">
				  <z-button slot="trigger" kind="outline">Quick add</z-button>
				  <wired-column gap="sm">
				    <z-field label="Task"><z-input placeholder="Something to do"></z-input></z-field>
				    <z-field label="Due"><z-input type="date"></z-input></z-field>
				    <z-button kind="solid" accent="dom" size="sm">Add task</z-button>
				  </wired-column>
				</z-popover>
			`
		}),

		defineMarkupExample({
			id: 'width',
			title: 'Width',
			description: '`--z-overlay-max-width` caps the panel. The default of 20rem keeps a popover from turning into a page.',
			layout: ExampleLayout.start,
			markup: `
				<z-popover style="--z-overlay-max-width: 14rem">
				  <z-button slot="trigger" kind="outline">Narrow</z-button>
				  <z-text size="sm">A tight panel, for a short note or a couple of controls.</z-text>
				</z-popover>
				<z-popover style="--z-overlay-max-width: 28rem">
				  <z-button slot="trigger" kind="outline">Wide</z-button>
				  <z-text size="sm">More room, for a form field or a two-column arrangement. Past this width, consider a sheet instead.</z-text>
				</z-popover>
			`
		}),

		defineInteractiveExample({
			id: 'toggle-event',
			title: 'The toggle event',
			description: '`toggle` fires with the new open state whichever way it changed — the trigger, an outside click, or Escape.',
			layout: ExampleLayout.stack,
			markup: `
				<z-popover id="statsPopover" accent="dom">
				  <z-button slot="trigger" kind="outline">Usage this month</z-button>
				  <wired-column gap="xs">
				    <z-text size="sm">128,400 requests</z-text>
				    <z-text size="xs" color="muted">64% of your plan’s allowance.</z-text>
				  </wired-column>
				</z-popover>
				<z-text size="sm" color="muted" id="popoverStatus">Closed.</z-text>
			`,
			script: `
				const statsPopover = document.querySelector('#statsPopover')

				statsPopover.addEventListener('toggle', (toggleEvent) => {
				  if (toggleEvent.detail.open) loadUsage()
				})
			`,
			wire: (root) => {
				const statsPopover = queryPreview<HTMLElement>(root, '#statsPopover')
				const popoverStatus = queryPreview<HTMLElement>(root, '#popoverStatus')

				statsPopover.addEventListener('toggle', (toggleEvent) => {
					const detail = (toggleEvent as CustomEvent<{ open: boolean }>).detail
					popoverStatus.textContent = detail.open ? 'Open — this is where you would fetch.' : 'Closed.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'imperative',
			title: 'Opening from code',
			description:
				'`isOpen` is two-way, so a popover can be raised by something other than its own trigger — a first-run hint, a validation failure, a keyboard shortcut. Assigning it fires the same `toggle` a click would.',
			layout: ExampleLayout.stack,
			markup: `
				<wired-row y="center" gap="sm">
				  <z-button id="hintButton" size="sm" kind="outline">Show the hint</z-button>
				  <z-popover id="hintPopover" placement="right" accent="dom">
				    <z-badge slot="trigger" accent="dom">New</z-badge>
				    <wired-column gap="xs">
				      <z-text size="sm">Filters moved here</z-text>
				      <z-text size="xs" color="muted">Everything from the old sidebar, one click away.</z-text>
				    </wired-column>
				  </z-popover>
				</wired-row>
				<z-text size="sm" color="muted" id="hintStatus">Closed.</z-text>
			`,
			script: `
				const hintPopover = document.querySelector('#hintPopover')

				// no trigger click needed — assigning isOpen shows the panel
				if (isFirstVisit) hintPopover.isOpen = true

				hintPopover.addEventListener('toggle', (toggleEvent) => {
				  if (!toggleEvent.detail.open) markHintSeen()
				})
			`,
			wire: (root) => {
				type PopoverElementT = HTMLElement & { isOpen: boolean }

				const hintPopover = queryPreview<PopoverElementT>(root, '#hintPopover')
				const hintButton = queryPreview<HTMLElement>(root, '#hintButton')
				const hintStatus = queryPreview<HTMLElement>(root, '#hintStatus')

				hintButton.addEventListener('click', () => {
					hintPopover.isOpen = true
				})

				hintPopover.addEventListener('toggle', (toggleEvent) => {
					const detail = (toggleEvent as CustomEvent<{ open: boolean }>).detail
					hintStatus.textContent = detail.open ? 'Open — opened from code.' : 'Closed.'
				})
			}
		}),

		defineMarkupExample({
			id: 'in-a-scroller',
			title: 'Inside a scrolling container',
			description:
				'The panel lives in the top layer, not inside the scroller, so it is never clipped by overflow — and it repositions as the container scrolls. This is the single best reason to use it over a hand-rolled absolute panel.',
			layout: ExampleLayout.fill,
			markup: `
				<div style="height: 8rem; overflow: auto; border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-md)">
				  <wired-column gap="md">
				    <z-text size="sm" color="muted">Scroll this box — the panel follows its trigger.</z-text>
				    <z-popover placement="right">
				      <z-button slot="trigger" kind="outline" size="sm">Open in here</z-button>
				      <z-text size="sm">Not clipped by the scroller.</z-text>
				    </z-popover>
				    <z-text size="sm" color="muted">More content.</z-text>
				    <z-text size="sm" color="muted">And more, so the box actually scrolls.</z-text>
				    <z-text size="sm" color="muted">And a little more.</z-text>
				  </wired-column>
				</div>
			`
		})
	],

	attributes: [
		{ name: 'placement', type: 'top | bottom | left | right | top-start | top-end | bottom-start | bottom-end | left-start | left-end | right-start | right-end', defaultValue: 'bottom', description: 'Preferred side and cross-axis alignment. Flips when there is no room.' },
		{ name: 'offset', type: 'number', defaultValue: '8', description: 'Gap in pixels between the trigger and the panel.' },
		{ name: 'is-open', type: 'boolean', defaultValue: '—', description: 'Whether the panel is showing. Reflects and is two-way — assign it to open or close from code.' },
		{ name: 'accent', type: 'neutral | dom | sub', defaultValue: 'neutral', description: 'Accent used inside the panel.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Stops the trigger from opening the panel.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the popover and its trigger from layout.' }
	],

	properties: [],

	slots: [
		{ name: 'trigger', description: 'The anchor. Clicking it toggles the panel.' },
		{ name: '(default)', description: 'The panel body — including focusable content.' }
	],

	events: [
		{
			name: 'toggle',
			detail: '{ open: boolean }',
			description: 'Fires on every open and close — trigger, outside click, Escape, or an assignment to is-open. The initial state is not an event.'
		}
	],

	cssVariables: [
		{ name: '--z-overlay-max-width', defaultValue: '20rem', description: 'Caps the panel width.' },
		{ name: '--z-overlay-padding', defaultValue: '1rem', description: 'Inner padding of the panel.' }
	],

	accessibilityNotes: [
		'The trigger carries aria-haspopup="dialog" and aria-expanded, so its state is announced rather than only drawn.',
		'The panel is a [popover] element in the top layer, which means it renders above everything and is never clipped by an ancestor’s overflow — a class of bug that no z-index value can fix.',
		'Escape closes it and an outside click dismisses it, the same as z-select and z-menu. Consistent dismissal across overlays is itself an accessibility property.',
		'Focus is deliberately not trapped. A popover is non-blocking, and trapping focus in something the user can also ignore is disorienting.',
		'For a list of actions, prefer z-menu. It announces as a menu and brings roving focus, which a generic panel of buttons does not.'
	],

	related: [
		{ tag: 'z-tooltip', route: '/c/overlays/z-tooltip', description: 'A hover label rather than a panel.' },
		{ tag: 'z-hover-card', route: '/c/overlays/z-hover-card', description: 'The same panel, opened by hover.' },
		{ tag: 'z-menu', route: '/c/navigation-disclosure/z-menu', description: 'For a list of actions.' },
		{ tag: 'z-dialog', route: '/c/overlays/z-dialog', description: 'When the content must block.' }
	]
}
