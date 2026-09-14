import { c as p, a as g, u as w, b as m, g as b, j as i, d as y } from "../chunks/define-element-BWC3wEPr.js";
import { t as x } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const z = p`
	:host {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		min-width: 0;
	}
	:host([size='sm']) {
		gap: var(--space-xs);
	}
	:host([size='lg']) {
		gap: var(--space-md);
	}
	:host([overflow='scroll']) {
		overflow: auto;
		scrollbar-width: none;
	}
	:host([overflow='scroll'])::-webkit-scrollbar {
		display: none;
	}
	:host([overflow='wrap']) {
		flex-wrap: wrap;
	}
	:host([is-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}
	.overflow {
		margin-inline-start: auto;
	}
`, E = 'z-button, z-toggle, z-toggle-group-item, z-tool-button, [role="button"], button, a[href]', k = g(
  (u) => {
    const d = w();
    return m(() => {
      const s = d.current, l = () => [...s.querySelectorAll(E)], n = (e = 0) => l().forEach((t, o) => t.tabIndex = o === e ? 0 : -1), a = (e) => {
        const t = l();
        if (!t.length) return;
        const o = t.indexOf(e.target);
        if (o < 0) return;
        const h = "ArrowRight", v = "ArrowLeft";
        let r = o;
        if (e.key === h) r = (o + 1) % t.length;
        else if (e.key === v) r = (o - 1 + t.length) % t.length;
        else if (e.key === "Home") r = 0;
        else if (e.key === "End") r = t.length - 1;
        else return;
        e.preventDefault(), n(r), t[r].focus();
      }, c = (e) => {
        const o = l().indexOf(e.target);
        o >= 0 && n(o);
      };
      n(), s.addEventListener("keydown", a), s.addEventListener("focusin", c);
      const f = new MutationObserver(() => n());
      return f.observe(s, { childList: !0, subtree: !0 }), () => {
        s.removeEventListener("keydown", a), s.removeEventListener("focusin", c), f.disconnect();
      };
    }, [u.overflow]), /* @__PURE__ */ b(
      "host",
      {
        shadowDom: !0,
        role: "toolbar",
        "aria-orientation": "horizontal",
        children: [
          /* @__PURE__ */ i("slot", {}),
          /* @__PURE__ */ i("div", { class: "overflow", children: /* @__PURE__ */ i("slot", { name: "overflow" }) })
        ]
      }
    );
  },
  {
    props: {
      size: { type: String, reflect: !0 },
      overflow: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: [x, z]
  }
);
y("z-toolbar", k);
export {
  k as ZToolbar
};
