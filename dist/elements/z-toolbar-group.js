// @ts-self-types="./z-toolbar-group.d.ts"
import { c as s, a as r, j as e, d as t } from "../chunks/define-element-BZUk-KLk.js";
const l = s`
	:host {
		display: inline-flex;
		align-items: center;
		gap: var(--space-0-5);
	}
	:host([is-hidden]) {
		display: none;
	}
`, a = r(
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
