// @ts-self-types="./z-link.d.ts"
import { c as s, a as o, j as r, g as i, d as l } from "../chunks/define-element-BZUk-KLk.js";
import { o as t } from "../chunks/prop-types-B3Bpi956.js";
const d = s`
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
		font-weight: var(--font-weight-medium);
		text-decoration: none;
		cursor: pointer;
		line-height: var(--line-height-snug);
		color: var(--tone);
		transition:
			color var(--motion-fast) var(--ease-enter),
			opacity var(--motion-fast) var(--ease-enter);
		position: relative;
	}

	/* sizes */
	a.is-sm {
		font-size: var(--font-size-sm);
	}
	a.is-md {
		font-size: var(--font-size-md);
	}
	a.is-lg {
		font-size: var(--font-size-xl);
	}

	/* tones */
	a.is-secondary {
		--tone: var(--accent-secondary);
	}
	a.is-tertiary {
		--tone: var(--accent-tertiary);
	}
	a.is-primary {
		--tone: var(--text-primary);
	}

	/* animated underline, grows from the leading edge on hover */
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
		/*transition: transform var(--motion-base) var(--ease-enter);*/
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
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
		border-radius: var(--radius-xs);
	}

	:host([is-disabled]) a {
		color: var(--text-secondary);
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
`, f = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", c = (e) => e.tone === "tertiary" ? "is-tertiary" : e.tone === "primary" ? "is-primary" : "is-secondary", u = (e) => e.underline === "always" ? "is-underline-always" : e.underline === "none" ? "is-underline-none" : "is-underline-hover", h = o(
  (e) => {
    const a = [c(e), f(e), u(e)].join(" "), n = e.isExternal || e.target === "_blank";
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ i(
      "a",
      {
        class: a,
        href: e.isDisabled ? void 0 : e.href,
        target: e.target || (e.isExternal ? "_blank" : void 0),
        rel: n ? "noopener noreferrer" : void 0,
        "aria-disabled": e.isDisabled ? "true" : void 0,
        children: [
          e.label ? e.label : /* @__PURE__ */ r("slot", {}),
          n && /* @__PURE__ */ i("svg", { class: "external-icon", viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
            /* @__PURE__ */ r("path", { d: "M9 2h5v5" }),
            /* @__PURE__ */ r("path", { d: "m14 2-7 7" }),
            /* @__PURE__ */ r("path", { d: "M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" })
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
      size: { type: t("sm", "md", "lg"), reflect: !0 },
      tone: { type: t("primary", "secondary", "tertiary"), reflect: !0 },
      underline: { type: t("hover", "always", "none"), reflect: !0 },
      isExternal: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: d
  }
);
l("z-link", h);
export {
  h as ZLink
};
