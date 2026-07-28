import { defineMarkupExample } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundChassis = (): HTMLElement => {
	const chassis = document.createElement('z-chassis')
	chassis.setAttribute('rail-width', '11rem')
	chassis.className = 'demoFullWidth demoTall'
	chassis.innerHTML = `
		<div slot="sidebar">
		  <z-column gap="2">
		    <z-label size="sm">Inbox</z-label>
		    <z-label size="sm" color="muted">Drafts</z-label>
		    <z-label size="sm" color="muted">Sent</z-label>
		  </z-column>
		</div>
		<z-center full-height><z-text size="sm" color="muted">Screen content</z-text></z-center>
	`
	return chassis
}

export const zChassisDoc: ComponentDocT = {
	tag: 'z-chassis',
	title: 'z-chassis',
	tagline: 'A device-like application shell — lighter bezel and rail around a darker inset screen.',
	status: ComponentStatus.stable,

	description:
		'The outermost frame of an application. The body and rail form a lighter shell, like the casing of a device, and the main content sits in a darker inset "screen" with its own border — which is where a routed view renders. That inversion is what makes the shell recede and the content read as the thing you are actually looking at. Every dimension is an attribute and every colour a custom property, so the same element can frame a dense tool or a spacious dashboard.',

	playground: {
		buildElement: buildPlaygroundChassis,
		controlNames: ['rail-width', 'rail-collapsed-width', 'bezel', 'frame', 'rail-side', 'expand-on-hover'],
		slotLabel: 'Sidebar + screen'
	},

	usageGuidance: [
		'One chassis per application, at the root. It frames everything else and is not meant to nest.',
		'`expand-on-hover` suits tools where screen space is scarce, but a rail that appears on hover is invisible to anyone who never hovers — keep the icons meaningful while collapsed.',
		'Use `--chassis-label-opacity` in slotted nav rows to fade labels out while the rail is collapsed, rather than swapping the markup.',
		'The screen scrolls its own content. Put a `z-scroll` inside it rather than letting the page scroll behind the frame.'
	],

	anatomy: [
		{ name: 'sidebar slot', description: 'Rail content, aligned to the top.' },
		{ name: 'sidebar-footer slot', description: 'Rail content, pinned to the bottom.' },
		{ name: 'default slot', description: 'The screen — where a routed view renders.' },
		{ name: 'bezel', description: 'The gap between the rail and the screen.' },
		{ name: 'frame', description: 'The outer padding around the whole chassis.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Rail and screen',
			description: 'The shell in its simplest form — a lighter rail beside a darker inset screen.',
			layout: ExampleLayout.fill,
			markup: `
				<z-chassis rail-width="12rem" style="height: 18rem">
				  <div slot="sidebar">
				    <z-column gap="3">
				      <z-heading size="xs" tag="h3">Mailbox</z-heading>
				      <z-column gap="2">
				        <z-label size="sm">Inbox</z-label>
				        <z-label size="sm" color="muted">Drafts</z-label>
				        <z-label size="sm" color="muted">Sent</z-label>
				        <z-label size="sm" color="muted">Archive</z-label>
				      </z-column>
				    </z-column>
				  </div>
				  <z-center full-height>
				    <z-text size="sm" color="muted">The routed view renders here.</z-text>
				  </z-center>
				</z-chassis>
			`
		}),

		defineMarkupExample({
			id: 'sidebar-footer',
			title: 'A pinned rail footer',
			description: 'The `sidebar-footer` slot sits at the bottom of the rail, which is where an account row belongs.',
			layout: ExampleLayout.fill,
			markup: `
				<z-chassis rail-width="12rem" style="height: 18rem">
				  <div slot="sidebar">
				    <z-column gap="2">
				      <z-label size="sm">Overview</z-label>
				      <z-label size="sm" color="muted">Projects</z-label>
				      <z-label size="sm" color="muted">Settings</z-label>
				    </z-column>
				  </div>
				  <div slot="sidebar-footer">
				    <z-row gap="2" aligns-y="center">
				      <z-avatar name="Ada Lovelace" size="small"></z-avatar>
				      <z-text size="xs" color="muted">Ada</z-text>
				    </z-row>
				  </div>
				  <z-center full-height>
				    <z-text size="sm" color="muted">Screen</z-text>
				  </z-center>
				</z-chassis>
			`
		}),

		defineMarkupExample({
			id: 'rail-side',
			title: 'Rail on the right',
			description: '`rail-side="right"` mirrors the shell, for inspector-style layouts.',
			layout: ExampleLayout.fill,
			markup: `
				<z-chassis rail-width="11rem" rail-side="right" style="height: 15rem">
				  <div slot="sidebar">
				    <z-column gap="2">
				      <z-label size="sm">Properties</z-label>
				      <z-label size="sm" color="muted">Layers</z-label>
				      <z-label size="sm" color="muted">History</z-label>
				    </z-column>
				  </div>
				  <z-center full-height>
				    <z-text size="sm" color="muted">Canvas</z-text>
				  </z-center>
				</z-chassis>
			`
		}),

		defineMarkupExample({
			id: 'expand-on-hover',
			title: 'Collapsing rail',
			description:
				'`expand-on-hover` keeps the rail slim until pointer or focus enters it. Hover the left edge to expand it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-chassis rail-width="12rem" rail-collapsed-width="3.5rem" expand-on-hover style="height: 16rem">
				  <div slot="sidebar">
				    <z-column gap="3">
				      <z-row gap="2" aligns-y="center">${Icons.mail}<z-text size="sm" style="opacity: var(--chassis-label-opacity)">Inbox</z-text></z-row>
				      <z-row gap="2" aligns-y="center">${Icons.calendar}<z-text size="sm" style="opacity: var(--chassis-label-opacity)">Schedule</z-text></z-row>
				      <z-row gap="2" aligns-y="center">${Icons.settings}<z-text size="sm" style="opacity: var(--chassis-label-opacity)">Settings</z-text></z-row>
				    </z-column>
				  </div>
				  <z-center full-height>
				    <z-text size="sm" color="muted">Hover the rail to expand it.</z-text>
				  </z-center>
				</z-chassis>
			`
		}),

		defineMarkupExample({
			id: 'frame-and-bezel',
			title: 'Frame and bezel',
			description:
				'`frame` is the padding outside the whole chassis; `bezel` is the gap between rail and screen. Together they set how much the shell breathes.',
			layout: ExampleLayout.fill,
			markup: `
				<z-chassis rail-width="9rem" frame="0.125rem" bezel="0.25rem" style="height: 12rem">
				  <div slot="sidebar"><z-label size="sm">Tight</z-label></div>
				  <z-center full-height><z-text size="xs" color="muted">Minimal frame and bezel</z-text></z-center>
				</z-chassis>

				<z-chassis rail-width="9rem" frame="1rem" bezel="1.25rem" style="height: 12rem">
				  <div slot="sidebar"><z-label size="sm">Roomy</z-label></div>
				  <z-center full-height><z-text size="xs" color="muted">Generous frame and bezel</z-text></z-center>
				</z-chassis>
			`
		})
	],

	attributes: [
		{ name: 'rail-width', type: 'string', defaultValue: '4.25rem', description: 'Width of the expanded rail.' },
		{
			name: 'rail-collapsed-width',
			type: 'string',
			defaultValue: '3.5rem',
			description: 'Width of the collapsed rail. Used with expand-on-hover.'
		},
		{ name: 'bezel', type: 'string', defaultValue: '0.75rem', description: 'Gap between the rail and the screen.' },
		{ name: 'frame', type: 'string', defaultValue: '0.375rem', description: 'Outer padding around the chassis edges.' },
		{ name: 'rail-side', type: 'left | right', defaultValue: 'left', description: 'Which side the rail sits on.' },
		{
			name: 'expand-on-hover',
			type: 'boolean',
			defaultValue: '—',
			description: 'Collapses the rail, expanding it on hover or focus-within.'
		},
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the chassis from layout.' }
	],

	properties: [],

	slots: [
		{ name: 'sidebar', description: 'Rail content, aligned to the top.' },
		{ name: 'sidebar-footer', description: 'Rail content, pinned to the bottom.' },
		{ name: '(default)', description: 'The screen content.' }
	],

	events: [],

	cssVariables: [
		{ name: '--chassis-body', defaultValue: '—', description: 'Colour of the outer shell and rail.' },
		{ name: '--chassis-screen', defaultValue: '—', description: 'Colour of the inset screen.' },
		{ name: '--chassis-border', defaultValue: '—', description: 'Border colour around the screen.' },
		{ name: '--chassis-radius', defaultValue: '—', description: 'Corner radius of the chassis and screen.' },
		{ name: '--chassis-rail-width', defaultValue: '—', description: 'Rail width, if you prefer setting it in CSS.' },
		{ name: '--chassis-bezel', defaultValue: '—', description: 'Gap between rail and screen.' },
		{ name: '--chassis-frame', defaultValue: '—', description: 'Outer padding around the chassis.' },
		{
			name: '--chassis-label-opacity',
			defaultValue: '0 collapsed, 1 expanded',
			description: 'Inherited by slotted rail content so labels can fade themselves out while collapsed.'
		}
	],

	accessibilityNotes: [
		'The chassis provides no landmarks. Put a real nav element in the sidebar slot and a main element in the screen, or the page has no landmark structure at all.',
		'A rail that expands on hover is a problem for keyboard users if focus does not expand it too — it uses focus-within, so verify that tabbing into the rail opens it.',
		'While collapsed, labels are faded but still in the DOM and still announced. That is the right behaviour; do not remove them to hide them.',
		'Exposes part="rail" and part="screen" for external styling, which is the supported way to reach inside rather than piercing the shadow root.'
	],

	related: [
		{ tag: 'z-sidebar', route: '/c/navigation-disclosure/z-sidebar', description: 'A data-driven nav for the rail.' },
		{ tag: 'z-resizable-panels', route: '/c/canvas-panels/z-resizable-panels', description: 'When the split should be draggable.' },
		{ tag: 'z-scroll', route: '/c/layout/z-scroll', description: 'Scrolling the screen content.' },
		{ tag: 'z-dock', route: '/c/buttons-actions/z-dock', description: 'Another application-shell navigation pattern.' }
	]
}
