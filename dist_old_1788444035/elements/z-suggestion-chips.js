import { c as d, a as c, e as u, g as n, j as o, d as g } from "../chunks/define-element-BWC3wEPr.js";
const p = d`
	:host {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	:host([is-hidden]) {
		display: none;
	}
	button {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		border: 1px solid var(--border);
		background: color-mix(in oklch, var(--foreground) 4%, transparent);
		border-radius: 999px;
		padding: 0.35rem 0.75rem;
		font-family: inherit;
		font-size: 0.8125rem;
		color: var(--foreground);
		cursor: pointer;
		text-align: left;
		transition:
			background-color 0.12s ease,
			border-color 0.12s ease;
	}
	button:hover {
		background: color-mix(in oklch, var(--primary) 12%, transparent);
		border-color: color-mix(in oklch, var(--primary) 40%, transparent);
	}
	.arrow {
		width: 0.8rem;
		height: 0.8rem;
		stroke: var(--muted-foreground);
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
`, h = c(
  (r) => {
    const s = Array.isArray(r.suggestions) ? r.suggestions : [], a = (e) => typeof e == "string" ? { label: e, value: e } : { label: e.label, value: e.value ?? e.label };
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: [
      s.map((e, i) => {
        const { label: t, value: l } = a(e);
        return /* @__PURE__ */ n("button", { type: "button", onclick: () => r.select({ value: l, label: t }), children: [
          t,
          r.doesShowArrow && /* @__PURE__ */ o("svg", { class: "arrow", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ o("path", { d: "M5 12h14M13 6l6 6-6 6" }) })
        ] }, i);
      }),
      /* @__PURE__ */ o("slot", {})
    ] });
  },
  {
    props: {
      suggestions: { type: Array },
      doesShowArrow: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: u({ bubbles: !0, composed: !0 })
    },
    styles: p
  }
);
g("z-suggestion-chips", h);
export {
  h as ZSuggestionChips
};
