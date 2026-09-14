import { c as l, a as d, e as c, j as r, g as i, F as a, d as h } from "../chunks/define-element-BWC3wEPr.js";
const s = (e) => {
  if (e == null || e === "") return "";
  const t = Number(e);
  return Number.isNaN(t) ? String(e) : t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1).replace(/\.0$/, "")} KB` : `${(t / (1024 * 1024)).toFixed(1).replace(/\.0$/, "")} MB`;
}, m = l`
	:host {
		display: inline-block;
		vertical-align: top;
	}
	:host([is-hidden]) {
		display: none;
	}
	.chip {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		max-width: 15rem;
		box-sizing: border-box;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--card);
		padding: 0.375rem 0.5rem;
		overflow: hidden;
	}
	.thumb {
		flex: 0 0 auto;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-sm);
		object-fit: cover;
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--muted-foreground);
	}
	.thumb svg {
		width: 1.1rem;
		height: 1.1rem;
		stroke: currentColor;
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.meta {
		min-width: 0;
	}
	.name {
		font-size: 0.8125rem;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.size {
		font-size: 0.6875rem;
		color: var(--muted-foreground);
	}
	.remove {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		border: none;
		border-radius: 999px;
		background: color-mix(in oklch, var(--foreground) 10%, transparent);
		color: var(--foreground);
		cursor: pointer;
		padding: 0;
	}
	.remove svg {
		width: 0.7rem;
		height: 0.7rem;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		fill: none;
	}
	.progress {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 2px;
		background: var(--primary);
		transition: width 0.2s ease;
	}
`, u = d(
  (e) => {
    var o;
    const t = e.thumbnail || ((o = e.type) == null ? void 0 : o.startsWith("image/")), n = e.progress;
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ i("div", { class: "chip", children: [
      e.thumbnail ? /* @__PURE__ */ r("img", { class: "thumb", src: e.thumbnail, alt: e.name }) : /* @__PURE__ */ r("span", { class: "thumb", "aria-hidden": "true", children: /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: t ? /* @__PURE__ */ i(a, { children: [
        /* @__PURE__ */ r("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
        /* @__PURE__ */ r("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
        /* @__PURE__ */ r("path", { d: "M21 15l-5-5L5 21" })
      ] }) : /* @__PURE__ */ i(a, { children: [
        /* @__PURE__ */ r("path", { d: "M14 3v5h5" }),
        /* @__PURE__ */ r("path", { d: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" })
      ] }) }) }),
      /* @__PURE__ */ i("div", { class: "meta", children: [
        /* @__PURE__ */ r("div", { class: "name", children: e.name }),
        s(e.size) && /* @__PURE__ */ r("div", { class: "size", children: s(e.size) })
      ] }),
      /* @__PURE__ */ r("button", { class: "remove", type: "button", "aria-label": "Remove", onclick: () => e.remove({ value: e.value }), children: /* @__PURE__ */ r("svg", { viewBox: "0 0 12 12", children: /* @__PURE__ */ r("path", { d: "M3 3l6 6M9 3l-6 6" }) }) }),
      n != null && n < 100 && /* @__PURE__ */ r("span", { class: "progress", style: { width: `${n}%` } })
    ] }) });
  },
  {
    props: {
      name: { type: String, reflect: !0 },
      size: { type: String, reflect: !0 },
      type: { type: String, reflect: !0 },
      thumbnail: { type: String, reflect: !0 },
      value: { type: String, reflect: !0 },
      progress: { type: Number, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      remove: c({ bubbles: !0, composed: !0 })
    },
    styles: m
  }
);
h("z-attachment-chip", u);
export {
  u as ZAttachmentChip
};
