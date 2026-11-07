import { c as m, a as f, u as y, b as v, g as l, j as r, d as h } from "../chunks/define-element-BZUk-KLk.js";
import { u as d } from "../chunks/hooks-DEFT8qqt.js";
import { o as x } from "../chunks/prop-types-B3Bpi956.js";
const b = m`
	:host {
		display: inline-block;
		position: relative;
		--tone: var(--color-neutral-6);
	}

	:host([tone='secondary']) {
		--tone: var(--purple);
	}

	:host([tone='tertiary']) {
		--tone: var(--pink);
	}
	:host([tone='primary']) {
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
		transition: opacity var(--motion-fast) var(--ease-enter);
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
`, g = f(
  (e) => {
    const c = y(), [i, s] = d({ x: 0, y: 0 }), [p, t] = d(!1);
    v(() => {
      if (!e.isFixed) return;
      const o = (a) => {
        s({ x: a.clientX, y: a.clientY }), t(!0);
      };
      window.addEventListener("pointermove", o);
      const n = document.body.style.cursor;
      return document.body.style.cursor = "none", () => {
        window.removeEventListener("pointermove", o), document.body.style.cursor = n, t(!1);
      };
    }, [e.isFixed]);
    const u = (o) => {
      const n = c.current.getBoundingClientRect();
      s({ x: o.clientX - n.left, y: o.clientY - n.top }), t(!0);
    };
    return /* @__PURE__ */ l(
      "host",
      {
        shadowDom: !0,
        onpointermove: e.isFixed ? void 0 : u,
        onpointerleave: e.isFixed ? void 0 : () => t(!1),
        children: [
          !e.isFixed && /* @__PURE__ */ r("slot", {}),
          /* @__PURE__ */ l("div", { class: p ? "pointer is-visible" : "pointer", style: { transform: `translate(${i.x}px, ${i.y}px)` }, children: [
            /* @__PURE__ */ r("span", { class: "dot", "aria-hidden": "true" }),
            e.label && /* @__PURE__ */ r("span", { class: "tag", children: e.label })
          ] })
        ]
      }
    );
  },
  {
    props: {
      label: String,
      tone: { type: x("primary", "secondary", "tertiary"), reflect: !0 },
      isFixed: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: b
  }
);
h("z-pointer-follow", g);
export {
  g as ZPointerFollow
};
