import { c, css, event, useEffect, useMemo, useProp, useRef, useState } from 'atomico'

/*
 * z-search-dialog — full-text search over a prebuilt index.
 *
 *   dialog.index = [
 *     { id: 'z-input', route: '/c/forms/z-input', title: 'z-input', group: 'Forms', body: '…' }
 *   ]
 *
 * Not z-command with a filter. A command palette is a fixed list of actions
 * the reader picks from; search is ranked, snippet-bearing, and may be
 * asynchronous. Overloading one element with both would damage both: the
 * palette would grow scoring it does not want, and search would inherit a
 * flat list model that cannot show why a result matched.
 *
 * Ranking is deliberately simple and local. A title hit beats a body hit, a
 * whole-word hit beats a partial, and every query term has to appear
 * somewhere or the entry is out. That is enough for a few hundred doc pages
 * and it needs no index format beyond what the site already has.
 *
 * Hosts with a real search backend assign `search` instead — an async function
 * returning the same result shape — and the local scorer is bypassed entirely.
 */
const styles = css`
	:host {
		display: contents;
	}

	.dialog {
		width: min(40rem, calc(100vw - 2rem));
		max-height: min(32rem, calc(100vh - 6rem));
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--popover);
		color: var(--popover-foreground);
		overflow: hidden;
	}

	.dialog::backdrop {
		background: color-mix(in oklch, var(--background) 60%, transparent);
		backdrop-filter: blur(3px);
	}

	.field {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.75rem var(--space-base);
		border-bottom: 1px solid var(--border);
	}

	.glyph {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		stroke: currentColor;
		stroke-width: 2;
		fill: none;
		color: var(--muted-foreground);
	}

	input {
		flex: 1;
		min-width: 0;
		border: 0;
		background: transparent;
		color: var(--foreground);
		font: inherit;
		font-size: var(--font-size-body);
		outline: none;
	}

	input::placeholder {
		color: var(--muted-foreground);
	}

	.results {
		max-height: 24rem;
		overflow-y: auto;
		padding: 0.25rem;
	}

	.group-label {
		padding: var(--space-sm) 0.625rem 0.25rem;
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.result {
		display: block;
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem 0.625rem;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		text-decoration: none;
		cursor: pointer;
	}

	.result.is-active {
		background: color-mix(in oklch, var(--purple) 14%, transparent);
	}

	.title {
		display: block;
		font-size: var(--font-size-small);
		color: var(--foreground);
	}

	/* The snippet is why this is not a palette: it says which words matched and
	   where, so a reader can tell two similarly-named pages apart. */
	.snippet {
		display: block;
		margin-top: 0.125rem;
		font-size: var(--font-size-caption);
		line-height: 1.45;
		color: var(--muted-foreground);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.snippet mark {
		background: color-mix(in oklch, var(--purple) 30%, transparent);
		color: var(--foreground);
		border-radius: 2px;
	}

	.empty {
		padding: var(--space-lg) var(--space-base);
		text-align: center;
		font-size: var(--font-size-small);
		color: var(--muted-foreground);
	}

	.foot {
		display: flex;
		gap: var(--space-base);
		padding: 0.5rem var(--space-base);
		border-top: 1px solid var(--border);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}
`

type IndexEntryT = {
	id: string
	route: string
	title: string
	group?: string
	body?: string
}

type ResultT = IndexEntryT & {
	score: number
	snippet: string
}

const SNIPPET_RADIUS = 70

const readTerms = (query: string): string[] => {
	const lowered = query.toLowerCase().trim()
	if (!lowered) return []
	return lowered.split(/\s+/).filter((term) => term.length > 0)
}

// A whole-word hit is worth more than a partial one, and a hit in the title is
// worth more than either. Everything else is noise at this corpus size.
const scoreField = (field: string, term: string, wholeWeight: number, partialWeight: number): number => {
	const lowered = field.toLowerCase()
	const position = lowered.indexOf(term)
	if (position < 0) return 0

	const before = position === 0 ? ' ' : lowered.charAt(position - 1)
	const isWordStart = !/[a-z0-9]/.test(before)
	return isWordStart ? wholeWeight : partialWeight
}

