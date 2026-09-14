import { c as u, a as m, e as i, j as t, u as v, b as p, g as s } from "./define-element-BWC3wEPr.js";
import { u as f } from "./hooks-D9_x-ckD.js";
import { b as g } from "./editor-overlay-styles-DEH-Ouss.js";
import { A as y } from "./overlay-BJ9Mg5BD.js";
import { u as x } from "./transition-DlYkj6t5.js";
const k = u`
	:host {
		display: inline;
		background: color-mix(in oklch, var(--warning) 22%, transparent);
		border-bottom: 2px solid color-mix(in oklch, var(--warning) 55%, transparent);
		border-radius: 2px;
		cursor: pointer;
		transition: background-color 0.12s ease;
	}

	:host(:hover) {
		background: color-mix(in oklch, var(--warning) 32%, transparent);
	}

	:host([is-active]) {
		background: color-mix(in oklch, var(--purple) 26%, transparent);
		border-bottom-color: var(--purple);
	}

	:host([is-resolved]) {
		background: transparent;
		border-bottom-color: var(--border);
		opacity: 0.6;
	}
`, S = m(
  (e) => /* @__PURE__ */ t("host", { shadowDom: !0, onclick: () => e.activate({ threadId: e.threadId || "" }), children: /* @__PURE__ */ t("slot", {}) }),
  {
    props: {
      threadId: { type: String, reflect: !0 },
      isActive: { type: Boolean, reflect: !0 },
      isResolved: { type: Boolean, reflect: !0 },
      activate: i({ bubbles: !0, composed: !0 })
    },
    styles: k
  }
), w = u`
	:host {
		position: fixed;
		left: 0;
		top: 0;
		z-index: var(--z-toolbar, 40);
		display: inline-flex;
		opacity: 0;
		transform: translateX(4px);
		pointer-events: none;
	}

	:host(.is-open) {
		opacity: 1;
		transform: translateX(0);
		transition:
			opacity 120ms ease-out,
			transform 120ms ease-out;
		pointer-events: auto;
	}

	:host(.is-closing) {
		opacity: 0;
		transform: translateX(0);
		transition: opacity 80ms ease-out;
		pointer-events: none;
	}

	.badge {
		position: absolute;
		top: -0.25rem;
		right: -0.25rem;
		min-width: 0.9rem;
		height: 0.9rem;
		padding: 0 0.2rem;
		border-radius: 999px;
		background: var(--warning);
		color: var(--bg);
		font-size: 0.6rem;
		font-weight: 700;
		line-height: 0.9rem;
		text-align: center;
	}

	.icon-button {
		position: relative;
	}
`, j = m(
  (e) => {
    const a = v(), c = !!e.isOpen, l = x(c), n = Number(e.count) || 0;
    return p(() => {
      const r = a.current;
      if (!r || !e.anchorRect) return;
      const d = e.anchorRect;
      r.style.left = `${d.x}px`, r.style.top = `${d.y}px`;
    }, [e.anchorRect]), p(() => {
      const r = a.current;
      r.classList.toggle("is-open", l === "open"), r.classList.toggle("is-closing", l === "closing");
    }, [l]), /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        class: ["icon-button"].concat(e.isActive ? ["is-active"] : []).join(" "),
        "aria-label": n > 1 ? `${n} comments` : "Comment",
        onclick: () => e.open({ threadId: e.threadId || "" }),
        children: [
          /* @__PURE__ */ t("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { d: "M21 11.5a8.38 8.38 0 0 1-8.8 8.4 8.5 8.5 0 0 1-4-1L3 20l1.3-3.9a8.38 8.38 0 0 1-1-4A8.5 8.5 0 0 1 12 3.6a8.38 8.38 0 0 1 9 7.9Z" }) }),
          n > 0 && /* @__PURE__ */ t("span", { class: "badge", children: n })
        ]
      }
    ) });
  },
  {
    props: {
      threadId: { type: String, reflect: !0 },
      anchorRect: y,
      count: { type: Number },
      isActive: { type: Boolean, reflect: !0 },
      isOpen: { type: Boolean, reflect: !0 },
      open: i({ bubbles: !0, composed: !0 })
    },
    styles: [g, w]
  }
), z = u`
	:host {
		display: flex;
		flex-direction: column;
		width: 20rem;
		max-width: 100%;
		box-sizing: border-box;
		height: 100%;
		background: var(--popover);
		border-left: 1px solid var(--border);
	}

	:host([is-hidden]) {
		display: none;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--foreground);
	}

	.list {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.thread {
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.625rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		cursor: pointer;
	}

	.thread.is-active {
		border-color: var(--purple);
	}

	.thread.is-resolved {
		opacity: 0.55;
	}

	.message {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.message .meta {
		display: flex;
		gap: 0.375rem;
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}

	.message .text {
		font-size: var(--font-size-small);
		color: var(--foreground);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.reply {
		flex: 1;
		resize: none;
		min-height: 2rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 0.375rem 0.5rem;
		color: var(--foreground);
		font-family: inherit;
		font-size: var(--font-size-small);
	}

	.resolve {
		flex-shrink: 0;
		height: 1.75rem;
		padding: 0 0.625rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--foreground);
		font-family: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
	}

	.close {
		background: transparent;
		border: 0;
		color: var(--muted-foreground);
		cursor: pointer;
	}
`, Z = m(
  (e) => {
    const [a, c] = f(""), l = Array.isArray(e.threads) ? e.threads : [], n = (r) => {
      a.trim() && (e.reply({ threadId: r, text: a }), c(""));
    };
    return /* @__PURE__ */ s("host", { shadowDom: !0, role: "complementary", "aria-label": "Comments", children: [
      /* @__PURE__ */ s("div", { class: "header", children: [
        /* @__PURE__ */ t("span", { children: "Comments" }),
        /* @__PURE__ */ t("button", { type: "button", class: "close", "aria-label": "Close comments", onclick: () => e.close(), children: "✕" })
      ] }),
      /* @__PURE__ */ t("div", { class: "list", children: l.map((r) => {
        const d = ["thread"].concat(r.id === e.activeThreadId ? ["is-active"] : []).concat(r.isResolved ? ["is-resolved"] : []).join(" "), h = Array.isArray(r.messages) ? r.messages : [];
        return /* @__PURE__ */ s("div", { class: d, onclick: () => e.select({ threadId: r.id }), children: [
          h.map((o, b) => /* @__PURE__ */ s("div", { class: "message", children: [
            /* @__PURE__ */ s("div", { class: "meta", children: [
              /* @__PURE__ */ t("span", { children: o.author || "Anonymous" }),
              /* @__PURE__ */ t("span", { children: o.time || "" })
            ] }),
            /* @__PURE__ */ t("div", { class: "text", children: o.text })
          ] }, b)),
          r.id === e.activeThreadId && !r.isResolved && /* @__PURE__ */ s("div", { class: "actions", onclick: (o) => o.stopPropagation(), children: [
            /* @__PURE__ */ t(
              "textarea",
              {
                class: "reply",
                placeholder: "Reply…",
                value: a,
                oninput: (o) => c(o.target.value)
              }
            ),
            /* @__PURE__ */ t("button", { type: "button", class: "resolve", onclick: () => n(r.id), children: "Reply" }),
            /* @__PURE__ */ t("button", { type: "button", class: "resolve", onclick: () => e.resolve({ threadId: r.id }), children: "Resolve" })
          ] })
        ] }, r.id);
      }) })
    ] });
  },
  {
    props: {
      threads: { type: Array },
      activeThreadId: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: i({ bubbles: !0, composed: !0 }),
      reply: i({ bubbles: !0, composed: !0 }),
      resolve: i({ bubbles: !0, composed: !0 }),
      close: i({ bubbles: !0, composed: !0 })
    },
    styles: z
  }
);
export {
  j as Z,
  S as a,
  Z as b
};
