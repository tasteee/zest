// The color engine behind z-color-panel, z-color-picker and
// z-color-swatch: parse any supported string, hold it in the
// space the active format edits in, and write it back out.
//
// Every color here is an sRGB color. Perceptual formats
// (oklch, lab, ...) describe sRGB colors, and anything a
// person drags or types outside sRGB is pulled back onto the
// gamut edge by lowering chroma, the way CSS maps gamut.
//
// A ColorStateT keeps its coordinates in one working space.
// That is what stops drift: hue survives a trip through gray,
// and switching formats twice does not nudge the color.

export type ColorFormatT = 'hex' | 'rgb' | 'hsl' | 'hsb' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'p3'
export type ColorSpaceT = 'hsv' | 'hsl' | 'lab' | 'lch' | 'oklab' | 'oklch'
export type ColorGroupT = 'standard' | 'perceptual' | 'wideGamut'
export type TripletT = [number, number, number]

export type ColorStateT = {
	space: ColorSpaceT
	coords: TripletT
	alpha: number
}

export type RgbaT = {
	red: number
	green: number
	blue: number
	alpha: number
}

export type ParsedColorT = {
	format: ColorFormatT
	state: ColorStateT
}

export type ChannelKeyT =
	| 'red'
	| 'green'
	| 'blue'
	| 'hue'
	| 'saturation'
	| 'lightness'
	| 'brightness'
	| 'whiteness'
	| 'blackness'
	| 'chroma'
	| 'greenRed'
	| 'blueYellow'
	| 'alpha'

export type ChannelT = {
	key: ChannelKeyT
	symbol: string
	min: number
	max: number
	step: number
	precision: number
}

export type FormatDefinitionT = {
	format: ColorFormatT
	label: string
	group: ColorGroupT
	space: ColorSpaceT
	channels: ChannelT[]
}

export type AxisT = {
	coordIndex: number
	min: number
	max: number
	isWrapping: boolean
}

export type SpaceLayoutT = {
	areaX: AxisT
	areaY: AxisT
	slider: AxisT
	areaLabelKey: 'saturationAndBrightness' | 'saturationAndLightness' | 'chromaAndLightness' | 'colorAxes'
	sliderLabelKey: 'hue' | 'lightness'
}

export const COLOR_FORMATS: ColorFormatT[] = ['hex', 'rgb', 'hsl', 'hsb', 'hwb', 'oklch', 'oklab', 'lch', 'lab', 'p3']
export const COLOR_GROUPS: ColorGroupT[] = ['standard', 'perceptual', 'wideGamut']

const EPSILON = 1e-6
const GAMUT_TOLERANCE = 1e-4
const DEGREES_PER_TURN = 360

// ─── Small math helpers ──────────────────────────────────────

export const clampNumber = (value: number, min: number, max: number): number => {
	return Math.min(max, Math.max(min, value))
}

const wrapHue = (hue: number): number => {
	const wrapped = hue % DEGREES_PER_TURN
	const isNegative = wrapped < 0
	if (isNegative) return wrapped + DEGREES_PER_TURN
	return wrapped
}

const multiplyMatrix = (matrix: number[][], vector: TripletT): TripletT => {
	const first = matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2]
	const second = matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2]
	const third = matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2]
	return [first, second, third]
}

// Rounds, trims trailing zeros, and never prints "-0".
export const roundNumber = (value: number, precision: number): number => {
	const factor = 10 ** precision
	const rounded = Math.round(value * factor) / factor
	const isNegativeZero = Object.is(rounded, -0)
	if (isNegativeZero) return 0
	return rounded
}

// ─── Transfer functions and matrices ─────────────────────────

const decodeGamma = (channel: number): number => {
	const magnitude = Math.abs(channel)
	const isLinearSegment = magnitude <= 0.04045
	if (isLinearSegment) return channel / 12.92
	return Math.sign(channel) * ((magnitude + 0.055) / 1.055) ** 2.4
}

const encodeGamma = (channel: number): number => {
	const magnitude = Math.abs(channel)
	const isLinearSegment = magnitude <= 0.0031308
	if (isLinearSegment) return channel * 12.92
	return Math.sign(channel) * (1.055 * magnitude ** (1 / 2.4) - 0.055)
}

const LINEAR_SRGB_TO_XYZ = [
	[0.41239079926595934, 0.357584339383878, 0.1804807884018343],
	[0.21263900587151027, 0.715168678767756, 0.07219231536073371],
	[0.01933081871559182, 0.11919477979462598, 0.9505321522496607]
]

