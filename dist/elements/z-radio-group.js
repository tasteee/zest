// @ts-self-types="./z-radio-group.d.ts"
import { c as q, a as F, e as O, u as L, f as z, b as R, j as k } from "../chunks/define-element-BZUk-KLk.js";
import { i as j } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as E, d as H } from "../chunks/form-control-B69z9f8A.js";
import { d as G, u as I } from "../chunks/accessible-D6muJfYC.js";
import { u as K } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as N } from "../chunks/use-listener-CmAx40Cx.js";
import { o as A } from "../chunks/prop-types-CSJu2W-0.js";
import { u as P } from "../chunks/locale-BNhgEFKA.js";
import { w as M } from "../chunks/deprecate-DrGNNffe.js";
const T = q`
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		--z-radio-group-accent: var(--accent-primary);
	}

	:host([tone='secondary']) { --z-radio-group-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-radio-group-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-radio-group-accent: var(--status-success); }
	:host([tone='warning']) { --z-radio-group-accent: var(--status-warning); }
	:host([tone='danger']) { --z-radio-group-accent: var(--status-danger); }

	:host([is-horizontal]),
	:host([direction='horizontal']) {
		flex-direction: row;
		gap: var(--space-6);
	}

	:host([is-hidden]) {
		display: none;
	}
`, b = (t) => t.value != null ? t.value : t.getAttribute("value") ?? void 0, c = (t) => [...t.querySelectorAll("z-radio")], x = (t) => t.find((l) => l.isChecked || l.hasAttribute("is-checked")), U = F(
  (t) => {
    M({ tag: "z-radio-group", attribute: "direction", value: t.direction, flag: "is-horizontal", flagValue: "horizontal" });
    const l = P(), n = L(), C = I(t.label), [i, u] = K("value"), S = z(i), y = i != null && i !== "", m = c(n.current), v = { current: x(m) ?? m.find((e) => !e.isDisabled && !e.hasAttribute("is-disabled")) }, { isFormDisabled: B } = E({
      value: y ? i : null,
      isDisabled: t.isDisabled,
      control: v,
      validity: t.isRequired && !y ? { flags: { valueMissing: !0 }, message: l("selectOneOfTheseOptions") } : { flags: {} },
      onReset: () => u(S.current),
      onRestore: (e) => {
        typeof e == "string" && u(e);
      }
    }), f = !!t.isDisabled || B, h = z(/* @__PURE__ */ new Set()), p = () => {
      const e = c(n.current);
      if (f) {
        for (const r of e)
          r.isDisabled || r.hasAttribute("is-disabled") || (r.isDisabled = !0, h.current.add(r));
        return;
      }
      for (const r of h.current) r.isDisabled = !1;
      h.current.clear();
    };
    R(p, [f]), N(
      n,
      "select",
      (e) => {
        const r = e, a = r.target;
        for (const o of c(n.current))
          o !== a && (o.isChecked = !1);
        u(r.detail.value), t.change({ value: r.detail.value });
      },
      { passive: !0 }
    );
    const w = () => {
      const e = c(n.current);
      if (!(e.length > 0)) return;
      if (!(i != null && i !== "")) {
        const o = x(e);
        o && u(b(o));
        return;
      }
      for (const o of e)
        o.isChecked = b(o) === i;
    };
    R(w, [i]);
    const V = () => {
      w(), p();
    };
    return /* @__PURE__ */ k(
      "host",
      {
        shadowDom: !0,
        role: "radiogroup",
        tabindex: "-1",
        onfocus: (e) => {
          var r;
          e.target === n.current && ((r = v.current) == null || r.focus());
        },
        onkeydown: (e) => {
          const r = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
          if (!r || f) return;
          const a = c(n.current).filter((s) => !s.isDisabled && !s.hasAttribute("is-disabled"));
          if (a.length === 0) return;
          e.preventDefault();
          const o = a.findIndex((s) => s === e.target || s.contains(e.target)), D = o >= 0 ? o : a.findIndex((s) => s.isChecked), g = a[((D < 0 ? r > 0 ? -1 : 0 : D) + r + a.length) % a.length];
          g.focus();
          const d = b(g);
          if (!(d === void 0 || d === t.value)) {
            for (const s of c(n.current)) s.isChecked = s === g;
            u(d), t.change({ value: d });
          }
        },
        "aria-label": C,
        "aria-description": [t.description, t.error].filter(Boolean).join(" ") || void 0,
        "aria-invalid": t.error ? "true" : void 0,
        "aria-required": t.isRequired ? "true" : void 0,
        children: /* @__PURE__ */ k("slot", { onslotchange: V })
      }
    );
  },
  {
    props: {
      ...G,
      value: { type: String, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      isHorizontal: { type: Boolean, reflect: !0 },
      /** @deprecated use is-horizontal */
      direction: { type: A("vertical", "horizontal"), reflect: !0 },
      tone: { type: A("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: O({ bubbles: !0, composed: !0 })
    },
    styles: [T, j],
    form: !0
  }
);
H("z-radio-group", U);
export {
  U as ZRadioGroup
};
