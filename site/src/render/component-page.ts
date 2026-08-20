// Assembles a full component reference page out of zest elements.
//
// Section order is deliberate and identical on every page: what it is, how it
// behaves when you poke it, when to reach for it, what it is made of, what it
// can do, its API, its accessibility contract, and where to go next.

import { buildApiReference } from './api-reference'
import { buildExampleCard } from './example-card'
import { buildPlayground } from './playground'
import {
	buildCodeBlock,
	buildLabel,
	buildRichText,
	buildSectionHeader,
	buildText,
	createElement
} from './zest-elements'
import type { ZBreadcrumbItemT, ZBreadcrumbsElementT } from './zest-elements'
import type { AnatomyPartT, ComponentDocT, RelatedComponentT } from '../component-docs/types'

type PageSectionT = {
	id: string
	label: string
	element: HTMLElement
}

const SOURCE_BASE = 'https://github.com/tasteee/zest/blob/main/src/components'
const isWiredLayout = (tag: string): boolean => tag.startsWith('wired-')

const buildBreadcrumbs = (categoryLabel: string, title: string): ZBreadcrumbsElementT => {
	const items: ZBreadcrumbItemT[] = [
		{ label: 'Components', href: '#/' },
		{ label: categoryLabel },
		{ label: title, isCurrent: true }
	]

	const breadcrumbs = document.createElement('z-breadcrumbs') as ZBreadcrumbsElementT
	breadcrumbs.items = items
	return breadcrumbs
}

const buildPageHeader = (componentDoc: ComponentDocT, categoryLabel: string): HTMLElement => {
	const header = document.createElement('z-doc-header')
	header.setAttribute('eyebrow', categoryLabel)
	header.setAttribute('heading', componentDoc.title)
	header.setAttribute('tagline', componentDoc.tagline)
	header.setAttribute('status', componentDoc.status)
	if (!isWiredLayout(componentDoc.tag)) {
		header.setAttribute('source-href', `${SOURCE_BASE}/${componentDoc.tag}.tsx`)
	}
	return header
}

const buildIntroSection = (componentDoc: ComponentDocT): HTMLElement => {
	const section = createElement('section', 'pageSection')
	section.append(buildRichText(componentDoc.description, 'md', 'neutral'))

	const elementImport = isWiredLayout(componentDoc.tag)
		? "import '@tasteee/zest'"
		: `import '@tasteee/zest/${componentDoc.tag}'`
	const importSnippet = `${elementImport}\nimport '@tasteee/zest/ink.css'`
	section.append(
		buildCodeBlock({ code: importSnippet, language: 'js', filename: `Registers ${componentDoc.tag}`, hasCopyButton: true })
	)

	return section
}

const buildUsageSection = (componentDoc: ComponentDocT): HTMLElement | null => {
	const hasGuidance = componentDoc.usageGuidance.length > 0
	if (!hasGuidance) return null

	const section = createElement('section', 'pageSection')
	section.append(buildSectionHeader('When to use it', ''))

	const list = createElement('ul', 'guidanceList')
	for (const guidance of componentDoc.usageGuidance) {
		const item = createElement('li', 'guidanceItem')
		item.append(buildRichText(guidance, 'sm', 'neutral'))
		list.append(item)
	}

	section.append(list)
	return section
}

const buildAnatomyRow = (part: AnatomyPartT): HTMLElement => {
	const row = createElement('div', 'anatomyRow')

	const name = buildLabel(part.name)
	name.classList.add('anatomyName')

	row.append(name, buildRichText(part.description, 'sm', 'muted'))
	return row
}

const buildAnatomySection = (componentDoc: ComponentDocT): HTMLElement | null => {
	const hasAnatomy = componentDoc.anatomy.length > 0
	if (!hasAnatomy) return null

	const section = createElement('section', 'pageSection')
	section.append(buildSectionHeader('Anatomy', 'The named parts you compose, target, or fill.'))

	const list = createElement('div', 'anatomyList')
	for (const part of componentDoc.anatomy) {
		list.append(buildAnatomyRow(part))
	}

	section.append(list)
	return section
}

const buildExamplesSection = (componentDoc: ComponentDocT): HTMLElement | null => {
	const hasExamples = componentDoc.examples.length > 0
	if (!hasExamples) return null

	const section = createElement('section', 'pageSection')
	section.append(buildSectionHeader('Examples', 'Every variation, running live. Open the code on any of them.'))

	const list = createElement('div', 'exampleList')
	for (const example of componentDoc.examples) {
		list.append(buildExampleCard(example))
	}

	section.append(list)
	return section
}

