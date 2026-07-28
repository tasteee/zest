import { css } from 'atomico'

/**
 * Shared flex/grid layout rules, used by <z-box> (and, via the box props +
 * this stylesheet, its thin z-row/z-column wrappers). `aligns-x`/`aligns-y`
 * are resolved in JS (see box-schema.ts's getBoxHostStyle) into the
 * --z-box-justify/--z-box-align (flex) or --z-box-justify-items/
 * --z-box-align-items (grid) custom properties consumed below.
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
		grid-template-columns: var(--z-box-grid-template-columns);
		grid-template-rows: var(--z-box-grid-template-rows);
		width: var(--z-box-width);
		min-width: var(--z-box-min-width, 0);
		max-width: var(--z-box-max-width);
		height: var(--z-box-height);
		min-height: var(--z-box-min-height);
		max-height: var(--z-box-max-height);
		display: flex;
		justify-content: var(--z-box-justify, flex-start);
		align-items: var(--z-box-align, stretch);
	}

	:host([is-flex]) {
		display: flex;
		flex-direction: row;
		align-items: var(--z-box-align, stretch);
		justify-content: var(--z-box-justify, flex-start);
		flex-wrap: nowrap;
	}

	:host([is-inline-flex]) {
		display: inline-flex;
		flex-direction: row;
		align-items: var(--z-box-align, stretch);
		justify-content: var(--z-box-justify, flex-start);
		flex-wrap: nowrap;
	}

	:host([is-grid]),
	:host([is-inline-grid]) {
		justify-items: var(--z-box-justify-items, stretch);
		align-items: var(--z-box-align-items, stretch);
	}

	:host([is-grid]) {
		display: grid;
	}

	:host([is-inline-grid]) {
		display: inline-grid;
	}

	@media (min-width: 40rem) {
		:host {
			grid-template-columns: var(--z-box-small-grid-template-columns, var(--z-box-grid-template-columns));
		}
	}

	@media (min-width: 48rem) {
		:host {
			grid-template-columns: var(
				--z-box-medium-grid-template-columns,
				var(--z-box-small-grid-template-columns, var(--z-box-grid-template-columns))
			);
		}
	}

	@media (min-width: 64rem) {
		:host {
			grid-template-columns: var(
				--z-box-large-grid-template-columns,
				var(--z-box-medium-grid-template-columns, var(--z-box-small-grid-template-columns, var(--z-box-grid-template-columns)))
			);
		}
	}

	@media (min-width: 80rem) {
		:host {
			grid-template-columns: var(
				--z-box-extra-large-grid-template-columns,
				var(
					--z-box-large-grid-template-columns,
					var(--z-box-medium-grid-template-columns, var(--z-box-small-grid-template-columns, var(--z-box-grid-template-columns)))
				)
			);
		}
	}

	:host([is-block]) {
		display: block;
	}

	:host([is-inline-block]) {
		display: inline-block;
	}

	:host([is-inline]:not([is-flex]):not([is-inline-flex])) {
		display: inline;
	}

	:host([is-flex][is-inline]),
	:host([is-inline-flex][is-inline]) {
		display: inline-flex;
	}

	:host([is-row]) {
		flex-direction: row;
	}

	:host([is-column]) {
		flex-direction: column;
	}

	:host([wrap]) {
		flex-wrap: wrap;
	}

	:host([does-wrap-text]) {
		white-space: normal;
	}

	:host([full-width]) {
		width: 100%;
	}

	:host([full-height]) {
		height: 100%;
	}
`
