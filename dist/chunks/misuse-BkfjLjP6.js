const t = /* @__PURE__ */ new WeakMap(), n = (e, r, o) => {
  const s = t.get(e) ?? /* @__PURE__ */ new Set();
  s.has(r) || (s.add(r), t.set(e, s), console.warn(`[zest] ${o}`, e));
};
export {
  n as r
};
