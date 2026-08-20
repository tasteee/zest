import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'

/*
 * z-doc-header — the page hero for a documentation page.
 *
 *   <z-doc-header
 *     eyebrow="Forms"
 *     heading="z-checkbox"
 *     tagline="A single binary choice."
 *     status="stable"
 *     source-href="https://github.com/tasteee/zest/blob/main/src/components/z-checkbox.tsx"
 *     version-added="0.4.0"
 *     last-updated="2026-07-30"
 *   ></z-doc-header>
 *
 * This exists as one element rather than a composition each page repeats
 * because it is identical across ~150 pages. Repeating the composition means
 * 150 chances to get the order, the gap, or the status colour subtly wrong.
 *
 * `status` is mapped to an accent here rather than being passed one, so
 * "beta" reads the same amber on every page in the site and in every
 * consumer documenting their own system.
 */
const STATUS_ACCENTS: Record<string, string> = {
	stable: 'success',
	beta: 'warning',
	experimental: 'sub',
	new: 'dom',
	deprecated: 'error'
}

const styles = css`
	:host {
		display: block;
		padding-bottom: var(--space-xl);
		border-bottom: 1px solid var(--border);
	}

	:host([is-hidden]) {
		display: none;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	.heading {
		margin: 0;
		font-size: var(--font-size-h1);
		font-weight: var(--font-weight-bold);
		line-height: 1.15;
		color: var(--foreground);
	}

	.tagline {
		margin: 0;
		font-size: var(--font-size-h4);
		line-height: 1.5;
		color: var(--muted-foreground);
	}

	/* The meta row is reference material, not part of the hero's voice — it
	   sits at caption size and only appears when there is something in it. */
	.meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-sm) var(--space-base);
		margin-top: var(--space-xs);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}

	.meta a {
		color: var(--muted-foreground);
		text-decoration: none;
		border-bottom: 1px solid var(--border);
		transition: color 0.12s ease, border-color 0.12s ease;
	}

	.meta a:hover {
		color: var(--foreground);
		border-bottom-color: var(--foreground);
	}

	.meta a:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-left: auto;
	}
`

export const ZDocHeader = c(
	(props) => {
		const status = props.status as string | undefined
		const statusAccent = status ? STATUS_ACCENTS[status] || 'neutral' : 'neutral'

		const sourceHref = props.sourceHref as string | undefined
		const versionAdded = props.versionAdded as string | undefined
		const lastUpdated = props.lastUpdated as string | undefined
		const hasMeta = Boolean(sourceHref || versionAdded || lastUpdated)

		return (
			<host shadowDom>
				<header class='header'>
					{props.eyebrow && <z-eyebrow label={props.eyebrow as string} />}

					<div class='title-row'>
						<h1 class='heading'>{props.heading}</h1>
						{status && <z-badge accent={statusAccent} kind='soft' size='sm' label={status} />}
						<div class='actions'>
							<slot name='actions' />
						</div>
					</div>

					{props.tagline && <p class='tagline'>{props.tagline}</p>}

					{hasMeta && (
						<div class='meta'>
							{versionAdded && <span>Added in v{versionAdded}</span>}
							{lastUpdated && (
								<span>
									Updated <z-relative-time datetime={lastUpdated} />
								</span>
							)}
							{sourceHref && (
								<a href={sourceHref} target='_blank' rel='noreferrer noopener'>
									View source
								</a>
							)}
						</div>
					)}
				</header>
			</host>
		)
	},
	{
		props: {
			eyebrow: { type: String, reflect: true },
			heading: { type: String, reflect: true },
			tagline: { type: String, reflect: true },
			status: { type: String, reflect: true },
			sourceHref: { type: String, reflect: true },
			versionAdded: { type: String, reflect: true },
			lastUpdated: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

defineElement('z-doc-header', ZDocHeader)
