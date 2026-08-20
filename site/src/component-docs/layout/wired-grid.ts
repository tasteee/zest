import { defineMarkupExample } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundGrid = (): HTMLElement => {
	const grid = document.createElement('wired-grid')
	grid.setAttribute('columns', '3')
	grid.setAttribute('gap', 'md')
	grid.className = 'demoFullWidth'
	grid.innerHTML = `
		<z-card><z-text size="sm">One</z-text></z-card>
		<z-card><z-text size="sm">Two</z-text></z-card>
		<z-card><z-text size="sm">Three</z-text></z-card>
	`
	return grid
}

export const wiredGridDoc: ComponentDocT = {
	tag: 'wired-grid',
	title: 'wired-grid',
	tagline: 'A fixed or intrinsic CSS grid from @tasteee/wired.',
	status: ComponentStatus.stable,
	description:
		'Use `columns` for an explicit equal-column layout or `min` for an intrinsic responsive grid. The two modes are intentionally mutually exclusive, making the layout decision visible in the markup.',
	playground: {
		buildElement: buildPlaygroundGrid,
		controlNames: ['columns', 'min', 'gap', 'column-gap', 'row-gap', 'x', 'y', 'constrain'],
		slotLabel: 'Three cards'
	},
	usageGuidance: [
		'Use `min` for card collections and other content that should reflow without breakpoints.',
		'Use `columns` only when the track count is part of the layout contract.',
		'Do not set `columns` and `min` together; the grid deliberately disables both modes when the instruction is ambiguous.'
	],
	anatomy: [
		{ name: 'default slot', description: 'The grid items.' },
		{ name: 'columns', description: 'An explicit count from one through twelve.' },
		{ name: 'min', description: 'The minimum intrinsic width for responsive tracks.' }
	],
	examples: [
		defineMarkupExample({
			id: 'fixed',
			title: 'Fixed columns',
			description: 'Create three equal tracks.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-grid columns="3" gap="md">
				  <z-card><z-text size="sm">One</z-text></z-card>
				  <z-card><z-text size="sm">Two</z-text></z-card>
				  <z-card><z-text size="sm">Three</z-text></z-card>
				</wired-grid>
			`
		}),
		defineMarkupExample({
			id: 'intrinsic',
			title: 'Intrinsic responsive tracks',
			description: 'Fit as many tracks as the available width supports.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-grid min="12rem" gap="md">
				  <z-card><z-text size="sm">Analytics</z-text></z-card>
				  <z-card><z-text size="sm">Billing</z-text></z-card>
				  <z-card><z-text size="sm">Deployments</z-text></z-card>
				  <z-card><z-text size="sm">Logs</z-text></z-card>
				</wired-grid>
			`
		})
	],
	attributes: [
		{ name: 'columns', type: 'number (1–12)', defaultValue: '—', description: 'Number of equal explicit columns.' },
		{ name: 'min', type: 'CSS length', defaultValue: '—', description: 'Minimum item width for an intrinsic responsive grid.' },
		{ name: 'gap', type: 'none | 2xs | xs | sm | md | lg | xl | 2xl', defaultValue: 'none', description: 'Spacing on both axes.' },
		{ name: 'column-gap', type: 'none | 2xs | xs | sm | md | lg | xl | 2xl', defaultValue: '—', description: 'Overrides horizontal spacing.' },
		{ name: 'row-gap', type: 'none | 2xs | xs | sm | md | lg | xl | 2xl', defaultValue: '—', description: 'Overrides vertical spacing.' },
		{ name: 'x', type: 'start | center | end | stretch', defaultValue: 'stretch', description: 'Horizontal item alignment.' },
		{ name: 'y', type: 'start | center | end | stretch', defaultValue: 'stretch', description: 'Vertical item alignment.' },
		{ name: 'constrain', type: 'xs | sm | md | lg | xl | 2xl', defaultValue: '—', description: 'Centers the grid and applies a maximum inline size.' }
	],
	properties: [],
	slots: [{ name: '(default)', description: 'The grid items.' }],
	events: [],
	cssVariables: [],
	accessibilityNotes: ['Grid affects presentation only; DOM order remains the reading and focus order.'],
	related: [
		{ tag: 'wired-row', route: '/c/layout/wired-row', description: 'One-dimensional horizontal layout.' },
		{ tag: 'wired-column', route: '/c/layout/wired-column', description: 'One-dimensional vertical layout.' },
		{ tag: 'z-bento-grid', route: '/c/layout/z-bento-grid', description: 'Asymmetric editorial grids.' }
	]
}
