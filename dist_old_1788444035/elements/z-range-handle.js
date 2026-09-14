import { c as e, a as t, j as r, d as s } from "../chunks/define-element-BWC3wEPr.js";
const a = e`
	:host {
		display: none;
	}
`, n = t(
  () => /* @__PURE__ */ r("host", {}),
  {
    props: {
      value: { type: Number, reflect: !0 },
      min: { type: Number, reflect: !0 },
      max: { type: Number, reflect: !0 },
      step: { type: Number, reflect: !0 },
      accent: { type: String, reflect: !0 },
      label: String
    },
    styles: a
  }
);
s("z-range-handle", n);
export {
  n as ZRangeHandle
};
