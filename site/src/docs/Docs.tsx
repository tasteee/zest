import './docs.css'
import './example.css'
import './shell.css'
import { Redirect, Route, Switch, useParams } from 'wouter'
import { DocsLayout } from '@app/docs/DocsLayout'
import { ELEMENT_PART_PARENTS, LEGACY_SECTION_IDS, pagesOf, sectionById } from '@app/docs/nav'
import { ElementsIndex } from '@app/docs/ElementsIndex'
import { BlocksIndex } from '@app/docs/blocks/BlocksIndex'

// Docs section. Rendered under <Route path="/docs" nest>, so paths here are
// relative to /docs. DocsLayout stays mounted across navigation; pages only
// render their own content.

const firstPage = (sectionId: string) => {
	const section = sectionById(sectionId)
	const first = section && pagesOf(section)[0]
	return first ? `/${sectionId}/${first.slug}` : '/guide/introduction'
}

const SectionIndex = () => {
	const { section } = useParams<{ section: string }>()
	const renamedSectionId = LEGACY_SECTION_IDS[section]
	if (renamedSectionId) return <Redirect to={`/${renamedSectionId}`} replace />
	if (section === 'elements') return <ElementsIndex />
	if (section === 'blocks') return <BlocksIndex />
	if (sectionById(section)) return <Redirect to={firstPage(section)} replace />
	return <LegacyRedirect />
}

const DocPage = () => {
	const { section: sectionId, slug } = useParams<{ section: string; slug: string }>()
	const renamedSectionId = LEGACY_SECTION_IDS[sectionId]
	if (renamedSectionId) return <Redirect to={`/${renamedSectionId}/${slug}`} replace />

	const parentSlug = ELEMENT_PART_PARENTS[slug]
	const isElementPart = sectionId === 'elements' && Boolean(parentSlug)
	if (isElementPart) return <Redirect to={`/elements/${parentSlug}`} replace />

	const section = sectionById(sectionId)
	const page = section && pagesOf(section).find((p) => p.slug === slug)
	if (!page) return <NotFound />
	const Page = page.Component
	return <Page />
}

// Old URLs: /docs/components/z-button, /docs/color, …
const LEGACY_SYSTEM = new Set(['color', 'typography', 'spacing', 'layout', 'patterns'])
const LegacyRedirect = () => {
	const { section } = useParams<{ section: string }>()
	if (section === 'rules') return <Redirect to="/foundations/principles" replace />
	if (LEGACY_SYSTEM.has(section)) return <Redirect to={`/foundations/${section}`} replace />
	return <NotFound />
}

const NotFound = () => (
	<div className="DocsArticle">
		<z-eyebrow hasRule>404</z-eyebrow>
		<h1>Page not found</h1>
		<p>That page doesn’t exist. Try ⌘K to search the docs.</p>
	</div>
)

export const Docs = () => (
	<DocsLayout>
		<Switch>
			<Route path="/">
				<Redirect to="/guide/introduction" replace />
			</Route>
			<Route path="/components/:slug">{(params) => <Redirect to={`/elements/${params.slug}`} replace />}</Route>
			<Route path="/:section" component={SectionIndex} />
			<Route path="/:section/:slug" component={DocPage} />
			<Route component={NotFound} />
		</Switch>
	</DocsLayout>
)
