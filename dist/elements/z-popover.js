// @ts-self-types="./z-popover.d.ts"
import { c as E, a as P, e as S, u as O, f as l, b as p, g as D, j as u, d as R } from "../chunks/define-element-BZUk-KLk.js";
import { i as k } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as A } from "../chunks/use-prop-C0_HeSQ9.js";
import { f as F } from "../chunks/overlay-styles-BeWhjeXT.js";
import { o as L, h as x, s as B, a as C, b as j, c as I } from "../chunks/overlay-DCHYaOiA.js";
const T = E`
	.trigger {
		display: inline-flex;
	}

	.surface {
		max-width: var(--z-overlay-max-width, 22rem);
		min-width: 12rem;
		pointer-events: auto;
	}
`, U = P(
  (t) => {
    const f = O(), d = l(), g = l(), h = l(), [n, m] = A("isOpen"), i = l(void 0), b = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), z-button, z-input, z-select, z-checkbox, z-switch, z-textarea, z-combobox, z-number-input, z-color-panel', w = () => {
      var s, r;
      const e = ((s = h.current) == null ? void 0 : s.assignedElements({ flatten: !0 })) ?? [];
      for (const o of e) {
        const a = o.matches(b) ? o : o.querySelector(b);
        if (a) {
          a.focus();
          return;
        }
      }
      (r = d.current) == null || r.focus();
    }, v = () => {
      var e;
      return (e = g.current) == null ? void 0 : e.assignedElements({ flatten: !0 })[0];
    }, z = () => {
      var e;
      return (e = v()) == null ? void 0 : e.focus();
    }, y = () => {
      const e = v();
      e && (e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", n ? "true" : "false"));
    };
    return p(y, [n]), p(() => {
      const e = !!n;
      if (i.current === void 0) {
        i.current = e;
        return;
      }
      i.current !== e && (i.current = e, t.toggle({ open: e }));
    }, [n]), p(() => {
      const e = d.current;
      if (!e || !n) {
        e && x(e);
        return;
      }
      B(e), w();
      const s = () => j(
        e,
        I(f.current, e, {
          placement: t.placement || "bottom",
          offset: t.offset ?? 8
        })
      ), r = C(f.current, e, s), o = (c) => {
        c.composedPath().includes(f.current) || m(!1);
      }, a = (c) => {
        c.key === "Escape" && (c.preventDefault(), m(!1), z());
      };
      return document.addEventListener("pointerdown", o), document.addEventListener("keydown", a), () => {
        r(), document.removeEventListener("pointerdown", o), document.removeEventListener("keydown", a), x(e);
      };
    }, [n, t.placement, t.offset]), /* @__PURE__ */ D("host", { shadowDom: !0, children: [
      /* @__PURE__ */ u("div", { class: "trigger", onclick: () => !t.isDisabled && m(!n), children: /* @__PURE__ */ u("slot", { ref: g, name: "trigger", onslotchange: y }) }),
      /* @__PURE__ */ u("div", { ref: d, class: "surface", popover: "manual", role: "dialog", tabindex: "-1", "aria-label": t.label, children: /* @__PURE__ */ u("slot", { ref: h }) })
    ] });
  },
  {
    props: {
      ...L,
      label: String,
      isOpen: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      toggle: S({ bubbles: !0, composed: !0 })
    },
    styles: [F, T, k]
  }
);
R("z-popover", U);
export {
  U as ZPopover
};
