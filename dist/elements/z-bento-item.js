// @ts-self-types="./z-bento-item.d.ts"
import { c as i, a as s, j as e, g as r, d as l } from "../chunks/define-element-BZUk-KLk.js";
import { u as c } from "../chunks/locale-Bb4aqXuR.js";
const d = i`
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
		border: 1px solid var(--border-default);
		background: var(--surface-default);
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		transition: border-color var(--motion-fast) var(--ease-enter);
	}

	:host(:hover) .surface,
	:host(:focus-within) .surface {
		border-color: color-mix(in oklch, var(--text-primary) 45%, transparent);
	}

	.background {
		position: absolute;
		inset: 0;
		z-index: 0;
		opacity: 0.92;
		transition:
			transform var(--motion-slow) var(--ease-enter),
			opacity var(--motion-slow) var(--ease-enter);
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
		color: var(--text-primary);
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
		gap: var(--space-1);
		justify-content: flex-end;
	}

	.cta {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
		text-decoration: none;
		transform: translateY(0.5rem);
		opacity: 0;
		transition:
			transform var(--motion-fast) var(--ease-enter),
			opacity var(--motion-fast) var(--ease-enter);
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
		transition: transform var(--motion-fast) var(--ease-enter);
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
`, f = s(
  (o) => {
    const t = c(), a = o.colSpan || 1, n = o.rowSpan || 1;
    return /* @__PURE__ */ e("host", { shadowDom: !0, style: { gridColumn: `span ${a}`, gridRow: `span ${n}` }, children: /* @__PURE__ */ r("div", { class: "surface", children: [
      /* @__PURE__ */ e("div", { class: "background", "aria-hidden": "true", children: /* @__PURE__ */ e("slot", { name: "background" }) }),
      /* @__PURE__ */ e("div", { class: "icon", children: /* @__PURE__ */ e("slot", { name: "icon" }) }),
      /* @__PURE__ */ e("div", { class: "body", children: /* @__PURE__ */ e("slot", {}) }),
      o.href && /* @__PURE__ */ r("a", { class: "cta", href: o.href, children: [
        o.ctaLabel || t("learnMore"),
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
    styles: d
  }
);
l("z-bento-item", f);
export {
  f as ZBentoItem
};
