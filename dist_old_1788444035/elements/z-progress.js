import { c as i, a as n, j as r, d as o } from "../chunks/define-element-BWC3wEPr.js";
const c = i`
	:host {
		display: block;
		width: 100%;
		--accent: var(--color-neutral-8);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([accent='success']) {
		--accent: var(--success);
	}
	:host([accent='error']) {
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

	:host([size='sm']) .track {
		--bar-height: 0.3125rem;
	}
	:host([size='lg']) .track {
		--bar-height: 0.75rem;
	}

	.bar {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		border-radius: 999px;
		background: var(--accent);
		transition: width 0.3s var(--easing-standard, ease-out);
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
`, d = n(
  (e) => {
    const t = e.max ?? 100, a = Math.max(0, Math.min(e.value ?? 0, t)), s = t > 0 ? a / t * 100 : 0;
    return /* @__PURE__ */ r(
      "host",
      {
        shadowDom: !0,
        role: "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": String(t),
        "aria-valuenow": e.isIndeterminate ? void 0 : String(a),
        children: /* @__PURE__ */ r("div", { class: e.isIndeterminate ? "track is-indeterminate" : "track", children: /* @__PURE__ */ r("div", { class: "bar", style: { width: `${s}%` } }) })
      }
    );
  },
  {
    props: {
      value: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      accent: { type: String, reflect: !0 },
      size: { type: String, reflect: !0 },
      isIndeterminate: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: c
  }
);
o("z-progress", d);
export {
  d as ZProgress
};
