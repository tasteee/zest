import { c as m, a as y, e as a, u as v, f as w, j as p, d as I } from "../chunks/define-element-BWC3wEPr.js";
const k = m`
	:host {
		display: block;
	}
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
		border: 1px dashed var(--border);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--muted) 8%, transparent);
	}
`, $ = y(
  (s) => {
    const h = v(), e = w({
      dragged: null,
      placeholder: null,
      oldIndex: -1,
      grabX: 0,
      grabY: 0
    }).current, l = () => h.current, u = () => s.axis || "y", g = (t) => {
      for (const o of t.composedPath()) {
        const d = o;
        if (d.parentElement === l()) return d;
      }
      return null;
    }, f = (t) => {
      if (s.isDisabled) return;
      const o = g(t);
      if (!o || o.classList.contains("placeholder") || s.handle && !t.target.closest(s.handle)) return;
      const d = [...l().children];
      e.dragged = o, e.oldIndex = d.indexOf(o);
      const n = o.getBoundingClientRect();
      e.grabX = t.clientX - n.left, e.grabY = t.clientY - n.top;
      const r = document.createElement("div");
      r.className = "placeholder", r.style.width = `${n.width}px`, r.style.height = `${n.height}px`, e.placeholder = r, l().insertBefore(r, o), Object.assign(o.style, {
        position: "fixed",
        left: `${n.left}px`,
        top: `${n.top}px`,
        width: `${n.width}px`,
        height: `${n.height}px`,
        margin: "0",
        zIndex: "9999",
        pointerEvents: "none",
        outline: "1px solid var(--border)",
        background: "var(--background)"
      }), t.currentTarget.setPointerCapture(t.pointerId), s.start({ index: e.oldIndex });
    }, b = (t) => {
      if (!e.dragged || !e.placeholder) return;
      const o = u();
      o !== "x" && (e.dragged.style.top = `${t.clientY - e.grabY}px`), o !== "y" && (e.dragged.style.left = `${t.clientX - e.grabX}px`);
      const d = [...l().children].filter(
        (r) => r !== e.dragged && r !== e.placeholder
      );
      let n = !1;
      for (const r of d) {
        const i = r.getBoundingClientRect(), x = o === "x" ? i.left + i.width / 2 : i.top + i.height / 2;
        if ((o === "x" ? t.clientX : t.clientY) < x) {
          r.previousElementSibling !== e.placeholder && l().insertBefore(e.placeholder, r), n = !0;
          break;
        }
      }
      !n && l().lastElementChild !== e.placeholder && l().appendChild(e.placeholder);
    }, c = () => {
      if (!e.dragged || !e.placeholder) return;
      const t = e.dragged;
      l().insertBefore(t, e.placeholder), e.placeholder.remove();
      for (const d of ["position", "left", "top", "width", "height", "margin", "zIndex", "pointerEvents", "outline", "background"])
        t.style.removeProperty(d.replace(/[A-Z]/g, (n) => "-" + n.toLowerCase()));
      const o = [...l().children].indexOf(t);
      e.dragged = null, e.placeholder = null, o !== e.oldIndex && s.sort({ oldIndex: e.oldIndex, newIndex: o }), s.end();
    };
    return /* @__PURE__ */ p(
      "host",
      {
        shadowDom: !0,
        onpointerdown: f,
        onpointermove: b,
        onpointerup: c,
        onpointercancel: c,
        children: /* @__PURE__ */ p("slot", {})
      }
    );
  },
  {
    props: {
      axis: { type: String, reflect: !0 },
      handle: { type: String },
      isDisabled: { type: Boolean, reflect: !0 },
      start: a({ bubbles: !0, composed: !0 }),
      sort: a({ bubbles: !0, composed: !0 }),
      end: a({ bubbles: !0, composed: !0 })
    },
    styles: k
  }
);
I("z-sortable", $);
export {
  $ as ZSortable
};
