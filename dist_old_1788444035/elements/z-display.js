import { c as o, a, j as s, d as r } from "../chunks/define-element-BWC3wEPr.js";
const n = o`
	:host {
		display: block;
		color: var(--foreground);
	}

	:host([is-hidden]) {
		display: none;
	}

	/* ::selection doesn't cross shadow boundaries — restate it against the shared
	   tokens so a highlighted title matches the rest of the page (see z-text). */
	::selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}
	::-moz-selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}

	/* Same heading tier as z-text's is-heading, and re-faced by the same
	   tokens — a theme that gives headings a serif has to reach the display
	   tier too, or the largest type on the page is the one that misses it.
	   Every token falls back to what this rule used to hardcode. */
	.display {
		margin: 0;
		padding: 0;
		font-family: var(--font-heading, inherit);
		font-weight: var(--z-text-weight, var(--font-heading-weight, 700));
		font-variation-settings: var(--font-heading-settings, normal);
		line-height: 0.95;
		letter-spacing: calc(-0.03em * var(--font-heading-tracking-scale, 1));
		color: inherit;
		text-wrap: balance;
	}

	.display.is-xl {
		font-size: clamp(3.5rem, 11vw, 7.5rem);
	}
	.display.is-lg {
		font-size: clamp(3rem, 9vw, 6rem);
	}
	.display.is-md {
		font-size: clamp(2.5rem, 7vw, 4.5rem);
	}
	.display.is-sm {
		font-size: clamp(2rem, 5vw, 3.25rem);
	}

	/* colors — same vocabulary as z-text (neutral default = --foreground) */
	.display.is-dom {
		color: var(--purple);
	}
	.display.is-sub {
		color: var(--pink);
	}
	.display.is-muted {
		color: var(--muted-foreground);
	}
	.display.is-strong {
		color: var(--color-neutral-9);
	}

`, l = {
  xl: "is-xl",
  lg: "is-lg",
  md: "is-md",
  sm: "is-sm"
}, c = (e) => e.weight != null && String(e.weight).trim() !== "" ? String(e.weight).trim() : "", d = (e) => {
  const t = l[e.size] || "is-lg", i = e.color === "dom" ? "is-dom" : e.color === "sub" ? "is-sub" : e.color === "muted" ? "is-muted" : e.color === "strong" ? "is-strong" : "";
  return ["display", t].concat(i ? [i] : []).join(" ");
}, g = a(
  (e) => {
    const t = e.tag || "h1";
    return /* @__PURE__ */ s("host", { shadowDom: !0, style: { "--z-text-weight": c(e) }, children: /* @__PURE__ */ s(t, { class: d(e), children: /* @__PURE__ */ s("slot", {}) }) });
  },
  {
    props: {
      size: { type: String, reflect: !0 },
      color: { type: String, reflect: !0 },
      weight: { type: String, reflect: !0 },
      tag: String,
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: n
  }
);
r("z-display", g);
export {
  g as ZDisplay
};
