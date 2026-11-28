// @ts-self-types="./z-number-input.d.ts"
import { c as se, a as ae, e as j, u as oe, f as H, b as M, g as U, j as c } from "../chunks/define-element-BZUk-KLk.js";
import { i as le } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as ue, d as de } from "../chunks/form-control-B69z9f8A.js";
import { s as ce, d as fe, u as me, a as he, b as be } from "../chunks/accessible-D6muJfYC.js";
import { u as pe } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as y } from "../chunks/hooks-DEFT8qqt.js";
import { o as W } from "../chunks/prop-types-CSJu2W-0.js";
import { u as ve } from "../chunks/locale-BNhgEFKA.js";
import { r as Z } from "../chunks/misuse-BkfjLjP6.js";
const xe = se`
	.field:focus-within { outline: 1px solid var(--border-focus); outline-offset: -1px; }

	:host { display: inline-flex; width: fit-content; max-width: 100%; --tone: var(--accent-primary); }
	:host([is-full-width]) { width: 100%; }
	:host([is-inline]) { width: auto; }
	:host([is-hidden]) { display: none; }
	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	.field { display: inline-flex; align-items: stretch; width: 100%; box-sizing: border-box; min-width: 0; background: transparent; border: 1px solid var(--border-default); border-radius: var(--radius-md); color: var(--text-primary); font-family: inherit; overflow: hidden; transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.field.is-sm { height: var(--control-height-sm); font-size: var(--font-size-sm); }
	.field.is-md { height: var(--control-height-md); font-size: var(--font-size-sm); }
	.field.is-lg { height: var(--control-height-lg); font-size: var(--font-size-md); }
	.field:hover { border-color: color-mix(in oklch, var(--text-primary) 30%, transparent); }
	.field.is-focused { border-color: var(--tone); background: color-mix(in oklch, var(--tone) 5%, transparent); }
	.field.is-invalid { border-color: var(--status-danger); --tone: var(--status-danger); }
	.field.is-disabled { opacity: var(--control-disabled-opacity); pointer-events: none; }
	input { flex: 1 1 auto; min-width: 0; width: calc(5ch + var(--affix-length, 0) * 1ch); appearance: textfield; background: transparent; border: 0; outline: none; color: inherit; font: inherit; text-align: center; }
	input::placeholder { color: var(--text-secondary); user-select: none; -webkit-user-select: none; }
	input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { appearance: none; margin: 0; }
	:host([is-borderless]) .field { height: auto; border: 0; border-radius: 0; background: transparent; outline: none; }
	:host([is-borderless]) .field:hover, :host([is-borderless]) .field.is-focused { background: transparent; }
	/* prefix / suffix slots: visual adornments inside the field box, outside
	   the value (a unit such as BPM, a currency sign, an icon). They stay
	   visible while editing, unlike value-prefix / value-suffix. */
	.adornment { display: inline-flex; align-items: center; flex-shrink: 0; color: var(--text-secondary); font-size: 0.875em; user-select: none; -webkit-user-select: none; }
	.adornment.is-empty { display: none; }
	.adornment.is-prefix { padding-inline-start: var(--space-2); }
	.adornment.is-suffix { padding-inline-end: var(--space-2); }
	:host([is-borderless]) .adornment.is-prefix { padding-inline-start: 0; padding-inline-end: var(--space-1); }
	:host([is-borderless]) .adornment.is-suffix { padding-inline-end: 0; padding-inline-start: var(--space-1); }
	.field.has-suffix:not(.has-prefix) input { text-align: end; }
	.field.has-prefix:not(.has-suffix) input { text-align: start; }
	::slotted(svg) { width: 1.125em; height: 1.125em; }
	.stepper { display: grid; place-items: center; flex: 0 0 auto; width: 2rem; border: 0; background: transparent; color: var(--text-secondary); font: inherit; font-size: 1.125em; line-height: var(--line-height-none); cursor: pointer; user-select: none; -webkit-user-select: none; transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.stepper:hover:not(:disabled) { color: var(--text-primary); background: color-mix(in oklch, var(--text-primary) 6%, transparent); }
	.stepper:active:not(:disabled) { background: color-mix(in oklch, var(--tone) 12%, transparent); color: var(--tone); }
	.stepper:focus-visible { position: relative; z-index: 1; outline: 2px solid var(--border-focus); outline-offset: -2px; }
	.stepper:disabled { cursor: not-allowed; opacity: 0.35; }
`, ge = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", D = (e) => /^-?(?:\d+|\d*\.\d+)$/.test(e), p = (e) => {
  var r;
  const l = String(e).toLowerCase(), [v, w] = l.split("e"), h = ((r = v.split(".")[1]) == null ? void 0 : r.length) || 0;
  return Math.max(0, h - Number(w || 0));
}, ye = ae(
  (e) => {
    const l = ve(), v = oe(), w = me(e.label), h = H(), [r, x] = pe("value"), S = H(r), [u, d] = y(r == null ? "" : String(r)), [f, O] = y(!1), N = Number(e.step), R = Number(e.min), F = Number(e.max), m = Number.isFinite(N) && N > 0 ? N : 1, n = Number.isFinite(R) ? R : void 0, o = Number.isFinite(F) ? F : void 0, i = D(u) ? Number(u) : null, _ = i != null && (n == null || i >= n) && (o == null || i <= o), P = !!e.isInvalid || u !== "" && !_, G = () => {
      if (u === "") return { flags: {} };
      if (i == null) return { flags: { badInput: !0 }, message: l("enterANumber") };
      if (n != null && i < n) return { flags: { rangeUnderflow: !0 }, message: l("valueAtLeast", { min: n }) };
      if (o != null && i > o) return { flags: { rangeOverflow: !0 }, message: l("valueAtMost", { max: o }) };
      const t = (i - (n ?? 0)) / m, s = Math.max(p(m), p(i), p(n ?? 0));
      return Math.abs(t - Math.round(t)) < 10 ** -Math.min(12, s + 2) ? { flags: {} } : { flags: { stepMismatch: !0 }, message: l("valueOnStep", { low: Number((Math.floor(t) * m + (n ?? 0)).toFixed(s)), high: Number((Math.ceil(t) * m + (n ?? 0)).toFixed(s)) }) };
    }, { isFormDisabled: J } = ue({
      value: i != null ? String(i) : "",
      isDisabled: e.isDisabled,
      isReadOnly: e.isReadOnly,
      control: h,
      validity: G(),
      submitsOnEnter: !0,
      onReset: () => {
        x(S.current), d(S.current == null ? "" : String(S.current));
      },
      onRestore: (t) => {
        typeof t == "string" && (d(t), D(t) && x(Number(t)));
      }
    }), b = e.isDisabled || J;
    M(() => {
      var t;
      f && ((t = h.current) == null || t.select());
    }, [f]), M(() => {
      f || d(r == null ? "" : String(r));
    }, [r, f]);
    const K = (t) => Math.min(o ?? 1 / 0, Math.max(n ?? -1 / 0, t)), k = (t) => {
      const s = Math.max(p(m), p(t)), a = K(Number(t.toFixed(Math.min(12, s))));
      x(a), d(String(a)), e.change({ value: a });
    }, g = (t) => {
      if (b || e.isReadOnly) return;
      k((i ?? r ?? n ?? 0) + t * m);
    }, Q = () => {
      if (O(!1), i == null) {
        r != null ? d(String(r)) : n != null ? k(n) : d("");
        return;
      }
      k(i);
    }, V = e.valuePrefix ?? "", I = e.valueSuffix ?? "", A = V.length + I.length, E = A > 0, q = u !== "" && i != null, C = `${V}${u}${I}`, X = E && q && !f ? C : u, Y = E && q ? C : void 0, ee = `--affix-length: ${A}`, [B, te] = y(!1), [z, ne] = y(!1), L = (t) => t.target.assignedNodes({ flatten: !0 }).some((s) => {
      var a;
      return s.nodeType === Node.ELEMENT_NODE || !!((a = s.textContent) != null && a.trim());
    }), T = B && !!e.valuePrefix, $ = z && !!e.valueSuffix;
    M(() => {
      T && Z(v.current, "double-prefix", "z-number-input: both value-prefix and a prefix slot are set. Use one."), $ && Z(v.current, "double-suffix", "z-number-input: both value-suffix and a suffix slot are set. Use one.");
    }, [T, $]);
    const ie = ["field", ge(e)].concat(B ? ["has-prefix"] : []).concat(z ? ["has-suffix"] : []).concat(f ? ["is-focused"] : []).concat(P ? ["is-invalid"] : []).concat(b ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ U("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ U("div", { class: ie, children: [
        e.hasStepperButtons && /* @__PURE__ */ c("button", { class: "stepper", type: "button", tabindex: "-1", disabled: b || e.isReadOnly || n != null && (i ?? r ?? n) <= n, "aria-label": l("decreaseValue"), onclick: () => g(-1), children: "−" }),
        /* @__PURE__ */ c("span", { class: B ? "adornment is-prefix" : "adornment is-prefix is-empty", children: /* @__PURE__ */ c("slot", { name: "prefix", onslotchange: (t) => te(L(t)) }) }),
        /* @__PURE__ */ c(
          "input",
          {
            ref: h,
            type: "text",
            role: "spinbutton",
            "aria-valuemin": n,
            "aria-valuemax": o,
            "aria-valuenow": i != null && Number.isFinite(i) ? i : void 0,
            inputmode: "decimal",
            value: X,
            style: ee,
            "aria-valuetext": Y,
            placeholder: e.placeholder,
            disabled: b,
            readonly: e.isReadOnly ? !0 : void 0,
            required: e.isRequired,
            "aria-label": w,
            "aria-describedby": he(e.description, e.error),
            "aria-invalid": P || e.error ? "true" : void 0,
            onfocus: (t) => {
              O(!0), t.target.select();
            },
            onblur: Q,
            onkeydown: (t) => {
              t.key === "ArrowUp" && (t.preventDefault(), g(1)), t.key === "ArrowDown" && (t.preventDefault(), g(-1));
            },
            oninput: (t) => {
              t.stopPropagation();
              const s = t.target.value;
              d(s);
              const a = D(s) ? Number(s) : null;
              a != null && x(a);
              const re = a != null && (n == null || a >= n) && (o == null || a <= o);
              e.input({ value: a, rawValue: s, isValid: re });
            }
          }
        ),
        /* @__PURE__ */ c("span", { class: z ? "adornment is-suffix" : "adornment is-suffix is-empty", children: /* @__PURE__ */ c("slot", { name: "suffix", onslotchange: (t) => ne(L(t)) }) }),
        e.hasStepperButtons && /* @__PURE__ */ c("button", { class: "stepper", type: "button", tabindex: "-1", disabled: b || e.isReadOnly || o != null && (i ?? r ?? o) >= o, "aria-label": l("increaseValue"), onclick: () => g(1), children: "+" })
      ] }),
      be(e.description, e.error)
    ] });
  },
  {
    props: {
      ...fe,
      value: { type: Number, reflect: !0 },
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      label: String,
      name: { type: String, reflect: !0 },
      placeholder: String,
      valuePrefix: String,
      valueSuffix: String,
      size: { type: W("sm", "md", "lg"), reflect: !0 },
      tone: { type: W("primary", "secondary", "tertiary"), reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadOnly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      hasStepperButtons: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isInline: { type: Boolean, reflect: !0 },
      isBorderless: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: j({ bubbles: !0, composed: !0 }),
      change: j({ bubbles: !0, composed: !0 })
    },
    styles: [xe, le, ce],
    form: !0
  }
);
de("z-number-input", ye);
export {
  ye as ZNumberInput
};
