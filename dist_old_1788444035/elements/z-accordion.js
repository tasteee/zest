import { c, a, u as p, b as u, j as l, d as f } from "../chunks/define-element-BWC3wEPr.js";
const g = c`
	:host {
		display: block;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: 0 var(--space-lg);
	}

	:host([is-hidden]) {
		display: none;
	}

	::slotted(z-collapsible:not(:first-child)) {
		border-top: 1px solid var(--border);
	}
`, b = a(
  (o) => {
    const i = p();
    return u(() => {
      const e = i.current, s = (r) => {
        const t = r.detail;
        if (o.type === "multiple" || !(t != null && t.open)) return;
        const d = r.target;
        e.querySelectorAll("z-collapsible").forEach((n) => {
          n !== d && (n.isOpen = !1);
        });
      };
      return e.addEventListener("toggle", s), () => e.removeEventListener("toggle", s);
    }, [o.type]), /* @__PURE__ */ l("host", { shadowDom: !0, children: /* @__PURE__ */ l("slot", {}) });
  },
  {
    props: {
      type: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: g
  }
);
f("z-accordion", b);
export {
  b as ZAccordion
};
