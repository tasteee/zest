// The API reference block: one z-tabs strip over a z-table per API surface.
// Tabs with nothing to show are dropped rather than rendered empty, so a
// component with no events never advertises an "Events" tab.

import { buildTabPanel, buildTable, buildTabs, createElement } from './zest-elements'
import type { ZTabT, ZTableColumnT, ZTableRowT } from './zest-elements'
import type { ApiRowT, ComponentDocT, CssVariableRowT, EventRowT, SlotRowT } from '../component-docs/types'

const ATTRIBUTE_COLUMNS: ZTableColumnT[] = [
	{ key: 'name', label: 'Attribute', isMono: true },
	{ key: 'type', label: 'Type', isMono: true },
	{ key: 'defaultValue', label: 'Default', isMono: true },
	{ key: 'description', label: 'Description' }
]

const PROPERTY_COLUMNS: ZTableColumnT[] = [
	{ key: 'name', label: 'Property', isMono: true },
	{ key: 'type', label: 'Type', isMono: true },
	{ key: 'defaultValue', label: 'Default', isMono: true },
	{ key: 'description', label: 'Description' }
]

const SLOT_COLUMNS: ZTableColumnT[] = [
	{ key: 'name', label: 'Slot', isMono: true },
	{ key: 'description', label: 'Description' }
]

const EVENT_COLUMNS: ZTableColumnT[] = [
	{ key: 'name', label: 'Event', isMono: true },
	{ key: 'detail', label: 'detail', isMono: true },
	{ key: 'description', label: 'Description' }
]

const CSS_VARIABLE_COLUMNS: ZTableColumnT[] = [
	{ key: 'name', label: 'Custom property', isMono: true },
	{ key: 'defaultValue', label: 'Default', isMono: true },
	{ key: 'description', label: 'Description' }
]

const toApiTableRows = (rows: ApiRowT[]): ZTableRowT[] => {
	return rows.map((row) => {
		return { name: row.name, type: row.type, defaultValue: row.defaultValue, description: row.description }
	})
}

const toSlotTableRows = (rows: SlotRowT[]): ZTableRowT[] => {
	return rows.map((row) => {
		return { name: row.name, description: row.description }
	})
}

const toEventTableRows = (rows: EventRowT[]): ZTableRowT[] => {
	return rows.map((row) => {
		return { name: row.name, detail: row.detail, description: row.description }
	})
}

const toCssVariableTableRows = (rows: CssVariableRowT[]): ZTableRowT[] => {
	return rows.map((row) => {
		return { name: row.name, defaultValue: row.defaultValue, description: row.description }
	})
}

type ApiSectionT = {
	value: string
	label: string
	columns: ZTableColumnT[]
	rows: ZTableRowT[]
}

const collectApiSections = (componentDoc: ComponentDocT): ApiSectionT[] => {
	const candidateSections: ApiSectionT[] = [
		{ value: 'attributes', label: 'Attributes', columns: ATTRIBUTE_COLUMNS, rows: toApiTableRows(componentDoc.attributes) },
		{ value: 'properties', label: 'Properties', columns: PROPERTY_COLUMNS, rows: toApiTableRows(componentDoc.properties) },
		{ value: 'slots', label: 'Slots', columns: SLOT_COLUMNS, rows: toSlotTableRows(componentDoc.slots) },
		{ value: 'events', label: 'Events', columns: EVENT_COLUMNS, rows: toEventTableRows(componentDoc.events) },
		{ value: 'css', label: 'CSS', columns: CSS_VARIABLE_COLUMNS, rows: toCssVariableTableRows(componentDoc.cssVariables) }
	]

	return candidateSections.filter((section) => section.rows.length > 0)
}

export const buildApiReference = (componentDoc: ComponentDocT): HTMLElement | null => {
	const sections = collectApiSections(componentDoc)

	const hasAnyApi = sections.length > 0
	if (!hasAnyApi) return null

	const tabDefinitions: ZTabT[] = sections.map((section) => {
		return { value: section.value, label: section.label }
	})

	const tabs = buildTabs(tabDefinitions)

	for (const section of sections) {
		const panel = buildTabPanel(section.value, 'apiPanel')
		panel.append(buildTable(section.columns, section.rows, 'Nothing here'))
		tabs.append(panel)
	}

	const wrapper = createElement('div', 'apiReference')
	wrapper.append(tabs)
	return wrapper
}
