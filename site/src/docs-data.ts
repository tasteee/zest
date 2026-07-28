// Parses the raw markdown docs (imported via import.meta.glob in main.ts)
// into a navigable site model: categories, pages, and route strings.
// Kept free of DOM APIs so it can be reasoned about and tested in isolation.

export type DocPageT = {
	slug: string
	title: string
	categorySlug: string
	categoryLabel: string
	rawMarkdown: string
	primaryExampleHtml: string | null
	route: string
}

export type DocCategoryT = {
	slug: string
	label: string
	pages: DocPageT[]
}

export type DocSiteDataT = {
	homeMarkdown: string
	categories: DocCategoryT[]
	standalonePages: DocPageT[]
	pagesByRoute: Map<string, DocPageT>
}

const CATEGORY_LABELS: Record<string, string> = {
	foundation: 'Foundation',
	layout: 'Layout',
	'buttons-actions': 'Buttons & Actions',
	forms: 'Forms',
	'data-display': 'Data Display',
	'navigation-disclosure': 'Navigation & Disclosure',
	overlays: 'Overlays',
	chat: 'Chat',
	'text-editor': 'Text Editor',
	attachments: 'Attachments',
	'canvas-panels': 'Canvas & Panels',
	effects: 'Effects',
	music: 'Music',
	specialized: 'Specialized'
}

const CATEGORY_ORDER = [
	'foundation',
	'layout',
	'buttons-actions',
	'forms',
	'data-display',
	'navigation-disclosure',
	'overlays',
	'chat',
	'text-editor',
	'attachments',
	'canvas-panels',
	'effects',
	'music',
	'specialized'
]

const getCategoryLabel = (categorySlug: string): string => {
	const knownLabel = CATEGORY_LABELS[categorySlug]
	if (knownLabel) return knownLabel

	const words = categorySlug.split('-')
	const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
	return capitalizedWords.join(' ')
}

