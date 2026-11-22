import { interactionStyles } from '../shared/interaction-styles'
import { c, css, event, useState, useHost, useEffect, useRef } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useChildItems } from '../shared/child-items'
import { MENU_ROW_ATTRIBUTES, MENU_ROW_TAGS, descriptionId, groupMenuRows, hasCheckableRows, headingId, isSelectableRow, menuItemChecked, menuItemRole, menuRowStyles, readMenuRow, renderCheck, renderRowText, reportMenuRowMisuse, type MenuEntryT, type MenuRowT } from '../shared/menu-rows'
import { flashThen } from '../shared/menu-nav'
import { useVisibilityPhase } from '../shared/transition'
import { computePosition, autoUpdate, applyPosition } from '../shared/overlay'

/*
 * z-menu, a dropdown menu. The trigger is whatever you slot into
 * [slot="trigger"] (typically a <z-button>). Items are declarative children,
 * whose own content becomes the row (icons, hints, anything):
 *   <z-menu-item value="rename" shortcut="⌘R">Rename</z-menu-item>
 *   <z-menu-separator></z-menu-separator>
 *   <z-menu-item value="delete" is-danger>Delete</z-menu-item>
 * Choice rows: kind="radio" or kind="checkbox" with is-checked (the app owns
 * which is checked), an optional description line, and <z-menu-label> section
 * headings that group the rows after them:
 *   <z-menu-label>Fold rows</z-menu-label>
 *   <z-menu-item value="notes" kind="radio" is-checked description="Only rows with notes">Notes</z-menu-item>
 * or an `items` array property for data-driven menus:
 *   el.items = [{ value, label, icon?, shortcut?, description?, kind?, isChecked?, isDisabled?, isSeparator?, isHeading?, isDanger? }]
 * The panel is a bordered, floating popover. Keyboard, per the WAI-ARIA
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
		--tone: var(--accent-primary);
		user-select: none;
		-webkit-user-select: none;
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

	/* Fixed + top-layer (via [popover]) so no ancestor's overflow can clip the
	   panel. display is left unset until :popover-open so the UA stylesheet
	   still hides it while closed. shared/overlay.ts sets left/top. */
	.panel {
		position: fixed;
		box-sizing: border-box;
		margin: 0;
		/* physical: shared/overlay.ts positions the panel from measured rects */
		left: 0;
		top: 0;
		right: auto; /* physical */
		bottom: auto;
		z-index: var(--z-menu);
		min-width: 12rem;
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-1-5);
		gap: 1px;
	}

	.panel:popover-open {
		display: flex;
		flex-direction: column;
	}

	/* enters on mount, exits via .is-closing while useVisibilityPhase keeps it rendered */
	.panel {
		transform-origin: top left;
		animation: z-menu-in var(--motion-fast) var(--ease-enter);
	}

	:host([align='end']) .panel {
		transform-origin: top right;
	}

	.panel.is-closing {
		opacity: 0;
		scale: var(--motion-scale-from);
		pointer-events: none;
		transition:
			opacity var(--motion-exit-fast) var(--ease-exit),
			scale var(--motion-exit-fast) var(--ease-exit);
	}

	.panel.is-committing {
		pointer-events: none;
	}

	@keyframes z-menu-in {
		from {
			opacity: 0;
			scale: var(--motion-scale-from);
			translate: 0 calc(var(--motion-distance-sm) * -1 * var(--motion-travel));
		}
	}

	.item.is-flashing {
		animation: z-menu-flash 220ms step-end;
	}

	@keyframes z-menu-flash {
		0%,
		50% {
			background: color-mix(in oklch, var(--tone) 14%, transparent);
		}
		25%,
		75% {
			background: transparent;
		}
	}

	.item {
		display: flex;
		align-items: center;
		gap: var(--space-2-5);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
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
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		color: var(--tone);
	}

	.item.is-error {
		color: var(--status-danger);
	}

	.item.is-error.is-active {
		background: color-mix(in oklch, var(--status-danger) 14%, transparent);
		color: var(--status-danger);
	}

	.item.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.label {
		flex: 1;
	}

	.shortcut {
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
	}

	.sep {
		height: 1px;
		margin: var(--space-1-5) 0;
		background: var(--border-default);
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

type MenuItemT = MenuRowT

export const ZMenu = c(
	(props) => {
		const host = useHost()
		const triggerSlotRef = useRef<HTMLSlotElement>()
		const panelRef = useRef<HTMLDivElement>()
		const search = useRef({ text: '', time: 0 })
		const [isOpen, setIsOpen] = useState(false)
		const [activeIndex, setActiveIndex] = useState(-1)
		const [flashIndex, setFlashIndex] = useState(-1)
		const isCommitting = flashIndex >= 0
		const phase = useVisibilityPhase(isOpen, 140)

		const children = useChildItems(MENU_ROW_TAGS, MENU_ROW_ATTRIBUTES)
		const childItems: MenuItemT[] = children.map(readMenuRow)
		const items: MenuItemT[] = [...childItems, ...(Array.isArray(props.items) ? (props.items as MenuItemT[]) : [])]
		const selectable = (i: number) => isSelectableRow(items[i])
		const rawKinds = children.map((child) => child.attributes.kind)
		useEffect(() => reportMenuRowMisuse(host.current, items, rawKinds), [items.length, rawKinds.join('|'), items.map((item) => `${item.kind}:${item.isChecked}`).join('|')])
		const selectableIndices = items.flatMap((_, index) => selectable(index) ? [index] : [])

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

		const commit = (item: MenuItemT, index: number) => {
			if (item.isSeparator || item.isHeading || item.isDisabled || isCommitting) return
			setActiveIndex(index)
			setFlashIndex(index)
			flashThen(() => {
				setFlashIndex(-1)
				close()
				props.select({ value: item.value || item.label || '' })
			})
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
			if (isCommitting) return
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
				else if (activeIndex >= 0 && items[activeIndex]) commit(items[activeIndex], activeIndex)
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

		// The panel renders in the same pass that opens it, so focus can move
		// in at once; while it fades out it is inert and drops the menu role.
		const isPanelLeaving = !isOpen && phase === 'closing'
		const isPanelRendered = isOpen || isPanelLeaving

		// Move the panel into the top layer and pin it under the trigger.
		useEffect(() => {
			const panel = panelRef.current
			if (!panel) return
			if (!panel.isConnected) return
			if (!panel.matches(':popover-open')) panel.showPopover()
			const placement = props.align === 'end' ? 'bottom-end' : 'bottom-start'
			const update = () => {
				const triggerWidth = host.current.getBoundingClientRect().width
				panel.style.minWidth = `max(12rem, ${triggerWidth}px)`
				applyPosition(panel, computePosition(host.current, panel, { placement, offset: 6, padding: 8 }))
			}
			return autoUpdate(host.current, panel, update)
		}, [isPanelRendered, props.align])

		// Declared after the popover effect: an item in a panel that is not
		// yet in the top layer cannot take focus.
		// Focus follows the active item, so a screen reader announces each
		// menuitem as the user moves; the trigger gets focus back on close.
		useEffect(() => {
			const hasActiveItem = activeIndex >= 0
			const canFocusItem = isOpen && hasActiveItem
			if (!canFocusItem) return
			host.current.shadowRoot?.querySelector<HTMLButtonElement>(`#menu-item-${activeIndex}`)?.focus()
		}, [isOpen, activeIndex])

		const panelClass = ['panel', isPanelLeaving ? 'is-closing' : '', isCommitting ? 'is-committing' : ''].join(' ')
		const shouldReserveCheck = hasCheckableRows(items)

		const renderEntry = (entry: MenuEntryT) => {
			const item = entry.row
			const index = entry.index
			const cls = ['item']
				.concat(index === activeIndex ? ['is-active'] : [])
				.concat(item.isDanger ? ['is-error'] : [])
				.concat(item.isDisabled ? ['is-disabled'] : [])
				.concat(index === flashIndex ? ['is-flashing'] : [])
				.join(' ')
			const describedBy = item.description ? descriptionId(index) : undefined
			return (
				<button
					key={item.slot || item.value || item.label || index}
					type="button"
					class={cls}
					role={menuItemRole(item)}
					aria-checked={menuItemChecked(item)}
					aria-describedby={describedBy}
					data-index={index}
					id={`menu-item-${index}`}
					tabindex={index === activeIndex ? '0' : '-1'}
					disabled={item.isDisabled}
					onmouseenter={() => !isCommitting && setActiveIndex(index)}
					onclick={() => commit(item, index)}
				>
					{renderCheck(item, shouldReserveCheck)}
					{item.icon && <span class="icon" innerHTML={item.icon} />}
					{renderRowText(item, index)}
					{item.shortcut && <span class="shortcut">{item.shortcut}</span>}
				</button>
			)
		}

		return (
			<host shadowDom onkeydown={onKeyDown}>
				<div class="trigger" onclick={() => isOpen ? close() : openAt(-1)}>
					<slot ref={triggerSlotRef} name="trigger" onslotchange={syncTriggerAria} />
				</div>

				{isPanelRendered && (
					<div
						ref={panelRef}
						popover="manual"
						class={panelClass}
						role={isOpen ? 'menu' : undefined}
						inert={isPanelLeaving}
					>
						{groupMenuRows(items).map((section) => {
							if (section.type === 'separator') return <div key={`sep-${section.index}`} class="sep" role="separator" />
							const rows = section.entries.map(renderEntry)
							if (!section.heading) return rows
							const sectionHeadingId = headingId(section.heading.index)
							return (
								<div key={sectionHeadingId} role="group" aria-labelledby={sectionHeadingId}>
									<div class="heading" id={sectionHeadingId} role="presentation">{section.heading.row.label}</div>
									{rows}
								</div>
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
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isHidden: { type: Boolean, reflect: true },
			select: event<{ value: string }>({ bubbles: true, composed: true })
		},
		styles: [styles, menuRowStyles, interactionStyles]
	}
)


/*
 * z-menu-item, one declarative row for z-menu and z-context-menu. Attributes
 * mirror the `items` entries (value, label, shortcut, description, kind,
 * is-checked, is-disabled, is-danger); its children are the row's visible
 * content.
 */
export const ZMenuItem = c(
	() => (
		<host shadowDom>
			<slot />
		</host>
	),
	{
		props: {
			value: { type: String, reflect: true },
			label: { type: String, reflect: true },
			shortcut: { type: String, reflect: true },
			description: { type: String, reflect: true },
			kind: { type: oneOf('action', 'radio', 'checkbox'), reflect: true },
			isChecked: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isDanger: { type: Boolean, reflect: true }
		},
		styles: css`
			:host {
				display: inline-flex;
				align-items: center;
				gap: var(--space-2-5);
				min-width: 0;
			}
		`
	}
)


/** z-menu-separator, a hairline between declarative z-menu-item groups. */
export const ZMenuSeparator = c(() => <host />, { props: {} })


/**
 * z-menu-label, a non-focusable section heading. The rows after it, up to the
 * next label or separator, form a group named by this text.
 */
export const ZMenuLabel = c(() => <host />, { props: {} })
