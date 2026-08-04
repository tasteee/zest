import { c, css } from 'atomico'

/*
 * z-external-link — a link that leaves the site, and says so.
 *
 *   <z-external-link href="https://developer.mozilla.org" label="MDN"></z-external-link>
 *
 * The arrow is the point. A reader deciding whether to click deserves to know
 * they are about to lose their place, and finding that out after the fact is
 * the annoying way to learn it.
 *
 * `rel` is hardened rather than left to the author. `target="_blank"` without
 * `noopener` hands the opened page a live reference to this one through
 * `window.opener`, which is a real and unnecessary exposure. Every consumer
 * would have to remember; this remembers for them.
 */
const styles = css`
	:host {
		display: inline;
	}

	:host([is-hidden]) {
		display: none;
	}

	a {
		display: inline;
		color: var(--purple);
		text-decoration: none;
		border-bottom: 1px solid color-mix(in oklch, var(--purple) 40%, transparent);
		transition: border-color 0.12s ease;
	}

	a:hover {
		border-bottom-color: var(--purple);
	}

	a:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	/* The arrow rides in the text flow rather than being absolutely placed, so
	   it wraps with the last word instead of stranding itself on a new line. */
	.arrow {
		display: inline-block;
		width: 0.7em;
		height: 0.7em;
		margin-left: 0.15em;
		vertical-align: baseline;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		fill: none;
	}
`

export const ZExternalLink = c(
	(props) => {
		const href = (props.href as string) || '#'
		const isSameTab = Boolean(props.isSameTab)

		const target = isSameTab ? undefined : '_blank'
		const rel = isSameTab ? 'noreferrer' : 'noopener noreferrer'

		return (
			<host shadowDom>
				<a href={href} target={target} rel={rel}>
					{props.label ? props.label : <slot />}
					<svg class='arrow' viewBox='0 0 24 24' aria-hidden='true'>
						<path d='M7 17 17 7' />
						<path d='M9 7h8v8' />
					</svg>
				</a>
			</host>
		)
	},
	{
		props: {
			href: { type: String, reflect: true },
			label: { type: String, reflect: true },
			isSameTab: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-external-link', ZExternalLink)
