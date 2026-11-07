import { c, a as d, u as p, b as u, j as i, d as f } from "../chunks/define-element-BZUk-KLk.js";
import { i as m } from "../chunks/interaction-styles-XiKFAbWA.js";
import { o as g } from "../chunks/prop-types-B3Bpi956.js";
const y = c`
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
`, b = d(
  (s) => {
    const a = p();
    return u(() => {
      const e = a.current, r = (l) => {
        const t = l.detail;
        if (s.type === "multiple" || !(t != null && t.open)) return;
        const o = l.target;
        if (o.parentElement !== e || o.localName !== "z-collapsible") return;
        e.querySelectorAll(":scope > z-collapsible").forEach((n) => {
          n !== o && (n.isOpen = !1);
        });
      };
      return e.addEventListener("toggle", r), () => e.removeEventListener("toggle", r);
    }, [s.type]), /* @__PURE__ */ i("host", { shadowDom: !0, children: /* @__PURE__ */ i("slot", {}) });
  },
  {
    props: {
      type: { type: g("single", "multiple"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [y, m]
  }
);
f("z-accordion", b);
export {
  b as ZAccordion
};
