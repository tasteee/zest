import { c as g, a as w, u as D, f as p, b as E, g as x, j as s, d as P } from "../chunks/define-element-BWC3wEPr.js";
import { u as b } from "../chunks/hooks-D9_x-ckD.js";
import { f as L } from "../chunks/overlay-styles-DmJDaq8Z.js";
import { o as T, h as v, s as j, a as k, b as S, c as z } from "../chunks/overlay-BJ9Mg5BD.js";
const C = g`
	.trigger {
		display: inline-flex;
	}

	.surface {
		max-width: var(--z-overlay-max-width, 20rem);
		min-width: 14rem;
		pointer-events: auto;
	}
`, F = w(
  (t) => {
    const r = D(), l = p(), o = p(), [u, n] = b(!1);
    E(() => {
      const e = l.current;
      if (!e || !u) {
        e && v(e);
        return;
      }
      j(e);
      const y = () => S(
        e,
        z(r.current, e, {
          placement: t.placement || "bottom",
          offset: t.offset ?? 8
        })
      ), h = k(r.current, e, y), m = (i) => {
        const f = i.composedPath();
        !f.includes(r.current) && !f.includes(e) && n(!1);
      }, d = (i) => i.key === "Escape" && n(!1);
      return document.addEventListener("pointerdown", m), document.addEventListener("keydown", d), () => {
        h(), document.removeEventListener("pointerdown", m), document.removeEventListener("keydown", d), v(e);
      };
    }, [u, t.placement, t.offset]);
    const a = () => {
      clearTimeout(o.current), o.current = setTimeout(() => n(!0), t.openDelay ?? 200);
    }, c = () => {
      clearTimeout(o.current), o.current = setTimeout(() => n(!1), t.closeDelay ?? 150);
    };
    return /* @__PURE__ */ x("host", { shadowDom: !0, children: [
      /* @__PURE__ */ s(
        "div",
        {
          class: "trigger",
          onpointerenter: a,
          onpointerleave: c,
          onfocusin: a,
          onfocusout: c,
          children: /* @__PURE__ */ s("slot", { name: "trigger" })
        }
      ),
      /* @__PURE__ */ s(
        "div",
        {
          ref: l,
          class: "surface",
          popover: "manual",
          role: "dialog",
          onpointerenter: a,
          onpointerleave: c,
          children: /* @__PURE__ */ s("slot", {})
        }
      )
    ] });
  },
  {
    props: {
      ...T,
      openDelay: { type: Number },
      closeDelay: { type: Number }
    },
    styles: [L, C]
  }
);
P("z-hover-card", F);
export {
  F as ZHoverCard
};
