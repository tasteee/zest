// @ts-self-types="./z-context-menu.d.ts"
import { c as $, a as F, e as W, u as _, f as B, b as C, g as h, j as a, d as K } from "../chunks/define-element-BZUk-KLk.js";
import { u as y } from "../chunks/hooks-DEFT8qqt.js";
import { u as N } from "../chunks/child-items-CYeHgkFR.js";
import { m as G, r as X, a as Y, h as Z, g as q, b as J, d as Q, c as V, e as ee, f as te, i as ne, j as oe, k as se, M as ae, l as re } from "../chunks/menu-nav-BA2XeNqK.js";
import { h as ie, s as ce } from "../chunks/overlay-DCHYaOiA.js";
import { o as le } from "../chunks/prop-types-CSJu2W-0.js";
const de = $`
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
`, j = (r, g, d) => Math.max(g, Math.min(r, d)), pe = F(
  (r) => {
    const g = _(), d = B(), [b, T] = y({ x: 0, y: 0 }), [w, c] = y(!1), [i, p] = y(-1), [k, E] = y(-1), u = k >= 0, I = N(re, ae), o = [...I.map(X), ...Array.isArray(r.items) ? r.items : []], L = (e) => oe(o[e]), D = I.map((e) => e.attributes.type);
    C(() => Y(g.current, o, D), [o.length, D.join("|"), o.map((e) => `${e.type}:${e.isChecked}`).join("|")]), C(() => {
      const e = d.current;
      if (!e || !w) {
        e && ie(e);
        return;
      }
      ce(e);
      const t = 8, n = e.offsetWidth, s = e.offsetHeight, m = document.documentElement.clientWidth, R = document.documentElement.clientHeight;
      let { x: f, y: v } = b;
      f + n > m - t && (f = Math.max(t, f - n)), v + s > R - t && (v = Math.max(t, v - s)), e.style.left = `${j(f, t, m - n - t)}px`, e.style.top = `${j(v, t, R - s - t)}px`;
      const x = document.activeElement;
      e.focus({ preventScroll: !0 });
      const A = (l) => {
        l.button !== 2 && (l.composedPath().includes(e) || c(!1));
      }, z = (l) => {
        l.key === "Escape" && c(!1);
      }, S = () => c(!1);
      return document.addEventListener("pointerdown", A), document.addEventListener("keydown", z), window.addEventListener("scroll", S, !0), () => {
        document.removeEventListener("pointerdown", A), document.removeEventListener("keydown", z), window.removeEventListener("scroll", S, !0), e.matches(":focus-within") && (x == null || x.focus({ preventScroll: !0 }));
      };
    }, [w, b]);
    const P = (e) => {
      r.isDisabled || (e.preventDefault(), T({ x: e.clientX, y: e.clientY }), p(-1), c(!0));
    }, M = (e, t) => {
      e.isSeparator || e.isHeading || e.isDisabled || u || (p(t), E(t), se(() => {
        E(-1), c(!1), r.select({ value: e.value || e.label || "" });
      }));
    }, H = (e) => {
      if (!u)
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          const t = e.key === "ArrowDown" ? 1 : -1;
          let n = i;
          for (let s = 0; s < o.length && (n = (n + t + o.length) % o.length, !L(n)); s++)
            ;
          p(n);
        } else (e.key === "Enter" || e.key === " ") && i >= 0 && o[i] && (e.preventDefault(), M(o[i], i));
    }, O = Z(o), U = (e) => {
      const t = e.row, n = e.index, s = ["item"].concat(n === i ? ["is-active"] : []).concat(t.isDanger ? ["is-error"] : []).concat(t.isDisabled ? ["is-disabled"] : []).concat(n === k ? ["is-flashing"] : []).join(" "), m = t.description ? Q(n) : void 0;
      return /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          class: s,
          role: ne(t),
          "aria-checked": te(t),
          "aria-describedby": m,
          "data-index": n,
          disabled: t.isDisabled,
          onmouseenter: () => !u && p(n),
          onclick: () => M(t, n),
          children: [
            V(t, O),
            ee(t, n),
            t.shortcut && /* @__PURE__ */ a("span", { class: "shortcut", children: t.shortcut })
          ]
        },
        t.slot || t.value || t.label || n
      );
    };
    return /* @__PURE__ */ h("host", { shadowDom: !0, children: [
      /* @__PURE__ */ a("div", { class: "target", oncontextmenu: P, children: /* @__PURE__ */ a("slot", {}) }),
      /* @__PURE__ */ h(
        "div",
        {
          ref: d,
          class: u ? "panel is-committing" : "panel",
          popover: "manual",
          role: "menu",
          tabindex: "-1",
          onmousedown: (e) => e.stopPropagation(),
          onclick: (e) => e.stopPropagation(),
          onkeydown: H,
          children: [
            /* @__PURE__ */ a("div", { class: "controls", children: /* @__PURE__ */ a("slot", { name: "controls" }) }),
            q(o).map((e) => {
              if (e.type === "separator") return /* @__PURE__ */ a("div", { class: "sep", role: "separator" }, `sep-${e.index}`);
              const t = e.entries.map(U);
              if (!e.heading) return t;
              const n = J(e.heading.index);
              return /* @__PURE__ */ h("div", { role: "group", "aria-labelledby": n, children: [
                /* @__PURE__ */ a("div", { class: "heading", id: n, role: "presentation", children: e.heading.row.label }),
                t
              ] }, n);
            })
          ]
        }
      )
    ] });
  },
  {
    props: {
      items: { type: Array },
      tone: { type: le("primary", "secondary", "tertiary"), reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      select: W({ bubbles: !0, composed: !0 })
    },
    styles: [de, G]
  }
);
K("z-context-menu", pe);
export {
  pe as ZContextMenu
};
