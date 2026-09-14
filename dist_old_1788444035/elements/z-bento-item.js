import { c as a, a as i, j as e, g as r, d as s } from "../chunks/define-element-BWC3wEPr.js";
const c = a`
	:host {
		display: block;
	}

	:host([is-hidden]) {
		display: none;
	}

	.surface {
		position: relative;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: var(--card);
		padding: var(--spacing-6);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		transition: border-color 0.15s ease;
	}

	:host(:hover) .surface,
	:host(:focus-within) .surface {
		border-color: color-mix(in oklch, var(--foreground) 45%, transparent);
	}

	.background {
		position: absolute;
		inset: 0;
		z-index: 0;
		opacity: 0.92;
		transition:
			transform 0.35s ease,
			opacity 0.35s ease;
		pointer-events: none;
	}

	:host(:hover) .background {
		transform: scale(1.045);
	}

	::slotted([slot='background']) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.icon {
		position: relative;
		z-index: 1;
		display: inline-flex;
		color: var(--foreground);
	}

	::slotted([slot='icon']) {
		width: 1.75rem;
		height: 1.75rem;
	}

	.body {
		position: relative;
		z-index: 1;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		justify-content: flex-end;
	}

	.cta {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--foreground);
		text-decoration: none;
		transform: translateY(0.5rem);
		opacity: 0;
		transition:
			transform 0.18s ease,
			opacity 0.18s ease;
	}

	:host(:hover) .cta,
	:host(:focus-within) .cta {
		transform: translateY(0);
		opacity: 1;
	}

	.cta svg {
		width: 0.9rem;
		height: 0.9rem;
		stroke: currentColor;
		fill: none;
		stroke-width: 2;
		transition: transform 0.15s ease;
	}

	.cta:hover svg {
		transform: translateX(0.15rem);
	}

	@media (prefers-reduced-motion: reduce) {
		.background,
		.cta {
			transition: none;
		}
	}
`, l = i(
  (o) => {
    const n = o.colSpan || 1, t = o.rowSpan || 1;
    return /* @__PURE__ */ e("host", { shadowDom: !0, style: { gridColumn: `span ${n}`, gridRow: `span ${t}` }, children: /* @__PURE__ */ r("div", { class: "surface", children: [
      /* @__PURE__ */ e("div", { class: "background", "aria-hidden": "true", children: /* @__PURE__ */ e("slot", { name: "background" }) }),
      /* @__PURE__ */ e("div", { class: "icon", children: /* @__PURE__ */ e("slot", { name: "icon" }) }),
      /* @__PURE__ */ e("div", { class: "body", children: /* @__PURE__ */ e("slot", {}) }),
      o.href && /* @__PURE__ */ r("a", { class: "cta", href: o.href, children: [
        o.ctaLabel || "Learn more",
        /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ e("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
          /* @__PURE__ */ e("polyline", { points: "12 5 19 12 12 19" })
        ] })
      ] })
    ] }) });
  },
  {
    props: {
      colSpan: Number,
      rowSpan: Number,
      href: String,
      ctaLabel: String,
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: c
  }
);
s("z-bento-item", l);
export {
  l as ZBentoItem
};
