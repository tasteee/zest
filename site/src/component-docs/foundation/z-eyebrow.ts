import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'
import { TEXT_FAMILY_RELATED } from './text-family'

const buildPlaygroundEyebrow = (): HTMLElement => {
	const eyebrow = document.createElement('z-eyebrow')
	eyebrow.setAttribute('label', 'Design system')
	eyebrow.setAttribute('has-rule', '')
	return eyebrow
}

export const zEyebrowDoc: ComponentDocT = {
	tag: 'z-eyebrow',
	title: 'z-eyebrow',
	tagline: 'The mono kicker above a title, with an optional trailing hairline.',
	status: ComponentStatus.stable,

	description:
		'A small uppercase kicker set in the mono face, letter-tracked and drawn in an accent accent, with an optional rule trailing off to the right. It differs from `z-subheading` in texture rather than role: the mono typeface and accent colour make it read as a system marker rather than as text, which is why it works above a large title without competing with it. It owns no outer margin — space it with whatever layout primitive it sits in.',

	playground: {
		buildElement: buildPlaygroundEyebrow,
		controlNames: [],
		slotLabel: 'Design system'
	},

	usageGuidance: [
		'One or two words. The mono face and tracking make it wide fast, and a long eyebrow steals attention from the title beneath it.',
		'`has-rule` suits a is-full-width section header; without it the eyebrow is compact enough to sit in a card.',
		'Choose `z-subheading` instead when you want the body typeface — same job, different texture.',
		'It carries no margin of its own. Put it in a `wired-column` with a small gap rather than reaching for a margin on the element.'
	],

	anatomy: [
		{ name: 'label', description: 'The kicker text, set through `label` or by slotting children.' },
		{ name: 'rule', description: 'An optional hairline trailing the label, shown with `has-rule`.' },
		{ name: 'color', description: 'The accent colour of both the label and the rule.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'With and without the rule',
			description: 'The rule turns a compact kicker into a full section divider.',
			layout: ExampleLayout.fill,
			markup: `
				<z-eyebrow label="Design system"></z-eyebrow>
				<z-eyebrow label="Design system" has-rule></z-eyebrow>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'Secondary is the default. Neutral suits dense interfaces where an accent would be too loud.',
			layout: ExampleLayout.fill,
			markup: `
				<z-eyebrow label="Secondary — the default" has-rule></z-eyebrow>
				<z-eyebrow label="Primary" color="dom" has-rule></z-eyebrow>
				<z-eyebrow label="Neutral" color="neutral" has-rule></z-eyebrow>
			`
		}),

		defineMarkupExample({
			id: 'is-full-width',
			title: 'Full width',
			description: 'By default the rule runs a fixed length. `is-full-width` stretches it to fill the container instead.',
			layout: ExampleLayout.fill,
			markup: `
				<z-eyebrow label="Fixed rule" has-rule></z-eyebrow>
				<z-eyebrow label="Stretched rule" has-rule is-full-width></z-eyebrow>
			`
		}),

		defineMarkupExample({
			id: 'slotted',
			title: 'Slotted content',
			description: 'Slotting instead of using `label` lets the kicker carry more than plain text.',
			layout: ExampleLayout.fill,
			markup: `
				<z-eyebrow color="dom" has-rule>Changelog</z-eyebrow>
			`
		}),

		defineMarkupExample({
			id: 'section-header',
			title: 'Above a section title',
			description: 'The pattern it exists for — category, title, supporting copy, in that order.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="sm" style="max-width: 42rem">
				  <z-eyebrow label="Components" has-rule is-full-width></z-eyebrow>
				  <z-heading size="xl">Everything, encapsulated</z-heading>
				  <z-text color="muted">
				    Each element carries its own styles inside a shadow root, so nothing
				    leaks in and nothing leaks out.
				  </z-text>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'in-a-card',
			title: 'Inside a card',
			description: 'Without the rule it is compact enough to label a panel without crowding it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-card style="max-width: 22rem">
				  <wired-column gap="xs">
				    <z-eyebrow label="Usage" color="neutral"></z-eyebrow>
				    <z-heading size="sm" tag="h3">48 of 100 seats</z-heading>
				    <z-text size="sm" color="muted">Resets on the first of the month.</z-text>
				  </wired-column>
				</z-card>
			`
		})
	],

	attributes: [
		{ name: 'color', type: 'dom | neutral', defaultValue: 'sub', description: 'Accent colour of the label and rule.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Kicker text. Takes precedence over slotted children.' },
		{ name: 'has-rule', type: 'boolean', defaultValue: '—', description: 'Draws a hairline rule trailing the label.' },
		{
			name: 'is-full-width',
			type: 'boolean',
			defaultValue: '—',
			description: 'Stretches the rule to fill the container rather than running a fixed length.'
		},
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the eyebrow from layout.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'Kicker text. Ignored when the label attribute is set.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'The rule is decorative and carries no semantics — it is not announced, and it does not divide content structurally the way z-separator does.',
		'An eyebrow and the heading beneath it are read as two separate items, so the heading must still make sense on its own.',
		'Write the label in normal casing. The uppercasing is a CSS transform, and some screen readers spell out all-caps source text.',
		'This is decorative typography, not a heading. It contributes nothing to the document outline.'
	],

	related: [
		TEXT_FAMILY_RELATED.subheading,
		TEXT_FAMILY_RELATED.heading,
		TEXT_FAMILY_RELATED.display,
		{ tag: 'z-separator', route: '/c/foundation/z-separator', description: 'A structural divider that can carry a label.' }
	]
}
