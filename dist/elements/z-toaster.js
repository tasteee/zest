import { c as w, a as k, u as T, b as z, j as s, g as h, d as E } from "../chunks/define-element-BZUk-KLk.js";
import { u as D } from "../chunks/locale-DUDaH1Ni.js";
import { u as S } from "../chunks/hooks-DEFT8qqt.js";
import { o as j } from "../chunks/prop-types-B3Bpi956.js";
const A = 4e3, L = 200, x = (e) => e > 0 && Number.isFinite(e);
let r = [], M = 0, u = !1;
const f = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Set(), c = [], d = () => v.forEach((e) => e()), O = (e, t) => {
  const n = { remaining: t, startedAt: Date.now() };
  u || (n.handle = setTimeout(() => l(e), t)), f.set(e, n);
}, y = (e) => {
  var t;
  clearTimeout((t = f.get(e)) == null ? void 0 : t.handle), f.delete(e);
}, $ = () => {
  typeof document > "u" || c.length || document.querySelector("z-toaster") || document.body.append(document.createElement("z-toaster"));
}, I = (e) => {
  const t = typeof e == "string" ? { id: e, title: e } : e, n = t.id ?? `toast-${++M}`, i = t.duration === 0 ? 1 / 0 : t.duration ?? A, a = r.find((o) => o.id === n);
  clearTimeout(g.get(n)), g.delete(n), y(n);
  const m = {
    id: n,
    title: t.title,
    description: t.description,
    tone: t.tone ?? "neutral",
    duration: i,
    version: ((a == null ? void 0 : a.version) ?? 0) + 1,
    state: "open"
  };
  return r = a ? r.map((o) => o.id === n ? m : o) : [...r, m], x(i) && O(n, i), $(), d(), Object.assign(() => l(n), { id: n });
}, l = (e) => {
  const t = typeof e == "string" ? e : e.id, n = r.find((i) => i.id === t);
  !n || n.state === "closing" || (y(t), r = r.map((i) => i.id === t ? { ...i, state: "closing" } : i), d(), g.set(
    t,
    setTimeout(() => {
      g.delete(t), r = r.filter((i) => i.id !== t), d();
    }, L)
  ));
}, N = () => {
  r.forEach((e) => l(e.id));
}, b = (e) => {
  e !== u && (u = e, f.forEach((t, n) => {
    e ? (clearTimeout(t.handle), t.remaining = Math.max(0, t.remaining - (Date.now() - t.startedAt))) : (t.startedAt = Date.now(), t.handle = setTimeout(() => l(n), t.remaining));
  }), d());
};
typeof document < "u" && document.addEventListener("visibilitychange", () => b(document.visibilityState === "hidden"));
const _ = {
  show: I,
  hide: l,
  clear: N,
  /** current toasts, oldest first (read-only snapshot) */
  get toasts() {
    return r;
  }
}, P = w`
	:host {
		position: fixed;
		z-index: 9999;
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
		padding-top: 0.625rem;
		transition:
			grid-template-rows var(--motion-exit-base) var(--ease-move),
			padding var(--motion-exit-base) var(--ease-move);
	}

	:host([position^='top']) .item {
		padding-top: 0;
		padding-bottom: 0.625rem;
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
		gap: 0.625rem;
		box-sizing: border-box;
		padding: 0.75rem 0.75rem 0.75rem 0.875rem;
		color: var(--foreground);
		background: var(--popover);
		border: 1px solid var(--border);
		border-inline-start: 2px solid var(--toast-accent, var(--border));
		border-radius: var(--radius-md);
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
			color-mix(in oklab, var(--toast-accent) 16%, var(--popover)) 0%,
			color-mix(in oklab, var(--toast-accent) 6%, var(--popover)) 45%,
			var(--popover) 85%
		);
	}

	.toast.is-info {
		--toast-accent: var(--purple);
	}
	.toast.is-success {
		--toast-accent: var(--success);
	}
	.toast.is-warning {
		--toast-accent: var(--warning);
	}
	.toast.is-danger {
		--toast-accent: var(--destructive);
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
		gap: 0.125rem;
		padding-top: 0.25rem;
	}

	.title {
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--foreground);
		line-height: 1.4;
	}

	.description {
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
		line-height: var(--line-height-body);
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
		border-radius: 999px;
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.close:hover {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	.close:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 1px;
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
		stroke: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	/* pathLength=100: the arc drains from full to nothing over the duration */
	.ring .remaining {
		stroke: color-mix(in oklch, var(--toast-accent, var(--muted-foreground)) 85%, transparent);
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
    const e = D(), t = T(), [n, i] = S({ toasts: [], isPaused: u });
    z(() => {
      const o = t.current, p = () => i({ toasts: c[c.length - 1] === o ? r : [], isPaused: u });
      return c.push(o), v.add(p), d(), () => {
        c.splice(c.indexOf(o), 1), v.delete(p), d();
      };
    }, []);
    const a = () => b(!0), m = (o) => {
      const p = o.relatedTarget;
      p && o.currentTarget.contains(p) || b(document.visibilityState === "hidden");
    };
    return /* @__PURE__ */ s(
      "host",
      {
        shadowDom: !0,
        role: "region",
        "aria-label": e("notifications"),
        "data-paused": n.isPaused ? "" : null,
        onpointerenter: a,
        onpointerleave: m,
        onfocusin: a,
        onfocusout: m,
        children: n.toasts.map((o) => /* @__PURE__ */ s("div", { class: o.state === "closing" ? "item is-closing" : "item", children: /* @__PURE__ */ h(
          "div",
          {
            class: `toast is-${o.tone}`,
            role: o.tone === "danger" ? "alert" : "status",
            "aria-live": o.tone === "danger" ? "assertive" : "polite",
            children: [
              /* @__PURE__ */ h("div", { class: "content", children: [
                o.title && /* @__PURE__ */ s("span", { class: "title", children: o.title }),
                o.description && /* @__PURE__ */ s("span", { class: "description", children: o.description })
              ] }),
              /* @__PURE__ */ h("button", { type: "button", class: "close", "aria-label": e("dismissNotification"), onclick: () => l(o.id), children: [
                x(o.duration) && [
                  // keyed by version so an update in place restarts the countdown
                  /* @__PURE__ */ h("svg", { class: "ring", viewBox: "0 0 28 28", "aria-hidden": "true", children: [
                    /* @__PURE__ */ s("circle", { class: "track", cx: "14", cy: "14", r: "13" }),
                    /* @__PURE__ */ s(
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
                  /* @__PURE__ */ s("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
                  /* @__PURE__ */ s("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
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
