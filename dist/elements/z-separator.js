// @ts-self-types="./z-separator.d.ts"
import { c, a as h, f as d, b as u, g as f, j as a, d as p } from "../chunks/define-element-BZUk-KLk.js";
import { u as g } from "../chunks/hooks-DEFT8qqt.js";
const b = c`
	:host {
		display: flex;
		align-items: center;
		width: 100%;
		color: var(--text-secondary);
		gap: var(--space-4);
	}

	:host([is-hidden]) {
		display: none;
	}

	/* Vertical carries no label, so the host collapses to the rule itself
	   rather than a flex line with something to split around. It needs a parent
	   with a resolvable height — in a flex row with stretched items it fills
	   naturally, in a block container it collapses to nothing. */
	:host([is-vertical]) {
		display: block;
		flex-shrink: 0;
		align-self: stretch;
		width: 1px;
		height: auto;
		background: var(--border-default);
	}

	.rule {
		flex: 1 1 auto;
		background: var(--border-default);
		height: 1px;
	}

	:host([is-vertical]) .rule,
	:host([is-vertical]) .label {
		display: none;
	}

	.label {
		flex: 0 0 auto;
		font-family: inherit;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		white-space: nowrap;
		color: var(--text-secondary);
		line-height: var(--line-height-none);
		user-select: none;
	}

	/* When there's no label, collapse to a single full-width rule. */
	:host(:not([data-labeled])) .label,
	:host(:not([data-labeled])) .rule.is-trailing {
		display: none;
	}
`, v = h(
  (e) => {
    const s = d(), [r, i] = g(!1);
    u(() => {
      const t = s.current;
      if (!t) return;
      const l = () => i(t.assignedNodes().length > 0);
      return l(), t.addEventListener("slotchange", l), () => t.removeEventListener("slotchange", l);
    }, []);
    const n = !e.isVertical && (!!e.label || r), o = e.isVertical ? "vertical" : "horizontal";
    return /* @__PURE__ */ f(
      "host",
      {
        shadowDom: !0,
        role: "separator",
        "aria-orientation": o,
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
      isVertical: { type: Boolean, reflect: !0 },
      label: String
    },
    styles: b
  }
);
p("z-separator", v);
export {
  v as ZSeparator
};
