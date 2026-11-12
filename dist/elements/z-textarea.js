// @ts-self-types="./z-textarea.d.ts"
import { c as k, a as S, e as b, u as A, f as l, b as v, g as B, j as m } from "../chunks/define-element-BZUk-KLk.js";
import { i as D } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as F, d as P } from "../chunks/form-control-CrK-0rhn.js";
import { s as j, d as C, u as I, a as O, r as q } from "../chunks/accessible-NC1hpH4S.js";
import { u as h } from "../chunks/use-prop-C0_HeSQ9.js";
import { t as H } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { o as y } from "../chunks/prop-types-B3Bpi956.js";
const N = k`
	.field:focus-within { outline: 1px solid var(--border-focus); outline-offset: -1px; }

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
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: inherit;
		line-height: var(--line-height-normal);
		transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
		--tone: var(--accent-primary);
	}

	/* sizes — same scale as z-input */
	.field.is-sm {
		padding: var(--space-2) var(--space-3);
		font-size: var(--font-size-sm);
	}
	.field.is-md {
		padding: var(--space-3) var(--space-3-5);
		font-size: var(--font-size-sm);
	}
	.field.is-lg {
		padding: var(--space-3-5) var(--space-4);
		font-size: var(--font-size-md);
	}

	:host([tone='secondary']) .field {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) .field {
		--tone: var(--accent-tertiary);
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
		min-height: 1.6em;
	}

	textarea.is-auto-resize {
		resize: none;
		overflow: hidden;
	}

	textarea::placeholder {
		color: var(--text-secondary);
		user-select: none;
		-webkit-user-select: none;
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
`, c = (e) => {
  e.style.height = "auto", e.style.height = `${e.scrollHeight}px`;
}, V = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", E = S(
  (e) => {
    A();
    const g = I(e.label), s = l(), [i, a] = h("value"), z = l(i ?? ""), o = l(i ?? ""), [x, d] = h("isFocused"), { isFormDisabled: p } = F({
      value: i ?? "",
      isDisabled: e.isDisabled,
      isReadonly: e.isReadonly,
      control: s,
      onReset: () => a(z.current),
      onRestore: (t) => {
        typeof t == "string" && a(t);
      }
    }), u = e.isDisabled || p;
    v(() => {
      const t = s.current;
      t && (e.isAutoResize ? c(t) : t.style.removeProperty("height"));
    }, [i, e.isAutoResize, e.rows, e.size]), v(() => {
      const t = s.current;
      if (!t || !e.isAutoResize || typeof ResizeObserver > "u") return;
      let r = -1;
      const f = new ResizeObserver(([n]) => {
        !n || n.contentRect.width === r || (r = n.contentRect.width, c(t));
      });
      return f.observe(t), () => f.disconnect();
    }, [e.isAutoResize]);
    const R = ["field", V(e)].concat(x ? ["is-focused"] : []).concat(e.isInvalid ? ["is-invalid"] : []).concat(u ? ["is-disabled"] : []).join(" "), w = e.isAutoResize ? "is-auto-resize" : "";
    return /* @__PURE__ */ B("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ m("div", { class: R, children: /* @__PURE__ */ m(
        "textarea",
        {
          ref: s,
          class: w,
          value: i ?? "",
          placeholder: e.placeholder,
          rows: e.rows || 3,
          disabled: u,
          readonly: e.isReadonly,
          required: e.isRequired,
          "aria-label": g,
          "aria-describedby": O(e.description, e.error),
          "aria-invalid": e.isInvalid || e.error ? "true" : void 0,
          onfocus: () => {
            o.current = i ?? "", d(!0);
          },
          onblur: (t) => {
            d(!1);
            const r = t.target.value;
            r !== o.current && (o.current = r, e.change({ value: r }));
          },
          onchange: (t) => t.stopPropagation(),
          oninput: (t) => {
            t.stopPropagation();
            const r = t.target.value;
            a(r), e.isAutoResize && c(t.target), e.input({ value: r });
          }
        }
      ) }),
      q(e.description, e.error)
    ] });
  },
  {
    props: {
      ...C,
      value: { type: String, reflect: !0 },
      label: String,
      placeholder: String,
      name: { type: String, reflect: !0 },
      rows: Number,
      size: { type: y("sm", "md", "lg"), reflect: !0 },
      tone: { type: y("primary", "secondary", "tertiary"), reflect: !0 },
      isFocused: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isAutoResize: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: b({ bubbles: !0, composed: !0 }),
      change: b({ bubbles: !0, composed: !0 })
    },
    styles: [H, N, D, j],
    form: !0
  }
);
P("z-textarea", E);
export {
  E as ZTextarea
};
