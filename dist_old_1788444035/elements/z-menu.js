import { c as b, a as g, e as y, u as x, b as k, g as f, j as s, d as w } from "../chunks/define-element-BWC3wEPr.js";
import { u as m } from "../chunks/hooks-D9_x-ckD.js";
const D = b`
	:host {
		display: inline-flex;
		position: relative;
		--accent: var(--primary);
		user-select: none;
		-webkit-user-select: none;
	}

	:host([accent='dom']) {
		--accent: var(--purple);
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.panel {
		position: absolute;
		top: calc(100% + 6px);
		z-index: 50;
		min-width: max(12rem, 100%);
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	:host([align='end']) .panel {
		right: 0;
	}

	:host(:not([align='end'])) .panel {
		left: 0;
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
		color: var(--destructive);
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

	::slotted([slot='trigger']) {
		cursor: pointer;
	}

	.icon {
		display: inline-flex;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}
`, z = g(
  (l) => {
    const v = x(), [n, o] = m(!1), [a, c] = m(-1), t = Array.isArray(l.items) ? l.items : [], h = (e) => t[e] && !t[e].isSeparator && !t[e].isDisabled;
    k(() => {
      if (!n) return;
      const e = (r) => {
        r.composedPath().includes(v.current) || o(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [n]);
    const d = () => {
      o(!1), c(-1);
    }, u = (e) => {
      e.isSeparator || e.isDisabled || (d(), l.select({ value: e.value || e.label || "" }));
    }, p = (e) => {
      let r = a;
      for (let i = 0; i < t.length && (r = (r + e + t.length) % t.length, !h(r)); i++)
        ;
      c(r);
    };
    return /* @__PURE__ */ f("host", { shadowDom: !0, onkeydown: (e) => {
      if (e.key === "Escape") {
        d();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault(), n ? p(1) : o(!0);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault(), n ? p(-1) : o(!0);
        return;
      }
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), n ? a >= 0 && t[a] && u(t[a]) : o(!0));
    }, children: [
      /* @__PURE__ */ s(
        "div",
        {
          class: "trigger",
          "aria-haspopup": "menu",
          "aria-expanded": n ? "true" : "false",
          onclick: () => o(!n),
          children: /* @__PURE__ */ s("slot", { name: "trigger" })
        }
      ),
      n && /* @__PURE__ */ s("div", { class: "panel", role: "menu", children: t.map((e, r) => {
        if (e.isSeparator) return /* @__PURE__ */ s("div", { class: "sep", role: "separator" }, `sep-${r}`);
        const i = ["item"].concat(r === a ? ["is-active"] : []).concat(e.isDanger ? ["is-error"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
        return /* @__PURE__ */ f(
          "button",
          {
            type: "button",
            class: i,
            role: "menuitem",
            disabled: e.isDisabled,
            onmouseenter: () => c(r),
            onclick: () => u(e),
            children: [
              e.icon && /* @__PURE__ */ s("span", { class: "icon", innerHTML: e.icon }),
              /* @__PURE__ */ s("span", { class: "label", children: e.label }),
              e.shortcut && /* @__PURE__ */ s("span", { class: "shortcut", children: e.shortcut })
            ]
          },
          e.value || e.label || r
        );
      }) })
    ] });
  },
  {
    props: {
      items: { type: Array },
      align: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: y({ bubbles: !0, composed: !0 })
    },
    styles: D
  }
);
w("z-menu", z);
export {
  z as ZMenu
};
