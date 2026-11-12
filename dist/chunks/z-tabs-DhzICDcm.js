import { c as w, a as x, e as F, u as z, f as B, b as C, g as H, j as l } from "./define-element-BZUk-KLk.js";
import { i as L } from "./interaction-styles-C6mMacCu.js";
import { u as T } from "./use-prop-C0_HeSQ9.js";
import { u as Z } from "./hooks-DEFT8qqt.js";
import { o as N } from "./prop-types-B3Bpi956.js";
import { u as q, h as E } from "./child-items-CYeHgkFR.js";
const I = w`
	:host {
		display: block;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	.list {
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		gap: var(--space-1);
		border-bottom: 1px solid var(--border-default);
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
		gap: var(--space-2);
		background: transparent;
		border: 0;
		padding: var(--space-3) var(--space-4);
		margin-bottom: -1px;
		font-family: inherit;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
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
		color: var(--text-primary);
	}

	.tab.is-active {
		color: var(--tone);
		border-bottom-color: var(--tone);
	}

	.tab:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: -2px;
		border-radius: var(--radius-sm);
	}

	.tab:disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.panel {
		padding-top: var(--space-5);
		color: var(--text-primary);
	}
`, U = x(
  (u) => {
    const p = z(), i = B(), [k, D] = T("value");
    C(() => {
      var e, t;
      i.current !== void 0 && ((t = (e = p.current.shadowRoot) == null ? void 0 : e.querySelector(`#tab-${i.current}`)) == null || t.focus(), i.current = void 0);
    });
    const [A, S] = Z([]), P = q("z-tab", ["is-disabled"]).map((e) => ({
      value: e.value,
      label: e.label,
      isDisabled: E(e, "is-disabled"),
      slot: e.slot
    })), R = Array.isArray(u.tabs) ? u.tabs : [], s = [...P, ...R], f = s.find((e) => e.value === k && !e.isDisabled), b = s.find((e) => !e.isDisabled), c = (f == null ? void 0 : f.value) ?? (b == null ? void 0 : b.value), y = (e) => {
      e.isDisabled || e.value === c || (D(e.value), u.change({ value: e.value }));
    }, h = () => getComputedStyle(p.current).direction === "rtl", $ = (e, t) => {
      var v, m;
      const a = h() ? "ArrowLeft" : "ArrowRight", r = h() ? "ArrowRight" : "ArrowLeft";
      let o = t, n = 1;
      if (e.key === a) o = t + 1;
      else if (e.key === r)
        o = t - 1, n = -1;
      else if (e.key === "Home") o = 0;
      else if (e.key === "End")
        o = s.length - 1, n = -1;
      else return;
      e.preventDefault();
      for (let g = 0; g < s.length; g++) {
        const d = (o % s.length + s.length) % s.length;
        if (!s[d].isDisabled) {
          i.current = d, y(s[d]), s[d].value === c && ((m = (v = p.current.shadowRoot) == null ? void 0 : v.querySelector(`#tab-${d}`)) == null || m.focus(), i.current = void 0);
          break;
        }
        o += n;
      }
    }, j = (e, t) => {
      const r = t.target.assignedNodes().length > 0;
      S((o) => {
        const n = o.filter((v) => v !== e);
        return r ? [...n, e] : n;
      });
    };
    return /* @__PURE__ */ H("host", { shadowDom: !0, children: [
      /* @__PURE__ */ l("div", { class: "list", role: "tablist", "aria-label": u.label, children: s.map((e, t) => {
        const a = e.value === c;
        return /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            class: a ? "tab is-active" : "tab",
            role: "tab",
            id: `tab-${t}`,
            "aria-controls": `panel-${t}`,
            "aria-selected": a ? "true" : "false",
            tabindex: a ? "0" : "-1",
            disabled: e.isDisabled,
            onclick: () => {
              e.value !== c && (i.current = t), y(e);
            },
            onkeydown: (r) => $(r, t),
            children: e.slot ? /* @__PURE__ */ l("slot", { name: e.slot }) : e.label
          },
          e.value
        );
      }) }, "tablist"),
      s.map((e, t) => {
        const a = e.value === c, r = A.includes(e.value), o = a && r;
        return /* @__PURE__ */ l(
          "div",
          {
            id: `panel-${t}`,
            class: "panel",
            role: r ? "tabpanel" : void 0,
            "aria-labelledby": `tab-${t}`,
            tabindex: o ? "0" : void 0,
            hidden: !o,
            children: /* @__PURE__ */ l("slot", { name: e.value, onslotchange: (n) => j(e.value, n) })
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
), V = x(
  () => /* @__PURE__ */ l("host", { shadowDom: !0, children: /* @__PURE__ */ l("slot", {}) }),
  {
    props: {
      value: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 }
    },
    styles: w`
			:host {
				display: inline-flex;
				align-items: center;
				gap: var(--space-2);
			}
		`
  }
);
export {
  V as Z,
  U as a
};