const buildSnippet = (body: string, terms: string[]): string => {
	const hasBody = body.length > 0
	if (!hasBody) return ''

	const lowered = body.toLowerCase()
	const firstHit = terms.map((term) => lowered.indexOf(term)).filter((position) => position >= 0)

	const anchor = firstHit.length > 0 ? Math.min(...firstHit) : 0
	const start = Math.max(0, anchor - SNIPPET_RADIUS)
	const end = Math.min(body.length, anchor + SNIPPET_RADIUS * 2)

	const prefix = start > 0 ? '…' : ''
	const suffix = end < body.length ? '…' : ''
	return `${prefix}${body.slice(start, end).trim()}${suffix}`
}

const scoreEntry = (entry: IndexEntryT, terms: string[]): number => {
	const body = entry.body || ''

	let total = 0
	for (const term of terms) {
		const titleScore = scoreField(entry.title, term, 12, 6)
		const bodyScore = scoreField(body, term, 3, 1)
		const termScore = titleScore + bodyScore

		// Every term has to land somewhere, or the entry is not a match at all.
		if (termScore === 0) return 0
		total += termScore
	}

	return total
}

const searchIndex = (index: IndexEntryT[], query: string): ResultT[] => {
	const terms = readTerms(query)
	if (terms.length === 0) return []

	const matches: ResultT[] = []
	for (const entry of index) {
		const score = scoreEntry(entry, terms)
		if (score === 0) continue
		matches.push({ ...entry, score, snippet: buildSnippet(entry.body || '', terms) })
	}

	return matches.sort((left, right) => right.score - left.score)
}

const readIndex = (value: unknown): IndexEntryT[] => {
	if (!Array.isArray(value)) return []

	const entries: IndexEntryT[] = []
	for (const entry of value) {
		const hasShape = entry && typeof entry.title === 'string' && typeof entry.route === 'string'
		if (hasShape) entries.push({ id: entry.id || entry.route, ...entry })
	}
	return entries
}

