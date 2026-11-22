/*
 * Helpers for z-select's nested options: a recursive `{ value, label,
 * isDisabled?, children? }` tree addressed by index paths (`[1, 0]` is the
 * first child of the second root option).
 */

export type NestedOptionT = {
	value: string
	label: string
	isDisabled?: boolean
	children?: NestedOptionT[]
	/**
	 * A headed group instead of a branch: its children are shown inline at
	 * this level under a non-selectable heading (the label). The group's own
	 * value is never committed.
	 */
	isGroup?: boolean
}

/** An option after groups are flattened: which group it sits in, if any. */
export type FlatOptionT = NestedOptionT & {
	groupId?: string
	groupLabel?: string
	children?: FlatOptionT[]
}

export type FlattenResultT = { options: FlatOptionT[]; hasEmptyGroup: boolean }

/*
 * Replaces every headed group with its children, spliced in at the group's
 * level and tagged with the group's id and label. Branches keep drilling down
 * and are flattened the same way inside. Everything that walks options (paths,
 * keyboard, typeahead, valuesAlong) then sees plain levels, so a group never
 * becomes a step of the path.
 */
export const flattenOptionGroups = (options: NestedOptionT[]): FlattenResultT => {
	let groupCount = 0
	let hasEmptyGroup = false
	const flattenLevel = (nodes: NestedOptionT[]): FlatOptionT[] => {
		const flat: FlatOptionT[] = []
		for (const node of nodes) {
			const isGroupNode = Boolean(node.isGroup)
			if (isGroupNode && !hasChildren(node)) {
				hasEmptyGroup = true
				continue
			}
			if (isGroupNode) {
				groupCount += 1
				const groupId = `group-${groupCount}`
				for (const child of flattenLevel(node.children ?? [])) flat.push({ ...child, groupId, groupLabel: node.label })
				continue
			}
			const children = node.children ? flattenLevel(node.children) : undefined
			flat.push({ ...node, children })
		}
		return flat
	}
	const flatOptions = flattenLevel(options)
	return { options: flatOptions, hasEmptyGroup }
}

export type OptionSegmentT = { groupId?: string; groupLabel?: string; entries: Array<{ option: FlatOptionT; index: number }> }

/** Consecutive options of one level, split wherever the group changes. */
export const segmentByGroup = (nodes: FlatOptionT[]): OptionSegmentT[] => {
	const segments: OptionSegmentT[] = []
	for (const [index, option] of nodes.entries()) {
		const last = segments[segments.length - 1]
		const isSameGroup = Boolean(last) && last.groupId === option.groupId
		if (isSameGroup) {
			last.entries.push({ option, index })
			continue
		}
		segments.push({ groupId: option.groupId, groupLabel: option.groupLabel, entries: [{ option, index }] })
	}
	return segments
}

export const hasChildren = (option: NestedOptionT | undefined): boolean => Boolean(option?.children?.length)

/** The option a path points at, or undefined when the path leaves the tree. */
export const nodeAt = (options: NestedOptionT[], path: number[]): NestedOptionT | undefined => {
	let nodes: NestedOptionT[] | undefined = options
	let node: NestedOptionT | undefined
	for (const index of path) {
		node = nodes?.[index]
		if (!node) return undefined
		nodes = node.children
	}
	return node
}

/** The sibling list a path lives in (the roots for a one-entry path). */
export const siblingsOf = (options: NestedOptionT[], path: number[]): NestedOptionT[] =>
	path.length <= 1 ? options : nodeAt(options, path.slice(0, -1))?.children ?? []

/** Index path to the first option carrying `value`, depth-first. */
export const findPath = (options: NestedOptionT[], value: unknown): number[] | undefined => {
	if (value == null || value === '') return undefined
	for (let index = 0; index < options.length; index++) {
		const option = options[index]
		if (option.value === value) return [index]
		const inner = option.children ? findPath(option.children, value) : undefined
		if (inner) return [index, ...inner]
	}
	return undefined
}

/** The option values along a path, root first. */
export const valuesAlong = (options: NestedOptionT[], path: number[]): string[] =>
	path.flatMap((_, depth) => nodeAt(options, path.slice(0, depth + 1))?.value ?? [])

/** Indices of the options in a list that can take focus. */
export const enabledIndicesOf = (nodes: NestedOptionT[]): number[] =>
	nodes.flatMap((node, index) => node.isDisabled ? [] : [index])
