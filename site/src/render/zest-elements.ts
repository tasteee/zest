// Typed factories for the zest elements the docs site is built out of.
//
// zest doesn't augment HTMLElementTagNameMap, so each element that carries JS
// properties gets a narrow local type describing just the surface this site
// touches. Everything the docs render — headings, tables, code, callouts — is
// a real z-* element, so the documentation is itself a use of the system.

export type ZTabT = {
	value: string
	label: string
	isDisabled?: boolean
}

export type ZTabsElementT = HTMLElement & {
	tabs: ZTabT[]
	value: string
}

export type ZTableColumnT = {
	key: string
	label: string
	align?: 'center' | 'end'
	isMono?: boolean
}

export type ZTableRowT = Record<string, string>

export type ZTableElementT = HTMLElement & {
	columns: ZTableColumnT[]
	rows: ZTableRowT[]
	emptyLabel: string
}

export type ZCodeBlockElementT = HTMLElement & {
	code: string
}

export type ZBreadcrumbItemT = {
	label: string
	href?: string
	isCurrent?: boolean
}

export type ZBreadcrumbsElementT = HTMLElement & {
	items: ZBreadcrumbItemT[]
}

export type ZMarkdownElementT = HTMLElement & {
	content: string
}

export type AttributeMapT = Record<string, string>

export const createElement = (tagName: string, className?: string): HTMLElement => {
	const element = document.createElement(tagName)
	if (className) element.className = className
	return element
}

export const applyAttributes = (element: HTMLElement, attributes: AttributeMapT): void => {
	for (const attributeName of Object.keys(attributes)) {
		element.setAttribute(attributeName, attributes[attributeName])
	}
}

// --- typography ---------------------------------------------------------

export const buildEyebrow = (label: string): HTMLElement => {
	const eyebrow = createElement('z-eyebrow')
	eyebrow.setAttribute('label', label)
	return eyebrow
}

export const buildHeading = (text: string, size: string, tag: string): HTMLElement => {
	const heading = createElement('z-heading')
	applyAttributes(heading, { size, tag })
	heading.textContent = text
	return heading
}

export const buildText = (text: string, size: string, color: string): HTMLElement => {
	const paragraph = createElement('z-text')
	applyAttributes(paragraph, { size, color })
	paragraph.textContent = text
	return paragraph
}

// Doc prose is authored with backtick-delimited inline code, the way it would
// be written in markdown. Splitting on the delimiter keeps authoring natural
// without dragging a markdown parser into the render path.
const appendRichSegments = (target: HTMLElement, text: string): void => {
	const segments = text.split('`')

	for (const [segmentIndex, segment] of segments.entries()) {
		const isCodeSegment = segmentIndex % 2 === 1

		if (!isCodeSegment) {
			target.append(document.createTextNode(segment))
			continue
		}

		const code = createElement('code', 'inlineCode')
		code.textContent = segment
		target.append(code)
	}
}

export const buildRichText = (text: string, size: string, color: string): HTMLElement => {
	const paragraph = createElement('z-text')
	applyAttributes(paragraph, { size, color })
	appendRichSegments(paragraph, text)
	return paragraph
}

export const buildLabel = (text: string, size: string, color: string): HTMLElement => {
	const label = createElement('z-label')
	applyAttributes(label, { size, color })
	label.textContent = text
	return label
}

// A section heading plus its optional supporting sentence, used to open each
// major block of a component page.
export const buildSectionHeader = (title: string, description: string): HTMLElement => {
	const header = createElement('div', 'sectionHeader')
	header.append(buildHeading(title, 'md', 'h2'))

	const hasDescription = description.length > 0
	if (hasDescription) header.append(buildText(description, 'sm', 'muted'))

	return header
}

// --- surfaces and structure ---------------------------------------------

// Padding is left to the caller (inset "0") because every docs surface splits
// itself into bordered bands that need to own their own spacing.
export const buildSurface = (level: string, className: string): HTMLElement => {
	const surface = createElement('z-surface', className)
	applyAttributes(surface, { level, radius: 'lg', inset: '0', border: '' })
	return surface
}

export const buildSeparator = (): HTMLElement => {
	return createElement('z-separator')
}

export const buildBadge = (label: string, tone: string, kind: string): HTMLElement => {
	const badge = createElement('z-badge')
	applyAttributes(badge, { label, tone, kind, size: 'small' })
	return badge
}

// --- code ---------------------------------------------------------------

type CodeBlockOptionsT = {
	code: string
	language: string
	filename: string
	hasCopyButton: boolean
}

export const buildCodeBlock = (options: CodeBlockOptionsT): ZCodeBlockElementT => {
	const codeBlock = createElement('z-code-block') as ZCodeBlockElementT
	codeBlock.setAttribute('language', options.language)

	const hasFilename = options.filename.length > 0
	if (hasFilename) codeBlock.setAttribute('filename', options.filename)
	if (!options.hasCopyButton) codeBlock.setAttribute('hide-copy', '')

	codeBlock.code = options.code
	return codeBlock
}

// --- tables -------------------------------------------------------------

export const buildTable = (columns: ZTableColumnT[], rows: ZTableRowT[], emptyLabel: string): ZTableElementT => {
	const table = createElement('z-table') as ZTableElementT
	table.columns = columns
	table.rows = rows
	table.emptyLabel = emptyLabel
	return table
}

// --- tabs ---------------------------------------------------------------

export const buildTabs = (tabs: ZTabT[]): ZTabsElementT => {
	const tabList = createElement('z-tabs') as ZTabsElementT
	tabList.tabs = tabs
	tabList.value = tabs[0].value
	return tabList
}

// z-tabs projects panels through named slots matching each tab's value.
export const buildTabPanel = (slotName: string, className: string): HTMLElement => {
	const panel = createElement('div', className)
	panel.setAttribute('slot', slotName)
	return panel
}

// --- callouts -----------------------------------------------------------

export const buildCallout = (accent: string, heading: string, body: string): HTMLElement => {
	const callout = createElement('z-callout')
	callout.setAttribute('accent', accent)

	const hasHeading = heading.length > 0
	if (hasHeading) callout.setAttribute('heading', heading)

	callout.textContent = body
	return callout
}

// --- links --------------------------------------------------------------

export const buildLink = (label: string, href: string): HTMLElement => {
	const link = createElement('z-link')
	applyAttributes(link, { href, label, size: 'small' })
	return link
}
