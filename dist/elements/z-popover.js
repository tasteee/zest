// @ts-self-types="./z-popover.d.ts"
import { c as z, a as S, e as P, u as O, f as l, b as p, g as R, j as u, d as D } from "../chunks/define-element-BZUk-KLk.js";
import { i as k } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as A } from "../chunks/use-prop-C0_HeSQ9.js";
import { f as F } from "../chunks/overlay-styles-BeWhjeXT.js";
import { o as L, h as x, s as B, a as C, b as j, c as q } from "../chunks/overlay-CFiufx65.js";
const I = z`
	.trigger {
		display: inline-flex;
	}

	.surface {
		max-width: var(--z-overlay-max-width, 22rem);
		min-width: 12rem;
		pointer-events: auto;
	}
`, T = S(
  (o) => {
    const f = O(), d = l(), g = l(), h = l(), [s, m] = A("isOpen"), i = l(void 0), b = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), z-button, z-input, z-select, z-checkbox, z-switch, z-textarea, z-combobox, z-number-input', w = () => {
      var t, n;
      const e = ((t = h.current) == null ? void 0 : t.assignedElements({ flatten: !0 })) ?? [];
      for (const r of e) {
        const a = r.matches(b) ? r : r.querySelector(b);
        if (a) {
          a.focus();
          return;
        }
      }
      (n = d.current) == null || n.focus();
    }, v = () => {
      var e;
      return (e = g.current) == null ? void 0 : e.assignedElements({ flatten: !0 })[0];
    }, E = () => {
      var e;
      return (e = v()) == null ? void 0 : e.focus();
    }, y = () => {
      var n;
      const e = v();
      if (!e) return;
      const t = ((n = e.shadowRoot) == null ? void 0 : n.querySelector("button, [role]")) ?? e;
      t.setAttribute("aria-haspopup", "dialog"), t.setAttribute("aria-expanded", s ? "true" : "false");
    };
    return p(y, [s]), p(() => {
      const e = !!s;
      if (i.current === void 0) {
        i.current = e;
        return;
      }
      i.current !== e && (i.current = e, o.toggle({ open: e }));
    }, [s]), p(() => {
      const e = d.current;
      if (!e || !s) {
        e && x(e);
        return;
      }
      B(e), w();
      const t = () => j(
        e,
        q(f.current, e, {
          placement: o.placement || "bottom",
          offset: o.offset ?? 8
        })
      ), n = C(f.current, e, t), r = (c) => {
        c.composedPath().includes(f.current) || m(!1);
      }, a = (c) => {
        c.key === "Escape" && (c.preventDefault(), m(!1), E());
      };
      return document.addEventListener("pointerdown", r), document.addEventListener("keydown", a), () => {
        n(), document.removeEventListener("pointerdown", r), document.removeEventListener("keydown", a), x(e);
      };
    }, [s, o.placement, o.offset]), /* @__PURE__ */ R("host", { shadowDom: !0, children: [
      /* @__PURE__ */ u("div", { class: "trigger", onclick: () => !o.isDisabled && m(!s), children: /* @__PURE__ */ u("slot", { ref: g, name: "trigger", onslotchange: y }) }),
      /* @__PURE__ */ u("div", { ref: d, class: "surface", popover: "manual", role: "dialog", tabindex: "-1", "aria-label": o.label, children: /* @__PURE__ */ u("slot", { ref: h }) })
    ] });
  },
  {
    props: {
      ...L,
      label: String,
      isOpen: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      toggle: P({ bubbles: !0, composed: !0 })
    },
    styles: [F, I, k]
  }
);
D("z-popover", T);
export {
  T as ZPopover
};
