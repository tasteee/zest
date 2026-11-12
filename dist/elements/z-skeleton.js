// @ts-self-types="./z-skeleton.d.ts"
import { c as d, a as c, j as r, d as h } from "../chunks/define-element-BZUk-KLk.js";
import { i as m } from "../chunks/interaction-styles-C6mMacCu.js";
import { o as f } from "../chunks/prop-types-B3Bpi956.js";
const u = d`
	:host {
		display: block;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-inline]) {
		display: inline-block;
	}

	.skeleton {
		position: relative;
		overflow: hidden;
		background: var(--z-skeleton-color, var(--border-default));
		border-radius: var(--radius-sm);
	}

	.skeleton.is-text {
		height: 0.75rem;
		border-radius: var(--radius-full);
	}
	.skeleton.is-circle {
		border-radius: var(--radius-full);
		width: 2.5rem;
		height: 2.5rem;
	}
	.skeleton.is-rect {
		border-radius: var(--radius-md);
		min-height: 6rem;
	}

	.skeleton::after {
		content: '';
		position: absolute;
		inset: 0;
		transform: translateX(-100%);
		will-change: transform;
		background: linear-gradient(
			90deg,
			transparent 15%,
			var(--z-skeleton-shimmer, oklch(from var(--z-skeleton-color, var(--border-default)) calc(l + 0.09) c h)) 50%,
			transparent 85%
		);
		animation: z-skeleton-shimmer 1.5s linear infinite;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-2-5);
	}
	.stack .skeleton:last-child {
		width: 70%;
	}

	@keyframes z-skeleton-shimmer {
		100% {
			transform: translateX(100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton::after {
			animation: none;
		}
	}
`, k = c(
  (e) => {
    const i = e.shape || "text", s = e.lines && e.lines > 1 ? e.lines : 1, t = {};
    e.width && (t.width = e.width), e.height && (t.height = e.height), i === "circle" && e.width && !e.height && (t.height = e.width);
    const l = e.width || (i === "circle" ? "2.5rem" : e.isInline ? "6rem" : "100%"), n = (a) => /* @__PURE__ */ r("div", { class: `skeleton is-${i}`, style: t }, a);
    return /* @__PURE__ */ r("host", { shadowDom: !0, style: { width: l }, "aria-busy": "true", "aria-live": "polite", children: s > 1 ? /* @__PURE__ */ r("div", { class: "stack", children: Array.from({ length: s }).map((a, o) => n(o)) }) : n() });
  },
  {
    props: {
      shape: { type: f("text", "circle", "rect"), reflect: !0 },
      width: String,
      height: String,
      lines: { type: Number, reflect: !0 },
      isInline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [u, m]
  }
);
h("z-skeleton", k);
export {
  k as ZSkeleton
};
