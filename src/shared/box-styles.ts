import { css } from 'atomico'

/**
 * Shared flex layout rules, used by <z-box> (and, via the box props +
 * this stylesheet, its thin z-row/z-column wrappers). `aligns-x`/`aligns-y`
 * are resolved in JS (see box-schema.ts's getBoxHostStyle) into the
 * --z-box-justify/--z-box-align custom properties consumed below.
 */
export const boxLayoutStyles = css`
	:host {
		margin: var(--z-box-margin);
		margin-top: var(--z-box-margin-top);
		margin-right: var(--z-box-margin-right);
		margin-bottom: var(--z-box-margin-bottom);
		margin-left: var(--z-box-margin-left);
		padding: var(--z-box-padding);
		padding-top: var(--z-box-padding-top);
		padding-right: var(--z-box-padding-right);
		padding-bottom: var(--z-box-padding-bottom);
		padding-left: var(--z-box-padding-left);
		gap: var(--z-box-gap);
		row-gap: var(--z-box-row-gap, var(--z-box-gap));
		column-gap: var(--z-box-column-gap, var(--z-box-gap));
		width: var(--z-box-width);
		min-width: var(--z-box-min-width, 0);
		max-width: var(--z-box-max-width);
		height: var(--z-box-height);
		min-height: var(--z-box-min-height);
		max-height: var(--z-box-max-height);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: var(--z-box-justify, flex-start);
		align-items: var(--z-box-align, stretch);
	}

	/* The one display modifier that composes with flex rather than replacing
	   it. Everything else — grid, block, inline-block — left with z-box's
	   display switch; grid belongs to z-grid. */
	:host([is-inline]) {
		display: inline-flex;
	}

	:host([direction='horizontal']) {
		flex-direction: row;
	}

	:host([direction='vertical']) {
		flex-direction: column;
	}

	:host([does-wrap]) {
		flex-wrap: wrap;
	}

	:host([does-wrap-text]) {
		white-space: normal;
	}

	:host([is-full-width]) {
		width: 100%;
	}

	:host([is-full-height]) {
		height: 100%;
	}
`
