import { c as f, a as v, j as o, g as p } from "../chunks/define-element-BZUk-KLk.js";
import { i as y } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as w, d as k } from "../chunks/form-control-D_UwalCr.js";
import { u as x } from "../chunks/accessible-NC1hpH4S.js";
import { o as r } from "../chunks/prop-types-B3Bpi956.js";
const z = f`
	:host {
		display: inline-flex;
		user-select: none;
		-webkit-user-select: none;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-full-width]) {
		display: flex;
		width: 100%;
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-family: inherit;
		font-weight: 500;
		white-space: nowrap;
		border: 1px solid transparent;
		cursor: pointer;
		line-height: 1;
		box-sizing: border-box;
		/* Fill the host. The host is inline-flex, so it still shrink-wraps to the
		   button's content when standalone, but when a parent stretches the host
		   (full-width, or a z-button-group column), the button fills it instead of
		   staying content-width. */
		width: 100%;
		transition:
			opacity var(--motion-fast),
			border-color var(--motion-fast),
			background-color var(--motion-fast),
			color var(--motion-fast),
			box-shadow var(--material-press-duration) ease;
	}

	button.is-full-width {
		width: 100%;
	}

	button:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}

	/* sizes */

	button.is-sm {
		border-radius: var(--z-button-radius, var(--small-button-radius));
		height: var(--control-height-sm);
		padding-inline: 0.875rem;
		font-size: var(--control-font-size-sm);
	}

	button.is-md {
		border-radius: var(--z-button-radius, var(--medium-button-radius));
		height: var(--control-height-md);
		padding-inline: 1rem;
		font-size: var(--control-font-size-md);
	}

	button.is-lg {
		border-radius: var(--z-button-radius, var(--large-button-radius));
		height: var(--control-height-lg);
		padding-inline: 1.5rem;
		font-size: var(--control-font-size-lg);
	}

	button.is-primary {
		--tone-color: var(--color-neutral-8);
	}

	button.is-secondary {
		--tone-color: var(--purple);
	}

	button.is-tertiary {
		--tone-color: var(--pink);
	}

	button.is-success {
		--tone-color: var(--success);
	}

	button.is-warning {
		--tone-color: var(--warning);
	}

	button.is-error {
		--tone-color: var(--destructive);
	}

	/* kinds: paint using --tone-color */

	/* A solid button is the library's most physical object, so it consumes the
	   full material vocabulary: a lit fill, a raised stack, and an LED rim in
	   its own tone. Every one of those tokens is inert in the flat themes,
	   where this paints exactly the flat tone colour it always did.
	   --emissive-color is the handshake: the theme writes the glow, this
	   writes which colour it glows. */
	button.is-solid {
		--emissive-color: var(--tone-color);
		background: var(--material-tone), var(--tone-color);
		box-shadow: var(--elevation-raised), var(--emissive-tone);
		border-color: var(--tone-color);
		color: var(--tone-on-color);
		font-weight: 600;
	}

	/* A mid-tone fill has no good plain black or white label. The label is
	   the tone's own hue pulled very dark, so it stays legible and still
	   reads as part of the same colour family. The theme sets how dark
	   (light themes keep a plain white label). Neutral overrides this below. */
	button.is-solid {
		--tone-on-color: oklch(from var(--tone-color) var(--on-tone-lightness) calc(c * var(--on-tone-chroma)) h);
	}

	/* Pressing swaps the raised stack for the pressed one, which in the
	   hardware themes reads as the cap travelling into the panel. */
	button.is-solid:active {
		box-shadow: var(--elevation-pressed);
	}

	/* The neutral tone is the one fill that flips with the theme — near-white
	   on dark, near-black on light — so its label has to flip with it rather
	   than being pinned to black. */
	button.is-solid.is-primary {
		color: var(--primary-foreground);
	}

	button.is-solid:hover {
		opacity: 0.9;
	}

	button.is-solid:active {
		opacity: 0.8;
	}

	button.is-outline {
		background: var(--material-surface);
		border-color: var(--tone-color);
		color: var(--tone-color);
	}

	button.is-outline:hover {
		background: color-mix(in srgb, var(--tone-color) 10%, transparent);
	}

	button.is-outline:active {
		background: color-mix(in srgb, var(--tone-color) 20%, transparent);
	}

	button.is-ghost {
		background: transparent;
		border-color: transparent;
		color: var(--tone-color);
	}

	button.is-ghost:hover {
		background: color-mix(in srgb, var(--tone-color) 10%, transparent);
	}

	button.is-ghost:active {
		background: color-mix(in srgb, var(--tone-color) 18%, transparent);
	}

	button.is-soft {
		background: color-mix(in srgb, var(--tone-color) 15%, transparent);
		border-color: transparent;
		/* The tone on its own tint measured 3.7–4.3:1 in the light themes.
		   Pulling the text a quarter of the way to the foreground clears 4.5:1
		   in every theme — darker on paper, lighter on ink — as z-badge does. */
		color: color-mix(in oklab, var(--tone-color) 72%, var(--foreground));
		font-weight: 600;
	}

	button.is-soft:hover {
		background: color-mix(in srgb, var(--tone-color) 24%, transparent);
	}

	button.is-soft:active {
		background: color-mix(in srgb, var(--tone-color) 32%, transparent);
	}

	button.is-plain {
		background: transparent;
		border-color: transparent;
		color: var(--tone-color);
	}

	button.is-plain:hover {
		text-decoration: underline;
		text-underline-offset: 0.25em;
		text-decoration-thickness: 1px;
	}

	button.is-plain:active {
		opacity: 0.8;
	}

	/* states */

	button.is-disabled,
	button:disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	button.is-loading {
		cursor: progress;
	}

	.spinner {
		width: 0.875em;
		height: 0.875em;
		border: 2px solid currentColor;
		border-top-color: transparent;
		border-radius: 999px;
		animation: z-button-spin 0.7s linear infinite;
	}

	::slotted(svg) {
		width: 1rem;
		height: 1rem;
		margin-top: 1px;
		flex-shrink: 0;
	}

	button.is-sm ::slotted(svg) {
		width: 0.875rem;
		height: 0.875rem;
	}

	button.is-lg ::slotted(svg) {
		width: 1.125rem;
		height: 1.125rem;
	}

	button.is-outline.is-primary {
		border-color: var(--border);
		color: var(--foreground);
	}

	button.is-outline.is-primary:hover {
		border-color: var(--color-neutral-4);
	}

	.label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	@keyframes z-button-spin {
		to {
			transform: rotate(360deg);
		}
	}
`, F = (t) => t.size === "sm" ? "is-sm" : t.size === "lg" ? "is-lg" : "is-md", C = (t) => t.kind === "outline" ? "is-outline" : t.kind === "ghost" ? "is-ghost" : t.kind === "soft" ? "is-soft" : t.kind === "plain" ? "is-plain" : "is-solid", D = (t) => t.tone === "secondary" ? "is-secondary" : t.tone === "tertiary" ? "is-tertiary" : t.tone === "success" ? "is-success" : t.tone === "warning" ? "is-warning" : t.tone === "danger" ? "is-error" : "is-primary", B = v(
  (t) => {
    const i = t.type || "button", l = x(), { internals: e, isFormDisabled: c } = w({
      value: null,
      isDisabled: t.isDisabled,
      onReset: () => {
      }
    }), s = t.isDisabled || c, u = () => {
      const n = e == null ? void 0 : e.form;
      if (!n) return;
      if (i === "reset") {
        n.reset();
        return;
      }
      if (i !== "submit") return;
      const a = !!t.name;
      a && e.setFormValue(t.value ?? "");
      try {
        n.requestSubmit();
      } finally {
        a && e.setFormValue(null);
      }
    }, d = C(t), h = D(t), b = F(t), m = s || t.isLoading, g = [d, h, b].concat(t.isLoading ? ["is-loading"] : []).concat(s ? ["is-disabled"] : []).concat(t.isFullWidth ? ["is-full-width"] : []).join(" ");
    return /* @__PURE__ */ o("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ p("button", { class: g, type: i, disabled: m, "aria-busy": t.isLoading ? "true" : void 0, "aria-label": l, onclick: u, children: [
      t.isLoading && /* @__PURE__ */ o("span", { class: "spinner", "aria-hidden": "true" }),
      /* @__PURE__ */ o("span", { class: "label", children: t.label ? t.label : /* @__PURE__ */ o("slot", {}) })
    ] }) });
  },
  {
    props: {
      size: { type: r("sm", "md", "lg"), reflect: !0 },
      kind: { type: r("solid", "outline", "ghost", "soft", "plain"), reflect: !0 },
      tone: { type: r("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isLoading: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      label: String,
      type: r("button", "submit", "reset"),
      name: { type: String, reflect: !0 },
      value: String
    },
    styles: [z, y],
    form: !0
  }
);
k("z-button", B);
export {
  B as ZButton
};
