import { c as P, a as $, e as y, u as E, f as D, b as l, j as c, g as L, d as k } from "../chunks/define-element-BWC3wEPr.js";
import { u as b } from "../chunks/hooks-D9_x-ckD.js";
import { f as q, c as z, d as B } from "../chunks/editor-overlay-styles-DEH-Ouss.js";
import { A as w, r as H, a as N, c as O } from "../chunks/overlay-BJ9Mg5BD.js";
import { u as T } from "../chunks/transition-DlYkj6t5.js";
import { a as K } from "../chunks/menu-nav-Wh2Qsy6q.js";
import { d as Q } from "../chunks/debounce-CRAeDgkb.js";
const U = P`
	:host {
		position: fixed;
		inset: 0;
		z-index: var(--z-menu, 50);
		pointer-events: none;
	}
`, V = $(
  (t) => {
    E();
    const h = D(), r = !!t.isOpen, m = T(r), [o, f] = b(0), [I, M] = b([]), [u, v] = b(!1), g = D(), R = Array.isArray(t.items) ? t.items : [], a = String(t.query || ""), d = typeof t.source == "function", n = d ? I : R.filter((e) => !a || (e.label || "").toLowerCase().includes(a.toLowerCase())), x = (e) => !!(n[e] && !n[e].isDisabled);
    l(() => {
      f(0);
    }, [a, t.items]), l(() => {
      if (!d) return;
      const e = g.current ?? (g.current = Q((s) => {
        v(!0), Promise.resolve(t.source(s)).then((i) => M(Array.isArray(i) ? i : [])).finally(() => v(!1));
      }, t.debounceMs ?? 250));
      return e(a), () => e.cancel();
    }, [a, d]), l(() => {
      !u && n.length === 0 && (a || !d) && t.empty();
    }, [n.length, u, a]), l(() => {
      const e = h.current;
      if (!e || !r || !t.anchorRect) return;
      const s = H(t.anchorRect);
      return N(s, e, () => {
        const A = O(s, e, { placement: t.placement || "bottom-start", offset: t.offset ?? 8 });
        e.style.left = `${A.x}px`, e.style.top = `${A.y}px`;
      });
    }, [r, t.anchorRect, t.placement, t.offset]);
    const p = (e) => {
      const s = n[e];
      !s || s.isDisabled || t.select({ value: s.value || s.label || "", label: s.label || "" });
    }, S = K({
      itemCount: n.length,
      activeIndex: o,
      isSelectable: x,
      onMove: f,
      onCommit: p,
      onClose: () => t.dismiss()
    });
    l(() => {
      if (r)
        return document.addEventListener("keydown", S, !0), () => document.removeEventListener("keydown", S, !0);
    }, [r, o, n.length]);
    const C = ["surface"].concat(m === "open" ? ["is-open"] : []).concat(m === "closing" ? ["is-closing"] : []).join(" ");
    if (m === "closed" && !r) return /* @__PURE__ */ c("host", { shadowDom: !0 });
    const j = n[o] ? `mention-item-${n[o].value || o}` : void 0;
    return /* @__PURE__ */ c("host", { shadowDom: !0, children: /* @__PURE__ */ L(
      "div",
      {
        ref: h,
        class: C,
        role: "listbox",
        "aria-label": `${t.trigger || "@"} mentions`,
        "aria-activedescendant": j,
        children: [
          u && n.length === 0 && /* @__PURE__ */ c("div", { class: "empty", children: "Loading…" }),
          !u && n.length === 0 && /* @__PURE__ */ c("div", { class: "empty", children: t.emptyText || "No matches" }),
          n.map((e, s) => {
            const i = ["item"].concat(s === o ? ["is-active"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
            return /* @__PURE__ */ L(
              "button",
              {
                id: `mention-item-${e.value || s}`,
                type: "button",
                class: i,
                role: "option",
                "aria-selected": s === o ? "true" : "false",
                disabled: e.isDisabled,
                onmouseenter: () => f(s),
                onclick: () => p(s),
                children: [
                  e.icon && /* @__PURE__ */ c("span", { class: "icon", innerHTML: e.icon }),
                  /* @__PURE__ */ c("span", { class: "label", children: e.label }),
                  e.description && /* @__PURE__ */ c("span", { class: "description", children: e.description })
                ]
              },
              e.value || e.label || s
            );
          })
        ]
      }
    ) });
  },
  {
    props: {
      trigger: { type: String, reflect: !0 },
      items: { type: Array },
      source: w,
      query: { type: String },
      debounceMs: { type: Number },
      anchorRect: w,
      placement: { type: String, reflect: !0 },
      offset: { type: Number },
      emptyText: String,
      isOpen: { type: Boolean, reflect: !0 },
      select: y({ bubbles: !0, composed: !0 }),
      empty: y({ bubbles: !0, composed: !0 }),
      dismiss: y({ bubbles: !0, composed: !0 })
    },
    styles: [q, z, B, U]
  }
);
k("z-mention-popover", V);
export {
  V as ZMentionPopover
};
