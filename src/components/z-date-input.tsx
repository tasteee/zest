import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { describableProps, describedBy, renderDescriptions, srOnlyStyles, useAccessibleName } from '../shared/accessible'
import { floatingSurfaceStyles } from '../shared/overlay-styles'
import { applyPosition, autoUpdate, computePosition, hideFloating, showFloating } from '../shared/overlay'
import type { ValidityFlagsT } from '../shared/form-control'
import { c, css, event, useEffect, useHost, useProp, useRef, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import './z-calendar'
import {
	addDays,
	buildDateDetail,
	clampIso,
	formatIsoDate,
	getMonthKey,
	getTodayIso,
	isOutsideBounds,
	isSameRange,
	maskTypedDate,
	normalizeIsoDate,
	normalizeRange,
	normalizeSingle,
	parseTypedDate,
	resolveFormat,
	toRangeText
} from '../shared/date-utils'
import type { DateRangeT, IsoDateT } from '../shared/date-utils'

/*
 * z-date-input, a text field for one date or a range of dates, with an
 * optional calendar.
 *
 *   <z-date-input value="2026-11-20">                       one date
 *   <z-date-input is-range value="2026-11-02/2026-11-09">   a range
 *
 * Values are always ISO strings (a range is an ISO interval, "start/end");
 * `format` only changes what is typed and shown ("MM/DD/YYYY", "DD.MM.YYYY", "YYYY-MM-DD" by default). Typing is
 * shaped as it goes: digits only, separators filled in, a lone "5" becomes
 * the month "05". A date counts once it is complete and real.
 *
 * With `is-range` there are two fields in one frame, like
 * z-number-range-input. They never cross: editing one past the other pins
 * it to the other's date. An empty side is left blank, so open-ended ranges
 * work ("2026-11-02/").
 *
 * `has-calendar` adds a calendar button that opens a z-calendar below the
 * field. Picking a date fills the field; a range closes after its second
 * click. ↑ / ↓ step the focused date by a day, Alt+↓ opens the calendar,
 * and Escape closes it.
 *
 * Form-associated. A single date submits as its ISO string; a range submits
 * both under one `name`, like a multiple <select>.
 * `input` fires as a complete date is typed or picked; `change` when the
 * field is committed (blur, Enter, a step, or a calendar pick). Both carry
 * { value, start, end }.
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
	.row:focus-within, .row.is-open { border-color: var(--tone); background: color-mix(in oklch, var(--tone) 5%, transparent); }
	.row:focus-within { outline: 1px solid var(--border-focus); outline-offset: -1px; }
	.row.is-invalid { border-color: var(--status-danger); --tone: var(--status-danger); }
	.row.is-disabled { opacity: var(--control-disabled-opacity); pointer-events: none; }

	input { flex: 1 1 0; min-width: 0; box-sizing: border-box; padding-block: 0; padding-inline: var(--space-3); background: transparent; border: 0; outline: none; color: inherit; font: inherit; font-variant-numeric: tabular-nums; text-align: start; }
	.row.is-range input { padding-inline: var(--space-2); text-align: center; }
	input::placeholder { color: var(--text-secondary); user-select: none; -webkit-user-select: none; }
	.separator { display: flex; align-items: center; padding-inline: var(--space-1); color: var(--text-secondary); user-select: none; -webkit-user-select: none; }

	.calendar-button { display: grid; place-items: center; flex: 0 0 auto; width: 2.25rem; padding: 0; background: transparent; border: 0; border-inline-start: 1px solid var(--border-default); color: var(--text-secondary); cursor: pointer; transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.calendar-button:hover:not(:disabled) { color: var(--text-primary); background: color-mix(in oklch, var(--text-primary) 6%, transparent); }
	.calendar-button:active:not(:disabled), .calendar-button.is-open { color: var(--tone); background: color-mix(in oklch, var(--tone) 12%, transparent); }
	.calendar-button:focus-visible { position: relative; z-index: 1; outline: 2px solid var(--border-focus); outline-offset: -2px; }
	.calendar-button:disabled { cursor: not-allowed; opacity: 0.35; }
	.calendar-button svg { width: 1.125rem; height: 1.125rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

	.surface { width: fit-content; max-width: none; padding: var(--space-3); border-radius: var(--radius-lg); }
`

type FieldNameT = 'start' | 'end'

const joinClasses = (names: Array<string | false>): string => names.filter(Boolean).join(' ')

const toPublicValue = (bounds: DateRangeT, isRange: boolean): string | null => {
	if (isRange) return toRangeText(bounds)
	return bounds[0]
}

const readBounds = (raw: unknown, isRange: boolean): DateRangeT => {
	if (isRange) return normalizeRange(raw)
	return [normalizeSingle(raw), null]
}

// Pins the edited side to the other so the two never cross.
const buildNextBounds = (which: FieldNameT, iso: IsoDateT | null, current: DateRangeT, isRange: boolean): DateRangeT => {
	if (!isRange) return [iso, null]
	const start = current[0]
	const end = current[1]
	if (which === 'start') {
		const hasCrossedEnd = iso !== null && end !== null && iso > end
		if (hasCrossedEnd) return [end, end]
		return [iso, end]
	}
	const hasCrossedStart = iso !== null && start !== null && iso < start
	if (hasCrossedStart) return [start, start]
	return [start, iso]
}

export const ZDateInput = c(
	(props) => {
		const host = useHost()
		const t = useLocale()
		const accessibleName = useAccessibleName(props.label)
		const rowRef = useRef<HTMLDivElement>()
		const startRef = useRef<HTMLInputElement>()
		const endRef = useRef<HTMLInputElement>()
		const floatRef = useRef<HTMLDivElement>()
		const calendarRef = useRef<HTMLElement>()
		const lastChangeRef = useRef<DateRangeT>([null, null])
		const lastFieldRef = useRef<FieldNameT>('start')
		const valueProp = useProp<string | null>('value')
		const requestedValue = valueProp[0]
		const setValue = valueProp[1]

		const isRange = Boolean(props.isRange)
		const format = resolveFormat(props.format)
		const min = normalizeIsoDate(props.min)
		const max = normalizeIsoDate(props.max)
		const bounds = readBounds(requestedValue, isRange)
		const startIso = bounds[0]
		const endIso = bounds[1]
		const defaultBounds = useRef<DateRangeT | null>(null)
		if (defaultBounds.current === null) defaultBounds.current = bounds

		const rawStartState = useState(formatIsoDate(startIso, format))
		const rawStart = rawStartState[0]
		const setRawStart = rawStartState[1]
		const rawEndState = useState(formatIsoDate(endIso, format))
		const rawEnd = rawEndState[0]
		const setRawEnd = rawEndState[1]
		const focusedFieldState = useState<FieldNameT | null>(null)
		const focusedField = focusedFieldState[0]
		const setFocusedField = focusedFieldState[1]
		const isOpenState = useState(false)
		const isOpen = isOpenState[0]
		const setIsOpen = isOpenState[1]
		const boundsRef = useRef<DateRangeT>(bounds)
		boundsRef.current = bounds

		const buildFormValue = () => {
			if (!isRange) return startIso ?? ''
			const data = new FormData()
			const name = host.current.getAttribute('name') ?? ''
			if (startIso !== null) data.append(name, startIso)
			if (endIso !== null) data.append(name, endIso)
			return data
		}

		const restoreFromForm = (state: unknown) => {
			if (!isRange) {
				const isText = typeof state === 'string'
				if (isText) setValue(normalizeIsoDate(state))
				return
			}
			const isFormData = state instanceof FormData
			if (!isFormData) return
			const name = host.current.getAttribute('name') ?? ''
			const restored = (state as FormData).getAll(name)
			setValue(toRangeText([normalizeIsoDate(restored[0]), normalizeIsoDate(restored[1])]))
		}

		const typedStartIso = parseTypedDate(rawStart, format)
		const typedEndIso = parseTypedDate(rawEnd, format)
		const hasBadStartText = rawStart !== '' && typedStartIso === null
		const hasBadEndText = isRange && rawEnd !== '' && typedEndIso === null
		const isTypedStartOutside = typedStartIso !== null && isOutsideBounds(typedStartIso, min, max)
		const isTypedEndOutside = typedEndIso !== null && isOutsideBounds(typedEndIso, min, max)
		const isTypedOutside = isTypedStartOutside || isTypedEndOutside
		const isMissingEnd = isRange && Boolean(props.isRequired) && endIso === null

		const buildValidity = (): { flags: ValidityFlagsT; message?: string } => {
			const hasBadText = hasBadStartText || hasBadEndText
			if (hasBadText) return { flags: { badInput: true }, message: t('enterADate', { format }) }
			const lowest = [typedStartIso, typedEndIso].filter(Boolean).sort()[0] ?? null
			const highest = [typedStartIso, typedEndIso].filter(Boolean).sort().reverse()[0] ?? null
			const isUnderMin = lowest !== null && min !== null && lowest < min
			if (isUnderMin) return { flags: { rangeUnderflow: true }, message: t('dateOnOrAfter', { min: formatIsoDate(min, format) }) }
			const isOverMax = highest !== null && max !== null && highest > max
			if (isOverMax) return { flags: { rangeOverflow: true }, message: t('dateOnOrBefore', { max: formatIsoDate(max, format) }) }
			if (isMissingEnd) return { flags: { valueMissing: true }, message: endRef.current?.validationMessage }
			return { flags: {} }
		}

		const formControl = useFormControl({
			value: buildFormValue(),
			isDisabled: props.isDisabled,
			isReadOnly: props.isReadOnly,
			control: startRef,
			validity: buildValidity(),
			submitsOnEnter: true,
			onReset: () => {
				const initial = defaultBounds.current as DateRangeT
				setValue(toPublicValue(initial, isRange))
			},
			onRestore: restoreFromForm
		})
		const isDisabled = props.isDisabled || formControl.isFormDisabled
		const isReadOnly = Boolean(props.isReadOnly)
		const isInert = isDisabled || isReadOnly

		// A field shows the committed date unless it is being edited.
		useEffect(() => {
			const isEditing = focusedField === 'start'
			if (isEditing) return
			setRawStart(formatIsoDate(startIso, format))
		}, [startIso, focusedField, format])

		useEffect(() => {
			const isEditing = focusedField === 'end'
			if (isEditing) return
			setRawEnd(formatIsoDate(endIso, format))
		}, [endIso, focusedField, format])

		const announceChange = (next: DateRangeT) => {
			const isUnchanged = isSameRange(next, lastChangeRef.current)
			if (isUnchanged) return
			lastChangeRef.current = next
			props.change(buildDateDetail(next, isRange))
		}

		const commitBounds = (next: DateRangeT) => {
			const isUnchanged = isSameRange(next, boundsRef.current)
			if (isUnchanged) return
			boundsRef.current = next
			setValue(toPublicValue(next, isRange))
			props.input(buildDateDetail(next, isRange))
		}

		const getBoundsIndex = (which: FieldNameT): 0 | 1 => (which === 'start' ? 0 : 1)

		const setRawFor = (which: FieldNameT, text: string) => {
			if (which === 'start') setRawStart(text)
			if (which === 'end') setRawEnd(text)
		}

		const handleFieldInput = (which: FieldNameT, inputEvent: any) => {
			inputEvent.stopPropagation()
			const field = inputEvent.target as HTMLInputElement
			const isDeleting = String(inputEvent.inputType ?? '').startsWith('delete')
			const masked = maskTypedDate(field.value, format, { isDeleting })
			const hasChangedText = masked !== field.value
			if (hasChangedText) field.value = masked
			setRawFor(which, masked)

			const isCleared = masked === ''
			if (isCleared) {
				commitBounds(buildNextBounds(which, null, boundsRef.current, isRange))
				return
			}

			const parsed = parseTypedDate(masked, format)
			if (parsed === null) return
			const isOutside = isOutsideBounds(parsed, min, max)
			if (isOutside) return
			commitBounds(buildNextBounds(which, parsed, boundsRef.current, isRange))
		}

		const handleFieldFocus = (which: FieldNameT, focusEvent: any) => {
			lastFieldRef.current = which
			lastChangeRef.current = boundsRef.current
			setFocusedField(which)
			;(focusEvent.target as HTMLInputElement).select()
		}

		const commitField = (which: FieldNameT) => {
			const text = which === 'start' ? rawStart : rawEnd
			const isEmpty = text === ''
			const parsed = parseTypedDate(text, format)
			const isUnreadable = !isEmpty && parsed === null
			if (isUnreadable) return
			const requested = isEmpty ? null : clampIso(parsed as IsoDateT, min, max)
			const next = buildNextBounds(which, requested, boundsRef.current, isRange)
			commitBounds(next)
			announceChange(next)
		}

		const handleFieldBlur = (which: FieldNameT) => {
			commitField(which)
			setFocusedField(null)
		}

		const stepField = (which: FieldNameT, amount: number) => {
			const current = boundsRef.current[getBoundsIndex(which)]
			const base = current ?? clampIso(getTodayIso(), min, max)
			const stepped = current === null ? base : clampIso(addDays(current, amount), min, max)
			const next = buildNextBounds(which, stepped, boundsRef.current, isRange)
			commitBounds(next)
			announceChange(next)
			setRawFor(which, formatIsoDate(next[getBoundsIndex(which)], format))
		}

		const handleFieldKeydown = (which: FieldNameT, keyEvent: KeyboardEvent) => {
			const canOpen = Boolean(props.hasCalendar) && !isInert
			const isOpenShortcut = keyEvent.altKey && keyEvent.key === 'ArrowDown'
			if (isOpenShortcut && canOpen) {
				keyEvent.preventDefault()
				openCalendar(which)
				return
			}
			if (isInert) return
			if (keyEvent.key === 'Enter') commitField(which)
			if (keyEvent.key === 'ArrowUp') {
				keyEvent.preventDefault()
				stepField(which, 1)
			}
			if (keyEvent.key === 'ArrowDown') {
				keyEvent.preventDefault()
				stepField(which, -1)
			}
		}

		const openCalendar = (which: FieldNameT) => {
			lastFieldRef.current = which
			lastChangeRef.current = boundsRef.current
			setIsOpen(true)
		}

		const closeCalendar = (shouldRefocus: boolean) => {
			setIsOpen(false)
			announceChange(boundsRef.current)
			if (!shouldRefocus) return
			const target = lastFieldRef.current === 'end' ? endRef.current : startRef.current
			target?.focus()
		}

		const handleCalendarButtonClick = () => {
			if (isInert) return
			if (isOpen) {
				closeCalendar(true)
				return
			}
			openCalendar(lastFieldRef.current)
		}

		// A pick from the calendar replaces whatever was typed.
		const showBoundsAsText = (next: DateRangeT) => {
			setRawStart(formatIsoDate(next[0], format))
			setRawEnd(formatIsoDate(next[1], format))
		}

		const handleCalendarInput = (calendarEvent: any) => {
			calendarEvent.stopPropagation()
			const next = readBounds(calendarEvent.detail?.value, isRange)
			commitBounds(next)
			showBoundsAsText(next)
		}

		const handleCalendarChange = (calendarEvent: any) => {
			calendarEvent.stopPropagation()
			const next = readBounds(calendarEvent.detail?.value, isRange)
			commitBounds(next)
			showBoundsAsText(next)
			announceChange(next)
			setIsOpen(false)
			const target = lastFieldRef.current === 'end' ? endRef.current : startRef.current
			target?.focus()
		}

		// The calendar opens on the month of the field that opened it.
		const showFieldMonth = (calendar: HTMLElement) => {
			const current = boundsRef.current
			const fieldIndex = getBoundsIndex(lastFieldRef.current)
			const monthSource = current[fieldIndex] ?? current[0] ?? current[1] ?? getTodayIso()
			;(calendar as HTMLElement & { month: string }).month = getMonthKey(monthSource)
		}

		useEffect(() => {
			const floating = floatRef.current
			if (!floating) return
			if (!isOpen) {
				hideFloating(floating)
				return
			}
			showFloating(floating)
			if (calendarRef.current) showFieldMonth(calendarRef.current)
			const focusFrame = requestAnimationFrame(() => calendarRef.current?.focus())
			const update = () => applyPosition(floating, computePosition(rowRef.current as HTMLElement, floating, { placement: 'bottom-start', offset: 8 }))
			const cleanup = autoUpdate(rowRef.current as HTMLElement, floating, update)

			const handleDocumentPointerDown = (pointerEvent: Event) => {
				const isInside = pointerEvent.composedPath().includes(host.current as EventTarget)
				if (!isInside) closeCalendar(false)
			}
			const handleDocumentKeydown = (keyEvent: KeyboardEvent) => {
				if (keyEvent.key !== 'Escape') return
				keyEvent.preventDefault()
				closeCalendar(true)
			}
			document.addEventListener('pointerdown', handleDocumentPointerDown)
			document.addEventListener('keydown', handleDocumentKeydown)

			return () => {
				cancelAnimationFrame(focusFrame)
				cleanup()
				document.removeEventListener('pointerdown', handleDocumentPointerDown)
				document.removeEventListener('keydown', handleDocumentKeydown)
				hideFloating(floating)
			}
		}, [isOpen])

		const isInvalid = Boolean(props.isInvalid) || Boolean(props.error) || isTypedOutside
		const sizeName = props.size ?? 'md'
		const rowClass = joinClasses(['row', `is-${sizeName}`, isRange && 'is-range', isInvalid && 'is-invalid', isDisabled && 'is-disabled', isOpen && 'is-open'])
		const buttonClass = joinClasses(['calendar-button', isOpen && 'is-open'])
		const describedById = describedBy(props.description, props.error)
		const startPlaceholder = (isRange ? props.startPlaceholder : props.placeholder) || format
		const endPlaceholder = props.endPlaceholder || format
		const startLabel = isRange ? t('startDate') : accessibleName
		const endLabel = t('endDate')
		const fieldSize = format.length + 1
		const hasCalendar = Boolean(props.hasCalendar)
		const calendarValue = toPublicValue(bounds, isRange)
		const calendarLabel = accessibleName || t('calendar')
		const rowRole = isRange ? 'group' : undefined
		const rowName = isRange ? accessibleName : undefined

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<div ref={rowRef} class={rowClass} role={rowRole} aria-label={rowName} aria-describedby={isRange ? describedById : undefined}>
					<input
						ref={startRef}
						type="text"
						inputmode="numeric"
						autocomplete="off"
						size={fieldSize}
						value={rawStart}
						placeholder={startPlaceholder}
						disabled={isDisabled}
						readonly={props.isReadOnly ? true : undefined}
						required={props.isRequired}
						aria-label={startLabel}
						aria-describedby={isRange ? undefined : describedById}
						aria-invalid={isInvalid ? 'true' : undefined}
						oninput={(inputEvent: any) => handleFieldInput('start', inputEvent)}
						onfocus={(focusEvent: any) => handleFieldFocus('start', focusEvent)}
						onblur={() => handleFieldBlur('start')}
						onkeydown={(keyEvent: KeyboardEvent) => handleFieldKeydown('start', keyEvent)}
					/>
					{isRange && <span class="separator" aria-hidden="true">{t('rangeSeparator')}</span>}
					{isRange && (
						<input
							ref={endRef}
							type="text"
							inputmode="numeric"
							autocomplete="off"
							size={fieldSize}
							value={rawEnd}
							placeholder={endPlaceholder}
							disabled={isDisabled}
							readonly={props.isReadOnly ? true : undefined}
							required={props.isRequired}
							aria-label={endLabel}
							aria-invalid={isInvalid ? 'true' : undefined}
							oninput={(inputEvent: any) => handleFieldInput('end', inputEvent)}
							onfocus={(focusEvent: any) => handleFieldFocus('end', focusEvent)}
							onblur={() => handleFieldBlur('end')}
							onkeydown={(keyEvent: KeyboardEvent) => handleFieldKeydown('end', keyEvent)}
						/>
					)}
					{hasCalendar && (
						<button
							class={buttonClass}
							type="button"
							tabindex="-1"
							disabled={isInert}
							aria-label={t('openCalendar')}
							aria-haspopup="dialog"
							aria-expanded={isOpen ? 'true' : 'false'}
							onclick={handleCalendarButtonClick}
						>
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<rect x="3" y="4.5" width="18" height="16.5" rx="3" />
								<line x1="3" y1="10" x2="21" y2="10" />
								<line x1="8" y1="2.5" x2="8" y2="6.5" />
								<line x1="16" y1="2.5" x2="16" y2="6.5" />
							</svg>
						</button>
					)}
				</div>
				{hasCalendar && (
					<div ref={floatRef} class="surface" popover="manual" role="dialog" aria-label={calendarLabel}>
						<z-calendar
							ref={calendarRef}
							isBorderless={true}
							isRange={isRange}
							value={calendarValue ?? undefined}
							min={props.min}
							max={props.max}
							tone={props.tone}
							locale={props.locale}
							firstDayOfWeek={props.firstDayOfWeek}
							label={calendarLabel}
							oninput={handleCalendarInput}
							onchange={handleCalendarChange}
						/>
					</div>
				)}
				{renderDescriptions(props.description, props.error)}
			</host>
		)
	},
	{
		props: {
			...describableProps,
			value: { type: String, reflect: true },
			format: { type: String, reflect: true },
			min: { type: String, reflect: true },
			max: { type: String, reflect: true },
			firstDayOfWeek: { type: Number, reflect: true },
			locale: String,
			label: String,
			name: { type: String, reflect: true },
			placeholder: String,
			startPlaceholder: String,
			endPlaceholder: String,
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isRange: { type: Boolean, reflect: true },
			hasCalendar: { type: Boolean, reflect: true },
			isInvalid: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isReadOnly: { type: Boolean, reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isFullWidth: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			input: event<{ value: string | null; start: string | null; end: string | null }>({ bubbles: true, composed: true }),
			change: event<{ value: string | null; start: string | null; end: string | null }>({ bubbles: true, composed: true })
		},
		styles: [floatingSurfaceStyles, styles, interactionStyles, srOnlyStyles],
		form: true
	}
)

defineFormElement('z-date-input', ZDateInput)
