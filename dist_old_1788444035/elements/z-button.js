import { c as l, a as c, j as e, g as u, d } from "../chunks/define-element-BWC3wEPr.js";
const h = l`
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
		   button's content when standalone — but when a parent stretches the host
		   (full-width, or a z-button-group column), the button fills it instead of
		   staying content-width. */
		width: 100%;
		transition:
			opacity 0.05s,
			border-color 0.05s,
			background-color 0.05s,
			color 0.05s,
			box-shadow var(--material-press-duration) ease;
	}

	button.is-full-width {
		width: 100%;
	}

	button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 55%, transparent);
		outline-offset: 2px;
	}

	/* sizes */

	button.is-sm {
		border-radius: var(--z-button-radius, var(--small-button-radius));
		height: var(--control-height-sm);
		padding-inline: 0.875rem;
		font-size: 0.75rem;
	}

	button.is-md {
		border-radius: var(--z-button-radius, var(--medium-button-radius));
		height: var(--control-height-md);
		padding-inline: 1rem;
		font-size: 0.875rem;
	}

	button.is-lg {
		border-radius: var(--z-button-radius, var(--large-button-radius));
		height: var(--control-height-lg);
		padding-inline: 1.5rem;
		font-size: 1rem;
	}

	button.is-neutral {
		--tone-color: var(--color-neutral-8);
	}

	button.is-dom {
		--tone-color: var(--purple);
	}

	button.is-sub {
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
		color: white;
		font-weight: 600;
	}

	/* Pressing swaps the raised stack for the pressed one, which in the
	   hardware themes reads as the cap travelling into the panel. */
	button.is-solid:active {
		box-shadow: var(--elevation-pressed);
	}

	/* The neutral tone is the one fill that flips with the theme — near-white
	   on dark, near-black on light — so its label has to flip with it rather
	   than being pinned to black. */
	button.is-solid.is-neutral {
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
		color: var(--tone-color);
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
	}

	button.is-plain:active {
		opacity: 0.8;
	}

	/* states */

	button.is-disabled,
	button:disabled {
		filter: contrast(75%) brightness(0.6);
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

	button.is-outline.is-neutral {
		--tone-color: var(--color-neutral-7);
		color: var(--color-neutral-7);

		&:hover {
			/* background: var(--color-neutral-3); */
			color: var(--color-neutral-9) !important;
		}
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
`, b = (t) => t.size === "sm" ? "is-sm" : t.size === "lg" ? "is-lg" : "is-md", g = (t) => t.kind === "outline" ? "is-outline" : t.kind === "ghost" ? "is-ghost" : t.kind === "soft" ? "is-soft" : t.kind === "plain" ? "is-plain" : "is-solid", v = (t) => t.accent === "dom" ? "is-dom" : t.accent === "sub" ? "is-sub" : t.accent === "success" ? "is-success" : t.accent === "warning" ? "is-warning" : t.accent === "error" ? "is-error" : "is-neutral", m = c(
  (t) => {
    const o = t.type || "button", r = g(t), n = v(t), i = b(t), s = t.isDisabled || t.isLoading, a = [r, n, i].concat(t.isLoading ? ["is-loading"] : []).concat(t.isDisabled ? ["is-disabled"] : []).concat(t.isFullWidth ? ["is-full-width"] : []).join(" ");
    return /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ u("button", { class: a, type: o, disabled: s, children: [
      t.isLoading && /* @__PURE__ */ e("span", { class: "spinner", "aria-hidden": "true" }),
      /* @__PURE__ */ e("span", { class: "label", children: t.label ? t.label : /* @__PURE__ */ e("slot", {}) })
    ] }) });
  },
  {
    props: {
      size: { type: String, reflect: !0 },
      kind: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isLoading: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      label: String,
      type: String
    },
    styles: h
  }
);
d("z-button", m);
export {
  m as ZButton
};
