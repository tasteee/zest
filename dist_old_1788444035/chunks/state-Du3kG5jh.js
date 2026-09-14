import { i as u } from "./define-element-BWC3wEPr.js";
function p(c, n, e) {
  const o = [
    u(c) ? c() : c,
    (s) => {
      const r = u(s) ? s(o[0]) : s;
      r !== o[0] && n(o[0] = r);
    }
  ];
  return o;
}
export {
  p as c
};
