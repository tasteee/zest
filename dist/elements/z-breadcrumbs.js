// @ts-self-types="./z-breadcrumbs.d.ts"
import { c as d, a as p, e as u, j as t, g as h, d as f } from "../chunks/define-element-BZUk-KLk.js";
import { o as m } from "../chunks/prop-types-B3Bpi956.js";
const y = d`
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

	ol {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--font-size-sm);
	}

	li {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	.crumb {
		color: var(--text-secondary);
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
		color: var(--tone);
	}

	.crumb:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
		border-radius: var(--radius-sm);
	}

	.crumb.is-current {
		color: var(--text-primary);
		font-weight: var(--font-weight-medium);
		cursor: default;
		pointer-events: none;
	}

	.ellipsis {
		color: var(--text-secondary);
		user-select: none;
	}

	.sep {
		width: 0.875rem;
		height: 0.875rem;
		flex-shrink: 0;
		color: var(--text-secondary);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
`, v = () => /* @__PURE__ */ t("svg", { class: "sep", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ t("polyline", { points: "9 6 15 12 9 18" }) }), x = p(
  (a) => {
    const n = Array.isArray(a.items) ? a.items : [], s = typeof a.max == "number" && a.max > 0 ? a.max : 0, o = s > 0 && n.length > s ? [n[0], null, ...n.slice(n.length - (s - 1))] : n, i = (e) => n.indexOf(e), c = (e) => {
      const r = e.isCurrent || i(e) === n.length - 1, l = r ? "crumb is-current" : "crumb";
      return e.href && !r ? /* @__PURE__ */ t("a", { class: l, href: e.href, "aria-current": r ? "page" : void 0, children: e.label }) : /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          class: l,
          "aria-current": r ? "page" : void 0,
          onclick: () => !r && a.navigate({ value: e.label, index: i(e) }),
          children: e.label
        }
      );
    };
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ t("ol", { children: o.map((e, r) => /* @__PURE__ */ h("li", { children: [
      e ? c(e) : /* @__PURE__ */ t("span", { class: "ellipsis", children: "…" }),
      r < o.length - 1 && /* @__PURE__ */ t(v, {})
    ] }, e ? e.label + r : "ellipsis")) }) });
  },
  {
    props: {
      items: { type: Array },
      max: { type: Number },
      tone: { type: m("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      navigate: u({ bubbles: !0, composed: !0 })
    },
    styles: y
  }
);
f("z-breadcrumbs", x);
export {
  x as ZBreadcrumbs
};
