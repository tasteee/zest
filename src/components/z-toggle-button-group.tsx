import { interactionStyles } from '../shared/interaction-styles'
import { defineFormElement, useFormControl } from '../shared/form-control'
import { c, css, event, useEffect, useHost, useListener, useRef, useState } from 'atomico'
import { toggleVariantProps } from '../shared/toggle-schema'
import { oneOf } from '../shared/prop-types'
import { warnLegacyOrientation } from '../shared/deprecate'
import { reportMisuse } from '../shared/misuse'

const styles = css`
	:host {
		display: flex;
		width: fit-content;
		align-items: center;
		user-select: none;
		-webkit-user-select: none;
	}

	/* align-items: center on the base :host cross-aligns by height in
	   horizontal mode, which is fine since every item shares one height. In
	   vertical mode the cross axis becomes width, and centering there lets
	   each item sit at its own fit-content width — shorter labels end up
	   narrower than longer ones, staircasing instead of stacking flush. */
	:host([is-vertical]),
	:host([direction='vertical']) {
		flex-direction: column;
		align-items: stretch;
	}

	::slotted(*) {
		--z-toggle-button-radius: 0;
		flex-shrink: 0;
		min-width: 0;
	}

	::slotted(:only-child) {
		--z-toggle-button-radius: var(--radius-md);
	}

	:host(:not([is-vertical]):not([direction='vertical']):not([columns])) ::slotted(:first-child) {
		--z-toggle-button-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	:host(:not([is-vertical]):not([direction='vertical']):not([columns])) ::slotted(:last-child) {
		--z-toggle-button-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	:host(:not([is-vertical]):not([direction='vertical']):not([columns])) ::slotted(:not(:first-child)) {
		margin-inline-start: -1px;
	}

	:host([is-vertical]:not([columns])) ::slotted(:first-child),
	:host([direction='vertical']:not([columns])) ::slotted(:first-child) {
		--z-toggle-button-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	:host([is-vertical]:not([columns])) ::slotted(:last-child),
	:host([direction='vertical']:not([columns])) ::slotted(:last-child) {
		--z-toggle-button-radius: 0 0 var(--radius-md) var(--radius-md);
	}

	:host([is-vertical]:not([columns])) ::slotted(:not(:first-child)),
	:host([direction='vertical']:not([columns])) ::slotted(:not(:first-child)) {
		margin-top: -1px;
	}

	/* Stacking ladder: items overlap by 1px (above) so neighbouring borders
	   collapse into a single seam. Earlier items are laid ABOVE later ones so
	   each item paints its OWN right/bottom border at the seam rather than being
	   covered by the next item's leading border. The hovered/focused/selected
	   item jumps above everything so its full (tone) border is never clipped. */
	::slotted(*) {
		position: relative;
		z-index: 1;
	}
	::slotted(:nth-child(1)) {
		z-index: 9;
	}
	::slotted(:nth-child(2)) {
		z-index: 8;
	}
	::slotted(:nth-child(3)) {
		z-index: 7;
	}
	::slotted(:nth-child(4)) {
		z-index: 6;
	}
	::slotted(:nth-child(5)) {
		z-index: 5;
	}
	::slotted(:nth-child(6)) {
		z-index: 4;
	}
	::slotted(:nth-child(7)) {
		z-index: 3;
	}
	::slotted(:nth-child(8)) {
		z-index: 2;
	}
	::slotted(:hover),
	::slotted([data-state='on']),
	::slotted(:focus-visible) {
		z-index: 20;
	}

	/* Group-level variants work by inheritance: these custom properties cross
	   into the slotted items and their shadow buttons, and an item that sets
	   its own accent/size/kind overrides them locally. That only holds because
	   an unset variant resolves to no class at all — see toggle-schema.ts. */
	:host([tone='secondary']) {
		--z-toggle-button-color: var(--accent-secondary);
		--z-toggle-button-accent: var(--accent-secondary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='tertiary']) {
		--z-toggle-button-color: var(--accent-tertiary);
		--z-toggle-button-accent: var(--accent-tertiary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='primary']) {
		--z-toggle-button-color: var(--text-primary);
		--z-toggle-button-accent: var(--accent-primary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='success']) {
		--z-toggle-button-color: var(--status-success);
		--z-toggle-button-accent: var(--status-success);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='warning']) {
		--z-toggle-button-color: var(--status-warning);
		--z-toggle-button-accent: var(--status-warning);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	:host([tone='danger']) {
		--z-toggle-button-color: var(--status-danger);
		--z-toggle-button-accent: var(--status-danger);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}


	:host([size='xs']) {
		--z-toggle-button-height: var(--control-height-xs);
		--z-toggle-button-padding-inline: 0.625rem;
		--z-toggle-button-min-width: var(--control-height-xs);
		--z-toggle-button-font-size: var(--font-size-xs);
		--z-toggle-button-icon-size: 0.75rem;
	}

	:host([size='sm']) {
		--z-toggle-button-height: var(--control-height-sm);
		--z-toggle-button-padding-inline: 0.75rem;
		--z-toggle-button-min-width: var(--control-height-sm);
		--z-toggle-button-font-size: var(--font-size-sm);
		--z-toggle-button-icon-size: 0.875rem;
	}

	:host([size='lg']) {
		--z-toggle-button-height: var(--control-height-lg);
		--z-toggle-button-padding-inline: 1.25rem;
		--z-toggle-button-min-width: var(--control-height-lg);
		--z-toggle-button-font-size: var(--font-size-md);
		--z-toggle-button-icon-size: 1.125rem;
	}

	:host([kind='ghost']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 10%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	/* off: tone-colored text + a dimmed tone border (mixed toward transparent so
	   the hue never rotates). on: solid tone fill with dark on-foreground text. */
	:host([kind='outline']) {
		--z-toggle-button-border: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 50%, transparent);
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 10%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: var(--z-toggle-button-accent, var(--text-primary));
	}

	/* solid: filled at rest, not just on press, so the segment reads as an
	   object even before it is selected. */
	:host([kind='solid']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-bg: color-mix(in oklab, var(--z-toggle-button-accent, var(--text-primary)) 12%, var(--z-toggle-button-surface, transparent));
		--z-toggle-button-hover-bg: color-mix(in oklab, var(--z-toggle-button-accent, var(--text-primary)) 20%, var(--z-toggle-button-surface, transparent));
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	:host([kind='soft']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 15%, transparent);
		--z-toggle-button-color: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 24%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	/* plain: text only at rest, underline is the only affordance until pressed. */
	:host([kind='plain']) {
		--z-toggle-button-border: transparent;
		--z-toggle-button-hover-bg: transparent;
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	/* columns: a grid of separate items instead of one joined strip. Seams
	   only make sense along a single line, so every item keeps its own full
	   radius and the grid gap separates them. Overrides is-vertical. */
	:host([columns]) {
		display: grid;
		grid-template-columns: repeat(var(--columns, 1), minmax(0, 1fr));
		gap: var(--space-1);
		align-items: stretch;
	}

	:host([columns]) ::slotted(*) {
		--z-toggle-button-radius: var(--radius-md);
		margin: 0;
	}

	:host([is-hidden]) {
		display: none;
	}
`

