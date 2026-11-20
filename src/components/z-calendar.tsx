import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, event, useEffect, useHost, useProp, useRef, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import {
	addDays,
	addMonths,
	addYears,
	buildMonthGrid,
	clampIso,
	getFirstOfMonth,
	getMonthKey,
	getTodayIso,
	isMonthKey,
	isOutsideBounds,
	normalizeIsoDate,
	normalizeRange,
	normalizeSingle,
	parseIsoDate,
	buildDateDetail,
	toRangeText
} from '../shared/date-utils'
import type { DateRangeT, IsoDateT } from '../shared/date-utils'

/*
 * z-calendar, a month grid for picking one day or a range of days.
 *
 *   <z-calendar value="2026-11-20">                          one day
 *   <z-calendar is-range value="2026-11-02/2026-11-09">      a range
 *
 * Dates are ISO strings ("2026-11-20"); a range is an ISO interval
 * ("start/end", either side may be empty).
 *
 * With `is-range`, the first click
 * sets the start and the second sets the end (an earlier second click swaps
 * them); a third click starts over. `input` fires on every click, `change`
 * once the selection is complete. An unfinished range reads "start/".
 * Both carry { value, start, end }.
 *
 * The header puts the month and its arrows on the left, the year and its
 * arrows on the right. The grid is always six weeks tall so it never
 * jumps. Days of the neighbouring months stay visible but quiet, and can
 * be picked.
 *
 * Keyboard: arrows move by day and week, Home / End jump to the edges of
 * the week, PageUp / PageDown change month (with Shift, year).
 */
const styles = css`
	:host {
		display: inline-block;
		width: fit-content;
		max-width: 100%;
		--tone: var(--accent-primary);
		--day-size: 2.25rem;
		--calendar-padding: var(--space-3);
		--calendar-width: 17.875rem;
	}
	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	:host([is-hidden]) { display: none; }

	.calendar {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		width: var(--calendar-width);
		padding: var(--calendar-padding);
		background: var(--surface-default);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		user-select: none;
		-webkit-user-select: none;
	}
	:host([is-borderless]) { --calendar-padding: 0rem; --calendar-width: calc(17.875rem - 2px - var(--space-3) * 2); }
	:host([is-borderless]) .calendar {
		background: transparent;
		border: 0;
		border-radius: 0;
	}
	.calendar.is-disabled { opacity: var(--control-disabled-opacity); pointer-events: none; }

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
	}
	.stepper {
		display: inline-flex;
		align-items: center;
		gap: var(--space-0-5);
		min-width: 0;
	}
	.title {
		padding-inline: var(--space-1);
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-md);
		line-height: var(--line-height-tight);
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.title { box-sizing: border-box; text-align: center; }
	.title.is-month { min-inline-size: 5.5rem; }
	.title.is-year { min-inline-size: 3rem; }
	.title.is-year { color: var(--text-secondary); font-variant-numeric: tabular-nums; }

	.arrow {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}
	.arrow:hover:not(:disabled) { color: var(--text-primary); background: color-mix(in oklch, var(--text-primary) 8%, transparent); }
	.arrow:active:not(:disabled) { background: color-mix(in oklch, var(--tone) 14%, transparent); }
	.arrow:focus-visible { outline: 2px solid var(--border-focus); outline-offset: -2px; }
	.arrow:disabled { cursor: not-allowed; opacity: 0.35; }
	.arrow svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
	:host(:dir(rtl)) .arrow svg { scale: -1 1; }

	.grid { display: flex; flex-direction: column; }
	.week { display: grid; grid-template-columns: repeat(7, 1fr); }
	.weekday {
		display: grid;
		place-items: center;
		height: 1.75rem;
		color: var(--text-secondary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.cell { position: relative; display: grid; height: var(--day-size); }
	.cell::before {
		content: '';
		position: absolute;
		inset-block: 0;
		inset-inline: 0;
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		opacity: 0;
	}
	.cell.is-in-range::before,
	.cell.is-range-start::before,
	.cell.is-range-end::before { opacity: 1; }
	.cell.is-range-start::before { inset-inline-start: 50%; }
	.cell.is-range-end::before { inset-inline-end: 50%; }
	.cell.is-in-range:first-child::before { border-start-start-radius: var(--radius-md); border-end-start-radius: var(--radius-md); }
	.cell.is-in-range:last-child::before { border-start-end-radius: var(--radius-md); border-end-end-radius: var(--radius-md); }
	.cell.is-preview::before { background: color-mix(in oklch, var(--tone) 8%, transparent); }

	.day {
		position: relative;
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		padding: 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font: inherit;
		font-variant-numeric: tabular-nums;
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}
	.day:hover:not(.is-selected):not(.is-disabled) { background: color-mix(in oklch, var(--text-primary) 8%, transparent); }
	.day:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 1px; z-index: 1; }
	.day.is-outside { color: var(--text-secondary); }
	.day.is-today::after {
		content: '';
		position: absolute;
		inset-block-end: 0.3125rem;
		inset-inline-start: 50%;
		width: 0.25rem;
		height: 0.25rem;
		margin-inline-start: -0.125rem;
		border-radius: var(--radius-full);
		background: var(--tone);
	}
	.day.is-selected { background: var(--tone); color: var(--on-accent); font-weight: var(--font-weight-semibold); }
	.day.is-selected.is-today::after { background: var(--on-accent); }
	.day.is-disabled { opacity: 0.35; cursor: not-allowed; }
	.day.is-selected.is-outside { color: var(--on-accent); }
`