const XYZ_TO_LINEAR_SRGB = [
	[3.2409699419045226, -1.537383177570094, -0.4986107602930034],
	[-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
	[0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
]

const LINEAR_P3_TO_XYZ = [
	[0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
	[0.2289745640697488, 0.6917385218365064, 0.079286914093745],
	[0, 0.04511338185890264, 1.043944368900976]
]

const XYZ_TO_LINEAR_P3 = [
	[2.493496911941425, -0.9313836179191239, -0.40271078445071684],
	[-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
	[0.03584583024378447, -0.07617238926804182, 0.9568845240076872]
]

const D65_TO_D50 = [
	[1.0479298208405488, 0.022946793341019088, -0.05019222954313557],
	[0.029627815688159344, 0.990434484573249, -0.01707382502938514],
	[-0.009243058152591178, 0.015055144896577895, 0.7518742899580008]
]

const D50_TO_D65 = [
	[0.9554734527042182, -0.023098536874261423, 0.0632593086610217],
	[-0.028369706963208136, 1.0099954580058226, 0.021041398966943008],
	[0.012314001688319899, -0.020507696433477912, 1.3303659366080753]
]

const D50_WHITE: TripletT = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585]
const LAB_EPSILON = 216 / 24389
const LAB_KAPPA = 24389 / 27

const LINEAR_SRGB_TO_LMS = [
	[0.4122214708, 0.5363325363, 0.0514459929],
	[0.2119034982, 0.6806995451, 0.1073969566],
	[0.0883024619, 0.2817188376, 0.6299787005]
]

const LMS_TO_OKLAB = [
	[0.2104542553, 0.793617785, -0.0040720468],
	[1.9779984951, -2.428592205, 0.4505937099],
	[0.0259040371, 0.7827717662, -0.808675766]
]

const OKLAB_TO_LMS = [
	[1, 0.3963377774, 0.2158037573],
	[1, -0.1055613458, -0.0638541728],
	[1, -0.0894841775, -1.291485548]
]

const LMS_TO_LINEAR_SRGB = [
	[4.0767416621, -3.3077115913, 0.2309699292],
	[-1.2684380046, 2.6097574011, -0.3413193965],
	[-0.0041960863, -0.7034186147, 1.707614701]
]

// ─── sRGB ⇄ linear, XYZ, P3 ──────────────────────────────────

const toLinearRgb = (rgb: TripletT): TripletT => {
	return [decodeGamma(rgb[0]), decodeGamma(rgb[1]), decodeGamma(rgb[2])]
}

const fromLinearRgb = (linear: TripletT): TripletT => {
	return [encodeGamma(linear[0]), encodeGamma(linear[1]), encodeGamma(linear[2])]
}

const rgbToP3 = (rgb: TripletT): TripletT => {
	const xyz = multiplyMatrix(LINEAR_SRGB_TO_XYZ, toLinearRgb(rgb))
	return fromLinearRgb(multiplyMatrix(XYZ_TO_LINEAR_P3, xyz))
}

const p3ToRgb = (p3: TripletT): TripletT => {
	const xyz = multiplyMatrix(LINEAR_P3_TO_XYZ, toLinearRgb(p3))
	return fromLinearRgb(multiplyMatrix(XYZ_TO_LINEAR_SRGB, xyz))
}

// ─── sRGB ⇄ HSV, HSL, HWB ────────────────────────────────────

const getRgbHue = (rgb: TripletT, max: number, delta: number): number => {
	const isGray = delta < EPSILON
	if (isGray) return 0
	const isRedMax = max === rgb[0]
	if (isRedMax) return wrapHue(((rgb[1] - rgb[2]) / delta) * 60)
	const isGreenMax = max === rgb[1]
	if (isGreenMax) return wrapHue(((rgb[2] - rgb[0]) / delta + 2) * 60)
	return wrapHue(((rgb[0] - rgb[1]) / delta + 4) * 60)
}

const rgbToHsv = (rgb: TripletT): TripletT => {
	const max = Math.max(rgb[0], rgb[1], rgb[2])
	const min = Math.min(rgb[0], rgb[1], rgb[2])
	const delta = max - min
	const hue = getRgbHue(rgb, max, delta)
	const isBlack = max < EPSILON
	const saturation = isBlack ? 0 : delta / max
	return [hue, saturation, max]
}

const hsvToRgb = (hsv: TripletT): TripletT => {
	const getChannel = (offset: number): number => {
		const sector = (offset + hsv[0] / 60) % 6
		const ramp = Math.max(0, Math.min(sector, 4 - sector, 1))
		return hsv[2] - hsv[2] * hsv[1] * ramp
	}
	return [getChannel(5), getChannel(3), getChannel(1)]
}

const rgbToHsl = (rgb: TripletT): TripletT => {
	const max = Math.max(rgb[0], rgb[1], rgb[2])
	const min = Math.min(rgb[0], rgb[1], rgb[2])
	const delta = max - min
	const hue = getRgbHue(rgb, max, delta)
	const lightness = (max + min) / 2
	const isAchromatic = delta < EPSILON
	if (isAchromatic) return [hue, 0, lightness]
	const saturation = delta / (1 - Math.abs(2 * lightness - 1))
	return [hue, saturation, lightness]
}

const hslToRgb = (hsl: TripletT): TripletT => {
	const chromaAmount = hsl[1] * Math.min(hsl[2], 1 - hsl[2])
	const getChannel = (offset: number): number => {
		const sector = (offset + hsl[0] / 30) % 12
		const ramp = Math.max(-1, Math.min(sector - 3, 9 - sector, 1))
		return hsl[2] - chromaAmount * ramp
	}
	return [getChannel(0), getChannel(8), getChannel(4)]
}

const hsvToHwb = (hsv: TripletT): TripletT => {
	const whiteness = (1 - hsv[1]) * hsv[2]
	const blackness = 1 - hsv[2]
	return [hsv[0], whiteness, blackness]
}

// White and black past 100% together scale down to a gray.
const hwbToHsv = (hwb: TripletT): TripletT => {
	const total = hwb[1] + hwb[2]
	const isOverfull = total >= 1
	if (isOverfull) return [hwb[0], 0, hwb[1] / total]
	const brightness = 1 - hwb[2]
	const saturation = 1 - hwb[1] / brightness
	return [hwb[0], saturation, brightness]
}

// ─── sRGB ⇄ CIE Lab / LCH (D50, as CSS defines them) ─────────

const labForward = (value: number): number => {
	const isAboveEpsilon = value > LAB_EPSILON
	if (isAboveEpsilon) return Math.cbrt(value)
	return (LAB_KAPPA * value + 16) / 116
}

const labInverse = (value: number): number => {
	const cubed = value ** 3
	const isAboveEpsilon = cubed > LAB_EPSILON
	if (isAboveEpsilon) return cubed
	return (116 * value - 16) / LAB_KAPPA
}

const rgbToLab = (rgb: TripletT): TripletT => {
	const xyzD65 = multiplyMatrix(LINEAR_SRGB_TO_XYZ, toLinearRgb(rgb))
	const xyzD50 = multiplyMatrix(D65_TO_D50, xyzD65)
	const fx = labForward(xyzD50[0] / D50_WHITE[0])
	const fy = labForward(xyzD50[1] / D50_WHITE[1])
	const fz = labForward(xyzD50[2] / D50_WHITE[2])
	return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)]
}

const labToRgb = (lab: TripletT): TripletT => {
	const fy = (lab[0] + 16) / 116
	const fx = lab[1] / 500 + fy
	const fz = fy - lab[2] / 200
	const isLightnessAboveKnee = lab[0] > LAB_KAPPA * LAB_EPSILON
	const relativeY = isLightnessAboveKnee ? fy ** 3 : lab[0] / LAB_KAPPA
	const xyzD50: TripletT = [labInverse(fx) * D50_WHITE[0], relativeY * D50_WHITE[1], labInverse(fz) * D50_WHITE[2]]
	const xyzD65 = multiplyMatrix(D50_TO_D65, xyzD50)
	return fromLinearRgb(multiplyMatrix(XYZ_TO_LINEAR_SRGB, xyzD65))
}

// ─── sRGB ⇄ OKLab ────────────────────────────────────────────

const rgbToOklab = (rgb: TripletT): TripletT => {
	const lms = multiplyMatrix(LINEAR_SRGB_TO_LMS, toLinearRgb(rgb))
	const lmsRoot: TripletT = [Math.cbrt(lms[0]), Math.cbrt(lms[1]), Math.cbrt(lms[2])]
	return multiplyMatrix(LMS_TO_OKLAB, lmsRoot)
}

const oklabToRgb = (oklab: TripletT): TripletT => {
	const lmsRoot = multiplyMatrix(OKLAB_TO_LMS, oklab)
	const lms: TripletT = [lmsRoot[0] ** 3, lmsRoot[1] ** 3, lmsRoot[2] ** 3]
	return fromLinearRgb(multiplyMatrix(LMS_TO_LINEAR_SRGB, lms))
}

// ─── Rectangular ⇄ polar (Lab → LCH, OKLab → OKLCH) ──────────

const rectangularToPolar = (rectangular: TripletT): TripletT => {
	const chroma = Math.hypot(rectangular[1], rectangular[2])
	const hue = wrapHue((Math.atan2(rectangular[2], rectangular[1]) * 180) / Math.PI)
	return [rectangular[0], chroma, hue]
}

const polarToRectangular = (polar: TripletT): TripletT => {
	const radians = (polar[2] * Math.PI) / 180
	return [polar[0], polar[1] * Math.cos(radians), polar[1] * Math.sin(radians)]
}

// ─── Working spaces ──────────────────────────────────────────

// Unclamped: values outside 0..1 mean "outside sRGB".
const spaceToRgb = (space: ColorSpaceT, coords: TripletT): TripletT => {
	const isHsv = space === 'hsv'
	if (isHsv) return hsvToRgb(coords)
	const isHsl = space === 'hsl'
	if (isHsl) return hslToRgb(coords)
	const isLab = space === 'lab'
	if (isLab) return labToRgb(coords)
	const isLch = space === 'lch'
	if (isLch) return labToRgb(polarToRectangular(coords))
	const isOklab = space === 'oklab'
	if (isOklab) return oklabToRgb(coords)
	return oklabToRgb(polarToRectangular(coords))
}

const rgbToSpace = (space: ColorSpaceT, rgb: TripletT): TripletT => {
	const isHsv = space === 'hsv'
	if (isHsv) return rgbToHsv(rgb)
	const isHsl = space === 'hsl'
	if (isHsl) return rgbToHsl(rgb)
	const isLab = space === 'lab'
	if (isLab) return rgbToLab(rgb)
	const isLch = space === 'lch'
	if (isLch) return rectangularToPolar(rgbToLab(rgb))
	const isOklab = space === 'oklab'
	if (isOklab) return rgbToOklab(rgb)
	return rectangularToPolar(rgbToOklab(rgb))
}

// Where a space keeps its hue, and below what it has none.
const HUE_SLOT: Record<ColorSpaceT, { hueIndex: number; strengthIndex: number; threshold: number } | null> = {
	hsv: { hueIndex: 0, strengthIndex: 1, threshold: 1e-4 },
	hsl: { hueIndex: 0, strengthIndex: 1, threshold: 1e-4 },
	lch: { hueIndex: 2, strengthIndex: 1, threshold: 0.02 },
	oklch: { hueIndex: 2, strengthIndex: 1, threshold: 0.0002 },
	lab: null,
	oklab: null
}

// Grays have no hue, black has no saturation. When a conversion
// lands there, keep what the previous state in this space had,
// so a slider never snaps back to red mid-drag.
const keepUndefinedCoords = (space: ColorSpaceT, coords: TripletT, previous: ColorStateT | null): TripletT => {
	const isSameSpace = previous !== null && previous.space === space
	if (!isSameSpace) return coords
	const slot = HUE_SLOT[space]
	if (!slot) return coords
	const kept: TripletT = [coords[0], coords[1], coords[2]]
	const hasNoHue = coords[slot.strengthIndex] < slot.threshold
	if (hasNoHue) kept[slot.hueIndex] = previous.coords[slot.hueIndex]
	const isHsvBlack = space === 'hsv' && coords[2] < 1e-4
	if (isHsvBlack) kept[1] = previous.coords[1]
	const isHslAtEdge = space === 'hsl' && (coords[2] < 1e-4 || coords[2] > 1 - 1e-4)
	if (isHslAtEdge) kept[1] = previous.coords[1]
	return kept
}

export const isRgbInGamut = (rgb: TripletT): boolean => {
	const isRedIn = rgb[0] >= -GAMUT_TOLERANCE && rgb[0] <= 1 + GAMUT_TOLERANCE
	const isGreenIn = rgb[1] >= -GAMUT_TOLERANCE && rgb[1] <= 1 + GAMUT_TOLERANCE
	const isBlueIn = rgb[2] >= -GAMUT_TOLERANCE && rgb[2] <= 1 + GAMUT_TOLERANCE
	return isRedIn && isGreenIn && isBlueIn
}

const clampRgb = (rgb: TripletT): TripletT => {
	return [clampNumber(rgb[0], 0, 1), clampNumber(rgb[1], 0, 1), clampNumber(rgb[2], 0, 1)]
}

// Binary search on chroma: the most colorful in-gamut color
// with the same lightness and hue.
const findMaxPolarChroma = (space: 'lch' | 'oklch', polar: TripletT): number => {
	const searchSteps = Array.from({ length: 18 }, (_unused, step) => step)
	let low = 0
	let high = polar[1]
	for (const _step of searchSteps) {
		const middle = (low + high) / 2
		const candidate: TripletT = [polar[0], middle, polar[2]]
		const isInGamut = isRgbInGamut(spaceToRgb(space, candidate))
		if (isInGamut) low = middle
		if (!isInGamut) high = middle
	}
	return low
}

export const fitStateToGamut = (state: ColorStateT): ColorStateT => {
	const rgb = spaceToRgb(state.space, state.coords)
	const isInGamut = isRgbInGamut(rgb)
	if (isInGamut) return state
	const isPolar = state.space === 'lch' || state.space === 'oklch'
	if (isPolar) {
		const polarSpace = state.space as 'lch' | 'oklch'
		const chroma = findMaxPolarChroma(polarSpace, state.coords)
		return { ...state, coords: [state.coords[0], chroma, state.coords[2]] }
	}
	const isRectangular = state.space === 'lab' || state.space === 'oklab'
	if (isRectangular) {
		const polarSpace = state.space === 'lab' ? 'lch' : 'oklch'
		const polar = rectangularToPolar(state.coords)
		const chroma = findMaxPolarChroma(polarSpace, polar)
		const fitted = polarToRectangular([polar[0], chroma, polar[2]])
		return { ...state, coords: fitted }
	}
	return state
}

export const stateToRgba = (state: ColorStateT): RgbaT => {
	const rgb = clampRgb(spaceToRgb(state.space, state.coords))
	return { red: rgb[0], green: rgb[1], blue: rgb[2], alpha: state.alpha }
}

export const rgbaToState = (rgba: RgbaT, space: ColorSpaceT, previous: ColorStateT | null = null): ColorStateT => {
	const rgb: TripletT = [rgba.red, rgba.green, rgba.blue]
	const coords = keepUndefinedCoords(space, rgbToSpace(space, rgb), previous)
	return { space, coords, alpha: rgba.alpha }
}

export const convertState = (state: ColorStateT, space: ColorSpaceT, previous: ColorStateT | null = null): ColorStateT => {
	const isSameSpace = state.space === space
	if (isSameSpace) return state
	return rgbaToState(stateToRgba(state), space, previous)
}

// ─── Format definitions ──────────────────────────────────────

const hueChannel: ChannelT = { key: 'hue', symbol: 'H', min: 0, max: 360, step: 1, precision: 1 }

const percentChannel = (key: ChannelKeyT, symbol: string): ChannelT => {
	return { key, symbol, min: 0, max: 100, step: 1, precision: 1 }
}

const byteChannel = (key: ChannelKeyT, symbol: string): ChannelT => {
	return { key, symbol, min: 0, max: 255, step: 1, precision: 0 }
}

const unitChannel = (key: ChannelKeyT, symbol: string): ChannelT => {
	return { key, symbol, min: 0, max: 1, step: 0.01, precision: 4 }
}

export const FORMAT_DEFINITIONS: Record<ColorFormatT, FormatDefinitionT> = {
	hex: { format: 'hex', label: 'HEX', group: 'standard', space: 'hsv', channels: [] },
	rgb: {
		format: 'rgb',
		label: 'RGB',
		group: 'standard',
		space: 'hsv',
		channels: [byteChannel('red', 'R'), byteChannel('green', 'G'), byteChannel('blue', 'B')]
	},
	hsl: {
		format: 'hsl',
		label: 'HSL',
		group: 'standard',
		space: 'hsl',
		channels: [hueChannel, percentChannel('saturation', 'S'), percentChannel('lightness', 'L')]
	},
	hsb: {
		format: 'hsb',
		label: 'HSB',
		group: 'standard',
		space: 'hsv',
		channels: [hueChannel, percentChannel('saturation', 'S'), percentChannel('brightness', 'B')]
	},
	hwb: {
		format: 'hwb',
		label: 'HWB',
		group: 'standard',
		space: 'hsv',
		channels: [hueChannel, percentChannel('whiteness', 'W'), percentChannel('blackness', 'B')]
	},
	oklch: {
		format: 'oklch',
		label: 'OKLCH',
		group: 'perceptual',
		space: 'oklch',
		channels: [
			percentChannel('lightness', 'L'),
			{ key: 'chroma', symbol: 'C', min: 0, max: 0.4, step: 0.005, precision: 3 },
			hueChannel
		]
	},
	oklab: {
		format: 'oklab',
		label: 'OKLAB',
		group: 'perceptual',
		space: 'oklab',
		channels: [
			percentChannel('lightness', 'L'),
			{ key: 'greenRed', symbol: 'a', min: -0.4, max: 0.4, step: 0.005, precision: 3 },
			{ key: 'blueYellow', symbol: 'b', min: -0.4, max: 0.4, step: 0.005, precision: 3 }
		]
	},
	lch: {
		format: 'lch',
		label: 'LCH',
		group: 'perceptual',
		space: 'lch',
		channels: [
			{ key: 'lightness', symbol: 'L', min: 0, max: 100, step: 1, precision: 2 },
			{ key: 'chroma', symbol: 'C', min: 0, max: 150, step: 1, precision: 2 },
			hueChannel
		]
	},
	lab: {
		format: 'lab',
		label: 'LAB',
		group: 'perceptual',
		space: 'lab',
		channels: [
			{ key: 'lightness', symbol: 'L', min: 0, max: 100, step: 1, precision: 2 },
			{ key: 'greenRed', symbol: 'a', min: -125, max: 125, step: 1, precision: 2 },
			{ key: 'blueYellow', symbol: 'b', min: -125, max: 125, step: 1, precision: 2 }
		]
	},
	p3: {
		format: 'p3',
		label: 'P3',
		group: 'wideGamut',
		space: 'hsv',
		channels: [unitChannel('red', 'R'), unitChannel('green', 'G'), unitChannel('blue', 'B')]
	}
}

export const ALPHA_CHANNEL: ChannelT = { key: 'alpha', symbol: 'A', min: 0, max: 100, step: 1, precision: 0 }

export const checkIsColorFormat = (candidate: unknown): candidate is ColorFormatT => {
	return COLOR_FORMATS.includes(candidate as ColorFormatT)
}

export const getFormatSpace = (format: ColorFormatT): ColorSpaceT => {
	return FORMAT_DEFINITIONS[format].space
}

// ─── Reading and writing channels ────────────────────────────

const toTriplet = (rgba: RgbaT): TripletT => [rgba.red, rgba.green, rgba.blue]

// A format's channels in the units people read and type:
// 0-255 for RGB, percent for saturation, degrees for hue.
export const readChannels = (state: ColorStateT, format: ColorFormatT): number[] => {
	const space = getFormatSpace(format)
	const working = convertState(state, space)
	const rgb = toTriplet(stateToRgba(working))
	const coords = working.coords
	const isRgb = format === 'rgb' || format === 'hex'
	if (isRgb) return [rgb[0] * 255, rgb[1] * 255, rgb[2] * 255]
	const isP3 = format === 'p3'
	if (isP3) return rgbToP3(rgb)
	const isHwb = format === 'hwb'
	if (isHwb) {
		const hwb = hsvToHwb(coords)
		return [hwb[0], hwb[1] * 100, hwb[2] * 100]
	}
	const isPercentHueSpace = format === 'hsl' || format === 'hsb'
	if (isPercentHueSpace) return [coords[0], coords[1] * 100, coords[2] * 100]
	const isOklch = format === 'oklch'
	if (isOklch) return [coords[0] * 100, coords[1], coords[2]]
	const isOklab = format === 'oklab'
	if (isOklab) return [coords[0] * 100, coords[1], coords[2]]
	return [coords[0], coords[1], coords[2]]
}

const rgbToHsvState = (rgb: TripletT, alpha: number, previous: ColorStateT | null): ColorStateT => {
	const clamped = clampRgb(rgb)
	const rgba = { red: clamped[0], green: clamped[1], blue: clamped[2], alpha }
	return rgbaToState(rgba, 'hsv', previous)
}

// The inverse of readChannels. `previous` lets a gray keep
// the hue it had a moment ago.
export const buildStateFromChannels = (
	format: ColorFormatT,
	values: number[],
	alpha: number,
	previous: ColorStateT | null = null
): ColorStateT => {
	const isRgb = format === 'rgb' || format === 'hex'
	if (isRgb) return rgbToHsvState([values[0] / 255, values[1] / 255, values[2] / 255], alpha, previous)
	const isP3 = format === 'p3'
	if (isP3) return rgbToHsvState(p3ToRgb([values[0], values[1], values[2]]), alpha, previous)
	const isHwb = format === 'hwb'
	if (isHwb) {
		const hwb: TripletT = [wrapHue(values[0]), clampNumber(values[1] / 100, 0, 1), clampNumber(values[2] / 100, 0, 1)]
		return { space: 'hsv', coords: hwbToHsv(hwb), alpha }
	}
	const isPercentHueSpace = format === 'hsl' || format === 'hsb'
	if (isPercentHueSpace) {
		const space = getFormatSpace(format)
		const coords: TripletT = [wrapHue(values[0]), clampNumber(values[1] / 100, 0, 1), clampNumber(values[2] / 100, 0, 1)]
		return { space, coords, alpha }
	}
	const isOklch = format === 'oklch'
	if (isOklch) {
		const coords: TripletT = [clampNumber(values[0] / 100, 0, 1), Math.max(0, values[1]), wrapHue(values[2])]
		return fitStateToGamut({ space: 'oklch', coords, alpha })
	}
	const isOklab = format === 'oklab'
	if (isOklab) {
		const coords: TripletT = [clampNumber(values[0] / 100, 0, 1), values[1], values[2]]
		return fitStateToGamut({ space: 'oklab', coords, alpha })
	}
	const isLch = format === 'lch'
	if (isLch) {
		const coords: TripletT = [clampNumber(values[0], 0, 100), Math.max(0, values[1]), wrapHue(values[2])]
		return fitStateToGamut({ space: 'lch', coords, alpha })
	}
	const coords: TripletT = [clampNumber(values[0], 0, 100), values[1], values[2]]
	return fitStateToGamut({ space: 'lab', coords, alpha })
}

// ─── Formatting ──────────────────────────────────────────────

const toHexByte = (unit: number): string => {
	const byte = Math.round(clampNumber(unit, 0, 1) * 255)
	return byte.toString(16).padStart(2, '0').toUpperCase()
}

const buildAlphaSuffix = (alpha: number): string => {
	const isOpaque = alpha >= 1
	if (isOpaque) return ''
	const percent = roundNumber(alpha * 100, 1)
	return ` / ${percent}%`
}

export const formatHex = (rgba: RgbaT): string => {
	const opaqueHex = `#${toHexByte(rgba.red)}${toHexByte(rgba.green)}${toHexByte(rgba.blue)}`
	const isOpaque = rgba.alpha >= 1
	if (isOpaque) return opaqueHex
	return `${opaqueHex}${toHexByte(rgba.alpha)}`
}

// The CSS string for a state in a format. Alpha is written
// only when the color is not fully opaque, the way CSS
// serializes: hex grows to 8 digits, functions gain "/ a%".
export const formatColor = (state: ColorStateT, format: ColorFormatT): string => {
	const rgba = stateToRgba(state)
	const isHex = format === 'hex'
	if (isHex) return formatHex(rgba)
	const channels = readChannels(state, format)
	const alphaSuffix = buildAlphaSuffix(state.alpha)
	const isRgb = format === 'rgb'
	if (isRgb) {
		const bytes = channels.map((channel) => Math.round(channel))
		return `rgb(${bytes[0]} ${bytes[1]} ${bytes[2]}${alphaSuffix})`
	}
	const isP3 = format === 'p3'
	if (isP3) {
		const units = channels.map((channel) => roundNumber(clampNumber(channel, 0, 1), 4))
		return `color(display-p3 ${units[0]} ${units[1]} ${units[2]}${alphaSuffix})`
	}
	const isPercentHueSpace = format === 'hsl' || format === 'hsb' || format === 'hwb'
	if (isPercentHueSpace) {
		const hue = roundNumber(channels[0], 1)
		const second = roundNumber(channels[1], 1)
		const third = roundNumber(channels[2], 1)
		return `${format}(${hue} ${second}% ${third}%${alphaSuffix})`
	}
	const isOklch = format === 'oklch'
	if (isOklch) {
		const lightness = roundNumber(channels[0], 2)
		const chroma = roundNumber(channels[1], 4)
		const hue = roundNumber(channels[2], 2)
		return `oklch(${lightness}% ${chroma} ${hue}${alphaSuffix})`
	}
	const isOklab = format === 'oklab'
	if (isOklab) {
		const lightness = roundNumber(channels[0], 2)
		const greenRed = roundNumber(channels[1], 4)
		const blueYellow = roundNumber(channels[2], 4)
		return `oklab(${lightness}% ${greenRed} ${blueYellow}${alphaSuffix})`
	}
	const rounded = channels.map((channel) => roundNumber(channel, 2))
	return `${format}(${rounded[0]} ${rounded[1]} ${rounded[2]}${alphaSuffix})`
}

// ─── Parsing ─────────────────────────────────────────────────

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const FUNCTION_PATTERN = /^([a-z-]+)\(\s*(.*)\s*\)$/i

const expandShortHex = (digits: string): string => {
	const isShort = digits.length <= 4
	if (!isShort) return digits
	return digits
		.split('')
		.map((digit) => `${digit}${digit}`)
		.join('')
}

const parseHex = (text: string): RgbaT | null => {
	const match = text.match(HEX_PATTERN)
	if (!match) return null
	const digits = expandShortHex(match[1])
	const readByte = (start: number): number => parseInt(digits.slice(start, start + 2), 16) / 255
	const hasAlpha = digits.length === 8
	const alpha = hasAlpha ? readByte(6) : 1
	return { red: readByte(0), green: readByte(2), blue: readByte(4), alpha }
}

// One token of a CSS color function. `percentScale` is what
// 100% means for this channel; hue units become degrees.
const parseToken = (token: string, percentScale: number): number | null => {
	const isNone = token === 'none'
	if (isNone) return 0
	const match = token.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|rad|grad|turn)?$/i)
	if (!match) return null
	const amount = parseFloat(match[1])
	const unit = (match[2] || '').toLowerCase()
	const isPercent = unit === '%'
	if (isPercent) return (amount / 100) * percentScale
	const isRadians = unit === 'rad'
	if (isRadians) return (amount * 180) / Math.PI
	const isGradians = unit === 'grad'
	if (isGradians) return amount * 0.9
	const isTurns = unit === 'turn'
	if (isTurns) return amount * DEGREES_PER_TURN
	return amount
}