type PressDetailT = { pressed: boolean; value?: string }
type ToggleGroupItemElementT = HTMLElement & { isPressed?: boolean }

export const ZToggleButtonGroup = c(
	(props) => {
		warnLegacyOrientation({ tag: 'z-toggle-button-group', attribute: 'direction', value: props.direction, flag: 'is-vertical', flagValue: 'vertical' })
		const host = useHost()
		// The pressed values live on the children; a copy in state is what the
		// form reads, refreshed on every press and slot change.
		const [pressed, setPressed] = useState<string[]>([])
		const defaults = useRef<string[] | null>(null)
		const syncPressed = () => {
			const values = getPressedValues(host.current)
			if (defaults.current === null && host.current.querySelector('z-toggle-button-group-item')) defaults.current = values
			setPressed(values)
		}
		const formValue = () => {
			if (pressed.length === 0) return null
			if (!props.isMultiple) return pressed[0]
			const data = new FormData()
			const name = host.current.getAttribute('name') ?? ''
			for (const value of pressed) data.append(name, value)
			return data
		}
		const { isFormDisabled } = useFormControl({
			value: formValue(),
			isDisabled: props.isDisabled,
			onReset: () => {
				const wanted = new Set(defaults.current ?? [])
				for (const item of host.current.querySelectorAll<ToggleGroupItemElementT & { value?: string }>('z-toggle-button-group-item')) {
					item.isPressed = wanted.has(item.value ?? '')
				}
				syncPressed()
			}
		})
		const isDisabled = Boolean(props.isDisabled) || isFormDisabled

		useListener(
			host,
			'press',
			(rawEvent: unknown) => {
				const zEvent = rawEvent as CustomEvent<PressDetailT>

				if (props.isMultiple) {
					props.change({ value: getPressedValues(host.current) })
					syncPressed()
					return
				}

				const target = zEvent.target as ToggleGroupItemElementT

				for (const item of host.current.querySelectorAll<ToggleGroupItemElementT>('z-toggle-button-group-item')) {
					if (item !== target) item.isPressed = false
				}

				props.change({ value: zEvent.detail.pressed ? zEvent.detail.value : undefined })
				syncPressed()
			},
			{ passive: true }
		)

		const columns = resolveColumns(props.columns)
		const isVertical = Boolean(props.isVertical) || props.direction === 'vertical'
		const hasColumns = columns > 0

		useEffect(() => {
			const hasConflict = hasColumns && isVertical
			if (!hasConflict) return
			reportMisuse(host.current, 'columns-vertical', 'z-toggle-button-group: columns and is-vertical are both set. columns wins; remove one.')
		}, [hasColumns, isVertical])

		useRovingFocus(host, { columns, isVertical, pressed })

		// The column count reaches the grid through a custom property set on
		// the host directly, so a consumer's own inline style is left alone.
		useEffect(() => {
			const style = host.current.style
			if (hasColumns) style.setProperty('--columns', String(columns))
			if (!hasColumns) style.removeProperty('--columns')
		}, [columns, hasColumns])

		return (
			<host shadowDom role="group" aria-disabled={isDisabled ? 'true' : undefined}>
				<slot onslotchange={syncPressed} />
			</host>
		)
	},
	{
		props: {
			...toggleVariantProps,
			name: { type: String, reflect: true },
			isVertical: { type: Boolean, reflect: true },
			columns: { type: Number, reflect: true },
			/** @deprecated use is-vertical */
			direction: { type: oneOf('horizontal', 'vertical'), reflect: true },
			isHidden: { type: Boolean, reflect: true },
			isMultiple: { type: Boolean, reflect: true },
			isDisabled: { type: Boolean, reflect: true },
			change: event<{ value?: string | string[] }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles],
		form: true
	}
)

