import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-edit-on-github — the "fix this page" link at the foot of a doc.
 *
 *   <z-edit-on-github repo="tasteee/zest" path="docs/forms/z-input.md"></z-edit-on-github>
 *
 * The URL is built from a repo and a path rather than authored per page,
 * because ~150 pages hand-writing their own blob URL is ~150 chances to point
 * at the wrong branch. `href` overrides for the odd page that lives elsewhere.
 *
 * Composes z-external-link, so the arrow, the rel hardening and the new-tab
 * behaviour are not restated here.
 */
const styles = css`
	:host {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}

	:host([is-hidden]) {
		display: none;
	}

	.glyph {
		width: 0.875rem;
		height: 0.875rem;
		flex-shrink: 0;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
`

const buildEditUrl = (repo: string, path: string, branch: string): string => {
	const cleanPath = path.replace(/^\//, '')
	return `https://github.com/${repo}/edit/${branch}/${cleanPath}`
}

export const ZEditOnGithub = c(
	(props) => {
		const repo = (props.repo as string) || ''
		const path = (props.path as string) || ''
		const branch = (props.branch as string) || 'main'

		const declaredHref = props.href as string | undefined
		const canBuildUrl = Boolean(repo && path)

		const href = declaredHref || (canBuildUrl ? buildEditUrl(repo, path, branch) : '')
		if (!href) return <host shadowDom></host>

		return (
			<host shadowDom>
				<svg class='glyph' viewBox='0 0 24 24' aria-hidden='true'>
					<path d='M12 20h9' />
					<path d='M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z' />
				</svg>
				<z-external-link href={href} label={(props.label as string) || 'Edit this page'} />
			</host>
		)
	},
	{
		props: {
			repo: { type: String, reflect: true },
			path: { type: String, reflect: true },
			branch: { type: String, reflect: true },
			href: { type: String, reflect: true },
			label: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-edit-on-github', ZEditOnGithub)