const readRecent = (storageKey?: string): string[] => {
	if (!storageKey) return []

	try {
		const stored = window.localStorage.getItem(storageKey)
		const parsed = stored ? JSON.parse(stored) : []
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

const writeRecent = (storageKey: string | undefined, queries: string[]) => {
	if (!storageKey) return

	try {
		window.localStorage.setItem(storageKey, JSON.stringify(queries.slice(0, 5)))
	} catch {
		// Storage can be unavailable. Recent searches are a convenience.
	}
}

// Splits a snippet around the matched terms so they can be marked without
// building HTML from a string.
const buildSnippetParts = (snippet: string, terms: string[]) => {
	const hasTerms = terms.length > 0
	if (!hasTerms) return [snippet]

	const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
	const segments = snippet.split(pattern)

	return segments.map((segment, index) => {
		const isMatch = index % 2 === 1
		if (!isMatch) return segment
		return <mark key={index}>{segment}</mark>
	})
}

export const ZSearchDialog = c(
	(props) => {
		const dialogRef = useRef<HTMLDialogElement>()
		const [isOpen, setIsOpen] = useProp<boolean>('isOpen')
		const [query, setQuery] = useState('')
		const [activeIndex, setActiveIndex] = useState(0)
		const [asyncResults, setAsyncResults] = useState<ResultT[] | null>(null)

		const storageKey = props.recentKey as string | undefined
		const index = useMemo(() => readIndex(props.index), [props.index])
		const terms = readTerms(query)

		const localResults = useMemo(() => searchIndex(index, query), [index, query])
		const results = asyncResults ?? localResults

		// A host with a real backend assigns `search`; the local scorer is then
		// never consulted.
		useEffect(() => {
			const search = props.search as ((query: string) => Promise<ResultT[]>) | undefined
			if (!search) return setAsyncResults(null)

			const hasQuery = query.trim().length > 0
			if (!hasQuery) return setAsyncResults([])

			let isCurrent = true
			search(query).then((found) => {
				if (isCurrent) setAsyncResults(found)
			})

			return () => {
				isCurrent = false
			}
		}, [query, props.search])

		useEffect(() => {
			const dialog = dialogRef.current
			if (!dialog) return

			if (isOpen && !dialog.open) dialog.showModal()
			if (!isOpen && dialog.open) dialog.close()
		}, [isOpen])

		useEffect(() => {
			const dialog = dialogRef.current
			if (!dialog) return

			const handleClose = () => setIsOpen(false)
			dialog.addEventListener('close', handleClose)
			return () => dialog.removeEventListener('close', handleClose)
		}, [])

		const commit = (result: ResultT) => {
			const recent = readRecent(storageKey).filter((entry) => entry !== query)
			writeRecent(storageKey, [query, ...recent])

			props.select({ route: result.route, id: result.id })
			setIsOpen(false)
		}

		const handleKeyDown = (keyEvent: KeyboardEvent) => {
			const lastIndex = results.length - 1

			if (keyEvent.key === 'ArrowDown') {
				keyEvent.preventDefault()
				return setActiveIndex(activeIndex >= lastIndex ? 0 : activeIndex + 1)
			}

			if (keyEvent.key === 'ArrowUp') {
				keyEvent.preventDefault()
				return setActiveIndex(activeIndex <= 0 ? lastIndex : activeIndex - 1)
			}

			if (keyEvent.key === 'Enter') {
				const active = results[activeIndex]
				if (active) {
					keyEvent.preventDefault()
					commit(active)
				}
			}
		}

		const handleInput = (inputEvent: Event) => {
			setQuery((inputEvent.target as HTMLInputElement).value)
			setActiveIndex(0)
		}

		const recent = readRecent(storageKey)
		const hasQuery = query.trim().length > 0
		const hasResults = results.length > 0
		const shouldShowRecent = !hasQuery && recent.length > 0

		// Group headings are emitted when the group changes, so the flat
		// ranked list still reads as sections without being re-sorted into them
		// — re-sorting would put a weak result above a strong one.
		let lastGroup = ''

		return (
			<host shadowDom>
				<dialog
					class='dialog'
					ref={dialogRef}
					onclick={(clickEvent: Event) => {
						if (clickEvent.target === dialogRef.current) setIsOpen(false)
					}}
				>
					<div class='field'>
						<svg class='glyph' viewBox='0 0 24 24' aria-hidden='true'>
							<circle cx='11' cy='11' r='7' />
							<path d='m20 20-3.5-3.5' />
						</svg>
						<input
							type='search'
							value={query}
							placeholder={(props.placeholder as string) || 'Search the docs'}
							aria-label={(props.placeholder as string) || 'Search the docs'}
							oninput={handleInput}
							onkeydown={handleKeyDown}
						/>
					</div>

					<div class='results'>
						{shouldShowRecent && (
							<div>
								<p class='group-label'>Recent</p>
								{recent.map((entry) => (
									<button key={entry} type='button' class='result' onclick={() => setQuery(entry)}>
										<span class='title'>{entry}</span>
									</button>
								))}
							</div>
						)}

						{hasQuery && !hasResults && <p class='empty'>{(props.emptyText as string) || 'No matches.'}</p>}

						{hasResults &&
							results.map((result, position) => {
								const group = result.group || ''
								const isNewGroup = group !== lastGroup
								lastGroup = group

								const resultClass = position === activeIndex ? 'result is-active' : 'result'

								return (
									<div key={result.id}>
										{isNewGroup && group && <p class='group-label'>{group}</p>}
										<a
											class={resultClass}
											href={result.route}
											onmouseenter={() => setActiveIndex(position)}
											onclick={(clickEvent: Event) => {
												clickEvent.preventDefault()
												commit(result)
											}}
										>
											<span class='title'>{result.title}</span>
											{result.snippet && <span class='snippet'>{buildSnippetParts(result.snippet, terms)}</span>}
										</a>
									</div>
								)
							})}
					</div>

					<div class='foot'>
						<span>↑↓ to navigate</span>
						<span>↵ to open</span>
						<span>esc to close</span>
					</div>
				</dialog>
			</host>
		)
	},
	{
		props: {
			index: { type: Array },
			search: { type: Object },
			isOpen: { type: Boolean, reflect: true },
			placeholder: { type: String, reflect: true },
			emptyText: { type: String, reflect: true },
			recentKey: { type: String, reflect: true },
			select: event<{ route: string; id: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-search-dialog', ZSearchDialog)
