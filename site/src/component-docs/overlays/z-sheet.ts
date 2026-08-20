import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSheet = (): HTMLElement => {
	const sheet = document.createElement('z-sheet')
	sheet.setAttribute('heading', 'Filters')
	sheet.setAttribute('description', 'Narrow the list without leaving the page.')

	sheet.innerHTML = `
		<z-button slot="trigger" kind="outline">Open sheet</z-button>
		<z-field label="Search"><z-input placeholder="Anything"></z-input></z-field>
		<z-button slot="footer" kind="outline" accent="neutral">Reset</z-button>
		<z-button slot="footer" kind="solid" accent="dom">Apply</z-button>
	`

	return sheet
}

export const zSheetDoc: ComponentDocT = {
	tag: 'z-sheet',
	title: 'z-sheet',
	tagline: 'A modal panel that arrives from the edge instead of the middle.',
	status: ComponentStatus.stable,

	description:
		'The same native `<dialog>` foundation and the same header/body/footer chrome as `z-dialog` — only the geometry and the transition differ. It sits flush against one edge, sized by `--z-sheet-size`, and slides in from there. That shape earns its keep when the content is a list or a form long enough to want the full height of the viewport, and when keeping the page visible behind it is part of the point.',

	playground: {
		buildElement: buildPlaygroundSheet,
		controlNames: ['heading', 'description', 'side', 'has-close', 'is-static'],
		slotLabel: 'trigger, body, and footer'
	},

	usageGuidance: [
		'Use a sheet when the content is tall and narrow — filters, a details pane, a settings list. A centred dialog wastes that shape.',
		'Right is the default and the right default: it is where secondary panels live in almost every application people already use. Left reads as navigation.',
		'Top and bottom are for short, wide content — a banner-shaped form, a compact picker. A tall panel pinned to the top edge feels like it fell out of the browser chrome.',
		'On phones, a sheet from the bottom beats a centred dialog. If you want drag-to-dismiss with a grab handle, use `z-drawer` — it is the same idea with a gesture attached.',
		'`--z-sheet-size` sets the width for left and right, and the height for top and bottom. One variable, because a sheet only ever grows along one axis.',
		'If the panel should not block the page at all, you want a resizable panel or a popover. A sheet is modal — the page behind it is inert.'
	],

	anatomy: [
		{ name: 'trigger slot', description: 'The element that opens the sheet. Wired for you.' },
		{ name: 'header', description: 'Heading and close button, on the same chrome as z-dialog.' },
		{ name: 'body', description: 'The default slot. Scrolls when the content outgrows the panel.' },
		{ name: 'footer slot', description: 'Actions. Hidden entirely when nothing is slotted in.' },
		{ name: 'backdrop', description: 'The native ::backdrop — a dim and a small blur over the page behind.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Slides in from the right. Escape closes, a backdrop click closes, and the page behind stays visible.',
			layout: ExampleLayout.start,
			markup: `
				<z-sheet heading="Filters" description="Narrow the list without leaving the page.">
				  <z-button slot="trigger" kind="outline">Filters</z-button>
				  <wired-column gap="md">
				    <z-field label="Search"><z-input placeholder="Anything"></z-input></z-field>
				    <z-field label="Status">
				      <z-radio-group label="Status" value="any">
				        <z-radio value="any" accent="dom" is-checked>Any</z-radio>
				        <z-radio value="open" accent="dom">Open</z-radio>
				        <z-radio value="closed" accent="dom">Closed</z-radio>
				      </z-radio-group>
				    </z-field>
				  </wired-column>
				  <z-button slot="footer" kind="outline" accent="neutral">Reset</z-button>
				  <z-button slot="footer" kind="solid" accent="dom">Apply</z-button>
				</z-sheet>
			`
		}),

		defineMarkupExample({
			id: 'sides',
			title: 'Sides',
			description:
				'Four edges. Right for detail and filters, left for navigation, top and bottom for short and wide. The transition always follows the edge it came from.',
			layout: ExampleLayout.start,
			markup: `
				<z-sheet side="right" heading="Right">
				  <z-button slot="trigger" kind="outline">Right</z-button>
				  <z-text size="sm" color="muted">The default. Where secondary panels usually live.</z-text>
				</z-sheet>
				<z-sheet side="left" heading="Left">
				  <z-button slot="trigger" kind="outline">Left</z-button>
				  <z-text size="sm" color="muted">Reads as navigation, because that is what sits there.</z-text>
				</z-sheet>
				<z-sheet side="top" heading="Top">
				  <z-button slot="trigger" kind="outline">Top</z-button>
				  <z-text size="sm" color="muted">Short and wide only.</z-text>
				</z-sheet>
				<z-sheet side="bottom" heading="Bottom">
				  <z-button slot="trigger" kind="outline">Bottom</z-button>
				  <z-text size="sm" color="muted">The phone-friendly edge.</z-text>
				</z-sheet>
			`
		}),

		defineMarkupExample({
			id: 'size',
			title: 'Sizing',
			description: '`--z-sheet-size` is the one dimension a sheet has. Width on the left and right edges, height on the top and bottom.',
			layout: ExampleLayout.start,
			markup: `
				<z-sheet heading="Narrow" style="--z-sheet-size: 18rem">
				  <z-button slot="trigger" kind="outline">18rem</z-button>
				  <z-text size="sm" color="muted">Tight enough for a list of filters.</z-text>
				</z-sheet>
				<z-sheet heading="Wide" style="--z-sheet-size: 34rem">
				  <z-button slot="trigger" kind="outline">34rem</z-button>
				  <z-text size="sm" color="muted">Room for a two-column form or a preview.</z-text>
				</z-sheet>
			`
		}),

		defineMarkupExample({
			id: 'no-footer',
			title: 'Without a footer',
			description: 'A read-only panel needs no actions, and the footer bar disappears rather than sitting empty.',
			layout: ExampleLayout.start,
			markup: `
				<z-sheet heading="Activity" description="Everything that happened to this record.">
				  <z-button slot="trigger" kind="outline">View activity</z-button>
				  <wired-column gap="sm">
				    <z-text size="sm">Ada renamed the project — 2 hours ago</z-text>
				    <z-separator></z-separator>
				    <z-text size="sm">Alan added three files — yesterday</z-text>
				    <z-separator></z-separator>
				    <z-text size="sm">Grace created the project — last week</z-text>
				  </wired-column>
				</z-sheet>
			`
		}),

		defineMarkupExample({
			id: 'static',
			title: 'Static',
			description: '`is-static` ignores backdrop clicks, for a form mid-flight. Escape still closes, and the ✕ is still there.',
			layout: ExampleLayout.start,
			markup: `
				<z-sheet is-static heading="New invoice" description="Clicking outside will not dismiss this.">
				  <z-button slot="trigger" kind="outline">New invoice</z-button>
				  <wired-column gap="md">
				    <z-field label="Client"><z-input placeholder="Acme Inc."></z-input></z-field>
				    <z-field label="Amount"><z-number-input min="0" step="0.01" value="0"></z-number-input></z-field>
				  </wired-column>
				  <z-button slot="footer" kind="solid" accent="dom">Create invoice</z-button>
				</z-sheet>
			`
		}),

		defineInteractiveExample({
			id: 'events',
			title: 'open and close',
			description:
				'Both fire however the sheet was opened or closed. `close` is the place to reset transient state, so reopening does not resume a half-finished interaction.',
			layout: ExampleLayout.stack,
			markup: `
				<z-sheet id="detailSheet" heading="Record detail">
				  <z-button slot="trigger" kind="outline">Open the sheet</z-button>
				  <z-text size="sm" color="muted">Close it any way you like — ✕, Escape, or the backdrop.</z-text>
				</z-sheet>
				<z-text size="sm" color="muted" id="sheetStatus">Closed.</z-text>
			`,
			script: `
				const detailSheet = document.querySelector('#detailSheet')

				detailSheet.addEventListener('open', () => {
				  loadRecordDetail()
				})

				detailSheet.addEventListener('close', () => {
				  clearDraftState()
				})
			`,
			wire: (root) => {
				const detailSheet = queryPreview<HTMLElement>(root, '#detailSheet')
				const sheetStatus = queryPreview<HTMLElement>(root, '#sheetStatus')

				detailSheet.addEventListener('open', () => {
					sheetStatus.textContent = 'Open — this is where you would load the record.'
				})

				detailSheet.addEventListener('close', () => {
					sheetStatus.textContent = 'Closed — draft state cleared.'
				})
			}
		})
	],

	attributes: [
		{ name: 'is-open', type: 'boolean', defaultValue: '—', description: 'Whether the sheet is showing. Reflects and is two-way.' },
		{ name: 'side', type: 'right | left | top | bottom', defaultValue: 'right', description: 'Which edge it is pinned to and slides in from.' },
		{ name: 'heading', type: 'string', defaultValue: '—', description: 'Title in the header, and the sheet’s accessible name.' },
		{ name: 'description', type: 'string', defaultValue: '—', description: 'A muted line under the heading.' },
		{ name: 'has-close', type: 'boolean', defaultValue: '—', description: 'Removes the ✕. Only safe when there is another way out.' },
		{ name: 'is-static', type: 'boolean', defaultValue: '—', description: 'Ignores backdrop clicks. Escape still closes.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Stops the trigger from opening the sheet.' }
	],

	properties: [],

	slots: [
		{ name: 'trigger', description: 'The element that opens the sheet.' },
		{ name: '(default)', description: 'The body. Scrolls when it outgrows the panel.' },
		{ name: 'footer', description: 'Actions. Hidden when empty.' }
	],

	events: [
		{ name: 'open', detail: '—', description: 'Fires after the sheet has been shown.' },
		{ name: 'close', detail: '—', description: 'Fires after it closes, however it closed.' }
	],

	cssVariables: [
		{ name: '--z-sheet-size', defaultValue: '22rem', description: 'Width on the left and right edges; height on the top and bottom. Capped to the viewport.' }
	],

	accessibilityNotes: [
		'It is a modal: showModal() traps focus, makes the page behind inert to assistive technology, and handles Escape. Visible does not mean reachable.',
		'The heading is the accessible name. A sheet that slides in unnamed leaves a screen-reader user to work out what just took over the screen.',
		'Focus returns to the trigger on close, courtesy of the native dialog element.',
		'The sheet renders in the browser’s top layer, so it clears every stacking context on the page without a z-index arms race.',
		'Because the page stays visible behind the backdrop, resist putting anything in the sheet that refers to what is behind it — visible is not the same as usable while a modal is open.'
	],

	related: [
		{ tag: 'z-drawer', route: '/c/overlays/z-drawer', description: 'A bottom sheet with a grab handle and drag-to-dismiss.' },
		{ tag: 'z-dialog', route: '/c/overlays/z-dialog', description: 'The centred version, for short content.' },
		{ tag: 'z-panel', route: '/c/canvas-panels/z-panel', description: 'A non-modal side panel that lives in the layout.' }
	]
}
