// The theme layer behind <z-theme-switcher>.
//
// Two ideas are kept deliberately separate here, because conflating them is
// what makes most theme switchers feel broken:
//
//   preference — what the reader asked for: 'light', 'dark', or 'system'.
//                This is what persists and what the switcher's UI reflects.
//   theme      — what is actually painted right now: 'light' or 'dark'.
//                Under the 'system' preference this tracks the OS and can
//                change without anyone touching the switcher.
//
// Applying a theme means writing data-theme onto <html>, which is what every
// token block in ink.css keys off. Custom properties cross shadow boundaries,
// so that single attribute re-themes every z-* element on the page.

export const ThemePreference = {
	light: 'light',
	dark: 'dark',
	system: 'system'
} as const

export type ThemePreferenceT = (typeof ThemePreference)[keyof typeof ThemePreference]

export const Theme = {
	light: 'light',
	dark: 'dark'
} as const

export type ThemeT = (typeof Theme)[keyof typeof Theme]

export type ThemeStateT = {
	preference: ThemePreferenceT
	theme: ThemeT
}

export type ThemeListenerT = (state: ThemeStateT) => void

const STORAGE_KEY = 'zest-theme-preference'
const THEME_ATTRIBUTE = 'data-theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

const listeners = new Set<ThemeListenerT>()

let currentPreference: ThemePreferenceT = ThemePreference.system

const checkIsBrowser = (): boolean => {
	return typeof document !== 'undefined'
}

const checkIsThemePreference = (candidate: string | null): candidate is ThemePreferenceT => {
	if (candidate === ThemePreference.light) return true
	if (candidate === ThemePreference.dark) return true
	if (candidate === ThemePreference.system) return true
	return false
}

// Storage is allowed to fail — Safari in private mode throws on read, and an
// embedded page can have storage blocked outright. A theme switcher losing
// its memory is a much smaller problem than one that throws on boot, so both
// accessors degrade to "no stored preference" instead.
const readStoredPreference = (): ThemePreferenceT | null => {
	if (!checkIsBrowser()) return null

	try {
		const stored = window.localStorage.getItem(STORAGE_KEY)
		if (!checkIsThemePreference(stored)) return null
		return stored
	} catch {
		return null
	}
}

const writeStoredPreference = (preference: ThemePreferenceT): void => {
	if (!checkIsBrowser()) return

	try {
		window.localStorage.setItem(STORAGE_KEY, preference)
	} catch {
		return
	}
}

const getDarkQuery = (): MediaQueryList | null => {
	const hasMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
	if (!hasMatchMedia) return null
	return window.matchMedia(DARK_QUERY)
}

export const getSystemTheme = (): ThemeT => {
	const darkQuery = getDarkQuery()
	if (!darkQuery) return Theme.dark
	return darkQuery.matches ? Theme.dark : Theme.light
}

// zest is a dark-first library, so 'system' resolves to dark on any platform
// that won't tell us its preference.
export const resolveTheme = (preference: ThemePreferenceT): ThemeT => {
	if (preference === ThemePreference.light) return Theme.light
	if (preference === ThemePreference.dark) return Theme.dark
	return getSystemTheme()
}

export const getThemePreference = (): ThemePreferenceT => {
	return currentPreference
}

export const getTheme = (): ThemeT => {
	return resolveTheme(currentPreference)
}

const buildThemeState = (): ThemeStateT => {
	return { preference: currentPreference, theme: resolveTheme(currentPreference) }
}

const applyThemeAttribute = (): void => {
	if (!checkIsBrowser()) return
	document.documentElement.setAttribute(THEME_ATTRIBUTE, resolveTheme(currentPreference))
}

const checkIsTheme = (candidate: string | null): candidate is ThemeT => {
	if (candidate === Theme.light) return true
	if (candidate === Theme.dark) return true
	return false
}

// A theme the page itself declared, by writing data-theme onto <html> in the
// markup or from an inline head script.
const readAuthoredTheme = (): ThemeT | null => {
	if (!checkIsBrowser()) return null

	const authored = document.documentElement.getAttribute(THEME_ATTRIBUTE)
	if (!checkIsTheme(authored)) return null
	return authored
}

const notifyListeners = (): void => {
	const state = buildThemeState()
	for (const listener of listeners) listener(state)
}

// --- Transitioning between themes ---------------------------------------
//
// A theme swap changes hundreds of values at once, most of which cannot be
// transitioned in CSS: custom properties don't interpolate unless registered,
// and the light theme swaps gradients and a translucent surface, neither of
// which can animate from their dark-theme equivalents at all.
//
// The View Transition API sidesteps the whole problem by working on pixels
// rather than values. It snapshots the page, applies the change, and
// cross-fades the two frames — so gradients, shadow DOM and translucency all
// come along for free.
//
// Browsers without it fall back to fading the page down and back up around
// the swap. Half the budget out, half the budget in.

const ANIMATING_CLASS = 'isThemeAnimating'
const FADING_CLASS = 'isThemeFading'
const DURATION_PROPERTY = '--theme-transition-duration'
const FALLBACK_DURATION_MS = 600

const parseDurationMs = (rawDuration: string): number | null => {
	const trimmed = rawDuration.trim()

	const isMilliseconds = trimmed.endsWith('ms')
	if (isMilliseconds) {
		const milliseconds = Number.parseFloat(trimmed)
		return Number.isFinite(milliseconds) ? milliseconds : null
	}

	const isSeconds = trimmed.endsWith('s')
	if (!isSeconds) return null

	const seconds = Number.parseFloat(trimmed)
	if (!Number.isFinite(seconds)) return null
	return seconds * 1000
}

