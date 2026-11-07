import { c as r, a, e as i, g as s, j as o, d as n } from "../chunks/define-element-BZUk-KLk.js";
const l = r`
	:host {
		display: inline-flex;
		position: relative;
		--dock-scale: 1;
		--dock-size: var(--dock-item-size, 3rem);
		transform: scale(var(--dock-scale));
		transform-origin: bottom center;
		transition: transform var(--motion-fast) var(--ease-enter);
	}

	:host([is-hidden]) {
		display: none;
	}

	.item {
		box-sizing: border-box;
		width: var(--dock-size);
		height: var(--dock-size);
		border-radius: var(--radius-lg);
		background: var(--card);
		border: 1px solid var(--border);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--foreground);
		cursor: pointer;
		text-decoration: none;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.item:hover,
	.item:focus-visible {
		border-color: color-mix(in oklch, var(--foreground) 45%, transparent);
	}

	.item:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}

	::slotted(*) {
		width: calc(var(--dock-size) * 0.5);
		height: calc(var(--dock-size) * 0.5);
	}

	.tooltip {
		position: absolute;
		bottom: calc(100% + 0.6rem);
		left: 50%;
		transform: translateX(-50%) translateY(4px);
		box-sizing: border-box;
		background: var(--popover);
		border: 1px solid var(--border);
		color: var(--foreground);
		font-size: var(--font-size-caption);
		font-family: var(--font-sans);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			transform var(--motion-fast) var(--ease-enter);
	}

	:host(:hover) .tooltip,
	:host(:focus-within) .tooltip {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}

	.active-dot {
		position: absolute;
		bottom: -0.4rem;
		left: 50%;
		transform: translateX(-50%);
		width: 0.25rem;
		height: 0.25rem;
		border-radius: 999px;
		background: var(--foreground);
	}

	@media (prefers-reduced-motion: reduce) {
		:host,
		.tooltip {
			transition: none;
		}
	}
`, c = a(
  (e) => {
    const t = () => e.select();
    return /* @__PURE__ */ s("host", { shadowDom: !0, children: [
      e.href ? /* @__PURE__ */ o("a", { class: "item", href: e.href, "aria-label": e.label, onclick: t, children: /* @__PURE__ */ o("slot", {}) }) : /* @__PURE__ */ o("button", { type: "button", class: "item", "aria-label": e.label, onclick: t, children: /* @__PURE__ */ o("slot", {}) }),
      e.label && /* @__PURE__ */ o("span", { class: "tooltip", role: "tooltip", children: e.label }),
      e.isActive && /* @__PURE__ */ o("span", { class: "active-dot", "aria-hidden": "true" })
    ] });
  },
  {
    props: {
      label: String,
      href: String,
      isActive: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: i({ bubbles: !0, composed: !0 })
    },
    styles: l
  }
);
n("z-dock-item", c);
export {
  c as ZDockItem
};
