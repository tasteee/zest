import { u as m, b as h } from "./define-element-BZUk-KLk.js";
import { u as f } from "./hooks-DEFT8qqt.js";
const A = (e, s, c) => Array.from(e.querySelectorAll(s.map((t) => `:scope > ${t}`).join(", "))).map((t, u) => {
  const r = `item-${u}`;
  t.getAttribute("slot") !== r && t.setAttribute("slot", r);
  const a = t.getAttribute("label") || (t.textContent || "").trim(), o = {};
  return c.forEach((n) => o[n] = t.getAttribute(n)), { tag: t.localName, value: t.getAttribute("value") || a, label: a, slot: r, attributes: o };
}), y = (e, s) => {
  const c = Array.isArray(e) ? e : [e], t = m(), [u, r] = f([]);
  return h(() => {
    const a = t.current;
    let o = "";
    const n = () => {
      const l = A(a, c, s), b = JSON.stringify(l);
      b !== o && (o = b, r(l));
    };
    n();
    const i = new MutationObserver(n);
    return i.observe(a, {
      childList: !0,
      subtree: !0,
      characterData: !0,
      attributeFilter: ["value", "label", ...s]
    }), () => i.disconnect();
  }, []), u;
}, S = (e, s) => e.attributes[s] != null;
export {
  S as h,
  y as u
};
