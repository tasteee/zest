import { c as d, a as u, e as p, j as n, g as h, d as f } from "../chunks/define-element-BWC3wEPr.js";
const m = d`
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
		transition: color 0.12s ease;
	}

	.crumb:hover {
		color: var(--accent);
	}

	.crumb:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
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
`, g = () => /* @__PURE__ */ n("svg", { class: "sep", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ n("polyline", { points: "9 6 15 12 9 18" }) }), v = u(
  (s) => {
    const t = Array.isArray(s.items) ? s.items : [], i = typeof s.max == "number" && s.max > 0 ? s.max : 0, o = i > 0 && t.length > i ? [t[0], null, ...t.slice(t.length - (i - 1))] : t, l = (e) => t.indexOf(e), c = (e) => {
      const r = e.isCurrent || l(e) === t.length - 1, a = r ? "crumb is-current" : "crumb";
      return e.href && !r ? /* @__PURE__ */ n("a", { class: a, href: e.href, "aria-current": r ? "page" : void 0, children: e.label }) : /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          class: a,
          "aria-current": r ? "page" : void 0,
          onclick: () => !r && s.navigate({ value: e.label, index: l(e) }),
          children: e.label
        }
      );
    };
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: /* @__PURE__ */ n("ol", { children: o.map((e, r) => /* @__PURE__ */ h("li", { children: [
      e ? c(e) : /* @__PURE__ */ n("span", { class: "ellipsis", children: "…" }),
      r < o.length - 1 && /* @__PURE__ */ n(g, {})
    ] }, e ? e.label + r : "ellipsis")) }) });
  },
  {
    props: {
      items: { type: Array },
      max: { type: Number },
      accent: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      navigate: p({ bubbles: !0, composed: !0 })
    },
    styles: m
  }
);
f("z-breadcrumbs", v);
export {
  v as ZBreadcrumbs
};
