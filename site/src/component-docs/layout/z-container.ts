import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundContainer = (): HTMLElement => {
	const container = document.createElement('z-container')
	container.setAttribute('size', 'sm')
	container.setAttribute('gutter', 'md')
	container.className = 'demoFrame'
	container.innerHTML = `<z-text size="sm">Capped and centred page content.</z-text>`
	return container
}

export const zContainerDoc: ComponentDocT = {
	tag: 'z-container',
	title: 'z-container',
	tagline: 'A centred, max-width page wrapper with side gutters.',
	status: ComponentStatus.stable,

	description:
		'The element that stops a page from spanning the full width of a large monitor. It caps its own width, centres itself, and adds horizontal gutters so content never touches the viewport edge. Centring is the default rather than an opt-in — the `isCentered` attribute exists for API completeness, not because you need to set it. When a page band already exists, `z-section` can fold this behaviour in through its own `container` prop and save you the nested element.',

	playground: {
		buildElement: buildPlaygroundContainer,
		controlNames: ['size', 'gutter', 'is-full-height'],
		slotLabel: 'Page content'
	},

	usageGuidance: [
		'One container per band, wrapping the content — not the background. Nesting the band inside the container is what produces a page whose colours stop short of the edge.',
		'Always set a `gutter`. Without one, content presses against the viewport edge on a phone, which is where the width cap matters least and the padding matters most.',
		'Use `z-section` with its `container` prop when the band also needs vertical spacing. Two elements collapse into one.',
		'`size="full"` keeps the gutters while removing the cap — useful for a dashboard that should use the whole screen but still needs edge padding.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The page content.' },
		{ name: 'width cap', description: 'The `size` token or length the container will not exceed.' },
		{ name: 'gutter', description: 'Horizontal padding, so content clears the viewport edge at narrow widths.' }
	],

	examples: [
		defineMarkupExample({
			id: 'sizes',
			title: 'Width tokens',
			description: 'Each caps at a different measure. The borders show where each one stops.',
			layout: ExampleLayout.fill,
			markup: `
				<z-container size="xs" gutter="md" style="border: 1px solid var(--border)">
				  <z-text size="sm">xs — 20rem</z-text>
				</z-container>

				<z-container size="sm" gutter="md" style="border: 1px solid var(--border)">
				  <z-text size="sm">sm — 30rem</z-text>
				</z-container>

				<z-container size="md" gutter="md" style="border: 1px solid var(--border)">
				  <z-text size="sm">md — 48rem</z-text>
				</z-container>

				<z-container size="lg" gutter="md" style="border: 1px solid var(--border)">
				  <z-text size="sm">lg — 64rem</z-text>
				</z-container>
			`
		}),

		defineMarkupExample({
			id: 'gutters',
			title: 'Gutters',
			description:
				'The padding between the cap and the content. Compare the left edge of the text in each of these.',
			layout: ExampleLayout.fill,
			markup: `
				<z-container size="sm" style="border: 1px solid var(--border)">
				  <z-text size="sm">No gutter — content touches the edge</z-text>
				</z-container>

				<z-container size="sm" gutter="sm" style="border: 1px solid var(--border)">
				  <z-text size="sm">gutter="sm"</z-text>
				</z-container>

				<z-container size="sm" gutter="xl" style="border: 1px solid var(--border)">
				  <z-text size="sm">gutter="xl"</z-text>
				</z-container>
			`
		}),

		defineMarkupExample({
			id: 'full-width-band',
			title: 'A full-bleed band',
			description:
				'The band spans the full width and the container sits inside it, so the background reaches the edges while the content stays capped. Getting this nesting backwards is the usual mistake.',
			layout: ExampleLayout.fill,
			markup: `
				<div style="background: var(--background-light); border-block: 1px solid var(--border)">
				  <z-container size="md" gutter="lg">
				    <z-column gap="2" padding-y="6">
				      <z-heading size="sm" tag="h3">Full-bleed background</z-heading>
				      <z-text size="sm" color="muted">
				        The tinted band runs edge to edge; this text stops at the cap.
				      </z-text>
				    </z-column>
				  </z-container>
				</div>
			`
		}),

		defineMarkupExample({
			id: 'custom-length',
			title: 'A custom cap',
			description: '`size` also takes any CSS length when none of the tokens is the right measure.',
			layout: ExampleLayout.fill,
			markup: `
				<z-container size="34rem" gutter="md" style="border: 1px solid var(--border)">
				  <z-text size="sm">Capped at exactly 34rem.</z-text>
				</z-container>
			`
		}),

		defineMarkupExample({
			id: 'article',
			title: 'An article measure',
			description: 'A narrow container is the simplest way to hold prose at a comfortable line length.',
			layout: ExampleLayout.fill,
			markup: `
				<z-container size="sm" gutter="md">
				  <z-column gap="4">
				    <z-heading size="lg">Encapsulation by default</z-heading>
				    <z-text color="muted">
				      Every component carries its styles inside a shadow root. Nothing on the
				      page can reach in and restyle a control, and nothing the control defines
				      can leak back out and affect the page around it.
				    </z-text>
				    <z-text color="muted">
				      That is what makes the library safe to adopt one element at a time,
				      inside an application built with something else entirely.
				    </z-text>
				  </z-column>
				</z-container>
			`
		})
	],

	attributes: [
		{
			name: 'size',
			type: 'xs | sm | md | lg | xl | 2xl | 3xl | full | screen',
			defaultValue: 'xl',
			description: 'Maximum content width. Also accepts any CSS length.'
		},
		{ name: 'gutter', type: 'string', defaultValue: '—', description: 'Left and right padding. Size token, bare number, or length.' },
		{
			name: 'isCentered',
			type: 'boolean',
			defaultValue: 'centered',
			description: 'Declared for API completeness — the container is centred already.'
		},
		{ name: 'is-full-height', type: 'boolean', defaultValue: '—', description: 'min-height: 100%.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The page content.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Presentational, with no role. It does not create a landmark — use main, nav, or a role for that.',
		'Capping the measure genuinely aids reading. Around 60 to 75 characters per line is the usual target, which the sm and md tokens land near.',
		'Gutters must survive zoom. At 200% the container should still keep content clear of the viewport edge rather than collapsing to nothing.',
		'Width tokens are rem-based, so they scale with the user font size instead of pinning to pixels.'
	],

	related: [
		{ tag: 'z-section', route: '/c/layout/z-section', description: 'A page band that can fold this in.' },
		{ tag: 'z-isCentered', route: '/c/layout/z-isCentered', description: 'Caps the content rather than the container.' },
		{ tag: 'z-column', route: '/c/layout/z-column', description: 'Stacking the content inside.' }
	]
}
