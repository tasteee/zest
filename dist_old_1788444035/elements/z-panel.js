import { c as a, a as p, u, b as d, j as c, d as f } from "../chunks/define-element-BWC3wEPr.js";
const h = a`
	:host {
		display: block;
		position: relative;
		min-width: 0;
		min-height: 0;
	}
	:host([is-collapsed]) {
		overflow: hidden;
	}
`, g = p(
  (y) => {
    const n = u();
    return d(() => {
      const r = n.current, s = () => n.current.parentElement, o = () => {
        var e, t;
        return ((t = (e = s()) == null ? void 0 : e.__panelIndex) == null ? void 0 : t.call(e, n.current)) ?? -1;
      };
      r.collapse = () => {
        var e, t;
        return (t = (e = s()) == null ? void 0 : e.__collapsePanel) == null ? void 0 : t.call(e, o());
      }, r.expand = () => {
        var e, t;
        return (t = (e = s()) == null ? void 0 : e.__expandPanel) == null ? void 0 : t.call(e, o());
      }, r.resize = (e) => {
        const t = s();
        if (!t) return;
        const l = o(), i = t.getLayout()[l] ?? 0;
        t.__resizeAt(l, (e - i) / 100 * t.__extent());
      }, r.getSize = () => {
        const e = s();
        return e ? e.getLayout()[o()] ?? 0 : 0;
      }, r.isCollapsed = () => n.current.hasAttribute("is-collapsed");
    }, []), /* @__PURE__ */ c("host", { shadowDom: !0, children: /* @__PURE__ */ c("slot", {}) });
  },
  {
    props: {
      defaultSize: { type: String, reflect: !0 },
      minSize: { type: String, reflect: !0 },
      maxSize: { type: String, reflect: !0 },
      isCollapsible: { type: Boolean, reflect: !0 },
      collapsedSize: { type: String, reflect: !0 },
      collapseThreshold: { type: String, reflect: !0 },
      order: { type: Number, reflect: !0 }
    },
    styles: h
  }
);
f("z-panel", g);
export {
  g as ZPanel
};
