// The status page: every element, one row, the evidence behind its badge.
//
// Modelled on Carbon's accessibility-status table. The point is that
// "stable" is a claim with receipts: each column is a kind of verification
// — automated where the test suite can do it, manual where only a person
// with a screen reader can — and the cells say which has happened. Rows come
// from the doc registry, so the table cannot drift from the pages.

import { getComponentDoc } from '../component-docs/registry'
import { ComponentStatus, EvidenceLevel, isStableEvidence } from '../component-docs/types'
import type { ComponentDocT, ComponentStatusT } from '../component-docs/types'
import { createElement } from '../dom-helpers'
import { buildHeading, buildText } from './zest-elements'
import type { DocPageT } from '../docs-data'

type StatusRowT = {
	id: string
	element: string
	status: string
	form: string
	keyboard: string
	screenReader: string
	browserTests: string
	screenshots: string
}

type StatusFilterT = ComponentStatusT | 'all' | 'unrecorded'

const NO_RECORD = 'no record'

const describeLevel = (level: string): string => {
	if (level === EvidenceLevel.verified) return 'verified'
	if (level === EvidenceLevel.partial) return 'partial'
	return 'not yet'
}

const rowFor = (page: DocPageT, doc: ComponentDocT | undefined): StatusRowT => {
	if (!doc) {
		return { id: page.slug, element: page.slug, status: NO_RECORD, form: '—', keyboard: '—', screenReader: '—', browserTests: '—', screenshots: '—' }
	}
	const { evidence } = doc
	return {
		id: page.slug,
		element: page.slug,
		status: doc.status,
		form: evidence.formAssociated === null ? 'n/a' : evidence.formAssociated ? 'verified' : 'not yet',
		keyboard: describeLevel(evidence.keyboard),
		screenReader: describeLevel(evidence.screenReader),
		browserTests: evidence.browserTests ? 'automated' : 'not yet',
		screenshots: evidence.screenshots ? 'automated' : 'not yet'
	}
}

const matchesFilter = (row: StatusRowT, filter: StatusFilterT): boolean => {
	if (filter === 'all') return true
	if (filter === 'unrecorded') return row.status === NO_RECORD
	return row.status === filter
}

export const buildStatusPage = (pages: DocPageT[]): HTMLElement => {
	const elementPages = pages.filter((page) => page.slug.startsWith('z-')).sort((left, right) => left.slug.localeCompare(right.slug))
	const rows = elementPages.map((page) => rowFor(page, getComponentDoc(page.slug)))

	const counts = {
		stable: rows.filter((row) => row.status === ComponentStatus.stable).length,
		beta: rows.filter((row) => row.status === ComponentStatus.beta).length,
		experimental: rows.filter((row) => row.status === ComponentStatus.experimental).length,
		unrecorded: rows.filter((row) => row.status === NO_RECORD).length
	}
	const stableReady = elementPages.filter((page) => {
		const doc = getComponentDoc(page.slug)
		return doc && doc.status !== ComponentStatus.stable && isStableEvidence(doc.evidence)
	}).length

	const article = createElement('article', 'docArticle')
	article.append(buildHeading('Status', 'lg', 'h1'))
	article.append(buildText(
		`${rows.length} elements. ${counts.stable} stable, ${counts.beta} beta, ${counts.experimental} experimental, ${counts.unrecorded} without an evidence record. ` +
		`Stable means every evidence column is green; a test refuses the label otherwise. ${stableReady === 0 ? 'No element currently has the evidence for stable without the label.' : `${stableReady} could be promoted today.`}`,
		'md', 'neutral'
	))
	article.append(buildText(
		'Automated: proven by the test suite on every push. Verified: a recorded pass. Manual (screen reader): a person with NVDA and VoiceOver, recorded on the page. Not yet: nobody has checked — it says nothing about whether it works.',
		'sm', 'muted'
	))

	const controls = createElement('div', 'statusControls')
	const filter = document.createElement('z-select') as HTMLElement & { options?: unknown; value?: string }
	filter.setAttribute('label', 'Show')
	filter.setAttribute('inline', '')
	filter.setAttribute('size', 'sm')
	filter.options = [
		{ value: 'all', label: `All (${rows.length})` },
		{ value: ComponentStatus.stable, label: `Stable (${counts.stable})` },
		{ value: ComponentStatus.beta, label: `Beta (${counts.beta})` },
		{ value: ComponentStatus.experimental, label: `Experimental (${counts.experimental})` },
		{ value: 'unrecorded', label: `No record (${counts.unrecorded})` }
	]
	filter.value = 'all'
	controls.append(filter)
	article.append(controls)

	const table = document.createElement('z-table') as HTMLElement & { columns?: unknown; rows?: unknown }
	table.setAttribute('is-striped', '')
	table.setAttribute('empty-label', 'Nothing matches that filter.')
	table.columns = [
		{ key: 'element', label: 'Element', isMono: true },
		{ key: 'status', label: 'Status' },
		{ key: 'form', label: 'Form' },
		{ key: 'keyboard', label: 'Keyboard' },
		{ key: 'screenReader', label: 'Screen reader' },
		{ key: 'browserTests', label: 'Browser tests' },
		{ key: 'screenshots', label: 'Screenshots' }
	]
	const apply = (value: StatusFilterT) => { table.rows = rows.filter((row) => matchesFilter(row, value)) }
	apply('all')
	filter.addEventListener('change', (event) => apply((event as CustomEvent<{ value: StatusFilterT }>).detail.value))
	article.append(table)

	return article
}
