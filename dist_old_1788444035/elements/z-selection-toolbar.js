import { c as b, a as d, e as p, u as y, f as h, b as m, j as o, d as v } from "../chunks/define-element-BWC3wEPr.js";
import { f as A, a as g, b as S } from "../chunks/editor-overlay-styles-DEH-Ouss.js";
import { A as x, r as R, a as D, c as j } from "../chunks/overlay-BJ9Mg5BD.js";
import { u as w } from "../chunks/transition-DlYkj6t5.js";
const z = b`
	:host {
		position: fixed;
		inset: 0;
		z-index: var(--z-toolbar, 40);
		pointer-events: none;
	}
`, B = d(
  (t) => {
    y();
    const l = h(), a = !!t.isOpen, n = w(a), i = Array.isArray(t.items) ? t.items : [];
    m(() => {
      const e = l.current;
      if (!e || !a || !t.anchorRect) return;
      const s = R(t.anchorRect), c = () => j(s, e, { placement: t.placement || "top", offset: t.offset ?? 10 });
      return D(s, e, () => {
        const r = c();
        e.style.left = `${r.x}px`, e.style.top = `${r.y}px`;
      });
    }, [a, t.anchorRect, t.placement, t.offset]);
    const u = (e) => {
      e.isDisabled || t.action({ value: e.value || e.label || "" });
    }, f = ["surface"].concat(n === "open" ? ["is-open"] : []).concat(n === "closing" ? ["is-closing"] : []).join(" ");
    return n === "closed" && !a ? /* @__PURE__ */ o("host", { shadowDom: !0 }) : /* @__PURE__ */ o("host", { shadowDom: !0, children: /* @__PURE__ */ o(
      "div",
      {
        ref: l,
        class: f,
        role: "toolbar",
        "aria-label": t.label || "Selection formatting",
        onmousedown: (e) => e.preventDefault(),
        children: i.map((e, s) => {
          const c = ["icon-button"].concat(e.isActive ? ["is-active"] : []).join(" ");
          return /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              class: c,
              "aria-label": e.label || e.value,
              "aria-pressed": e.isActive ? "true" : "false",
              disabled: e.isDisabled,
              onclick: () => u(e),
              children: e.icon ? /* @__PURE__ */ o("span", { innerHTML: e.icon }) : e.label
            },
            e.value || s
          );
        })
      }
    ) });
  },
  {
    props: {
      items: { type: Array },
      anchorRect: x,
      placement: { type: String, reflect: !0 },
      offset: { type: Number },
      label: String,
      isOpen: { type: Boolean, reflect: !0 },
      action: p({ bubbles: !0, composed: !0 })
    },
    styles: [A, g, S, z]
  }
);
v("z-selection-toolbar", B);
export {
  B as ZSelectionToolbar
};
