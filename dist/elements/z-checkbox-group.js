// @ts-self-types="./z-checkbox-group.d.ts"
import { c as G, a as Z, e as J, u as K, f as F, b as E, g as Q, j as m } from "../chunks/define-element-BZUk-KLk.js";
import { i as T } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as W, d as X } from "../chunks/form-control-B69z9f8A.js";
import { d as Y, u as _ } from "../chunks/accessible-D6muJfYC.js";
import { u as $ } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as ee } from "../chunks/use-listener-CmAx40Cx.js";
import { o as M, l as te } from "../chunks/prop-types-CSJu2W-0.js";
import { u as se } from "../chunks/locale-BNhgEFKA.js";
import "./z-checkbox.js";
const re = G`
	:host {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		--z-checkbox-group-accent: var(--accent-primary);
	}

	:host([tone='secondary']) { --z-checkbox-group-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-checkbox-group-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-checkbox-group-accent: var(--status-success); }
	:host([tone='warning']) { --z-checkbox-group-accent: var(--status-warning); }
	:host([tone='danger']) { --z-checkbox-group-accent: var(--status-danger); }

	:host([is-hidden]) {
		display: none;
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	:host([is-horizontal]) .items {
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-3) var(--space-6);
	}

	/* Children sit under the parent's label, so the hierarchy reads at a glance. */
	:host([has-select-all]:not([is-horizontal])) .items {
		padding-inline-start: calc(1.125rem + var(--space-2-5));
	}

	.select-all {
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--border-default);
	}
`, h = (e) => [...e.querySelectorAll("z-checkbox")], V = (e) => e.value != null ? e.value : e.getAttribute("value") ?? "on", P = (e, s, r) => typeof s == "boolean" ? s : e.hasAttribute(r), O = (e) => P(e, e.isChecked, "is-checked"), b = (e) => P(e, e.isDisabled, "is-disabled"), p = (e) => h(e).filter(O).map(V), L = (e) => {
  const s = e.filter((l) => !b(l)), r = s.filter(O).length, o = s.length > 0 && r === s.length, u = r > 0 && !o;
  return { isChecked: o, isIndeterminate: u };
}, ne = (e, s) => {
  if (s.length === 0) return null;
  const a = new FormData();
  for (const o of s) a.append(e, o);
  return a;
}, oe = (e, s) => e.length === s.length ? e.every((a, o) => a === s[o]) : !1, ce = Z(
  (e) => {
    const s = se(), r = K(), a = _(e.label), [o, u] = $("value"), l = F(null), g = F(/* @__PURE__ */ new Set()), v = Array.isArray(o), d = v ? o : [], x = d.length, N = () => {
      const t = x === 0;
      return !!e.isRequired && t ? { flags: { valueMissing: !0 }, message: s("selectAtLeast", { min: e.min ?? 1 }) } : t ? { flags: {} } : typeof e.min == "number" && x < e.min ? { flags: { rangeUnderflow: !0 }, message: s("selectAtLeast", { min: e.min }) } : typeof e.max == "number" && x > e.max ? { flags: { rangeOverflow: !0 }, message: s("selectAtMost", { max: e.max }) } : { flags: {} };
    }, k = h(r.current), C = { current: k.find((t) => !b(t)) }, A = r.current.getAttribute("name") ?? "", R = W({
      value: ne(A, d),
      isDisabled: e.isDisabled,
      control: C,
      validity: N(),
      onReset: () => u(l.current ?? []),
      onRestore: (t) => {
        if (!(t instanceof FormData)) return;
        const c = t.getAll(A).map(String);
        u(c);
      }
    }), y = !!e.isDisabled || R.isFormDisabled, S = () => {
      if (y) {
        for (const t of h(r.current))
          b(t) || (t.isDisabled = !0, g.current.add(t));
        return;
      }
      for (const t of g.current) t.isDisabled = !1;
      g.current.clear();
    };
    E(S, [y]);
    const D = () => {
      const t = h(r.current);
      if (!(t.length > 0)) return;
      if (!v) {
        const i = p(r.current);
        l.current = l.current ?? i, u(i);
        return;
      }
      l.current = l.current ?? d;
      const c = new Set(d);
      for (const i of t) i.isChecked = c.has(V(i));
    };
    E(D, [o]);
    const B = (t) => {
      oe(t, d) || (u(t), e.change({ value: t }));
    };
    ee(r, "change", (t) => {
      const n = t;
      n.target === r.current || !(n.target.localName === "z-checkbox") || (n.stopPropagation(), B(p(r.current)));
    });
    const H = (t) => {
      t.stopPropagation();
      const n = h(r.current), c = n.filter((f) => !b(f)), z = !L(n).isChecked;
      for (const f of c) f.isChecked = z;
      B(p(r.current));
    }, U = (t) => {
      var c;
      t.target === r.current && ((c = C.current) == null || c.focus());
    }, j = () => {
      D(), S();
    }, w = L(k), q = e.selectAllLabel || s("selectAll"), I = [e.description, e.error].filter(Boolean).join(" ") || void 0;
    return /* @__PURE__ */ Q(
      "host",
      {
        shadowDom: !0,
        role: "group",
        tabindex: "-1",
        onfocus: U,
        "aria-label": a,
        "aria-description": I,
        "aria-invalid": e.error ? "true" : void 0,
        children: [
          e.hasSelectAll && /* @__PURE__ */ m("div", { class: "select-all", children: /* @__PURE__ */ m(
            "z-checkbox",
            {
              size: e.size,
              isChecked: w.isChecked,
              isIndeterminate: w.isIndeterminate,
              isDisabled: y,
              onchange: H,
              children: q
            }
          ) }),
          /* @__PURE__ */ m("div", { class: "items", children: /* @__PURE__ */ m("slot", { onslotchange: j }) })
        ]
      }
    );
  },
  {
    props: {
      ...Y,
      value: { type: te() },
      name: { type: String, reflect: !0 },
      label: String,
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      size: { type: M("sm", "md", "lg"), reflect: !0 },
      tone: { type: M("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      selectAllLabel: String,
      hasSelectAll: { type: Boolean, reflect: !0 },
      isHorizontal: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: J({ bubbles: !0, composed: !0 })
    },
    styles: [re, T],
    form: !0
  }
);
X("z-checkbox-group", ce);
export {
  ce as ZCheckboxGroup
};
