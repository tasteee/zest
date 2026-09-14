import { c as R, a as q, e as A, u as E, b as F, j as s, g as m, d as T } from "../chunks/define-element-BWC3wEPr.js";
import { u as k } from "../chunks/hooks-D9_x-ckD.js";
const W = R`
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

	::slotted(*) {
		display: none;
	}

	/* Header row: label left, value pill right. The two numbers in the pill are
	   tinted with their handle's accent, tying each bound to its thumb. */
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
		margin-left: auto;
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

	/* Layered track segments — all non-interactive. */
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
	/* off-limits ends — clearly distinct from both rail and active range */
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
		transition: transform 0.1s ease;
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
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}
	input:focus-visible::-moz-range-thumb {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}
`, d = (e, c) => {
  if (e == null || e === "") return c;
  const t = Number(e);
  return Number.isFinite(t) ? t : c;
}, p = (e, c, t) => Math.min(Math.max(e, c), t), U = (e) => e === "dom" ? "var(--purple)" : e === "sub" ? "var(--pink)" : e === "success" ? "var(--success)" : e === "warning" ? "var(--warning)" : e === "error" ? "var(--destructive)" : "var(--primary)", Z = q(
  (e) => {
    const c = E(), [t, L] = k(null), [b, y] = k(0), [v, M] = k(0);
    if (F(() => {
      const a = c.current.querySelectorAll("z-range-handle");
      if (a.length < 2) return;
      const o = d(e.min, 0), g = d(e.max, 100), f = d(e.step, 1) || 1, r = (i) => {
        const z = p(d(i.min ?? i.getAttribute("min"), o), o, g), S = p(d(i.max ?? i.getAttribute("max"), g), o, g), $ = d(i.step ?? i.getAttribute("step"), f) || f, j = p(d(i.value ?? i.getAttribute("value"), o), z, S), C = i.label ?? i.getAttribute("label") ?? "";
        return { min: z, max: S, step: $, value: j, label: C, accent: U(i.accent ?? i.getAttribute("accent")) };
      }, n = r(a[0]), l = r(a[1]);
      let u = n.value, h = l.value;
      u >= h && (u = Math.max(n.min, h - n.step)), L({
        domainMin: o,
        domainMax: g,
        leftMin: n.min,
        leftMax: n.max,
        leftStep: n.step,
        leftAccent: n.accent,
        leftLabel: n.label || "Lower value",
        rightMin: l.min,
        rightMax: l.max,
        rightStep: l.step,
        rightAccent: l.accent,
        rightLabel: l.label || "Upper value"
      }), y(u), M(h), a[0].value = u, a[1].value = h;
    }, []), !t)
      return /* @__PURE__ */ s("host", { shadowDom: !0, children: /* @__PURE__ */ s("slot", {}) });
    const V = t.domainMax - t.domainMin || 1, x = (a) => (a - t.domainMin) / V * 100, N = x(t.leftMin), P = 100 - x(t.rightMax), D = x(b), B = x(v), H = !!e.label || e.showValue, w = (a, o, g) => {
      const f = Number(a.value);
      let r = b, n = v;
      o === "left" ? (r = p(f, t.leftMin, t.leftMax), r >= n && (r = Math.max(n - t.leftStep, t.leftMin))) : (n = p(f, t.rightMin, t.rightMax), n <= r && (n = Math.min(r + t.rightStep, t.rightMax))), y(r), M(n);
      const l = c.current.querySelectorAll("z-range-handle");
      l[0] && (l[0].value = r), l[1] && (l[1].value = n);
      const u = o === "left" ? r : n;
      a.value = String(u);
      const h = { left: r, right: n };
      return g === "input" ? e.input(h) : e.change(h), u;
    };
    return /* @__PURE__ */ m(
      "host",
      {
        shadowDom: !0,
        role: "group",
        "aria-label": e.label,
        style: { "--left-accent": t.leftAccent, "--right-accent": t.rightAccent },
        children: [
          H && /* @__PURE__ */ m("div", { class: "header", children: [
            e.label && /* @__PURE__ */ s("span", { class: "label", children: e.label }),
            e.showValue && /* @__PURE__ */ m("span", { class: "value", children: [
              /* @__PURE__ */ m("span", { class: "left", children: [
                e.valuePrefix,
                b,
                e.valueSuffix
              ] }),
              /* @__PURE__ */ s("span", { class: "dash", children: "–" }),
              /* @__PURE__ */ m("span", { class: "right", children: [
                e.valuePrefix,
                v,
                e.valueSuffix
              ] })
            ] })
          ] }),
          /* @__PURE__ */ m("div", { class: "rail", children: [
            /* @__PURE__ */ s("div", { class: "track" }),
            /* @__PURE__ */ s("div", { class: "cap", style: { left: "0", width: `${N}%` } }),
            /* @__PURE__ */ s("div", { class: "cap", style: { right: "0", width: `${P}%` } }),
            /* @__PURE__ */ s("div", { class: "fill", style: { left: `${D}%`, right: `${100 - B}%` } }),
            /* @__PURE__ */ s(
              "input",
              {
                class: "left",
                type: "range",
                min: t.domainMin,
                max: t.domainMax,
                step: t.leftStep,
                value: b,
                disabled: e.isDisabled,
                "aria-label": t.leftLabel,
                oninput: (a) => w(a.target, "left", "input"),
                onchange: (a) => w(a.target, "left", "change")
              }
            ),
            /* @__PURE__ */ s(
              "input",
              {
                class: "right",
                type: "range",
                min: t.domainMin,
                max: t.domainMax,
                step: t.rightStep,
                value: v,
                disabled: e.isDisabled,
                "aria-label": t.rightLabel,
                oninput: (a) => w(a.target, "right", "input"),
                onchange: (a) => w(a.target, "right", "change")
              }
            )
          ] }),
          /* @__PURE__ */ s("slot", {})
        ]
      }
    );
  },
  {
    props: {
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      label: String,
      showValue: { type: Boolean, reflect: !0 },
      valuePrefix: String,
      valueSuffix: String,
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: A({ bubbles: !0, composed: !0 }),
      change: A({ bubbles: !0, composed: !0 })
    },
    styles: W
  }
);
T("z-range", Z);
export {
  Z as ZRange
};
