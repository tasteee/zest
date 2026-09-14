import { c as l, a as d, e as a, j as r, g as c, d as u } from "../chunks/define-element-BWC3wEPr.js";
const b = l`
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
	.badge.is-dom {
		--tone: var(--purple);
	}
	.badge.is-sub {
		--tone: var(--pink);
	}
	.badge.is-neutral {
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
		color: color-mix(in oklch, var(--tone) 80%, white);
	}
	.badge.is-solid {
		--emissive-color: var(--tone);
		background: var(--material-tone), var(--tone);
		box-shadow: var(--emissive-tone);
		color: var(--primary-foreground);
	}
	/* purple/pink fills are light enough that dark text muddies; use neutral-8. */
	.badge.is-solid.is-dom,
	.badge.is-solid.is-sub {
		color: var(--color-neutral-8);
	}
	.badge.is-outline {
		background: transparent;
		/* srgb, not oklch: --border carries a faint green hue, and interpolating
		   hue against it in oklch drags the tone around the wheel (purple → blue). */
		border-color: color-mix(in srgb, var(--tone) 45%, var(--border));
		color: var(--tone);
	}
	.badge.is-neutral.is-outline {
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

	.is-solid.is-dom .label,
	.is-solid.is-sub .label {
		text-shadow: 0 0px 18px var(--primary-foreground);
	}

	/* ── interactive states (opt-in via selectable / selected) ─────────────── */

	.badge.is-clickable {
		cursor: pointer;
		transition:
			border-color 0.12s ease,
			background-color 0.12s ease,
			color 0.12s ease;
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
	.badge.is-neutral.is-selected {
		color: var(--foreground);
	}

	.badge.is-disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.badge:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	/* ── remove affordance (removable) ──────────────────────────────────────── */

	.remove {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		margin-right: -0.25rem;
		border: none;
		border-radius: 999px;
		background: transparent;
		color: currentColor;
		cursor: pointer;
		padding: 0;
		opacity: 0.6;
		transition:
			opacity 0.12s ease,
			background-color 0.12s ease;
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
		margin-left: -0.125rem;
		margin-right: -0.125rem;
	}

	::slotted(svg) {
		width: 0.875em;
		height: 0.875em;
	}
	::slotted(img) {
		width: 1.125rem;
		height: 1.125rem;
		border-radius: 999px;
		margin-left: -0.25rem;
		object-fit: cover;
	}
`, g = (e) => e.accent === "dom" ? "is-dom" : e.accent === "sub" ? "is-sub" : e.accent === "success" ? "is-success" : e.accent === "warning" ? "is-warning" : e.accent === "error" ? "is-error" : "is-neutral", m = (e) => e.kind === "solid" ? "is-solid" : e.kind === "outline" ? "is-outline" : "is-soft", v = d(
  (e) => {
    const n = e.size === "sm" ? "is-sm" : "is-md", o = e.selectable && !e.isDisabled, s = [
      "badge",
      g(e),
      e.isDot ? "is-dot" : m(e),
      n
    ].concat(o ? ["is-clickable"] : []).concat(e.isSelected ? ["is-selected"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" "), i = () => {
      o && e.select({ value: e.value, selected: !e.isSelected });
    };
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ c(
      "span",
      {
        class: s,
        tabindex: o ? 0 : void 0,
        role: e.selectable ? "button" : void 0,
        "aria-pressed": e.selectable ? e.isSelected ? "true" : "false" : void 0,
        onclick: i,
        onkeydown: (t) => {
          o && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), i());
        },
        children: [
          e.isDot && /* @__PURE__ */ r("span", { class: "dot", "aria-hidden": "true" }),
          /* @__PURE__ */ r("slot", { name: "prefix" }),
          /* @__PURE__ */ r("span", { class: "label", children: e.label ? e.label : /* @__PURE__ */ r("slot", {}) }),
          e.removable && /* @__PURE__ */ r(
            "button",
            {
              class: "remove",
              type: "button",
              "aria-label": "Remove",
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
      accent: { type: String, reflect: !0 },
      kind: { type: String, reflect: !0 },
      size: { type: String, reflect: !0 },
      label: String,
      value: String,
      isDot: { type: Boolean, reflect: !0 },
      selectable: { type: Boolean, reflect: !0 },
      isSelected: { type: Boolean, reflect: !0 },
      removable: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: a({ bubbles: !0, composed: !0 }),
      remove: a({ bubbles: !0, composed: !0 })
    },
    styles: b
  }
);
u("z-badge", v);
export {
  v as ZBadge
};
