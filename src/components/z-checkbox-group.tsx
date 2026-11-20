import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { describableProps, useAccessibleName } from '../shared/accessible'
import { c, css, event, useEffect, useHost, useListener, useProp, useRef } from 'atomico'
import { listOf, oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import type { ValidityFlagsT } from '../shared/form-control'
import './z-checkbox'

/*
 * z-checkbox-group, many-of-many selection across slotted z-checkbox
 * items. The sibling of z-radio-group: same layout, same tone, same
 * `value` contract, except `value` is a string[].
 *
 * `value` is the single source of truth in both directions. Set it and
 * the matching children are checked for you; leave it unset and the
 * group adopts whichever children were seeded with `is-checked`.
 *
 * The group, not the checkboxes, is the form participant. It submits one
 * entry per checked value under its `name`, is what `is-required`,
 * `min` and `max` validate, and forwards a form or fieldset disabling to
 * its children. Leave the children unnamed.
 *
 * `has-select-all` adds a parent checkbox above the list. It is checked
 * when every enabled child is, mixed when some are, and toggles them all.
 */
const styles = css`
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		--z-checkbox-group-accent: var(--accent-primary);
	}

	:host([tone='secondary']) { --z-checkbox-group-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-checkbox-group-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-checkbox-group-accent: var(--status-success); }
	:host([tone='warning']) { --z-checkbox-group-accent: var(--status-warning); }
	:host([tone='danger']) { --z-checkbox-group-accent: var(--status-danger); }

	:host([is-hidden]) {
		display: none;
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	:host([is-horizontal]) .items {
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-3) var(--space-6);
	}

	/* Children sit under the parent's label, so the hierarchy reads at a glance. */
	:host([has-select-all]:not([is-horizontal])) .items {
		padding-inline-start: calc(1.125rem + var(--space-2-5));
	}

	.select-all {
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--border-default);
	}
`

type CheckboxElementT = HTMLElement & { isChecked?: boolean; isIndeterminate?: boolean; isDisabled?: boolean; value?: string }
type SelectAllStateT = { isChecked: boolean; isIndeterminate: boolean }
type GroupValidityT = { flags: ValidityFlagsT; message?: string }

const readCheckboxes = (host: HTMLElement): CheckboxElementT[] => {
	return [...host.querySelectorAll<CheckboxElementT>('z-checkbox')]
}

// A slotted child may not have upgraded yet when the group first reads
// it, so the attribute is the reliable fallback for its state.
const readCheckboxValue = (checkbox: CheckboxElementT): string => {
	if (checkbox.value != null) return checkbox.value
	return checkbox.getAttribute('value') ?? 'on'
}

const isCheckboxChecked = (checkbox: CheckboxElementT): boolean => {
	return Boolean(checkbox.isChecked) || checkbox.hasAttribute('is-checked')
}

const isCheckboxDisabled = (checkbox: CheckboxElementT): boolean => {
	return Boolean(checkbox.isDisabled) || checkbox.hasAttribute('is-disabled')
}

const readCheckedValues = (host: HTMLElement): string[] => {
	const checkedBoxes = readCheckboxes(host).filter(isCheckboxChecked)
	return checkedBoxes.map(readCheckboxValue)
}

const getSelectAllState = (checkboxes: CheckboxElementT[]): SelectAllStateT => {
	const enabledBoxes = checkboxes.filter((checkbox) => !isCheckboxDisabled(checkbox))
	const checkedCount = enabledBoxes.filter(isCheckboxChecked).length
	const hasEnabled = enabledBoxes.length > 0
	const isAllChecked = hasEnabled && checkedCount === enabledBoxes.length
	const isSomeChecked = checkedCount > 0 && !isAllChecked
	return { isChecked: isAllChecked, isIndeterminate: isSomeChecked }
}

const buildFormValue = (name: string, values: string[]): FormData | null => {
	const isEmpty = values.length === 0
	if (isEmpty) return null
	const formData = new FormData()
	for (const value of values) formData.append(name, value)
	return formData
}

const areSameValues = (first: string[], second: string[]): boolean => {
	const isSameLength = first.length === second.length
	if (!isSameLength) return false
	return first.every((value, position) => value === second[position])
}

export const ZCheckboxGroup = c(
	(props) => {
		const t = useLocale()
		const host = useHost()
		const accessibleName = useAccessibleName(props.label)
		const [value, setValue] = useProp<string[]>('value')
		const defaultValue = useRef<string[] | null>(null)
		const disabledByGroup = useRef(new Set<CheckboxElementT>())

		const hasValue = Array.isArray(value)
		const selectedValues = hasValue ? value : []
		const selectedCount = selectedValues.length

		const getValidity = (): GroupValidityT => {
			const isEmpty = selectedCount === 0
			const isMissing = Boolean(props.isRequired) && isEmpty
			if (isMissing) return { flags: { valueMissing: true }, message: t('selectAtLeast', { min: props.min ?? 1 }) }
			if (isEmpty) return { flags: {} }
			const hasMin = typeof props.min === 'number'
			const isUnderMin = hasMin && selectedCount < (props.min as number)
			if (isUnderMin) return { flags: { rangeUnderflow: true }, message: t('selectAtLeast', { min: props.min as number }) }
			const hasMax = typeof props.max === 'number'
			const isOverMax = hasMax && selectedCount > (props.max as number)
			if (isOverMax) return { flags: { rangeOverflow: true }, message: t('selectAtMost', { max: props.max as number }) }
			return { flags: {} }
		}

		// The group has no native control of its own, so the validation
		// bubble is anchored to the first checkbox that can be chosen.
		const checkboxes = readCheckboxes(host.current)
		const firstEnabledBox = checkboxes.find((checkbox) => !isCheckboxDisabled(checkbox))
		const anchorRef = { current: firstEnabledBox }
		const formName = host.current.getAttribute('name') ?? ''

		const formControl = useFormControl({
			value: buildFormValue(formName, selectedValues),
			isDisabled: props.isDisabled,
			control: anchorRef,
			validity: getValidity(),
			onReset: () => setValue(defaultValue.current ?? []),
			onRestore: (state) => {
				const isFormData = state instanceof FormData
				if (!isFormData) return
				const restored = state.getAll(formName).map(String)
				setValue(restored)
			}
		})
		const isDisabled = Boolean(props.isDisabled) || formControl.isFormDisabled

		// Disabling the group disables its checkboxes, but only the ones it
		// disabled get re-enabled, so an individually disabled one stays so.
		const syncDisabled = () => {
			if (isDisabled) {
				for (const checkbox of readCheckboxes(host.current)) {
					if (isCheckboxDisabled(checkbox)) continue
					checkbox.isDisabled = true
					disabledByGroup.current.add(checkbox)
				}
				return
			}
			for (const checkbox of disabledByGroup.current) checkbox.isDisabled = false
			disabledByGroup.current.clear()
		}

		useEffect(syncDisabled, [isDisabled])

		// Keep the children and `value` agreeing, whichever was set first.
		// Assigning isChecked does not fire `change`, so this cannot loop.
		const syncSelection = () => {
			const boxes = readCheckboxes(host.current)
			const hasBoxes = boxes.length > 0
			if (!hasBoxes) return

			if (!hasValue) {
				const seededValues = readCheckedValues(host.current)
				defaultValue.current = defaultValue.current ?? seededValues
				setValue(seededValues)
				return
			}

			defaultValue.current = defaultValue.current ?? selectedValues
			const wanted = new Set(selectedValues)
			for (const checkbox of boxes) checkbox.isChecked = wanted.has(readCheckboxValue(checkbox))
		}

		useEffect(syncSelection, [value])

		const commitValues = (nextValues: string[]) => {
			const isUnchanged = areSameValues(nextValues, selectedValues)
			if (isUnchanged) return
			setValue(nextValues)
			props.change({ value: nextValues })
		}

		useListener(host, 'change', (rawEvent: unknown) => {
			const childEvent = rawEvent as CustomEvent
			const isOwnEvent = childEvent.target === host.current
			if (isOwnEvent) return
			const isFromCheckbox = (childEvent.target as Element).localName === 'z-checkbox'
			if (!isFromCheckbox) return
			// The group speaks for its children: one `change`, with the whole value.
			childEvent.stopPropagation()
			commitValues(readCheckedValues(host.current))
		})

		const handleSelectAll = (changeEvent: Event) => {
			changeEvent.stopPropagation()
			const boxes = readCheckboxes(host.current)
			const enabledBoxes = boxes.filter((checkbox) => !isCheckboxDisabled(checkbox))
			const selectAllState = getSelectAllState(boxes)
			const shouldCheckAll = !selectAllState.isChecked
			for (const checkbox of enabledBoxes) checkbox.isChecked = shouldCheckAll
			commitValues(readCheckedValues(host.current))
		}

		// The checkboxes are light-DOM children, which delegatesFocus does
		// not reach, so the host passes focus on to the first usable one.
		const forwardFocus = (focusEvent: FocusEvent) => {
			const isHostFocused = focusEvent.target === host.current
			if (!isHostFocused) return
			anchorRef.current?.focus()
		}

		const onSlotChange = () => {
			syncSelection()
			syncDisabled()
		}

		const selectAllState = getSelectAllState(checkboxes)
		const selectAllLabel = props.selectAllLabel || t('selectAll')
		const descriptionParts = [props.description, props.error].filter(Boolean)
		const accessibleDescription = descriptionParts.join(' ') || undefined

		return (
			<host
				shadowDom
				role="group"
				tabindex="-1"
				onfocus={forwardFocus}
				aria-label={accessibleName}
				aria-description={accessibleDescription}
				aria-invalid={props.error ? 'true' : undefined}
			>
				{props.hasSelectAll && (
					<div class="select-all">
						<z-checkbox
							size={props.size}
							isChecked={selectAllState.isChecked}
							isIndeterminate={selectAllState.isIndeterminate}
							isDisabled={isDisabled}
							onchange={handleSelectAll}
						>
							{selectAllLabel}
						</z-checkbox>
					</div>
				)}
				<div class="items">
					<slot onslotchange={onSlotChange} />
				</div>
			</host>
		)
	},
	{
		props: {
			...describableProps,
			value: { type: listOf<string>() },
			name: { type: String, reflect: true },
			label: String,
			min: { type: Number, reflect: true },
			max: { type: Number, reflect: true },
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			selectAllLabel: String,
			hasSelectAll: { type: Boolean, reflect: true },
			isHorizontal: { type: Boolean, reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: string[] }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles],
		form: true
	}
)

defineFormElement('z-checkbox-group', ZCheckboxGroup)
