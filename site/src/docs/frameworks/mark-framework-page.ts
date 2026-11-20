import type { FrameworkT } from '@app/docs/frameworks/framework-storage'

// Marks the reader's framework in the Guide sidebar: the Usage page whose
// slug matches the chosen framework (guide/react, guide/vue…) gets a badge.

type SidebarEntryT = { value?: string; label?: string; badge?: string; items?: SidebarEntryT[] }

const FRAMEWORK_BADGE = 'Yours'

const markEntry = (entry: SidebarEntryT, frameworkValue: string): SidebarEntryT => {
	const hasChildren = Array.isArray(entry.items)
	if (hasChildren) return { ...entry, items: markEntries(entry.items ?? [], frameworkValue) }
	const isFrameworkPage = entry.value === frameworkValue
	if (!isFrameworkPage) return entry
	return { ...entry, badge: FRAMEWORK_BADGE }
}

const markEntries = (entries: SidebarEntryT[], frameworkValue: string): SidebarEntryT[] => {
	return entries.map((entry) => markEntry(entry, frameworkValue))
}

export const markFrameworkPage = (items: unknown[], sectionId: string, framework: FrameworkT): unknown[] => {
	const isGuide = sectionId === 'guide'
	if (!isGuide) return items
	const frameworkValue = `guide/${framework}`
	return markEntries(items as SidebarEntryT[], frameworkValue)
}
