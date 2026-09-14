import { c as v, a as g, e as x, f as y, b as k, g as u, j as r, F as w, d as j } from "../chunks/define-element-BWC3wEPr.js";
import { u as b } from "../chunks/hooks-D9_x-ckD.js";
const L = v`
	:host {
		display: block;
		position: relative;
		width: 100%;
		min-width: 0;
		--accent: var(--color-neutral-8);
	}

	:host([accent='sub']) {
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
			border-color 0.12s ease,
			background-color 0.12s ease,
			opacity 0.12s ease;
	}

	.btn:hover {
		border-color: var(--accent);
	}

	.btn:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
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
			background-color 0.15s ease,
			width 0.15s ease;
	}

	.dot:hover {
		background: var(--color-neutral-4);
	}

	.dot.is-active {
		background: var(--accent);
		width: 1.25rem;
	}

	.dot:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}
`, z = g(
  (o) => {
    const [h, c] = b(0), [t, p] = b(0), s = y(!1), a = t > 0 ? Math.min(h, t - 1) : 0, i = (n) => {
      if (t === 0) return;
      let e = n;
      o.doesLoop ? e = (n + t) % t : e = Math.max(0, Math.min(n, t - 1)), c(e), o.change({ index: e });
    }, l = typeof o.autoplay == "number" ? o.autoplay : 0;
    k(() => {
      if (l <= 0 || t <= 1) return;
      const n = setInterval(() => {
        s.current || c((e) => {
          const d = o.doesLoop ? (e + 1) % t : e + 1 >= t ? 0 : e + 1;
          return o.change({ index: d }), d;
        });
      }, l);
      return () => clearInterval(n);
    }, [l, t, o.doesLoop]);
    const f = !o.doesLoop && a === 0, m = !o.doesLoop && a >= t - 1;
    return /* @__PURE__ */ u(
      "host",
      {
        shadowDom: !0,
        onpointerenter: () => s.current = !0,
        onpointerleave: () => s.current = !1,
        onfocusin: () => s.current = !0,
        onfocusout: () => s.current = !1,
        children: [
          /* @__PURE__ */ r("div", { class: "viewport", children: /* @__PURE__ */ r("div", { class: "track", style: { transform: `translateX(-${a * 100}%)` }, children: /* @__PURE__ */ r("slot", { onslotchange: (n) => p(n.target.assignedElements().length) }) }) }),
          t > 1 && /* @__PURE__ */ u(w, { children: [
            /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: "btn prev",
                "aria-label": "Previous slide",
                disabled: f,
                onclick: () => i(a - 1),
                children: /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "15 18 9 12 15 6" }) })
              }
            ),
            /* @__PURE__ */ r("button", { type: "button", class: "btn next", "aria-label": "Next slide", disabled: m, onclick: () => i(a + 1), children: /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "9 18 15 12 9 6" }) }) }),
            /* @__PURE__ */ r("div", { class: "dots", children: Array.from({ length: t }).map((n, e) => /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: e === a ? "dot is-active" : "dot",
                "aria-label": `Go to slide ${e + 1}`,
                "aria-current": e === a ? "true" : "false",
                onclick: () => i(e)
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
      accent: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: x({ bubbles: !0, composed: !0 })
    },
    styles: L
  }
);
j("z-carousel", z);
export {
  z as ZCarousel
};
