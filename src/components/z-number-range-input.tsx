import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { describableProps, describedBy, renderDescriptions, srOnlyStyles, useAccessibleName } from '../shared/accessible'
import { c, css, event, useHost, useProp, useRef } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import './z-number-input'

/*
 * z-number-range-input, two number fields for a lower and an upper bound.
 *
 *   input.value = [10, 50]
 *
 * `min`, `max`, and `step` are the shared domain. The two fields never
 * cross: editing one past the other pins it to the other's value.
 * An empty field is `null`, so open-ended ranges work ([10, null]).
 *
 * Form-associated. Both values submit under one `name`, like a
 * multiple <select>: FormData.getAll(name) gives [lower, upper].
 * `input` / `change` carry { value: [lower, upper] }.
 */
const styles = css`
	:host { display: inline-block; width: fit-content; max-width: 100%; --tone: var(--accent-primary); }
	:host([is-full-width]) { display: block; width: 100%; }
	:host([is-hidden]) { display: none; }
	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	.row { display: flex; align-items: stretch; box-sizing: border-box; width: 100%; background: transparent; border: 1px solid var(--border-default); border-radius: var(--radius-md); color: var(--text-primary); overflow: hidden; transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.row.is-sm { height: var(--control-height-sm); font-size: var(--font-size-sm); }
	.row.is-md { height: var(--control-height-md); font-size: var(--font-size-sm); }
	.row.is-lg { height: var(--control-height-lg); font-size: var(--font-size-md); }
	.row:hover { border-color: color-mix(in oklch, var(--text-primary) 30%, transparent); }
	.row:focus-within { border-color: var(--tone); background: color-mix(in oklch, var(--tone) 5%, transparent); outline: 2px solid var(--border-focus); outline-offset: 2px; }
	.row.is-invalid { border-color: var(--status-danger); --tone: var(--status-danger); }
	.row.is-disabled { opacity: var(--control-disabled-opacity); pointer-events: none; }
	z-number-input { flex: 1 1 0; min-width: 0; }
	.separator { display: flex; align-items: center; padding-inline: var(--space-1); color: var(--text-secondary); user-select: none; -webkit-user-select: none; }
`

type BoundT = number | null
type RangeValueT = [BoundT, BoundT]

const toBound = (raw: unknown): BoundT => {
	if (raw == null || raw === '') return null
	const numeric = Number(raw)
	const isFiniteNumber = Number.isFinite(numeric)
	return isFiniteNumber ? numeric : null
}

const normalizeValue = (requested: unknown): RangeValueT => {
	const pair = Array.isArray(requested) ? requested : []
	return [toBound(pair[0]), toBound(pair[1])]
}

const isSamePair = (first: RangeValueT, second: unknown): boolean => {
	if (!Array.isArray(second)) return false
	return first[0] === second[0] && first[1] === second[1]
}

