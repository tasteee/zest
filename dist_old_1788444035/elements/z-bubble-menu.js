import { c as k, a as v, e as l, u as w, f as x, b as d, j as t, d as C, g as o } from "../chunks/define-element-BWC3wEPr.js";
import { u as R } from "../chunks/hooks-D9_x-ckD.js";
import { f as S, a as B, b as M } from "../chunks/editor-overlay-styles-DEH-Ouss.js";
import { A as D, r as j, a as I, c as U } from "../chunks/overlay-BJ9Mg5BD.js";
import { u as z } from "../chunks/transition-DlYkj6t5.js";
const A = k`
	:host {
		position: fixed;
		inset: 0;
		z-index: var(--z-menu, 50);
		pointer-events: none;
	}

	.link-field {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0 0.375rem;
	}

	.link-field input {
		width: 14rem;
		max-width: 40vw;
		background: transparent;
		border: 0;
		outline: none;
		color: var(--foreground);
		font-family: inherit;
		font-size: var(--font-size-small);
	}
`, L = v(
  (e) => {
    w();
    const c = x(), a = !!e.isOpen, i = z(a), [r, s] = R(String(e.url || ""));
    d(() => {
      s(String(e.url || ""));
    }, [e.url, a]), d(() => {
      const n = c.current;
      if (!n || !a || !e.anchorRect) return;
      const u = j(e.anchorRect);
      return I(u, n, () => {
        const b = U(u, n, { placement: e.placement || "top", offset: e.offset ?? 10 });
        n.style.left = `${b.x}px`, n.style.top = `${b.y}px`;
      });
    }, [a, e.anchorRect, e.placement, e.offset]);
    const m = () => {
      r !== e.url && e.linkchange({ url: r });
    }, f = () => /* @__PURE__ */ o("div", { class: "link-field", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          value: r,
          placeholder: "https://…",
          "aria-label": "Link URL",
          oninput: (n) => s(n.target.value),
          onblur: m,
          onkeydown: (n) => {
            n.key === "Enter" && n.target.blur();
          }
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Open link", onclick: () => e.linkopen(), children: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ t("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
        /* @__PURE__ */ t("polyline", { points: "15 3 21 3 21 9" }),
        /* @__PURE__ */ t("line", { x1: "10", y1: "14", x2: "21", y2: "3" })
      ] }) }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Remove link", onclick: () => e.linkunlink(), children: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ t("path", { d: "M9 15l6-6" }),
        /* @__PURE__ */ t("path", { d: "M11 6l1-1a3.5 3.5 0 1 1 5 5l-1 1" }),
        /* @__PURE__ */ t("path", { d: "M13 18l-1 1a3.5 3.5 0 1 1-5-5l1-1" })
      ] }) })
    ] }), h = () => /* @__PURE__ */ o("div", { children: [
      ["left", "center", "right"].map((n) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          class: ["icon-button"].concat(e.align === n ? ["is-active"] : []).join(" "),
          "aria-label": `Align ${n}`,
          "aria-pressed": e.align === n ? "true" : "false",
          onclick: () => e.imagealign({ align: n }),
          children: n[0].toUpperCase()
        },
        n
      )),
      /* @__PURE__ */ t("div", { class: "sep", role: "separator" }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          class: ["icon-button"].concat(e.hasCaption ? ["is-active"] : []).join(" "),
          "aria-label": "Toggle caption",
          "aria-pressed": e.hasCaption ? "true" : "false",
          onclick: () => e.imagecaptiontoggle(),
          children: "Aa"
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Replace image", onclick: () => e.imagereplace(), children: /* @__PURE__ */ t("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }) }) }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Delete image", onclick: () => e.imagedelete(), children: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ t("polyline", { points: "3 6 5 6 21 6" }),
        /* @__PURE__ */ t("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" })
      ] }) })
    ] }), g = () => /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Insert row above", onclick: () => e.tableinsertrow({ position: "before" }), children: "+Row↑" }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Insert row below", onclick: () => e.tableinsertrow({ position: "after" }), children: "+Row↓" }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Delete row", onclick: () => e.tabledeleterow(), children: "−Row" }),
      /* @__PURE__ */ t("div", { class: "sep", role: "separator" }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Insert column left", onclick: () => e.tableinsertcolumn({ position: "before" }), children: "+Col←" }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Insert column right", onclick: () => e.tableinsertcolumn({ position: "after" }), children: "+Col→" }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Delete column", onclick: () => e.tabledeletecolumn(), children: "−Col" }),
      /* @__PURE__ */ t("div", { class: "sep", role: "separator" }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Merge cells", onclick: () => e.tablemerge(), children: "Merge" })
    ] }), p = () => e.kind === "image" ? h() : e.kind === "table-cell" ? g() : f(), y = ["surface"].concat(i === "open" ? ["is-open"] : []).concat(i === "closing" ? ["is-closing"] : []).join(" ");
    return i === "closed" && !a ? /* @__PURE__ */ t("host", { shadowDom: !0 }) : /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ t("div", { ref: c, class: y, role: "toolbar", "aria-label": `${e.kind || "link"} bubble menu`, onmousedown: (n) => n.preventDefault(), children: p() }) });
  },
  {
    props: {
      kind: { type: String, reflect: !0 },
      anchorRect: D,
      placement: { type: String, reflect: !0 },
      offset: { type: Number },
      isOpen: { type: Boolean, reflect: !0 },
      url: { type: String },
      align: { type: String },
      hasCaption: { type: Boolean },
      linkchange: l({ bubbles: !0, composed: !0 }),
      linkopen: l({ bubbles: !0, composed: !0 }),
      linkunlink: l({ bubbles: !0, composed: !0 }),
      imagealign: l({ bubbles: !0, composed: !0 }),
      imagecaptiontoggle: l({ bubbles: !0, composed: !0 }),
      imagereplace: l({ bubbles: !0, composed: !0 }),
      imagedelete: l({ bubbles: !0, composed: !0 }),
      tableinsertrow: l({ bubbles: !0, composed: !0 }),
      tabledeleterow: l({ bubbles: !0, composed: !0 }),
      tableinsertcolumn: l({ bubbles: !0, composed: !0 }),
      tabledeletecolumn: l({ bubbles: !0, composed: !0 }),
      tablemerge: l({ bubbles: !0, composed: !0 })
    },
    styles: [S, B, M, A]
  }
);
C("z-bubble-menu", L);
export {
  L as ZBubbleMenu
};