type FunctionArgumentsT = { channels: string[]; alpha: string | null }

const splitArguments = (body: string): FunctionArgumentsT | null => {
	const hasCommas = body.includes(',')
	if (hasCommas) {
		const parts = body.split(',').map((part) => part.trim())
		const isValidCount = parts.length === 3 || parts.length === 4
		if (!isValidCount) return null
		const alpha = parts[3] ?? null
		return { channels: parts.slice(0, 3), alpha }
	}
	const slashParts = body.split('/')
	const isValidSlash = slashParts.length <= 2
	if (!isValidSlash) return null
	const channels = slashParts[0].trim().split(/\s+/)
	const alphaText = slashParts[1]?.trim()
	const alpha = alphaText ? alphaText : null
	return { channels, alpha }
}

const parseAlpha = (alphaText: string | null): number | null => {
	const isMissing = alphaText === null
	if (isMissing) return 1
	const alpha = parseToken(alphaText, 1)
	const isInvalid = alpha === null
	if (isInvalid) return null
	return clampNumber(alpha, 0, 1)
}

// What 100% means for each channel of each function, and
// which format the function belongs to.
const FUNCTION_SPECS: Record<string, { format: ColorFormatT; scales: TripletT }> = {
	rgb: { format: 'rgb', scales: [255, 255, 255] },
	rgba: { format: 'rgb', scales: [255, 255, 255] },
	hsl: { format: 'hsl', scales: [1, 100, 100] },
	hsla: { format: 'hsl', scales: [1, 100, 100] },
	hsb: { format: 'hsb', scales: [1, 100, 100] },
	hsba: { format: 'hsb', scales: [1, 100, 100] },
	hsv: { format: 'hsb', scales: [1, 100, 100] },
	hsva: { format: 'hsb', scales: [1, 100, 100] },
	hwb: { format: 'hwb', scales: [1, 100, 100] },
	lab: { format: 'lab', scales: [100, 125, 125] },
	lch: { format: 'lch', scales: [100, 150, 1] },
	oklab: { format: 'oklab', scales: [100, 0.4, 0.4] },
	oklch: { format: 'oklch', scales: [100, 0.4, 1] }
}

