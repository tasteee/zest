// @ts-self-types="./z-sidebar.d.ts"
import { c as y, a as k, e as z, u as C, b as S, g as i, j as a, d as j, F as A } from "../chunks/define-element-BZUk-KLk.js";
import { u as l } from "../chunks/hooks-DEFT8qqt.js";
import { t as H } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { o as B } from "../chunks/prop-types-B3Bpi956.js";
const F = y`
	:host {
		display: flex;
		flex-direction: column;
		width: var(--z-sidebar-width, 16rem);
		box-sizing: border-box;
		/* fills a parent with a definite height (app shells), falls back to its
		   natural content height inline; min-height: 0 lets it shrink and scroll
		   its nav inside flex/grid parents. */
		height: 100%;
		min-height: 0;
		max-height: 100%;
		background: var(--surface-page);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		padding: var(--space-2) var(--space-3) var(--space-3);
		color: var(--text-primary);
		--tone: var(--accent-primary);
		transition: width var(--motion-fast) var(--ease-enter);
		user-select: none;
		-webkit-user-select: none;
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
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
		border-inline-end: 1px solid var(--border-default);
		border-radius: 0;
		padding: var(--space-2) 0 var(--space-3);
	}

	.head.has-content {
		padding: var(--space-1) var(--space-2) var(--space-3);
	}

	.foot.has-content {
		margin-top: auto;
		padding-top: var(--space-3);
		border-top: 1px solid var(--border-default);
	}

	nav {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
		gap: var(--space-0-5);
		overflow-y: auto;
	}

	/* Firefox has no ::-webkit-scrollbar and never draws arrows, give it the
	   standard thin themed bar. Chromium must NOT get scrollbar-width: with it set,
	   Chrome falls back to the OS scrollbar (stepper arrows on Windows) and ignores
	   the custom rules below. */
	@supports not selector(::-webkit-scrollbar) {
		nav {
			scrollbar-width: thin;
			scrollbar-color: var(--border-default) transparent;
		}
	}

	/* WebKit / Chromium, slim, track-less, arrow-less */
	nav::-webkit-scrollbar {
		width: 6px;
	}
	nav::-webkit-scrollbar-track {
		background: transparent;
	}
	nav::-webkit-scrollbar-thumb {
		background: var(--border-default);
		border-radius: var(--radius-full);
	}
	nav::-webkit-scrollbar-thumb:hover {
		background: var(--border-strong);
	}
	/* No stepper arrows: Windows Chromium renders them otherwise. */
	nav::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}

	.group-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		width: 100%;
		box-sizing: border-box;
		padding: var(--space-1-5) var(--space-2-5) var(--space-3-5);
		font-family: inherit;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-secondary);
		background: transparent;
		border: 0;
		text-align: start;
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		transition: color var(--motion-fast) var(--ease-enter);
	}

	.group:first-child > .group-label {
		padding-top: var(--space-2);
	}

	/* a group nested inside a group: a quieter, sentence-case sub-heading */
	.group .group .group-label {
		padding: var(--space-2) var(--space-2-5) var(--space-1-5) var(--space-5);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0;
		text-transform: none;
	}

	.group .group .group-chevron {
		display: none;
	}

	.group-label:hover {
		color: var(--text-primary);
	}

	.group-label:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
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
		transition: transform var(--motion-fast) var(--ease-enter);
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
		gap: var(--space-2-5);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-md);
		font-family: inherit;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		text-decoration: none;
		background: transparent;
		border: 0;
		text-align: start;
		width: 100%;
		box-sizing: border-box;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.link:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 6%, transparent);
	}

	.link.is-active {
		color: var(--tone);
		background: color-mix(in oklch, var(--tone) 12%, transparent);
	}

	:host(:not([is-collapsed])) .group .link {
		margin-inline-start: var(--space-2);
		width: calc(100% - 0.5rem);
	}

	.group > .link:last-child,
	.group > .group:last-child {
		margin-bottom: var(--space-4);
	}

	.group .group > .link:last-child {
		margin-bottom: var(--space-2);
	}

	:host(:not([is-collapsed])) .group .group .link {
		margin-inline-start: var(--space-4);
		width: calc(100% - 1rem);
	}

	.link:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
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
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
	}

	:host(:not([is-collapsed])) .initial {
		display: none;
	}

	.link-label {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			max-width var(--motion-fast) var(--ease-enter);
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
		gap: 0;
		padding-inline: 0;
	}

	.badge {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		padding: 0.0625rem var(--space-1-5);
		border-radius: var(--radius-full);
		background: color-mix(in oklch, var(--tone) 18%, transparent);
		color: var(--tone);
	}
`, $ = (n) => Array.isArray(n.items), G = k(
  (n) => {
    const d = Array.isArray(n.items) ? n.items : [], [p, h] = l(!1), [u, g] = l(!1), [v, b] = l([]), f = C();
    S(() => {
      const e = f.current.shadowRoot, r = e == null ? void 0 : e.querySelector("nav"), t = e == null ? void 0 : e.querySelector(".is-active");
      if (!r || !t) return;
      const o = r.getBoundingClientRect(), s = t.getBoundingClientRect();
      s.top < o.top ? r.scrollTop -= o.top - s.top + 12 : s.bottom > o.bottom && (r.scrollTop += s.bottom - o.bottom + 12);
    }, [n.value]);
    const m = (e) => {
      b((r) => r.includes(e) ? r.filter((t) => t !== e) : [...r, e]);
    }, w = (e) => {
      e.href || n.select({ value: e.value || e.label });
    }, x = (e, r) => {
      const t = n.value != null && e.value === n.value, o = t ? "link is-active" : "link", s = /* @__PURE__ */ i(A, { children: [
        e.icon ? /* @__PURE__ */ a("span", { class: "icon", innerHTML: e.icon }) : /* @__PURE__ */ a("span", { class: "initial", "aria-hidden": "true", children: (e.label || "").charAt(0) }),
        /* @__PURE__ */ a("span", { class: "link-label", children: e.label }),
        e.badge && /* @__PURE__ */ a("span", { class: "badge", children: e.badge })
      ] });
      return e.href ? /* @__PURE__ */ a("a", { class: o, href: e.href, "aria-current": t ? "page" : void 0, title: e.label, children: s }, r) : /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          class: o,
          "aria-current": t ? "page" : void 0,
          title: e.label,
          onclick: () => w(e),
          children: s
        },
        r
      );
    }, c = (e, r) => {
      if (!$(e)) return x(e, `l-${r}`);
      const t = v.includes(r);
      return /* @__PURE__ */ i("div", { class: t ? "group is-closed" : "group", children: [
        e.label && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            class: "group-label",
            "aria-expanded": t ? "false" : "true",
            onclick: () => m(r),
            children: [
              /* @__PURE__ */ a("span", { children: e.label }),
              /* @__PURE__ */ a("svg", { class: "group-chevron", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ a("polyline", { points: "6 9 12 15 18 9" }) })
            ]
          }
        ),
        !t && e.items.map((o, s) => c(o, `${r}-${s}`))
      ] }, `g-${r}`);
    };
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ a("div", { class: p ? "head has-content" : "head", children: /* @__PURE__ */ a(
        "slot",
        {
          name: "header",
          onslotchange: (e) => h(e.target.assignedNodes().length > 0)
        }
      ) }),
      /* @__PURE__ */ a("nav", { children: d.map((e, r) => c(e, `${r}`)) }),
      /* @__PURE__ */ a("div", { class: u ? "foot has-content" : "foot", children: /* @__PURE__ */ a(
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
      tone: { type: B("primary", "secondary", "tertiary"), reflect: !0 },
      isCollapsed: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      isDocked: { type: Boolean, reflect: !0 },
      select: z({ bubbles: !0, composed: !0 })
    },
    styles: [H, F]
  }
);
j("z-sidebar", G);
export {
  G as ZSidebar
};
