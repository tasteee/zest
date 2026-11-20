import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { describableProps, describedBy, renderDescriptions, srOnlyStyles, useAccessibleName } from '../shared/accessible'
import { c, css, event, useProp, useRef, useState } from 'atomico'
import { listOf, oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import { RemoveIcon, chipStyles, resolveChipToneClass } from '../shared/chip-styles'

/*
 * z-tag-input, a text field that turns what you type into chips. Enter
 * or the delimiter (a comma by default) adds the text as a tag; pasting
 * a list adds every entry; leaving the field adds what is left.
 *
 * It is z-input's field with z-chip's chips in it, so it lines up with
 * both: same heights, same border and focus, same chip.
 *
 *   Backspace in an empty field   focuses the last tag
 *   ← / →                         move between tags and back to the text
 *   Backspace / Delete on a tag   removes it
 *
 * `value` is a string[]. The host submits one entry per tag under its
 * `name`. `suggestions` offers completions through a native datalist.
 * Duplicates are ignored unless `can-duplicate` is set, and `max` caps
 * how many tags it takes.
 */
const styles = css`
	:host {
		display: inline-flex;
		width: 100%;
		min-width: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	.field {
		--tone: var(--accent-primary);
		--control-height: var(--control-height-md);
		--z-chip-height: 1.75rem;
		--z-chip-padding: var(--space-2-5);
		--z-chip-font-size: var(--font-size-sm);
		--field-pad: calc((var(--control-height) - var(--z-chip-height)) / 2 - 1px);
		--field-inset: var(--space-3);

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-1-5);
		width: 100%;
		min-width: 0;
		min-height: var(--control-height);
		box-sizing: border-box;
		padding: var(--field-pad);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--text-primary);
		font-family: inherit;
		font-size: var(--font-size-sm);
		cursor: text;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	:host([tone='secondary']) .field { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) .field { --tone: var(--accent-tertiary); }

	.field.is-sm {
		--control-height: var(--control-height-sm);
		--z-chip-height: 1.375rem;
		--z-chip-padding: var(--space-2);
		--z-chip-font-size: var(--font-size-xs);
		--field-inset: var(--space-2-5);
		font-size: var(--font-size-sm);
	}
	.field.is-lg {
		--control-height: var(--control-height-lg);
		--z-chip-height: 2.125rem;
		--z-chip-padding: var(--space-3);
		--z-chip-font-size: var(--font-size-sm);
		--field-inset: var(--space-3-5);
		font-size: var(--font-size-md);
	}

	.field:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.field:focus-within {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 5%, transparent);
		outline: 1px solid var(--border-focus);
		outline-offset: -1px;
	}

	.field.is-invalid {
		--tone: var(--status-danger);
		border-color: var(--status-danger);
	}

	.field.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.adornment {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--text-secondary);
	}
	.adornment.is-empty {
		display: none;
	}
	.adornment.is-prefix {
		padding-inline-start: calc(var(--field-inset) - var(--field-pad));
	}
	.adornment.is-suffix {
		margin-inline-start: auto;
		padding-inline-end: calc(var(--field-inset) - var(--field-pad));
	}

	.tags {
		display: contents;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.chip {
		--chip-rest-bg: var(--surface-subtle);
		--chip-rest-border: transparent;
	}
	.chip.is-toned {
		--chip-rest-bg: color-mix(in oklch, var(--tone) 14%, transparent);
		color: color-mix(in oklab, var(--tone) 70%, var(--text-strong));
	}
	.chip:has(.remove:focus-visible) {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
	.remove:focus-visible {
		outline: none;
	}

	input {
		flex: 1 1 4rem;
		min-width: 4rem;
		height: var(--z-chip-height);
		padding: 0 var(--space-1);
		appearance: none;
		background: transparent;
		border: none;
		outline: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--line-height-none);
	}

	/* Lines the text up with z-input's: its padding plus the gap
	   after its (empty) prefix adornment. */
	input.is-leading {
		padding-inline-start: calc(var(--field-inset) + var(--space-2-5) - var(--field-pad));
	}

	input::placeholder {
		color: var(--text-secondary);
	}

	input::-webkit-calendar-picker-indicator {
		display: none !important;
	}

	::slotted(svg) {
		width: 1.125em;
		height: 1.125em;
	}
`

const resolveSizeClass = (size?: string): string => {
	if (size === 'sm') return 'is-sm'
	if (size === 'lg') return 'is-lg'
	return 'is-md'
}

const buildFormValue = (name: string, tags: string[]): FormData | null => {
	const isEmpty = tags.length === 0
	if (isEmpty) return null
	const formData = new FormData()
	for (const tag of tags) formData.append(name, tag)
	return formData
}

const escapeForPattern = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const splitEntries = (text: string, delimiter: string): string[] => {
	const delimiterPattern = delimiter ? `|${escapeForPattern(delimiter)}` : ''
	const pattern = new RegExp(`\\n${delimiterPattern}`)
	const pieces = text.split(pattern)
	const trimmed = pieces.map((piece) => piece.trim())
	return trimmed.filter(Boolean)
}

const isCaretAtStart = (input: HTMLInputElement): boolean => {
	const hasSelection = input.selectionStart !== input.selectionEnd
	if (hasSelection) return false
	return input.selectionStart === 0
}

export const ZTagInput = c(
	(props) => {
		const t = useLocale()
		const accessibleName = useAccessibleName(props.label)
		const inputRef = useRef<HTMLInputElement>()
		const fieldRef = useRef<HTMLDivElement>()
		const [value, setValue] = useProp<string[]>('value')
		const [draft, setDraft] = useState('')
		const [hasPrefix, setHasPrefix] = useState(false)
		const [hasSuffix, setHasSuffix] = useState(false)
		const initialTags = Array.isArray(value) ? value : []
		const defaultValue = useRef<string[]>(initialTags)

		const tags = Array.isArray(value) ? value : []
		// Two commits can land before a render (Enter twice, fast), so
		// edits build on the newest list, not this render's.
		const latestTags = useRef<string[]>(tags)
		latestTags.current = tags
		const tagCount = tags.length
		const hasTags = tagCount > 0
		const delimiter = props.delimiter ?? ','
		const hasMax = typeof props.max === 'number'
		const isFull = hasMax && tagCount >= (props.max as number)
		const formName = props.name ?? ''

		const formControl = useFormControl({
			value: buildFormValue(formName, tags),
			isDisabled: props.isDisabled,
			isReadonly: props.isReadonly,
			control: inputRef,
			onReset: () => {
				setDraft('')
				setValue(defaultValue.current)
			},
			onRestore: (state) => {
				const isFormData = state instanceof FormData
				if (!isFormData) return
				setValue(state.getAll(formName).map(String))
			}
		})
		const isDisabled = Boolean(props.isDisabled) || formControl.isFormDisabled
		const canEdit = !isDisabled && !props.isReadonly

		const commitTags = (nextTags: string[]) => {
			latestTags.current = nextTags
			setValue(nextTags)
			props.change({ value: nextTags })
		}

		// Adds what it can from `entries`, in order, and returns how many.
		const addEntries = (entries: string[]): number => {
			const nextTags = [...latestTags.current]
			const added: string[] = []
			for (const entry of entries) {
				const isAtMax = hasMax && nextTags.length >= (props.max as number)
				if (isAtMax) break
				const isDuplicate = nextTags.includes(entry)
				const shouldSkip = isDuplicate && !props.canDuplicate
				if (shouldSkip) continue
				nextTags.push(entry)
				added.push(entry)
			}
			const hasAdded = added.length > 0
			if (!hasAdded) return 0
			commitTags(nextTags)
			for (const tag of added) props.add({ value: tag })
			return added.length
		}

		// The live text, read from the input itself: a fast typist can
		// press Enter before the render that would update `draft`.
		const readDraft = (): string => inputRef.current?.value ?? draft

		const clearDraft = () => {
			const input = inputRef.current
			if (input) input.value = ''
			setDraft('')
		}

		const commitDraft = (): boolean => {
			const entries = splitEntries(readDraft(), delimiter)
			const hasEntries = entries.length > 0
			if (!hasEntries) return false
			addEntries(entries)
			clearDraft()
			return true
		}

		const removeTagAt = (position: number) => {
			const currentTags = latestTags.current
			const removedTag = currentTags[position]
			const nextTags = currentTags.filter((_tag, tagPosition) => tagPosition !== position)
			commitTags(nextTags)
			props.remove({ value: removedTag, index: position })
		}

		const readRemoveButtons = (): HTMLButtonElement[] => {
			const field = fieldRef.current
			if (!field) return []
			return [...field.querySelectorAll<HTMLButtonElement>('.remove')]
		}

		const focusTag = (position: number) => {
			const buttons = readRemoveButtons()
			const target = buttons[position]
			if (target) {
				target.focus()
				return
			}
			inputRef.current?.focus()
		}

		const focusInput = () => inputRef.current?.focus()

		const handleInputKeyDown = (keyEvent: KeyboardEvent) => {
			const input = keyEvent.currentTarget as HTMLInputElement
			const isComposing = keyEvent.isComposing
			if (isComposing) return
			const isEnter = keyEvent.key === 'Enter'
			const isDelimiter = Boolean(delimiter) && keyEvent.key === delimiter
			const hasDraft = readDraft().trim().length > 0

			if (isEnter && !hasDraft) {
				keyEvent.preventDefault()
				formControl.requestSubmit()
				return
			}

			if (isEnter || isDelimiter) {
				keyEvent.preventDefault()
				commitDraft()
				return
			}

			const isBackwardKey = keyEvent.key === 'Backspace' || keyEvent.key === 'ArrowLeft'
			const canStepIntoTags = isBackwardKey && hasTags && isCaretAtStart(input) && canEdit
			if (!canStepIntoTags) return
			keyEvent.preventDefault()
			focusTag(tagCount - 1)
		}

		const handleTagKeyDown = (keyEvent: KeyboardEvent, position: number) => {
			const isRemoveKey = keyEvent.key === 'Backspace' || keyEvent.key === 'Delete'
			if (isRemoveKey) {
				keyEvent.preventDefault()
				removeTagAt(position)
				const previousPosition = Math.max(0, position - 1)
				const hasTagsLeft = tagCount - 1 > 0
				if (hasTagsLeft) {
					requestAnimationFrame(() => focusTag(previousPosition))
					return
				}
				focusInput()
				return
			}

			if (keyEvent.key === 'ArrowLeft') {
				keyEvent.preventDefault()
				focusTag(Math.max(0, position - 1))
				return
			}

			const isExitKey = keyEvent.key === 'ArrowRight' || keyEvent.key === 'Escape'
			if (!isExitKey) return
			keyEvent.preventDefault()
			focusTag(position + 1)
		}

		const handleRemoveClick = (clickEvent: Event, position: number) => {
			clickEvent.stopPropagation()
			removeTagAt(position)
			focusInput()
		}

		const handleInput = (inputEvent: Event) => {
			inputEvent.stopPropagation()
			const text = (inputEvent.target as HTMLInputElement).value
			setDraft(text)
			props.input({ value: text })
		}

		const handlePaste = (pasteEvent: ClipboardEvent) => {
			const pastedText = pasteEvent.clipboardData?.getData('text') ?? ''
			const hasDelimiter = Boolean(delimiter) && pastedText.includes(delimiter)
			const isList = hasDelimiter || pastedText.includes('\n')
			if (!isList) return
			pasteEvent.preventDefault()
			addEntries(splitEntries(pastedText, delimiter))
		}

		const handleBlur = () => {
			const shouldCommit = canEdit && !props.isDraftKeptOnBlur
			if (shouldCommit) commitDraft()
		}

		const handleFieldPointerDown = (pointerEvent: PointerEvent) => {
			const isFieldItself = pointerEvent.target === fieldRef.current
			if (!isFieldItself) return
			pointerEvent.preventDefault()
			focusInput()
		}

		const handlePrefixSlotChange = (slotEvent: Event) => {
			const slot = slotEvent.target as HTMLSlotElement
			setHasPrefix(slot.assignedNodes().length > 0)
		}

		const handleSuffixSlotChange = (slotEvent: Event) => {
			const slot = slotEvent.target as HTMLSlotElement
			setHasSuffix(slot.assignedNodes().length > 0)
		}

		const isInvalid = Boolean(props.isInvalid) || Boolean(props.error)
		const fieldClass = ['field', resolveSizeClass(props.size)]
			.concat(isInvalid ? ['is-invalid'] : [])
			.concat(isDisabled ? ['is-disabled'] : [])
			.join(' ')
		const prefixClass = hasPrefix ? 'adornment is-prefix' : 'adornment is-prefix is-empty'
		const suffixClass = hasSuffix ? 'adornment is-suffix' : 'adornment is-suffix is-empty'
		const isInputLeading = !hasTags && !hasPrefix
		const inputClass = isInputLeading ? 'is-leading' : ''
		const placeholder = hasTags ? undefined : props.placeholder
		const suggestions = Array.isArray(props.suggestions) ? (props.suggestions as string[]) : []
		const unusedSuggestions = suggestions.filter((suggestion) => !tags.includes(suggestion))
		const hasSuggestions = unusedSuggestions.length > 0
		const toneClass = resolveChipToneClass(props.tone)
		const chipClass = ['chip', toneClass, toneClass ? 'is-toned' : ''].filter(Boolean).join(' ')
		const isRequiredNow = Boolean(props.isRequired) && !hasTags
		// `readonly` has no camelCase property name Atomico can match, so
		// it is written as an attribute: false must be absent, not "false".
		const isInputReadonly = Boolean(props.isReadonly) || isFull

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<div ref={fieldRef} class={fieldClass} part="field" onpointerdown={handleFieldPointerDown}>
					<span class={prefixClass}>
						<slot name="prefix" onslotchange={handlePrefixSlotChange} />
					</span>
					<ul class="tags" role="list">
						{tags.map((tag, position) => (
							<li class={chipClass} key={`${tag}-${position}`}>
								<span class="label">{tag}</span>
								{canEdit && (
									<button
										class="remove"
										type="button"
										tabindex="-1"
										aria-label={t('removeItem', { label: tag })}
										onclick={(clickEvent: Event) => handleRemoveClick(clickEvent, position)}
										onkeydown={(keyEvent: KeyboardEvent) => handleTagKeyDown(keyEvent, position)}
									>
										<RemoveIcon />
									</button>
								)}
							</li>
						))}
					</ul>
					<input
						ref={inputRef}
						class={inputClass}
						type="text"
						value={draft}
						placeholder={placeholder}
						disabled={isDisabled}
						readonly={isInputReadonly ? true : undefined}
						required={isRequiredNow}
						enterkeyhint="enter"
						autocomplete="off"
						list={(hasSuggestions ? 'suggestions' : undefined) as any}
						aria-label={accessibleName}
						aria-describedby={describedBy(props.description, props.error)}
						aria-invalid={isInvalid ? 'true' : undefined}
						onkeydown={handleInputKeyDown}
						oninput={handleInput}
						onchange={(changeEvent: Event) => changeEvent.stopPropagation()}
						onpaste={handlePaste}
						onblur={handleBlur}
					/>
					{hasSuggestions && (
						<datalist id="suggestions">
							{unusedSuggestions.map((suggestion) => (
								<option value={suggestion}></option>
							))}
						</datalist>
					)}
					<span class={suffixClass}>
						<slot name="suffix" onslotchange={handleSuffixSlotChange} />
					</span>
				</div>
				{renderDescriptions(props.description, props.error)}
			</host>
		)
	},
	{
		props: {
			...describableProps,
			value: { type: listOf<string>() },
			suggestions: { type: listOf<string>() },
			name: { type: String, reflect: true },
			label: String,
			placeholder: String,
			delimiter: String,
			max: { type: Number, reflect: true },
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'), reflect: true },
			canDuplicate: { type: Boolean, reflect: true },
			isDraftKeptOnBlur: { type: Boolean, reflect: true },
			isInvalid: { type: Boolean, reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isReadonly: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			input: event<{ value: string }>({ bubbles: true, composed: true }),
			change: event<{ value: string[] }>({ bubbles: true, composed: true }),
			add: event<{ value: string }>({ bubbles: true, composed: true }),
			remove: event<{ value: string; index: number }>({ bubbles: true, composed: true })
		},
		styles: [chipStyles, styles, interactionStyles, srOnlyStyles],
		form: true
	}
)

defineFormElement('z-tag-input', ZTagInput)
