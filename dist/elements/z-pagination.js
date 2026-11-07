import { c as h, a as m, e as b, j as o, g, d as f } from "../chunks/define-element-BZUk-KLk.js";
import { u as y } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as v } from "../chunks/prop-types-B3Bpi956.js";
import { u as w } from "../chunks/locale-DUDaH1Ni.js";
const k = h`
	:host {
		display: inline-flex;
		--accent: var(--primary);
		user-select: none;
		-webkit-user-select: none;
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
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
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
		outline: 3px solid var(--focus-ring);
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
`, u = (n, r) => {
  const a = [];
  for (let i = n; i <= r; i++) a.push(i);
  return a;
}, x = (n, r, a) => {
  const s = a * 2 + 3 + 2;
  if (r <= s) return u(1, r);
  const t = Math.max(n - a, 3), c = Math.min(n + a, r - 1 - 1), l = t > 3, d = c < r - 1 - 1, e = [1];
  return l ? e.push(-1) : e.push(...u(2, t - 1)), e.push(...u(t, c)), d ? e.push(-1) : e.push(...u(c + 1, r - 1)), e.push(r), e;
}, j = m(
  (n) => {
    const r = w(), [a, i] = y("page"), s = n.total ?? 1, t = Math.max(1, Math.min(a ?? 1, s)), c = n.siblingCount ?? 1, l = (e) => {
      e < 1 || e > s || e === t || (i(e), n.change({ page: e }));
    }, d = x(t, s, c);
    return /* @__PURE__ */ o("host", { shadowDom: !0, children: /* @__PURE__ */ g("nav", { "aria-label": n.label || r("pagination"), children: [
      /* @__PURE__ */ o("button", { class: "arrow", "aria-label": r("previousPage"), disabled: t <= 1, onclick: () => l(t - 1), children: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ o("polyline", { points: "15 18 9 12 15 6" }) }) }),
      d.map(
        (e, p) => e === -1 ? /* @__PURE__ */ o("span", { class: "ellipsis", children: "…" }, `e${p}`) : /* @__PURE__ */ o(
          "button",
          {
            class: e === t ? "is-current" : "",
            "aria-current": e === t ? "page" : void 0,
            onclick: () => l(e),
            children: e
          },
          e
        )
      ),
      /* @__PURE__ */ o("button", { class: "arrow", "aria-label": r("nextPage"), disabled: t >= s, onclick: () => l(t + 1), children: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ o("polyline", { points: "9 18 15 12 9 6" }) }) })
    ] }) });
  },
  {
    props: {
      label: { type: String, reflect: !0 },
      page: { type: Number, reflect: !0 },
      total: { type: Number, reflect: !0 },
      siblingCount: { type: Number, reflect: !0 },
      tone: { type: v("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: b({ bubbles: !0, composed: !0 })
    },
    styles: k
  }
);
f("z-pagination", j);
export {
  j as ZPagination
};
