import { defineElement } from '../shared/define-element'
import { interactionStyles } from '../shared/interaction-styles'
import { c, css, event } from 'atomico'
import { themedScrollbarStyles } from '../shared/scrollbar-styles'
import { useLocale } from '../shared/locale'

/*
 * z-table, a data table driven by `columns` and `rows` properties:
 *   el.columns = [{ key, label, align?, isMono? }]
 *   el.rows    = [{ id?, ... }]
 * Header is uppercase, tracked, muted. Rows are separated by hairline borders
 * and tint softly on hover. Borders over fills, no shadows, no zebra unless
 * is-striped is set. With `is-clickable`, each row is in the tab order and
 * Enter or Space fires `rowclick`, the same as a click.
 */
const styles = css`
	:host {
		display: block;
		width: 100%;
	}

	:host([is-hidden]) {
		display: none;
	}

	.wrap {
		width: 100%;
		overflow-x: auto;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-family: inherit;
	}

	thead th {
		text-align: start;
		padding: var(--space-3-5) var(--space-5);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-secondary);
		border-bottom: 1px solid var(--border-default);
		white-space: nowrap;
	}

	tbody td {
		padding: var(--space-4) var(--space-5);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		border-bottom: 1px solid var(--border-default);
		vertical-align: middle;
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	:host([is-clickable]) tbody tr {
		cursor: pointer;
	}

	tbody tr {
		transition: background-color var(--motion-instant) var(--ease-enter);
	}
	tbody tr:hover {
		background: color-mix(in oklch, var(--text-primary) 4%, transparent);
	}

	:host([is-striped]) tbody tr:nth-child(even) {
		background: color-mix(in oklch, var(--text-primary) 3%, transparent);
	}

	.align-end {
		text-align: end;
	}
	.align-center {
		text-align: center;
	}
	.is-mono {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
	}

	tbody tr:focus-visible {
		outline: 3px solid var(--border-focus);
		outline-offset: -3px;
	}

	.empty {
		padding: var(--space-10);
		text-align: center;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
	}
`

type ColumnT = { key: string; label: string; align?: 'start' | 'center' | 'end'; isMono?: boolean }
type RowT = Record<string, unknown> & { id?: string | number }

export const ZTable = c(
	(props) => {
		const t = useLocale()
		const columns: ColumnT[] = Array.isArray(props.columns) ? (props.columns as ColumnT[]) : []
		const rows: RowT[] = Array.isArray(props.rows) ? (props.rows as RowT[]) : []

		const cellClass = (col: ColumnT) =>
			[col.align ? `align-${col.align}` : '', col.isMono ? 'is-mono' : ''].filter(Boolean).join(' ') || undefined

		return (
			<host shadowDom>
				<div class="wrap">
					<table>
						<thead>
							<tr>
								{columns.map((col) => (
									<th key={col.key} class={col.align ? `align-${col.align}` : undefined}>
										{col.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.length === 0 ? (
								<tr>
									<td class="empty" colspan={String(columns.length || 1)}>
										{props.emptyLabel || t('noData')}
									</td>
								</tr>
							) : (
								rows.map((row, index) => (
									<tr
										key={(row.id as any) ?? index}
										tabindex={props.isClickable ? '0' : undefined}
										onclick={() => props.isClickable && props.rowclick({ row, index })}
										onkeydown={(e: KeyboardEvent) => {
											if (!props.isClickable || (e.key !== 'Enter' && e.key !== ' ')) return
											e.preventDefault()
											props.rowclick({ row, index })
										}}
									>
										{columns.map((col) => (
											<td key={col.key} class={cellClass(col)}>
												{String(row[col.key] ?? '')}
											</td>
										))}
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</host>
		)
	},
	{
		props: {
			columns: { type: Array },
			rows: { type: Array },
			emptyLabel: String,
			isStriped: { type: Boolean, reflect: true },
			isClickable: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			rowclick: event<{ row: RowT; index: number }>({ bubbles: true, composed: true })
		},
		styles: [themedScrollbarStyles, styles, interactionStyles]
	}
)

defineElement('z-table', ZTable)
