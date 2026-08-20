import { defineElement } from '../shared/define-element'
import { c, css, event } from 'atomico'

/*
 * z-language-switcher — the docs locale dropdown.
 *
 *   switcher.locales = [
 *     { value: 'en', label: 'English' },
 *     { value: 'ja', label: '日本語' }
 *   ]
 *
 * The sibling of z-version-picker, and worth its own tag for the same reason:
 * the route rewriting. Switching locale means the same page in the other
 * language, not that language's home page.
 *
 * Locale labels are authored in their own language on purpose. A reader who
 * cannot read the current one still has to find theirs, and "Japanese" is no
 * help to someone who only reads 日本語.
 */
const styles = css`
	:host {
		display: inline-block;
	}

	:host([is-hidden]) {
		display: none;
	}
`

type LocaleT = {
	value: string
	label?: string
	href?: string
}

const readLocales = (value: unknown): LocaleT[] => {
	if (!Array.isArray(value)) return []

	const locales: LocaleT[] = []
	for (const entry of value) {
		const hasValue = entry && typeof entry.value === 'string'
		if (hasValue) locales.push(entry as LocaleT)
	}
	return locales
}

/*
 * The locale is expected as the first path segment, which is the convention
 * every static docs host uses. A path that does not carry one gets it
 * prefixed rather than rewritten.
 */
export const buildLocalizedPath = (path: string, current: string, next: string): string => {
	const segments = path.split('/')
	const leading = segments[1] || ''

	const hasCurrentLocale = leading === current && current.length > 0
	if (!hasCurrentLocale) return `/${next}${path}`

	segments[1] = next
	return segments.join('/')
}

export const ZLanguageSwitcher = c(
	(props) => {
		const locales = readLocales(props.locales)
		const current = (props.value as string) || ''

		const items = locales.map((locale) => {
			return { value: locale.value, label: locale.label || locale.value }
		})

		const handleSelect = (selectEvent: CustomEvent<{ value: string }>) => {
			const next = selectEvent.detail.value
			const chosen = locales.find((locale) => locale.value === next)
			if (!chosen) return

			const route = chosen.href || buildLocalizedPath(window.location.pathname, current, next)
			props.change({ value: next, route })

			if (props.isManaged) return
			window.location.href = route
		}

		const active = locales.find((locale) => locale.value === current)

		return (
			<host shadowDom>
				<z-menu items={items} label={active ? active.label || active.value : current} onselect={handleSelect} />
			</host>
		)
	},
	{
		props: {
			locales: { type: Array },
			value: { type: String, reflect: true },
			isManaged: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: string; route: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-language-switcher', ZLanguageSwitcher)