type CalendarCellT = {
	iso: IsoDateT
	label: string
	dayNumber: number
	cellClass: string
	dayClass: string
	isDisabled: boolean
	isSelected: boolean
	isToday: boolean
	isTabbable: boolean
}

type BandT = { low: IsoDateT; high: IsoDateT; isPreview: boolean }

const resolveFirstDay = (raw: unknown): number => {
	const numeric = Number(raw)
	const isWeekday = Number.isInteger(numeric) && numeric >= 0 && numeric <= 6
	if (isWeekday) return numeric
	return 0
}

const resolveLocale = (host: HTMLElement, requested: unknown): string | undefined => {
	if (typeof requested === 'string' && requested) return requested
	const documentLanguage = host.closest('[lang]')?.getAttribute('lang')
	if (documentLanguage) return documentLanguage
	return undefined
}

const joinClasses = (names: Array<string | false>): string => names.filter(Boolean).join(' ')

// The range to paint: the real one, or while the end is still being
// chosen, the stretch from the start to the day under the pointer.
const buildBand = (start: IsoDateT | null, end: IsoDateT | null, previewIso: IsoDateT | null): BandT | null => {
	if (!start) return null
	if (end) return { low: start, high: end, isPreview: false }
	if (!previewIso) return null
	const isPreviewBeforeStart = previewIso < start
	if (isPreviewBeforeStart) return { low: previewIso, high: start, isPreview: true }
	return { low: start, high: previewIso, isPreview: true }
}

