import { c as b, u as p, b as f, g, j as c, F as y } from "./define-element-BZUk-KLk.js";
const d = "z-description", u = "z-error", h = b`
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
`, m = (e, t) => {
  const r = e.getAttribute("aria-labelledby");
  if (r) {
    const s = e.getRootNode(), i = r.split(/\s+/).map((o) => {
      var a, l;
      return (l = (a = s.getElementById(o)) == null ? void 0 : a.textContent) == null ? void 0 : l.trim();
    }).filter(Boolean).join(" ");
    if (i) return i;
  }
  if (e.getAttribute("aria-label")) return e.getAttribute("aria-label") || void 0;
  if (t) return t;
  const n = e.labels;
  if (n && n.length) {
    const s = [...n].map((i) => {
      var o;
      return (o = i.textContent) == null ? void 0 : o.trim();
    }).filter(Boolean).join(" ");
    if (s) return s;
  }
}, v = ["aria-label", "aria-labelledby"], A = (e) => {
  const t = p();
  return f(() => {
    const r = t.current;
    if (typeof MutationObserver > "u") return;
    const n = new MutationObserver(() => {
      var s;
      (s = r.update) == null || s.call(r);
    });
    return n.observe(r, { attributes: !0, attributeFilter: v }), () => n.disconnect();
  }, []), m(t.current, e);
}, B = (e, t) => {
  const r = [e ? d : "", t ? u : ""].filter(Boolean);
  return r.length ? r.join(" ") : void 0;
}, j = (e, t) => /* @__PURE__ */ g(y, { children: [
  e && /* @__PURE__ */ c("span", { id: d, class: "sr-only", children: e }),
  t && /* @__PURE__ */ c("span", { id: u, class: "sr-only", children: t })
] }), E = {
  description: String,
  error: String
};
export {
  B as a,
  E as d,
  j as r,
  h as s,
  A as u
};
