import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSection = (): HTMLElement => {
	const section = document.createElement('z-section')
	section.setAttribute('space', 'xl')
	section.setAttribute('container', 'sm')
	section.setAttribute('gutter', 'md')
	section.className = 'demoFrame'
	section.innerHTML = `<z-heading size="sm" tag="h3">A page band</z-heading>`
	return section
}

export const zSectionDoc: ComponentDocT = {
	tag: 'z-section',
	title: 'z-section',
	tagline: 'A vertical page band, optionally folding in container behaviour.',
	status: ComponentStatus.stable,

	description:
		'A horizontal band running the width of the page with vertical padding above and below. `space` sets both edges, and `space-top` and `space-bottom` override either one. It can also absorb a `z-container`: set `container` to a width and the content is centred and capped with `gutter` side padding, collapsing the usual two-element pair into one. There is deliberately no `space-left`/`space-right` — a section is a vertical band, so horizontal padding belongs to the centred content width rather than to the band itself.',

	playground: {
		buildElement: buildPlaygroundSection,
		controlNames: ['space', 'space-top', 'space-bottom', 'container', 'gutter'],
		slotLabel: 'A page band'
	},

	usageGuidance: [
		'Use one section per band of a page. The consistent `space` value between them is what gives a long page its rhythm.',
		'Fold in the container with the `container` prop unless the band needs a full-bleed background with capped content inside — that case still wants the nested pair.',
		'`space-bottom="0"` is the usual way to butt two bands together when a background change should be the only boundary.',
		'It renders no landmark. Wrap it in a real `<section>` with a heading, or set the semantics on a parent, when the band is a document section.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The band content.' },
		{ name: 'space', description: 'Top and bottom padding, overridable per edge.' },
		{ name: 'container', description: 'Optional width cap that centres the content, with `gutter` supplying the side padding.' }
	],

	examples: [
		defineMarkupExample({
			id: 'spacing',
			title: 'Vertical space',
			description: 'The band padding above and below the content. Borders here show the band edges.',
			layout: ExampleLayout.fill,
			markup: `
				<z-section space="sm" style="border: 1px solid var(--border)">
				  <z-text size="sm">space="sm"</z-text>
				</z-section>

				<z-section space="lg" style="border: 1px solid var(--border)">
				  <z-text size="sm">space="lg"</z-text>
				</z-section>

				<z-section space="2xl" style="border: 1px solid var(--border)">
				  <z-text size="sm">space="2xl"</z-text>
				</z-section>
			`
		}),

		defineMarkupExample({
			id: 'per-edge',
			title: 'Per-edge overrides',
			description:
				'`space-top` and `space-bottom` win over `space`. Zeroing one edge is how two bands are butted together.',
			layout: ExampleLayout.fill,
			markup: `
				<z-section space="xl" space-bottom="0" style="border: 1px solid var(--border)">
				  <z-text size="sm">Large above, nothing below</z-text>
				</z-section>

				<z-section space="xl" space-top="0" style="border: 1px solid var(--border)">
				  <z-text size="sm">Nothing above, large below</z-text>
				</z-section>
			`
		}),

		defineMarkupExample({
			id: 'folded-container',
			title: 'Folding in the container',
			description:
				'`container` plus `gutter` caps and centres the content without a nested `z-container`. One element instead of two.',
			layout: ExampleLayout.fill,
			markup: `
				<z-section space="xl" container="sm" gutter="lg" style="border: 1px solid var(--border)">
				  <z-column gap="2">
				    <z-heading size="sm" tag="h3">Capped and centred</z-heading>
				    <z-text size="sm" color="muted">
				      The band still spans the full width; the content inside stops at the cap.
				    </z-text>
				  </z-column>
				</z-section>
			`
		}),

		defineMarkupExample({
			id: 'alternating-bands',
			title: 'Alternating bands',
			description:
				'A page built from stacked sections. The background changes per band while the content stays on one measure.',
			layout: ExampleLayout.fill,
			markup: `
				<div>
				  <z-section space="xl" container="sm" gutter="lg">
				    <z-column gap="2">
				      <z-eyebrow label="Overview"></z-eyebrow>
				      <z-heading size="md" tag="h3">One band</z-heading>
				      <z-text size="sm" color="muted">On the page background.</z-text>
				    </z-column>
				  </z-section>

				  <z-section space="xl" container="sm" gutter="lg" style="background: var(--background-light); border-block: 1px solid var(--border)">
				    <z-column gap="2">
				      <z-eyebrow label="Details" tone="primary"></z-eyebrow>
				      <z-heading size="md" tag="h3">The next band</z-heading>
				      <z-text size="sm" color="muted">Tinted, full-bleed, same content measure.</z-text>
				    </z-column>
				  </z-section>

				  <z-section space="xl" container="sm" gutter="lg">
				    <z-column gap="2">
				      <z-eyebrow label="Summary"></z-eyebrow>
				      <z-heading size="md" tag="h3">And back again</z-heading>
				      <z-text size="sm" color="muted">The rhythm comes from a shared space value.</z-text>
				    </z-column>
				  </z-section>
				</div>
			`
		}),

		defineMarkupExample({
			id: 'hero',
			title: 'A hero band',
			description: 'Generous space and a narrow cap — the top band of a marketing page.',
			layout: ExampleLayout.fill,
			markup: `
				<z-section space="3xl" container="md" gutter="lg" style="border: 1px solid var(--border); border-radius: var(--radius-lg)">
				  <z-column gap="4">
				    <z-eyebrow label="Zest" has-rule></z-eyebrow>
				    <z-display size="sm">Components that stay out of your way.</z-display>
				    <z-text size="lg" color="muted">
				      Framework-agnostic, encapsulated, and free of runtime dependencies.
				    </z-text>
				  </z-column>
				</z-section>
			`
		})
	],

	attributes: [
		{ name: 'space', type: 'string', defaultValue: '—', description: 'Top and bottom padding. Size token, bare number, or length.' },
		{ name: 'space-top', type: 'string', defaultValue: '—', description: 'Top padding, overriding space.' },
		{ name: 'space-bottom', type: 'string', defaultValue: '—', description: 'Bottom padding, overriding space.' },
		{
			name: 'container',
			type: 'xs | sm | md | lg | xl | 2xl | 3xl | full | screen',
			defaultValue: '—',
			description: 'Centres the content to this max-width, folding in z-container. Also accepts a length.'
		},
		{ name: 'gutter', type: 'string', defaultValue: '—', description: 'Side padding for the centred content. Used with container.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The band content.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'It renders no landmark and no heading. Despite the name, it does not create a section in the accessibility tree — supply a real section element and a heading when the band is a document section.',
		'Consistent spacing between bands helps users with cognitive impairments parse a long page. Keep the space value uniform.',
		'Vertical space is not a substitute for structure. Screen reader users skim by heading, so every band worth finding needs one.',
		'Padding given in tokens is rem-based and scales with the user font size.'
	],

	related: [
		{ tag: 'z-container', route: '/c/layout/z-container', description: 'The width cap this can absorb.' },
		{ tag: 'z-column', route: '/c/layout/z-column', description: 'Stacking content inside a band.' },
		{ tag: 'z-heading', route: '/c/foundation/z-heading', description: 'The heading each band should carry.' },
		{ tag: 'z-spacer', route: '/c/layout/z-spacer', description: 'Space inside a flex layout rather than around a band.' }
	]
}
