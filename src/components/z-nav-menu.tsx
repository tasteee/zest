import { defineElement } from '../shared/define-element'
import { c, css, event, useState, useHost, useEffect } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-nav-menu, a horizontal navigation bar driven by an `items` array property:
 *   el.items = [
 *     { value, label, href? },
 *     { value, label, children: [{ value, label, href?, description? }] }
 *   ]
 * Top-level items with `children` open a bordered dropdown panel on click; plain
 * items are links. The active top item (matched against the `value` property) is
 * accent-colored. Esc / outside-click closes any open panel. Fires `select` with
 * { value } whenever an item without an href is chosen.
 */
const styles = css`
	:host {
		display: block;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	nav {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.top {
		position: relative;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
		background: transparent;
		border: 0;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		font-family: inherit;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		text-decoration: none;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.trigger:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 6%, transparent);
	}

	.trigger.is-active {
		color: var(--text-strong);
	}

	.trigger.is-open {
		color: var(--tone);
		background: color-mix(in oklch, var(--tone) 8%, transparent);
	}

	.trigger:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.caret {
		width: 0.75rem;
		height: 0.75rem;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
		transition: transform var(--motion-fast) var(--ease-enter);
	}

	.trigger.is-open .caret {
		transform: rotate(180deg);
	}

	.panel {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: var(--z-menu);
		min-width: 16rem;
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-1-5);
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.child {
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		color: var(--text-primary);
		text-decoration: none;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: start;
		cursor: pointer;
	}

	.child:hover {
		background: color-mix(in oklch, var(--tone) 12%, transparent);
	}

	.child .child-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}

	.child .child-desc {
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
	}
`

type ChildT = { value?: string; label: string; href?: string; description?: string }
type NavItemT = { value?: string; label: string; href?: string; children?: ChildT[] }

const getDeclarativeItems = (host: HTMLElement): NavItemT[] => {
	const elements = Array.from(host.children)
	const entries = elements.filter((element) => {
		return element.matches('[data-nav-item]')
	})
	return entries.map((element) => {
		const childElements = Array.from(element.querySelectorAll(':scope > [data-nav-item]'))
		const children = childElements.map((child) => {
			return {
				label: child.getAttribute('label') || '',
				value: child.getAttribute('value') || undefined,
				href: child.getAttribute('href') || undefined,
				description: child.getAttribute('description') || undefined
			}
		})
		return {
			label: element.getAttribute('label') || '',
			value: element.getAttribute('value') || undefined,
			href: element.getAttribute('href') || undefined,
			children
		}
	})
}

export const ZNavMenu = c(
	(props) => {
		const host = useHost()
		const [openValue, setOpenValue] = useState<string | null>(null)

		const [declarativeItems, setDeclarativeItems] = useState<NavItemT[]>([])
		const items: NavItemT[] = Array.isArray(props.items) ? (props.items as NavItemT[]) : declarativeItems

		useEffect(() => {
			const element = host.current as HTMLElement
			const updateItems = () => {
				setDeclarativeItems(getDeclarativeItems(element))
			}
			updateItems()
			const observer = new MutationObserver(updateItems)
			observer.observe(element, { childList: true, subtree: true, attributes: true })
			return () => {
				observer.disconnect()
			}
		}, [])

		useEffect(() => {
			if (openValue == null) return
			const onDocumentPointerDown = (e: Event) => {
				if (!e.composedPath().includes(host.current as EventTarget)) setOpenValue(null)
			}
			const onKey = (e: KeyboardEvent) => {
				if (e.key === 'Escape') setOpenValue(null)
			}
			document.addEventListener('pointerdown', onDocumentPointerDown)
			document.addEventListener('keydown', onKey)
			return () => {
				document.removeEventListener('pointerdown', onDocumentPointerDown)
				document.removeEventListener('keydown', onKey)
			}
		}, [openValue])

		const pick = (value: string) => {
			setOpenValue(null)
			props.select({ value })
		}

		return (
			<host shadowDom>
				<nav>
					{items.map((item, index) => {
						const key = item.value || item.label || String(index)
						const isActive = props.value != null && item.value === props.value
						if (item.children && item.children.length) {
							const isOpen = openValue === key
							const triggerClass = ['trigger']
								.concat(isActive ? ['is-active'] : [])
								.concat(isOpen ? ['is-open'] : [])
								.join(' ')
							return (
								<div key={key} class="top">
									<button
										type="button"
										class={triggerClass}
										aria-haspopup="menu"
										aria-expanded={isOpen ? 'true' : 'false'}
										onclick={() => setOpenValue(isOpen ? null : key)}
									>
										{item.label}
										<svg class="caret" viewBox="0 0 24 24">
											<polyline points="6 9 12 15 18 9" />
										</svg>
									</button>
									{isOpen && (
										<div class="panel" role="menu">
											{item.children.map((child, ci) => {
												const ckey = child.value || child.label || String(ci)
												const content = (
													<>
														<span class="child-label">{child.label}</span>
														{child.description && <span class="child-desc">{child.description}</span>}
													</>
												)
												return child.href ? (
													<a key={ckey} class="child" href={child.href} role="menuitem">
														{content}
													</a>
												) : (
													<button
														key={ckey}
														type="button"
														class="child"
														role="menuitem"
														onclick={() => pick(child.value || child.label)}
													>
														{content}
													</button>
												)
											})}
										</div>
									)}
								</div>
							)
						}

						const triggerClass = isActive ? 'trigger is-active' : 'trigger'
						return item.href ? (
							<a key={key} class={triggerClass} href={item.href}>
								{item.label}
							</a>
						) : (
							<button key={key} type="button" class={triggerClass} onclick={() => pick(item.value || item.label)}>
								{item.label}
							</button>
						)
					})}
				</nav>
			</host>
		)
	},
	{
		props: {
			items: { type: Array },
			value: { type: String, reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isHidden: { type: Boolean, reflect: true },
			select: event<{ value: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-nav-menu', ZNavMenu)
