import { c as M, a as L, e as S, u as j, f as I, b as H, g as v, j as r, d as K } from "../chunks/define-element-BWC3wEPr.js";
import { u as h } from "../chunks/hooks-D9_x-ckD.js";
const $ = M`
	:host {
		display: contents;
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}
	:host([accent='sub']) {
		--accent: var(--pink);
	}

	.target {
		display: contents;
	}

	.panel {
		position: fixed;
		left: 0;
		top: 0;
		margin: 0;
		z-index: 50;
		min-width: 12rem;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
		--accent: var(--primary);
	}

	/* The Popover API hides a closed popover via a UA display:none rule; setting
	   an author display value would override it and keep the panel always visible,
	   so the flex layout is only applied once the popover is actually open. */
	.panel:popover-open {
		display: flex;
		flex-direction: column;
		gap: 1px;
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
		white-space: nowrap;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: left;
		width: 100%;
		box-sizing: border-box;
	}

	.item.is-active {
		background: color-mix(in oklch, var(--accent) 14%, transparent);
		color: var(--accent);
	}

	.item.is-error {
		color: var(--destructive);
	}
	.item.is-error.is-active {
		background: color-mix(in oklch, var(--destructive) 14%, transparent);
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

	.sep {
		height: 1px;
		margin: 0.3125rem 0;
		background: var(--border);
	}

	.controls {
		display: contents;
	}

	::slotted([slot='controls']) {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		min-width: 15rem;
		padding: 0.5rem;
	}

	::slotted([slot='controls']:not(:only-child)) {
		margin-bottom: 0.3125rem;
	}
`, E = (s, c, d) => Math.max(c, Math.min(s, d)), O = L(
  (s) => {
    j();
    const c = I(), [d, A] = h({ x: 0, y: 0 }), [y, i] = h(!1), [l, f] = h(-1), n = Array.isArray(s.items) ? s.items : [], P = (e) => n[e] && !n[e].isSeparator && !n[e].isDisabled;
    H(() => {
      const e = c.current;
      if (!e || !y) {
        e && e.matches(":popover-open") && e.hidePopover();
        return;
      }
      e.matches(":popover-open") || e.showPopover();
      const t = 8, o = e.offsetWidth, a = e.offsetHeight, g = document.documentElement.clientWidth, x = document.documentElement.clientHeight;
      let { x: p, y: u } = d;
      p + o > g - t && (p = Math.max(t, p - o)), u + a > x - t && (u = Math.max(t, u - a)), e.style.left = `${E(p, t, g - o - t)}px`, e.style.top = `${E(u, t, x - a - t)}px`;
      const w = (m) => {
        m.button !== 2 && (m.composedPath().includes(e) || i(!1));
      }, k = (m) => {
        m.key === "Escape" && i(!1);
      }, D = () => i(!1);
      return document.addEventListener("pointerdown", w), document.addEventListener("keydown", k), window.addEventListener("scroll", D, !0), () => {
        document.removeEventListener("pointerdown", w), document.removeEventListener("keydown", k), window.removeEventListener("scroll", D, !0);
      };
    }, [y, d]);
    const z = (e) => {
      s.isDisabled || (e.preventDefault(), A({ x: e.clientX, y: e.clientY }), f(-1), i(!0));
    }, b = (e) => {
      e.isSeparator || e.isDisabled || (i(!1), s.select({ value: e.value || e.label || "" }));
    };
    return /* @__PURE__ */ v("host", { shadowDom: !0, children: [
      /* @__PURE__ */ r("div", { class: "target", oncontextmenu: z, children: /* @__PURE__ */ r("slot", {}) }),
      /* @__PURE__ */ v(
        "div",
        {
          ref: c,
          class: "panel",
          popover: "manual",
          role: "menu",
          onmousedown: (e) => e.stopPropagation(),
          onclick: (e) => e.stopPropagation(),
          onkeydown: (e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              const t = e.key === "ArrowDown" ? 1 : -1;
              let o = l;
              for (let a = 0; a < n.length && (o = (o + t + n.length) % n.length, !P(o)); a++)
                ;
              f(o);
            } else (e.key === "Enter" || e.key === " ") && l >= 0 && n[l] && (e.preventDefault(), b(n[l]));
          },
          children: [
            /* @__PURE__ */ r("div", { class: "controls", children: /* @__PURE__ */ r("slot", { name: "controls" }) }),
            n.map((e, t) => {
              if (e.isSeparator) return /* @__PURE__ */ r("div", { class: "sep", role: "separator" }, `sep-${t}`);
              const o = ["item"].concat(t === l ? ["is-active"] : []).concat(e.isDanger ? ["is-error"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
              return /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  class: o,
                  role: "menuitem",
                  disabled: e.isDisabled,
                  onmouseenter: () => f(t),
                  onclick: () => b(e),
                  children: [
                    /* @__PURE__ */ r("span", { class: "label", children: e.label }),
                    e.shortcut && /* @__PURE__ */ r("span", { class: "shortcut", children: e.shortcut })
                  ]
                },
                e.value || e.label || t
              );
            })
          ]
        }
      )
    ] });
  },
  {
    props: {
      items: { type: Array },
      accent: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      select: S({ bubbles: !0, composed: !0 })
    },
    styles: $
  }
);
K("z-context-menu", O);
export {
  O as ZContextMenu
};
