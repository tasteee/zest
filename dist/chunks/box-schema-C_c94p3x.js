import { o as m } from "./prop-types-B3Bpi956.js";
import { i as v, r as d, a as B, b as X, c as Y } from "./layout-schema-CPCZ71fv.js";
const c = (t) => /^-?\d+$/.test(t), A = {
  0: "0",
  1: "var(--space-xs)",
  2: "var(--space-sm)",
  3: "var(--space-md)",
  4: "var(--space-base)",
  5: "var(--space-lg)",
  6: "var(--space-xl)",
  7: "var(--space-2xl)",
  8: "var(--space-3xl)"
}, i = (t) => {
  if (t == null || t === "") return;
  const n = String(t);
  if (!c(n)) return Y(n);
  const o = Number(n);
  return A[o] ?? `calc(var(--space-base) * ${o})`;
}, a = (t) => {
  if (!(t == null || t === ""))
    return c(t) ? `${t}px` : t;
}, r = (t) => {
  if (!(t == null || t === ""))
    return c(t) ? `repeat(${t}, minmax(0, 1fr))` : t;
}, p = {
  isInline: { type: Boolean, reflect: !0 },
  doesWrap: { type: Boolean, reflect: !0 },
  doesWrapText: { type: Boolean, reflect: !0 },
  isFullWidth: { type: Boolean, reflect: !0 },
  isFullHeight: { type: Boolean, reflect: !0 }
}, L = {
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
  ...v
}, P = { ...p, ...L }, H = (t, g) => {
  const n = {};
  for (const e of Object.keys(t))
    g.includes(e) || (n[e] = t[e]);
  return n;
};
H(P, [
  "direction",
  "display",
  "columns",
  "rows",
  "smallColumns",
  "mediumColumns",
  "largeColumns",
  "extraLargeColumns"
]);
const E = (t) => {
  const g = {}, n = (C, f) => {
    f !== void 0 && (g[C] = f);
  }, e = d(t.inset), o = d(t.insetX), x = d(t.insetY), l = i(t.padding), u = i(t.paddingX), S = i(t.paddingY);
  n("--z-box-padding-top", i(t.paddingTop) ?? S ?? l ?? x ?? e), n("--z-box-padding-bottom", i(t.paddingBottom) ?? S ?? l ?? x ?? e), n("--z-box-padding-left", i(t.paddingLeft) ?? u ?? l ?? o ?? e), n("--z-box-padding-right", i(t.paddingRight) ?? u ?? l ?? o ?? e);
  const s = i(t.margin), b = i(t.marginX), h = i(t.marginY);
  n("--z-box-margin-top", i(t.marginTop) ?? h ?? s), n("--z-box-margin-bottom", i(t.marginBottom) ?? h ?? s), n("--z-box-margin-left", i(t.marginLeft) ?? b ?? s), n("--z-box-margin-right", i(t.marginRight) ?? b ?? s), n("--z-box-grid-template-columns", r(t.columns)), n("--z-box-grid-template-rows", r(t.rows)), n("--z-box-small-grid-template-columns", r(t.smallColumns)), n("--z-box-medium-grid-template-columns", r(t.mediumColumns)), n("--z-box-large-grid-template-columns", r(t.largeColumns)), n("--z-box-extra-large-grid-template-columns", r(t.extraLargeColumns)), n("--z-box-gap", i(t.gap)), n("--z-box-row-gap", i(t.rowGap)), n("--z-box-column-gap", i(t.columnGap)), n("--z-box-width", a(t.width)), n("--z-box-min-width", a(t.minWidth)), n("--z-box-max-width", a(t.maxWidth)), n("--z-box-height", a(t.height)), n("--z-box-min-height", a(t.minHeight)), n("--z-box-max-height", a(t.maxHeight));
  const z = t.direction !== "vertical", y = z ? t.alignsX : t.alignsY, w = z ? t.alignsY : t.alignsX;
  return n("--z-box-justify", B(y)), n("--z-box-align", X(w)), g;
};
export {
  P as b,
  E as g,
  i as r
};
