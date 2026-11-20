export const COLOR_ROLES = ['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'danger'] as const

export type ColorRoleT = (typeof COLOR_ROLES)[number]
export type CustomColorsT = Partial<Record<ColorRoleT, string>>

export const PALETTE_RESET_EVENT = 'zest-palette-reset'
export const PALETTE_STORAGE_KEY = 'zest-palette-preference'

export const DEFAULT_COLORS: Record<ColorRoleT, string> = {
	primary: '#e2e9e3',
	secondary: '#9964dd',
	tertiary: '#e45785',
	neutral: '#a5aea7',
	success: '#2fa75b',
	warning: '#e7a800',
	danger: '#ef5555'
}

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i

export const applyPaletteColor = (role: ColorRoleT, color: string): void => {
	document.documentElement.style.setProperty(`--palette-${role}`, color)
	document.documentElement.setAttribute(`data-palette-${role}`, '')
}

export const clearPaletteColor = (role: ColorRoleT): void => {
	document.documentElement.style.removeProperty(`--palette-${role}`)
	document.documentElement.removeAttribute(`data-palette-${role}`)
}

export const readStoredPalette = (): CustomColorsT => {
	if (typeof window === 'undefined') return {}
	try {
		const rawValue = window.localStorage.getItem(PALETTE_STORAGE_KEY)
		if (!rawValue) return {}
		const parsedValue = JSON.parse(rawValue) as Record<string, unknown>
		const storedColors: CustomColorsT = {}
		for (const role of COLOR_ROLES) {
			const color = parsedValue[role]
			const isValidColor = typeof color === 'string' && HEX_COLOR_PATTERN.test(color)
			if (isValidColor) storedColors[role] = color
		}
		return storedColors
	} catch {
		// localStorage might be unavailable, or hold something that is not JSON
		return {}
	}
}

export const writeStoredPalette = (customColors: CustomColorsT): void => {
	if (typeof window === 'undefined') return
	try {
		const hasCustomColors = Object.keys(customColors).length > 0
		if (!hasCustomColors) {
			window.localStorage.removeItem(PALETTE_STORAGE_KEY)
			return
		}
		window.localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify(customColors))
	} catch {
		// localStorage might be unavailable/blocked
	}
}

// apply saved colors as soon as this module loads, before first paint,
// so a returning visitor never sees the default colors flash
if (typeof document !== 'undefined') {
	const savedColors = readStoredPalette()
	for (const role of COLOR_ROLES) {
		const savedColor = savedColors[role]
		if (savedColor) applyPaletteColor(role, savedColor)
	}
}
