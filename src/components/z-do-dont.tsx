import { c, css } from 'atomico'

/*
 * z-do-dont — paired guidance, correct beside incorrect.
 *
 *   <z-do-dont do-caption="Use one primary action per view."
 *              dont-caption="Two primaries make neither one primary.">
 *     <z-button slot="do" accent="dom">Save</z-button>
 *     <div slot="dont">…</div>
 *   </z-do-dont>
 *
 * One element with two slots rather than two sibling cards, because the
 * pairing *is* the content. A "do" card alone is just an example; it only
 * teaches when the thing it is not sits next to it, and separate elements
 * make it possible to ship half the lesson.
 *
 * Each side takes real DOM, so the correct and incorrect cases are live
 * components rather than screenshots — which also means they cannot drift
 * from the library the way a picture would.
 *
 * The affordance is deliberately redundant: colour, an icon, and a word. The
 * whole point of this element is a judgement a reader has to get right at a
 * glance, and colour alone fails roughly one man in twelve.
 */
const styles = css`
	:host {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: var(--space-base);
	}

	:host([is-hidden]) {
		display: none;
	}

	.cell {
		display: flex;
		flex-direction: column;
		min-width: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	/* The stage is the neutral part — the verdict lives on the label band, so
	   a green wash never makes the example itself look like a success state. */
	.stage {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-lg) var(--space-base);
		min-height: 4rem;
		background: var(--material-surface);
	}

	:host([layout='center']) .stage {
		justify-content: center;
	}

	.verdict {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: var(--space-sm) var(--space-base);
		border-top: 1px solid var(--border);
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.cell.is-do .verdict {
		color: var(--success);
		background: color-mix(in oklch, var(--success) 8%, transparent);
	}

	.cell.is-dont .verdict {
		color: var(--destructive);
		background: color-mix(in oklch, var(--destructive) 8%, transparent);
	}

	.glyph {
		width: 0.875rem;
		height: 0.875rem;
		flex-shrink: 0;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		fill: none;
	}

	.caption {
		padding: var(--space-sm) var(--space-base) var(--space-base);
		border-top: 1px solid var(--border);
		font-size: var(--font-size-small);
		line-height: 1.5;
		color: var(--muted-foreground);
	}
`

const CHECK_ICON = (
	<svg class='glyph' viewBox='0 0 24 24' aria-hidden='true'>
		<polyline points='5 13 10 18 19 6' />
	</svg>
)

const CROSS_ICON = (
	<svg class='glyph' viewBox='0 0 24 24' aria-hidden='true'>
		<line x1='6' y1='6' x2='18' y2='18' />
		<line x1='18' y1='6' x2='6' y2='18' />
	</svg>
)

export const ZDoDont = c(
	(props) => {
		const doLabel = (props.doLabel as string) || 'Do'
		const dontLabel = (props.dontLabel as string) || "Don't"

		const doCaption = props.doCaption as string | undefined
		const dontCaption = props.dontCaption as string | undefined

		return (
			<host shadowDom>
				<div class='cell is-do'>
					<div class='stage'>
						<slot name='do' />
					</div>
					<p class='verdict'>
						{CHECK_ICON}
						{doLabel}
					</p>
					{doCaption && <p class='caption'>{doCaption}</p>}
				</div>

				<div class='cell is-dont'>
					<div class='stage'>
						<slot name='dont' />
					</div>
					<p class='verdict'>
						{CROSS_ICON}
						{dontLabel}
					</p>
					{dontCaption && <p class='caption'>{dontCaption}</p>}
				</div>
			</host>
		)
	},
	{
		props: {
			doLabel: { type: String, reflect: true },
			dontLabel: { type: String, reflect: true },
			doCaption: { type: String, reflect: true },
			dontCaption: { type: String, reflect: true },
			layout: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-do-dont', ZDoDont)
