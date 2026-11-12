import { c as S, a as I, e as f, f as b, b as y, g as i, j as r } from "./define-element-BZUk-KLk.js";
import { u as O } from "./use-prop-C0_HeSQ9.js";
import { u as h } from "./hooks-DEFT8qqt.js";
import { u as q, h as B } from "./child-items-CYeHgkFR.js";
import { t as F } from "./scrollbar-styles-CaLPixBv.js";
import { i as Z, o as $, c as M } from "./modal-Be8jZ8Jc.js";
import { u as P } from "./locale-Bb4aqXuR.js";
const T = S`
	.trigger {
		display: inline-flex;
	}

	.command {
		box-sizing: border-box;
		width: min(36rem, calc(100vw - 2rem));
		max-height: 60vh;
		inset: 0;
		margin: 12vh auto auto;
		padding: 0;
		background: var(--surface-overlay);
		color: var(--text-primary);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-modal);
		overflow: hidden;
	}

	.command[open] {
		display: flex;
		flex-direction: column;
	}

	/* motion, same choreography as the dialog family (shared/modal.ts) */
	.command {
		opacity: 0;
		scale: var(--motion-scale-from);
		translate: 0 calc(var(--motion-distance-sm) * -1 * var(--motion-travel));
		transition:
			opacity var(--motion-exit-base) var(--ease-exit),
			scale var(--motion-exit-base) var(--ease-exit),
			translate var(--motion-exit-base) var(--ease-exit);
	}

	.command[data-state='open'] {
		opacity: 1;
		scale: 1;
		translate: 0 0;
		transition:
			opacity var(--motion-base) var(--ease-enter),
			scale var(--motion-base) var(--ease-enter),
			translate var(--motion-base) var(--ease-enter);
	}

	.command::backdrop {
		background: var(--surface-scrim);
		backdrop-filter: blur(3px);
		opacity: 0;
		transition: opacity var(--motion-exit-base) var(--ease-exit);
	}

	.command[data-state='open']::backdrop {
		opacity: 1;
		transition: opacity var(--motion-base) var(--ease-enter);
	}

	.footer {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2) var(--space-3-5);
		border-top: 1px solid var(--border-default);
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
	}

	.footer.is-empty {
		display: none;
	}

	.search {
		display: flex;
		align-items: center;
		gap: var(--space-2-5);
		padding: var(--space-3-5) var(--space-4);
		border-bottom: 1px solid var(--border-default);
	}

	.search svg {
		width: 1.125rem;
		height: 1.125rem;
		flex-shrink: 0;
		color: var(--text-secondary);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.search input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: 0;
		outline: none;
		color: var(--text-primary);
		font-family: inherit;
		font-size: var(--font-size-md);
	}

	.search input::placeholder {
		color: var(--text-secondary);
		user-select: none;
		-webkit-user-select: none;
	}

	.list {
		overflow-y: auto;
		padding: var(--space-1-5);
	}

	.group-label {
		padding: var(--space-2) var(--space-2-5) var(--space-1);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.item {
		display: flex;
		align-items: center;
		gap: var(--space-2-5);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		cursor: pointer;
		user-select: none;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: start;
		width: 100%;
		box-sizing: border-box;
	}

	.item.is-active {
		background: color-mix(in oklch, var(--tone, var(--accent-primary)) 14%, transparent);
		color: var(--tone, var(--accent-primary));
	}

	.item.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.label {
		flex: 1;
	}

	.shortcut {
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
	}

	.empty {
		padding: var(--space-6);
		text-align: center;
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
	}
`, J = I(
  (s) => {
    const c = P(), d = b(), g = b(), x = b(), [p, l] = O("isOpen"), [w, k] = h(""), [n, m] = h(0), [C, A] = h(!1), E = [...q("z-command-item", ["group", "shortcut", "keywords", "is-disabled"]).map(
      (e) => ({
        value: e.value,
        label: e.label,
        group: e.attributes.group || void 0,
        shortcut: e.attributes.shortcut || void 0,
        keywords: e.attributes.keywords || void 0,
        isDisabled: B(e, "is-disabled"),
        slot: e.slot
      })
    ), ...Array.isArray(s.items) ? s.items : []], z = w.trim().toLowerCase(), a = E.filter((e) => !z || `${e.label} ${e.keywords || ""}`.toLowerCase().includes(z)), v = [];
    a.forEach((e) => {
      const t = e.group || "";
      v.includes(t) || v.push(t);
    }), y(() => {
      var t;
      const e = d.current;
      if (e)
        if (p) {
          if (!$(e)) return;
          k(""), m(0), (t = g.current) == null || t.focus(), s.open();
        } else
          M(e);
    }, [p]), y(() => {
      const e = d.current;
      if (!e) return;
      const t = () => {
        p && l(!1), s.close();
      };
      return e.addEventListener("close", t), () => e.removeEventListener("close", t);
    }, [p]), y(() => {
      var t;
      const e = (t = x.current) == null ? void 0 : t.querySelector(`[data-index="${n}"]`);
      e == null || e.scrollIntoView({ block: "nearest" });
    }, [n]);
    const j = (e) => a[e] && !a[e].isDisabled, D = (e) => {
      e.isDisabled || (l(!1), s.select({ value: e.value || e.label }));
    }, L = (e) => {
      k(e.target.value), m(0);
    }, R = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const t = e.key === "ArrowDown" ? 1 : -1;
        let o = n;
        for (let u = 0; u < a.length && (o = (o + t + a.length) % a.length, !j(o)); u++)
          ;
        m(o);
      } else e.key === "Enter" && (e.preventDefault(), a[n] && D(a[n]));
    };
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ r("div", { class: "trigger", onclick: () => l(!0), children: /* @__PURE__ */ r("slot", { name: "trigger" }) }),
      /* @__PURE__ */ i(
        "dialog",
        {
          class: "command",
          ref: d,
          onclick: (e) => {
            e.target === d.current && l(!1);
          },
          oncancel: (e) => Z(e, () => l(!1)),
          children: [
            /* @__PURE__ */ i("div", { class: "search", children: [
              /* @__PURE__ */ i("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
                /* @__PURE__ */ r("circle", { cx: "11", cy: "11", r: "7" }),
                /* @__PURE__ */ r("line", { x1: "21", y1: "21", x2: "16.5", y2: "16.5" })
              ] }),
              /* @__PURE__ */ r(
                "input",
                {
                  ref: g,
                  type: "text",
                  placeholder: s.placeholder || c("commandPlaceholder"),
                  value: w,
                  oninput: L,
                  onkeydown: R,
                  "aria-label": c("commandSearch")
                }
              )
            ] }),
            /* @__PURE__ */ i("div", { class: "list", ref: x, role: "listbox", "aria-label": c("commandResults"), children: [
              a.length === 0 && /* @__PURE__ */ r("div", { class: "empty", children: /* @__PURE__ */ r("slot", { name: "empty", children: s.emptyText || c("commandEmpty") }) }),
              v.map((e) => /* @__PURE__ */ i("div", { role: "group", children: [
                e && /* @__PURE__ */ r("div", { class: "group-label", children: e }),
                a.map((t, o) => {
                  if ((t.group || "") !== e) return null;
                  const u = ["item"].concat(o === n ? ["is-active"] : []).concat(t.isDisabled ? ["is-disabled"] : []).join(" ");
                  return /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      class: u,
                      role: "option",
                      "aria-selected": o === n ? "true" : "false",
                      "data-index": o,
                      disabled: t.isDisabled,
                      onmousemove: () => m(o),
                      onclick: () => D(t),
                      children: [
                        t.slot ? /* @__PURE__ */ r("span", { class: "label", children: /* @__PURE__ */ r("slot", { name: t.slot }) }) : /* @__PURE__ */ r("span", { class: "label", children: t.label }),
                        t.shortcut && /* @__PURE__ */ r("span", { class: "shortcut", children: t.shortcut })
                      ]
                    },
                    t.slot || t.value || t.label
                  );
                })
              ] }, e || "_"))
            ] }),
            /* @__PURE__ */ r("div", { class: C ? "footer" : "footer is-empty", children: /* @__PURE__ */ r(
              "slot",
              {
                name: "footer",
                onslotchange: (e) => A(e.target.assignedNodes().length > 0)
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
      items: { type: Array },
      placeholder: String,
      emptyText: String,
      select: f({ bubbles: !0, composed: !0 }),
      open: f({ bubbles: !0, composed: !0 }),
      close: f({ bubbles: !0, composed: !0 })
    },
    styles: [F, T]
  }
), W = I(
  () => /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("slot", {}) }),
  {
    props: {
      value: { type: String, reflect: !0 },
      label: { type: String, reflect: !0 },
      group: { type: String, reflect: !0 },
      shortcut: { type: String, reflect: !0 },
      keywords: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: S`
			:host {
				display: inline-flex;
				align-items: center;
				gap: var(--space-2-5);
				min-width: 0;
			}
		`
  }
);
export {
  W as Z,
  J as a
};
