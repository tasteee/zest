// @ts-self-types="./z-button.d.ts"
import { c as f, a as v, j as n, g as y } from "../chunks/define-element-BZUk-KLk.js";
import { i as p } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as w, d as k } from "../chunks/form-control-CrK-0rhn.js";
import { u as x } from "../chunks/accessible-NC1hpH4S.js";
import { o } from "../chunks/prop-types-B3Bpi956.js";
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
		gap: var(--space-2);
		font-family: inherit;
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		border: 1px solid transparent;
		cursor: pointer;
		line-height: var(--line-height-none);
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
			color var(--motion-fast);
	}

	button.is-full-width {
		width: 100%;
	}

	button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	/* sizes */

	button.is-sm {
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--control-height-sm);
		padding-inline: var(--space-3-5);
		font-size: var(--font-size-sm);
	}

	button.is-md {
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--control-height-md);
		padding-inline: var(--space-4);
		font-size: var(--font-size-sm);
	}

	button.is-lg {
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--control-height-lg);
		padding-inline: var(--space-6);
		font-size: var(--font-size-md);
	}

	button.is-neutral {
		--tone: var(--text-primary);
	}

	button.is-primary {
		--tone: var(--accent-primary);
	}

	button.is-secondary {
		--tone: var(--accent-secondary);
	}

	button.is-tertiary {
		--tone: var(--accent-tertiary);
	}

	button.is-success {
		--tone: var(--status-success);
	}

	button.is-warning {
		--tone: var(--status-warning);
	}

	button.is-error {
		--tone: var(--status-danger);
	}

	/* kinds: paint using --tone */

	button.is-solid {
		background: var(--tone);
		border-color: var(--tone);
		color: var(--tone-on-color);
		font-weight: var(--font-weight-semibold);
	}

	/* A mid-tone fill has no good plain black or white label. The label is
	   the tone's own hue pulled very dark, so it stays legible and still
	   reads as part of the same colour family. The theme sets how dark
	   (light themes keep a plain white label). Neutral overrides this below. */
	button.is-solid {
		--tone-on-color: oklch(from var(--tone) var(--on-tone-lightness) calc(c * var(--on-tone-chroma)) h);
	}


	/* The neutral tone is the one fill that flips with the theme — near-white
	   on dark, near-black on light — so its label has to flip with it rather
	   than being pinned to black. */
	button.is-solid.is-neutral,
	button.is-solid.is-primary {
		color: var(--on-accent);
	}

	button.is-solid:hover {
		opacity: 0.9;
	}

	button.is-solid:active {
		opacity: 0.8;
	}

	button.is-outline {
		background: transparent;
		border-color: var(--tone);
		color: var(--tone);
	}

	button.is-outline:hover {
		background: color-mix(in srgb, var(--tone) 10%, transparent);
	}

	button.is-outline:active {
		background: color-mix(in srgb, var(--tone) 20%, transparent);
	}

	button.is-ghost {
		background: transparent;
		border-color: transparent;
		color: var(--tone);
	}

	button.is-ghost:hover {
		background: color-mix(in srgb, var(--tone) 10%, transparent);
	}

	button.is-ghost:active {
		background: color-mix(in srgb, var(--tone) 18%, transparent);
	}

	button.is-soft {
		background: color-mix(in srgb, var(--tone) 15%, transparent);
		border-color: transparent;
		/* The tone on its own tint measured 3.7–4.3:1 in the light themes.
		   Pulling the text a quarter of the way to the foreground clears 4.5:1
		   in every theme — darker on paper, lighter on ink — as z-badge does. */
		color: color-mix(in oklab, var(--tone) 72%, var(--text-primary));
		font-weight: var(--font-weight-semibold);
	}

	button.is-soft:hover {
		background: color-mix(in srgb, var(--tone) 24%, transparent);
	}

	button.is-soft:active {
		background: color-mix(in srgb, var(--tone) 32%, transparent);
	}

	button.is-plain {
		background: transparent;
		border-color: transparent;
		color: var(--tone);
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
		border-radius: var(--radius-full);
		animation: z-button-spin 0.7s linear infinite;
	}

	::slotted(svg) {
		width: 1rem;
		height: 1rem;
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
		border-color: var(--border-default);
		color: var(--text-primary);
	}

	button.is-outline.is-neutral:hover {
		border-color: var(--border-strong);
	}

	.label {
		transform: translateY(calc(var(--space-1) / 4));
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	@keyframes z-button-spin {
		to {
			transform: rotate(360deg);
		}
	}
`, F = (t) => t.size === "sm" ? "is-sm" : t.size === "lg" ? "is-lg" : "is-md", C = (t) => t.kind === "outline" ? "is-outline" : t.kind === "ghost" ? "is-ghost" : t.kind === "soft" ? "is-soft" : t.kind === "plain" ? "is-plain" : "is-solid", D = (t) => t.tone === "primary" ? "is-primary" : t.tone === "secondary" ? "is-secondary" : t.tone === "tertiary" ? "is-tertiary" : t.tone === "success" ? "is-success" : t.tone === "warning" ? "is-warning" : t.tone === "danger" ? "is-error" : "is-neutral", B = v(
  (t) => {
    const r = t.type || "button", l = x(), { internals: e, isFormDisabled: u } = w({
      value: null,
      isDisabled: t.isDisabled,
      onReset: () => {
      }
    }), s = t.isDisabled || u, d = () => {
      const i = e == null ? void 0 : e.form;
      if (!i) return;
      if (r === "reset") {
        i.reset();
        return;
      }
      if (r !== "submit") return;
      const a = !!t.name;
      a && e.setFormValue(t.value ?? "");
      try {
        i.requestSubmit();
      } finally {
        a && e.setFormValue(null);
      }
    }, c = C(t), b = D(t), h = F(t), m = s || t.isLoading, g = [c, b, h].concat(t.isLoading ? ["is-loading"] : []).concat(s ? ["is-disabled"] : []).concat(t.isFullWidth ? ["is-full-width"] : []).join(" ");
    return /* @__PURE__ */ n("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ y("button", { class: g, type: r, disabled: m, "aria-busy": t.isLoading ? "true" : void 0, "aria-label": l, onclick: d, children: [
      t.isLoading && /* @__PURE__ */ n("span", { class: "spinner", "aria-hidden": "true" }),
      /* @__PURE__ */ n("span", { class: "label", children: t.label ? t.label : /* @__PURE__ */ n("slot", {}) })
    ] }) });
  },
  {
    props: {
      size: { type: o("sm", "md", "lg"), reflect: !0 },
      kind: { type: o("solid", "outline", "ghost", "soft", "plain"), reflect: !0 },
      tone: { type: o("neutral", "primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isLoading: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      label: String,
      type: o("button", "submit", "reset"),
      name: { type: String, reflect: !0 },
      value: String
    },
    styles: [z, p],
    form: !0
  }
);
k("z-button", B);
export {
  B as ZButton
};