export const ZNumberRangeInput = c(
	(props) => {
		const host = useHost()
		const t = useLocale()
		const accessibleName = useAccessibleName(props.label)
		const [requestedValue, setRequestedValue] = useProp<RangeValueT>('value')
		const value = normalizeValue(requestedValue)
		const lowerValue = value[0]
		const upperValue = value[1]
		const defaultValue = useRef<RangeValueT | null>(null)
		const lowerRef = useRef<HTMLElement>()

		if (defaultValue.current === null) defaultValue.current = value

		const buildFormValue = () => {
			const data = new FormData()
			const name = host.current.getAttribute('name') ?? ''
			const hasLower = lowerValue !== null
			const hasUpper = upperValue !== null
			if (hasLower) data.append(name, String(lowerValue))
			if (hasUpper) data.append(name, String(upperValue))
			return data
		}

		const restoreFromForm = (state: unknown) => {
			const isFormData = state instanceof FormData
			if (!isFormData) return
			const name = host.current.getAttribute('name') ?? ''
			const restored = (state as FormData).getAll(name).map(Number)
			setRequestedValue([toBound(restored[0]), toBound(restored[1])])
		}

		const formControl = useFormControl({
			value: buildFormValue(),
			isDisabled: props.isDisabled,
			isReadonly: props.isReadonly,
			control: lowerRef,
			onReset: () => setRequestedValue(defaultValue.current as RangeValueT),
			onRestore: restoreFromForm
		})
		const isDisabled = props.isDisabled || formControl.isFormDisabled

		// Pins the edited bound to the other one so they never cross.
		const buildNextValue = (which: 'lower' | 'upper', bound: BoundT): RangeValueT => {
			const isLower = which === 'lower'
			const hasCrossedUpper = isLower && bound !== null && upperValue !== null && bound > upperValue
			if (hasCrossedUpper) return [upperValue, upperValue]
			const hasCrossedLower = !isLower && bound !== null && lowerValue !== null && bound < lowerValue
			if (hasCrossedLower) return [lowerValue, lowerValue]
			if (isLower) return [bound, upperValue]
			return [lowerValue, bound]
		}

		const handleBoundEvent = (which: 'lower' | 'upper', kind: 'input' | 'change', boundEvent: any) => {
			boundEvent.stopPropagation()
			const bound = toBound(boundEvent.detail?.value)
			const nextValue = buildNextValue(which, bound)
			const isUnchanged = isSamePair(nextValue, value)
			if (isUnchanged && kind === 'input') return
			setRequestedValue(nextValue)
			props[kind]({ value: nextValue })
		}

		const isInvalid = Boolean(props.isInvalid) || Boolean(props.error)
		const sizeName = props.size ?? 'md'
		const sizeClass = `is-${sizeName}`
		const invalidClass = isInvalid ? 'is-invalid' : ''
		const disabledClass = isDisabled ? 'is-disabled' : ''
		const rowClass = ['row', sizeClass, invalidClass, disabledClass].filter(Boolean).join(' ')
		const describedById = describedBy(props.description, props.error)

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<div class={rowClass} role="group" aria-label={accessibleName} aria-describedby={describedById}>
					<z-number-input
						ref={lowerRef}
						label={t('lowerValue')}
						value={lowerValue}
						min={props.min}
						max={upperValue ?? props.max}
						step={props.step}
						size={props.size}
						tone={props.tone}
						placeholder={props.lowerPlaceholder}
						valuePrefix={props.valuePrefix}
						valueSuffix={props.valueSuffix}
						isBorderless={true}
						isInvalid={isInvalid}
						isDisabled={isDisabled}
						isReadonly={props.isReadonly}
						isRequired={props.isRequired}
						hasStepperButtons={props.hasStepperButtons}
						oninput={(boundEvent: any) => handleBoundEvent('lower', 'input', boundEvent)}
						onchange={(boundEvent: any) => handleBoundEvent('lower', 'change', boundEvent)}
					/>
					<span class="separator" aria-hidden="true">{t('rangeSeparator')}</span>
					<z-number-input
						label={t('upperValue')}
						value={upperValue}
						min={lowerValue ?? props.min}
						max={props.max}
						step={props.step}
						size={props.size}
						tone={props.tone}
						placeholder={props.upperPlaceholder}
						valuePrefix={props.valuePrefix}
						valueSuffix={props.valueSuffix}
						isBorderless={true}
						isInvalid={isInvalid}
						isDisabled={isDisabled}
						isReadonly={props.isReadonly}
						isRequired={props.isRequired}
						hasStepperButtons={props.hasStepperButtons}
						oninput={(boundEvent: any) => handleBoundEvent('upper', 'input', boundEvent)}
						onchange={(boundEvent: any) => handleBoundEvent('upper', 'change', boundEvent)}
					/>
				</div>
				{renderDescriptions(props.description, props.error)}
			</host>
		)
	},
	{
		props: {
			...describableProps,
			value: { type: Array },
			min: { type: Number, reflect: true },
			max: { type: Number, reflect: true },
			step: { type: Number, reflect: true },
			label: String,
			name: { type: String, reflect: true },
			lowerPlaceholder: String,
			upperPlaceholder: String,
			valuePrefix: String,
			valueSuffix: String,
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isInvalid: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isReadonly: { type: Boolean, reflect: true },
			isRequired: { type: Boolean, reflect: true },
			hasStepperButtons: { type: Boolean, reflect: true },
			isFullWidth: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			input: event<{ value: RangeValueT }>({ bubbles: true, composed: true }),
			change: event<{ value: RangeValueT }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles, srOnlyStyles],
		form: true
	}
)

defineFormElement('z-number-range-input', ZNumberRangeInput)
