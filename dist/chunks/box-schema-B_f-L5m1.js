import { o as m } from "./prop-types-CSJu2W-0.js";
import { i as B, r as c, a as C, b as X, c as Y } from "./layout-schema-CdiVYtzv.js";
import { w as A } from "./deprecate-DrGNNffe.js";
const d = (t) => /^-?\d+$/.test(t), L = {
  0: "0",
  1: "var(--space-1)",
  2: "var(--space-2)",
  3: "var(--space-3)",
  4: "var(--space-4)",
  5: "var(--space-6)",
  6: "var(--space-8)",
  7: "var(--space-12)",
  8: "var(--space-16)"
}, n = (t) => {
  if (t == null || t === "") return;
  const i = String(t);
  if (!d(i)) return Y(i);
  const g = Number(i);
  return L[g] ?? `calc(var(--space-4) * ${g})`;
}, a = (t) => {
  if (!(t == null || t === ""))
    return d(t) ? `${t}px` : t;
}, r = (t) => {
  if (!(t == null || t === ""))
    return d(t) ? `repeat(${t}, minmax(0, 1fr))` : t;
}, V = {
  isInline: { type: Boolean, reflect: !0 },
  isVertical: { type: Boolean, reflect: !0 },
  doesWrap: { type: Boolean, reflect: !0 },
  doesWrapText: { type: Boolean, reflect: !0 },
  isFullWidth: { type: Boolean, reflect: !0 },
  isFullHeight: { type: Boolean, reflect: !0 }
}, P = {
  gap: String,
  rowGap: String,
  columnGap: String,
  margin: String,
  marginTop: String,
  marginRight: String,
  marginBottom: String,
  marginLeft: String,
  marginX: String,
  marginY: String,
  padding: String,
  paddingTop: String,
  paddingRight: String,
  paddingBottom: String,
  paddingLeft: String,
  paddingX: String,
  paddingY: String,
  width: String,
  minWidth: String,
  maxWidth: String,
  height: String,
  minHeight: String,
  maxHeight: String,
  /** @deprecated use is-vertical */
  direction: { type: m("horizontal", "vertical"), reflect: !0 },
  display: { type: m("flex", "grid"), reflect: !0 },
  columns: String,
  rows: String,
  smallColumns: String,
  mediumColumns: String,
  largeColumns: String,
  extraLargeColumns: String,
  alignsX: { type: m("start", "center", "end", "between", "around", "evenly", "stretch") },
  alignsY: { type: m("start", "center", "end", "between", "around", "evenly", "stretch") },
  ...B
}, p = { ...V, ...P }, H = (t, o) => {
  const i = {};
  for (const e of Object.keys(t))
    o.includes(e) || (i[e] = t[e]);
  return i;
};
H(p, [
  "isVertical",
  "direction",
  "display",
  "columns",
  "rows",
  "smallColumns",
  "mediumColumns",
  "largeColumns",
  "extraLargeColumns"
]);
const R = (t) => {
  const o = {}, i = (v, z) => {
    z !== void 0 && (o[v] = z);
  }, e = c(t.inset), g = c(t.insetX), u = c(t.insetY), l = n(t.padding), x = n(t.paddingX), S = n(t.paddingY);
  i("--z-box-padding-top", n(t.paddingTop) ?? S ?? l ?? u ?? e), i("--z-box-padding-bottom", n(t.paddingBottom) ?? S ?? l ?? u ?? e), i("--z-box-padding-left", n(t.paddingLeft) ?? x ?? l ?? g ?? e), i("--z-box-padding-right", n(t.paddingRight) ?? x ?? l ?? g ?? e);
  const s = n(t.margin), b = n(t.marginX), h = n(t.marginY);
  i("--z-box-margin-top", n(t.marginTop) ?? h ?? s), i("--z-box-margin-bottom", n(t.marginBottom) ?? h ?? s), i("--z-box-margin-left", n(t.marginLeft) ?? b ?? s), i("--z-box-margin-right", n(t.marginRight) ?? b ?? s), i("--z-box-grid-template-columns", r(t.columns)), i("--z-box-grid-template-rows", r(t.rows)), i("--z-box-small-grid-template-columns", r(t.smallColumns)), i("--z-box-medium-grid-template-columns", r(t.mediumColumns)), i("--z-box-large-grid-template-columns", r(t.largeColumns)), i("--z-box-extra-large-grid-template-columns", r(t.extraLargeColumns)), i("--z-box-gap", n(t.gap)), i("--z-box-row-gap", n(t.rowGap)), i("--z-box-column-gap", n(t.columnGap)), i("--z-box-width", a(t.width)), i("--z-box-min-width", a(t.minWidth)), i("--z-box-max-width", a(t.maxWidth)), i("--z-box-height", a(t.height)), i("--z-box-min-height", a(t.minHeight)), i("--z-box-max-height", a(t.maxHeight)), A({ tag: "z-box", attribute: "direction", value: t.direction, flag: "is-vertical", flagValue: "vertical" });
  const f = !(!!t.isVertical || t.direction === "vertical"), y = f ? t.alignsX : t.alignsY, w = f ? t.alignsY : t.alignsX;
  return i("--z-box-justify", C(y)), i("--z-box-align", X(w)), o;
};
export {
  p as b,
  R as g,
  n as r
};
