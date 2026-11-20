import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { describableProps, useAccessibleName } from '../shared/accessible'
import { c, css, event, useEffect, useHost, useListener, useProp, useRef } from 'atomico'
import { listOf, oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import './z-chip'

/*
 * z-chip-group, a wrapping row of z-chip toggles with one value. Single
 * choice by default; `is-multiple` lets several stay selected, the
 * filter-row pattern.
 *
 * `value` is always a string[], in both modes, so its type never
 * changes under you: [] for nothing, ['a'] for one, ['a', 'b'] for many.
 * Set it and the chips follow; leave it unset and the group adopts the
 * chips seeded with `is-selected`.
 *
 * tone, size and kind set on the group reach every chip through the
 * --z-chip-* properties (see shared/chip-styles.tsx). A chip with its
 * own value keeps it.
 *
 * The group is the form participant: one entry per selected value under
 * its `name`. Arrow keys move focus between chips; Space toggles.
 */
const styles = css`
	:host {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='primary']) { --z-chip-accent: var(--accent-primary); }
	:host([tone='secondary']) { --z-chip-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-chip-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-chip-accent: var(--status-success); }
	:host([tone='warning']) { --z-chip-accent: var(--status-warning); }
	:host([tone='danger']) { --z-chip-accent: var(--status-danger); }

	:host([size='sm']) {
		--z-chip-height: 1.5rem;
		--z-chip-padding: var(--space-2-5);
		--z-chip-font-size: var(--font-size-xs);
		gap: var(--space-1-5);
	}
	:host([size='lg']) {
		--z-chip-height: 2.5rem;
		--z-chip-padding: var(--space-4);
		--z-chip-font-size: var(--font-size-md);
		gap: var(--space-2-5);
	}

	:host([kind='soft']) {
		--z-chip-rest-bg: var(--surface-subtle);
		--z-chip-rest-border: transparent;
	}
`

type ChipElementT = HTMLElement & { isSelected?: boolean; isDisabled?: boolean; value?: string }
type SelectDetailT = { value?: string; selected: boolean }

const readChips = (host: HTMLElement): ChipElementT[] => {
	return [...host.querySelectorAll<ChipElementT>('z-chip')]
}

const readChipValue = (chip: ChipElementT): string => {
	if (chip.value != null) return chip.value
	return chip.getAttribute('value') ?? chip.textContent?.trim() ?? ''
}

const isChipSelected = (chip: ChipElementT): boolean => {
	return Boolean(chip.isSelected) || chip.hasAttribute('is-selected')
}

const isChipDisabled = (chip: ChipElementT): boolean => {
	return Boolean(chip.isDisabled) || chip.hasAttribute('is-disabled')
}

const readSelectedValues = (host: HTMLElement): string[] => {
	const selectedChips = readChips(host).filter(isChipSelected)
	return selectedChips.map(readChipValue)
}

const buildFormValue = (name: string, values: string[]): FormData | null => {
	const isEmpty = values.length === 0
	if (isEmpty) return null
	const formData = new FormData()
	for (const value of values) formData.append(name, value)
	return formData
}

const getArrowStep = (key: string): number => {
	const isForward = key === 'ArrowRight' || key === 'ArrowDown'
	if (isForward) return 1
	const isBackward = key === 'ArrowLeft' || key === 'ArrowUp'
	if (isBackward) return -1
	return 0
}

export const ZChipGroup = c(
	(props) => {
		const t = useLocale()
		const host = useHost()
		const accessibleName = useAccessibleName(props.label)
		const [value, setValue] = useProp<string[]>('value')
		const defaultValue = useRef<string[] | null>(null)
		const disabledByGroup = useRef(new Set<ChipElementT>())

		const hasValue = Array.isArray(value)
		const selectedValues = hasValue ? value : []
		const isEmpty = selectedValues.length === 0
		const isMissing = Boolean(props.isRequired) && isEmpty
		const formName = host.current.getAttribute('name') ?? ''

		const chips = readChips(host.current)
		const firstEnabledChip = chips.find((chip) => !isChipDisabled(chip))
		const anchorRef = { current: firstEnabledChip }

		const missingValidity = { flags: { valueMissing: true }, message: t('selectOneOfTheseOptions') }
		const validValidity = { flags: {} }

		const formControl = useFormControl({
			value: buildFormValue(formName, selectedValues),
			isDisabled: props.isDisabled,
			control: anchorRef,
			validity: isMissing ? missingValidity : validValidity,
			onReset: () => setValue(defaultValue.current ?? []),
			onRestore: (state) => {
				const isFormData = state instanceof FormData
				if (!isFormData) return
				setValue(state.getAll(formName).map(String))
			}
		})
		const isDisabled = Boolean(props.isDisabled) || formControl.isFormDisabled

		const syncDisabled = () => {
			if (isDisabled) {
				for (const chip of readChips(host.current)) {
					if (isChipDisabled(chip)) continue
					chip.isDisabled = true
					disabledByGroup.current.add(chip)
				}
				return
			}
			for (const chip of disabledByGroup.current) chip.isDisabled = false
			disabledByGroup.current.clear()
		}

		useEffect(syncDisabled, [isDisabled])

		// Keep the chips and `value` agreeing, whichever was set first.
		const syncSelection = () => {
			const currentChips = readChips(host.current)
			const hasChips = currentChips.length > 0
			if (!hasChips) return

			if (!hasValue) {
				const seededValues = readSelectedValues(host.current)
				const allowedValues = props.isMultiple ? seededValues : seededValues.slice(0, 1)
				defaultValue.current = defaultValue.current ?? allowedValues
				setValue(allowedValues)
				return
			}

			defaultValue.current = defaultValue.current ?? selectedValues
			const wanted = new Set(selectedValues)
			for (const chip of currentChips) chip.isSelected = wanted.has(readChipValue(chip))
		}

		useEffect(syncSelection, [value, props.isMultiple])

		useListener(host, 'select', (rawEvent: unknown) => {
			const chipEvent = rawEvent as CustomEvent<SelectDetailT>
			const chip = chipEvent.target as ChipElementT
			const isFromChip = chip.localName === 'z-chip'
			if (!isFromChip) return
			chipEvent.stopPropagation()

			const isSingleSelection = !props.isMultiple && chipEvent.detail.selected
			if (isSingleSelection) {
				for (const other of readChips(host.current)) {
					if (other !== chip) other.isSelected = false
				}
			}

			const nextValues = readSelectedValues(host.current)
			setValue(nextValues)
			props.change({ value: nextValues })
		})

		// Arrow keys move focus only; Space and Enter on a chip toggle it.
		const handleKeyDown = (keyEvent: KeyboardEvent) => {
			const step = getArrowStep(keyEvent.key)
			if (!step) return
			const enabledChips = readChips(host.current).filter((chip) => !isChipDisabled(chip))
			const hasEnabledChips = enabledChips.length > 0
			if (!hasEnabledChips) return
			const focusedPosition = enabledChips.findIndex((chip) => chip.matches(':focus-within'))
			const isNothingFocused = focusedPosition < 0
			if (isNothingFocused) return
			keyEvent.preventDefault()
			const nextPosition = (focusedPosition + step + enabledChips.length) % enabledChips.length
			enabledChips[nextPosition].focus()
		}

		const forwardFocus = (focusEvent: FocusEvent) => {
			const isHostFocused = focusEvent.target === host.current
			if (!isHostFocused) return
			anchorRef.current?.focus()
		}

		const onSlotChange = () => {
			syncSelection()
			syncDisabled()
		}

		const descriptionParts = [props.description, props.error].filter(Boolean)
		const accessibleDescription = descriptionParts.join(' ') || undefined

		return (
			<host
				shadowDom
				role="group"
				tabindex="-1"
				onfocus={forwardFocus}
				onkeydown={handleKeyDown}
				aria-label={accessibleName}
				aria-description={accessibleDescription}
				aria-invalid={props.error ? 'true' : undefined}
			>
				<slot onslotchange={onSlotChange} />
			</host>
		)
	},
	{
		props: {
			...describableProps,
			value: { type: listOf<string>() },
			name: { type: String, reflect: true },
			label: String,
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			kind: { type: oneOf('outline', 'soft'), reflect: true },
			isMultiple: { type: Boolean, reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: string[] }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles],
		form: true
	}
)

defineFormElement('z-chip-group', ZChipGroup)
