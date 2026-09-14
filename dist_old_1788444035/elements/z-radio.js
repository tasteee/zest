import { c as o, a as l, e as c, j as r, g as d, d as u } from "../chunks/define-element-BWC3wEPr.js";
import { u as h } from "../chunks/use-prop-DBBKVpkc.js";
const p = o`
	:host {
		display: flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		cursor: pointer;
		font-family: inherit;
		font-size: var(--font-size-small);
		color: var(--foreground);
		user-select: none;
		--accent: var(--z-radio-group-accent, var(--primary));
	}

	:host([accent='dom']) label {
		--accent: var(--purple);
	}

	:host([accent='sub']) label {
		--accent: var(--pink);
	}

	label.is-disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.ring {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: transparent;
		transition: border-color 0.077s ease;
	}

	label:hover .ring {
		border-color: color-mix(in oklch, var(--foreground) 40%, transparent);
	}

	.ring.is-checked {
		border-color: var(--accent);
	}

	.dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: var(--accent);
		transform: scale(0);
		transition: transform 0.077s var(--easing-standard, ease-out);
	}

	.ring.is-checked .dot {
		transform: scale(1);
	}

	input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
	}

	input:focus-visible + .ring {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}
`, b = l(
  (e) => {
    const [a, t] = h("isChecked"), s = ["label"].concat(e.isDisabled ? ["is-disabled"] : []).join(" "), i = ["ring"].concat(a ? ["is-checked"] : []).join(" ");
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ d("label", { class: s, children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "radio",
          checked: a,
          disabled: e.isDisabled,
          value: e.value,
          "aria-checked": a ? "true" : "false",
          onchange: (n) => {
            n.stopPropagation(), t(!0), e.select({ value: e.value });
          }
        }
      ),
      /* @__PURE__ */ r("span", { class: i, "aria-hidden": "true", children: /* @__PURE__ */ r("span", { class: "dot" }) }),
      /* @__PURE__ */ r("slot", {})
    ] }) });
  },
  {
    props: {
      isChecked: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      accent: { type: String, reflect: !0 },
      value: String,
      select: c({ bubbles: !0, composed: !0 })
    },
    styles: p
  }
);
u("z-radio", b);
export {
  b as ZRadio
};