export const ZCalendar = c(
	(props) => {
		const host = useHost()
		const t = useLocale()
		const gridRef = useRef<HTMLDivElement>()
		const shouldFocusDay = useRef(false)
		const valueProp = useProp<string | null>('value')
		const monthProp = useProp<string>('month')
		const requestedValue = valueProp[0]
		const setValue = valueProp[1]
		const requestedMonth = monthProp[0]
		const setMonth = monthProp[1]
		const focusState = useState<IsoDateT | null>(null)
		const focusedIso = focusState[0]
		const setFocusedIso = focusState[1]
		const previewState = useState<IsoDateT | null>(null)
		const previewIso = previewState[0]
		const setPreviewIso = previewState[1]

		const isRange = Boolean(props.isRange)
		const isDisabled = Boolean(props.isDisabled)
		const isReadonly = Boolean(props.isReadonly)
		const min = normalizeIsoDate(props.min)
		const max = normalizeIsoDate(props.max)
		const firstDayOfWeek = resolveFirstDay(props.firstDayOfWeek)
		const locale = resolveLocale(host.current, props.locale)
		const todayIso = getTodayIso()

		const singleValue = normalizeSingle(requestedValue)
		const rangeValue: DateRangeT = isRange ? normalizeRange(requestedValue) : [singleValue, singleValue]
		const selectionStart = rangeValue[0]
		const selectionEnd = rangeValue[1]
		const isPickingEnd = isRange && selectionStart !== null && selectionEnd === null

		const fallbackMonthIso = clampIso(selectionStart ?? todayIso, min, max)
		const viewMonth = isMonthKey(requestedMonth) ? (requestedMonth as string) : getMonthKey(fallbackMonthIso)
		const firstOfView = getFirstOfMonth(viewMonth)
		const gridDays = buildMonthGrid(viewMonth, firstDayOfWeek)

		const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' })
		const yearFormatter = new Intl.DateTimeFormat(locale, { year: 'numeric' })
		const weekdayShortFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })
		const weekdayLongFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' })
		const fullDateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

		const viewDate = parseIsoDate(firstOfView) as Date
		const monthLabel = monthFormatter.format(viewDate)
		const yearLabel = yearFormatter.format(viewDate)

		const weekdayHeaders = gridDays.slice(0, 7).map((iso) => {
			const date = parseIsoDate(iso) as Date
			return { iso, short: weekdayShortFormatter.format(date), long: weekdayLongFormatter.format(date) }
		})

		const focusStaysInGrid = focusedIso !== null && gridDays.includes(focusedIso)
		const selectedInGrid = selectionStart !== null && gridDays.includes(selectionStart)
		const todayInGrid = gridDays.includes(todayIso)
		const startOfViewMonth = firstOfView
		const tabbableFallback = todayInGrid && getMonthKey(todayIso) === viewMonth ? todayIso : startOfViewMonth
		const tabbableSelection = selectedInGrid && getMonthKey(selectionStart as IsoDateT) === viewMonth ? selectionStart : tabbableFallback
		const tabbableIso = focusStaysInGrid ? focusedIso : tabbableSelection

		const band = buildBand(selectionStart, selectionEnd, isPickingEnd ? previewIso : null)
		const hasBandExtent = band !== null && band.low !== band.high

		const buildCell = (iso: IsoDateT): CalendarCellT => {
			const date = parseIsoDate(iso) as Date
			const isOutside = getMonthKey(iso) !== viewMonth
			const isCellDisabled = isOutsideBounds(iso, min, max)
			const isSelectedStart = iso === selectionStart
			const isSelectedEnd = iso === selectionEnd
			const isSelected = isSelectedStart || isSelectedEnd
			const isToday = iso === todayIso
			const isBandLow = band !== null && iso === band.low
			const isBandHigh = band !== null && iso === band.high
			const isBandMiddle = band !== null && iso > band.low && iso < band.high
			const isPreview = band !== null && band.isPreview
			const cellClass = joinClasses([
				'cell',
				isBandMiddle && 'is-in-range',
				hasBandExtent && isBandLow && 'is-range-start',
				hasBandExtent && isBandHigh && 'is-range-end',
				isPreview && 'is-preview'
			])
			const dayClass = joinClasses([
				'day',
				isOutside && 'is-outside',
				isToday && 'is-today',
				isSelected && 'is-selected',
				isCellDisabled && 'is-disabled'
			])
			return {
				iso,
				label: fullDateFormatter.format(date),
				dayNumber: date.getDate(),
				cellClass,
				dayClass,
				isDisabled: isCellDisabled,
				isSelected,
				isToday,
				isTabbable: iso === tabbableIso
			}
		}

		const weeks = Array.from({ length: 6 }, (_, weekIndex) => gridDays.slice(weekIndex * 7, weekIndex * 7 + 7).map(buildCell))

		const canMove = (iso: IsoDateT): boolean => {
			const monthStart = getFirstOfMonth(getMonthKey(iso))
			const monthEnd = addDays(addMonths(monthStart, 1), -1)
			const isBeforeMin = min !== null && monthEnd < min
			const isAfterMax = max !== null && monthStart > max
			return !isBeforeMin && !isAfterMax
		}
		const canGoPreviousMonth = canMove(addMonths(firstOfView, -1))
		const canGoNextMonth = canMove(addMonths(firstOfView, 1))
		const canGoPreviousYear = canMove(addYears(firstOfView, -1))
		const canGoNextYear = canMove(addYears(firstOfView, 1))

		const showMonth = (monthKey: string) => {
			const isUnchanged = monthKey === viewMonth
			if (isUnchanged) return
			setMonth(monthKey)
			props.monthchange({ month: monthKey })
		}

		const moveView = (targetIso: IsoDateT) => {
			const nextMonthKey = getMonthKey(targetIso)
			const firstOfTarget = getFirstOfMonth(nextMonthKey)
			showMonth(nextMonthKey)
			const keptDay = Number((focusedIso ?? tabbableIso ?? firstOfView).slice(8, 10))
			const dayInTarget = addDays(firstOfTarget, keptDay - 1)
			const isStillInMonth = getMonthKey(dayInTarget) === nextMonthKey
			const landing = isStillInMonth ? dayInTarget : addDays(addMonths(firstOfTarget, 1), -1)
			setFocusedIso(landing)
		}

		const handleArrowClick = (amount: number, unit: 'month' | 'year') => {
			const target = unit === 'month' ? addMonths(firstOfView, amount) : addYears(firstOfView, amount)
			moveView(target)
		}

		const emitSelection = (next: DateRangeT, isComplete: boolean) => {
			const nextValue = isRange ? toRangeText(next) : next[0]
			const detail = buildDateDetail(next, isRange)
			setValue(nextValue)
			props.input(detail)
			if (isComplete) props.change(detail)
		}

		const selectDate = (iso: IsoDateT) => {
			const canSelect = !isDisabled && !isReadonly && !isOutsideBounds(iso, min, max)
			if (!canSelect) return
			setFocusedIso(iso)
			setPreviewIso(null)
			const isOutsideView = getMonthKey(iso) !== viewMonth
			if (isOutsideView) showMonth(getMonthKey(iso))

			if (!isRange) {
				emitSelection([iso, null], true)
				return
			}

			if (!isPickingEnd) {
				emitSelection([iso, null], false)
				return
			}

			const start = selectionStart as IsoDateT
			const isBeforeStart = iso < start
			const completed: DateRangeT = isBeforeStart ? [iso, start] : [start, iso]
			emitSelection(completed, true)
		}

		const findDayButton = (iso: IsoDateT): HTMLButtonElement | null => {
			const root = gridRef.current
			if (!root) return null
			return root.querySelector<HTMLButtonElement>(`[data-iso="${iso}"]`)
		}

		// A move that changes the month renders first, so the day to focus
		// exists only afterwards.
		useEffect(() => {
			if (!shouldFocusDay.current) return
			const target = focusedIso ?? tabbableIso
			const button = target ? findDayButton(target) : null
			if (!button) return
			shouldFocusDay.current = false
			button.focus()
		})

		const focusDay = (iso: IsoDateT) => {
			const bounded = clampIso(iso, min, max)
			shouldFocusDay.current = true
			setFocusedIso(bounded)
			const isOutsideView = getMonthKey(bounded) !== viewMonth
			if (isOutsideView) showMonth(getMonthKey(bounded))
			if (isPickingEnd) setPreviewIso(bounded)
		}

		const resolveDirection = (): 1 | -1 => {
			const isRtl = getComputedStyle(host.current).direction === 'rtl'
			return isRtl ? -1 : 1
		}

		const handleGridKeydown = (keyEvent: KeyboardEvent) => {
			const current = focusedIso ?? tabbableIso ?? firstOfView
			const direction = resolveDirection()
			const currentDate = parseIsoDate(current) as Date
			const weekdayOffset = (currentDate.getDay() - firstDayOfWeek + 7) % 7
			const movesByKey: Record<string, IsoDateT> = {
				ArrowLeft: addDays(current, -1 * direction),
				ArrowRight: addDays(current, direction),
				ArrowUp: addDays(current, -7),
				ArrowDown: addDays(current, 7),
				Home: addDays(current, -weekdayOffset),
				End: addDays(current, 6 - weekdayOffset),
				PageUp: keyEvent.shiftKey ? addYears(current, -1) : addMonths(current, -1),
				PageDown: keyEvent.shiftKey ? addYears(current, 1) : addMonths(current, 1)
			}
			const target = movesByKey[keyEvent.key]
			if (!target) return
			keyEvent.preventDefault()
			focusDay(target)
		}

		const handleGridPointerLeave = () => setPreviewIso(null)

		const handleDayPointerEnter = (iso: IsoDateT) => {
			if (!isPickingEnd) return
			setPreviewIso(iso)
		}

		// calendar.focus() lands on the day that arrow keys would start
		// from, not on the first arrow button.
		useEffect(() => {
			const element = host.current as HTMLElement
			element.focus = () => {
				const tabbableDay = gridRef.current?.querySelector<HTMLButtonElement>('.day[tabindex="0"]')
				tabbableDay?.focus()
			}
		}, [])

		// A value set from outside brings its month into view.
		useEffect(() => {
			if (!selectionStart) return
			setMonth(getMonthKey(selectionStart))
		}, [selectionStart])

		const accessibleName = props.label || t('calendar')
		const calendarClass = joinClasses(['calendar', isDisabled && 'is-disabled'])
		const gridLabelId = 'z-calendar-title'

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<div class={calendarClass} role="group" aria-label={accessibleName}>
					<div class="header">
						<div class="stepper">
							<button class="arrow" type="button" aria-label={t('previousMonth')} disabled={!canGoPreviousMonth} onclick={() => handleArrowClick(-1, 'month')}>
								<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
							</button>
							<span class="title is-month" id={gridLabelId} aria-live="polite">{monthLabel}</span>
							<button class="arrow" type="button" aria-label={t('nextMonth')} disabled={!canGoNextMonth} onclick={() => handleArrowClick(1, 'month')}>
								<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
							</button>
						</div>
						<div class="stepper">
							<button class="arrow" type="button" aria-label={t('previousYear')} disabled={!canGoPreviousYear} onclick={() => handleArrowClick(-1, 'year')}>
								<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
							</button>
							<span class="title is-year" aria-live="polite">{yearLabel}</span>
							<button class="arrow" type="button" aria-label={t('nextYear')} disabled={!canGoNextYear} onclick={() => handleArrowClick(1, 'year')}>
								<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
							</button>
						</div>
					</div>
					<div ref={gridRef} class="grid" role="grid" aria-labelledby={gridLabelId} onkeydown={handleGridKeydown} onpointerleave={handleGridPointerLeave}>
						<div class="week" role="row">
							{weekdayHeaders.map((weekday) => (
								<span key={weekday.iso} class="weekday" role="columnheader" aria-label={weekday.long}>{weekday.short}</span>
							))}
						</div>
						{weeks.map((week) => (
							<div key={week[0].iso} class="week" role="row">
								{week.map((cell) => (
									<div key={cell.iso} class={cell.cellClass} role="gridcell" aria-selected={cell.isSelected ? 'true' : 'false'}>
										<button
											class={cell.dayClass}
											type="button"
											data-iso={cell.iso}
											tabindex={cell.isTabbable ? 0 : -1}
											aria-label={cell.label}
											aria-current={cell.isToday ? 'date' : undefined}
											aria-disabled={cell.isDisabled ? 'true' : undefined}
											onclick={() => selectDate(cell.iso)}
											onpointerenter={() => handleDayPointerEnter(cell.iso)}
										>
											{cell.dayNumber}
										</button>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</host>
		)
	},
	{
		props: {
			value: { type: String, reflect: true },
			month: { type: String, reflect: true },
			min: { type: String, reflect: true },
			max: { type: String, reflect: true },
			firstDayOfWeek: { type: Number, reflect: true },
			locale: String,
			label: String,
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isRange: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isReadonly: { type: Boolean, reflect: true },
			isBorderless: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			input: event<{ value: string | null; start: string | null; end: string | null }>({ bubbles: true, composed: true }),
			change: event<{ value: string | null; start: string | null; end: string | null }>({ bubbles: true, composed: true }),
			monthchange: event<{ month: string }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-calendar', ZCalendar)
