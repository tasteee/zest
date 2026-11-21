// @ts-self-types="./z-sortable.d.ts"
import { c as m, a as y, e as d, u as v, f as w, j as h, d as z } from "../chunks/define-element-BZUk-KLk.js";
import { o as I } from "../chunks/prop-types-CSJu2W-0.js";
import { w as B } from "../chunks/deprecate-DrGNNffe.js";
const $ = m`
	:host {
		display: block;
	}
	:host([is-horizontal]),
	:host([axis='x']) {
		display: flex;
	}
	:host([is-disabled]) {
		opacity: 0.6;
	}
	::slotted(*) {
		touch-action: none;
		user-select: none;
	}
	.placeholder {
		box-sizing: border-box;
		border: 1px dashed var(--border-default);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--text-secondary) 8%, transparent);
	}
`, k = y(
  (l) => {
    B({ tag: "z-sortable", attribute: "axis", value: l.axis, flag: "is-horizontal", flagValue: "x" });
    const p = v(), e = w({
      dragged: null,
      placeholder: null,
      oldIndex: -1,
      grabX: 0,
      grabY: 0
    }).current, i = () => p.current, u = () => !!l.isHorizontal || l.axis === "x" ? "x" : "y", g = (t) => {
      for (const o of t.composedPath()) {
        const s = o;
        if (s.parentElement === i()) return s;
      }
      return null;
    }, f = (t) => {
      if (l.isDisabled) return;
      const o = g(t);
      if (!o || o.classList.contains("placeholder") || l.handle && !t.target.closest(l.handle)) return;
      const s = [...i().children];
      e.dragged = o, e.oldIndex = s.indexOf(o);
      const r = o.getBoundingClientRect();
      e.grabX = t.clientX - r.left, e.grabY = t.clientY - r.top;
      const n = document.createElement("div");
      n.className = "placeholder", n.style.width = `${r.width}px`, n.style.height = `${r.height}px`, e.placeholder = n, i().insertBefore(n, o), Object.assign(o.style, {
        position: "fixed",
        left: `${r.left}px`,
        top: `${r.top}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
        margin: "0",
        zIndex: "9999",
        pointerEvents: "none",
        outline: "1px solid var(--border-default)",
        background: "var(--surface-page)"
      }), t.currentTarget.setPointerCapture(t.pointerId), l.start({ index: e.oldIndex });
    }, x = (t) => {
      if (!e.dragged || !e.placeholder) return;
      const o = u();
      o !== "x" && (e.dragged.style.top = `${t.clientY - e.grabY}px`), o !== "y" && (e.dragged.style.left = `${t.clientX - e.grabX}px`);
      const s = [...i().children].filter(
        (n) => n !== e.dragged && n !== e.placeholder
      );
      let r = !1;
      for (const n of s) {
        const a = n.getBoundingClientRect(), b = o === "x" ? a.left + a.width / 2 : a.top + a.height / 2;
        if ((o === "x" ? t.clientX : t.clientY) < b) {
          n.previousElementSibling !== e.placeholder && i().insertBefore(e.placeholder, n), r = !0;
          break;
        }
      }
      !r && i().lastElementChild !== e.placeholder && i().appendChild(e.placeholder);
    }, c = () => {
      if (!e.dragged || !e.placeholder) return;
      const t = e.dragged;
      i().insertBefore(t, e.placeholder), e.placeholder.remove();
      for (const s of ["position", "left", "top", "width", "height", "margin", "zIndex", "pointerEvents", "outline", "background"])
        t.style.removeProperty(s.replace(/[A-Z]/g, (r) => "-" + r.toLowerCase()));
      const o = [...i().children].indexOf(t);
      e.dragged = null, e.placeholder = null, o !== e.oldIndex && l.sort({ oldIndex: e.oldIndex, newIndex: o }), l.end();
    };
    return /* @__PURE__ */ h(
      "host",
      {
        shadowDom: !0,
        onpointerdown: f,
        onpointermove: x,
        onpointerup: c,
        onpointercancel: c,
        children: /* @__PURE__ */ h("slot", {})
      }
    );
  },
  {
    props: {
      isHorizontal: { type: Boolean, reflect: !0 },
      /** @deprecated use is-horizontal */
      axis: { type: I("x", "y"), reflect: !0 },
      handle: { type: String },
      isDisabled: { type: Boolean, reflect: !0 },
      start: d({ bubbles: !0, composed: !0 }),
      sort: d({ bubbles: !0, composed: !0 }),
      end: d({ bubbles: !0, composed: !0 })
    },
    styles: $
  }
);
z("z-sortable", k);
export {
  k as ZSortable
};
