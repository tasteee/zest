import { u as e, P as u, h as p } from "./define-element-BZUk-KLk.js";
import { c } from "./state-vXVqjGCt.js";
const n = (o) => {
  const { current: r } = e();
  if (!(o in r))
    throw new u(
      r,
      `For useProp("${o}"), the prop does not exist on the host.`,
      o
    );
  return p(
    (t = c(
      r[o],
      (s) => r[o] = s
    )) => (t[0] = r[o], t)
  );
};
export {
  n as u
};
