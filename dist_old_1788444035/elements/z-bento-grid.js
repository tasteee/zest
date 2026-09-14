import { c as n, a as r, j as s, d as i } from "../chunks/define-element-BWC3wEPr.js";
import { s as a, c } from "../chunks/layout-schema-SeDcUpZQ.js";
const g = n`
	:host {
		display: grid;
		grid-template-columns: repeat(var(--bento-columns, 3), minmax(0, 1fr));
		grid-auto-rows: var(--bento-row-height, 14rem);
		gap: var(--bento-gap, var(--spacing-4));
	}

	:host([is-hidden]) {
		display: none;
	}
`, l = r(
  (e) => {
    const t = {};
    e.columns && (t["--bento-columns"] = String(e.columns)), e.rowHeight && (t["--bento-row-height"] = e.rowHeight);
    const o = c(e.gap);
    return o && (t["--bento-gap"] = o), /* @__PURE__ */ s("host", { shadowDom: !0, style: t, children: /* @__PURE__ */ s("slot", {}) });
  },
  {
    props: {
      columns: Number,
      rowHeight: String,
      gap: a,
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: g
  }
);
i("z-bento-grid", l);
export {
  l as ZBentoGrid
};
