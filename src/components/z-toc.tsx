import { c, css, event, useEffect, useState } from 'atomico'

/*
 * z-toc — on-page contents with scroll-spy.
 *
 *   <z-toc for="#article" min-level="2" max-level="3"></z-toc>
 *
 * Two ways to say what is in it. `headings` takes an authored array when the
 * page already knows its own outline. `for` takes a selector and reads the
 * headings out of that container instead, which is what makes this work with
 * z-markdown output it did not author — including content that arrives after
 * the toc mounts, since the container is observed for changes.
 *
 * Headings without an id get one, slugified from their text. Without that a
 * rendered markdown document has nothing to point at.
 *
 * Unlike z-nav-tree, clicks here are intercepted. A toc scrolls within the
 * current page rather than navigating between pages, and on a hash-routed
 * site a bare `#section` href would replace the route instead of moving down
 * it. The `change` event still fires, so a host can sync the URL if it wants
 * to.
 *
 * Scroll-spy runs on IntersectionObserver with the viewport's bottom 70%
 * masked off, so a heading becomes active as it reaches the top of the screen
 * rather than the moment it appears at the bottom. The last section on a short
 * page can never reach the top, so hitting the bottom of the scroll always
 * activates the final heading — otherwise the toc goes dead exactly where the
 * reader ends up.
 */
const styles = css`
	:host {
		display: block;
	}

	:host([is-hidden]) {
		display: none;
	}

	.label {
		margin: 0 0 var(--space-sm);
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.0625rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.link {
		display: block;
		padding: 0.25rem 0.625rem;
		border-left: 1px solid var(--border);
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
		line-height: 1.45;
		text-decoration: none;
		transition:
			color 0.12s ease,
			border-color 0.12s ease;
	}

	/* Depth is indentation plus nothing else — a second type size for sub
	   headings would compete with the page's own hierarchy. */
	.link[data-depth='1'] {
		padding-left: 1.25rem;
	}

	.link[data-depth='2'] {
		padding-left: 1.875rem;
	}

	.link[data-depth='3'] {
		padding-left: 2.5rem;
	}

	.link:hover {
		color: var(--foreground);
	}

	.link:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -3px;
		border-radius: var(--radius-sm);
	}

	.link.is-active {
		color: var(--foreground);
		border-left-color: var(--foreground);
	}
`

type HeadingT = {
	id: string
	label: string
	level: number
	element?: Element
}

/*
 * Headings are not necessarily in the document tree. z-markdown renders into
 * a shadow root, so `container.querySelectorAll('h2')` finds nothing and
 * `document.getElementById` can never reach the result. Every search
 * therefore descends through shadow roots, and each heading keeps a direct
 * reference to its element rather than being looked up by id later.
 */
const collectSearchRoots = (root: Element | ShadowRoot, found: (Element | ShadowRoot)[]): (Element | ShadowRoot)[] => {
	found.push(root)

	for (const element of root.querySelectorAll('*')) {
		if (element.shadowRoot) collectSearchRoots(element.shadowRoot, found)
	}

	return found
}

const slugify = (text: string): string => {
	const lowered = text.toLowerCase().trim()
	const hyphenated = lowered.replace(/[^a-z0-9]+/g, '-')
	return hyphenated.replace(/^-+|-+$/g, '')
}

const buildHeadingSelector = (minLevel: number, maxLevel: number): string => {
	const levels: string[] = []
	for (const level of [1, 2, 3, 4, 5, 6]) {
		const isInRange = level >= minLevel && level <= maxLevel
		if (isInRange) levels.push(`h${level}`)
	}
	return levels.join(',')
}

// Reads the headings out of a container, assigning ids where they are missing
// so every entry has something to scroll to.
const collectHeadings = (container: Element, minLevel: number, maxLevel: number): HeadingT[] => {
	const selector = buildHeadingSelector(minLevel, maxLevel)
	if (!selector) return []

	const found: HeadingT[] = []
	const usedIds = new Set<string>()

	for (const root of collectSearchRoots(container, [])) {
		for (const element of root.querySelectorAll(selector)) {
			const label = (element.textContent || '').trim()
			if (!label) continue

			const baseId = element.id || slugify(label)
			if (!baseId) continue

			const isTaken = usedIds.has(baseId)
			const uniqueId = isTaken ? `${baseId}-${usedIds.size}` : baseId
			usedIds.add(uniqueId)
			if (element.id !== uniqueId) element.id = uniqueId

			const level = Number(element.tagName.slice(1))
			found.push({ id: uniqueId, label, level, element })
		}
	}

	return found
}

// Authored headings carry no element, so they are resolved against the
// document; collected ones may live in a shadow root that getElementById
// cannot reach, so they carry their element with them.
const resolveHeadingElement = (heading: HeadingT): Element | null => {
	if (heading.element) return heading.element
	return document.getElementById(heading.id)
}