const buildApiSection = (componentDoc: ComponentDocT): HTMLElement | null => {
	const apiReference = buildApiReference(componentDoc)
	if (!apiReference) return null

	const section = createElement('section', 'pageSection')
	section.append(buildSectionHeader('API reference', 'Attributes are the HTML surface; properties take rich values from JS.'))
	section.append(apiReference)
	return section
}

const buildAccessibilitySection = (componentDoc: ComponentDocT): HTMLElement | null => {
	const hasNotes = componentDoc.accessibilityNotes.length > 0
	if (!hasNotes) return null

	const section = createElement('section', 'pageSection')
	section.append(buildSectionHeader('Accessibility', 'What the component handles for you, and what it expects from you.'))

	const list = createElement('ul', 'guidanceList')
	for (const note of componentDoc.accessibilityNotes) {
		const item = createElement('li', 'guidanceItem')
		item.append(buildText(note, 'sm', 'neutral'))
		list.append(item)
	}

	section.append(list)
	return section
}

const buildRelatedCard = (related: RelatedComponentT): HTMLElement => {
	const card = createElement('a', 'relatedCard') as HTMLAnchorElement
	card.href = `#${related.route}`

	const name = buildLabel(related.tag)
	name.classList.add('relatedName')

	card.append(name, buildText(related.description, 'xs', 'muted'))
	return card
}

const buildRelatedSection = (componentDoc: ComponentDocT): HTMLElement | null => {
	const hasRelated = componentDoc.related.length > 0
	if (!hasRelated) return null

	const section = createElement('section', 'pageSection')
	section.append(buildSectionHeader('Related', ''))

	const grid = createElement('div', 'relatedGrid')
	for (const related of componentDoc.related) {
		grid.append(buildRelatedCard(related))
	}

	section.append(grid)
	return section
}

const buildPlaygroundSection = (componentDoc: ComponentDocT): HTMLElement | null => {
	const playground = buildPlayground(componentDoc)
	if (!playground) return null

	const section = createElement('section', 'pageSection')
	section.append(buildSectionHeader('Playground', 'Change any attribute and read the markup it produces.'))
	section.append(playground)
	return section
}

const wrapSection = (id: string, label: string, element: HTMLElement | null): PageSectionT | null => {
	if (!element) return null
	return { id, label, element }
}

// Collects the sections that actually rendered, so the page outline never
// links to a heading that isn't there.
const collectSections = (componentDoc: ComponentDocT): PageSectionT[] => {
	const candidates: (PageSectionT | null)[] = [
		{ id: 'overview', label: 'Overview', element: buildIntroSection(componentDoc) },
		wrapSection('playground', 'Playground', buildPlaygroundSection(componentDoc)),
		wrapSection('usage', 'When to use it', buildUsageSection(componentDoc)),
		wrapSection('anatomy', 'Anatomy', buildAnatomySection(componentDoc)),
		wrapSection('examples', 'Examples', buildExamplesSection(componentDoc)),
		wrapSection('api', 'API reference', buildApiSection(componentDoc)),
		wrapSection('accessibility', 'Accessibility', buildAccessibilitySection(componentDoc)),
		wrapSection('related', 'Related', buildRelatedSection(componentDoc))
	]

	const presentSections: PageSectionT[] = []
	for (const candidate of candidates) {
		if (!candidate) continue
		candidate.element.id = candidate.id
		presentSections.push(candidate)
	}

	return presentSections
}

// The sections are known here, so the outline is authored rather than
// scraped — z-toc's `for` mode exists for markdown it did not write, which is
// not this case. Scroll-spy, the active state, and the hash-route-safe click
// all come from the element.
const buildPageOutline = (sections: PageSectionT[]): HTMLElement => {
	const outline = document.createElement('z-toc') as HTMLElement & { headings: unknown }

	const headings = []
	for (const section of sections) {
		headings.push({ id: section.id, label: section.label, level: 2 })
	}

	outline.headings = headings
	return outline
}

// The article and its outline are returned separately because they land in
// different slots of z-docs-shell — the shell owns the two-column measure and
// the sticky offset, so the page only has to say what goes in each column.
export type ComponentPageT = {
	article: HTMLElement
	outline: HTMLElement
}

export const buildComponentPage = (componentDoc: ComponentDocT, categoryLabel: string): ComponentPageT => {
	const article = createElement('article', 'componentArticle')
	article.append(buildBreadcrumbs(categoryLabel, componentDoc.title))
	article.append(buildPageHeader(componentDoc, categoryLabel))

	const sections = collectSections(componentDoc)
	for (const section of sections) {
		article.append(section.element)
	}

	return { article, outline: buildPageOutline(sections) }
}
