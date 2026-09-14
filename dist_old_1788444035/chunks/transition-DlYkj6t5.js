import { f as u, b as c } from "./define-element-BWC3wEPr.js";
import { u as i } from "./hooks-D9_x-ckD.js";
const f = (e, o = 80) => {
  const [s, t] = i(e ? "open" : "closed"), r = u();
  return c(() => {
    if (clearTimeout(r.current), e) {
      t("open");
      return;
    }
    if (s !== "closed")
      return t("closing"), r.current = setTimeout(() => t("closed"), o), () => clearTimeout(r.current);
  }, [e]), s;
};
export {
  f as u
};
