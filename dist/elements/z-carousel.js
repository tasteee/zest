import { c as g, a as x, e as y, f as w, b as k, g as f, j as r, F as L, d as j } from "../chunks/define-element-BZUk-KLk.js";
import { u as b } from "../chunks/hooks-DEFT8qqt.js";
import { o as S } from "../chunks/prop-types-B3Bpi956.js";
import { u as z } from "../chunks/locale-DUDaH1Ni.js";
const B = g`
	:host {
		display: block;
		position: relative;
		width: 100%;
		min-width: 0;
		--accent: var(--color-neutral-8);
	}

	:host([tone='tertiary']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.viewport {
		overflow: hidden;
		border-radius: var(--radius-lg);
		width: 100%;
		min-width: 0;
	}

	.track {
		display: flex;
		width: 100%;
		min-width: 0;
		transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	::slotted(*) {
		flex: 0 0 100%;
		width: 100%;
		max-width: 100%;
		min-width: 0;
		box-sizing: border-box;
	}

	.btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 999px;
		background: color-mix(in oklch, var(--background) 70%, transparent);
		backdrop-filter: blur(8px);
		border: 1px solid var(--border);
		color: var(--foreground);
		cursor: pointer;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter),
			opacity var(--motion-fast) var(--ease-enter);
	}

	.btn:hover {
		border-color: var(--accent);
	}

	.btn:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}

	.btn:disabled {
		opacity: 0.35;
		cursor: default;
		pointer-events: none;
	}

	.btn.prev {
		left: 0.75rem;
	}
	.btn.next {
		right: 0.75rem;
	}

	.btn svg {
		width: 1.125rem;
		height: 1.125rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: var(--color-neutral-3);
		cursor: pointer;
		transition:
			background-color var(--motion-fast) var(--ease-enter),
			width var(--motion-fast) var(--ease-enter);
	}

	.dot:hover {
		background: var(--color-neutral-4);
	}

	.dot.is-active {
		background: var(--accent);
		width: 1.25rem;
	}

	.dot:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}
`, E = x(
  (o) => {
    const s = z(), [h, d] = b(0), [t, p] = b(0), i = w(!1), a = t > 0 ? Math.min(h, t - 1) : 0, l = (n) => {
      if (t === 0) return;
      let e = n;
      o.doesLoop ? e = (n + t) % t : e = Math.max(0, Math.min(n, t - 1)), d(e), o.change({ index: e });
    }, c = typeof o.autoplay == "number" ? o.autoplay : 0;
    k(() => {
      if (c <= 0 || t <= 1) return;
      const n = setInterval(() => {
        i.current || d((e) => {
          const u = o.doesLoop ? (e + 1) % t : e + 1 >= t ? 0 : e + 1;
          return o.change({ index: u }), u;
        });
      }, c);
      return () => clearInterval(n);
    }, [c, t, o.doesLoop]);
    const m = !o.doesLoop && a === 0, v = !o.doesLoop && a >= t - 1;
    return /* @__PURE__ */ f(
      "host",
      {
        shadowDom: !0,
        onpointerenter: () => i.current = !0,
        onpointerleave: () => i.current = !1,
        onfocusin: () => i.current = !0,
        onfocusout: () => i.current = !1,
        children: [
          /* @__PURE__ */ r("div", { class: "viewport", children: /* @__PURE__ */ r("div", { class: "track", style: { transform: `translateX(-${a * 100}%)` }, children: /* @__PURE__ */ r("slot", { onslotchange: (n) => p(n.target.assignedElements().length) }) }) }),
          t > 1 && /* @__PURE__ */ f(L, { children: [
            /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: "btn prev",
                "aria-label": s("previousSlide"),
                disabled: m,
                onclick: () => l(a - 1),
                children: /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "15 18 9 12 15 6" }) })
              }
            ),
            /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: "btn next",
                "aria-label": s("nextSlide"),
                disabled: v,
                onclick: () => l(a + 1),
                children: /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "9 18 15 12 9 6" }) })
              }
            ),
            /* @__PURE__ */ r("div", { class: "dots", children: Array.from({ length: t }).map((n, e) => /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: e === a ? "dot is-active" : "dot",
                "aria-label": s("goToSlide", { index: e + 1 }),
                "aria-current": e === a ? "true" : "false",
                onclick: () => l(e)
              },
              e
            )) })
          ] })
        ]
      }
    );
  },
  {
    props: {
      autoplay: { type: Number },
      doesLoop: { type: Boolean, reflect: !0 },
      tone: { type: S("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: y({ bubbles: !0, composed: !0 })
    },
    styles: B
  }
);
j("z-carousel", E);
export {
  E as ZCarousel
};
