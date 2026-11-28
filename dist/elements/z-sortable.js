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
  (i) => {
    B({ tag: "z-sortable", attribute: "axis", value: i.axis, flag: "is-horizontal", flagValue: "x" });
    const p = v(), e = w({
      dragged: null,
      placeholder: null,
      oldIndex: -1,
      grabX: 0,
      grabY: 0
    }).current, s = () => p.current, u = () => !!i.isHorizontal || i.axis === "x" ? "x" : "y", f = (t) => {
      for (const n of t.composedPath()) {
        const r = n;
        if (r.parentElement === s()) return r;
      }
      return null;
    }, g = (t) => {
      if (i.isDisabled || !(t.button === 0 && t.isPrimary !== !1)) return;
      const r = f(t);
      if (!r || r.classList.contains("placeholder") || i.handle && !t.target.closest(i.handle)) return;
      const a = [...s().children];
      e.dragged = r, e.oldIndex = a.indexOf(r);
      const o = r.getBoundingClientRect();
      e.grabX = t.clientX - o.left, e.grabY = t.clientY - o.top;
      const l = document.createElement("div");
      l.className = "placeholder", l.style.width = `${o.width}px`, l.style.height = `${o.height}px`, e.placeholder = l, s().insertBefore(l, r), Object.assign(r.style, {
        position: "fixed",
        left: `${o.left}px`,
        top: `${o.top}px`,
        width: `${o.width}px`,
        height: `${o.height}px`,
        margin: "0",
        zIndex: "9999",
        pointerEvents: "none",
        outline: "1px solid var(--border-default)",
        background: "var(--surface-page)"
      }), t.currentTarget.setPointerCapture(t.pointerId), i.start({ index: e.oldIndex });
    }, x = (t) => {
      if (!e.dragged || !e.placeholder) return;
      const n = u();
      n !== "x" && (e.dragged.style.top = `${t.clientY - e.grabY}px`), n !== "y" && (e.dragged.style.left = `${t.clientX - e.grabX}px`);
      const r = [...s().children].filter(
        (o) => o !== e.dragged && o !== e.placeholder
      );
      let a = !1;
      for (const o of r) {
        const l = o.getBoundingClientRect(), b = n === "x" ? l.left + l.width / 2 : l.top + l.height / 2;
        if ((n === "x" ? t.clientX : t.clientY) < b) {
          o.previousElementSibling !== e.placeholder && s().insertBefore(e.placeholder, o), a = !0;
          break;
        }
      }
      !a && s().lastElementChild !== e.placeholder && s().appendChild(e.placeholder);
    }, c = () => {
      if (!e.dragged || !e.placeholder) return;
      const t = e.dragged;
      s().insertBefore(t, e.placeholder), e.placeholder.remove();
      for (const r of ["position", "left", "top", "width", "height", "margin", "zIndex", "pointerEvents", "outline", "background"])
        t.style.removeProperty(r.replace(/[A-Z]/g, (a) => "-" + a.toLowerCase()));
      const n = [...s().children].indexOf(t);
      e.dragged = null, e.placeholder = null, n !== e.oldIndex && i.sort({ oldIndex: e.oldIndex, newIndex: n }), i.end();
    };
    return /* @__PURE__ */ h(
      "host",
      {
        shadowDom: !0,
        onpointerdown: g,
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
