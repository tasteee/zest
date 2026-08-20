import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'
import { TEXT_FAMILY_RELATED } from './text-family'

const buildPlaygroundLabel = (): HTMLElement => {
	const label = document.createElement('z-label')
	label.textContent = 'Email address'
	return label
}

export const zLabelDoc: ComponentDocT = {
	tag: 'z-label',
	title: 'z-label',
	tagline: 'A consistent small-caps label for fields and compact UI.',
	status: ComponentStatus.stable,

	description:
		'An opinionated visual label that matches `z-field`: small text, 600 weight, all-small-caps, and `neutral-5`. It deliberately has no size, color, weight, italic, underline, or strikethrough variants, so labels stay consistent throughout an interface. It renders a `<span>` by default. For a form control label that is programmatically associated with its input, use `z-field`, which forwards the name across the shadow boundary.',

	playground: {
		buildElement: buildPlaygroundLabel,
		controlNames: [],
		slotLabel: 'Email address'
	},

	usageGuidance: [
		'Use `z-field` for real form labels. This one is a visual label and does not associate itself with any control.',
		'Right for naming a value in a stat block, metadata row, or definition list — anywhere a short name introduces a piece of data.',
		'Keep labels to a couple of words. If it needs a sentence, use help text such as `z-text size="sm" color="muted"`.',
		'It renders inline, so a label and its value sit on one line without any extra layout.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The label text.' },
		{ name: 'rendered tag', description: 'A `<span>` by default — inline, so it flows beside its value.' }
	],

	examples: [
		defineMarkupExample({
			id: 'metadata-rows',
			title: 'Labelled values',
			description: 'The everyday pattern: a consistent label naming a value, aligned in a two-column grid.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="sm" style="max-width: 24rem">
				  <wired-row x="between">
				    <z-label>Plan</z-label>
				    <z-text size="sm">Enterprise</z-text>
				  </wired-row>
				  <wired-row x="between">
				    <z-label>Seats</z-label>
				    <z-text size="sm">48 of 100</z-text>
				  </wired-row>
				  <wired-row x="between">
				    <z-label>Renews</z-label>
				    <z-text size="sm">14 March 2027</z-text>
				  </wired-row>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'inline-with-badge',
			title: 'Beside other inline content',
			description: 'Because it renders a span, a label sits on the same line as a badge or an icon without any wrapper.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-row gap="xs" y="center">
				  <z-label>Deployment</z-label>
				  <z-badge accent="success" kind="soft" label="Live" size="sm"></z-badge>
				</wired-row>
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
				  <z-label tag="dt">Runtime</z-label>
				  <z-text tag="dd" size="sm" style="margin: 0">Zero dependencies</z-text>

				  <z-label tag="dt">Bundle</z-label>
				  <z-text tag="dd" size="sm" style="margin: 0">One self-contained module</z-text>
				</dl>
			`
		})
	],

	attributes: [
		{ name: 'tag', type: 'string', defaultValue: 'span', description: 'The semantic element rendered inside the host.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the element from layout.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The label text.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'This is a visual label only — it does not associate with a form control. Use z-field for that, since it forwards the accessible name across the shadow boundary.',
		'Setting tag to dt inside a dl gives a labelled value real term-and-definition semantics instead of two unrelated runs of text.',
		'A label and its value that read as a pair visually are announced separately unless the markup says otherwise. Structure matters more than proximity here.',
		'The fixed neutral-5 treatment is designed for short supporting labels; use ordinary text when the content itself needs emphasis.'
	],

	related: [
		{ tag: 'z-field', route: '/c/forms/z-field', description: 'The real, associated form label.' },
		TEXT_FAMILY_RELATED.text,
		TEXT_FAMILY_RELATED.subheading,
		{ tag: 'z-stat', route: '/c/data-display/z-stat', description: 'A labelled figure with its own layout.' }
	]
}
