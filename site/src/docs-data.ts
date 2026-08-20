// Parses the raw markdown docs (imported via import.meta.glob in main.ts)
// into a navigable site model: categories, pages, and route strings.
// Kept free of DOM APIs so it can be reasoned about and tested in isolation.

import customElementsManifest from '../../custom-elements.json'

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
	'text-editor',
	'attachments',
	'canvas-panels',
	'effects',
	'music',
	'specialized'
]

const PUBLIC_ELEMENT_TAGS = new Set(
	customElementsManifest.modules.flatMap((module) =>
		module.declarations.filter((declaration) => declaration.customElement).map((declaration) => declaration.tagName)
	)
)

// Concept pages describe a family rather than a same-named custom element.
const PUBLIC_CONCEPT_PAGES = new Set(['z-drag-drop'])

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

// Roughly half the files under docs/ are saved with CRLF line endings, and
// `?raw` hands them over byte for byte. Every fence and heading pattern in
// this module anchors on a bare \n, so a CRLF file silently matched nothing
// — its playground never rendered at all. Normalizing once here keeps that
// concern out of every individual regex.
const normalizeLineEndings = (rawMarkdown: string): string => {
	return rawMarkdown.replace(/\r\n/g, '\n')
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
		const rawMarkdown = normalizeLineEndings(rawDocsByPath[path])
		const parsedPath = parseDocPath(path)
		if (!parsedPath) continue

		const isHomePage = parsedPath.categorySlug === '' && parsedPath.slug === 'README'
		if (isHomePage) {
			homeMarkdown = rawMarkdown
			continue
		}

		const isComponentPage = parsedPath.categorySlug !== '' && parsedPath.slug.startsWith('z-')
		const isPublicComponentPage = PUBLIC_ELEMENT_TAGS.has(parsedPath.slug) || PUBLIC_CONCEPT_PAGES.has(parsedPath.slug)
		if (isComponentPage && !isPublicComponentPage) continue

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

// A page that documents more than one element heads each table with the tag
// rather than the word "Attributes" — z-drag-drop.md has "## z-draggable" and
// "## z-drop-target". Six pages did that and silently got no playground knobs
// at all, because the heading did not match.
//
// The first such table is the page's primary element, which is the one the
// playground drives.
// The optional leading number is for pages that number their sections —
// z-pattern-roll.md heads its table "## 4. Properties & attributes".
const ATTRIBUTE_HEADING = /^##\s+(?:\d+\.\s*)?(attributes|properties\s*&\s*attributes|properties|`?z-[a-z-]+`?)\s*$/i

// Collects every `| ... |` line following the first attribute-table heading,
// stopping at the next heading.
const findAttributesTableLines = (rawMarkdown: string): string[] => {
	const lines = rawMarkdown.split('\n')
	const headingIndex = lines.findIndex((line) => ATTRIBUTE_HEADING.test(line.trim()))
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

// The design-system scales, mirrored from src/shared/layout-schema.ts. Docs
// name these families in prose ("size token / length") rather than spelling
// the members out, so the control has to know them to offer a real select
// instead of dropping the reader into a free-text box.
const TOKEN_FAMILY_OPTIONS: Record<string, string[]> = {
	size: ['0', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
	width: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'screen'],
	radius: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full']
}

// Matches "size token / length", "radius token", "width token / length".
const getTokenFamilyOptions = (cell: string): string[] => {
	const familyMatch = cell.trim().toLowerCase().match(/^(size|width|radius)\s+token\b/)
	if (!familyMatch) return []
	return TOKEN_FAMILY_OPTIONS[familyMatch[1]]
}

// True when the cell is backtick-wrapped tokens and nothing else of
// substance. A trailing parenthetical is allowed, because several tables
// annotate their enums — "`top` `bottom` `left` `right` (+ `-start`/`-end`)"
// is still a four-option enum. Prose *before* the tokens is not: "derived
// from `name`" names one field, it doesn't enumerate values.
const getEnumOptions = (cell: string): string[] => {
	const tokens = getBacktickTokens(cell)
	const hasTokens = tokens.length > 0
	if (!hasTokens) return []

	const leadingProse = cell.split('`')[0].trim()
	const hasLeadingProse = leadingProse.length > 0
	if (hasLeadingProse) return []

	const withoutTokens = cell.replace(/`[^`]+`/g, '').trim()
	const isBareTokenList = withoutTokens.length === 0
	if (isBareTokenList) return tokens

	const isAnnotatedTokenList = /^\([^)]*\)$/.test(withoutTokens)
	if (isAnnotatedTokenList) return tokens

	return []
}

// Numeric cells carry their unit in prose — "number (px)", "number (ms)",
// "number (0–100)" — so an exact match on "number" missed almost all of
// them and handed a stepper's worth of attributes to a text box.
const isNumericCell = (cell: string): boolean => {
	return /^number\b/i.test(cell.trim())
}

const getControlOptions = (valuesCell: string): string[] => {
	const enumOptions = getEnumOptions(valuesCell)
	if (enumOptions.length > 0) return enumOptions

	return getTokenFamilyOptions(valuesCell)
}

const getControlKind = (valuesCell: string): AttributeControlKindT => {
	const normalizedValuesCell = valuesCell.trim().toLowerCase()
	if (normalizedValuesCell === 'boolean') return 'boolean'
	if (isNumericCell(valuesCell)) return 'number'

	const hasOptions = getControlOptions(valuesCell).length > 0
	if (hasOptions) return 'enum'

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
		const options = kind === 'enum' ? getControlOptions(row.valuesCell) : []
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
