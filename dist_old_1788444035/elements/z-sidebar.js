import { c as x, a as k, e as y, g as i, j as r, F as z, d as C } from "../chunks/define-element-BWC3wEPr.js";
import { u as d } from "../chunks/hooks-D9_x-ckD.js";
import { t as j } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const A = x`
	:host {
		display: flex;
		flex-direction: column;
		width: var(--z-sidebar-width, 16rem);
		box-sizing: border-box;
		height: 100%;
		background: var(--color-neutral-0);
		border: 1px solid var(--sidebar-border);
		border-radius: var(--radius-lg);
		padding: 0 var(--space-md) var(--space-md);
		color: var(--sidebar-foreground);
		--accent: var(--purple);
		transition: width 0.16s ease;
		user-select: none;
		-webkit-user-select: none;
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-collapsed]) {
		width: var(--z-sidebar-collapsed-width, 4rem);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-docked]) {
		background: transparent;
		border: none;
		border-right: 1px solid var(--sidebar-border);
		border-radius: 0;
		padding: 0 0 var(--space-md);
	}

	.head.has-content {
		padding: 0.25rem 0.5rem 0.75rem;
	}

	.foot.has-content {
		margin-top: auto;
		padding-top: 0.75rem;
		border-top: 1px solid var(--sidebar-border);
	}

	nav {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
		gap: 0.125rem;
		overflow-y: auto;
	}

	/* Firefox has no ::-webkit-scrollbar and never draws arrows — give it the
	   standard thin themed bar. Chromium must NOT get scrollbar-width: with it set,
	   Chrome falls back to the OS scrollbar (stepper arrows on Windows) and ignores
	   the custom rules below. */
	@supports not selector(::-webkit-scrollbar) {
		nav {
			scrollbar-width: thin;
			scrollbar-color: var(--color-neutral-3) transparent;
		}
	}

	/* WebKit / Chromium — slim, track-less, arrow-less */
	nav::-webkit-scrollbar {
		width: 6px;
	}
	nav::-webkit-scrollbar-track {
		background: transparent;
	}
	nav::-webkit-scrollbar-thumb {
		background: var(--color-neutral-3);
		border-radius: 999px;
	}
	nav::-webkit-scrollbar-thumb:hover {
		background: var(--color-neutral-4);
	}
	/* No stepper arrows — Windows Chromium renders them otherwise. */
	nav::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}

	.group-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0.375rem 0.625rem 0.875rem;
		font-family: inherit;
		font-size: var(--font-size-caption);
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: color-mix(in oklch, var(--muted-foreground) 70%, transparent);
		background: transparent;
		border: 0;
		text-align: left;
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		transition: color 0.12s ease;
	}

	.group:first-child .group-label {
		padding-top: 1rem;
	}

	.group-label:hover {
		color: var(--foreground);
	}

	.group-label:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	.group-label > span {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.group-chevron {
		width: 0.75rem;
		height: 0.75rem;
		flex-shrink: 0;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
		transform: rotate(180deg);
		transition: transform 0.16s ease;
	}

	.group.is-closed .group-chevron {
		transform: rotate(0deg);
	}

	:host([is-collapsed]) .group-label {
		visibility: hidden;
		height: 0.5rem;
		padding: 0;
	}

	.link {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.625rem;
		border-radius: var(--radius-md);
		font-family: inherit;
		font-size: var(--font-size-small);
		font-weight: 500;
		color: var(--color-neutral-8);
		text-decoration: none;
		background: transparent;
		border: 0;
		text-align: left;
		width: 100%;
		box-sizing: border-box;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color 0.12s ease,
			background-color 0.12s ease;
	}

	.link:hover {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
	}

	.link.is-active {
		color: var(--accent);
		background: color-mix(in oklch, var(--accent) 12%, transparent);
	}

	:host(:not([is-collapsed])) .group .link {
		margin-left: 0.5rem;
		width: calc(100% - 0.5rem);
	}

	.group .link:last-child {
		margin-bottom: 1rem;
	}

	.link:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.icon,
	.initial {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.125rem;
		height: 1.125rem;
		flex-shrink: 0;
	}

	/* the initial is a collapsed-only fallback for links without an icon, so the
	   rail never renders an empty row when labels are hidden. */
	.initial {
		font-size: var(--font-size-small);
		font-weight: 600;
	}

	:host(:not([is-collapsed])) .initial {
		display: none;
	}

	.link-label {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		transition:
			opacity 0.14s ease,
			max-width 0.18s ease;
	}

	/* Collapsed rail: labels fade + slide away (rather than snap) so the width
	   animation reads as a smooth expand/collapse. */
	:host([is-collapsed]) .link-label {
		opacity: 0;
		max-width: 0;
		pointer-events: none;
	}
	:host([is-collapsed]) .badge {
		display: none;
	}

	:host([is-collapsed]) .link {
		justify-content: center;
		padding-inline: 0;
	}

	.badge {
		font-size: var(--font-size-caption);
		font-weight: 600;
		padding: 0.0625rem 0.4rem;
		border-radius: 999px;
		background: color-mix(in oklch, var(--accent) 18%, transparent);
		color: var(--accent);
	}
`, S = (s) => Array.isArray(s.items), H = k(
  (s) => {
    const h = Array.isArray(s.items) ? s.items : [], [p, u] = d(!1), [b, g] = d(!1), [m, f] = d([]), v = (e) => {
      f((o) => o.includes(e) ? o.filter((a) => a !== e) : [...o, e]);
    }, w = (e) => {
      e.href || s.select({ value: e.value || e.label });
    }, c = (e, o) => {
      const a = s.value != null && e.value === s.value, n = a ? "link is-active" : "link", t = /* @__PURE__ */ i(z, { children: [
        e.icon ? /* @__PURE__ */ r("span", { class: "icon", innerHTML: e.icon }) : /* @__PURE__ */ r("span", { class: "initial", "aria-hidden": "true", children: (e.label || "").charAt(0) }),
        /* @__PURE__ */ r("span", { class: "link-label", children: e.label }),
        e.badge && /* @__PURE__ */ r("span", { class: "badge", children: e.badge })
      ] });
      return e.href ? /* @__PURE__ */ r("a", { class: n, href: e.href, "aria-current": a ? "page" : void 0, title: e.label, children: t }, o) : /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          class: n,
          "aria-current": a ? "page" : void 0,
          title: e.label,
          onclick: () => w(e),
          children: t
        },
        o
      );
    };
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ r("div", { class: p ? "head has-content" : "head", children: /* @__PURE__ */ r(
        "slot",
        {
          name: "header",
          onslotchange: (e) => u(e.target.assignedNodes().length > 0)
        }
      ) }),
      /* @__PURE__ */ r("nav", { children: h.map((e, o) => {
        if (S(e)) {
          const a = m.includes(o), n = [...e.items].sort((t, l) => (t.label || "").localeCompare(l.label || ""));
          return /* @__PURE__ */ i("div", { class: a ? "group is-closed" : "group", children: [
            e.label && /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                class: "group-label",
                "aria-expanded": a ? "false" : "true",
                onclick: () => v(o),
                children: [
                  /* @__PURE__ */ r("span", { children: e.label }),
                  /* @__PURE__ */ r("svg", { class: "group-chevron", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ r("polyline", { points: "6 9 12 15 18 9" }) })
                ]
              }
            ),
            !a && n.map((t, l) => c(t, `g-${o}-${t.value || t.label || l}`))
          ] }, `g-${o}`);
        }
        return c(e, `l-${o}`);
      }) }),
      /* @__PURE__ */ r("div", { class: b ? "foot has-content" : "foot", children: /* @__PURE__ */ r(
        "slot",
        {
          name: "footer",
          onslotchange: (e) => g(e.target.assignedNodes().length > 0)
        }
      ) })
    ] });
  },
  {
    props: {
      items: { type: Array },
      value: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isCollapsed: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isDocked: { type: Boolean, reflect: !0 },
      select: y({ bubbles: !0, composed: !0 })
    },
    styles: [j, A]
  }
);
C("z-sidebar", H);
export {
  H as ZSidebar
};
