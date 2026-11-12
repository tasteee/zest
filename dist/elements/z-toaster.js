// @ts-self-types="./z-toaster.d.ts"
import { c as w, a as k, u as T, b as z, j as r, g as h, d as E } from "../chunks/define-element-BZUk-KLk.js";
import { u as D } from "../chunks/locale-Bb4aqXuR.js";
import { u as S } from "../chunks/hooks-DEFT8qqt.js";
import { o as j } from "../chunks/prop-types-B3Bpi956.js";
const A = 4e3, L = 200, y = (e) => e > 0 && Number.isFinite(e);
let a = [], M = 0, u = !1;
const v = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), c = [], l = () => g.forEach((e) => e()), O = (e, t) => {
  const i = { remaining: t, startedAt: Date.now() };
  u || (i.handle = setTimeout(() => d(e), t)), v.set(e, i);
}, b = (e) => {
  var t;
  clearTimeout((t = v.get(e)) == null ? void 0 : t.handle), v.delete(e);
}, $ = () => {
  typeof document > "u" || c.length || document.querySelector("z-toaster") || document.body.append(document.createElement("z-toaster"));
}, I = (e) => {
  const t = typeof e == "string" ? { id: e, title: e } : e, i = t.id ?? `toast-${++M}`, n = t.duration === 0 ? 1 / 0 : t.duration ?? A, s = a.find((o) => o.id === i);
  clearTimeout(f.get(i)), f.delete(i), b(i);
  const p = {
    id: i,
    title: t.title,
    description: t.description,
    tone: t.tone ?? "neutral",
    duration: n,
    version: ((s == null ? void 0 : s.version) ?? 0) + 1,
    state: "open"
  };
  return a = s ? a.map((o) => o.id === i ? p : o) : [...a, p], y(n) && O(i, n), $(), l(), Object.assign(() => d(i), { id: i });
}, d = (e) => {
  const t = typeof e == "string" ? e : e.id, i = a.find((n) => n.id === t);
  !i || i.state === "closing" || (b(t), a = a.map((n) => n.id === t ? { ...n, state: "closing" } : n), l(), f.set(
    t,
    setTimeout(() => {
      f.delete(t), a = a.filter((n) => n.id !== t), l();
    }, L)
  ));
}, N = () => {
  a.forEach((e) => d(e.id));
}, x = (e) => {
  e !== u && (u = e, v.forEach((t, i) => {
    e ? (clearTimeout(t.handle), t.remaining = Math.max(0, t.remaining - (Date.now() - t.startedAt))) : (t.startedAt = Date.now(), t.handle = setTimeout(() => d(i), t.remaining));
  }), l());
};
typeof document < "u" && document.addEventListener("visibilitychange", () => x(document.visibilityState === "hidden"));
const _ = {
  show: I,
  hide: d,
  clear: N,
  /** current toasts, oldest first (read-only snapshot) */
  get toasts() {
    return a;
  }
}, P = w`
	:host {
		position: fixed;
		z-index: var(--z-toast);
		display: flex;
		flex-direction: column;
		width: min(22rem, calc(100vw - 2rem));
		pointer-events: none;
	}

	:host(:not([position])),
	:host([position='bottom-end']) {
		bottom: 1.25rem;
		inset-inline-end: 1.25rem;
	}
	:host([position='bottom-start']) {
		bottom: 1.25rem;
		inset-inline-start: 1.25rem;
	}
	:host([position='bottom-center']) {
		bottom: 1.25rem;
		left: 50%; /* physical: centred either way */
		transform: translateX(-50%);
	}
	:host([position='top-end']) {
		top: 1.25rem;
		inset-inline-end: 1.25rem;
	}
	:host([position='top-start']) {
		top: 1.25rem;
		inset-inline-start: 1.25rem;
	}
	:host([position='top-center']) {
		top: 1.25rem;
		left: 50%; /* physical: centred either way */
		transform: translateX(-50%);
	}

	/* Each toast sits in a collapsible row: on exit the row's height folds to
	   zero (grid 1fr → 0fr) while the toast fades and shrinks, so the rest of
	   the stack glides into place instead of jumping. */
	.item {
		display: grid;
		grid-template-rows: 1fr;
		padding-top: var(--space-2-5);
		transition:
			grid-template-rows var(--motion-exit-base) var(--ease-move),
			padding var(--motion-exit-base) var(--ease-move);
	}

	:host([position^='top']) .item {
		padding-top: 0;
		padding-bottom: var(--space-2-5);
	}

	.item.is-closing {
		overflow: hidden;
		grid-template-rows: 0fr;
		padding-top: 0;
		padding-bottom: 0;
		transition-delay: 60ms;
	}

	.toast {
		--travel: calc(var(--motion-distance-md) * var(--motion-travel));
		min-height: 0;
		pointer-events: auto;
		display: flex;
		align-items: flex-start;
		gap: var(--space-2-5);
		box-sizing: border-box;
		padding: var(--space-3) var(--space-3) var(--space-3) var(--space-3-5);
		color: var(--text-primary);
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-inline-start: 2px solid var(--toast-accent, var(--border-default));
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		overflow: hidden;
		animation: toast-in var(--motion-base) var(--ease-enter);
		transition:
			opacity var(--motion-exit-base) var(--ease-exit),
			scale var(--motion-exit-base) var(--ease-exit);
	}

	:host([position^='top']) .toast {
		--travel: calc(var(--motion-distance-md) * -1 * var(--motion-travel));
	}

	.is-closing .toast {
		opacity: 0;
		scale: var(--motion-scale-from);
	}

	/* a toned toast washes a faint tint of its tone in from the accent edge.
	   Mixed in oklab, not oklch: oklch interpolates hue, so a purple or red
	   blended toward the greenish neutral surface would drift to teal or olive. */
	.toast:not(.is-primary) {
		background: linear-gradient(
			100deg,
			color-mix(in oklab, var(--toast-accent) 16%, var(--surface-overlay)) 0%,
			color-mix(in oklab, var(--toast-accent) 6%, var(--surface-overlay)) 45%,
			var(--surface-overlay) 85%
		);
	}

	.toast.is-info {
		--toast-accent: var(--accent-secondary);
	}
	.toast.is-success {
		--toast-accent: var(--status-success);
	}
	.toast.is-warning {
		--toast-accent: var(--status-warning);
	}
	.toast.is-danger {
		--toast-accent: var(--status-danger);
	}

	@keyframes toast-in {
		from {
			opacity: 0;
			translate: 0 var(--travel);
			scale: var(--motion-scale-from);
		}
	}

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
		padding-top: var(--space-1);
	}

	.title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
		line-height: var(--line-height-snug);
	}

	.description {
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
		line-height: var(--line-height-normal);
	}

	/* close button, ringed by the remaining-time indicator on timed toasts */
	.close {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		flex-shrink: 0;
		padding: 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-full);
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.close:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
	}

	.close:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.close .x {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}

	.ring {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		rotate: -90deg;
		fill: none;
		pointer-events: none;
	}

	.ring circle {
		stroke-width: 1.5;
	}

	.ring .track {
		stroke: color-mix(in oklch, var(--text-primary) 8%, transparent);
	}

	/* pathLength=100: the arc drains from full to nothing over the duration */
	.ring .remaining {
		stroke: color-mix(in oklch, var(--toast-accent, var(--text-secondary)) 85%, transparent);
		stroke-dasharray: 100;
		stroke-linecap: round;
		animation: toast-countdown linear forwards;
	}

	:host([data-paused]) .ring .remaining {
		animation-play-state: paused;
	}

	@keyframes toast-countdown {
		to {
			stroke-dashoffset: 100;
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
`, X = k(
  () => {
    const e = D(), t = T(), [i, n] = S({ toasts: [], isPaused: u });
    z(() => {
      const o = t.current, m = () => n({ toasts: c[c.length - 1] === o ? a : [], isPaused: u });
      return c.push(o), g.add(m), l(), () => {
        c.splice(c.indexOf(o), 1), g.delete(m), l();
      };
    }, []);
    const s = () => x(!0), p = (o) => {
      const m = o.relatedTarget;
      m && o.currentTarget.contains(m) || x(document.visibilityState === "hidden");
    };
    return /* @__PURE__ */ r(
      "host",
      {
        shadowDom: !0,
        role: "region",
        "aria-label": e("notifications"),
        "data-paused": i.isPaused ? "" : null,
        onpointerenter: s,
        onpointerleave: p,
        onfocusin: s,
        onfocusout: p,
        children: i.toasts.map((o) => /* @__PURE__ */ r("div", { class: o.state === "closing" ? "item is-closing" : "item", children: /* @__PURE__ */ h(
          "div",
          {
            class: `toast is-${o.tone}`,
            role: o.tone === "danger" ? "alert" : "status",
            "aria-live": o.tone === "danger" ? "assertive" : "polite",
            children: [
              /* @__PURE__ */ h("div", { class: "content", children: [
                o.title && /* @__PURE__ */ r("span", { class: "title", children: o.title }),
                o.description && /* @__PURE__ */ r("span", { class: "description", children: o.description })
              ] }),
              /* @__PURE__ */ h("button", { type: "button", class: "close", "aria-label": e("dismissNotification"), onclick: () => d(o.id), children: [
                y(o.duration) && [
                  // keyed by version so an update in place restarts the countdown
                  /* @__PURE__ */ h("svg", { class: "ring", viewBox: "0 0 28 28", "aria-hidden": "true", children: [
                    /* @__PURE__ */ r("circle", { class: "track", cx: "14", cy: "14", r: "13" }),
                    /* @__PURE__ */ r(
                      "circle",
                      {
                        class: "remaining",
                        cx: "14",
                        cy: "14",
                        r: "13",
                        pathLength: "100",
                        style: { animationDuration: `${o.duration}ms` }
                      }
                    )
                  ] }, `ring-${o.version}`)
                ],
                /* @__PURE__ */ h("svg", { class: "x", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
                  /* @__PURE__ */ r("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
                  /* @__PURE__ */ r("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
                ] })
              ] })
            ]
          }
        ) }, o.id))
      }
    );
  },
  {
    props: {
      position: { type: j("top-start", "top-center", "top-end", "bottom-start", "bottom-center", "bottom-end"), reflect: !0 }
    },
    styles: P
  }
);
E("z-toaster", X);
export {
  X as ZToaster,
  _ as toaster
};
