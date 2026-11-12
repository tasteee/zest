// @ts-self-types="./z-filter.d.ts"
import { c as b, a as g, e as y, j as n, g as w } from "../chunks/define-element-BZUk-KLk.js";
import { u as x, d as k } from "../chunks/form-control-CrK-0rhn.js";
import { u as D } from "../chunks/locale-Bb4aqXuR.js";
import { u as C } from "../chunks/hooks-DEFT8qqt.js";
import { o as v } from "../chunks/prop-types-B3Bpi956.js";
const j = b`
	:host {
		display: block;
		--filter-accent: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--filter-accent: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--filter-accent: var(--accent-tertiary);
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
		gap: var(--space-1-5);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
		font-family: inherit;
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-none);
		white-space: nowrap;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-full);
		background: transparent;
		/* resting / candidate: the less-prominent neutral state */
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			background-color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter),
			opacity var(--motion-fast) var(--ease-enter);
	}

	.filter.is-sm .pill {
		font-size: var(--font-size-xs);
		padding: var(--space-1-5) var(--space-3);
	}
	.filter.is-md .pill {
		font-size: var(--font-size-sm);
		padding: var(--space-2) var(--space-3-5);
	}

	.pill:hover {
		border-color: color-mix(in srgb, var(--filter-accent) 45%, var(--border-default));
		color: var(--text-primary);
	}

	/* chosen, a crumb (drilled ancestor) or the active frontier leaf. Wins over
	   the muted resting look with an accent tint + border. */
	.pill.is-active,
	.pill.is-crumb {
		background: color-mix(in oklch, var(--filter-accent) 14%, transparent);
		border-color: color-mix(in oklch, var(--filter-accent) 50%, transparent);
		color: var(--filter-accent);
		font-weight: var(--font-weight-semibold);
	}
	/* neutral tone === foreground, which reads fine as text on the faint tint */
	:host(:not([tone])) .pill.is-active,
	:host(:not([tone])) .pill.is-crumb,
	:host([tone='primary']) .pill.is-active,
	:host([tone='primary']) .pill.is-crumb {
		color: var(--text-primary);
	}

	.pill.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.pill:focus-visible,
	.reset:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	/* reset ✕ */
	.reset {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-secondary);
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
		border-color: color-mix(in srgb, var(--status-danger) 50%, var(--border-default));
		color: var(--status-danger);
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
		color: var(--text-secondary);
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
`, z = (r) => !!(r && r.children && r.children.length), P = (r, h, s) => {
  const l = [r], t = [];
  let c = r;
  for (const o of h) {
    const a = c.find((u) => u.value === o);
    if (!a) break;
    t.push(a), c = a.children || [], l.push(c);
  }
  if (t.length === 0)
    return { crumbs: [], frontier: r, frontierParent: [] };
  const d = t[t.length - 1], f = t.map((o) => o.value), i = (o) => o.map((a, u) => ({ node: a, level: u }));
  return z(d) ? { crumbs: i(t), frontier: d.children, frontierParent: f } : s ? { crumbs: i(t), frontier: [], frontierParent: f } : {
    crumbs: i(t.slice(0, -1)),
    frontier: l[t.length - 1],
    frontierParent: f.slice(0, -1),
    frontierChosen: d.value
  };
}, B = g(
  (r) => {
    const h = D(), [s, l] = C([]), { isFormDisabled: t } = x({
      value: s.length ? s[s.length - 1] : null,
      isDisabled: r.isDisabled,
      onReset: () => l([]),
      onRestore: (e) => {
        typeof e == "string" && l(e ? [e] : []);
      }
    }), c = r.isDisabled || t, d = Array.isArray(r.options) ? r.options : [], f = !r.isDrilldown, i = P(d, s, f), o = (e) => {
      c || (l(e), r.change({ value: e.length ? e[e.length - 1] : void 0, path: e }));
    }, a = (e) => {
      e.isDisabled || o([...i.frontierParent, e.value]);
    }, u = ["filter", r.size === "sm" ? "is-sm" : "is-md"].join(" ");
    return /* @__PURE__ */ n("host", { shadowDom: !0, role: "group", "aria-label": r.label, children: /* @__PURE__ */ w("div", { class: u, children: [
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
        const p = e.value === i.frontierChosen, m = ["pill"].concat(p ? ["is-active"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
        return /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            class: m,
            "aria-pressed": p ? "true" : "false",
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
      name: { type: String, reflect: !0 },
      tone: { type: v("primary", "secondary", "tertiary"), reflect: !0 },
      size: { type: v("sm", "md", "lg"), reflect: !0 },
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
k("z-filter", B);
export {
  B as ZFilter
};