const normalizeAuthoredHeadings = (value: unknown): HeadingT[] => {
	if (!Array.isArray(value)) return []

	const normalized: HeadingT[] = []
	for (const entry of value) {
		const hasShape = entry && typeof entry.id === 'string' && typeof entry.label === 'string'
		if (!hasShape) continue
		normalized.push({ id: entry.id, label: entry.label, level: Number(entry.level) || 2 })
	}
	return normalized
}

const getShallowestLevel = (headings: HeadingT[]): number => {
	let shallowest = 6
	for (const heading of headings) {
		if (heading.level < shallowest) shallowest = heading.level
	}
	return shallowest
}

export const ZToc = c(
	(props) => {
		const [headings, setHeadings] = useState<HeadingT[]>([])
		const [activeId, setActiveId] = useState<string>('')

		const minLevel = Number(props.minLevel) || 2
		const maxLevel = Number(props.maxLevel) || 3
		const authored = normalizeAuthoredHeadings(props.headings)
		const hasAuthoredHeadings = authored.length > 0

		// Source of truth. Authored headings win; otherwise watch the container
		// so headings that arrive with a later render still land in the list.
		useEffect(() => {
			if (hasAuthoredHeadings) {
				setHeadings(authored)
				return
			}

			const selector = props.for as string | undefined
			if (!selector) return

			const container = document.querySelector(selector)
			if (!container) return

			const sync = () => setHeadings(collectHeadings(container, minLevel, maxLevel))
			sync()

			// Watching the container alone misses content that renders inside a
			// child's shadow root, which is exactly the z-markdown case.
			const observer = new MutationObserver(sync)
			for (const root of collectSearchRoots(container, [])) {
				observer.observe(root, { childList: true, subtree: true })
			}

			return () => observer.disconnect()
		}, [props.for, props.headings, minLevel, maxLevel])

		// Scroll-spy. The bottom 70% of the viewport is masked so a heading
		// activates on arrival at the top, not on first appearance.
		useEffect(() => {
			const hasHeadings = headings.length > 0
			if (!hasHeadings) return

			const elements: Element[] = []
			for (const heading of headings) {
				const element = resolveHeadingElement(heading)
				if (element) elements.push(element)
			}
			if (!elements.length) return

			const visibleIds = new Set<string>()

			const pickActive = () => {
				for (const heading of headings) {
					if (visibleIds.has(heading.id)) return setActiveId(heading.id)
				}
			}

			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) visibleIds.add(entry.target.id)
						else visibleIds.delete(entry.target.id)
					}
					pickActive()
				},
				{ rootMargin: '0px 0px -70% 0px', threshold: 0 }
			)

			for (const element of elements) observer.observe(element)

			// The final heading on a short page never reaches the top band, so
			// the bottom of the scroll claims it directly.
			//
			// Captured on document rather than bound to window: the page may
			// scroll inside a container (z-docs-shell scrolls a z-chassis
			// screen, not the document), and scroll events do not bubble. The
			// capture phase sees them from whichever element actually scrolled.
			const handleScroll = (scrollEvent: Event) => {
				const target = scrollEvent.target
				const isElement = target instanceof Element
				const scroller = isElement ? target : document.documentElement

				const scrolled = scroller.scrollTop + scroller.clientHeight
				const isAtBottom = scrolled >= scroller.scrollHeight - 2
				if (isAtBottom) setActiveId(headings[headings.length - 1].id)
			}

			document.addEventListener('scroll', handleScroll, { capture: true, passive: true })

			return () => {
				observer.disconnect()
				document.removeEventListener('scroll', handleScroll, { capture: true })
			}
		}, [headings])

		const reflectedActiveId = (props.activeId as string) || activeId

		const handleClick = (clickEvent: Event, heading: HeadingT) => {
			clickEvent.preventDefault()
			const target = resolveHeadingElement(heading)
			if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
			setActiveId(heading.id)
			props.change({ id: heading.id })
		}

		const shallowestLevel = getShallowestLevel(headings)
		const hasHeadings = headings.length > 0
		if (!hasHeadings) return <host shadowDom></host>

		const label = (props.label as string) || 'On this page'

		return (
			<host shadowDom>
				<nav aria-label={label}>
					<p class='label'>{label}</p>
					<ul class='list'>
						{headings.map((heading) => {
							const depth = heading.level - shallowestLevel
							const isActive = heading.id === reflectedActiveId
							const linkClass = isActive ? 'link is-active' : 'link'

							return (
								<li key={heading.id}>
									<a
										class={linkClass}
										href={`#${heading.id}`}
										data-depth={String(depth)}
										aria-current={isActive ? 'true' : undefined}
										onclick={(clickEvent: Event) => handleClick(clickEvent, heading)}
									>
										{heading.label}
									</a>
								</li>
							)
						})}
					</ul>
				</nav>
			</host>
		)
	},
	{
		props: {
			for: { type: String, reflect: true },
			headings: { type: Array },
			minLevel: { type: Number, reflect: true },
			maxLevel: { type: Number, reflect: true },
			label: { type: String, reflect: true },
			activeId: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ id: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-toc', ZToc)
