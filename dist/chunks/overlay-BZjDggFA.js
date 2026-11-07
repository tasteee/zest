import { o as w } from "./prop-types-B3Bpi956.js";
import { r as M, c as O, a as R } from "./presence-LpeGKPPs.js";
const E = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, S = (t) => {
  const [e, n] = String(t).split("-");
  return { side: ["top", "bottom", "left", "right"].includes(e) ? e : "bottom", align: n === "start" || n === "end" ? n : "center" };
}, P = (t, e, n, r, o) => {
  switch (t) {
    case "top":
      return { x: e.left, y: e.top - r - o };
    case "bottom":
      return { x: e.left, y: e.bottom + o };
    case "left":
      return { x: e.left - n - o, y: e.top };
    case "right":
      return { x: e.right + o, y: e.top };
  }
}, u = (t, e, n) => Math.max(e, Math.min(t, n)), F = (t, e, n = {}) => {
  const { placement: r = "bottom", offset: o = 8, padding: s = 8 } = n, { side: f, align: a } = S(r), i = t.getBoundingClientRect(), d = e.offsetWidth, p = e.offsetHeight, g = document.documentElement.clientWidth, y = document.documentElement.clientHeight;
  let c = f;
  const b = (h) => {
    const { x, y: v } = P(h, i, d, p, o);
    return h === "top" ? v >= s : h === "bottom" ? v + p <= y - s : h === "left" ? x >= s : x + d <= g - s;
  };
  !b(f) && b(E[f]) && (c = E[f]);
  let { x: l, y: m } = P(c, i, d, p, o);
  return c === "top" || c === "bottom" ? a === "center" ? l = i.left + (i.width - d) / 2 : a === "end" && (l = i.right - d) : a === "center" ? m = i.top + (i.height - p) / 2 : a === "end" && (m = i.bottom - p), c === "top" || c === "bottom" ? l = u(l, s, Math.max(s, g - d - s)) : m = u(m, s, Math.max(s, y - p - s)), {
    x: Math.round(l),
    y: Math.round(m),
    side: c,
    placement: a === "center" ? c : `${c}-${a}`
  };
}, H = (t, e, n) => {
  n();
  const r = () => n();
  window.addEventListener("scroll", r, !0), window.addEventListener("resize", r);
  let o;
  return typeof ResizeObserver < "u" && (o = new ResizeObserver(r), t instanceof Element && o.observe(t), o.observe(e)), () => {
    window.removeEventListener("scroll", r, !0), window.removeEventListener("resize", r), o == null || o.disconnect();
  };
}, L = (t) => {
  O(t), t.matches(":popover-open") || (delete t.dataset.state, t.showPopover()), requestAnimationFrame(() => {
    t.matches(":popover-open") && t.dataset.state !== "closing" && R(t);
  });
}, q = (t) => {
  t.matches(":popover-open") && M(t, () => t.hidePopover());
}, A = (t, e) => {
  t.style.left = `${e.x}px`, t.style.top = `${e.y}px`, t.dataset.side = e.side;
}, B = (t, e, n, r) => {
  const o = e.getBoundingClientRect(), s = n.side === "top" || n.side === "bottom", f = s ? o.left + o.width / 2 : o.top + o.height / 2, a = s ? n.x : n.y, i = s ? t.offsetWidth : t.offsetHeight, d = Math.max(r, i - r), p = u(f - a, r, d);
  t.style.setProperty(s ? "--arrow-x" : "--arrow-y", `${Math.round(p)}px`);
}, W = {
  placement: {
    type: w(
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
  tone: { type: w("primary", "secondary", "tertiary"), reflect: !0 },
  isHidden: { type: Boolean, reflect: !0 }
};
export {
  H as a,
  A as b,
  F as c,
  B as d,
  q as h,
  W as o,
  L as s
};
