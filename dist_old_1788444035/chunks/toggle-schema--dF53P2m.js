const a = {
  accent: { type: String, reflect: !0 },
  size: { type: String, reflect: !0 },
  kind: { type: String, reflect: !0 },
  isIcon: { type: Boolean, reflect: !0 }
}, t = {
  dom: "is-dom",
  sub: "is-sub",
  neutral: "is-neutral",
  success: "is-success",
  warning: "is-warning",
  error: "is-error"
}, n = {
  sm: "is-sm",
  md: "is-md",
  lg: "is-lg"
}, i = {
  solid: "is-solid",
  outline: "is-outline",
  ghost: "is-ghost",
  soft: "is-soft",
  plain: "is-plain"
}, o = (s) => {
  if (s.accent)
    return t[s.accent];
}, r = (s) => {
  if (s.size)
    return n[s.size];
}, l = (s) => {
  if (s.kind)
    return i[s.kind];
}, u = (s) => {
  const e = s.isIcon ? "is-icon" : void 0;
  return [
    l(s),
    o(s),
    r(s),
    e
  ].filter(Boolean).join(" ");
};
export {
  u as r,
  a as t
};
