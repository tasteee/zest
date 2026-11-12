// @ts-self-types="./z-eyebrow.d.ts"
import { c as r, a, g as o, j as t, d as i } from "../chunks/define-element-BZUk-KLk.js";
import { o as l } from "../chunks/prop-types-B3Bpi956.js";
const s = r`
	:host {
		display: inline-flex;
		align-items: center;
		gap: var(--space-4);
		--eyebrow-tone: var(--text-secondary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='secondary']) {
		--eyebrow-tone: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--eyebrow-tone: var(--accent-tertiary);
	}

	/* Full-width lets the trailing rule stretch to the edge instead of a fixed 5rem. */
	:host([is-full-width]) {
		display: flex;
		width: 100%;
		min-width: 0;
	}

	.label {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-none);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		white-space: nowrap;
		color: var(--eyebrow-tone);
	}

	.rule {
		min-width: 0;
		flex-shrink: 0;
		width: var(--eyebrow-rule-width, 5rem);
		height: 1px;
		background: var(--border-default);
	}

	:host([is-full-width]) .rule {
		flex: 1 1 auto;
		width: auto;
	}
`, n = a(
  (e) => /* @__PURE__ */ o("host", { shadowDom: !0, children: [
    /* @__PURE__ */ t("span", { class: "label", children: e.label ? e.label : /* @__PURE__ */ t("slot", {}) }),
    e.hasRule && /* @__PURE__ */ t("span", { class: "rule", "aria-hidden": "true" })
  ] }),
  {
    props: {
      tone: { type: l("primary", "secondary", "tertiary"), reflect: !0 },
      label: String,
      hasRule: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: s
  }
);
i("z-eyebrow", n);
export {
  n as ZEyebrow
};
