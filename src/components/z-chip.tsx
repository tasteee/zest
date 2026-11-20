import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, event, useHost, useProp, useRef } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import { CheckIcon, RemoveIcon, chipStyles, resolveChipKindClass, resolveChipSizeClass, resolveChipToneClass } from '../shared/chip-styles'

/*
 * z-chip, a compact toggle. Click it and it flips `is-selected`, grows
 * a check, and fires `select`. Put several in a z-chip-group for a
 * filter row or a single choice; the group owns the value then.
 *
 * `is-removable` adds an × that fires `remove`. Delete or Backspace on
 * a focused chip does the same. The chip does not take itself out of
 * the page; the listener decides.
 *
 * For a read-only label, use z-badge. A chip is always an input.
 */
const styles = css`
	:host {
		display: inline-flex;
		max-width: 100%;
		vertical-align: middle;
	}

	:host([is-hidden]) {
		display: none;
	}

	::slotted(svg) {
		width: 1em;
		height: 1em;
	}

	::slotted(img) {
		width: 1.25em;
		height: 1.25em;
		margin-inline-start: calc(var(--space-1-5) * -1);
		border-radius: var(--radius-full);
		object-fit: cover;
	}
`

const readChipText = (host: HTMLElement, label?: string): string => {
	if (label) return label
	return host.textContent?.trim() ?? ''
}

export const ZChip = c(
	(props) => {
		const t = useLocale()
		const host = useHost()
		const mainRef = useRef<HTMLButtonElement>()
		const [isSelected, setIsSelected] = useProp<boolean>('isSelected')

		const isDisabled = Boolean(props.isDisabled)
		const isChecked = Boolean(isSelected)
		const chipText = readChipText(host.current, props.label)
		const removeLabel = t('removeItem', { label: chipText })

		const chipClass = [
			'chip',
			'is-interactive',
			resolveChipSizeClass(props.size),
			resolveChipToneClass(props.tone),
			resolveChipKindClass(props.kind)
		]
			.concat(isChecked ? ['is-selected'] : [])
			.concat(isDisabled ? ['is-disabled'] : [])
			.filter(Boolean)
			.join(' ')

		const handleToggle = () => {
			if (isDisabled) return
			const nextSelected = !isChecked
			setIsSelected(nextSelected)
			props.select({ value: props.value, selected: nextSelected })
		}

		const handleRemove = (clickEvent: Event) => {
			clickEvent.stopPropagation()
			if (isDisabled) return
			props.remove({ value: props.value })
		}

		const handleKeyDown = (keyEvent: KeyboardEvent) => {
			const isDeleteKey = keyEvent.key === 'Delete' || keyEvent.key === 'Backspace'
			const canRemove = isDeleteKey && props.isRemovable && !isDisabled
			if (!canRemove) return
			keyEvent.preventDefault()
			props.remove({ value: props.value })
		}

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<span class={chipClass} part="chip">
					<button
						ref={mainRef}
						class="main"
						type="button"
						disabled={isDisabled}
						aria-pressed={isChecked ? 'true' : 'false'}
						aria-labelledby="label"
						onclick={handleToggle}
						onkeydown={handleKeyDown}
					></button>
					<span class="content">
						<CheckIcon />
						<slot name="prefix" />
						<span class="label" id="label">
							<slot>{props.label}</slot>
						</span>
					</span>
					{props.isRemovable && (
						<button
							class="remove"
							type="button"
							tabindex="-1"
							disabled={isDisabled}
							aria-label={removeLabel}
							onclick={handleRemove}
						>
							<RemoveIcon />
						</button>
					)}
				</span>
			</host>
		)
	},
	{
		props: {
			label: String,
			value: { type: String, reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			kind: { type: oneOf('outline', 'soft'), reflect: true },
			isSelected: { type: Boolean, reflect: true },
			isRemovable: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			select: event<{ value?: string; selected: boolean }>({ bubbles: true, composed: true }),
			remove: event<{ value?: string }>({ bubbles: true, composed: true })
		},
		styles: [chipStyles, styles, interactionStyles]
	}
)

defineElement('z-chip', ZChip)
