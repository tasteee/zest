import { c as q, a as M, e as N, u as V, b as j, j as f, g as A, d as C } from "../chunks/define-element-BWC3wEPr.js";
import { u as E } from "../chunks/use-prop-DBBKVpkc.js";
import { u as S } from "../chunks/hooks-D9_x-ckD.js";
const H = q`
	:host { display: inline-flex; width: fit-content; max-width: 100%; --accent: var(--primary); }
	:host([is-full-width]) { width: 100%; }
	:host([inline]) { width: auto; }
	:host([is-hidden]) { display: none; }
	:host([accent='dom']) { --accent: var(--purple); }
	:host([accent='sub']) { --accent: var(--pink); }
	.field { display: inline-flex; align-items: stretch; width: 100%; box-sizing: border-box; min-width: 0; background: transparent; border: 1px solid var(--border); border-radius: var(--radius-md); color: var(--foreground); font-family: inherit; overflow: hidden; transition: border-color 0.12s ease, background-color 0.12s ease; }
	.field.is-sm { height: var(--control-height-sm); font-size: var(--font-size-small); }
	.field.is-md { height: var(--control-height-md); font-size: var(--font-size-body); }
	.field.is-lg { height: var(--control-height-lg); font-size: var(--font-size-h4); }
	.field:hover { border-color: color-mix(in oklch, var(--foreground) 30%, transparent); }
	.field.is-focused { border-color: var(--accent); background: color-mix(in oklch, var(--accent) 5%, transparent); }
	.field.is-invalid { border-color: var(--destructive); --accent: var(--destructive); }
	.field.is-disabled { opacity: 0.55; pointer-events: none; }
	input { flex: 1 1 auto; min-width: 0; width: 5ch; appearance: textfield; background: transparent; border: 0; outline: none; color: inherit; font: inherit; text-align: center; }
	input::placeholder { color: var(--muted-foreground); user-select: none; -webkit-user-select: none; }
	input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { appearance: none; margin: 0; }
	.stepper { display: grid; place-items: center; flex: 0 0 auto; width: 2rem; border: 0; background: transparent; color: var(--muted-foreground); font: inherit; font-size: 1.125em; line-height: 1; cursor: pointer; user-select: none; -webkit-user-select: none; transition: color 0.12s ease, background-color 0.12s ease; }
	.stepper:hover:not(:disabled) { color: var(--foreground); background: color-mix(in oklch, var(--foreground) 6%, transparent); }
	.stepper:active:not(:disabled) { background: color-mix(in oklch, var(--accent) 12%, transparent); color: var(--accent); }
	.stepper:focus-visible { position: relative; z-index: 1; outline: 2px solid color-mix(in oklch, var(--ring) 55%, transparent); outline-offset: -2px; }
	.stepper:disabled { cursor: not-allowed; opacity: 0.35; }
`, P = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", z = (e) => /^-?(?:\d+|\d*\.\d+)$/.test(e), L = (e) => {
  var o;
  const u = String(e).toLowerCase(), [n, d] = u.split("e"), s = ((o = n.split(".")[1]) == null ? void 0 : o.length) || 0;
  return Math.max(0, s - Number(d || 0));
}, O = (e, u) => Number(e.toFixed(Math.min(12, L(u)))), T = M(
  (e) => {
    var k;
    const u = V(), [n, d] = E("value"), [s, o] = S(n == null ? "" : String(n)), [m, v] = S(!1), h = Number(e.step), g = Number(e.min), y = Number(e.max), x = Number.isFinite(h) && h > 0 ? h : 1, i = Number.isFinite(g) ? g : void 0, l = Number.isFinite(y) ? y : void 0, a = z(s) ? Number(s) : null, B = a != null && (i == null || a >= i) && (l == null || a <= l), w = !!e.isInvalid || s !== "" && !B;
    j(() => {
      m || o(n == null ? "" : String(n));
    }, [n, m]);
    const D = (t) => Math.min(l ?? 1 / 0, Math.max(i ?? -1 / 0, t)), p = (t) => {
      const r = O(D(t), x);
      d(r), o(String(r)), e.change({ value: r });
    }, b = (t) => {
      if (e.isDisabled || e.isReadonly) return;
      p((a ?? n ?? i ?? 0) + t * x);
    }, I = () => {
      if (v(!1), a == null) {
        n != null ? o(String(n)) : i != null ? p(i) : o("");
        return;
      }
      p(a);
    }, R = ["field", P(e)].concat(m ? ["is-focused"] : []).concat(w ? ["is-invalid"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ f("host", { shadowDom: !0, children: /* @__PURE__ */ A("div", { class: R, children: [
      e.hasStepperButtons && /* @__PURE__ */ f("button", { class: "stepper", type: "button", disabled: e.isDisabled || e.isReadonly || i != null && (a ?? n ?? i) <= i, "aria-label": "Decrease value", onclick: () => b(-1), children: "−" }),
      /* @__PURE__ */ f(
        "input",
        {
          type: "text",
          inputmode: "decimal",
          value: s,
          name: e.name,
          placeholder: e.placeholder,
          disabled: e.isDisabled,
          readonly: e.isReadonly,
          required: e.isRequired,
          "aria-label": e.label || ((k = u.current) == null ? void 0 : k.getAttribute("aria-label")) || void 0,
          "aria-invalid": w ? "true" : void 0,
          onfocus: (t) => {
            v(!0), t.target.select();
          },
          onblur: I,
          onkeydown: (t) => {
            t.key === "ArrowUp" && (t.preventDefault(), b(1)), t.key === "ArrowDown" && (t.preventDefault(), b(-1));
          },
          oninput: (t) => {
            const r = t.target.value;
            o(r);
            const c = z(r) ? Number(r) : null;
            c != null && d(c);
            const F = c != null && (i == null || c >= i) && (l == null || c <= l);
            e.input({ value: c, rawValue: r, isValid: F });
          }
        }
      ),
      e.hasStepperButtons && /* @__PURE__ */ f("button", { class: "stepper", type: "button", disabled: e.isDisabled || e.isReadonly || l != null && (a ?? n ?? l) >= l, "aria-label": "Increase value", onclick: () => b(1), children: "+" })
    ] }) });
  },
  {
    props: {
      value: { type: Number, reflect: !0 },
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      label: String,
      name: String,
      placeholder: String,
      size: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      hasStepperButtons: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      inline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: N({ bubbles: !0, composed: !0 }),
      change: N({ bubbles: !0, composed: !0 })
    },
    styles: H
  }
);
C("z-number-input", T);
export {
  T as ZNumberInput
};