// A whole number of columns, or 0 when the group is a single line.
const resolveColumns = (value: unknown): number => {
	const count = Math.floor(Number(value))
	const isUsable = Number.isFinite(count) && count >= 1
	return isUsable ? count : 0
}

type RovingOptionsT = { columns: number; isVertical: boolean; pressed: string[] }
type RovingItemT = HTMLElement & { isDisabled?: boolean; isPressed?: boolean }

const ITEM_SELECTOR = 'z-toggle-button-group-item'

/*
 * One tab stop for the whole group (roving tabindex on the item hosts). The
 * stop sits on the pressed item, or the first enabled one. Arrow keys move
 * focus without pressing: along the line for a single-line group, or in two
 * dimensions when `columns` is set (←/→ step and wrap across rows, ↑/↓ jump a
 * row). Home/End go to the first/last enabled item. Disabled items are skipped.
 *
 * Inside a z-toolbar the toolbar already owns roving focus for every control,
 * including these items, so the group stays out of its way.
 */
const useRovingFocus = (host: { current: HTMLElement }, options: RovingOptionsT): void => {
	useEffect(() => {
		const element = host.current
		const isInsideToolbar = Boolean(element.parentElement?.closest('z-toolbar'))
		if (isInsideToolbar) return

		const getItems = () => [...element.querySelectorAll<RovingItemT>(ITEM_SELECTOR)]
		const isEnabled = (item: RovingItemT) => !item.isDisabled && !item.hasAttribute('is-hidden')

		const setStop = (stopItem: RovingItemT | undefined) => {
			for (const item of getItems()) item.tabIndex = item === stopItem ? 0 : -1
		}

		const findDefaultStop = () => {
			const items = getItems()
			const pressedItem = items.find((item) => item.isPressed && isEnabled(item))
			const firstEnabled = items.find(isEnabled)
			return pressedItem ?? firstEnabled
		}

		const isRightToLeft = () => getComputedStyle(element).direction === 'rtl'

		// Steps from `start` by `step` until an enabled item, wrapping when asked.
		const findFrom = (items: RovingItemT[], start: number, step: number, shouldWrap: boolean) => {
			for (const attempt of items.keys()) {
				const rawIndex = start + step * (attempt + 1)
				const isOutside = rawIndex < 0 || rawIndex >= items.length
				if (isOutside && !shouldWrap) return undefined
				const index = ((rawIndex % items.length) + items.length) % items.length
				const candidate = items[index]
				if (isEnabled(candidate)) return candidate
			}
			return undefined
		}

		const resolveStep = (key: string): { step: number; shouldWrap: boolean } | undefined => {
			const forward = isRightToLeft() ? 'ArrowLeft' : 'ArrowRight'
			const backward = isRightToLeft() ? 'ArrowRight' : 'ArrowLeft'
			const hasColumns = options.columns > 0
			if (hasColumns) {
				if (key === forward) return { step: 1, shouldWrap: true }
				if (key === backward) return { step: -1, shouldWrap: true }
				if (key === 'ArrowDown') return { step: options.columns, shouldWrap: false }
				if (key === 'ArrowUp') return { step: -options.columns, shouldWrap: false }
				return undefined
			}
			const next = options.isVertical ? 'ArrowDown' : forward
			const previous = options.isVertical ? 'ArrowUp' : backward
			if (key === next) return { step: 1, shouldWrap: true }
			if (key === previous) return { step: -1, shouldWrap: true }
			return undefined
		}

		const onKeyDown = (keyEvent: KeyboardEvent) => {
			const items = getItems()
			const current = (keyEvent.target as HTMLElement).closest(ITEM_SELECTOR) as RovingItemT | null
			const currentIndex = current ? items.indexOf(current) : -1
			if (currentIndex < 0) return
			const enabledItems = items.filter(isEnabled)
			const isHome = keyEvent.key === 'Home'
			const isEnd = keyEvent.key === 'End'
			const move = resolveStep(keyEvent.key)
			const isHandled = isHome || isEnd || Boolean(move)
			if (!isHandled) return
			keyEvent.preventDefault()
			const homeItem = enabledItems[0]
			const endItem = enabledItems[enabledItems.length - 1]
			const steppedItem = move ? findFrom(items, currentIndex, move.step, move.shouldWrap) : undefined
			const target = isHome ? homeItem : isEnd ? endItem : steppedItem
			if (!target) return
			setStop(target)
			target.focus()
		}

		const onFocusIn = (focusEvent: FocusEvent) => {
			const item = (focusEvent.target as HTMLElement).closest(ITEM_SELECTOR) as RovingItemT | null
			const isOwnItem = Boolean(item) && item!.parentElement === element
			if (isOwnItem) setStop(item!)
		}

		const onFocusOut = (focusEvent: FocusEvent) => {
			const nextTarget = focusEvent.relatedTarget as Node | null
			const isLeavingGroup = !nextTarget || !element.contains(nextTarget)
			if (isLeavingGroup) setStop(findDefaultStop())
		}

		setStop(findDefaultStop())
		element.addEventListener('keydown', onKeyDown)
		element.addEventListener('focusin', onFocusIn)
		element.addEventListener('focusout', onFocusOut)
		const observer = new MutationObserver(() => {
			const isFocusInside = element.contains(document.activeElement)
			if (!isFocusInside) setStop(findDefaultStop())
		})
		observer.observe(element, { childList: true, subtree: true, attributes: true, attributeFilter: ['is-disabled', 'is-hidden', 'is-pressed'] })

		return () => {
			element.removeEventListener('keydown', onKeyDown)
			element.removeEventListener('focusin', onFocusIn)
			element.removeEventListener('focusout', onFocusOut)
			observer.disconnect()
		}
	}, [options.columns, options.isVertical, options.pressed.join('\u0000')])
}

const getPressedValues = (root: HTMLElement): string[] => {
	const items = root.querySelectorAll<ToggleGroupItemElementT & { value?: string }>('z-toggle-button-group-item')
	const pressedValues: string[] = []

	for (const item of items) {
		if (item.isPressed && item.value) pressedValues.push(item.value)
	}

	return pressedValues
}

defineFormElement('z-toggle-button-group', ZToggleButtonGroup)
