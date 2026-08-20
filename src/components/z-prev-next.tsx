import { defineElement } from '../shared/define-element'
import { c, css, event } from 'atomico'

/*
 * z-prev-next — the footer pager at the bottom of a documentation page.
 *
 *   el.previous = { label: 'z-checkbox', route: '/c/forms/z-checkbox' }
 *   el.next = { label: 'z-select', route: '/c/forms/z-select' }
 *
 * Two cards that read as a pair: previous points left and sits left, next
 * points right and sits right, and a missing side leaves its space rather
 * than letting the other card drift into the middle. A reader at the end of a
 * page should be able to find the next one without moving their eyes back to
 * the nav.
 *
 * Router-agnostic, the same way z-nav-tree is: these are real anchors, the
 * click is never intercepted, and `navigate` is a notification rather than
 * the navigation itself.
 */
const styles = css`
	:host {
		display: block;
		margin-top: var(--space-2xl);
		padding-top: var(--space-lg);
		border-top: 1px solid var(--border);
	}

	:host([is-hidden]) {
		display: none;
	}

	.pager {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-base);
	}

	/* An absent side still holds its column, so the surviving card stays on
	   its own side instead of sliding to the middle of the page. */
	.slot-empty {
		display: block;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		box-sizing: border-box;
		padding: var(--space-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--material-surface);
		color: var(--foreground);
		text-decoration: none;
		transition: border-color 0.12s ease;
	}

	.card:hover {
		border-color: color-mix(in oklch, var(--foreground) 50%, transparent);
	}

	.card:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.card.is-next {
		align-items: flex-end;
		text-align: right;
	}

	.direction {
		font-size: var(--font-size-caption);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.label {
		font-size: var(--font-size-body);
		font-weight: var(--font-weight-medium);
		line-height: 1.4;
	}

	@media (max-width: 40rem) {
		.pager {
			grid-template-columns: 1fr;
		}

		.card.is-next {
			align-items: flex-start;
			text-align: left;
		}
	}
`

type PagerLinkT = {
	label: string
	route?: string
	href?: string
}

const readLink = (value: unknown): PagerLinkT | null => {
	const hasShape = value && typeof (value as PagerLinkT).label === 'string'
	if (!hasShape) return null
	return value as PagerLinkT
}

export const ZPrevNext = c(
	(props) => {
		const previous = readLink(props.previous)
		const next = readLink(props.next)

		const previousLabel = (props.previousLabel as string) || 'Previous'
		const nextLabel = (props.nextLabel as string) || 'Next'

		const buildCard = (link: PagerLinkT, directionLabel: string, isNext: boolean) => {
			const href = link.href || link.route || '#'
			const cardClass = isNext ? 'card is-next' : 'card'

			return (
				<a class={cardClass} href={href} onclick={() => props.navigate({ route: link.route || href })}>
					<span class='direction'>{directionLabel}</span>
					<span class='label'>{link.label}</span>
				</a>
			)
		}

		const hasEither = Boolean(previous || next)
		if (!hasEither) return <host shadowDom></host>

		return (
			<host shadowDom>
				<nav class='pager' aria-label='Pagination'>
					{previous ? buildCard(previous, previousLabel, false) : <span class='slot-empty' />}
					{next ? buildCard(next, nextLabel, true) : <span class='slot-empty' />}
				</nav>
			</host>
		)
	},
	{
		props: {
			previous: { type: Object },
			next: { type: Object },
			previousLabel: { type: String, reflect: true },
			nextLabel: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			navigate: event<{ route: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-prev-next', ZPrevNext)
