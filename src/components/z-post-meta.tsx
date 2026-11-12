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
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.avatar {
		width: 1.75rem;
		height: 1.75rem;
		border-radius: var(--radius-full);
		overflow: hidden;
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--tone) 22%, var(--surface-default));
		color: color-mix(in oklch, var(--tone) 85%, var(--text-strong));
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
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
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
	}

	.sep {
		width: 3px;
		height: 3px;
		border-radius: var(--radius-full);
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
		gap: var(--space-2);
		margin-top: var(--space-3-5);
	}

	.tag {
		display: inline-flex;
		align-items: center;
		font-family: inherit;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-none);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-secondary);
		padding: var(--space-1-5) var(--space-3);
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
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
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
