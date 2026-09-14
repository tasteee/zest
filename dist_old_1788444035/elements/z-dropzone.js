import { c as w, a as j, e as f, u as S, f as F, g as m, j as s, d as A } from "../chunks/define-element-BWC3wEPr.js";
import { u as B } from "../chunks/hooks-D9_x-ckD.js";
const M = w`
	:host {
		display: block;
	}
	.zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 2rem 1.5rem;
		text-align: center;
		border: 1.5px dashed var(--border);
		border-radius: var(--radius-lg);
		background: var(--paper);
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			border-color var(--duration-fast) var(--easing-standard),
			background var(--duration-fast) var(--easing-standard);
	}
	:host([data-state='over']) .zone {
		border-color: var(--purple);
		background: color-mix(in oklch, var(--purple) 10%, transparent);
		color: var(--foreground);
	}
	:host([data-state='reject']) .zone {
		border-color: var(--destructive);
		background: color-mix(in oklch, var(--destructive) 10%, transparent);
	}
	:host([is-disabled]) .zone {
		opacity: 0.5;
		pointer-events: none;
	}
	input {
		display: none;
	}
	.selected {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		border: 1px solid color-mix(in oklch, var(--purple) 32%, var(--border));
		border-radius: var(--radius-lg);
		background: color-mix(in oklch, var(--purple) 7%, var(--paper));
		color: var(--foreground);
	}
	.selected-name {
		overflow: hidden;
		font-size: var(--font-size-caption);
		font-weight: 600;
		text-align: left;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.clear {
		flex: 0 0 auto;
		width: 1.875rem;
		height: 1.875rem;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		font-size: 1.25rem;
		line-height: 1;
	}
	.clear:hover {
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
		color: var(--foreground);
	}
	.hint {
		font-size: var(--font-size-caption);
	}
`, W = (t, c) => {
  const i = c.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean);
  if (!i.length) return !0;
  const p = t.name.toLowerCase(), o = t.type.toLowerCase();
  return i.some((a) => a.startsWith(".") ? p.endsWith(a) : a.endsWith("/*") ? o.startsWith(a.slice(0, -1)) : o === a);
}, $ = j(
  (t) => {
    const c = S(), i = F(), [p, o] = B(0), a = t.files ?? [], d = (e) => {
      const r = c.current;
      e ? r.setAttribute("data-state", e) : r.removeAttribute("data-state");
    }, v = (e) => {
      let r = [...e];
      const n = t.accept || "";
      if (n) {
        const l = r.find((u) => !W(u, n));
        if (l) return { files: [], reason: `“${l.name}” is not an accepted type` };
      }
      if (t.maxSize) {
        const l = r.find((u) => u.size > t.maxSize);
        if (l) return { files: [], reason: `“${l.name}” exceeds the size limit` };
      }
      return t.isMultiple || (r = r.slice(0, 1)), t.maxFiles && r.length > t.maxFiles ? { files: [], reason: `Too many files (max ${t.maxFiles})` } : { files: r };
    }, h = (e) => {
      const { files: r, reason: n } = v(e);
      n ? t.reject({ files: [...e], reason: n }) : t.drop({ files: r });
    }, g = (e) => {
      e.preventDefault(), !t.isDisabled && (o((r) => r + 1), d("over"));
    }, b = (e) => {
      e.preventDefault();
    }, x = (e) => {
      e.preventDefault(), o((r) => {
        const n = r - 1;
        return n <= 0 && d(null), Math.max(0, n);
      });
    }, y = (e) => {
      var r, n;
      e.preventDefault(), o(0), d(null), !t.isDisabled && (n = (r = e.dataTransfer) == null ? void 0 : r.files) != null && n.length && h(e.dataTransfer.files);
    }, z = () => {
      var e;
      t.isDisabled || (e = i.current) == null || e.click();
    }, D = (e) => {
      var n;
      const r = e.target;
      (n = r.files) != null && n.length && h(r.files), r.value = "";
    }, k = (e) => {
      e.stopPropagation(), !t.isDisabled && t.clear();
    };
    return /* @__PURE__ */ m(
      "host",
      {
        shadowDom: !0,
        ondragenter: g,
        ondragover: b,
        ondragleave: x,
        ondrop: y,
        children: [
          a.length ? /* @__PURE__ */ m("div", { class: "selected", part: "selected", children: [
            /* @__PURE__ */ s("span", { class: "selected-name", title: a.map((e) => e.name).join(", "), children: a.length === 1 ? a[0].name : `${a.length} files selected` }),
            /* @__PURE__ */ s("button", { class: "clear", type: "button", "aria-label": "Remove selected files", onclick: k, children: "×" })
          ] }) : /* @__PURE__ */ s("div", { class: "zone", part: "zone", onclick: z, children: /* @__PURE__ */ m("slot", { children: [
            /* @__PURE__ */ s("span", { children: "Drop files here or click to browse" }),
            t.accept && /* @__PURE__ */ s("span", { class: "hint", children: t.accept })
          ] }) }),
          /* @__PURE__ */ s(
            "input",
            {
              ref: i,
              type: "file",
              accept: t.accept || void 0,
              multiple: !!t.isMultiple,
              onchange: D
            }
          )
        ]
      }
    );
  },
  {
    props: {
      accept: { type: String, reflect: !0 },
      isMultiple: { type: Boolean, reflect: !0 },
      maxSize: { type: Number, reflect: !0 },
      maxFiles: { type: Number, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      files: { type: Array },
      drop: f({ bubbles: !0, composed: !0 }),
      clear: f({ bubbles: !0, composed: !0 }),
      reject: f({ bubbles: !0, composed: !0 })
    },
    styles: M
  }
);
A("z-dropzone", $);
export {
  $ as ZDropzone
};
