import { c as O, a as V, e as $, u as M, f as x, b, g as w, j as p } from "../chunks/define-element-BZUk-KLk.js";
import { h as A, s as U, a as H, b as N, c as T } from "../chunks/overlay-BZjDggFA.js";
import { i as K } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as Q, d as Z } from "../chunks/form-control-D_UwalCr.js";
import { s as G, d as J, u as W, a as X, r as Y } from "../chunks/accessible-NC1hpH4S.js";
import { u as _ } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as k } from "../chunks/hooks-DEFT8qqt.js";
import { t as ee } from "../chunks/scrollbar-styles-Csqxxw2V.js";
import { o as I } from "../chunks/prop-types-B3Bpi956.js";
import { u as oe } from "../chunks/locale-DUDaH1Ni.js";
const re = O`
	.field:focus-within { outline: 2px solid var(--focus-ring); outline-offset: 2px; }

	:host {
		display: inline-flex;
		position: relative;
		width: 100%;
		--accent: var(--primary);
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
		--accent: var(--pink);
	}

	:host([is-inline]) {
		width: auto;
	}

	:host([is-hidden]) {
		display: none;
	}

	.field {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}

	/* matches z-input's scale — a combobox is a text field first, and the two
	   sit side by side in forms often enough that they must share a baseline. */
	.field.is-sm {
		height: var(--control-height-sm);
		padding-inline: 0.75rem;
	}
	.field.is-md {
		height: var(--control-height-md);
		padding-inline: 0.875rem;
	}
	.field.is-lg {
		height: var(--control-height-lg);
		padding-inline: 1rem;
	}

	.field.is-sm input {
		font-size: var(--control-font-size-sm);
	}
	.field.is-lg input {
		font-size: var(--control-font-size-lg);
	}

	.field:hover {
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.field.is-open {
		border-color: var(--accent);
		background: color-mix(in oklch, var(--accent) 5%, transparent);
	}

	.field.is-invalid {
		border-color: var(--destructive);
	}

	.field.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	input {
		flex: 1 1 auto;
		min-width: 0;
		appearance: none;
		background: transparent;
		border: none;
		outline: none;
		color: var(--foreground);
		font-family: inherit;
		font-size: inherit;
	}

	input::placeholder {
		color: var(--muted-foreground);
		user-select: none;
		-webkit-user-select: none;
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--muted-foreground);
		transition: transform var(--motion-fast) var(--ease-enter);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
		cursor: pointer;
	}

	.field.is-open .chevron {
		transform: rotate(180deg);
		color: var(--accent);
	}

	.panel {
		position: fixed;
		margin: 0;
		box-sizing: border-box;
		/* physical: shared/overlay.ts positions the panel from measured rects */
		top: 0;
		left: 0; /* physical */
		right: auto; /* physical */
		bottom: auto;
		z-index: 50;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
		max-height: 16rem;
		overflow-y: auto;
	}

	.panel:popover-open {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.625rem;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-small);
		color: var(--foreground);
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
	}

	.option.is-active {
		background: color-mix(in oklch, var(--accent) 14%, transparent);
		color: var(--accent);
	}

	.option.is-selected {
		color: var(--accent);
		font-weight: 600;
	}

	.option.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.empty {
		padding: 0.625rem;
		font-size: var(--font-size-small);
		color: var(--muted-foreground);
		text-align: center;
	}
`, te = (o) => o.size === "sm" ? "is-sm" : o.size === "lg" ? "is-lg" : "is-md", ie = V(
  (o) => {
    const v = oe(), f = M(), R = W(o.label), h = x(), D = x(), [a, g] = _("value"), B = x(a), [r, n] = k(!1), [m, c] = k(""), [i, u] = k(-1), y = Array.isArray(o.options) ? o.options : [], z = y.find((e) => e.value === a), C = a != null && a !== "", { isFormDisabled: P } = Q({
      value: a ?? "",
      isDisabled: o.isDisabled,
      control: h,
      validity: o.isRequired && !C ? { flags: { valueMissing: !0 }, message: v("selectAnItemInTheList") } : { flags: {} },
      onReset: () => {
        g(B.current), c("");
      },
      onRestore: (e) => {
        typeof e == "string" && g(e);
      }
    }), s = !!o.isDisabled || P, d = m ? y.filter((e) => e.label.toLowerCase().includes(m.toLowerCase())) : y;
    b(() => {
      if (!r) return;
      const e = (t) => {
        t.composedPath().includes(f.current) || (n(!1), c(""));
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [r]), b(() => {
      const e = D.current;
      if (!e) return;
      if (!r) {
        A(e);
        return;
      }
      U(e);
      const t = H(f.current, e, () => {
        e.style.width = `${f.current.getBoundingClientRect().width}px`, N(e, T(f.current, e, { placement: "bottom-start", offset: 6, padding: 8 }));
      });
      return () => {
        t(), A(e);
      };
    }, [r, m]);
    const S = (e) => {
      s || e.isDisabled || (e.value !== a && (g(e.value), o.change({ value: e.value })), n(!1), c(""));
    }, l = d.flatMap((e, t) => e.isDisabled ? [] : [t]);
    b(() => {
      s && (n(!1), c(""));
    }, [s]), b(() => {
      var e, t;
      r && (!d[i] || d[i].isDisabled ? u(l[0] ?? -1) : (t = (e = f.current.shadowRoot) == null ? void 0 : e.querySelector(`#option-${i}`)) == null || t.scrollIntoView({ block: "nearest" }));
    }, [r, i, m, o.options]);
    const E = (e) => {
      if (!s) {
        if (e.key === "Escape" || e.key === "Tab") {
          e.key === "Escape" && r && (e.preventDefault(), e.stopPropagation()), n(!1), c("");
          return;
        }
        if (e.key === "Enter" && r) {
          e.preventDefault(), d[i] && S(d[i]);
          return;
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          if (e.preventDefault(), !r) {
            n(!0), u((e.key === "ArrowUp" ? l.at(-1) : l[0]) ?? -1);
            return;
          }
          const t = l.indexOf(i);
          u(l[(t + (e.key === "ArrowDown" ? 1 : -1) + l.length) % l.length] ?? -1);
        }
      }
    }, j = ["field", te(o)].concat(r ? ["is-open"] : []).concat(o.isInvalid ? ["is-invalid"] : []).concat(s ? ["is-disabled"] : []).join(" "), q = r ? m : z ? z.label : "";
    return /* @__PURE__ */ w("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ w("div", { class: j, children: [
        /* @__PURE__ */ p(
          "input",
          {
            ref: h,
            type: "text",
            value: q,
            placeholder: o.placeholder || v("searchPlaceholder"),
            disabled: s,
            role: "combobox",
            "aria-required": o.isRequired ? "true" : void 0,
            "aria-label": R,
            "aria-describedby": X(o.description, o.error),
            "aria-invalid": o.isInvalid || o.error ? "true" : void 0,
            "aria-expanded": r ? "true" : "false",
            "aria-autocomplete": "list",
            "aria-controls": "combobox-options",
            "aria-activedescendant": r && i >= 0 ? `option-${i}` : void 0,
            onblur: () => {
              n(!1), c("");
            },
            onfocus: () => {
              s || (n(!0), u(l[0] ?? -1));
            },
            oninput: (e) => {
              c(e.target.value), u(-1), n(!0);
            },
            onkeydown: E
          }
        ),
        /* @__PURE__ */ p(
          "svg",
          {
            class: "chevron",
            viewBox: "0 0 24 24",
            onmousedown: (e) => e.preventDefault(),
            onclick: () => {
              var e;
              s || (n(!r), (e = h.current) == null || e.focus());
            },
            children: /* @__PURE__ */ p("polyline", { points: "6 9 12 15 18 9" })
          }
        )
      ] }),
      /* @__PURE__ */ w("div", { ref: D, popover: "manual", id: "combobox-options", class: "panel", role: "listbox", "aria-label": o.label || v("options"), children: [
        d.length === 0 && /* @__PURE__ */ p("div", { class: "empty", children: v("noMatches") }),
        d.map((e, t) => {
          const F = ["option"].concat(t === i ? ["is-active"] : []).concat(e.value === a ? ["is-selected"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
          return /* @__PURE__ */ p(
            "div",
            {
              class: F,
              role: "option",
              id: `option-${t}`,
              "aria-disabled": e.isDisabled ? "true" : void 0,
              "aria-selected": e.value === a ? "true" : "false",
              onmouseenter: () => !e.isDisabled && u(t),
              onmousedown: (L) => L.preventDefault(),
              onclick: () => S(e),
              children: e.label
            },
            e.value
          );
        })
      ] }),
      Y(o.description, o.error)
    ] });
  },
  {
    props: {
      ...J,
      value: { type: String, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      placeholder: String,
      options: { type: Array },
      size: { type: I("sm", "md", "lg"), reflect: !0 },
      tone: { type: I("primary", "secondary", "tertiary"), reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isInline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: $({ bubbles: !0, composed: !0 })
    },
    styles: [ee, re, K, G],
    form: !0
  }
);
Z("z-combobox", ie);
export {
  ie as ZCombobox
};
