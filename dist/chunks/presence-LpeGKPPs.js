const r = /* @__PURE__ */ new WeakMap(), d = (t) => {
  const e = getComputedStyle(t), s = (n) => (n.trim().endsWith("ms") ? parseFloat(n) : parseFloat(n) * 1e3) || 0, o = e.transitionDuration.split(",").map(s), a = e.transitionDelay.split(",").map(s);
  return Math.max(0, ...o.map((n, i) => n + (a[i % a.length] ?? 0)));
}, c = (t) => {
  var e;
  (e = r.get(t)) == null || e(), r.delete(t);
}, p = (t) => t.dataset.state === "closing", m = (t, e) => {
  if (p(t)) return;
  c(t), t.dataset.state = "closing";
  let s;
  const o = () => {
    n(), delete t.dataset.state, e();
  }, a = (i) => {
    i.target === t && i.propertyName === "opacity" && o();
  }, n = () => {
    clearTimeout(s), t.removeEventListener("transitionend", a), r.delete(t);
  };
  t.addEventListener("transitionend", a), s = setTimeout(o, d(t) + 34), r.set(t, n);
}, u = (t) => {
  c(t), t.dataset.state !== "open" && (t.offsetWidth, t.dataset.state = "open");
};
export {
  u as a,
  c,
  m as r
};
