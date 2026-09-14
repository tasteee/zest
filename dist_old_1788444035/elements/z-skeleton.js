import { c as h, a as d, j as n, d as c } from "../chunks/define-element-BWC3wEPr.js";
const m = h`
	:host {
		display: block;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([inline]) {
		display: inline-block;
	}

	.skeleton {
		position: relative;
		overflow: hidden;
		background: var(--skeleton, var(--color-neutral-3));
		border-radius: var(--radius-sm);
	}

	.skeleton.is-text {
		height: 0.75rem;
		border-radius: 999px;
	}
	.skeleton.is-circle {
		border-radius: 999px;
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
			var(--skeleton-shimmer, oklch(from var(--skeleton, var(--color-neutral-3)) calc(l + 0.09) c h)) 50%,
			transparent 85%
		);
		animation: z-skeleton-shimmer 1.5s linear infinite;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
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
`, k = d(
  (e) => {
    const i = e.shape || "text", r = e.lines && e.lines > 1 ? e.lines : 1, t = {};
    e.width && (t.width = e.width), e.height && (t.height = e.height), i === "circle" && e.width && !e.height && (t.height = e.width);
    const l = e.width || (i === "circle" ? "2.5rem" : e.inline ? "6rem" : "100%"), s = (a) => /* @__PURE__ */ n("div", { class: `skeleton is-${i}`, style: t }, a);
    return /* @__PURE__ */ n("host", { shadowDom: !0, style: { width: l }, "aria-busy": "true", "aria-live": "polite", children: r > 1 ? /* @__PURE__ */ n("div", { class: "stack", children: Array.from({ length: r }).map((a, o) => s(o)) }) : s() });
  },
  {
    props: {
      shape: { type: String, reflect: !0 },
      width: String,
      height: String,
      lines: { type: Number, reflect: !0 },
      inline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: m
  }
);
c("z-skeleton", k);
export {
  k as ZSkeleton
};
