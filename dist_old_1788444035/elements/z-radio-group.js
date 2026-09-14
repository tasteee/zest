import { c as p, a as h, e as f, u as g, b as v, j as u, d as m } from "../chunks/define-element-BWC3wEPr.js";
import { u as b } from "../chunks/use-prop-DBBKVpkc.js";
import { u as y } from "../chunks/use-listener-DSqSZVYk.js";
const z = p`
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		--z-radio-group-accent: var(--primary);
	}

	:host([accent='dom']) { --z-radio-group-accent: var(--purple); }
	:host([accent='sub']) { --z-radio-group-accent: var(--pink); }
	:host([accent='success']) { --z-radio-group-accent: var(--success); }
	:host([accent='warning']) { --z-radio-group-accent: var(--warning); }
	:host([accent='error']) { --z-radio-group-accent: var(--destructive); }

	:host([direction='horizontal']) {
		flex-direction: row;
		gap: var(--space-lg);
	}

	:host([is-hidden]) {
		display: none;
	}
`, l = (e) => e.value != null ? e.value : e.getAttribute("value") ?? void 0, d = (e) => [...e.querySelectorAll("z-radio")], k = (e) => e.find((r) => r.isChecked || r.hasAttribute("is-checked")), R = h(
  (e) => {
    const r = g(), [o, c] = b("value");
    y(
      r,
      "select",
      (a) => {
        const s = a, i = s.target;
        for (const t of d(r.current))
          t !== i && (t.isChecked = !1);
        c(s.detail.value), e.change({ value: s.detail.value });
      },
      { passive: !0 }
    );
    const n = () => {
      const a = d(r.current);
      if (!(a.length > 0)) return;
      if (!(o != null && o !== "")) {
        const t = k(a);
        t && c(l(t));
        return;
      }
      for (const t of a)
        t.isChecked = l(t) === o;
    };
    return v(n, [o]), /* @__PURE__ */ u("host", { shadowDom: !0, role: "radiogroup", "aria-label": e.label, children: /* @__PURE__ */ u("slot", { onslotchange: n }) });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      direction: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: f({ bubbles: !0, composed: !0 })
    },
    styles: z
  }
);
m("z-radio-group", R);
export {
  R as ZRadioGroup
};
