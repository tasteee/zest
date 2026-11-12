// @ts-self-types="./z-number-range-input.d.ts"
import { c as A, a as k, e as x, u as q, f as w, g as z, j as y } from "../chunks/define-element-BZUk-KLk.js";
import { i as I } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as L, d as U } from "../chunks/form-control-CrK-0rhn.js";
import { s as j, d as H, u as O, a as E, r as W } from "../chunks/accessible-NC1hpH4S.js";
import { u as Z } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as S } from "../chunks/prop-types-B3Bpi956.js";
import { u as $ } from "../chunks/locale-Bb4aqXuR.js";
import "./z-number-input.js";
const G = A`
	:host { display: inline-block; width: fit-content; max-width: 100%; --tone: var(--accent-primary); }
	:host([is-full-width]) { display: block; width: 100%; }
	:host([is-hidden]) { display: none; }
	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	.row { display: flex; align-items: stretch; box-sizing: border-box; width: 100%; background: transparent; border: 1px solid var(--border-default); border-radius: var(--radius-md); color: var(--text-primary); overflow: hidden; transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.row.is-sm { height: var(--control-height-sm); font-size: var(--font-size-sm); }
	.row.is-md { height: var(--control-height-md); font-size: var(--font-size-sm); }
	.row.is-lg { height: var(--control-height-lg); font-size: var(--font-size-md); }
	.row:hover { border-color: color-mix(in oklch, var(--text-primary) 30%, transparent); }
	.row:focus-within { border-color: var(--tone); background: color-mix(in oklch, var(--tone) 5%, transparent); outline: 1px solid var(--border-focus); outline-offset: -1px; }
	.row.is-invalid { border-color: var(--status-danger); --tone: var(--status-danger); }
	.row.is-disabled { opacity: var(--control-disabled-opacity); pointer-events: none; }
	z-number-input { flex: 1 1 0; min-width: 0; }
	.separator { display: flex; align-items: center; padding-inline: var(--space-1); color: var(--text-secondary); user-select: none; -webkit-user-select: none; }
`, l = (e) => {
  if (e == null || e === "") return null;
  const a = Number(e);
  return Number.isFinite(a) ? a : null;
}, J = (e) => {
  const a = Array.isArray(e) ? e : [];
  return [l(a[0]), l(a[1])];
}, K = (e, a) => Array.isArray(a) ? e[0] === a[0] && e[1] === a[1] : !1, M = k(
  (e) => {
    const a = q(), u = $(), B = O(e.label), [R, f] = Z("value"), c = J(R), s = c[0], o = c[1], h = w(null), p = w();
    h.current === null && (h.current = c);
    const F = () => {
      const r = new FormData(), t = a.current.getAttribute("name") ?? "", n = s !== null, i = o !== null;
      return n && r.append(t, String(s)), i && r.append(t, String(o)), r;
    }, N = (r) => {
      if (!(r instanceof FormData)) return;
      const n = a.current.getAttribute("name") ?? "", i = r.getAll(n).map(Number);
      f([l(i[0]), l(i[1])]);
    }, C = L({
      value: F(),
      isDisabled: e.isDisabled,
      isReadonly: e.isReadonly,
      control: p,
      onReset: () => f(h.current),
      onRestore: N
    }), b = e.isDisabled || C.isFormDisabled, P = (r, t) => {
      const n = r === "lower";
      return n && t !== null && o !== null && t > o ? [o, o] : !n && t !== null && s !== null && t < s ? [s, s] : n ? [t, o] : [s, t];
    }, d = (r, t, n) => {
      var g;
      n.stopPropagation();
      const i = l((g = n.detail) == null ? void 0 : g.value), m = P(r, i);
      K(m, c) && t === "input" || (f(m), e[t]({ value: m }));
    }, v = !!e.isInvalid || !!e.error, D = ["row", `is-${e.size ?? "md"}`, v ? "is-invalid" : "", b ? "is-disabled" : ""].filter(Boolean).join(" "), V = E(e.description, e.error);
    return /* @__PURE__ */ z("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ z("div", { class: D, role: "group", "aria-label": B, "aria-describedby": V, children: [
        /* @__PURE__ */ y(
          "z-number-input",
          {
            ref: p,
            label: u("lowerValue"),
            value: s,
            min: e.min,
            max: o ?? e.max,
            step: e.step,
            size: e.size,
            tone: e.tone,
            placeholder: e.lowerPlaceholder,
            valuePrefix: e.valuePrefix,
            valueSuffix: e.valueSuffix,
            isBorderless: !0,
            isInvalid: v,
            isDisabled: b,
            isReadonly: e.isReadonly,
            isRequired: e.isRequired,
            hasStepperButtons: e.hasStepperButtons,
            oninput: (r) => d("lower", "input", r),
            onchange: (r) => d("lower", "change", r)
          }
        ),
        /* @__PURE__ */ y("span", { class: "separator", "aria-hidden": "true", children: u("rangeSeparator") }),
        /* @__PURE__ */ y(
          "z-number-input",
          {
            label: u("upperValue"),
            value: o,
            min: s ?? e.min,
            max: e.max,
            step: e.step,
            size: e.size,
            tone: e.tone,
            placeholder: e.upperPlaceholder,
            valuePrefix: e.valuePrefix,
            valueSuffix: e.valueSuffix,
            isBorderless: !0,
            isInvalid: v,
            isDisabled: b,
            isReadonly: e.isReadonly,
            isRequired: e.isRequired,
            hasStepperButtons: e.hasStepperButtons,
            oninput: (r) => d("upper", "input", r),
            onchange: (r) => d("upper", "change", r)
          }
        )
      ] }),
      W(e.description, e.error)
    ] });
  },
  {
    props: {
      ...H,
      value: { type: Array },
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      label: String,
      name: { type: String, reflect: !0 },
      lowerPlaceholder: String,
      upperPlaceholder: String,
      valuePrefix: String,
      valueSuffix: String,
      size: { type: S("sm", "md", "lg"), reflect: !0 },
      tone: { type: S("primary", "secondary", "tertiary"), reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      hasStepperButtons: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: x({ bubbles: !0, composed: !0 }),
      change: x({ bubbles: !0, composed: !0 })
    },
    styles: [G, I, j],
    form: !0
  }
);
U("z-number-range-input", M);
export {
  M as ZNumberRangeInput
};
