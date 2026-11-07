import { c as r, a as e, j as i, d as a } from "../chunks/define-element-BZUk-KLk.js";
import { o as s } from "../chunks/prop-types-B3Bpi956.js";
const n = r`
	:host {
		display: block;
		flex-shrink: 0;
		background: var(--border);
		height: 1px;
		width: 100%;
	}

	:host([direction='vertical']) {
		height: 100%;
		width: 1px;
	}
`, c = e(
  (t) => {
    const o = t.direction === "vertical" ? "vertical" : "horizontal";
    return /* @__PURE__ */ i("host", { shadowDom: !0, role: "separator", "aria-orientation": o });
  },
  {
    props: {
      direction: { type: s("horizontal", "vertical"), reflect: !0 }
    },
    styles: n
  }
);
a("z-line", c);
export {
  c as ZLine
};
