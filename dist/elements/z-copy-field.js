// @ts-self-types="./z-copy-field.d.ts"
import { c as b, a as y, e as v, f as m, b as n, j as s, g as h, d as x } from "../chunks/define-element-BZUk-KLk.js";
import { u as g } from "../chunks/hooks-DEFT8qqt.js";
import { i as w } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as B } from "../chunks/locale-Bb4aqXuR.js";
const C = b`
	:host { display: block; }
	:host([is-hidden]) { display: none; }
	.copyField { display: flex; align-items: stretch; border: 1px solid var(--border-default); border-radius: var(--radius-md); overflow: hidden; }
	.value { min-width: 0; flex: 1; border: 0; background: transparent; color: var(--text-primary); font: inherit; padding: var(--space-3); }
	.copyButton { border: 0; border-inline-start: 1px solid var(--border-default); background: var(--surface-default); color: var(--text-primary); font: inherit; padding-inline: var(--space-4); cursor: pointer; }
	.copyButton:hover { background: var(--surface-subtle); }
	.copyButton:focus-visible, .value:focus-visible { outline: 2px solid var(--border-focus); outline-offset: -2px; }
`, k = y(
  (e) => {
    const o = B(), a = m(), [t, r] = g(!1);
    n(() => {
      r(!1);
    }, [e.value]), n(() => {
      if (!t) return;
      const l = setTimeout(() => {
        r(!1);
      }, 1600);
      return () => {
        clearTimeout(l);
      };
    }, [t]);
    const u = o(t ? "copied" : "copy"), d = e.label || o("copyValue"), p = async () => {
      var i, c;
      if (!!!navigator.clipboard) {
        (i = a.current) == null || i.select();
        return;
      }
      try {
        await navigator.clipboard.writeText(e.value || ""), r(!0), e.copy({ value: e.value || "" });
      } catch (f) {
        console.warn("z-copy-field: copy failed", f), (c = a.current) == null || c.select();
      }
    };
    return /* @__PURE__ */ s("host", { shadowDom: !0, children: /* @__PURE__ */ h("div", { class: "copyField", children: [
      /* @__PURE__ */ s("input", { ref: a, class: "value", value: e.value || "", readonly: !0, "aria-label": d }),
      /* @__PURE__ */ s("button", { class: "copyButton", type: "button", onclick: p, "aria-live": "polite", children: u })
    ] }) });
  },
  {
    props: {
      value: String,
      label: String,
      isHidden: { type: Boolean, reflect: !0 },
      copy: v({ bubbles: !0, composed: !0 })
    },
    styles: [C, w]
  }
);
x("z-copy-field", k);
export {
  k as ZCopyField
};
