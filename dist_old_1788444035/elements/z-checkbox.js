import { c as l, a as c, e as d, j as i, g as h, d as b } from "../chunks/define-element-BWC3wEPr.js";
import { u } from "../chunks/use-prop-DBBKVpkc.js";
const m = l`
	:host {
		display: inline-flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		min-height: var(--control-height-md);
		cursor: pointer;
		font-family: inherit;
		font-size: var(--font-size-small);
		color: var(--foreground);
		user-select: none;
		-webkit-user-select: none;
		--accent: var(--primary);
	}

	label.is-sm { min-height: var(--control-height-sm); font-size: var(--font-size-caption); }
	label.is-md { font-size: var(--font-size-small); }
	label.is-lg { min-height: var(--control-height-lg); font-size: var(--font-size-body); }

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

	.box {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: transparent;
		transition: border-color 0.12s ease, background-color 0.12s ease;
	}

	label.is-sm .box {
		width: 1rem;
		height: 1rem;
	}
	label.is-lg .box {
		width: 1.375rem;
		height: 1.375rem;
	}

	label:hover .box {
		border-color: color-mix(in oklch, var(--foreground) 40%, transparent);
	}

	.box.is-checked {
		background: var(--accent);
		border-color: var(--accent);
	}

	/* hidden native input drives focus + a11y */
	input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		margin: 0;
	}

	input:focus-visible + .box {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.check {
		width: 70%;
		height: 70%;
		color: var(--primary-foreground);
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
		opacity: 0;
		transform: scale(0.6);
		transition: opacity 0.12s ease, transform 0.12s ease;
	}

	.box.is-checked .check {
		opacity: 1;
		transform: scale(1);
	}

`, f = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", g = c(
  (e) => {
    const [t, o] = u("isChecked"), r = ["label", f(e)].concat(e.isDisabled ? ["is-disabled"] : []).join(" "), n = ["box"].concat(t ? ["is-checked"] : []).join(" ");
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: /* @__PURE__ */ h("label", { class: r, children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "checkbox",
          checked: t,
          name: e.name,
          value: e.value,
          disabled: e.isDisabled,
          "aria-checked": t ? "true" : "false",
          onchange: (a) => {
            a.stopPropagation();
            const s = !t;
            o(s), e.change({ checked: s, value: e.value });
          }
        }
      ),
      /* @__PURE__ */ i("span", { class: n, "aria-hidden": "true", children: /* @__PURE__ */ i("svg", { class: "check", viewBox: "0 0 24 24", children: /* @__PURE__ */ i("polyline", { points: "4 12 10 18 20 6" }) }) }),
      /* @__PURE__ */ i("slot", {})
    ] }) });
  },
  {
    props: {
      isChecked: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      size: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      name: String,
      value: String,
      change: d({ bubbles: !0, composed: !0 })
    },
    styles: m
  }
);
b("z-checkbox", g);
export {
  g as ZCheckbox
};