// OKLab and OKLCH lightness is 0-1 as a bare number but
// read here in percent, like the channel fields show it.
const normalizeLightness = (format: ColorFormatT, token: string, value: number): number => {
	const isOkFormat = format === 'oklab' || format === 'oklch'
	if (!isOkFormat) return value
	const isPercentToken = token.endsWith('%')
	if (isPercentToken) return value
	return value * 100
}

const parseColorFunction = (name: string, args: FunctionArgumentsT): ParsedColorT | null => {
	const isColorFunction = name === 'color'
	if (isColorFunction) return parseColorSpaceFunction(args)
	const spec = FUNCTION_SPECS[name]
	if (!spec) return null
	const hasThreeChannels = args.channels.length === 3
	if (!hasThreeChannels) return null
	const values = args.channels.map((token, index) => parseToken(token, spec.scales[index]))
	const hasInvalidValue = values.some((value) => value === null)
	if (hasInvalidValue) return null
	const alpha = parseAlpha(args.alpha)
	const isInvalidAlpha = alpha === null
	if (isInvalidAlpha) return null
	const numbers = values as number[]
	const lightnessFirst = normalizeLightness(spec.format, args.channels[0], numbers[0])
	const normalized = [lightnessFirst, numbers[1], numbers[2]]
	const state = buildStateFromChannels(spec.format, normalized, alpha)
	return { format: spec.format, state }
}

