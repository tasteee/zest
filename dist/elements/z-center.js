import { c as l, a as c, j as n, d } from "../chunks/define-element-BZUk-KLk.js";
import { d as h, i as g, e as m, f, g as a, h as z, p as y } from "../chunks/layout-schema-CPCZ71fv.js";
import { o } from "../chunks/prop-types-B3Bpi956.js";
const u = l`
	:host {
		display: flex;
		justify-content: var(--z-center-justify, center);
		align-items: var(--z-center-align, center);
		min-height: var(--z-center-min-height, auto);
		padding-top: var(--z-center-pad-top, 0);
		padding-bottom: var(--z-center-pad-bottom, 0);
		padding-inline-start: var(--z-center-pad-left, 0);
		padding-inline-end: var(--z-center-pad-right, 0);
	}

	:host([does-center-text]) {
		text-align: center;
	}

	:host([is-full-width]) {
		width: 100%;
	}

	:host([is-full-height]) {
		height: 100%;
	}

	.inner {
		max-width: var(--z-center-max-width, none);
	}

	:host([is-full-width]) .inner {
		width: 100%;
	}
`, x = (e) => {
  const t = { ...f(e, "--z-center") }, i = e.doesCenterBoth ? "center" : a(e.alignsX), r = e.doesCenterBoth ? "center" : a(e.alignsY);
  i && (t["--z-center-justify"] = i), r && (t["--z-center-align"] = r);
  const s = z(e.maxWidth);
  return s && (t["--z-center-max-width"] = s), e.minHeight && (t["--z-center-min-height"] = e.minHeight), t;
}, p = c(
  (e) => /* @__PURE__ */ n("host", { shadowDom: !0, style: x(e), children: /* @__PURE__ */ n("div", { class: "inner", children: /* @__PURE__ */ n("slot", {}) }) }),
  {
    props: {
      alignsX: { type: o("start", "center", "end") },
      alignsY: { type: o("start", "center", "end") },
      doesCenterBoth: { type: Boolean, reflect: !0 },
      maxWidth: String,
      doesCenterText: { type: Boolean, reflect: !0 },
      minHeight: String,
      isFullWidth: { type: Boolean, reflect: !0 },
      isFullHeight: { type: Boolean, reflect: !0 },
      ...g
    },
    styles: [
      h,
      m([
        ...y("--z-center"),
        "--z-center-justify",
        "--z-center-align",
        "--z-center-min-height",
        "--z-center-max-width"
      ]),
      u
    ]
  }
);
d("z-center", p);
export {
  p as ZCenter
};
