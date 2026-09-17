import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { c, css, event, useState, useHost, useEffect, useRef } from 'atomico'
import { oneOf } from '../shared/prop-types'

/*
 * z-menu — a dropdown menu. The trigger is whatever you slot into
 * [slot="trigger"] (typically a <z-button>); the menu items come from an
 * `items` array property:
 *   el.items = [{ value, label, icon?, shortcut?, isDisabled?, isSeparator?, isDanger? }]
 * The panel is a bordered, shadow-free popover. Keyboard, per the WAI-ARIA
 * menu button pattern: ↓ / Enter / Space open and focus the first item, ↑
 * opens and focuses the last; inside, ↑/↓ move (wrapping, skipping
 * separators and disabled rows), Home/End jump, typing a letter jumps to the
 * next item starting with it, Enter/Space pick, Esc and Tab close. Closing
 * returns focus to the trigger. Clicking outside closes. Fires `select` with
 * { value } on pick.
 */
const styles = css`
	:host {
		display: inline-flex;
		position: relative;
		--accent: var(--primary);
		user-select: none;
		-webkit-user-select: none;
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.panel {
		position: absolute;
		top: calc(100% + 6px);
		z-index: 50;
		min-width: max(12rem, 100%);
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	:host([align='end']) .panel {
		inset-inline-end: 0;
	}

	:host(:not([align='end'])) .panel {
		inset-inline-start: 0;
	}

	.item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.625rem;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-small);
		color: var(--foreground);
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: start;
		width: 100%;
		box-sizing: border-box;
	}

	.item.is-active {
		background: color-mix(in oklch, var(--accent) 14%, transparent);
		color: var(--accent);
	}

	.item.is-error {
		color: var(--destructive);
	}

	.item.is-error.is-active {
		background: color-mix(in oklch, var(--destructive) 14%, transparent);
		color: var(--destructive);
	}

	.item.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.label {
		flex: 1;
	}

	.shortcut {
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
	}

	.sep {
		height: 1px;
		margin: 0.3125rem 0;
		background: var(--border);
	}

	::slotted([slot='trigger']) {
		cursor: pointer;
	}

	.icon {
		display: inline-flex;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}
`

type MenuItemT = {
	value?: string
	label?: string
	icon?: string
	shortcut?: string
	isDisabled?: boolean
	isSeparator?: boolean
	isDanger?: boolean
}

