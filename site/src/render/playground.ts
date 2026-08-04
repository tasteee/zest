// The playground: one live instance of the component with a control per
// documented attribute, and the resulting markup echoed underneath.
//
// Controls are derived from the page's own attribute table, so the knobs and
// the API reference can never disagree. This module only decides *which*
// control each attribute deserves; building them is playground-controls.ts,
// shared with the markdown fallback.

import { buildCodeBlock, createElement } from './zest-elements'
import type { ZCodeBlockElementT } from './zest-elements'
import { buildControlsBand } from './playground-controls'
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

// The stage element's own markup is the output, minus the class the docs put
// on it for layout — readers should see what they'd paste, not our plumbing.
const getStageMarkup = (stageElement: HTMLElement): string => {
	const copy = stageElement.cloneNode(true) as HTMLElement
	copy.removeAttribute('class')
	return copy.outerHTML
}

export const buildPlayground = (componentDoc: ComponentDocT): HTMLElement | null => {
	if (!componentDoc.playground) return null

	const stageElement = componentDoc.playground.buildElement()
	const controls = buildControls(componentDoc)

	const playground = createElement('z-surface', 'playground')
	playground.setAttribute('level', '1')
	playground.setAttribute('radius', 'lg')
	playground.setAttribute('inset', '0')
	playground.setAttribute('has-border', '')

	const stage = createElement('div', 'playgroundStage')
	stage.append(stageElement)

	const output = createElement('div', 'playgroundOutput')
	const codeBlock = buildCodeBlock({ code: '', language: 'html', filename: '', hasCopyButton: true }) as ZCodeBlockElementT
	output.append(codeBlock)

	const refreshOutput = (): void => {
		codeBlock.code = getStageMarkup(stageElement)
	}
	refreshOutput()

	playground.append(stage)

	const hasControls = controls.length > 0
	if (hasControls) playground.append(buildControlsBand(stageElement, controls, refreshOutput))

	playground.append(output)
	return playground
}