const getDocTitle = (rawMarkdown: string, fallbackSlug: string): string => {
	const titleMatch = rawMarkdown.match(/^#\s+(.+)$/m)
	if (!titleMatch) return fallbackSlug
	return titleMatch[1].trim()
}

// Every doc's first fenced block is a ```html usage snippet (verified across
// the whole docs/ tree) — safe to use as the live-preview source.
const getPrimaryExampleHtml = (rawMarkdown: string): string | null => {
	const exampleMatch = rawMarkdown.match(/```html\n([\s\S]*?)```/)
	if (!exampleMatch) return null
	return exampleMatch[1].trim()
}

// Removes the leading "# Title" line so a page can render its own hero title
// once, then hand the remaining body to <z-markdown> without repeating it.
export const stripLeadingTitleHeading = (rawMarkdown: string): string => {
	return rawMarkdown.replace(/^#\s+.+\n+/, '')
}

type ParsedDocPathT = {
	categorySlug: string
	slug: string
}

const parseDocPath = (path: string): ParsedDocPathT | null => {
	const docsMarker = '/docs/'
	const docsIndex = path.lastIndexOf(docsMarker)
	if (docsIndex === -1) return null

	const pathAfterDocs = path.slice(docsIndex + docsMarker.length)
	const segments = pathAfterDocs.split('/')
	const fileName = segments[segments.length - 1]
	const slug = fileName.replace(/\.md$/, '')
	const isStandalone = segments.length === 1

	if (isStandalone) return { categorySlug: '', slug }
	return { categorySlug: segments[0], slug }
}

export const buildDocSiteData = (rawDocsByPath: Record<string, string>): DocSiteDataT => {
	const categoriesBySlug = new Map<string, DocCategoryT>()
	const standalonePages: DocPageT[] = []
	const pagesByRoute = new Map<string, DocPageT>()
	let homeMarkdown = ''

	for (const path of Object.keys(rawDocsByPath)) {
		const rawMarkdown = rawDocsByPath[path]
		const parsedPath = parseDocPath(path)
		if (!parsedPath) continue

		const isHomePage = parsedPath.categorySlug === '' && parsedPath.slug === 'README'
		if (isHomePage) {
			homeMarkdown = rawMarkdown
			continue
		}

		const isStandalone = parsedPath.categorySlug === ''
		const categoryLabel = isStandalone ? '' : getCategoryLabel(parsedPath.categorySlug)
		const title = getDocTitle(rawMarkdown, parsedPath.slug)
		// Standalone/meta pages (e.g. "questionable API choices") aren't live
		// component demos, so they never get a live-preview panel.
		const primaryExampleHtml = isStandalone ? null : getPrimaryExampleHtml(rawMarkdown)
		const route = isStandalone ? `/p/${parsedPath.slug}` : `/c/${parsedPath.categorySlug}/${parsedPath.slug}`

		const page: DocPageT = {
			slug: parsedPath.slug,
			title,
			categorySlug: parsedPath.categorySlug,
			categoryLabel,
			rawMarkdown,
			primaryExampleHtml,
			route
		}

		pagesByRoute.set(route, page)

		if (isStandalone) {
			standalonePages.push(page)
			continue
		}

		const existingCategory = categoriesBySlug.get(parsedPath.categorySlug)
		if (existingCategory) {
			existingCategory.pages.push(page)
			continue
		}

		categoriesBySlug.set(parsedPath.categorySlug, {
			slug: parsedPath.categorySlug,
			label: categoryLabel,
			pages: [page]
		})
	}

	for (const category of categoriesBySlug.values()) {
		category.pages.sort((pageA, pageB) => pageA.slug.localeCompare(pageB.slug))
	}

	standalonePages.sort((pageA, pageB) => pageA.slug.localeCompare(pageB.slug))

	const orderedCategories = [...categoriesBySlug.values()].sort((categoryA, categoryB) => {
		const indexA = CATEGORY_ORDER.indexOf(categoryA.slug)
		const indexB = CATEGORY_ORDER.indexOf(categoryB.slug)
		const rankA = indexA === -1 ? CATEGORY_ORDER.length : indexA
		const rankB = indexB === -1 ? CATEGORY_ORDER.length : indexB
		if (rankA !== rankB) return rankA - rankB
		return categoryA.slug.localeCompare(categoryB.slug)
	})

	return { homeMarkdown, categories: orderedCategories, standalonePages, pagesByRoute }
}

export const getAllPages = (siteData: DocSiteDataT): DocPageT[] => {
	const categoryPages = siteData.categories.flatMap((category) => category.pages)
	return [...categoryPages, ...siteData.standalonePages]
}

// Handles clicks on links rendered *inside* doc markdown (e.g. "Notes" cross-
// references like `[z-button-group](z-button-group.md)`). Those hrefs are
// plain relative markdown paths, not site routes, so they need resolving
// against the current page's folder before they can be turned into a route.
// Returns null for anything that isn't an internal doc link (external URLs,
// mailto, in-page "#" anchors, or links that escape the docs/ folder).
// --- Playground controls ------------------------------------------------
// Every component doc has an "## Attributes" (or "## Properties &
// attributes") markdown table. Parsing it generically lets every page grow
// a controls toolbar for free, instead of hand-authoring 140 control sets.

export type AttributeControlKindT = 'boolean' | 'enum' | 'number' | 'text'

export type AttributeControlT = {
	name: string
	kind: AttributeControlKindT
	options: string[]
	defaultValue: string | null
	description: string
}

export type ComponentPlaygroundDataT = {
	controls: AttributeControlT[]
	jsOnlyPropertyNames: string[]
	pairedScript: string | null
}

const splitTableRow = (line: string): string[] => {
	const trimmedLine = line.trim()
	const withoutEdgePipes = trimmedLine.replace(/^\|/, '').replace(/\|$/, '')
	return withoutEdgePipes.split('|').map((cell) => cell.trim())
}

const isTableSeparatorRow = (cells: string[]): boolean => {
	return cells.every((cell) => /^:?-+:?$/.test(cell))
}

// Collects every `| ... |` line following the first "## Attributes" (or
// "## Properties & attributes") heading, stopping at the next heading.
const findAttributesTableLines = (rawMarkdown: string): string[] => {
	const lines = rawMarkdown.split('\n')
	const headingIndex = lines.findIndex((line) => /^##\s+(attributes|properties\s*&\s*attributes|properties)\s*$/i.test(line.trim()))
	if (headingIndex === -1) return []

	const tableLines: string[] = []
	for (const line of lines.slice(headingIndex + 1)) {
		const isNextHeading = /^##\s/.test(line)
		if (isNextHeading) break

		const isTableLine = line.trim().startsWith('|')
		if (isTableLine) tableLines.push(line)
	}

	return tableLines
}

type AttributeRowT = {
	name: string
	valuesCell: string
	defaultCell: string
	descriptionCell: string
}

const parseAttributeRows = (tableLines: string[]): AttributeRowT[] => {
	const rows: AttributeRowT[] = []

	for (const line of tableLines) {
		const cells = splitTableRow(line)
		if (cells.length < 4) continue
		if (isTableSeparatorRow(cells)) continue

		const isHeaderRow = /^(attribute|name)$/i.test(cells[0])
		if (isHeaderRow) continue

		const name = cells[0].replace(/`/g, '').trim()
		if (!name) continue

		rows.push({ name, valuesCell: cells[1] ?? '', defaultCell: cells[2] ?? '', descriptionCell: cells[3] ?? '' })
	}

	return rows
}

const getBacktickTokens = (cell: string): string[] => {
	const matches = [...cell.matchAll(/`([^`]+)`/g)]
	return matches.map((match) => match[1])
}

// True only when the cell is *nothing but* backtick-wrapped tokens (e.g.
// "`sm` `md` `lg`") — excludes prose like "derived from `name`".
const isPureEnumCell = (cell: string): boolean => {
	const withoutTokens = cell.replace(/`[^`]+`/g, '').trim()
	return withoutTokens.length === 0 && getBacktickTokens(cell).length > 0
}

const getControlKind = (valuesCell: string): AttributeControlKindT => {
	const normalizedValuesCell = valuesCell.trim().toLowerCase()
	if (normalizedValuesCell === 'boolean') return 'boolean'
	if (normalizedValuesCell === 'number') return 'number'
	if (isPureEnumCell(valuesCell)) return 'enum'
	return 'text'
}

const getDefaultValue = (defaultCell: string): string | null => {
	const trimmedCell = defaultCell.trim()
	const isEmptyDefault = trimmedCell === '' || trimmedCell === '—' || trimmedCell === '-'
	if (isEmptyDefault) return null

	const backtickTokens = getBacktickTokens(trimmedCell)
	if (backtickTokens.length > 0) return backtickTokens[0]

	const looksLikeBareToken = /^[\w.%-]+$/.test(trimmedCell)
	if (looksLikeBareToken) return trimmedCell

	return null
}

// The paired ```js block immediately following the primary ```html example —
// the same one that, e.g., sets z-select's `.options` property. Only matches
// when the two fences are adjacent (whitespace only between them), which
// holds across the whole docs/ tree.
const getPairedScript = (rawMarkdown: string): string | null => {
	const pairedMatch = rawMarkdown.match(/```html\n[\s\S]*?```\s*```js\n([\s\S]*?)```/)
	if (!pairedMatch) return null
	return pairedMatch[1].trim()
}

export const getComponentPlaygroundData = (rawMarkdown: string): ComponentPlaygroundDataT => {
	const tableLines = findAttributesTableLines(rawMarkdown)
	const rows = parseAttributeRows(tableLines)

	const controls: AttributeControlT[] = []
	const jsOnlyPropertyNames: string[] = []

	for (const row of rows) {
		const isPropertyOnly = /\*\*property\*\*/i.test(row.descriptionCell)
		if (isPropertyOnly) {
			jsOnlyPropertyNames.push(row.name)
			continue
		}

		// Every component has this; toggling it would just blank the whole
		// playground, which isn't an interesting thing to demo.
		const isVisibilityToggle = row.name === 'is-hidden'
		if (isVisibilityToggle) continue

		const kind = getControlKind(row.valuesCell)
		const options = kind === 'enum' ? getBacktickTokens(row.valuesCell) : []
		const defaultValue = getDefaultValue(row.defaultCell)

		controls.push({ name: row.name, kind, options, defaultValue, description: row.descriptionCell })
	}

	return { controls, jsOnlyPropertyNames, pairedScript: getPairedScript(rawMarkdown) }
}

export const resolveDocLinkToRoute = (currentPage: DocPageT | null, href: string): string | null => {
	const isExternal = /^([a-z][a-z0-9+.-]*:)?\/\//i.test(href) || href.startsWith('mailto:')
	if (isExternal) return null

	const isHashOnly = href.startsWith('#')
	if (isHashOnly) return null

	const isMarkdownLink = /\.md(#.*)?$/i.test(href)
	if (!isMarkdownLink) return null

	const hrefWithoutFragment = href.split('#')[0]
	const hrefSegments = hrefWithoutFragment.split('/').filter((segment) => segment !== '.' && segment !== '')
	const currentDirSegments = currentPage && currentPage.categorySlug ? [currentPage.categorySlug] : []

	const leadingUpSegmentCount = hrefSegments.filter((segment) => segment === '..').length
	const escapesDocsRoot = leadingUpSegmentCount > currentDirSegments.length
	if (escapesDocsRoot) return null

	const resolvedSegments = [...currentDirSegments]
	for (const segment of hrefSegments) {
		if (segment === '..') {
			resolvedSegments.pop()
			continue
		}
		resolvedSegments.push(segment)
	}

	const fileName = resolvedSegments[resolvedSegments.length - 1] ?? ''
	const slug = fileName.replace(/\.md$/i, '')
	const isHomeLink = slug === 'README'
	if (isHomeLink) return '/'

	const isStandaloneLink = resolvedSegments.length === 1
	if (isStandaloneLink) return `/p/${slug}`

	const categorySlug = resolvedSegments[resolvedSegments.length - 2]
	return `/c/${categorySlug}/${slug}`
}
