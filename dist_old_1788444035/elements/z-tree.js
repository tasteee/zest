import { c as $, a as z, e as b, u as H, f as k, b as S, j as m, g as I, d as K } from "../chunks/define-element-BWC3wEPr.js";
import { u as D } from "../chunks/hooks-D9_x-ckD.js";
const v = (i, d) => i.forEach((r) => {
  d(r), r.children && v(r.children, d);
}), O = (i, d, r = 0, l = []) => {
  for (const c of i) {
    const u = !!(c.children && c.children.length), o = u && d.has(c.id);
    l.push({ node: c, level: r, hasChildren: u, isOpen: o }), o && O(c.children, d, r + 1, l);
  }
  return l;
}, B = $`
	:host {
		display: block;
		font-size: var(--font-size-small);
		--indent: 1.1rem;
		--accent: var(--purple);
	}
	:host([is-hidden]) {
		display: none;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.3rem 0.5rem;
		border-radius: var(--radius-sm);
		color: var(--foreground);
		cursor: default;
		user-select: none;
		white-space: nowrap;
		outline: none;
	}
	.row:hover {
		background: color-mix(in oklch, var(--muted) 8%, transparent);
	}
	.row.is-selected {
		background: color-mix(in oklch, var(--accent) 15%, transparent);
		color: var(--foreground);
	}
	.row:focus-visible {
		box-shadow: inset 0 0 0 2px color-mix(in oklch, var(--ring) 60%, transparent);
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
		color: var(--muted-foreground);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: transform var(--duration-fast) var(--easing-standard);
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
`, F = z(
  (i) => {
    const d = H(), [r, l] = D([]), [c, u] = D([]), [o, w] = D(null), p = Array.isArray(i.items) ? i.items : [], y = k([]);
    y.current = p;
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
    const j = new Set(r), a = O(p, j), C = new Set(c), E = i.selection || "single", f = (e, n) => {
      l((t) => {
        const s = new Set(t);
        return n ? s.add(e) : s.delete(e), [...s];
      }), n ? i.expand({ id: e }) : i.collapse({ id: e });
    }, g = (e, n) => {
      if (E === "none" || e.isDisabled) return;
      let t;
      E === "multiple" && n ? (t = new Set(x.current), t.has(e.id) ? t.delete(e.id) : t.add(e.id)) : t = /* @__PURE__ */ new Set([e.id]), u([...t]), i.select({ ids: [...t], node: e });
    }, h = (e, n) => {
      let t = e;
      for (let s = 0; s < a.length && (t = Math.min(a.length - 1, Math.max(0, t + n)), !!a[t].node.isDisabled); s++)
        ;
      a[t] && w(a[t].node.id);
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
                w(a[s].node.id);
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
      const e = d.current.shadowRoot, n = e == null ? void 0 : e.querySelector(`[data-id="${CSS.escape(o)}"]`);
      n == null || n.focus();
    }, [o]), S(() => {
      const e = d.current;
      e.expand = (n) => f(n, !0), e.collapse = (n) => f(n, !1), e.expandAll = () => {
        const n = [];
        v(y.current || [], (t) => {
          var s;
          return ((s = t.children) == null ? void 0 : s.length) && n.push(t.id);
        }), l(n);
      }, e.collapseAll = () => l([]), e.select = (n) => {
        let t;
        v(y.current || [], (s) => {
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
            w(e.node.id), g(e.node, !1);
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
      selection: { type: String, reflect: !0 },
      selected: { type: Array },
      expanded: { type: Array },
      doesShowGuides: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: b({ bubbles: !0, composed: !0 }),
      expand: b({ bubbles: !0, composed: !0 }),
      collapse: b({ bubbles: !0, composed: !0 }),
      activate: b({ bubbles: !0, composed: !0 })
    },
    styles: B
  }
);
K("z-tree", F);
export {
  F as ZTree
};
