import { c as p, a as h, e as g, j as s, g as b, d as m } from "../chunks/define-element-BWC3wEPr.js";
import { u as f } from "../chunks/use-prop-DBBKVpkc.js";
const y = p`
	:host {
		display: inline-flex;
		--accent: var(--primary);
		user-select: none;
		-webkit-user-select: none;
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	nav {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.25rem;
		height: 2.25rem;
		padding: 0 0.5rem;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--foreground);
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: border-color 0.12s ease, background-color 0.12s ease, color 0.12s ease;
	}

	button:hover:not(:disabled):not(.is-current) {
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
		color: var(--primary);
	}

	button.is-current {
		border-color: var(--accent);
		color: var(--accent);
		background: color-mix(in oklch, var(--accent) 12%, transparent);
		font-weight: 600;
		cursor: default;
	}

	button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.arrow svg {
		width: 1rem;
		height: 1rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.ellipsis {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.25rem;
		height: 2.25rem;
		color: var(--muted-foreground);
		user-select: none;
	}
`, u = (i, r) => {
  const a = [];
  for (let t = i; t <= r; t++) a.push(t);
  return a;
}, v = (i, r, a) => {
  const n = a * 2 + 3 + 2;
  if (r <= n) return u(1, r);
  const l = Math.max(i - a, 3), c = Math.min(i + a, r - 1 - 1), d = l > 3, e = c < r - 1 - 1, o = [1];
  return d ? o.push(-1) : o.push(...u(2, l - 1)), o.push(...u(l, c)), e ? o.push(-1) : o.push(...u(c + 1, r - 1)), o.push(r), o;
}, w = h(
  (i) => {
    const [r, a] = f("page"), t = i.total ?? 1, n = Math.max(1, Math.min(r ?? 1, t)), l = i.siblingCount ?? 1, c = (e) => {
      e < 1 || e > t || e === n || (a(e), i.change({ page: e }));
    }, d = v(n, t, l);
    return /* @__PURE__ */ s("host", { shadowDom: !0, children: /* @__PURE__ */ b("nav", { "aria-label": "Pagination", children: [
      /* @__PURE__ */ s("button", { class: "arrow", "aria-label": "Previous page", disabled: n <= 1, onclick: () => c(n - 1), children: /* @__PURE__ */ s("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ s("polyline", { points: "15 18 9 12 15 6" }) }) }),
      d.map(
        (e, o) => e === -1 ? /* @__PURE__ */ s("span", { class: "ellipsis", children: "…" }, `e${o}`) : /* @__PURE__ */ s(
          "button",
          {
            class: e === n ? "is-current" : "",
            "aria-current": e === n ? "page" : void 0,
            onclick: () => c(e),
            children: e
          },
          e
        )
      ),
      /* @__PURE__ */ s("button", { class: "arrow", "aria-label": "Next page", disabled: n >= t, onclick: () => c(n + 1), children: /* @__PURE__ */ s("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ s("polyline", { points: "9 18 15 12 9 6" }) }) })
    ] }) });
  },
  {
    props: {
      page: { type: Number, reflect: !0 },
      total: { type: Number, reflect: !0 },
      siblingCount: { type: Number, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: g({ bubbles: !0, composed: !0 })
    },
    styles: y
  }
);
m("z-pagination", w);
export {
  w as ZPagination
};
