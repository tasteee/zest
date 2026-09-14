import { c as a, a as l, e as c, g as n, j as t, d } from "../chunks/define-element-BWC3wEPr.js";
import { u as g } from "../chunks/use-prop-DBBKVpkc.js";
const p = a`
	:host {
		display: block;
		--accent: var(--primary);
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 0;
		padding: 0.875rem 0;
		font-family: inherit;
		font-size: var(--font-size-body);
		font-weight: 500;
		color: var(--foreground);
		text-align: left;
		cursor: pointer;
		transition: color 0.12s ease;
	}

	.trigger:hover {
		color: var(--accent);
	}

	.trigger:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
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
		color: var(--muted-foreground);
		transition:
			transform 0.18s ease,
			color 0.12s ease;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.trigger:hover .chevron,
	:host([is-open]) .chevron {
		color: var(--accent);
	}

	:host([is-open]) .chevron {
		transform: rotate(180deg);
	}

	.content {
		display: none;
		padding: 0 0 1rem;
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
		line-height: var(--line-height-body);
	}

	:host([is-open]) .content {
		display: block;
	}
`, u = l(
  (e) => {
    const [r, s] = g("isOpen"), i = () => {
      if (e.isDisabled) return;
      const o = !r;
      s(o), e.toggle({ value: e.value || "", open: o });
    };
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: [
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          class: "trigger",
          disabled: e.isDisabled,
          "aria-expanded": r ? "true" : "false",
          onclick: i,
          children: [
            /* @__PURE__ */ t("slot", { name: "trigger", children: e.label }),
            /* @__PURE__ */ t("svg", { class: "chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("polyline", { points: "6 9 12 15 18 9" }) })
          ]
        }
      ),
      /* @__PURE__ */ t("div", { class: "content", role: "region", children: /* @__PURE__ */ t("slot", {}) })
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      accent: { type: String, reflect: !0 },
      isOpen: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      toggle: c({ bubbles: !0, composed: !0 })
    },
    styles: p
  }
);
d("z-collapsible", u);
export {
  u as ZCollapsible
};
