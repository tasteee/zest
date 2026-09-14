import { c as y, a as b, e as c, f as v, b as d, g as l, j as t, d as p } from "../chunks/define-element-BWC3wEPr.js";
import { u as x } from "../chunks/use-prop-DBBKVpkc.js";
import { u as S } from "../chunks/hooks-D9_x-ckD.js";
import { d as C } from "../chunks/overlay-styles-DmJDaq8Z.js";
const u = {
  small: "24rem",
  medium: "30rem",
  large: "42rem"
}, D = y`
	.trigger {
		display: inline-flex;
	}
`, w = b(
  (s) => {
    const o = v(), [i, n] = x("isOpen"), [g, f] = S(!1);
    d(() => {
      const e = o.current;
      e && (i && !e.open ? (e.showModal(), s.open()) : !i && e.open && e.close());
    }, [i]), d(() => {
      const e = o.current;
      if (!e) return;
      const a = () => {
        i && n(!1), s.close();
      };
      return e.addEventListener("close", a), () => e.removeEventListener("close", a);
    }, [i]);
    const r = () => n(!1), h = (e) => {
      s.isStatic || e.target === o.current && r();
    }, m = u[s.size] || u.medium;
    return /* @__PURE__ */ l("host", { shadowDom: !0, style: { "--z-dialog-width": m }, children: [
      /* @__PURE__ */ t("div", { class: "trigger", onclick: () => !s.isDisabled && n(!0), children: /* @__PURE__ */ t("slot", { name: "trigger" }) }),
      /* @__PURE__ */ l("dialog", { class: "dialog", ref: o, onclick: h, children: [
        /* @__PURE__ */ l("div", { class: "body", children: [
          (s.heading || s.hasClose) && /* @__PURE__ */ l("div", { class: "header", children: [
            s.heading ? /* @__PURE__ */ t("h2", { class: "title", children: s.heading }) : /* @__PURE__ */ t("span", {}),
            s.hasClose && /* @__PURE__ */ t("button", { type: "button", class: "close", "aria-label": "Close", onclick: r, children: /* @__PURE__ */ l("svg", { viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ t("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
              /* @__PURE__ */ t("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
            ] }) })
          ] }),
          s.description && /* @__PURE__ */ t("p", { class: "description", children: s.description }),
          /* @__PURE__ */ t("slot", {})
        ] }),
        /* @__PURE__ */ t("div", { class: "footer", style: g ? "" : "display: none", children: /* @__PURE__ */ t(
          "slot",
          {
            name: "footer",
            onslotchange: (e) => f(e.target.assignedNodes().length > 0)
          }
        ) })
      ] })
    ] });
  },
  {
    props: {
      isOpen: { type: Boolean, reflect: !0 },
      heading: String,
      description: String,
      size: { type: String, reflect: !0 },
      hasClose: { type: Boolean, reflect: !0, value: () => !0 },
      isStatic: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      open: c({ bubbles: !0, composed: !0 }),
      close: c({ bubbles: !0, composed: !0 })
    },
    styles: [C, D]
  }
);
p("z-dialog", w);
export {
  w as ZDialog
};
