// @ts-self-types="./z-select.d.ts"
import { c as pe, a as fe, e as he, u as ve, f as C, b as S, g as O, j as g } from "../chunks/define-element-BZUk-KLk.js";
import { i as ge } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as me, d as be } from "../chunks/form-control-B69z9f8A.js";
import { s as ye, d as we, u as xe, a as ke, b as De } from "../chunks/accessible-D6muJfYC.js";
import { u as ze } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as M } from "../chunks/hooks-DEFT8qqt.js";
import { t as Pe } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { h as W, s as X, a as Z, b as _, c as J } from "../chunks/overlay-DCHYaOiA.js";
import { o as Q } from "../chunks/prop-types-CSJu2W-0.js";
import { u as Se } from "../chunks/locale-BNhgEFKA.js";
import { r as je } from "../chunks/misuse-BkfjLjP6.js";
const Be = (r) => {
  let i = 0, n = !1;
  const l = (B) => {
    const h = [];
    for (const v of B) {
      const R = !!v.isGroup;
      if (R && !j(v)) {
        n = !0;
        continue;
      }
      if (R) {
        i += 1;
        const m = `group-${i}`;
        for (const s of l(v.children ?? [])) h.push({ ...s, groupId: m, groupLabel: v.label });
        continue;
      }
      const a = v.children ? l(v.children) : void 0;
      h.push({ ...v, children: a });
    }
    return h;
  };
  return { options: l(r), hasEmptyGroup: n };
}, Ie = (r) => {
  const i = [];
  for (const [n, l] of r.entries()) {
    const u = i[i.length - 1];
    if (!!u && u.groupId === l.groupId) {
      u.entries.push({ option: l, index: n });
      continue;
    }
    i.push({ groupId: l.groupId, groupLabel: l.groupLabel, entries: [{ option: l, index: n }] });
  }
  return i;
}, j = (r) => {
  var i;
  return !!((i = r == null ? void 0 : r.children) != null && i.length);
}, z = (r, i) => {
  let n = r, l;
  for (const u of i) {
    if (l = n == null ? void 0 : n[u], !l) return;
    n = l.children;
  }
  return l;
}, Y = (r, i) => {
  var n;
  return i.length <= 1 ? r : ((n = z(r, i.slice(0, -1))) == null ? void 0 : n.children) ?? [];
}, ee = (r, i) => {
  if (!(i == null || i === ""))
    for (let n = 0; n < r.length; n++) {
      const l = r[n];
      if (l.value === i) return [n];
      const u = l.children ? ee(l.children, i) : void 0;
      if (u) return [n, ...u];
    }
}, Ae = (r, i) => i.flatMap((n, l) => {
  var u;
  return ((u = z(r, i.slice(0, l + 1))) == null ? void 0 : u.value) ?? [];
}), L = (r) => r.flatMap((i, n) => i.isDisabled ? [] : [n]), Oe = pe`
	:host {
		display: inline-flex;
		position: relative;
		width: 100%;
		min-width: 0;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-inline]) {
		width: auto;
	}

	:host([is-hidden]) {
		display: none;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2-5);
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--z-button-group-control-radius, var(--radius-md));
		color: var(--text-primary);
		font-family: inherit;
		cursor: pointer;
		text-align: start;
		user-select: none;
		-webkit-user-select: none;
		transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}

	.trigger.is-sm {
		height: var(--control-height-sm);
		padding-inline: var(--space-3);
		font-size: var(--font-size-sm);
	}
	.trigger.is-md {
		height: var(--control-height-md);
		padding-inline: var(--space-3-5);
		font-size: var(--font-size-sm);
	}
	.trigger.is-lg {
		height: var(--control-height-lg);
		padding-inline: var(--space-4);
		font-size: var(--font-size-md);
	}

	.trigger:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.trigger.is-open {
		border-color: var(--tone);
		background: color-mix(in oklch, var(--tone) 5%, transparent);
	}

	.trigger.is-invalid {
		border-color: var(--status-danger);
	}

	.trigger.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.trigger:focus-visible {
		outline: 1px solid var(--border-focus);
		outline-offset: -1px;
	}

	.value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	.value.is-placeholder {
		color: var(--text-secondary);
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--text-secondary);
		transition: transform var(--motion-fast) var(--ease-enter);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.trigger.is-open .chevron {
		transform: rotate(180deg);
		color: var(--tone);
	}

	/* Fixed + top-layer (via [popover]) rather than absolute-in-:host, so the
	   panel escapes any scrollable ancestor (e.g. a dialog body) instead of
	   enlarging its scrollable overflow. The display property is left unset
	   here (outside :popover-open) so the UA's popover stylesheet still hides
	   it when closed — an author display declaration would out-cascade that
	   regardless of specificity, since origin wins first. See shared/overlay.ts. */
	.panel {
		position: fixed;
		box-sizing: border-box;
		margin: 0;
		/* physical: shared/overlay.ts positions the panel from measured rects */
		left: 0;
		top: 0;
		right: auto; /* physical */
		bottom: auto;
		z-index: var(--z-menu);
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-1-5);
		max-height: 16rem;
		overflow-y: auto;
		gap: 1px;
	}

	.panel:popover-open {
		display: flex;
		flex-direction: column;
	}

	.group-heading {
		padding: var(--space-2) var(--space-2-5) var(--space-1);
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		user-select: none;
	}

	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
	}

	.option.is-active {
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		color: var(--tone);
	}

	.option.is-selected,
	.option.is-ancestor {
		color: var(--tone);
		font-weight: var(--font-weight-semibold);
	}

	.levels {
		display: contents;
	}

	.panel.submenu {
		min-width: 10rem;
	}

	.branch-chevron {
		width: 0.875rem;
		height: 0.875rem;
		flex-shrink: 0;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	:host(:dir(rtl)) .branch-chevron {
		transform: scaleX(-1);
	}

	.option.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.tick {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.empty {
		padding: var(--space-2-5);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		text-align: center;
	}
`, Re = (r) => r.size === "sm" ? "is-sm" : r.size === "lg" ? "is-lg" : "is-md", Ee = fe(
  (r) => {
    const i = Se(), n = ve(), l = xe(r.label), u = C(), B = C(), [h, v] = ze("value"), R = C(h), [a, m] = M(!1), [s, y] = M([]), [te, w] = M(!1), re = Array.isArray(r.options) ? r.options : [], $ = Be(re), p = $.options;
    S(() => {
      $.hasEmptyGroup && je(n.current, "empty-group", "z-select: an option has isGroup but no children, so it is not shown.");
    }, [$.hasEmptyGroup]);
    const x = ee(p, h), G = x ? z(p, x) : void 0, oe = h != null && h !== "", { isFormDisabled: ne } = me({
      value: h ?? "",
      isDisabled: r.isDisabled,
      control: B,
      validity: r.isRequired && !oe ? { flags: { valueMissing: !0 }, message: i("selectAnItemInTheList") } : { flags: {} },
      onReset: () => v(R.current),
      onRestore: (e) => {
        typeof e == "string" && v(e);
      }
    }), k = !!r.isDisabled || ne;
    S(() => {
      if (!a) return;
      const e = (t) => {
        t.composedPath().includes(n.current) || m(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [a]), S(() => {
      const e = u.current;
      if (!e) return;
      if (!a) {
        W(e);
        return;
      }
      X(e);
      const t = () => {
        e.style.width = `${n.current.getBoundingClientRect().width}px`, _(e, J(n.current, e, { placement: "bottom-start", offset: 6, padding: 8 }));
      }, o = Z(n.current, e, t);
      return () => {
        o(), W(e);
      };
    }, [a]);
    const q = L(p), I = z(p, s), ie = s.length ? `option-${s.join("-")}` : void 0, U = () => getComputedStyle(n.current).direction === "rtl", E = [{ nodes: p, parentPath: [] }];
    if (a) {
      let e = p;
      for (let t = 0; t < s.length; t++) {
        const o = e[s[t]];
        if (!j(o) || t === s.length - 1 && !te) break;
        e = o.children, E.push({ nodes: e, parentPath: s.slice(0, t + 1) });
      }
    }
    const se = E.map((e) => e.parentPath.join("-")).join("|"), F = (e = !1) => {
      var o;
      if (k) return;
      const t = x && !((o = z(p, x)) != null && o.isDisabled) ? x : void 0;
      y(t ?? [(e ? q.at(-1) : q[0]) ?? -1]), w(!1), m(!0);
    }, V = (e, t) => {
      var o, c;
      k || e.isDisabled || j(e) || (m(!1), e.value !== h && (v(e.value), r.change({ value: e.value, path: Ae(p, t) })), (c = (o = n.current.shadowRoot) == null ? void 0 : o.querySelector(".trigger")) == null || c.focus());
    }, N = (e) => {
      const t = z(p, e);
      if (!t || t.isDisabled || !j(t)) return;
      const o = L(t.children)[0];
      y(o === void 0 ? e : [...e, o]), w(!0);
    }, T = () => {
      y(s.slice(0, -1)), w(!1);
    }, ae = (e, t) => j(e) ? N(t) : V(e, t);
    S(() => {
      k && m(!1);
    }, [k]), S(() => {
      var e, t;
      if (a) {
        if (!I || I.isDisabled) {
          y([q[0] ?? -1]);
          return;
        }
        (t = (e = n.current.shadowRoot) == null ? void 0 : e.querySelector(`#option-${s.join("-")}`)) == null || t.scrollIntoView({ block: "nearest" });
      }
    }, [a, s.join("-"), r.options]), S(() => {
      if (!a) return;
      const e = n.current.shadowRoot, t = [];
      return e == null || e.querySelectorAll(".submenu").forEach((o) => {
        const c = e.querySelector(`#${o.dataset.parent}`);
        if (!c) return;
        o.matches(":popover-open") || X(o);
        const b = U() ? "left-start" : "right-start";
        t.push(Z(c, o, () => _(o, J(c, o, { placement: b, offset: 2, padding: 8 }))));
      }), () => t.forEach((o) => o());
    }, [a, se]);
    const K = C({ text: "", time: 0 }), le = (e) => {
      if (!k) {
        if (e.key === "Tab") {
          m(!1);
          return;
        }
        if (e.key === "Escape") {
          if (!a) return;
          e.preventDefault(), e.stopPropagation(), s.length > 1 ? T() : m(!1);
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(), a ? I && ae(I, s) : F();
          return;
        }
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          if (!a) return;
          e.preventDefault(), e.key === "ArrowRight" !== U() ? N(s) : s.length > 1 && T();
          return;
        }
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
          if (e.preventDefault(), !a) {
            F(e.key === "ArrowUp" || e.key === "End");
            return;
          }
          const t = L(Y(p, s)), o = s.at(-1), c = t.indexOf(o), b = e.key === "Home" ? t[0] : e.key === "End" ? t.at(-1) : t[(c + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length];
          y([...s.slice(0, -1), b ?? -1]), w(!1);
          return;
        }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          const t = Date.now(), o = (t - K.current.time < 600 ? K.current.text : "") + e.key.toLowerCase();
          K.current = { text: o, time: t };
          const c = [...o].every((P) => P === o[0]) ? o[0] : o, b = a ? Y(p, s) : p, d = L(b), f = a ? d.indexOf(s.at(-1)) : -1, D = [...d.slice(f + 1), ...d.slice(0, f + 1)].find((P) => b[P].label.toLowerCase().startsWith(c));
          D !== void 0 && (a || m(!0), y([...a ? s.slice(0, -1) : [], D]), w(!1));
        }
      }
    }, ce = (e, t, o, c, b) => {
      var P;
      const d = [...o.parentPath, t], f = j(e), A = f && x !== void 0 && d.every((H, ue) => x[ue] === H), D = ["option"].concat(t === b ? ["is-active"] : []).concat(!f && e.value === h ? ["is-selected"] : []).concat(A ? ["is-ancestor"] : []).concat(e.isDisabled ? ["is-disabled"] : []).join(" ");
      return /* @__PURE__ */ O(
        "div",
        {
          class: D,
          role: "option",
          id: `option-${d.join("-")}`,
          "aria-disabled": e.isDisabled ? "true" : void 0,
          "aria-selected": !f && e.value === h ? "true" : "false",
          "aria-haspopup": f ? "listbox" : void 0,
          "aria-expanded": f ? ((P = E[c + 1]) == null ? void 0 : P.parentPath.join("-")) === d.join("-") ? "true" : "false" : void 0,
          onmouseenter: () => {
            e.isDisabled || (y(d), w(f));
          },
          onmousedown: (H) => H.preventDefault(),
          onclick: () => {
            if (!f) return V(e, d);
            e.isDisabled || (y(d), w(!0));
          },
          children: [
            /* @__PURE__ */ g("span", { children: e.label }),
            f ? /* @__PURE__ */ g("svg", { class: "branch-chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ g("polyline", { points: "9 6 15 12 9 18" }) }) : e.value === h && /* @__PURE__ */ g("svg", { class: "tick", viewBox: "0 0 24 24", children: /* @__PURE__ */ g("polyline", { points: "4 12 10 18 20 6" }) })
          ]
        },
        e.value
      );
    }, de = ["trigger", Re(r)].concat(a ? ["is-open"] : []).concat(r.isInvalid ? ["is-invalid"] : []).concat(k ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ O("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ O(
        "button",
        {
          ref: B,
          type: "button",
          class: de,
          disabled: k,
          role: "combobox",
          "aria-required": r.isRequired ? "true" : void 0,
          "aria-haspopup": "listbox",
          "aria-controls": "select-options",
          "aria-activedescendant": a && I ? ie : void 0,
          "aria-label": l,
          "aria-describedby": ke(r.description, r.error),
          "aria-invalid": r.isInvalid || r.error ? "true" : void 0,
          "aria-expanded": a ? "true" : "false",
          onclick: () => a ? m(!1) : F(),
          onkeydown: le,
          children: [
            /* @__PURE__ */ g("span", { class: G ? "value" : "value is-placeholder", children: G ? `${r.valuePrefix ?? ""}${G.label}` : r.placeholder || i("selectPlaceholder") }),
            /* @__PURE__ */ g("svg", { class: "chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ g("polyline", { points: "6 9 12 15 18 9" }) })
          ]
        }
      ),
      /* @__PURE__ */ g("div", { class: "levels", children: E.map((e, t) => {
        const o = t === 0, c = o ? void 0 : z(p, e.parentPath), b = s.length > t ? s[t] : -1;
        return /* @__PURE__ */ O(
          "div",
          {
            ref: o ? u : void 0,
            id: o ? "select-options" : `select-options-${e.parentPath.join("-")}`,
            class: o ? "panel" : "panel submenu",
            role: "listbox",
            "aria-label": o ? r.label || r.placeholder || i("options") : c == null ? void 0 : c.label,
            "data-parent": o ? void 0 : `option-${e.parentPath.join("-")}`,
            popover: "manual",
            children: [
              o && p.length === 0 && /* @__PURE__ */ g("div", { class: "empty", children: i("noOptions") }),
              Ie(e.nodes).map((d) => {
                const f = d.entries.map((D) => ce(D.option, D.index, e, t, b));
                if (!d.groupId) return f;
                const A = `${d.groupId}-heading`;
                return /* @__PURE__ */ O("div", { role: "group", "aria-labelledby": A, children: [
                  /* @__PURE__ */ g("div", { class: "group-heading", id: A, role: "presentation", children: d.groupLabel }),
                  f
                ] }, d.groupId);
              })
            ]
          },
          `level-${e.parentPath.join("-")}`
        );
      }) }),
      De(r.description, r.error)
    ] });
  },
  {
    props: {
      ...we,
      value: { type: String, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      placeholder: String,
      // Text shown before the selected label in the trigger, e.g. "Weight: ".
      // The options in the panel are not affected.
      valuePrefix: String,
      options: { type: Array },
      size: { type: Q("sm", "md", "lg"), reflect: !0 },
      tone: { type: Q("primary", "secondary", "tertiary"), reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isInline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: he({ bubbles: !0, composed: !0 })
    },
    styles: [Pe, Oe, ge, ye],
    form: !0
  }
);
be("z-select", Ee);
export {
  Ee as ZSelect
};
