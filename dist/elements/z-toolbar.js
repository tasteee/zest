import { c as g, a as p, u as b, b as y, g as x, j as a, d as z } from "../chunks/define-element-BZUk-KLk.js";
import { t as E } from "../chunks/scrollbar-styles-Csqxxw2V.js";
import { o as v } from "../chunks/prop-types-B3Bpi956.js";
const k = g`
	:host {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		min-width: 0;
	}
	:host([direction='vertical']) {
		flex-direction: column;
		align-items: stretch;
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
`, L = 'z-button, z-toggle-button, z-toggle-button-group-item, z-tool-button, [role="button"], button, a[href]', A = p(
  (n) => {
    const h = b();
    return y(() => {
      const r = h.current, l = () => [...r.querySelectorAll(L)], i = (e = 0) => l().forEach((t, o) => t.tabIndex = o === e ? 0 : -1), c = (e) => {
        const t = l();
        if (!t.length) return;
        const o = t.indexOf(e.target);
        if (o < 0) return;
        const u = n.direction === "vertical", m = u ? "ArrowDown" : "ArrowRight", w = u ? "ArrowUp" : "ArrowLeft";
        let s = o;
        if (e.key === m) s = (o + 1) % t.length;
        else if (e.key === w) s = (o - 1 + t.length) % t.length;
        else if (e.key === "Home") s = 0;
        else if (e.key === "End") s = t.length - 1;
        else return;
        e.preventDefault(), i(s), t[s].focus();
      }, f = (e) => {
        const o = l().indexOf(e.target);
        o >= 0 && i(o);
      };
      i(), r.addEventListener("keydown", c), r.addEventListener("focusin", f);
      const d = new MutationObserver(() => i());
      return d.observe(r, { childList: !0, subtree: !0 }), () => {
        r.removeEventListener("keydown", c), r.removeEventListener("focusin", f), d.disconnect();
      };
    }, [n.direction, n.overflow]), /* @__PURE__ */ x(
      "host",
      {
        shadowDom: !0,
        role: "toolbar",
        "aria-orientation": n.direction === "vertical" ? "vertical" : "horizontal",
        children: [
          /* @__PURE__ */ a("slot", {}),
          /* @__PURE__ */ a("div", { class: "overflow", children: /* @__PURE__ */ a("slot", { name: "overflow" }) })
        ]
      }
    );
  },
  {
    props: {
      size: { type: v("sm", "md", "lg"), reflect: !0 },
      direction: { type: v("horizontal", "vertical"), reflect: !0 },
      overflow: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: [E, k]
  }
);
z("z-toolbar", A);
export {
  A as ZToolbar
};
