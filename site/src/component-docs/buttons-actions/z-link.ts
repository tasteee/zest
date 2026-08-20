import { defineMarkupExample } from '../authoring'
import { Icons } from '../icons'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundLink = (): HTMLElement => {
	const link = document.createElement('z-link')
	link.setAttribute('href', '#/c/buttons-actions/z-link')
	link.textContent = 'Read the docs'
	return link
}

export const zLinkDoc: ComponentDocT = {
	tag: 'z-link',
	title: 'z-link',
	tagline: 'An inline text link with an underline that grows from the start on hover.',
	status: ComponentStatus.stable,

	description:
		'A real anchor with the design system\'s treatment on top. The underline animates in from the leading edge rather than fading, which reads as deliberate at small sizes where a fade just looks like a rendering artifact. Use a link when the target is a destination; use `z-button` when the target is an action. The distinction matters beyond aesthetics: a link supports middle-click, cmd-click, and copy-link-address, and users expect all three.',

	playground: {
		buildElement: buildPlaygroundLink,
		controlNames: [],
		slotLabel: 'Read the docs'
	},

	usageGuidance: [
		'Links navigate, buttons act. If nothing about the address changes when it is clicked, it should not be a link.',
		'Write the destination into the label. "Read the pricing guide" survives being read out of context; "click here" does not.',
		'`is-external` adds the safe `rel` and a new tab. Do not open same-origin navigation in a new tab — that is the user\'s decision to make.',
		'`underline="none"` is for links that are already obviously interactive, like a card title. In a paragraph of prose, keep the underline.'
	],

	anatomy: [
		{ name: 'default slot', description: 'Link content — text, icons, or both. Ignored when `label` is set.' },
		{ name: 'underline', description: 'Animates in from the leading edge on hover, or stays permanently with `underline="always"`.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'In prose',
			description: 'The default use: a link inside a sentence, distinguished by colour and an underline on hover.',
			layout: ExampleLayout.fill,
			markup: `
				<z-text size="md">
				  Every component ships its own encapsulated styles, so you can
				  <z-link href="#/c/buttons-actions/z-button">drop one into an existing page</z-link>
				  without inheriting anything you did not ask for.
				</z-text>
			`
		}),

		defineMarkupExample({
			id: 'accents',
			title: 'Accents',
			description: 'Neutral is for links inside dense UI, where a coloured link would compete with the content.',
			markup: `
				<z-link href="#" color="dom">Primary</z-link>
				<z-link href="#" color="sub">Secondary</z-link>
				<z-link href="#" color="neutral">Neutral</z-link>
			`
		}),

		defineMarkupExample({
			id: 'underline-modes',
			title: 'Underline behaviour',
			description:
				'`hover` grows the underline on interaction, `always` keeps it permanently, `none` relies on colour alone. Prefer `always` in body copy where colour alone may not be enough.',
			markup: `
				<z-link href="#" underline="hover">On hover</z-link>
				<z-link href="#" underline="always">Always</z-link>
				<z-link href="#" underline="none">Never</z-link>
			`
		}),

		defineMarkupExample({
			id: 'sizes',
			title: 'Sizes',
			description: 'Three sizes matching the type scale, so a link can sit inline in any of them without shifting the line height.',
			markup: `
				<z-link href="#" size="sm">Small</z-link>
				<z-link href="#" size="md">Medium</z-link>
				<z-link href="#" size="lg">Large</z-link>
			`
		}),

		defineMarkupExample({
			id: 'external',
			title: 'External links',
			description:
				'`is-external` opens a new tab and sets `rel="noopener noreferrer"`, which closes the window-opener hole without you having to remember it.',
			markup: `
				<z-link href="https://developer.mozilla.org" is-external>
				  MDN Web Docs ${Icons.external}
				</z-link>
			`
		}),

		defineMarkupExample({
			id: 'block',
			title: 'Block links',
			description:
				'`is-block` turns the link into a block-level flex container — useful for list rows or cards where the whole area should be the target.',
			layout: ExampleLayout.fill,
			markup: `
				<wired-column gap="xs" style="width: 340px">
				  <z-link href="#" is-block color="neutral">${Icons.mail} Inbox</z-link>
				  <z-link href="#" is-block color="neutral">${Icons.calendar} Schedule</z-link>
				  <z-link href="#" is-block color="neutral">${Icons.settings} Settings</z-link>
				</wired-column>
			`
		}),

		defineMarkupExample({
			id: 'label-attribute',
			title: 'Label attribute',
			description: 'For plain text links, `label` is shorter than slotting. It wins over children, so never set both.',
			markup: `
				<z-link href="#" label="Pricing"></z-link>
				<z-link href="#" label="Changelog" color="neutral"></z-link>
			`
		}),

		defineMarkupExample({
			id: 'disabled',
			title: 'Disabled',
			description:
				'`disabled` strips the `href` entirely, so the element stops being a navigation target rather than merely looking inert.',
			markup: `
				<z-link href="#" disabled>Unavailable</z-link>
				<z-link href="#">Available</z-link>
			`
		})
	],

	attributes: [
		{ name: 'href', type: 'string', defaultValue: '—', description: 'Destination. Removed entirely while disabled is set.' },
		{ name: 'target', type: 'string', defaultValue: '—', description: 'Anchor target. A value of _blank implies the external rel.' },
		{ name: 'label', type: 'string', defaultValue: '—', description: 'Text content. Takes precedence over slotted children.' },
		{ name: 'color', type: 'dom | sub | neutral', defaultValue: 'dom', description: 'Colour family.' },
		{ name: 'size', type: 'sm | md | lg', defaultValue: 'md', description: 'Type size.' },
		{ name: 'underline', type: 'hover | always | none', defaultValue: 'hover', description: 'When the underline is drawn.' },
		{
			name: 'is-external',
			type: 'boolean',
			defaultValue: '—',
			description: 'Opens in a new tab with rel="noopener noreferrer".'
		},
		{ name: 'is-block', type: 'boolean', defaultValue: '—', description: 'Renders as a block-level flex link.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Removes the href and blocks interaction.' },
		{ name: 'is-hidden', type: 'boolean', defaultValue: '—', description: 'Removes the link from layout.' }
	],

	properties: [],

	slots: [{ name: '(default)', description: 'Link content — text, icons, or both. Ignored when the label attribute is set.' }],

	events: [{ name: 'click', detail: '—', description: 'The native click event from the underlying anchor.' }],

	cssVariables: [],

	accessibilityNotes: [
		'Renders a native anchor, so middle-click, cmd-click, and copy-link-address all behave the way users expect.',
		'Link text should make sense read on its own — screen reader users routinely navigate by pulling up a list of every link on the page.',
		'is-external opens a new tab, which is disorienting without warning. Say so in the label or with a visible icon.',
		'A disabled link loses its href and therefore leaves the tab order. If the state is temporary, explain why rather than leaving a dead target.'
	],

	related: [
		{ tag: 'z-button', route: '/c/buttons-actions/z-button', description: 'For actions rather than destinations.' },
		{ tag: 'z-breadcrumbs', route: '/c/navigation-disclosure/z-breadcrumbs', description: 'Hierarchical navigation.' },
		{ tag: 'z-nav-menu', route: '/c/navigation-disclosure/z-nav-menu', description: 'Primary site navigation.' }
	]
}
