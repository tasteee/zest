// @ts-self-types="./z-pointer-follow.d.ts"
import { c as f, a as v, u as y, b as m, g as d, j as r, d as h } from "../chunks/define-element-BZUk-KLk.js";
import { u as l } from "../chunks/hooks-DEFT8qqt.js";
import { o as x } from "../chunks/prop-types-B3Bpi956.js";
const b = f`
	:host {
		display: inline-block;
		position: relative;
		--tone: var(--text-secondary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}
	:host([tone='primary']) {
		--tone: var(--text-secondary);
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
		z-index: var(--z-toast);
	}

	.pointer {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		gap: var(--space-1-5);
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
		border-radius: var(--radius-full);
		background: var(--tone);
		box-shadow: 0 0 0 3px color-mix(in oklch, var(--tone) 25%, transparent);
	}

	.tag {
		font-family: var(--font-sans);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--on-accent);
		background: var(--tone);
		padding: var(--space-0-5) var(--space-2);
		border-radius: var(--radius-sm);
		white-space: nowrap;
		transform: translateY(-0.1rem);
	}

	@media (prefers-reduced-motion: reduce) {
		.pointer {
			transition: none;
		}
	}
`, g = v(
  (e) => {
    const c = y(), [s, i] = l({ x: 0, y: 0 }), [p, o] = l(!1);
    m(() => {
      if (!e.isFixed) return;
      const t = (a) => {
        i({ x: a.clientX, y: a.clientY }), o(!0);
      };
      window.addEventListener("pointermove", t);
      const n = document.body.style.cursor;
      return document.body.style.cursor = "none", () => {
        window.removeEventListener("pointermove", t), document.body.style.cursor = n, o(!1);
      };
    }, [e.isFixed]);
    const u = (t) => {
      const n = c.current.getBoundingClientRect();
      i({ x: t.clientX - n.left, y: t.clientY - n.top }), o(!0);
    };
    return /* @__PURE__ */ d(
      "host",
      {
        shadowDom: !0,
        onpointermove: e.isFixed ? void 0 : u,
        onpointerleave: e.isFixed ? void 0 : () => o(!1),
        children: [
          !e.isFixed && /* @__PURE__ */ r("slot", {}),
          /* @__PURE__ */ d("div", { class: p ? "pointer is-visible" : "pointer", style: { transform: `translate(${s.x}px, ${s.y}px)` }, children: [
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
