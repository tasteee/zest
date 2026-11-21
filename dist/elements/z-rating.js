// @ts-self-types="./z-rating.d.ts"
import { c as E, a as G, e as J, f as T, g as z, j as l } from "../chunks/define-element-BZUk-KLk.js";
import { i as Q } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as Y, d as ee } from "../chunks/form-control-CZ1HzNxT.js";
import { s as te, d as ne, u as re, a as ie, r as se } from "../chunks/accessible-NC1hpH4S.js";
import { u as oe } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as ae } from "../chunks/hooks-DEFT8qqt.js";
import { o as S } from "../chunks/prop-types-CSJu2W-0.js";
import { u as le } from "../chunks/locale-BNhgEFKA.js";
const ce = E`
	:host {
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-1);
		--tone: var(--accent-primary);
		--z-rating-size: 1.25rem;
		--z-rating-empty: color-mix(in oklch, var(--text-primary) 14%, transparent);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	:host([tone='success']) { --tone: var(--status-success); }
	:host([tone='warning']) { --tone: var(--status-warning); }
	:host([tone='danger']) { --tone: var(--status-danger); }

	:host([size='sm']) { --z-rating-size: 1rem; }
	:host([size='lg']) { --z-rating-size: 1.75rem; }

	.row {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2-5);
	}

	.icons {
		display: inline-flex;
		align-items: center;
		gap: calc(var(--z-rating-size) * 0.18);
		border-radius: var(--radius-sm);
		outline: none;
		touch-action: none;
	}

	.icons.is-interactive {
		cursor: pointer;
	}

	.icons:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
	}

	.icons.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.icon {
		position: relative;
		display: inline-flex;
		width: var(--z-rating-size);
		height: var(--z-rating-size);
		flex-shrink: 0;
		transition: transform var(--motion-instant) var(--ease-enter);
	}

	.icons.is-interactive .icon.is-hovered {
		transform: scale(1.12);
	}

	.icon svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.empty svg {
		fill: var(--z-rating-empty);
		stroke: var(--z-rating-empty);
	}

	.fill {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		overflow: hidden;
		transition: width var(--motion-fast) var(--ease-enter);
	}

	.fill svg {
		width: var(--z-rating-size);
		fill: var(--tone);
		stroke: var(--tone);
	}

	svg {
		stroke-width: 1.5;
		stroke-linejoin: round;
	}

	.icons.is-previewing .fill svg {
		fill: color-mix(in oklch, var(--tone) 70%, transparent);
		stroke: color-mix(in oklch, var(--tone) 70%, transparent);
	}

	.value {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		font-variant-numeric: tabular-nums;
		line-height: var(--line-height-none);
	}

	:host([size='lg']) .value {
		font-size: var(--font-size-md);
	}
`, ue = "M12 2.8l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 17.24l-5.66 2.97 1.08-6.3-4.57-4.46 6.32-.92z", de = "M12 20.3s-7.6-4.55-9.2-9.1C1.6 7.8 3.75 4.6 7.05 4.6c2.05 0 3.6 1.15 4.95 2.95 1.35-1.8 2.9-2.95 4.95-2.95 3.3 0 5.45 3.2 4.25 6.6-1.6 4.55-9.2 9.1-9.2 9.1z", N = (e) => {
  const n = e.shape === "heart";
  return e.shape === "circle" ? /* @__PURE__ */ l("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ l("circle", { cx: "12", cy: "12", r: "8.5" }) }) : /* @__PURE__ */ l("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ l("path", { d: n ? de : ue }) });
}, f = (e, n, i) => Math.min(i, Math.max(n, e)), fe = (e, n) => Math.round(e / n) * n, R = (e) => Number.isInteger(e) ? String(e) : e.toFixed(1), M = (e, n, i, s) => {
  const c = n.getBoundingClientRect(), h = getComputedStyle(n).direction === "rtl" ? c.right - e.clientX : e.clientX - c.left, m = f(h / c.width, 0, 1);
  return s < 1 && m <= 0.5 ? i + 0.5 : i + 1;
}, he = (e, n, i, s) => e === "ArrowRight" || e === "ArrowUp" ? f(n + i, 0, s) : e === "ArrowLeft" || e === "ArrowDown" ? f(n - i, 0, s) : e === "Home" ? 0 : e === "End" ? s : /^[0-9]$/.test(e) ? f(Number(e), 0, s) : null, me = G(
  (e) => {
    const n = le(), i = re(e.label), s = T(), [c, d] = oe("value"), [h, m] = ae(null), D = T(c ?? 0), u = Math.max(1, Math.round(e.max ?? 5)), v = e.step === 0.5 ? 0.5 : 1, A = e.shape ?? "star", o = f(c ?? 0, 0, u), B = o > 0, p = !!e.isReadonly, F = { flags: { valueMissing: !0 }, message: n("selectOneOfTheseOptions") }, P = !!e.isRequired && !B, V = Y({
      value: B ? String(o) : null,
      isDisabled: e.isDisabled,
      isReadonly: p,
      control: s,
      validity: P ? F : { flags: {} },
      onReset: () => d(D.current),
      onRestore: (t) => {
        typeof t == "string" && d(Number(t));
      }
    }), g = !!e.isDisabled || V.isFormDisabled, y = !g && !p, k = (t) => {
      const a = !!e.canClear && t === o ? 0 : fe(t, v);
      a !== o && (d(a), e.change({ value: a }));
    }, L = (t, r) => {
      if (!y) return;
      const a = t.currentTarget;
      m(M(t, a, r, v));
    }, j = (t, r) => {
      if (!y) return;
      const a = t.currentTarget;
      k(M(t, a, r, v)), m(null);
    }, I = () => m(null), O = (t) => {
      if (!y) return;
      const r = he(t.key, o, v, u);
      !(r !== null) || (t.preventDefault(), r === o) || (d(r), e.change({ value: r }));
    }, b = h !== null, w = b ? h : o, q = Array.from({ length: u }, (t, r) => r), $ = n("ratingValue", { value: R(o), max: u }), C = n("ratedValue", { value: R(o), max: u }), U = i ? `${i}, ${C}` : C, W = ["icons"].concat(y ? ["is-interactive"] : []).concat(b ? ["is-previewing"] : []).concat(g ? ["is-disabled"] : []).join(" "), _ = {
      role: "slider",
      tabindex: g ? "-1" : "0",
      "aria-label": i ?? n("rating"),
      "aria-valuemin": "0",
      "aria-valuemax": String(u),
      "aria-valuenow": String(o),
      "aria-valuetext": $,
      "aria-disabled": g ? "true" : void 0,
      "aria-required": e.isRequired ? "true" : void 0,
      "aria-invalid": e.error ? "true" : void 0,
      "aria-describedby": ie(e.description, e.error)
    }, K = p ? { role: "img", "aria-label": U } : _, X = (t) => {
      const a = `${f(w - t, 0, 1) * 100}%`, Z = b && t < w ? "icon is-hovered" : "icon";
      return /* @__PURE__ */ z(
        "span",
        {
          class: Z,
          onpointermove: (x) => L(x, t),
          onclick: (x) => j(x, t),
          children: [
            /* @__PURE__ */ l("span", { class: "empty", children: /* @__PURE__ */ l(N, { shape: A }) }),
            /* @__PURE__ */ l("span", { class: "fill", style: { width: a }, children: /* @__PURE__ */ l(N, { shape: A }) })
          ]
        }
      );
    };
    return /* @__PURE__ */ z("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ z("div", { class: "row", children: [
        /* @__PURE__ */ l(
          "div",
          {
            ref: s,
            class: W,
            part: "icons",
            onkeydown: O,
            onpointerleave: I,
            ...K,
            children: q.map(X)
          }
        ),
        e.doesShowValue && /* @__PURE__ */ l("span", { class: "value", "aria-hidden": "true", children: R(w) })
      ] }),
      se(e.description, e.error)
    ] });
  },
  {
    props: {
      ...ne,
      value: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      shape: { type: S("star", "heart", "circle"), reflect: !0 },
      size: { type: S("sm", "md", "lg"), reflect: !0 },
      tone: { type: S("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      doesShowValue: { type: Boolean, reflect: !0 },
      canClear: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: J({ bubbles: !0, composed: !0 })
    },
    styles: [ce, Q, te],
    form: !0
  }
);
ee("z-rating", me);
export {
  me as ZRating
};
