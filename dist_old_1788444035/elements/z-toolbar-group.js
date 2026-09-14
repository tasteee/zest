import { c as r, a as s, j as e, d as t } from "../chunks/define-element-BWC3wEPr.js";
const l = r`
	:host {
		display: inline-flex;
		align-items: center;
		gap: 0.125rem;
	}
	:host([is-hidden]) {
		display: none;
	}
`, a = s(
  (o) => /* @__PURE__ */ e("host", { shadowDom: !0, role: "group", "aria-label": o.label, children: /* @__PURE__ */ e("slot", {}) }),
  {
    props: {
      label: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: l
  }
);
t("z-toolbar-group", a);
export {
  a as ZToolbarGroup
};
