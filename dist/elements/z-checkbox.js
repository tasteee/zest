// @ts-self-types="./z-checkbox.d.ts"
import { c as p, a as C, e as z, u as w, f as c, g as d, j as r } from "../chunks/define-element-BZUk-KLk.js";
import { i as S } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as B, d as D } from "../chunks/form-control-CrK-0rhn.js";
import { s as j, d as I, u as R, a as F, r as q } from "../chunks/accessible-NC1hpH4S.js";
import { u as h } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as u } from "../chunks/prop-types-B3Bpi956.js";
const P = p`
	:host {
		display: inline-flex;
	}

	:host([is-hidden]) {
		display: none;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2-5);
		min-height: var(--control-height-md);
		cursor: pointer;
		font-family: inherit;
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		user-select: none;
		-webkit-user-select: none;
		--tone: var(--accent-primary);
	}

	label.is-sm { min-height: var(--control-height-sm); font-size: var(--font-size-xs); }
	label.is-md { font-size: var(--font-size-sm); }
	label.is-lg { min-height: var(--control-height-lg); font-size: var(--font-size-md); }

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

	.box {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-sm);
		background: transparent;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
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
		border-color: color-mix(in oklch, var(--text-primary) 40%, transparent);
	}

	.box.is-checked,
	.box.is-indeterminate {
		background: var(--tone);
		border-color: var(--tone);
	}

	.dash {
		width: 60%;
		height: 2px;
		border-radius: var(--radius-xs);
		background: var(--on-accent);
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
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.check {
		width: 70%;
		height: 70%;
		color: var(--on-accent);
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
		opacity: 0;
		transform: scale(0.6);
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			transform var(--motion-fast) var(--ease-enter);
	}

	.box.is-checked .check {
		opacity: 1;
		transform: scale(1);
	}

`, H = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", N = C(
  (e) => {
    w();
    const m = R(e.label), o = c(), [t, a] = h("isChecked"), [s, b] = h("isIndeterminate"), f = c(!!t), { isFormDisabled: v } = B({
      value: t ? e.value ?? "on" : null,
      isDisabled: e.isDisabled,
      control: o,
      onReset: () => a(f.current),
      onRestore: (i) => a(i != null && i !== "")
    }), n = e.isDisabled || v, y = ["label", H(e)].concat(n ? ["is-disabled"] : []).join(" "), g = ["box", s ? "is-indeterminate" : t && !s ? "is-checked" : ""].join(" ").trim(), x = s ? "mixed" : t ? "true" : "false", k = s ? /* @__PURE__ */ r("span", { class: "dash" }) : /* @__PURE__ */ r("svg", { class: "check", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "4 12 10 18 20 6" }) });
    return /* @__PURE__ */ d("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ d("label", { class: y, children: [
        /* @__PURE__ */ r(
          "input",
          {
            ref: o,
            type: "checkbox",
            checked: t,
            value: e.value,
            disabled: n,
            required: e.isRequired,
            "aria-label": m,
            "aria-describedby": F(e.description, e.error),
            "aria-invalid": e.error ? "true" : void 0,
            indeterminate: !!s,
            "aria-checked": x,
            onchange: (i) => {
              i.stopPropagation();
              const l = !t;
              b(!1), a(l), e.change({ checked: l, value: e.value });
            }
          }
        ),
        /* @__PURE__ */ r("span", { class: g, "aria-hidden": "true", children: k }),
        /* @__PURE__ */ r("slot", { children: e.label })
      ] }),
      q(e.description, e.error)
    ] });
  },
  {
    props: {
      ...I,
      isChecked: { type: Boolean, reflect: !0 },
      isIndeterminate: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      size: { type: u("sm", "md", "lg"), reflect: !0 },
      tone: { type: u("primary", "secondary", "tertiary"), reflect: !0 },
      name: { type: String, reflect: !0 },
      value: String,
      label: String,
      change: z({ bubbles: !0, composed: !0 })
    },
    styles: [P, S, j],
    form: !0
  }
);
D("z-checkbox", N);
export {
  N as ZCheckbox
};
