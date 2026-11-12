import { css } from 'atomico'

/*
 * Shared chrome for floating overlays. Two reusable sheets:
 *
 *  - floatingSurfaceStyles: the bordered overlay panel used by
 *    z-popover and z-hover-card. Lives in the top layer via [popover], is
 *    fixed-positioned (coords come from shared/overlay.ts), and fades/rises in
 *    with a short, side-aware transition.
 *
 *  - dialogSurfaceStyles: the modal <dialog> chrome shared by z-dialog and
 *    z-alert-dialog, centered panel, dimmed backdrop, same border language.
 *
 * Both are the only elevated surfaces zest has: a hairline border on
 * surface-overlay, plus --shadow-overlay for popovers and --shadow-modal for
 * dialogs. Resting UI never takes a shadow.
 */

export const floatingSurfaceStyles = css`
	:host {
		/* the host hugs its trigger and acts as the positioning anchor, it must
		   have a box (not display:contents) so getBoundingClientRect is real. */
		display: inline-flex;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	.surface {
		position: fixed;
		left: 0;
		top: 0;
		/* override the UA [popover] { margin: auto } that would re-center it */
		margin: 0;
		z-index: var(--z-menu);
		box-sizing: border-box;
		background: var(--surface-overlay);
		color: var(--text-primary);
		box-shadow: var(--shadow-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		padding: var(--z-overlay-padding, 1rem);
		max-width: var(--z-overlay-max-width, 20rem);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
		overflow: visible;
	}

	/* [popover] elements get a UA inset that would re-center them; we position
	   via inline left/top from shared/overlay.ts, so clear right/bottom only. */
	/* Motion: hidden at rest, data-state="open" (shared/overlay.ts) fades,
	   rises, and scales in from the anchored side; exit retraces it faster. */
	.surface {
		right: auto;
		bottom: auto;
		--travel: calc(var(--motion-distance-sm) * var(--motion-travel));
		opacity: 0;
		scale: var(--motion-scale-from);
		translate: 0 var(--travel);
		transition:
			opacity var(--motion-exit-fast) var(--ease-exit),
			scale var(--motion-exit-fast) var(--ease-exit),
			translate var(--motion-exit-fast) var(--ease-exit);
	}

	.surface[data-side='top'] {
		translate: 0 calc(var(--travel) * -1);
		transform-origin: bottom center;
	}
	.surface[data-side='bottom'] {
		transform-origin: top center;
	}
	.surface[data-side='left'] {
		translate: calc(var(--travel) * -1) 0;
		transform-origin: right center;
	}
	.surface[data-side='right'] {
		translate: var(--travel) 0;
		transform-origin: left center;
	}

	.surface[data-state='open'],
	.surface.is-open {
		opacity: 1;
		scale: 1;
		translate: 0 0;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			scale var(--motion-fast) var(--ease-enter),
			translate var(--motion-fast) var(--ease-enter);
	}
`

export const dialogSurfaceStyles = css`
	:host {
		display: contents;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([tone='danger']) {
		--tone: var(--status-danger);
	}

	/* Everything except display lives on the base rule rather than on [open],
	   and that split is the whole exit animation. Closing removes [open] on the
	   very first frame, while the allow-discrete display transition keeps the
	   panel on screen for the fade that follows. Any property gated on [open]
	   therefore snaps at frame zero of the exit — flex-direction was, so the
	   column relaid itself as a row and the panel visibly rearranged while
	   fading out. */
	.dialog {
		box-sizing: border-box;
		width: min(var(--z-dialog-width, 30rem), calc(100vw - 2rem));
		max-height: calc(100vh - 4rem);
		padding: 0;
		background: var(--surface-overlay);
		color: var(--text-primary);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		overflow: hidden;
		flex-direction: column;
		box-shadow: var(--shadow-modal);
	}

	/* Motion (shared/modal.ts drives data-state). The resting, un-flagged state
	   is the hidden one: entry rises + scales in, exit retraces the same path
	   faster with an accelerating curve. Sheet and drawer swap the travel for
	   an edge slide but keep the timings. */
	.dialog {
		opacity: 0;
		scale: var(--motion-scale-from);
		translate: 0 calc(var(--motion-distance-md) * var(--motion-travel));
		transition:
			opacity var(--motion-exit-base) var(--ease-exit),
			scale var(--motion-exit-base) var(--ease-exit),
			translate var(--motion-exit-base) var(--ease-exit);
	}

	.dialog[data-state='open'] {
		opacity: 1;
		scale: 1;
		translate: 0 0;
		transition:
			opacity var(--motion-base) var(--ease-enter),
			scale var(--motion-base) var(--ease-enter),
			translate var(--motion-base) var(--ease-enter);
	}

	.dialog::backdrop {
		background: var(--surface-scrim);
		backdrop-filter: blur(3px);
		opacity: 0;
		transition: opacity var(--motion-exit-base) var(--ease-exit);
	}

	.dialog[data-state='open']::backdrop {
		opacity: 1;
		transition: opacity var(--motion-base) var(--ease-enter);
	}

	/* The UA rule for a dialog without [open] supplies display: none, which is
	   the closed half of the pair the allow-discrete display transition animates
	   between. */
	.dialog[open] {
		display: flex;
	}

	.body {
		/* Keep wheel and touch scrolling inside the modal when this is the active
		   scroll surface, rather than handing it off to the document at either end. */
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding: var(--space-6);
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
	}

	.header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-4);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-snug);
		color: var(--text-primary);
	}

	.description {
		margin: 0;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}

	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		flex-shrink: 0;
		margin: -0.25rem -0.25rem 0 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.close:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
	}

	.close:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.close svg {
		width: 1rem;
		height: 1rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}

	.footer {
		display: flex;
		justify-content: flex-end;
		gap: var(--space-2-5);
		padding: var(--space-3) var(--space-6) var(--space-6);
	}

	::slotted([slot='footer']) {
		display: flex;
		gap: var(--space-2-5);
	}
`
