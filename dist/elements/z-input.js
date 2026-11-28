// @ts-self-types="./z-input.d.ts"
import { c as x, a as w, e as f, u as z, f as s, g as m, j as r } from "../chunks/define-element-BZUk-KLk.js";
import { i as k } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as R, d as S } from "../chunks/form-control-B69z9f8A.js";
import { s as B, d as D, u as F, a as O, b as I } from "../chunks/accessible-D6muJfYC.js";
import { u as h } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as l } from "../chunks/prop-types-CSJu2W-0.js";
const j = x`
	.field:focus-within { outline: 1px solid var(--border-focus); outline-offset: -1px; }

	:host {
		display: inline-flex;
		width: 100%;
		min-width: 0;
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
		min-width: 0;
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
`, P = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", q = w(
  (e) => {
    z();
    const p = F(e.label), d = s(), [n, a] = h("value"), b = s(n ?? ""), o = s(n ?? ""), [v, c] = h("isFocused"), { isFormDisabled: y } = R({
      value: n ?? "",
      isDisabled: e.isDisabled,
      isReadOnly: e.isReadOnly,
      control: d,
      submitsOnEnter: !0,
      onReset: () => a(b.current),
      onRestore: (t) => {
        typeof t == "string" && a(t);
      }
    }), u = e.isDisabled || y, g = ["field", P(e)].concat(v ? ["is-focused"] : []).concat(e.isInvalid ? ["is-invalid"] : []).concat(u ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ m("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ m("label", { class: g, children: [
        /* @__PURE__ */ r("span", { class: "adornment", children: /* @__PURE__ */ r("slot", { name: "prefix" }) }),
        /* @__PURE__ */ r(
          "input",
          {
            ref: d,
            type: e.type || "text",
            value: n ?? "",
            placeholder: e.placeholder,
            disabled: u,
            readonly: e.isReadOnly ? !0 : void 0,
            required: e.isRequired,
            autocomplete: e.autocomplete,
            inputmode: e.inputmode,
            "aria-label": p,
            "aria-describedby": O(e.description, e.error),
            "aria-invalid": e.isInvalid || e.error ? "true" : void 0,
            onfocus: () => {
              o.current = n ?? "", c(!0);
            },
            onblur: (t) => {
              c(!1);
              const i = t.target.value;
              i !== o.current && (o.current = i, e.change({ value: i }));
            },
            onchange: (t) => t.stopPropagation(),
            oninput: (t) => {
              t.stopPropagation();
              const i = t.target.value;
              a(i), e.input({ value: i });
            }
          }
        ),
        /* @__PURE__ */ r("span", { class: "adornment", children: /* @__PURE__ */ r("slot", { name: "suffix" }) })
      ] }),
      I(e.description, e.error)
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
      isReadOnly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isInline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: f({ bubbles: !0, composed: !0 }),
      change: f({ bubbles: !0, composed: !0 })
    },
    styles: [j, k, B],
    form: !0
  }
);
S("z-input", q);
export {
  q as ZInput
};
