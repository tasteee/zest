import { c as D, a as S, e as j, u as A, f as B, b, g as u, j as s, d as C } from "../chunks/define-element-BWC3wEPr.js";
import { u as E } from "../chunks/use-prop-DBBKVpkc.js";
import { u as y } from "../chunks/hooks-D9_x-ckD.js";
import { t as I } from "../chunks/scrollbar-styles-DNEW5KBr.js";
import { h as x, s as P, a as F, b as R, c as U } from "../chunks/overlay-BJ9Mg5BD.js";
const H = D`
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

	.trigger {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.625rem;
		width: 100%;
		box-sizing: border-box;
		/* The trigger is a pressable cap, not a hole — raised, unlike z-input.
		   Inert in the flat themes. */
		background: var(--material-raised), transparent;
		box-shadow: var(--elevation-raised);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		color: var(--foreground);
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		user-select: none;
		-webkit-user-select: none;
		transition: border-color 0.12s ease, background-color 0.12s ease;
	}

	.trigger.is-sm {
		height: var(--control-height-sm);
		padding-inline: 0.75rem;
		font-size: var(--font-size-small);
	}
	.trigger.is-md {
		height: var(--control-height-md);
		padding-inline: 0.875rem;
		font-size: var(--font-size-body);
	}
	.trigger.is-lg {
		height: var(--control-height-lg);
		padding-inline: 1rem;
		font-size: var(--font-size-h4);
	}

	.trigger:hover {
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.trigger.is-open {
		border-color: var(--accent);
		background: color-mix(in oklch, var(--accent) 5%, transparent);
	}

	.trigger.is-invalid {
		border-color: var(--destructive);
	}

	.trigger.is-disabled {
		opacity: 0.55;
		pointer-events: none;
	}

	.trigger:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.value.is-placeholder {
		color: var(--muted-foreground);
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
	}

	.trigger.is-open .chevron {
		transform: rotate(180deg);
		color: var(--accent);
	}

	/* Fixed + top-layer (via [popover]) rather than absolute-in-:host, so the
	   panel escapes any scrollable ancestor (e.g. a dialog body) instead of
	   enlarging its scrollable overflow. The display property is left unset
	   here (outside :popover-open) so the UA's popover stylesheet still hides
	   it when closed — an author display declaration would out-cascade that
	   regardless of specificity, since origin wins first. See shared/overlay.ts. */
	.panel {
		position: fixed;
		box-sizing: border-box;
		margin: 0;
		left: 0;
		top: 0;
		right: auto;
		bottom: auto;
		z-index: 50;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
		max-height: 16rem;
		overflow-y: auto;
		gap: 1px;
	}

	.panel:popover-open {
		display: flex;
		flex-direction: column;
	}

	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
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

	.tick {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.empty {
		padding: 0.625rem;
		font-size: var(--font-size-small);
		color: var(--muted-foreground);
		text-align: center;
	}
`, L = (r) => r.size === "sm" ? "is-sm" : r.size === "lg" ? "is-lg" : "is-md", O = S(
  (r) => {
    var v;
    const l = A(), g = B(), [d, w] = E("value"), [t, a] = y(!1), [c, h] = y(-1), o = Array.isArray(r.options) ? r.options : [], p = o.find((e) => e.value === d);
    b(() => {
      if (!t) return;
      const e = (i) => {
        i.composedPath().includes(l.current) || a(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [t]), b(() => {
      const e = g.current;
      if (!e) return;
      if (!t) {
        x(e);
        return;
      }
      P(e);
      const i = () => {
        e.style.width = `${l.current.getBoundingClientRect().width}px`, R(e, U(l.current, e, { placement: "bottom-start", offset: 6, padding: 8 }));
      }, n = F(l.current, e, i);
      return () => {
        n(), x(e);
      };
    }, [t]);
    const f = (e) => {
      e.isDisabled || (w(e.value), a(!1), r.change({ value: e.value }));
    }, k = (e) => {
      if (!r.isDisabled) {
        if (e.key === "Escape") {
          a(!1);
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(), t ? c >= 0 && o[c] && f(o[c]) : a(!0);
          return;
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault(), t || a(!0);
          const i = e.key === "ArrowDown" ? 1 : -1;
          let n = c;
          for (let m = 0; m < o.length && (n = (n + i + o.length) % o.length, !!o[n].isDisabled); m++)
            ;
          h(n);
        }
      }
    }, z = ["trigger", L(r)].concat(t ? ["is-open"] : []).concat(r.isInvalid ? ["is-invalid"] : []).concat(r.isDisabled ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ u("host", { shadowDom: !0, children: [
      /* @__PURE__ */ u(
        "button",
        {
          type: "button",
          class: z,
          disabled: r.isDisabled,
          "aria-haspopup": "listbox",
          "aria-label": r.label || ((v = l.current) == null ? void 0 : v.getAttribute("aria-label")) || void 0,
          "aria-expanded": t ? "true" : "false",
          onclick: () => a(!t),
          onkeydown: k,
          children: [
            /* @__PURE__ */ s("span", { class: p ? "value" : "value is-placeholder", children: p ? p.label : r.placeholder || "Select…" }),
            /* @__PURE__ */ s("svg", { class: "chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ s("polyline", { points: "6 9 12 15 18 9" }) })
          ]
        }
      ),
      /* @__PURE__ */ u("div", { ref: g, class: "panel", role: "listbox", popover: "manual", children: [
        o.length === 0 && /* @__PURE__ */ s("div", { class: "empty", children: "No options" }),
        o.map((e, i) => {
          const n = ["option"].concat(i === c ? ["is-active"] : []).concat(e.value === d ? ["is-selected"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
          return /* @__PURE__ */ u(
            "div",
            {
              class: n,
              role: "option",
              "aria-selected": e.value === d ? "true" : "false",
              onmouseenter: () => h(i),
              onclick: () => f(e),
              children: [
                /* @__PURE__ */ s("span", { children: e.label }),
                e.value === d && /* @__PURE__ */ s("svg", { class: "tick", viewBox: "0 0 24 24", children: /* @__PURE__ */ s("polyline", { points: "4 12 10 18 20 6" }) })
              ]
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
      change: j({ bubbles: !0, composed: !0 })
    },
    styles: [I, H]
  }
);
C("z-select", O);
export {
  O as ZSelect
};
