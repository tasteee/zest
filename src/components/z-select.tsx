import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { describableProps, describedBy, renderDescriptions, srOnlyStyles, useAccessibleName } from '../shared/accessible'
import { c, css, event, useProp, useState, useHost, useEffect, useRef } from 'atomico'
import { themedScrollbarStyles } from '../shared/scrollbar-styles'
import { computePosition, autoUpdate, applyPosition, showFloating, hideFloating } from '../shared/overlay'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'
import { enabledIndicesOf, findPath, hasChildren, nodeAt, siblingsOf, valuesAlong } from '../shared/nested-options'
import type { NestedOptionT } from '../shared/nested-options'

/*
 * z-select, a custom dropdown. Trigger shows the selected label (or a
 * placeholder); the panel is a bordered, floating popover that drops below.
 * Options are supplied as an `options` array property:
 *   el.options = [{ value, label, isDisabled?, children? }]
 * An option with `children` is a branch: it opens a cascading submenu and is
 * never itself selectable. Only leaves are picked, `value` stays a single
 * (tree-unique) string, and `change` also reports `path`, the values from the
 * root down to the leaf.
 * `value-prefix` puts a string before the selected label in the trigger only.
 * Selection highlights with an accent tint. Keyboard: ↑/↓ move within a level,
 * →/Enter open a branch (← in RTL), ←/Esc close a submenu (→ in RTL), Enter
 * picks a leaf, Esc at the top level closes. Clicking outside closes.
 */
const styles = css`
	:host {
		display: inline-flex;
		position: relative;
		width: 100%;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-inline]) {
		width: auto;
	}

	:host([is-hidden]) {
		display: none;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2-5);
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: inherit;
		cursor: pointer;
		text-align: start;
		user-select: none;
		-webkit-user-select: none;
		transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}

	.trigger.is-sm {
		height: var(--control-height-sm);
		padding-inline: var(--space-3);
		font-size: var(--font-size-sm);
	}
	.trigger.is-md {
		height: var(--control-height-md);
		padding-inline: var(--space-3-5);
		font-size: var(--font-size-sm);
	}
	.trigger.is-lg {
		height: var(--control-height-lg);
		padding-inline: var(--space-4);
		font-size: var(--font-size-md);
	}

	.trigger:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.trigger.is-open {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 5%, transparent);
	}

	.trigger.is-invalid {
		border-color: var(--status-danger);
	}

	.trigger.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.trigger:focus-visible {
		outline: 1px solid var(--border-focus);
		outline-offset: -1px;
	}

	.value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	.value.is-placeholder {
		color: var(--text-secondary);
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--text-secondary);
		transition: transform var(--motion-fast) var(--ease-enter);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.trigger.is-open .chevron {
		transform: rotate(180deg);
		color: var(--tone);
	}

	/* Fixed + top-layer (via [popover]) rather than absolute-in-:host, so the
	   panel escapes any scrollable ancestor (e.g. a dialog body) instead of
	   enlarging its scrollable overflow. The display property is left unset
	   here (outside :popover-open) so the UA's popover stylesheet still hides
	   it when closed — an author display declaration would out-cascade that
	   regardless of specificity, since origin wins first. See shared/overlay.ts. */
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
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-1-5);
		max-height: 16rem;
		overflow-y: auto;
		gap: 1px;
	}

	.panel:popover-open {
		display: flex;
		flex-direction: column;
	}

	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
	}

	.option.is-active {
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		color: var(--tone);
	}

	.option.is-selected,
	.option.is-ancestor {
		color: var(--tone);
		font-weight: var(--font-weight-semibold);
	}

	.levels {
		display: contents;
	}

	.panel.submenu {
		min-width: 10rem;
	}

	.branch-chevron {
		width: 0.875rem;
		height: 0.875rem;
		flex-shrink: 0;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	:host(:dir(rtl)) .branch-chevron {
		transform: scaleX(-1);
	}

	.option.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.tick {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.empty {
		padding: var(--space-2-5);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		text-align: center;
	}
`

const resolveSizeClass = (props: any): string => {
	if (props.size === 'sm') return 'is-sm'
	if (props.size === 'lg') return 'is-lg'
	return 'is-md'
}

type OptionT = NestedOptionT

