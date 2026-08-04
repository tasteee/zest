// The API reference block: one z-tabs strip over a z-api-table per surface.
// Tabs with nothing to show are dropped rather than rendered empty, so a
// component with no events never advertises an "Events" tab.
//
// The tables themselves used to be built here out of z-table plus a column
// definition per surface. z-api-table owns that now — it needs typed type
// cells, inline code in descriptions, and deep-linkable rows, none of which a
// general data grid can give you without being handed HTML.

import { buildTabPanel, buildTabs, createElement } from './zest-elements'
import type { ZTabT } from './zest-elements'
import type { ComponentDocT } from '../component-docs/types'

type ApiSectionT = {
	value: string
	label: string
	kind: string
	rows: unknown[]
}

const collectApiSections = (componentDoc: ComponentDocT): ApiSectionT[] => {
	const candidateSections: ApiSectionT[] = [
		{ value: 'attributes', label: 'Attributes', kind: 'attributes', rows: componentDoc.attributes },
		{ value: 'properties', label: 'Properties', kind: 'properties', rows: componentDoc.properties },
		{ value: 'slots', label: 'Slots', kind: 'slots', rows: componentDoc.slots },
		{ value: 'events', label: 'Events', kind: 'events', rows: componentDoc.events },
		{ value: 'css', label: 'CSS', kind: 'css', rows: componentDoc.cssVariables }
	]

	return candidateSections.filter((section) => section.rows.length > 0)
}

type ZApiTableElementT = HTMLElement & {
	rows: unknown[]
}

const buildApiTable = (section: ApiSectionT): ZApiTableElementT => {
	const table = createElement('z-api-table') as ZApiTableElementT
	table.setAttribute('kind', section.kind)
	table.rows = section.rows
	return table
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
		panel.append(buildApiTable(section))
		tabs.append(panel)
	}

	const wrapper = createElement('div', 'apiReference')
	wrapper.append(tabs)
	return wrapper
}
