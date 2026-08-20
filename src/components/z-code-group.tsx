import { defineElement } from '../shared/define-element'
import { c, css, event, useEffect, useRef, useState } from 'atomico'

/*
 * z-code-group — tabbed sibling code blocks.
 *
 *   <z-code-group group="package-manager">
 *     <z-code-block label="npm" language="sh" code="npm i @tasteee/zest"></z-code-block>
 *     <z-code-block label="pnpm" language="sh" code="pnpm add @tasteee/zest"></z-code-block>
 *   </z-code-group>
 *
 * The tab label comes off each slotted child's `label` attribute, falling back
 * to its `filename` and then its `language`, so the common case needs no extra
 * markup at all.
 *
 * `group` is what makes this worth an element rather than a z-tabs
 * composition. Choosing pnpm once should hold for every install snippet on the
 * page and on the next page — so groups sharing a name sync live through a
 * module-level registry, and persist through storage. A reader who picks their
 * package manager should never have to pick it again.
 *
 * Persistence is opt-in via `storage-key`: an element with no key never
 * touches storage, which keeps this usable in contexts where writing to
 * localStorage is either unavailable or unwelcome.
 */
const styles = css`
	:host {
		display: block;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	:host([is-hidden]) {
		display: none;
	}

	.tabs {
		display: flex;
		gap: 0.125rem;
		padding: 0.25rem 0.25rem 0;
		border-bottom: 1px solid var(--border);
		background: var(--background-light);
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tabs::-webkit-scrollbar {
		display: none;
	}

	.tab {
		flex-shrink: 0;
		padding: 0.375rem 0.75rem;
		border: 0;
		border-bottom: 2px solid transparent;
		background: transparent;
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
		cursor: pointer;
		transition: color 0.12s ease, border-color 0.12s ease;
	}

	.tab:hover {
		color: var(--foreground);
	}

	.tab:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -3px;
	}

	.tab.is-selected {
		color: var(--foreground);
		border-bottom-color: var(--purple);
	}

	/* Unselected children carry the hidden attribute rather than being
	   display:none'd from here — hidden takes them out of the accessibility
	   tree too, so a code block behind another tab cannot be tabbed into. */
	.panel {
		display: block;
	}
`

type PanelT = {
	value: string
	label: string
}

// Groups sharing a name notify each other directly. A storage event only
// fires in *other* tabs, so cross-group sync within one page has to be
// explicit — this is that.
const groupRegistry = new Map<string, Set<(value: string) => void>>()

const subscribeToGroup = (groupName: string, listener: (value: string) => void) => {
	const existing = groupRegistry.get(groupName) || new Set()
	existing.add(listener)
	groupRegistry.set(groupName, existing)

	return () => {
		existing.delete(listener)
	}
}

const broadcastToGroup = (groupName: string, value: string, origin: (value: string) => void) => {
	const listeners = groupRegistry.get(groupName)
	if (!listeners) return

	for (const listener of listeners) {
		if (listener !== origin) listener(value)
	}
}

const readStoredValue = (storageKey?: string): string => {
	if (!storageKey) return ''

	try {
		return window.localStorage.getItem(storageKey) || ''
	} catch {
		return ''
	}
}

const writeStoredValue = (storageKey: string | undefined, value: string) => {
	if (!storageKey) return

	try {
		window.localStorage.setItem(storageKey, value)
	} catch {
		// Storage can be unavailable or full. A tab choice is not worth
		// failing a render over.
	}
}

const readPanelLabel = (element: Element, position: number): string => {
	const label = element.getAttribute('label')
	if (label) return label

	const filename = element.getAttribute('filename')
	if (filename) return filename

	const language = element.getAttribute('language')
	if (language) return language

	return `Tab ${position + 1}`
}

export const ZCodeGroup = c(
	(props) => {
		const slotRef = useRef<HTMLSlotElement>()
		// Held in a ref so the identity survives re-renders — the registry
		// filters the broadcast by listener identity, and a fresh closure every
		// render would make this element echo its own change back to itself.
		const listenerRef = useRef<(value: string) => void>()
		const [panels, setPanels] = useState<PanelT[]>([])
		const [selected, setSelected] = useState<string>('')

		const groupName = props.group as string | undefined
		const storageKey = props.storageKey as string | undefined

		const readPanels = () => {
			const assigned = slotRef.current?.assignedElements({ flatten: true })
			if (!assigned) return

			const found: PanelT[] = []
			for (const [position, element] of assigned.entries()) {
				const label = readPanelLabel(element, position)
				found.push({ value: label, label })
			}
			setPanels(found)
		}

		// Only the selected child is assigned, so the others are not rendered
		// into the panel at all rather than being hidden with CSS.
		const applyVisibility = (value: string) => {
			const assigned = slotRef.current?.assignedElements({ flatten: true })
			if (!assigned) return

			for (const [position, element] of assigned.entries()) {
				const label = readPanelLabel(element, position)
				const isSelected = label === value
				if (isSelected) element.removeAttribute('hidden')
				if (!isSelected) element.setAttribute('hidden', '')
			}
		}

		// Restore before first paint so a reader who chose pnpm last week does
		// not watch it flip from npm.
		useEffect(() => {
			const stored = readStoredValue(storageKey)
			const initial = (props.value as string) || stored
			if (initial) setSelected(initial)
		}, [storageKey])

		useEffect(() => {
			if (!groupName) return

			const listener = (value: string) => setSelected(value)
			listenerRef.current = listener
			return subscribeToGroup(groupName, listener)
		}, [groupName])

		useEffect(() => {
			const hasPanels = panels.length > 0
			if (!hasPanels) return

			const isSelectedPresent = panels.some((panel) => panel.value === selected)
			if (!isSelectedPresent) setSelected(panels[0].value)
			if (isSelectedPresent) applyVisibility(selected)
		}, [panels, selected])

		const handleSelect = (value: string) => {
			setSelected(value)
			writeStoredValue(storageKey, value)
			props.change({ value })

			if (!groupName) return
			if (!listenerRef.current) return
			broadcastToGroup(groupName, value, listenerRef.current)
		}

		const hasPanels = panels.length > 0

		return (
			<host shadowDom>
				{hasPanels && (
					<div class='tabs' role='tablist'>
						{panels.map((panel) => {
							const isSelected = panel.value === selected
							const tabClass = isSelected ? 'tab is-selected' : 'tab'

							return (
								<button
									key={panel.value}
									type='button'
									role='tab'
									class={tabClass}
									aria-selected={isSelected ? 'true' : 'false'}
									onclick={() => handleSelect(panel.value)}
								>
									{panel.label}
								</button>
							)
						})}
					</div>
				)}
				<div class='panel'>
					<slot ref={slotRef} onslotchange={readPanels} />
				</div>
			</host>
		)
	},
	{
		props: {
			group: { type: String, reflect: true },
			value: { type: String, reflect: true },
			storageKey: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-code-group', ZCodeGroup)
