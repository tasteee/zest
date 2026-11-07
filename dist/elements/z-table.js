import { c as d, a as c, e as m, j as t, g as b, d as h } from "../chunks/define-element-BZUk-KLk.js";
import { i as y } from "../chunks/interaction-styles-XiKFAbWA.js";
import { t as u } from "../chunks/scrollbar-styles-Csqxxw2V.js";
import { u as g } from "../chunks/locale-DUDaH1Ni.js";
const f = d`
	:host {
		display: block;
		width: 100%;
	}

	:host([is-hidden]) {
		display: none;
	}

	.wrap {
		width: 100%;
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-family: inherit;
	}

	thead th {
		text-align: start;
		padding: 0.875rem 1.125rem;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--muted-foreground);
		border-bottom: 1px solid var(--border);
		white-space: nowrap;
	}

	tbody td {
		padding: 0.9375rem 1.125rem;
		font-size: 0.875rem;
		color: var(--foreground);
		border-bottom: 1px solid var(--border);
		vertical-align: middle;
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	:host([is-clickable]) tbody tr {
		cursor: pointer;
	}

	tbody tr {
		transition: background-color var(--motion-instant) var(--ease-enter);
	}
	tbody tr:hover {
		background: color-mix(in oklch, var(--foreground) 4%, transparent);
	}

	:host([is-striped]) tbody tr:nth-child(even) {
		background: color-mix(in oklch, var(--foreground) 3%, transparent);
	}

	.align-end {
		text-align: end;
	}
	.align-center {
		text-align: center;
	}
	.is-mono {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
	}

	tbody tr:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: -3px;
	}

	.empty {
		padding: 2.5rem;
		text-align: center;
		color: var(--muted-foreground);
		font-size: 0.875rem;
	}
`, p = c(
  (r) => {
    const l = g(), n = Array.isArray(r.columns) ? r.columns : [], a = Array.isArray(r.rows) ? r.rows : [], s = (e) => [e.align ? `align-${e.align}` : "", e.isMono ? "is-mono" : ""].filter(Boolean).join(" ") || void 0;
    return /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ t("div", { class: "wrap", children: /* @__PURE__ */ b("table", { children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: n.map((e) => /* @__PURE__ */ t("th", { class: e.align ? `align-${e.align}` : void 0, children: e.label }, e.key)) }) }),
      /* @__PURE__ */ t("tbody", { children: a.length === 0 ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { class: "empty", colspan: String(n.length || 1), children: r.emptyLabel || l("noData") }) }) : a.map((e, i) => /* @__PURE__ */ t(
        "tr",
        {
          tabindex: r.isClickable ? "0" : void 0,
          onclick: () => r.isClickable && r.rowclick({ row: e, index: i }),
          onkeydown: (o) => {
            !r.isClickable || o.key !== "Enter" && o.key !== " " || (o.preventDefault(), r.rowclick({ row: e, index: i }));
          },
          children: n.map((o) => /* @__PURE__ */ t("td", { class: s(o), children: String(e[o.key] ?? "") }, o.key))
        },
        e.id ?? i
      )) })
    ] }) }) });
  },
  {
    props: {
      columns: { type: Array },
      rows: { type: Array },
      emptyLabel: String,
      isStriped: { type: Boolean, reflect: !0 },
      isClickable: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      rowclick: m({ bubbles: !0, composed: !0 })
    },
    styles: [u, f, y]
  }
);
h("z-table", p);
export {
  p as ZTable
};
