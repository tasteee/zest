// Parses the raw markdown docs (imported via import.meta.glob in main.ts)
// into a navigable site model: categories, pages, and route strings.
// Kept free of DOM APIs so it can be reasoned about and tested in isolation.

import customElementsManifest from '../../custom-elements.json'

export type DocPageT = {
	slug: string
	title: string
	categorySlug: string
	categoryLabel: string
	subcategorySlug: string
	subcategoryLabel: string
	rawMarkdown: string
	primaryExampleHtml: string | null
	route: string
}

// A named run of pages inside a category — the text family gathered under
// Typography inside Foundation. It is a nesting of the nav only: a page's
// route is still /elements/<category>/<slug>, so grouping pages after the fact costs
// nobody a redirect and no cross-reference has to change.
export type DocSubcategoryT = {
	slug: string
	label: string
	pages: DocPageT[]
}

export type DocCategoryT = {
	slug: string
	label: string
	pages: DocPageT[]
	subcategories: DocSubcategoryT[]
}

export type DocSiteDataT = {
	homeMarkdown: string
	categories: DocCategoryT[]
	standalonePages: DocPageT[]
	pagesByRoute: Map<string, DocPageT>
}

const CATEGORY_LABELS: Record<string, string> = {
	fundamentals: 'Fundamentals',
	'start-here': 'Start here',
	typography: 'Typography',
	structure: 'Structure',
	actionables: 'Actionables',
	overlays: 'Overlays',
	navigation: 'Navigation',
	'data-display': 'Data Display',
	interactive: 'Interactive',
	'text-editor': 'Text Editor',
	attachments: 'Attachments',
	'canvas-panels': 'Canvas & Panels',
	effects: 'Effects',
	music: 'Music',
	specialized: 'Specialized'
}

const CATEGORY_ORDER = [
	'fundamentals',
	'typography',
	'structure',
	'actionables',
	'overlays',
	'navigation',
	'data-display',
	'interactive',
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

// The fundamentals read in the order the token layers stack, not
// alphabetically: colour before the surfaces built from it, spacing before
// the control sizes that consume it. Anything not listed here sorts after the
// listed pages, by slug, so a new page still appears without being lost.
const FUNDAMENTALS_CATEGORY = 'fundamentals'
const FUNDAMENTALS_ORDER = [
	'principles',
	'token-architecture',
	'color',
	'surfaces',
	'borders',
	'typography',
	'spacing',
	'radius',
	'motion',
	'layout',
	'iconography'
]

const compareFundamentalsPages = (pageA: DocPageT, pageB: DocPageT): number => {
	const indexA = FUNDAMENTALS_ORDER.indexOf(pageA.slug)
	const indexB = FUNDAMENTALS_ORDER.indexOf(pageB.slug)
	const rankA = indexA === -1 ? FUNDAMENTALS_ORDER.length : indexA
	const rankB = indexB === -1 ? FUNDAMENTALS_ORDER.length : indexB
	if (rankA !== rankB) return rankA - rankB
	return pageA.slug.localeCompare(pageB.slug)
}

export const isFundamentalsPage = (page: DocPageT): boolean => {
	return page.categorySlug === FUNDAMENTALS_CATEGORY
}

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
	subcategorySlug: string
	slug: string
}

// docs/<category>/<slug>.md, or docs/<category>/<subcategory>/<slug>.md for a
// grouped run. The category is always the first segment either way, which is
// what keeps the route stable when a page is moved into a group.
const parseDocPath = (path: string): ParsedDocPathT | null => {
	const docsMarker = '/docs/'
	const docsIndex = path.lastIndexOf(docsMarker)
	if (docsIndex === -1) return null

	const pathAfterDocs = path.slice(docsIndex + docsMarker.length)
	const segments = pathAfterDocs.split('/')
	const fileName = segments[segments.length - 1]
	const slug = fileName.replace(/\.md$/, '')
	const isStandalone = segments.length === 1

	if (isStandalone) return { categorySlug: '', subcategorySlug: '', slug }

	const isGrouped = segments.length > 2
	return { categorySlug: segments[0], subcategorySlug: isGrouped ? segments[1] : '', slug }
}

const getOrCreateCategory = (
	categoriesBySlug: Map<string, DocCategoryT>,
	slug: string,
	label: string
): DocCategoryT => {
	const existing = categoriesBySlug.get(slug)
	if (existing) return existing

	const created: DocCategoryT = { slug, label, pages: [], subcategories: [] }
	categoriesBySlug.set(slug, created)
	return created
}

