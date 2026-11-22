import { describe, expect, it } from 'vitest'
import { enabledIndicesOf, findPath, flattenOptionGroups, nodeAt, segmentByGroup, siblingsOf, valuesAlong } from '../shared/nested-options'
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

describe('headed groups', () => {
	const sound = [
		{ value: 'midi', label: 'MIDI output' },
		{ value: 'keys', label: 'Keys', isGroup: true, children: [
			{ value: 'grand-piano', label: 'Grand Piano' },
			{ value: 'organ', label: 'Organ', isDisabled: true }
		] },
		{ value: 'bass', label: 'Bass', isGroup: true, children: [{ value: 'sub-bass', label: 'Sub Bass' }] }
	]

	it('flattens group children into the same level, tagged with the group', () => {
		const result = flattenOptionGroups(sound)
		expect(result.options.map((option) => option.value)).toEqual(['midi', 'grand-piano', 'organ', 'sub-bass'])
		expect(result.options[1].groupLabel).toBe('Keys')
		expect(result.options[3].groupLabel).toBe('Bass')
		expect(result.options[0].groupId).toBeUndefined()
		expect(result.hasEmptyGroup).toBe(false)
	})

	it('a group is never a step of the path', () => {
		const flat = flattenOptionGroups(sound).options
		expect(findPath(flat, 'sub-bass')).toEqual([3])
		expect(valuesAlong(flat, [3])).toEqual(['sub-bass'])
		expect(enabledIndicesOf(flat)).toEqual([0, 1, 3])
	})

	it('segments consecutive options by group', () => {
		const segments = segmentByGroup(flattenOptionGroups(sound).options)
		expect(segments.map((segment) => [segment.groupLabel, segment.entries.length])).toEqual([[undefined, 1], ['Keys', 2], ['Bass', 1]])
	})

	it('drops and reports a group with no children', () => {
		const result = flattenOptionGroups([{ value: 'x', label: 'Empty', isGroup: true }, { value: 'a', label: 'A' }])
		expect(result.options.map((option) => option.value)).toEqual(['a'])
		expect(result.hasEmptyGroup).toBe(true)
	})

	it('groups inside a branch are flattened within that branch', () => {
		const tree = [{ value: 'synths', label: 'Synths', children: [
			{ value: 'leads', label: 'Leads', isGroup: true, children: [{ value: 'saw', label: 'Saw Lead' }] }
		] }]
		const flat = flattenOptionGroups(tree).options
		expect(flat[0].children?.map((child) => child.value)).toEqual(['saw'])
		expect(findPath(flat, 'saw')).toEqual([0, 0])
	})
})

