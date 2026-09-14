import { c as g, a as n, j as i } from "./define-element-BWC3wEPr.js";
const r = g`
	:host {
		color: var(--foreground);
	}

	:host([is-hidden]) {
		display: none;
	}

	/* ::selection doesn't cross shadow boundaries, so the page-wide selection
	   style (ink.css) never reaches this component's slotted text — without this
	   you'd get the browser's default blue while the window is focused. Restate
	   it here against the shared --selection-* tokens so prose highlights the
	   same as everything else. */
	::selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}

	::-moz-selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}

	.text {
		margin: 0;
		padding: 0;
		color: inherit;
		font-family: inherit;
		font-style: normal;
		font-weight: var(--z-text-weight, 400);
		text-decoration: none;
		text-transform: none;
		box-sizing: border-box;
	}

	/* ---------------------------------------------
	   heading
	--------------------------------------------- */

	/* Headings are the one tier a theme may re-face. Everything here defaults
	   back to the sans stack and its weight, so a theme that says nothing gets
	   exactly what it always got; the haze theme swaps in a serif.
	   --font-heading-settings carries variable-font axes, which is how a face
	   like Fraunces gets its optical size and softness set without this
	   component knowing either name. */
	.text.is-heading {
		font-family: var(--font-heading, inherit);
		font-weight: var(--z-text-weight, var(--font-heading-weight, 700));
		font-variation-settings: var(--font-heading-settings, normal);
	}

	.text.is-heading.is-xxl {
		font-size: calc(var(--base-font-size, 16px) * 4);
		line-height: 1.125;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.06 * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-xl {
		font-size: calc(var(--base-font-size, 16px) * 3.5);
		line-height: 1.142857;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.05 * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-lg {
		font-size: calc(var(--base-font-size, 16px) * 3);
		line-height: 1.166667;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.04 * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-md {
		font-size: calc(var(--base-font-size, 16px) * 2.5);
		line-height: 1.3;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.03375 * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-sm {
		font-size: calc(var(--base-font-size, 16px) * 2);
		line-height: 1.25;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.03 * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-xs {
		font-size: calc(var(--base-font-size, 16px) * 1.5);
		line-height: 1.333333;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.00625 * var(--font-heading-tracking-scale, 1));
	}

	/* ---------------------------------------------
	   subheading
	--------------------------------------------- */

	.text.is-subheading {
		text-transform: uppercase;
		font-weight: var(--z-text-weight, 600);
	}

	.text.is-subheading.is-xl {
		font-size: calc(var(--base-font-size, 16px) * 1.25);
		line-height: 1.2;
		letter-spacing: calc(var(--base-font-size, 16px) * 0.075);
	}

	.text.is-subheading.is-lg {
		font-size: calc(var(--base-font-size, 16px) * 1.125);
		line-height: 1.333333;
		letter-spacing: calc(var(--base-font-size, 16px) * 0.075);
	}

	.text.is-subheading.is-md {
		font-size: var(--base-font-size, 16px);
		line-height: 1.25;
		letter-spacing: calc(var(--base-font-size, 16px) * 0.075);
	}

	.text.is-subheading.is-sm {
		font-size: calc(var(--base-font-size, 16px) * 0.875);
		line-height: 1.428571;
		letter-spacing: calc(var(--base-font-size, 16px) * 0.05);
	}

	.text.is-subheading.is-xs {
		font-size: calc(var(--base-font-size, 16px) * 0.75);
		line-height: 1.333333;
		letter-spacing: calc(var(--base-font-size, 16px) * 0.05);
	}

	/* ---------------------------------------------
	   text / paragraph
	--------------------------------------------- */

	.text.is-text {
		font-weight: var(--z-text-weight, 400);
	}

	.text.is-text.is-xxl {
		font-size: calc(var(--base-font-size, 16px) * 1.5);
		line-height: 1.666667;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.0275);
	}

	.text.is-text.is-xl {
		font-size: calc(var(--base-font-size, 16px) * 1.25);
		line-height: 1.6;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.02);
	}

	.text.is-text.is-lg {
		font-size: calc(var(--base-font-size, 16px) * 1.125);
		line-height: 1.777778;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.01625);
	}

	.text.is-text.is-md {
		font-size: var(--base-font-size, 16px);
		line-height: 1.75;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.01125);
	}

	.text.is-text.is-sm {
		font-size: calc(var(--base-font-size, 16px) * 0.875);
		line-height: 1.714286;
		letter-spacing: calc(var(--base-font-size, 16px) * -0.005);
	}

	.text.is-text.is-xs {
		font-size: calc(var(--base-font-size, 16px) * 0.75);
		line-height: 1.333333;
		letter-spacing: 0;
	}

	/* ---------------------------------------------
	   label
	--------------------------------------------- */

	.text.is-label {
		color: var(--color-neutral-5);
		font-size: var(--font-size-small);
		font-weight: 600;
		line-height: 1;
		letter-spacing: 0.04em;
		text-transform: lowercase;
		font-variant-caps: all-small-caps;
		user-select: none;
		-webkit-user-select: none;
	}

	/* ---------------------------------------------
	   colors
	--------------------------------------------- */

	.text.is-neutral {
		color: var(--foreground);
	}

	.text.is-dom {
		color: var(--purple);
	}

	.text.is-sub {
		color: var(--pink);
	}

	.text.is-muted {
		color: var(--muted-foreground);
	}

	.text.is-strong {
		color: var(--color-neutral-9);
	}

	.text.is-success {
		color: var(--success);
	}

	.text.is-warning {
		color: var(--warning);
	}

	.text.is-error {
		color: var(--destructive);
	}



	/* ---------------------------------------------
	   decoration overrides
	--------------------------------------------- */

	.text.is-italic {
		font-style: italic;
	}

	.text.is-underlined {
		text-decoration: underline;
	}

	.text.is-strikethrough {
		text-decoration: line-through;
	}

	.text.is-underlined.is-strikethrough {
		text-decoration: underline line-through;
	}

	/* ---------------------------------------------
	   inline (z-inline) — carries no size opinion of its
	   own. font-size/line-height/letter-spacing/font-family
	   inherit from whatever it's dropped into, so it can sit
	   inside a z-text/z-heading of any size without silently
	   resetting to the md default. Only color, weight, and
	   italic/underline/strikethrough are overridable.
	--------------------------------------------- */

	.inline {
		margin: 0;
		padding: 0;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		letter-spacing: inherit;
		font-weight: var(--z-text-weight, inherit);
		font-style: inherit;
		text-decoration: inherit;
		text-transform: inherit;
		box-sizing: border-box;
	}

	.inline.is-dom {
		color: var(--purple);
	}

	.inline.is-sub {
		color: var(--pink);
	}

	.inline.is-muted {
		color: var(--muted-foreground);
	}

	.inline.is-strong {
		color: var(--color-neutral-9);
	}

	.inline.is-neutral {
		color: var(--foreground);
	}

	.inline.is-success {
		color: var(--success);
	}

	.inline.is-warning {
		color: var(--warning);
	}

	.inline.is-error {
		color: var(--destructive);
	}






	.inline.is-italic {
		font-style: italic;
	}

	.inline.is-underlined {
		text-decoration: underline;
	}

	.inline.is-strikethrough {
		text-decoration: line-through;
	}

	.inline.is-underlined.is-strikethrough {
		text-decoration: underline line-through;
	}
`, d = (e, t) => e.size === "xxl" ? "is-xxl" : e.size === "xl" ? "is-xl" : e.size === "lg" ? "is-lg" : e.size === "md" ? "is-md" : e.size === "sm" ? "is-sm" : e.size === "xs" ? "is-xs" : t, u = (e) => e.color === "dom" ? "is-dom" : e.color === "sub" ? "is-sub" : e.color === "muted" ? "is-muted" : e.color === "strong" ? "is-strong" : e.color === "success" ? "is-success" : e.color === "warning" ? "is-warning" : e.color === "error" ? "is-error" : "is-neutral", a = (e) => e.weight != null && String(e.weight).trim() !== "" ? String(e.weight).trim() : "", f = {
  xxl: "h1",
  xl: "h2",
  lg: "h3",
  md: "h4",
  sm: "h5",
  xs: "h6"
}, x = (e) => e.tag ? e.tag : f[e.size] || "h4", o = (e, t, s) => {
  const c = d(e, s), h = u(e);
  return ["text", t, c, h].concat(e.isItalic ? ["is-italic"] : []).concat(e.isUnderlined ? ["is-underlined"] : []).concat(e.isStrikethrough ? ["is-strikethrough"] : []).join(" ");
}, v = (e) => e.color === "dom" ? "is-dom" : e.color === "sub" ? "is-sub" : e.color === "muted" ? "is-muted" : e.color === "strong" ? "is-strong" : e.color === "neutral" ? "is-neutral" : "", z = (e) => {
  const t = v(e);
  return ["inline"].concat(t ? [t] : []).concat(e.isItalic ? ["is-italic"] : []).concat(e.isUnderlined ? ["is-underlined"] : []).concat(e.isStrikethrough ? ["is-strikethrough"] : []).join(" ");
}, l = {
  size: { type: String, reflect: !0 },
  color: { type: String, reflect: !0 },
  weight: { type: String, reflect: !0 },
  tag: String,
  isHidden: { type: Boolean, reflect: !0 },
  isItalic: { type: Boolean, reflect: !0 },
  isUnderlined: { type: Boolean, reflect: !0 },
  isStrikethrough: { type: Boolean, reflect: !0 }
}, w = n(
  (e) => {
    const t = x(e), s = o(e, "is-heading", "is-md");
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": a(e) }, children: /* @__PURE__ */ i(t, { class: s, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: l,
    styles: r
  }
), p = n(
  (e) => {
    const t = e.tag || "p", s = o(e, "is-subheading", "is-md");
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": a(e) }, children: /* @__PURE__ */ i(t, { class: s, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: l,
    styles: r
  }
), y = n(
  (e) => {
    const t = e.tag || "p", s = o(e, "is-text", "is-md");
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": a(e) }, children: /* @__PURE__ */ i(t, { class: s, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: l,
    styles: r
  }
), k = n(
  (e) => {
    const t = e.tag || "span";
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: /* @__PURE__ */ i(t, { class: "text is-label", children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: {
      tag: String,
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: r
  }
), b = {
  color: { type: String, reflect: !0 },
  weight: { type: String, reflect: !0 },
  tag: String,
  isHidden: { type: Boolean, reflect: !0 },
  isItalic: { type: Boolean, reflect: !0 },
  isUnderlined: { type: Boolean, reflect: !0 },
  isStrikethrough: { type: Boolean, reflect: !0 }
}, S = n(
  (e) => {
    const t = e.tag || "span", s = z(e);
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": a(e) }, children: /* @__PURE__ */ i(t, { class: s, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: b,
    styles: r
  }
);
export {
  w as Z,
  S as a,
  k as b,
  p as c,
  y as d
};
