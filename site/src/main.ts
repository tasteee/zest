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

type NavNodeT = {
	label: string
	route?: string
	status?: string
	children?: NavNodeT[]
}

type ZNavTreeElementT = HTMLElement & {
	items: NavNodeT[]
	route: string
}

type ZDocsShellElementT = HTMLElement & {
	isNavOpen: boolean
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

const buildNavLeaf = (page: DocPageT): NavNodeT => {
	return { label: page.slug, route: page.route }
}

// One category per branch, in the order docs-data emits them. z-nav-tree does
// not sort — the author's ordering is the information.
const buildNavItems = (): NavNodeT[] => {
	const items: NavNodeT[] = []

	for (const category of siteData.categories) {
		items.push({ label: category.label, children: category.pages.map(buildNavLeaf) })
	}

	const hasStandalonePages = siteData.standalonePages.length > 0
	if (hasStandalonePages) {
		items.push({ label: 'More', children: siteData.standalonePages.map(buildNavLeaf) })
	}

	return items
}

const renderHomePage = (contentRoot: HTMLElement): void => {
	activePage = null
	setPageOutline(null)

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
// The outline is slotted into the shell rather than the content column, so a
// page that has no outline — a markdown page, a splash — simply never puts
// anything there and the shell drops the track.
const setPageOutline = (outline: HTMLElement | null): void => {
	const shell = document.querySelector('#docShell')
	if (!shell) return

	const previousOutline = shell.querySelector('[slot="toc"]')
	previousOutline?.remove()

	if (!outline) return

	outline.setAttribute('slot', 'toc')
	shell.append(outline)
}

const renderComponentDocPage = (contentRoot: HTMLElement, page: DocPageT): boolean => {
	const componentDoc = getComponentDoc(page.slug)
	if (!componentDoc) return false

	activePage = page

	try {
		const componentPage = buildComponentPage(componentDoc, page.categoryLabel)
		contentRoot.replaceChildren(componentPage.article)
		setPageOutline(componentPage.outline)
	} catch (renderError) {
		console.error(`zest docs: "${page.slug}" failed to render`, renderError)
		contentRoot.replaceChildren(buildRenderFailureNotice(page, renderError as Error))
		setPageOutline(null)
	}

	return true
}

const renderMarkdownDocPage = (contentRoot: HTMLElement, page: DocPageT): void => {
	activePage = page
	setPageOutline(null)

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
	setPageOutline(null)

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

// The shell owns the scroll container now (z-chassis's screen), so landing at
// the top of a new page goes through it rather than the content element.
const scrollPageToTop = (): void => {
	const shell = document.querySelector('#docShell') as (ZDocsShellElementT & { scrollContentToTop?: () => void }) | null
	shell?.scrollContentToTop?.()
}

const renderRoute = (): void => {
	const contentRoot = document.querySelector('#docContent') as HTMLElement | null
	const navTree = document.querySelector('#docNav') as ZNavTreeElementT | null
	if (!contentRoot || !navTree) return

	const currentRoute = parseCurrentRoute()
	navTree.route = currentRoute

	const isHomeRoute = currentRoute === '/'
	if (isHomeRoute) {
		renderHomePage(contentRoot)
		scrollPageToTop()
		return
	}

	const matchedPage = siteData.pagesByRoute.get(currentRoute)
	if (!matchedPage) {
		renderNotFound(contentRoot)
		return
	}

	const wasRenderedAsComponentPage = renderComponentDocPage(contentRoot, matchedPage)
	if (!wasRenderedAsComponentPage) renderMarkdownDocPage(contentRoot, matchedPage)

	scrollPageToTop()
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

// Brand and search sit in the rail's pinned header region, so both stay put
// while the component categories beneath them scroll. Search stands in for
// z-nav-tree's own filter: the palette already searches every page, and two
// find-a-component affordances a few pixels apart is one too many.
const buildNavHeader = (commandPalette: ZCommandElementT): HTMLElement => {
	const brand = createElement('div', 'navBrand')
	brand.setAttribute('slot', 'nav-header')

	const logo = createElement('div', 'appLogo')
	logo.textContent = 'zest'

	brand.append(logo, buildSearchTrigger(commandPalette))
	return brand
}

const buildSearchTrigger = (commandPalette: ZCommandElementT): HTMLElement => {
	const searchTrigger = document.createElement('button')
	searchTrigger.type = 'button'
	searchTrigger.className = 'searchTrigger'
	searchTrigger.setAttribute('aria-label', 'Search components')

	const searchLabel = createElement('span', 'searchTriggerLabel')
	searchLabel.textContent = 'Search'

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

	return searchTrigger
}

// Theme lives in the rail's pinned footer: always reachable, never scrolled
// past, and out of the way of the nav itself.
const buildNavFooter = (): HTMLElement => {
	const utilities = createElement('div', 'navUtilities')
	utilities.setAttribute('slot', 'nav-footer')

	// The docs site offers every theme zest ships, which is more than the
	// switcher's own default of light/dark/system. Icon-only, because six
	// labelled segments would dominate the rail.
	const themeSwitcher = createElement('z-theme-switcher') as HTMLElement & { themes: string[] }
	themeSwitcher.setAttribute('is-small', '')
	themeSwitcher.setAttribute('is-icon-only', '')
	themeSwitcher.themes = ['light', 'dark', 'console', 'studio', 'system']

	utilities.append(themeSwitcher)
	return utilities
}

const initDocsSite = (): void => {
	const appRoot = document.querySelector('#app')
	if (!appRoot) throw new Error('missing #app root element')

	const commandPalette = buildCommandPalette()

	const shell = createElement('z-docs-shell') as ZDocsShellElementT
	shell.id = 'docShell'
	shell.setAttribute('nav-width', '17rem')
	shell.setAttribute('content-width', '54rem')
	shell.setAttribute('toc-width', '13rem')

	const navTree = createElement('z-nav-tree') as ZNavTreeElementT
	navTree.id = 'docNav'
	navTree.setAttribute('slot', 'nav')
	navTree.setAttribute('storage-key', 'zest-docs-nav')
	navTree.items = buildNavItems()

	// The nav navigates itself — its anchors carry real hrefs. This only
	// closes the mobile drawer behind the reader.
	navTree.addEventListener('navigate', () => {
		shell.isNavOpen = false
	})

	const content = createElement('div')
	content.id = 'docContent'
	content.addEventListener('click', handleDocContentClick)

	shell.append(buildNavHeader(commandPalette), navTree, buildNavFooter(), content)
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
