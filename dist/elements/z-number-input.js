import { c as Q, a as X, e as A, u as Y, f as P, b as q, g as $, j as S } from "../chunks/define-element-BZUk-KLk.js";
import { i as _ } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as ee, d as te } from "../chunks/form-control-D_UwalCr.js";
import { s as re, d as ne, u as ie, a as oe, r as ae } from "../chunks/accessible-NC1hpH4S.js";
import { u as se } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as j } from "../chunks/hooks-DEFT8qqt.js";
import { o as C } from "../chunks/prop-types-B3Bpi956.js";
import { u as le } from "../chunks/locale-DUDaH1Ni.js";
const ue = Q`
	.field:focus-within { outline: 2px solid var(--focus-ring); outline-offset: 2px; }

	:host { display: inline-flex; width: fit-content; max-width: 100%; --accent: var(--primary); }
	:host([is-full-width]) { width: 100%; }
	:host([is-inline]) { width: auto; }
	:host([is-hidden]) { display: none; }
	:host([tone='secondary']) { --accent: var(--purple); }
	:host([tone='tertiary']) { --accent: var(--pink); }
	.field { display: inline-flex; align-items: stretch; width: 100%; box-sizing: border-box; min-width: 0; background: transparent; border: 1px solid var(--border); border-radius: var(--radius-md); color: var(--foreground); font-family: inherit; overflow: hidden; transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.field.is-sm { height: var(--control-height-sm); font-size: var(--control-font-size-sm); }
	.field.is-md { height: var(--control-height-md); font-size: var(--control-font-size-md); }
	.field.is-lg { height: var(--control-height-lg); font-size: var(--control-font-size-lg); }
	.field:hover { border-color: color-mix(in oklch, var(--foreground) 30%, transparent); }
	.field.is-focused { border-color: var(--accent); background: color-mix(in oklch, var(--accent) 5%, transparent); }
	.field.is-invalid { border-color: var(--destructive); --accent: var(--destructive); }
	.field.is-disabled { opacity: var(--control-disabled-opacity); pointer-events: none; }
	input { flex: 1 1 auto; min-width: 0; width: calc(5ch + var(--affix-length, 0) * 1ch); appearance: textfield; background: transparent; border: 0; outline: none; color: inherit; font: inherit; text-align: center; }
	input::placeholder { color: var(--muted-foreground); user-select: none; -webkit-user-select: none; }
	input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { appearance: none; margin: 0; }
	:host([is-borderless]) .field { height: auto; border: 0; border-radius: 0; background: transparent; outline: none; }
	:host([is-borderless]) .field:hover, :host([is-borderless]) .field.is-focused { background: transparent; }
	.stepper { display: grid; place-items: center; flex: 0 0 auto; width: 2rem; border: 0; background: transparent; color: var(--muted-foreground); font: inherit; font-size: 1.125em; line-height: 1; cursor: pointer; user-select: none; -webkit-user-select: none; transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.stepper:hover:not(:disabled) { color: var(--foreground); background: color-mix(in oklch, var(--foreground) 6%, transparent); }
	.stepper:active:not(:disabled) { background: color-mix(in oklch, var(--accent) 12%, transparent); color: var(--accent); }
	.stepper:focus-visible { position: relative; z-index: 1; outline: 2px solid var(--focus-ring); outline-offset: -2px; }
	.stepper:disabled { cursor: not-allowed; opacity: 0.35; }
`, ce = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", k = (e) => /^-?(?:\d+|\d*\.\d+)$/.test(e), v = (e) => {
  var u;
  const l = String(e).toLowerCase(), [g, b] = l.split("e"), i = ((u = g.split(".")[1]) == null ? void 0 : u.length) || 0;
  return Math.max(0, i - Number(b || 0));
}, de = X(
  (e) => {
    const l = le();
    Y();
    const g = ie(e.label), b = P(), [i, u] = se("value"), y = P(i), [c, d] = j(i == null ? "" : String(i)), [f, N] = j(!1), x = Number(e.step), B = Number(e.min), z = Number(e.max), m = Number.isFinite(x) && x > 0 ? x : 1, r = Number.isFinite(B) ? B : void 0, o = Number.isFinite(z) ? z : void 0, n = k(c) ? Number(c) : null, L = n != null && (r == null || n >= r) && (o == null || n <= o), M = !!e.isInvalid || c !== "" && !L, E = () => {
      if (c === "") return { flags: {} };
      if (n == null) return { flags: { badInput: !0 }, message: l("enterANumber") };
      if (r != null && n < r) return { flags: { rangeUnderflow: !0 }, message: l("valueAtLeast", { min: r }) };
      if (o != null && n > o) return { flags: { rangeOverflow: !0 }, message: l("valueAtMost", { max: o }) };
      const t = (n - (r ?? 0)) / m, a = Math.max(v(m), v(n), v(r ?? 0));
      return Math.abs(t - Math.round(t)) < 10 ** -Math.min(12, a + 2) ? { flags: {} } : { flags: { stepMismatch: !0 }, message: l("valueOnStep", { low: Number((Math.floor(t) * m + (r ?? 0)).toFixed(a)), high: Number((Math.ceil(t) * m + (r ?? 0)).toFixed(a)) }) };
    }, { isFormDisabled: H } = ee({
      value: n != null ? String(n) : "",
      isDisabled: e.isDisabled,
      isReadonly: e.isReadonly,
      control: b,
      validity: E(),
      submitsOnEnter: !0,
      onReset: () => {
        u(y.current), d(y.current == null ? "" : String(y.current));
      },
      onRestore: (t) => {
        typeof t == "string" && (d(t), k(t) && u(Number(t)));
      }
    }), h = e.isDisabled || H;
    q(() => {
      var t;
      f && ((t = b.current) == null || t.select());
    }, [f]), q(() => {
      f || d(i == null ? "" : String(i));
    }, [i, f]);
    const T = (t) => Math.min(o ?? 1 / 0, Math.max(r ?? -1 / 0, t)), w = (t) => {
      const a = Math.max(v(m), v(t)), s = T(Number(t.toFixed(Math.min(12, a))));
      u(s), d(String(s)), e.change({ value: s });
    }, p = (t) => {
      if (h || e.isReadonly) return;
      w((n ?? i ?? r ?? 0) + t * m);
    }, U = () => {
      if (N(!1), n == null) {
        i != null ? d(String(i)) : r != null ? w(r) : d("");
        return;
      }
      w(n);
    }, R = e.valuePrefix ?? "", F = e.valueSuffix ?? "", D = R.length + F.length, V = D > 0, I = c !== "" && n != null, O = `${R}${c}${F}`, W = V && I && !f ? O : c, Z = V && I ? O : void 0, G = `--affix-length: ${D}`, J = ["field", ce(e)].concat(f ? ["is-focused"] : []).concat(M ? ["is-invalid"] : []).concat(h ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ $("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ $("div", { class: J, children: [
        e.hasStepperButtons && /* @__PURE__ */ S("button", { class: "stepper", type: "button", tabindex: "-1", disabled: h || e.isReadonly || r != null && (n ?? i ?? r) <= r, "aria-label": l("decreaseValue"), onclick: () => p(-1), children: "−" }),
        /* @__PURE__ */ S(
          "input",
          {
            ref: b,
            type: "text",
            role: "spinbutton",
            "aria-valuemin": r,
            "aria-valuemax": o,
            "aria-valuenow": n != null && Number.isFinite(n) ? n : void 0,
            inputmode: "decimal",
            value: W,
            style: G,
            "aria-valuetext": Z,
            placeholder: e.placeholder,
            disabled: h,
            readonly: e.isReadonly,
            required: e.isRequired,
            "aria-label": g,
            "aria-describedby": oe(e.description, e.error),
            "aria-invalid": M || e.error ? "true" : void 0,
            onfocus: (t) => {
              N(!0), t.target.select();
            },
            onblur: U,
            onkeydown: (t) => {
              t.key === "ArrowUp" && (t.preventDefault(), p(1)), t.key === "ArrowDown" && (t.preventDefault(), p(-1));
            },
            oninput: (t) => {
              t.stopPropagation();
              const a = t.target.value;
              d(a);
              const s = k(a) ? Number(a) : null;
              s != null && u(s);
              const K = s != null && (r == null || s >= r) && (o == null || s <= o);
              e.input({ value: s, rawValue: a, isValid: K });
            }
          }
        ),
        e.hasStepperButtons && /* @__PURE__ */ S("button", { class: "stepper", type: "button", tabindex: "-1", disabled: h || e.isReadonly || o != null && (n ?? i ?? o) >= o, "aria-label": l("increaseValue"), onclick: () => p(1), children: "+" })
      ] }),
      ae(e.description, e.error)
    ] });
  },
  {
    props: {
      ...ne,
      value: { type: Number, reflect: !0 },
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      label: String,
      name: { type: String, reflect: !0 },
      placeholder: String,
      valuePrefix: String,
      valueSuffix: String,
      size: { type: C("sm", "md", "lg"), reflect: !0 },
      tone: { type: C("primary", "secondary", "tertiary"), reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      hasStepperButtons: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isInline: { type: Boolean, reflect: !0 },
      isBorderless: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: A({ bubbles: !0, composed: !0 }),
      change: A({ bubbles: !0, composed: !0 })
    },
    styles: [ue, _, re],
    form: !0
  }
);
te("z-number-input", de);
export {
  de as ZNumberInput
};
