import { c, a as b, e as n, j as r, g as u, d as m } from "../chunks/define-element-BZUk-KLk.js";
import { i as g } from "../chunks/interaction-styles-XiKFAbWA.js";
import { o as i } from "../chunks/prop-types-B3Bpi956.js";
import { u as v } from "../chunks/locale-DUDaH1Ni.js";
const f = c`
	:host {
		display: inline-flex;
		vertical-align: middle;
		user-select: none;
		-webkit-user-select: none;
	}

	:host([is-hidden]) {
		display: none;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-family: inherit;
		font-weight: 600;
		line-height: 1;
		white-space: nowrap;
		border: 1px solid transparent;
		border-radius: 999px;
		--tone: var(--color-neutral-7);
	}

	/* tones set --tone */
	.badge.is-secondary {
		--tone: var(--purple);
	}
	.badge.is-tertiary {
		--tone: var(--pink);
	}
	.badge.is-primary {
		--tone: var(--color-neutral-7);
	}
	.badge.is-success {
		--tone: var(--success);
	}
	.badge.is-warning {
		--tone: var(--warning);
	}
	.badge.is-error {
		--tone: var(--destructive);
	}

	/* sizes */
	.badge.is-sm {
		font-size: 0.6875rem;
		padding: 0.25rem 0.5rem;
		letter-spacing: 0.01em;
	}
	.badge.is-md {
		font-size: 0.75rem;
		padding: 0.3125rem 0.625rem;
	}

	/* kinds */
	.badge.is-soft {
		background: color-mix(in oklch, var(--tone) 18%, transparent);
		color: color-mix(in oklab, var(--tone) 70%, var(--foreground));
	}
	.badge.is-solid {
		--emissive-color: var(--tone);
		background: var(--material-tone), var(--tone);
		box-shadow: var(--emissive-tone);
		color: var(--on-accent);
	}
	.badge.is-solid.is-primary { color: var(--primary-foreground); }

	.badge.is-outline {
		background: transparent;
		/* srgb, not oklch: --border carries a faint green hue, and interpolating
		   hue against it in oklch drags the tone around the wheel (purple → blue). */
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border));
		color: var(--tone);
	}
	.badge.is-primary.is-outline {
		color: var(--muted-foreground);
		border-color: var(--border);
	}

	/* inline status: dot + uppercase tracked text */
	.badge.is-dot {
		background: transparent;
		border-color: transparent;
		padding: 0.25rem 0.375rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 0.6875rem;
		color: var(--tone);
		gap: 0.375rem;
	}
	.dot {
		width: 0.4375rem;
		height: 0.4375rem;
		border-radius: 999px;
		background: var(--tone);
		flex-shrink: 0;
	}


	/* ── interactive states (opt-in via selectable / selected) ─────────────── */

	.badge.is-clickable {
		cursor: pointer;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
	}
	.badge.is-clickable:hover {
		border-color: color-mix(in srgb, var(--tone) 55%, var(--border));
	}

	/* Selected wins over the resting kind: a toned tint + border regardless of
	   whether the badge started soft/solid/outline. */
	.badge.is-selected {
		background: color-mix(in oklch, var(--tone) 16%, transparent);
		border-color: color-mix(in oklch, var(--tone) 50%, transparent);
		color: color-mix(in oklch, var(--tone) 85%, white);
	}
	.badge.is-primary.is-selected {
		color: var(--foreground);
	}

	.badge.is-disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.badge:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}

	/* ── remove affordance (removable) ──────────────────────────────────────── */

	.remove {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		margin-inline-end: -0.25rem;
		border: none;
		border-radius: 999px;
		background: transparent;
		color: currentColor;
		cursor: pointer;
		padding: 0;
		opacity: 0.6;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}
	.remove:hover {
		opacity: 1;
		background: color-mix(in oklch, var(--foreground) 18%, transparent);
	}
	.remove svg {
		width: 0.625rem;
		height: 0.625rem;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		fill: none;
	}
	.badge.is-dot .remove {
		margin-inline-start: -0.125rem;
		margin-inline-end: -0.125rem;
	}

	::slotted(svg) {
		width: 0.875em;
		height: 0.875em;
	}
	::slotted(img) {
		width: 1.125rem;
		height: 1.125rem;
		border-radius: 999px;
		margin-inline-start: -0.25rem;
		object-fit: cover;
	}
`, h = (e) => e.tone === "secondary" ? "is-secondary" : e.tone === "tertiary" ? "is-tertiary" : e.tone === "success" ? "is-success" : e.tone === "warning" ? "is-warning" : e.tone === "danger" ? "is-error" : "is-primary", y = (e) => e.kind === "solid" ? "is-solid" : e.kind === "outline" ? "is-outline" : "is-soft", k = b(
  (e) => {
    const s = v(), l = e.size === "sm" ? "is-sm" : "is-md", o = e.isSelectable && !e.isDisabled, d = [
      "badge",
      h(e),
      e.isDot ? "is-dot" : y(e),
      l
    ].concat(o ? ["is-clickable"] : []).concat(e.isSelected ? ["is-selected"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" "), a = () => {
      o && e.select({ value: e.value, selected: !e.isSelected });
    };
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ u(
      "span",
      {
        class: d,
        tabindex: o ? 0 : void 0,
        role: e.isSelectable ? "button" : void 0,
        "aria-pressed": e.isSelectable ? e.isSelected ? "true" : "false" : void 0,
        onclick: a,
        onkeydown: (t) => {
          o && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), a());
        },
        children: [
          e.isDot && /* @__PURE__ */ r("span", { class: "dot", "aria-hidden": "true" }),
          /* @__PURE__ */ r("slot", { name: "prefix" }),
          /* @__PURE__ */ r("span", { class: "label", children: e.label ? e.label : /* @__PURE__ */ r("slot", {}) }),
          e.isRemovable && /* @__PURE__ */ r(
            "button",
            {
              class: "remove",
              type: "button",
              "aria-label": s("remove"),
              onclick: (t) => {
                t.stopPropagation(), e.remove({ value: e.value });
              },
              children: /* @__PURE__ */ r("svg", { viewBox: "0 0 12 12", children: /* @__PURE__ */ r("path", { d: "M3 3l6 6M9 3l-6 6" }) })
            }
          )
        ]
      }
    ) });
  },
  {
    props: {
      tone: { type: i("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      kind: { type: i("soft", "solid", "outline"), reflect: !0 },
      size: { type: i("sm", "md"), reflect: !0 },
      label: String,
      value: String,
      isDot: { type: Boolean, reflect: !0 },
      isSelectable: { type: Boolean, reflect: !0 },
      isSelected: { type: Boolean, reflect: !0 },
      isRemovable: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: n({ bubbles: !0, composed: !0 }),
      remove: n({ bubbles: !0, composed: !0 })
    },
    styles: [f, g]
  }
);
m("z-badge", k);
export {
  k as ZBadge
};
