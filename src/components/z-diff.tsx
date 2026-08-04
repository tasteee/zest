import { c, css, useMemo } from 'atomico'
import { highlight, type Token } from '../shared/highlight'

/*
 * z-diff — unified or split diff rendering, syntax highlighted per side.
 *
 *   <z-diff language="ts" before="const a = 1" after="const a = 2"></z-diff>
 *   <z-diff language="ts" patch="@@ -1 +1 @@&#10;-const a = 1&#10;+const a = 2"></z-diff>
 *
 * Two ways in, because migration guides and changelogs arrive differently. A
 * guide author has the two versions and wants the diff computed; a changelog
 * has a patch already and wants it rendered. `patch` wins when both are set.
 *
 * The diff itself is a plain longest-common-subsequence over lines. That is
 * O(n·m), which is wrong for a repository and completely fine for a snippet —
 * and it keeps the zero-runtime-dependency guarantee, which pulling in a diff
 * library would not.
 *
 * Each side is highlighted with its own language pass rather than the whole
 * diff being highlighted at once. A patch is not valid source in any language,
 * so highlighting it wholesale produces garbage.
 */
const styles = css`
	:host {
		display: block;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--color-neutral-0);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	:host([is-hidden]) {
		display: none;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.5rem 0.875rem;
		border-bottom: 1px solid var(--border);
		background: var(--color-neutral-1);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}

	.filename {
		color: var(--foreground);
	}

	.tally {
		display: flex;
		gap: 0.625rem;
	}

	.added-count {
		color: var(--success);
	}

	.removed-count {
		color: var(--destructive);
	}

	.scroll {
		overflow-x: auto;
	}

	.rows {
		display: table;
		min-width: 100%;
		font-size: var(--font-size-small);
		line-height: 1.6;
	}

	.row {
		display: table-row;
	}

	.sign,
	.text {
		display: table-cell;
		white-space: pre;
		padding: 0 0.25rem;
	}

	.sign {
		width: 1.5rem;
		padding-left: 0.875rem;
		text-align: center;
		color: var(--muted-foreground);
		user-select: none;
		opacity: 0.6;
	}

	.text {
		padding-right: 1rem;
		color: var(--foreground);
	}

	/* Table rows cannot carry a visible background — it sits behind the cells
	   — so the tint goes on both cells of the row. */
	.row.is-added .sign,
	.row.is-added .text {
		background: color-mix(in oklch, var(--success) 12%, transparent);
	}

	.row.is-added .sign {
		color: var(--success);
		opacity: 1;
	}

	.row.is-removed .sign,
	.row.is-removed .text {
		background: color-mix(in oklch, var(--destructive) 12%, transparent);
	}

	.row.is-removed .sign {
		color: var(--destructive);
		opacity: 1;
	}

	.row.is-meta .text {
		color: var(--muted-foreground);
		font-style: italic;
	}

	/* Split view. The gap between panes is a real border rather than a gutter,
	   so a long line scrolling under it still reads as two documents. */
	.split {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.split .pane + .pane {
		border-left: 1px solid var(--border);
	}

	.pane {
		min-width: 0;
		overflow-x: auto;
	}

	.pane-label {
		padding: 0.375rem 0.875rem;
		border-bottom: 1px solid var(--border);
		background: var(--color-neutral-1);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}

	@media (max-width: 48rem) {
		.split {
			grid-template-columns: 1fr;
		}

		.split .pane + .pane {
			border-left: 0;
			border-top: 1px solid var(--border);
		}
	}
`

const CHANGE_KINDS = {
	added: 'added',
	removed: 'removed',
	same: 'same',
	meta: 'meta'
} as const

type ChangeKindT = (typeof CHANGE_KINDS)[keyof typeof CHANGE_KINDS]

type DiffRowT = {
	kind: ChangeKindT
	text: string
}

const splitLines = (value?: string): string[] => {
	if (!value) return []
	return value.replace(/\n$/, '').split('\n')
}

// A patch already knows what changed; the leading character says which.
const readPatchRows = (patch: string): DiffRowT[] => {
	const rows: DiffRowT[] = []

	for (const line of splitLines(patch)) {
		const marker = line.charAt(0)

		if (marker === '+') rows.push({ kind: CHANGE_KINDS.added, text: line.slice(1) })
		else if (marker === '-') rows.push({ kind: CHANGE_KINDS.removed, text: line.slice(1) })
		else if (marker === '@') rows.push({ kind: CHANGE_KINDS.meta, text: line })
		else rows.push({ kind: CHANGE_KINDS.same, text: line.replace(/^ /, '') })
	}

	return rows
}

const buildDescendingIndexes = (length: number): number[] => {
	const indexes = Array.from({ length }, (unused, index) => index)
	return indexes.reverse()
}

/*
 * Longest common subsequence over lines. The table is (before × after) cells
 * of a single number each, which is affordable for a snippet and would not be
 * for a file — this element documents changes, it does not review them.
 *
 * Filled from the bottom-right corner backwards, so each cell only ever reads
 * cells that are already final.
 */
const buildLcsTable = (before: string[], after: string[]): number[][] => {
	const table = Array.from({ length: before.length + 1 }, () => new Array(after.length + 1).fill(0))

	for (const row of buildDescendingIndexes(before.length)) {
		for (const column of buildDescendingIndexes(after.length)) {
			const isMatch = before[row] === after[column]
			const matchScore = table[row + 1][column + 1] + 1
			const skipScore = Math.max(table[row + 1][column], table[row][column + 1])
			table[row][column] = isMatch ? matchScore : skipScore
		}
	}

	return table
}

