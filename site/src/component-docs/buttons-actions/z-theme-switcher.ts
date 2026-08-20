import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSwitcher = (): HTMLElement => {
	const switcher = document.createElement('z-theme-switcher')
	return switcher
}

// A pinned region has to paint the page surface itself — data-theme only
// re-points the tokens, it doesn't fill anything — so both panes carry the
// background and the page wash that <body> would normally provide.
const PANE_STYLE =
	'flex: 1 1 240px; padding: var(--space-lg); border-radius: var(--radius-lg); background: var(--background); background-image: var(--material-page);'

export const zThemeSwitcherDoc: ComponentDocT = {
	tag: 'z-theme-switcher',
	title: 'z-theme-switcher',
	tagline: "Switches the page between zest's dark ink and its light haze.",
	status: ComponentStatus.stable,

	description:
		"Two kinds over one piece of state. `segmented` is the honest one — Light, Dark and System as three explicit choices in a single joined control. `icon` is the compact one for a crowded header: one button that flips between light and dark, with no `system` state to land on. Choosing a theme writes `data-theme` onto `<html>`, which is the attribute every token block in `ink.css` keys off; because custom properties cross shadow boundaries, that one attribute re-themes every `z-*` element on the page. The choice persists to `localStorage`, and `system` keeps tracking the OS after the fact rather than resolving once and forgetting.",

	playground: {
		buildElement: buildPlaygroundSwitcher,
		controlNames: ['kind', 'accent', 'is-icon-only', 'size', 'size'],
		slotLabel: 'No slotted content'
	},

	usageGuidance: [
		'Changing theme fades the page out, swaps while nothing is visible, and fades back in — 0.45s end to end. Almost none of a theme swap can be transitioned in CSS, so the change is sequenced rather than blended; the page colour is the exception and interpolates on its own underneath, so the gap is never empty. Retime it with `--theme-transition-duration` on `:root`.',
		'Offer `system` unless you have a reason not to. Most readers have already told their OS what they want, and following it is the answer that needs no thought — which is why the segmented kind is the default.',
		'Reach for `icon` when the header is genuinely tight. It trades the system option and the visible current state for one button, so it is the weaker control, not the neater one.',
		'Leave the accent unset in app chrome. A theme switcher is a setting, not a call to action, and a neutral selection keeps it from competing with the actions around it.',
		'Set `data-theme` inline in `<head>` if the page must not flash. Importing the library applies the stored preference immediately, but no module can run before first paint — see the snippet in the notes below.',
		'Any number of switchers can coexist. They read the same module state, so a switcher in a header and one in a settings pane stay in agreement without being wired together.'
	],

	anatomy: [
		{ name: 'segmented track', description: 'The bordered container that joins the three choices into one control.' },
		{ name: 'segment', description: 'One choice — icon plus label — rendered as a radio inside a radiogroup.' },
		{ name: 'selection fill', description: 'The selected segment paints with the switcher accent, neutral unless a accent is set.' },
		{ name: 'icon button', description: 'The `icon` kind: a single square button in place of the track.' },
		{ name: 'glyph stack', description: 'Sun and moon share one grid cell and cross-fade, so the button never changes size as it flips.' }
	],

	examples: [
		defineMarkupExample({
			id: 'segmented',
			title: 'Segmented',
			description: 'The default. Three explicit choices, with `System` following the OS for as long as it stays selected.',
			markup: `
				<z-theme-switcher></z-theme-switcher>
			`
		}),

		defineMarkupExample({
			id: 'icon',
			title: 'Icon',
			description:
				'One button, two states. Flipping it while the preference is `system` commits to the opposite of whatever the system is currently showing — the only reading of "toggle" that is not a no-op.',
			markup: `
				<z-theme-switcher kind="icon"></z-theme-switcher>
			`
		}),

		defineMarkupExample({
			id: 'icon-only',
			title: 'Labels off',
			description: 'Keeps all three choices but drops the text, for a header that has the width for a control and not for a sentence.',
			markup: `
				<z-theme-switcher is-icon-only></z-theme-switcher>
			`
		}),

		defineInteractiveExample({
			id: 'themes',
			title: 'Offering the material themes',
			description:
				'The `themes` property names which choices to render, and in what order. zest ships four — two flat, two material — and this offers all of them plus System.',
			layout: ExampleLayout.stack,
			markup: `
				<z-theme-switcher id="allThemes" size></z-theme-switcher>
			`,
			script: `
				const allThemes = document.querySelector('#allThemes')

				allThemes.themes = ['light', 'dark', 'console', 'studio', 'system']
			`,
			wire: (root) => {
				const allThemes = queryPreview<HTMLElement & { themes: string[] }>(root, '#allThemes')
				allThemes.themes = ['light', 'dark', 'console', 'studio', 'system']
			}
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three densities. The medium default suits a page header; small sits comfortably inside a toolbar.',
			layout: ExampleLayout.stack,
			markup: `
				<z-theme-switcher size></z-theme-switcher>
				<z-theme-switcher></z-theme-switcher>
				<z-theme-switcher size></z-theme-switcher>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'The selection paints neutral by default. A accent is available when the switcher is the subject of the screen rather than chrome around it.',
			layout: ExampleLayout.stack,
			markup: `
				<z-theme-switcher></z-theme-switcher>
				<z-theme-switcher accent="dom"></z-theme-switcher>
				<z-theme-switcher accent="sub"></z-theme-switcher>
			`
		}),

		defineMarkupExample({
			id: 'regions',
			title: 'Theming a region',
			description:
				'`data-theme` is not a document-wide switch. Both values are defined as plain attribute selectors, so either theme can be pinned onto any subtree — which is how these two specimens render side by side no matter what the page is set to.',
			layout: ExampleLayout.stack,
			markup: `
				<wired-row gap="lg" wrap>
				  <div data-theme="light" style="${PANE_STYLE}">
				    <z-card><wired-column gap="md">
				      <z-heading size="sm" tag="h3">Haze</z-heading>
				      <z-text size="sm" color="muted">Light surfaces, lit rather than filled.</z-text>
				      <z-input placeholder="Search"></z-input>
				      <z-button kind="solid" accent="dom" size="sm">Primary</z-button>
				    </wired-column></z-card>
				  </div>
				  <div data-theme="dark" style="${PANE_STYLE}">
				    <z-card><wired-column gap="md">
				      <z-heading size="sm" tag="h3">Ink</z-heading>
				      <z-text size="sm" color="muted">Flat surfaces, no gradient anywhere.</z-text>
				      <z-input placeholder="Search"></z-input>
				      <z-button kind="solid" accent="dom" size="sm">Primary</z-button>
				    </wired-column></z-card>
				  </div>
				</wired-row>
			`
		}),

		defineInteractiveExample({
			id: 'change-event',
			title: 'Reading the change event',
			description:
				'`preference` is what the reader chose; `theme` is what that resolves to right now. They differ whenever `system` is selected, which is exactly why both are reported.',
			layout: ExampleLayout.stack,
			markup: `
				<z-theme-switcher id="themeSwitcher"></z-theme-switcher>
				<z-text size="sm" color="muted" id="themeStatus">Nothing chosen yet.</z-text>
			`,
			script: `
				const themeSwitcher = document.querySelector('#themeSwitcher')

				themeSwitcher.addEventListener('change', (changeEvent) => {
				  console.log(changeEvent.detail.preference, changeEvent.detail.theme)
				})
			`,
			wire: (root) => {
				const themeSwitcher = queryPreview<HTMLElement>(root, '#themeSwitcher')
				const themeStatus = queryPreview<HTMLElement>(root, '#themeStatus')

				themeSwitcher.addEventListener('change', (changeEvent) => {
					const detail = (changeEvent as CustomEvent<{ preference: string; theme: string }>).detail
					themeStatus.textContent = `preference: ${detail.preference} → painting: ${detail.theme}`
				})
			}
		})
	],

	attributes: [
		{
			name: 'kind',
			type: 'segmented | icon',
			defaultValue: 'segmented',
			description: 'Three explicit choices, or one compact button that flips between light and dark.'
		},
		{ name: 'is-icon-only', type: 'boolean', defaultValue: '—', description: 'Drops the text labels from the segmented kind.' },
		{
			name: 'themes',
			type: 'string[]',
			defaultValue: "['light','dark','system']",
			description: 'Which choices to offer, in order. A property, not an attribute. Unknown names are ignored.'
		},
		{
			name: 'accent',
			type: 'dom | sub',
			defaultValue: '—',
			description: 'Accent the selection paints with. Neutral when unset.'
		},
		{ name: 'size', type: 'boolean', defaultValue: '—', description: 'Compact density.' },
		{ name: 'size', type: 'boolean', defaultValue: '—', description: 'Roomy density.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the switcher from layout.' }
	],

	properties: [],

	slots: [],

	events: [
		{
			name: 'change',
			detail: "{ preference: 'light' | 'dark' | 'system', theme: 'light' | 'dark' }",
			description: 'Fires on selection. `preference` is what was chosen; `theme` is what that resolves to at that moment.'
		}
	],

	cssVariables: [
		{ name: '--switcher-accent', defaultValue: 'var(--foreground)', description: 'Fill of the selected segment.' },
		{
			name: '--switcher-accent-foreground',
			defaultValue: 'var(--primary-foreground)',
			description: 'Label colour inside the selected segment.'
		},
		{ name: '--switcher-height', defaultValue: '2.25rem', description: 'Segment height, driven by the size attributes.' },
		{ name: '--switcher-icon-size', defaultValue: '0.9375rem', description: 'Glyph size, driven by the size attributes.' },
		{
			name: '--theme-transition-duration',
			defaultValue: '0.45s',
			description: 'Length of the whole fade-out-swap-fade-in. Set on :root, not on the switcher.'
		}
	],

	accessibilityNotes: [
		'The segmented kind is a radiogroup of radios, so it reads as one choice out of three rather than three independent toggles.',
		'The icon kind carries an aria-label naming the destination — "Switch to light theme" — because the glyph alone shows the current state, not the outcome.',
		'Every segment keeps its text label unless is-icon-only is set, and keeps its accessible name either way.',
		'`color-scheme` is set alongside the tokens, so native chrome the browser paints for us — form control internals, the caret, overlay scrollbars — flips with the theme instead of fighting it.'
	],

	related: [
		{ tag: 'z-toggle-group', route: '/c/buttons-actions/z-toggle-group', description: 'The general segmented control this borrows its shape from.' },
		{ tag: 'z-switch', route: '/c/forms/z-switch', description: 'A binary toggle for a form field rather than a setting.' },
		{ tag: 'z-toggle', route: '/c/buttons-actions/z-toggle', description: 'A standalone two-state button.' }
	]
}
