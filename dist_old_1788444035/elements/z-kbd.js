import { c as r, a as t, j as i, d as s } from "../chunks/define-element-BWC3wEPr.js";
const d = r`
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
		font-weight: 500;
		line-height: 1;
		white-space: nowrap;
		color: var(--foreground);
		background: color-mix(in oklch, var(--paper-soft) 70%, transparent);
		border: 1px solid var(--border);
		/* the raised edge: a hairline highlight on top, a deeper shadow below */
		border-bottom-width: 2px;
		border-radius: var(--radius-sm);
		box-shadow:
			inset 0 1px 0 color-mix(in oklch, white 8%, transparent),
			0 1px 1px color-mix(in oklch, black 25%, transparent);
	}

	/* sizes — height, padding and font-size scale together */
	.kbd.is-xs {
		min-width: 1.25rem;
		height: 1.25rem;
		padding-inline: 0.3125rem;
		font-size: 0.6875rem;
	}
	.kbd.is-sm {
		min-width: 1.5rem;
		height: 1.5rem;
		padding-inline: 0.375rem;
		font-size: 0.75rem;
	}
	.kbd.is-md {
		min-width: 1.875rem;
		height: 1.875rem;
		padding-inline: 0.5rem;
		font-size: 0.8125rem;
	}
	.kbd.is-lg {
		min-width: 2.25rem;
		height: 2.25rem;
		padding-inline: 0.625rem;
		font-size: 0.9375rem;
	}
	.kbd.is-xl {
		min-width: 2.75rem;
		height: 2.75rem;
		padding-inline: 0.75rem;
		font-size: 1.0625rem;
	}
`, o = (e) => e.size === "xs" ? "is-xs" : e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : e.size === "xl" ? "is-xl" : "is-md", l = t(
  (e) => {
    const n = ["kbd", o(e)].join(" ");
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: /* @__PURE__ */ i("kbd", { class: n, children: e.label ? e.label : /* @__PURE__ */ i("slot", {}) }) });
  },
  {
    props: {
      size: { type: String, reflect: !0 },
      label: String,
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: d
  }
);
s("z-kbd", l);
export {
  l as ZKbd
};
