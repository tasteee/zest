import { c as s, a as o, g as r, j as e, d as a } from "../chunks/define-element-BZUk-KLk.js";
import { o as l } from "../chunks/prop-types-B3Bpi956.js";
const i = s`
	:host {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		vertical-align: middle;
		--dot: 0.5rem;
		--color: var(--muted-foreground);
	}
	:host([is-hidden]) {
		display: none;
	}

	:host([size='md']) {
		--dot: 0.625rem;
	}
	:host([size='lg']) {
		--dot: 0.75rem;
	}

	:host([status='online']) {
		--color: var(--success);
	}
	:host([status='away']) {
		--color: var(--warning);
	}
	:host([status='dnd']),
	:host([status='busy']) {
		--color: var(--destructive);
	}
	:host([status='offline']) {
		--color: var(--muted-foreground);
	}

	.dot {
		width: var(--dot);
		height: var(--dot);
		border-radius: 999px;
		background: var(--color);
		position: relative;
		flex-shrink: 0;
	}

	:host([does-pulse]) .dot::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 999px;
		background: var(--color);
		animation: ping 1.6s var(--ease-enter) infinite;
	}

	@keyframes ping {
		0% {
			opacity: 0.6;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(2.4);
		}
	}

	.label {
		font-size: 0.8125rem;
		color: var(--muted-foreground);
		line-height: 1;
	}
`, n = o(
  (t) => /* @__PURE__ */ r("host", { shadowDom: !0, role: "status", "aria-label": t.status || "status", children: [
    /* @__PURE__ */ e("span", { class: "dot", part: "dot", "aria-hidden": "true" }),
    t.label && /* @__PURE__ */ e("span", { class: "label", children: t.label })
  ] }),
  {
    props: {
      status: { type: String, reflect: !0 },
      size: { type: l("md", "lg"), reflect: !0 },
      doesPulse: { type: Boolean, reflect: !0 },
      label: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: i
  }
);
a("z-status-dot", n);
export {
  n as ZStatusDot
};
