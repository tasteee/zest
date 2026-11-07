import { c as b, a as g, e as y, j as n, g as w } from "../chunks/define-element-BZUk-KLk.js";
import { u as k, d as x } from "../chunks/form-control-D_UwalCr.js";
import { u as D } from "../chunks/locale-DUDaH1Ni.js";
import { u as C } from "../chunks/hooks-DEFT8qqt.js";
import { o as m } from "../chunks/prop-types-B3Bpi956.js";
const j = b`
	:host {
		display: block;
		--filter-accent: var(--primary);
	}

	:host([tone='secondary']) {
		--filter-accent: var(--purple);
	}
	:host([tone='tertiary']) {
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
			background-color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter),
			opacity var(--motion-fast) var(--ease-enter);
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

	/* chosen, a crumb (drilled ancestor) or the active frontier leaf. Wins over
	   the muted resting look with an accent tint + border. */
	.pill.is-active,
	.pill.is-crumb {
		background: color-mix(in oklch, var(--filter-accent) 14%, transparent);
		border-color: color-mix(in oklch, var(--filter-accent) 50%, transparent);
		color: var(--filter-accent);
		font-weight: 600;
	}
	/* neutral tone === foreground, which reads fine as text on the faint tint */
	:host(:not([tone])) .pill.is-active,
	:host(:not([tone])) .pill.is-crumb,
	:host([tone='primary']) .pill.is-active,
	:host([tone='primary']) .pill.is-crumb {
		color: var(--foreground);
	}

	.pill.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.pill:focus-visible,
	.reset:focus-visible {
		outline: 3px solid var(--focus-ring);
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
			border-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
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
`, P = (r) => !!(r && r.children && r.children.length), z = (r, h, s) => {
  const a = [r], t = [];
  let c = r;
  for (const o of h) {
    const l = c.find((f) => f.value === o);
    if (!l) break;
    t.push(l), c = l.children || [], a.push(c);
  }
  if (t.length === 0)
    return { crumbs: [], frontier: r, frontierParent: [] };
  const d = t[t.length - 1], u = t.map((o) => o.value), i = (o) => o.map((l, f) => ({ node: l, level: f }));
  return P(d) ? { crumbs: i(t), frontier: d.children, frontierParent: u } : s ? { crumbs: i(t), frontier: [], frontierParent: u } : {
    crumbs: i(t.slice(0, -1)),
    frontier: a[t.length - 1],
    frontierParent: u.slice(0, -1),
    frontierChosen: d.value
  };
}, B = g(
  (r) => {
    const h = D(), [s, a] = C([]), { isFormDisabled: t } = k({
      value: s.length ? s[s.length - 1] : null,
      isDisabled: r.isDisabled,
      onReset: () => a([]),
      onRestore: (e) => {
        typeof e == "string" && a(e ? [e] : []);
      }
    }), c = r.isDisabled || t, d = Array.isArray(r.options) ? r.options : [], u = !r.isDrilldown, i = z(d, s, u), o = (e) => {
      c || (a(e), r.change({ value: e.length ? e[e.length - 1] : void 0, path: e }));
    }, l = (e) => {
      e.isDisabled || o([...i.frontierParent, e.value]);
    }, f = ["filter", r.size === "sm" ? "is-sm" : "is-md"].join(" ");
    return /* @__PURE__ */ n("host", { shadowDom: !0, role: "group", "aria-label": r.label, children: /* @__PURE__ */ w("div", { class: f, children: [
      s.length > 0 && /* @__PURE__ */ n("button", { type: "button", class: "reset", "aria-label": r.resetLabel || h("clear"), onclick: () => o([]), children: /* @__PURE__ */ n("svg", { viewBox: "0 0 12 12", children: /* @__PURE__ */ n("path", { d: "M3 3l6 6M9 3l-6 6" }) }) }),
      i.crumbs.map((e) => /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          class: "pill is-crumb",
          onclick: () => o(s.slice(0, e.level + 1)),
          children: e.node.label
        },
        `crumb-${e.level}`
      )),
      i.crumbs.length > 0 && i.frontier.length > 0 && /* @__PURE__ */ n("span", { class: "sep", "aria-hidden": "true", children: /* @__PURE__ */ n("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ n("polyline", { points: "9 6 15 12 9 18" }) }) }),
      i.frontier.map((e) => {
        const p = e.value === i.frontierChosen, v = ["pill"].concat(p ? ["is-active"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
        return /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            class: v,
            "aria-pressed": p ? "true" : "false",
            onclick: () => l(e),
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
      name: { type: String, reflect: !0 },
      tone: { type: m("primary", "secondary", "tertiary"), reflect: !0 },
      size: { type: m("sm", "md", "lg"), reflect: !0 },
      label: String,
      resetLabel: String,
      isDrilldown: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: y({ bubbles: !0, composed: !0 })
    },
    styles: j,
    form: !0
  }
);
x("z-filter", B);
export {
  B as ZFilter
};
