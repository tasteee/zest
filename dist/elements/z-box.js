import { c as o, a as e, j as i, d as a } from "../chunks/define-element-BZUk-KLk.js";
import { b as r, g as l } from "../chunks/box-schema-C_c94p3x.js";
const s = o`
	:host {
		/* Longhands only. box-schema.ts resolves every edge from the most
		   specific prop, so a shorthand declaration here would only be
		   overridden by whichever of these four sits below it. */
		margin-top: var(--z-box-margin-top);
		margin-inline-end: var(--z-box-margin-right);
		margin-bottom: var(--z-box-margin-bottom);
		margin-inline-start: var(--z-box-margin-left);
		padding-top: var(--z-box-padding-top);
		padding-inline-end: var(--z-box-padding-right);
		padding-bottom: var(--z-box-padding-bottom);
		padding-inline-start: var(--z-box-padding-left);
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

	/* is-inline composes with either display: inline-flex or inline-grid. */
	:host([is-inline]) {
		display: inline-flex;
	}

	:host([display='grid']) {
		display: grid;
		grid-template-columns: var(--z-box-grid-template-columns);
		grid-template-rows: var(--z-box-grid-template-rows);
	}

	:host([display='grid'][is-inline]) {
		display: inline-grid;
	}

	@media (min-width: 40rem) {
		:host([display='grid']) {
			grid-template-columns: var(--z-box-small-grid-template-columns, var(--z-box-grid-template-columns));
		}
	}

	@media (min-width: 48rem) {
		:host([display='grid']) {
			grid-template-columns: var(
				--z-box-medium-grid-template-columns,
				var(--z-box-small-grid-template-columns, var(--z-box-grid-template-columns))
			);
		}
	}

	@media (min-width: 64rem) {
		:host([display='grid']) {
			grid-template-columns: var(
				--z-box-large-grid-template-columns,
				var(--z-box-medium-grid-template-columns, var(--z-box-small-grid-template-columns, var(--z-box-grid-template-columns)))
			);
		}
	}

	@media (min-width: 80rem) {
		:host([display='grid']) {
			grid-template-columns: var(
				--z-box-extra-large-grid-template-columns,
				var(
					--z-box-large-grid-template-columns,
					var(--z-box-medium-grid-template-columns, var(--z-box-small-grid-template-columns, var(--z-box-grid-template-columns)))
				)
			);
		}
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
`, m = o`
	:host {
		box-sizing: border-box;
	}
`, d = e(
  (t) => /* @__PURE__ */ i("host", { shadowDom: !0, style: l(t), children: /* @__PURE__ */ i("slot", {}) }),
  {
    props: r,
    styles: [m, s]
  }
);
a("z-box", d);
export {
  d as ZBox
};
