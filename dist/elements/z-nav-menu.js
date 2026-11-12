// @ts-self-types="./z-nav-menu.d.ts"
import { c as A, a as z, e as E, u as j, b as y, j as n, g as v, F as D, d as L } from "../chunks/define-element-BZUk-KLk.js";
import { u as x } from "../chunks/hooks-DEFT8qqt.js";
import { o as S } from "../chunks/prop-types-B3Bpi956.js";
const I = A`
	:host {
		display: block;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	nav {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.top {
		position: relative;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
		background: transparent;
		border: 0;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		font-family: inherit;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		text-decoration: none;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.trigger:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 6%, transparent);
	}

	.trigger.is-active {
		color: var(--text-strong);
	}

	.trigger.is-open {
		color: var(--tone);
		background: color-mix(in oklch, var(--tone) 8%, transparent);
	}

	.trigger:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
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
		z-index: var(--z-menu);
		min-width: 16rem;
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-1-5);
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.child {
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		color: var(--text-primary);
		text-decoration: none;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: start;
		cursor: pointer;
	}

	.child:hover {
		background: color-mix(in oklch, var(--tone) 12%, transparent);
	}

	.child .child-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}

	.child .child-desc {
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
	}
`, O = (o) => Array.from(o.children).filter((t) => t.matches("[data-nav-item]")).map((t) => {
  const u = Array.from(t.querySelectorAll(":scope > [data-nav-item]")).map((i) => ({
    label: i.getAttribute("label") || "",
    value: i.getAttribute("value") || void 0,
    href: i.getAttribute("href") || void 0,
    description: i.getAttribute("description") || void 0
  }));
  return {
    label: t.getAttribute("label") || "",
    value: t.getAttribute("value") || void 0,
    href: t.getAttribute("href") || void 0,
    children: u
  };
}), C = z(
  (o) => {
    const d = j(), [l, t] = x(null), [p, u] = x([]), i = Array.isArray(o.items) ? o.items : p;
    y(() => {
      const e = d.current, s = () => {
        u(O(e));
      };
      s();
      const r = new MutationObserver(s);
      return r.observe(e, { childList: !0, subtree: !0, attributes: !0 }), () => {
        r.disconnect();
      };
    }, []), y(() => {
      if (l == null) return;
      const e = (r) => {
        r.composedPath().includes(d.current) || t(null);
      }, s = (r) => {
        r.key === "Escape" && t(null);
      };
      return document.addEventListener("pointerdown", e), document.addEventListener("keydown", s), () => {
        document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", s);
      };
    }, [l]);
    const m = (e) => {
      t(null), o.select({ value: e });
    };
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: /* @__PURE__ */ n("nav", { children: i.map((e, s) => {
      const r = e.value || e.label || String(s), f = o.value != null && e.value === o.value;
      if (e.children && e.children.length) {
        const c = l === r, k = ["trigger"].concat(f ? ["is-active"] : []).concat(c ? ["is-open"] : []).join(" ");
        return /* @__PURE__ */ v("div", { class: "top", children: [
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              class: k,
              "aria-haspopup": "menu",
              "aria-expanded": c ? "true" : "false",
              onclick: () => t(c ? null : r),
              children: [
                e.label,
                /* @__PURE__ */ n("svg", { class: "caret", viewBox: "0 0 24 24", children: /* @__PURE__ */ n("polyline", { points: "6 9 12 15 18 9" }) })
              ]
            }
          ),
          c && /* @__PURE__ */ n("div", { class: "panel", role: "menu", children: e.children.map((a, w) => {
            const h = a.value || a.label || String(w), b = /* @__PURE__ */ v(D, { children: [
              /* @__PURE__ */ n("span", { class: "child-label", children: a.label }),
              a.description && /* @__PURE__ */ n("span", { class: "child-desc", children: a.description })
            ] });
            return a.href ? /* @__PURE__ */ n("a", { class: "child", href: a.href, role: "menuitem", children: b }, h) : /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                class: "child",
                role: "menuitem",
                onclick: () => m(a.value || a.label),
                children: b
              },
              h
            );
          }) })
        ] }, r);
      }
      const g = f ? "trigger is-active" : "trigger";
      return e.href ? /* @__PURE__ */ n("a", { class: g, href: e.href, children: e.label }, r) : /* @__PURE__ */ n("button", { type: "button", class: g, onclick: () => m(e.value || e.label), children: e.label }, r);
    }) }) });
  },
  {
    props: {
      items: { type: Array },
      value: { type: String, reflect: !0 },
      tone: { type: S("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: E({ bubbles: !0, composed: !0 })
    },
    styles: I
  }
);
L("z-nav-menu", C);
export {
  C as ZNavMenu
};
