import { c as S, a as F, e as v, u as A, f as B, g as b, j as o, d as L } from "../chunks/define-element-BZUk-KLk.js";
import { u as M } from "../chunks/hooks-DEFT8qqt.js";
import { u as W } from "../chunks/locale-DUDaH1Ni.js";
const C = S`
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
			border-color var(--motion-fast) var(--ease-enter),
			background var(--motion-fast) var(--ease-enter);
	}
	.zone:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}
	:host([data-state='over']) .zone {
		border-color: var(--accent);
		background: color-mix(in oklch, var(--accent) 10%, transparent);
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
		border: 1px solid color-mix(in oklab, var(--accent) 32%, var(--border));
		border-radius: var(--radius-lg);
		background: color-mix(in oklab, var(--accent) 7%, var(--paper));
		color: var(--foreground);
	}
	.selected-name {
		overflow: hidden;
		font-size: var(--font-size-caption);
		font-weight: 600;
		text-align: start;
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
`, E = (t, i) => {
  const l = i.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean);
  if (!l.length) return !0;
  const d = t.name.toLowerCase(), u = t.type.toLowerCase();
  return l.some((a) => a.startsWith(".") ? d.endsWith(a) : a.endsWith("/*") ? u.startsWith(a.slice(0, -1)) : u === a);
}, P = F(
  (t) => {
    const i = W(), l = A(), d = B(), [u, a] = M(0), s = t.files ?? [], f = (e) => {
      const r = l.current;
      e ? r.setAttribute("data-state", e) : r.removeAttribute("data-state");
    }, g = (e) => {
      let r = [...e];
      const n = t.accept || "";
      if (n) {
        const c = r.find((m) => !E(m, n));
        if (c) return { files: [], reason: `“${c.name}” is not an accepted type` };
      }
      if (t.maxSize) {
        const c = r.find((m) => m.size > t.maxSize);
        if (c) return { files: [], reason: `“${c.name}” exceeds the size limit` };
      }
      return t.isMultiple || (r = r.slice(0, 1)), t.maxFiles && r.length > t.maxFiles ? { files: [], reason: `Too many files (max ${t.maxFiles})` } : { files: r };
    }, p = (e) => {
      const { files: r, reason: n } = g(e);
      n ? t.reject({ files: [...e], reason: n }) : t.drop({ files: r });
    }, x = (e) => {
      e.preventDefault(), !t.isDisabled && (a((r) => r + 1), f("over"));
    }, y = (e) => {
      e.preventDefault();
    }, z = (e) => {
      e.preventDefault(), a((r) => {
        const n = r - 1;
        return n <= 0 && f(null), Math.max(0, n);
      });
    }, D = (e) => {
      var r, n;
      e.preventDefault(), a(0), f(null), !t.isDisabled && (n = (r = e.dataTransfer) == null ? void 0 : r.files) != null && n.length && p(e.dataTransfer.files);
    }, h = () => {
      var e;
      t.isDisabled || (e = d.current) == null || e.click();
    }, k = (e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), h());
    }, w = (e) => {
      var n;
      const r = e.target;
      (n = r.files) != null && n.length && p(r.files), r.value = "";
    }, j = (e) => {
      e.stopPropagation(), !t.isDisabled && t.clear();
    };
    return /* @__PURE__ */ b("host", { shadowDom: !0, ondragenter: x, ondragover: y, ondragleave: z, ondrop: D, children: [
      s.length ? /* @__PURE__ */ b("div", { class: "selected", part: "selected", children: [
        /* @__PURE__ */ o("span", { class: "selected-name", title: s.map((e) => e.name).join(", "), children: s.length === 1 ? s[0].name : i("filesSelected", { count: s.length }) }),
        /* @__PURE__ */ o("button", { class: "clear", type: "button", "aria-label": i("removeSelectedFiles"), onclick: j, children: "×" })
      ] }) : /* @__PURE__ */ o(
        "div",
        {
          class: "zone",
          part: "zone",
          role: "button",
          tabindex: t.isDisabled ? -1 : 0,
          "aria-disabled": t.isDisabled ? "true" : void 0,
          onclick: h,
          onkeydown: k,
          children: /* @__PURE__ */ b("slot", { children: [
            /* @__PURE__ */ o("span", { children: i("dropFilesHere") }),
            t.accept && /* @__PURE__ */ o("span", { class: "hint", children: t.accept })
          ] })
        }
      ),
      /* @__PURE__ */ o(
        "input",
        {
          ref: d,
          type: "file",
          accept: t.accept || void 0,
          multiple: !!t.isMultiple,
          onchange: w
        }
      )
    ] });
  },
  {
    props: {
      accept: { type: String, reflect: !0 },
      isMultiple: { type: Boolean, reflect: !0 },
      maxSize: { type: Number, reflect: !0 },
      maxFiles: { type: Number, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      files: { type: Array },
      drop: v({ bubbles: !0, composed: !0 }),
      clear: v({ bubbles: !0, composed: !0 }),
      reject: v({ bubbles: !0, composed: !0 })
    },
    styles: C
  }
);
L("z-dropzone", P);
export {
  P as ZDropzone
};
