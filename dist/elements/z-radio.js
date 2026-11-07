import { c, a as d, e as u, u as h, j as r, g as p, d as b } from "../chunks/define-element-BZUk-KLk.js";
import { i as f } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as m } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as g } from "../chunks/prop-types-B3Bpi956.js";
const v = c`
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

	:host([tone='secondary']) label {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) label {
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
		transition: border-color var(--motion-instant) var(--ease-enter);
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
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}
`, y = d(
  (e) => {
    var a;
    const i = h(), [t, s] = m("isChecked"), o = ["label"].concat(e.isDisabled ? ["is-disabled"] : []).join(" "), n = ["ring"].concat(t ? ["is-checked"] : []).join(" ");
    return /* @__PURE__ */ r("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ p("label", { class: o, children: [
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
      tone: { type: g("primary", "secondary", "tertiary"), reflect: !0 },
      value: String,
      label: String,
      select: u({ bubbles: !0, composed: !0 })
    },
    styles: [v, f]
  }
);
b("z-radio", y);
export {
  y as ZRadio
};