// color(display-p3 r g b) and color(srgb r g b).
const parseColorSpaceFunction = (args: FunctionArgumentsT): ParsedColorT | null => {
	const spaceName = args.channels[0]
	const isKnownSpace = spaceName === 'display-p3' || spaceName === 'srgb'
	if (!isKnownSpace) return null
	const channelTokens = args.channels.slice(1)
	const hasThreeChannels = channelTokens.length === 3
	if (!hasThreeChannels) return null
	const values = channelTokens.map((token) => parseToken(token, 1))
	const hasInvalidValue = values.some((value) => value === null)
	if (hasInvalidValue) return null
	const alpha = parseAlpha(args.alpha)
	const isInvalidAlpha = alpha === null
	if (isInvalidAlpha) return null
	const numbers = values as number[]
	const isP3 = spaceName === 'display-p3'
	if (isP3) return { format: 'p3', state: buildStateFromChannels('p3', numbers, alpha) }
	const bytes = numbers.map((value) => value * 255)
	return { format: 'rgb', state: buildStateFromChannels('rgb', bytes, alpha) }
}

// Named colors ("rebeccapurple") come from the browser itself,
// so the engine does not carry a 148-entry table.
const parseNamedColor = (text: string): ParsedColorT | null => {
	const isWord = /^[a-z]+$/i.test(text)
	if (!isWord) return null
	const hasDocument = typeof document !== 'undefined'
	if (!hasDocument) return null
	const context = document.createElement('canvas').getContext?.('2d')
	if (!context) return null
	context.fillStyle = '#010203'
	context.fillStyle = text
	const resolved = String(context.fillStyle)
	const isUnrecognized = resolved === '#010203'
	if (isUnrecognized) return null
	const rgba = parseHex(resolved)
	if (!rgba) return null
	return { format: 'hex', state: rgbaToState(rgba, 'hsv') }
}

