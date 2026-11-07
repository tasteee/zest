import { c as r, a as o, g as l, j as t, d as a } from "../chunks/define-element-BZUk-KLk.js";
import { o as i } from "../chunks/prop-types-B3Bpi956.js";
const s = r`
	:host {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		--eyebrow-tone: var(--muted-foreground);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='secondary']) {
		--eyebrow-tone: var(--purple);
	}
	:host([tone='tertiary']) {
		--eyebrow-tone: var(--pink);
	}

	/* Full-width lets the trailing rule stretch to the edge instead of a fixed 5rem. */
	:host([is-full-width]) {
		display: flex;
		width: 100%;
		min-width: 0;
	}

	.label {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 1;
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
		background: var(--border);
	}

	:host([is-full-width]) .rule {
		flex: 1 1 auto;
		width: auto;
	}
`, n = o(
  (e) => /* @__PURE__ */ l("host", { shadowDom: !0, children: [
    /* @__PURE__ */ t("span", { class: "label", children: e.label ? e.label : /* @__PURE__ */ t("slot", {}) }),
    e.hasRule && /* @__PURE__ */ t("span", { class: "rule", "aria-hidden": "true" })
  ] }),
  {
    props: {
      tone: { type: i("primary", "secondary", "tertiary"), reflect: !0 },
      label: String,
      hasRule: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: s
  }
);
a("z-eyebrow", n);
export {
  n as ZEyebrow
};
