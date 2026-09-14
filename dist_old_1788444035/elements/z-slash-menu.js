import { c as D, a as x, e as m, u as A, f as C, b as l, j as c, g as v, d as L } from "../chunks/define-element-BWC3wEPr.js";
import { u as M } from "../chunks/hooks-D9_x-ckD.js";
import { f as R, c as $, d as j } from "../chunks/editor-overlay-styles-DEH-Ouss.js";
import { A as q, r as I, a as k, c as z } from "../chunks/overlay-BJ9Mg5BD.js";
import { u as B } from "../chunks/transition-DlYkj6t5.js";
import { a as E } from "../chunks/menu-nav-Wh2Qsy6q.js";
const H = D`
	:host {
		position: fixed;
		inset: 0;
		z-index: var(--z-menu, 50);
		pointer-events: none;
	}
`, K = x(
  (t) => {
    A();
    const d = C(), a = !!t.isOpen, r = B(a), [o, u] = M(0), f = Array.isArray(t.items) ? t.items : [], i = String(t.query || "").trim().toLowerCase(), n = i ? f.filter((e) => `${e.label || ""} ${e.description || ""}`.toLowerCase().includes(i)) : f, p = (e) => !!(n[e] && !n[e].isDisabled);
    l(() => {
      u(0);
    }, [t.query, t.items]), l(() => {
      n.length === 0 && i && t.empty();
    }, [n.length, i]), l(() => {
      const e = d.current;
      if (!e || !a || !t.anchorRect) return;
      const s = I(t.anchorRect);
      return k(s, e, () => {
        const b = z(s, e, { placement: t.placement || "bottom-start", offset: t.offset ?? 8 });
        e.style.left = `${b.x}px`, e.style.top = `${b.y}px`;
      });
    }, [a, t.anchorRect, t.placement, t.offset]);
    const y = (e) => {
      const s = n[e];
      !s || s.isDisabled || t.select({ value: s.value || s.label || "" });
    }, g = E({
      itemCount: n.length,
      activeIndex: o,
      isSelectable: p,
      onMove: u,
      onCommit: y,
      onClose: () => t.dismiss()
    });
    l(() => {
      if (!a) return;
      const e = (s) => {
        if (s.key === " " && n.length === 0) {
          t.dismiss();
          return;
        }
        g(s);
      };
      return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
    }, [a, o, n.length, i]);
    const S = ["surface"].concat(r === "open" ? ["is-open"] : []).concat(r === "closing" ? ["is-closing"] : []).join(" ");
    if (r === "closed" && !a) return /* @__PURE__ */ c("host", { shadowDom: !0 });
    const w = n[o] ? `slash-item-${n[o].value || o}` : void 0;
    return /* @__PURE__ */ c("host", { shadowDom: !0, children: /* @__PURE__ */ v("div", { ref: d, class: S, role: "listbox", "aria-label": "Slash commands", "aria-activedescendant": w, children: [
      n.length === 0 && /* @__PURE__ */ c("div", { class: "empty", children: t.emptyText || "No matching commands" }),
      n.map((e, s) => {
        const h = ["item"].concat(s === o ? ["is-active"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
        return /* @__PURE__ */ v(
          "button",
          {
            id: `slash-item-${e.value || s}`,
            type: "button",
            class: h,
            role: "option",
            "aria-selected": s === o ? "true" : "false",
            disabled: e.isDisabled,
            onmouseenter: () => u(s),
            onclick: () => y(s),
            children: [
              e.icon && /* @__PURE__ */ c("span", { class: "icon", innerHTML: e.icon }),
              /* @__PURE__ */ c("span", { class: "label", children: e.label }),
              e.description && /* @__PURE__ */ c("span", { class: "description", children: e.description })
            ]
          },
          e.value || e.label || s
        );
      })
    ] }) });
  },
  {
    props: {
      items: { type: Array },
      query: { type: String },
      anchorRect: q,
      placement: { type: String, reflect: !0 },
      offset: { type: Number },
      emptyText: String,
      isOpen: { type: Boolean, reflect: !0 },
      select: m({ bubbles: !0, composed: !0 }),
      empty: m({ bubbles: !0, composed: !0 }),
      dismiss: m({ bubbles: !0, composed: !0 })
    },
    styles: [R, $, j, H]
  }
);
L("z-slash-menu", K);
export {
  K as ZSlashMenu
};
