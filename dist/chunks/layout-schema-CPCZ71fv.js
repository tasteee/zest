import { c as g } from "./define-element-BZUk-KLk.js";
const m = {
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
  xs: "20rem",
  sm: "30rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
  "3xl": "120rem",
  full: "100%",
  screen: "100vw"
}, f = {
  none: "0",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "calc(var(--radius) + 8px)",
  full: "9999px"
}, h = {
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
}, x = {
  start: "start",
  center: "center",
  end: "end",
  stretch: "stretch",
  between: "stretch",
  around: "stretch",
  evenly: "stretch"
}, n = (t, e) => (s) => {
  if (!(s == null || s === ""))
    return t[s] ?? (e ? s : void 0);
}, a = n(m, !0), S = n(u, !0), y = n(f, !0), $ = n(h, !1), w = n(v, !1), z = n(x, !1), A = (t) => {
  if (!(t == null || t === ""))
    return typeof t == "number" || /^\d+$/.test(String(t)) ? `var(--spacing-${typeof t == "number" ? t : Number(t)})` : a(String(t));
}, M = { type: String }, V = (t) => {
  if (t === "start") return "flex-start";
  if (t === "center") return "center";
  if (t === "end") return "flex-end";
}, j = (t, e) => {
  const s = a(t.inset), c = a(t.insetX), o = a(t.insetY), i = o ?? s, d = o ?? s, l = c ?? s, p = c ?? s, r = {};
  return i && (r[`${e}-pad-top`] = i), d && (r[`${e}-pad-bottom`] = d), l && (r[`${e}-pad-left`] = l), p && (r[`${e}-pad-right`] = p), r;
}, k = {
  inset: String,
  insetX: String,
  insetY: String
}, N = (t) => {
  const e = t.map((s) => s + ": initial;").join(" ");
  return g`
		:host {
			${e}
		}
	`;
}, P = (t) => [
  t + "-pad-top",
  t + "-pad-bottom",
  t + "-pad-left",
  t + "-pad-right"
], X = g`
	:host {
		box-sizing: border-box;
	}
	:host([hidden]) {
		display: none !important;
	}
`;
export {
  $ as a,
  w as b,
  A as c,
  X as d,
  N as e,
  j as f,
  V as g,
  S as h,
  k as i,
  z as j,
  y as k,
  P as p,
  a as r,
  M as s
};
