// The playground: one live instance of the component with a control per
// documented attribute, and the resulting markup echoed underneath.
//
// Controls are derived from the page's own attribute table, so the knobs and
// the API reference can never disagree. The controls themselves are zest form
// elements — the docs drive the library with the library.

import { buildCodeBlock, buildLabel, createElement } from './zest-elements'
import type { ZCodeBlockElementT } from './zest-elements'
import type { ApiRowT, ComponentDocT, PlaygroundControlKindT, PlaygroundControlT } from '../component-docs/types'

type ZSelectOptionT = {
	value: string
	label: string
}

type ZSelectElementT = HTMLElement & {
	options: ZSelectOptionT[]
	value: string
}

type ZSwitchElementT = HTMLElement & {
	isChecked: boolean
}

type ZInputElementT = HTMLElement & {
	value: string
}

// z-number-input declares `value` as a Number prop, and Atomico throws a
// PropError on a wrong-typed assignment — so this genuinely has to be a
// number, not a numeric string.
type ZNumberInputElementT = HTMLElement & {
	value: number
}

// Attribute tables use an em dash to mean "no default". It must never reach a
// control as a literal value.
const NO_DEFAULT_MARKER = '—'

const readDeclaredDefault = (defaultValue: string): string => {
	const isMarker = defaultValue.trim() === NO_DEFAULT_MARKER
	if (isMarker) return ''
	return defaultValue.trim()
}

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

const buildSwitchControl = (stageElement: HTMLElement, control: PlaygroundControlT, onChange: () => void): HTMLElement => {
	const toggle = createElement('z-switch') as ZSwitchElementT
	toggle.setAttribute('size', 'small')
	toggle.isChecked = stageElement.hasAttribute(control.name)

	toggle.addEventListener('change', (changeEvent) => {
		const detail = (changeEvent as CustomEvent<{ checked: boolean }>).detail
		if (detail.checked) stageElement.setAttribute(control.name, '')
		if (!detail.checked) stageElement.removeAttribute(control.name)
		onChange()
	})

	return toggle
}

const buildSelectControl = (stageElement: HTMLElement, control: PlaygroundControlT, onChange: () => void): HTMLElement => {
	const select = createElement('z-select') as ZSelectElementT
	select.setAttribute('size', 'small')

	const unsetOption: ZSelectOptionT = { value: '', label: 'unset' }
	const valueOptions: ZSelectOptionT[] = control.options.map((option) => {
		return { value: option, label: option }
	})
	select.options = [unsetOption, ...valueOptions]

	const currentValue = stageElement.getAttribute(control.name)
	select.value = currentValue ?? readDeclaredDefault(control.defaultValue)

	select.addEventListener('change', (changeEvent) => {
		const detail = (changeEvent as CustomEvent<{ value: string }>).detail
		const hasValue = detail.value !== ''
		if (hasValue) stageElement.setAttribute(control.name, detail.value)
		if (!hasValue) stageElement.removeAttribute(control.name)
		onChange()
	})

	return select
}

const applyStageValue = (stageElement: HTMLElement, control: PlaygroundControlT, nextValue: string, onChange: () => void): void => {
	const hasValue = nextValue.trim() !== ''
	if (hasValue) stageElement.setAttribute(control.name, nextValue)
	if (!hasValue) stageElement.removeAttribute(control.name)
	onChange()
}

const buildNumberControl = (stageElement: HTMLElement, control: PlaygroundControlT, onChange: () => void): HTMLElement => {
	const input = createElement('z-number-input') as ZNumberInputElementT
	input.setAttribute('size', 'small')

	const declaredDefault = readDeclaredDefault(control.defaultValue)
	if (declaredDefault) input.setAttribute('placeholder', declaredDefault)

	const currentValue = stageElement.getAttribute(control.name) ?? declaredDefault
	const parsedValue = Number(currentValue)
	const isUsableNumber = currentValue !== '' && Number.isFinite(parsedValue)
	if (isUsableNumber) input.value = parsedValue

	input.addEventListener('input', (inputEvent) => {
		const detail = (inputEvent as CustomEvent<{ value: number | null }>).detail
		const nextValue = detail.value === null ? '' : String(detail.value)
		applyStageValue(stageElement, control, nextValue, onChange)
	})

	return input
}

const buildTextControl = (stageElement: HTMLElement, control: PlaygroundControlT, onChange: () => void): HTMLElement => {
	const input = createElement('z-input') as ZInputElementT
	input.setAttribute('size', 'small')

	const declaredDefault = readDeclaredDefault(control.defaultValue)
	input.setAttribute('placeholder', declaredDefault || control.name)

	const currentValue = stageElement.getAttribute(control.name) ?? declaredDefault
	if (currentValue) input.value = currentValue

	input.addEventListener('input', (inputEvent) => {
		const detail = (inputEvent as CustomEvent<{ value: string }>).detail
		applyStageValue(stageElement, control, detail.value, onChange)
	})

	return input
}

const buildControlInput = (stageElement: HTMLElement, control: PlaygroundControlT, onChange: () => void): HTMLElement => {
	if (control.kind === 'boolean') return buildSwitchControl(stageElement, control, onChange)
	if (control.kind === 'enum') return buildSelectControl(stageElement, control, onChange)
	if (control.kind === 'number') return buildNumberControl(stageElement, control, onChange)
	return buildTextControl(stageElement, control, onChange)
}

const buildControlField = (stageElement: HTMLElement, control: PlaygroundControlT, onChange: () => void): HTMLElement => {
	const field = createElement('div', `playgroundField is-${control.kind}`)
	const fieldLabel = buildLabel(control.name, 'xs', 'muted')
	fieldLabel.classList.add('playgroundFieldLabel')

	field.append(fieldLabel, buildControlInput(stageElement, control, onChange))
	return field
}

const buildControlsBand = (stageElement: HTMLElement, controls: PlaygroundControlT[], onChange: () => void): HTMLElement => {
	const band = createElement('div', 'playgroundControls')
	for (const control of controls) {
		band.append(buildControlField(stageElement, control, onChange))
	}
	return band
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
	playground.setAttribute('border', '')

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
