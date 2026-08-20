import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundKbd = (): HTMLElement => {
	const kbd = document.createElement('z-kbd')
	kbd.setAttribute('label', 'K')
	return kbd
}

export const zKbdDoc: ComponentDocT = {
	tag: 'z-kbd',
	title: 'z-kbd',
	tagline: 'One keyboard key cap, for documenting shortcuts.',
	status: ComponentStatus.stable,

	description:
		'A single key. Bordered, mono, with just enough of a raised edge to read as a physical cap rather than a code span. It is deliberately one key rather than a chord parser — a chord is a few of these with plain text between them, which keeps the markup obvious and lets you space and punctuate a combination however your interface needs.',

	playground: {
		buildElement: buildPlaygroundKbd,
		controlNames: [],
		slotLabel: 'K'
	},

	usageGuidance: [
		'One element per key. Put the "+" or the spacing between them as plain text, not inside a cap.',
		'Match the platform: `⌘` on macOS, `Ctrl` elsewhere. Showing the wrong modifier is worse than showing none.',
		'`sm` and `xs` are right inside menus, buttons, and command palettes, where the cap should sit beside a label without enlarging the row.',
		'Use it for keys the user presses. For a code identifier in prose, an inline code span is the honest choice.'
	],

	anatomy: [
		{ name: 'label', description: 'The key text, set through `label` or by slotting children.' },
		{ name: 'cap', description: 'The bordered box with its raised bottom edge.' }
	],

	examples: [
		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Five steps. Pick the one that matches the text the cap sits beside.',
			markup: `
				<z-kbd size="xs" label="K"></z-kbd>
				<z-kbd size="sm" label="K"></z-kbd>
				<z-kbd size="md" label="K"></z-kbd>
				<z-kbd size="lg" label="K"></z-kbd>
				<z-kbd size="xl" label="K"></z-kbd>
			`
		}),

		defineMarkupExample({
			id: 'chords',
			title: 'Chords',
			description: 'Several caps with plain text between them. The separator is yours to choose.',
			layout: ExampleLayout.stack,
			markup: `
				<wired-row gap="xs" y="center">
				  <z-kbd label="⌘"></z-kbd>
				  <z-text size="sm" color="muted">+</z-text>
				  <z-kbd label="K"></z-kbd>
				</wired-row>

				<wired-row gap="xs" y="center">
				  <z-kbd label="⌘"></z-kbd>
				  <z-kbd label="⇧"></z-kbd>
				  <z-kbd label="P"></z-kbd>
				</wired-row>

				<wired-row gap="xs" y="center">
				  <z-kbd label="Ctrl"></z-kbd>
				  <z-text size="sm" color="muted">then</z-text>
				  <z-kbd label="S"></z-kbd>
				</wired-row>
			`
		}),

		defineMarkupExample({
			id: 'named-keys',
			title: 'Named and symbol keys',
			description: 'Word keys widen the cap automatically; arrows and modifiers stay square.',
			markup: `
				<z-kbd label="Enter"></z-kbd>
				<z-kbd label="Esc"></z-kbd>
				<z-kbd label="Tab"></z-kbd>
				<z-kbd label="⌫"></z-kbd>
				<z-kbd label="↑"></z-kbd>
				<z-kbd label="↓"></z-kbd>
			`
		}),

		defineMarkupExample({
			id: 'in-prose',
			title: 'Inline in prose',
			description: 'Caps sit on the text baseline, so a shortcut mentioned mid-sentence does not disturb the line.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text style="max-width: 40rem">
				  Press <z-kbd size="sm" label="⌘"></z-kbd> <z-kbd size="sm" label="K"></z-kbd>
				  to open the command palette, or <z-kbd size="sm" label="Esc"></z-kbd> to
				  dismiss it again.
				</z-text>
			`
		}),

		defineMarkupExample({
			id: 'in-a-menu-row',
			title: 'As a shortcut hint',
			description:
				'The common interface use: the action on the left, its shortcut pushed to the right by a growing spacer.',
			layout: ExampleLayout.fill,
			markup: `
				<z-surface level="1" radius="md" style="max-width: 22rem">
				  <wired-column gap="2xs">
				    <wired-row y="center" gap="sm">
				      <z-text size="sm">Search</z-text>
				      <z-spacer can-grow></z-spacer>
				      <z-kbd size="xs" label="⌘"></z-kbd>
				      <z-kbd size="xs" label="K"></z-kbd>
				    </wired-row>
				    <wired-row y="center" gap="sm">
				      <z-text size="sm">Save</z-text>
				      <z-spacer can-grow></z-spacer>
				      <z-kbd size="xs" label="⌘"></z-kbd>
				      <z-kbd size="xs" label="S"></z-kbd>
				    </wired-row>
				  </wired-column>
				</z-surface>
			`
		}),

		defineMarkupExample({
			id: 'slotted',
			title: 'Slotted content',
			description: 'Slot the key instead of using `label` when the content is not a plain string.',
			markup: `
				<z-kbd>K</z-kbd>
				<z-kbd>Space</z-kbd>
			`
		})
	],

	attributes: [
		{ name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md', description: 'Cap size.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Key text. Takes precedence over slotted children.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the cap from layout.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The key label. Ignored when the label attribute is set.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Symbol keys are the weak point: "⌘" may be announced as "place of interest sign" or skipped entirely. In text that matters, write the name out or add an aria-label.',
		'A chord built from several caps is announced as separate items, so the surrounding sentence should make the combination clear.',
		'A shortcut shown in the interface must actually be bound. A cap is documentation, not a control, and it does nothing when clicked.',
		'Modifier keys differ by platform — detect it rather than hardcoding the Mac symbols for everyone.'
	],

	related: [
		{ tag: 'z-command', route: '/c/overlays/z-command', description: 'The palette these shortcuts usually open.' },
		{ tag: 'z-menu', route: '/c/navigation-disclosure/z-menu', description: 'Menus that display shortcut hints.' },
		{ tag: 'z-tooltip', route: '/c/overlays/z-tooltip', description: 'Another place a shortcut hint belongs.' }
	]
}
