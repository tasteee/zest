// @ts-self-types="./z-dropzone.d.ts"
import { c as S, a as F, e as v, u as A, f as B, g as b, j as o, d as L } from "../chunks/define-element-BZUk-KLk.js";
import { u as M } from "../chunks/hooks-DEFT8qqt.js";
import { u as W } from "../chunks/locale-Bb4aqXuR.js";
const C = S`
	:host {
		display: block;
	}
	.zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-8) var(--space-6);
		text-align: center;
		border: 1.5px dashed var(--border-default);
		border-radius: var(--radius-lg);
		background: var(--surface-default);
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background var(--motion-fast) var(--ease-enter);
	}
	.zone:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
	:host([data-state='over']) .zone {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 10%, transparent);
		color: var(--text-primary);
	}
	:host([data-state='reject']) .zone {
		border-color: var(--status-danger);
		background: color-mix(in oklch, var(--status-danger) 10%, transparent);
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
		gap: var(--space-3);
		padding: var(--space-3-5) var(--space-4);
		border: 1px solid color-mix(in oklab, var(--tone) 32%, var(--border-default));
		border-radius: var(--radius-lg);
		background: color-mix(in oklab, var(--tone) 7%, var(--surface-default));
		color: var(--text-primary);
	}
	.selected-name {
		overflow: hidden;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
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
		color: var(--text-secondary);
		cursor: pointer;
		font-size: var(--font-size-xl);
		line-height: var(--line-height-none);
	}
	.clear:hover {
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
		color: var(--text-primary);
	}
	.hint {
		font-size: var(--font-size-xs);
	}
`, E = (t, s) => {
  const c = s.split(",").map((n) => n.trim().toLowerCase()).filter(Boolean);
  if (!c.length) return !0;
  const d = t.name.toLowerCase(), u = t.type.toLowerCase();
  return c.some((n) => n.startsWith(".") ? d.endsWith(n) : n.endsWith("/*") ? u.startsWith(n.slice(0, -1)) : u === n);
}, P = F(
  (t) => {
    const s = W(), c = A(), d = B(), [u, n] = M(0), i = t.files ?? [], f = (e) => {
      const r = c.current;
      e ? r.setAttribute("data-state", e) : r.removeAttribute("data-state");
    }, g = (e) => {
      let r = [...e];
      const a = t.accept || "";
      if (a) {
        const l = r.find((m) => !E(m, a));
        if (l) return { files: [], reason: `“${l.name}” is not an accepted type` };
      }
      if (t.maxSize) {
        const l = r.find((m) => m.size > t.maxSize);
        if (l) return { files: [], reason: `“${l.name}” exceeds the size limit` };
      }
      return t.isMultiple || (r = r.slice(0, 1)), t.maxFiles && r.length > t.maxFiles ? { files: [], reason: `Too many files (max ${t.maxFiles})` } : { files: r };
    }, p = (e) => {
      const { files: r, reason: a } = g(e);
      a ? t.reject({ files: [...e], reason: a }) : t.drop({ files: r });
    }, x = (e) => {
      e.preventDefault(), !t.isDisabled && (n((r) => r + 1), f("over"));
    }, y = (e) => {
      e.preventDefault();
    }, z = (e) => {
      e.preventDefault(), n((r) => {
        const a = r - 1;
        return a <= 0 && f(null), Math.max(0, a);
      });
    }, D = (e) => {
      var r, a;
      e.preventDefault(), n(0), f(null), !t.isDisabled && (a = (r = e.dataTransfer) == null ? void 0 : r.files) != null && a.length && p(e.dataTransfer.files);
    }, h = () => {
      var e;
      t.isDisabled || (e = d.current) == null || e.click();
    }, k = (e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), h());
    }, w = (e) => {
      var a;
      const r = e.target;
      (a = r.files) != null && a.length && p(r.files), r.value = "";
    }, j = (e) => {
      e.stopPropagation(), !t.isDisabled && t.clear();
    };
    return /* @__PURE__ */ b("host", { shadowDom: !0, ondragenter: x, ondragover: y, ondragleave: z, ondrop: D, children: [
      i.length ? /* @__PURE__ */ b("div", { class: "selected", part: "selected", children: [
        /* @__PURE__ */ o("span", { class: "selected-name", title: i.map((e) => e.name).join(", "), children: i.length === 1 ? i[0].name : s("filesSelected", { count: i.length }) }),
        /* @__PURE__ */ o("button", { class: "clear", type: "button", "aria-label": s("removeSelectedFiles"), onclick: j, children: "×" })
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
            /* @__PURE__ */ o("span", { children: s("dropFilesHere") }),
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
