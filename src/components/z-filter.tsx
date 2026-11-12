import { defineFormElement, useFormControl } from '../shared/form-control'
import { useLocale } from '../shared/locale'
import { c, css, event, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-filter, a pill-based faceting control (the daisyUI "filter" UX). Options
 * are supplied as an `options` array property:
 *   el.options = [{ value, label, isDisabled?, children? }]
 *
 * Flat (default): a single-select group. Picking a pill collapses the rest
 * away and reveals a reset (✕); reset brings them all back.
 *
 * Nested (`is-drilldown`): options may carry `children`. Picking a branch
 * *drills in*, its siblings collapse into a breadcrumb crumb and its children
 * appear as the next level of muted "candidate" pills. Picking a leaf just
 * activates it; its siblings stay visible (only not active). Crumbs are
 * clickable to step back up; the ✕ clears everything.
 *
 * The difference between the two modes is a single rule: a *leaf* selection
 * collapses its level in flat mode, and keeps it in drill-down mode. Drilling
 * through a *branch* always collapses. Emits `change` with { value, path }.
 */
const styles = css`
	:host {
		display: block;
		--filter-accent: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--filter-accent: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--filter-accent: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-disabled]) .filter {
		opacity: 0.55;
		pointer-events: none;
	}

	.filter {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-1-5);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
		font-family: inherit;
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-none);
		white-space: nowrap;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-full);
		background: transparent;
		/* resting / candidate: the less-prominent neutral state */
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			background-color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter),
			opacity var(--motion-fast) var(--ease-enter);
	}

	.filter.is-sm .pill {
		font-size: var(--font-size-xs);
		padding: var(--space-1-5) var(--space-3);
	}
	.filter.is-md .pill {
		font-size: var(--font-size-sm);
		padding: var(--space-2) var(--space-3-5);
	}

	.pill:hover {
		border-color: color-mix(in srgb, var(--filter-accent) 45%, var(--border-default));
		color: var(--text-primary);
	}

	/* chosen, a crumb (drilled ancestor) or the active frontier leaf. Wins over
	   the muted resting look with an accent tint + border. */
	.pill.is-active,
	.pill.is-crumb {
		background: color-mix(in oklch, var(--filter-accent) 14%, transparent);
		border-color: color-mix(in oklch, var(--filter-accent) 50%, transparent);
		color: var(--filter-accent);
		font-weight: var(--font-weight-semibold);
	}
	/* neutral tone === foreground, which reads fine as text on the faint tint */
	:host(:not([tone])) .pill.is-active,
	:host(:not([tone])) .pill.is-crumb,
	:host([tone='primary']) .pill.is-active,
	:host([tone='primary']) .pill.is-crumb {
		color: var(--text-primary);
	}

	.pill.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.pill:focus-visible,
	.reset:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	/* reset ✕ */
	.reset {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 0;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
	}
	.filter.is-sm .reset {
		width: 1.625rem;
		height: 1.625rem;
	}
	.filter.is-md .reset {
		width: 1.875rem;
		height: 1.875rem;
	}
	.reset:hover {
		border-color: color-mix(in srgb, var(--status-danger) 50%, var(--border-default));
		color: var(--status-danger);
	}
	.reset svg {
		width: 0.7rem;
		height: 0.7rem;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		fill: none;
	}

	/* › between the crumb trail and the current frontier */
	.sep {
		display: inline-flex;
		align-items: center;
		color: var(--text-secondary);
		opacity: 0.5;
	}
	.sep svg {
		width: 0.85rem;
		height: 0.85rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
`

type FilterOptionT = {
	value: string
	label: string
	isDisabled?: boolean
	children?: FilterOptionT[]
}

type CrumbT = { node: FilterOptionT; level: number }

type ViewT = {
	crumbs: CrumbT[]
	frontier: FilterOptionT[]
	frontierParent: string[]
	frontierChosen?: string
}

const hasChildren = (n?: FilterOptionT): boolean => !!(n && n.children && n.children.length)

/*
 * Walk the chosen `path` down the tree, then decide what to show:
 *   - nothing chosen        → frontier = the root options
 *   - chosen node branches  → collapse the whole path to crumbs, frontier = its children
 *   - chosen node is a leaf → collapseLeaf ? crumbs only (flat/daisyUI collapse)
 *                                          : keep its siblings as the frontier (drill-down)
 */
const resolveView = (options: FilterOptionT[], path: string[], collapseLeaf: boolean): ViewT => {
	const levels: FilterOptionT[][] = [options]
	const chosen: FilterOptionT[] = []
	let current = options

	for (const value of path) {
		const node = current.find((n) => n.value === value)
		if (!node) break
		chosen.push(node)
		current = node.children || []
		levels.push(current)
	}

	if (chosen.length === 0) {
		return { crumbs: [], frontier: options, frontierParent: [] }
	}

	const last = chosen[chosen.length - 1]
	const chosenPath = chosen.map((n) => n.value)
	const asCrumbs = (nodes: FilterOptionT[]): CrumbT[] => nodes.map((node, level) => ({ node, level }))

	if (hasChildren(last)) {
		return { crumbs: asCrumbs(chosen), frontier: last.children as FilterOptionT[], frontierParent: chosenPath }
	}

	if (collapseLeaf) {
		return { crumbs: asCrumbs(chosen), frontier: [], frontierParent: chosenPath }
	}

	// drill-down leaf: keep the level `last` belongs to visible, `last` active
	return {
		crumbs: asCrumbs(chosen.slice(0, -1)),
		frontier: levels[chosen.length - 1],
		frontierParent: chosenPath.slice(0, -1),
		frontierChosen: last.value
	}
}

export const ZFilter = c(
	(props) => {
		const t = useLocale()
		const [path, setPath] = useState<string[]>([])
		// The chosen leaf is the value (its path is in the change event); with
		// nothing chosen there is no entry, like an unchecked radio group.
		const { isFormDisabled } = useFormControl({
			value: path.length ? path[path.length - 1] : null,
			isDisabled: props.isDisabled,
			onReset: () => setPath([]),
			onRestore: (state) => { if (typeof state === 'string') setPath(state ? [state] : []) }
		})
		const isDisabled = props.isDisabled || isFormDisabled

		const options: FilterOptionT[] = Array.isArray(props.options) ? (props.options as FilterOptionT[]) : []
		const collapseLeaf = !props.isDrilldown
		const view = resolveView(options, path, collapseLeaf)

		const apply = (next: string[]) => {
			if (isDisabled) return
			setPath(next)
			props.change({ value: next.length ? next[next.length - 1] : undefined, path: next })
		}

		const selectFrontier = (node: FilterOptionT) => {
			if (node.isDisabled) return
			apply([...view.frontierParent, node.value])
		}

		const filterClass = ['filter', props.size === 'sm' ? 'is-sm' : 'is-md'].join(' ')

		return (
			<host shadowDom role="group" aria-label={props.label}>
				<div class={filterClass}>
					{path.length > 0 && (
						<button type="button" class="reset" aria-label={props.resetLabel || t('clear')} onclick={() => apply([])}>
							<svg viewBox="0 0 12 12">
								<path d="M3 3l6 6M9 3l-6 6" />
							</svg>
						</button>
					)}

					{view.crumbs.map((crumb) => (
						<button
							type="button"
							key={`crumb-${crumb.level}`}
							class="pill is-crumb"
							onclick={() => apply(path.slice(0, crumb.level + 1))}
						>
							{crumb.node.label}
						</button>
					))}

					{view.crumbs.length > 0 && view.frontier.length > 0 && (
						<span class="sep" aria-hidden="true">
							<svg viewBox="0 0 24 24">
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</span>
					)}

					{view.frontier.map((node) => {
						const isActive = node.value === view.frontierChosen
						const pillClass = ['pill']
							.concat(isActive ? ['is-active'] : [])
							.concat(node.isDisabled ? ['is-disabled'] : [])
							.join(' ')
						return (
							<button
								type="button"
								key={node.value}
								class={pillClass}
								aria-pressed={isActive ? 'true' : 'false'}
								onclick={() => selectFrontier(node)}
							>
								{node.label}
							</button>
						)
					})}
				</div>
			</host>
		)
	},
	{
		props: {
			options: { type: Array },
			name: { type: String, reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			label: String,
			resetLabel: String,
			isDrilldown: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value?: string; path: string[] }>({ bubbles: true, composed: true })
		},
		styles,
		form: true
	}
)

defineFormElement('z-filter', ZFilter)
