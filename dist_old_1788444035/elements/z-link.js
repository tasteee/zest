import { c as s, a as o, j as n, g as i, d as a } from "../chunks/define-element-BWC3wEPr.js";
const l = s`
	:host {
		display: inline-flex;
		user-select: none;
		-webkit-user-select: none;
	}

	:host([is-full-width]) {
		display: flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	a {
		display: inline-flex;
		align-items: center;
		gap: 0.375em;
		font-family: inherit;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		line-height: 1.4;
		color: var(--tone-color);
		transition:
			color 0.12s ease,
			opacity 0.12s ease;
		position: relative;
	}

	/* sizes */
	a.is-sm {
		font-size: var(--font-size-small);
	}
	a.is-md {
		font-size: var(--font-size-body);
	}
	a.is-lg {
		font-size: var(--font-size-h4);
	}

	/* tones */
	a.is-dom {
		--tone-color: var(--purple);
	}
	a.is-sub {
		--tone-color: var(--pink);
	}
	a.is-neutral {
		--tone-color: var(--foreground);
	}

	/* animated underline — grows from the leading edge on hover */
	a.is-underline-hover::after,
	a.is-underline-always::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -1px;
		height: 1px;
		width: 100%;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left center;
		/*transition: transform 0.18s var(--easing-standard, ease-out);*/
	}

	a.is-underline-always::after {
		transform: scaleX(1);
	}

	a.is-underline-hover:hover::after,
	a.is-underline-hover:focus-visible::after,
	a.is-underline-always:hover::after {
		transform: scaleX(1);
	}

	a.is-underline-none:hover {
		opacity: 0.78;
	}

	a:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 3px;
		border-radius: 2px;
	}

	:host([is-disabled]) a {
		color: var(--muted-foreground);
		pointer-events: none;
		opacity: 0.6;
	}

	::slotted(svg) {
		width: 1em;
		height: 1em;
		flex-shrink: 0;
	}

	.external-icon {
		width: 0.82em;
		height: 0.82em;
		flex-shrink: 0;
		stroke: currentColor;
		stroke-width: 1.9;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
`, d = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", u = (e) => e.color === "sub" ? "is-sub" : e.color === "neutral" ? "is-neutral" : "is-dom", c = (e) => e.underline === "always" ? "is-underline-always" : e.underline === "none" ? "is-underline-none" : "is-underline-hover", f = o(
  (e) => {
    const t = [u(e), d(e), c(e)].join(" "), r = e.isExternal || e.target === "_blank";
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: /* @__PURE__ */ i(
      "a",
      {
        class: t,
        href: e.isDisabled ? void 0 : e.href,
        target: e.target || (e.isExternal ? "_blank" : void 0),
        rel: r ? "noopener noreferrer" : void 0,
        "aria-disabled": e.isDisabled ? "true" : void 0,
        children: [
          e.label ? e.label : /* @__PURE__ */ n("slot", {}),
          r && /* @__PURE__ */ i("svg", { class: "external-icon", viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
            /* @__PURE__ */ n("path", { d: "M9 2h5v5" }),
            /* @__PURE__ */ n("path", { d: "m14 2-7 7" }),
            /* @__PURE__ */ n("path", { d: "M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" })
          ] })
        ]
      }
    ) });
  },
  {
    props: {
      href: String,
      target: String,
      label: String,
      size: { type: String, reflect: !0 },
      color: { type: String, reflect: !0 },
      underline: { type: String, reflect: !0 },
      isExternal: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: l
  }
);
a("z-link", f);
export {
  f as ZLink
};
