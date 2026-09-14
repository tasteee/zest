import { c as a, a as l, e as i, j as r, d as s } from "../chunks/define-element-BWC3wEPr.js";
import { u as c } from "../chunks/use-prop-DBBKVpkc.js";
import { t as d, r as u } from "../chunks/toggle-schema--dF53P2m.js";
const z = a`
	:host {
		display: inline-flex;
		user-select: none;
		-webkit-user-select: none;
	}

	:host([is-hidden]) {
		display: none;
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		font-family: inherit;
		font-weight: 500;
		white-space: nowrap;
		border-radius: var(--z-toggle-radius, var(--radius-md));
		cursor: pointer;
		line-height: 1;
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--z-toggle-border, transparent);
		color: var(--z-toggle-color, var(--foreground));
		height: var(--z-toggle-height, 2.5rem);
		padding-inline: var(--z-toggle-padding-inline, 1rem);
		min-width: var(--z-toggle-min-width, 2.5rem);
		font-size: var(--z-toggle-font-size, 0.875rem);
		transition:
			opacity 0.1s ease,
			border-color 0.1s ease,
			background-color 0.1s ease,
			color 0.1s ease;
	}

	button:hover {
		background: var(--z-toggle-hover-bg, color-mix(in oklch, var(--z-toggle-accent, var(--foreground)) 8%, transparent));
		border-color: var(--z-toggle-hover-border, var(--z-toggle-border, transparent));
	}

	button[data-state='on'] {
		background: var(--z-toggle-on-bg, var(--z-toggle-accent, var(--primary)));
		color: var(--z-toggle-on-color, var(--z-toggle-accent-foreground, var(--primary-foreground)));
		border-color: var(--z-toggle-on-border, transparent);
	}

	button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	button:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	button.is-sm {
		--z-toggle-height: 2rem;
		--z-toggle-padding-inline: 0.75rem;
		--z-toggle-min-width: 2rem;
		--z-toggle-font-size: 0.8125rem;
		--z-toggle-icon-size: 0.875rem;
	}

	button.is-lg {
		--z-toggle-height: 3rem;
		--z-toggle-padding-inline: 1.25rem;
		--z-toggle-min-width: 3rem;
		--z-toggle-font-size: 1rem;
		--z-toggle-icon-size: 1.125rem;
	}

	button.is-icon {
		padding-inline: 0;
		width: var(--z-toggle-height, 2.5rem);
	}

	button.is-dom {
		--z-toggle-color: var(--neon-purple);
		--z-toggle-accent: var(--neon-purple);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	button.is-sub {
		--z-toggle-color: var(--neon-pink);
		--z-toggle-accent: var(--neon-pink);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	button.is-neutral {
		--z-toggle-color: var(--foreground);
		--z-toggle-accent: var(--primary);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	button.is-success {
		--z-toggle-color: var(--success);
		--z-toggle-accent: var(--success);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	button.is-warning {
		--z-toggle-color: var(--warning);
		--z-toggle-accent: var(--warning);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	button.is-error {
		--z-toggle-color: var(--destructive);
		--z-toggle-accent: var(--destructive);
		--z-toggle-accent-foreground: var(--primary-foreground);
	}

	button.is-ghost {
		--z-toggle-border: transparent;
		--z-toggle-hover-bg: color-mix(in oklch, var(--z-toggle-accent, var(--foreground)) 10%, transparent);
		--z-toggle-on-bg: var(--z-toggle-accent, var(--primary));
		--z-toggle-on-color: var(--z-toggle-accent-foreground, var(--primary-foreground));
		--z-toggle-on-border: transparent;
	}

	/* off: tone-colored text (--z-toggle-color) + a dimmed tone border so the two
	   agree. on: solid tone fill with dark on-foreground text and a solid border. */
	button.is-outline {
		--z-toggle-border: color-mix(in oklch, var(--z-toggle-accent, var(--foreground)) 50%, transparent);
		--z-toggle-hover-bg: color-mix(in oklch, var(--z-toggle-accent, var(--foreground)) 10%, transparent);
		--z-toggle-on-bg: var(--z-toggle-accent, var(--primary));
		--z-toggle-on-color: var(--z-toggle-accent-foreground, var(--primary-foreground));
		--z-toggle-on-border: var(--z-toggle-accent, var(--primary));
	}

	::slotted(svg) {
		width: var(--z-toggle-icon-size, 1rem);
		height: var(--z-toggle-icon-size, 1rem);
		flex-shrink: 0;
		pointer-events: none;
	}
`, v = l(
  (e) => {
    const [o, n] = c("isPressed"), g = u(e);
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        class: g,
        "data-state": o ? "on" : "off",
        "aria-pressed": o ? "true" : "false",
        disabled: e.isDisabled,
        onclick: () => {
          const t = !o;
          n(t), e.press({ pressed: t, value: e.value });
        },
        children: /* @__PURE__ */ r("slot", {})
      }
    ) });
  },
  {
    props: {
      ...d,
      isPressed: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      value: String,
      press: i({ bubbles: !0, composed: !0 })
    },
    styles: z
  }
);
s("z-toggle-group-item", v);
export {
  v as ZToggleGroupItem
};
