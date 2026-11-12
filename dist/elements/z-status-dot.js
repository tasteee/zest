// @ts-self-types="./z-status-dot.d.ts"
import { c as s, a, g as o, j as e, d as r } from "../chunks/define-element-BZUk-KLk.js";
import { o as l } from "../chunks/prop-types-B3Bpi956.js";
const i = s`
	:host {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		vertical-align: middle;
		--dot: 0.5rem;
		--color: var(--text-secondary);
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
		--color: var(--status-success);
	}
	:host([status='away']) {
		--color: var(--status-warning);
	}
	:host([status='dnd']),
	:host([status='busy']) {
		--color: var(--status-danger);
	}
	:host([status='offline']) {
		--color: var(--text-secondary);
	}

	.dot {
		width: var(--dot);
		height: var(--dot);
		border-radius: var(--radius-full);
		background: var(--color);
		position: relative;
		flex-shrink: 0;
	}

	:host([does-pulse]) .dot::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: var(--radius-full);
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
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		line-height: var(--line-height-none);
	}
`, n = a(
  (t) => /* @__PURE__ */ o("host", { shadowDom: !0, role: "status", "aria-label": t.status || "status", children: [
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
r("z-status-dot", n);
export {
  n as ZStatusDot
};
