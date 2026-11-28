import { o as M } from "./prop-types-CSJu2W-0.js";
import { r as L, c as T, a as $ } from "./presence-LpeGKPPs.js";
const u = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, q = (t) => {
  const [e, n] = String(t).split("-");
  return { side: ["top", "bottom", "left", "right"].includes(e) ? e : "bottom", align: n === "start" || n === "end" ? n : "center" };
}, F = (t, e, n, o, s) => {
  switch (t) {
    case "top":
      return { x: e.left, y: e.top - o - s };
    case "bottom":
      return { x: e.left, y: e.bottom + s };
    case "left":
      return { x: e.left - n - s, y: e.top };
    case "right":
      return { x: e.right + s, y: e.top };
  }
}, w = (t, e, n) => Math.max(e, Math.min(t, n)), U = (t, e, n = {}) => {
  const { placement: o = "bottom", offset: s = 8, padding: r = 8 } = n, { side: c, align: a } = q(o);
  e.style.maxHeight = "";
  const i = t.getBoundingClientRect(), l = e.offsetWidth, m = e.offsetHeight, S = document.documentElement.clientWidth, g = document.documentElement.clientHeight;
  let d = c;
  const y = (f) => {
    const { x: H, y: P } = F(f, i, l, m, s);
    return f === "top" ? P >= r : f === "bottom" ? P + m <= g - r : f === "left" ? H >= r : H + l <= S - r;
  };
  !y(c) && y(u[c]) && (d = u[c]);
  const b = (f) => f === "bottom" ? g - i.bottom - s - r : f === "top" ? i.top - s - r : g - r * 2, B = c === "top" || c === "bottom", R = !y(c) && !y(u[c]);
  B && R && (d = b(c) >= b(u[c]) ? c : u[c]);
  const v = Math.max(b(d), 0), E = m > v, x = E ? v : m, A = E ? Math.floor(v) : void 0;
  let { x: h, y: p } = F(d, i, l, x, s);
  return d === "top" || d === "bottom" ? a === "center" ? h = i.left + (i.width - l) / 2 : a === "end" && (h = i.right - l) : a === "center" ? p = i.top + (i.height - x) / 2 : a === "end" && (p = i.bottom - x), d === "top" || d === "bottom" ? h = w(h, r, Math.max(r, S - l - r)) : p = w(p, r, Math.max(r, g - x - r)), {
    x: Math.round(h),
    y: Math.round(p),
    side: d,
    placement: a === "center" ? d : `${d}-${a}`,
    maxHeight: A
  };
}, C = /* @__PURE__ */ new WeakSet(), O = (t, e) => {
  const n = t.composedPath();
  for (const o of n) {
    if (o === e.parentNode) return !1;
    if (!(o instanceof HTMLElement)) continue;
    const s = getComputedStyle(o);
    if (!(/(auto|scroll)/.test(s.overflowY) && o.scrollHeight > o.clientHeight)) continue;
    const c = t.deltaY < 0, a = o.scrollTop > 0, i = o.scrollTop + o.clientHeight < o.scrollHeight - 1;
    if (c ? a : i) return !0;
  }
  return !1;
}, W = (t) => {
  C.has(t) || (C.add(t), t.style.overscrollBehavior = "contain", t.addEventListener(
    "wheel",
    (e) => {
      e.ctrlKey || O(e, t) || e.preventDefault();
    },
    { passive: !1 }
  ));
}, Y = (t, e, n) => {
  n();
  const o = () => n();
  window.addEventListener("scroll", o, !0), window.addEventListener("resize", o);
  let s = t.getBoundingClientRect(), r = 0;
  const c = () => {
    const i = t.getBoundingClientRect(), l = i.left !== s.left || i.top !== s.top, m = i.width !== s.width || i.height !== s.height;
    s = i, (l || m) && n(), r = requestAnimationFrame(c);
  };
  r = requestAnimationFrame(c);
  let a;
  return typeof ResizeObserver < "u" && (a = new ResizeObserver(o), t instanceof Element && a.observe(t), a.observe(e)), () => {
    window.removeEventListener("scroll", o, !0), window.removeEventListener("resize", o), cancelAnimationFrame(r), a == null || a.disconnect();
  };
}, k = (t) => {
  t.isConnected && (T(t), t.matches(":popover-open") || (delete t.dataset.state, t.showPopover()), requestAnimationFrame(() => {
    t.matches(":popover-open") && t.dataset.state !== "closing" && $(t);
  }));
}, D = (t) => {
  t.matches(":popover-open") && L(t, () => t.hidePopover());
}, I = (t, e) => {
  t.style.left = `${e.x}px`, t.style.top = `${e.y}px`, t.dataset.side = e.side, W(t);
  const n = e.maxHeight !== void 0;
  t.style.maxHeight = n ? `${e.maxHeight}px` : "", t.style.overflowY = n ? "auto" : "";
}, V = (t, e, n, o) => {
  const s = e.getBoundingClientRect(), r = n.side === "top" || n.side === "bottom", c = r ? s.left + s.width / 2 : s.top + s.height / 2, a = r ? n.x : n.y, i = r ? t.offsetWidth : t.offsetHeight, l = Math.max(o, i - o), m = w(c - a, o, l);
  t.style.setProperty(r ? "--arrow-x" : "--arrow-y", `${Math.round(m)}px`);
}, K = {
  placement: {
    type: M(
      "top",
      "bottom",
      "left",
      "right",
      "top-start",
      "top-center",
      "top-end",
      "bottom-start",
      "bottom-center",
      "bottom-end",
      "left-start",
      "left-center",
      "left-end",
      "right-start",
      "right-center",
      "right-end"
    ),
    reflect: !0
  },
  offset: { type: Number },
  tone: { type: M("primary", "secondary", "tertiary"), reflect: !0 },
  isHidden: { type: Boolean, reflect: !0 }
};
export {
  Y as a,
  I as b,
  U as c,
  V as d,
  D as h,
  K as o,
  k as s
};
