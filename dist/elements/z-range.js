import { c as j, a as q, e as S, u as E, f as A, b as T, g as b, j as c } from "../chunks/define-element-BZUk-KLk.js";
import { i as W } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as I, d as U } from "../chunks/form-control-D_UwalCr.js";
import { u as Z } from "../chunks/locale-DUDaH1Ni.js";
import { u as G } from "../chunks/use-prop-C0_HeSQ9.js";
const J = j`
	:host {
		display: block;
		width: 100%;
		--accent: var(--primary);
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
		gap: var(--space-sm);
		margin-bottom: 0.5rem;
	}

	.label {
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-medium);
		color: var(--foreground);
		line-height: 1.2;
	}

	.value {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		/* margin-left keeps the value flush-right even when there's no label. */
		margin-inline-start: auto;
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		background: color-mix(in oklch, var(--muted-foreground) 12%, transparent);
		padding: 0.125rem 0.5rem;
		border-radius: 999px;
		line-height: 1.4;
		white-space: nowrap;
	}
	.value .left {
		color: var(--left-accent, var(--accent));
	}
	.value .right {
		color: var(--right-accent, var(--accent));
	}
	.value .dash {
		color: var(--muted-foreground);
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
		border-radius: 999px;
		pointer-events: none;
	}
	/* reachable but unselected */
	.track {
		left: 0;
		right: 0;
		background: var(--border);
		z-index: 1;
	}
	/* off-limits ends, clearly distinct from both rail and active range */
	.cap {
		background: color-mix(in oklch, var(--muted-foreground) 32%, transparent);
		z-index: 2;
	}
	/* active range between the handles */
	.fill {
		background: var(--accent);
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
		border-radius: 999px;
		border: 2px solid var(--background);
		cursor: pointer;
		transition: transform var(--motion-instant) var(--ease-enter);
	}
	input::-moz-range-thumb {
		pointer-events: auto;
		width: 1rem;
		height: 1rem;
		border-radius: 999px;
		border: 2px solid var(--background);
		cursor: pointer;
	}
	input:active::-webkit-slider-thumb {
		transform: scale(1.15);
	}

	input.left::-webkit-slider-thumb {
		background: var(--left-accent, var(--accent));
	}
	input.left::-moz-range-thumb {
		background: var(--left-accent, var(--accent));
	}
	input.right::-webkit-slider-thumb {
		background: var(--right-accent, var(--accent));
	}
	input.right::-moz-range-thumb {
		background: var(--right-accent, var(--accent));
	}

	input:focus-visible::-webkit-slider-thumb {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}
	input:focus-visible::-moz-range-thumb {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}
`, m = (e, t) => {
  if (e == null || e === "") return t;
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}, h = (e, t, n) => Math.min(Math.max(e, t), n), K = (e) => e === "secondary" ? "var(--purple)" : e === "tertiary" ? "var(--pink)" : e === "success" ? "var(--success)" : e === "warning" ? "var(--warning)" : e === "danger" ? "var(--destructive)" : "var(--primary)", F = (e, t, n) => {
  const l = h(m(e == null ? void 0 : e.min, t.min), t.min, t.max), i = h(m(e == null ? void 0 : e.max, t.max), t.min, t.max), r = m(e == null ? void 0 : e.step, t.step) || t.step, o = K(e == null ? void 0 : e.tone), s = (e == null ? void 0 : e.label) || n;
  return { min: l, max: i, step: r, tone: o, label: s };
}, O = (e, t, n) => {
  const l = m(e.min, 0), i = m(e.max, 100), r = m(e.step, 1) || 1, o = { min: l, max: i, step: r }, s = Array.isArray(e.handles) ? e.handles : [], u = F(s[0], o, t), p = F(s[1], o, n);
  return { domainMin: l, domainMax: i, lower: u, upper: p };
}, Q = (e, t) => {
  const n = Array.isArray(e) ? e : [], l = m(n[0], t.lower.min), i = m(n[1], t.upper.max), r = Math.min(l, i), o = Math.max(l, i), s = h(o, t.upper.min, t.upper.max), u = h(r, t.lower.min, t.lower.max);
  return [u >= s ? Math.max(t.lower.min, s - t.lower.step) : u, s];
}, X = (e, t) => Array.isArray(e) && e.length === 2 ? Number(e[0]) === t[0] && Number(e[1]) === t[1] : !1, Y = (e, t, n) => {
  const l = t === "lower", i = h(e[0], n.lower.min, n.lower.max), r = h(e[1], n.upper.min, n.upper.max);
  return i >= r ? l ? [Math.max(r - n.lower.step, n.lower.min), r] : [i, Math.min(i + n.upper.step, n.upper.max)] : [i, r];
}, _ = q(
  (e) => {
    const t = E(), n = Z(), [l, i] = G("value"), r = O(e, n("lowerValue"), n("upperValue")), o = Q(l, r), s = o[0], u = o[1], p = A(null), y = A();
    p.current === null && (p.current = o), T(() => {
      X(l, o) || i(o);
    }, [s, u]);
    const V = () => {
      const a = new FormData(), d = t.current.getAttribute("name") ?? "";
      return a.append(d, String(s)), a.append(d, String(u)), a;
    }, C = (a) => {
      if (!(a instanceof FormData)) return;
      const w = t.current.getAttribute("name") ?? "", g = a.getAll(w).map(Number);
      i([g[0], g[1]]);
    }, D = I({
      value: V(),
      isDisabled: e.isDisabled,
      control: y,
      onReset: () => i(p.current),
      onRestore: C
    }), k = e.isDisabled || D.isFormDisabled, N = r.domainMax - r.domainMin || 1, f = (a) => (a - r.domainMin) / N * 100, P = f(r.lower.min), R = 100 - f(r.upper.max), H = f(s), L = f(u), B = !!e.label || e.doesShowValue, v = (a, d, w) => {
      const g = Number(a.value), z = d === "lower", x = Y(z ? [g, u] : [s, g], d, r), $ = z ? x[0] : x[1];
      a.value = String($), i(x);
      const M = { value: x };
      w === "input" && e.input(M), w === "change" && e.change(M);
    };
    return /* @__PURE__ */ b(
      "host",
      {
        shadowDom: !0,
        role: "group",
        "aria-label": e.label,
        style: { "--left-accent": r.lower.tone, "--right-accent": r.upper.tone },
        children: [
          B && /* @__PURE__ */ b("div", { class: "header", children: [
            e.label && /* @__PURE__ */ c("span", { class: "label", children: e.label }),
            e.doesShowValue && /* @__PURE__ */ b("span", { class: "value", children: [
              /* @__PURE__ */ b("span", { class: "left", children: [
                e.valuePrefix,
                s,
                e.valueSuffix
              ] }),
              /* @__PURE__ */ c("span", { class: "dash", children: "–" }),
              /* @__PURE__ */ b("span", { class: "right", children: [
                e.valuePrefix,
                u,
                e.valueSuffix
              ] })
            ] })
          ] }),
          /* @__PURE__ */ b("div", { class: "rail", children: [
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
                oninput: (a) => v(a.target, "lower", "input"),
                onchange: (a) => v(a.target, "lower", "change")
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
                oninput: (a) => v(a.target, "upper", "input"),
                onchange: (a) => v(a.target, "upper", "change")
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
