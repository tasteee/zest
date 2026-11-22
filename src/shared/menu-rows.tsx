import { css } from 'atomico'
import { hasFlag, type ChildItemT } from './child-items'
import { reportMisuse } from './misuse'

/*
 * The rows of a menu (z-menu, z-context-menu), shared so both menus read the
 * same declarative children and draw the same row anatomy.
 *
 *   <z-menu-label>Fold rows</z-menu-label>
 *   <z-menu-item value="off" type="radio" is-checked description="Show every pitch">Off</z-menu-item>
 *   <z-menu-item value="notes" type="radio" description="Only rows with notes">Notes</z-menu-item>
 *   <z-menu-separator></z-menu-separator>
 *   <z-menu-item value="rename" shortcut="⌘R">Rename</z-menu-item>
 *
 * Ownership: the application owns which item is checked. A menu never flips
 * is-checked itself; it only reports the pick through `select` (Rule 1).
 */

export type MenuItemTypeT = 'action' | 'radio' | 'checkbox'

export type MenuRowT = {
	value?: string
	label?: string
	icon?: string
	shortcut?: string
	/** a second, smaller line under the label */
	description?: string
	type?: MenuItemTypeT
	isChecked?: boolean
	isDisabled?: boolean
	isSeparator?: boolean
	/** a non-focusable section heading (z-menu-label) */
	isHeading?: boolean
	isDanger?: boolean
	/** slot name carrying a declarative child's own content */
	slot?: string
}

export const MENU_ROW_TAGS = ['z-menu-item', 'z-menu-separator', 'z-menu-label']

export const MENU_ROW_ATTRIBUTES = ['shortcut', 'is-disabled', 'is-danger', 'type', 'is-checked', 'description']

const TYPES: MenuItemTypeT[] = ['action', 'radio', 'checkbox']

const resolveType = (value: string | null | undefined): MenuItemTypeT => {
	const isKnown = TYPES.includes(value as MenuItemTypeT)
	return isKnown ? (value as MenuItemTypeT) : 'action'
}

/** A declarative child as a row record. */
export const readMenuRow = (child: ChildItemT): MenuRowT => {
	const isSeparator = child.tag === 'z-menu-separator'
	if (isSeparator) return { isSeparator: true }
	const isHeading = child.tag === 'z-menu-label'
	if (isHeading) return { isHeading: true, label: child.label }
	return {
		value: child.value,
		label: child.label,
		shortcut: child.attributes.shortcut || undefined,
		description: child.attributes.description || undefined,
		type: resolveType(child.attributes.type),
		isChecked: hasFlag(child, 'is-checked'),
		isDisabled: hasFlag(child, 'is-disabled'),
		isDanger: hasFlag(child, 'is-danger'),
		slot: child.slot
	}
}

/** Rows the keyboard and typeahead can land on. */
export const isSelectableRow = (row: MenuRowT | undefined): boolean => {
	if (!row) return false
	return !row.isSeparator && !row.isHeading && !row.isDisabled
}

const isCheckable = (row: MenuRowT): boolean => row.type === 'radio' || row.type === 'checkbox'

export const menuItemRole = (row: MenuRowT): string => {
	if (row.type === 'radio') return 'menuitemradio'
	if (row.type === 'checkbox') return 'menuitemcheckbox'
	return 'menuitem'
}

export const menuItemChecked = (row: MenuRowT): string | undefined => {
	if (!isCheckable(row)) return undefined
	return row.isChecked ? 'true' : 'false'
}

/** Reports rows a menu cannot draw correctly (Rule 21). */
export const reportMenuRowMisuse = (host: Element, rows: MenuRowT[], rawTypes: Array<string | null | undefined>): void => {
	for (const rawType of rawTypes) {
		const isUnknownType = Boolean(rawType) && !TYPES.includes(rawType as MenuItemTypeT)
		if (isUnknownType) reportMisuse(host, `menu-type-${rawType}`, `menu item type="${rawType}" is not one of action, radio, checkbox. It is treated as an action.`)
	}
	const hasCheckedAction = rows.some((row) => row.isChecked && !isCheckable(row))
	if (hasCheckedAction) reportMisuse(host, 'menu-checked-action', 'menu item has is-checked but its type is not radio or checkbox, so the check is not shown. Set type="radio" or type="checkbox".')
}

export type MenuEntryT = { row: MenuRowT; index: number }

export type MenuSectionT =
	| { type: 'separator'; index: number }
	| { type: 'rows'; heading?: MenuEntryT; entries: MenuEntryT[] }

/*
 * Splits the flat row list into sections. A heading starts a labelled group
 * that runs until the next heading or separator; rows before any heading form
 * an unlabelled run. Indexes stay the flat ones, so keyboard state is unchanged.
 */
export const groupMenuRows = (rows: MenuRowT[]): MenuSectionT[] => {
	const sections: MenuSectionT[] = []
	const startRun = (heading?: MenuEntryT) => {
		const section: MenuSectionT = { type: 'rows', heading, entries: [] }
		sections.push(section)
		return section
	}
	let current: Extract<MenuSectionT, { type: 'rows' }> | undefined
	for (const [index, row] of rows.entries()) {
		if (row.isSeparator) {
			sections.push({ type: 'separator', index })
			current = undefined
			continue
		}
		if (row.isHeading) {
			current = startRun({ row, index }) as Extract<MenuSectionT, { type: 'rows' }>
			continue
		}
		if (!current) current = startRun() as Extract<MenuSectionT, { type: 'rows' }>
		current.entries.push({ row, index })
	}
	return sections
}

export const headingId = (index: number): string => `menu-heading-${index}`

export const descriptionId = (index: number): string => `menu-item-description-${index}`

/** Whether any row in the menu is checkable, so every row reserves the check column. */
export const hasCheckableRows = (rows: MenuRowT[]): boolean => rows.some(isCheckable)

const checkIcon = (
	<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M3.5 8.5l3 3 6-7"></path>
	</svg>
)

/** The leading check column. Rendered for every row once the menu has a checkable row, so labels align. */
export const renderCheck = (row: MenuRowT, shouldReserve: boolean) => {
	if (!shouldReserve) return null
	const isShown = isCheckable(row) && Boolean(row.isChecked)
	return <span class="check" aria-hidden="true">{isShown ? checkIcon : null}</span>
}

/** The label, with the description as a second line under it. */
export const renderRowText = (row: MenuRowT, index: number) => {
	const labelContent = row.slot ? <slot name={row.slot} /> : row.label
	if (!row.description) return <span class="label">{labelContent}</span>
	return (
		<span class="text">
			<span class="label">{labelContent}</span>
			<span class="description" id={descriptionId(index)}>{row.description}</span>
		</span>
	)
}

export const menuRowStyles = css`
	.text {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--space-0-5);
		min-width: 0;
	}

	.text .label {
		flex: none;
	}

	.description {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		white-space: normal;
	}

	/* On the highlighted row the tint lowers contrast, so the description
	   takes the row's own text color instead of the secondary one. */
	.item.is-active .description,
	.item:disabled .description,
	.item.is-disabled .description {
		color: inherit;
	}

	.check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--tone);
	}

	.heading {
		padding: var(--space-2) var(--space-2-5) var(--space-1);
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		user-select: none;
	}
`
