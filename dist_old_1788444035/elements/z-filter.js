import { c as p, a as f, e as m, j as n, g as b, d as v } from "../chunks/define-element-BWC3wEPr.js";
import { u as g } from "../chunks/hooks-D9_x-ckD.js";
const y = p`
	:host {
		display: block;
		--filter-accent: var(--primary);
	}

	:host([accent='dom']) {
		--filter-accent: var(--purple);
	}
	:host([accent='sub']) {
		--filter-accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-disabled]) .filter {
		opacity: 0.55;
		pointer-events: none;
	}

	.filter {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.375rem;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-family: inherit;
		font-weight: 500;
		line-height: 1;
		white-space: nowrap;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: transparent;
		/* resting / candidate: the less-prominent neutral state */
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			background-color 0.12s ease,
			border-color 0.12s ease,
			color 0.12s ease,
			opacity 0.12s ease;
	}

	.filter.is-sm .pill {
		font-size: 0.75rem;
		padding: 0.3125rem 0.6875rem;
	}
	.filter.is-md .pill {
		font-size: 0.8125rem;
		padding: 0.4375rem 0.875rem;
	}

	.pill:hover {
		border-color: color-mix(in srgb, var(--filter-accent) 45%, var(--border));
		color: var(--foreground);
	}

	/* chosen — a crumb (drilled ancestor) or the active frontier leaf. Wins over
	   the muted resting look with an accent tint + border. */
	.pill.is-active,
	.pill.is-crumb {
		background: color-mix(in oklch, var(--filter-accent) 14%, transparent);
		border-color: color-mix(in oklch, var(--filter-accent) 50%, transparent);
		color: var(--filter-accent);
		font-weight: 600;
	}
	/* neutral accent === foreground, which reads fine as text on the faint tint */
	:host(:not([accent])) .pill.is-active,
	:host(:not([accent])) .pill.is-crumb,
	:host([accent='neutral']) .pill.is-active,
	:host([accent='neutral']) .pill.is-crumb {
		color: var(--foreground);
	}

	.pill.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.pill:focus-visible,
	.reset:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	/* reset ✕ */
	.reset {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		padding: 0;
		transition:
			border-color 0.12s ease,
			color 0.12s ease;
	}
	.filter.is-sm .reset {
		width: 1.625rem;
		height: 1.625rem;
	}
	.filter.is-md .reset {
		width: 1.875rem;
		height: 1.875rem;
	}
	.reset:hover {
		border-color: color-mix(in srgb, var(--destructive) 50%, var(--border));
		color: var(--destructive);
	}
	.reset svg {
		width: 0.7rem;
		height: 0.7rem;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		fill: none;
	}

	/* › between the crumb trail and the current frontier */
	.sep {
		display: inline-flex;
		align-items: center;
		color: var(--muted-foreground);
		opacity: 0.5;
	}
	.sep svg {
		width: 0.85rem;
		height: 0.85rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
`, k = (r) => !!(r && r.children && r.children.length), w = (r, s, h) => {
  const u = [r], t = [];
  let i = r;
  for (const e of s) {
    const o = i.find((d) => d.value === e);
    if (!o) break;
    t.push(o), i = o.children || [], u.push(i);
  }
  if (t.length === 0)
    return { crumbs: [], frontier: r, frontierParent: [] };
  const l = t[t.length - 1], a = t.map((e) => e.value), c = (e) => e.map((o, d) => ({ node: o, level: d }));
  return k(l) ? { crumbs: c(t), frontier: l.children, frontierParent: a } : h ? { crumbs: c(t), frontier: [], frontierParent: a } : {
    crumbs: c(t.slice(0, -1)),
    frontier: u[t.length - 1],
    frontierParent: a.slice(0, -1),
    frontierChosen: l.value
  };
}, x = f(
  (r) => {
    const [s, h] = g([]), u = Array.isArray(r.options) ? r.options : [], t = !r.isDrilldown, i = w(u, s, t), l = (e) => {
      r.isDisabled || (h(e), r.change({ value: e.length ? e[e.length - 1] : void 0, path: e }));
    }, a = (e) => {
      e.isDisabled || l([...i.frontierParent, e.value]);
    }, c = ["filter", r.size === "sm" ? "is-sm" : "is-md"].join(" ");
    return /* @__PURE__ */ n("host", { shadowDom: !0, role: "group", "aria-label": r.label, children: /* @__PURE__ */ b("div", { class: c, children: [
      s.length > 0 && /* @__PURE__ */ n("button", { type: "button", class: "reset", "aria-label": r.resetLabel || "Clear", onclick: () => l([]), children: /* @__PURE__ */ n("svg", { viewBox: "0 0 12 12", children: /* @__PURE__ */ n("path", { d: "M3 3l6 6M9 3l-6 6" }) }) }),
      i.crumbs.map((e) => /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          class: "pill is-crumb",
          onclick: () => l(s.slice(0, e.level + 1)),
          children: e.node.label
        },
        `crumb-${e.level}`
      )),
      i.crumbs.length > 0 && i.frontier.length > 0 && /* @__PURE__ */ n("span", { class: "sep", "aria-hidden": "true", children: /* @__PURE__ */ n("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ n("polyline", { points: "9 6 15 12 9 18" }) }) }),
      i.frontier.map((e) => {
        const o = e.value === i.frontierChosen, d = ["pill"].concat(o ? ["is-active"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
        return /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            class: d,
            "aria-pressed": o ? "true" : "false",
            onclick: () => a(e),
            children: e.label
          },
          e.value
        );
      })
    ] }) });
  },
  {
    props: {
      options: { type: Array },
      accent: { type: String, reflect: !0 },
      size: { type: String, reflect: !0 },
      label: String,
      resetLabel: String,
      isDrilldown: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: m({ bubbles: !0, composed: !0 })
    },
    styles: y
  }
);
v("z-filter", x);
export {
  x as ZFilter
};
