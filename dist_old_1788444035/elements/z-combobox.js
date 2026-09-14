import { c as S, a as A, e as C, u as j, f as E, b as I, g as v, j as a, d as B } from "../chunks/define-element-BWC3wEPr.js";
import { u as L } from "../chunks/use-prop-DBBKVpkc.js";
import { u as m } from "../chunks/hooks-D9_x-ckD.js";
import { t as P } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const H = S`
	:host {
		display: inline-flex;
		position: relative;
		width: 100%;
		--accent: var(--primary);
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([inline]) {
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
		transition: border-color 0.12s ease, background-color 0.12s ease;
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
		font-size: var(--font-size-small);
	}
	.field.is-lg input {
		font-size: var(--font-size-h4);
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
		opacity: 0.55;
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
		font-size: var(--font-size-body);
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
		transition: transform 0.15s ease;
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
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		right: 0;
		z-index: 50;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
		max-height: 16rem;
		overflow-y: auto;
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
`, O = (r) => r.size === "sm" ? "is-sm" : r.size === "lg" ? "is-lg" : "is-md", R = A(
  (r) => {
    var x;
    const h = j(), b = E(), [d, w] = L("value"), [o, t] = m(!1), [u, s] = m(""), [l, f] = m(0), p = Array.isArray(r.options) ? r.options : [], g = p.find((e) => e.value === d), i = u ? p.filter((e) => e.label.toLowerCase().includes(u.toLowerCase())) : p;
    I(() => {
      if (!o) return;
      const e = (n) => {
        n.composedPath().includes(h.current) || (t(!1), s(""));
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [o]);
    const y = (e) => {
      e.isDisabled || (w(e.value), t(!1), s(""), r.change({ value: e.value }));
    }, k = (e) => {
      if (e.key === "Escape") {
        t(!1), s("");
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault(), i[l] && y(i[l]);
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(), o || t(!0);
        const n = e.key === "ArrowDown" ? 1 : -1, c = i.length || 1;
        f((l + n + c) % c);
      }
    }, z = ["field", O(r)].concat(o ? ["is-open"] : []).concat(r.isInvalid ? ["is-invalid"] : []).concat(r.isDisabled ? ["is-disabled"] : []).join(" "), D = o ? u : g ? g.label : "";
    return /* @__PURE__ */ v("host", { shadowDom: !0, children: [
      /* @__PURE__ */ v("div", { class: z, children: [
        /* @__PURE__ */ a(
          "input",
          {
            ref: b,
            type: "text",
            value: D,
            placeholder: r.placeholder || "Search…",
            disabled: r.isDisabled,
            role: "combobox",
            "aria-label": r.label || ((x = h.current) == null ? void 0 : x.getAttribute("aria-label")) || void 0,
            "aria-expanded": o ? "true" : "false",
            "aria-invalid": r.isInvalid ? "true" : void 0,
            "aria-autocomplete": "list",
            onfocus: () => t(!0),
            oninput: (e) => {
              s(e.target.value), f(0), t(!0);
            },
            onkeydown: k
          }
        ),
        /* @__PURE__ */ a(
          "svg",
          {
            class: "chevron",
            viewBox: "0 0 24 24",
            onclick: () => {
              var e;
              t(!o), (e = b.current) == null || e.focus();
            },
            children: /* @__PURE__ */ a("polyline", { points: "6 9 12 15 18 9" })
          }
        )
      ] }),
      o && /* @__PURE__ */ v("div", { class: "panel", role: "listbox", children: [
        i.length === 0 && /* @__PURE__ */ a("div", { class: "empty", children: "No matches" }),
        i.map((e, n) => {
          const c = ["option"].concat(n === l ? ["is-active"] : []).concat(e.value === d ? ["is-selected"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
          return /* @__PURE__ */ a(
            "div",
            {
              class: c,
              role: "option",
              "aria-selected": e.value === d ? "true" : "false",
              onmouseenter: () => f(n),
              onclick: () => y(e),
              children: e.label
            },
            e.value
          );
        })
      ] })
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      placeholder: String,
      options: { type: Array },
      size: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      inline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: C({ bubbles: !0, composed: !0 })
    },
    styles: [P, H]
  }
);
B("z-combobox", R);
export {
  R as ZCombobox
};
