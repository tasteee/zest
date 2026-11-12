// @ts-self-types="./z-pagination.d.ts"
import { c as h, a as m, e as b, j as n, g as f, d as g } from "../chunks/define-element-BZUk-KLk.js";
import { u as y } from "../chunks/use-prop-C0_HeSQ9.js";
import { o as v } from "../chunks/prop-types-B3Bpi956.js";
import { u as w } from "../chunks/locale-Bb4aqXuR.js";
const x = h`
	:host {
		display: inline-flex;
		--tone: var(--accent-primary);
		user-select: none;
		-webkit-user-select: none;
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

	nav {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.25rem;
		height: 2.25rem;
		padding: 0 var(--space-2);
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--text-primary);
		font-family: inherit;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
	}

	button:hover:not(:disabled):not(.is-current) {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
		color: var(--text-primary);
	}

	button.is-current {
		border-color: var(--tone);
		color: var(--tone);
		background: color-mix(in oklch, var(--tone) 12%, transparent);
		font-weight: var(--font-weight-semibold);
		cursor: default;
	}

	button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
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
		color: var(--text-secondary);
		user-select: none;
	}
`, u = (o, t) => {
  const a = [];
  for (let s = o; s <= t; s++) a.push(s);
  return a;
}, k = (o, t, a) => {
  const i = a * 2 + 3 + 2;
  if (t <= i) return u(1, t);
  const r = Math.max(o - a, 3), l = Math.min(o + a, t - 1 - 1), c = r > 3, d = l < t - 1 - 1, e = [1];
  return c ? e.push(-1) : e.push(...u(2, r - 1)), e.push(...u(r, l)), d ? e.push(-1) : e.push(...u(l + 1, t - 1)), e.push(t), e;
}, j = m(
  (o) => {
    const t = w(), [a, s] = y("page"), i = o.total ?? 1, r = Math.max(1, Math.min(a ?? 1, i)), l = o.siblingCount ?? 1, c = (e) => {
      e < 1 || e > i || e === r || (s(e), o.change({ page: e }));
    }, d = k(r, i, l);
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: /* @__PURE__ */ f("nav", { "aria-label": o.label || t("pagination"), children: [
      /* @__PURE__ */ n("button", { class: "arrow", "aria-label": t("previousPage"), disabled: r <= 1, onclick: () => c(r - 1), children: /* @__PURE__ */ n("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ n("polyline", { points: "15 18 9 12 15 6" }) }) }),
      d.map(
        (e, p) => e === -1 ? /* @__PURE__ */ n("span", { class: "ellipsis", children: "…" }, `e${p}`) : /* @__PURE__ */ n(
          "button",
          {
            class: e === r ? "is-current" : "",
            "aria-current": e === r ? "page" : void 0,
            onclick: () => c(e),
            children: e
          },
          e
        )
      ),
      /* @__PURE__ */ n("button", { class: "arrow", "aria-label": t("nextPage"), disabled: r >= i, onclick: () => c(r + 1), children: /* @__PURE__ */ n("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ n("polyline", { points: "9 18 15 12 9 6" }) }) })
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
    styles: x
  }
);
g("z-pagination", j);
export {
  j as ZPagination
};
