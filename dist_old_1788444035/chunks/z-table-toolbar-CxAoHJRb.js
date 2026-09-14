import { c as f, a as d, e as i, f as h, b as u, j as a, u as g, g as v } from "./define-element-BWC3wEPr.js";
import { f as x, a as S, b as p } from "./editor-overlay-styles-DEH-Ouss.js";
import { A as m, r as R, a as k, c as A } from "./overlay-BJ9Mg5BD.js";
import { u as y } from "./transition-DlYkj6t5.js";
const $ = f`
	:host {
		position: fixed;
		inset: 0;
		z-index: var(--z-toolbar, 40);
		pointer-events: none;
	}
`, D = d(
  (e) => {
    const r = h(), s = !!e.isOpen, n = y(s), c = Array.isArray(e.items) ? e.items : [];
    u(() => {
      const t = r.current;
      if (!t || !s || !e.anchorRect) return;
      const l = R(e.anchorRect);
      return k(l, t, () => {
        const b = A(l, t, { placement: e.placement || "top", offset: e.offset ?? 10 });
        t.style.left = `${b.x}px`, t.style.top = `${b.y}px`;
      });
    }, [s, e.anchorRect, e.placement, e.offset]);
    const o = ["surface"].concat(n === "open" ? ["is-open"] : []).concat(n === "closing" ? ["is-closing"] : []).join(" ");
    return n === "closed" && !s ? /* @__PURE__ */ a("host", { shadowDom: !0 }) : /* @__PURE__ */ a("host", { shadowDom: !0, children: /* @__PURE__ */ a("div", { ref: r, class: o, role: "toolbar", "aria-label": e.label || "Table actions", children: c.map((t, l) => /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        class: "icon-button",
        "aria-label": t.label || t.value,
        disabled: t.isDisabled,
        onclick: () => e.action({ value: t.value || t.label || "" }),
        children: t.icon ? /* @__PURE__ */ a("span", { innerHTML: t.icon }) : t.label
      },
      t.value || l
    )) }) });
  },
  {
    props: {
      items: { type: Array },
      anchorRect: m,
      placement: { type: String, reflect: !0 },
      offset: { type: Number },
      label: String,
      isOpen: { type: Boolean, reflect: !0 },
      action: i({ bubbles: !0, composed: !0 })
    },
    styles: [x, S, p, $]
  }
), B = f`
	:host {
		position: fixed;
		left: 0;
		top: 0;
		z-index: var(--z-toolbar, 40);
		display: flex;
		align-items: center;
		gap: 1px;
		padding: 0.125rem;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		opacity: 0;
		transform: translateY(4px);
		pointer-events: none;
	}

	:host([axis='column']) {
		flex-direction: column;
	}

	:host(.is-open) {
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 120ms ease-out,
			transform 120ms ease-out;
		pointer-events: auto;
	}

	:host(.is-closing) {
		opacity: 0;
		transform: translateY(0);
		transition: opacity 80ms ease-out;
		pointer-events: none;
	}

	.grip {
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
	}

	.grip.is-active {
		background: color-mix(in oklch, var(--accent, var(--primary)) 16%, transparent);
		color: var(--accent, var(--primary));
	}
`, H = d(
  (e) => {
    const r = g(), s = !!e.isOpen, n = y(s);
    u(() => {
      const o = r.current;
      if (!o || !e.anchorRect) return;
      const t = e.anchorRect;
      o.style.left = `${t.x}px`, o.style.top = `${t.y}px`;
    }, [e.anchorRect]), u(() => {
      const o = r.current;
      o.classList.toggle("is-open", n === "open"), o.classList.toggle("is-closing", n === "closing");
    }, [n]);
    const c = e.axis === "column" ? "column" : "row";
    return /* @__PURE__ */ v("host", { shadowDom: !0, children: [
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          class: ["icon-button", "grip"].concat(e.isSelected ? ["is-active"] : []).join(" "),
          "aria-label": `Select ${c}`,
          "aria-pressed": e.isSelected ? "true" : "false",
          onclick: () => e.select(),
          children: "⋮⋮"
        }
      ),
      /* @__PURE__ */ a("button", { type: "button", class: "icon-button", "aria-label": `Insert ${c} after`, onclick: () => e.insertafter(), children: "+" }),
      /* @__PURE__ */ a("button", { type: "button", class: "icon-button", "aria-label": `Remove ${c}`, onclick: () => e.remove(), children: "×" })
    ] });
  },
  {
    props: {
      axis: { type: String, reflect: !0 },
      anchorRect: m,
      isOpen: { type: Boolean, reflect: !0 },
      isSelected: { type: Boolean, reflect: !0 },
      select: i({ bubbles: !0, composed: !0 }),
      insertafter: i({ bubbles: !0, composed: !0 }),
      remove: i({ bubbles: !0, composed: !0 })
    },
    styles: [p, B]
  }
);
export {
  H as Z,
  D as a
};
