// @ts-self-types="./z-combobox.d.ts"
import { c as O, a as V, e as $, u as M, f as x, b, g as w, j as v } from "../chunks/define-element-BZUk-KLk.js";
import { h as A, s as U, a as H, b as N, c as T } from "../chunks/overlay-CFiufx65.js";
import { i as K } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as Q, d as Z } from "../chunks/form-control-CrK-0rhn.js";
import { s as G, d as J, u as W, a as X, r as Y } from "../chunks/accessible-NC1hpH4S.js";
import { u as _ } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as k } from "../chunks/hooks-DEFT8qqt.js";
import { t as ee } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { o as I } from "../chunks/prop-types-B3Bpi956.js";
import { u as te } from "../chunks/locale-Bb4aqXuR.js";
const oe = O`
	.field:focus-within { outline: 1px solid var(--border-focus); outline-offset: -1px; }

	:host {
		display: inline-flex;
		position: relative;
		width: 100%;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
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
		gap: var(--space-2);
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}

	/* matches z-input's scale — a combobox is a text field first, and the two
	   sit side by side in forms often enough that they must share a baseline. */
	.field.is-sm {
		height: var(--control-height-sm);
		padding-inline: var(--space-3);
	}
	.field.is-md {
		height: var(--control-height-md);
		padding-inline: var(--space-3-5);
	}
	.field.is-lg {
		height: var(--control-height-lg);
		padding-inline: var(--space-4);
	}

	.field.is-sm input {
		font-size: var(--font-size-sm);
	}
	.field.is-lg input {
		font-size: var(--font-size-md);
	}

	.field:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.field.is-open {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 5%, transparent);
	}

	.field.is-invalid {
		border-color: var(--status-danger);
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
		color: var(--text-primary);
		font-family: inherit;
		font-size: inherit;
	}

	input::placeholder {
		color: var(--text-secondary);
		user-select: none;
		-webkit-user-select: none;
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--text-secondary);
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
		color: var(--tone);
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
		z-index: var(--z-menu);
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-1-5);
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
		gap: var(--space-2);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
	}

	.option.is-active {
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		color: var(--tone);
	}

	.option.is-selected {
		color: var(--tone);
		font-weight: var(--font-weight-semibold);
	}

	.option.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.empty {
		padding: var(--space-2-5);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		text-align: center;
	}
`, re = (t) => t.size === "sm" ? "is-sm" : t.size === "lg" ? "is-lg" : "is-md", ie = V(
  (t) => {
    const m = te(), f = M(), R = W(t.label), h = x(), D = x(), [n, y] = _("value"), B = x(n), [o, a] = k(!1), [p, c] = k(""), [i, u] = k(-1), g = Array.isArray(t.options) ? t.options : [], z = g.find((e) => e.value === n), C = n != null && n !== "", { isFormDisabled: P } = Q({
      value: n ?? "",
      isDisabled: t.isDisabled,
      control: h,
      validity: t.isRequired && !C ? { flags: { valueMissing: !0 }, message: m("selectAnItemInTheList") } : { flags: {} },
      onReset: () => {
        y(B.current), c("");
      },
      onRestore: (e) => {
        typeof e == "string" && y(e);
      }
    }), s = !!t.isDisabled || P, d = p ? g.filter((e) => e.label.toLowerCase().includes(p.toLowerCase())) : g;
    b(() => {
      if (!o) return;
      const e = (r) => {
        r.composedPath().includes(f.current) || (a(!1), c(""));
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [o]), b(() => {
      const e = D.current;
      if (!e) return;
      if (!o) {
        A(e);
        return;
      }
      U(e);
      const r = H(f.current, e, () => {
        e.style.width = `${f.current.getBoundingClientRect().width}px`, N(e, T(f.current, e, { placement: "bottom-start", offset: 6, padding: 8 }));
      });
      return () => {
        r(), A(e);
      };
    }, [o, p]);
    const S = (e) => {
      s || e.isDisabled || (e.value !== n && (y(e.value), t.change({ value: e.value })), a(!1), c(""));
    }, l = d.flatMap((e, r) => e.isDisabled ? [] : [r]);
    b(() => {
      s && (a(!1), c(""));
    }, [s]), b(() => {
      var e, r;
      o && (!d[i] || d[i].isDisabled ? u(l[0] ?? -1) : (r = (e = f.current.shadowRoot) == null ? void 0 : e.querySelector(`#option-${i}`)) == null || r.scrollIntoView({ block: "nearest" }));
    }, [o, i, p, t.options]);
    const E = (e) => {
      if (!s) {
        if (e.key === "Escape" || e.key === "Tab") {
          e.key === "Escape" && o && (e.preventDefault(), e.stopPropagation()), a(!1), c("");
          return;
        }
        if (e.key === "Enter" && o) {
          e.preventDefault(), d[i] && S(d[i]);
          return;
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          if (e.preventDefault(), !o) {
            a(!0), u((e.key === "ArrowUp" ? l.at(-1) : l[0]) ?? -1);
            return;
          }
          const r = l.indexOf(i);
          u(l[(r + (e.key === "ArrowDown" ? 1 : -1) + l.length) % l.length] ?? -1);
        }
      }
    }, j = ["field", re(t)].concat(o ? ["is-open"] : []).concat(t.isInvalid ? ["is-invalid"] : []).concat(s ? ["is-disabled"] : []).join(" "), q = o ? p : z ? z.label : "";
    return /* @__PURE__ */ w("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ w("div", { class: j, children: [
        /* @__PURE__ */ v(
          "input",
          {
            ref: h,
            type: "text",
            value: q,
            placeholder: t.placeholder || m("searchPlaceholder"),
            disabled: s,
            role: "combobox",
            "aria-required": t.isRequired ? "true" : void 0,
            "aria-label": R,
            "aria-describedby": X(t.description, t.error),
            "aria-invalid": t.isInvalid || t.error ? "true" : void 0,
            "aria-expanded": o ? "true" : "false",
            "aria-autocomplete": "list",
            "aria-controls": "combobox-options",
            "aria-activedescendant": o && i >= 0 ? `option-${i}` : void 0,
            onblur: () => {
              a(!1), c("");
            },
            onfocus: () => {
              s || (a(!0), u(l[0] ?? -1));
            },
            oninput: (e) => {
              c(e.target.value), u(-1), a(!0);
            },
            onkeydown: E
          }
        ),
        /* @__PURE__ */ v(
          "svg",
          {
            class: "chevron",
            viewBox: "0 0 24 24",
            onmousedown: (e) => e.preventDefault(),
            onclick: () => {
              var e;
              s || (a(!o), (e = h.current) == null || e.focus());
            },
            children: /* @__PURE__ */ v("polyline", { points: "6 9 12 15 18 9" })
          }
        )
      ] }),
      /* @__PURE__ */ w("div", { ref: D, popover: "manual", id: "combobox-options", class: "panel", role: "listbox", "aria-label": t.label || m("options"), children: [
        d.length === 0 && /* @__PURE__ */ v("div", { class: "empty", children: m("noMatches") }),
        d.map((e, r) => {
          const F = ["option"].concat(r === i ? ["is-active"] : []).concat(e.value === n ? ["is-selected"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
          return /* @__PURE__ */ v(
            "div",
            {
              class: F,
              role: "option",
              id: `option-${r}`,
              "aria-disabled": e.isDisabled ? "true" : void 0,
              "aria-selected": e.value === n ? "true" : "false",
              onmouseenter: () => !e.isDisabled && u(r),
              onmousedown: (L) => L.preventDefault(),
              onclick: () => S(e),
              children: e.label
            },
            e.value
          );
        })
      ] }),
      Y(t.description, t.error)
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
    styles: [ee, oe, K, G],
    form: !0
  }
);
Z("z-combobox", ie);
export {
  ie as ZCombobox
};
