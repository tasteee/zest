// The examples gallery: every showcase example as a card with a live,
// scaled-down render of the real thing (see example-thumbnail.ts).
//
// Mounting is deferred until a card scrolls near the viewport, because a
// gallery of forty live examples should cost what the reader looks at, not
// what exists.

import { getAllExamples, getAllExampleTags } from '../examples/registry'
import { EXAMPLE_KIND_LABELS, ExampleKind } from '../examples/types'
import type { ExampleEntryT, ExampleKindT } from '../examples/types'
import { Icons } from '../component-docs/icons'
import { buildExampleThumbnail } from './example-thumbnail'
import type { ExampleThumbnailT } from './example-thumbnail'
import { buildHeading, buildText, createElement } from './zest-elements'
import type { ZBreadcrumbsElementT } from './zest-elements'

export type RenderedRouteT = {
	element: HTMLElement
	// The on-this-page outline, when the page has sections worth listing.
	outline: HTMLElement | null
	dispose: () => void
}

type KindFilterT = ExampleKindT | 'all'

type GalleryStateT = {
	kind: KindFilterT
	tag: string | null
	query: string
}

type ZToggleGroupItemElementT = HTMLElement & { isPressed: boolean; value: string }
type ZBadgeElementT = HTMLElement & { isSelected: boolean }

// Thumbnails are eager only once they are about to be seen. 40% of a
// viewport of lead time hides the mount from all but the fastest flicks.
const THUMBNAIL_ROOT_MARGIN = '40% 0px'

const MAX_VISIBLE_ELEMENT_CHIPS = 4

const buildBreadcrumbs = (): ZBreadcrumbsElementT => {
	const breadcrumbs = document.createElement('z-breadcrumbs') as ZBreadcrumbsElementT
	breadcrumbs.items = [
		{ label: 'Docs', href: '#/' },
		{ label: 'Examples', isCurrent: true }
	]
	return breadcrumbs
}

const buildHeader = (): HTMLElement => {
	const header = createElement('z-doc-header')
	header.setAttribute('eyebrow', 'Examples')
	header.setAttribute('heading', 'Built with Zest')
	header.setAttribute(
		'tagline',
		'Organisms and whole pages composed from the elements. Every card is the real thing, running — open one, poke it, take the source.'
	)
	return header
}

const buildKindFilter = (state: GalleryStateT, onChange: () => void): HTMLElement => {
	const group = createElement('z-toggle-button-group', 'galleryKinds')
	group.setAttribute('size', 'sm')
	group.setAttribute('aria-label', 'Filter by kind')

	const options: { value: KindFilterT; label: string }[] = [
		{ value: 'all', label: 'All' },
		{ value: ExampleKind.organism, label: 'Organisms' },
		{ value: ExampleKind.page, label: 'Pages' }
	]

	const items = options.map((option) => {
		const item = createElement('z-toggle-button-group-item') as ZToggleGroupItemElementT
		item.value = option.value
		item.textContent = option.label
		if (option.value === state.kind) item.setAttribute('is-pressed', '')
		return item
	})

	group.append(...items)

	// A segmented filter always has one segment down. Pressing the active
	// segment again would clear the group, so that case falls back to "All".
	group.addEventListener('change', (event) => {
		const changeEvent = event as CustomEvent<{ value?: string }>
		const nextKind = (changeEvent.detail.value as KindFilterT | undefined) ?? 'all'
		if (!changeEvent.detail.value) items[0].isPressed = true

		state.kind = nextKind
		onChange()
	})

	return group
}

const buildSearch = (state: GalleryStateT, onChange: () => void): HTMLElement => {
	const search = createElement('z-input', 'gallerySearch')
	search.setAttribute('size', 'sm')
	search.setAttribute('placeholder', 'Search examples')
	search.setAttribute('aria-label', 'Search examples')

	const icon = createElement('span', 'gallerySearchIcon')
	icon.setAttribute('slot', 'prefix')
	icon.innerHTML = Icons.search
	search.append(icon)

	search.addEventListener('input', (event) => {
		const inputEvent = event as CustomEvent<{ value: string }>
		state.query = inputEvent.detail.value.trim().toLowerCase()
		onChange()
	})

	return search
}

const buildTagRow = (state: GalleryStateT, onChange: () => void): HTMLElement => {
	const row = createElement('div', 'galleryTags')
	row.setAttribute('role', 'group')
	row.setAttribute('aria-label', 'Filter by topic')

	const chips = getAllExampleTags().map((tag) => {
		const chip = createElement('z-badge', 'galleryTag') as ZBadgeElementT
		chip.setAttribute('label', tag)
		chip.setAttribute('value', tag)
		chip.setAttribute('kind', 'outline')
		chip.setAttribute('size', 'sm')
		chip.setAttribute('selectable', '')
		return chip
	})

	// Tags are single-select: a topic narrows the grid, choosing another
	// topic replaces it, choosing the active one again clears it.
	for (const chip of chips) {
		chip.addEventListener('select', (event) => {
			const selectEvent = event as CustomEvent<{ value?: string; selected: boolean }>
			const nextTag = selectEvent.detail.selected ? (selectEvent.detail.value ?? null) : null

			for (const other of chips) {
				if (other !== chip) other.isSelected = false
			}

			state.tag = nextTag
			onChange()
		})
	}

	row.append(...chips)
	return row
}

