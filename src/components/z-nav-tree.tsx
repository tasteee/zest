import { defineElement } from '../shared/define-element'
import { c, css, event, useMemo, useState } from 'atomico'

/*
 * z-nav-tree — recursive, route-aware documentation navigation.
 *
 *   el.items = [
 *     { label: 'Forms', children: [
 *       { label: 'z-checkbox', route: '/c/forms/z-checkbox', status: 'stable' }
 *     ]}
 *   ]
 *
 * Why this is not z-sidebar or z-tree. z-sidebar is an app rail: one level of
 * grouping, value-based entries, groups sorted alphabetically. Docs nav is
 * recursive and ordered by author intent. z-tree is a generic hierarchy that
 * renders ARIA `treeitem`s — the wrong role for site navigation, and its rows
 * are not links.
 *
 * Every destination here is a real <a href>, which is the point: middle-click,
 * modifier-click, open-in-new-tab, and crawlability all come free, and none of
 * them survive a div with a click handler.
 *
 * Router-agnostic by design. Clicks are never intercepted — the anchor
 * navigates natively, which is what makes hash routes and new-tab work. The
 * `navigate` event is a notification (close a mobile drawer, log an analytic),
 * not the navigation itself. Active state is a plain string match on `route`,
 * so any router that can report its current path can drive this.
 *
 * Branches start open unless `is-collapsed-by-default`, in which case only the
 * branch containing the active route opens. Either way an explicit toggle wins
 * and stays won — closing the section you are currently reading in keeps it
 * closed. When `storage-key` is set those toggles persist across navigations;
 * persistence is opt-in, so an element with no key never touches storage.
 *
 * Rows are flattened before render (only expanded branches produce rows), so
 * the render pass stays flat and this stays cheap on a 150-page nav.
 */
const styles = css`
	:host {
		display: block;
		--nav-tree-indent: 0.75rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	.filter {
		box-sizing: border-box;
		width: 100%;
		margin-bottom: var(--space-sm);
		padding: 0.375rem 0.5rem;
		background: var(--background);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--foreground);
		font-family: inherit;
		font-size: var(--font-size-small);
	}

	.filter::placeholder {
		color: var(--muted-foreground);
	}

	.filter:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 1px;
		border-color: transparent;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.0625rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* Nested rows carry their own hairline rail. Consecutive rows at the same
	   depth line their borders up into one continuous guide. */
	.row.is-nested {
		border-left: 1px solid var(--border);
	}

	.groupLabel {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0.375rem 0.5rem;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-family: inherit;
		font-size: var(--font-size-caption);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-align: left;
		cursor: pointer;
	}

	.groupLabel:hover {
		color: var(--foreground);
	}

	.groupLabel:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -1px;
	}

	.caret {
		flex: none;
		width: 0.75rem;
		height: 0.75rem;
		transition: transform 0.14s ease;
	}

	.caret svg {
		width: 100%;
		height: 100%;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.caret.is-collapsed {
		transform: rotate(-90deg);
	}

	.link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		box-sizing: border-box;
		padding: 0.3125rem 0.5rem;
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
		line-height: 1.4;
		text-decoration: none;
	}

	.link:hover {
		background: var(--muted);
		color: var(--foreground);
	}

	.link:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -1px;
	}

	.link.is-active {
		background: color-mix(in oklch, var(--primary) 12%, transparent);
		color: var(--primary);
		font-weight: 500;
	}

	.linkLabel {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.status {
		flex: none;
		padding: 0.0625rem 0.3125rem;
		border-radius: var(--radius-sm);
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: var(--muted-foreground);
		background: var(--muted);
	}

	.status.is-new,
	.status.is-stable {
		color: var(--success);
		background: color-mix(in oklch, var(--success) 14%, transparent);
	}

	.status.is-beta,
	.status.is-experimental {
		color: var(--warning);
		background: color-mix(in oklch, var(--warning) 14%, transparent);
	}

	.status.is-deprecated {
		color: var(--destructive);
		background: color-mix(in oklch, var(--destructive) 14%, transparent);
	}

	.empty {
		padding: var(--space-sm) 0.5rem;
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
	}
`

type NavNodeT = {
	label: string
	href?: string
	route?: string
	status?: string
	children?: NavNodeT[]
}

