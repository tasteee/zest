// @ts-self-types="./z-collapsible.d.ts"
import { c as a, a as l, e as c, g as n, j as t, d } from "../chunks/define-element-BZUk-KLk.js";
import { i as g } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as p } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as v } from "../chunks/prop-types-B3Bpi956.js";
const h = a`
	:host {
		display: block;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	.trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 0;
		padding: var(--space-3-5) 0;
		font-family: inherit;
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		text-align: start;
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter);
	}

	.trigger:hover {
		color: var(--tone);
	}

	.trigger:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
		border-radius: var(--radius-sm);
	}

	.trigger:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--text-secondary);
		transition:
			transform var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.trigger:hover .chevron,
	:host([is-open]) .chevron {
		color: var(--tone);
	}

	:host([is-open]) .chevron {
		transform: rotate(180deg);
	}

	.content {
		display: none;
		padding: 0 0 var(--space-4);
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}

	:host([is-open]) .content {
		display: block;
	}
`, f = l(
  (e) => {
    const [r, i] = p("isOpen"), s = () => {
      if (e.isDisabled) return;
      const o = !r;
      i(o), e.toggle({ value: e.value || "", open: o });
    };
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: [
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          id: "trigger",
          class: "trigger",
          disabled: e.isDisabled,
          "aria-expanded": r ? "true" : "false",
          onclick: s,
          children: [
            /* @__PURE__ */ t("slot", { name: "trigger", children: e.label }),
            /* @__PURE__ */ t("svg", { class: "chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("polyline", { points: "6 9 12 15 18 9" }) })
          ]
        }
      ),
      /* @__PURE__ */ t("div", { class: "content", role: "region", "aria-labelledby": "trigger", children: /* @__PURE__ */ t("slot", {}) })
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      tone: { type: v("primary", "secondary", "tertiary"), reflect: !0 },
      isOpen: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      toggle: c({ bubbles: !0, composed: !0 })
    },
    styles: [h, g]
  }
);
d("z-collapsible", f);
export {
  f as ZCollapsible
};
