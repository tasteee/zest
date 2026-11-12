// @ts-self-types="./z-alert-dialog.d.ts"
import { c as f, a as g, e as c, f as m, b as u, g as r, j as t, d as b } from "../chunks/define-element-BZUk-KLk.js";
import { i as h } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as p } from "../chunks/use-prop-C0_HeSQ9.js";
import { d as y } from "../chunks/overlay-styles-BeWhjeXT.js";
import { o as v, c as S } from "../chunks/modal-Be8jZ8Jc.js";
import { o as k } from "../chunks/prop-types-B3Bpi956.js";
import { u as L } from "../chunks/locale-Bb4aqXuR.js";
const O = f`
	.trigger {
		display: inline-flex;
	}

	.footer {
		padding-top: var(--space-3);
	}
`, x = g(
  (e) => {
    const o = L(), a = m(), [n, s] = p("isOpen");
    u(() => {
      const i = a.current;
      i && (n ? v(i) : S(i));
    }, [n]);
    const l = (i) => {
      s(!1), i ? e.confirm() : e.cancel();
    }, d = e.tone || "primary";
    return /* @__PURE__ */ r("host", { shadowDom: !0, style: { "--z-dialog-width": "26rem" }, children: [
      /* @__PURE__ */ t("div", { class: "trigger", onclick: () => s(!0), children: /* @__PURE__ */ t("slot", { name: "trigger" }) }),
      /* @__PURE__ */ r(
        "dialog",
        {
          class: "dialog",
          ref: a,
          role: "alertdialog",
          "aria-labelledby": e.heading ? "alert-dialog-title" : void 0,
          "aria-describedby": e.description ? "alert-dialog-description" : void 0,
          oncancel: (i) => {
            i.preventDefault(), l(!1);
          },
          children: [
            /* @__PURE__ */ r("div", { class: "body", children: [
              e.heading && /* @__PURE__ */ t("h2", { id: "alert-dialog-title", class: "title", children: e.heading }),
              e.description && /* @__PURE__ */ t("p", { id: "alert-dialog-description", class: "description", children: e.description }),
              /* @__PURE__ */ t("slot", {})
            ] }),
            /* @__PURE__ */ r("div", { class: "footer", children: [
              /* @__PURE__ */ t("z-button", { kind: "outline", tone: "primary", onclick: () => l(!1), children: e.cancelLabel || o("cancel") }),
              /* @__PURE__ */ t("z-button", { kind: "solid", tone: d, onclick: () => l(!0), children: e.confirmLabel || o("confirm") })
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
      tone: { type: k("primary", "secondary", "tertiary", "danger"), reflect: !0 },
      confirm: c({ bubbles: !0, composed: !0 }),
      cancel: c({ bubbles: !0, composed: !0 })
    },
    styles: [y, O, h]
  }
);
b("z-alert-dialog", x);
export {
  x as ZAlertDialog
};
