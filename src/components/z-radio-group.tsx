import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { c, css, event, useEffect, useHost, useListener, useProp, useRef } from 'atomico'

/*
 * z-radio-group — coordinates single-selection across slotted z-radio items.
 * Listens for the bubbling `select` event, clears every other radio, and
 * re-emits a `change` with the chosen value. Mirrors z-toggle-button-group's model.
 *
 * `value` is the single source of truth in both directions. Set it and the
 * matching child is checked for you; leave it unset and the group adopts
 * whichever child was seeded with `is-checked`. Either way, reading `value`
 * afterwards tells the truth.
 *
 * The group, not the radios, is the form participant: it submits `value`
 * under its `name`, is what `is-required` validates, and forwards a form or
 * fieldset disabling to its children.
 */
const styles = css`
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		--z-radio-group-accent: var(--primary);
	}

	:host([accent='dom']) { --z-radio-group-accent: var(--purple); }
	:host([accent='sub']) { --z-radio-group-accent: var(--pink); }
	:host([accent='success']) { --z-radio-group-accent: var(--success); }
	:host([accent='warning']) { --z-radio-group-accent: var(--warning); }
	:host([accent='error']) { --z-radio-group-accent: var(--destructive); }

	:host([direction='horizontal']) {
		flex-direction: row;
		gap: var(--space-lg);
	}

	:host([is-hidden]) {
		display: none;
	}
`

type SelectDetailT = { value?: string }
type RadioElementT = HTMLElement & { isChecked?: boolean; isDisabled?: boolean; value?: string }

// A slotted child may not have upgraded yet when the group first reads it, so
// the attribute is the reliable fallback for its value.
const readRadioValue = (radio: RadioElementT): string | undefined => {
	if (radio.value != null) return radio.value
	return radio.getAttribute('value') ?? undefined
}

const readRadios = (host: HTMLElement): RadioElementT[] => {
	return [...host.querySelectorAll<RadioElementT>('z-radio')]
}

const findCheckedRadio = (radios: RadioElementT[]): RadioElementT | undefined => {
	return radios.find((radio) => radio.isChecked || radio.hasAttribute('is-checked'))
}

export const ZRadioGroup = c(
	(props) => {
		const host = useHost()
		const [value, setValue] = useProp<string>('value')
		const defaultValue = useRef(value)
		const hasValue = value != null && value !== ''
		const { isFormDisabled } = useFormControl({
			value: hasValue ? value : null,
			isDisabled: props.isDisabled,
			validity: props.isRequired && !hasValue
				? { flags: { valueMissing: true }, message: 'Please select one of these options.' }
				: { flags: {} },
			onReset: () => setValue(defaultValue.current),
			onRestore: (state) => { if (typeof state === 'string') setValue(state) }
		})
		const isDisabled = Boolean(props.isDisabled) || isFormDisabled

		// Disabling the group disables its radios, but only the ones it disabled
		// get re-enabled, so an individually disabled radio stays that way.
		const disabledByGroup = useRef(new Set<RadioElementT>())
		const syncDisabled = () => {
			const radios = readRadios(host.current)
			if (isDisabled) {
				for (const radio of radios) {
					if (radio.isDisabled || radio.hasAttribute('is-disabled')) continue
					radio.isDisabled = true
					disabledByGroup.current.add(radio)
				}
				return
			}
			for (const radio of disabledByGroup.current) radio.isDisabled = false
			disabledByGroup.current.clear()
		}
		useEffect(syncDisabled, [isDisabled])

		useListener(
			host,
			'select',
			(rawEvent: unknown) => {
				const zEvent = rawEvent as CustomEvent<SelectDetailT>
				const target = zEvent.target as RadioElementT

				for (const item of readRadios(host.current)) {
					if (item !== target) item.isChecked = false
				}

				setValue(zEvent.detail.value)
				props.change({ value: zEvent.detail.value })
			},
			{ passive: true }
		)

		// Keep the children and `value` agreeing, whichever one was set first.
		// Assigning isChecked does not re-fire `select`, so this cannot loop.
		const syncSelection = () => {
			const radios = readRadios(host.current)
			const hasRadios = radios.length > 0
			if (!hasRadios) return

			const hasValue = value != null && value !== ''
			if (!hasValue) {
				const checkedRadio = findCheckedRadio(radios)
				if (checkedRadio) setValue(readRadioValue(checkedRadio))
				return
			}

			for (const radio of radios) {
				radio.isChecked = readRadioValue(radio) === value
			}
		}

		useEffect(syncSelection, [value])
		const onSlotChange = () => { syncSelection(); syncDisabled() }

		return (
			<host shadowDom={{ delegatesFocus: true }} role="radiogroup" aria-label={props.label} aria-required={props.isRequired ? 'true' : undefined}>
				<slot onslotchange={onSlotChange} />
			</host>
		)
	},
	{
		props: {
			value: { type: String, reflect: true },
			name: { type: String, reflect: true },
			label: String,
			direction: { type: String, reflect: true },
			accent: { type: String, reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value?: string }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles],
		form: true
	}
)

defineFormElement('z-radio-group', ZRadioGroup)
