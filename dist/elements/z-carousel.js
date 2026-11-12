// @ts-self-types="./z-carousel.d.ts"
import { c as g, a as y, e as x, f as w, b as k, g as f, j as r, F as L, d as j } from "../chunks/define-element-BZUk-KLk.js";
import { u as b } from "../chunks/hooks-DEFT8qqt.js";
import { o as S } from "../chunks/prop-types-B3Bpi956.js";
import { u as B } from "../chunks/locale-Bb4aqXuR.js";
const E = g`
	:host {
		display: block;
		position: relative;
		width: 100%;
		min-width: 0;
		--tone: var(--accent-primary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
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
		transition: transform var(--motion-slow) var(--ease-enter);
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
		border-radius: var(--radius-full);
		background: color-mix(in oklch, var(--surface-page) 70%, transparent);
		backdrop-filter: blur(8px);
		border: 1px solid var(--border-default);
		color: var(--text-primary);
		cursor: pointer;
		transition:
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter),
			opacity var(--motion-fast) var(--ease-enter);
	}

	.btn:hover {
		border-color: var(--tone);
	}

	.btn:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
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
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		padding: 0;
		border: 0;
		border-radius: var(--radius-full);
		background: var(--border-default);
		cursor: pointer;
		transition:
			background-color var(--motion-fast) var(--ease-enter),
			width var(--motion-fast) var(--ease-enter);
	}

	.dot:hover {
		background: var(--border-strong);
	}

	.dot.is-active {
		background: var(--tone);
		width: 1.25rem;
	}

	.dot:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}
`, I = y(
  (o) => {
    const i = B(), [v, c] = b(0), [t, h] = b(0), s = w(!1), a = t > 0 ? Math.min(v, t - 1) : 0, l = (n) => {
      if (t === 0) return;
      let e = n;
      o.doesLoop ? e = (n + t) % t : e = Math.max(0, Math.min(n, t - 1)), c(e), o.change({ index: e });
    }, d = typeof o.autoplay == "number" ? o.autoplay : 0;
    k(() => {
      if (d <= 0 || t <= 1) return;
      const n = setInterval(() => {
        s.current || c((e) => {
          const u = o.doesLoop ? (e + 1) % t : e + 1 >= t ? 0 : e + 1;
          return o.change({ index: u }), u;
        });
      }, d);
      return () => clearInterval(n);
    }, [d, t, o.doesLoop]);
    const m = !o.doesLoop && a === 0, p = !o.doesLoop && a >= t - 1;
    return /* @__PURE__ */ f(
      "host",
      {
        shadowDom: !0,
        onpointerenter: () => s.current = !0,
        onpointerleave: () => s.current = !1,
        onfocusin: () => s.current = !0,
        onfocusout: () => s.current = !1,
        children: [
          /* @__PURE__ */ r("div", { class: "viewport", children: /* @__PURE__ */ r("div", { class: "track", style: { transform: `translateX(-${a * 100}%)` }, children: /* @__PURE__ */ r("slot", { onslotchange: (n) => h(n.target.assignedElements().length) }) }) }),
          t > 1 && /* @__PURE__ */ f(L, { children: [
            /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: "btn prev",
                "aria-label": i("previousSlide"),
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
                "aria-label": i("nextSlide"),
                disabled: p,
                onclick: () => l(a + 1),
                children: /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "9 18 15 12 9 6" }) })
              }
            ),
            /* @__PURE__ */ r("div", { class: "dots", children: Array.from({ length: t }).map((n, e) => /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                class: e === a ? "dot is-active" : "dot",
                "aria-label": i("goToSlide", { index: e + 1 }),
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
      change: x({ bubbles: !0, composed: !0 })
    },
    styles: E
  }
);
j("z-carousel", I);
export {
  I as ZCarousel
};