export const parseColor = (input: string | null | undefined): ParsedColorT | null => {
	const text = String(input ?? '').trim().toLowerCase()
	const isEmpty = text === ''
	if (isEmpty) return null
	const hexRgba = parseHex(text)
	if (hexRgba) return { format: 'hex', state: rgbaToState(hexRgba, 'hsv') }
	const functionMatch = text.match(FUNCTION_PATTERN)
	if (!functionMatch) return parseNamedColor(text)
	const args = splitArguments(functionMatch[2])
	if (!args) return null
	return parseColorFunction(functionMatch[1], args)
}

// ─── The 2D area and the slider beside it ────────────────────

export const SPACE_LAYOUTS: Record<ColorSpaceT, SpaceLayoutT> = {
	hsv: {
		areaX: { coordIndex: 1, min: 0, max: 1, isWrapping: false },
		areaY: { coordIndex: 2, min: 0, max: 1, isWrapping: false },
		slider: { coordIndex: 0, min: 0, max: 360, isWrapping: true },
		areaLabelKey: 'saturationAndBrightness',
		sliderLabelKey: 'hue'
	},
	hsl: {
		areaX: { coordIndex: 1, min: 0, max: 1, isWrapping: false },
		areaY: { coordIndex: 2, min: 0, max: 1, isWrapping: false },
		slider: { coordIndex: 0, min: 0, max: 360, isWrapping: true },
		areaLabelKey: 'saturationAndLightness',
		sliderLabelKey: 'hue'
	},
	lch: {
		areaX: { coordIndex: 1, min: 0, max: 135, isWrapping: false },
		areaY: { coordIndex: 0, min: 0, max: 100, isWrapping: false },
		slider: { coordIndex: 2, min: 0, max: 360, isWrapping: true },
		areaLabelKey: 'chromaAndLightness',
		sliderLabelKey: 'hue'
	},
	oklch: {
		areaX: { coordIndex: 1, min: 0, max: 0.33, isWrapping: false },
		areaY: { coordIndex: 0, min: 0, max: 1, isWrapping: false },
		slider: { coordIndex: 2, min: 0, max: 360, isWrapping: true },
		areaLabelKey: 'chromaAndLightness',
		sliderLabelKey: 'hue'
	},
	lab: {
		areaX: { coordIndex: 1, min: -112, max: 112, isWrapping: false },
		areaY: { coordIndex: 2, min: -112, max: 112, isWrapping: false },
		slider: { coordIndex: 0, min: 0, max: 100, isWrapping: false },
		areaLabelKey: 'colorAxes',
		sliderLabelKey: 'lightness'
	},
	oklab: {
		areaX: { coordIndex: 1, min: -0.32, max: 0.32, isWrapping: false },
		areaY: { coordIndex: 2, min: -0.32, max: 0.32, isWrapping: false },
		slider: { coordIndex: 0, min: 0, max: 1, isWrapping: false },
		areaLabelKey: 'colorAxes',
		sliderLabelKey: 'lightness'
	}
}

