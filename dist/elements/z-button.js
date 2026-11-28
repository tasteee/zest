// @ts-self-types="./z-button.d.ts"
import { c as D, a as S, u as I, f as N, b as f, j as o, g as j } from "../chunks/define-element-BZUk-KLk.js";
import { i as E } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as L, d as P } from "../chunks/form-control-B69z9f8A.js";
import { u as q, r as O } from "../chunks/accessible-D6muJfYC.js";
import { r as R } from "../chunks/misuse-BkfjLjP6.js";
import { o as s } from "../chunks/prop-types-CSJu2W-0.js";
const v = ["aria-haspopup", "aria-expanded"], V = D`
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

	/* sizes: each sets --button-height, which both the height and the
	   square is-icon width read, so is-icon tracks whichever size is active. */

	button.is-xs {
		--button-height: var(--control-height-xs);
		border-radius: var(--z-button-radius, var(--radius-sm));
		height: var(--button-height);
		padding-inline: var(--space-2-5);
		font-size: var(--font-size-xs);
	}

	button.is-sm {
		--button-height: var(--control-height-sm);
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--button-height);
		padding-inline: var(--space-3-5);
		font-size: var(--font-size-sm);
	}

	button.is-md {
		--button-height: var(--control-height-md);
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--button-height);
		padding-inline: var(--space-4);
		font-size: var(--font-size-sm);
	}

	button.is-lg {
		--button-height: var(--control-height-lg);
		border-radius: var(--z-button-radius, var(--radius-md));
		height: var(--button-height);
		padding-inline: var(--space-6);
		font-size: var(--font-size-md);
	}

	button.is-chip {
		padding-inline: var(--space-2-5);
		background: var(--surface-default);
		border-color: var(--border-default);
		color: var(--tone);
		font-size: calc(var(--font-size-md) * 25 / 28);
	}

	button.is-chip:hover,
	button.is-chip[aria-expanded='true'] {
		border-color: var(--border-strong);
	}

	button.is-chip:active,
	button.is-chip[aria-expanded='true'] {
		background: var(--surface-page);
	}

	.chip-icon {
		display: contents;
	}

	.chevron {
		width: 0.75rem;
		height: 0.75rem;
		flex: none;
		color: var(--text-tertiary);
	}

	/* is-icon: a square, icon-only button. A shape modifier that composes with
	   every size, kind and tone, matching z-toggle-button's is-icon. */
	button.is-icon {
		width: var(--button-height);
		padding-inline: 0;
		gap: 0;
	}

	button.is-icon.is-loading .label {
		display: none;
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

	button.is-xs ::slotted(svg) {
		width: 0.75rem;
		height: 0.75rem;
	}

	button.is-sm ::slotted(svg) {
		width: var(--control-icon-size-sm, 0.875rem);
		height: var(--control-icon-size-sm, 0.875rem);
	}

	button.is-lg ::slotted(svg) {
		width: 1.125rem;
		height: 1.125rem;
	}

	button .chip-icon::slotted(svg) {
		width: 0.9375rem;
		height: 0.9375rem;
		color: var(--text-tertiary);
	}

	button.is-outline.is-neutral {
		border-color: var(--border-default);
		color: var(--text-primary);
	}

	button.is-outline.is-neutral:hover {
		border-color: var(--border-strong);
	}

	.label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	/* Center the capitals, not the font's ascent and descent. Those metrics
	   differ by platform (Windows reads other font tables), which moved text
	   up or down by a pixel or two. Trimming the label to cap height and
	   baseline makes align-items: center center the capitals everywhere. */
	.label.is-text {
		display: block;
		text-box: trim-both cap alphabetic;
	}

	@keyframes z-button-spin {
		to {
			transform: rotate(360deg);
		}
	}
`, W = (t) => t.size === "xs" ? "is-xs" : t.size === "sm" ? "is-sm" : t.size === "lg" ? "is-lg" : "is-md", H = (t) => t.kind === "chip" ? "is-chip" : t.kind === "outline" ? "is-outline" : t.kind === "ghost" ? "is-ghost" : t.kind === "soft" ? "is-soft" : t.kind === "plain" ? "is-plain" : "is-solid", M = (t) => t.tone === "primary" ? "is-primary" : t.tone === "secondary" ? "is-secondary" : t.tone === "tertiary" ? "is-tertiary" : t.tone === "success" ? "is-success" : t.tone === "warning" ? "is-warning" : t.tone === "danger" ? "is-error" : "is-neutral", U = S(
  (t) => {
    const a = t.type || "button", d = q(), { internals: r, isFormDisabled: p } = L({
      value: null,
      isDisabled: t.isDisabled,
      onReset: () => {
      }
    }), h = t.isDisabled || p, y = () => {
      const e = r == null ? void 0 : r.form;
      if (!e) return;
      if (a === "reset") {
        e.reset();
        return;
      }
      if (a !== "submit") return;
      const n = !!t.name;
      n && r.setFormValue(t.value ?? "");
      try {
        e.requestSubmit();
      } finally {
        n && r.setFormValue(null);
      }
    }, w = H(t), x = M(t), k = W(t), z = h || t.isLoading, l = I(), b = N();
    f(() => {
      const e = l.current, n = () => {
        const i = b.current;
        if (i)
          for (const u of v) {
            const g = e.getAttribute(u);
            g === null ? i.removeAttribute(u) : i.setAttribute(u, g);
          }
      }, c = new MutationObserver(n);
      return c.observe(e, { attributes: !0, attributeFilter: v }), n(), () => c.disconnect();
    }, []), f(() => {
      var i;
      if (!t.isIcon) return;
      const e = l.current, n = !!t.label || !!((i = e.textContent) != null && i.trim());
      O(e) || n || R(e, "icon-name", "z-button: an is-icon button has no accessible name. Add aria-label or aria-labelledby.");
    }, [t.isIcon, t.label, d]);
    const A = l.current, C = !t.label && Array.from(A.children).some((e) => !e.getAttribute("slot")), T = !t.isIcon && !C, m = t.kind === "chip" && !t.isIcon, B = T ? "label is-text" : "label", F = [w, x, k].concat(t.isIcon ? ["is-icon"] : []).concat(t.isLoading ? ["is-loading"] : []).concat(h ? ["is-disabled"] : []).concat(t.isFullWidth ? ["is-full-width"] : []).join(" ");
    return /* @__PURE__ */ o("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ j("button", { ref: b, class: F, type: a, disabled: z, "aria-busy": t.isLoading ? "true" : void 0, "aria-label": d, onclick: y, children: [
      t.isLoading && /* @__PURE__ */ o("span", { class: "spinner", "aria-hidden": "true" }),
      m && /* @__PURE__ */ o("slot", { class: "chip-icon", name: "leading-icon", "aria-hidden": "true" }),
      /* @__PURE__ */ o("span", { class: B, children: t.label ? t.label : /* @__PURE__ */ o("slot", {}) }),
      m && /* @__PURE__ */ o("svg", { class: "chevron", viewBox: "0 0 12 12", "aria-hidden": "true", fill: "none", stroke: "currentColor", "stroke-width": "1.25", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ o("path", { d: "m3 4.5 3 3 3-3" }) })
    ] }) });
  },
  {
    props: {
      size: { type: s("xs", "sm", "md", "lg"), reflect: !0 },
      kind: { type: s("solid", "outline", "ghost", "soft", "plain", "chip"), reflect: !0 },
      tone: { type: s("neutral", "primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isIcon: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isLoading: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      label: String,
      type: s("button", "submit", "reset"),
      name: { type: String, reflect: !0 },
      value: String
    },
    styles: [V, E],
    form: !0
  }
);
P("z-button", U);
export {
  U as ZButton
};
