// @ts-self-types="./z-line.d.ts"
import { c as i, a as s, j as r, d as o } from "../chunks/define-element-BZUk-KLk.js";
const a = i`
	:host {
		display: block;
		flex-shrink: 0;
		background: var(--border-default);
		height: 1px;
		width: 100%;
	}

	:host([is-vertical]) {
		align-self: stretch;
		height: auto;
		min-height: var(--font-size-sm);
		width: 1px;
	}
`, n = s(
  (t) => {
    const e = t.isVertical ? "vertical" : "horizontal";
    return /* @__PURE__ */ r("host", { shadowDom: !0, role: "separator", "aria-orientation": e });
  },
  {
    props: {
      isVertical: { type: Boolean, reflect: !0 }
    },
    styles: a
  }
);
o("z-line", n);
export {
  n as ZLine
};
