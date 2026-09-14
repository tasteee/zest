import { c as x, a as w, e as p, f as c, b as f, g as d, j as s, d as S } from "../chunks/define-element-BWC3wEPr.js";
import { u as k } from "../chunks/use-prop-DBBKVpkc.js";
import { u as D } from "../chunks/hooks-D9_x-ckD.js";
import { d as j } from "../chunks/overlay-styles-DmJDaq8Z.js";
const O = x`
	.trigger {
		display: inline-flex;
	}

	/* Slide + fade IN, fade-only OUT (see z-sheet): the slide offset is only in
	   @starting-style; the closed state keeps translate 0 and drops opacity, so a
	   non-drag close just fades. (A drag-dismiss animates from the dragged offset.) */
	.dialog {
		position: fixed;
		inset: auto 0 0 0;
		margin: 0;
		width: 100%;
		max-width: none;
		height: auto;
		max-height: 90vh;
		border-radius: var(--radius-xl) var(--radius-xl) 0 0;
		opacity: 0;
		transition:
			translate 0.3s ease,
			opacity 0.22s ease,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
		touch-action: none;
	}

	.dialog[open] {
		opacity: 1;
		translate: 0 0;
	}

	@starting-style {
		.dialog[open] {
			opacity: 0;
			translate: 0 100%;
		}
	}

	.dialog.is-dragging {
		transition: none;
	}

	.dialog::backdrop {
		opacity: 0;
		transition:
			opacity 0.3s ease,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
	}
	.dialog[open]::backdrop {
		opacity: 1;
	}
	@starting-style {
		.dialog[open]::backdrop {
			opacity: 0;
		}
	}

	.handle-area {
		display: flex;
		justify-content: center;
		padding: 0.75rem 0 0.25rem;
		cursor: grab;
		touch-action: none;
	}

	.handle-area:active {
		cursor: grabbing;
	}

	.handle {
		width: 2.5rem;
		height: 0.3125rem;
		border-radius: 999px;
		background: var(--border);
	}

	.body {
		flex: 1;
		padding-top: 0.5rem;
	}
`, P = w(
  (r) => {
    const n = c(), a = c(null), i = c(0), [o, l] = k("isOpen"), [h, y] = D(!1);
    f(() => {
      const e = n.current;
      e && (o && !e.open ? (e.style.translate = "", e.showModal(), r.open()) : !o && e.open && e.close());
    }, [o]), f(() => {
      const e = n.current;
      if (!e) return;
      const t = () => {
        o && l(!1), r.close();
      };
      return e.addEventListener("close", t), () => e.removeEventListener("close", t);
    }, [o]);
    const g = () => l(!1), m = (e) => {
      r.isStatic || e.target === n.current && g();
    }, b = (e) => {
      a.current = e.clientY, i.current = 0;
      const t = n.current;
      t && t.classList.add("is-dragging"), e.currentTarget.setPointerCapture(e.pointerId);
    }, v = (e) => {
      if (a.current == null) return;
      const t = n.current;
      t && (i.current = Math.max(0, e.clientY - a.current), t.style.translate = `0 ${i.current}px`);
    }, u = () => {
      const e = n.current;
      if (a.current == null || !e) return;
      a.current = null, e.classList.remove("is-dragging");
      const t = Math.min(160, e.offsetHeight * 0.4);
      (i.current ?? 0) > t ? g() : e.style.translate = "0 0";
    };
    return /* @__PURE__ */ d("host", { shadowDom: !0, children: [
      /* @__PURE__ */ s("div", { class: "trigger", onclick: () => !r.isDisabled && l(!0), children: /* @__PURE__ */ s("slot", { name: "trigger" }) }),
      /* @__PURE__ */ d("dialog", { class: "dialog", ref: n, onclick: m, children: [
        /* @__PURE__ */ s(
          "div",
          {
            class: "handle-area",
            onpointerdown: b,
            onpointermove: v,
            onpointerup: u,
            onpointercancel: u,
            children: /* @__PURE__ */ s("span", { class: "handle", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ d("div", { class: "body", children: [
          r.heading && /* @__PURE__ */ s("div", { class: "header", children: /* @__PURE__ */ s("h2", { class: "title", children: r.heading }) }),
          r.description && /* @__PURE__ */ s("p", { class: "description", children: r.description }),
          /* @__PURE__ */ s("slot", {})
        ] }),
        /* @__PURE__ */ s("div", { class: "footer", style: h ? "" : "display: none", children: /* @__PURE__ */ s(
          "slot",
          {
            name: "footer",
            onslotchange: (e) => y(e.target.assignedNodes().length > 0)
          }
        ) })
      ] })
    ] });
  },
  {
    props: {
      isOpen: { type: Boolean, reflect: !0 },
      heading: String,
      description: String,
      isStatic: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      open: p({ bubbles: !0, composed: !0 }),
      close: p({ bubbles: !0, composed: !0 })
    },
    styles: [j, O]
  }
);
S("z-drawer", P);
export {
  P as ZDrawer
};
