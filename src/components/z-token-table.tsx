import { c, css } from 'atomico'

/*
 * z-token-table — a group of z-swatch, laid out as a scannable scale.
 *
 *   table.tokens = ['--space-xs', '--space-sm', '--space-md']
 *   table.tokens = [{ name: '--purple', description: 'The dominant accent.' }]
 *
 * For a library whose entire premise is that you never hardcode a colour, a
 * spacing, or a radius, the token reference is the most load-bearing page in
 * the docs. It was also, until this element, the one page that did not exist.
 *
 * `names` is the same list as a plain attribute, which is what lets a token
 * table appear in hand-written HTML and in markdown docs — an array property
 * needs a script, and the pages that most want a token table are the ones
 * with no script.
 *
 *   <z-token-table names="--space-xs --space-sm --space-md"></z-token-table>
 *
 * The columns collapse on their own rather than at a breakpoint, because the
 * useful width of a swatch depends on its kind — a colour ramp wants many
 * narrow columns, a font-family list wants one wide one.
 */
const styles = css`
	:host {
		display: block;
	}

	:host([is-hidden]) {
		display: none;
	}

	.caption {
		margin: 0 0 var(--space-sm);
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--token-table-min-column, 15rem), 1fr));
		gap: 0.125rem;
	}

	:host([columns='1']) .grid {
		grid-template-columns: 1fr;
	}

	.empty {
		padding: var(--space-base);
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
	}
`

type TokenEntryT = {
	name: string
	label?: string
	description?: string
	kind?: string
}

// Both spellings are accepted because a colour ramp is a bare list of names
// and a curated table wants a sentence per row. Making authors pick one shape
// for every table would make the common case verbose.
const readTokens = (value: unknown): TokenEntryT[] => {
	if (!Array.isArray(value)) return []

	const entries: TokenEntryT[] = []
	for (const entry of value) {
		const isName = typeof entry === 'string'
		if (isName) {
			entries.push({ name: entry })
			continue
		}

		const hasName = entry && typeof entry.name === 'string'
		if (hasName) entries.push(entry as TokenEntryT)
	}
	return entries
}

// Space- or comma-separated, so both read naturally in an attribute.
const readTokenNames = (value?: string): TokenEntryT[] => {
	if (!value) return []

	const names = value.split(/[\s,]+/).filter((name) => name.length > 0)
	return names.map((name) => ({ name }))
}

export const ZTokenTable = c(
	(props) => {
		const authoredTokens = readTokens(props.tokens)
		const namedTokens = readTokenNames(props.names as string)
		const tokens = authoredTokens.length > 0 ? authoredTokens : namedTokens
		const kind = props.kind as string | undefined
		const caption = props.caption as string | undefined

		const hasTokens = tokens.length > 0
		if (!hasTokens) {
			return (
				<host shadowDom>
					<p class='empty'>No tokens.</p>
				</host>
			)
		}

		return (
			<host shadowDom>
				{caption && <p class='caption'>{caption}</p>}
				<div class='grid'>
					{tokens.map((entry) => (
						<z-swatch
							key={entry.name}
							token={entry.name}
							kind={entry.kind || kind}
							label={entry.label}
							description={entry.description}
						/>
					))}
				</div>
			</host>
		)
	},
	{
		props: {
			tokens: { type: Array },
			names: { type: String, reflect: true },
			kind: { type: String, reflect: true },
			caption: { type: String, reflect: true },
			columns: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-token-table', ZTokenTable)
