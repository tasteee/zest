const t = () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, c = (e) => {
  t() ? e() : setTimeout(e, 200);
};
export {
  c as f
};
