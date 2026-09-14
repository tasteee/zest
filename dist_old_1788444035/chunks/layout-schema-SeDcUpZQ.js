import { c as g } from "./define-element-BWC3wEPr.js";
const f = {
  0: "0",
  "2xs": "var(--spacing-1)",
  xs: "var(--spacing-2)",
  sm: "var(--spacing-3)",
  md: "var(--spacing-4)",
  lg: "var(--spacing-6)",
  xl: "var(--spacing-8)",
  "2xl": "var(--spacing-12)",
  "3xl": "var(--spacing-16)",
  "4xl": "var(--spacing-24)"
}, u = {
  none: "0",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "calc(var(--radius) + 8px)",
  full: "9999px"
}, x = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch"
}, v = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  between: "stretch",
  around: "stretch",
  evenly: "stretch"
}, a = (t, n) => (s) => {
  if (!(s == null || s === ""))
    return t[s] ?? (n ? s : void 0);
}, r = a(f, !0), m = a(u, !0), h = a(x, !1), S = a(v, !1), y = (t) => {
  if (!(t == null || t === ""))
    return typeof t == "number" || /^\d+$/.test(String(t)) ? `var(--spacing-${typeof t == "number" ? t : Number(t)})` : r(String(t));
}, $ = { type: String }, z = (t, n) => {
  const s = r(t.inset), c = r(t.insetX), i = r(t.insetY), o = i ?? s, d = i ?? s, l = c ?? s, p = c ?? s, e = {};
  return o && (e[`${n}-pad-top`] = o), d && (e[`${n}-pad-bottom`] = d), l && (e[`${n}-pad-left`] = l), p && (e[`${n}-pad-right`] = p), e;
}, w = {
  inset: String,
  insetX: String,
  insetY: String
}, M = g`
	:host {
		box-sizing: border-box;
	}
	:host([hidden]) {
		display: none !important;
	}
`;
export {
  h as a,
  S as b,
  y as c,
  M as d,
  z as e,
  m as f,
  w as i,
  r,
  $ as s
};
