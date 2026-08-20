import { defineInteractiveExample, defineMarkupExample, queryPreview } from '../authoring'
import { ComponentStatus, ExampleLayout } from '../types'
import type { ComponentDocT } from '../types'

const buildPlaygroundDrawer = (): HTMLElement => {
	const drawer = document.createElement('z-drawer')
	drawer.setAttribute('heading', 'Share this file')
	drawer.setAttribute('description', 'Anyone with the link can view it.')

	drawer.innerHTML = `
		<z-button slot="trigger" kind="outline">Open drawer</z-button>
		<z-field label="Link"><z-input is-readonly value="https://zest.app/f/8f2Ka91"></z-input></z-field>
		<z-button slot="footer" kind="solid" accent="dom">Copy link</z-button>
	`

	return drawer
}

export const zDrawerDoc: ComponentDocT = {
	tag: 'z-drawer',
	title: 'z-drawer',
	tagline: 'A bottom sheet you can throw away with your thumb.',
	status: ComponentStatus.stable,

	description:
		'The same native `<dialog>` modality and chrome as `z-sheet`, pinned to the bottom edge with a rounded top and a grab handle — plus the one thing that sets it apart: pointer drag. Pull it down past a threshold and it closes; release short of that and it snaps back. The handle is what makes the gesture discoverable, which is why it is drawn even on desktop, where the drag also works with a mouse.',

	playground: {
		buildElement: buildPlaygroundDrawer,
		controlNames: ['heading', 'description', 'is-static'],
		slotLabel: 'trigger, body, and footer'
	},

	usageGuidance: [
		'Use it on touch-first surfaces, where reaching a ✕ in a corner is a stretch and flicking downward is not.',
		'Keep the content short. A drawer is a glance and an action — if it needs to scroll, the scroll fights the drag gesture and the user loses both.',
		'The grab handle is the affordance. Never hide it, and never put an interactive element in the handle area — the whole strip is a drag target.',
		'`is-static` disables backdrop dismissal but leaves the drag alone. It stops a stray tap outside, not a deliberate pull down.',
		'On desktop, prefer `z-sheet` from the right or a `z-dialog`. A drawer at the bottom of a wide screen puts the content as far from the pointer as it can get.',
		'Do not stack drawers. A second one over the first leaves two grab handles and no way to reason about which pull dismisses what.'
	],

	anatomy: [
		{ name: 'handle area', description: 'The drag strip at the top. Owns the pointer capture, so the gesture works anywhere along it.' },
		{ name: 'handle', description: 'The pill. Purely an affordance — it tells you the drag exists.' },
		{ name: 'header', description: 'Heading and description, on the shared dialog chrome.' },
		{ name: 'body', description: 'The default slot.' },
		{ name: 'footer slot', description: 'Actions. Hidden entirely when nothing is slotted in.' }
	],

	examples: [
		defineMarkupExample({
			id: 'basic',
			title: 'Basic',
			description: 'Open it, then drag the handle down. Let go past the threshold and it closes; let go early and it snaps back.',
			layout: ExampleLayout.start,
			markup: `
				<z-drawer heading="Share this file" description="Anyone with the link can view it.">
				  <z-button slot="trigger" kind="outline">Share</z-button>
				  <z-field label="Link">
				    <z-input is-readonly value="https://zest.app/f/8f2Ka91"></z-input>
				  </z-field>
				  <z-button slot="footer" kind="outline" accent="neutral">Change access</z-button>
				  <z-button slot="footer" kind="solid" accent="dom">Copy link</z-button>
				</z-drawer>
			`
		}),

		defineMarkupExample({
			id: 'actions',
			title: 'An action list',
			description:
				'The most natural fit: a short menu of things to do with whatever was tapped. Full-width rows, big targets, one pull to dismiss.',
			layout: ExampleLayout.start,
			markup: `
				<z-drawer heading="Photo options">
				  <z-button slot="trigger" kind="outline">Photo options</z-button>
				  <wired-column gap="2xs">
				    <z-button kind="ghost" accent="neutral" is-full-width>Add to album</z-button>
				    <z-button kind="ghost" accent="neutral" is-full-width>Duplicate</z-button>
				    <z-button kind="ghost" accent="neutral" is-full-width>Download original</z-button>
				    <z-separator></z-separator>
				    <z-button kind="ghost" accent="error" is-full-width>Delete photo</z-button>
				  </wired-column>
				</z-drawer>
			`
		}),

		defineMarkupExample({
			id: 'no-footer',
			title: 'Without a footer',
			description: 'The footer collapses when unused, which keeps a peek-style drawer as short as its content.',
			layout: ExampleLayout.start,
			markup: `
				<z-drawer heading="Now playing" description="Nocturne in E-flat major — Chopin">
				  <z-button slot="trigger" kind="outline">Now playing</z-button>
				  <z-slider label="Position" min="0" max="270" value="96" does-show-value value-suffix="s" accent="dom" style="width: 100%"></z-slider>
				</z-drawer>
			`
		}),

		defineMarkupExample({
			id: 'static',
			title: 'Static',
			description:
				'`is-static` ignores backdrop taps. The drag still dismisses — taking away the gesture the handle advertises would be a lie.',
			layout: ExampleLayout.start,
			markup: `
				<z-drawer is-static heading="Confirm your address" description="Tapping outside will not dismiss this.">
				  <z-button slot="trigger" kind="outline">Confirm address</z-button>
				  <z-field label="Street"><z-input placeholder="12 Rue de Rivoli"></z-input></z-field>
				  <z-button slot="footer" kind="solid" accent="dom">Save address</z-button>
				</z-drawer>
			`
		}),

		defineInteractiveExample({
			id: 'events',
			title: 'open and close',
			description:
				'`close` fires whichever way the drawer left — the drag, Escape, or the backdrop. That is the hook for anything you need to tidy up.',
			layout: ExampleLayout.stack,
			markup: `
				<z-drawer id="filtersDrawer" heading="Sort by">
				  <z-button slot="trigger" kind="outline">Sort</z-button>
				  <z-radio-group label="Sort by" value="recent">
				    <z-radio value="recent" accent="dom" is-checked>Most recent</z-radio>
				    <z-radio value="popular" accent="dom">Most popular</z-radio>
				    <z-radio value="name" accent="dom">Name</z-radio>
				  </z-radio-group>
				</z-drawer>
				<z-text size="sm" color="muted" id="drawerStatus">Closed.</z-text>
			`,
			script: `
				const filtersDrawer = document.querySelector('#filtersDrawer')

				filtersDrawer.addEventListener('open', () => {
				  markDrawerOpen()
				})

				filtersDrawer.addEventListener('close', () => {
				  // fires for the drag, Escape, and the backdrop alike
				  commitSort()
				})
			`,
			wire: (root) => {
				const filtersDrawer = queryPreview<HTMLElement>(root, '#filtersDrawer')
				const drawerStatus = queryPreview<HTMLElement>(root, '#drawerStatus')

				filtersDrawer.addEventListener('open', () => {
					drawerStatus.textContent = 'Open — drag the handle down to dismiss.'
				})

				filtersDrawer.addEventListener('close', () => {
					drawerStatus.textContent = 'Closed — sort committed.'
				})
			}
		}),

		defineInteractiveExample({
			id: 'imperative',
			title: 'Opening from code',
			description: 'A drawer raised in response to something else — a long press, a row tap, a selection. `isOpen` is two-way, so it is one assignment.',
			layout: ExampleLayout.stack,
			markup: `
				<wired-row gap="sm">
				  <z-button id="rowOne" size="sm" kind="outline">Tap “Sunset.jpg”</z-button>
				  <z-button id="rowTwo" size="sm" kind="outline">Tap “Notes.pdf”</z-button>
				</wired-row>
				<z-drawer id="fileDrawer" heading="File options">
				  <wired-column gap="2xs">
				    <z-button kind="ghost" accent="neutral" is-full-width>Rename</z-button>
				    <z-button kind="ghost" accent="neutral" is-full-width>Move</z-button>
				  </wired-column>
				</z-drawer>
			`,
			script: `
				const fileDrawer = document.querySelector('#fileDrawer')

				const openFor = (fileName) => {
				  fileDrawer.description = fileName
				  fileDrawer.isOpen = true
				}
			`,
			wire: (root) => {
				type DrawerElementT = HTMLElement & { isOpen: boolean; description: string }

				const fileDrawer = queryPreview<DrawerElementT>(root, '#fileDrawer')
				const rowOne = queryPreview<HTMLElement>(root, '#rowOne')
				const rowTwo = queryPreview<HTMLElement>(root, '#rowTwo')

				const openFor = (fileName: string): void => {
					fileDrawer.description = fileName
					fileDrawer.isOpen = true
				}

				rowOne.addEventListener('click', () => openFor('Sunset.jpg'))
				rowTwo.addEventListener('click', () => openFor('Notes.pdf'))
			}
		})
	],

	attributes: [
		{ name: 'is-open', type: 'boolean', defaultValue: '—', description: 'Whether the drawer is showing. Reflects and is two-way.' },
		{ name: 'heading', type: 'string', defaultValue: '—', description: 'Title in the header, and the drawer’s accessible name.' },
		{ name: 'description', type: 'string', defaultValue: '—', description: 'A muted line under the heading.' },
		{ name: 'is-static', type: 'boolean', defaultValue: '—', description: 'Ignores backdrop clicks. The drag and Escape still dismiss.' },
		{ name: 'disabled', type: 'boolean', defaultValue: '—', description: 'Stops the trigger from opening the drawer.' }
	],

	properties: [],

	slots: [
		{ name: 'trigger', description: 'The element that opens the drawer.' },
		{ name: '(default)', description: 'The body. Keep it short — long content fights the drag.' },
		{ name: 'footer', description: 'Actions. Hidden when empty.' }
	],

	events: [
		{ name: 'open', detail: '—', description: 'Fires after the drawer has been shown.' },
		{ name: 'close', detail: '—', description: 'Fires after it closes — by drag, Escape, or backdrop.' }
	],

	cssVariables: [],

	accessibilityNotes: [
		'It is a real modal on the native dialog element: focus is trapped, the page behind is inert, and Escape closes without any custom key handling.',
		'The drag is an accelerator, never the only route out. The backdrop and Escape both work, so nobody is required to perform a gesture to escape.',
		'Pointer capture on the handle area means the gesture keeps tracking even when the pointer leaves the strip mid-drag, which is what stops a fast flick from stalling half way.',
		'Set a heading. It names the drawer for assistive technology, which otherwise announces only that a dialog opened.',
		'Respect reduced-motion at the page level if you customise the entry transition — a panel that flies in is exactly the kind of movement that setting exists for.'
	],

	related: [
		{ tag: 'z-sheet', route: '/c/overlays/z-sheet', description: 'The same idea from any edge, without the drag.' },
		{ tag: 'z-dialog', route: '/c/overlays/z-dialog', description: 'The centred modal, better suited to desktop.' },
		{ tag: 'z-menu', route: '/c/navigation-disclosure/z-menu', description: 'For an action list that does not need to be modal.' }
	]
}
