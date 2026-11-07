import { c as y, a as k, e as x, u as w, b as z, j as r, g as c, F as E, d as j } from "../chunks/define-element-BZUk-KLk.js";
import { u as A } from "../chunks/hooks-DEFT8qqt.js";
import { o as L } from "../chunks/prop-types-B3Bpi956.js";
const S = y`
	:host {
		display: block;
		--accent: var(--primary);
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
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
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
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
		outline: 3px solid var(--focus-ring);
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
		transition: transform var(--motion-fast) var(--ease-enter);
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
		text-align: start;
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
`, C = k(
  (o) => {
    const f = w(), [l, a] = A(null), m = Array.isArray(o.items) ? o.items : [];
    z(() => {
      if (l == null) return;
      const e = (n) => {
        n.composedPath().includes(f.current) || a(null);
      }, i = (n) => {
        n.key === "Escape" && a(null);
      };
      return document.addEventListener("pointerdown", e), document.addEventListener("keydown", i), () => {
        document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", i);
      };
    }, [l]);
    const d = (e) => {
      a(null), o.select({ value: e });
    };
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("nav", { children: m.map((e, i) => {
      const n = e.value || e.label || String(i), u = o.value != null && e.value === o.value;
      if (e.children && e.children.length) {
        const s = l === n, h = ["trigger"].concat(u ? ["is-active"] : []).concat(s ? ["is-open"] : []).join(" ");
        return /* @__PURE__ */ c("div", { class: "top", children: [
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              class: h,
              "aria-haspopup": "menu",
              "aria-expanded": s ? "true" : "false",
              onclick: () => a(s ? null : n),
              children: [
                e.label,
                /* @__PURE__ */ r("svg", { class: "caret", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "6 9 12 15 18 9" }) })
              ]
            }
          ),
          s && /* @__PURE__ */ r("div", { class: "panel", role: "menu", children: e.children.map((t, b) => {
            const v = t.value || t.label || String(b), g = /* @__PURE__ */ c(E, { children: [
              /* @__PURE__ */ r("span", { class: "child-label", children: t.label }),
              t.description && /* @__PURE__ */ r("span", { class: "child-desc", children: t.description })
            ] });
            return t.href ? /* @__PURE__ */ r("a", { class: "child", href: t.href, role: "menuitem", children: g }, v) : /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: "child",
                role: "menuitem",
                onclick: () => d(t.value || t.label),
                children: g
              },
              v
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
      tone: { type: L("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: x({ bubbles: !0, composed: !0 })
    },
    styles: S
  }
);
j("z-nav-menu", C);
export {
  C as ZNavMenu
};
