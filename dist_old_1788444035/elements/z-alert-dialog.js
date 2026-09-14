import { c as d, a as f, e as o, f as g, b as u, g as c, j as t, d as m } from "../chunks/define-element-BWC3wEPr.js";
import { u as h } from "../chunks/use-prop-DBBKVpkc.js";
import { d as b } from "../chunks/overlay-styles-DmJDaq8Z.js";
const p = d`
	.trigger {
		display: inline-flex;
	}

	.footer {
		padding-top: var(--space-md);
	}
`, y = f(
  (e) => {
    const s = g(), [i, r] = h("isOpen");
    u(() => {
      const n = s.current;
      n && (i && !n.open ? n.showModal() : !i && n.open && n.close());
    }, [i]);
    const l = (n) => {
      r(!1), n ? e.confirm() : e.cancel();
    }, a = e.accent || "dom";
    return /* @__PURE__ */ c("host", { shadowDom: !0, style: { "--z-dialog-width": "26rem" }, children: [
      /* @__PURE__ */ t("div", { class: "trigger", onclick: () => r(!0), children: /* @__PURE__ */ t("slot", { name: "trigger" }) }),
      /* @__PURE__ */ c(
        "dialog",
        {
          class: "dialog",
          ref: s,
          role: "alertdialog",
          oncancel: (n) => {
            n.preventDefault(), l(!1);
          },
          children: [
            /* @__PURE__ */ c("div", { class: "body", children: [
              e.heading && /* @__PURE__ */ t("h2", { class: "title", children: e.heading }),
              e.description && /* @__PURE__ */ t("p", { class: "description", children: e.description }),
              /* @__PURE__ */ t("slot", {})
            ] }),
            /* @__PURE__ */ c("div", { class: "footer", children: [
              /* @__PURE__ */ t("z-button", { kind: "outline", accent: "neutral", onclick: () => l(!1), children: e.cancelLabel || "Cancel" }),
              /* @__PURE__ */ t("z-button", { kind: "solid", accent: a, onclick: () => l(!0), children: e.confirmLabel || "Confirm" })
            ] })
          ]
        }
      )
    ] });
  },
  {
    props: {
      isOpen: { type: Boolean, reflect: !0 },
      heading: String,
      description: String,
      confirmLabel: String,
      cancelLabel: String,
      accent: { type: String, reflect: !0 },
      confirm: o({ bubbles: !0, composed: !0 }),
      cancel: o({ bubbles: !0, composed: !0 })
    },
    styles: [b, p]
  }
);
m("z-alert-dialog", y);
export {
  y as ZAlertDialog
};
