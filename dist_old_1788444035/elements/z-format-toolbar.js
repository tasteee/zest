import { c as y, a as k, e as h, u as w, b, g as d, j as n, d as A } from "../chunks/define-element-BWC3wEPr.js";
import { u as c } from "../chunks/hooks-D9_x-ckD.js";
import { b as z } from "../chunks/editor-overlay-styles-DEH-Ouss.js";
import { c as H } from "../chunks/menu-nav-Wh2Qsy6q.js";
const I = y`
	:host {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		box-sizing: border-box;
		width: 100%;
		padding: 0.375rem 0.5rem;
		background: var(--popover);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: var(--z-toolbar, 40);
	}

	.sep {
		width: 1px;
		align-self: stretch;
		margin: 0.25rem 0.125rem;
		background: var(--border);
	}

	.heading {
		position: relative;
	}

	.heading-trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		height: 1.75rem;
		padding: 0 0.5rem;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--foreground);
		font-family: inherit;
		font-size: var(--font-size-small);
		cursor: pointer;
		transition: background-color 0.12s ease;
	}

	.heading-trigger:hover {
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	.heading-trigger svg {
		width: 0.875rem;
		height: 0.875rem;
		color: var(--muted-foreground);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}

	.heading-panel {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		z-index: var(--z-menu, 50);
		min-width: 9rem;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.heading-option {
		display: flex;
		align-items: center;
		padding: 0.4375rem 0.625rem;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-small);
		color: var(--foreground);
		cursor: pointer;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: left;
		width: 100%;
		box-sizing: border-box;
	}

	.heading-option.is-active {
		background: color-mix(in oklch, var(--purple) 14%, transparent);
		color: var(--purple);
	}

	.heading-option.is-selected {
		font-weight: 600;
	}
`, O = k(
  (a) => {
    const p = w(), [v, f] = c(Array.isArray(a.items) ? a.items : []), [t, o] = c(!1), [u, g] = c(0);
    b(() => {
      const e = Array.isArray(a.items) ? a.items : [], r = requestAnimationFrame(() => f(e));
      return () => cancelAnimationFrame(r);
    }, [a.items]), b(() => {
      if (!t) return;
      const e = (r) => {
        r.composedPath().includes(p.current) || o(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [t]);
    const i = Array.isArray(a.headingOptions) ? a.headingOptions : [], s = i.find((e) => e.value === a.headingValue), m = (e) => {
      o(!1), a.headingchange({ value: e.value });
    }, x = H({
      isOpen: t,
      itemCount: i.length,
      activeIndex: u,
      isSelectable: () => !0,
      onOpen: () => o(!0),
      onMove: g,
      onCommit: (e) => m(i[e]),
      onClose: () => o(!1)
    });
    return /* @__PURE__ */ d("host", { shadowDom: !0, role: "toolbar", "aria-label": a.label || "Formatting", children: [
      /* @__PURE__ */ d("div", { class: "heading", onkeydown: x, children: [
        /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            class: "heading-trigger",
            "aria-haspopup": "listbox",
            "aria-expanded": t ? "true" : "false",
            onclick: () => o(!t),
            children: [
              /* @__PURE__ */ n("span", { children: (s == null ? void 0 : s.label) || a.headingPlaceholder || "Paragraph" }),
              /* @__PURE__ */ n("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ n("polyline", { points: "6 9 12 15 18 9" }) })
            ]
          }
        ),
        t && /* @__PURE__ */ n("div", { class: "heading-panel", role: "listbox", "aria-label": "Heading level", children: i.map((e, r) => {
          const l = ["heading-option"].concat(r === u ? ["is-active"] : []).concat(e.value === a.headingValue ? ["is-selected"] : []).join(" ");
          return /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              class: l,
              role: "option",
              "aria-selected": e.value === a.headingValue ? "true" : "false",
              onmouseenter: () => g(r),
              onclick: () => m(e),
              children: e.label
            },
            e.value
          );
        }) })
      ] }),
      /* @__PURE__ */ n("div", { class: "sep", role: "separator" }),
      v.map((e, r) => {
        const l = ["icon-button"].concat(e.isActive ? ["is-active"] : []).join(" ");
        return /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            class: l,
            "aria-label": e.label || e.value,
            "aria-pressed": e.isActive ? "true" : "false",
            disabled: e.isDisabled,
            onclick: () => a.action({ value: e.value || e.label || "" }),
            children: e.icon ? /* @__PURE__ */ n("span", { innerHTML: e.icon }) : e.label
          },
          e.value || r
        );
      })
    ] });
  },
  {
    props: {
      items: { type: Array },
      headingOptions: { type: Array },
      headingValue: { type: String, reflect: !0 },
      headingPlaceholder: String,
      label: String,
      action: h({ bubbles: !0, composed: !0 }),
      headingchange: h({ bubbles: !0, composed: !0 })
    },
    styles: [z, I]
  }
);
A("z-format-toolbar", O);
export {
  O as ZFormatToolbar
};
