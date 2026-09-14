import { c as g, a as v, e as b, u as x, f as m, b as y, j as o, g as c, d as w } from "../chunks/define-element-BWC3wEPr.js";
import { u as k } from "../chunks/hooks-D9_x-ckD.js";
const z = g`
	:host {
		position: fixed;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		width: min(22rem, calc(100vw - 2rem));
		pointer-events: none;
	}

	:host(:not([position])),
	:host([position='bottom-end']) {
		bottom: 1.25rem;
		right: 1.25rem;
	}
	:host([position='bottom-start']) {
		bottom: 1.25rem;
		left: 1.25rem;
	}
	:host([position='bottom-center']) {
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
	}
	:host([position='top-end']) {
		top: 1.25rem;
		right: 1.25rem;
	}
	:host([position='top-start']) {
		top: 1.25rem;
		left: 1.25rem;
	}
	:host([position='top-center']) {
		top: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.toast {
		pointer-events: auto;
		display: flex;
		align-items: flex-start;
		gap: 0.625rem;
		box-sizing: border-box;
		padding: 0.75rem 0.875rem;
		background: var(--popover);
		border: 1px solid var(--border);
		border-left: 3px solid var(--toast-accent, var(--border));
		border-radius: var(--radius-md);
		animation: toast-in 0.18s ease;
	}

	.toast.is-dom {
		--toast-accent: var(--purple);
	}
	.toast.is-success {
		--toast-accent: var(--success);
	}
	.toast.is-warning {
		--toast-accent: var(--warning);
	}
	.toast.is-error {
		--toast-accent: var(--destructive);
	}

	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
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

	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
		margin: -0.125rem -0.25rem 0 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		cursor: pointer;
		transition: color 0.12s ease;
	}

	.close:hover {
		color: var(--foreground);
	}

	.close svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}
`, T = v(
  (p) => {
    const u = x(), [f, l] = k([]), n = m(/* @__PURE__ */ new Map()), d = m(0), a = (t) => {
      l((r) => r.filter((i) => i.id !== t));
      const s = n.current, e = s.get(t);
      e && (clearTimeout(e), s.delete(t)), p.dismiss({ id: t });
    };
    return y(() => {
      const t = u.current;
      t.push = (e = {}) => {
        const r = (d.current ?? 0) + 1;
        d.current = r, l((h) => [...h, { id: r, accent: e.accent, title: e.title, description: e.description }]);
        const i = e.duration ?? 4e3;
        return i > 0 && n.current.set(r, setTimeout(() => a(r), i)), r;
      }, t.dismiss = (e) => a(e);
      const s = n.current;
      return () => {
        s.forEach((e) => clearTimeout(e)), s.clear();
      };
    }, []), /* @__PURE__ */ o("host", { shadowDom: !0, role: "region", "aria-label": "Notifications", children: f.map((t) => /* @__PURE__ */ c("div", { class: `toast is-${t.accent || "neutral"}`, role: "status", children: [
      /* @__PURE__ */ c("div", { class: "content", children: [
        t.title && /* @__PURE__ */ o("span", { class: "title", children: t.title }),
        t.description && /* @__PURE__ */ o("span", { class: "description", children: t.description })
      ] }),
      /* @__PURE__ */ o("button", { type: "button", class: "close", "aria-label": "Dismiss", onclick: () => a(t.id), children: /* @__PURE__ */ c("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ o("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
        /* @__PURE__ */ o("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
      ] }) })
    ] }, t.id)) });
  },
  {
    props: {
      position: { type: String, reflect: !0 },
      dismiss: b({ bubbles: !0, composed: !0 })
    },
    styles: z
  }
);
w("z-toast", T);
export {
  T as ZToast
};
