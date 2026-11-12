// @ts-self-types="./z-radio.d.ts"
import { c, a as d, e as u, u as h, j as r, g as b, d as p } from "../chunks/define-element-BZUk-KLk.js";
import { i as f } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as m } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as v } from "../chunks/prop-types-B3Bpi956.js";
const y = c`
	:host {
		display: flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2-5);
		cursor: pointer;
		font-family: inherit;
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		user-select: none;
		--tone: var(--z-radio-group-accent, var(--accent-primary));
	}

	:host([tone='secondary']) label {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) label {
		--tone: var(--accent-tertiary);
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
		border: 1px solid var(--border-default);
		border-radius: var(--radius-full);
		background: transparent;
		transition: border-color var(--motion-instant) var(--ease-enter);
	}

	label:hover .ring {
		border-color: color-mix(in oklch, var(--text-primary) 40%, transparent);
	}

	.ring.is-checked {
		border-color: var(--tone);
	}

	.dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: var(--radius-full);
		background: var(--tone);
		transform: scale(0);
		transition: transform var(--motion-instant) var(--ease-enter);
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
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
`, g = d(
  (e) => {
    var a;
    const i = h(), [t, s] = m("isChecked"), o = ["label"].concat(e.isDisabled ? ["is-disabled"] : []).join(" "), n = ["ring"].concat(t ? ["is-checked"] : []).join(" ");
    return /* @__PURE__ */ r("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ b("label", { class: o, children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "radio",
          checked: t,
          disabled: e.isDisabled,
          value: e.value,
          "aria-label": e.label || ((a = i.current) == null ? void 0 : a.getAttribute("aria-label")) || void 0,
          "aria-checked": t ? "true" : "false",
          onchange: (l) => {
            l.stopPropagation(), s(!0), e.select({ value: e.value });
          }
        }
      ),
      /* @__PURE__ */ r("span", { class: n, "aria-hidden": "true", children: /* @__PURE__ */ r("span", { class: "dot" }) }),
      /* @__PURE__ */ r("slot", {})
    ] }) });
  },
  {
    props: {
      isChecked: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      tone: { type: v("primary", "secondary", "tertiary"), reflect: !0 },
      value: String,
      label: String,
      select: u({ bubbles: !0, composed: !0 })
    },
    styles: [y, f]
  }
);
p("z-radio", g);
export {
  g as ZRadio
};
