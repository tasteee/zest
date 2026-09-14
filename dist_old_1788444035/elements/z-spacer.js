import { c as o, a, j as r, d as c } from "../chunks/define-element-BWC3wEPr.js";
import { d as i, c as l } from "../chunks/layout-schema-SeDcUpZQ.js";
const n = o`
	:host {
		display: block;
		flex: none;
		width: var(--z-spacer-size, 0);
		height: var(--z-spacer-size, 0);
	}

	:host([can-grow]) {
		flex: 1 1 0;
		align-self: stretch;
		width: auto;
		height: auto;
	}
`, p = (e) => {
  const s = {}, t = l(e.size);
  return t && (s["--z-spacer-size"] = t), s;
}, h = a((e) => /* @__PURE__ */ r("host", { shadowDom: !0, style: p(e) }), {
  props: {
    size: String,
    canGrow: { type: Boolean, reflect: !0 }
  },
  styles: [i, n]
});
c("z-spacer", h);
export {
  h as ZSpacer
};
