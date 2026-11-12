// @ts-self-types="./z-range.d.ts"
import { c as j, a as q, e as S, u as E, f as A, b as T, g as h, j as c } from "../chunks/define-element-BZUk-KLk.js";
import { i as W } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as I, d as U } from "../chunks/form-control-CrK-0rhn.js";
import { u as Z } from "../chunks/locale-Bb4aqXuR.js";
import { u as G } from "../chunks/use-prop-C0_HeSQ9.js";
const J = j`
	:host {
		display: block;
		width: 100%;
		--tone: var(--accent-primary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}


	/* Header row: label left, value pill right. The two numbers in the pill are
	   tinted with their handle's tone, tying each bound to its thumb. */
	.header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		line-height: var(--line-height-tight);
	}

	.value {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
		/* margin-left keeps the value flush-right even when there's no label. */
		margin-inline-start: auto;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		background: color-mix(in oklch, var(--text-secondary) 12%, transparent);
		padding: var(--space-0-5) var(--space-2);
		border-radius: var(--radius-full);
		line-height: var(--line-height-snug);
		white-space: nowrap;
	}
	.value .left {
		color: var(--left-accent, var(--tone));
	}
	.value .right {
		color: var(--right-accent, var(--tone));
	}
	.value .dash {
		color: var(--text-secondary);
		font-weight: var(--font-weight-regular);
	}

	.rail {
		position: relative;
		display: flex;
		align-items: center;
		height: 1rem;
		width: 100%;
	}

	/* Layered track segments, all non-interactive. */
	.track,
	.cap,
	.fill {
		position: absolute;
		height: 4px;
		border-radius: var(--radius-full);
		pointer-events: none;
	}
	/* reachable but unselected */
	.track {
		left: 0;
		right: 0;
		background: var(--border-default);
		z-index: 1;
	}
	/* off-limits ends, clearly distinct from both rail and active range */
	.cap {
		background: color-mix(in oklch, var(--text-secondary) 32%, transparent);
		z-index: 2;
	}
	/* active range between the handles */
	.fill {
		background: var(--tone);
		z-index: 3;
	}

	/* Two inputs share the track; only the thumbs take pointer events so either
	   handle can be grabbed independently. */
	input {
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		height: 1rem;
		margin: 0;
		appearance: none;
		background: transparent;
		pointer-events: none;
	}
	input.left {
		z-index: 4;
	}
	input.right {
		z-index: 5;
	}
	input:focus-visible,
	input:active {
		z-index: 6;
	}

	input::-webkit-slider-runnable-track {
		height: 4px;
		background: transparent;
	}
	input::-moz-range-track {
		height: 4px;
		background: transparent;
	}
	input::-moz-range-progress {
		background: transparent;
	}

	input::-webkit-slider-thumb {
		pointer-events: auto;
		appearance: none;
		width: 1rem;
		height: 1rem;
		margin-top: -6px;
		border-radius: var(--radius-full);
		border: 2px solid var(--surface-page);
		cursor: pointer;
		transition: transform var(--motion-instant) var(--ease-enter);
	}
	input::-moz-range-thumb {
		pointer-events: auto;
		width: 1rem;
		height: 1rem;
		border-radius: var(--radius-full);
		border: 2px solid var(--surface-page);
		cursor: pointer;
	}
	input:active::-webkit-slider-thumb {
		transform: scale(1.15);
	}

	input.left::-webkit-slider-thumb {
		background: var(--left-accent, var(--tone));
	}
	input.left::-moz-range-thumb {
		background: var(--left-accent, var(--tone));
	}
	input.right::-webkit-slider-thumb {
		background: var(--right-accent, var(--tone));
	}
	input.right::-moz-range-thumb {
		background: var(--right-accent, var(--tone));
	}

	input:focus-visible::-webkit-slider-thumb {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
	input:focus-visible::-moz-range-thumb {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
`, m = (e, t) => {
  if (e == null || e === "") return t;
  const a = Number(e);
  return Number.isFinite(a) ? a : t;
}, b = (e, t, a) => Math.min(Math.max(e, t), a), K = (e) => e === "secondary" ? "var(--accent-secondary)" : e === "tertiary" ? "var(--accent-tertiary)" : e === "success" ? "var(--status-success)" : e === "warning" ? "var(--status-warning)" : e === "danger" ? "var(--status-danger)" : "var(--text-primary)", F = (e, t, a) => {
  const l = b(m(e == null ? void 0 : e.min, t.min), t.min, t.max), i = b(m(e == null ? void 0 : e.max, t.max), t.min, t.max), r = m(e == null ? void 0 : e.step, t.step) || t.step, o = K(e == null ? void 0 : e.tone), s = (e == null ? void 0 : e.label) || a;
  return { min: l, max: i, step: r, tone: o, label: s };
}, O = (e, t, a) => {
  const l = m(e.min, 0), i = m(e.max, 100), r = m(e.step, 1) || 1, o = { min: l, max: i, step: r }, s = Array.isArray(e.handles) ? e.handles : [], u = F(s[0], o, t), p = F(s[1], o, a);
  return { domainMin: l, domainMax: i, lower: u, upper: p };
}, Q = (e, t) => {
  const a = Array.isArray(e) ? e : [], l = m(a[0], t.lower.min), i = m(a[1], t.upper.max), r = Math.min(l, i), o = Math.max(l, i), s = b(o, t.upper.min, t.upper.max), u = b(r, t.lower.min, t.lower.max);
  return [u >= s ? Math.max(t.lower.min, s - t.lower.step) : u, s];
}, X = (e, t) => Array.isArray(e) && e.length === 2 ? Number(e[0]) === t[0] && Number(e[1]) === t[1] : !1, Y = (e, t, a) => {
  const l = t === "lower", i = b(e[0], a.lower.min, a.lower.max), r = b(e[1], a.upper.min, a.upper.max);
  return i >= r ? l ? [Math.max(r - a.lower.step, a.lower.min), r] : [i, Math.min(i + a.upper.step, a.upper.max)] : [i, r];
}, _ = q(
  (e) => {
    const t = E(), a = Z(), [l, i] = G("value"), r = O(e, a("lowerValue"), a("upperValue")), o = Q(l, r), s = o[0], u = o[1], p = A(null), y = A();
    p.current === null && (p.current = o), T(() => {
      X(l, o) || i(o);
    }, [s, u]);
    const V = () => {
      const n = new FormData(), d = t.current.getAttribute("name") ?? "";
      return n.append(d, String(s)), n.append(d, String(u)), n;
    }, C = (n) => {
      if (!(n instanceof FormData)) return;
      const w = t.current.getAttribute("name") ?? "", g = n.getAll(w).map(Number);
      i([g[0], g[1]]);
    }, D = I({
      value: V(),
      isDisabled: e.isDisabled,
      control: y,
      onReset: () => i(p.current),
      onRestore: C
    }), k = e.isDisabled || D.isFormDisabled, N = r.domainMax - r.domainMin || 1, v = (n) => (n - r.domainMin) / N * 100, P = v(r.lower.min), R = 100 - v(r.upper.max), H = v(s), L = v(u), B = !!e.label || e.doesShowValue, f = (n, d, w) => {
      const g = Number(n.value), z = d === "lower", x = Y(z ? [g, u] : [s, g], d, r), $ = z ? x[0] : x[1];
      n.value = String($), i(x);
      const M = { value: x };
      w === "input" && e.input(M), w === "change" && e.change(M);
    };
    return /* @__PURE__ */ h(
      "host",
      {
        shadowDom: !0,
        role: "group",
        "aria-label": e.label,
        style: { "--left-accent": r.lower.tone, "--right-accent": r.upper.tone },
        children: [
          B && /* @__PURE__ */ h("div", { class: "header", children: [
            e.label && /* @__PURE__ */ c("span", { class: "label", children: e.label }),
            e.doesShowValue && /* @__PURE__ */ h("span", { class: "value", children: [
              /* @__PURE__ */ h("span", { class: "left", children: [
                e.valuePrefix,
                s,
                e.valueSuffix
              ] }),
              /* @__PURE__ */ c("span", { class: "dash", children: "–" }),
              /* @__PURE__ */ h("span", { class: "right", children: [
                e.valuePrefix,
                u,
                e.valueSuffix
              ] })
            ] })
          ] }),
          /* @__PURE__ */ h("div", { class: "rail", children: [
            /* @__PURE__ */ c("div", { class: "track" }),
            /* @__PURE__ */ c("div", { class: "cap", style: { left: "0", width: `${P}%` } }),
            /* @__PURE__ */ c("div", { class: "cap", style: { right: "0", width: `${R}%` } }),
            /* @__PURE__ */ c("div", { class: "fill", style: { left: `${H}%`, right: `${100 - L}%` } }),
            /* @__PURE__ */ c(
              "input",
              {
                ref: y,
                class: "left",
                type: "range",
                min: r.domainMin,
                max: r.domainMax,
                step: r.lower.step,
                value: s,
                disabled: k,
                "aria-label": r.lower.label,
                oninput: (n) => f(n.target, "lower", "input"),
                onchange: (n) => f(n.target, "lower", "change")
              }
            ),
            /* @__PURE__ */ c(
              "input",
              {
                class: "right",
                type: "range",
                min: r.domainMin,
                max: r.domainMax,
                step: r.upper.step,
                value: u,
                disabled: k,
                "aria-label": r.upper.label,
                oninput: (n) => f(n.target, "upper", "input"),
                onchange: (n) => f(n.target, "upper", "change")
              }
            )
          ] })
        ]
      }
    );
  },
  {
    props: {
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      value: { type: Array },
      handles: { type: Array },
      name: { type: String, reflect: !0 },
      label: String,
      doesShowValue: { type: Boolean, reflect: !0 },
      valuePrefix: String,
      valueSuffix: String,
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: S({ bubbles: !0, composed: !0 }),
      change: S({ bubbles: !0, composed: !0 })
    },
    styles: [J, W],
    form: !0
  }
);
U("z-range", _);
export {
  _ as ZRange
};
