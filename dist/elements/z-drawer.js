// @ts-self-types="./z-drawer.d.ts"
import { c as x, a as w, e as h, f as d, b as f, g as u, j as a, d as S } from "../chunks/define-element-BZUk-KLk.js";
import { i as k } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as D } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as M } from "../chunks/hooks-DEFT8qqt.js";
import { d as P } from "../chunks/overlay-styles-BeWhjeXT.js";
import { i as j, o as C, c as E } from "../chunks/modal-Be8jZ8Jc.js";
const L = x`
	.trigger {
		display: inline-flex;
	}

	/* Slides up from the bottom edge and back down on exit (shared/modal.ts
	   flips data-state). A drag-dismiss releases the inline drag offset so the
	   exit continues from wherever the pointer let go. */
	.dialog {
		position: fixed;
		inset: auto 0 0 0;
		margin: 0;
		width: 100%;
		max-width: none;
		height: auto;
		max-height: 90vh;
		border-radius: var(--radius-xl) var(--radius-xl) 0 0;
		scale: 1;
		translate: 0 calc(100% * var(--motion-travel));
		transition:
			opacity var(--motion-exit-slow) var(--ease-exit),
			translate var(--motion-exit-slow) var(--ease-exit);
		touch-action: none;
	}

	.dialog[data-state='open'] {
		scale: 1;
		translate: 0 0;
		transition:
			opacity var(--motion-slow) var(--ease-enter),
			translate var(--motion-slow) var(--ease-enter);
	}

	.dialog.is-dragging {
		transition: none;
	}

	.dialog::backdrop {
		transition: opacity var(--motion-exit-slow) var(--ease-exit);
	}
	.dialog[data-state='open']::backdrop {
		transition: opacity var(--motion-slow) var(--ease-enter);
	}

	.handle-area {
		display: flex;
		justify-content: center;
		padding: var(--space-3) 0 var(--space-1);
		cursor: grab;
		touch-action: none;
	}

	.handle-area:active {
		cursor: grabbing;
	}

	.handle {
		width: 2.5rem;
		height: 0.3125rem;
		border-radius: var(--radius-full);
		background: var(--border-default);
	}

	.body {
		flex: 1;
		padding-top: var(--space-2);
	}
`, O = w(
  (t) => {
    const n = d(), i = d(null), o = d(0), [s, l] = D("isOpen"), [p, m] = M(!1);
    f(() => {
      const e = n.current;
      e && (s ? (e.style.translate = "", C(e) && t.open()) : E(e));
    }, [s]), f(() => {
      const e = n.current;
      if (!e) return;
      const r = () => {
        s && l(!1), t.close();
      };
      return e.addEventListener("close", r), () => e.removeEventListener("close", r);
    }, [s]);
    const c = () => l(!1), v = (e) => {
      t.isStatic || e.target === n.current && c();
    }, b = (e) => {
      i.current = e.clientY, o.current = 0;
      const r = n.current;
      r && r.classList.add("is-dragging"), e.currentTarget.setPointerCapture(e.pointerId);
    }, y = (e) => {
      if (i.current == null) return;
      const r = n.current;
      r && (o.current = Math.max(0, e.clientY - i.current), r.style.translate = `0 ${o.current}px`);
    }, g = () => {
      const e = n.current;
      if (i.current == null || !e) return;
      i.current = null, e.classList.remove("is-dragging");
      const r = Math.min(160, e.offsetHeight * 0.4);
      e.style.translate = "", (o.current ?? 0) > r && c();
    };
    return /* @__PURE__ */ u("host", { shadowDom: !0, children: [
      /* @__PURE__ */ a("div", { class: "trigger", onclick: () => !t.isDisabled && l(!0), children: /* @__PURE__ */ a("slot", { name: "trigger" }) }),
      /* @__PURE__ */ u(
        "dialog",
        {
          class: "dialog",
          ref: n,
          "aria-labelledby": t.heading ? "drawer-title" : void 0,
          "aria-describedby": t.description ? "drawer-description" : void 0,
          onclick: v,
          oncancel: (e) => j(e, c),
          children: [
            /* @__PURE__ */ a(
              "div",
              {
                class: "handle-area",
                onpointerdown: b,
                onpointermove: y,
                onpointerup: g,
                onpointercancel: g,
                children: /* @__PURE__ */ a("span", { class: "handle", "aria-hidden": "true" })
              }
            ),
            /* @__PURE__ */ u("div", { class: "body", children: [
              t.heading && /* @__PURE__ */ a("div", { class: "header", children: /* @__PURE__ */ a("h2", { id: "drawer-title", class: "title", children: t.heading }) }),
              t.description && /* @__PURE__ */ a("p", { id: "drawer-description", class: "description", children: t.description }),
              /* @__PURE__ */ a("slot", {})
            ] }),
            /* @__PURE__ */ a("div", { class: "footer", style: p ? "" : "display: none", children: /* @__PURE__ */ a(
              "slot",
              {
                name: "footer",
                onslotchange: (e) => m(e.target.assignedNodes().length > 0)
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
      heading: String,
      description: String,
      isStatic: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      open: h({ bubbles: !0, composed: !0 }),
      close: h({ bubbles: !0, composed: !0 })
    },
    styles: [P, L, k]
  }
);
S("z-drawer", O);
export {
  O as ZDrawer
};
