import { c, css, event, useEffect, useState } from 'atomico'

/*
 * z-announcement-bar — the dismissible strip at the top of a site.
 *
 *   <z-announcement-bar storage-key="zest-v1" accent="dom">
 *     v1 is out. <z-external-link href="/blog/v1">Read the notes</z-external-link>
 *   </z-announcement-bar>
 *
 * Dismissal persists, and the key is the announcement rather than the element:
 * change the message, change the key, and everyone sees it again. A single
 * fixed key would mean a reader who dismissed last quarter's banner never sees
 * another one.
 *
 * Persistence is opt-in. Without a `storage-key` the bar dismisses for the
 * session and returns on reload, which is right for a banner that has not
 * earned permanence.
 *
 * It renders nothing at all until it has checked storage. A banner that
 * appears and then vanishes is worse than one that was never there.
 */
const styles = css`
	:host {
		display: block;
		--announcement-accent: var(--purple);
	}

	:host([accent='sub']) {
		--announcement-accent: var(--pink);
	}

	:host([accent='success']) {
		--announcement-accent: var(--success);
	}

	:host([accent='warning']) {
		--announcement-accent: var(--warning);
	}

	:host([accent='error']) {
		--announcement-accent: var(--destructive);
	}

	:host([is-hidden]) {
		display: none;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-base);
		box-sizing: border-box;
		padding: var(--space-sm) var(--space-base);
		border-bottom: 1px solid color-mix(in oklch, var(--announcement-accent) 30%, var(--border));
		background: color-mix(in oklch, var(--announcement-accent) 10%, transparent);
		color: var(--foreground);
		font-size: var(--font-size-small);
		text-align: center;
	}

	.message {
		min-width: 0;
	}

	/* The close button sits at the end of the flex row rather than absolutely,
	   so a message long enough to wrap pushes it down instead of underneath. */
	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.5rem;
		height: 1.5rem;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		transition: color 0.12s ease, background-color 0.12s ease;
	}

	.close:hover {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	.close:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.close svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}
`

const DISMISSED = 'dismissed'

const readIsDismissed = (storageKey?: string): boolean => {
	if (!storageKey) return false

	try {
		return window.localStorage.getItem(storageKey) === DISMISSED
	} catch {
		return false
	}
}

const writeIsDismissed = (storageKey?: string) => {
	if (!storageKey) return

	try {
		window.localStorage.setItem(storageKey, DISMISSED)
	} catch {
		// Storage can be unavailable. The bar still closes for this session.
	}
}

export const ZAnnouncementBar = c(
	(props) => {
		const [isChecked, setIsChecked] = useState(false)
		const [isDismissed, setIsDismissed] = useState(false)

		const storageKey = props.storageKey as string | undefined

		useEffect(() => {
			setIsDismissed(readIsDismissed(storageKey))
			setIsChecked(true)
		}, [storageKey])

		const handleDismiss = () => {
			setIsDismissed(true)
			writeIsDismissed(storageKey)
			props.dismiss()
		}

		// Nothing renders before storage has been read, so a dismissed banner
		// never flashes into view on its way out.
		const shouldRender = isChecked && !isDismissed
		if (!shouldRender) return <host shadowDom></host>

		return (
			<host shadowDom>
				<div class='bar' role='region' aria-label={(props.label as string) || 'Announcement'}>
					<span class='message'>{props.message ? props.message : <slot />}</span>
					{!props.isPermanent && (
						<button type='button' class='close' aria-label='Dismiss' onclick={handleDismiss}>
							<svg viewBox='0 0 24 24' aria-hidden='true'>
								<line x1='6' y1='6' x2='18' y2='18' />
								<line x1='18' y1='6' x2='6' y2='18' />
							</svg>
						</button>
					)}
				</div>
			</host>
		)
	},
	{
		props: {
			message: { type: String, reflect: true },
			label: { type: String, reflect: true },
			accent: { type: String, reflect: true },
			storageKey: { type: String, reflect: true },
			isPermanent: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			dismiss: event<void>({ bubbles: true, composed: true })
		},
		styles
	}
)

customElements.define('z-announcement-bar', ZAnnouncementBar)
