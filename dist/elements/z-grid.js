// @ts-self-types="./z-grid.d.ts"
import { c, a as p, j as o, d as z } from "../chunks/define-element-BZUk-KLk.js";
import { d as u, i as f, s as t, e as h, p as y, f as v, c as r, j as l } from "../chunks/layout-schema-CdiVYtzv.js";
import { o as m } from "../chunks/prop-types-B3Bpi956.js";
const j = c`
	:host {
		display: grid;
		gap: var(--z-grid-gap, 0);
		row-gap: var(--z-grid-row-gap, var(--z-grid-gap, 0));
		column-gap: var(--z-grid-column-gap, var(--z-grid-gap, 0));
		grid-template-columns: var(--z-grid-columns, none);
		justify-items: var(--z-grid-justify, stretch);
		align-items: var(--z-grid-align, stretch);
		padding-top: var(--z-grid-pad-top, 0);
		padding-bottom: var(--z-grid-pad-bottom, 0);
		padding-inline-start: var(--z-grid-pad-left, 0);
		padding-inline-end: var(--z-grid-pad-right, 0);
	}

	:host([is-full-width]) {
		width: 100%;
	}
`, w = (i) => {
  const a = { ...v(i, "--z-grid") };
  i.minColumnWidth ? a["--z-grid-columns"] = `repeat(auto-fit, minmax(min(${i.minColumnWidth}, 100%), 1fr))` : i.columns && (a["--z-grid-columns"] = `repeat(${i.columns}, minmax(0, 1fr))`);
  const g = r(i.gap), s = r(i.gapX), n = r(i.gapY);
  g && (a["--z-grid-gap"] = g), s && (a["--z-grid-column-gap"] = s), n && (a["--z-grid-row-gap"] = n);
  const e = l(i.alignsX), d = l(i.alignsY);
  return e && (a["--z-grid-justify"] = e), d && (a["--z-grid-align"] = d), a;
}, S = p(
  (i) => /* @__PURE__ */ o("host", { shadowDom: !0, style: w(i), children: /* @__PURE__ */ o("slot", {}) }),
  {
    props: {
      columns: String,
      minColumnWidth: String,
      gap: t,
      gapX: t,
      gapY: t,
      alignsX: { type: m("start", "center", "end", "stretch") },
      alignsY: { type: m("start", "center", "end", "stretch") },
      isFullWidth: { type: Boolean, reflect: !0 },
      ...f
    },
    styles: [
      u,
      h([
        ...y("--z-grid"),
        "--z-grid-gap",
        "--z-grid-row-gap",
        "--z-grid-column-gap",
        "--z-grid-columns",
        "--z-grid-justify",
        "--z-grid-align"
      ]),
      j
    ]
  }
);
z("z-grid", S);
export {
  S as ZGrid
};
