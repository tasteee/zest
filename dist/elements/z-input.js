// @ts-self-types="./z-input.d.ts"
import { c as x, a as z, e as f, u as k, f as s, g as m, j as r } from "../chunks/define-element-BZUk-KLk.js";
import { i as w } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as R, d as S } from "../chunks/form-control-CrK-0rhn.js";
import { s as B, d as D, u as F, a as I, r as j } from "../chunks/accessible-NC1hpH4S.js";
import { u as p } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as l } from "../chunks/prop-types-B3Bpi956.js";
const P = x`
	.field:focus-within { outline: 1px solid var(--border-focus); outline-offset: -1px; }

	:host {
		display: inline-flex;
		width: 100%;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-inline]) {
		width: auto;
	}

	.field {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2-5);
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: inherit;
		/* a <label> wrapper: clicking the padding or empty adornments focuses the
		   input natively, so there are no dead zones on the sides. */
		cursor: text;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) .field {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) .field {
		--tone: var(--accent-tertiary);
	}

	/* sizes */
	.field.is-sm {
		height: var(--control-height-sm);
		padding-inline: var(--space-2-5);
		font-size: var(--font-size-sm);
	}
	.field.is-md {
		height: var(--control-height-md);
		padding-inline: var(--space-3);
		font-size: var(--font-size-sm);
	}
	.field.is-lg {
		height: var(--control-height-lg);
		padding-inline: var(--space-3-5);
		font-size: var(--font-size-md);
	}

	.field:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.field.is-focused {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 5%, transparent);
	}

	.field.is-invalid {
		border-color: var(--status-danger);
		--tone: var(--status-danger);
	}

	.field.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	input {
		flex: 1 1 auto;
		min-width: 0;
		height: 100%;
		appearance: none;
		background: transparent;
		border: none;
		outline: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--line-height-none);
		padding: 0;
	}

	input::placeholder {
		color: var(--text-secondary);
		user-select: none;
		-webkit-user-select: none;
	}

	/* kill the ugly native number spinners / search clear */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		appearance: none;
		margin: 0;
	}
	input[type='search']::-webkit-search-cancel-button {
		appearance: none;
	}

	.adornment {
		display: inline-flex;
		align-items: center;
		color: var(--text-secondary);
		flex-shrink: 0;
	}

	.field.is-focused .adornment {
		color: var(--tone);
	}

	::slotted(svg) {
		width: 1.125em;
		height: 1.125em;
	}
`, q = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", C = z(
  (e) => {
    k();
    const h = F(e.label), d = s(), [i, a] = p("value"), b = s(i ?? ""), o = s(i ?? ""), [v, c] = p("isFocused"), { isFormDisabled: y } = R({
      value: i ?? "",
      isDisabled: e.isDisabled,
      isReadonly: e.isReadonly,
      control: d,
      submitsOnEnter: !0,
      onReset: () => a(b.current),
      onRestore: (t) => {
        typeof t == "string" && a(t);
      }
    }), u = e.isDisabled || y, g = ["field", q(e)].concat(v ? ["is-focused"] : []).concat(e.isInvalid ? ["is-invalid"] : []).concat(u ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ m("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ m("label", { class: g, children: [
        /* @__PURE__ */ r("span", { class: "adornment", children: /* @__PURE__ */ r("slot", { name: "prefix" }) }),
        /* @__PURE__ */ r(
          "input",
          {
            ref: d,
            type: e.type || "text",
            value: i ?? "",
            placeholder: e.placeholder,
            disabled: u,
            readonly: e.isReadonly,
            required: e.isRequired,
            autocomplete: e.autocomplete,
            inputmode: e.inputmode,
            "aria-label": h,
            "aria-describedby": I(e.description, e.error),
            "aria-invalid": e.isInvalid || e.error ? "true" : void 0,
            onfocus: () => {
              o.current = i ?? "", c(!0);
            },
            onblur: (t) => {
              c(!1);
              const n = t.target.value;
              n !== o.current && (o.current = n, e.change({ value: n }));
            },
            onchange: (t) => t.stopPropagation(),
            oninput: (t) => {
              t.stopPropagation();
              const n = t.target.value;
              a(n), e.input({ value: n });
            }
          }
        ),
        /* @__PURE__ */ r("span", { class: "adornment", children: /* @__PURE__ */ r("slot", { name: "suffix" }) })
      ] }),
      j(e.description, e.error)
    ] });
  },
  {
    props: {
      ...D,
      value: { type: String, reflect: !0 },
      label: String,
      type: { type: l("text", "email", "password", "number", "search", "tel", "url") },
      placeholder: String,
      name: { type: String, reflect: !0 },
      autocomplete: String,
      inputmode: String,
      size: { type: l("sm", "md", "lg"), reflect: !0 },
      tone: { type: l("primary", "secondary", "tertiary"), reflect: !0 },
      isFocused: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isInline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: f({ bubbles: !0, composed: !0 }),
      change: f({ bubbles: !0, composed: !0 })
    },
    styles: [P, w, B],
    form: !0
  }
);
S("z-input", C);
export {
  C as ZInput
};
