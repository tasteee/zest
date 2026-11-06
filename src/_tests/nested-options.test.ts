import { describe, expect, it } from 'vitest'
import { enabledIndicesOf, findPath, nodeAt, siblingsOf, valuesAlong } from '../shared/nested-options'
import type { NestedOptionT } from '../shared/nested-options'

const tree: NestedOptionT[] = [
	{ value: 'fruit', label: 'Fruit', children: [
		{ value: 'apple', label: 'Apple' },
		{ value: 'citrus', label: 'Citrus', children: [{ value: 'lemon', label: 'Lemon' }] }
	] },
	{ value: 'water', label: 'Water' },
	{ value: 'gone', label: 'Gone', isDisabled: true }
]

describe('nested options', () => {
	it('finds a value at any depth', () => {
		expect(findPath(tree, 'water')).toEqual([1])
		expect(findPath(tree, 'lemon')).toEqual([0, 1, 0])
		expect(findPath(tree, 'missing')).toBeUndefined()
		expect(findPath(tree, '')).toBeUndefined()
	})

	it('resolves paths to nodes, siblings and values', () => {
		expect(nodeAt(tree, [0, 1, 0])?.label).toBe('Lemon')
		expect(nodeAt(tree, [0, 5])).toBeUndefined()
		expect(siblingsOf(tree, [0, 1]).map((n) => n.value)).toEqual(['apple', 'citrus'])
		expect(siblingsOf(tree, [2])).toBe(tree)
		expect(valuesAlong(tree, [0, 1, 0])).toEqual(['fruit', 'citrus', 'lemon'])
	})

	it('skips disabled options when listing focusable ones', () => {
		expect(enabledIndicesOf(tree)).toEqual([0, 1])
	})
})
