// @ts-self-types="./z-chip-group.d.ts"
import { c as G, a as I, e as K, u as T, f as A, b as V, j as x } from "../chunks/define-element-BZUk-KLk.js";
import { i as U } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as Z, d as J } from "../chunks/form-control-CZ1HzNxT.js";
import { d as Q, u as W } from "../chunks/accessible-NC1hpH4S.js";
import { u as X } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as Y } from "../chunks/use-listener-CmAx40Cx.js";
import { o as y, l as _ } from "../chunks/prop-types-CSJu2W-0.js";
import { u as $ } from "../chunks/locale-BNhgEFKA.js";
import "./z-chip.js";
const ee = G`
	:host {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='primary']) { --z-chip-accent: var(--accent-primary); }
	:host([tone='secondary']) { --z-chip-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-chip-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-chip-accent: var(--status-success); }
	:host([tone='warning']) { --z-chip-accent: var(--status-warning); }
	:host([tone='danger']) { --z-chip-accent: var(--status-danger); }

	:host([size='sm']) {
		--z-chip-height: 1.5rem;
		--z-chip-padding: var(--space-2-5);
		--z-chip-font-size: var(--font-size-xs);
		gap: var(--space-1-5);
	}
	:host([size='lg']) {
		--z-chip-height: 2.5rem;
		--z-chip-padding: var(--space-4);
		--z-chip-font-size: var(--font-size-md);
		gap: var(--space-2-5);
	}

	:host([kind='soft']) {
		--z-chip-rest-bg: var(--surface-subtle);
		--z-chip-rest-border: transparent;
	}
`, c = (e) => [...e.querySelectorAll("z-chip")], E = (e) => {
  var n;
  return e.value != null ? e.value : e.getAttribute("value") ?? ((n = e.textContent) == null ? void 0 : n.trim()) ?? "";
}, P = (e, n, s) => typeof n == "boolean" ? n : e.hasAttribute(s), te = (e) => P(e, e.isSelected, "is-selected"), v = (e) => P(e, e.isDisabled, "is-disabled"), B = (e) => c(e).filter(te).map(E), se = (e, n) => {
  if (n.length === 0) return null;
  const l = new FormData();
  for (const u of n) l.append(e, u);
  return l;
}, re = (e) => e === "ArrowRight" || e === "ArrowDown" ? 1 : e === "ArrowLeft" || e === "ArrowUp" ? -1 : 0, ne = I(
  (e) => {
    const n = $(), s = T(), l = W(e.label), [u, f] = X("value"), d = A(null), m = A(/* @__PURE__ */ new Set()), w = Array.isArray(u), p = w ? u : [], R = p.length === 0, M = !!e.isRequired && R, z = s.current.getAttribute("name") ?? "", C = { current: c(s.current).find((t) => !v(t)) }, N = { flags: { valueMissing: !0 }, message: n("selectOneOfTheseOptions") }, O = { flags: {} }, H = Z({
      value: se(z, p),
      isDisabled: e.isDisabled,
      control: C,
      validity: M ? N : O,
      onReset: () => f(d.current ?? []),
      onRestore: (t) => {
        t instanceof FormData && f(t.getAll(z).map(String));
      }
    }), D = !!e.isDisabled || H.isFormDisabled, S = () => {
      if (D) {
        for (const t of c(s.current))
          v(t) || (t.isDisabled = !0, m.current.add(t));
        return;
      }
      for (const t of m.current) t.isDisabled = !1;
      m.current.clear();
    };
    V(S, [D]);
    const F = () => {
      const t = c(s.current);
      if (!(t.length > 0)) return;
      if (!w) {
        const o = B(s.current), a = e.isMultiple ? o : o.slice(0, 1);
        d.current = d.current ?? a, f(a);
        return;
      }
      d.current = d.current ?? p;
      const r = new Set(p);
      for (const o of t) o.isSelected = r.has(E(o));
    };
    V(F, [u, e.isMultiple]), Y(s, "select", (t) => {
      const i = t, r = i.target;
      if (!(r.localName === "z-chip")) return;
      if (i.stopPropagation(), !e.isMultiple && i.detail.selected)
        for (const h of c(s.current))
          h !== r && (h.isSelected = !1);
      const g = B(s.current);
      f(g), e.change({ value: g });
    });
    const j = (t) => {
      const i = re(t.key);
      if (!i) return;
      const r = c(s.current).filter((b) => !v(b));
      if (!(r.length > 0)) return;
      const a = r.findIndex((b) => b.matches(":focus-within"));
      if (a < 0) return;
      t.preventDefault();
      const h = (a + i + r.length) % r.length;
      r[h].focus();
    }, q = (t) => {
      var r;
      t.target === s.current && ((r = C.current) == null || r.focus());
    }, L = () => {
      F(), S();
    }, k = [e.description, e.error].filter(Boolean).join(" ") || void 0;
    return /* @__PURE__ */ x(
      "host",
      {
        shadowDom: !0,
        role: "group",
        tabindex: "-1",
        onfocus: q,
        onkeydown: j,
        "aria-label": l,
        "aria-description": k,
        "aria-invalid": e.error ? "true" : void 0,
        children: /* @__PURE__ */ x("slot", { onslotchange: L })
      }
    );
  },
  {
    props: {
      ...Q,
      value: { type: _() },
      name: { type: String, reflect: !0 },
      label: String,
      tone: { type: y("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      size: { type: y("sm", "md", "lg"), reflect: !0 },
      kind: { type: y("outline", "soft"), reflect: !0 },
      isMultiple: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: K({ bubbles: !0, composed: !0 })
    },
    styles: [ee, U],
    form: !0
  }
);
J("z-chip-group", ne);
export {
  ne as ZChipGroup
};
