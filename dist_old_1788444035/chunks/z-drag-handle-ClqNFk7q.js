import { c as l, a as d, f as p, g as n, j as r, u as g, b as c } from "./define-element-BWC3wEPr.js";
import { A as h } from "./overlay-BJ9Mg5BD.js";
import { u } from "./transition-DlYkj6t5.js";
const f = l`
	:host {
		display: inline-flex;
	}

	.grip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		cursor: grab;
		transition:
			color 0.12s ease,
			background-color 0.12s ease;
	}

	.grip:hover {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	.grip:active {
		cursor: grabbing;
	}

	.grip:disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.grip svg {
		width: 1.125rem;
		height: 1.125rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}

	.ghost {
		position: fixed;
		top: -1000px;
		left: -1000px;
		max-width: 16rem;
		padding: 0.5rem 0.75rem;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		color: var(--foreground);
		font-family: inherit;
		font-size: var(--font-size-small);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`, v = d(
  (t) => {
    const s = p(), a = (o) => {
      const e = s.current;
      e && o.dataTransfer && o.dataTransfer.setDragImage(e, 12, 12);
    };
    return /* @__PURE__ */ n("host", { shadowDom: !0, children: [
      /* @__PURE__ */ r("button", { type: "button", class: "grip", draggable: !0, disabled: t.isDisabled, "aria-label": "Drag to reorder", ondragstart: a, children: /* @__PURE__ */ n("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ r("circle", { cx: "9", cy: "6", r: "1" }),
        /* @__PURE__ */ r("circle", { cx: "9", cy: "12", r: "1" }),
        /* @__PURE__ */ r("circle", { cx: "9", cy: "18", r: "1" }),
        /* @__PURE__ */ r("circle", { cx: "15", cy: "6", r: "1" }),
        /* @__PURE__ */ r("circle", { cx: "15", cy: "12", r: "1" }),
        /* @__PURE__ */ r("circle", { cx: "15", cy: "18", r: "1" })
      ] }) }),
      /* @__PURE__ */ r("div", { ref: s, class: "ghost", children: t.label || "Block" })
    ] });
  },
  {
    props: {
      label: String,
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: f
  }
), y = l`
	:host {
		position: fixed;
		left: 0;
		top: 0;
		z-index: var(--z-overlay, 60);
		display: block;
		height: 2px;
		border-radius: 999px;
		background: var(--accent, var(--purple));
		opacity: 0;
		pointer-events: none;
	}

	:host(.is-open) {
		opacity: 1;
		transition: opacity 120ms ease-out;
	}

	:host(.is-closing) {
		opacity: 0;
		transition: opacity 80ms ease-out;
	}

	:host([orientation='vertical']) {
		width: 2px;
		height: auto;
	}
`, w = d(
  (t) => {
    const s = g(), a = !!t.isOpen, o = u(a);
    return c(() => {
      const e = s.current;
      if (!e || !t.anchorRect) return;
      const i = t.anchorRect;
      e.style.left = `${i.x}px`, e.style.top = `${i.y}px`, e.style.width = `${i.width}px`, e.style.height = `${i.height}px`;
    }, [t.anchorRect]), c(() => {
      const e = s.current;
      e.classList.toggle("is-open", o === "open"), e.classList.toggle("is-closing", o === "closing");
    }, [o]), /* @__PURE__ */ r("host", { shadowDom: !0, role: "presentation" });
  },
  {
    props: {
      anchorRect: h,
      orientation: { type: String, reflect: !0 },
      isOpen: { type: Boolean, reflect: !0 }
    },
    styles: y
  }
);
export {
  v as Z,
  w as a
};
