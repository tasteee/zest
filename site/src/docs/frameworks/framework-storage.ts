import { useSyncExternalStore } from 'react'

// The reader's framework, shared by every code view in the docs. It decides
// which files an example's Code tab shows; the live preview never changes.

export const FRAMEWORKS = ['html', 'react', 'vue', 'svelte', 'solid'] as const

export type FrameworkT = (typeof FRAMEWORKS)[number]

export const FRAMEWORK_LABELS: Record<FrameworkT, string> = {
	html: 'HTML',
	react: 'React',
	vue: 'Vue',
	svelte: 'Svelte',
	solid: 'Solid'
}

export const FRAMEWORK_OPTIONS = FRAMEWORKS.map((framework) => ({
	value: framework,
	label: FRAMEWORK_LABELS[framework]
}))

const FRAMEWORK_STORAGE_KEY = 'zest-framework-preference'
const FRAMEWORK_CHANGE_EVENT = 'zest-framework-change'
const DEFAULT_FRAMEWORK: FrameworkT = 'html'

// The choice for this visit, used whenever localStorage is blocked, so the
// pickers and a shared link still work; they just don't persist.
let sessionFramework: FrameworkT | null = null

export const checkIsFramework = (value: unknown): value is FrameworkT => {
	return FRAMEWORKS.includes(value as FrameworkT)
}

export const readStoredFramework = (): FrameworkT => {
	if (typeof window === 'undefined') return DEFAULT_FRAMEWORK

	try {
		const storedValue = window.localStorage.getItem(FRAMEWORK_STORAGE_KEY)
		const isKnownFramework = checkIsFramework(storedValue)
		if (isKnownFramework) return storedValue
		return DEFAULT_FRAMEWORK
	} catch {
		// localStorage might be unavailable/blocked
		return sessionFramework ?? DEFAULT_FRAMEWORK
	}
}

export const writeStoredFramework = (framework: FrameworkT): void => {
	sessionFramework = framework

	try {
		window.localStorage.setItem(FRAMEWORK_STORAGE_KEY, framework)
	} catch {
		// localStorage might be unavailable/blocked; this tab still updates
	}

	window.dispatchEvent(new Event(FRAMEWORK_CHANGE_EVENT))
}

// Every picker and code view subscribes, so a change anywhere (or in
// another tab, via the storage event) updates them all at once.
const subscribeToFramework = (handleChange: () => void) => {
	window.addEventListener(FRAMEWORK_CHANGE_EVENT, handleChange)
	window.addEventListener('storage', handleChange)

	return () => {
		window.removeEventListener(FRAMEWORK_CHANGE_EVENT, handleChange)
		window.removeEventListener('storage', handleChange)
	}
}

// A shared link can pick the framework: /docs/elements/z-select?framework=vue.
// It's applied once, when the docs first load, and saved like any other choice.
const FRAMEWORK_URL_PARAM = 'framework'

const applyUrlFramework = (): void => {
	if (typeof window === 'undefined') return
	const urlValue = new URLSearchParams(window.location.search).get(FRAMEWORK_URL_PARAM)
	const isKnownFramework = checkIsFramework(urlValue)
	if (!isKnownFramework) return
	sessionFramework = urlValue

	try {
		window.localStorage.setItem(FRAMEWORK_STORAGE_KEY, urlValue)
	} catch {
		// localStorage might be unavailable/blocked; sessionFramework covers this visit
	}
}

applyUrlFramework()

const getServerFramework = (): FrameworkT => DEFAULT_FRAMEWORK

export const useFramework = (): FrameworkT => {
	return useSyncExternalStore(subscribeToFramework, readStoredFramework, getServerFramework)
}
