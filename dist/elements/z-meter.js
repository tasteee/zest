// @ts-self-types="./z-meter.d.ts"
import { c as H, a as P, j as i, g as f, d as V } from "../chunks/define-element-BZUk-KLk.js";
import { i as _ } from "../chunks/interaction-styles-C6mMacCu.js";
import { o as b } from "../chunks/prop-types-CSJu2W-0.js";
const A = H`
	:host {
		display: block;
		width: 100%;
		--tone: var(--accent-primary);
		--z-meter-height: 0.5rem;
		--z-meter-track: color-mix(in oklch, var(--border-default) 70%, transparent);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([size='sm']) { --z-meter-height: 0.3125rem; }
	:host([size='lg']) { --z-meter-height: 0.75rem; }

	.meter.is-primary { --tone: var(--accent-primary); }
	.meter.is-secondary { --tone: var(--accent-secondary); }
	.meter.is-tertiary { --tone: var(--accent-tertiary); }
	.meter.is-success { --tone: var(--status-success); }
	.meter.is-warning { --tone: var(--status-warning); }
	.meter.is-danger { --tone: var(--status-danger); }

	.header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.header[hidden] {
		display: none;
	}

	.label {
		min-width: 0;
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
	}

	.value {
		margin-inline-start: auto;
		padding: var(--space-0-5) var(--space-2);
		border-radius: var(--radius-full);
		background: color-mix(in oklch, var(--tone) 12%, transparent);
		color: color-mix(in oklab, var(--tone) 70%, var(--text-primary));
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		line-height: var(--line-height-snug);
		white-space: nowrap;
		transition:
			color var(--motion-base) var(--ease-enter),
			background-color var(--motion-base) var(--ease-enter);
	}

	.track {
		position: relative;
		display: flex;
		gap: 3px;
		width: 100%;
		height: var(--z-meter-height);
	}

	.cell {
		position: relative;
		flex: 1 1 0;
		overflow: hidden;
		border-radius: var(--radius-full);
		background: var(--z-meter-track);
	}

	.track.is-segmented .cell {
		border-radius: var(--radius-xs);
	}

	.bar {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		border-radius: inherit;
		background: var(--tone);
		transition:
			width var(--motion-slow) var(--ease-enter),
			background-color var(--motion-base) var(--ease-enter);
	}
`, r = (e) => typeof e == "number" && Number.isFinite(e), s = (e, t, n) => Math.min(n, Math.max(t, e)), y = (e, t, n) => e < t ? 0 : e > n ? 2 : 1, O = ["success", "warning", "danger"], I = P(
  (e) => {
    const t = r(e.min) ? e.min : 0, n = r(e.max) ? e.max : 100, a = n > t ? n : t + 1, o = s(r(e.value) ? e.value : t, t, a), u = r(e.low), d = r(e.high), x = u || d, c = s(u ? e.low : t, t, a), h = s(d ? e.high : a, c, a), w = (t + a) / 2, k = s(r(e.optimum) ? e.optimum : w, t, a), p = y(o, c, h), z = y(k, c, h), S = Math.abs(p - z), N = x ? O[S] : "primary", C = e.tone ?? N, M = (o - t) / (a - t), m = Math.max(1, Math.round(r(e.segments) ? e.segments : 1)), B = m > 1, $ = Array.from({ length: m }, (l, v) => v), F = (l) => `${s(M * m - l, 0, 1) * 100}%`, R = e.valuePrefix ?? "", T = e.valueSuffix ?? "", g = `${R}${o}${T}`, j = !!e.label || !!e.doesShowValue, D = `meter is-${C}`, E = B ? "track is-segmented" : "track";
    return /* @__PURE__ */ i(
      "host",
      {
        shadowDom: !0,
        role: "meter",
        "aria-label": e.label || void 0,
        "aria-valuemin": String(t),
        "aria-valuemax": String(a),
        "aria-valuenow": String(o),
        "aria-valuetext": g,
        children: /* @__PURE__ */ f("div", { class: D, children: [
          /* @__PURE__ */ f("div", { class: "header", hidden: !j, "aria-hidden": "true", children: [
            e.label && /* @__PURE__ */ i("span", { class: "label", children: e.label }),
            e.doesShowValue && /* @__PURE__ */ i("span", { class: "value", children: g })
          ] }),
          /* @__PURE__ */ i("div", { class: E, part: "track", children: $.map((l) => /* @__PURE__ */ i("span", { class: "cell", children: /* @__PURE__ */ i("span", { class: "bar", part: "bar", style: { width: F(l) } }) })) })
        ] })
      }
    );
  },
  {
    props: {
      value: { type: Number, reflect: !0 },
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      low: { type: Number, reflect: !0 },
      high: { type: Number, reflect: !0 },
      optimum: { type: Number, reflect: !0 },
      segments: { type: Number, reflect: !0 },
      label: String,
      valuePrefix: String,
      valueSuffix: String,
      size: { type: b("sm", "md", "lg"), reflect: !0 },
      tone: { type: b("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      doesShowValue: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [A, _]
  }
);
V("z-meter", I);
export {
  I as ZMeter
};
