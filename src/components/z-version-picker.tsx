import { c, css, event } from 'atomico'

/*
 * z-version-picker — the docs version dropdown.
 *
 *   picker.versions = [
 *     { value: '2.x', label: 'v2 (latest)' },
 *     { value: '1.x', label: 'v1', href: 'https://v1.example.com' }
 *   ]
 *
 * This is a thin z-menu composition and would not deserve its own tag except
 * for one thing: the route rewriting. Switching version means landing on the
 * same page in the other version, not on that version's home page, and that
 * rule belongs in one place rather than in every consumer.
 *
 * An entry with an `href` navigates to another origin verbatim — versioned
 * docs are often separate deployments. An entry without one rewrites the
 * current path, swapping the version segment.
 */
const styles = css`
	:host {
		display: inline-block;
	}

	:host([is-hidden]) {
		display: none;
	}
`

type VersionT = {
	value: string
	label?: string
	href?: string
}

const readVersions = (value: unknown): VersionT[] => {
	if (!Array.isArray(value)) return []

	const versions: VersionT[] = []
	for (const entry of value) {
		const hasValue = entry && typeof entry.value === 'string'
		if (hasValue) versions.push(entry as VersionT)
	}
	return versions
}

/*
 * Swaps the version segment in place rather than appending or prefixing, so a
 * reader three pages deep stays three pages deep. Falls back to the version
 * root when the current path does not carry the segment at all.
 */
export const buildVersionedPath = (path: string, current: string, next: string): string => {
	const segments = path.split('/')
	const position = segments.indexOf(current)

	const isPresent = position >= 0
	if (!isPresent) return `/${next}`

	segments[position] = next
	return segments.join('/')
}

export const ZVersionPicker = c(
	(props) => {
		const versions = readVersions(props.versions)
		const current = (props.value as string) || ''

		const items = versions.map((version) => {
			return { value: version.value, label: version.label || version.value }
		})

		const handleSelect = (selectEvent: CustomEvent<{ value: string }>) => {
			const next = selectEvent.detail.value
			const chosen = versions.find((version) => version.value === next)
			if (!chosen) return

			const route = chosen.href || buildVersionedPath(window.location.pathname, current, next)
			props.change({ value: next, route })

			// The event fires first either way, so a host can log or confirm.
			// `is-managed` says the host owns navigation — it has a router and
			// a full page load would throw away its state.
			if (props.isManaged) return
			window.location.href = route
		}

		const label = versions.find((version) => version.value === current)

		return (
			<host shadowDom>
				<z-menu items={items} label={label ? label.label || label.value : current} onselect={handleSelect} />
			</host>
		)
	},
	{
		props: {
			versions: { type: Array },
			value: { type: String, reflect: true },
			isManaged: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: string; route: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-version-picker', ZVersionPicker)