const toFraction = (axis: AxisT, value: number): number => {
	return clampNumber((value - axis.min) / (axis.max - axis.min), 0, 1)
}

const fromFraction = (axis: AxisT, fraction: number): number => {
	return axis.min + clampNumber(fraction, 0, 1) * (axis.max - axis.min)
}

export type AreaPointT = { x: number; y: number }

// 0-1 from the left and from the top of the area.
export const getAreaPoint = (state: ColorStateT): AreaPointT => {
	const layout = SPACE_LAYOUTS[state.space]
	const x = toFraction(layout.areaX, state.coords[layout.areaX.coordIndex])
	const y = 1 - toFraction(layout.areaY, state.coords[layout.areaY.coordIndex])
	return { x, y }
}

const placeAreaPoint = (state: ColorStateT, point: AreaPointT): ColorStateT => {
	const layout = SPACE_LAYOUTS[state.space]
	const coords: TripletT = [state.coords[0], state.coords[1], state.coords[2]]
	coords[layout.areaX.coordIndex] = fromFraction(layout.areaX, point.x)
	coords[layout.areaY.coordIndex] = fromFraction(layout.areaY, 1 - point.y)
	return { ...state, coords }
}

export const setAreaPoint = (state: ColorStateT, point: AreaPointT): ColorStateT => {
	return fitStateToGamut(placeAreaPoint(state, point))
}

