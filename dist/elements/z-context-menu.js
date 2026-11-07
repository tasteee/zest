import { c as j, a as C, e as H, u as K, f as O, b as $, g as b, j as s, d as R } from "../chunks/define-element-BZUk-KLk.js";
import { u as h } from "../chunks/hooks-DEFT8qqt.js";
import { u as U, h as M } from "../chunks/child-items-CYeHgkFR.js";
import { f as W } from "../chunks/menu-nav-DEHIcWKa.js";
import { h as B, s as T } from "../chunks/overlay-BZjDggFA.js";
import { o as X } from "../chunks/prop-types-B3Bpi956.js";
const Y = j`
	:host {
		display: contents;
		--accent: var(--primary);
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}
	:host([tone='tertiary']) {
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
			background: color-mix(in oklch, var(--accent) 14%, transparent);
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
		text-align: start;
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
`, S = (a, d, p) => Math.max(d, Math.min(a, p)), Z = C(
  (a) => {
    K();
    const d = O(), [p, L] = h({ x: 0, y: 0 }), [g, l] = h(!1), [r, u] = h(-1), [x, w] = h(-1), m = x >= 0, n = [...U(
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
    ), ...Array.isArray(a.items) ? a.items : []], P = (e) => n[e] && !n[e].isSeparator && !n[e].isDisabled;
    $(() => {
      const e = d.current;
      if (!e || !g) {
        e && B(e);
        return;
      }
      T(e);
      const t = 8, o = e.offsetWidth, i = e.offsetHeight, D = document.documentElement.clientWidth, E = document.documentElement.clientHeight;
      let { x: f, y: v } = p;
      f + o > D - t && (f = Math.max(t, f - o)), v + i > E - t && (v = Math.max(t, v - i)), e.style.left = `${S(f, t, D - o - t)}px`, e.style.top = `${S(v, t, E - i - t)}px`;
      const y = document.activeElement;
      e.focus({ preventScroll: !0 });
      const z = (c) => {
        c.button !== 2 && (c.composedPath().includes(e) || l(!1));
      }, I = (c) => {
        c.key === "Escape" && l(!1);
      }, A = () => l(!1);
      return document.addEventListener("pointerdown", z), document.addEventListener("keydown", I), window.addEventListener("scroll", A, !0), () => {
        document.removeEventListener("pointerdown", z), document.removeEventListener("keydown", I), window.removeEventListener("scroll", A, !0), e.matches(":focus-within") && (y == null || y.focus({ preventScroll: !0 }));
      };
    }, [g, p]);
    const F = (e) => {
      a.isDisabled || (e.preventDefault(), L({ x: e.clientX, y: e.clientY }), u(-1), l(!0));
    }, k = (e, t) => {
      e.isSeparator || e.isDisabled || m || (u(t), w(t), W(() => {
        w(-1), l(!1), a.select({ value: e.value || e.label || "" });
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
                for (let i = 0; i < n.length && (o = (o + t + n.length) % n.length, !P(o)); i++)
                  ;
                u(o);
              } else (e.key === "Enter" || e.key === " ") && r >= 0 && n[r] && (e.preventDefault(), k(n[r], r));
          },
          children: [
            /* @__PURE__ */ s("div", { class: "controls", children: /* @__PURE__ */ s("slot", { name: "controls" }) }),
            n.map((e, t) => {
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
