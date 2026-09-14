import { c as h, a as v, e as n, u as m, j as t, d as g } from "../chunks/define-element-BWC3wEPr.js";
import { u as l } from "../chunks/use-prop-DBBKVpkc.js";
import { t as y } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const z = h`
	:host {
		display: block;
		width: 100%;
	}

	:host([is-hidden]) {
		display: none;
	}

	.field {
		display: block;
		width: 100%;
		box-sizing: border-box;
		/* Carved into the surface, like z-input. Inert in the flat themes. */
		background: var(--material-surface);
		box-shadow: var(--elevation-carved);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		color: var(--foreground);
		font-family: inherit;
		line-height: 1.6;
		transition: border-color 0.12s ease, background-color 0.12s ease;
		--accent: var(--primary);
	}

	/* sizes — same scale as z-input */
	.field.is-sm {
		padding: 0.5rem 0.75rem;
		font-size: var(--font-size-small);
	}
	.field.is-md {
		padding: 0.75rem 0.875rem;
		font-size: var(--font-size-body);
	}
	.field.is-lg {
		padding: 0.875rem 1rem;
		font-size: var(--font-size-h4);
	}

	:host([accent='dom']) .field {
		--accent: var(--purple);
	}

	:host([accent='sub']) .field {
		--accent: var(--pink);
	}

	textarea {
		display: block;
		width: 100%;
		box-sizing: border-box;
		resize: vertical;
		appearance: none;
		background: transparent;
		border: none;
		outline: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		padding: 0;
		min-height: calc(1.6em * 3);
	}

	textarea.is-auto-resize {
		resize: none;
		overflow: hidden;
	}

	textarea::placeholder {
		color: var(--muted-foreground);
		user-select: none;
		-webkit-user-select: none;
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
`, p = (e) => {
  e.style.height = "auto", e.style.height = `${e.scrollHeight}px`;
}, x = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", k = v(
  (e) => {
    var a;
    const d = m(), [i, c] = l("value"), [u, r] = l("isFocused"), f = ["field", x(e)].concat(u ? ["is-focused"] : []).concat(e.isInvalid ? ["is-invalid"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" "), b = e.isAutoResize ? "is-auto-resize" : "";
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ t("div", { class: f, children: /* @__PURE__ */ t(
      "textarea",
      {
        class: b,
        value: i ?? "",
        placeholder: e.placeholder,
        name: e.name,
        rows: e.rows || 3,
        disabled: e.isDisabled,
        readonly: e.isReadonly,
        required: e.isRequired,
        "aria-invalid": e.isInvalid ? "true" : void 0,
        "aria-label": e.label || ((a = d.current) == null ? void 0 : a.getAttribute("aria-label")) || void 0,
        onfocus: () => r(!0),
        onblur: () => {
          r(!1), e.change({ value: i ?? "" });
        },
        oninput: (o) => {
          const s = o.target.value;
          c(s), e.isAutoResize && p(o.target), e.input({ value: s });
        }
      }
    ) }) });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      placeholder: String,
      name: String,
      rows: Number,
      size: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isFocused: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isAutoResize: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: n({ bubbles: !0, composed: !0 }),
      change: n({ bubbles: !0, composed: !0 })
    },
    styles: [y, z]
  }
);
g("z-textarea", k);
export {
  k as ZTextarea
};
