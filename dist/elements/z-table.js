// @ts-self-types="./z-table.d.ts"
import { c as d, a as c, e as b, j as r, g as m, d as y } from "../chunks/define-element-BZUk-KLk.js";
import { i as h } from "../chunks/interaction-styles-C6mMacCu.js";
import { t as p } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { u as f } from "../chunks/locale-Bb4aqXuR.js";
const v = d`
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
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-family: inherit;
	}

	thead th {
		text-align: start;
		padding: var(--space-3-5) var(--space-5);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-secondary);
		border-bottom: 1px solid var(--border-default);
		white-space: nowrap;
	}

	tbody td {
		padding: var(--space-4) var(--space-5);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		border-bottom: 1px solid var(--border-default);
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
		background: color-mix(in oklch, var(--text-primary) 4%, transparent);
	}

	:host([is-striped]) tbody tr:nth-child(even) {
		background: color-mix(in oklch, var(--text-primary) 3%, transparent);
	}

	.align-end {
		text-align: end;
	}
	.align-center {
		text-align: center;
	}
	.is-mono {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
	}

	tbody tr:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: -3px;
	}

	.empty {
		padding: var(--space-10);
		text-align: center;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
	}
`, u = c(
  (t) => {
    const l = f(), o = Array.isArray(t.columns) ? t.columns : [], n = Array.isArray(t.rows) ? t.rows : [], s = (e) => [e.align ? `align-${e.align}` : "", e.isMono ? "is-mono" : ""].filter(Boolean).join(" ") || void 0;
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("div", { class: "wrap", children: /* @__PURE__ */ m("table", { children: [
      /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ r("tr", { children: o.map((e) => /* @__PURE__ */ r("th", { class: e.align ? `align-${e.align}` : void 0, children: e.label }, e.key)) }) }),
      /* @__PURE__ */ r("tbody", { children: n.length === 0 ? /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { class: "empty", colspan: String(o.length || 1), children: t.emptyLabel || l("noData") }) }) : n.map((e, i) => /* @__PURE__ */ r(
        "tr",
        {
          tabindex: t.isClickable ? "0" : void 0,
          onclick: () => t.isClickable && t.rowclick({ row: e, index: i }),
          onkeydown: (a) => {
            !t.isClickable || a.key !== "Enter" && a.key !== " " || (a.preventDefault(), t.rowclick({ row: e, index: i }));
          },
          children: o.map((a) => /* @__PURE__ */ r("td", { class: s(a), children: String(e[a.key] ?? "") }, a.key))
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
      rowclick: b({ bubbles: !0, composed: !0 })
    },
    styles: [p, v, h]
  }
);
y("z-table", u);
export {
  u as ZTable
};
