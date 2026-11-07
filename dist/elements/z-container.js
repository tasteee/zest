import { c as r, a as o, j as n, d as a } from "../chunks/define-element-BZUk-KLk.js";
import { d as l, s as c, h as d, c as g } from "../chunks/layout-schema-CPCZ71fv.js";
const h = r`
	:host {
		display: block;
		width: 100%;
		max-width: var(--z-container-size, 80rem);
		margin-inline-start: auto;
		margin-inline-end: auto;
		padding-inline-start: var(--z-container-gutter, 0);
		padding-inline-end: var(--z-container-gutter, 0);
	}

	:host([is-full-height]) {
		min-height: 100%;
	}
`, u = (e) => {
  const t = {}, s = d(e.size), i = g(e.gutter);
  return s && (t["--z-container-size"] = s), i && (t["--z-container-gutter"] = i), t;
}, z = o(
  (e) => /* @__PURE__ */ n("host", { shadowDom: !0, style: u(e), children: /* @__PURE__ */ n("slot", {}) }),
  {
    props: {
      size: String,
      gutter: c,
      // Centered by default; declared for API completeness.
      isCentered: { type: Boolean, reflect: !0 },
      isFullHeight: { type: Boolean, reflect: !0 }
    },
    styles: [l, h]
  }
);
a("z-container", z);
export {
  z as ZContainer
};
