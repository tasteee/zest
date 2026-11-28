// @ts-self-types="./z-list.d.ts"
import { c as s, a as o, g as t, j as r, d as a } from "../chunks/define-element-BZUk-KLk.js";
const l = s`
	:host {
		display: block;
		background: var(--surface-default);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	:host([is-plain]) {
		background: transparent;
		border: none;
		border-radius: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	.label {
		display: block;
		padding: var(--space-3-5) var(--space-4) var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	/* Hairline dividers between rows. ::slotted() only accepts a compound
	   selector (no sibling combinators), so draw a top border on every row but
	   the first. The label lives in the shadow DOM, so :first-child here is the
	   first slotted light-DOM row. */
	::slotted(z-list-row:not(:first-child)) {
		border-top: 1px solid var(--border-default);
	}
`, i = o(
  (e) => /* @__PURE__ */ t("host", { shadowDom: !0, children: [
    e.label && /* @__PURE__ */ r("span", { class: "label", children: e.label }),
    /* @__PURE__ */ r("slot", {})
  ] }),
  {
    props: {
      label: String,
      isPlain: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: l
  }
);
a("z-list", i);
export {
  i as ZList
};
