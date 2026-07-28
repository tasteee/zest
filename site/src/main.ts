import './site.css'
import { buildDocSiteData, getAllPages, resolveDocLinkToRoute, stripLeadingTitleHeading } from './docs-data'
import type { DocPageT } from './docs-data'
import { createElement } from './dom-helpers'
import { buildPlayground } from './playground'
import { getComponentDoc } from './component-docs/registry'
import { buildComponentPage } from './render/component-page'

// Every markdown file under docs/, read as raw text at build/dev time.
const rawDocsByPath = import.meta.glob('../../docs/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>

const siteData = buildDocSiteData(rawDocsByPath)

// The custom elements below have no ambient DOM typings (zest doesn't ship
// a global HTMLElementTagNameMap augmentation), so these narrow local
// shapes describe just the properties this site sets on them.
type ZMarkdownElementT = HTMLElement & {
	content: string
}

type ZBreadcrumbsItemT = {
	label: string
	href?: string
	isCurrent?: boolean
}

type ZBreadcrumbsElementT = HTMLElement & {
	items: ZBreadcrumbsItemT[]
}

type ZCommandItemT = {
	value: string
	label: string
	group?: string
	keywords?: string
}

type ZCommandElementT = HTMLElement & {
	items: ZCommandItemT[]
	isOpen: boolean
}

// Tracks whichever doc page is currently rendered, so clicks on markdown-
// authored cross-reference links (e.g. "z-button-group.md") can be resolved
// relative to the right folder.
let activePage: DocPageT | null = null

const buildBreadcrumbs = (items: ZBreadcrumbsItemT[]): ZBreadcrumbsElementT => {
	const breadcrumbs = document.createElement('z-breadcrumbs') as ZBreadcrumbsElementT
	breadcrumbs.items = items
	return breadcrumbs
}

const buildMarkdown = (content: string): ZMarkdownElementT => {
	const markdown = document.createElement('z-markdown') as ZMarkdownElementT
	markdown.setAttribute('heading-anchors', '')
	markdown.content = content
	return markdown
}

const buildNavLink = (label: string, route: string, currentRoute: string): HTMLElement => {
	const listItem = createElement('li')
	const link = createElement('a', 'navLink') as HTMLAnchorElement
	link.href = `#${route}`
	link.textContent = label
	const isActive = route === currentRoute
	if (isActive) link.classList.add('isActive')
	listItem.append(link)
	return listItem
}

const buildNavGroup = (label: string, pages: DocPageT[], currentRoute: string): HTMLElement => {
	const group = createElement('div', 'navGroup')

	const groupLabel = createElement('p', 'navGroupLabel')
	groupLabel.textContent = label
	group.append(groupLabel)

	const list = createElement('ul', 'navList')
	for (const page of pages) {
		list.append(buildNavLink(page.slug, page.route, currentRoute))
	}
	group.append(list)

	return group
}

// Returns just the group nodes, not a wrapping <nav> — the shell already
// owns one persistent <nav id="docNav"> and this refills its children on
// every route change.
const buildSidebarNavGroups = (currentRoute: string): DocumentFragment => {
	const fragment = document.createDocumentFragment()

	for (const category of siteData.categories) {
		fragment.append(buildNavGroup(category.label, category.pages, currentRoute))
	}

	const hasStandalonePages = siteData.standalonePages.length > 0
	if (hasStandalonePages) {
		fragment.append(buildNavGroup('More', siteData.standalonePages, currentRoute))
	}

	return fragment
}

const renderHomePage = (contentRoot: HTMLElement): void => {
	activePage = null

	const breadcrumbs = buildBreadcrumbs([{ label: 'Docs', isCurrent: true }])
	const markdown = buildMarkdown(siteData.homeMarkdown)

	const article = createElement('article', 'docArticle')
	article.append(breadcrumbs, markdown)
	contentRoot.replaceChildren(article)
}

// A doc page builds real component instances, so a bad attribute value can
// make a component throw mid-render. Left unhandled that aborts the whole
// route and leaves the reader staring at a blank pane with no clue why, so
// the failure gets surfaced in place instead.
const buildRenderFailureNotice = (page: DocPageT, renderError: Error): HTMLElement => {
	const wrap = createElement('div', 'notFound')

	const callout = createElement('z-callout')
	callout.setAttribute('kind', 'caution')
	callout.setAttribute('heading', `${page.slug} failed to render`)
	callout.textContent = renderError.message

	const homeLink = createElement('a') as HTMLAnchorElement
	homeLink.href = '#/'
	homeLink.textContent = '← Back to docs home'

	wrap.append(callout, homeLink)
	return wrap
}

// Pages that have been converted to a TypeScript doc module get the full
// reference layout. Everything else still renders from its markdown file
// until it is converted, so the site is never half-broken mid-migration.
const renderComponentDocPage = (contentRoot: HTMLElement, page: DocPageT): boolean => {
	const componentDoc = getComponentDoc(page.slug)
	if (!componentDoc) return false

	activePage = page

	try {
		contentRoot.replaceChildren(buildComponentPage(componentDoc, page.categoryLabel))
	} catch (renderError) {
		console.error(`zest docs: "${page.slug}" failed to render`, renderError)
		contentRoot.replaceChildren(buildRenderFailureNotice(page, renderError as Error))
	}

	return true
}

const renderMarkdownDocPage = (contentRoot: HTMLElement, page: DocPageT): void => {
	activePage = page

	const breadcrumbs = buildBreadcrumbs([
		{ label: 'Docs', href: '#/' },
		{ label: page.title, isCurrent: true }
	])

	const header = createElement('div', 'docHeader')
	if (page.categoryLabel) {
		const eyebrow = createElement('z-eyebrow')
		eyebrow.setAttribute('label', page.categoryLabel)
		header.append(eyebrow)
	}
	const heading = createElement('z-heading')
	heading.setAttribute('size', 'xl')
	heading.setAttribute('tag', 'h1')
	heading.textContent = page.title
	header.append(heading)

	const article = createElement('article', 'docArticle')
	article.append(breadcrumbs, header)

	const playground = buildPlayground(page)
	if (playground) {
		const playgroundLabel = createElement('p', 'docPreviewLabel')
		playgroundLabel.textContent = 'Playground'
		article.append(playgroundLabel, playground)
	}

	article.append(buildMarkdown(stripLeadingTitleHeading(page.rawMarkdown)))
	contentRoot.replaceChildren(article)
}

const renderNotFound = (contentRoot: HTMLElement): void => {
	activePage = null

	const wrap = createElement('div', 'notFound')
	const callout = createElement('z-callout')
	callout.setAttribute('kind', 'note')
	callout.setAttribute('heading', "Page not found")
	callout.textContent = "That doc doesn't exist."

	const homeLink = createElement('a') as HTMLAnchorElement
	homeLink.href = '#/'
	homeLink.textContent = '← Back to docs home'

	wrap.append(callout, homeLink)
	contentRoot.replaceChildren(wrap)
}

const parseCurrentRoute = (): string => {
	const rawHash = location.hash.replace(/^#/, '')
	const hasRoute = rawHash.length > 0
	if (!hasRoute) return '/'
	return rawHash
}

const renderRoute = (): void => {
	const contentRoot = document.querySelector('#docContent') as HTMLElement | null
	const sidebarRoot = document.querySelector('#docNav') as HTMLElement | null
	if (!contentRoot || !sidebarRoot) return

	const currentRoute = parseCurrentRoute()
	sidebarRoot.replaceChildren(buildSidebarNavGroups(currentRoute))

	const isHomeRoute = currentRoute === '/'
	if (isHomeRoute) {
		renderHomePage(contentRoot)
		contentRoot.scrollTo(0, 0)
		return
	}

	const matchedPage = siteData.pagesByRoute.get(currentRoute)
	if (!matchedPage) {
		renderNotFound(contentRoot)
		return
	}

	const wasRenderedAsComponentPage = renderComponentDocPage(contentRoot, matchedPage)
	if (!wasRenderedAsComponentPage) renderMarkdownDocPage(contentRoot, matchedPage)

	contentRoot.scrollTo(0, 0)
}

// Doc pages link to each other with plain relative markdown paths (e.g.
// `z-button-group.md`), rendered by <z-markdown> inside its own shadow root.
// Native click events on those anchors still bubble out (composed), so a
// single delegated listener here can intercept and route them instead of
// letting the browser try to navigate to a raw .md path.
const handleDocContentClick = (event: MouseEvent): void => {
	const composedPath = event.composedPath()
	const anchorElement = composedPath.find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement)
	if (!anchorElement) return

	const href = anchorElement.getAttribute('href') ?? ''
	const resolvedRoute = resolveDocLinkToRoute(activePage, href)
	if (!resolvedRoute) return

	event.preventDefault()
	location.hash = resolvedRoute
}

const buildCommandPalette = (): ZCommandElementT => {
	const commandPalette = document.createElement('z-command') as ZCommandElementT
	commandPalette.items = getAllPages(siteData).map((page) => {
		const group = page.categoryLabel || 'Pages'
		return { value: page.route, label: page.title, group, keywords: page.slug }
	})

	commandPalette.addEventListener('select', (event) => {
		const selectEvent = event as CustomEvent<{ value: string }>
		location.hash = selectEvent.detail.value
	})

	return commandPalette
}

const buildHeader = (commandPalette: ZCommandElementT): HTMLElement => {
	const header = createElement('header', 'appHeader')

	const logo = createElement('div', 'appLogo')
	logo.textContent = 'zest'

	const searchTrigger = document.createElement('button')
	searchTrigger.type = 'button'
	searchTrigger.className = 'searchTrigger'
	searchTrigger.setAttribute('aria-label', 'Search components')

	const searchLabel = createElement('span', 'searchTriggerLabel')
	searchLabel.textContent = 'Search components'

	const searchKeys = createElement('span', 'searchTriggerKeys')
	const kbdMeta = createElement('z-kbd')
	kbdMeta.setAttribute('label', '⌘')
	kbdMeta.setAttribute('size', 'sm')
	const kbdK = createElement('z-kbd')
	kbdK.setAttribute('label', 'K')
	kbdK.setAttribute('size', 'sm')
	searchKeys.append(kbdMeta, kbdK)

	searchTrigger.append(searchLabel, searchKeys)
	searchTrigger.addEventListener('click', () => {
		commandPalette.isOpen = true
	})

	header.append(logo, searchTrigger)
	return header
}

const initDocsSite = (): void => {
	const appRoot = document.querySelector('#app')
	if (!appRoot) throw new Error('missing #app root element')

	const commandPalette = buildCommandPalette()

	const shell = createElement('div', 'appShell')
	const nav = createElement('nav', 'appNav')
	nav.id = 'docNav'
	const content = createElement('div', 'appContent')
	content.id = 'docContent'
	content.addEventListener('click', handleDocContentClick)

	shell.append(buildHeader(commandPalette), nav, content)
	appRoot.replaceChildren(shell, commandPalette)

	document.addEventListener('keydown', (event) => {
		const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
		if (!isSearchShortcut) return
		event.preventDefault()
		commandPalette.isOpen = true
	})

	window.addEventListener('hashchange', renderRoute)
	renderRoute()
}

initDocsSite()
