import { c as R, a as E, e as k, u as A, g as w, j as u, d as _ } from "../chunks/define-element-BWC3wEPr.js";
import { u as G } from "../chunks/use-prop-DBBKVpkc.js";
import { u as I } from "../chunks/hooks-D9_x-ckD.js";
const N = 270, F = -135, L = 180, U = 4, H = R`
	:host {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		user-select: none;
		-webkit-user-select: none;
		--knob-size: 3.5rem;
		--knob-tone: var(--accent);
		--knob-track: var(--color-neutral-3);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([size='sm']) {
		--knob-size: 2.5rem;
	}

	:host([size='lg']) {
		--knob-size: 5rem;
	}

	:host([accent='dom']) {
		--knob-tone: var(--purple);
	}

	:host([accent='sub']) {
		--knob-tone: var(--pink);
	}

	:host([accent='success']) {
		--knob-tone: var(--success);
	}

	:host([accent='warning']) {
		--knob-tone: var(--warning);
	}

	:host([accent='error']) {
		--knob-tone: var(--destructive);
	}

	:host([is-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}

	.dial {
		position: relative;
		width: var(--knob-size);
		height: var(--knob-size);
		border: none;
		padding: 0;
		border-radius: 50%;
		background: transparent;
		cursor: ns-resize;
		touch-action: none;
	}

	.dial:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 3px;
	}

	/* The well the cap sits in. Carved in the material themes, a plain ring in
	   the flat ones. */
	.well {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: var(--material-surface);
		box-shadow: var(--elevation-carved);
	}

	/* The travel arc, drawn as a conic gradient masked to a ring. Everything
	   before --knob-angle is lit, everything after is unlit track. The mask is
	   what makes it a ring rather than a pie. */
	.arc {
		position: absolute;
		inset: 3px;
		border-radius: 50%;
		background: conic-gradient(
			from 225deg,
			var(--knob-tone) 0deg var(--knob-angle),
			var(--knob-track) var(--knob-angle) 270deg,
			transparent 270deg 360deg
		);
		-webkit-mask: radial-gradient(closest-side, transparent 74%, black 76%);
		mask: radial-gradient(closest-side, transparent 74%, black 76%);
	}

	/* The lit portion of the arc glows in the material themes. Painted as a
	   separate blurred copy because a box-shadow cannot follow a conic sweep. */
	.arcGlow {
		position: absolute;
		inset: 3px;
		border-radius: 50%;
		background: conic-gradient(
			from 225deg,
			var(--knob-tone) 0deg var(--knob-angle),
			transparent var(--knob-angle) 360deg
		);
		-webkit-mask: radial-gradient(closest-side, transparent 74%, black 76%);
		mask: radial-gradient(closest-side, transparent 74%, black 76%);
		filter: blur(4px);
		opacity: var(--knob-glow-opacity, 0);
		pointer-events: none;
	}

	/* The cap. Raised in the material themes, flat in the others. */
	.cap {
		position: absolute;
		inset: 18%;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: var(--material-raised), var(--card);
		box-shadow: var(--elevation-raised);
		transform: rotate(var(--knob-rotation));
		transition: box-shadow var(--material-press-duration) ease;
	}

	.dial:active .cap {
		box-shadow: var(--elevation-pressed);
	}

	/* The milled pointer. A line rather than a dot, because a line reads its
	   angle at a glance and a dot has to be located first. */
	.pointer {
		position: absolute;
		left: 50%;
		top: 10%;
		width: 2px;
		height: 30%;
		margin-left: -1px;
		border-radius: 1px;
		background: var(--knob-tone);
	}

	.label {
		font-family: var(--font-mono);
		font-size: var(--font-size-0);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.value {
		font-family: var(--font-mono);
		font-size: var(--font-size-1);
		color: var(--foreground);
		font-variant-numeric: tabular-nums;
	}
`, h = (e, a, n) => e < a ? a : e > n ? n : e, K = (e, a, n) => {
  if (n <= 0) return e;
  const d = Math.round((e - a) / n);
  return a + d * n;
}, M = (e, a) => {
  const n = String(a), o = n.indexOf(".");
  if (!(o !== -1)) return Math.round(e);
  const r = n.length - o - 1;
  return Number(e.toFixed(r));
}, O = (e, a, n) => {
  const o = n - a;
  return o <= 0 ? 0 : (e - a) / o;
}, $ = E(
  (e) => {
    A();
    const [a, n] = G("value"), [o, d] = I(null), r = e.min ?? 0, s = e.max ?? 100, f = e.step ?? 1, i = h(a ?? r, r, s), p = O(i, r, s) * N, x = F + p, g = (t) => {
      const l = K(t, r, f), c = h(l, r, s), b = M(c, f);
      b !== i && (n(b), e.input({ value: b }));
    }, y = (t) => {
      t.currentTarget.setPointerCapture(t.pointerId), d({ pointerY: t.clientY, value: i });
    }, D = (t) => {
      if (!o) return;
      const l = o.pointerY - t.clientY, c = t.shiftKey ? U : 1, b = l / (L * c);
      g(o.value + b * (s - r));
    }, m = (t) => {
      if (!o) return;
      t.currentTarget.releasePointerCapture(t.pointerId), d(null), e.change({ value: i });
    }, S = (t) => {
      const l = f * 10, c = B(t.key, f, l);
      if (c !== null) {
        t.preventDefault(), g(i + c), e.change({ value: h(i + c, r, s) });
        return;
      }
      if (t.key === "Home") {
        t.preventDefault(), g(r), e.change({ value: r });
        return;
      }
      t.key === "End" && (t.preventDefault(), g(s), e.change({ value: s }));
    }, P = () => {
      e.defaultValue != null && (g(e.defaultValue), e.change({ value: e.defaultValue }));
    }, v = `${e.valuePrefix ?? ""}${i}${e.valueSuffix ?? ""}`, T = e.label ?? "Knob", z = {
      "--knob-angle": `${p}deg`,
      "--knob-rotation": `${x}deg`,
      "--knob-glow-opacity": e.isGlowing ? "1" : "0"
    };
    return /* @__PURE__ */ w("host", { shadowDom: !0, style: z, children: [
      e.label && /* @__PURE__ */ u("span", { class: "label", children: e.label }),
      /* @__PURE__ */ w(
        "button",
        {
          class: "dial",
          type: "button",
          role: "slider",
          "aria-label": T,
          "aria-valuemin": r,
          "aria-valuemax": s,
          "aria-valuenow": i,
          "aria-valuetext": v,
          "aria-orientation": "vertical",
          disabled: e.isDisabled,
          onpointerdown: y,
          onpointermove: D,
          onpointerup: m,
          onpointercancel: m,
          onkeydown: S,
          ondblclick: P,
          children: [
            /* @__PURE__ */ u("span", { class: "well" }),
            /* @__PURE__ */ u("span", { class: "arcGlow" }),
            /* @__PURE__ */ u("span", { class: "arc" }),
            /* @__PURE__ */ u("span", { class: "cap", children: /* @__PURE__ */ u("span", { class: "pointer" }) })
          ]
        }
      ),
      e.doesShowValue && /* @__PURE__ */ u("span", { class: "value", children: v })
    ] });
  },
  {
    props: {
      value: { type: Number, reflect: !0 },
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      defaultValue: { type: Number, reflect: !0 },
      label: String,
      doesShowValue: { type: Boolean, reflect: !0 },
      valuePrefix: String,
      valueSuffix: String,
      accent: { type: String, reflect: !0 },
      isGlowing: { type: Boolean, reflect: !0 },
      size: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: k({ bubbles: !0, composed: !0 }),
      change: k({ bubbles: !0, composed: !0 })
    },
    styles: H
  }
), B = (e, a, n) => e === "ArrowUp" || e === "ArrowRight" ? a : e === "ArrowDown" || e === "ArrowLeft" ? -a : e === "PageUp" ? n : e === "PageDown" ? -n : null;
_("z-knob", $);
export {
  $ as ZKnob
};
