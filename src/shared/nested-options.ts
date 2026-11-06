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
