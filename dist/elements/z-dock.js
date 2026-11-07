import { c as z, a as M, f as u, j as m, d as E } from "../chunks/define-element-BZUk-KLk.js";
import { s as w, c as L } from "../chunks/layout-schema-CPCZ71fv.js";
const P = z`
	:host {
		display: inline-flex;
		--dock-item-size: 3rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-floating]) {
		position: fixed;
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
	}

	.dock {
		display: flex;
		align-items: flex-end;
		gap: var(--dock-gap, 0.75rem);
		box-sizing: border-box;
		padding: 0.6rem;
		border-radius: var(--radius-xl);
		/* Mixes the flat ramp colour rather than --popover: in the light theme
		   --popover carries a haze layer in front of its colour, which is a
		   background shorthand value, not something color-mix can take. */
		background: color-mix(in oklch, var(--color-neutral-1) 85%, transparent);
		border: 1px solid var(--border);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
`, R = M(
  (o) => {
    const a = u(), i = u(), p = (s) => {
      const r = a.current;
      if (!r) return;
      const l = typeof o.magnification == "number" ? o.magnification : 1.08, y = Math.min(Math.max(l, 1), 1.12), k = typeof o.distance == "number" ? o.distance : 96, n = r.assignedElements(), x = n.map((t) => {
        const e = t.getBoundingClientRect(), f = e.left + e.width / 2, d = Math.max(0, 1 - Math.abs(s - f) / k);
        return 1 + (y - 1) * d;
      });
      n.forEach((t, e) => {
        const f = [
          e > 0 ? t.offsetLeft - (n[e - 1].offsetLeft + n[e - 1].offsetWidth) : 1 / 0,
          e < n.length - 1 ? n[e + 1].offsetLeft - (t.offsetLeft + t.offsetWidth) : 1 / 0
        ], d = Math.max(0, Math.min(...f)), v = t.offsetWidth > 0 ? 1 + d / t.offsetWidth : 1, S = Math.min(x[e], v);
        t.style.setProperty("--dock-scale", S.toFixed(3));
      });
    }, g = () => {
      const s = a.current;
      if (!s) return;
      s.assignedElements().forEach((l) => l.style.setProperty("--dock-scale", "1"));
    }, b = (s) => {
      const r = s.clientX;
      i.current || (i.current = requestAnimationFrame(() => {
        p(r), i.current = void 0;
      }));
    }, c = {};
    o.itemSize && (c["--dock-item-size"] = o.itemSize);
    const h = L(o.gap);
    return h && (c["--dock-gap"] = h), /* @__PURE__ */ m("host", { shadowDom: !0, style: c, onpointermove: b, onpointerleave: g, children: /* @__PURE__ */ m("div", { class: "dock", children: /* @__PURE__ */ m("slot", { ref: a }) }) });
  },
  {
    props: {
      magnification: Number,
      distance: Number,
      itemSize: String,
      gap: w,
      isFloating: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: P
  }
);
E("z-dock", R);
export {
  R as ZDock
};
