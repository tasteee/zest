import { c as w, a as k, e as F, u as z, f as B, b as C, g as H, j as n } from "./define-element-BZUk-KLk.js";
import { i as L } from "./interaction-styles-XiKFAbWA.js";
import { u as T } from "./use-prop-C0_HeSQ9.js";
import { u as Z } from "./hooks-DEFT8qqt.js";
import { o as N } from "./prop-types-B3Bpi956.js";
import { u as q, h as E } from "./child-items-CYeHgkFR.js";
const I = w`
	:host {
		display: block;
		--accent: var(--primary);
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.list {
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		gap: 0.25rem;
		border-bottom: 1px solid var(--border);
		user-select: none;
		-webkit-user-select: none;
	}

	:host([is-fitted]) .list {
		gap: 0;
	}

	.tab {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background: transparent;
		border: 0;
		padding: 0.75rem 1rem;
		margin-bottom: -1px;
		font-family: inherit;
		font-size: var(--font-size-small);
		font-weight: 500;
		color: var(--muted-foreground);
		cursor: pointer;
		white-space: nowrap;
		border-bottom: 2px solid transparent;
		transition:
			color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter);
	}

	:host([is-fitted]) .tab {
		flex: 1;
	}

	.tab:hover {
		color: var(--foreground);
	}

	.tab.is-active {
		color: var(--accent);
		border-bottom-color: var(--accent);
	}

	.tab:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: -2px;
		border-radius: var(--radius-sm);
	}

	.tab:disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.panel {
		padding-top: 1.25rem;
		color: var(--foreground);
	}
`, U = k(
  (d) => {
    const p = z(), i = B(), [D, x] = T("value");
    C(() => {
      var e, t;
      i.current !== void 0 && ((t = (e = p.current.shadowRoot) == null ? void 0 : e.querySelector(`#tab-${i.current}`)) == null || t.focus(), i.current = void 0);
    });
    const [A, S] = Z([]), P = q("z-tab", ["is-disabled"]).map((e) => ({
      value: e.value,
      label: e.label,
      isDisabled: E(e, "is-disabled"),
      slot: e.slot
    })), R = Array.isArray(d.tabs) ? d.tabs : [], o = [...P, ...R], v = o.find((e) => e.value === D && !e.isDisabled), b = o.find((e) => !e.isDisabled), c = (v == null ? void 0 : v.value) ?? (b == null ? void 0 : b.value), m = (e) => {
      e.isDisabled || e.value === c || (x(e.value), d.change({ value: e.value }));
    }, h = () => getComputedStyle(p.current).direction === "rtl", $ = (e, t) => {
      var f, y;
      const r = h() ? "ArrowLeft" : "ArrowRight", a = h() ? "ArrowRight" : "ArrowLeft";
      let s = t, l = 1;
      if (e.key === r) s = t + 1;
      else if (e.key === a)
        s = t - 1, l = -1;
      else if (e.key === "Home") s = 0;
      else if (e.key === "End")
        s = o.length - 1, l = -1;
      else return;
      e.preventDefault();
      for (let g = 0; g < o.length; g++) {
        const u = (s % o.length + o.length) % o.length;
        if (!o[u].isDisabled) {
          i.current = u, m(o[u]), o[u].value === c && ((y = (f = p.current.shadowRoot) == null ? void 0 : f.querySelector(`#tab-${u}`)) == null || y.focus(), i.current = void 0);
          break;
        }
        s += l;
      }
    }, j = (e, t) => {
      const a = t.target.assignedNodes().length > 0;
      S((s) => {
        const l = s.filter((f) => f !== e);
        return a ? [...l, e] : l;
      });
    };
    return /* @__PURE__ */ H("host", { shadowDom: !0, children: [
      /* @__PURE__ */ n("div", { class: "list", role: "tablist", "aria-label": d.label, children: o.map((e, t) => {
        const r = e.value === c;
        return /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            class: r ? "tab is-active" : "tab",
            role: "tab",
            id: `tab-${t}`,
            "aria-controls": `panel-${t}`,
            "aria-selected": r ? "true" : "false",
            tabindex: r ? "0" : "-1",
            disabled: e.isDisabled,
            onclick: () => {
              e.value !== c && (i.current = t), m(e);
            },
            onkeydown: (a) => $(a, t),
            children: e.slot ? /* @__PURE__ */ n("slot", { name: e.slot }) : e.label
          },
          e.value
        );
      }) }, "tablist"),
      o.map((e, t) => {
        const r = e.value === c, a = A.includes(e.value), s = r && a;
        return /* @__PURE__ */ n(
          "div",
          {
            id: `panel-${t}`,
            class: "panel",
            role: a ? "tabpanel" : void 0,
            "aria-labelledby": `tab-${t}`,
            tabindex: s ? "0" : void 0,
            hidden: !s,
            children: /* @__PURE__ */ n("slot", { name: e.value, onslotchange: (l) => j(e.value, l) })
          },
          e.value
        );
      })
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      label: String,
      tabs: { type: Array },
      tone: { type: N("primary", "secondary", "tertiary"), reflect: !0 },
      isFitted: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: F({ bubbles: !0, composed: !0 })
    },
    styles: [I, L]
  }
), V = k(
  () => /* @__PURE__ */ n("host", { shadowDom: !0, children: /* @__PURE__ */ n("slot", {}) }),
  {
    props: {
      value: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: w`
			:host {
				display: inline-flex;
				align-items: center;
				gap: 0.5rem;
			}
		`
  }
);
export {
  V as Z,
  U as a
};
