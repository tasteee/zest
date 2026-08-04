import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundCallout = (): HTMLElement => {
	const callout = document.createElement('z-callout')
	callout.setAttribute('accent', 'dom')
	callout.setAttribute('heading', 'Note')
	callout.textContent = 'Every overlay in this library renders in the browser’s top layer.'
	return callout
}

export const zCalloutDoc: ComponentDocT = {
	tag: 'z-callout',
	title: 'z-callout',
	tagline: 'The admonition block — a note, a tip, a warning inside prose.',
	status: ComponentStatus.stable,

	description:
		'A content-emphasis block for documentation: a left accent bar tinted by `kind`, a leading icon, an optional `heading`, and slotted body copy. It differs from `z-alert` in what it reports — an alert describes the state of the system, a callout emphasises a piece of writing. Omit the heading and it renders compact, with the icon centred against the copy. Set `is-expandable` and long copy clamps to two lines with an inline "Show more" that only appears when the text actually overflows.',

	playground: {
		buildElement: buildPlaygroundCallout,
		controlNames: ['kind', 'heading', 'is-expandable', 'is-expanded'],
		slotLabel: 'Every overlay renders in the top layer.'
	},

	usageGuidance: [
		'Use it inside prose. A callout in an application interface is almost always an `z-alert` wearing the wrong component.',
		'The five kinds are the GitHub admonition set, and they mean what they say there: Note is context, Tip is optional advice, Important is required reading, Warning is a risk, Caution is a hazard.',
		'Spend Warning and Caution sparingly. A page where every third paragraph is a red block reads as noise, and the one that matters gets skipped with the rest.',
		'A heading is opt-in. Add one when the callout carries several sentences; omit it for a single line and let the compact layout do the work.',
		'`is-expandable` earns its place for a long aside that only some readers need — the toggle appears only when the copy genuinely overflows two lines, so short callouts are unaffected.',
		'Never put the only copy of something essential in a collapsed callout. A reader who never expands it must still be able to finish the task.'
	],

	anatomy: [
		{ name: 'accent bar', description: 'The tinted left edge and border, coloured by kind. Overridable through --callout-color.' },
		{ name: 'icon', description: 'One glyph per kind — an "i", a lightbulb, an "!", a triangle, an octagon.' },
		{ name: 'heading', description: 'Optional label row. Its absence switches the block to the compact layout.' },
		{ name: 'default slot', description: 'The body copy.' },
		{ name: 'toggle', description: 'The inline "Show more", drawn at the end of the second line and only when the copy overflows.' }
	],

	examples: [
		defineMarkupExample({
			id: 'kinds',
			title: 'Kinds',
			description: 'Five admonitions, each with its own hue and icon. The heading is conventionally the kind’s own name, but it is yours to write.',
			layout: ExampleLayout.stack,
			markup: `
				<z-callout accent="dom" heading="Note">
				  Every overlay in this library renders in the browser’s top layer, so it is never clipped by an ancestor’s overflow.
				</z-callout>
				<z-callout accent="success" heading="Tip">
				  Set <code>keywords</code> on a command so people can find it by the word they actually think in.
				</z-callout>
				<z-callout accent="sub" heading="Important">
				  A custom element’s shadow root breaks the usual label association. Use <code>z-field</code>, which forwards the label for you.
				</z-callout>
				<z-callout accent="warning" heading="Warning">
				  Pairing <code>hide-close</code> with <code>is-static</code> removes every way out of a dialog.
				</z-callout>
				<z-callout accent="error" heading="Caution">
				  Revoking an API key takes effect within a minute and cannot be undone.
				</z-callout>
			`
		}),

		defineMarkupExample({
			id: 'compact',
			title: 'Without a heading',
			description: 'No heading means the compact layout: the icon centres against the copy and the label row disappears. Right for a single line.',
			layout: ExampleLayout.stack,
			markup: `
				<z-callout accent="dom">Attribute names are kebab-case; the matching properties are camelCase.</z-callout>
				<z-callout accent="success">Most of these components accept a accent. Neutral is almost always the right one.</z-callout>
			`
		}),

		defineMarkupExample({
			id: 'rich-body',
			title: 'Rich body copy',
			description: 'The slot takes real markup — lists, links, inline code. A callout is prose, so it should be allowed to look like prose.',
			layout: ExampleLayout.stack,
			markup: `
				<z-callout accent="sub" heading="Before you upgrade">
				  Two things changed in 2.0:
				  <ul>
				    <li><code>z-select</code> takes its options as a property, not as markup.</li>
				    <li>Overlay positioning moved to the shared core, so <code>placement</code> now flips automatically.</li>
				  </ul>
				  See the <z-link href="#">migration guide</z-link> for the full list.
				</z-callout>
			`
		}),

		defineMarkupExample({
			id: 'expandable',
			title: 'Expandable',
			description:
				'Long copy clamps to two lines with an inline toggle at the end of the second. The toggle only renders when the text really does overflow — a short expandable callout looks exactly like a normal one.',
			layout: ExampleLayout.stack,
			markup: `
				<z-callout accent="dom" heading="Why the native dialog element" is-expandable>
				  Building the modal family on <code>&lt;dialog&gt;</code> means focus trapping, Escape handling, top-layer stacking, and the backdrop all come from the browser rather than from JavaScript that has to be maintained and kept correct across browsers. The alternative — a div with a manual focus trap — is one of the most commonly broken patterns on the web, and it fails in ways that are invisible until someone tries to use it with a screen reader or a keyboard alone.
				</z-callout>
				<z-callout accent="success" is-expandable>
				  This one is short, so no toggle appears.
				</z-callout>
			`
		}),

		defineMarkupExample({
			id: 'custom-color',
			title: 'Custom accent',
			description: '`--callout-color` overrides the hue without leaving the system — for a house colour on a specific kind of aside.',
			layout: ExampleLayout.stack,
			markup: `
				<z-callout accent="dom" heading="Design system" style="--callout-color: var(--pink)">
				  Overriding the accent keeps the layout and the icon while changing only the hue.
				</z-callout>
			`
		}),

		defineInteractiveExample({
			id: 'controlling-expansion',
			title: 'Controlling expansion',
			description: '`is-expanded` reflects, so the open state can be read and driven from code — expanding every aside on a page at once, for instance.',
			layout: ExampleLayout.stack,
			markup: `
				<z-button id="expandAll" size="sm" kind="outline">Expand all</z-button>
				<z-callout class="expandableCallout" accent="dom" heading="First aside" is-expandable>
				  The shared overlay core mirrors a small subset of Floating UI: place on a side, align on the cross axis, flip when the preferred side overflows, then shift to stay on screen. That is deliberately less than a full positioning library, because the cases beyond it are rare enough to be worth handling individually rather than paying for everywhere.
				</z-callout>
				<z-callout class="expandableCallout" accent="success" heading="Second aside" is-expandable>
				  Anchored positioning is computed in JavaScript because the CSS Anchor API is not broadly available yet. When it is, this becomes a stylesheet change rather than an API change, since the placement attribute already describes intent rather than mechanism.
				</z-callout>
			`,
			script: `
				const callouts = document.querySelectorAll('.expandableCallout')

				document.querySelector('#expandAll').addEventListener('click', () => {
				  for (const callout of callouts) callout.isExpanded = true
				})
			`,
			wire: (root) => {
				const expandAll = queryPreview<HTMLElement>(root, '#expandAll')
				const callouts = root.querySelectorAll('.expandableCallout')

				expandAll.addEventListener('click', () => {
					const isExpandingAll = expandAll.textContent === 'Expand all'

					for (const callout of callouts) {
						if (isExpandingAll) callout.setAttribute('is-expanded', '')
						if (!isExpandingAll) callout.removeAttribute('is-expanded')
					}

					expandAll.textContent = isExpandingAll ? 'Collapse all' : 'Expand all'
				})
			}
		})
	],

	attributes: [
		{ name: 'accent', type: 'dom | sub | neutral | success | warning | error', defaultValue: 'dom', description: 'Which admonition this is. Picks the hue and the icon.' },
		{ name: 'heading', type: 'string', defaultValue: '—', description: 'Optional label row. Omitting it switches to the compact layout.' },
		{ name: 'is-expandable', type: 'boolean', defaultValue: '—', description: 'Clamps the body to two lines with an inline toggle, when the copy overflows.' },
		{ name: 'is-expanded', type: 'boolean', defaultValue: '—', description: 'The open state of an expandable callout. Reflects, so it can be read and set.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the callout from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'The body copy — prose, lists, links, inline code.' }],

	events: [],

	cssVariables: [
		{ name: '--callout-color', defaultValue: 'per kind', description: 'The accent hue. Set it to override a kind’s colour without changing its icon or layout.' },
		{
			name: '--callout-fade',
			defaultValue: 'derived',
			description: 'Opaque twin of the fill, used behind the "Show more" fade. Set it when the callout sits on a non-default surface.'
		}
	],

	accessibilityNotes: [
		'Warning and caution callouts carry role="alert"; the rest use role="note". A hazard in prose should interrupt, and a footnote should not.',
		'The icon is aria-hidden. The kind is communicated by the heading and the copy, so the block still makes sense without colour or glyph.',
		'The expand toggle is a real button with aria-expanded, and it only exists when the copy actually overflows — which means a keyboard user is never handed a control that does nothing.',
		'Overflow is measured against scrollHeight and re-measured on resize and on slot changes, so the toggle stays correct when the layout reflows or the copy is replaced.',
		'Never hide required information behind a collapsed callout. The clamped state is the one most readers will see.'
	],

	related: [
		{ tag: 'z-alert', route: '/c/overlays/z-alert', description: 'For system state rather than prose emphasis.' },
		{ tag: 'z-markdown', route: '/c/specialized/z-markdown', description: 'Where callouts usually end up rendered.' },
		{ tag: 'z-collapsible', route: '/c/navigation-disclosure/z-collapsible', description: 'For hiding a whole section rather than clamping copy.' }
	]
}
