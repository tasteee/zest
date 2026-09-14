import { c as f, a as m, e as o, u as p, j as t, g as v, d as g } from "../chunks/define-element-BWC3wEPr.js";
import { u as l } from "../chunks/use-prop-DBBKVpkc.js";
const b = f`
	:host {
		display: inline-flex;
		width: 100%;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([inline]) {
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
			border-color 0.12s ease,
			background-color 0.12s ease;
		--accent: var(--primary);
	}

	:host([accent='dom']) .field {
		--accent: var(--purple);
	}

	:host([accent='sub']) .field {
		--accent: var(--pink);
	}

	/* sizes */
	.field.is-sm {
		height: var(--control-height-sm);
		padding-inline: 0.625rem;
		font-size: var(--font-size-small);
	}
	.field.is-md {
		height: var(--control-height-md);
		padding-inline: 0.75rem;
		font-size: var(--font-size-body);
	}
	.field.is-lg {
		height: var(--control-height-lg);
		padding-inline: 0.875rem;
		font-size: var(--font-size-h4);
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
		opacity: 0.55;
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
`, y = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", x = m(
  (e) => {
    var r;
    const s = p(), [i, d] = l("value"), [c, n] = l("isFocused"), u = ["field", y(e)].concat(c ? ["is-focused"] : []).concat(e.isInvalid ? ["is-invalid"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ v("label", { class: u, children: [
      /* @__PURE__ */ t("span", { class: "adornment", children: /* @__PURE__ */ t("slot", { name: "prefix" }) }),
      /* @__PURE__ */ t(
        "input",
        {
          type: e.type || "text",
          value: i ?? "",
          placeholder: e.placeholder,
          name: e.name,
          disabled: e.isDisabled,
          readonly: e.isReadonly,
          required: e.isRequired,
          autocomplete: e.autocomplete,
          inputmode: e.inputmode,
          "aria-invalid": e.isInvalid ? "true" : void 0,
          "aria-label": e.label || ((r = s.current) == null ? void 0 : r.getAttribute("aria-label")) || void 0,
          onfocus: () => n(!0),
          onblur: () => {
            n(!1), e.change({ value: i ?? "" });
          },
          oninput: (h) => {
            const a = h.target.value;
            d(a), e.input({ value: a });
          }
        }
      ),
      /* @__PURE__ */ t("span", { class: "adornment", children: /* @__PURE__ */ t("slot", { name: "suffix" }) })
    ] }) });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      type: String,
      placeholder: String,
      name: String,
      autocomplete: String,
      inputmode: String,
      size: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isFocused: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      inline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: o({ bubbles: !0, composed: !0 }),
      change: o({ bubbles: !0, composed: !0 })
    },
    styles: b
  }
);
g("z-input", x);
export {
  x as ZInput
};
