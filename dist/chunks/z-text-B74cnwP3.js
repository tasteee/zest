import { c as d, a as s, j as i } from "./define-element-BZUk-KLk.js";
import { o as r } from "./prop-types-B3Bpi956.js";
const a = d`
	:host {
		color: var(--text-primary);
	}

	:host([is-hidden]) {
		display: none;
	}

	/* ::selection doesn't cross shadow boundaries, so the page-wide selection
	   style (ink.css) never reaches this component's slotted text, without this
	   you'd get the browser's default blue while the window is focused. Restate
	   it here against the shared --selection-* tokens so prose highlights the
	   same as everything else. */
	::selection {
		background: var(--surface-selection);
		color: var(--text-selection);
	}

	::-moz-selection {
		background: var(--surface-selection);
		color: var(--text-selection);
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
		font-size: var(--font-size-7xl);
		line-height: var(--line-height-tight);
		letter-spacing: calc(-0.015em * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-xl {
		font-size: var(--font-size-6xl);
		line-height: var(--line-height-tight);
		letter-spacing: calc(-0.01429em * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-lg {
		font-size: var(--font-size-5xl);
		line-height: var(--line-height-tight);
		letter-spacing: calc(-0.01333em * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-md {
		font-size: var(--font-size-4xl);
		line-height: var(--line-height-snug);
		letter-spacing: calc(-0.0135em * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-sm {
		font-size: var(--font-size-3xl);
		line-height: var(--line-height-tight);
		letter-spacing: calc(-0.015em * var(--font-heading-tracking-scale, 1));
	}

	.text.is-heading.is-xs {
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-snug);
		letter-spacing: calc(-0.00417em * var(--font-heading-tracking-scale, 1));
	}

	/* ---------------------------------------------
	   subheading
	--------------------------------------------- */

	.text.is-subheading {
		text-transform: uppercase;
		font-weight: var(--z-text-weight, 600);
	}

	.text.is-subheading.is-xl {
		font-size: var(--font-size-xl);
		line-height: var(--line-height-tight);
		letter-spacing: 0.06em;
	}

	.text.is-subheading.is-lg {
		font-size: var(--font-size-lg);
		line-height: var(--line-height-snug);
		letter-spacing: 0.06667em;
	}

	.text.is-subheading.is-md {
		font-size: var(--font-size-md);
		line-height: var(--line-height-tight);
		letter-spacing: 0.075em;
	}

	.text.is-subheading.is-sm {
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
		letter-spacing: 0.05714em;
	}

	.text.is-subheading.is-xs {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-snug);
		letter-spacing: 0.06667em;
	}

	/* ---------------------------------------------
	   text / paragraph
	--------------------------------------------- */

	.text.is-text {
		font-weight: var(--z-text-weight, 400);
	}

	.text.is-text.is-xxl {
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-normal);
		letter-spacing: -0.01833em;
	}

	.text.is-text.is-xl {
		font-size: var(--font-size-xl);
		line-height: var(--line-height-normal);
		letter-spacing: -0.016em;
	}

	.text.is-text.is-lg {
		font-size: var(--font-size-lg);
		line-height: var(--line-height-relaxed);
		letter-spacing: -0.01444em;
	}

	.text.is-text.is-md {
		font-size: var(--font-size-md);
		line-height: var(--line-height-relaxed);
		letter-spacing: -0.01125em;
	}

	.text.is-text.is-sm {
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		letter-spacing: -0.00571em;
	}

	.text.is-text.is-xs {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-snug);
		letter-spacing: 0;
	}

	/* ---------------------------------------------
	   label
	--------------------------------------------- */

	.text.is-label {
		color: var(--text-tertiary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-none);
		letter-spacing: 0.04em;
		text-transform: lowercase;
		font-variant-caps: all-small-caps;
		user-select: none;
		-webkit-user-select: none;
	}

	/* ---------------------------------------------
	   colors
	--------------------------------------------- */

	.text.is-primary {
		color: var(--text-primary);
	}

	.text.is-secondary {
		color: var(--accent-secondary);
	}

	.text.is-tertiary {
		color: var(--accent-tertiary);
	}

	.text.is-muted {
		color: var(--text-secondary);
	}

	.text.is-strong {
		color: var(--text-strong);
	}

	.text.is-success {
		color: var(--status-success);
	}

	.text.is-warning {
		color: var(--status-warning);
	}

	.text.is-danger {
		color: var(--status-danger);
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
	   inline (z-inline), carries no size opinion of its
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

	.inline.is-secondary {
		color: var(--accent-secondary);
	}

	.inline.is-tertiary {
		color: var(--accent-tertiary);
	}

	.inline.is-muted {
		color: var(--text-secondary);
	}

	.inline.is-strong {
		color: var(--text-strong);
	}

	.inline.is-primary {
		color: var(--text-primary);
	}

	.inline.is-success {
		color: var(--status-success);
	}

	.inline.is-warning {
		color: var(--status-warning);
	}

	.inline.is-danger {
		color: var(--status-danger);
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
`, u = (e, t) => e.size === "xxl" ? "is-xxl" : e.size === "xl" ? "is-xl" : e.size === "lg" ? "is-lg" : e.size === "md" ? "is-md" : e.size === "sm" ? "is-sm" : e.size === "xs" ? "is-xs" : t, x = (e) => e.color === "secondary" ? "is-secondary" : e.color === "tertiary" ? "is-tertiary" : e.color === "muted" ? "is-muted" : e.color === "strong" ? "is-strong" : e.color === "success" ? "is-success" : e.color === "warning" ? "is-warning" : e.color === "danger" ? "is-danger" : "is-primary", o = (e) => typeof e.weight == "number" && Number.isFinite(e.weight) ? String(e.weight) : "", f = {
  xxl: "h1",
  xl: "h2",
  lg: "h3",
  md: "h4",
  sm: "h5",
  xs: "h6"
}, m = (e) => e.tag ? e.tag : f[e.size] || "h4", l = (e, t, n) => {
  const h = u(e, n), g = x(e);
  return ["text", t, h, g].concat(e.isItalic ? ["is-italic"] : []).concat(e.isUnderlined ? ["is-underlined"] : []).concat(e.isStrikethrough ? ["is-strikethrough"] : []).join(" ");
}, v = (e) => e.color === "secondary" ? "is-secondary" : e.color === "tertiary" ? "is-tertiary" : e.color === "muted" ? "is-muted" : e.color === "strong" ? "is-strong" : e.color === "primary" ? "is-primary" : "", y = (e) => {
  const t = v(e);
  return ["inline"].concat(t ? [t] : []).concat(e.isItalic ? ["is-italic"] : []).concat(e.isUnderlined ? ["is-underlined"] : []).concat(e.isStrikethrough ? ["is-strikethrough"] : []).join(" ");
}, c = {
  color: { type: r("primary", "secondary", "tertiary", "success", "warning", "danger", "muted", "strong"), reflect: !0 },
  weight: { type: Number, reflect: !0 },
  tag: String,
  isHidden: { type: Boolean, reflect: !0 },
  isItalic: { type: Boolean, reflect: !0 },
  isUnderlined: { type: Boolean, reflect: !0 },
  isStrikethrough: { type: Boolean, reflect: !0 }
}, z = {
  ...c,
  size: { type: r("xs", "sm", "md", "lg", "xl", "xxl"), reflect: !0 }
}, T = s(
  (e) => {
    const t = m(e), n = l(e, "is-heading", "is-md");
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": o(e) }, children: /* @__PURE__ */ i(t, { class: n, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: z,
    styles: a
  }
), w = {
  ...c,
  size: { type: r("xs", "sm", "md", "lg", "xl"), reflect: !0 }
}, N = s(
  (e) => {
    const t = e.tag || "p", n = l(e, "is-subheading", "is-md");
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": o(e) }, children: /* @__PURE__ */ i(t, { class: n, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: w,
    styles: a
  }
), b = {
  ...c,
  size: { type: r("xs", "sm", "md", "lg", "xl", "xxl"), reflect: !0 }
}, C = s(
  (e) => {
    const t = e.tag || "p", n = l(e, "is-text", "is-md");
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": o(e) }, children: /* @__PURE__ */ i(t, { class: n, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: b,
    styles: a
  }
), I = s(
  (e) => {
    const t = e.tag || "span", n = l(e, "is-label", "is-md");
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": o(e) }, children: /* @__PURE__ */ i(t, { class: n, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: c,
    styles: a
  }
), k = {
  color: { type: r("primary", "secondary", "tertiary", "muted", "strong"), reflect: !0 },
  weight: { type: Number, reflect: !0 },
  tag: String,
  isHidden: { type: Boolean, reflect: !0 },
  isItalic: { type: Boolean, reflect: !0 },
  isUnderlined: { type: Boolean, reflect: !0 },
  isStrikethrough: { type: Boolean, reflect: !0 }
}, B = s(
  (e) => {
    const t = e.tag || "span", n = y(e);
    return /* @__PURE__ */ i("host", { shadowDom: !0, style: { "--z-text-weight": o(e) }, children: /* @__PURE__ */ i(t, { class: n, children: /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: k,
    styles: a
  }
);
export {
  T as Z,
  B as a,
  I as b,
  N as c,
  C as d
};
