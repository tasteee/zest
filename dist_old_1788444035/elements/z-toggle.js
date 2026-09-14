import { c as g, a as d, e as c, j as o, d as u } from "../chunks/define-element-BWC3wEPr.js";
import { u as h } from "../chunks/use-prop-DBBKVpkc.js";
const m = g`
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
		font-family: inherit;
		font-weight: 500;
		white-space: nowrap;
		cursor: pointer;
		line-height: 1;
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--toggle-border, transparent);
		color: var(--tone-text, var(--foreground));
		border-radius: var(--z-toggle-radius, var(--radius-md));
		height: var(--toggle-height, 2.5rem);
		padding-inline: var(--toggle-padding-inline, 1rem);
		min-width: var(--toggle-min-width, 2.5rem);
		font-size: var(--toggle-font-size, 0.875rem);
		transition:
			opacity 0.1s ease,
			border-color 0.1s ease,
			background-color 0.1s ease,
			color 0.1s ease;
	}

	button:hover {
		background: color-mix(in oklch, var(--tone-color) 10%, transparent);
	}

	/* On is the lit state, so it takes the tone fill and the LED rim in that
	   same tone. Both are inert in the flat themes, where this stays a flat
	   fill exactly as before. */
	button[data-state='on'] {
		--emissive-color: var(--tone-color);
		background: var(--material-tone), var(--tone-color);
		box-shadow: var(--emissive-tone);
		border-color: transparent;
		color: var(--tone-on-foreground, var(--primary-foreground));
	}

	button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	button:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	/* sizes: each sets the dimension vars the base button consumes, so is-icon
	   (width: var(--toggle-height)) tracks whichever size is active. */

	button.is-sm {
		--toggle-height: var(--control-height-sm);
		--toggle-padding-inline: 0.75rem;
		--toggle-min-width: 2rem;
		--toggle-font-size: 0.8125rem;
		--toggle-icon-size: 0.875rem;
	}

	button.is-md {
		--toggle-height: var(--control-height-md);
		--toggle-padding-inline: 1rem;
		--toggle-min-width: 2.5rem;
		--toggle-font-size: 0.875rem;
		--toggle-icon-size: 1rem;
	}

	button.is-lg {
		--toggle-height: var(--control-height-lg);
		--toggle-padding-inline: 1.25rem;
		--toggle-min-width: 3rem;
		--toggle-font-size: 1rem;
		--toggle-icon-size: 1.125rem;
	}

	button.is-icon {
		padding-inline: 0;
		width: var(--toggle-height, 2.5rem);
	}

	/* tones: each one sets --tone-color, the single accent every kind paints
	   with, plus the resting text color (--tone-text) and the foreground used
	   when pressed (--tone-on-foreground). Mirrors z-button's tone model. */

	button.is-neutral {
		--tone-color: var(--primary);
		--tone-text: var(--foreground);
		--tone-on-foreground: var(--primary-foreground);
	}

	button.is-dom {
		--tone-color: var(--neon-purple);
		--tone-text: var(--neon-purple);
		--tone-on-foreground: var(--primary-foreground);
	}

	button.is-sub {
		--tone-color: var(--neon-pink);
		--tone-text: var(--neon-pink);
		--tone-on-foreground: var(--primary-foreground);
	}

	/* kinds: paint using --tone-color */

	button.is-ghost {
		--toggle-border: transparent;
	}

	/* off: tone-colored text + a dimmed tone border (border and text agree).
	   on: solid tone fill (inherits the base on-state) with a solid tone border. */
	button.is-outline {
		--toggle-border: color-mix(in oklch, var(--tone-color) 50%, transparent);
	}

	button.is-outline[data-state='on'] {
		border-color: var(--tone-color);
	}

	::slotted(svg) {
		width: var(--toggle-icon-size, 1rem);
		height: var(--toggle-icon-size, 1rem);
		flex-shrink: 0;
		pointer-events: none;
	}
`, b = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", f = (e) => e.kind === "ghost" ? "is-ghost" : "is-outline", v = (e) => e.accent === "dom" ? "is-dom" : e.accent === "sub" ? "is-sub" : "is-neutral", p = d(
  (e) => {
    const [t, r] = h("isPressed"), i = f(e), s = v(e), a = b(e), l = [i, s, a].concat(e.isIcon ? ["is-icon"] : []).join(" ");
    return /* @__PURE__ */ o("host", { shadowDom: !0, children: /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        class: l,
        "data-state": t ? "on" : "off",
        "aria-pressed": t ? "true" : "false",
        disabled: e.isDisabled,
        onclick: () => {
          const n = !t;
          r(n), e.press({ pressed: n });
        },
        children: /* @__PURE__ */ o("slot", {})
      }
    ) });
  },
  {
    props: {
      size: { type: String, reflect: !0 },
      kind: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isIcon: { type: Boolean, reflect: !0 },
      isPressed: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      press: c({ bubbles: !0, composed: !0 })
    },
    styles: m
  }
);
u("z-toggle", p);
export {
  p as ZToggle
};
