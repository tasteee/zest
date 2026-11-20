/*
 * Calendar-date helpers shared by z-calendar and z-date-input.
 *
 * A date is passed around as an ISO string, "2026-11-20", never a Date:
 * strings compare correctly with < and >, survive JSON and attributes, and
 * carry no time zone to get wrong. A Date appears only briefly, for
 * calendar arithmetic, and is always built in local time.
 */

export type IsoDateT = string
export type DateRangeT = [IsoDateT | null, IsoDateT | null]
export type DateFormatT = string

export const DEFAULT_DATE_FORMAT: DateFormatT = 'YYYY-MM-DD'

const ISO_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

const padNumber = (value: number, length: number): string => String(value).padStart(length, '0')

// setFullYear takes year, month, and day together, so a day that overflows
// (Feb 30) rolls into the next month once, with no leap-year surprise.
const buildLocalDate = (year: number, month: number, day: number): Date => {
	const date = new Date(0)
	date.setFullYear(year, month, day)
	date.setHours(0, 0, 0, 0)
	return date
}

const isRealDate = (year: number, month: number, day: number): boolean => {
	const date = buildLocalDate(year, month, day)
	const isSameYear = date.getFullYear() === year
	const isSameMonth = date.getMonth() === month
	const isSameDay = date.getDate() === day
	return isSameYear && isSameMonth && isSameDay
}

export const parseIsoDate = (text: unknown): Date | null => {
	if (typeof text !== 'string') return null
	const match = ISO_PATTERN.exec(text.trim())
	if (!match) return null
	const year = Number(match[1])
	const month = Number(match[2]) - 1
	const day = Number(match[3])
	if (!isRealDate(year, month, day)) return null
	return buildLocalDate(year, month, day)
}

export const toIsoDate = (date: Date): IsoDateT => {
	const year = padNumber(date.getFullYear(), 4)
	const month = padNumber(date.getMonth() + 1, 2)
	const day = padNumber(date.getDate(), 2)
	return `${year}-${month}-${day}`
}

export const normalizeIsoDate = (raw: unknown): IsoDateT | null => {
	const date = parseIsoDate(raw)
	if (!date) return null
	return toIsoDate(date)
}

export const getTodayIso = (): IsoDateT => toIsoDate(new Date())

export const addDays = (iso: IsoDateT, amount: number): IsoDateT => {
	const date = parseIsoDate(iso) ?? new Date()
	date.setDate(date.getDate() + amount)
	return toIsoDate(date)
}

// Moving a month keeps the day where it can ("Jan 31" + 1 month is
// "Feb 28"), so arrow keys never skip a month.
export const addMonths = (iso: IsoDateT, amount: number): IsoDateT => {
	const date = parseIsoDate(iso) ?? new Date()
	const day = date.getDate()
	const firstOfTarget = buildLocalDate(date.getFullYear(), date.getMonth() + amount, 1)
	const lastDayOfTarget = buildLocalDate(firstOfTarget.getFullYear(), firstOfTarget.getMonth() + 1, 0).getDate()
	const clampedDay = Math.min(day, lastDayOfTarget)
	return toIsoDate(buildLocalDate(firstOfTarget.getFullYear(), firstOfTarget.getMonth(), clampedDay))
}

export const addYears = (iso: IsoDateT, amount: number): IsoDateT => addMonths(iso, amount * 12)

export const getMonthKey = (iso: IsoDateT): string => iso.slice(0, 7)

export const getFirstOfMonth = (monthKey: string): IsoDateT => `${monthKey}-01`

export const isMonthKey = (raw: unknown): boolean => typeof raw === 'string' && /^\d{4}-\d{2}$/.test(raw) && parseIsoDate(`${raw}-01`) !== null

export const clampIso = (iso: IsoDateT, min: IsoDateT | null, max: IsoDateT | null): IsoDateT => {
	if (min && iso < min) return min
	if (max && iso > max) return max
	return iso
}

