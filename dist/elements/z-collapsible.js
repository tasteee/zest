import { c as a, a as l, e as c, g as n, j as r, d } from "../chunks/define-element-BZUk-KLk.js";
import { i as g } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as p } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as u } from "../chunks/prop-types-B3Bpi956.js";
const f = a`
	:host {
		display: block;
		--accent: var(--primary);
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
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
		text-align: start;
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter);
	}

	.trigger:hover {
		color: var(--accent);
	}

	.trigger:focus-visible {
		outline: 3px solid var(--focus-ring);
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
`, v = l(
  (e) => {
    const [t, i] = p("isOpen"), s = () => {
      if (e.isDisabled) return;
      const o = !t;
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
          "aria-expanded": t ? "true" : "false",
          onclick: s,
          children: [
            /* @__PURE__ */ r("slot", { name: "trigger", children: e.label }),
            /* @__PURE__ */ r("svg", { class: "chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "6 9 12 15 18 9" }) })
          ]
        }
      ),
      /* @__PURE__ */ r("div", { class: "content", role: "region", "aria-labelledby": "trigger", children: /* @__PURE__ */ r("slot", {}) })
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      tone: { type: u("primary", "secondary", "tertiary"), reflect: !0 },
      isOpen: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      toggle: c({ bubbles: !0, composed: !0 })
    },
    styles: [f, g]
  }
);
d("z-collapsible", v);
export {
  v as ZCollapsible
};
