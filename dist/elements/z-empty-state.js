// @ts-self-types="./z-empty-state.d.ts"
import { c as d, a as l, g as h, j as t, d as g } from "../chunks/define-element-BZUk-KLk.js";
import { u as n } from "../chunks/hooks-DEFT8qqt.js";
import { o as p } from "../chunks/prop-types-B3Bpi956.js";
const m = d`
	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-3);
		padding: var(--space-12) var(--space-6);
		--tone: var(--text-secondary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}
	:host([tone='primary']) {
		--tone: var(--text-secondary);
	}
	:host([tone='success']) {
		--tone: var(--status-success);
	}
	:host([tone='warning']) {
		--tone: var(--status-warning);
	}
	:host([tone='danger']) {
		--tone: var(--status-danger);
	}

	:host([is-bordered]) {
		border: 1px dashed var(--border-default);
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
		margin-bottom: var(--space-1);
		border-radius: var(--radius-lg);
		color: var(--tone);
		background: color-mix(in oklch, var(--tone) 12%, transparent);
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
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
		line-height: var(--line-height-snug);
	}

	.description {
		margin: 0;
		max-width: 42ch;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}

	.actions {
		display: flex;
		gap: var(--space-2-5);
		margin-top: var(--space-4);
	}

	.actions.is-empty {
		display: none;
	}
`, a = (e) => e.target.assignedNodes().length > 0, y = l(
  (e) => {
    const [r, o] = n(!1), [i, c] = n(!1);
    return /* @__PURE__ */ h("host", { shadowDom: !0, children: [
      /* @__PURE__ */ t("span", { class: r ? "icon" : "icon is-empty", children: /* @__PURE__ */ t("slot", { name: "icon", onslotchange: (s) => o(a(s)) }) }),
      e.heading && /* @__PURE__ */ t("p", { class: "heading", children: e.heading }),
      e.description && /* @__PURE__ */ t("p", { class: "description", children: e.description }),
      /* @__PURE__ */ t("div", { class: i ? "actions" : "actions is-empty", children: /* @__PURE__ */ t("slot", { onslotchange: (s) => c(a(s)) }) })
    ] });
  },
  {
    props: {
      heading: String,
      description: String,
      tone: { type: p("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isBordered: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: m
  }
);
g("z-empty-state", y);
export {
  y as ZEmptyState
};
