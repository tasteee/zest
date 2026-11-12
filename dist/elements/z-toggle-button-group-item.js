// @ts-self-types="./z-toggle-button-group-item.d.ts"
import { c as g, a as l, e as i, j as e, d as s } from "../chunks/define-element-BZUk-KLk.js";
import { u as c } from "../chunks/use-prop-C0_HeSQ9.js";
import { t as u, r as b } from "../chunks/toggle-schema-BLxjiLhp.js";
const d = g`
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
		gap: var(--space-2);
		width: 100%;
		font-family: inherit;
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		border-radius: var(--z-toggle-button-radius, var(--radius-md));
		cursor: pointer;
		line-height: var(--line-height-none);
		box-sizing: border-box;
		background: var(--z-toggle-button-bg, transparent);
		border: 1px solid var(--z-toggle-button-border, transparent);
		color: var(--z-toggle-button-color, var(--text-primary));
		height: var(--z-toggle-button-height, var(--control-height-md));
		padding-inline: var(--z-toggle-button-padding-inline, 1rem);
		min-width: var(--z-toggle-button-min-width, 2.5rem);
		font-size: var(--z-toggle-button-font-size, 0.875rem);
		transition:
			opacity var(--motion-instant) var(--ease-enter),
			border-color var(--motion-instant) var(--ease-enter),
			background-color var(--motion-instant) var(--ease-enter),
			color var(--motion-instant) var(--ease-enter);
	}

	button:hover {
		background: var(--z-toggle-button-hover-bg, color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 8%, transparent));
		border-color: var(--z-toggle-button-hover-border, var(--z-toggle-button-border, transparent));
	}

	button[data-state='on'] {
		background: var(--z-toggle-button-on-bg, var(--z-toggle-button-accent, var(--accent-primary)));
		color: var(--z-toggle-button-on-color, var(--z-toggle-button-accent-foreground, var(--on-accent)));
		border-color: var(--z-toggle-button-on-border, transparent);
	}

	button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	button:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	button.is-xs {
		--z-toggle-button-height: 1.75rem;
		--z-toggle-button-padding-inline: 0.625rem;
		--z-toggle-button-min-width: 1.75rem;
		--z-toggle-button-font-size: var(--font-size-xs);
		--z-toggle-button-icon-size: 0.75rem;
	}

	button.is-sm {
		--z-toggle-button-height: var(--control-height-sm);
		--z-toggle-button-padding-inline: 0.75rem;
		--z-toggle-button-min-width: var(--control-height-sm);
		--z-toggle-button-font-size: var(--font-size-sm);
		--z-toggle-button-icon-size: 0.875rem;
	}

	button.is-lg {
		--z-toggle-button-height: var(--control-height-lg);
		--z-toggle-button-padding-inline: 1.25rem;
		--z-toggle-button-min-width: var(--control-height-lg);
		--z-toggle-button-font-size: var(--font-size-md);
		--z-toggle-button-icon-size: 1.125rem;
	}

	button.is-icon {
		padding-inline: 0;
		width: var(--z-toggle-button-height, var(--control-height-md));
	}

	button.is-secondary {
		--z-toggle-button-color: var(--accent-secondary);
		--z-toggle-button-accent: var(--accent-secondary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	button.is-tertiary {
		--z-toggle-button-color: var(--accent-tertiary);
		--z-toggle-button-accent: var(--accent-tertiary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	button.is-primary {
		--z-toggle-button-color: var(--text-primary);
		--z-toggle-button-accent: var(--accent-primary);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	button.is-success {
		--z-toggle-button-color: var(--status-success);
		--z-toggle-button-accent: var(--status-success);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	button.is-warning {
		--z-toggle-button-color: var(--status-warning);
		--z-toggle-button-accent: var(--status-warning);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	button.is-danger {
		--z-toggle-button-color: var(--status-danger);
		--z-toggle-button-accent: var(--status-danger);
		--z-toggle-button-accent-foreground: var(--on-accent);
	}

	button.is-ghost {
		--z-toggle-button-border: transparent;
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 10%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	/* off: tone-colored text (--z-toggle-button-color) + a dimmed tone border so the two
	   agree. on: solid tone fill with dark on-foreground text and a solid border. */
	button.is-outline {
		--z-toggle-button-border: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 50%, transparent);
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 10%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: var(--z-toggle-button-accent, var(--text-primary));
	}

	/* solid: the resting state carries its own fill so the segment reads as
	   an object even before it is pressed. on keeps the same accent fill as
	   every other kind, just without a border change to announce it. */
	button.is-solid {
		--z-toggle-button-border: transparent;
		--z-toggle-button-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 12%, var(--z-toggle-button-surface, transparent));
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 20%, var(--z-toggle-button-surface, transparent));
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	button.is-soft {
		--z-toggle-button-border: transparent;
		--z-toggle-button-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 15%, transparent);
		color: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-hover-bg: color-mix(in oklch, var(--z-toggle-button-accent, var(--text-primary)) 24%, transparent);
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	/* plain: text only at rest, an underline is the only affordance until it
	   is pressed. Matches z-button's plain treatment. */
	button.is-plain {
		--z-toggle-button-border: transparent;
		--z-toggle-button-hover-bg: transparent;
		--z-toggle-button-on-bg: var(--z-toggle-button-accent, var(--text-primary));
		--z-toggle-button-on-color: var(--z-toggle-button-accent-foreground, var(--on-accent));
		--z-toggle-button-on-border: transparent;
	}

	button.is-plain:hover {
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}

	::slotted(svg) {
		width: var(--z-toggle-button-icon-size, 1rem);
		height: var(--z-toggle-button-icon-size, 1rem);
		flex-shrink: 0;
		pointer-events: none;
	}
`, v = l(
  (t) => {
    const [o, r] = c("isPressed"), a = b(t);
    return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        class: a,
        "data-state": o ? "on" : "off",
        "aria-pressed": o ? "true" : "false",
        disabled: t.isDisabled,
        onclick: () => {
          const n = !o;
          r(n), t.press({ pressed: n, value: t.value });
        },
        children: /* @__PURE__ */ e("slot", {})
      }
    ) });
  },
  {
    props: {
      ...u,
      isPressed: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      value: String,
      press: i({ bubbles: !0, composed: !0 })
    },
    styles: d
  }
);
s("z-toggle-button-group-item", v);
export {
  v as ZToggleButtonGroupItem
};