// The token is the single source of truth for how long a theme change takes.
// The view-transition path follows it through CSS on its own; the fallback
// fade is driven from here, so it has to read the same value rather than keep
// a copy that could drift the moment anyone retimes the token.
const getThemeTransitionMs = (): number => {
	if (!checkIsBrowser()) return FALLBACK_DURATION_MS

	const declared = getComputedStyle(document.documentElement).getPropertyValue(DURATION_PROPERTY)
	const parsed = parseDurationMs(declared)
	if (parsed === null) return FALLBACK_DURATION_MS
	return parsed
}

type ViewTransitionT = { finished: Promise<void> }
type StartViewTransitionT = (callback: () => void) => ViewTransitionT
type DocumentWithViewTransitionsT = Document & { startViewTransition?: StartViewTransitionT }

const checkPrefersReducedMotion = (): boolean => {
	const hasMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
	if (!hasMatchMedia) return false
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const getStartViewTransition = (): StartViewTransitionT | null => {
	if (!checkIsBrowser()) return null

	const candidate = (document as DocumentWithViewTransitionsT).startViewTransition
	if (typeof candidate !== 'function') return null
	return candidate.bind(document)
}

let fadeTimeoutId = 0

const runFallbackFade = (commit: () => void): void => {
	const root = document.documentElement

	// Half the budget fading out, half fading back in — so the swap lands at
	// the midpoint, when the page is at zero and nobody can see it happen.
	const fadePhaseMs = getThemeTransitionMs() / 2

	// A second change mid-fade abandons the first rather than queueing behind
	// it — the reader's latest choice is the one worth animating to.
	window.clearTimeout(fadeTimeoutId)

	root.classList.add(ANIMATING_CLASS)
	root.classList.add(FADING_CLASS)

	fadeTimeoutId = window.setTimeout(() => {
		commit()
		root.classList.remove(FADING_CLASS)

		fadeTimeoutId = window.setTimeout(() => {
			root.classList.remove(ANIMATING_CLASS)
		}, fadePhaseMs)
	}, fadePhaseMs)
}

const commitThemeChange = (): void => {
	applyThemeAttribute()
	notifyListeners()
}

const runThemeChange = (): void => {
	if (!checkIsBrowser()) {
		commitThemeChange()
		return
	}

	// Someone who has asked for less motion has asked for exactly this.
	if (checkPrefersReducedMotion()) {
		commitThemeChange()
		return
	}

	const startViewTransition = getStartViewTransition()
	if (startViewTransition) {
		startViewTransition(commitThemeChange)
		return
	}

	runFallbackFade(commitThemeChange)
}

export const setThemePreference = (preference: ThemePreferenceT): void => {
	const previousTheme = resolveTheme(currentPreference)

	currentPreference = preference
	writeStoredPreference(preference)

	// Choosing 'system' while the system already agrees changes the preference
	// but not a single pixel, so animating it would be a flash for nothing.
	const isSameTheme = resolveTheme(preference) === previousTheme
	if (isSameTheme) {
		commitThemeChange()
		return
	}

	runThemeChange()
}

// Convenience for the icon switcher, which has no 'system' state to offer.
// Flipping from 'system' commits to the opposite of whatever the system is
// currently showing, which is the only reading of "toggle" that isn't a no-op.
export const toggleTheme = (): void => {
	const isCurrentlyDark = getTheme() === Theme.dark
	setThemePreference(isCurrentlyDark ? ThemePreference.light : ThemePreference.dark)
}

export const subscribeToTheme = (listener: ThemeListenerT): (() => void) => {
	listeners.add(listener)
	return () => {
		listeners.delete(listener)
	}
}

// Under the 'system' preference the painted theme can change with no user
// action at all, so the OS query stays subscribed for the life of the page and
// re-applies whenever it flips.
const watchSystemTheme = (): void => {
	const darkQuery = getDarkQuery()
	if (!darkQuery) return

	darkQuery.addEventListener('change', () => {
		const isFollowingSystem = currentPreference === ThemePreference.system
		if (!isFollowingSystem) return

		runThemeChange()
	})
}

// Runs once when this module is first imported, which happens as a side effect
// of importing z-theme-switcher. Reading and applying the stored preference
// here rather than on the element's first render means the page doesn't flash
// the default theme before the switcher mounts.
//
// It still can't beat first paint — nothing loaded as a module can. Pages that
// care should inline the snippet documented on the z-theme-switcher page,
// which sets the attribute in <head> before any stylesheet resolves.
export const initTheme = (): ThemeStateT => {
	if (!checkIsBrowser()) return buildThemeState()

	// A stored preference is the reader's own past choice, so it outranks
	// everything. Failing that, a data-theme already on <html> was put there
	// deliberately — by the markup, or by the inline head script that beats the
	// flash — and adopting it is the only way that declaration survives this
	// module loading. Only then do we fall back to following the system.
	const storedPreference = readStoredPreference()
	if (storedPreference) {
		currentPreference = storedPreference
		applyThemeAttribute()
		return buildThemeState()
	}

	const authoredTheme = readAuthoredTheme()
	if (authoredTheme) currentPreference = authoredTheme

	applyThemeAttribute()
	return buildThemeState()
}

let hasStarted = false

export const startTheme = (): void => {
	if (hasStarted) return
	hasStarted = true

	initTheme()
	watchSystemTheme()
}
