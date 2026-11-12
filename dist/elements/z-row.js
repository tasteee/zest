// @ts-self-types="./z-row.d.ts"
import { a as o, j as s, d as a } from "../chunks/define-element-BZUk-KLk.js";
import { d as l, i as n, s as e } from "../chunks/layout-schema-CdiVYtzv.js";
import { f as i, a as p, s as d, b as f } from "../chunks/flex-line-DrKdWCHC.js";
import { o as t } from "../chunks/prop-types-B3Bpi956.js";
const m = o(
  (r) => /* @__PURE__ */ s("host", { shadowDom: !0, style: f(r, "--z-row", "row"), children: /* @__PURE__ */ s("slot", {}) }),
  {
    props: {
      gap: e,
      padding: e,
      margin: e,
      alignsX: { type: t("start", "center", "end", "between", "around", "evenly", "stretch") },
      alignsY: { type: t("start", "center", "end", "between", "around", "evenly", "stretch") },
      doesWrap: { type: Boolean, reflect: !0 },
      stackBelow: { type: t("small", "medium", "large", "extra-large"), reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isFullHeight: { type: Boolean, reflect: !0 },
      ...n
    },
    styles: [l, i("--z-row"), p("--z-row", "row"), d("--z-row")]
  }
);
a("z-row", m);
export {
  m as ZRow
};
