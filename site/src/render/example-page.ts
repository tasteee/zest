// One showcase example, laid out the way a component reference page is:
// breadcrumbs, header, then a fixed run of sections the outline lists.
//
// What the "Preview" section holds depends on the example's kind. An
// organism runs live inside the page — it is a region, and a region fits
// the measure. A page does not: it needs the whole viewport and none of the
// docs chrome, so its preview is a scaled, inert render that opens the real
// thing in its own tab.

import { getAllExamples } from '../examples/registry'
import { EXAMPLE_KIND_LABELS, EXAMPLE_VIEWPORT_WIDTHS, ExampleKind } from '../examples/types'
import type { ExampleEntryT, ExampleInstanceT, ExampleViewportT } from '../examples/types'
import { Icons } from '../component-docs/icons'
import { buildExampleThumbnail } from './example-thumbnail'
import type { RenderedRouteT } from './examples-gallery'
import {
	buildCodeBlock,
	buildRichText,
	buildSectionHeader,
	buildTabPanel,
	buildTabs,
	createElement
} from './zest-elements'
import type { ZBreadcrumbsElementT } from './zest-elements'

type ZToggleGroupItemElementT = HTMLElement & { isPressed: boolean; value: string }

type ZPrevNextElementT = HTMLElement & {
	previous: { label: string; route: string } | null
	next: { label: string; route: string } | null
}

type PageSectionT = {
	id: string
	label: string
	element: HTMLElement
	dispose?: () => void
}

export type ExamplePageOptionsT = {
	// Where an element's reference page lives, or null when it has none —
	// the chat family is documented only through its example for now.
	resolveElementRoute: (tag: string) => string | null
	// The chrome-free route a page-kind example opens in its own tab.
	getStandaloneHref: (example: ExampleEntryT) => string
}

const VIEWPORT_LABELS: Record<ExampleViewportT, string> = {
	desktop: 'Desktop',
	tablet: 'Tablet',
	phone: 'Phone'
}

const buildBreadcrumbs = (example: ExampleEntryT): ZBreadcrumbsElementT => {
	const breadcrumbs = document.createElement('z-breadcrumbs') as ZBreadcrumbsElementT
	breadcrumbs.items = [
		{ label: 'Examples', href: '#/examples' },
		{ label: EXAMPLE_KIND_LABELS[example.kind] },
		{ label: example.title, isCurrent: true }
	]
	return breadcrumbs
}

const buildHeader = (example: ExampleEntryT): HTMLElement => {
	const header = createElement('z-doc-header')
	header.setAttribute('eyebrow', `Examples · ${EXAMPLE_KIND_LABELS[example.kind]}`)
	header.setAttribute('heading', example.title)
	header.setAttribute('tagline', example.tagline)
	return header
}

const buildStageButton = (label: string, icon: string): HTMLElement => {
	const button = createElement('z-button')
	button.setAttribute('kind', 'ghost')
	button.setAttribute('size', 'sm')
	button.innerHTML = `${icon}<span>${label}</span>`
	return button
}

// --- overview ---------------------------------------------------------

const buildOverviewSection = (example: ExampleEntryT): HTMLElement => {
	const section = createElement('section', 'pageSection')
	section.append(buildRichText(example.description, 'md', 'neutral'))
	return section
}

// --- preview: organism ------------------------------------------------

const buildViewportToggle = (example: ExampleEntryT, onChange: (viewport: ExampleViewportT) => void): HTMLElement | null => {
	const hasChoice = example.viewports.length > 1
	if (!hasChoice) return null

	const group = createElement('z-toggle-button-group', 'exampleViewports')
	group.setAttribute('size', 'sm')
	group.setAttribute('aria-label', 'Preview width')

	const items = example.viewports.map((viewport, index) => {
		const item = createElement('z-toggle-button-group-item') as ZToggleGroupItemElementT
		item.value = viewport
		item.textContent = VIEWPORT_LABELS[viewport]
		if (index === 0) item.setAttribute('is-pressed', '')
		return item
	})

	group.append(...items)

	// A segmented control always has one segment down; re-pressing the active
	// one would clear the group, so that falls back to the first width.
	group.addEventListener('change', (event) => {
		const changeEvent = event as CustomEvent<{ value?: string }>
		const nextViewport = (changeEvent.detail.value as ExampleViewportT | undefined) ?? example.viewports[0]
		if (!changeEvent.detail.value) items[0].isPressed = true
		onChange(nextViewport)
	})

	return group
}

