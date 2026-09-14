import { c as h, a as v, e as y, u as w, f as p, b as m, g as b, j as s, d as P } from "../chunks/define-element-BWC3wEPr.js";
import { u as x } from "../chunks/use-prop-DBBKVpkc.js";
import { f as E } from "../chunks/overlay-styles-DmJDaq8Z.js";
import { o as O, h as g, s as D, a as k, b as F, c as L } from "../chunks/overlay-BJ9Mg5BD.js";
const R = h`
	.trigger {
		display: inline-flex;
	}

	.surface {
		max-width: var(--z-overlay-max-width, 22rem);
		min-width: 12rem;
		pointer-events: auto;
	}
`, j = v(
  (t) => {
    const r = w(), c = p(), [o, a] = x("isOpen"), n = p(void 0);
    return m(() => {
      const e = !!o;
      if (n.current === void 0) {
        n.current = e;
        return;
      }
      n.current !== e && (n.current = e, t.toggle({ open: e }));
    }, [o]), m(() => {
      const e = c.current;
      if (!e || !o) {
        e && g(e);
        return;
      }
      D(e);
      const l = () => F(
        e,
        L(r.current, e, {
          placement: t.placement || "bottom",
          offset: t.offset ?? 8
        })
      ), u = k(r.current, e, l), d = (i) => {
        i.composedPath().includes(r.current) || a(!1);
      }, f = (i) => i.key === "Escape" && a(!1);
      return document.addEventListener("pointerdown", d), document.addEventListener("keydown", f), () => {
        u(), document.removeEventListener("pointerdown", d), document.removeEventListener("keydown", f), g(e);
      };
    }, [o, t.placement, t.offset]), /* @__PURE__ */ b("host", { shadowDom: !0, children: [
      /* @__PURE__ */ s(
        "div",
        {
          class: "trigger",
          "aria-haspopup": "dialog",
          "aria-expanded": o ? "true" : "false",
          onclick: () => !t.isDisabled && a(!o),
          children: /* @__PURE__ */ s("slot", { name: "trigger" })
        }
      ),
      /* @__PURE__ */ s("div", { ref: c, class: "surface", popover: "manual", role: "dialog", children: /* @__PURE__ */ s("slot", {}) })
    ] });
  },
  {
    props: {
      ...O,
      isOpen: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      toggle: y({ bubbles: !0, composed: !0 })
    },
    styles: [E, R]
  }
);
P("z-popover", j);
export {
  j as ZPopover
};
