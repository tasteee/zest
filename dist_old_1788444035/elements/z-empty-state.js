import { c as l, a as d, g as h, j as t, d as g } from "../chunks/define-element-BWC3wEPr.js";
import { u as a } from "../chunks/hooks-D9_x-ckD.js";
const m = l`
	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.75rem;
		padding: var(--space-2xl) var(--space-lg);
		--accent: var(--color-neutral-6);
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}
	:host([accent='sub']) {
		--accent: var(--pink);
	}
	:host([accent='neutral']) {
		--accent: var(--color-neutral-6);
	}
	:host([accent='success']) {
		--accent: var(--success);
	}
	:host([accent='warning']) {
		--accent: var(--warning);
	}
	:host([accent='error']) {
		--accent: var(--destructive);
	}

	:host([is-bordered]) {
		border: 1px dashed var(--border);
		border-radius: var(--radius-lg);
	}

	:host([is-hidden]) {
		display: none;
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		margin-bottom: 0.25rem;
		border-radius: var(--radius-lg);
		color: var(--accent);
		background: color-mix(in oklch, var(--accent) 12%, transparent);
	}

	.icon.is-empty {
		display: none;
	}

	::slotted([slot='icon']) {
		width: 1.5rem;
		height: 1.5rem;
	}

	.heading {
		margin: 0;
		font-size: var(--font-size-h4);
		font-weight: 600;
		color: var(--foreground);
		line-height: var(--line-height-h4);
	}

	.description {
		margin: 0;
		max-width: 42ch;
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
		line-height: var(--line-height-body);
	}

	.actions {
		display: flex;
		gap: 0.625rem;
		margin-top: 1rem;
	}

	.actions.is-empty {
		display: none;
	}
`, s = (e) => e.target.assignedNodes().length > 0, p = d(
  (e) => {
    const [r, i] = a(!1), [c, o] = a(!1);
    return /* @__PURE__ */ h("host", { shadowDom: !0, children: [
      /* @__PURE__ */ t("span", { class: r ? "icon" : "icon is-empty", children: /* @__PURE__ */ t("slot", { name: "icon", onslotchange: (n) => i(s(n)) }) }),
      e.heading && /* @__PURE__ */ t("p", { class: "heading", children: e.heading }),
      e.description && /* @__PURE__ */ t("p", { class: "description", children: e.description }),
      /* @__PURE__ */ t("div", { class: c ? "actions" : "actions is-empty", children: /* @__PURE__ */ t("slot", { onslotchange: (n) => o(s(n)) }) })
    ] });
  },
  {
    props: {
      heading: String,
      description: String,
      accent: { type: String, reflect: !0 },
      isBordered: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: m
  }
);
g("z-empty-state", p);
export {
  p as ZEmptyState
};
