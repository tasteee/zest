import { c as r, a as l, g as o, j as t, d as a } from "../chunks/define-element-BWC3wEPr.js";
const i = r`
	:host {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		--eyebrow-tone: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([color='dom']) {
		--eyebrow-tone: var(--purple);
	}
	:host([color='neutral']) {
		--eyebrow-tone: var(--muted-foreground);
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
`, s = l(
  (e) => /* @__PURE__ */ o("host", { shadowDom: !0, children: [
    /* @__PURE__ */ t("span", { class: "label", children: e.label ? e.label : /* @__PURE__ */ t("slot", {}) }),
    e.hasRule && /* @__PURE__ */ t("span", { class: "rule", "aria-hidden": "true" })
  ] }),
  {
    props: {
      color: { type: String, reflect: !0 },
      label: String,
      hasRule: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: i
  }
);
a("z-eyebrow", s);
export {
  s as ZEyebrow
};
