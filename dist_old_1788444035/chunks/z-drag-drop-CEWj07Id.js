import { c as h, a as y, e as c, u as w, f as k, g as S, j as f, b as D } from "./define-element-BWC3wEPr.js";
let t = null;
const b = /* @__PURE__ */ new Set(), d = (r, s, e) => r.dispatchEvent(new CustomEvent(s, { detail: e, bubbles: !0, composed: !0 })), x = (r, s, e) => {
  if (r.hasAttribute("is-disabled") || (r.getAttribute("group") || "") !== e) return !1;
  const a = (r.getAttribute("accept") || "*").trim();
  return a === "" || a === "*" ? !0 : a.split(/\s+/).includes(s);
}, j = (r, s) => {
  var e;
  for (const a of document.elementsFromPoint(r, s)) {
    const l = (e = a.closest) == null ? void 0 : e.call(a, "z-drop-target");
    if (l && b.has(l)) return l;
  }
  return null;
}, p = (r, s) => ({
  data: t.data,
  type: t.type,
  source: t.source,
  x: r,
  y: s
}), A = (r, s, e) => {
  if (t) {
    if (t.over === r) {
      r && d(r, "dragover", p(s, e));
      return;
    }
    t.over && (t.over.removeAttribute("data-state"), d(t.over, "dragleave", p(s, e))), t.over = r, r && (r.setAttribute("data-state", x(r, t.type, t.group) ? "over" : "reject"), d(r, "dragenter", p(s, e)));
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
    const s = w(), e = k({ downX: 0, downY: 0, started: !1, active: !1 }).current, a = (o, n) => {
      const i = s.current, u = (i.querySelector('[slot="preview"]') ?? i).cloneNode(!0);
      u.removeAttribute("slot");
      const g = i.getBoundingClientRect();
      return Object.assign(u.style, {
        position: "fixed",
        left: "0",
        top: "0",
        width: `${g.width}px`,
        margin: "0",
        pointerEvents: "none",
        opacity: "0.85",
        zIndex: "9999"
      }), u.style.display = "block", document.body.appendChild(u), t.offsetX = o - g.left, t.offsetY = n - g.top, u;
    }, l = (o, n) => {
      t != null && t.preview && (t.preview.style.transform = `translate(${o - t.offsetX}px, ${n - t.offsetY}px)`);
    }, X = (o) => {
      r.isDisabled || r.handle && !o.target.closest(r.handle) || (o.currentTarget.setPointerCapture(o.pointerId), e.downX = o.clientX, e.downY = o.clientY, e.started = !0, e.active = !1);
    }, Y = (o) => {
      if (e.started) {
        if (!e.active) {
          if (Math.hypot(o.clientX - e.downX, o.clientY - e.downY) < 4) return;
          e.active = !0, t = {
            source: s.current,
            type: r.type || "",
            data: r.data,
            group: r.group || "",
            preview: null,
            over: null,
            offsetX: 0,
            offsetY: 0
          }, t.preview = a(e.downX, e.downY), s.current.classList.add("is-dragging"), d(s.current, "dragstart", { type: t.type, data: t.data });
        }
        l(o.clientX, o.clientY), A(j(o.clientX, o.clientY), o.clientX, o.clientY), d(s.current, "dragmove", {
          x: o.clientX,
          y: o.clientY,
          over: (t == null ? void 0 : t.over) ?? null
        });
      }
    }, m = (o) => {
      var v;
      if (!e.started || (e.started = !1, !e.active)) return;
      e.active = !1;
      const n = (t == null ? void 0 : t.over) ?? null, i = !!(n && t && x(n, t.type, t.group));
      n && i && d(n, "dropitem", p(o.clientX, o.clientY)), n && n.removeAttribute("data-state"), s.current.classList.remove("is-dragging"), d(s.current, "dragend", { dropped: i, target: i ? n : null }), (v = t == null ? void 0 : t.preview) == null || v.remove(), t = null;
    };
    return /* @__PURE__ */ S(
      "host",
      {
        shadowDom: !0,
        onpointerdown: X,
        onpointermove: Y,
        onpointerup: m,
        onpointercancel: m,
        children: [
          /* @__PURE__ */ f("slot", {}),
          /* @__PURE__ */ f("slot", { name: "preview" })
        ]
      }
    );
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
			background var(--duration-fast) var(--easing-standard),
			box-shadow var(--duration-fast) var(--easing-standard);
	}
	:host([data-state='over']) {
		background: color-mix(in oklch, var(--accent, var(--purple)) 12%, transparent);
		box-shadow: inset 0 0 0 2px var(--accent, var(--purple));
	}
	:host([data-state='reject']) {
		background: color-mix(in oklch, var(--destructive) 10%, transparent);
		box-shadow: inset 0 0 0 2px var(--destructive);
	}
`, P = y(
  (r) => {
    const s = w();
    return D(() => {
      const e = s.current;
      return b.add(e), () => b.delete(e);
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
