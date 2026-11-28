import { pagesOf, type SectionT } from '@app/docs/nav'

const GITHUB_ISSUES_URL = 'https://github.com/tasteee/zest/issues/new'

/*
 * "Report an issue" link at the bottom of every docs page.
 *
 * No API token and no backend: the link opens GitHub's new-issue page in a
 * new tab with the title, body, and labels prefilled for the page the reader
 * is on. They describe the problem and submit it themselves, signed in as
 * whoever they are on GitHub.
 *
 * Rendered once from DocsLayout, so every Guide, Foundations, Elements, and
 * Blocks page — including the Elements and Blocks index pages, which have
 * no slug — gets the link for its own page.
 */
export const ReportIssue = ({ section, slug }: { section: SectionT; slug: string }) => {
	const page = slug ? pagesOf(section).find((p) => p.slug === slug) : undefined
	const pageLabel = page?.label ?? section.overviewLabel ?? section.label
	const pagePath = slug ? `/docs/${section.id}/${slug}` : `/docs/${section.id}`
	const pageUrl = typeof window === 'undefined' ? pagePath : window.location.href

	const title = `[Docs] ${section.label} — ${pageLabel}: `
	const body = [
		`**Page:** ${section.label} — ${pageLabel}`,
		`**URL:** ${pageUrl}`,
		'',
		"**What's wrong:**",
		'',
		'',
		'**What should it be instead:**',
		''
	].join('\n')

	const params = new URLSearchParams({
		title,
		body,
		labels: 'bug,documentation'
	})

	return (
		<div className="DocsReportIssue">
			<span>Something wrong on this page?</span>
			<a href={`${GITHUB_ISSUES_URL}?${params}`} target="_blank" rel="noreferrer">
				Report an issue
			</a>
		</div>
	)
}