export const isOutsideBounds = (iso: IsoDateT, min: IsoDateT | null, max: IsoDateT | null): boolean => {
	const isBeforeMin = Boolean(min) && iso < (min as IsoDateT)
	const isAfterMax = Boolean(max) && iso > (max as IsoDateT)
	return isBeforeMin || isAfterMax
}

// Always 42 days (six weeks), so the calendar never changes height as
// the month changes.
export const buildMonthGrid = (monthKey: string, firstDayOfWeek: number): IsoDateT[] => {
	const first = parseIsoDate(getFirstOfMonth(monthKey)) ?? new Date()
	const offset = (first.getDay() - firstDayOfWeek + 7) % 7
	const gridStart = toIsoDate(first)
	const days: IsoDateT[] = []
	for (const index of Array.from({ length: 42 }, (_, position) => position)) {
		days.push(addDays(gridStart, index - offset))
	}
	return days
}

// Accepts an ISO date, an ISO interval ("a/b", either side optional), or a
// [start, end] pair. Anything unreadable becomes an empty side.
export const normalizeRange = (raw: unknown): DateRangeT => {
	const isText = typeof raw === 'string'
	const pair = isText ? raw.split('/') : Array.isArray(raw) ? raw : []
	const start = normalizeIsoDate(pair[0])
	const end = normalizeIsoDate(pair[1])
	return [start, end]
}

export const normalizeSingle = (raw: unknown): IsoDateT | null => {
	const isArray = Array.isArray(raw)
	if (isArray) return normalizeIsoDate(raw[0])
	return normalizeIsoDate(raw)
}

// A range travels as an ISO 8601 interval, "2026-11-02/2026-11-09".
// Either side may be empty: "2026-11-02/" is a range that has only started.
export const toRangeText = (bounds: DateRangeT): string | null => {
	const isEmpty = bounds[0] === null && bounds[1] === null
	if (isEmpty) return null
	return `${bounds[0] ?? ''}/${bounds[1] ?? ''}`
}

export type DateDetailT = { value: string | null; start: IsoDateT | null; end: IsoDateT | null }

// What `input` and `change` carry. `value` is the text to store; `start`
// and `end` save splitting it. A single date has the same start and end.
export const buildDateDetail = (bounds: DateRangeT, isRange: boolean): DateDetailT => {
	if (isRange) return { value: toRangeText(bounds), start: bounds[0], end: bounds[1] }
	return { value: bounds[0], start: bounds[0], end: bounds[0] }
}

export const isSameRange = (first: DateRangeT, second: DateRangeT): boolean => first[0] === second[0] && first[1] === second[1]

/*
 * Typed formats.
 *
 * A format is the three tokens YYYY, MM, and DD in any order, joined by
 * any punctuation: "MM/DD/YYYY", "DD.MM.YYYY", "YYYY-MM-DD".
 */

type FormatPartT = { kind: 'token'; token: 'YYYY' | 'MM' | 'DD' } | { kind: 'literal'; text: string }

const TOKEN_PATTERN = /YYYY|MM|DD/g

export const isValidFormat = (format: unknown): boolean => {
	if (typeof format !== 'string') return false
	const tokens = format.match(TOKEN_PATTERN) ?? []
	const hasAllThree = tokens.length === 3
	const hasEachOnce = new Set(tokens).size === 3
	return hasAllThree && hasEachOnce
}

export const resolveFormat = (format: unknown): DateFormatT => {
	if (isValidFormat(format)) return format as DateFormatT
	return DEFAULT_DATE_FORMAT
}

const splitFormat = (format: DateFormatT): FormatPartT[] => {
	const parts: FormatPartT[] = []
	let cursor = 0
	for (const match of format.matchAll(TOKEN_PATTERN)) {
		const matchStart = match.index ?? 0
		const hasLiteralBefore = matchStart > cursor
		if (hasLiteralBefore) parts.push({ kind: 'literal', text: format.slice(cursor, matchStart) })
		parts.push({ kind: 'token', token: match[0] as 'YYYY' | 'MM' | 'DD' })
		cursor = matchStart + match[0].length
	}
	const hasTrailingLiteral = cursor < format.length
	if (hasTrailingLiteral) parts.push({ kind: 'literal', text: format.slice(cursor) })
	return parts
}

