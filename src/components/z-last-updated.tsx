import { c, css } from 'atomico'

/*
 * z-last-updated — when a page last changed, and optionally what changed it.
 *
 *   <z-last-updated datetime="2026-07-30" commit="a97d175" repo="tasteee/zest"></z-last-updated>
 *
 * Composes z-relative-time, so "3 days ago" stays correct as the page sits
 * open and the formatting matches every other timestamp in the library.
 *
 * The commit link is optional and appears only with both a `commit` and a
 * `repo` — a short SHA with nowhere to go is noise, not provenance.
 */
const styles = css`
	:host {
		display: inline-flex;
		align-items: baseline;
		gap: 0.375rem;
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}

	:host([is-hidden]) {
		display: none;
	}

	.commit {
		font-family: var(--font-mono);
	}
`

export const ZLastUpdated = c(
	(props) => {
		const datetime = props.datetime as string | undefined
		if (!datetime) return <host shadowDom></host>

		const commit = props.commit as string | undefined
		const repo = props.repo as string | undefined
		const hasCommitLink = Boolean(commit && repo)

		const label = (props.label as string) || 'Updated'
		const commitUrl = hasCommitLink ? `https://github.com/${repo}/commit/${commit}` : ''

		return (
			<host shadowDom>
				<span>{label}</span>
				<z-relative-time datetime={datetime} />
				{hasCommitLink && (
					<span class='commit'>
						<z-external-link href={commitUrl} label={(commit as string).slice(0, 7)} />
					</span>
				)}
			</host>
		)
	},
	{
		props: {
			datetime: { type: String, reflect: true },
			label: { type: String, reflect: true },
			commit: { type: String, reflect: true },
			repo: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-last-updated', ZLastUpdated)