export const ZSelect = c(
	(props) => {
		const t = useLocale()
		const host = useHost()
		const accessibleName = useAccessibleName(props.label)
		const panelRef = useRef<HTMLDivElement>()
		const triggerRef = useRef<HTMLButtonElement>()
		const [value, setValue] = useProp<string>('value')
		const defaultValue = useRef(value)
		const [isOpen, setIsOpen] = useState(false)
		// Index path to the highlighted option, one entry per open level. A
		// branch's submenu is open when the path continues past it, or when
		// `isSubOpen` says the branch itself was just opened (hover/click/→).
		const [activePath, setActivePath] = useState<number[]>([])
		const [isSubOpen, setIsSubOpen] = useState(false)

		const options: OptionT[] = Array.isArray(props.options) ? (props.options as OptionT[]) : []
		const selectedPath = findPath(options, value)
		const selected = selectedPath ? nodeAt(options, selectedPath) : undefined
		const hasValue = value != null && value !== ''
		// The trigger is a <button>, which has no validity of its own, so
		// `required` is decided here and anchored to it for the browser's bubble.
		const { isFormDisabled } = useFormControl({
			value: value ?? '',
			isDisabled: props.isDisabled,
			control: triggerRef,
			validity: props.isRequired && !hasValue
				? { flags: { valueMissing: true }, message: t('selectAnItemInTheList') }
				: { flags: {} },
			onReset: () => setValue(defaultValue.current),
			onRestore: (state) => { if (typeof state === 'string') setValue(state) }
		})
		const isDisabled = Boolean(props.isDisabled) || isFormDisabled

		useEffect(() => {
			if (!isOpen) return
			const onDocumentPointerDown = (e: Event) => {
				if (!e.composedPath().includes(host.current as EventTarget)) setIsOpen(false)
			}
			document.addEventListener('pointerdown', onDocumentPointerDown)
			return () => document.removeEventListener('pointerdown', onDocumentPointerDown)
		}, [isOpen])

		useEffect(() => {
			const panel = panelRef.current
			if (!panel) return
			if (!isOpen) {
				hideFloating(panel)
				return
			}
			showFloating(panel)
			const update = () => {
				panel.style.width = `${host.current.getBoundingClientRect().width}px`
				applyPosition(panel, computePosition(host.current, panel, { placement: 'bottom-start', offset: 6, padding: 8 }))
			}
			const cleanup = autoUpdate(host.current, panel, update)
			return () => {
				cleanup()
				hideFloating(panel)
			}
		}, [isOpen])

		const rootEnabled = enabledIndicesOf(options)
		const activeNode = nodeAt(options, activePath)
		const activeId = activePath.length ? `option-${activePath.join('-')}` : undefined
		const isRtl = () => getComputedStyle(host.current).direction === 'rtl'

		// The panels on screen, outermost first: the roots, then the children of
		// each branch along the active path whose submenu is open.
		const levels: Array<{ nodes: OptionT[]; parentPath: number[] }> = [{ nodes: options, parentPath: [] }]
		if (isOpen) {
			let nodes = options
			for (let depth = 0; depth < activePath.length; depth++) {
				const node = nodes[activePath[depth]]
				if (!hasChildren(node)) break
				if (depth === activePath.length - 1 && !isSubOpen) break
				nodes = node.children as OptionT[]
				levels.push({ nodes, parentPath: activePath.slice(0, depth + 1) })
			}
		}
		const levelKey = levels.map((level) => level.parentPath.join('-')).join('|')

		const open = (fromEnd = false) => {
			if (isDisabled) return
			const path = selectedPath && !nodeAt(options, selectedPath)?.isDisabled ? selectedPath : undefined
			setActivePath(path ?? [(fromEnd ? rootEnabled.at(-1) : rootEnabled[0]) ?? -1])
			setIsSubOpen(false)
			setIsOpen(true)
		}
		const commit = (opt: OptionT, path: number[]) => {
			if (isDisabled || opt.isDisabled || hasChildren(opt)) return
			setIsOpen(false)
			if (opt.value !== value) {
				setValue(opt.value)
				props.change({ value: opt.value, path: valuesAlong(options, path) })
			}
			host.current.shadowRoot?.querySelector<HTMLButtonElement>('.trigger')?.focus()
		}
		// Open the highlighted branch, landing on its first enabled child.
		const enterBranch = (path: number[]) => {
			const node = nodeAt(options, path)
			if (!node || node.isDisabled || !hasChildren(node)) return
			const first = enabledIndicesOf(node.children as OptionT[])[0]
			setActivePath(first === undefined ? path : [...path, first])
			setIsSubOpen(true)
		}
		const leaveBranch = () => {
			setActivePath(activePath.slice(0, -1))
			setIsSubOpen(false)
		}
		const activate = (opt: OptionT, path: number[]) => hasChildren(opt) ? enterBranch(path) : commit(opt, path)

		useEffect(() => {
			if (isDisabled) setIsOpen(false)
		}, [isDisabled])

		useEffect(() => {
			if (!isOpen) return
			if (!activeNode || activeNode.isDisabled) {
				setActivePath([rootEnabled[0] ?? -1])
				return
			}
			host.current.shadowRoot?.querySelector<HTMLElement>(`#option-${activePath.join('-')}`)?.scrollIntoView({ block: 'nearest' })
		}, [isOpen, activePath.join('-'), props.options])

		// Submenus are their own top-layer panels, each anchored to its parent row.
		// They leave the top layer when they leave the DOM, so only the autoUpdate
		// subscriptions need tearing down here.
		useEffect(() => {
			if (!isOpen) return
			const root = host.current.shadowRoot
			const cleanups: Array<() => void> = []
			root?.querySelectorAll<HTMLElement>('.submenu').forEach((panel) => {
				const anchor = root.querySelector<HTMLElement>(`#${panel.dataset.parent}`)
				if (!anchor) return
				if (!panel.matches(':popover-open')) showFloating(panel)
				const placement = isRtl() ? 'left-start' : 'right-start'
				cleanups.push(autoUpdate(anchor, panel, () => applyPosition(panel, computePosition(anchor, panel, { placement, offset: 2, padding: 8 }))))
			})
			return () => cleanups.forEach((cleanup) => cleanup())
		}, [isOpen, levelKey])

		const search = useRef({ text: '', time: 0 })
		const onKeyDown = (e: KeyboardEvent) => {
			if (isDisabled) return
			if (e.key === 'Tab') {
				setIsOpen(false)
				return
			}
			if (e.key === 'Escape') {
				if (!isOpen) return
				e.preventDefault()
				e.stopPropagation()
				// Esc backs out one submenu at a time before it closes the select.
				if (activePath.length > 1) leaveBranch()
				else setIsOpen(false)
				return
			}
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				if (!isOpen) open()
				else if (activeNode) activate(activeNode, activePath)
				return
			}
			if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
				if (!isOpen) return
				e.preventDefault()
				const opensBranch = (e.key === 'ArrowRight') !== isRtl()
				if (opensBranch) enterBranch(activePath)
				else if (activePath.length > 1) leaveBranch()
				return
			}
			if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
				e.preventDefault()
				if (!isOpen) { open(e.key === 'ArrowUp' || e.key === 'End'); return }
				const enabled = enabledIndicesOf(siblingsOf(options, activePath))
				const current = activePath.at(-1) as number
				const position = enabled.indexOf(current)
				const next = e.key === 'Home' ? enabled[0]
					: e.key === 'End' ? enabled.at(-1)
					: enabled[(position + (e.key === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length]
				setActivePath([...activePath.slice(0, -1), next ?? -1])
				setIsSubOpen(false)
				return
			}
			if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
				e.preventDefault()
				const now = Date.now()
				const text = (now - search.current.time < 600 ? search.current.text : '') + e.key.toLowerCase()
				search.current = { text, time: now }
				const query = [...text].every((char) => char === text[0]) ? text[0] : text
				// typeahead searches the level the highlight is on
				const level = isOpen ? siblingsOf(options, activePath) : options
				const enabled = enabledIndicesOf(level)
				const start = isOpen ? enabled.indexOf(activePath.at(-1) as number) : -1
				const ordered = [...enabled.slice(start + 1), ...enabled.slice(0, start + 1)]
				const match = ordered.find((index) => level[index].label.toLowerCase().startsWith(query))
				if (match !== undefined) {
					if (!isOpen) setIsOpen(true)
					setActivePath([...(isOpen ? activePath.slice(0, -1) : []), match])
					setIsSubOpen(false)
				}
			}
		}

		const triggerClass = ['trigger', resolveSizeClass(props)]
			.concat(isOpen ? ['is-open'] : [])
			.concat(props.isInvalid ? ['is-invalid'] : [])
			.concat(isDisabled ? ['is-disabled'] : [])
			.join(' ')

		return (
			<host shadowDom={{ delegatesFocus: true }}>
				<button
					ref={triggerRef}
					type="button"
					class={triggerClass}
					disabled={isDisabled}
					role="combobox"
					aria-required={props.isRequired ? 'true' : undefined}
					aria-haspopup="listbox"
					aria-controls="select-options"
					aria-activedescendant={isOpen && activeNode ? activeId : undefined}
					aria-label={accessibleName}
					aria-describedby={describedBy(props.description, props.error)}
					aria-invalid={props.isInvalid || props.error ? 'true' : undefined}
					aria-expanded={isOpen ? 'true' : 'false'}
					onclick={() => isOpen ? setIsOpen(false) : open()}
					onkeydown={onKeyDown}
				>
					<span class={selected ? 'value' : 'value is-placeholder'}>
						{selected ? `${props.valuePrefix ?? ''}${selected.label}` : props.placeholder || t('selectPlaceholder')}
					</span>
					<svg class="chevron" viewBox="0 0 24 24">
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</button>

				<div class="levels">
				{levels.map((level, depth) => {
					const isRoot = depth === 0
					const parentNode = isRoot ? undefined : nodeAt(options, level.parentPath)
					const levelActive = activePath.length > depth ? activePath[depth] : -1
					return (
						<div
							key={`level-${level.parentPath.join('-')}`}
							ref={isRoot ? panelRef : undefined}
							id={isRoot ? 'select-options' : `select-options-${level.parentPath.join('-')}`}
							class={isRoot ? 'panel' : 'panel submenu'}
							role="listbox"
							aria-label={isRoot ? props.label || props.placeholder || t('options') : parentNode?.label}
							data-parent={isRoot ? undefined : `option-${level.parentPath.join('-')}`}
							popover="manual"
						>
							{isRoot && options.length === 0 && <div class="empty">{t('noOptions')}</div>}
							{level.nodes.map((opt, index) => {
								const path = [...level.parentPath, index]
								const isBranch = hasChildren(opt)
								const isAncestor = isBranch && selectedPath !== undefined && path.every((entry, i) => selectedPath[i] === entry)
								const optClass = ['option']
									.concat(index === levelActive ? ['is-active'] : [])
									.concat(!isBranch && opt.value === value ? ['is-selected'] : [])
									.concat(isAncestor ? ['is-ancestor'] : [])
									.concat(opt.isDisabled ? ['is-disabled'] : [])
									.join(' ')
								return (
									<div
										key={opt.value}
										class={optClass}
										role="option"
										id={`option-${path.join('-')}`}
										aria-disabled={opt.isDisabled ? 'true' : undefined}
										aria-selected={!isBranch && opt.value === value ? 'true' : 'false'}
										aria-haspopup={isBranch ? 'listbox' : undefined}
										aria-expanded={isBranch ? (levels[depth + 1]?.parentPath.join('-') === path.join('-') ? 'true' : 'false') : undefined}
										onmouseenter={() => {
											if (opt.isDisabled) return
											setActivePath(path)
											setIsSubOpen(isBranch)
										}}
										onmousedown={(e: MouseEvent) => e.preventDefault()}
										onclick={() => {
											if (!isBranch) return commit(opt, path)
											if (opt.isDisabled) return
											setActivePath(path)
											setIsSubOpen(true)
										}}
									>
										<span>{opt.label}</span>
										{isBranch ? (
											<svg class="branch-chevron" viewBox="0 0 24 24">
												<polyline points="9 6 15 12 9 18" />
											</svg>
										) : opt.value === value && (
											<svg class="tick" viewBox="0 0 24 24">
												<polyline points="4 12 10 18 20 6" />
											</svg>
										)}
									</div>
								)
							})}
						</div>
					)
				})}
				</div>
				{renderDescriptions(props.description, props.error)}
			</host>
		)
	},
	{
		props: {
			...describableProps,
			value: { type: String, reflect: true },
			name: { type: String, reflect: true },
			label: String,
			placeholder: String,
			// Text shown before the selected label in the trigger, e.g. "Weight: ".
			// The options in the panel are not affected.
			valuePrefix: String,
			options: { type: Array },
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			tone: { type: oneOf('primary', 'secondary', 'tertiary'), reflect: true },
			isRequired: { type: Boolean, reflect: true },
			isInvalid: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			isInline: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			change: event<{ value: string; path: string[] }>({ bubbles: true, composed: true })
		},
		styles: [themedScrollbarStyles, styles, interactionStyles, srOnlyStyles],
		form: true
	}
)

defineFormElement('z-select', ZSelect)