const getOrCreateSubcategory = (category: DocCategoryT, slug: string, label: string): DocSubcategoryT => {
	const existing = category.subcategories.find((subcategory) => subcategory.slug === slug)
	if (existing) return existing

	const created: DocSubcategoryT = { slug, label, pages: [] }
	category.subcategories.push(created)
	return created
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
		// component demos, so they never get a live-preview panel. Fundamentals
		// pages carry their live example inline, in the "In use" section where
		// the token flow it demonstrates is explained, rather than as a
		// playground hoisted above the prose.
		const isFundamentals = parsedPath.categorySlug === FUNDAMENTALS_CATEGORY
		const primaryExampleHtml = isStandalone || isFundamentals ? null : getPrimaryExampleHtml(rawMarkdown)
		const route = isStandalone ? `/p/${parsedPath.slug}` : `/elements/${parsedPath.categorySlug}/${parsedPath.slug}`

		const subcategoryLabel = parsedPath.subcategorySlug ? getCategoryLabel(parsedPath.subcategorySlug) : ''

		const page: DocPageT = {
			slug: parsedPath.slug,
			title,
			categorySlug: parsedPath.categorySlug,
			categoryLabel,
			subcategorySlug: parsedPath.subcategorySlug,
			subcategoryLabel,
			rawMarkdown,
			primaryExampleHtml,
			route
		}

		pagesByRoute.set(route, page)

		if (isStandalone) {
			standalonePages.push(page)
			continue
		}

		const category = getOrCreateCategory(categoriesBySlug, parsedPath.categorySlug, categoryLabel)
		const isGrouped = parsedPath.subcategorySlug !== ''
		if (!isGrouped) {
			category.pages.push(page)
			continue
		}

		const subcategory = getOrCreateSubcategory(category, parsedPath.subcategorySlug, subcategoryLabel)
		subcategory.pages.push(page)
	}

	for (const category of categoriesBySlug.values()) {
		const isFundamentals = category.slug === FUNDAMENTALS_CATEGORY
		const comparePages = isFundamentals
			? compareFundamentalsPages
			: (pageA: DocPageT, pageB: DocPageT) => pageA.slug.localeCompare(pageB.slug)

		category.pages.sort(comparePages)
		category.subcategories.sort((groupA, groupB) => groupA.slug.localeCompare(groupB.slug))
		for (const subcategory of category.subcategories) {
			subcategory.pages.sort(comparePages)
		}
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

// Order matters here: this is what drives search, prev/next, and the page
// ordering readers walk through, so it has to match the nav — each category's
// grouped runs first, then its loose pages, exactly as the tree renders them.
export const getAllPages = (siteData: DocSiteDataT): DocPageT[] => {
	const categoryPages = siteData.categories.flatMap((category) => [
		...category.subcategories.flatMap((subcategory) => subcategory.pages),
		...category.pages
	])
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

		// A row can document several attributes, e.g. `min` / `max`.
		const names = name.split(/\s*\/\s*/).filter((candidate) => /^[a-z][a-z0-9-]*$/.test(candidate))
		for (const attributeName of names) rows.push({ name: attributeName, valuesCell: cells[1] ?? '', defaultCell: cells[2] ?? '', descriptionCell: cells[3] ?? '' })
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

	// A backtick token only counts as a literal default when it's the whole
	// cell (or a bare list of tokens) — "derived from `name`" names another
	// attribute in prose, it isn't literally defaulting to the string "name".
	const backtickTokens = getBacktickTokens(trimmedCell)
	const hasLeadingProse = trimmedCell.split('`')[0].trim().length > 0
	if (backtickTokens.length > 0 && !hasLeadingProse) return backtickTokens[0]

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
	// The page's folder as it is on disk, group included, so `../color.md`
	// written from docs/fundamentals/start-here/ lands where the author meant.
	const currentDirSegments = currentPage && currentPage.categorySlug ? [currentPage.categorySlug] : []
	if (currentPage && currentPage.subcategorySlug) currentDirSegments.push(currentPage.subcategorySlug)

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

	// First segment, not second-to-last: a link into a grouped page reads
	// ../actionables/buttons/z-swap.md on disk, but its route has only ever
	// been /elements/actionables/z-swap.
	const categorySlug = resolvedSegments[0]
	return `/elements/${categorySlug}/${slug}`
}
