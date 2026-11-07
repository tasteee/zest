import { c as q, a as F, e as O, u as j, f as R, b as k, j as z } from "../chunks/define-element-BZUk-KLk.js";
import { i as E } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as L, d as G } from "../chunks/form-control-D_UwalCr.js";
import { d as H, u as I } from "../chunks/accessible-NC1hpH4S.js";
import { u as K } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as N } from "../chunks/use-listener-CmAx40Cx.js";
import { o as A } from "../chunks/prop-types-B3Bpi956.js";
import { u as P } from "../chunks/locale-DUDaH1Ni.js";
const M = q`
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		--z-radio-group-accent: var(--primary);
	}

	:host([tone='secondary']) { --z-radio-group-accent: var(--purple); }
	:host([tone='tertiary']) { --z-radio-group-accent: var(--pink); }
	:host([tone='success']) { --z-radio-group-accent: var(--success); }
	:host([tone='warning']) { --z-radio-group-accent: var(--warning); }
	:host([tone='danger']) { --z-radio-group-accent: var(--destructive); }

	:host([direction='horizontal']) {
		flex-direction: row;
		gap: var(--space-lg);
	}

	:host([is-hidden]) {
		display: none;
	}
`, b = (t) => t.value != null ? t.value : t.getAttribute("value") ?? void 0, c = (t) => [...t.querySelectorAll("z-radio")], x = (t) => t.find((l) => l.isChecked || l.hasAttribute("is-checked")), T = F(
  (t) => {
    const l = P(), n = j(), C = I(t.label), [i, u] = K("value"), S = R(i), m = i != null && i !== "", y = c(n.current), p = { current: x(y) ?? y.find((e) => !e.isDisabled && !e.hasAttribute("is-disabled")) }, { isFormDisabled: B } = L({
      value: m ? i : null,
      isDisabled: t.isDisabled,
      control: p,
      validity: t.isRequired && !m ? { flags: { valueMissing: !0 }, message: l("selectOneOfTheseOptions") } : { flags: {} },
      onReset: () => u(S.current),
      onRestore: (e) => {
        typeof e == "string" && u(e);
      }
    }), f = !!t.isDisabled || B, h = R(/* @__PURE__ */ new Set()), v = () => {
      const e = c(n.current);
      if (f) {
        for (const r of e)
          r.isDisabled || r.hasAttribute("is-disabled") || (r.isDisabled = !0, h.current.add(r));
        return;
      }
      for (const r of h.current) r.isDisabled = !1;
      h.current.clear();
    };
    k(v, [f]), N(
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
    const D = () => {
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
    k(D, [i]);
    const V = () => {
      D(), v();
    };
    return /* @__PURE__ */ z(
      "host",
      {
        shadowDom: !0,
        role: "radiogroup",
        tabindex: "-1",
        onfocus: (e) => {
          var r;
          e.target === n.current && ((r = p.current) == null || r.focus());
        },
        onkeydown: (e) => {
          const r = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
          if (!r || f) return;
          const a = c(n.current).filter((s) => !s.isDisabled && !s.hasAttribute("is-disabled"));
          if (a.length === 0) return;
          e.preventDefault();
          const o = a.findIndex((s) => s === e.target || s.contains(e.target)), w = o >= 0 ? o : a.findIndex((s) => s.isChecked), g = a[((w < 0 ? r > 0 ? -1 : 0 : w) + r + a.length) % a.length];
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
        children: /* @__PURE__ */ z("slot", { onslotchange: V })
      }
    );
  },
  {
    props: {
      ...H,
      value: { type: String, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      direction: { type: A("vertical", "horizontal"), reflect: !0 },
      tone: { type: A("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: O({ bubbles: !0, composed: !0 })
    },
    styles: [M, E],
    form: !0
  }
);
G("z-radio-group", T);
export {
  T as ZRadioGroup
};