// An organism runs live in the page. Reset tears the instance down and
// builds a fresh one, so a reader who has sent six messages into a thread
// can get the authored state back without reloading.
const buildLivePreview = (example: ExampleEntryT, onJumpToSource: () => void): PageSectionT => {
	const section = createElement('section', 'pageSection')
	section.append(buildSectionHeader('Preview', 'Running in the page. Everything in it is real and wired.'))

	const viewport = createElement('div', 'exampleStageViewport')
	viewport.style.height = example.stageHeight
	viewport.style.width = EXAMPLE_VIEWPORT_WIDTHS[example.viewports[0]]

	const frame = createElement('div', 'exampleStageFrame')
	frame.append(viewport)

	let instance: ExampleInstanceT | null = null

	const mount = (): void => {
		instance?.dispose?.()
		instance = example.build()
		viewport.replaceChildren(instance.root)
	}

	const bar = createElement('div', 'exampleStageBar')

	const leading = createElement('div', 'exampleStageBarGroup')
	const viewportToggle = buildViewportToggle(example, (nextViewport) => {
		viewport.style.width = EXAMPLE_VIEWPORT_WIDTHS[nextViewport]
	})
	if (viewportToggle) leading.append(viewportToggle)

	const trailing = createElement('div', 'exampleStageBarGroup')
	const reset = buildStageButton('Reset', Icons.undo)
	reset.addEventListener('click', mount)
	const jumpToSource = buildStageButton('Source', Icons.terminal)
	jumpToSource.addEventListener('click', onJumpToSource)
	trailing.append(reset, jumpToSource)

	bar.append(leading, trailing)
	section.append(bar, frame)
	mount()

	return { id: 'preview', label: 'Preview', element: section, dispose: () => instance?.dispose?.() }
}

// --- preview: page ----------------------------------------------------

// A page needs the viewport, so the docs show a scaled, inert render and
// hand the real one to a new tab. The render is a link and so is the button:
// the picture is the obvious thing to click, the button is the labelled one.
const buildStandalonePreview = (example: ExampleEntryT, href: string, onJumpToSource: () => void): PageSectionT => {
	const section = createElement('section', 'pageSection')
	section.append(
		buildSectionHeader('Preview', 'A full page, so it runs in its own tab with no docs chrome around it.')
	)

	const thumbnail = buildExampleThumbnail(example)

	const link = createElement('a', 'exampleStandaloneLink') as HTMLAnchorElement
	link.href = href
	link.target = '_blank'
	link.rel = 'noopener'
	link.setAttribute('aria-label', `Open ${example.title} in a new tab`)

	const hint = createElement('span', 'exampleStandaloneHint')
	hint.innerHTML = `Open in a new tab ${Icons.external}`

	link.append(thumbnail.stage, hint)

	const frame = createElement('div', 'exampleStageFrame')
	frame.append(link)

	const bar = createElement('div', 'exampleStageBar')
	const leading = createElement('div', 'exampleStageBarGroup')
	const open = buildStageButton('Open in a new tab', Icons.external)
	open.addEventListener('click', () => window.open(href, '_blank', 'noopener'))
	leading.append(open)

	const trailing = createElement('div', 'exampleStageBarGroup')
	const jumpToSource = buildStageButton('Source', Icons.terminal)
	jumpToSource.addEventListener('click', onJumpToSource)
	trailing.append(jumpToSource)

	bar.append(leading, trailing)
	section.append(bar, frame)
	thumbnail.mount()

	return { id: 'preview', label: 'Preview', element: section, dispose: thumbnail.dispose }
}

// --- built with -------------------------------------------------------

const buildElementList = (example: ExampleEntryT, options: ExamplePageOptionsT): HTMLElement => {
	const list = createElement('ul', 'exampleElementList')

	for (const tag of example.elements) {
		const item = createElement('li')
		const route = options.resolveElementRoute(tag)

		if (route) {
			const link = createElement('a', 'exampleElementChip is-linked') as HTMLAnchorElement
			link.href = `#${route}`
			link.textContent = tag
			item.append(link)
		} else {
			const chip = createElement('span', 'exampleElementChip')
			chip.textContent = tag
			chip.title = 'Not yet on the public surface'
			item.append(chip)
		}

		list.append(item)
	}

	return list
}

