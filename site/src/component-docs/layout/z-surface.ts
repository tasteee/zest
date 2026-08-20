import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundSurface = (): HTMLElement => {
	const surface = document.createElement('z-surface')
	surface.setAttribute('level', '1')
	surface.setAttribute('radius', 'lg')
	surface.innerHTML = `<z-text size="sm">Panel content</z-text>`
	return surface
}

export const zSurfaceDoc: ComponentDocT = {
	tag: 'z-surface', title: 'z-surface',
	tagline: 'A neutral panel with a clear surface treatment.',
	status: ComponentStatus.stable,
	description: '`level` chooses a neutral surface step and `kind` chooses its treatment. The component deliberately has no accent or elevation API: status belongs in purpose-built components, and this design system uses surfaces and borders rather than shadows.',
	playground: { buildElement: buildPlaygroundSurface, controlNames: ['level', 'kind', 'radius', 'interactive', 'is-full-width'], slotLabel: 'Panel content' },
	usageGuidance: [
		'Use `level` for neutral layering and `kind="outline"` when a visible boundary matters.',
		'`interactive` adds hover affordance only. Put a real link or button inside for actual interaction.',
		'Use `z-callout` or `z-alert` when a region needs semantic status and an accent.'
	],
	anatomy: [
		{ name: 'default slot', description: 'The panel content.' },
		{ name: 'surface', description: 'A neutral fill and optional hairline boundary.' }
	],
	examples: [
		defineMarkupExample({
			id: 'levels', title: 'Neutral levels', description: 'Four neutral steps establish layering without shadows.', layout: ExampleLayout.fill,
			markup: `<wired-column gap="xs"><z-surface level="0">Level 0</z-surface><z-surface level="1">Level 1</z-surface><z-surface level="2">Level 2</z-surface><z-surface level="3">Level 3</z-surface></wired-column>`
		}),
		defineMarkupExample({
			id: 'kinds', title: 'Kinds', description: 'Kind changes the neutral treatment, not the semantic meaning.', layout: ExampleLayout.fill,
			markup: `<wired-column gap="xs"><z-surface kind="plain">Plain</z-surface><z-surface kind="filled">Filled</z-surface><z-surface kind="soft">Soft</z-surface><z-surface kind="outline">Outline</z-surface><z-surface kind="ghost">Ghost</z-surface></wired-column>`
		}),
		defineMarkupExample({
			id: 'interactive', title: 'Interactive affordance', description: 'The surface reacts while the nested link remains the semantic control.', layout: ExampleLayout.fill,
			markup: `<z-surface level="1" kind="outline" interactive is-full-width><wired-row x="between" y="center"><z-text size="sm">Workspace settings</z-text><z-link href="#">Open</z-link></wired-row></z-surface>`
		})
	],
	attributes: [
		{ name: 'level', type: '0 | 1 | 2 | 3', defaultValue: '—', description: 'Neutral surface step.' },
		{ name: 'kind', type: 'plain | filled | soft | outline | ghost', defaultValue: '—', description: 'Neutral surface treatment.' },
		{ name: 'radius', type: 'none | sm | md | lg | xl | 2xl | full', defaultValue: 'lg', description: 'Corner radius.' },
		{ name: 'interactive', type: 'boolean', defaultValue: '—', description: 'Adds pointer and hover affordance without changing semantics.' },
		{ name: 'is-full-width', type: 'boolean', defaultValue: '—', description: 'Fills the available width.' }
	],
	properties: [], slots: [{ name: '(default)', description: 'The panel content.' }], events: [], cssVariables: [],
	accessibilityNotes: ['A surface has no role of its own.', 'Interactive styling does not create keyboard behavior; keep a real control inside.'],
	related: [
		{ tag: 'z-card', route: '/c/foundation/z-card', description: 'The simpler bordered container.' },
		{ tag: 'z-callout', route: '/c/overlays/z-callout', description: 'A semantic accented block.' }
	]
}
