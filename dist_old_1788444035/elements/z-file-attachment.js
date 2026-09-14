import { c, a as l, j as e, g as i, d as s, F as o } from "../chunks/define-element-BWC3wEPr.js";
const n = {
  image: /* @__PURE__ */ i(o, { children: [
    /* @__PURE__ */ e("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
    /* @__PURE__ */ e("circle", { cx: "9", cy: "9", r: "2" }),
    /* @__PURE__ */ e("path", { d: "M21 15l-5-5L5 21" })
  ] }),
  video: /* @__PURE__ */ i(o, { children: [
    /* @__PURE__ */ e("rect", { x: "2", y: "4", width: "15", height: "16", rx: "2" }),
    /* @__PURE__ */ e("path", { d: "M17 9l5-3v12l-5-3" })
  ] }),
  audio: /* @__PURE__ */ i(o, { children: [
    /* @__PURE__ */ e("path", { d: "M9 18V5l12-2v13" }),
    /* @__PURE__ */ e("circle", { cx: "6", cy: "18", r: "3" }),
    /* @__PURE__ */ e("circle", { cx: "18", cy: "16", r: "3" })
  ] }),
  archive: /* @__PURE__ */ i(o, { children: [
    /* @__PURE__ */ e("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ e("path", { d: "M3 9h18" }),
    /* @__PURE__ */ e("path", { d: "M10 13h4" })
  ] }),
  sheet: /* @__PURE__ */ i(o, { children: [
    /* @__PURE__ */ e("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
    /* @__PURE__ */ e("path", { d: "M3 9h18M3 15h18M9 3v18" })
  ] }),
  code: /* @__PURE__ */ i(o, { children: [
    /* @__PURE__ */ e("path", { d: "M9 9l-3 3 3 3" }),
    /* @__PURE__ */ e("path", { d: "M15 9l3 3-3 3" })
  ] }),
  document: /* @__PURE__ */ i(o, { children: [
    /* @__PURE__ */ e("path", { d: "M14 3v5h5" }),
    /* @__PURE__ */ e("path", { d: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" })
  ] })
}, h = (r) => {
  const t = String(r ?? "").toLowerCase();
  if (!t) return n.document;
  if (n[t]) return n[t];
  const a = t.split("/")[0];
  return a === "image" || a === "video" || a === "audio" ? n[a] : /zip|compressed|tar|gzip|7z|rar/.test(t) ? n.archive : /sheet|csv|excel/.test(t) ? n.sheet : /json|javascript|typescript|xml|code/.test(t) ? n.code : n.document;
}, d = (r) => {
  if (r == null || r === "") return "";
  const t = Number(r);
  return Number.isNaN(t) ? String(r) : t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1).replace(/\.0$/, "")} KB` : `${(t / (1024 * 1024)).toFixed(1).replace(/\.0$/, "")} MB`;
}, m = c`
	:host {
		display: block;
	}
	:host([is-hidden]) {
		display: none;
	}
	.file {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		min-width: 12rem;
		max-width: 20rem;
		box-sizing: border-box;
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
		padding: 0.5rem 0.625rem;
	}
	.icon {
		flex: 0 0 auto;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: var(--radius-sm);
		background: color-mix(in oklch, var(--primary) 16%, transparent);
		color: var(--primary);
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	.icon svg {
		width: 1.25rem;
		height: 1.25rem;
		stroke: currentColor;
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.meta {
		flex: 1;
		min-width: 0;
	}
	.name {
		font-size: 0.875rem;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.size {
		font-size: 0.6875rem;
		color: var(--muted-foreground);
	}
	.download {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		border: none;
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		text-decoration: none;
	}
	.download:hover {
		background: color-mix(in oklch, var(--foreground) 10%, transparent);
		color: var(--foreground);
	}
	.download svg {
		width: 1.1rem;
		height: 1.1rem;
		stroke: currentColor;
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
`, u = l(
  (r) => /* @__PURE__ */ e("host", { shadowDom: !0, children: /* @__PURE__ */ i("div", { class: "file", children: [
    /* @__PURE__ */ e("span", { class: "icon", "aria-hidden": "true", children: /* @__PURE__ */ e("svg", { viewBox: "0 0 24 24", children: h(r.type) }) }),
    /* @__PURE__ */ i("div", { class: "meta", children: [
      /* @__PURE__ */ e("div", { class: "name", children: r.name }),
      d(r.size) && /* @__PURE__ */ e("div", { class: "size", children: d(r.size) })
    ] }),
    /* @__PURE__ */ e(
      "a",
      {
        class: "download",
        href: r.href || "#",
        download: r.name || "",
        "aria-label": `Download ${r.name || "file"}`,
        children: /* @__PURE__ */ i("svg", { viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ e("path", { d: "M12 4v12M6 12l6 6 6-6" }),
          /* @__PURE__ */ e("path", { d: "M4 20h16" })
        ] })
      }
    )
  ] }) }),
  {
    props: {
      name: { type: String, reflect: !0 },
      size: { type: String, reflect: !0 },
      type: { type: String, reflect: !0 },
      href: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: m
  }
);
s("z-file-attachment", u);
export {
  u as ZFileAttachment
};