const buildElementsSection = (example: ExampleEntryT, options: ExamplePageOptionsT): HTMLElement => {
	const section = createElement('section', 'pageSection')
	section.append(
		buildSectionHeader('Built with', `${example.elements.length} elements. Linked ones have a reference page.`),
		buildElementList(example, options)
	)
	return section
}

// --- source -----------------------------------------------------------

const buildSourceSection = (example: ExampleEntryT): HTMLElement => {
	const section = createElement('section', 'pageSection')
	section.append(
		buildSectionHeader('Source', 'The markup as rendered, the script that wires it, and the layout rules it needs.')
	)

	const hasSeveral = example.snippets.length > 1
	if (!hasSeveral) {
		const [snippet] = example.snippets
		section.append(buildCodeBlock({ code: snippet.code, language: snippet.language, filename: snippet.label, hasCopyButton: true }))
		return section
	}

	const tabs = buildTabs(example.snippets.map((snippet) => ({ value: snippet.language, label: snippet.label })))
	for (const snippet of example.snippets) {
		const panel = buildTabPanel(snippet.language, 'exampleSourcePanel')
		panel.append(buildCodeBlock({ code: snippet.code, language: snippet.language, filename: '', hasCopyButton: true }))
		tabs.append(panel)
	}

	section.append(tabs)
	return section
}

// --- pager ------------------------------------------------------------

// Neighbours come from the registry order, the same order the gallery shows.
const buildPager = (example: ExampleEntryT): HTMLElement | null => {
	const examples = getAllExamples()
	const index = examples.findIndex((candidate) => candidate.slug === example.slug)

	const previous = examples[index - 1]
	const next = examples[index + 1]
	const hasEither = Boolean(previous || next)
	if (!hasEither) return null

	const pager = createElement('z-prev-next') as ZPrevNextElementT
	pager.previous = previous ? { label: previous.title, route: `#/examples/${previous.slug}` } : null
	pager.next = next ? { label: next.title, route: `#/examples/${next.slug}` } : null
	return pager
}

// --- page -------------------------------------------------------------

// Authored, not scraped, like the component pages: the sections are known
// here, so the outline lists exactly what rendered.
const buildPageOutline = (sections: PageSectionT[]): HTMLElement => {
	const outline = document.createElement('z-toc') as HTMLElement & { headings: unknown }
	outline.headings = sections.map((section) => ({ id: section.id, label: section.label, level: 2 }))
	return outline
}

export const renderExamplePage = (example: ExampleEntryT, options: ExamplePageOptionsT): RenderedRouteT => {
	const article = createElement('article', 'componentArticle')
	article.append(buildBreadcrumbs(example), buildHeader(example))

	const source = buildSourceSection(example)
	const jumpToSource = (): void => source.scrollIntoView({ behavior: 'smooth', block: 'start' })

	const isPage = example.kind === ExampleKind.page
	const preview = isPage
		? buildStandalonePreview(example, options.getStandaloneHref(example), jumpToSource)
		: buildLivePreview(example, jumpToSource)

	const sections: PageSectionT[] = [
		{ id: 'overview', label: 'Overview', element: buildOverviewSection(example) },
		preview,
		{ id: 'elements', label: 'Built with', element: buildElementsSection(example, options) },
		{ id: 'source', label: 'Source', element: source }
	]

	for (const section of sections) {
		section.element.id = section.id
		article.append(section.element)
	}

	const pager = buildPager(example)
	if (pager) article.append(pager)

	const dispose = (): void => {
		for (const section of sections) section.dispose?.()
	}

	return { element: article, outline: buildPageOutline(sections), dispose }
}

// The chrome-free render of a page-kind example: the example, the viewport,
// nothing else. Themed like the docs, because the theme lives on <html>.
export const renderStandaloneExample = (example: ExampleEntryT): RenderedRouteT => {
	const root = createElement('div', 'standaloneExample')
	const instance = example.build()
	root.append(instance.root)
	document.title = `${example.title} · zest`

	return { element: root, outline: null, dispose: () => instance.dispose?.() }
}
