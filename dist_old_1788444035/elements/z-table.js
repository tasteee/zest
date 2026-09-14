import { c as s, a as d, e as c, j as r, g as m, d as h } from "../chunks/define-element-BWC3wEPr.js";
import { t as b } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const g = s`
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
		text-align: left;
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
		transition: background-color 0.1s ease;
	}
	tbody tr:hover {
		background: color-mix(in oklch, var(--foreground) 4%, transparent);
	}

	:host([is-striped]) tbody tr:nth-child(even) {
		background: color-mix(in oklch, var(--foreground) 3%, transparent);
	}

	.align-end {
		text-align: right;
	}
	.align-center {
		text-align: center;
	}
	.is-mono {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
	}

	.empty {
		padding: 2.5rem;
		text-align: center;
		color: var(--muted-foreground);
		font-size: 0.875rem;
	}
`, y = d(
  (t) => {
    const o = Array.isArray(t.columns) ? t.columns : [], n = Array.isArray(t.rows) ? t.rows : [], l = (e) => [e.align ? `align-${e.align}` : "", e.isMono ? "is-mono" : ""].filter(Boolean).join(" ") || void 0;
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("div", { class: "wrap", children: /* @__PURE__ */ m("table", { children: [
      /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ r("tr", { children: o.map((e) => /* @__PURE__ */ r("th", { class: e.align ? `align-${e.align}` : void 0, children: e.label }, e.key)) }) }),
      /* @__PURE__ */ r("tbody", { children: n.length === 0 ? /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { class: "empty", colspan: String(o.length || 1), children: t.emptyLabel || "No data" }) }) : n.map((e, i) => /* @__PURE__ */ r(
        "tr",
        {
          onclick: () => t.isClickable && t.rowclick({ row: e, index: i }),
          children: o.map((a) => /* @__PURE__ */ r("td", { class: l(a), children: String(e[a.key] ?? "") }, a.key))
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
      rowclick: c({ bubbles: !0, composed: !0 })
    },
    styles: [b, g]
  }
);
h("z-table", y);
export {
  y as ZTable
};
