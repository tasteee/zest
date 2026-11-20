/// <reference types="vite/client" />
/*
 * The deprecation rule from SUPPORT.md, as code: a deprecated value keeps
 * working for one minor and warns once per page load in development builds,
 * naming what to use instead. `import.meta.env.DEV` is false in dist, so a
 * production bundle never logs.
 */
const warned = new Set<string>()

export const warnDeprecated = (subject: string, replacement: string): void => {
	if (!import.meta.env.DEV) return
	const key = `${subject} → ${replacement}`
	if (warned.has(key)) return
	warned.add(key)
	console.warn(`[zest] ${subject} is deprecated and will be removed in the next minor; use ${replacement}.`)
}

type LegacyOrientationT = {
	tag: string
	attribute: string
	value: unknown
	flag: string
	flagValue: string
}

// Orientation enums became boolean flags (direction="vertical" → is-vertical).
// Setting the flag's value names the flag; setting the default value
// names dropping the attribute, since it never did anything.
export const warnLegacyOrientation = (legacy: LegacyOrientationT): void => {
	const isUnset = legacy.value == null || legacy.value === ''
	if (isUnset) return
	const subject = `${legacy.tag} ${legacy.attribute}="${legacy.value}"`
	const isFlagValue = legacy.value === legacy.flagValue
	const flagReplacement = `${legacy.tag} ${legacy.flag}`
	const defaultReplacement = `no ${legacy.attribute} attribute (it is the default)`
	const replacement = isFlagValue ? flagReplacement : defaultReplacement
	warnDeprecated(subject, replacement)
}
