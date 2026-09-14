import { c as l, a as u, e as p, u as y, b as i, g as n, j as t, d } from "../chunks/define-element-BWC3wEPr.js";
import { b as g } from "../chunks/editor-overlay-styles-DEH-Ouss.js";
import { A as h } from "../chunks/overlay-BJ9Mg5BD.js";
import { u as x } from "../chunks/transition-DlYkj6t5.js";
const b = l`
	:host {
		position: fixed;
		left: 0;
		top: 0;
		z-index: var(--z-toolbar, 40);
		display: flex;
		align-items: center;
		gap: 1px;
		opacity: 0;
		transform: translateX(4px);
		pointer-events: none;
	}

	:host(.is-open) {
		opacity: 1;
		transform: translateX(0);
		transition:
			opacity 120ms ease-out,
			transform 120ms ease-out;
		pointer-events: auto;
	}

	:host(.is-closing) {
		opacity: 0;
		transform: translateX(0);
		transition: opacity 80ms ease-out;
		pointer-events: none;
	}

	.grip {
		cursor: grab;
	}

	.grip:active {
		cursor: grabbing;
	}
`, m = u(
  (e) => {
    const c = y(), a = !!e.isOpen, o = x(a);
    return i(() => {
      const s = c.current;
      if (!s || !e.anchorRect) return;
      const r = e.anchorRect;
      s.style.left = `${r.x - (e.width ?? 44)}px`, s.style.top = `${r.y + r.height / 2 - 12}px`;
    }, [e.anchorRect, e.width]), i(() => {
      const s = c.current;
      s.classList.toggle("is-open", o === "open"), s.classList.toggle("is-closing", o === "closing");
    }, [o]), /* @__PURE__ */ n("host", { shadowDom: !0, children: [
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button", "aria-label": "Add block below", onclick: () => e.add(), children: /* @__PURE__ */ n("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ t("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
        /* @__PURE__ */ t("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
      ] }) }),
      /* @__PURE__ */ t("button", { type: "button", class: "icon-button grip", "aria-label": "Drag to reorder", draggable: !0, children: /* @__PURE__ */ n("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ t("circle", { cx: "9", cy: "6", r: "1" }),
        /* @__PURE__ */ t("circle", { cx: "9", cy: "12", r: "1" }),
        /* @__PURE__ */ t("circle", { cx: "9", cy: "18", r: "1" }),
        /* @__PURE__ */ t("circle", { cx: "15", cy: "6", r: "1" }),
        /* @__PURE__ */ t("circle", { cx: "15", cy: "12", r: "1" }),
        /* @__PURE__ */ t("circle", { cx: "15", cy: "18", r: "1" })
      ] }) })
    ] });
  },
  {
    props: {
      anchorRect: h,
      width: { type: Number },
      isOpen: { type: Boolean, reflect: !0 },
      add: p({ bubbles: !0, composed: !0 })
    },
    styles: [g, b]
  }
);
d("z-gutter-handle", m);
export {
  m as ZGutterHandle
};