export const ZMenu = c(
	(props) => {
		const host = useHost()
		const triggerSlotRef = useRef<HTMLSlotElement>()
		const search = useRef({ text: '', time: 0 })
		const [isOpen, setIsOpen] = useState(false)
		const [activeIndex, setActiveIndex] = useState(-1)

		const items: MenuItemT[] = Array.isArray(props.items) ? (props.items as MenuItemT[]) : []
		const selectable = (i: number) => items[i] && !items[i].isSeparator && !items[i].isDisabled
		const selectableIndices = items.flatMap((_, index) => selectable(index) ? [index] : [])

		// Focus follows the active item, so a screen reader announces each
		// menuitem as the user moves; the trigger gets focus back on close.
		useEffect(() => {
			if (!isOpen || activeIndex < 0) return
			host.current.shadowRoot?.querySelector<HTMLButtonElement>(`#menu-item-${activeIndex}`)?.focus()
		}, [isOpen, activeIndex])
		const triggerElement = () => triggerSlotRef.current?.assignedElements({ flatten: true })[0] as HTMLElement | undefined
		const focusTrigger = () => triggerElement()?.focus()
		// aria-haspopup / aria-expanded describe the trigger, which is slotted
		// light DOM; a wrapper div without a role may not carry them.
		const syncTriggerAria = () => {
			const trigger = triggerElement()
			if (!trigger) return
			// A Zest button is itself a host; the attributes go on its inner control.
			const control = trigger.shadowRoot?.querySelector('button, [role]') ?? trigger
			control.setAttribute('aria-haspopup', 'menu')
			control.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
		}
		useEffect(syncTriggerAria, [isOpen])
		const openAt = (index: number) => {
			setIsOpen(true)
			setActiveIndex(index)
		}

		useEffect(() => {
			if (!isOpen) return
			const onDocumentPointerDown = (e: Event) => {
				if (!e.composedPath().includes(host.current as EventTarget)) setIsOpen(false)
			}
			document.addEventListener('pointerdown', onDocumentPointerDown)
			return () => document.removeEventListener('pointerdown', onDocumentPointerDown)
		}, [isOpen])

		const close = (returnFocus = true) => {
			const wasOpen = isOpen
			setIsOpen(false)
			setActiveIndex(-1)
			if (wasOpen && returnFocus) focusTrigger()
		}

		const commit = (item: MenuItemT) => {
			if (item.isSeparator || item.isDisabled) return
			close()
			props.select({ value: item.value || item.label || '' })
		}

		const move = (dir: number) => {
			let next = activeIndex
			for (let i = 0; i < items.length; i++) {
				next = (next + dir + items.length) % items.length
				if (selectable(next)) break
			}
			setActiveIndex(next)
		}

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (isOpen) { e.preventDefault(); e.stopPropagation() }
				close()
				return
			}
			if (e.key === 'Tab') {
				close(false)
				return
			}
			if (e.key === 'ArrowDown') {
				e.preventDefault()
				if (!isOpen) openAt(selectableIndices[0] ?? -1)
				else move(1)
				return
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault()
				if (!isOpen) openAt(selectableIndices.at(-1) ?? -1)
				else move(-1)
				return
			}
			if (e.key === 'Home' && isOpen) { e.preventDefault(); setActiveIndex(selectableIndices[0] ?? -1); return }
			if (e.key === 'End' && isOpen) { e.preventDefault(); setActiveIndex(selectableIndices.at(-1) ?? -1); return }
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				if (!isOpen) openAt(selectableIndices[0] ?? -1)
				else if (activeIndex >= 0 && items[activeIndex]) commit(items[activeIndex])
				return
			}
			if (isOpen && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
				e.preventDefault()
				const now = Date.now()
				const text = (now - search.current.time < 600 ? search.current.text : '') + e.key.toLowerCase()
				search.current = { text, time: now }
				const query = [...text].every((char) => char === text[0]) ? text[0] : text
				const start = selectableIndices.indexOf(activeIndex)
				const ordered = [...selectableIndices.slice(start + 1), ...selectableIndices.slice(0, start + 1)]
				const match = ordered.find((index) => (items[index].label ?? '').toLowerCase().startsWith(query))
				if (match !== undefined) setActiveIndex(match)
			}
		}

		return (
			<host shadowDom onkeydown={onKeyDown}>
				<div class="trigger" onclick={() => isOpen ? close() : openAt(-1)}>
					<slot ref={triggerSlotRef} name="trigger" onslotchange={syncTriggerAria} />
				</div>

				{isOpen && (
					<div class="panel" role="menu">
						{items.map((item, index) => {
							if (item.isSeparator) return <div key={`sep-${index}`} class="sep" role="separator" />
							const cls = ['item']
								.concat(index === activeIndex ? ['is-active'] : [])
								.concat(item.isDanger ? ['is-error'] : [])
								.concat(item.isDisabled ? ['is-disabled'] : [])
								.join(' ')
							return (
								<button
									key={item.value || item.label || index}
									type="button"
									class={cls}
									role="menuitem"
									id={`menu-item-${index}`}
									tabindex={index === activeIndex ? '0' : '-1'}
									disabled={item.isDisabled}
									onmouseenter={() => setActiveIndex(index)}
									onclick={() => commit(item)}
								>
									{item.icon && <span class="icon" innerHTML={item.icon} />}
									<span class="label">{item.label}</span>
									{item.shortcut && <span class="shortcut">{item.shortcut}</span>}
								</button>
							)
						})}
					</div>
				)}
			</host>
		)
	},
	{
		props: {
			items: { type: Array },
			align: { type: oneOf('start', 'end'), reflect: true },
			accent: { type: oneOf('neutral', 'dom', 'sub'), reflect: true },
			isHidden: { type: Boolean, reflect: true },
			select: event<{ value: string }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-menu', ZMenu)
