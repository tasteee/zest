import { defineMarkupExample } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundBentoItem = (): HTMLElement => {
	const grid = document.createElement('z-bento-grid')
	grid.setAttribute('columns', '2')
	grid.setAttribute('row-height', '9rem')
	grid.className = 'demoFullWidth'

	const item = document.createElement('z-bento-item')
	item.setAttribute('col-span', '2')
	item.innerHTML = `
		<z-heading size="xs" tag="h3">Feature name</z-heading>
		<z-text size="sm" color="muted">A short description.</z-text>
	`

	grid.append(item)
	return grid
}

export const zBentoItemDoc: ComponentDocT = {
	tag: 'z-bento-item',
	title: 'z-bento-item',
	tagline: 'One cell of a bento grid, with layered background, icon, and hover CTA.',
	status: ComponentStatus.stable,

	description:
		'A cell with three layers. The `background` slot fills it behind everything — an image, a gradient, a pattern — and nudges into view on hover. The `icon` slot sits above the body, and the default slot is the body itself. Giving the cell an `href` reveals a CTA row pinned to the bottom on hover or focus; omit it and the cell is static, with no CTA and no link. That single attribute is the whole difference between a decorative panel and a navigable one.',

	playground: {
		buildElement: buildPlaygroundBentoItem,
		controlNames: ['col-span', 'row-span', 'href', 'cta-label'],
		slotLabel: 'Heading + description'
	},

	usageGuidance: [
		'Set `href` only when the whole cell navigates. A CTA that appears on hover but leads nowhere is worse than no CTA.',
		'`col-span` and `row-span` are measured in the parent grid\'s tracks and row units — they mean nothing on their own.',
		'Keep the body short. The row height is fixed, so a long description will overflow rather than expand the cell.',
		'A background image needs enough contrast behind the text. Test with the real asset, not a placeholder.'
	],

	anatomy: [
		{ name: 'background slot', description: 'Fills the cell behind everything, and nudges into view on hover.' },
		{ name: 'icon slot', description: 'Sits above the body content.' },
		{ name: 'default slot', description: 'The body — usually a heading and a description.' },
		{ name: 'CTA row', description: 'Pinned to the bottom, revealed on hover or focus. Only present when `href` is set.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'A static cell',
			description: 'No `href`, so no CTA appears — just a panel with content in it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="2" row-height="9rem" gap="md">
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Zero dependencies</z-heading>
				    <z-text size="sm" color="muted">Everything is bundled at build time.</z-text>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">Any framework</z-heading>
				    <z-text size="sm" color="muted">They are just custom elements.</z-text>
				  </z-bento-item>
				</z-bento-grid>
			`
		}),

		defineMarkupExample({
			id: 'with-icon',
			title: 'With an icon',
			description: 'The `icon` slot sits above the body, giving the cell a visual anchor.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="2" row-height="10rem" gap="md">
				  <z-bento-item>
				    <span slot="icon">${Icons.terminal}</span>
				    <z-heading size="xs" tag="h3">Local first</z-heading>
				    <z-text size="sm" color="muted">Develop against a real build.</z-text>
				  </z-bento-item>
				  <z-bento-item>
				    <span slot="icon">${Icons.settings}</span>
				    <z-heading size="xs" tag="h3">Themable</z-heading>
				    <z-text size="sm" color="muted">Every value is a custom property.</z-text>
				  </z-bento-item>
				</z-bento-grid>
			`
		}),

		defineMarkupExample({
			id: 'with-cta',
			title: 'With a CTA',
			description: 'Adding `href` reveals a CTA row on hover or keyboard focus. Hover either cell to see it.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="2" row-height="10rem" gap="md">
				  <z-bento-item href="#/c/foundation/z-box">
				    <z-heading size="xs" tag="h3">Layout primitives</z-heading>
				    <z-text size="sm" color="muted">One box, every display mode.</z-text>
				  </z-bento-item>
				  <z-bento-item href="#/c/buttons-actions/z-button" cta-label="See the docs">
				    <z-heading size="xs" tag="h3">Actions</z-heading>
				    <z-text size="sm" color="muted">Buttons, toggles, and toolbars.</z-text>
				  </z-bento-item>
				</z-bento-grid>
			`
		}),

		defineMarkupExample({
			id: 'spans',
			title: 'Spanning tracks',
			description: '`col-span` and `row-span` are counted in the parent grid\'s columns and row units.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="3" row-height="7rem" gap="md">
				  <z-bento-item col-span="2" row-span="2">
				    <z-heading size="xs" tag="h3">2 × 2</z-heading>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">1 × 1</z-heading>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">1 × 1</z-heading>
				  </z-bento-item>
				  <z-bento-item col-span="3">
				    <z-heading size="xs" tag="h3">3 × 1</z-heading>
				  </z-bento-item>
				</z-bento-grid>
			`
		}),

		defineMarkupExample({
			id: 'background',
			title: 'A background layer',
			description:
				'The `background` slot fills the cell behind everything and shifts slightly on hover. Contrast against it is your responsibility.',
			layout: ExampleLayout.fill,
			markup: `
				<z-bento-grid columns="2" row-height="10rem" gap="md">
				  <z-bento-item href="#">
				    <div slot="background" style="width: 100%; height: 100%; background: var(--color-primary-2); opacity: 0.35"></div>
				    <z-heading size="xs" tag="h3">Tinted background</z-heading>
				    <z-text size="sm" color="muted">A plain element in the background slot.</z-text>
				  </z-bento-item>
				  <z-bento-item>
				    <z-heading size="xs" tag="h3">No background</z-heading>
				    <z-text size="sm" color="muted">For comparison.</z-text>
				  </z-bento-item>
				</z-bento-grid>
			`
		})
	],

	attributes: [
		{ name: 'col-span', type: 'number', defaultValue: '1', description: 'Columns to span in the parent grid.' },
		{ name: 'row-span', type: 'number', defaultValue: '1', description: 'Row units to span in the parent grid.' },
		{
			name: 'href',
			type: 'string',
			defaultValue: '—',
			description: 'Destination. Its presence is what reveals the hover CTA row.'
		},
		{ name: 'cta-label', type: 'string', defaultValue: 'Learn more', description: 'Text of the CTA link.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the cell from layout.' }
	],

	properties: [],

	slots: [
		{ name: 'background', description: 'Fills the cell behind everything — an image, gradient, or pattern.' },
		{ name: 'icon', description: 'Sits above the body content.' },
		{ name: '(default)', description: 'The body content, usually a heading and a description.' }
	],

	events: [],
	cssVariables: [],

	accessibilityNotes: [
		'The CTA appears on focus as well as hover, so a keyboard user can reach the link — but it is hidden until then, which makes it easy to miss.',
		'Only the CTA link is the target, not the whole cell. A user cannot click anywhere in the panel to navigate, which is worth knowing before you design around it.',
		'Give background images an empty alt attribute so they are skipped. They are decorative, and announcing them adds noise.',
		'Headings inside cells still participate in the document outline. Pick the level from the surrounding structure, not from how large the cell is.'
	],

	related: [
		{ tag: 'z-bento-grid', route: '/c/layout/z-bento-grid', description: 'The grid these cells fill.' },
		{ tag: 'z-card', route: '/c/foundation/z-card', description: 'The simpler content block.' },
		{ tag: 'z-surface', route: '/c/layout/z-surface', description: 'Toned and elevated panels.' }
	]
}
