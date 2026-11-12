import { c as m } from "./define-element-BZUk-KLk.js";
const u = {
  0: "0",
  "2xs": "var(--space-1)",
  xs: "var(--space-2)",
  sm: "var(--space-3)",
  md: "var(--space-4)",
  lg: "var(--space-6)",
  xl: "var(--space-8)",
  "2xl": "var(--space-12)",
  "3xl": "var(--space-16)",
  "4xl": "var(--space-24)"
}, f = {
  xs: "20rem",
  sm: "30rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
  "3xl": "120rem",
  full: "100%",
  screen: "100vw"
}, h = {
  none: "0",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "calc(var(--radius) + 8px)",
  full: "9999px"
}, g = {
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
}, r = (t, s) => (e) => {
  if (!(e == null || e === ""))
    return t[e] ?? (s ? e : void 0);
}, a = r(u, !0), S = r(f, !0), y = r(h, !0), $ = r(g, !1), w = r(v, !1), z = r(x, !1), A = (t) => {
  if (!(t == null || t === ""))
    return typeof t == "number" || /^\d+$/.test(String(t)) ? `var(--space-${typeof t == "number" ? t : Number(t)})` : a(String(t));
}, M = { type: String }, V = (t) => {
  if (t === "start") return "flex-start";
  if (t === "center") return "center";
  if (t === "end") return "flex-end";
}, j = (t, s) => {
  const e = a(t.inset), c = a(t.insetX), o = a(t.insetY), i = o ?? e, d = o ?? e, l = c ?? e, p = c ?? e, n = {};
  return i && (n[`${s}-pad-top`] = i), d && (n[`${s}-pad-bottom`] = d), l && (n[`${s}-pad-left`] = l), p && (n[`${s}-pad-right`] = p), n;
}, k = {
  inset: String,
  insetX: String,
  insetY: String
}, N = (t) => {
  const s = t.map((e) => e + ": initial;").join(" ");
  return m`
		:host {
			${s}
		}
	`;
}, P = (t) => [
  t + "-pad-top",
  t + "-pad-bottom",
  t + "-pad-left",
  t + "-pad-right"
], X = m`
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
