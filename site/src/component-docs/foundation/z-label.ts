import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'
import { TEXT_FAMILY_RELATED, buildTextFamilyAttributes } from './text-family'

const buildPlaygroundLabel = (): HTMLElement => {
	const label = document.createElement('z-label')
	label.textContent = 'Email address'
	return label
}

export const zLabelDoc: ComponentDocT = {
	tag: 'z-label',
	title: 'z-label',
	tagline: 'Short UI labels at medium weight, rendered inline.',
	status: ComponentStatus.stable,

	description:
		'The `z-text` family at weight 500, rendering a `<span>`. Medium weight is the point: it sits a step above body copy without the shout of bold, which is what a label needs when it names a value sitting right next to it. It is presentational — for a form control label that is programmatically associated with its input, use `z-field`, which forwards the name across the shadow boundary that would otherwise break the association.',

	playground: {
		buildElement: buildPlaygroundLabel,
		controlNames: [],
		slotLabel: 'Email address'
	},

	usageGuidance: [
		'Use `z-field` for real form labels. This one is a visual label and does not associate itself with any control.',
		'Right for naming a value in a stat block, a metadata row, or a definition list — anywhere a short name introduces a piece of data.',
		'Keep labels to a couple of words. If it needs a sentence, it is help text, and `z-text` at `size="sm"` with `color="muted"` is the better fit.',
		'It renders inline, so a label and its value sit on one line without any extra layout.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The label text.' },
		{ name: 'rendered tag', description: 'A `<span>` by default — inline, so it flows beside its value.' }
	],

	examples: [
		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Four steps. `sm` and `xs` cover most interface labelling.',
			layout: ExampleLayout.fill,
			markup: `
				<z-label size="lg">Large</z-label>
				<z-label size="md">Medium — the default</z-label>
				<z-label size="sm">Small</z-label>
				<z-label size="xs">Extra small</z-label>
			`
		}),

		defineMarkupExample({
			id: 'colors',
			title: 'Colours',
			description: 'Muted is the usual choice when the label introduces a value that should carry the emphasis.',
			layout: ExampleLayout.fill,
			markup: `
				<z-label color="neutral">Neutral</z-label>
				<z-label color="muted">Muted</z-label>
				<z-label color="dom">Primary</z-label>
				<z-label color="sub">Secondary</z-label>
			`
		}),

		defineMarkupExample({
			id: 'metadata-rows',
			title: 'Labelled values',
			description: 'The everyday pattern: a muted label naming a neutral value, aligned in a two-column grid.',
			layout: ExampleLayout.fill,
			markup: `
				<z-column gap="3" style="max-width: 24rem">
				  <z-row aligns-x="between">
				    <z-label size="sm" color="muted">Plan</z-label>
				    <z-text size="sm">Enterprise</z-text>
				  </z-row>
				  <z-row aligns-x="between">
				    <z-label size="sm" color="muted">Seats</z-label>
				    <z-text size="sm">48 of 100</z-text>
				  </z-row>
				  <z-row aligns-x="between">
				    <z-label size="sm" color="muted">Renews</z-label>
				    <z-text size="sm">14 March 2027</z-text>
				  </z-row>
				</z-column>
			`
		}),

		defineMarkupExample({
			id: 'inline-with-badge',
			title: 'Beside other inline content',
			description: 'Because it renders a span, a label sits on the same line as a badge or an icon without any wrapper.',
			layout: ExampleLayout.fill,
			markup: `
				<z-row gap="2" aligns-y="center">
				  <z-label size="sm">Deployment</z-label>
				  <z-badge color="success" kind="soft" label="Live" size="sm"></z-badge>
				</z-row>
			`
		}),

		defineMarkupExample({
			id: 'definition-list',
			title: 'As a definition list',
			description:
				'Setting `tag` to `dt` gives the pairing real semantics, so it is announced as a term and its definition rather than as loose text.',
			layout: ExampleLayout.fill,
			markup: `
				<dl style="margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1.5rem">
				  <z-label tag="dt" size="sm" color="muted">Runtime</z-label>
				  <z-text tag="dd" size="sm" style="margin: 0">Zero dependencies</z-text>

				  <z-label tag="dt" size="sm" color="muted">Bundle</z-label>
				  <z-text tag="dd" size="sm" style="margin: 0">One self-contained module</z-text>
				</dl>
			`
		})
	],

	attributes: buildTextFamilyAttributes({
		sizes: 'lg | md | sm | xs',
		defaultSize: 'md',
		defaultWeight: '500',
		defaultTag: 'span',
		defaultColor: 'neutral',
		sizeDescription: 'Step on the shared type scale.'
	}),

	properties: [],
	slots: [{ name: '(default)', description: 'The label text.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'This is a visual label only — it does not associate with a form control. Use z-field for that, since it forwards the accessible name across the shadow boundary.',
		'Setting tag to dt inside a dl gives a labelled value real term-and-definition semantics instead of two unrelated runs of text.',
		'A label and its value that read as a pair visually are announced separately unless the markup says otherwise. Structure matters more than proximity here.',
		'Muted labels sit at lower contrast by design; keep them at sm or above so they stay comfortably legible.'
	],

	related: [
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'The real, associated form label.' },
		TEXT_FAMILY_RELATED.text,
		TEXT_FAMILY_RELATED.subheading,
		{ tag: 'z-stat', route: '/c/data-display/z-stat', description: 'A labelled figure with its own layout.' }
	]
}
