// @ts-self-types="./z-timeline-item.d.ts"
import { c as p, a as v, j as e, g as n, d as u } from "../chunks/define-element-BZUk-KLk.js";
import { i as f } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as r } from "../chunks/hooks-DEFT8qqt.js";
import { o as y } from "../chunks/prop-types-CSJu2W-0.js";
const x = p`
	:host {
		--tone: var(--z-timeline-accent, var(--text-tertiary));
		--rail: 1.5rem;
		display: block;
		min-width: 0;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='primary']) { --tone: var(--accent-primary); }
	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	:host([tone='success']) { --tone: var(--status-success); }
	:host([tone='warning']) { --tone: var(--status-warning); }
	:host([tone='danger']) { --tone: var(--status-danger); }

	.item {
		display: grid;
		grid-template-columns: var(--rail) minmax(0, 1fr);
		column-gap: var(--space-3);
	}

	.rail {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* The marker box is one heading line tall, so the dot centres on it. */
	.marker {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(var(--font-size-sm) * 1.4);
		flex-shrink: 0;
	}

	.dot {
		width: 0.5625rem;
		height: 0.5625rem;
		box-sizing: border-box;
		border-radius: var(--radius-full);
		background: var(--tone);
	}

	:host([is-pending]) .dot {
		border: 1.5px solid var(--tone);
		background: var(--surface-page);
	}

	.badge {
		display: none;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: var(--rail);
		height: var(--rail);
		margin-block: calc((var(--rail) - var(--font-size-sm) * 1.4) / -2);
		border: 1px solid color-mix(in oklch, var(--tone) 40%, var(--border-default));
		border-radius: var(--radius-full);
		background: var(--surface-default);
		color: var(--tone);
	}

	.item.has-icon .badge {
		display: inline-flex;
	}

	.item.has-icon .dot {
		display: none;
	}

	.badge ::slotted(svg) {
		width: 0.75rem;
		height: 0.75rem;
	}

	.line {
		flex: 1 1 auto;
		width: 1px;
		min-height: var(--space-3);
		margin-top: var(--space-1-5);
		display: var(--z-timeline-line, block);
		background: var(--border-default);
	}

	.item.has-icon .line {
		margin-top: calc((var(--rail) - var(--font-size-sm) * 1.4) / 2 + var(--space-1-5));
	}

	:host([is-pending]) .line {
		background: none;
		border-inline-start: 1px dashed var(--border-strong);
		width: 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		min-width: 0;
		padding-bottom: var(--z-timeline-gap, var(--space-6));
	}

	.header {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: var(--space-1) var(--space-2);
		min-width: 0;
	}

	.heading {
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-snug);
		min-width: 0;
	}

	:host([is-pending]) .heading {
		color: var(--text-secondary);
	}

	.time {
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-variant-numeric: tabular-nums;
		line-height: var(--line-height-snug);
		white-space: nowrap;
	}

	.description {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
	}

	.description[hidden],
	.time[hidden],
	.body[hidden] {
		display: none;
	}

	.body {
		margin-top: var(--space-1-5);
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}
`, b = (i) => i.nodeType === Node.TEXT_NODE ? (i.textContent ?? "").trim().length > 0 : !0, s = (i) => i.target.assignedNodes().some(b), w = v(
  (i) => {
    const [a, o] = r(!1), [l, d] = r(!1), [c, h] = r(!1), m = !!i.time || l, g = !!i.description;
    return /* @__PURE__ */ e("host", { shadowDom: !0, role: "listitem", children: /* @__PURE__ */ n("div", { class: a ? "item has-icon" : "item", children: [
      /* @__PURE__ */ n("div", { class: "rail", "aria-hidden": "true", children: [
        /* @__PURE__ */ n("span", { class: "marker", part: "marker", children: [
          /* @__PURE__ */ e("span", { class: "dot" }),
          /* @__PURE__ */ e("span", { class: "badge", children: /* @__PURE__ */ e("slot", { name: "icon", onslotchange: (t) => o(s(t)) }) })
        ] }),
        /* @__PURE__ */ e("span", { class: "line", part: "line" })
      ] }),
      /* @__PURE__ */ n("div", { class: "content", children: [
        /* @__PURE__ */ n("div", { class: "header", children: [
          /* @__PURE__ */ e("span", { class: "heading", part: "heading", children: /* @__PURE__ */ e("slot", { name: "heading", children: i.heading }) }),
          /* @__PURE__ */ e("span", { class: "time", hidden: !m, children: /* @__PURE__ */ e("slot", { name: "time", onslotchange: (t) => d(s(t)), children: i.time }) })
        ] }),
        /* @__PURE__ */ e("div", { class: "description", hidden: !g, children: i.description }),
        /* @__PURE__ */ e("div", { class: "body", hidden: !c, children: /* @__PURE__ */ e("slot", { onslotchange: (t) => h(s(t)) }) })
      ] })
    ] }) });
  },
  {
    props: {
      heading: String,
      description: String,
      time: String,
      tone: { type: y("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isPending: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [x, f]
  }
);
u("z-timeline-item", w);
export {
  w as ZTimelineItem
};
