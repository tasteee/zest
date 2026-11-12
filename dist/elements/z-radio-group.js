// @ts-self-types="./z-radio-group.d.ts"
import { c as q, a as F, e as O, u as j, f as R, b as k, j as z } from "../chunks/define-element-BZUk-KLk.js";
import { i as E } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as L, d as G } from "../chunks/form-control-CrK-0rhn.js";
import { d as H, u as I } from "../chunks/accessible-NC1hpH4S.js";
import { u as K } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as N } from "../chunks/use-listener-CmAx40Cx.js";
import { o as A } from "../chunks/prop-types-B3Bpi956.js";
import { u as P } from "../chunks/locale-Bb4aqXuR.js";
const M = q`
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

	:host([direction='horizontal']) {
		flex-direction: row;
		gap: var(--space-6);
	}

	:host([is-hidden]) {
		display: none;
	}
`, b = (t) => t.value != null ? t.value : t.getAttribute("value") ?? void 0, c = (t) => [...t.querySelectorAll("z-radio")], x = (t) => t.find((l) => l.isChecked || l.hasAttribute("is-checked")), T = F(
  (t) => {
    const l = P(), n = j(), C = I(t.label), [i, u] = K("value"), S = R(i), y = i != null && i !== "", m = c(n.current), v = { current: x(m) ?? m.find((e) => !e.isDisabled && !e.hasAttribute("is-disabled")) }, { isFormDisabled: B } = L({
      value: y ? i : null,
      isDisabled: t.isDisabled,
      control: v,
      validity: t.isRequired && !y ? { flags: { valueMissing: !0 }, message: l("selectOneOfTheseOptions") } : { flags: {} },
      onReset: () => u(S.current),
      onRestore: (e) => {
        typeof e == "string" && u(e);
      }
    }), f = !!t.isDisabled || B, h = R(/* @__PURE__ */ new Set()), p = () => {
      const e = c(n.current);
      if (f) {
        for (const r of e)
          r.isDisabled || r.hasAttribute("is-disabled") || (r.isDisabled = !0, h.current.add(r));
        return;
      }
      for (const r of h.current) r.isDisabled = !1;
      h.current.clear();
    };
    k(p, [f]), N(
      n,
      "select",
      (e) => {
        const r = e, a = r.target;
        for (const s of c(n.current))
          s !== a && (s.isChecked = !1);
        u(r.detail.value), t.change({ value: r.detail.value });
      },
      { passive: !0 }
    );
    const D = () => {
      const e = c(n.current);
      if (!(e.length > 0)) return;
      if (!(i != null && i !== "")) {
        const s = x(e);
        s && u(b(s));
        return;
      }
      for (const s of e)
        s.isChecked = b(s) === i;
    };
    k(D, [i]);
    const V = () => {
      D(), p();
    };
    return /* @__PURE__ */ z(
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
          const a = c(n.current).filter((o) => !o.isDisabled && !o.hasAttribute("is-disabled"));
          if (a.length === 0) return;
          e.preventDefault();
          const s = a.findIndex((o) => o === e.target || o.contains(e.target)), w = s >= 0 ? s : a.findIndex((o) => o.isChecked), g = a[((w < 0 ? r > 0 ? -1 : 0 : w) + r + a.length) % a.length];
          g.focus();
          const d = b(g);
          if (!(d === void 0 || d === t.value)) {
            for (const o of c(n.current)) o.isChecked = o === g;
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