// One rendered line. The tree is resolved into these before render so the
// render pass itself has no recursion in it.
type NavRowT = {
	key: string
	node: NavNodeT
	depth: number
	isBranch: boolean
	isExpanded: boolean
	isActive: boolean
}

// key -> isExpanded, for branches the reader has explicitly toggled. Both
// directions have to be recorded, not just collapses: knowing a branch was
// deliberately closed is the only way to stop auto-expand from reopening it.
type BranchOverridesT = Record<string, boolean>

type FlattenInputT = {
	nodes: NavNodeT[]
	parentKey: string
	depth: number
	route: string
	overrides: BranchOverridesT
	isFiltering: boolean
	isCollapsedByDefault: boolean
}

const CARET_ICON = (
	<svg viewBox="0 0 24 24">
		<polyline points="6 9 12 15 18 9" />
	</svg>
)

const getNodeKey = (node: NavNodeT, parentKey: string): string => {
	const ownKey = node.route || node.href || node.label
	return `${parentKey}/${ownKey}`
}

const checkIsBranch = (node: NavNodeT): boolean => {
	const children = node.children
	if (!children) return false
	return children.length > 0
}

const checkNodeMatchesFilter = (node: NavNodeT, filterText: string): boolean => {
	return node.label.toLowerCase().includes(filterText)
}

// Keeps a node when it matches, or when anything beneath it matches — an
// ancestor has to survive for its matching descendant to stay reachable.
const filterNodes = (nodes: NavNodeT[], filterText: string): NavNodeT[] => {
	const kept: NavNodeT[] = []

	for (const node of nodes) {
		const isSelfMatch = checkNodeMatchesFilter(node, filterText)
		const childMatches = filterNodes(node.children ?? [], filterText)
		const hasChildMatch = childMatches.length > 0

		if (isSelfMatch) {
			kept.push(node)
			continue
		}

		if (hasChildMatch) kept.push({ ...node, children: childMatches })
	}

	return kept
}

const checkSubtreeHasRoute = (nodes: NavNodeT[], route: string): boolean => {
	for (const node of nodes) {
		const isSelf = Boolean(node.route) && node.route === route
		if (isSelf) return true

		const isInChildren = checkSubtreeHasRoute(node.children ?? [], route)
		if (isInChildren) return true
	}

	return false
}

// Resolution order matters. An explicit toggle outranks auto-expand: a reader
// who closes the section they are reading in expects it to stay closed, and
// having it spring back open on every render is the more annoying failure.
const checkIsBranchExpanded = (input: FlattenInputT, node: NavNodeT, key: string): boolean => {
	// Filtering opens everything it kept, otherwise the matches sit hidden
	// inside branches the reader never asked to close.
	if (input.isFiltering) return true

	const hasOverride = key in input.overrides
	if (hasOverride) return input.overrides[key]

	// Untouched branches are open unless the nav opts into starting closed,
	// which is where auto-expanding the active branch earns its keep.
	if (!input.isCollapsedByDefault) return true

	return checkSubtreeHasRoute(node.children ?? [], input.route)
}

const flattenNavRows = (input: FlattenInputT): NavRowT[] => {
	const rows: NavRowT[] = []

	for (const node of input.nodes) {
		const key = getNodeKey(node, input.parentKey)
		const isBranch = checkIsBranch(node)
		const isExpanded = isBranch && checkIsBranchExpanded(input, node, key)
		const isActive = Boolean(node.route) && node.route === input.route

		rows.push({ key, node, depth: input.depth, isBranch, isExpanded, isActive })

		if (!isExpanded) continue

		const childRows = flattenNavRows({
			nodes: node.children ?? [],
			parentKey: key,
			depth: input.depth + 1,
			route: input.route,
			overrides: input.overrides,
			isFiltering: input.isFiltering,
			isCollapsedByDefault: input.isCollapsedByDefault
		})

		rows.push(...childRows)
	}

	return rows
}

const readOverrides = (storageKey: string | undefined): BranchOverridesT => {
	if (!storageKey) return {}

	try {
		const stored = localStorage.getItem(storageKey)
		if (!stored) return {}
		const parsed = JSON.parse(stored)
		const isPlainObject = Boolean(parsed) && typeof parsed === 'object' && !Array.isArray(parsed)
		if (!isPlainObject) return {}
		return parsed as BranchOverridesT
	} catch {
		// Storage can be disabled outright, or hold something we did not
		// write. Neither is worth failing navigation over.
		return {}
	}
}