type WalkStateT = {
	before: string[]
	after: string[]
	table: number[][]
	rows: DiffRowT[]
}

const appendTail = (lines: string[], fromIndex: number, kind: ChangeKindT, rows: DiffRowT[]): void => {
	for (const line of lines.slice(fromIndex)) {
		rows.push({ kind, text: line })
	}
}

/*
 * Walks the table forwards: take a match when there is one, otherwise follow
 * whichever direction keeps more lines. Recursive rather than a loop with two
 * moving cursors — the recursion depth is the line count, which is the same
 * bound the table already accepts.
 */
const walkDiff = (state: WalkStateT, beforeIndex: number, afterIndex: number): void => {
	const isBeforeExhausted = beforeIndex >= state.before.length
	if (isBeforeExhausted) return appendTail(state.after, afterIndex, CHANGE_KINDS.added, state.rows)

	const isAfterExhausted = afterIndex >= state.after.length
	if (isAfterExhausted) return appendTail(state.before, beforeIndex, CHANGE_KINDS.removed, state.rows)

	const isMatch = state.before[beforeIndex] === state.after[afterIndex]
	if (isMatch) {
		state.rows.push({ kind: CHANGE_KINDS.same, text: state.before[beforeIndex] })
		return walkDiff(state, beforeIndex + 1, afterIndex + 1)
	}

	const shouldDropBefore = state.table[beforeIndex + 1][afterIndex] >= state.table[beforeIndex][afterIndex + 1]
	if (shouldDropBefore) {
		state.rows.push({ kind: CHANGE_KINDS.removed, text: state.before[beforeIndex] })
		return walkDiff(state, beforeIndex + 1, afterIndex)
	}

	state.rows.push({ kind: CHANGE_KINDS.added, text: state.after[afterIndex] })
	return walkDiff(state, beforeIndex, afterIndex + 1)
}

const buildDiffRows = (before: string[], after: string[]): DiffRowT[] => {
	const rows: DiffRowT[] = []
	const table = buildLcsTable(before, after)

	walkDiff({ before, after, table, rows }, 0, 0)
	return rows
}

const SIGNS: Record<string, string> = {
	added: '+',
	removed: '-',
	same: ' ',
	meta: ' '
}

const countKind = (rows: DiffRowT[], kind: ChangeKindT): number => {
	let total = 0
	for (const row of rows) {
		if (row.kind === kind) total += 1
	}
	return total
}

export const ZDiff = c(
	(props) => {
		const language = props.language as string | undefined

		const rows = useMemo(() => {
			const patch = props.patch as string | undefined
			if (patch) return readPatchRows(patch)

			return buildDiffRows(splitLines(props.before as string), splitLines(props.after as string))
		}, [props.patch, props.before, props.after])

		const addedCount = countKind(rows, CHANGE_KINDS.added)
		const removedCount = countKind(rows, CHANGE_KINDS.removed)

		const renderToken = (token: Token, key: number) => {
			if (!token.className) return token.value
			return (
				<span class={token.className} key={key}>
					{token.value}
				</span>
			)
		}

		// Highlighted per line rather than per document: the row is the unit
		// that carries a background, so it has to be its own element.
		const renderText = (text: string) => {
			const hasText = text.length > 0
			if (!hasText) return ' '

			const tokens = highlight(text, language)
			return tokens.map(renderToken)
		}

		const renderRow = (row: DiffRowT, key: number) => {
			const rowClass = `row is-${row.kind}`

			return (
				<div class={rowClass} key={key}>
					<span class='sign' aria-hidden='true'>
						{SIGNS[row.kind]}
					</span>
					<span class='text'>{renderText(row.text)}</span>
				</div>
			)
		}

		const buildPane = (label: string, keptKind: ChangeKindT) => {
			const paneRows = rows.filter((row) => row.kind === CHANGE_KINDS.same || row.kind === keptKind)

			return (
				<div class='pane'>
					<p class='pane-label'>{label}</p>
					<div class='rows'>{paneRows.map(renderRow)}</div>
				</div>
			)
		}

		const isSplit = props.view === 'split'
		const filename = props.filename as string | undefined
		const showHead = Boolean(filename) || rows.length > 0

		return (
			<host shadowDom>
				{showHead && (
					<div class='head'>
						<span class='filename'>{filename || ''}</span>
						<span class='tally'>
							<span class='added-count'>+{addedCount}</span>
							<span class='removed-count'>−{removedCount}</span>
						</span>
					</div>
				)}

				{isSplit ? (
					<div class='split'>
						{buildPane(props.beforeLabel as string || 'Before', CHANGE_KINDS.removed)}
						{buildPane(props.afterLabel as string || 'After', CHANGE_KINDS.added)}
					</div>
				) : (
					<div class='scroll'>
						<div class='rows'>{rows.map(renderRow)}</div>
					</div>
				)}
			</host>
		)
	},
	{
		props: {
			before: { type: String },
			after: { type: String },
			patch: { type: String },
			language: { type: String, reflect: true },
			filename: { type: String, reflect: true },
			view: { type: String, reflect: true },
			beforeLabel: { type: String, reflect: true },
			afterLabel: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-diff', ZDiff)
