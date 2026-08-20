import { defineElement } from '../shared/define-element'
import { c, css, event, useEffect, useHost, useProp, useRef, useState } from 'atomico'
import './z-chassis'

/*
 * z-docs-shell — the documentation page frame: a nav rail, a content column,
 * and an optional table-of-contents column, wrapped in z-chassis.
 *
 *   <z-docs-shell nav-width="17rem">
 *     <div slot="header">…logo, search, theme switcher…</div>
 *     <z-nav-tree slot="nav"></z-nav-tree>
 *     <article>…the page…</article>
 *     <z-toc slot="toc"></z-toc>
 *   </z-docs-shell>
 *
 * Slots: `banner` · `header` · `nav-header` · `nav` · `nav-footer` ·
 * default (content) · `toc` · `footer`.
 *
 * The rail has three regions and only the middle one scrolls, so a brand at
 * the top and a utility row at the bottom stay visible however long the nav
 * gets. `header` is the page-wide bar above everything; below the drawer
 * breakpoint it renders regardless, because it carries the nav toggle.
 *
 * The toc column is slot-driven, not prop-driven: a page that slots nothing
 * into `toc` gets a two-column shell and the track collapses entirely. That
 * keeps non-doc pages — a splash, a demo, a changelog — from carrying a dead
 * gutter they never fill.
 *
 * Responsive collapse happens in the order that preserves the most: the toc
 * drops out first, then the nav rail becomes an overlay drawer driven by
 * `is-nav-open`. The drawer is styled through z-chassis's exported
 * `::part(rail)` rather than by re-parenting the nav, so slotted nav state
 * survives the transition between layouts.
 */
const styles = css`
	:host {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		box-sizing: border-box;
		--docs-shell-toc-width: 13rem;
		--docs-shell-content-width: 48rem;
		--docs-shell-gutter: var(--space-2xl);
	}

	:host([is-hidden]) {
		display: none;
	}

	.banner {
		flex: none;
	}

	.header {
		flex: none;
		display: flex;
		align-items: center;
		gap: var(--space-md);
		min-height: 3.5rem;
		padding: 0 var(--space-lg);
		border-bottom: 1px solid var(--border);
	}

	/* An empty header collapses on desktop, but never below the drawer
	   breakpoint: the bar is the only thing carrying the nav toggle, and a
	   drawer you cannot open is worse than a bar you did not ask for. */
	.header.is-empty {
		display: none;
	}

	.headerContent {
		flex: 1;
		min-width: 0;
	}

	.navToggle {
		display: none;
		flex: none;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		cursor: pointer;
	}

	.navToggle:hover {
		color: var(--foreground);
	}

	.navToggle:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.navToggle svg {
		width: 1rem;
		height: 1rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}

	.body {
		position: relative;
		flex: 1;
		min-height: 0;
	}

	.chassis {
		position: relative;
		height: 100%;
	}

	/* The page grid lives inside the chassis screen, so the toc sticks
	   against the screen's scroll container rather than the viewport. */
	.page {
		display: grid;
		grid-template-columns: minmax(0, 1fr) var(--docs-shell-toc-width);
		gap: var(--docs-shell-gutter);
		align-items: start;
		box-sizing: border-box;
		margin: 0 auto;
		padding: var(--space-2xl) var(--space-xl) var(--space-3xl);
		/* Centres the content+toc pair as one block, so the measure stays put
		   when the toc drops out rather than sliding across the screen. */
		max-width: calc(
			var(--docs-shell-content-width) + var(--docs-shell-toc-width) + var(--docs-shell-gutter)
		);
	}

	.page.is-tocless {
		grid-template-columns: minmax(0, 1fr);
	}

	.content {
		min-width: 0;
		max-width: var(--docs-shell-content-width);
	}

	.toc {
		position: sticky;
		top: var(--space-xl);
		min-width: 0;
	}

	.page.is-tocless .toc {
		display: none;
	}

	.footer {
		flex: none;
	}

	.scrim {
		display: none;
		position: absolute;
		inset: 0;
		z-index: 10;
		background: color-mix(in oklch, var(--background) 70%, transparent);
	}

	/* The toc goes first — it is the most redundant column, since its targets
	   are all still reachable by scrolling. */
	@media (max-width: 1100px) {
		.page {
			grid-template-columns: minmax(0, 1fr);
		}

		.toc {
			display: none;
		}
	}

	@media (max-width: 860px) {
		.header,
		.header.is-empty {
			display: flex;
		}

		/* The closed drawer sits translated off the left edge; without this it
		   would push a horizontal scrollbar onto the page. */
		.body {
			overflow: hidden;
		}

		.navToggle {
			display: inline-flex;
		}

		.chassis::part(rail) {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 20;
			background: var(--paper, var(--background));
			border-right: 1px solid var(--border);
			transform: translateX(-102%);
			transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
		}

		:host([is-nav-open]) .chassis::part(rail) {
			transform: none;
		}

		:host([is-nav-open]) .scrim {
			display: block;
		}

		.page {
			padding: var(--space-xl) var(--space-md) var(--space-2xl);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.chassis::part(rail) {
			transition: none;
		}
	}
`

