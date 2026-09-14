import { c as S, a as O, e as D, u as I, f as M, b as L, j as A } from "./define-element-BWC3wEPr.js";
const P = S`
	:host {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	:host([direction='vertical']) {
		flex-direction: column;
	}
	::slotted(z-panel) {
		overflow: hidden;
		min-width: 0;
		min-height: 0;
	}
`, m = (a, d, e) => {
  if (!a) return e;
  if (a.endsWith("%")) return parseFloat(a);
  if (a.endsWith("px")) return d > 0 ? parseFloat(a) / d * 100 : e;
  const g = parseFloat(a);
  return Number.isFinite(g) ? g : e;
}, k = (a, d, e) => a.dispatchEvent(new CustomEvent(d, { detail: e, bubbles: !0, composed: !0 })), W = O(
  (a) => {
    const d = I(), e = M({
      layout: [],
      // percentages, one per z-panel
      sizeOf: /* @__PURE__ */ new WeakMap(),
      // survives re-init
      expandedOf: /* @__PURE__ */ new WeakMap(),
      // pre-collapse size
      inited: !1
    }).current, g = () => d.current, f = () => [...g().querySelectorAll(":scope > z-panel")], y = () => a.direction === "vertical" ? g().clientHeight : g().clientWidth, x = (t) => t.hasAttribute("is-collapsed"), z = (t, n) => {
      const s = m(t.getAttribute("min-size"), n, 0), o = m(t.getAttribute("collapsed-size"), n, 0);
      return {
        min: s,
        max: m(t.getAttribute("max-size"), n, 100),
        collapsible: t.hasAttribute("collapsible"),
        collapsed: o,
        threshold: t.hasAttribute("collapse-threshold") ? m(t.getAttribute("collapse-threshold"), n, s) : Math.max(s, o + 8)
      };
    }, _ = () => a.autoSaveId ? `z-panels:${a.autoSaveId}` : null, b = () => {
      f().forEach((s, o) => {
        s.style.flex = `0 0 ${e.layout[o]}%`, e.sizeOf.set(s, e.layout[o]);
      }), a.layout({ sizes: [...e.layout] });
      const n = _();
      n && localStorage.setItem(n, JSON.stringify(e.layout));
    }, i = () => {
      const t = y(), n = f();
      if (!n.length) return;
      const s = _(), o = s ? JSON.parse(localStorage.getItem(s) || "null") : null;
      let l;
      !e.inited && Array.isArray(o) && o.length === n.length ? l = o : l = n.map(
        (r, h) => e.sizeOf.has(r) ? e.sizeOf.get(r) : m(r.getAttribute("default-size"), t, 100 / n.length)
      );
      const c = l.reduce((r, h) => r + h, 0) || 1;
      e.layout = l.map((r) => r / c * 100), e.inited = !0, b();
    }, u = (t, n) => {
      const s = f();
      if (!s[t] || !s[t + 1]) return;
      const o = y(), l = e.layout[t] + e.layout[t + 1], c = z(s[t], o), r = z(s[t + 1], o);
      let h = e.layout[t] + n / o * 100;
      if (c.collapsible && h < c.threshold) return p(t);
      if (r.collapsible && l - h < r.threshold) return p(t + 1);
      h = Math.max(c.min, Math.min(c.max, h));
      let v = l - h;
      v = Math.max(r.min, Math.min(r.max, v)), h = l - v, e.layout[t] = h, e.layout[t + 1] = v, x(s[t]) && h > c.collapsed + 0.5 && s[t].removeAttribute("is-collapsed"), x(s[t + 1]) && v > r.collapsed + 0.5 && s[t + 1].removeAttribute("is-collapsed"), b(), k(s[t], "sizechange", { size: h }), k(s[t + 1], "sizechange", { size: v });
    }, p = (t) => {
      const n = f(), s = n[t];
      if (!s || x(s)) return;
      const o = y(), l = m(s.getAttribute("collapsed-size"), o, 0);
      e.expandedOf.set(s, e.layout[t]);
      const c = e.layout[t] - l, r = n[t + 1] ? t + 1 : t - 1;
      e.layout[t] = l, n[r] && (e.layout[r] += c), s.setAttribute("is-collapsed", ""), b(), k(s, "collapsechange", { collapsed: !0 });
    }, w = (t) => {
      const n = f(), s = n[t];
      if (!s) return;
      const o = y(), l = e.expandedOf.get(s) ?? m(s.getAttribute("min-size"), o, 20), c = l - e.layout[t], r = n[t + 1] ? t + 1 : t - 1;
      e.layout[t] = l, n[r] && (e.layout[r] -= c), s.removeAttribute("is-collapsed"), b(), k(s, "collapsechange", { collapsed: !1 });
    };
    return L(() => {
      const t = d.current;
      t.__resizeAt = u, t.__extent = y, t.__isDisabled = () => !!a.isDisabled, t.__keyboardStep = () => a.keyboardStep ?? 5, t.__panelIndexOfHandle = (o) => {
        let l = -1, c = o;
        for (; c = c.previousElementSibling; )
          c.tagName.toLowerCase() === "z-panel" && l++;
        return l;
      }, t.__panelIndex = (o) => f().indexOf(o), t.__collapsePanel = p, t.__expandPanel = w, t.getLayout = () => [...e.layout], t.setLayout = (o) => {
        const l = o.reduce((c, r) => c + r, 0) || 1;
        e.layout = o.map((c) => c / l * 100), b();
      }, t.reset = () => {
        e.inited = !1;
        const o = _();
        o && localStorage.removeItem(o), e.sizeOf = /* @__PURE__ */ new WeakMap(), i();
      }, i();
      const n = new MutationObserver(() => i());
      n.observe(g(), { childList: !0 });
      const s = new ResizeObserver(() => {
        e.layout.length && b();
      });
      return s.observe(g()), () => {
        n.disconnect(), s.disconnect();
      };
    }, [a.direction, a.autoSaveId, a.isDisabled]), /* @__PURE__ */ A("host", { shadowDom: !0, children: /* @__PURE__ */ A("slot", {}) });
  },
  {
    props: {
      direction: { type: String, reflect: !0 },
      autoSaveId: { type: String, reflect: !0 },
      keyboardStep: { type: Number, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      layout: D({ bubbles: !0, composed: !0 })
    },
    styles: P
  }
), E = S`
	:host {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		align-self: stretch;
		background: transparent;
		touch-action: none;
		cursor: col-resize;
		padding: 0 5px; /* horizontal hit area for a row group */
	}
	/* Orientation is set imperatively (is-column) from the parent group's
	   direction, since :host-context isn't universally supported. */
	:host([is-column]) {
		cursor: row-resize;
		padding: 5px 0;
	}
	:host([is-disabled]) {
		cursor: default;
		pointer-events: none;
	}
	.grip {
		background: var(--border);
		border-radius: 999px;
		transition:
			background var(--duration-fast) var(--easing-standard),
			width var(--duration-fast) var(--easing-standard),
			height var(--duration-fast) var(--easing-standard);
	}
	:host(:not([is-column])) .grip {
		width: 1px;
		align-self: stretch; /* full height */
	}
	:host([is-column]) .grip {
		height: 1px;
		width: 100%; /* full width */
	}
	:host(:not([is-column]):hover) .grip,
	:host(:not([is-column]).is-dragging) .grip {
		background: var(--ring);
		width: 2px;
	}
	:host([is-column]:hover) .grip,
	:host([is-column].is-dragging) .grip {
		background: var(--ring);
		height: 2px;
	}
	:host(:focus-visible) {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -2px;
		border-radius: var(--radius-sm);
	}
`, j = O(
  (a) => {
    var b;
    const d = I(), e = M({ active: !1, last: 0 }).current, g = () => d.current.parentElement, f = () => {
      var i;
      return ((i = g()) == null ? void 0 : i.getAttribute("direction")) === "vertical";
    };
    L(() => {
      d.current.toggleAttribute("is-column", f());
    });
    const y = (i) => {
      var p;
      const u = g();
      a.isDisabled || (p = u == null ? void 0 : u.__isDisabled) != null && p.call(u) || (e.active = !0, e.last = f() ? i.clientY : i.clientX, i.currentTarget.setPointerCapture(i.pointerId), d.current.classList.add("is-dragging"), a.dragging({ isDragging: !0 }));
    }, x = (i) => {
      if (!e.active) return;
      const u = g(), p = f() ? i.clientY : i.clientX;
      u.__resizeAt(u.__panelIndexOfHandle(d.current), p - e.last), e.last = p;
    }, z = () => {
      e.active && (e.active = !1, d.current.classList.remove("is-dragging"), a.dragging({ isDragging: !1 }));
    }, _ = (i) => {
      const u = g();
      if (a.isDisabled || !u) return;
      const p = f(), w = p ? "ArrowDown" : "ArrowRight", t = p ? "ArrowUp" : "ArrowLeft";
      if (i.key !== w && i.key !== t) return;
      i.preventDefault();
      const n = u.__keyboardStep() / 100 * u.__extent();
      u.__resizeAt(u.__panelIndexOfHandle(d.current), i.key === w ? n : -n);
    };
    return /* @__PURE__ */ A(
      "host",
      {
        shadowDom: !0,
        role: "separator",
        tabindex: a.isDisabled ? "-1" : "0",
        "aria-orientation": ((b = g()) == null ? void 0 : b.getAttribute("direction")) === "vertical" ? "horizontal" : "vertical",
        onpointerdown: y,
        onpointermove: x,
        onpointerup: z,
        onpointercancel: z,
        onkeydown: _,
        children: /* @__PURE__ */ A("slot", { children: /* @__PURE__ */ A("div", { class: "grip", part: "grip" }) })
      }
    );
  },
  {
    props: {
      isDisabled: { type: Boolean, reflect: !0 },
      dragging: D({ bubbles: !0, composed: !0 })
    },
    styles: E
  }
);
export {
  j as Z,
  W as a
};
