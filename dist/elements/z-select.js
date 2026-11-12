// @ts-self-types="./z-select.d.ts"
import { c as ue, a as fe, e as he, u as ve, f as R, b as z, g as C, j as v } from "../chunks/define-element-BZUk-KLk.js";
import { i as pe } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as ge, d as me } from "../chunks/form-control-CrK-0rhn.js";
import { s as be, d as ye, u as we, a as xe, r as ke } from "../chunks/accessible-NC1hpH4S.js";
import { u as De } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as K } from "../chunks/hooks-DEFT8qqt.js";
import { t as Pe } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { h as W, s as X, a as Z, b as _, c as G } from "../chunks/overlay-CFiufx65.js";
import { o as J } from "../chunks/prop-types-B3Bpi956.js";
import { u as je } from "../chunks/locale-Bb4aqXuR.js";
const A = (r) => {
  var i;
  return !!((i = r == null ? void 0 : r.children) != null && i.length);
}, D = (r, i) => {
  let n = r, u;
  for (const h of i) {
    if (u = n == null ? void 0 : n[h], !u) return;
    n = u.children;
  }
  return u;
}, Q = (r, i) => {
  var n;
  return i.length <= 1 ? r : ((n = D(r, i.slice(0, -1))) == null ? void 0 : n.children) ?? [];
}, Y = (r, i) => {
  if (!(i == null || i === ""))
    for (let n = 0; n < r.length; n++) {
      const u = r[n];
      if (u.value === i) return [n];
      const h = u.children ? Y(u.children, i) : void 0;
      if (h) return [n, ...h];
    }
}, Se = (r, i) => i.flatMap((n, u) => {
  var h;
  return ((h = D(r, i.slice(0, u + 1))) == null ? void 0 : h.value) ?? [];
}), E = (r) => r.flatMap((i, n) => i.isDisabled ? [] : [n]), ze = ue`
	:host {
		display: inline-flex;
		position: relative;
		width: 100%;
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
		border-radius: var(--radius-md);
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
`, Ae = (r) => r.size === "sm" ? "is-sm" : r.size === "lg" ? "is-lg" : "is-md", Be = fe(
  (r) => {
    const i = je(), n = ve(), u = we(r.label), h = R(), H = R(), [p, I] = De("value"), ee = R(p), [a, g] = K(!1), [s, m] = K([]), [te, y] = K(!1), c = Array.isArray(r.options) ? r.options : [], w = Y(c, p), O = w ? D(c, w) : void 0, re = p != null && p !== "", { isFormDisabled: oe } = ge({
      value: p ?? "",
      isDisabled: r.isDisabled,
      control: H,
      validity: r.isRequired && !re ? { flags: { valueMissing: !0 }, message: i("selectAnItemInTheList") } : { flags: {} },
      onReset: () => I(ee.current),
      onRestore: (e) => {
        typeof e == "string" && I(e);
      }
    }), x = !!r.isDisabled || oe;
    z(() => {
      if (!a) return;
      const e = (t) => {
        t.composedPath().includes(n.current) || g(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [a]), z(() => {
      const e = h.current;
      if (!e) return;
      if (!a) {
        W(e);
        return;
      }
      X(e);
      const t = () => {
        e.style.width = `${n.current.getBoundingClientRect().width}px`, _(e, G(n.current, e, { placement: "bottom-start", offset: 6, padding: 8 }));
      }, o = Z(n.current, e, t);
      return () => {
        o(), W(e);
      };
    }, [a]);
    const $ = E(c), P = D(c, s), ne = s.length ? `option-${s.join("-")}` : void 0, U = () => getComputedStyle(n.current).direction === "rtl", B = [{ nodes: c, parentPath: [] }];
    if (a) {
      let e = c;
      for (let t = 0; t < s.length; t++) {
        const o = e[s[t]];
        if (!A(o) || t === s.length - 1 && !te) break;
        e = o.children, B.push({ nodes: e, parentPath: s.slice(0, t + 1) });
      }
    }
    const ie = B.map((e) => e.parentPath.join("-")).join("|"), q = (e = !1) => {
      var o;
      if (x) return;
      const t = w && !((o = D(c, w)) != null && o.isDisabled) ? w : void 0;
      m(t ?? [(e ? $.at(-1) : $[0]) ?? -1]), y(!1), g(!0);
    }, V = (e, t) => {
      var o, d;
      x || e.isDisabled || A(e) || (g(!1), e.value !== p && (I(e.value), r.change({ value: e.value, path: Se(c, t) })), (d = (o = n.current.shadowRoot) == null ? void 0 : o.querySelector(".trigger")) == null || d.focus());
    }, M = (e) => {
      const t = D(c, e);
      if (!t || t.isDisabled || !A(t)) return;
      const o = E(t.children)[0];
      m(o === void 0 ? e : [...e, o]), y(!0);
    }, T = () => {
      m(s.slice(0, -1)), y(!1);
    }, se = (e, t) => A(e) ? M(t) : V(e, t);
    z(() => {
      x && g(!1);
    }, [x]), z(() => {
      var e, t;
      if (a) {
        if (!P || P.isDisabled) {
          m([$[0] ?? -1]);
          return;
        }
        (t = (e = n.current.shadowRoot) == null ? void 0 : e.querySelector(`#option-${s.join("-")}`)) == null || t.scrollIntoView({ block: "nearest" });
      }
    }, [a, s.join("-"), r.options]), z(() => {
      if (!a) return;
      const e = n.current.shadowRoot, t = [];
      return e == null || e.querySelectorAll(".submenu").forEach((o) => {
        const d = e.querySelector(`#${o.dataset.parent}`);
        if (!d) return;
        o.matches(":popover-open") || X(o);
        const b = U() ? "left-start" : "right-start";
        t.push(Z(d, o, () => _(o, G(d, o, { placement: b, offset: 2, padding: 8 }))));
      }), () => t.forEach((o) => o());
    }, [a, ie]);
    const F = R({ text: "", time: 0 }), ae = (e) => {
      if (!x) {
        if (e.key === "Tab") {
          g(!1);
          return;
        }
        if (e.key === "Escape") {
          if (!a) return;
          e.preventDefault(), e.stopPropagation(), s.length > 1 ? T() : g(!1);
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(), a ? P && se(P, s) : q();
          return;
        }
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          if (!a) return;
          e.preventDefault(), e.key === "ArrowRight" !== U() ? M(s) : s.length > 1 && T();
          return;
        }
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
          if (e.preventDefault(), !a) {
            q(e.key === "ArrowUp" || e.key === "End");
            return;
          }
          const t = E(Q(c, s)), o = s.at(-1), d = t.indexOf(o), b = e.key === "Home" ? t[0] : e.key === "End" ? t.at(-1) : t[(d + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length];
          m([...s.slice(0, -1), b ?? -1]), y(!1);
          return;
        }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          const t = Date.now(), o = (t - F.current.time < 600 ? F.current.text : "") + e.key.toLowerCase();
          F.current = { text: o, time: t };
          const d = [...o].every((S) => S === o[0]) ? o[0] : o, b = a ? Q(c, s) : c, l = E(b), j = a ? l.indexOf(s.at(-1)) : -1, f = [...l.slice(j + 1), ...l.slice(0, j + 1)].find((S) => b[S].label.toLowerCase().startsWith(d));
          f !== void 0 && (a || g(!0), m([...a ? s.slice(0, -1) : [], f]), y(!1));
        }
      }
    }, le = ["trigger", Ae(r)].concat(a ? ["is-open"] : []).concat(r.isInvalid ? ["is-invalid"] : []).concat(x ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ C("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ C(
        "button",
        {
          ref: H,
          type: "button",
          class: le,
          disabled: x,
          role: "combobox",
          "aria-required": r.isRequired ? "true" : void 0,
          "aria-haspopup": "listbox",
          "aria-controls": "select-options",
          "aria-activedescendant": a && P ? ne : void 0,
          "aria-label": u,
          "aria-describedby": xe(r.description, r.error),
          "aria-invalid": r.isInvalid || r.error ? "true" : void 0,
          "aria-expanded": a ? "true" : "false",
          onclick: () => a ? g(!1) : q(),
          onkeydown: ae,
          children: [
            /* @__PURE__ */ v("span", { class: O ? "value" : "value is-placeholder", children: O ? `${r.valuePrefix ?? ""}${O.label}` : r.placeholder || i("selectPlaceholder") }),
            /* @__PURE__ */ v("svg", { class: "chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ v("polyline", { points: "6 9 12 15 18 9" }) })
          ]
        }
      ),
      /* @__PURE__ */ v("div", { class: "levels", children: B.map((e, t) => {
        const o = t === 0, d = o ? void 0 : D(c, e.parentPath), b = s.length > t ? s[t] : -1;
        return /* @__PURE__ */ C(
          "div",
          {
            ref: o ? h : void 0,
            id: o ? "select-options" : `select-options-${e.parentPath.join("-")}`,
            class: o ? "panel" : "panel submenu",
            role: "listbox",
            "aria-label": o ? r.label || r.placeholder || i("options") : d == null ? void 0 : d.label,
            "data-parent": o ? void 0 : `option-${e.parentPath.join("-")}`,
            popover: "manual",
            children: [
              o && c.length === 0 && /* @__PURE__ */ v("div", { class: "empty", children: i("noOptions") }),
              e.nodes.map((l, j) => {
                var N;
                const k = [...e.parentPath, j], f = A(l), S = f && w !== void 0 && k.every((L, de) => w[de] === L), ce = ["option"].concat(j === b ? ["is-active"] : []).concat(!f && l.value === p ? ["is-selected"] : []).concat(S ? ["is-ancestor"] : []).concat(l.isDisabled ? ["is-disabled"] : []).join(" ");
                return /* @__PURE__ */ C(
                  "div",
                  {
                    class: ce,
                    role: "option",
                    id: `option-${k.join("-")}`,
                    "aria-disabled": l.isDisabled ? "true" : void 0,
                    "aria-selected": !f && l.value === p ? "true" : "false",
                    "aria-haspopup": f ? "listbox" : void 0,
                    "aria-expanded": f ? ((N = B[t + 1]) == null ? void 0 : N.parentPath.join("-")) === k.join("-") ? "true" : "false" : void 0,
                    onmouseenter: () => {
                      l.isDisabled || (m(k), y(f));
                    },
                    onmousedown: (L) => L.preventDefault(),
                    onclick: () => {
                      if (!f) return V(l, k);
                      l.isDisabled || (m(k), y(!0));
                    },
                    children: [
                      /* @__PURE__ */ v("span", { children: l.label }),
                      f ? /* @__PURE__ */ v("svg", { class: "branch-chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ v("polyline", { points: "9 6 15 12 9 18" }) }) : l.value === p && /* @__PURE__ */ v("svg", { class: "tick", viewBox: "0 0 24 24", children: /* @__PURE__ */ v("polyline", { points: "4 12 10 18 20 6" }) })
                    ]
                  },
                  l.value
                );
              })
            ]
          },
          `level-${e.parentPath.join("-")}`
        );
      }) }),
      ke(r.description, r.error)
    ] });
  },
  {
    props: {
      ...ye,
      value: { type: String, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      placeholder: String,
      // Text shown before the selected label in the trigger, e.g. "Weight: ".
      // The options in the panel are not affected.
      valuePrefix: String,
      options: { type: Array },
      size: { type: J("sm", "md", "lg"), reflect: !0 },
      tone: { type: J("primary", "secondary", "tertiary"), reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isInline: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: he({ bubbles: !0, composed: !0 })
    },
    styles: [Pe, ze, pe, be],
    form: !0
  }
);
me("z-select", Be);
export {
  Be as ZSelect
};
