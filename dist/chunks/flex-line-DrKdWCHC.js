import { c as b } from "./define-element-BZUk-KLk.js";
import { e as f, p as k, f as w, c, a as h, b as y } from "./layout-schema-CdiVYtzv.js";
const j = {
  small: "40rem",
  medium: "48rem",
  large: "64rem",
  "extra-large": "80rem"
}, v = ["top", "bottom", "left", "right"], A = (t) => f([
  ...k(t),
  t + "-gap",
  t + "-margin-top",
  t + "-margin-bottom",
  t + "-margin-left",
  t + "-margin-right",
  t + "-justify",
  t + "-align",
  t + "-stacked-justify",
  t + "-stacked-align"
]), E = (t, a) => b`
	:host {
		display: flex;
		flex-direction: ${a};
		gap: var(${t}-gap, 0);
		justify-content: var(${t}-justify, flex-start);
		align-items: var(${t}-align, stretch);
		padding-top: var(${t}-pad-top, 0);
		padding-bottom: var(${t}-pad-bottom, 0);
		padding-inline-start: var(${t}-pad-left, 0);
		padding-inline-end: var(${t}-pad-right, 0);
		margin-top: var(${t}-margin-top, 0);
		margin-bottom: var(${t}-margin-bottom, 0);
		margin-inline-start: var(${t}-margin-left, 0);
		margin-inline-end: var(${t}-margin-right, 0);
	}

	:host([does-wrap]) {
		flex-wrap: wrap;
	}

	:host([is-full-width]) {
		width: 100%;
	}

	:host([is-full-height]) {
		height: 100%;
	}
`, S = (t, a, n) => {
  const s = "@media (max-width: calc(" + n + " - 0.02px))", i = ":host([stack-below='" + a + "'])", o = "justify-content: var(" + t + "-stacked-justify, flex-start);", e = "align-items: var(" + t + "-stacked-align, stretch);";
  return s + " { " + i + " { flex-direction: column; flex-wrap: nowrap; " + o + " " + e + " } }";
}, B = (t) => Object.entries(j).map((s) => S(t, s[0], s[1])).join(`
`), L = (t) => b`
	${B(t)}
`, I = (t, a, n) => {
  const s = { ...w(t, a) }, i = c(t.gap), o = c(t.padding), e = c(t.margin), g = n === "row" ? t.alignsX : t.alignsY, r = n === "row" ? t.alignsY : t.alignsX, d = h(g), m = y(r);
  i && (s[`${a}-gap`] = i), o && v.forEach((l) => s[`${a}-pad-${l}`] = o), e && v.forEach((l) => s[`${a}-margin-${l}`] = e), d && (s[`${a}-justify`] = d), m && (s[`${a}-align`] = m);
  const u = h(r), $ = y(g);
  return u && (s[`${a}-stacked-justify`] = u), $ && (s[`${a}-stacked-align`] = $), s;
};
export {
  E as a,
  I as b,
  A as f,
  L as s
};
