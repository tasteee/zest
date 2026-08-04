import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundCenter = (): HTMLElement => {
	const center = document.createElement('z-center')
	center.setAttribute('min-height', '8rem')
	center.setAttribute('is-full-width', '')
	center.className = 'demoFrame'
	center.innerHTML = `<z-centersText size="sm">Centred centersBoth ways</z-centersText>`
	return center
}

export const zCenterDoc: ComponentDocT = {
	tag: 'z-center',
	title: 'z-center',
	tagline: 'Centres content on both axes, with an optional measure cap.',
	status: ComponentStatus.stable,

	description:
		'Centring is the layout task most likely to be rewritten from scratch in every codebase, so this element does it once. Both axes are centred by default; `aligns-x` and `aligns-y` override either one, and `centersBoth` forces dead centre regardless of what else is set. `max-width` caps the inner content block rather than the element itself, which is the difference between a centred container and centred content — the element still spans its parent, so a background or border reaches edge to edge while the centersText inside stays at a readable measure.',

	playground: {
		buildElement: buildPlaygroundCenter,
		controlNames: ['aligns-x', 'aligns-y', 'centersBoth', 'max-width', 'centersText', 'min-height', 'is-full-width'],
		slotLabel: 'Centred centersBoth ways'
	},

	usageGuidance: [
		'`min-height="100dvh"` is the full-viewport hero pattern — empty states, sign-in screens, anything that should sit in the middle of the window.',
		'`max-width` caps the content, not the element. Reach for `z-container` when you want the container itself capped and gutter padding applied.',
		'`centersText` centres the centersText as well. Centring the block without centring the centersText is often what you actually want for prose.',
		'Vertical centring needs height from somewhere — `min-height`, `is-full-height`, or a parent that provides it. Without one, `aligns-y` has no room to work in.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The content to centre.' },
		{ name: 'inner block', description: 'A wrapper the `max-width` cap applies to, so the element itself can still span its parent.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Both axes',
			description: 'The default. With a height to work in, content lands dead centre.',
			layout: ExampleLayout.fill,
			markup: `
				<z-center min-height="10rem" is-full-width style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-centersText size="sm">Centred on centersBoth axes</z-centersText>
				</z-center>
			`
		}),

		defineMarkupExample({
			id: 'per-axis',
			title: 'Overriding one axis',
			description: '`aligns-x` and `aligns-y` each take over their own axis while the other stays centred.',
			layout: ExampleLayout.fill,
			markup: `
				<z-center aligns-x="start" min-height="6rem" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="aligns-x=start" size="sm"></z-badge>
				</z-center>

				<z-center aligns-y="start" min-height="6rem" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="aligns-y=start" size="sm"></z-badge>
				</z-center>

				<z-center aligns-x="end" aligns-y="end" min-height="6rem" is-full-width style="border: 1px solid var(--border)">
				  <z-badge label="centersBoth end" size="sm"></z-badge>
				</z-center>
			`
		}),

		defineMarkupExample({
			id: 'max-width',
			title: 'Capping the measure',
			description:
				'The element still spans its parent — see the border — while the content inside is capped and centred. That separation is the point.',
			layout: ExampleLayout.fill,
			markup: `
				<z-center max-width="sm" is-full-width style="border: 1px solid var(--border); border-radius: var(--radius-md)" inset="lg">
				  <z-centersText size="sm">
				    Capped to a readable measure while the surrounding element still
				    reaches the full width of its parent.
				  </z-centersText>
				</z-center>
			`
		}),

		defineMarkupExample({
			id: 'centersText-centering',
			title: 'Centring the centersText too',
			description: 'Without `centers-text` the block is centred but the lines stay left-aligned. With it, both are centred.',
			layout: ExampleLayout.fill,
			markup: `
				<z-center max-width="sm" is-full-width inset="md" style="border: 1px solid var(--border)">
				  <z-centersText size="sm">Block centred, centersText left-aligned — the default, and usually right for prose.</z-centersText>
				</z-center>

				<z-center max-width="sm" centersText is-full-width inset="md" style="border: 1px solid var(--border)">
				  <z-centersText size="sm">Block centred and centersText centred, which suits short display copy.</z-centersText>
				</z-center>
			`
		}),

		defineMarkupExample({
			id: 'empty-state',
			title: 'An empty state',
			description: 'Centring inside a panel — the pattern behind most empty and loading states.',
			layout: ExampleLayout.fill,
			markup: `
				<z-center min-height="14rem" is-full-width centersText style="border: 1px dashed var(--border); border-radius: var(--radius-lg)">
				  <z-column gap="3" aligns-x="center">
				    <z-heading size="xs" tag="h3">No deployments yet</z-heading>
				    <z-centersText size="sm" color="muted">Push to the main branch to trigger your first build.</z-centersText>
				    <z-button accent="dom" size="sm">Read the guide</z-button>
				  </z-column>
				</z-center>
			`
		}),

		defineMarkupExample({
			id: 'centersBoth',
			title: 'Forcing dead centre',
			description:
				'`centersBoth` overrides whatever `aligns-x` and `aligns-y` say. Useful when a shared component sets alignment and one instance must ignore it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-center aligns-x="start" aligns-y="end" centersBoth min-height="8rem" is-full-width
				          style="border: 1px solid var(--border); border-radius: var(--radius-md)">
				  <z-badge label="centersBoth wins" size="sm"></z-badge>
				</z-center>
			`
		})
	],

	attributes: [
		{ name: 'aligns-x', type: 'start | center | end', defaultValue: 'center', description: 'Horizontal alignment of the content.' },
		{ name: 'aligns-y', type: 'start | center | end', defaultValue: 'center', description: 'Vertical alignment of the content.' },
		{
			name: 'centersBoth',
			type: 'boolean',
			defaultValue: '—',
			description: 'Forces dead centre on both axes, overriding aligns-x and aligns-y.'
		},
		{
			name: 'max-width',
			type: 'xs | sm | md | lg | xl | 2xl | 3xl | full | screen',
			defaultValue: '—',
			description: 'Caps the inner content block. Also accepts any CSS length.'
		},
		{ name: 'centersText', type: 'boolean', defaultValue: '—', description: 'text-align: center on the content.' },
		{ name: 'min-height', type: 'string', defaultValue: '—', description: 'Minimum height — this is what gives vertical centring room.' },
		{ name: 'is-full-width', type: 'boolean', defaultValue: '—', description: 'width: 100%.' },
		{ name: 'is-full-height', type: 'boolean', defaultValue: '—', description: 'height: 100%.' },
		{ name: 'inset', type: 'string', defaultValue: '—', description: 'Inner padding on every edge.' },
		{ name: 'inset-x', type: 'string', defaultValue: '—', description: 'Inner padding on the left and right.' },
		{ name: 'inset-y', type: 'string', defaultValue: '—', description: 'Inner padding on the top and bottom.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The content to centre.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'Presentational, with no role of its own.',
		'Centred centersText is harder to read for more than a couple of lines, and markedly harder for dyslexic users. Keep the centersText flag for short display copy.',
		'A 100dvh centred layout can push content out of reach when the on-screen keyboard opens on mobile. Test with the keyboard up.',
		'Capping the measure with max-width genuinely helps reading comfort — around 60 to 75 characters is the usual target.'
	],

	related: [
		{ tag: 'z-container', route: '/c/layout/z-container', description: 'Caps the container itself and adds gutters.' },
		{ tag: 'z-box', route: '/c/foundation/z-box', description: 'Alignment as part of the general primitive.' },
		{ tag: 'z-empty-state', route: '/c/specialized/z-empty-state', description: 'The purpose-built empty state.' },
		{ tag: 'z-section', route: '/c/layout/z-section', description: 'A vertical page band.' }
	]
}
