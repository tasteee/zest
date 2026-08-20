import { defineElement } from '../shared/define-element'
import { c, css, event } from 'atomico'

/*
 * z-control-panel — the knob rack.
 *
 *   panel.controls = [
 *     { name: 'size', kind: 'enum', options: ['xs', 'sm', 'md'], defaultValue: 'md' },
 *     { name: 'disabled', kind: 'boolean' }
 *   ]
 *   panel.values = { size: 'sm' }
 *   panel.addEventListener('change', (e) => e.detail)  // { name, value }
 *
 * Every knob is a real zest form element wrapped in z-field, which is the
 * point: the docs drive the library with the library, so a control that looks
 * wrong here is a component bug the maintainer meets before the user does.
 *
 * z-field rather than a bare label beside the control, for a reason that only
 * shows up with custom elements — the interactive element sits behind a shadow
 * boundary, so a standalone <label> cannot name it. z-field forwards the name
 * across. Its fixed-height control band is also what lets a switch line up
 * with a select instead of hanging off to one side.
 *
 * This is a controlled component: it renders `values` and emits `change`. It
 * never mutates anything itself, so a host can veto, transform, or replay any
 * change without fighting internal state.
 *
 * A `null` value in `change` means "unset it" — distinct from the empty
 * string, which is what a present-but-valueless boolean attribute holds.
 */
export type ControlKindT = 'boolean' | 'enum' | 'number' | 'text'

export type ControlT = {
	name: string
	kind: ControlKindT
	options?: string[]
	defaultValue?: string
	description?: string
}

// Attribute tables use an em dash for "no default". It must never reach a
// control as a literal value.
const NO_DEFAULT_MARKER = '—'

const readDeclaredDefault = (defaultValue?: string): string => {
	if (!defaultValue) return ''

	const trimmed = defaultValue.trim()
	const isMarker = trimmed === NO_DEFAULT_MARKER
	if (isMarker) return ''

	return trimmed
}

const styles = css`
	:host {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
		gap: var(--space-base);
	}

	:host([is-hidden]) {
		display: none;
	}

	/* A switch is a fixed-width object, so its field would otherwise stretch
	   to a full column and strand the control on the left. */
	z-field[data-kind='boolean'] {
		align-self: start;
	}
`

const readControls = (value: unknown): ControlT[] => {
	if (!Array.isArray(value)) return []

	const controls: ControlT[] = []
	for (const entry of value) {
		const hasShape = entry && typeof entry.name === 'string' && typeof entry.kind === 'string'
		if (hasShape) controls.push(entry as ControlT)
	}
	return controls
}

const readValues = (value: unknown): Record<string, string> => {
	const isObject = value && typeof value === 'object'
	if (!isObject) return {}
	return value as Record<string, string>
}

export const ZControlPanel = c(
	(props) => {
		const controls = readControls(props.controls)
		const values = readValues(props.values)

		const emit = (name: string, nextValue: string | null) => {
			props.change({ name, value: nextValue })
		}

		const buildBooleanControl = (control: ControlT) => {
			// Boolean HTML attributes are true by presence. Their serialized value
			// is intentionally the empty string, so truthiness would read them as off.
			const isChecked = Object.prototype.hasOwnProperty.call(values, control.name)

			return (
				<z-switch
					size='sm'
					aria-label={control.name}
					isChecked={isChecked}
					onchange={(changeEvent: CustomEvent<{ checked: boolean }>) => {
						changeEvent.stopPropagation()
						emit(control.name, changeEvent.detail.checked ? '' : null)
					}}
				/>
			)
		}

		const buildEnumControl = (control: ControlT) => {
			const optionValues = control.options || []
			const options = [{ value: '', label: 'unset' }]
			for (const option of optionValues) options.push({ value: option, label: option })

			const current = values[control.name] ?? readDeclaredDefault(control.defaultValue)

			return (
				<z-select
					size='sm'
					options={options}
					value={current}
					onchange={(changeEvent: CustomEvent<{ value: string }>) => {
						changeEvent.stopPropagation()
						emit(control.name, changeEvent.detail.value)
					}}
				/>
			)
		}

		const buildNumberControl = (control: ControlT) => {
			const declaredDefault = readDeclaredDefault(control.defaultValue)
			const current = values[control.name] ?? declaredDefault
			const parsed = Number(current)
			const isUsable = current !== '' && Number.isFinite(parsed)

			return (
				<z-number-input
					size='sm'
					has-stepper-buttons
					is-full-width
					placeholder={declaredDefault}
					value={isUsable ? parsed : undefined}
					oninput={(inputEvent: CustomEvent<{ value: number | null }>) => {
						inputEvent.stopPropagation()
						const next = inputEvent.detail.value
						emit(control.name, next === null ? '' : String(next))
					}}
				/>
			)
		}

		const buildTextControl = (control: ControlT) => {
			const declaredDefault = readDeclaredDefault(control.defaultValue)
			const current = values[control.name] ?? declaredDefault

			return (
				<z-input
					size='sm'
					placeholder={declaredDefault || control.name}
					value={current}
					oninput={(inputEvent: CustomEvent<{ value: string }>) => {
						inputEvent.stopPropagation()
						emit(control.name, inputEvent.detail.value)
					}}
				/>
			)
		}

		const buildControl = (control: ControlT) => {
			if (control.kind === 'boolean') return buildBooleanControl(control)
			if (control.kind === 'enum') return buildEnumControl(control)
			if (control.kind === 'number') return buildNumberControl(control)
			return buildTextControl(control)
		}

		return (
			<host shadowDom>
				{controls.map((control) => (
					<z-field key={control.name} label={control.name} size='sm' data-kind={control.kind}>
						{buildControl(control)}
					</z-field>
				))}
			</host>
		)
	},
	{
		props: {
			controls: { type: Array },
			values: { type: Object },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ name: string; value: string | null }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-control-panel', ZControlPanel)
