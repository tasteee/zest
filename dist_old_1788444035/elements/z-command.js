import { c as S, a as j, e as p, f as b, b as g, g as l, j as n, d as I } from "../chunks/define-element-BWC3wEPr.js";
import { u as L } from "../chunks/use-prop-DBBKVpkc.js";
import { u as z } from "../chunks/hooks-D9_x-ckD.js";
import { t as O } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const R = S`
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

	.command::backdrop {
		background: color-mix(in oklch, var(--background) 55%, transparent);
		backdrop-filter: blur(3px);
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
		text-align: left;
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
`, q = j(
  (s) => {
    const c = b(), v = b(), h = b(), [i, d] = L("isOpen"), [y, x] = z(""), [a, u] = z(0), D = Array.isArray(s.items) ? s.items : [], k = y.trim().toLowerCase(), o = D.filter((e) => !k || `${e.label} ${e.keywords || ""}`.toLowerCase().includes(k)), f = [];
    o.forEach((e) => {
      const r = e.group || "";
      f.includes(r) || f.push(r);
    }), g(() => {
      var r;
      const e = c.current;
      e && (i && !e.open ? (e.showModal(), x(""), u(0), (r = v.current) == null || r.focus(), s.open()) : !i && e.open && e.close());
    }, [i]), g(() => {
      const e = c.current;
      if (!e) return;
      const r = () => {
        i && d(!1), s.close();
      };
      return e.addEventListener("close", r), () => e.removeEventListener("close", r);
    }, [i]), g(() => {
      var r;
      const e = (r = h.current) == null ? void 0 : r.querySelector(`[data-index="${a}"]`);
      e == null || e.scrollIntoView({ block: "nearest" });
    }, [a]);
    const A = (e) => o[e] && !o[e].isDisabled, w = (e) => {
      e.isDisabled || (d(!1), s.select({ value: e.value || e.label }));
    }, C = (e) => {
      x(e.target.value), u(0);
    }, E = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const r = e.key === "ArrowDown" ? 1 : -1;
        let t = a;
        for (let m = 0; m < o.length && (t = (t + r + o.length) % o.length, !A(t)); m++)
          ;
        u(t);
      } else e.key === "Enter" && (e.preventDefault(), o[a] && w(o[a]));
    };
    return /* @__PURE__ */ l("host", { shadowDom: !0, style: { "--accent": "var(--purple)" }, children: [
      /* @__PURE__ */ n("div", { class: "trigger", onclick: () => d(!0), children: /* @__PURE__ */ n("slot", { name: "trigger" }) }),
      /* @__PURE__ */ l(
        "dialog",
        {
          class: "command",
          ref: c,
          onclick: (e) => {
            e.target === c.current && d(!1);
          },
          children: [
            /* @__PURE__ */ l("div", { class: "search", children: [
              /* @__PURE__ */ l("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
                /* @__PURE__ */ n("circle", { cx: "11", cy: "11", r: "7" }),
                /* @__PURE__ */ n("line", { x1: "21", y1: "21", x2: "16.5", y2: "16.5" })
              ] }),
              /* @__PURE__ */ n(
                "input",
                {
                  ref: v,
                  type: "text",
                  placeholder: s.placeholder || "Type a command or search…",
                  value: y,
                  oninput: C,
                  onkeydown: E,
                  "aria-label": "Command search"
                }
              )
            ] }),
            /* @__PURE__ */ l("div", { class: "list", ref: h, role: "listbox", children: [
              o.length === 0 && /* @__PURE__ */ n("div", { class: "empty", children: s.emptyText || "No results found." }),
              f.map((e) => /* @__PURE__ */ l("div", { role: "group", children: [
                e && /* @__PURE__ */ n("div", { class: "group-label", children: e }),
                o.map((r, t) => {
                  if ((r.group || "") !== e) return null;
                  const m = ["item"].concat(t === a ? ["is-active"] : []).concat(r.isDisabled ? ["is-disabled"] : []).join(" ");
                  return /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      class: m,
                      role: "option",
                      "aria-selected": t === a ? "true" : "false",
                      "data-index": t,
                      disabled: r.isDisabled,
                      onmousemove: () => u(t),
                      onclick: () => w(r),
                      children: [
                        /* @__PURE__ */ n("span", { class: "label", children: r.label }),
                        r.shortcut && /* @__PURE__ */ n("span", { class: "shortcut", children: r.shortcut })
                      ]
                    },
                    r.value || r.label
                  );
                })
              ] }, e || "_"))
            ] })
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
      select: p({ bubbles: !0, composed: !0 }),
      open: p({ bubbles: !0, composed: !0 }),
      close: p({ bubbles: !0, composed: !0 })
    },
    styles: [O, R]
  }
);
I("z-command", q);
export {
  q as ZCommand
};
