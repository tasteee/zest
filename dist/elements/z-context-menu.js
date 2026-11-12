// @ts-self-types="./z-context-menu.d.ts"
import { c as j, a as C, e as H, u as K, f as O, b as $, g as b, j as s, d as R } from "../chunks/define-element-BZUk-KLk.js";
import { u as h } from "../chunks/hooks-DEFT8qqt.js";
import { u as U, h as M } from "../chunks/child-items-CYeHgkFR.js";
import { f as W } from "../chunks/menu-nav-DEHIcWKa.js";
import { h as B, s as T } from "../chunks/overlay-CFiufx65.js";
import { o as X } from "../chunks/prop-types-B3Bpi956.js";
const Y = j`
	:host {
		display: contents;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	.target {
		display: contents;
	}

	.panel {
		position: fixed;
		left: 0;
		top: 0;
		margin: 0;
		z-index: var(--z-menu);
		min-width: 12rem;
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-1-5);
		transform-origin: top left;
		opacity: 0;
		scale: var(--motion-scale-from);
		transition:
			opacity var(--motion-exit-fast) var(--ease-exit),
			scale var(--motion-exit-fast) var(--ease-exit);
	}

	.panel[data-state='open'] {
		opacity: 1;
		scale: 1;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			scale var(--motion-fast) var(--ease-enter);
	}

	.panel.is-committing {
		pointer-events: none;
	}

	.item.is-flashing {
		animation: z-menu-flash 200ms step-end;
	}

	@keyframes z-menu-flash {
		0%,
		50% {
			background: color-mix(in oklch, var(--tone) 14%, transparent);
		}
		25%,
		75% {
			background: transparent;
		}
	}

	/* The Popover API hides a closed popover via a UA display:none rule; setting
	   an author display value would override it and keep the panel always visible,
	   so the flex layout is only applied once the popover is actually open. */
	.panel:focus {
		outline: none;
	}

	.panel:popover-open {
		display: flex;
		flex-direction: column;
		gap: 1px;
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
		white-space: nowrap;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: start;
		width: 100%;
		box-sizing: border-box;
	}

	.item.is-active {
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		color: var(--tone);
	}

	.item.is-error {
		color: var(--status-danger);
	}
	.item.is-error.is-active {
		background: color-mix(in oklch, var(--status-danger) 14%, transparent);
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

	.sep {
		height: 1px;
		margin: var(--space-1-5) 0;
		background: var(--border-default);
	}

	.controls {
		display: contents;
	}

	::slotted([slot='controls']) {
		display: flex;
		flex-direction: column;
		gap: var(--space-2-5);
		min-width: 15rem;
		padding: var(--space-2);
	}

	::slotted([slot='controls']:not(:only-child)) {
		margin-bottom: var(--space-1-5);
	}
`, S = (n, d, p) => Math.max(d, Math.min(n, p)), Z = C(
  (n) => {
    K();
    const d = O(), [p, L] = h({ x: 0, y: 0 }), [g, l] = h(!1), [r, u] = h(-1), [x, w] = h(-1), m = x >= 0, a = [...U(
      ["z-menu-item", "z-menu-separator"],
      ["shortcut", "is-disabled", "is-danger"]
    ).map(
      (e) => e.tag === "z-menu-separator" ? { isSeparator: !0 } : {
        value: e.value,
        label: e.label,
        shortcut: e.attributes.shortcut || void 0,
        isDisabled: M(e, "is-disabled"),
        isDanger: M(e, "is-danger"),
        slot: e.slot
      }
    ), ...Array.isArray(n.items) ? n.items : []], P = (e) => a[e] && !a[e].isSeparator && !a[e].isDisabled;
    $(() => {
      const e = d.current;
      if (!e || !g) {
        e && B(e);
        return;
      }
      T(e);
      const t = 8, o = e.offsetWidth, i = e.offsetHeight, D = document.documentElement.clientWidth, z = document.documentElement.clientHeight;
      let { x: f, y: v } = p;
      f + o > D - t && (f = Math.max(t, f - o)), v + i > z - t && (v = Math.max(t, v - i)), e.style.left = `${S(f, t, D - o - t)}px`, e.style.top = `${S(v, t, z - i - t)}px`;
      const y = document.activeElement;
      e.focus({ preventScroll: !0 });
      const E = (c) => {
        c.button !== 2 && (c.composedPath().includes(e) || l(!1));
      }, I = (c) => {
        c.key === "Escape" && l(!1);
      }, A = () => l(!1);
      return document.addEventListener("pointerdown", E), document.addEventListener("keydown", I), window.addEventListener("scroll", A, !0), () => {
        document.removeEventListener("pointerdown", E), document.removeEventListener("keydown", I), window.removeEventListener("scroll", A, !0), e.matches(":focus-within") && (y == null || y.focus({ preventScroll: !0 }));
      };
    }, [g, p]);
    const F = (e) => {
      n.isDisabled || (e.preventDefault(), L({ x: e.clientX, y: e.clientY }), u(-1), l(!0));
    }, k = (e, t) => {
      e.isSeparator || e.isDisabled || m || (u(t), w(t), W(() => {
        w(-1), l(!1), n.select({ value: e.value || e.label || "" });
      }));
    };
    return /* @__PURE__ */ b("host", { shadowDom: !0, children: [
      /* @__PURE__ */ s("div", { class: "target", oncontextmenu: F, children: /* @__PURE__ */ s("slot", {}) }),
      /* @__PURE__ */ b(
        "div",
        {
          ref: d,
          class: m ? "panel is-committing" : "panel",
          popover: "manual",
          role: "menu",
          tabindex: "-1",
          onmousedown: (e) => e.stopPropagation(),
          onclick: (e) => e.stopPropagation(),
          onkeydown: (e) => {
            if (!m)
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const t = e.key === "ArrowDown" ? 1 : -1;
                let o = r;
                for (let i = 0; i < a.length && (o = (o + t + a.length) % a.length, !P(o)); i++)
                  ;
                u(o);
              } else (e.key === "Enter" || e.key === " ") && r >= 0 && a[r] && (e.preventDefault(), k(a[r], r));
          },
          children: [
            /* @__PURE__ */ s("div", { class: "controls", children: /* @__PURE__ */ s("slot", { name: "controls" }) }),
            a.map((e, t) => {
              if (e.isSeparator) return /* @__PURE__ */ s("div", { class: "sep", role: "separator" }, `sep-${t}`);
              const o = ["item"].concat(t === r ? ["is-active"] : []).concat(e.isDanger ? ["is-error"] : []).concat(e.isDisabled ? ["is-disabled"] : []).concat(t === x ? ["is-flashing"] : []).join(" ");
              return /* @__PURE__ */ b(
                "button",
                {
                  type: "button",
                  class: o,
                  role: "menuitem",
                  "data-index": t,
                  disabled: e.isDisabled,
                  onmouseenter: () => !m && u(t),
                  onclick: () => k(e, t),
                  children: [
                    /* @__PURE__ */ s("span", { class: "label", children: e.slot ? /* @__PURE__ */ s("slot", { name: e.slot }) : e.label }),
                    e.shortcut && /* @__PURE__ */ s("span", { class: "shortcut", children: e.shortcut })
                  ]
                },
                e.slot || e.value || e.label || t
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
      tone: { type: X("primary", "secondary", "tertiary"), reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      select: H({ bubbles: !0, composed: !0 })
    },
    styles: Y
  }
);
R("z-context-menu", Z);
export {
  Z as ZContextMenu
};
