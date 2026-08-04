import { c, css, event, useEffect, useHost, useListener, useProp } from 'atomico'

/*
 * z-radio-group — coordinates single-selection across slotted z-radio items.
 * Listens for the bubbling `select` event, clears every other radio, and
 * re-emits a `change` with the chosen value. Mirrors z-toggle-group's model.
 *
 * `value` is the single source of truth in both directions. Set it and the
 * matching child is checked for you; leave it unset and the group adopts
 * whichever child was seeded with `is-checked`. Either way, reading `value`
 * afterwards tells the truth.
 */
const styles = css`
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	:host([direction='horizontal']) {
		flex-direction: row;
		gap: var(--space-lg);
	}

	:host([is-hidden]) {
		display: none;
	}
`

type SelectDetailT = { value?: string }
type RadioElementT = HTMLElement & { isChecked?: boolean; value?: string }

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

		return (
			<host shadowDom role="radiogroup" aria-label={props.label}>
				<slot onslotchange={syncSelection} />
			</host>
		)
	},
	{
		props: {
			value: { type: String, reflect: true },
			label: String,
			direction: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value?: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-radio-group', ZRadioGroup)
