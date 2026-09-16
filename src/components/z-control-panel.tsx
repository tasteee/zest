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
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
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

// Accept only component payloads, never native UIEvent detail values.
const readComponentDetail = <DetailT,>(candidateEvent: Event): DetailT | null => {
	const detail = (candidateEvent as CustomEvent).detail
	const isComponentDetail = Boolean(detail) && typeof detail === 'object'
	if (!isComponentDetail) return null

	return detail as DetailT
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
			const declaredDefault = readDeclaredDefault(control.defaultValue)
			// The unset option must show as selected when the attribute is
			// genuinely absent — falling back to the default *value* here would
			// make the control look like it forced itself back to that option,
			// rather than showing that unset resolves to it.
			const unsetLabel = declaredDefault ? `unset (${declaredDefault})` : 'unset'
			const options = [{ value: '', label: unsetLabel }]
			for (const option of optionValues) options.push({ value: option, label: option })

			const current = values[control.name] ?? ''

			return (
				<z-select
					size='sm'
					options={options}
					value={current}
					onchange={(changeEvent: CustomEvent<{ value: string }>) => {
						changeEvent.stopPropagation()
						emit(control.name, changeEvent.detail.value || null)
					}}
				/>
			)
		}

		const buildNumberControl = (control: ControlT) => {
			const declaredDefault = readDeclaredDefault(control.defaultValue)
			const current = values[control.name] ?? ''
			const parsed = Number(current)
			const isUsable = current !== '' && Number.isFinite(parsed)

			return (
				<z-number-input
					size='sm'
					has-stepper-buttons
					is-full-width
					placeholder={declaredDefault}
					value={isUsable ? parsed : undefined}
					oninput={(inputEvent: Event) => {
						inputEvent.stopPropagation()
						const detail = readComponentDetail<{ value: number | null; rawValue: string }>(inputEvent)
						if (!detail) return

						const next = detail.value
						if (next !== null && Number.isFinite(next)) emit(control.name, String(next))
						else if (detail.rawValue === '') emit(control.name, null)
					}}
					// Translate committed steps and blur corrections into the panel contract.
					onchange={(changeEvent: Event) => {
						changeEvent.stopPropagation()
						const detail = readComponentDetail<{ value: number }>(changeEvent)
						if (detail && Number.isFinite(detail.value)) emit(control.name, String(detail.value))
					}}
				/>
			)
		}

		const buildTextControl = (control: ControlT) => {
			const declaredDefault = readDeclaredDefault(control.defaultValue)
			const current = values[control.name] ?? ''

			return (
				<z-input
					size='sm'
					placeholder={declaredDefault || control.name}
					value={current}
					oninput={(inputEvent: Event) => {
						inputEvent.stopPropagation()
						const detail = readComponentDetail<{ value: string }>(inputEvent)
						if (!detail) return

						emit(control.name, detail.value === '' ? null : detail.value)
					}}
					// z-input also fires its own `change` on blur (real-form semantics,
					// shaped { value } with no `name`); keep it inside the panel.
					onchange={(changeEvent: Event) => changeEvent.stopPropagation()}
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
