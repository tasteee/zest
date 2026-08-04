// The playground, now an adapter over z-playground.
//
// What survives here is the one thing the element cannot know: which of a
// page's documented attributes deserve a knob, and what kind each one gets.
// That is derived from the page's own attribute table, so the controls and
// the API reference can never disagree.
//
// Everything else — building the controls, binding them to the instance,
// re-serializing the markup — moved into z-playground and z-control-panel.

import { createElement } from './zest-elements'
import type { ApiRowT, ComponentDocT, PlaygroundControlKindT, PlaygroundControlT } from '../component-docs/types'

// Attribute types are authored as human-readable unions ("solid | outline |
// ghost"), which doubles as the enum option list for free.
const parseUnionMembers = (type: string): string[] => {
	const hasUnion = type.includes('|')
	if (!hasUnion) return []

	const members = type.split('|').map((member) => member.trim())
	return members.filter((member) => member.length > 0)
}

const getControlKind = (type: string): PlaygroundControlKindT => {
	const normalizedType = type.trim().toLowerCase()
	if (normalizedType === 'boolean') return 'boolean'
	if (normalizedType === 'number') return 'number'

	const hasUnionMembers = parseUnionMembers(type).length > 0
	if (hasUnionMembers) return 'enum'

	return 'text'
}

// `is-hidden` exists on every component and toggling it would just blank the
// stage, which demonstrates nothing.
const isControllable = (attribute: ApiRowT, allowedNames: string[]): boolean => {
	const isVisibilityToggle = attribute.name === 'is-hidden'
	if (isVisibilityToggle) return false

	const hasAllowList = allowedNames.length > 0
	if (!hasAllowList) return true

	return allowedNames.includes(attribute.name)
}

const toPlaygroundControl = (attribute: ApiRowT): PlaygroundControlT => {
	const kind = getControlKind(attribute.type)
	const options = kind === 'enum' ? parseUnionMembers(attribute.type) : []

	return {
		name: attribute.name,
		kind,
		options,
		defaultValue: attribute.defaultValue,
		description: attribute.description
	}
}

const buildControls = (componentDoc: ComponentDocT): PlaygroundControlT[] => {
	const allowedNames = componentDoc.playground ? componentDoc.playground.controlNames : []
	const controllableAttributes = componentDoc.attributes.filter((attribute) => isControllable(attribute, allowedNames))
	return controllableAttributes.map(toPlaygroundControl)
}

type ZPlaygroundElementT = HTMLElement & {
	controls: PlaygroundControlT[]
}

export const buildPlayground = (componentDoc: ComponentDocT): HTMLElement | null => {
	if (!componentDoc.playground) return null

	const stageElement = componentDoc.playground.buildElement()
	stageElement.setAttribute('slot', 'stage')

	const playground = createElement('z-playground') as ZPlaygroundElementT
	playground.setAttribute('tag-name', componentDoc.tag)
	playground.controls = buildControls(componentDoc)
	playground.append(stageElement)

	return playground
}