const matchesState = (example: ExampleEntryT, state: GalleryStateT): boolean => {
	const isKindMatch = state.kind === 'all' || example.kind === state.kind
	if (!isKindMatch) return false

	const isTagMatch = state.tag === null || example.tags.includes(state.tag)
	if (!isTagMatch) return false

	const hasQuery = state.query.length > 0
	if (!hasQuery) return true

	const haystack = [example.title, example.tagline, ...example.tags, ...example.elements].join(' ').toLowerCase()
	return haystack.includes(state.query)
}

const buildElementChips = (example: ExampleEntryT): HTMLElement => {
	const row = createElement('div', 'galleryChips')

	const visibleElements = example.elements.slice(0, MAX_VISIBLE_ELEMENT_CHIPS)
	for (const tag of visibleElements) {
		const chip = createElement('code', 'galleryChip')
		chip.textContent = tag
		row.append(chip)
	}

	const hiddenCount = example.elements.length - visibleElements.length
	if (hiddenCount > 0) {
		const more = createElement('span', 'galleryChipMore')
		more.textContent = `+${hiddenCount}`
		row.append(more)
	}

	return row
}

type GalleryCardT = {
	example: ExampleEntryT
	card: HTMLElement
	thumbnail: ExampleThumbnailT
}

const buildCard = (example: ExampleEntryT): GalleryCardT => {
	const card = createElement('a', 'galleryCard') as HTMLAnchorElement
	card.href = `#/examples/${example.slug}`
	card.setAttribute('aria-label', `${example.title} — ${example.tagline}`)

	const thumbnail = buildExampleThumbnail(example)
	const stage = createElement('div', 'galleryStage')
	stage.append(thumbnail.stage)

	const body = createElement('div', 'galleryCardBody')

	const meta = createElement('div', 'galleryCardMeta')
	const kind = createElement('span', 'galleryKind')
	kind.textContent = EXAMPLE_KIND_LABELS[example.kind]
	const count = createElement('span', 'galleryCount')
	count.textContent = `${example.elements.length} elements`
	meta.append(kind, count)

	const title = buildHeading(example.title, 'sm', 'h3')
	const tagline = buildText(example.tagline, 'sm', 'muted')

	const open = createElement('span', 'galleryOpen')
	open.innerHTML = `Open example ${Icons.arrowRight}`

	body.append(meta, title, tagline, buildElementChips(example), open)
	card.append(stage, body)

	return { example, card, thumbnail }
}

const buildEmptyState = (): HTMLElement => {
	const empty = createElement('z-empty-state', 'galleryEmpty')
	empty.setAttribute('heading', 'No examples match')
	empty.setAttribute('description', 'Try a different topic, or clear the search.')
	empty.setAttribute('is-bordered', '')
	return empty
}

export const renderExamplesGallery = (): RenderedRouteT => {
	const examples = getAllExamples()
	const state: GalleryStateT = { kind: 'all', tag: null, query: '' }

	const article = createElement('article', 'docArticle galleryArticle')
	article.append(buildBreadcrumbs(), buildHeader())

	const grid = createElement('div', 'galleryGrid')
	const empty = buildEmptyState()
	const resultCount = createElement('span', 'galleryResultCount')

	const cards = examples.map(buildCard)
	const cardsByStage = new Map(cards.map((card) => [card.thumbnail.stage, card]))

	const intersectionObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue

				const card = cardsByStage.get(entry.target as HTMLElement)
				if (!card) continue

				card.thumbnail.mount()
				intersectionObserver.unobserve(entry.target)
			}
		},
		{ rootMargin: THUMBNAIL_ROOT_MARGIN }
	)

	for (const card of cards) intersectionObserver.observe(card.thumbnail.stage)

	const applyFilters = (): void => {
		let visibleCount = 0

		for (const card of cards) {
			const isVisible = matchesState(card.example, state)
			card.card.hidden = !isVisible
			if (isVisible) visibleCount += 1
		}

		const isEmpty = visibleCount === 0
		grid.hidden = isEmpty
		empty.hidden = !isEmpty

		const noun = visibleCount === 1 ? 'example' : 'examples'
		resultCount.textContent = `${visibleCount} ${noun}`
	}

	const toolbar = createElement('div', 'galleryToolbar')
	toolbar.append(buildKindFilter(state, applyFilters), buildSearch(state, applyFilters))

	const filters = createElement('div', 'galleryFilters')
	const tagRowWrap = createElement('div', 'galleryTagRow')
	tagRowWrap.append(buildTagRow(state, applyFilters), resultCount)
	filters.append(toolbar, tagRowWrap)

	grid.append(...cards.map((card) => card.card))
	article.append(filters, grid, empty)
	applyFilters()

	const dispose = (): void => {
		intersectionObserver.disconnect()
		for (const card of cards) card.thumbnail.dispose()
	}

	return { element: article, outline: null, dispose }
}
