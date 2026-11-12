import { o as w } from "./prop-types-B3Bpi956.js";
import { r as M, c as F, a as R } from "./presence-LpeGKPPs.js";
const E = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, A = (t) => {
  const [e, s] = String(t).split("-");
  return { side: ["top", "bottom", "left", "right"].includes(e) ? e : "bottom", align: s === "start" || s === "end" ? s : "center" };
}, P = (t, e, s, c, o) => {
  switch (t) {
    case "top":
      return { x: e.left, y: e.top - c - o };
    case "bottom":
      return { x: e.left, y: e.bottom + o };
    case "left":
      return { x: e.left - s - o, y: e.top };
    case "right":
      return { x: e.right + o, y: e.top };
  }
}, u = (t, e, s) => Math.max(e, Math.min(t, s)), q = (t, e, s = {}) => {
  const { placement: c = "bottom", offset: o = 8, padding: n = 8 } = s, { side: l, align: r } = A(c), i = t.getBoundingClientRect(), a = e.offsetWidth, d = e.offsetHeight, g = document.documentElement.clientWidth, y = document.documentElement.clientHeight;
  let m = l;
  const b = (h) => {
    const { x, y: v } = P(h, i, a, d, o);
    return h === "top" ? v >= n : h === "bottom" ? v + d <= y - n : h === "left" ? x >= n : x + a <= g - n;
  };
  !b(l) && b(E[l]) && (m = E[l]);
  let { x: p, y: f } = P(m, i, a, d, o);
  return m === "top" || m === "bottom" ? r === "center" ? p = i.left + (i.width - a) / 2 : r === "end" && (p = i.right - a) : r === "center" ? f = i.top + (i.height - d) / 2 : r === "end" && (f = i.bottom - d), m === "top" || m === "bottom" ? p = u(p, n, Math.max(n, g - a - n)) : f = u(f, n, Math.max(n, y - d - n)), {
    x: Math.round(p),
    y: Math.round(f),
    side: m,
    placement: r === "center" ? m : `${m}-${r}`
  };
}, O = (t, e, s) => {
  s();
  const c = () => s();
  window.addEventListener("scroll", c, !0), window.addEventListener("resize", c);
  let o = t.getBoundingClientRect(), n = 0;
  const l = () => {
    const i = t.getBoundingClientRect(), a = i.left !== o.left || i.top !== o.top, d = i.width !== o.width || i.height !== o.height;
    o = i, (a || d) && s(), n = requestAnimationFrame(l);
  };
  n = requestAnimationFrame(l);
  let r;
  return typeof ResizeObserver < "u" && (r = new ResizeObserver(c), t instanceof Element && r.observe(t), r.observe(e)), () => {
    window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", c), cancelAnimationFrame(n), r == null || r.disconnect();
  };
}, S = (t) => {
  F(t), t.matches(":popover-open") || (delete t.dataset.state, t.showPopover()), requestAnimationFrame(() => {
    t.matches(":popover-open") && t.dataset.state !== "closing" && R(t);
  });
}, $ = (t) => {
  t.matches(":popover-open") && M(t, () => t.hidePopover());
}, H = (t, e) => {
  t.style.left = `${e.x}px`, t.style.top = `${e.y}px`, t.dataset.side = e.side;
}, L = (t, e, s, c) => {
  const o = e.getBoundingClientRect(), n = s.side === "top" || s.side === "bottom", l = n ? o.left + o.width / 2 : o.top + o.height / 2, r = n ? s.x : s.y, i = n ? t.offsetWidth : t.offsetHeight, a = Math.max(c, i - c), d = u(l - r, c, a);
  t.style.setProperty(n ? "--arrow-x" : "--arrow-y", `${Math.round(d)}px`);
}, z = {
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
  O as a,
  H as b,
  q as c,
  L as d,
  $ as h,
  z as o,
  S as s
};
