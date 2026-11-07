import { o as e } from "./prop-types-B3Bpi956.js";
const d = {
  tone: { type: e("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
  size: { type: e("xs", "sm", "md", "lg"), reflect: !0 },
  kind: { type: e("solid", "outline", "ghost", "soft", "plain"), reflect: !0 },
  isIcon: { type: Boolean, reflect: !0 }
}, i = {
  primary: "is-secondary",
  secondary: "is-tertiary",
  neutral: "is-primary",
  success: "is-success",
  warning: "is-warning",
  danger: "is-danger"
}, t = {
  xs: "is-xs",
  sm: "is-sm",
  md: "is-md",
  lg: "is-lg"
}, o = {
  solid: "is-solid",
  outline: "is-outline",
  ghost: "is-ghost",
  soft: "is-soft",
  plain: "is-plain"
}, r = (s) => {
  if (s.tone)
    return i[s.tone];
}, l = (s) => {
  if (s.size)
    return t[s.size];
}, a = (s) => {
  if (s.kind)
    return o[s.kind];
}, u = (s) => {
  const n = s.isIcon ? "is-icon" : void 0;
  return [
    a(s),
    r(s),
    l(s),
    n
  ].filter(Boolean).join(" ");
};
export {
  u as r,
  d as t
};
