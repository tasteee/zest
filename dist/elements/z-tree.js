// @ts-self-types="./z-tree.d.ts"
import { c as $, a as z, e as b, u as H, f as k, b as S, j as m, g as I, d as K } from "../chunks/define-element-BZUk-KLk.js";
import { u as D } from "../chunks/hooks-DEFT8qqt.js";
import { o as B } from "../chunks/prop-types-B3Bpi956.js";
const v = (i, r) => i.forEach((d) => {
  r(d), d.children && v(d.children, r);
}), E = (i, r, d = 0, l = []) => {
  for (const c of i) {
    const u = !!(c.children && c.children.length), o = u && r.has(c.id);
    l.push({ node: c, level: d, hasChildren: u, isOpen: o }), o && E(c.children, r, d + 1, l);
  }
  return l;
}, F = $`
	:host {
		display: block;
		font-size: var(--font-size-sm);
		--indent: 1.1rem;
		--tone: var(--accent-secondary);
	}
	:host([is-hidden]) {
		display: none;
	}
	.row {
		display: flex;
		align-items: center;
		gap: var(--space-1-5);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		color: var(--text-primary);
		cursor: default;
		user-select: none;
		white-space: nowrap;
		outline: none;
	}
	.row:hover {
		background: color-mix(in oklch, var(--text-secondary) 8%, transparent);
	}
	.row.is-selected {
		background: color-mix(in oklch, var(--tone) 15%, transparent);
		color: var(--text-primary);
	}
	.row:focus-visible {
		box-shadow: inset 0 0 0 2px var(--border-focus);
	}
	.row.is-disabled {
		opacity: 0.45;
		pointer-events: none;
	}
	.twisty {
		flex: 0 0 auto;
		width: 1.1rem;
		height: 1.1rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: transform var(--motion-fast) var(--ease-enter);
	}
	.twisty.is-open {
		transform: rotate(90deg);
	}
	.twisty.is-leaf {
		visibility: hidden;
	}
	.icon {
		flex: 0 0 auto;
		display: inline-flex;
	}
	.label {
		overflow: hidden;
		text-overflow: ellipsis;
	}
`, L = z(
  (i) => {
    const r = H(), [d, l] = D([]), [c, u] = D([]), [o, y] = D(null), p = Array.isArray(i.items) ? i.items : [], w = k([]);
    w.current = p;
    const x = k([]);
    x.current = c;
    const A = k(!1);
    S(() => {
      if (A.current || !p.length) return;
      A.current = !0;
      const e = new Set(i.expanded || []), n = new Set(i.selected || []);
      v(p, (t) => {
        t.isExpanded && e.add(t.id), t.isSelected && n.add(t.id);
      }), l([...e]), u([...n]);
    }, [i.items]);
    const j = new Set(d), a = E(p, j), C = new Set(c), O = i.selection || "single", f = (e, n) => {
      l((t) => {
        const s = new Set(t);
        return n ? s.add(e) : s.delete(e), [...s];
      }), n ? i.expand({ id: e }) : i.collapse({ id: e });
    }, g = (e, n) => {
      if (O === "none" || e.isDisabled) return;
      let t;
      O === "multiple" && n ? (t = new Set(x.current), t.has(e.id) ? t.delete(e.id) : t.add(e.id)) : t = /* @__PURE__ */ new Set([e.id]), u([...t]), i.select({ ids: [...t], node: e });
    }, h = (e, n) => {
      let t = e;
      for (let s = 0; s < a.length && (t = Math.min(a.length - 1, Math.max(0, t + n)), !!a[t].node.isDisabled); s++)
        ;
      a[t] && y(a[t].node.id);
    }, R = (e) => {
      if (!a.length) return;
      let n = a.findIndex((s) => s.node.id === o);
      n < 0 && (n = 0);
      const t = a[n];
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault(), h(n, 1);
          break;
        case "ArrowUp":
          e.preventDefault(), h(n, -1);
          break;
        case "ArrowRight":
          e.preventDefault(), t.hasChildren && !t.isOpen ? f(t.node.id, !0) : t.hasChildren && h(n, 1);
          break;
        case "ArrowLeft":
          if (e.preventDefault(), t.hasChildren && t.isOpen) f(t.node.id, !1);
          else
            for (let s = n - 1; s >= 0; s--)
              if (a[s].level < t.level) {
                y(a[s].node.id);
                break;
              }
          break;
        case "Home":
          e.preventDefault(), h(-1, 1);
          break;
        case "End":
          e.preventDefault(), h(a.length, -1);
          break;
        case "Enter":
        case " ":
          e.preventDefault(), g(t.node, e.metaKey || e.ctrlKey), i.activate({ id: t.node.id, node: t.node });
          break;
      }
    };
    return S(() => {
      if (!o) return;
      const e = r.current.shadowRoot, n = e == null ? void 0 : e.querySelector(`[data-id="${CSS.escape(o)}"]`);
      n == null || n.focus();
    }, [o]), S(() => {
      const e = r.current;
      e.expand = (n) => f(n, !0), e.collapse = (n) => f(n, !1), e.expandAll = () => {
        const n = [];
        v(w.current || [], (t) => {
          var s;
          return ((s = t.children) == null ? void 0 : s.length) && n.push(t.id);
        }), l(n);
      }, e.collapseAll = () => l([]), e.select = (n) => {
        let t;
        v(w.current || [], (s) => {
          s.id === n && (t = s);
        }), t && g(t, !1);
      }, e.getSelection = () => [...x.current || []];
    }, []), /* @__PURE__ */ m("host", { shadowDom: !0, role: "tree", onkeydown: R, children: a.map((e) => {
      const n = e.node.id === o || o === null && e === a[0], t = ["row"];
      return C.has(e.node.id) && t.push("is-selected"), e.node.isDisabled && t.push("is-disabled"), /* @__PURE__ */ I(
        "div",
        {
          class: t.join(" "),
          "data-id": e.node.id,
          role: "treeitem",
          "aria-level": e.level + 1,
          "aria-selected": C.has(e.node.id) ? "true" : "false",
          "aria-expanded": e.hasChildren ? e.isOpen ? "true" : "false" : void 0,
          tabindex: n ? "0" : "-1",
          style: { paddingLeft: `${0.5 + e.level * 1.1}rem` },
          onclick: () => {
            y(e.node.id), g(e.node, !1);
          },
          ondblclick: () => i.activate({ id: e.node.id, node: e.node }),
          children: [
            /* @__PURE__ */ m(
              "button",
              {
                type: "button",
                class: `twisty${e.isOpen ? " is-open" : ""}${e.hasChildren ? "" : " is-leaf"}`,
                "aria-hidden": "true",
                tabindex: "-1",
                onclick: (s) => {
                  s.stopPropagation(), e.hasChildren && f(e.node.id, !e.isOpen);
                },
                children: "›"
              }
            ),
            e.node.icon && /* @__PURE__ */ m("span", { class: "icon", children: e.node.icon }),
            /* @__PURE__ */ m("span", { class: "label", children: e.node.label ?? e.node.id })
          ]
        },
        e.node.id
      );
    }) });
  },
  {
    props: {
      items: { type: Array },
      selection: { type: B("none", "single", "multiple"), reflect: !0 },
      selected: { type: Array },
      expanded: { type: Array },
      doesShowGuides: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: b({ bubbles: !0, composed: !0 }),
      expand: b({ bubbles: !0, composed: !0 }),
      collapse: b({ bubbles: !0, composed: !0 }),
      activate: b({ bubbles: !0, composed: !0 })
    },
    styles: F
  }
);
K("z-tree", L);
export {
  L as ZTree
};