const writeOverrides = (storageKey: string | undefined, overrides: BranchOverridesT): void => {
	if (!storageKey) return

	try {
		localStorage.setItem(storageKey, JSON.stringify(overrides))
	} catch {
		// Quota or a privacy mode — collapse state simply will not persist.
	}
}

export const ZNavTree = c(
	(props) => {
		const storageKey = props.storageKey as string | undefined

		const [overrides, setOverrides] = useState<BranchOverridesT>(() => readOverrides(storageKey))
		const [filterText, setFilterText] = useState('')

		const items: NavNodeT[] = Array.isArray(props.items) ? (props.items as NavNodeT[]) : []
		const route = (props.route as string) || ''
		const normalizedFilter = filterText.trim().toLowerCase()
		const isFiltering = normalizedFilter.length > 0

		const visibleItems = useMemo(() => {
			if (!isFiltering) return items
			return filterNodes(items, normalizedFilter)
		}, [items, normalizedFilter, isFiltering])

		const isCollapsedByDefault = Boolean(props.isCollapsedByDefault)

		const rows = useMemo(() => {
			return flattenNavRows({
				nodes: visibleItems,
				parentKey: '',
				depth: 0,
				route,
				overrides,
				isFiltering,
				isCollapsedByDefault
			})
		}, [visibleItems, route, overrides, isFiltering, isCollapsedByDefault])

		const hasRows = rows.length > 0

		const toggleBranch = (key: string, wasExpanded: boolean) => {
			const nextOverrides = { ...overrides, [key]: !wasExpanded }

			setOverrides(nextOverrides)
			writeOverrides(storageKey, nextOverrides)
		}

		const handleNavigate = (node: NavNodeT) => {
			props.navigate({ route: node.route ?? '', node })
		}

		const handleFilterInput = (inputEvent: Event) => {
			const input = inputEvent.target as HTMLInputElement
			setFilterText(input.value)
		}

		const renderStatus = (status: string | undefined) => {
			if (!status) return null
			return <span class={`status is-${status}`}>{status}</span>
		}

		const renderRow = (row: NavRowT) => {
			const isNested = row.depth > 0
			const rowClass = isNested ? 'row is-nested' : 'row'
			const indent = `${row.depth * 0.75}rem`
			const rowStyle = isNested ? `margin-left: ${indent}; padding-left: 0.25rem` : undefined

			if (row.isBranch) {
				const caretClass = row.isExpanded ? 'caret' : 'caret is-collapsed'

				return (
					<li key={row.key} class={rowClass} style={rowStyle}>
						<button
							type="button"
							class="groupLabel"
							aria-expanded={row.isExpanded ? 'true' : 'false'}
							onclick={() => toggleBranch(row.key, row.isExpanded)}
						>
							<span class={caretClass} aria-hidden="true">
								{CARET_ICON}
							</span>
							{row.node.label}
						</button>
					</li>
				)
			}

			const linkClass = row.isActive ? 'link is-active' : 'link'
			const href = row.node.href ?? `#${row.node.route ?? ''}`

			return (
				<li key={row.key} class={rowClass} style={rowStyle}>
					<a
						class={linkClass}
						href={href}
						aria-current={row.isActive ? 'page' : undefined}
						onclick={() => handleNavigate(row.node)}
					>
						<span class="linkLabel">{row.node.label}</span>
						{renderStatus(row.node.status)}
					</a>
				</li>
			)
		}

		return (
			<host shadowDom>
				<nav aria-label={(props.label as string) || 'Documentation'}>
					{props.isFiltered && (
						<input
							class="filter"
							type="search"
							placeholder={(props.filterPlaceholder as string) || 'Filter'}
							value={filterText}
							oninput={handleFilterInput}
						/>
					)}
					{hasRows && <ul class="list">{rows.map(renderRow)}</ul>}
					{!hasRows && <p class="empty">No matches.</p>}
				</nav>
			</host>
		)
	},
	{
		props: {
			items: { type: Array },
			route: { type: String, reflect: true },
			label: { type: String, reflect: true },
			storageKey: { type: String, reflect: true },
			isCollapsedByDefault: { type: Boolean, reflect: true },
			isFiltered: { type: Boolean, reflect: true },
			filterPlaceholder: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			navigate: event<{ route: string; node: NavNodeT }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-nav-tree', ZNavTree)
