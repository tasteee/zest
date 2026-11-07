import { c as d, a as u, e as p, j as n, g as f, d as m } from "../chunks/define-element-BZUk-KLk.js";
import { o as h } from "../chunks/prop-types-B3Bpi956.js";
const g = d`
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

	ol {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--font-size-small);
	}

	li {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.crumb {
		color: var(--muted-foreground);
		text-decoration: none;
		background: transparent;
		border: 0;
		padding: 0;
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter);
	}

	.crumb:hover {
		color: var(--accent);
	}

	.crumb:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	.crumb.is-current {
		color: var(--foreground);
		font-weight: 500;
		cursor: default;
		pointer-events: none;
	}

	.ellipsis {
		color: var(--muted-foreground);
		user-select: none;
	}

	.sep {
		width: 0.875rem;
		height: 0.875rem;
		flex-shrink: 0;
		color: var(--muted-foreground);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
`, v = () => /* @__PURE__ */ n("svg", { class: "sep", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ n("polyline", { points: "9 6 15 12 9 18" }) }), y = u(
  (o) => {
    const t = Array.isArray(o.items) ? o.items : [], s = typeof o.max == "number" && o.max > 0 ? o.max : 0, a = s > 0 && t.length > s ? [t[0], null, ...t.slice(t.length - (s - 1))] : t, i = (e) => t.indexOf(e), c = (e) => {
      const r = e.isCurrent || i(e) === t.length - 1, l = r ? "crumb is-current" : "crumb";
      return e.href && !r ? /* @__PURE__ */ n("a", { class: l, href: e.href, "aria-current": r ? "page" : void 0, children: e.label }) : /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          class: l,
          "aria-current": r ? "page" : void 0,
          onclick: () => !r && o.navigate({ value: e.label, index: i(e) }),
          children: e.label
        }
      );
    };
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: /* @__PURE__ */ n("ol", { children: a.map((e, r) => /* @__PURE__ */ f("li", { children: [
      e ? c(e) : /* @__PURE__ */ n("span", { class: "ellipsis", children: "…" }),
      r < a.length - 1 && /* @__PURE__ */ n(v, {})
    ] }, e ? e.label + r : "ellipsis")) }) });
  },
  {
    props: {
      items: { type: Array },
      max: { type: Number },
      tone: { type: h("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      navigate: p({ bubbles: !0, composed: !0 })
    },
    styles: g
  }
);
m("z-breadcrumbs", y);
export {
  y as ZBreadcrumbs
};
