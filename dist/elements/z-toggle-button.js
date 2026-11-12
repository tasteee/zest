// @ts-self-types="./z-toggle-button.d.ts"
import { c as d, a as u, e as m, j as t, d as h } from "../chunks/define-element-BZUk-KLk.js";
import { i as v } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as b } from "../chunks/accessible-NC1hpH4S.js";
import { u as f } from "../chunks/use-prop-C0_HeSQ9.js";
import { o } from "../chunks/prop-types-B3Bpi956.js";
const p = d`
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
		font-family: inherit;
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		cursor: pointer;
		line-height: var(--line-height-none);
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--toggle-border, transparent);
		color: var(--tone-text, var(--text-primary));
		border-radius: var(--z-toggle-button-radius, var(--radius-md));
		height: var(--toggle-height, 2.5rem);
		padding-inline: var(--toggle-padding-inline, 1rem);
		min-width: var(--toggle-min-width, 2.5rem);
		font-size: var(--toggle-font-size, 0.875rem);
		transition:
			opacity var(--motion-instant) var(--ease-enter),
			border-color var(--motion-instant) var(--ease-enter),
			background-color var(--motion-instant) var(--ease-enter),
			color var(--motion-instant) var(--ease-enter);
	}

	button:hover {
		background: color-mix(in oklch, var(--tone) 10%, transparent);
	}

	button[data-state='on'] {
		background: var(--tone);
		border-color: transparent;
		color: var(--tone-on-foreground, var(--on-accent));
	}

	button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	button:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	/* sizes: each sets the dimension vars the base button consumes, so is-icon
	   (width: var(--toggle-height)) tracks whichever size is active. */

	button.is-xs {
		--toggle-height: 1.75rem;
		--toggle-padding-inline: 0.625rem;
		--toggle-min-width: 1.75rem;
		--toggle-font-size: var(--font-size-xs);
		--toggle-icon-size: 0.75rem;
	}

	button.is-sm {
		--toggle-height: var(--control-height-sm);
		--toggle-padding-inline: 0.75rem;
		--toggle-min-width: 2rem;
		--toggle-font-size: var(--font-size-sm);
		--toggle-icon-size: 0.875rem;
	}

	button.is-md {
		--toggle-height: var(--control-height-md);
		--toggle-padding-inline: 1rem;
		--toggle-min-width: 2.5rem;
		--toggle-font-size: var(--font-size-sm);
		--toggle-icon-size: 1rem;
	}

	button.is-lg {
		--toggle-height: var(--control-height-lg);
		--toggle-padding-inline: 1.25rem;
		--toggle-min-width: 3rem;
		--toggle-font-size: var(--font-size-md);
		--toggle-icon-size: 1.125rem;
	}

	button.is-icon {
		padding-inline: 0;
		width: var(--toggle-height, 2.5rem);
	}

	/* tones: each one sets --tone, the single accent every kind paints
	   with, plus the resting text color (--tone-text) and the foreground used
	   when pressed (--tone-on-foreground). Mirrors z-button's tone model. */

	button.is-neutral {
		--tone: var(--text-primary);
		--tone-text: var(--text-primary);
		--tone-on-foreground: var(--on-accent);
	}

	button.is-primary {
		--tone: var(--accent-primary);
		--tone-text: var(--accent-primary);
		--tone-on-foreground: var(--on-accent);
	}

	button.is-secondary {
		--tone: var(--accent-secondary);
		--tone-text: var(--accent-secondary);
		--tone-on-foreground: var(--on-accent);
	}

	button.is-tertiary {
		--tone: var(--accent-tertiary);
		--tone-text: var(--accent-tertiary);
		--tone-on-foreground: var(--on-accent);
	}

	button.is-success { --tone: var(--status-success); --tone-text: var(--status-success); }
	button.is-warning { --tone: var(--status-warning); --tone-text: var(--status-warning); }
	button.is-danger { --tone: var(--status-danger); --tone-text: var(--status-danger); }

	.label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		transform: translateY(calc(var(--space-1) / 4));
	}

	/* kinds: paint using --tone */

	button.is-ghost {
		--toggle-border: transparent;
	}

	/* off: tone-colored text + a dimmed tone border (border and text agree).
	   on: solid tone fill (inherits the base on-state) with a solid tone border. */
	button.is-outline {
		--toggle-border: color-mix(in oklch, var(--tone) 50%, transparent);
	}

	button.is-outline[data-state='on'] {
		border-color: var(--tone);
	}

	::slotted(svg) {
		width: var(--toggle-icon-size, 1rem);
		height: var(--toggle-icon-size, 1rem);
		flex-shrink: 0;
		pointer-events: none;
	}
`, y = (e) => e.size === "xs" ? "is-xs" : e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", x = (e) => e.kind === "ghost" ? "is-ghost" : "is-outline", z = (e) => e.tone === "primary" ? "is-primary" : e.tone === "secondary" ? "is-secondary" : e.tone === "tertiary" ? "is-tertiary" : e.tone === "success" ? "is-success" : e.tone === "warning" ? "is-warning" : e.tone === "danger" ? "is-danger" : "is-neutral", w = u(
  (e) => {
    const [n, s] = f("isPressed"), i = b(), a = x(e), l = z(e), c = y(e), g = [a, l, c].concat(e.isIcon ? ["is-icon"] : []).join(" ");
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        class: g,
        "data-state": n ? "on" : "off",
        "aria-pressed": n ? "true" : "false",
        "aria-label": i,
        disabled: e.isDisabled,
        onclick: () => {
          const r = !n;
          s(r), e.press({ pressed: r });
        },
        children: /* @__PURE__ */ t("span", { class: "label", children: /* @__PURE__ */ t("slot", {}) })
      }
    ) });
  },
  {
    props: {
      size: { type: o("xs", "sm", "md", "lg"), reflect: !0 },
      kind: { type: o("solid", "outline", "ghost", "soft", "plain"), reflect: !0 },
      tone: { type: o("neutral", "primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isIcon: { type: Boolean, reflect: !0 },
      isPressed: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      press: m({ bubbles: !0, composed: !0 })
    },
    styles: [p, v]
  }
);
h("z-toggle-button", w);
export {
  w as ZToggleButton
};
