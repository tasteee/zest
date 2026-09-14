import { c, a as u, j as z, d as v } from "../chunks/define-element-BWC3wEPr.js";
import { i as y, r as e, c as n, a as B, b as X } from "../chunks/layout-schema-SeDcUpZQ.js";
const Y = (i) => /^-?\d+$/.test(i), a = (i) => {
  if (!(i == null || i === ""))
    return Y(i) ? `${i}px` : i;
}, H = {
  inline: { type: Boolean, reflect: !0 },
  doesWrap: { type: Boolean, reflect: !0 },
  doesWrapText: { type: Boolean, reflect: !0 },
  isFullWidth: { type: Boolean, reflect: !0 },
  isFullHeight: { type: Boolean, reflect: !0 }
}, W = {
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
  direction: { type: String, reflect: !0 },
  alignsX: String,
  alignsY: String,
  ...y
}, f = { ...H, ...W }, j = (i, g) => {
  const t = {};
  for (const o of Object.keys(i))
    g.includes(o) || (t[o] = i[o]);
  return t;
};
j(f, ["direction"]);
const A = (i) => {
  const g = {}, t = (S, b) => {
    b !== void 0 && (g[S] = b);
  }, o = e(i.inset), r = e(i.insetX), d = e(i.insetY);
  t("--z-box-padding-top", d ?? o), t("--z-box-padding-bottom", d ?? o), t("--z-box-padding-left", r ?? o), t("--z-box-padding-right", r ?? o), t("--z-box-gap", n(i.gap)), t("--z-box-row-gap", n(i.rowGap)), t("--z-box-column-gap", n(i.columnGap)), t("--z-box-margin", n(i.margin)), t("--z-box-margin-top", n(i.marginTop)), t("--z-box-margin-right", n(i.marginRight)), t("--z-box-margin-bottom", n(i.marginBottom)), t("--z-box-margin-left", n(i.marginLeft));
  const x = n(i.marginX);
  t("--z-box-margin-left", x), t("--z-box-margin-right", x);
  const l = n(i.marginY);
  t("--z-box-margin-top", l), t("--z-box-margin-bottom", l), t("--z-box-padding", n(i.padding)), t("--z-box-padding-top", n(i.paddingTop)), t("--z-box-padding-right", n(i.paddingRight)), t("--z-box-padding-bottom", n(i.paddingBottom)), t("--z-box-padding-left", n(i.paddingLeft));
  const m = n(i.paddingX);
  t("--z-box-padding-left", m), t("--z-box-padding-right", m);
  const h = n(i.paddingY);
  t("--z-box-padding-top", h), t("--z-box-padding-bottom", h), t("--z-box-width", a(i.width)), t("--z-box-min-width", a(i.minWidth)), t("--z-box-max-width", a(i.maxWidth)), t("--z-box-height", a(i.height)), t("--z-box-min-height", a(i.minHeight)), t("--z-box-max-height", a(i.maxHeight));
  const s = i.direction !== "vertical", p = s ? i.alignsX : i.alignsY, w = s ? i.alignsY : i.alignsX;
  return t("--z-box-justify", B(p)), t("--z-box-align", X(w)), g;
}, L = c`
	:host {
		margin: var(--z-box-margin);
		margin-top: var(--z-box-margin-top);
		margin-right: var(--z-box-margin-right);
		margin-bottom: var(--z-box-margin-bottom);
		margin-left: var(--z-box-margin-left);
		padding: var(--z-box-padding);
		padding-top: var(--z-box-padding-top);
		padding-right: var(--z-box-padding-right);
		padding-bottom: var(--z-box-padding-bottom);
		padding-left: var(--z-box-padding-left);
		gap: var(--z-box-gap);
		row-gap: var(--z-box-row-gap, var(--z-box-gap));
		column-gap: var(--z-box-column-gap, var(--z-box-gap));
		width: var(--z-box-width);
		min-width: var(--z-box-min-width, 0);
		max-width: var(--z-box-max-width);
		height: var(--z-box-height);
		min-height: var(--z-box-min-height);
		max-height: var(--z-box-max-height);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: var(--z-box-justify, flex-start);
		align-items: var(--z-box-align, stretch);
	}

	/* The one display modifier that composes with flex rather than replacing
	   it. Everything else — grid, block, inline-block — left with z-box's
	   display switch; grid belongs to z-grid. */
	:host([inline]) {
		display: inline-flex;
	}

	:host([direction='horizontal']) {
		flex-direction: row;
	}

	:host([direction='vertical']) {
		flex-direction: column;
	}

	:host([does-wrap]) {
		flex-wrap: wrap;
	}

	:host([does-wrap-text]) {
		white-space: normal;
	}

	:host([is-full-width]) {
		width: 100%;
	}

	:host([is-full-height]) {
		height: 100%;
	}
`, P = c`
	:host {
		box-sizing: border-box;
	}
`, T = u(
  (i) => /* @__PURE__ */ z("host", { shadowDom: !0, style: A(i), children: /* @__PURE__ */ z("slot", {}) }),
  {
    props: f,
    styles: [P, L]
  }
);
v("z-box", T);
export {
  T as ZBox
};
