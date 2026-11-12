// @ts-self-types="./z-dialog.d.ts"
import { c as m, a as y, e as u, f as p, b as g, g as l, j as n, d as v } from "../chunks/define-element-BZUk-KLk.js";
import { i as x } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as E } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as S } from "../chunks/hooks-DEFT8qqt.js";
import { d as w } from "../chunks/overlay-styles-BeWhjeXT.js";
import { i as D, o as k, c as B } from "../chunks/modal-Be8jZ8Jc.js";
import { u as C } from "../chunks/locale-Bb4aqXuR.js";
const T = 'a[href], area[href], button, input, select, textarea, iframe, summary, [tabindex], [contenteditable="true"]', H = (e) => {
  if (e.hidden) return !1;
  const i = getComputedStyle(e);
  return i.display !== "none" && i.visibility !== "hidden";
}, L = (e) => !e.matches(T) || e.disabled || e.tabIndex < 0 ? !1 : H(e), r = (e, i) => {
  if (e instanceof HTMLSlotElement) {
    for (const s of e.assignedNodes({ flatten: !0 })) r(s, i);
    return;
  }
  if (e instanceof HTMLElement && (L(e) && i.push(e), e.shadowRoot)) {
    for (const s of e.shadowRoot.childNodes) r(s, i);
    return;
  }
  for (const s of e.childNodes) r(s, i);
}, R = (e) => {
  const i = [];
  return r(e, i), i;
}, O = () => {
  var i;
  let e = document.activeElement;
  for (; (i = e == null ? void 0 : e.shadowRoot) != null && i.activeElement; ) e = e.shadowRoot.activeElement;
  return e;
}, M = m`
	.trigger {
		display: inline-flex;
	}
`, N = y(
  (e) => {
    const i = C(), s = p(), [a, c] = E("isOpen"), [h, b] = S(!1);
    g(() => {
      const t = s.current;
      t && (a ? k(t) && e.open() : B(t));
    }, [a]), g(() => {
      const t = s.current;
      if (!t) return;
      const o = () => {
        a && c(!1), e.close();
      };
      return t.addEventListener("close", o), () => t.removeEventListener("close", o);
    }, [a]);
    const d = () => c(!1);
    return /* @__PURE__ */ l("host", { shadowDom: !0, children: [
      /* @__PURE__ */ n("div", { class: "trigger", onclick: () => !e.isDisabled && c(!0), children: /* @__PURE__ */ n("slot", { name: "trigger" }) }),
      /* @__PURE__ */ l(
        "dialog",
        {
          class: "dialog",
          ref: s,
          onclick: (t) => {
            e.isStatic || t.target === s.current && d();
          },
          onkeydown: (t) => {
            if (t.key !== "Tab" || !s.current) return;
            const o = R(s.current);
            if (o.length === 0) return;
            const f = o.indexOf(O());
            t.shiftKey && f <= 0 ? (t.preventDefault(), o[o.length - 1].focus()) : !t.shiftKey && f === o.length - 1 && (t.preventDefault(), o[0].focus());
          },
          oncancel: (t) => D(t, d),
          "aria-labelledby": e.heading ? "dialog-title" : void 0,
          "aria-label": e.label,
          "aria-describedby": e.description ? "dialog-description" : void 0,
          children: [
            /* @__PURE__ */ l("div", { class: "body", children: [
              (e.heading || !e.isCloseHidden) && /* @__PURE__ */ l("div", { class: "header", children: [
                e.heading ? /* @__PURE__ */ n("h2", { id: "dialog-title", class: "title", children: e.heading }) : /* @__PURE__ */ n("span", {}),
                !e.isCloseHidden && /* @__PURE__ */ n("button", { type: "button", class: "close", "aria-label": i("close"), onclick: d, children: /* @__PURE__ */ l("svg", { viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ n("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
                  /* @__PURE__ */ n("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
                ] }) })
              ] }),
              e.description && /* @__PURE__ */ n("p", { id: "dialog-description", class: "description", children: e.description }),
              /* @__PURE__ */ n("slot", {})
            ] }),
            /* @__PURE__ */ n("div", { class: "footer", style: h ? "" : "display: none", children: /* @__PURE__ */ n(
              "slot",
              {
                name: "footer",
                onslotchange: (t) => b(t.target.assignedNodes().length > 0)
              }
            ) })
          ]
        }
      )
    ] });
  },
  {
    props: {
      isOpen: { type: Boolean, reflect: !0 },
      heading: String,
      label: String,
      description: String,
      isCloseHidden: { type: Boolean, reflect: !0 },
      isStatic: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      open: u({ bubbles: !0, composed: !0 }),
      close: u({ bubbles: !0, composed: !0 })
    },
    styles: [w, M, x]
  }
);
v("z-dialog", N);
export {
  N as ZDialog
};