export const formatIsoDate = (iso: IsoDateT | null, format: DateFormatT): string => {
	const date = parseIsoDate(iso)
	if (!date) return ''
	const values = {
		YYYY: padNumber(date.getFullYear(), 4),
		MM: padNumber(date.getMonth() + 1, 2),
		DD: padNumber(date.getDate(), 2)
	}
	return format.replace(TOKEN_PATTERN, (token) => values[token as keyof typeof values])
}

export const parseTypedDate = (text: string, format: DateFormatT): IsoDateT | null => {
	const parts = splitFormat(format)
	const found: Record<string, number> = {}
	let cursor = 0
	for (const part of parts) {
		const isLiteral = part.kind === 'literal'
		if (isLiteral) {
			const hasLiteral = text.startsWith(part.text, cursor)
			if (!hasLiteral) return null
			cursor += part.text.length
			continue
		}
		const length = part.token.length
		const chunk = text.slice(cursor, cursor + length)
		const isAllDigits = new RegExp(`^\\d{${length}}$`).test(chunk)
		if (!isAllDigits) return null
		found[part.token] = Number(chunk)
		cursor += length
	}
	const hasLeftovers = cursor !== text.length
	if (hasLeftovers) return null
	if (!isRealDate(found.YYYY, found.MM - 1, found.DD)) return null
	return toIsoDate(buildLocalDate(found.YYYY, found.MM - 1, found.DD))
}

// A first digit that can only start a two-digit part ("5" for a month)
// is padded and moves on, so people never type the leading zero.
const shouldPadFirstDigit = (token: 'YYYY' | 'MM' | 'DD', digit: string): boolean => {
	if (token === 'MM') return Number(digit) > 1
	if (token === 'DD') return Number(digit) > 3
	return false
}

type MaskOptionsT = { isDeleting: boolean }

/*
 * Shapes whatever was typed into the format, one character at a time:
 * digits only, separators filled in, short parts padded. When deleting,
 * the trailing separator is left off so backspace is never undone.
 */
export const maskTypedDate = (raw: string, format: DateFormatT, options: MaskOptionsT): string => {
	const parts = splitFormat(format)
	const tokens = parts.filter((part) => part.kind === 'token') as Array<{ kind: 'token'; token: 'YYYY' | 'MM' | 'DD' }>
	const typed: string[] = tokens.map(() => '')
	let tokenIndex = 0

	const isTokenFull = (index: number): boolean => typed[index].length === tokens[index].token.length

	for (const character of raw) {
		const hasRoom = tokenIndex < tokens.length
		if (!hasRoom) break
		const isDigit = /\d/.test(character)
		if (isDigit) {
			const isFirstDigit = typed[tokenIndex].length === 0
			typed[tokenIndex] += character
			const shouldPad = isFirstDigit && shouldPadFirstDigit(tokens[tokenIndex].token, character)
			if (shouldPad) typed[tokenIndex] = `0${character}`
			if (isTokenFull(tokenIndex)) tokenIndex += 1
			continue
		}
		const hasDigits = typed[tokenIndex].length > 0
		const canAdvanceEarly = hasDigits && tokens[tokenIndex].token !== 'YYYY'
		if (!canAdvanceEarly) continue
		typed[tokenIndex] = typed[tokenIndex].padStart(tokens[tokenIndex].token.length, '0')
		tokenIndex += 1
	}

	let output = ''
	let seenTokens = 0
	for (const part of parts) {
		const isLiteral = part.kind === 'literal'
		if (isLiteral) {
			const hasPreviousToken = seenTokens > 0 && isTokenFull(seenTokens - 1)
			const hasNextToken = seenTokens < tokens.length && typed[seenTokens].length > 0
			const shouldWriteLiteral = hasNextToken || (hasPreviousToken && !options.isDeleting)
			if (shouldWriteLiteral) output += part.text
			continue
		}
		output += typed[seenTokens]
		seenTokens += 1
	}
	return output
}
