import { c as h, a as y, e as c, u as w, f as k, g as S, j as f, b as D } from "./define-element-BZUk-KLk.js";
let e = null;
const g = /* @__PURE__ */ new Set(), l = (r, s, t) => r.dispatchEvent(new CustomEvent(s, { detail: t, bubbles: !0, composed: !0 })), x = (r, s, t) => {
  if (r.hasAttribute("is-disabled") || (r.getAttribute("group") || "") !== t) return !1;
  const a = (r.getAttribute("accept") || "*").trim();
  return a === "" || a === "*" ? !0 : a.split(/\s+/).includes(s);
}, j = (r, s) => {
  var t;
  for (const a of document.elementsFromPoint(r, s)) {
    const d = (t = a.closest) == null ? void 0 : t.call(a, "z-drop-target");
    if (d && g.has(d)) return d;
  }
  return null;
}, p = (r, s) => ({
  data: e.data,
  type: e.type,
  source: e.source,
  x: r,
  y: s
}), A = (r, s, t) => {
  if (e) {
    if (e.over === r) {
      r && l(r, "dragover", p(s, t));
      return;
    }
    e.over && (e.over.removeAttribute("data-state"), l(e.over, "dragleave", p(s, t))), e.over = r, r && (r.setAttribute("data-state", x(r, e.type, e.group) ? "over" : "reject"), l(r, "dragenter", p(s, t)));
  }
}, C = h`
	:host {
		display: block;
		touch-action: none;
	}
	:host([is-disabled]) {
		touch-action: auto;
	}
	:host(.is-dragging) {
		opacity: 0.4;
	}
	::slotted([slot='preview']) {
		display: none;
	}
`, B = y(
  (r) => {
    const s = w(), t = k({ downX: 0, downY: 0, started: !1, active: !1 }).current, a = (o, n) => {
      const i = s.current, u = (i.querySelector('[slot="preview"]') ?? i).cloneNode(!0);
      u.removeAttribute("slot");
      const b = i.getBoundingClientRect();
      return Object.assign(u.style, {
        position: "fixed",
        left: "0",
        top: "0",
        width: `${b.width}px`,
        margin: "0",
        pointerEvents: "none",
        opacity: "0.85",
        zIndex: "9999"
      }), u.style.display = "block", document.body.appendChild(u), e.offsetX = o - b.left, e.offsetY = n - b.top, u;
    }, d = (o, n) => {
      e != null && e.preview && (e.preview.style.transform = `translate(${o - e.offsetX}px, ${n - e.offsetY}px)`);
    }, X = (o) => {
      r.isDisabled || r.handle && !o.target.closest(r.handle) || (o.currentTarget.setPointerCapture(o.pointerId), t.downX = o.clientX, t.downY = o.clientY, t.started = !0, t.active = !1);
    }, Y = (o) => {
      if (t.started) {
        if (!t.active) {
          if (Math.hypot(o.clientX - t.downX, o.clientY - t.downY) < 4) return;
          t.active = !0, e = {
            source: s.current,
            type: r.type || "",
            data: r.data,
            group: r.group || "",
            preview: null,
            over: null,
            offsetX: 0,
            offsetY: 0
          }, e.preview = a(t.downX, t.downY), s.current.classList.add("is-dragging"), l(s.current, "dragstart", { type: e.type, data: e.data });
        }
        d(o.clientX, o.clientY), A(j(o.clientX, o.clientY), o.clientX, o.clientY), l(s.current, "dragmove", {
          x: o.clientX,
          y: o.clientY,
          over: (e == null ? void 0 : e.over) ?? null
        });
      }
    }, m = (o) => {
      var v;
      if (!t.started || (t.started = !1, !t.active)) return;
      t.active = !1;
      const n = (e == null ? void 0 : e.over) ?? null, i = !!(n && e && x(n, e.type, e.group));
      n && i && l(n, "dropitem", p(o.clientX, o.clientY)), n && n.removeAttribute("data-state"), s.current.classList.remove("is-dragging"), l(s.current, "dragend", { dropped: i, target: i ? n : null }), (v = e == null ? void 0 : e.preview) == null || v.remove(), e = null;
    };
    return /* @__PURE__ */ S("host", { shadowDom: !0, onpointerdown: X, onpointermove: Y, onpointerup: m, onpointercancel: m, children: [
      /* @__PURE__ */ f("slot", {}),
      /* @__PURE__ */ f("slot", { name: "preview" })
    ] });
  },
  {
    props: {
      type: { type: String, reflect: !0 },
      data: { type: Object },
      group: { type: String, reflect: !0 },
      handle: { type: String },
      isDisabled: { type: Boolean, reflect: !0 },
      dragstart: c({ bubbles: !0, composed: !0 }),
      dragmove: c({
        bubbles: !0,
        composed: !0
      }),
      dragend: c({
        bubbles: !0,
        composed: !0
      })
    },
    styles: C
  }
), E = h`
	:host {
		display: block;
		border-radius: var(--radius-md);
		transition:
			background var(--motion-fast) var(--ease-enter),
			box-shadow var(--motion-fast) var(--ease-enter);
	}
	:host([data-state='over']) {
		background: color-mix(in oklch, var(--accent) 12%, transparent);
		box-shadow: inset 0 0 0 2px var(--accent);
	}
	:host([data-state='reject']) {
		background: color-mix(in oklch, var(--destructive) 10%, transparent);
		box-shadow: inset 0 0 0 2px var(--destructive);
	}
`, P = y(
  (r) => {
    const s = w();
    return D(() => {
      const t = s.current;
      return g.add(t), () => g.delete(t);
    }, []), /* @__PURE__ */ f("host", { shadowDom: !0, children: /* @__PURE__ */ f("slot", {}) });
  },
  {
    props: {
      accept: { type: String, reflect: !0 },
      group: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      dragenter: c({ bubbles: !0, composed: !0 }),
      dragover: c({ bubbles: !0, composed: !0 }),
      dragleave: c({ bubbles: !0, composed: !0 }),
      dropitem: c({
        bubbles: !0,
        composed: !0
      })
    },
    styles: E
  }
);
export {
  B as Z,
  P as a
};
