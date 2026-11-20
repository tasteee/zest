import { describe, expect, it } from 'vitest'
import {
	addDays,
	addMonths,
	buildMonthGrid,
	formatIsoDate,
	maskTypedDate,
	normalizeRange,
	parseIsoDate,
	parseTypedDate,
	resolveFormat,
	toRangeText
} from '../shared/date-utils'

describe('date-utils', () => {
	it('rejects dates that do not exist', () => {
		expect(parseIsoDate('2026-02-30')).toBeNull()
		expect(parseIsoDate('2026-13-01')).toBeNull()
		expect(parseIsoDate('2026-11-20')).not.toBeNull()
		expect(parseIsoDate('20261120')).toBeNull()
	})

	it('keeps the day when it can and clamps it when it cannot', () => {
		expect(addMonths('2026-01-31', 1)).toBe('2026-02-28')
		expect(addMonths('2026-03-15', -1)).toBe('2026-02-15')
		expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
	})

	it('always builds six weeks, starting on the requested weekday', () => {
		const sundayGrid = buildMonthGrid('2026-11', 0)
		const mondayGrid = buildMonthGrid('2026-11', 1)
		expect(sundayGrid).toHaveLength(42)
		expect(sundayGrid[0]).toBe('2026-11-01')
		expect(mondayGrid[0]).toBe('2026-10-26')
	})

	it('reads dates, intervals, and pairs as a range', () => {
		expect(normalizeRange('2026-11-02/2026-11-09')).toEqual(['2026-11-02', '2026-11-09'])
		expect(normalizeRange('2026-11-02/')).toEqual(['2026-11-02', null])
		expect(normalizeRange(['2026-11-02', 'nonsense'])).toEqual(['2026-11-02', null])
		expect(toRangeText(['2026-11-02', null])).toBe('2026-11-02/')
		expect(toRangeText([null, null])).toBeNull()
	})

	it('falls back to ISO when the format is unusable', () => {
		expect(resolveFormat('MM/DD/YYYY')).toBe('MM/DD/YYYY')
		expect(resolveFormat('MM/YYYY')).toBe('YYYY-MM-DD')
		expect(resolveFormat(undefined)).toBe('YYYY-MM-DD')
	})

	it('formats and parses in any token order', () => {
		expect(formatIsoDate('2026-11-20', 'DD.MM.YYYY')).toBe('20.11.2026')
		expect(parseTypedDate('20.11.2026', 'DD.MM.YYYY')).toBe('2026-11-20')
		expect(parseTypedDate('31.02.2026', 'DD.MM.YYYY')).toBeNull()
		expect(parseTypedDate('20.11.26', 'DD.MM.YYYY')).toBeNull()
	})

	it('shapes typing: digits only, separators filled, short parts padded', () => {
		const typing = { isDeleting: false }
		expect(maskTypedDate('11202026', 'MM/DD/YYYY', typing)).toBe('11/20/2026')
		expect(maskTypedDate('1', 'MM/DD/YYYY', typing)).toBe('1')
		expect(maskTypedDate('5', 'MM/DD/YYYY', typing)).toBe('05/')
		expect(maskTypedDate('1/5', 'MM/DD/YYYY', typing)).toBe('01/05/')
		expect(maskTypedDate('2026-1', 'YYYY-MM-DD', typing)).toBe('2026-1')
		expect(maskTypedDate('abc', 'MM/DD/YYYY', typing)).toBe('')
	})

	it('leaves the trailing separator off while deleting', () => {
		expect(maskTypedDate('11', 'MM/DD/YYYY', { isDeleting: true })).toBe('11')
		expect(maskTypedDate('11', 'MM/DD/YYYY', { isDeleting: false })).toBe('11/')
	})
})
