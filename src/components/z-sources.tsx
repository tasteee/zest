import { defineElement } from '../shared/define-element'
import { c, css, event } from 'atomico'

/*
 * z-sources, the grounding references shown under an AI answer: a labeled list
 * of source cards (index, title, domain, optional snippet). Pairs with inline
 * z-citation markers. Data-driven:
 *
 *   el.sources = [{ title, url, snippet }, …]
 *
 * Clicking a card emits `select` {index, url}.
 */
type Source = { title?: string; url?: string; snippet?: string }

const domain = (url?: string) => {
	if (!url) return ''
	try {
		return new URL(url).hostname.replace(/^www\./, '')
	} catch {
		return url
	}
}

const styles = css`
	:host {
		display: block;
	}
	:host([is-hidden]) {
		display: none;
	}
	.label {
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-bold);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--text-secondary);
		margin-bottom: var(--space-2);
	}
	.list {
		display: grid;
		gap: var(--space-2);
	}
	:host([columns]) .list {
		grid-template-columns: repeat(var(--cols, 2), minmax(0, 1fr));
	}
	.card {
		display: block;
		text-align: start;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background: var(--surface-default);
		padding: var(--space-2) var(--space-2-5);
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}
	.card:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
		background: color-mix(in oklch, var(--text-primary) 3%, var(--surface-default));
	}
	.top {
		display: flex;
		align-items: center;
		gap: var(--space-1-5);
	}
	.idx {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.1rem;
		height: 1.1rem;
		padding: 0 var(--space-1);
		box-sizing: border-box;
		border-radius: 0.35rem;
		background: color-mix(in oklch, var(--accent-primary) 16%, transparent);
		color: var(--text-primary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-bold);
	}
	.title {
		flex: 1;
		min-width: 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.domain {
		flex: 0 0 auto;
		font-size: var(--font-size-2xs);
		color: var(--text-secondary);
	}
	.snippet {
		margin-top: var(--space-1);
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
`

export const ZSources = c(
	(props) => {
		const sources: Source[] = Array.isArray(props.sources) ? (props.sources as Source[]) : []

		return (
			<host shadowDom style={props.columns ? { '--cols': String(props.columns) } : undefined}>
				<div class="label">{props.label || 'Sources'}</div>
				<div class="list">
					{sources.map((s, i) => (
						<a
							key={i}
							class="card"
							href={s.url || '#'}
							target={s.url ? '_blank' : undefined}
							rel={s.url ? 'noopener noreferrer' : undefined}
							onclick={() => props.select({ index: i, url: s.url })}
						>
							<span class="top">
								<span class="idx">{i + 1}</span>
								<span class="title">{s.title || domain(s.url)}</span>
								<span class="domain">{domain(s.url)}</span>
							</span>
							{s.snippet && <span class="snippet">{s.snippet}</span>}
						</a>
					))}
				</div>
			</host>
		)
	},
	{
		props: {
			sources: { type: Array },
			label: { type: String, reflect: true },
			columns: { type: Number, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			select: event<{ index: number; url?: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-sources', ZSources)
