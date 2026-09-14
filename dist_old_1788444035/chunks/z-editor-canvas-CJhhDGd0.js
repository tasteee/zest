import { c as I, a as P, e as Y, u as U, f as V, b as $, g as W, j as x } from "./define-element-BWC3wEPr.js";
import { u as X } from "./use-prop-DBBKVpkc.js";
const q = I`
	:host {
		display: block;
		position: relative;
		overflow: hidden;
		touch-action: none;
		background: var(--background);
		cursor: grab;
		--grid-color: color-mix(in oklch, var(--border) 60%, transparent);
	}
	:host([is-disabled]) {
		cursor: default;
	}
	:host(.is-panning) {
		cursor: grabbing;
	}
	:host(.is-space) {
		cursor: grab;
	}

	:host([grid='dots']) {
		background-image: radial-gradient(var(--grid-color) 1px, transparent 1px);
	}
	:host([grid='lines']) {
		background-image:
			linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
			linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
	}

	.viewport {
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: 0 0;
		will-change: transform;
	}

	.overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.overlay ::slotted(*) {
		pointer-events: auto;
	}
`, Q = P(
  (i) => {
    const v = U(), [Z, B] = X("zoom"), [C, D] = X("panX"), [E, L] = X("panY"), r = Z ?? 1, a = C ?? 0, l = E ?? 0, z = (t) => Math.min(i.maxZoom ?? 8, Math.max(i.minZoom ?? 0.1, t)), f = (t, e, o) => {
      const n = o !== r, c = t !== a || e !== l;
      !n && !c || (D(t), L(e), B(o), i.viewportchange({ x: t, y: e, zoom: o }), n && i.zoomchange({ zoom: o }), c && i.panchange({ x: t, y: e }));
    }, w = () => v.current.getBoundingClientRect(), M = (t, e, o) => {
      const n = w(), c = e - n.left, u = o - n.top, h = z(t), d = h / r;
      f(c - (c - a) * d, u - (u - l) * d, h);
    }, T = (t) => {
      if (i.isDisabled) return;
      if (t.preventDefault(), t.ctrlKey || (i.wheel ?? "zoom") === "zoom") {
        const o = Math.exp(-t.deltaY * 15e-4 * (i.zoomSpeed ?? 1));
        M(r * o, t.clientX, t.clientY);
      } else
        f(a - t.deltaX, l - t.deltaY, r);
    }, s = V({
      pointers: /* @__PURE__ */ new Map(),
      drag: null,
      pinch: null,
      spaceHeld: !1
    }).current, H = (t) => {
      const e = i.panButton ?? "auto";
      return t.button === 1 || s.spaceHeld ? !0 : e === "middle" ? !1 : t.button === 0;
    }, S = (t) => v.current.classList.toggle("is-panning", t), R = (t) => {
      if (!i.isDisabled)
        if (t.currentTarget.setPointerCapture(t.pointerId), s.pointers.set(t.pointerId, { x: t.clientX, y: t.clientY }), s.pointers.size === 2) {
          s.drag = null;
          const e = [...s.pointers.values()];
          s.pinch = {
            dist: Math.hypot(e[0].x - e[1].x, e[0].y - e[1].y),
            cx: (e[0].x + e[1].x) / 2,
            cy: (e[0].y + e[1].y) / 2
          };
        } else H(t) && (s.drag = { x: t.clientX, y: t.clientY }, S(!0));
    }, j = (t) => {
      if (s.pointers.has(t.pointerId))
        if (s.pointers.set(t.pointerId, { x: t.clientX, y: t.clientY }), s.pointers.size >= 2 && s.pinch) {
          const e = [...s.pointers.values()], o = Math.hypot(e[0].x - e[1].x, e[0].y - e[1].y), n = (e[0].x + e[1].x) / 2, c = (e[0].y + e[1].y) / 2, u = w(), h = n - s.pinch.cx, d = c - s.pinch.cy, m = z(r * (o / s.pinch.dist)), p = m / r, g = n - u.left, y = c - u.top, b = a + h, k = l + d;
          f(g - (g - b) * p, y - (y - k) * p, m), s.pinch = { dist: o, cx: n, cy: c };
        } else s.drag && (f(a + (t.clientX - s.drag.x), l + (t.clientY - s.drag.y), r), s.drag = { x: t.clientX, y: t.clientY });
    }, N = (t) => {
      s.pointers.delete(t.pointerId), s.pointers.size < 2 && (s.pinch = null), s.pointers.size === 0 && (s.drag = null, S(!1));
    };
    return $(() => {
      const t = v.current, e = (n) => {
        n.code === "Space" && (s.spaceHeld = !0, t.classList.add("is-space"));
      }, o = (n) => {
        n.code === "Space" && (s.spaceHeld = !1, t.classList.remove("is-space"));
      };
      return window.addEventListener("keydown", e), window.addEventListener("keyup", o), () => {
        window.removeEventListener("keydown", e), window.removeEventListener("keyup", o);
      };
    }, []), $(() => {
      const t = v.current;
      t.screenToCanvas = (e) => ({ x: (e.x - a) / r, y: (e.y - l) / r }), t.canvasToScreen = (e) => ({ x: e.x * r + a, y: e.y * r + l }), t.getViewport = () => ({ x: a, y: l, zoom: r }), t.panTo = (e, o) => f(e, o, r), t.panBy = (e, o) => f(a + e, l + o, r), t.zoomTo = (e, o) => {
        const n = w();
        M(e, (o == null ? void 0 : o.x) ?? n.left + n.width / 2, (o == null ? void 0 : o.y) ?? n.top + n.height / 2);
      }, t.zoomBy = (e, o) => t.zoomTo(r * e, o), t.reset = () => f(0, 0, 1), t.fit = (e = 24) => {
        const o = [...v.current.children].filter(
          (y) => y.getAttribute("slot") !== "overlay"
        );
        if (!o.length) return;
        const n = w();
        let c = 1 / 0, u = 1 / 0, h = -1 / 0, d = -1 / 0;
        for (const y of o) {
          const b = y.getBoundingClientRect(), k = (b.left - n.left - a) / r, A = (b.top - n.top - l) / r, G = (b.right - n.left - a) / r, K = (b.bottom - n.top - l) / r;
          c = Math.min(c, k), u = Math.min(u, A), h = Math.max(h, G), d = Math.max(d, K);
        }
        const m = h - c, p = d - u;
        if (m <= 0 || p <= 0) return;
        const g = z(Math.min((n.width - 2 * e) / m, (n.height - 2 * e) / p));
        f((n.width - m * g) / 2 - c * g, (n.height - p * g) / 2 - u * g, g);
      }, t.fitTo = (e, o = 24) => {
        const n = w(), c = e instanceof Element ? e.getBoundingClientRect() : e, u = (c.left - n.left - a) / r, h = (c.top - n.top - l) / r, d = c.width / r, m = c.height / r;
        if (d <= 0 || m <= 0) return;
        const p = z(Math.min((n.width - 2 * o) / d, (n.height - 2 * o) / m));
        f((n.width - d * p) / 2 - u * p, (n.height - m * p) / 2 - h * p, p);
      };
    }, [r, a, l]), /* @__PURE__ */ W(
      "host",
      {
        shadowDom: !0,
        onwheel: T,
        onpointerdown: R,
        onpointermove: j,
        onpointerup: N,
        onpointercancel: N,
        style: {
          backgroundSize: `${(i.gridSize ?? 24) * r}px ${(i.gridSize ?? 24) * r}px`,
          backgroundPosition: `${a}px ${l}px`
        },
        children: [
          /* @__PURE__ */ x("div", { class: "viewport", style: { transform: `translate(${a}px, ${l}px) scale(${r})` }, children: /* @__PURE__ */ x("slot", {}) }),
          /* @__PURE__ */ x("div", { class: "overlay", children: /* @__PURE__ */ x("slot", { name: "overlay" }) })
        ]
      }
    );
  },
  {
    props: {
      zoom: { type: Number, reflect: !0 },
      panX: { type: Number, reflect: !0 },
      panY: { type: Number, reflect: !0 },
      minZoom: { type: Number, reflect: !0 },
      maxZoom: { type: Number, reflect: !0 },
      zoomSpeed: { type: Number, reflect: !0 },
      grid: { type: String, reflect: !0 },
      gridSize: { type: Number, reflect: !0 },
      panButton: { type: String, reflect: !0 },
      wheel: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      viewportchange: Y({
        bubbles: !0,
        composed: !0
      }),
      zoomchange: Y({ bubbles: !0, composed: !0 }),
      panchange: Y({ bubbles: !0, composed: !0 })
    },
    styles: q
  }
), F = I`
	:host {
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: 0 0;
	}
`, _ = P(
  (i) => /* @__PURE__ */ x(
    "host",
    {
      shadowDom: !0,
      style: {
        transform: `translate(${i.x ?? 0}px, ${i.y ?? 0}px) rotate(${i.rotation ?? 0}deg)`,
        width: i.width != null ? `${i.width}px` : void 0,
        height: i.height != null ? `${i.height}px` : void 0
      },
      children: /* @__PURE__ */ x("slot", {})
    }
  ),
  {
    props: {
      x: { type: Number, reflect: !0 },
      y: { type: Number, reflect: !0 },
      width: { type: Number, reflect: !0 },
      height: { type: Number, reflect: !0 },
      rotation: { type: Number, reflect: !0 }
    },
    styles: F
  }
);
export {
  _ as Z,
  Q as a
};