export const getSliderFraction = (state: ColorStateT): number => {
	const layout = SPACE_LAYOUTS[state.space]
	return toFraction(layout.slider, state.coords[layout.slider.coordIndex])
}

export const setSliderFraction = (state: ColorStateT, fraction: number): ColorStateT => {
	const layout = SPACE_LAYOUTS[state.space]
	const coords: TripletT = [state.coords[0], state.coords[1], state.coords[2]]
	coords[layout.slider.coordIndex] = fromFraction(layout.slider, fraction)
	return fitStateToGamut({ ...state, coords })
}

// The pixel at a point of the area, or null outside sRGB.
// Painted unmapped, so the gamut edge is visible.
export const getAreaPixel = (state: ColorStateT, point: AreaPointT): TripletT | null => {
	const placed = placeAreaPoint(state, point)
	const rgb = spaceToRgb(placed.space, placed.coords)
	const isInGamut = isRgbInGamut(rgb)
	if (!isInGamut) return null
	return clampRgb(rgb)
}

// A vivid reference for each hue, so the hue track stays
// readable even while the chosen color is a gray.
const HUE_TRACK_REFERENCE: Record<ColorSpaceT, TripletT> = {
	hsv: [0, 1, 1],
	hsl: [0, 1, 0.5],
	lch: [70, 60, 0],
	oklch: [0.75, 0.15, 0],
	lab: [0, 0, 0],
	oklab: [0, 0, 0]
}

const SLIDER_STOP_COUNT = 13

// Hex stops for the slider track, left to right.
export const getSliderStops = (state: ColorStateT): string[] => {
	const layout = SPACE_LAYOUTS[state.space]
	const isHueSlider = layout.sliderLabelKey === 'hue'
	const base: ColorStateT = isHueSlider ? { space: state.space, coords: HUE_TRACK_REFERENCE[state.space], alpha: 1 } : { ...state, alpha: 1 }
	const stopIndexes = Array.from({ length: SLIDER_STOP_COUNT }, (_unused, index) => index)
	return stopIndexes.map((stopIndex) => {
		const fraction = stopIndex / (SLIDER_STOP_COUNT - 1)
		const stopState = setSliderFraction(base, fraction)
		return formatHex(stateToRgba(stopState))
	})
}

// A readable foreground (thumb ring, check mark) for a color.
export const getRelativeLuminance = (rgba: RgbaT): number => {
	const linear = toLinearRgb(toTriplet(rgba))
	return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}

// ─── Shared component helpers ────────────────────────────────

export const DEFAULT_COLOR = '#BF40BF'

export type ColorDetailT = {
	value: string
	format: ColorFormatT
	hex: string
	alpha: number
}

export type ResolvedColorT = {
	format: ColorFormatT
	state: ColorStateT
	text: string
}

// The formats a developer allowed, in the menu's own order.
// Anything unknown is dropped; nothing allowed means all.
export const resolveAllowedFormats = (requested: unknown): ColorFormatT[] => {
	const isList = Array.isArray(requested)
	if (!isList) return COLOR_FORMATS
	const allowed = COLOR_FORMATS.filter((format) => requested.includes(format))
	const hasAny = allowed.length > 0
	if (!hasAny) return COLOR_FORMATS
	return allowed
}

const pickActiveFormat = (requested: unknown, parsedFormat: ColorFormatT | null, allowed: ColorFormatT[]): ColorFormatT => {
	const isRequestedAllowed = checkIsColorFormat(requested) && allowed.includes(requested)
	if (isRequestedAllowed) return requested as ColorFormatT
	const isParsedAllowed = parsedFormat !== null && allowed.includes(parsedFormat)
	if (isParsedAllowed) return parsedFormat
	return allowed[0]
}

// What a value prop means right now: its format (the one asked
// for, else the one it was written in), its state in that
// format's space, and the string it shows as.
export const resolveColor = (value: unknown, requestedFormat: unknown, allowed: ColorFormatT[]): ResolvedColorT => {
	const parsed = parseColor(String(value ?? '')) ?? parseColor(DEFAULT_COLOR)
	const source = parsed as ParsedColorT
	const format = pickActiveFormat(requestedFormat, source.format, allowed)
	const state = convertState(source.state, getFormatSpace(format))
	const text = formatColor(state, format)
	return { format, state, text }
}

export const buildColorDetail = (state: ColorStateT, format: ColorFormatT): ColorDetailT => {
	const value = formatColor(state, format)
	const hex = formatHex(stateToRgba(state))
	return { value, format, hex, alpha: state.alpha }
}
