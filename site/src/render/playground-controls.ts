// The playground control band, shared by both doc rendering paths.
//
// Every knob is a real zest form element — z-select, z-number-input,
// z-switch, z-input — each wrapped in z-field. The docs drive the library
// with the library, so a control that looks wrong here is a component bug
// the maintainer sees before the user does.
//
// This lives apart from either playground because there are two of them: the
// TypeScript component pages and the markdown fallback. They were drifting —
// the fallback had grown its own native <select>/<input>/<label> set, which
// is how a docs site quietly stops dogfooding its own design system.

import { createElement } from './zest-elements'
import type { PlaygroundControlKindT } from '../component-docs/types'

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

// The shape both callers can satisfy: the TypeScript pages' PlaygroundControlT
// and the markdown parser's AttributeControlT are each structurally assignable
// to this.
export type PlaygroundControlInputT = {
	name: string
	kind: PlaygroundControlKindT
	options: string[]
	defaultValue: string | null
	description: string
}

// Attribute tables use an em dash to mean "no default". It must never reach a
// control as a literal value.
const NO_DEFAULT_MARKER = '—'

const readDeclaredDefault = (defaultValue: string | null): string => {
	if (!defaultValue) return ''

	const trimmedDefault = defaultValue.trim()
	const isMarker = trimmedDefault === NO_DEFAULT_MARKER
	if (isMarker) return ''

	return trimmedDefault
}

const applyStageValue = (stageElement: Element, control: PlaygroundControlInputT, nextValue: string, onChange: () => void): void => {
	const hasValue = nextValue.trim() !== ''
	if (hasValue) stageElement.setAttribute(control.name, nextValue)
	if (!hasValue) stageElement.removeAttribute(control.name)
	onChange()
}

const buildSwitchControl = (stageElement: Element, control: PlaygroundControlInputT, onChange: () => void): HTMLElement => {
	const toggle = createElement('z-switch') as ZSwitchElementT
	toggle.setAttribute('size', 'sm')
	toggle.isChecked = stageElement.hasAttribute(control.name)

	// z-field names its control by assigning a `label` property, which every
	// other control here declares. z-switch takes its label through the
	// default slot instead, so the assignment would land on nothing — name it
	// directly and z-field will leave it alone.
	toggle.setAttribute('aria-label', control.name)

	toggle.addEventListener('change', (changeEvent) => {
		const detail = (changeEvent as CustomEvent<{ checked: boolean }>).detail
		if (detail.checked) stageElement.setAttribute(control.name, '')
		if (!detail.checked) stageElement.removeAttribute(control.name)
		onChange()
	})

	return toggle
}

const buildSelectControl = (stageElement: Element, control: PlaygroundControlInputT, onChange: () => void): HTMLElement => {
	const select = createElement('z-select') as ZSelectElementT
	select.setAttribute('size', 'sm')

	const unsetOption: ZSelectOptionT = { value: '', label: 'unset' }
	const valueOptions: ZSelectOptionT[] = control.options.map((option) => {
		return { value: option, label: option }
	})
	select.options = [unsetOption, ...valueOptions]

	const currentValue = stageElement.getAttribute(control.name)
	select.value = currentValue ?? readDeclaredDefault(control.defaultValue)

	select.addEventListener('change', (changeEvent) => {
		const detail = (changeEvent as CustomEvent<{ value: string }>).detail
		applyStageValue(stageElement, control, detail.value, onChange)
	})

	return select
}

const buildNumberControl = (stageElement: Element, control: PlaygroundControlInputT, onChange: () => void): HTMLElement => {
	const input = createElement('z-number-input') as ZNumberInputElementT
	input.setAttribute('size', 'sm')

	// Nudging a value one step at a time is most of what a reader does with a
	// numeric knob, and the field is compact by default — stretch it so the
	// steppers have somewhere to sit and the column lines up with the selects.
	input.setAttribute('has-stepper-buttons', '')
	input.setAttribute('is-full-width', '')

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

const buildTextControl = (stageElement: Element, control: PlaygroundControlInputT, onChange: () => void): HTMLElement => {
	const input = createElement('z-input') as ZInputElementT
	input.setAttribute('size', 'sm')

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

const buildControlInput = (stageElement: Element, control: PlaygroundControlInputT, onChange: () => void): HTMLElement => {
	if (control.kind === 'boolean') return buildSwitchControl(stageElement, control, onChange)
	if (control.kind === 'enum') return buildSelectControl(stageElement, control, onChange)
	if (control.kind === 'number') return buildNumberControl(stageElement, control, onChange)
	return buildTextControl(stageElement, control, onChange)
}

// z-field, not a bare z-label beside the control. Two reasons, and the
// second is the one that matters: a standalone label cannot name any of
// these controls, because their interactive element sits behind a shadow
// boundary — z-field forwards the name across it. And its control band
// vertically centres whatever is slotted at a fixed height, which is what
// lets a switch line up with a select instead of hanging off to one side.
const buildControlField = (stageElement: Element, control: PlaygroundControlInputT, onChange: () => void): HTMLElement => {
	const field = createElement('z-field', `playgroundField is-${control.kind}`)
	field.setAttribute('label', control.name)

	// Every control in the band is size="small"; without this the field
	// reserves a medium control row and each knob floats in its own gap.
	field.setAttribute('size', 'sm')

	field.append(buildControlInput(stageElement, control, onChange))
	return field
}

export const buildControlsBand = (stageElement: Element, controls: PlaygroundControlInputT[], onChange: () => void): HTMLElement => {
	const band = createElement('div', 'playgroundControls')

	for (const control of controls) {
		band.append(buildControlField(stageElement, control, onChange))
	}

	return band
}
