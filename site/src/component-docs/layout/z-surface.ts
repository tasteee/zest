import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSurface = (): HTMLElement => {
	const surface = document.createElement('z-surface')
	surface.setAttribute('level', '1')
	surface.setAttribute('radius', 'lg')
	surface.setAttribute('inset', 'md')
	surface.innerHTML = `<z-text size="sm">Panel content</z-text>`
	return surface
}

export const zSurfaceDoc: ComponentDocT = {
	tag: 'z-surface',
	title: 'z-surface',
	tagline: 'A themed panel — neutral elevation levels, or a tone with a treatment layered over it.',
	status: ComponentStatus.stable,

	description:
		'Two ways in, and picking the right one is most of the API. `level` is the everyday path: a neutral elevation stepped from the theme ramp, where 0 is the page base and 3 sits at overlay height. `tone` plus `variant` is the accented path, where the tone picks a colour family and the variant decides how it is applied. Since the system uses borders over shadows, "raised" here means a lighter surface with a hairline ring rather than a drop shadow — which is what lets several panels stack without the page turning muddy.',

	playground: {
		buildElement: buildPlaygroundSurface,
		controlNames: ['level', 'tone', 'variant', 'radius', 'border', 'elevated', 'interactive', 'inset', 'full-width'],
		slotLabel: 'Panel content'
	},

	usageGuidance: [
		'Use `level` unless the panel needs a colour. Neutral elevation is the default vocabulary and keeps a dense interface calm.',
		'Reach for `tone` plus `variant` when the panel carries status — a `danger` `soft` surface for a destructive zone, `success` for a confirmation.',
		'`interactive` adds a pointer cursor and a hover border. It does not make the panel clickable — put a real control inside.',
		'Do not stack more than two levels in one region. Beyond that the steps stop reading as depth and start reading as inconsistency.'
	],

	anatomy: [
		{ name: 'default slot', description: 'The panel content.' },
		{ name: 'level', description: 'A neutral elevation step from the theme ramp, 0 through 3.' },
		{ name: 'tone', description: 'The colour family, exposed internally as a single custom property the variants compose against.' },
		{ name: 'variant', description: 'How the tone is applied — filled, soft, outlined, ghost, or plain.' }
	],

	examples: [
		defineMarkupExample({
			id: 'levels',
			title: 'Elevation levels',
			description: 'The neutral ramp, from page base to overlay. Depth reads as a lighter surface, never as a shadow.',
			layout: ExampleLayout.fill,
			markup: `
				<z-surface level="0" radius="md" inset="md" full-width>
				  <z-text size="sm">level 0 — the page base</z-text>
				</z-surface>
				<z-surface level="1" radius="md" inset="md" full-width>
				  <z-text size="sm">level 1 — a panel</z-text>
				</z-surface>
				<z-surface level="2" radius="md" inset="md" full-width>
				  <z-text size="sm">level 2 — raised</z-text>
				</z-surface>
				<z-surface level="3" radius="md" inset="md" full-width>
				  <z-text size="sm">level 3 — overlay height</z-text>
				</z-surface>
			`
		}),

		defineMarkupExample({
			id: 'variants',
			title: 'Variants',
			description: 'The five treatments, all at the primary tone. Each composes against the same tone value.',
			layout: ExampleLayout.fill,
			markup: `
				<z-surface tone="primary" variant="filled" radius="md" inset="md" full-width>
				  <z-text size="sm">filled</z-text>
				</z-surface>
				<z-surface tone="primary" variant="soft" radius="md" inset="md" full-width>
				  <z-text size="sm">soft</z-text>
				</z-surface>
				<z-surface tone="primary" variant="outlined" radius="md" inset="md" full-width>
				  <z-text size="sm">outlined</z-text>
				</z-surface>
				<z-surface tone="primary" variant="ghost" radius="md" inset="md" full-width>
				  <z-text size="sm">ghost</z-text>
				</z-surface>
				<z-surface tone="primary" variant="plain" radius="md" inset="md" full-width>
				  <z-text size="sm">plain</z-text>
				</z-surface>
			`
		}),

		defineMarkupExample({
			id: 'tones',
			title: 'Tones',
			description: 'Every colour family at the soft variant — the treatment that suits status panels best.',
			layout: ExampleLayout.fill,
			markup: `
				<z-surface tone="neutral" variant="soft" radius="md" inset="md" full-width>
				  <z-text size="sm">neutral</z-text>
				</z-surface>
				<z-surface tone="primary" variant="soft" radius="md" inset="md" full-width>
				  <z-text size="sm">primary</z-text>
				</z-surface>
				<z-surface tone="secondary" variant="soft" radius="md" inset="md" full-width>
				  <z-text size="sm">secondary</z-text>
				</z-surface>
				<z-surface tone="success" variant="soft" radius="md" inset="md" full-width>
				  <z-text size="sm">success</z-text>
				</z-surface>
				<z-surface tone="warning" variant="soft" radius="md" inset="md" full-width>
				  <z-text size="sm">warning</z-text>
				</z-surface>
				<z-surface tone="danger" variant="soft" radius="md" inset="md" full-width>
				  <z-text size="sm">danger</z-text>
				</z-surface>
			`
		}),

		defineMarkupExample({
			id: 'radius',
			title: 'Radius',
			description: 'Tokenised corners, from square through to a full pill.',
			layout: ExampleLayout.fill,
			markup: `
				<z-surface level="1" radius="none" inset="md" full-width><z-text size="sm">none</z-text></z-surface>
				<z-surface level="1" radius="sm" inset="md" full-width><z-text size="sm">sm</z-text></z-surface>
				<z-surface level="1" radius="lg" inset="md" full-width><z-text size="sm">lg — the default</z-text></z-surface>
				<z-surface level="1" radius="2xl" inset="md" full-width><z-text size="sm">2xl</z-text></z-surface>
			`
		}),

		defineMarkupExample({
			id: 'interactive',
			title: 'Interactive',
			description:
				'`interactive` adds the cursor and hover border. It signals interactivity — the real control still has to be inside.',
			layout: ExampleLayout.fill,
			markup: `
				<z-surface level="1" radius="md" inset="md" full-width interactive>
				  <z-row aligns-x="between" aligns-y="center">
				    <z-text size="sm">Hover me</z-text>
				    <z-link href="#" size="small">Open</z-link>
				  </z-row>
				</z-surface>
			`
		}),

		defineMarkupExample({
			id: 'status-panel',
			title: 'A status panel',
			description: 'The tone-plus-variant path doing what it is for — a destructive zone that reads as one at a glance.',
			layout: ExampleLayout.fill,
			markup: `
				<z-surface tone="danger" variant="soft" radius="lg" inset="lg" full-width>
				  <z-column gap="3">
				    <z-heading size="xs" tag="h3">Delete this workspace</z-heading>
				    <z-text size="sm" color="muted">
				      Every project, deployment, and log inside it is removed. This cannot be undone.
				    </z-text>
				    <z-row>
				      <z-button tone="danger" size="small">Delete workspace</z-button>
				    </z-row>
				  </z-column>
				</z-surface>
			`
		}),

		defineMarkupExample({
			id: 'nesting',
			title: 'Nesting levels',
			description:
				'A level 2 panel inside a level 1 one. Two steps is the practical limit before the ramp stops reading as depth.',
			layout: ExampleLayout.fill,
			markup: `
				<z-surface level="1" radius="lg" inset="md" full-width>
				  <z-column gap="3">
				    <z-text size="sm">Outer panel at level 1</z-text>
				    <z-surface level="2" radius="md" inset="md" full-width>
				      <z-text size="sm">Inner panel at level 2</z-text>
				    </z-surface>
				  </z-column>
				</z-surface>
			`
		})
	],

	attributes: [
		{ name: 'level', type: '0 | 1 | 2 | 3', defaultValue: '—', description: 'Neutral elevation step, from page base to overlay.' },
		{
			name: 'tone',
			type: 'plain | neutral | primary | secondary | success | warning | danger',
			defaultValue: 'neutral',
			description: 'Accent colour family the variants compose against.'
		},
		{
			name: 'variant',
			type: 'plain | filled | soft | outlined | ghost',
			defaultValue: '—',
			description: 'How the tone is applied.'
		},
		{
			name: 'radius',
			type: 'none | sm | md | lg | xl | 2xl | full',
			defaultValue: 'lg',
			description: 'Corner radius. Also accepts a length.'
		},
		{ name: 'border', type: 'boolean', defaultValue: '—', description: 'Forces a toned hairline border.' },
		{ name: 'elevated', type: 'boolean', defaultValue: '—', description: 'A lighter surface plus a ring — shadowless elevation.' },
		{
			name: 'interactive',
			type: 'boolean',
			defaultValue: '—',
			description: 'Pointer cursor and hover border. Adds no actual interactivity.'
		},
		{ name: 'full-width', type: 'boolean', defaultValue: '—', description: 'width: 100%.' },
		{ name: 'inset', type: 'string', defaultValue: 'md', description: 'Inner padding on every edge.' },
		{ name: 'inset-x', type: 'string', defaultValue: '—', description: 'Inner padding on the left and right.' },
		{ name: 'inset-y', type: 'string', defaultValue: '—', description: 'Inner padding on the top and bottom.' }
	],

	properties: [],
	slots: [{ name: '(default)', description: 'The panel content.' }],
	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'A surface has no role. Elevation and tone are visual only — a danger-toned panel is not announced as a warning, so the text inside must say so.',
		'interactive changes the cursor without adding keyboard access. A panel that acts like a button needs a real button inside it.',
		'Check text contrast against filled variants especially. A filled surface changes the background under your text, and muted copy can fall below threshold.',
		'Tone is not a substitute for a label. Anyone who cannot distinguish the colours gets nothing from it on its own.'
	],

	related: [
		{ tag: 'z-card', route: '/c/foundation/z-card', description: 'The simpler bordered container.' },
		{ tag: 'z-callout', route: '/c/overlays/z-callout', description: 'A toned block with an icon and a role.' },
		{ tag: 'z-panel', route: '/c/canvas-panels/z-panel', description: 'Resizable application panels.' },
		{ tag: 'z-box', route: '/c/foundation/z-box', description: 'Layout without any surface treatment.' }
	]
}
