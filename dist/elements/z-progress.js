// @ts-self-types="./z-progress.d.ts"
import { c as m, a as c, j as r, d as u } from "../chunks/define-element-BZUk-KLk.js";
import { i as d } from "../chunks/interaction-styles-C6mMacCu.js";
import { o as i } from "../chunks/prop-types-B3Bpi956.js";
const h = m`
  :host {
    display: block;
    width: 100%;
    --tone: var(--accent-primary);
  }

  :host([tone="tertiary"]) {
    --tone: var(--accent-tertiary);
  }

  :host([tone="success"]) {
    --tone: var(--status-success);
  }
  :host([tone="danger"]) {
    --tone: var(--status-danger);
  }

  :host([is-hidden]) {
    display: none;
  }

  .track {
    position: relative;
    width: 100%;
    height: var(--bar-height, 0.5rem);
    background: color-mix(in oklch, var(--border-default) 70%, transparent);
    border-radius: var(--radius-full);
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
		border-radius: var(--radius-full);
		background: var(--tone);
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
`, v = c(
  (e) => {
    const n = typeof e.max == "number" && Number.isFinite(e.max) && e.max > 0, a = typeof e.value == "number" && Number.isFinite(e.value), o = a ? e.value : 0, t = n ? e.max : 100, s = a ? Math.max(0, Math.min(o, t)) : 0, l = t > 0 ? s / t * 100 : 0;
    return /* @__PURE__ */ r(
      "host",
      {
        shadowDom: !0,
        role: "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": String(t),
        "aria-valuenow": e.isIndeterminate ? void 0 : String(s),
        children: /* @__PURE__ */ r("div", { class: e.isIndeterminate ? "track is-indeterminate" : "track", children: /* @__PURE__ */ r("div", { class: "bar", style: { width: String(l) + "%" } }) })
      }
    );
  },
  {
    props: {
      value: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      tone: { type: i("primary", "tertiary", "success", "danger"), reflect: !0 },
      size: { type: i("sm", "md", "lg"), reflect: !0 },
      isIndeterminate: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [h, d]
  }
);
u("z-progress", v);
export {
  v as ZProgress
};
