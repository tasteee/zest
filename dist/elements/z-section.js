// @ts-self-types="./z-section.d.ts"
import { c as l, a as p, j as s, d as g } from "../chunks/define-element-BZUk-KLk.js";
import { d as m, s as o, c as n, h as z } from "../chunks/layout-schema-CdiVYtzv.js";
const u = l`
	:host {
		display: block;
		padding-top: var(--z-section-space-top, 0);
		padding-bottom: var(--z-section-space-bottom, 0);
	}

	.inner {
		box-sizing: border-box;
		width: 100%;
		max-width: var(--z-section-container, none);
		margin-inline-start: auto;
		margin-inline-end: auto;
		padding-inline-start: var(--z-section-gutter, 0);
		padding-inline-end: var(--z-section-gutter, 0);
	}
`, b = (t) => {
  const e = {}, i = n(t.space), a = n(t.spaceTop) ?? i, c = n(t.spaceBottom) ?? i;
  a && (e["--z-section-space-top"] = a), c && (e["--z-section-space-bottom"] = c);
  const r = z(t.container), d = n(t.gutter);
  return r && (e["--z-section-container"] = r), d && (e["--z-section-gutter"] = d), e;
}, h = p(
  (t) => /* @__PURE__ */ s("host", { shadowDom: !0, style: b(t), children: /* @__PURE__ */ s("div", { class: "inner", children: /* @__PURE__ */ s("slot", {}) }) }),
  {
    props: {
      space: o,
      spaceTop: o,
      spaceBottom: o,
      container: String,
      gutter: o
    },
    styles: [m, u]
  }
);
g("z-section", h);
export {
  h as ZSection
};