const MENU_ICON = (
	<svg viewBox="0 0 24 24">
		<line x1="4" y1="7" x2="20" y2="7" />
		<line x1="4" y1="12" x2="20" y2="12" />
		<line x1="4" y1="17" x2="20" y2="17" />
	</svg>
)

const checkHasAssignedContent = (slotElement: HTMLSlotElement | null): boolean => {
	if (!slotElement) return false
	return slotElement.assignedNodes({ flatten: true }).length > 0
}

const readSlotFromEvent = (slotEvent: Event): HTMLSlotElement | null => {
	const target = slotEvent.target
	const isSlot = target instanceof HTMLSlotElement
	if (!isSlot) return null
	return target
}

export const ZDocsShell = c(
	(props) => {
		const host = useHost()
		const chassisRef = useRef<HTMLElement>()

		const [isNavOpen, setIsNavOpen] = useProp<boolean>('isNavOpen')
		const [hasToc, setHasToc] = useState(false)
		const [hasHeader, setHasHeader] = useState(false)

		// Imperative API. Routed views need to land at the top of the new page,
		// and the scroll container belongs to the chassis inside this shell.
		useEffect(() => {
			const element = host.current as any
			element.scrollContentToTop = () => {
				const chassis = chassisRef.current as any
				chassis?.scrollScreenTo?.({ top: 0 })
			}
		}, [])

		const navWidth = (props.navWidth as string) || '17rem'

		const shellStyle: Record<string, string> = { '--chassis-rail-width': navWidth }

		const tocWidth = props.tocWidth as string | undefined
		if (tocWidth) shellStyle['--docs-shell-toc-width'] = tocWidth

		const contentWidth = props.contentWidth as string | undefined
		if (contentWidth) shellStyle['--docs-shell-content-width'] = contentWidth

		const pageClass = hasToc ? 'page' : 'page is-tocless'
		const headerClass = hasHeader ? 'header' : 'header is-empty'

		const handleTocSlotChange = (slotEvent: Event) => {
			setHasToc(checkHasAssignedContent(readSlotFromEvent(slotEvent)))
		}

		const handleHeaderSlotChange = (slotEvent: Event) => {
			setHasHeader(checkHasAssignedContent(readSlotFromEvent(slotEvent)))
		}

		const closeNav = () => {
			setIsNavOpen(false)
			props.navClose()
		}

		const handleNavToggle = () => {
			setIsNavOpen(!isNavOpen)
		}

		// Escape closes the drawer. Bound on the host rather than the document
		// so a shell that isn't focused never swallows another view's Escape.
		const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
			const isEscape = keyboardEvent.key === 'Escape'
			if (!isEscape || !isNavOpen) return
			keyboardEvent.stopPropagation()
			closeNav()
		}

		return (
			<host shadowDom style={shellStyle} onkeydown={handleKeyDown}>
				<div class="banner">
					<slot name="banner" />
				</div>

				<div class={headerClass}>
					<button
						type="button"
						class="navToggle"
						aria-label="Toggle navigation"
						aria-expanded={isNavOpen ? 'true' : 'false'}
						onclick={handleNavToggle}
					>
						{MENU_ICON}
					</button>
					<div class="headerContent">
						<slot name="header" onslotchange={handleHeaderSlotChange} />
					</div>
				</div>

				<div class="body">
					<z-chassis class="chassis" part="chassis" ref={chassisRef}>
						<slot name="nav-header" slot="sidebar-header" />
						<slot name="nav" slot="sidebar" />
						<slot name="nav-footer" slot="sidebar-footer" />

						<div class={pageClass}>
							<div class="content">
								<slot />
							</div>
							<aside class="toc">
								<slot name="toc" onslotchange={handleTocSlotChange} />
							</aside>
						</div>
					</z-chassis>

					<div class="scrim" onclick={closeNav} />
				</div>

				<div class="footer">
					<slot name="footer" />
				</div>
			</host>
		)
	},
	{
		props: {
			navWidth: { type: String, reflect: true },
			tocWidth: { type: String, reflect: true },
			contentWidth: { type: String, reflect: true },
			isNavOpen: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			navClose: event<void>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-docs-shell', ZDocsShell)
