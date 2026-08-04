import { c, css } from 'atomico'

/*
 * z-api-table — the attributes / properties / slots / events / CSS reference.
 *
 *   const table = document.querySelector('z-api-table')
 *   table.kind = 'attributes'
 *   table.rows = [
 *     { name: 'size', type: 'xs | sm | md', defaultValue: 'md', description: 'Control density.' }
 *   ]
 *
 * Not z-table with different columns. A general data grid renders strings into
 * cells; an API reference needs the type column to be typed (see
 * z-type-badge), the description to carry inline code, every row to be
 * deep-linkable, and required and deprecated to read at a glance. Pushing all
 * of that through a generic table means passing it HTML, and a data grid that
 * accepts HTML is not a data grid any more.
 *
 * `kind` picks the column set, so one element covers all five surfaces rather
 * than five near-identical ones.
 */
type ApiRowT = {
	name: string
	type?: string
	detail?: string
	defaultValue?: string
	description?: string
	isRequired?: boolean
	isDeprecated?: boolean
}

type ColumnT = {
	key: keyof ApiRowT
	label: string
}

const COLUMNS_BY_KIND: Record<string, ColumnT[]> = {
	attributes: [
		{ key: 'name', label: 'Attribute' },
		{ key: 'type', label: 'Type' },
		{ key: 'defaultValue', label: 'Default' },
		{ key: 'description', label: 'Description' }
	],
	properties: [
		{ key: 'name', label: 'Property' },
		{ key: 'type', label: 'Type' },
		{ key: 'defaultValue', label: 'Default' },
		{ key: 'description', label: 'Description' }
	],
	slots: [
		{ key: 'name', label: 'Slot' },
		{ key: 'description', label: 'Description' }
	],
	events: [
		{ key: 'name', label: 'Event' },
		{ key: 'detail', label: 'detail' },
		{ key: 'description', label: 'Description' }
	],
	css: [
		{ key: 'name', label: 'Custom property' },
		{ key: 'defaultValue', label: 'Default' },
		{ key: 'description', label: 'Description' }
	]
}

// Doc prose is authored with backtick-delimited inline code, the way it would
// be written in markdown, so the description column has to render it rather
// than print the backticks.
const buildDescription = (text: string) => {
	const segments = text.split('`')

	return segments.map((segment, segmentIndex) => {
		const isCode = segmentIndex % 2 === 1
		if (!isCode) return segment
		return <code class='inline-code'>{segment}</code>
	})
}

const styles = css`
	:host {
		display: block;
	}

	:host([is-hidden]) {
		display: none;
	}

	.scroll {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-small);
	}

	caption {
		margin-bottom: var(--space-sm);
		text-align: left;
		font-size: var(--font-size-caption);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	th {
		padding: 0 var(--space-sm) var(--space-xs);
		border-bottom: 1px solid var(--border);
		text-align: left;
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--muted-foreground);
		white-space: nowrap;
	}

	td {
		padding: var(--space-sm);
		border-bottom: 1px solid var(--border);
		vertical-align: baseline;
		line-height: 1.5;
		color: var(--foreground);
	}

	tr:last-child td {
		border-bottom: 0;
	}

	:host([is-dense]) th,
	:host([is-dense]) td {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}

	/* The name column is the one people scan, so it gets the only real weight
	   in the table and never wraps. */
	.name {
		font-family: var(--font-mono);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		color: var(--foreground);
		text-decoration: none;
	}

	.name:hover {
		color: var(--purple);
	}

	.name:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	/* A default is often a long token, and forcing the row taller to keep it
	   on one line wastes more than the wrap costs. */
	.default {
		font-family: var(--font-mono);
		color: var(--muted-foreground);
		overflow-wrap: anywhere;
	}

	.required {
		margin-left: 0.25rem;
		color: var(--destructive);
	}

	.deprecated {
		text-decoration: line-through;
		opacity: 0.6;
	}

	.inline-code {
		padding: 0.1em 0.35em;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--background-light);
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	.empty {
		padding: var(--space-base);
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
	}
`

const readRows = (value: unknown): ApiRowT[] => {
	if (!Array.isArray(value)) return []

	const rows: ApiRowT[] = []
	for (const entry of value) {
		const hasName = entry && typeof entry.name === 'string'
		if (hasName) rows.push(entry as ApiRowT)
	}
	return rows
}

// An em dash means "no default" in the authored tables and should read as
// absence rather than as a value.
const NO_VALUE_MARKER = '—'

const isPresent = (value?: string): boolean => {
	if (!value) return false
	const trimmed = value.trim()
	return trimmed !== '' && trimmed !== NO_VALUE_MARKER
}

export const ZApiTable = c(
	(props) => {
		const kind = (props.kind as string) || 'attributes'
		const columns = COLUMNS_BY_KIND[kind] || COLUMNS_BY_KIND.attributes
		const rows = readRows(props.rows)
		const caption = props.caption as string | undefined

		const hasRows = rows.length > 0
		if (!hasRows) {
			return (
				<host shadowDom>
					<p class='empty'>Nothing here.</p>
				</host>
			)
		}

		const buildCell = (row: ApiRowT, column: ColumnT) => {
			if (column.key === 'name') {
				const rowId = `${kind}-${row.name}`
				const nameClass = row.isDeprecated ? 'name deprecated' : 'name'

				return (
					<td>
						<a class={nameClass} id={rowId} href={`#${rowId}`}>
							{row.name}
						</a>
						{row.isRequired && (
							<abbr class='required' title='Required'>
								*
							</abbr>
						)}
					</td>
				)
			}

			if (column.key === 'type' || column.key === 'detail') {
				const value = column.key === 'type' ? row.type : row.detail
				if (!isPresent(value)) return <td class='default'>{NO_VALUE_MARKER}</td>
				return (
					<td>
						<z-type-badge value={value} />
					</td>
				)
			}

			if (column.key === 'defaultValue') {
				const value = isPresent(row.defaultValue) ? row.defaultValue : NO_VALUE_MARKER
				return <td class='default'>{value}</td>
			}

			return <td>{buildDescription(row.description || '')}</td>
		}

		return (
			<host shadowDom>
				<div class='scroll'>
					<table>
						{caption && <caption>{caption}</caption>}
						<thead>
							<tr>
								{columns.map((column) => (
									<th key={column.key}>{column.label}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.map((row) => (
								<tr key={row.name}>{columns.map((column) => buildCell(row, column))}</tr>
							))}
						</tbody>
					</table>
				</div>
			</host>
		)
	},
	{
		props: {
			rows: { type: Array },
			kind: { type: String, reflect: true },
			caption: { type: String, reflect: true },
			isDense: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-api-table', ZApiTable)
