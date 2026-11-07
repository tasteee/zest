import { c as u, a as v, e as c, f as p, b as d, g as i, j as o, d as b } from "../chunks/define-element-BZUk-KLk.js";
import { i as y } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as x } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as w } from "../chunks/hooks-DEFT8qqt.js";
import { d as S } from "../chunks/overlay-styles-BRIbX03i.js";
import { i as k, o as C, c as B } from "../chunks/modal-Be8jZ8Jc.js";
import { o as E } from "../chunks/prop-types-B3Bpi956.js";
import { u as H } from "../chunks/locale-DUDaH1Ni.js";
const O = u`
	.trigger {
		display: inline-flex;
	}

	/* Slides in from its edge and retraces the same path on exit, so dismissing
	   by X, backdrop, or Esc all read as the sheet going back where it came
	   from. Hidden state = offset by its own size; shared/modal.ts flips
	   data-state. Timings come from the motion scale (slow in, slow-exit out). */
	.dialog {
		background: var(--color-neutral-1);
		--sheet-from: calc(100% * var(--motion-travel)) 0;
		position: fixed;
		margin: 0;
		max-width: none;
		max-height: none;
		border-radius: 0;
		width: min(var(--z-sheet-size, 22rem), 100vw);
		height: 100%;
		inset: 0 0 0 auto;
		scale: 1;
		translate: var(--sheet-from);
		transition:
			opacity var(--motion-exit-slow) var(--ease-exit),
			translate var(--motion-exit-slow) var(--ease-exit);
	}

	.dialog[data-state='open'] {
		scale: 1;
		translate: 0 0;
		transition:
			opacity var(--motion-slow) var(--ease-enter),
			translate var(--motion-slow) var(--ease-enter);
	}

	.dialog::backdrop {
		transition: opacity var(--motion-exit-slow) var(--ease-exit);
	}
	.dialog[data-state='open']::backdrop {
		transition: opacity var(--motion-slow) var(--ease-enter);
	}

	:host([side='left']) .dialog {
		--sheet-from: calc(-100% * var(--motion-travel)) 0;
		inset: 0 auto 0 0;
	}

	:host([side='top']) .dialog {
		--sheet-from: 0 calc(-100% * var(--motion-travel));
		inset: 0 0 auto 0;
		width: 100%;
		height: auto;
		max-height: 85vh;
	}

	:host([side='bottom']) .dialog {
		--sheet-from: 0 calc(100% * var(--motion-travel));
		inset: auto 0 0 0;
		width: 100%;
		height: auto;
		max-height: 85vh;
	}

	.body {
		flex: 1;
	}
`, z = v(
  (e) => {
    const h = H(), s = p(), [a, r] = x("isOpen"), [m, f] = w(!1);
    d(() => {
      const t = s.current;
      t && (a ? C(t) && e.open() : B(t));
    }, [a]), d(() => {
      const t = s.current;
      if (!t) return;
      const l = () => {
        a && r(!1), e.close();
      };
      return t.addEventListener("close", l), () => t.removeEventListener("close", l);
    }, [a]);
    const n = () => r(!1), g = (t) => {
      e.isStatic || t.target === s.current && n();
    };
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ o("div", { class: "trigger", onclick: () => !e.isDisabled && r(!0), children: /* @__PURE__ */ o("slot", { name: "trigger" }) }),
      /* @__PURE__ */ i(
        "dialog",
        {
          class: "dialog",
          ref: s,
          "aria-labelledby": e.heading ? "sheet-title" : void 0,
          "aria-describedby": e.description ? "sheet-description" : void 0,
          onclick: g,
          oncancel: (t) => k(t, n),
          children: [
            /* @__PURE__ */ i("div", { class: "body", children: [
              (e.heading || !e.isCloseHidden) && /* @__PURE__ */ i("div", { class: "header", children: [
                e.heading ? /* @__PURE__ */ o("h2", { id: "sheet-title", class: "title", children: e.heading }) : /* @__PURE__ */ o("span", {}),
                !e.isCloseHidden && /* @__PURE__ */ o("button", { type: "button", class: "close", "aria-label": h("close"), onclick: n, children: /* @__PURE__ */ i("svg", { viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ o("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
                  /* @__PURE__ */ o("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
                ] }) })
              ] }),
              e.description && /* @__PURE__ */ o("p", { id: "sheet-description", class: "description", children: e.description }),
              /* @__PURE__ */ o("slot", {})
            ] }),
            /* @__PURE__ */ o("div", { class: "footer", style: m ? "" : "display: none", children: /* @__PURE__ */ o(
              "slot",
              {
                name: "footer",
                onslotchange: (t) => f(t.target.assignedNodes().length > 0)
              }
            ) })
          ]
        }
      )
    ] });
  },
  {
    props: {
      isOpen: { type: Boolean, reflect: !0 },
      side: { type: E("right", "left", "top", "bottom"), reflect: !0 },
      heading: String,
      description: String,
      isCloseHidden: { type: Boolean, reflect: !0 },
      isStatic: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      open: c({ bubbles: !0, composed: !0 }),
      close: c({ bubbles: !0, composed: !0 })
    },
    styles: [S, O, y]
  }
);
b("z-sheet", z);
export {
  z as ZSheet
};
