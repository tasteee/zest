import { c as d, a as l, g as h, j as t, d as g } from "../chunks/define-element-BZUk-KLk.js";
import { u as r } from "../chunks/hooks-DEFT8qqt.js";
import { o as m } from "../chunks/prop-types-B3Bpi956.js";
const p = d`
	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.75rem;
		padding: var(--space-2xl) var(--space-lg);
		--accent: var(--color-neutral-6);
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}
	:host([tone='tertiary']) {
		--accent: var(--pink);
	}
	:host([tone='primary']) {
		--accent: var(--color-neutral-6);
	}
	:host([tone='success']) {
		--accent: var(--success);
	}
	:host([tone='warning']) {
		--accent: var(--warning);
	}
	:host([tone='danger']) {
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
`, s = (e) => e.target.assignedNodes().length > 0, u = l(
  (e) => {
    const [a, o] = r(!1), [i, c] = r(!1);
    return /* @__PURE__ */ h("host", { shadowDom: !0, children: [
      /* @__PURE__ */ t("span", { class: a ? "icon" : "icon is-empty", children: /* @__PURE__ */ t("slot", { name: "icon", onslotchange: (n) => o(s(n)) }) }),
      e.heading && /* @__PURE__ */ t("p", { class: "heading", children: e.heading }),
      e.description && /* @__PURE__ */ t("p", { class: "description", children: e.description }),
      /* @__PURE__ */ t("div", { class: i ? "actions" : "actions is-empty", children: /* @__PURE__ */ t("slot", { onslotchange: (n) => c(s(n)) }) })
    ] });
  },
  {
    props: {
      heading: String,
      description: String,
      tone: { type: m("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isBordered: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: p
  }
);
g("z-empty-state", u);
export {
  u as ZEmptyState
};
