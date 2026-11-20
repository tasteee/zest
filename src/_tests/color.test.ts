import { describe, expect, it } from 'vitest'
import {
	COLOR_FORMATS,
	convertState,
	formatColor,
	getAreaPoint,
	parseColor,
	readChannels,
	setAreaPoint,
	setSliderFraction,
	stateToRgba,
	type ColorFormatT
} from '../shared/color'

const parseOrThrow = (text: string) => {
	const parsed = parseColor(text)
	if (!parsed) throw new Error(`Expected "${text}" to parse`)
	return parsed
}

const toHex = (text: string): string => {
	const parsed = parseOrThrow(text)
	return formatColor(parsed.state, 'hex')
}

describe('parseColor', () => {
	it.each([
		['#bf40bf', 'hex', '#BF40BF'],
		['#BF40BF80', 'hex', '#BF40BF80'],
		['#f0f', 'hex', '#FF00FF'],
		['rgb(191 64 191)', 'rgb', '#BF40BF'],
		['rgba(191, 64, 191, 0.5)', 'rgb', '#BF40BF80'],
		['hsl(300 50% 50%)', 'hsl', '#BF40BF'],
		['hsla(300, 50%, 50%, 50%)', 'hsl', '#BF40BF80'],
		['hsb(300 66.5% 74.9%)', 'hsb', '#BF40BF'],
		['hwb(300 25.1% 25.1%)', 'hwb', '#BF40BF'],
		['oklch(62.8% 0.2577 29.23)', 'oklch', '#FF0000'],
		['oklch(0.628 0.2577 29.23)', 'oklch', '#FF0000'],
		['oklab(62.8% 0.2249 0.1258)', 'oklab', '#FF0000'],
		['lab(54.29 80.8 69.89)', 'lab', '#FF0000'],
		['lch(54.29 106.84 40.85)', 'lch', '#FF0000'],
		['color(display-p3 0.9176 0.2003 0.1386)', 'p3', '#FF0000']
	])('reads %s as %s', (text, format, hex) => {
		const parsed = parseOrThrow(text)
		expect(parsed.format).toBe(format)
		expect(formatColor(parsed.state, 'hex')).toBe(hex)
	})

	it.each(['', 'nope(1 2 3)', '#12', 'rgb(1 2)', 'rgb(a b c)'])('rejects %j', (text) => {
		expect(parseColor(text)).toBeNull()
	})
})

describe('formatColor', () => {
	it.each([
		['rgb', 'rgb(191 64 191)'],
		['hsl', 'hsl(300 49.8% 50%)'],
		['hsb', 'hsb(300 66.5% 74.9%)'],
		['hwb', 'hwb(300 25.1% 25.1%)']
	])('writes #BF40BF as %s', (format, expected) => {
		const parsed = parseOrThrow('#BF40BF')
		const converted = convertState(parsed.state, parseOrThrow('#000').state.space)
		expect(formatColor(converted, format as ColorFormatT)).toBe(expected)
	})

	it('writes alpha only when the color is translucent', () => {
		const opaque = parseOrThrow('rgb(10 20 30)')
		const translucent = parseOrThrow('rgb(10 20 30 / 40%)')
		expect(formatColor(opaque.state, 'rgb')).toBe('rgb(10 20 30)')
		expect(formatColor(translucent.state, 'rgb')).toBe('rgb(10 20 30 / 40%)')
		expect(formatColor(translucent.state, 'hex')).toBe('#0A141E66')
	})

	it.each(COLOR_FORMATS)('round-trips through %s without moving the color', (format) => {
		const original = parseOrThrow('#3A7BD5')
		const written = formatColor(original.state, format)
		const reread = parseOrThrow(written)
		expect(formatColor(reread.state, 'hex')).toBe('#3A7BD5')
	})
})

describe('working state', () => {
	it('keeps hue when a color passes through gray', () => {
		const purple = parseOrThrow('hsb(280 80% 80%)').state
		const gray = setAreaPoint(purple, { x: 0, y: 0.5 })
		const backToColor = setAreaPoint(gray, { x: 1, y: 0 })
		expect(readChannels(backToColor, 'hsb')[0]).toBeCloseTo(280, 5)
	})

	it('pulls out-of-gamut OKLCH picks back onto sRGB', () => {
		const blue = parseOrThrow('oklch(50% 0.1 264)').state
		const tooVivid = setAreaPoint(blue, { x: 1, y: 0.5 })
		const rgba = stateToRgba(tooVivid)
		expect(Math.min(rgba.red, rgba.green, rgba.blue)).toBeGreaterThanOrEqual(0)
		expect(getAreaPoint(tooVivid).x).toBeLessThan(1)
	})

	it('moves lightness with the OKLAB slider', () => {
		const color = parseOrThrow('oklab(50% 0 0)').state
		const lighter = setSliderFraction(color, 0.9)
		expect(readChannels(lighter, 'oklab')[0]).toBeCloseTo(90, 5)
	})

	it('treats legacy hex input as uppercase hex', () => {
		expect(toHex('#6d28d9')).toBe('#6D28D9')
	})
})
