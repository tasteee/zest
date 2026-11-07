import { c as l, a as m, j as r, d } from "../chunks/define-element-BZUk-KLk.js";
import { i as u } from "../chunks/interaction-styles-XiKFAbWA.js";
import { o as s } from "../chunks/prop-types-B3Bpi956.js";
const h = l`
  :host {
    display: block;
    width: 100%;
    --accent: var(--color-neutral-8);
  }

  :host([tone="tertiary"]) {
    --accent: var(--pink);
  }

  :host([tone="success"]) {
    --accent: var(--success);
  }
  :host([tone="danger"]) {
    --accent: var(--destructive);
  }

  :host([is-hidden]) {
    display: none;
  }

  .track {
    position: relative;
    width: 100%;
    height: var(--bar-height, 0.5rem);
    background: color-mix(in oklch, var(--border) 70%, transparent);
    border-radius: 999px;
    overflow: hidden;
  }

  :host([size="sm"]) .track {
    --bar-height: 0.3125rem;
  }
  :host([size="lg"]) .track {
    --bar-height: 0.75rem;
  }

	.bar {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		border-radius: 999px;
		background: var(--accent);
		transition: width var(--motion-slow) var(--ease-enter);
	}

  .track.is-indeterminate .bar {
    width: 35% !important;
    animation: z-progress-sweep 1.2s ease-in-out infinite;
  }

  @keyframes z-progress-sweep {
    0% {
      left: -35%;
    }
    100% {
      left: 100%;
    }
  }
`, b = m(
  (e) => {
    const n = typeof e.max == "number" && Number.isFinite(e.max) && e.max > 0, a = typeof e.value == "number" && Number.isFinite(e.value), o = a ? e.value : 0, t = n ? e.max : 100, i = a ? Math.max(0, Math.min(o, t)) : 0, c = t > 0 ? i / t * 100 : 0;
    return /* @__PURE__ */ r(
      "host",
      {
        shadowDom: !0,
        role: "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": String(t),
        "aria-valuenow": e.isIndeterminate ? void 0 : String(i),
        children: /* @__PURE__ */ r("div", { class: e.isIndeterminate ? "track is-indeterminate" : "track", children: /* @__PURE__ */ r("div", { class: "bar", style: { width: String(c) + "%" } }) })
      }
    );
  },
  {
    props: {
      value: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      tone: { type: s("primary", "tertiary", "success", "danger"), reflect: !0 },
      size: { type: s("sm", "md", "lg"), reflect: !0 },
      isIndeterminate: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [h, u]
  }
);
d("z-progress", b);
export {
  b as ZProgress
};
