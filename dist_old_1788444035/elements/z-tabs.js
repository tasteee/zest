import { c as b, a as v, e as f, g as m, j as s, d as h } from "../chunks/define-element-BWC3wEPr.js";
import { u as y } from "../chunks/use-prop-DBBKVpkc.js";
const g = b`
	:host {
		display: block;
		--accent: var(--primary);
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

	.list {
		display: flex;
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
			color 0.12s ease,
			border-color 0.12s ease;
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
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
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
`, k = v(
  (n) => {
    const [d, u] = y("value"), t = Array.isArray(n.tabs) ? n.tabs : [], l = d || t[0] && t[0].value, i = (e) => {
      e.isDisabled || (u(e.value), n.change({ value: e.value }));
    }, p = (e, a) => {
      let r = a;
      if (e.key === "ArrowRight") r = a + 1;
      else if (e.key === "ArrowLeft") r = a - 1;
      else if (e.key === "Home") r = 0;
      else if (e.key === "End") r = t.length - 1;
      else return;
      e.preventDefault();
      for (let o = 0; o < t.length; o++) {
        const c = (r % t.length + t.length) % t.length;
        if (!t[c].isDisabled) {
          i(t[c]);
          break;
        }
        r += e.key === "ArrowLeft" ? -1 : 1;
      }
    };
    return /* @__PURE__ */ m("host", { shadowDom: !0, children: [
      /* @__PURE__ */ s("div", { class: "list", role: "tablist", children: t.map((e, a) => {
        const r = e.value === l;
        return /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            class: r ? "tab is-active" : "tab",
            role: "tab",
            "aria-selected": r ? "true" : "false",
            tabindex: r ? "0" : "-1",
            disabled: e.isDisabled,
            onclick: () => i(e),
            onkeydown: (o) => p(o, a),
            children: e.label
          },
          e.value
        );
      }) }),
      t.map(
        (e) => e.value === l ? /* @__PURE__ */ s("div", { class: "panel", role: "tabpanel", children: /* @__PURE__ */ s("slot", { name: e.value }) }, e.value) : null
      )
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      tabs: { type: Array },
      accent: { type: String, reflect: !0 },
      isFitted: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: f({ bubbles: !0, composed: !0 })
    },
    styles: g
  }
);
h("z-tabs", k);
export {
  k as ZTabs
};
