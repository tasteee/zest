// @ts-self-types="./z-spinner.d.ts"
import { c as t, a as i, j as r, d as n } from "../chunks/define-element-BZUk-KLk.js";
import { i as a } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as l } from "../chunks/locale-Bb4aqXuR.js";
import { o as h } from "../chunks/prop-types-B3Bpi956.js";
const p = t`
	:host { display: inline-flex; color: inherit; }
	:host([is-hidden]) { display: none; }
	.spinner {
		box-sizing: border-box;
		width: var(--control-height-sm);
		height: var(--control-height-sm);
		border: 2px solid color-mix(in oklab, currentColor 25%, transparent);
		border-top-color: currentColor;
		border-radius: var(--radius-full);
		animation: spin var(--motion-spin-duration, 1s) linear infinite;
	}
	:host([size='sm']) .spinner { width: var(--space-4); height: var(--space-4); }
	:host([size='lg']) .spinner { width: var(--control-height-lg); height: var(--control-height-lg); }
	@keyframes spin { to { transform: rotate(360deg); } }
`, c = i(
  (e) => {
    const o = l(), s = e.label || o("loading");
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("span", { class: "spinner", role: "status", "aria-label": s }) });
  },
  {
    props: {
      size: { type: h("sm", "md", "lg"), reflect: !0 },
      label: String,
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [p, a]
  }
);
n("z-spinner", c);
export {
  c as ZSpinner
};
