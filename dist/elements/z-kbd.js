// @ts-self-types="./z-kbd.d.ts"
import { c as n, a as t, j as i, d as r } from "../chunks/define-element-BZUk-KLk.js";
import { o as a } from "../chunks/prop-types-B3Bpi956.js";
const d = n`
	:host {
		display: inline-flex;
		vertical-align: middle;
	}

	:host([is-hidden]) {
		display: none;
	}

	.kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		font-family: var(--font-mono);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-none);
		white-space: nowrap;
		color: var(--text-primary);
		background: color-mix(in oklch, var(--surface-subtle) 70%, transparent);
		border: 1px solid var(--border-default);
		/* the keycap edge: a thicker bottom border, no shadow */
		border-bottom-width: 2px;
		border-radius: var(--radius-sm);
	}

	/* sizes, height, padding and font-size scale together */
	.kbd.is-xs {
		min-width: 1.25rem;
		height: 1.25rem;
		padding-inline: var(--space-1-5);
		font-size: var(--font-size-2xs);
	}
	.kbd.is-sm {
		min-width: 1.5rem;
		height: 1.5rem;
		padding-inline: var(--space-1-5);
		font-size: var(--font-size-xs);
	}
	.kbd.is-md {
		min-width: 1.875rem;
		height: 1.875rem;
		padding-inline: var(--space-2);
		font-size: var(--font-size-sm);
	}
	.kbd.is-lg {
		min-width: 2.25rem;
		height: 2.25rem;
		padding-inline: var(--space-2-5);
		font-size: var(--font-size-md);
	}
	.kbd.is-xl {
		min-width: 2.75rem;
		height: 2.75rem;
		padding-inline: var(--space-3);
		font-size: var(--font-size-md);
	}
`, o = (e) => e.size === "xs" ? "is-xs" : e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : e.size === "xl" ? "is-xl" : "is-md", l = t(
  (e) => {
    const s = ["kbd", o(e)].join(" ");
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: /* @__PURE__ */ i("kbd", { class: s, children: e.label ? e.label : /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: {
      size: { type: a("xs", "sm", "md", "lg", "xl"), reflect: !0 },
      label: String,
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: d
  }
);
r("z-kbd", l);
export {
  l as ZKbd
};
