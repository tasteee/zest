// @ts-self-types="./z-column.d.ts"
import { a as n, j as t, d as l } from "../chunks/define-element-BZUk-KLk.js";
import { d as r, i as a, s as e } from "../chunks/layout-schema-CdiVYtzv.js";
import { f as i, a as m, b as p } from "../chunks/flex-line-DrKdWCHC.js";
import { o as s } from "../chunks/prop-types-B3Bpi956.js";
const c = n(
  (o) => /* @__PURE__ */ t("host", { shadowDom: !0, style: p(o, "--z-column", "column"), children: /* @__PURE__ */ t("slot", {}) }),
  {
    props: {
      gap: e,
      padding: e,
      margin: e,
      alignsX: { type: s("start", "center", "end", "between", "around", "evenly", "stretch") },
      alignsY: { type: s("start", "center", "end", "between", "around", "evenly", "stretch") },
      doesWrap: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isFullHeight: { type: Boolean, reflect: !0 },
      ...a
    },
    styles: [r, i("--z-column"), m("--z-column", "column")]
  }
);
l("z-column", c);
export {
  c as ZColumn
};
