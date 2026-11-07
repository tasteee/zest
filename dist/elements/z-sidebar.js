import { c as y, a as k, e as z, u as C, b as S, g as i, j as t, d as j, F as A } from "../chunks/define-element-BZUk-KLk.js";
import { u as l } from "../chunks/hooks-DEFT8qqt.js";
import { t as H } from "../chunks/scrollbar-styles-Csqxxw2V.js";
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
		background: var(--color-neutral-0);
		border: 1px solid var(--sidebar-border);
		border-radius: var(--radius-lg);
		padding: var(--space-sm) var(--space-md) var(--space-md);
		color: var(--sidebar-foreground);
		--accent: var(--primary);
		transition: width var(--motion-fast) var(--ease-enter);
		user-select: none;
		-webkit-user-select: none;
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
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
		border-inline-end: 1px solid var(--sidebar-border);
		border-radius: 0;
		padding: var(--space-sm) 0 var(--space-md);
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

	/* Firefox has no ::-webkit-scrollbar and never draws arrows, give it the
	   standard thin themed bar. Chromium must NOT get scrollbar-width: with it set,
	   Chrome falls back to the OS scrollbar (stepper arrows on Windows) and ignores
	   the custom rules below. */
	@supports not selector(::-webkit-scrollbar) {
		nav {
			scrollbar-width: thin;
			scrollbar-color: var(--color-neutral-3) transparent;
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
		background: var(--color-neutral-3);
		border-radius: 999px;
	}
	nav::-webkit-scrollbar-thumb:hover {
		background: var(--color-neutral-4);
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
		gap: 0.5rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0.375rem 0.625rem 0.875rem;
		font-family: inherit;
		font-size: var(--font-size-caption);
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--muted-foreground);
		background: transparent;
		border: 0;
		text-align: start;
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		transition: color var(--motion-fast) var(--ease-enter);
	}

	.group:first-child > .group-label {
		padding-top: 0.5rem;
	}

	/* a group nested inside a group: a quieter, sentence-case sub-heading */
	.group .group .group-label {
		padding: 0.5rem 0.625rem 0.375rem 1.125rem;
		font-weight: 600;
		letter-spacing: 0;
		text-transform: none;
	}

	.group .group .group-chevron {
		display: none;
	}

	.group-label:hover {
		color: var(--foreground);
	}

	.group-label:focus-visible {
		outline: 3px solid var(--focus-ring);
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
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
	}

	.link.is-active {
		color: var(--accent);
		background: color-mix(in oklch, var(--accent) 12%, transparent);
	}

	:host(:not([is-collapsed])) .group .link {
		margin-inline-start: 0.5rem;
		width: calc(100% - 0.5rem);
	}

	.group > .link:last-child,
	.group > .group:last-child {
		margin-bottom: 1rem;
	}

	.group .group > .link:last-child {
		margin-bottom: 0.5rem;
	}

	:host(:not([is-collapsed])) .group .group .link {
		margin-inline-start: 1rem;
		width: calc(100% - 1rem);
	}

	.link:focus-visible {
		outline: 3px solid var(--focus-ring);
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
`, $ = (s) => Array.isArray(s.items), G = k(
  (s) => {
    const c = Array.isArray(s.items) ? s.items : [], [p, h] = l(!1), [u, g] = l(!1), [m, b] = l([]), f = C();
    S(() => {
      const e = f.current.shadowRoot, r = e == null ? void 0 : e.querySelector("nav"), o = e == null ? void 0 : e.querySelector(".is-active");
      if (!r || !o) return;
      const a = r.getBoundingClientRect(), n = o.getBoundingClientRect();
      n.top < a.top ? r.scrollTop -= a.top - n.top + 12 : n.bottom > a.bottom && (r.scrollTop += n.bottom - a.bottom + 12);
    }, [s.value]);
    const v = (e) => {
      b((r) => r.includes(e) ? r.filter((o) => o !== e) : [...r, e]);
    }, w = (e) => {
      e.href || s.select({ value: e.value || e.label });
    }, x = (e, r) => {
      const o = s.value != null && e.value === s.value, a = o ? "link is-active" : "link", n = /* @__PURE__ */ i(A, { children: [
        e.icon ? /* @__PURE__ */ t("span", { class: "icon", innerHTML: e.icon }) : /* @__PURE__ */ t("span", { class: "initial", "aria-hidden": "true", children: (e.label || "").charAt(0) }),
        /* @__PURE__ */ t("span", { class: "link-label", children: e.label }),
        e.badge && /* @__PURE__ */ t("span", { class: "badge", children: e.badge })
      ] });
      return e.href ? /* @__PURE__ */ t("a", { class: a, href: e.href, "aria-current": o ? "page" : void 0, title: e.label, children: n }, r) : /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          class: a,
          "aria-current": o ? "page" : void 0,
          title: e.label,
          onclick: () => w(e),
          children: n
        },
        r
      );
    }, d = (e, r) => {
      if (!$(e)) return x(e, `l-${r}`);
      const o = m.includes(r);
      return /* @__PURE__ */ i("div", { class: o ? "group is-closed" : "group", children: [
        e.label && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            class: "group-label",
            "aria-expanded": o ? "false" : "true",
            onclick: () => v(r),
            children: [
              /* @__PURE__ */ t("span", { children: e.label }),
              /* @__PURE__ */ t("svg", { class: "group-chevron", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ t("polyline", { points: "6 9 12 15 18 9" }) })
            ]
          }
        ),
        !o && e.items.map((a, n) => d(a, `${r}-${n}`))
      ] }, `g-${r}`);
    };
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ t("div", { class: p ? "head has-content" : "head", children: /* @__PURE__ */ t(
        "slot",
        {
          name: "header",
          onslotchange: (e) => h(e.target.assignedNodes().length > 0)
        }
      ) }),
      /* @__PURE__ */ t("nav", { children: c.map((e, r) => d(e, `${r}`)) }),
      /* @__PURE__ */ t("div", { class: u ? "foot has-content" : "foot", children: /* @__PURE__ */ t(
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
