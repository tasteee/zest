import { c as k, a as y, e as x, u as w, b as z, j as r, g as c, F as E, d as j } from "../chunks/define-element-BWC3wEPr.js";
import { u as S } from "../chunks/hooks-D9_x-ckD.js";
const A = k`
	:host {
		display: block;
		--accent: var(--purple);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.top {
		position: relative;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		background: transparent;
		border: 0;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-md);
		font-family: inherit;
		font-size: var(--font-size-small);
		font-weight: 500;
		color: var(--muted-foreground);
		text-decoration: none;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color 0.12s ease,
			background-color 0.12s ease;
	}

	.trigger:hover {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
	}

	.trigger.is-active {
		color: var(--color-neutral-9);
	}

	.trigger.is-open {
		color: var(--accent);
		background: color-mix(in oklch, var(--accent) 8%, transparent);
	}

	.trigger:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.caret {
		width: 0.75rem;
		height: 0.75rem;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
		transition: transform 0.15s ease;
	}

	.trigger.is-open .caret {
		transform: rotate(180deg);
	}

	.panel {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 50;
		min-width: 16rem;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.375rem;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.child {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		padding: 0.5rem 0.625rem;
		border-radius: var(--radius-sm);
		color: var(--foreground);
		text-decoration: none;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: left;
		cursor: pointer;
	}

	.child:hover {
		background: color-mix(in oklch, var(--accent) 12%, transparent);
	}

	.child .child-label {
		font-size: var(--font-size-small);
		font-weight: 500;
	}

	.child .child-desc {
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}
`, L = y(
  (o) => {
    const f = w(), [s, a] = S(null), h = Array.isArray(o.items) ? o.items : [];
    z(() => {
      if (s == null) return;
      const e = (n) => {
        n.composedPath().includes(f.current) || a(null);
      }, i = (n) => {
        n.key === "Escape" && a(null);
      };
      return document.addEventListener("pointerdown", e), document.addEventListener("keydown", i), () => {
        document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", i);
      };
    }, [s]);
    const d = (e) => {
      a(null), o.select({ value: e });
    };
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("nav", { children: h.map((e, i) => {
      const n = e.value || e.label || String(i), u = o.value != null && e.value === o.value;
      if (e.children && e.children.length) {
        const l = s === n, m = ["trigger"].concat(u ? ["is-active"] : []).concat(l ? ["is-open"] : []).join(" ");
        return /* @__PURE__ */ c("div", { class: "top", children: [
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              class: m,
              "aria-haspopup": "menu",
              "aria-expanded": l ? "true" : "false",
              onclick: () => a(l ? null : n),
              children: [
                e.label,
                /* @__PURE__ */ r("svg", { class: "caret", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "6 9 12 15 18 9" }) })
              ]
            }
          ),
          l && /* @__PURE__ */ r("div", { class: "panel", role: "menu", children: e.children.map((t, b) => {
            const g = t.value || t.label || String(b), v = /* @__PURE__ */ c(E, { children: [
              /* @__PURE__ */ r("span", { class: "child-label", children: t.label }),
              t.description && /* @__PURE__ */ r("span", { class: "child-desc", children: t.description })
            ] });
            return t.href ? /* @__PURE__ */ r("a", { class: "child", href: t.href, role: "menuitem", children: v }, g) : /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: "child",
                role: "menuitem",
                onclick: () => d(t.value || t.label),
                children: v
              },
              g
            );
          }) })
        ] }, n);
      }
      const p = u ? "trigger is-active" : "trigger";
      return e.href ? /* @__PURE__ */ r("a", { class: p, href: e.href, children: e.label }, n) : /* @__PURE__ */ r("button", { type: "button", class: p, onclick: () => d(e.value || e.label), children: e.label }, n);
    }) }) });
  },
  {
    props: {
      items: { type: Array },
      value: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: x({ bubbles: !0, composed: !0 })
    },
    styles: A
  }
);
j("z-nav-menu", L);
export {
  L as ZNavMenu
};
