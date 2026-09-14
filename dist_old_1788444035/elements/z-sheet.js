import { c as y, a as f, e as d, f as p, b as c, g as o, j as s, d as u } from "../chunks/define-element-BWC3wEPr.js";
import { u as m } from "../chunks/use-prop-DBBKVpkc.js";
import { u as b } from "../chunks/hooks-D9_x-ckD.js";
import { d as v } from "../chunks/overlay-styles-DmJDaq8Z.js";
const x = y`
	.trigger {
		display: inline-flex;
	}

	/* Slide + fade IN, fade-only OUT: the slide offset lives only in
	   @starting-style (the entry start), while the closed/base state keeps
	   translate at 0 and just drops opacity — so the exit transition has no
	   offset to animate toward and the panel simply fades away in place. */
	.dialog {
		position: fixed;
		margin: 0;
		max-width: none;
		max-height: none;
		border-radius: 0;
		width: min(var(--z-sheet-size, 22rem), 100vw);
		height: 100%;
		inset: 0 0 0 auto;
		opacity: 0;
		transition:
			translate 0.25s ease,
			opacity 0.2s ease,
			overlay 0.25s allow-discrete,
			display 0.25s allow-discrete;
	}

	.dialog[open] {
		opacity: 1;
		translate: 0 0;
	}

	@starting-style {
		.dialog[open] {
			opacity: 0;
			translate: 100% 0;
		}
	}

	:host([side='left']) .dialog {
		inset: 0 auto 0 0;
	}
	@starting-style {
		:host([side='left']) .dialog[open] {
			translate: -100% 0;
		}
	}

	:host([side='top']) .dialog {
		inset: 0 0 auto 0;
		width: 100%;
		height: auto;
		max-height: 85vh;
	}
	@starting-style {
		:host([side='top']) .dialog[open] {
			translate: 0 -100%;
		}
	}

	:host([side='bottom']) .dialog {
		inset: auto 0 0 0;
		width: 100%;
		height: auto;
		max-height: 85vh;
	}
	@starting-style {
		:host([side='bottom']) .dialog[open] {
			translate: 0 100%;
		}
	}

	.dialog::backdrop {
		opacity: 0;
		transition:
			opacity 0.25s ease,
			overlay 0.25s allow-discrete,
			display 0.25s allow-discrete;
	}
	.dialog[open]::backdrop {
		opacity: 1;
	}
	@starting-style {
		.dialog[open]::backdrop {
			opacity: 0;
		}
	}

	.body {
		flex: 1;
	}
`, w = f(
  (t) => {
    const a = p(), [i, l] = m("isOpen"), [h, g] = b(!1);
    c(() => {
      const e = a.current;
      e && (i && !e.open ? (e.showModal(), t.open()) : !i && e.open && e.close());
    }, [i]), c(() => {
      const e = a.current;
      if (!e) return;
      const r = () => {
        i && l(!1), t.close();
      };
      return e.addEventListener("close", r), () => e.removeEventListener("close", r);
    }, [i]);
    const n = () => l(!1);
    return /* @__PURE__ */ o("host", { shadowDom: !0, children: [
      /* @__PURE__ */ s("div", { class: "trigger", onclick: () => !t.isDisabled && l(!0), children: /* @__PURE__ */ s("slot", { name: "trigger" }) }),
      /* @__PURE__ */ o("dialog", { class: "dialog", ref: a, onclick: (e) => {
        t.isStatic || e.target === a.current && n();
      }, children: [
        /* @__PURE__ */ o("div", { class: "body", children: [
          (t.heading || t.hasClose) && /* @__PURE__ */ o("div", { class: "header", children: [
            t.heading ? /* @__PURE__ */ s("h2", { class: "title", children: t.heading }) : /* @__PURE__ */ s("span", {}),
            t.hasClose && /* @__PURE__ */ s("button", { type: "button", class: "close", "aria-label": "Close", onclick: n, children: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ s("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
              /* @__PURE__ */ s("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
            ] }) })
          ] }),
          t.description && /* @__PURE__ */ s("p", { class: "description", children: t.description }),
          /* @__PURE__ */ s("slot", {})
        ] }),
        /* @__PURE__ */ s("div", { class: "footer", style: h ? "" : "display: none", children: /* @__PURE__ */ s(
          "slot",
          {
            name: "footer",
            onslotchange: (e) => g(e.target.assignedNodes().length > 0)
          }
        ) })
      ] })
    ] });
  },
  {
    props: {
      isOpen: { type: Boolean, reflect: !0 },
      side: { type: String, reflect: !0 },
      heading: String,
      description: String,
      hasClose: { type: Boolean, reflect: !0, value: () => !0 },
      isStatic: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      open: d({ bubbles: !0, composed: !0 }),
      close: d({ bubbles: !0, composed: !0 })
    },
    styles: [v, x]
  }
);
u("z-sheet", w);
export {
  w as ZSheet
};
