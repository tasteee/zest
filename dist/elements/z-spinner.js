// @ts-self-types="./z-spinner.d.ts"
import { c as o, a as s, j as e, g as i, d } from "../chunks/define-element-BZUk-KLk.js";
import { i as r } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as c } from "../chunks/locale-BNhgEFKA.js";
import { o as l } from "../chunks/prop-types-CSJu2W-0.js";
const p = o`
	:host { display: inline-flex; color: inherit; }
	:host([is-hidden]) { display: none; }

	.spinner {
		--spinner-size: var(--control-height-sm);
		--spinner-cycle: var(--motion-spin-duration, 6.15s);
		--spinner-stagger: calc(var(--spinner-cycle) * 0.0146);
		position: relative;
		box-sizing: border-box;
		width: var(--spinner-size);
		height: var(--spinner-size);
	}
	:host([size='sm']) .spinner { --spinner-size: var(--space-4); }
	:host([size='lg']) .spinner { --spinner-size: var(--control-height-lg); }

	.dot {
		position: absolute;
		inset: 0;
		rotate: var(--dot-angle);
	}
	.dot::before {
		content: '';
		position: absolute;
		top: 0;
		inset-inline-start: calc(50% - var(--spinner-size) * 0.095);
		width: calc(var(--spinner-size) * 0.19);
		height: calc(var(--spinner-size) * 0.19);
		border-radius: var(--radius-full);
		background: currentColor;
		opacity: 0.28;
		scale: 0.55;
		animation: dot-wave var(--spinner-cycle) var(--ease-move) infinite;
		animation-delay: calc(var(--dot-index) * var(--spinner-stagger));
	}

	.dot:nth-child(1)  { --dot-index: 0; --dot-angle: 0deg; }
	.dot:nth-child(2)  { --dot-index: 1; --dot-angle: 36deg; }
	.dot:nth-child(3)  { --dot-index: 2; --dot-angle: 72deg; }
	.dot:nth-child(4)  { --dot-index: 3; --dot-angle: 108deg; }
	.dot:nth-child(5)  { --dot-index: 4; --dot-angle: 144deg; }
	.dot:nth-child(6)  { --dot-index: 5; --dot-angle: 180deg; }
	.dot:nth-child(7)  { --dot-index: 6; --dot-angle: 216deg; }
	.dot:nth-child(8)  { --dot-index: 7; --dot-angle: 252deg; }
	.dot:nth-child(9)  { --dot-index: 8; --dot-angle: 288deg; }
	.dot:nth-child(10) { --dot-index: 9; --dot-angle: 324deg; }

	/* Timeline of one cycle (6.15s at the default):
	   wave 1 at 0%, wave 2 at 31%, wave 3 at 62%.
	   Each wave sweeps the ring in about 0.8s and is
	   followed by a pause of about 0.5s. */
	@keyframes dot-wave {
		0%, 9.8%, 31.1%, 40.8%, 62.1%, 80%, 100% {
			opacity: 0.28;
			scale: 0.55;
			background: currentColor;
		}
		3.4% { opacity: 1; scale: 1; background: currentColor; }
		34.5% { opacity: 1; scale: 1; background: currentColor; }
		65% { opacity: 1; scale: 1; background: var(--accent-spark-1); }
		68.3% { opacity: 1; scale: 1; background: var(--accent-spark-2); }
		71.5% { opacity: 1; scale: 1; background: var(--accent-spark-3); }
		74.8% { opacity: 1; scale: 1; background: var(--accent-spark-4); }
		77.8% { opacity: 0.8; scale: 0.8; background: var(--accent-spark-5); }
	}

	@media (prefers-reduced-motion: reduce) {
		.dot::before { animation: none; opacity: 0.5; scale: 0.8; }
	}
`, g = s(
  (a) => {
    const n = c(), t = a.label || n("loading");
    return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ i("span", { class: "spinner", role: "status", "aria-label": t, children: [
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" }),
      /* @__PURE__ */ e("span", { class: "dot" })
    ] }) });
  },
  {
    props: {
      size: { type: l("sm", "md", "lg"), reflect: !0 },
      label: String,
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [p, r]
  }
);
d("z-spinner", g);
export {
  g as ZSpinner
};
