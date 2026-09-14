import { c, a as h, f as d, b as u, g as f, j as a, d as p } from "../chunks/define-element-BWC3wEPr.js";
import { u as g } from "../chunks/hooks-D9_x-ckD.js";
const b = c`
	:host {
		display: flex;
		align-items: center;
		width: 100%;
		color: var(--muted-foreground);
		gap: var(--space-base);
	}

	:host([is-hidden]) {
		display: none;
	}

	/* Vertical carries no label, so the host collapses to the rule itself
	   rather than a flex line with something to split around. It needs a parent
	   with a resolvable height — in a flex row with stretched items it fills
	   naturally, in a block container it collapses to nothing. */
	:host([vertical]) {
		display: block;
		flex-shrink: 0;
		align-self: stretch;
		width: 1px;
		height: auto;
		background: var(--border);
	}

	.rule {
		flex: 1 1 auto;
		background: var(--border);
		height: 1px;
	}

	:host([vertical]) .rule,
	:host([vertical]) .label {
		display: none;
	}

	.label {
		flex: 0 0 auto;
		font-family: inherit;
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		white-space: nowrap;
		color: var(--muted-foreground);
		line-height: 1;
		user-select: none;
	}

	/* When there's no label, collapse to a single full-width rule. */
	:host(:not([data-labeled])) .label,
	:host(:not([data-labeled])) .rule.is-trailing {
		display: none;
	}
`, v = h(
  (e) => {
    const s = d(), [r, o] = g(!1);
    u(() => {
      const t = s.current;
      if (!t) return;
      const l = () => o(t.assignedNodes().length > 0);
      return l(), t.addEventListener("slotchange", l), () => t.removeEventListener("slotchange", l);
    }, []);
    const n = !e.vertical && (!!e.label || r), i = e.vertical ? "vertical" : "horizontal";
    return /* @__PURE__ */ f(
      "host",
      {
        shadowDom: !0,
        role: "separator",
        "aria-orientation": i,
        "data-labeled": n ? "" : null,
        children: [
          /* @__PURE__ */ a("span", { class: "rule", "aria-hidden": "true" }),
          /* @__PURE__ */ a("span", { class: "label", children: e.label ? e.label : /* @__PURE__ */ a("slot", { ref: s }) }),
          /* @__PURE__ */ a("span", { class: "rule is-trailing", "aria-hidden": "true" })
        ]
      }
    );
  },
  {
    props: {
      isHidden: { type: Boolean, reflect: !0 },
      vertical: { type: Boolean, reflect: !0 },
      label: String
    },
    styles: b
  }
);
p("z-separator", v);
export {
  v as ZSeparator
};
