import { c as x, a as C, e as z, u as w, f as c, g as d, j as t } from "../chunks/define-element-BZUk-KLk.js";
import { i as S } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as B, d as D } from "../chunks/form-control-D_UwalCr.js";
import { s as j, d as I, u as R, a as F, r as q } from "../chunks/accessible-NC1hpH4S.js";
import { u as h } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as u } from "../chunks/prop-types-B3Bpi956.js";
const P = x`
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
		border-color: color-mix(in oklch, var(--foreground) 40%, transparent);
	}

	.box.is-checked,
	.box.is-indeterminate {
		background: var(--accent);
		border-color: var(--accent);
	}

	.dash {
		width: 60%;
		height: 2px;
		border-radius: 1px;
		background: var(--primary-foreground);
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
		outline: 3px solid var(--focus-ring);
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
    const m = R(e.label), a = c(), [r, o] = h("isChecked"), [i, b] = h("isIndeterminate"), f = c(!!r), { isFormDisabled: v } = B({
      value: r ? e.value ?? "on" : null,
      isDisabled: e.isDisabled,
      control: a,
      onReset: () => o(f.current),
      onRestore: (s) => o(s != null && s !== "")
    }), n = e.isDisabled || v, g = ["label", H(e)].concat(n ? ["is-disabled"] : []).join(" "), y = ["box", i ? "is-indeterminate" : r && !i ? "is-checked" : ""].join(" ").trim(), p = i ? "mixed" : r ? "true" : "false", k = i ? /* @__PURE__ */ t("span", { class: "dash" }) : /* @__PURE__ */ t("svg", { class: "check", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("polyline", { points: "4 12 10 18 20 6" }) });
    return /* @__PURE__ */ d("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ d("label", { class: g, children: [
        /* @__PURE__ */ t(
          "input",
          {
            ref: a,
            type: "checkbox",
            checked: r,
            value: e.value,
            disabled: n,
            required: e.isRequired,
            "aria-label": m,
            "aria-describedby": F(e.description, e.error),
            "aria-invalid": e.error ? "true" : void 0,
            indeterminate: !!i,
            "aria-checked": p,
            onchange: (s) => {
              s.stopPropagation();
              const l = !r;
              b(!1), o(l), e.change({ checked: l, value: e.value });
            }
          }
        ),
        /* @__PURE__ */ t("span", { class: y, "aria-hidden": "true", children: k }),
        /* @__PURE__ */ t("slot", { children: e.label })
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
