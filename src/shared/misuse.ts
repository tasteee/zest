/*
 * Rule 21 — misuse is reported, never guessed.
 *
 * A component that cannot pick a correct answer reports the problem with
 * console.warn, once per element and per kind of problem, in every build.
 * There is no development-only gate.
 *
 *   reportMisuse(host, 'icon-name', 'z-button: an is-icon button needs aria-label or aria-labelledby.')
 */

const reported = new WeakMap<Element, Set<string>>()

export const reportMisuse = (element: Element, key: string, message: string): void => {
	const reportedKeys = reported.get(element) ?? new Set<string>()
	const hasReported = reportedKeys.has(key)
	if (hasReported) return
	reportedKeys.add(key)
	reported.set(element, reportedKeys)
	console.warn(`[zest] ${message}`, element)
}
