const f = (e, r, a, u) => {
  if (a <= 0) return -1;
  let l = e;
  for (let c = 0; c < a && (l = (l + r + a) % a, !u(l)); c++)
    ;
  return l;
}, n = (e) => (r) => {
  if (r.key === "Escape") {
    e.onClose();
    return;
  }
  if (r.key === "ArrowDown") {
    r.preventDefault(), e.isOpen ? e.onMove(f(e.activeIndex, 1, e.itemCount, e.isSelectable)) : e.onOpen();
    return;
  }
  if (r.key === "ArrowUp") {
    r.preventDefault(), e.isOpen ? e.onMove(f(e.activeIndex, -1, e.itemCount, e.isSelectable)) : e.onOpen();
    return;
  }
  (r.key === "Enter" || r.key === " ") && (r.preventDefault(), e.isOpen ? e.activeIndex >= 0 && e.onCommit(e.activeIndex) : e.onOpen());
}, y = (e) => (r) => {
  if (r.key === "Escape") {
    e.onClose();
    return;
  }
  if (r.key === "ArrowDown") {
    r.preventDefault(), e.onMove(f(e.activeIndex, 1, e.itemCount, e.isSelectable));
    return;
  }
  if (r.key === "ArrowUp") {
    r.preventDefault(), e.onMove(f(e.activeIndex, -1, e.itemCount, e.isSelectable));
    return;
  }
  r.key === "Enter" && (r.preventDefault(), e.activeIndex >= 0 && e.onCommit(e.activeIndex));
};
export {
  y as a,
  n as c
};
