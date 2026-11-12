// @ts-self-types="./z-code-block.d.ts"
import { c as F, a as H, e as T, j as s, g as p, d as M } from "../chunks/define-element-BZUk-KLk.js";
import { u as x, a as w } from "../chunks/hooks-DEFT8qqt.js";
import { h as N, s as A } from "../chunks/highlight-CEuHB6Bv.js";
import { t as O } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { c as D } from "../chunks/clipboard-x9gcxjll.js";
import { o as R } from "../chunks/prop-types-B3Bpi956.js";
import { u as E } from "../chunks/locale-Bb4aqXuR.js";
const J = F`
	:host {
		display: block;
		--tone: var(--accent-primary);
		width: 100%;
		min-width: 0;
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

	.block {
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background: var(--surface-page);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	:host([is-flush]) .block {
		border: 0;
		border-radius: 0;
		background: transparent;
	}

	.tabs {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		min-width: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.file-tab {
		position: relative;
		padding: var(--space-1-5) var(--space-2-5);
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		white-space: nowrap;
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.file-tab:hover {
		color: var(--text-primary);
	}

	.file-tab.is-active {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
	}

	.file-tab:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding: var(--space-2) var(--space-3) var(--space-2) var(--space-3-5);
		border-bottom: 1px solid var(--border-default);
		background: var(--surface-default);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: var(--space-2-5);
		min-width: 0;
	}

	.filename {
		font-size: var(--font-size-xs);
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.lang {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--tone);
	}

	.copy {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1-5);
		flex-shrink: 0;
		padding: var(--space-1) var(--space-2);
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		font-family: inherit;
		font-size: var(--font-size-xs);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.copy:hover {
		color: var(--text-primary);
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.copy:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.copy.is-copied {
		color: var(--status-success);
		border-color: color-mix(in oklch, var(--status-success) 50%, transparent);
	}

	.copy svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.scroll {
		overflow: auto;
	}
	/* Firefox only: Chromium uses the arrow-less ::-webkit-scrollbar below; giving
	   it scrollbar-width would swap in the OS bar (arrows on Windows). */
	@supports not selector(::-webkit-scrollbar) {
		.scroll {
			scrollbar-width: thin;
			scrollbar-color: var(--border-default) transparent;
		}
	}
	.scroll::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}
	.scroll::-webkit-scrollbar-thumb {
		background: var(--border-default);
		border-radius: var(--radius-full);
	}
	.scroll::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}

	pre {
		margin: 0;
		padding: var(--space-3-5) var(--space-4);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
		color: var(--text-primary);
		tab-size: 2;
		/* Code stays selectable even though the page default is user-select:none,
		   people need to copy snippets. The line-number gutter re-opts out
		   below so dragging a selection doesn't pick up the numbers. */
		user-select: text;
		-webkit-user-select: text;
	}

	/* ::selection doesn't cross shadow boundaries, so restate the page-wide
	   selection style (ink.css) here for code rendered inside this shadow root.
	   Shares the --selection-* tokens, so code and prose highlight identically. */
	pre ::selection {
		background: var(--surface-selection);
		color: var(--text-selection);
	}
	pre ::-moz-selection {
		background: var(--surface-selection);
		color: var(--text-selection);
	}

	.rows {
		display: table;
		min-width: 100%;
	}

	.line {
		display: table-row;
	}

	.gutter,
	.text {
		display: table-cell;
		white-space: pre;
	}

	.gutter {
		padding-inline-end: var(--space-4);
		text-align: end;
		color: var(--text-secondary);
		user-select: none;
		opacity: 0.6;
	}

	/*
	 * Annotation. These are table-rows, so a background has to be painted on
	 * the cells rather than the row — a table-row's background sits behind its
	 * cells and is invisible wherever a cell paints its own.
	 *
	 * The marker column is the existing gutter: with added-lines set it
	 * carries +/- instead of the line number, because a diff reader wants the
	 * sign more than the count.
	 */
	.line.is-added .gutter,
	.line.is-added .text {
		background: color-mix(in oklch, var(--status-success) 12%, transparent);
	}

	.line.is-added .gutter {
		color: var(--status-success);
		opacity: 1;
	}

	.line.is-removed .gutter,
	.line.is-removed .text {
		background: color-mix(in oklch, var(--status-danger) 12%, transparent);
	}

	.line.is-removed .gutter {
		color: var(--status-danger);
		opacity: 1;
	}

	/* Focus dims everything else rather than hiding it, so the surrounding
	   code still gives the excerpt somewhere to sit. */
	.line.is-dimmed {
		opacity: 0.35;
		transition: opacity var(--motion-fast) var(--ease-enter);
	}

	.block:hover .line.is-dimmed {
		opacity: 1;
	}

	/*
	 * highlight.js token classes mapped onto the zest --syntax-* palette.
	 * Ordering matters: highlight.js nests JSX content inside .hljs-tag (e.g.
	 * "hljs-tag hljs-attr"), so structural classes (.hljs-tag) are declared
	 * BEFORE content classes, equal-specificity ties go to the later rule, so
	 * the nested attr/name/string colors win over the dim tag brackets.
	 */
	.hljs-comment,
	.hljs-quote {
		color: var(--syntax-comment);
		font-style: italic;
	}
	/* JSX/HTML angle-bracket structure: <, >, /, =, kept dim. */
	.hljs-tag,
	.hljs-operator,
	.hljs-punctuation {
		color: var(--syntax-operator);
	}
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-meta,
	.hljs-meta-keyword,
	.hljs-doctag {
		color: var(--syntax-keyword);
	}
	.hljs-string,
	.hljs-meta .hljs-string,
	.hljs-addition {
		color: var(--syntax-string);
	}
	.hljs-number {
		color: var(--syntax-number);
	}
	.hljs-literal,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-deletion {
		color: var(--syntax-constant);
	}
	.hljs-built_in,
	.hljs-type,
	.hljs-title.class_,
	.hljs-class .hljs-title,
	.hljs-selector-class {
		color: var(--syntax-class);
	}
	.hljs-attr,
	.hljs-attribute,
	.hljs-property,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: var(--syntax-property);
	}
	.hljs-variable,
	.hljs-template-variable,
	.hljs-params {
		color: var(--syntax-variable);
	}
	.hljs-title,
	.hljs-title.function_,
	.hljs-section,
	.hljs-selector-id {
		color: var(--syntax-function);
	}
	/* Tag/component name (declared after .hljs-tag so it wins in JSX). */
	.hljs-name {
		color: var(--syntax-tag);
	}
	.hljs-regexp {
		color: var(--syntax-regex);
	}
	.hljs-emphasis {
		font-style: italic;
	}
	.hljs-strong {
		font-weight: var(--font-weight-bold);
	}

	.rows {
		line-height: var(--line-height-relaxed) !important;
		letter-spacing: 0.35px !important;
		font-family: var(--font-mono);
	}
`, P = (e) => {
  var t, r;
  return (r = (t = e.match(/\.([a-z0-9]+)$/i)) == null ? void 0 : t[1]) == null ? void 0 : r.toLowerCase();
}, X = (e, t, r) => {
  const i = e.replace(/\n$/, "");
  return r ? [{ value: i, className: "" }] : N(i, t);
}, g = (e) => {
  const t = /* @__PURE__ */ new Set();
  if (!e) return t;
  for (const r of e.split(",")) {
    const i = r.trim();
    if (!i) continue;
    const d = i.split("-"), h = Number(d[0]), o = d.length > 1 ? Number(d[1]) : h;
    if (Number.isFinite(h) && Number.isFinite(o))
      for (let l = Math.min(h, o); l <= Math.max(h, o); l += 1)
        t.add(l);
  }
  return t;
}, _ = (e, t) => {
  const r = ["line"];
  return t.added.has(e) && r.push("is-added"), t.removed.has(e) && r.push("is-removed"), t.focused.size > 0 && !t.focused.has(e) && r.push("is-dimmed"), r.join(" ");
}, q = (e, t) => t.added.has(e) ? "+" : t.removed.has(e) ? "-" : String(e), G = H(
  (e) => {
    const t = E(), [r, i] = x(!1), [d, h] = x(0), o = Array.isArray(e.files) ? e.files : [], n = o.length ? o[Math.min(d, o.length - 1)] : void 0, l = n ? n.code : e.code ?? "", f = n ? n.language || P(n.name) : e.language, m = w(
      () => X(l, f, !!e.isPlain),
      [l, f, e.isPlain]
    ), j = w(() => A(m), [m]), c = {
      added: g(e.addedLines),
      removed: g(e.removedLines),
      focused: g(e.focusLines)
    }, k = c.added.size > 0 || c.removed.size > 0 || c.focused.size > 0, z = !!e.hasLineNumbers || k, b = c.added.size > 0 || c.removed.size > 0, y = (a, u) => a.className ? /* @__PURE__ */ s("span", { class: a.className, children: a.value }, u) : a.value, L = async () => {
      (await D(l)).isCopied && (i(!0), e.copy(), setTimeout(() => i(!1), 1600));
    }, S = !e.isHeaderHidden && (o.length > 0 || e.filename || e.language || !e.isCopyHidden);
    return /* @__PURE__ */ s("host", { shadowDom: !0, children: /* @__PURE__ */ p("div", { class: "block", children: [
      S && /* @__PURE__ */ p("div", { class: "head", children: [
        o.length > 0 ? /* @__PURE__ */ s("div", { class: "tabs", role: "tablist", "aria-label": t("files"), children: o.map((a, u) => /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": a === n ? "true" : "false",
            class: a === n ? "file-tab is-active" : "file-tab",
            onclick: () => h(u),
            children: a.name
          },
          a.name
        )) }) : /* @__PURE__ */ p("div", { class: "meta", children: [
          e.language && /* @__PURE__ */ s("span", { class: "lang", children: e.language }),
          e.filename && /* @__PURE__ */ s("span", { class: "filename", children: e.filename })
        ] }),
        !e.isCopyHidden && /* @__PURE__ */ p("button", { type: "button", class: r ? "copy is-copied" : "copy", onclick: L, children: [
          r ? /* @__PURE__ */ s("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ s("polyline", { points: "4 12 10 18 20 6" }) }) : /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ s("rect", { x: "9", y: "9", width: "11", height: "11", rx: "2" }),
            /* @__PURE__ */ s("path", { d: "M5 15V5a2 2 0 0 1 2-2h10" })
          ] }),
          t(r ? "copied" : "copy")
        ] })
      ] }),
      /* @__PURE__ */ s("div", { class: "scroll", children: /* @__PURE__ */ s("pre", { children: z ? /* @__PURE__ */ s("div", { class: "rows", children: j.map((a, u) => {
        const v = u + 1, B = b ? q(v, c) : String(v), C = !!e.hasLineNumbers || b;
        return /* @__PURE__ */ p("div", { class: _(v, c), children: [
          C && /* @__PURE__ */ s("span", { class: "gutter", children: B }),
          /* @__PURE__ */ s("span", { class: "text", children: a.length ? a.map(y) : " " })
        ] }, u);
      }) }) : /* @__PURE__ */ s("code", { children: m.map(y) }) }) })
    ] }) });
  },
  {
    props: {
      code: String,
      files: { type: Array },
      language: String,
      filename: String,
      hasLineNumbers: { type: Boolean, reflect: !0 },
      isCopyHidden: { type: Boolean, reflect: !0 },
      isFlush: { type: Boolean, reflect: !0 },
      isHeaderHidden: { type: Boolean, reflect: !0 },
      isPlain: { type: Boolean, reflect: !0 },
      addedLines: { type: String, reflect: !0 },
      removedLines: { type: String, reflect: !0 },
      focusLines: { type: String, reflect: !0 },
      tone: { type: R("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      copy: T({ bubbles: !0, composed: !0 })
    },
    styles: [O, J]
  }
);
M("z-code-block", G);
export {
  G as ZCodeBlock
};
