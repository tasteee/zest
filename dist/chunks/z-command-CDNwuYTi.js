import { c as S, a as I, e as v, f as b, b as g, g as i, j as t } from "./define-element-BZUk-KLk.js";
import { u as O } from "./use-prop-C0_HeSQ9.js";
import { u as h } from "./hooks-DEFT8qqt.js";
import { u as q, h as B } from "./child-items-CYeHgkFR.js";
import { t as F } from "./scrollbar-styles-Csqxxw2V.js";
import { i as Z, o as $, c as M } from "./modal-Be8jZ8Jc.js";
import { u as P } from "./locale-DUDaH1Ni.js";
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
		background: var(--popover);
		color: var(--popover-foreground);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
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
		background: color-mix(in oklch, var(--background) 55%, transparent);
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
		gap: 0.75rem;
		padding: 0.5rem 0.875rem;
		border-top: 1px solid var(--border);
		color: var(--muted-foreground);
		font-size: var(--font-size-caption);
	}

	.footer.is-empty {
		display: none;
	}

	.search {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.875rem 1rem;
		border-bottom: 1px solid var(--border);
	}

	.search svg {
		width: 1.125rem;
		height: 1.125rem;
		flex-shrink: 0;
		color: var(--muted-foreground);
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
		color: var(--foreground);
		font-family: inherit;
		font-size: var(--font-size-body);
	}

	.search input::placeholder {
		color: var(--muted-foreground);
		user-select: none;
		-webkit-user-select: none;
	}

	.list {
		overflow-y: auto;
		padding: 0.375rem;
	}

	.group-label {
		padding: 0.5rem 0.625rem 0.25rem;
		font-size: var(--font-size-caption);
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.625rem;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-small);
		color: var(--foreground);
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
		background: color-mix(in oklch, var(--accent, var(--primary)) 14%, transparent);
		color: var(--accent, var(--primary));
	}

	.item.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.label {
		flex: 1;
	}

	.shortcut {
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
	}

	.empty {
		padding: 1.5rem;
		text-align: center;
		color: var(--muted-foreground);
		font-size: var(--font-size-small);
	}
`, J = I(
  (s) => {
    const c = P(), d = b(), y = b(), x = b(), [m, l] = O("isOpen"), [k, w] = h(""), [n, u] = h(0), [C, A] = h(!1), E = [...q("z-command-item", ["group", "shortcut", "keywords", "is-disabled"]).map(
      (e) => ({
        value: e.value,
        label: e.label,
        group: e.attributes.group || void 0,
        shortcut: e.attributes.shortcut || void 0,
        keywords: e.attributes.keywords || void 0,
        isDisabled: B(e, "is-disabled"),
        slot: e.slot
      })
    ), ...Array.isArray(s.items) ? s.items : []], z = k.trim().toLowerCase(), o = E.filter((e) => !z || `${e.label} ${e.keywords || ""}`.toLowerCase().includes(z)), f = [];
    o.forEach((e) => {
      const r = e.group || "";
      f.includes(r) || f.push(r);
    }), g(() => {
      var r;
      const e = d.current;
      if (e)
        if (m) {
          if (!$(e)) return;
          w(""), u(0), (r = y.current) == null || r.focus(), s.open();
        } else
          M(e);
    }, [m]), g(() => {
      const e = d.current;
      if (!e) return;
      const r = () => {
        m && l(!1), s.close();
      };
      return e.addEventListener("close", r), () => e.removeEventListener("close", r);
    }, [m]), g(() => {
      var r;
      const e = (r = x.current) == null ? void 0 : r.querySelector(`[data-index="${n}"]`);
      e == null || e.scrollIntoView({ block: "nearest" });
    }, [n]);
    const j = (e) => o[e] && !o[e].isDisabled, D = (e) => {
      e.isDisabled || (l(!1), s.select({ value: e.value || e.label }));
    }, L = (e) => {
      w(e.target.value), u(0);
    }, R = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const r = e.key === "ArrowDown" ? 1 : -1;
        let a = n;
        for (let p = 0; p < o.length && (a = (a + r + o.length) % o.length, !j(a)); p++)
          ;
        u(a);
      } else e.key === "Enter" && (e.preventDefault(), o[n] && D(o[n]));
    };
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ t("div", { class: "trigger", onclick: () => l(!0), children: /* @__PURE__ */ t("slot", { name: "trigger" }) }),
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
                /* @__PURE__ */ t("circle", { cx: "11", cy: "11", r: "7" }),
                /* @__PURE__ */ t("line", { x1: "21", y1: "21", x2: "16.5", y2: "16.5" })
              ] }),
              /* @__PURE__ */ t(
                "input",
                {
                  ref: y,
                  type: "text",
                  placeholder: s.placeholder || c("commandPlaceholder"),
                  value: k,
                  oninput: L,
                  onkeydown: R,
                  "aria-label": c("commandSearch")
                }
              )
            ] }),
            /* @__PURE__ */ i("div", { class: "list", ref: x, role: "listbox", "aria-label": c("commandResults"), children: [
              o.length === 0 && /* @__PURE__ */ t("div", { class: "empty", children: /* @__PURE__ */ t("slot", { name: "empty", children: s.emptyText || c("commandEmpty") }) }),
              f.map((e) => /* @__PURE__ */ i("div", { role: "group", children: [
                e && /* @__PURE__ */ t("div", { class: "group-label", children: e }),
                o.map((r, a) => {
                  if ((r.group || "") !== e) return null;
                  const p = ["item"].concat(a === n ? ["is-active"] : []).concat(r.isDisabled ? ["is-disabled"] : []).join(" ");
                  return /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      class: p,
                      role: "option",
                      "aria-selected": a === n ? "true" : "false",
                      "data-index": a,
                      disabled: r.isDisabled,
                      onmousemove: () => u(a),
                      onclick: () => D(r),
                      children: [
                        r.slot ? /* @__PURE__ */ t("span", { class: "label", children: /* @__PURE__ */ t("slot", { name: r.slot }) }) : /* @__PURE__ */ t("span", { class: "label", children: r.label }),
                        r.shortcut && /* @__PURE__ */ t("span", { class: "shortcut", children: r.shortcut })
                      ]
                    },
                    r.slot || r.value || r.label
                  );
                })
              ] }, e || "_"))
            ] }),
            /* @__PURE__ */ t("div", { class: C ? "footer" : "footer is-empty", children: /* @__PURE__ */ t(
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
      select: v({ bubbles: !0, composed: !0 }),
      open: v({ bubbles: !0, composed: !0 }),
      close: v({ bubbles: !0, composed: !0 })
    },
    styles: [F, T]
  }
), W = I(
  () => /* @__PURE__ */ t("host", { shadowDom: !0, children: /* @__PURE__ */ t("slot", {}) }),
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
				gap: 0.625rem;
				min-width: 0;
			}
		`
  }
);
export {
  W as Z,
  J as a
};
