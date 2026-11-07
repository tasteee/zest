import { c as s, r as n } from "./presence-LpeGKPPs.js";
const a = (t) => {
  s(t);
  const e = t.open;
  return e || (delete t.dataset.state, t.showModal(), t.offsetWidth), t.dataset.state = "open", !e;
}, c = (t, e) => {
  !t.open || t.dataset.state === "closing" || n(t, () => {
    t.close();
  });
}, r = (t, e) => {
  t.preventDefault(), e();
};
export {
  c,
  r as i,
  a as o
};
