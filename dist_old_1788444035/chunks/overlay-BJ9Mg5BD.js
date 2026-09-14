const M = (t) => ({
  getBoundingClientRect: () => new DOMRect(t.x, t.y, t.width, t.height)
}), R = null, b = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, E = (t) => {
  const [e, n] = t.split("-");
  return { side: e, align: n ?? "center" };
}, P = (t, e, n, i, o) => {
  switch (t) {
    case "top":
      return { x: e.left, y: e.top - i - o };
    case "bottom":
      return { x: e.left, y: e.bottom + o };
    case "left":
      return { x: e.left - n - o, y: e.top };
    case "right":
      return { x: e.right + o, y: e.top };
  }
}, u = (t, e, n) => Math.max(e, Math.min(t, n)), C = (t, e, n = {}) => {
  const { placement: i = "bottom", offset: o = 8, padding: s = 8 } = n, { side: p, align: d } = E(i), r = t.getBoundingClientRect(), l = e.offsetWidth, a = e.offsetHeight, y = document.documentElement.clientWidth, g = document.documentElement.clientHeight;
  let c = p;
  const x = (m) => {
    const { x: w, y: v } = P(m, r, l, a, o);
    return m === "top" ? v >= s : m === "bottom" ? v + a <= g - s : m === "left" ? w >= s : w + l <= y - s;
  };
  !x(p) && x(b[p]) && (c = b[p]);
  let { x: f, y: h } = P(c, r, l, a, o);
  return c === "top" || c === "bottom" ? d === "center" ? f = r.left + (r.width - l) / 2 : d === "end" && (f = r.right - l) : d === "center" ? h = r.top + (r.height - a) / 2 : d === "end" && (h = r.bottom - a), c === "top" || c === "bottom" ? f = u(f, s, Math.max(s, y - l - s)) : h = u(h, s, Math.max(s, g - a - s)), { x: Math.round(f), y: Math.round(h), side: c, placement: d === "center" ? c : `${c}-${d}` };
}, O = (t, e, n) => {
  n();
  const i = () => n();
  window.addEventListener("scroll", i, !0), window.addEventListener("resize", i);
  let o;
  return typeof ResizeObserver < "u" && (o = new ResizeObserver(i), t instanceof Element && o.observe(t), o.observe(e)), () => {
    window.removeEventListener("scroll", i, !0), window.removeEventListener("resize", i), o == null || o.disconnect();
  };
}, S = (t) => {
  t.matches(":popover-open") || t.showPopover();
}, $ = (t) => {
  t.matches(":popover-open") && t.hidePopover();
}, A = (t, e) => {
  t.style.left = `${e.x}px`, t.style.top = `${e.y}px`, t.dataset.side = e.side;
}, B = (t, e, n, i) => {
  const o = e.getBoundingClientRect(), s = n.side === "top" || n.side === "bottom", p = s ? o.left + o.width / 2 : o.top + o.height / 2, d = s ? n.x : n.y, r = s ? t.offsetWidth : t.offsetHeight, l = Math.max(i, r - i), a = u(p - d, i, l);
  t.style.setProperty(s ? "--arrow-x" : "--arrow-y", `${Math.round(a)}px`);
}, H = {
  placement: { type: String, reflect: !0 },
  offset: { type: Number },
  accent: { type: String, reflect: !0 },
  isHidden: { type: Boolean, reflect: !0 }
};
export {
  R as A,
  O as a,
  A as b,
  C as c,
  B as d,
  $ as h,
  H as o,
  M as r,
  S as s
};
