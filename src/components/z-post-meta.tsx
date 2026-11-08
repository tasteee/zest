import { defineElement } from '../shared/define-element'
import { c, css, event } from 'atomico'

/*
 * z-post-meta, the byline block for a blog post: avatar, author name, publish
 * date, and a row of clickable tag chips (the "tag cloud"). Fires `tagclick`
 * with the tag value so the page can route to a filtered post list, this
 * component only renders, it doesn't know about routing.
 */
const styles = css`
	:host {
		display: block;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.avatar {
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 999px;
		overflow: hidden;
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--tone) 22%, var(--surface-default));
		color: color-mix(in oklch, var(--tone) 85%, var(--text-strong));
		font-size: var(--font-size-2xs);
		font-weight: 600;
		font-family: inherit;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.name {
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--text-primary);
	}

	.sep {
		width: 3px;
		height: 3px;
		border-radius: 999px;
		background: var(--text-secondary);
		flex-shrink: 0;
	}

	.date {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.875rem;
	}

	.tag {
		display: inline-flex;
		align-items: center;
		font-family: inherit;
		font-size: var(--font-size-sm);
		font-weight: 500;
		line-height: 1;
		border: 1px solid var(--border-default);
		border-radius: 999px;
		background: transparent;
		color: var(--text-secondary);
		padding: 0.375rem 0.75rem;
		cursor: pointer;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
	}

	.tag:hover {
		border-color: color-mix(in oklch, var(--tone) 50%, transparent);
		color: var(--text-primary);
	}

	.tag:focus-visible {
		outline: 3px solid var(--border-focus);
		outline-offset: 2px;
	}
`

const getInitials = (name: string): string => {
	const parts = name.trim().split(/\s+/)
	if (!parts[0]) return '?'
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const ZPostMeta = c(
	(props) => {
		const tags: string[] = Array.isArray(props.tags) ? (props.tags as string[]) : []
		const name = props.name || ''

		return (
			<host shadowDom>
				<div class="meta">
					<span class="avatar" aria-hidden="true">
						{props.avatarSrc ? <img src={props.avatarSrc} alt="" /> : getInitials(name)}
					</span>
					{name && <span class="name">{name}</span>}
					{props.date && (
						<>
							<span class="sep" />
							<span class="date">{props.date}</span>
						</>
					)}
				</div>
				{tags.length > 0 && (
					<div class="tags">
						{tags.map((tag) => (
							<button type="button" class="tag" key={tag} onclick={() => props.tagclick({ tag })}>
								{tag}
							</button>
						))}
					</div>
				)}
			</host>
		)
	},
	{
		props: {
			name: String,
			avatarSrc: String,
			date: String,
			tags: { type: Array },
			tagclick: event<{ tag: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-post-meta', ZPostMeta)
