import { c as x, a as k, e as f, u as z, f as s, g as m, j as n } from "../chunks/define-element-BZUk-KLk.js";
import { i as w } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as R, d as B } from "../chunks/form-control-D_UwalCr.js";
import { s as S, d as D, u as F, a as I, r as j } from "../chunks/accessible-NC1hpH4S.js";
import { u as h } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as l } from "../chunks/prop-types-B3Bpi956.js";
const P = x`
	.field:focus-within { outline: 2px solid var(--focus-ring); outline-offset: 2px; }

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
		gap: 0.625rem;
		width: 100%;
		box-sizing: border-box;
		/* A field is a hole cut into the surface, so it takes the carved stack
		   rather than a raised one. Both are inert in the flat themes. */
		background: var(--material-surface);
		box-shadow: var(--elevation-carved);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		color: var(--foreground);
		font-family: inherit;
		/* a <label> wrapper: clicking the padding or empty adornments focuses the
		   input natively, so there are no dead zones on the sides. */
		cursor: text;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
		--accent: var(--primary);
	}

	:host([tone='secondary']) .field {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) .field {
		--accent: var(--pink);
	}

	/* sizes */
	.field.is-sm {
		height: var(--control-height-sm);
		padding-inline: 0.625rem;
		font-size: var(--control-font-size-sm);
	}
	.field.is-md {
		height: var(--control-height-md);
		padding-inline: 0.75rem;
		font-size: var(--control-font-size-md);
	}
	.field.is-lg {
		height: var(--control-height-lg);
		padding-inline: 0.875rem;
		font-size: var(--control-font-size-lg);
	}

	.field:hover {
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.field.is-focused {
		border-color: var(--accent);
		background: color-mix(in oklch, var(--accent) 5%, transparent);
	}

	.field.is-invalid {
		border-color: var(--destructive);
		--accent: var(--destructive);
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
		line-height: 1;
		padding: 0;
	}

	input::placeholder {
		color: var(--muted-foreground);
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
		color: var(--muted-foreground);
		flex-shrink: 0;
	}

	.field.is-focused .adornment {
		color: var(--accent);
	}

	::slotted(svg) {
		width: 1.125em;
		height: 1.125em;
	}
`, q = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", C = k(
  (e) => {
    z();
    const p = F(e.label), c = s(), [r, o] = h("value"), v = s(r ?? ""), a = s(r ?? ""), [b, d] = h("isFocused"), { isFormDisabled: g } = R({
      value: r ?? "",
      isDisabled: e.isDisabled,
      isReadonly: e.isReadonly,
      control: c,
      submitsOnEnter: !0,
      onReset: () => o(v.current),
      onRestore: (t) => {
        typeof t == "string" && o(t);
      }
    }), u = e.isDisabled || g, y = ["field", q(e)].concat(b ? ["is-focused"] : []).concat(e.isInvalid ? ["is-invalid"] : []).concat(u ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ m("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ m("label", { class: y, children: [
        /* @__PURE__ */ n("span", { class: "adornment", children: /* @__PURE__ */ n("slot", { name: "prefix" }) }),
        /* @__PURE__ */ n(
          "input",
          {
            ref: c,
            type: e.type || "text",
            value: r ?? "",
            placeholder: e.placeholder,
            disabled: u,
            readonly: e.isReadonly,
            required: e.isRequired,
            autocomplete: e.autocomplete,
            inputmode: e.inputmode,
            "aria-label": p,
            "aria-describedby": I(e.description, e.error),
            "aria-invalid": e.isInvalid || e.error ? "true" : void 0,
            onfocus: () => {
              a.current = r ?? "", d(!0);
            },
            onblur: (t) => {
              d(!1);
              const i = t.target.value;
              i !== a.current && (a.current = i, e.change({ value: i }));
            },
            onchange: (t) => t.stopPropagation(),
            oninput: (t) => {
              t.stopPropagation();
              const i = t.target.value;
              o(i), e.input({ value: i });
            }
          }
        ),
        /* @__PURE__ */ n("span", { class: "adornment", children: /* @__PURE__ */ n("slot", { name: "suffix" }) })
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
    styles: [P, w, S],
    form: !0
  }
);
B("z-input", C);
export {
  C as ZInput
};
