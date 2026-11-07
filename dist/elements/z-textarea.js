import { c as k, a as S, e as m, u as A, f as l, b, g as B, j as v } from "../chunks/define-element-BZUk-KLk.js";
import { i as D } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as F, d as C } from "../chunks/form-control-D_UwalCr.js";
import { s as I, d as P, u as j, a as O, r as q } from "../chunks/accessible-NC1hpH4S.js";
import { u as h } from "../chunks/use-prop-C0_HeSQ9.js";
import { t as H } from "../chunks/scrollbar-styles-Csqxxw2V.js";
import { o as y } from "../chunks/prop-types-B3Bpi956.js";
const N = k`
	.field:focus-within { outline: 2px solid var(--focus-ring); outline-offset: 2px; }

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
		transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
		--accent: var(--primary);
	}

	/* sizes — same scale as z-input */
	.field.is-sm {
		padding: 0.5rem 0.75rem;
		font-size: var(--control-font-size-sm);
	}
	.field.is-md {
		padding: 0.75rem 0.875rem;
		font-size: var(--control-font-size-md);
	}
	.field.is-lg {
		padding: 0.875rem 1rem;
		font-size: var(--control-font-size-lg);
	}

	:host([tone='secondary']) .field {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) .field {
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
		min-height: 1.6em;
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
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}
`, c = (e) => {
  e.style.height = "auto", e.style.height = `${e.scrollHeight}px`;
}, V = (e) => e.size === "sm" ? "is-sm" : e.size === "lg" ? "is-lg" : "is-md", E = S(
  (e) => {
    A();
    const g = j(e.label), o = l(), [i, s] = h("value"), z = l(i ?? ""), a = l(i ?? ""), [x, d] = h("isFocused"), { isFormDisabled: R } = F({
      value: i ?? "",
      isDisabled: e.isDisabled,
      isReadonly: e.isReadonly,
      control: o,
      onReset: () => s(z.current),
      onRestore: (t) => {
        typeof t == "string" && s(t);
      }
    }), u = e.isDisabled || R;
    b(() => {
      const t = o.current;
      t && (e.isAutoResize ? c(t) : t.style.removeProperty("height"));
    }, [i, e.isAutoResize, e.rows, e.size]), b(() => {
      const t = o.current;
      if (!t || !e.isAutoResize || typeof ResizeObserver > "u") return;
      let r = -1;
      const f = new ResizeObserver(([n]) => {
        !n || n.contentRect.width === r || (r = n.contentRect.width, c(t));
      });
      return f.observe(t), () => f.disconnect();
    }, [e.isAutoResize]);
    const p = ["field", V(e)].concat(x ? ["is-focused"] : []).concat(e.isInvalid ? ["is-invalid"] : []).concat(u ? ["is-disabled"] : []).join(" "), w = e.isAutoResize ? "is-auto-resize" : "";
    return /* @__PURE__ */ B("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ v("div", { class: p, children: /* @__PURE__ */ v(
        "textarea",
        {
          ref: o,
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
            a.current = i ?? "", d(!0);
          },
          onblur: (t) => {
            d(!1);
            const r = t.target.value;
            r !== a.current && (a.current = r, e.change({ value: r }));
          },
          onchange: (t) => t.stopPropagation(),
          oninput: (t) => {
            t.stopPropagation();
            const r = t.target.value;
            s(r), e.isAutoResize && c(t.target), e.input({ value: r });
          }
        }
      ) }),
      q(e.description, e.error)
    ] });
  },
  {
    props: {
      ...P,
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
      input: m({ bubbles: !0, composed: !0 }),
      change: m({ bubbles: !0, composed: !0 })
    },
    styles: [H, N, D, I],
    form: !0
  }
);
C("z-textarea", E);
export {
  E as ZTextarea
};
