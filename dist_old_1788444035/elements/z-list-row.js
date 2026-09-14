import { c as e, a as i, j as t, d as o } from "../chunks/define-element-BWC3wEPr.js";
const s = e`
	:host {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 0.875rem;
		padding: 0.75rem 1rem;
		box-sizing: border-box;
	}

	slot {
		display: contents;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-clickable]) {
		cursor: pointer;
		transition: background-color 0.12s ease;
	}
	:host([is-clickable]:hover) {
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
	}

	/* The second child grows to fill the row by default. */
	::slotted(:nth-child(2)) {
		flex: 1;
		min-width: 0;
	}

	::slotted(:first-child:last-child) {
		flex: 1;
		min-width: 0;
	}

	/* Opt an additional child into growing. */
	::slotted(.is-grow) {
		flex: 1;
		min-width: 0;
	}

	/* Drop a child onto its own full-width line beneath the rest. */
	::slotted(.is-wrap) {
		flex-basis: 100%;
		min-width: 0;
	}

	::slotted(svg),
	::slotted(img) {
		flex-shrink: 0;
	}
`, l = i(
  () => /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ t("slot", {}) }),
  {
    props: {
      isClickable: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: s
  }
);
o("z-list-row", l);
export {
  l as ZListRow
};
