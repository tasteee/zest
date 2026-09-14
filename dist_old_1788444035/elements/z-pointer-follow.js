import { c as f, a as m, u as v, b as h, g as l, j as i, d as x } from "../chunks/define-element-BWC3wEPr.js";
import { u as d } from "../chunks/hooks-D9_x-ckD.js";
const y = f`
	:host {
		display: inline-block;
		position: relative;
		--tone: var(--purple);
	}

	:host([accent='sub']) {
		--tone: var(--pink);
	}
	:host([accent='neutral']) {
		--tone: var(--color-neutral-6);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host(:not([is-fixed])) {
		cursor: none;
	}

	:host([is-fixed]) {
		display: block;
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 9999;
	}

	.pointer {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		pointer-events: none;
		opacity: 0;
		will-change: transform;
		transition: opacity 0.15s ease;
	}

	.pointer.is-visible {
		opacity: 1;
	}

	.dot {
		width: 0.85rem;
		height: 0.85rem;
		border-radius: 999px;
		background: var(--tone);
		box-shadow: 0 0 0 3px color-mix(in oklch, var(--tone) 25%, transparent);
	}

	.tag {
		font-family: var(--font-sans);
		font-size: var(--font-size-caption);
		font-weight: 600;
		color: var(--primary-foreground);
		background: var(--tone);
		padding: 0.15rem 0.5rem;
		border-radius: var(--radius-sm);
		white-space: nowrap;
		transform: translateY(-0.1rem);
	}

	@media (prefers-reduced-motion: reduce) {
		.pointer {
			transition: none;
		}
	}
`, b = m(
  (e) => {
    const c = v(), [s, r] = d({ x: 0, y: 0 }), [p, o] = d(!1);
    h(() => {
      if (!e.isFixed) return;
      const t = (a) => {
        r({ x: a.clientX, y: a.clientY }), o(!0);
      };
      window.addEventListener("pointermove", t);
      const n = document.body.style.cursor;
      return document.body.style.cursor = "none", () => {
        window.removeEventListener("pointermove", t), document.body.style.cursor = n, o(!1);
      };
    }, [e.isFixed]);
    const u = (t) => {
      const n = c.current.getBoundingClientRect();
      r({ x: t.clientX - n.left, y: t.clientY - n.top }), o(!0);
    };
    return /* @__PURE__ */ l(
      "host",
      {
        shadowDom: !0,
        onpointermove: e.isFixed ? void 0 : u,
        onpointerleave: e.isFixed ? void 0 : () => o(!1),
        children: [
          !e.isFixed && /* @__PURE__ */ i("slot", {}),
          /* @__PURE__ */ l("div", { class: p ? "pointer is-visible" : "pointer", style: { transform: `translate(${s.x}px, ${s.y}px)` }, children: [
            /* @__PURE__ */ i("span", { class: "dot", "aria-hidden": "true" }),
            e.label && /* @__PURE__ */ i("span", { class: "tag", children: e.label })
          ] })
        ]
      }
    );
  },
  {
    props: {
      label: String,
      accent: { type: String, reflect: !0 },
      isFixed: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: y
  }
);
x("z-pointer-follow", b);
export {
  b as ZPointerFollow
};
