import { c, css } from 'atomico'

/*
 * z-file-tree — a directory illustration.
 *
 *   <z-file-tree paths="src/
 *                       src/components/z-button.tsx  the element
 *                       src/index.ts"></z-file-tree>
 *
 * Presentational, not interactive. z-tree renders ARIA treeitems, handles
 * selection and keyboard navigation, and expects to be operated — all of which
 * is wrong for a picture of a folder in a README. Nothing here is selectable,
 * nothing collapses, and the guides always show, because the point is to be
 * read rather than used.
 *
 * The indented-text form is the primary API for the same reason z-token-table
 * has `names`: the pages that most want a file tree are markdown pages with no
 * script, and an array property needs one. Indentation is by two spaces or a
 * tab; a trailing double-space starts an annotation.
 *
 * A trailing slash means directory. That is the convention every terminal
 * already uses, so it needs no explaining.
 */
const styles = css`
	:host {
		display: block;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--color-neutral-0);
		padding: var(--space-base);
		font-family: var(--font-mono);
		font-size: var(--font-size-small);
		line-height: 1.7;
	}

	:host([is-hidden]) {
		display: none;
	}

	.row {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		white-space: pre;
	}

	/* One rail per level of depth, drawn as a fixed-width span rather than a
	   border on a nested box — the rows are siblings, not nested elements, so
	   there is nothing to hang a border on. */
	.rails {
		flex-shrink: 0;
		color: var(--border);
		user-select: none;
	}

	.icon {
		flex-shrink: 0;
		width: 1rem;
		text-align: center;
		color: var(--muted-foreground);
	}

	.name {
		color: var(--foreground);
	}

	.row.is-directory .name {
		color: var(--purple);
	}

	.row.is-highlighted .name {
		color: var(--foreground);
		background: color-mix(in oklch, var(--purple) 16%, transparent);
		border-radius: var(--radius-sm);
		padding: 0 0.25rem;
		margin: 0 -0.25rem;
	}

	/* The annotation is the one thing here that is prose, so it drops the
	   monospace and the alignment along with it. */
	.note {
		flex: 1;
		min-width: 0;
		font-family: var(--font-sans, inherit);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
		white-space: normal;
	}
`

type FileRowT = {
	depth: number
	name: string
	note?: string
	isDirectory: boolean
	isHighlighted: boolean
}

const DIRECTORY_ICON = '▸'
const FILE_ICON = '·'

const countIndent = (line: string): number => {
	const leading = line.match(/^[\t ]*/)
	if (!leading) return 0

	const spaces = leading[0].replace(/\t/g, '  ')
	return Math.floor(spaces.length / 2)
}

// A doubled space after the name opens an annotation — the same convention a
// comment column uses in a terminal listing.
const splitNameAndNote = (text: string): { name: string; note?: string } => {
	const separatorIndex = text.indexOf('  ')
	const hasNote = separatorIndex > 0
	if (!hasNote) return { name: text.trim() }

	return { name: text.slice(0, separatorIndex).trim(), note: text.slice(separatorIndex).trim() }
}

const readRow = (line: string): FileRowT | null => {
	const hasContent = line.trim().length > 0
	if (!hasContent) return null

	const depth = countIndent(line)
	const parsed = splitNameAndNote(line.trim())

	// A leading * marks the row the surrounding prose is about.
	const isHighlighted = parsed.name.startsWith('*')
	const name = isHighlighted ? parsed.name.slice(1).trim() : parsed.name

	return {
		depth,
		name,
		note: parsed.note,
		isDirectory: name.endsWith('/'),
		isHighlighted
	}
}

const readPaths = (value?: string): FileRowT[] => {
	if (!value) return []

	const rows: FileRowT[] = []
	for (const line of value.split('\n')) {
		const row = readRow(line)
		if (row) rows.push(row)
	}
	return rows
}

const readEntries = (value: unknown): FileRowT[] => {
	if (!Array.isArray(value)) return []

	const rows: FileRowT[] = []
	for (const entry of value) {
		const hasName = entry && typeof entry.name === 'string'
		if (!hasName) continue

		rows.push({
			depth: Number(entry.depth) || 0,
			name: entry.name,
			note: entry.note,
			isDirectory: Boolean(entry.isDirectory) || entry.name.endsWith('/'),
			isHighlighted: Boolean(entry.isHighlighted)
		})
	}
	return rows
}

const buildRails = (depth: number): string => {
	const segments = Array.from({ length: depth }, () => '│  ')
	return segments.join('')
}

export const ZFileTree = c(
	(props) => {
		const authored = readEntries(props.entries)
		const parsed = readPaths(props.paths as string)
		const rows = authored.length > 0 ? authored : parsed

		const hasRows = rows.length > 0
		if (!hasRows) return <host shadowDom></host>

		return (
			<host shadowDom>
				{rows.map((row, index) => {
					const rowClass = ['row', row.isDirectory ? 'is-directory' : '', row.isHighlighted ? 'is-highlighted' : '']
						.filter(Boolean)
						.join(' ')

					return (
						<div class={rowClass} key={index}>
							<span class='rails' aria-hidden='true'>
								{buildRails(row.depth)}
							</span>
							<span class='icon' aria-hidden='true'>
								{row.isDirectory ? DIRECTORY_ICON : FILE_ICON}
							</span>
							<span class='name'>{row.name}</span>
							{row.note && <span class='note'>{row.note}</span>}
						</div>
					)
				})}
			</host>
		)
	},
	{
		props: {
			paths: { type: String },
			entries: { type: Array },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-file-tree', ZFileTree)
