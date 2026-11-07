import { c as ue, a as fe, e as he, u as pe, f as R, b as A, g as C, j as p } from "../chunks/define-element-BZUk-KLk.js";
import { i as ve } from "../chunks/interaction-styles-XiKFAbWA.js";
import { u as ge, d as me } from "../chunks/form-control-D_UwalCr.js";
import { s as be, d as ye, u as we, a as ke, r as xe } from "../chunks/accessible-NC1hpH4S.js";
import { u as De } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as K } from "../chunks/hooks-DEFT8qqt.js";
import { t as je } from "../chunks/scrollbar-styles-Csqxxw2V.js";
import { h as W, s as X, a as Z, b as _, c as G } from "../chunks/overlay-BZjDggFA.js";
import { o as J } from "../chunks/prop-types-B3Bpi956.js";
import { u as Pe } from "../chunks/locale-DUDaH1Ni.js";
const S = (r) => {
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
}, ze = (r, i) => i.flatMap((n, u) => {
  var h;
  return ((h = D(r, i.slice(0, u + 1))) == null ? void 0 : h.value) ?? [];
}), E = (r) => r.flatMap((i, n) => i.isDisabled ? [] : [n]), Ae = ue`
	:host {
		display: inline-flex;
		position: relative;
		width: 100%;
		--accent: var(--primary);
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
		--accent: var(--pink);
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
		gap: 0.625rem;
		width: 100%;
		box-sizing: border-box;
		/* The trigger is a pressable cap, not a hole — raised, unlike z-input.
		   Inert in the flat themes. */
		background: var(--material-raised), transparent;
		box-shadow: var(--elevation-raised);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		color: var(--foreground);
		font-family: inherit;
		cursor: pointer;
		text-align: start;
		user-select: none;
		-webkit-user-select: none;
		transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}

	.trigger.is-sm {
		height: var(--control-height-sm);
		padding-inline: 0.75rem;
		font-size: var(--control-font-size-sm);
	}
	.trigger.is-md {
		height: var(--control-height-md);
		padding-inline: 0.875rem;
		font-size: var(--control-font-size-md);
	}
	.trigger.is-lg {
		height: var(--control-height-lg);
		padding-inline: 1rem;
		font-size: var(--control-font-size-lg);
	}

	.trigger:hover {
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.trigger.is-open {
		border-color: var(--accent);
		background: color-mix(in oklch, var(--accent) 5%, transparent);
	}

	.trigger.is-invalid {
		border-color: var(--destructive);
	}

	.trigger.is-disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.trigger:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}

	.value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	.value.is-placeholder {
		color: var(--muted-foreground);
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--muted-foreground);
		transition: transform var(--motion-fast) var(--ease-enter);
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.trigger.is-open .chevron {
		transform: rotate(180deg);
		color: var(--accent);
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
		z-index: 50;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
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
		gap: 0.5rem;
		padding: 0.5rem 0.625rem;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-small);
		color: var(--foreground);
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
	}

	.option.is-active {
		background: color-mix(in oklch, var(--accent) 14%, transparent);
		color: var(--accent);
	}

	.option.is-selected,
	.option.is-ancestor {
		color: var(--accent);
		font-weight: 600;
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
		padding: 0.625rem;
		font-size: var(--font-size-small);
		color: var(--muted-foreground);
		text-align: center;
	}
`, Se = (r) => r.size === "sm" ? "is-sm" : r.size === "lg" ? "is-lg" : "is-md", Be = fe(
  (r) => {
    const i = Pe(), n = pe(), u = we(r.label), h = R(), H = R(), [v, I] = De("value"), ee = R(v), [a, g] = K(!1), [s, m] = K([]), [te, y] = K(!1), c = Array.isArray(r.options) ? r.options : [], w = Y(c, v), O = w ? D(c, w) : void 0, re = v != null && v !== "", { isFormDisabled: oe } = ge({
      value: v ?? "",
      isDisabled: r.isDisabled,
      control: H,
      validity: r.isRequired && !re ? { flags: { valueMissing: !0 }, message: i("selectAnItemInTheList") } : { flags: {} },
      onReset: () => I(ee.current),
      onRestore: (e) => {
        typeof e == "string" && I(e);
      }
    }), k = !!r.isDisabled || oe;
    A(() => {
      if (!a) return;
      const e = (t) => {
        t.composedPath().includes(n.current) || g(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [a]), A(() => {
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
    const q = E(c), j = D(c, s), ne = s.length ? `option-${s.join("-")}` : void 0, T = () => getComputedStyle(n.current).direction === "rtl", B = [{ nodes: c, parentPath: [] }];
    if (a) {
      let e = c;
      for (let t = 0; t < s.length; t++) {
        const o = e[s[t]];
        if (!S(o) || t === s.length - 1 && !te) break;
        e = o.children, B.push({ nodes: e, parentPath: s.slice(0, t + 1) });
      }
    }
    const ie = B.map((e) => e.parentPath.join("-")).join("|"), $ = (e = !1) => {
      var o;
      if (k) return;
      const t = w && !((o = D(c, w)) != null && o.isDisabled) ? w : void 0;
      m(t ?? [(e ? q.at(-1) : q[0]) ?? -1]), y(!1), g(!0);
    }, U = (e, t) => {
      var o, d;
      k || e.isDisabled || S(e) || (g(!1), e.value !== v && (I(e.value), r.change({ value: e.value, path: ze(c, t) })), (d = (o = n.current.shadowRoot) == null ? void 0 : o.querySelector(".trigger")) == null || d.focus());
    }, V = (e) => {
      const t = D(c, e);
      if (!t || t.isDisabled || !S(t)) return;
      const o = E(t.children)[0];
      m(o === void 0 ? e : [...e, o]), y(!0);
    }, M = () => {
      m(s.slice(0, -1)), y(!1);
    }, se = (e, t) => S(e) ? V(t) : U(e, t);
    A(() => {
      k && g(!1);
    }, [k]), A(() => {
      var e, t;
      if (a) {
        if (!j || j.isDisabled) {
          m([q[0] ?? -1]);
          return;
        }
        (t = (e = n.current.shadowRoot) == null ? void 0 : e.querySelector(`#option-${s.join("-")}`)) == null || t.scrollIntoView({ block: "nearest" });
      }
    }, [a, s.join("-"), r.options]), A(() => {
      if (!a) return;
      const e = n.current.shadowRoot, t = [];
      return e == null || e.querySelectorAll(".submenu").forEach((o) => {
        const d = e.querySelector(`#${o.dataset.parent}`);
        if (!d) return;
        o.matches(":popover-open") || X(o);
        const b = T() ? "left-start" : "right-start";
        t.push(Z(d, o, () => _(o, G(d, o, { placement: b, offset: 2, padding: 8 }))));
      }), () => t.forEach((o) => o());
    }, [a, ie]);
    const F = R({ text: "", time: 0 }), ae = (e) => {
      if (!k) {
        if (e.key === "Tab") {
          g(!1);
          return;
        }
        if (e.key === "Escape") {
          if (!a) return;
          e.preventDefault(), e.stopPropagation(), s.length > 1 ? M() : g(!1);
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(), a ? j && se(j, s) : $();
          return;
        }
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          if (!a) return;
          e.preventDefault(), e.key === "ArrowRight" !== T() ? V(s) : s.length > 1 && M();
          return;
        }
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
          if (e.preventDefault(), !a) {
            $(e.key === "ArrowUp" || e.key === "End");
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
          const d = [...o].every((z) => z === o[0]) ? o[0] : o, b = a ? Q(c, s) : c, l = E(b), P = a ? l.indexOf(s.at(-1)) : -1, f = [...l.slice(P + 1), ...l.slice(0, P + 1)].find((z) => b[z].label.toLowerCase().startsWith(d));
          f !== void 0 && (a || g(!0), m([...a ? s.slice(0, -1) : [], f]), y(!1));
        }
      }
    }, le = ["trigger", Se(r)].concat(a ? ["is-open"] : []).concat(r.isInvalid ? ["is-invalid"] : []).concat(k ? ["is-disabled"] : []).join(" ");
    return /* @__PURE__ */ C("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ C(
        "button",
        {
          ref: H,
          type: "button",
          class: le,
          disabled: k,
          role: "combobox",
          "aria-required": r.isRequired ? "true" : void 0,
          "aria-haspopup": "listbox",
          "aria-controls": "select-options",
          "aria-activedescendant": a && j ? ne : void 0,
          "aria-label": u,
          "aria-describedby": ke(r.description, r.error),
          "aria-invalid": r.isInvalid || r.error ? "true" : void 0,
          "aria-expanded": a ? "true" : "false",
          onclick: () => a ? g(!1) : $(),
          onkeydown: ae,
          children: [
            /* @__PURE__ */ p("span", { class: O ? "value" : "value is-placeholder", children: O ? O.label : r.placeholder || i("selectPlaceholder") }),
            /* @__PURE__ */ p("svg", { class: "chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ p("polyline", { points: "6 9 12 15 18 9" }) })
          ]
        }
      ),
      /* @__PURE__ */ p("div", { class: "levels", children: B.map((e, t) => {
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
              o && c.length === 0 && /* @__PURE__ */ p("div", { class: "empty", children: i("noOptions") }),
              e.nodes.map((l, P) => {
                var N;
                const x = [...e.parentPath, P], f = S(l), z = f && w !== void 0 && x.every((L, de) => w[de] === L), ce = ["option"].concat(P === b ? ["is-active"] : []).concat(!f && l.value === v ? ["is-selected"] : []).concat(z ? ["is-ancestor"] : []).concat(l.isDisabled ? ["is-disabled"] : []).join(" ");
                return /* @__PURE__ */ C(
                  "div",
                  {
                    class: ce,
                    role: "option",
                    id: `option-${x.join("-")}`,
                    "aria-disabled": l.isDisabled ? "true" : void 0,
                    "aria-selected": !f && l.value === v ? "true" : "false",
                    "aria-haspopup": f ? "listbox" : void 0,
                    "aria-expanded": f ? ((N = B[t + 1]) == null ? void 0 : N.parentPath.join("-")) === x.join("-") ? "true" : "false" : void 0,
                    onmouseenter: () => {
                      l.isDisabled || (m(x), y(f));
                    },
                    onmousedown: (L) => L.preventDefault(),
                    onclick: () => {
                      if (!f) return U(l, x);
                      l.isDisabled || (m(x), y(!0));
                    },
                    children: [
                      /* @__PURE__ */ p("span", { children: l.label }),
                      f ? /* @__PURE__ */ p("svg", { class: "branch-chevron", viewBox: "0 0 24 24", children: /* @__PURE__ */ p("polyline", { points: "9 6 15 12 9 18" }) }) : l.value === v && /* @__PURE__ */ p("svg", { class: "tick", viewBox: "0 0 24 24", children: /* @__PURE__ */ p("polyline", { points: "4 12 10 18 20 6" }) })
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
      xe(r.description, r.error)
    ] });
  },
  {
    props: {
      ...ye,
      value: { type: String, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      placeholder: String,
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
    styles: [je, Ae, ve, be],
    form: !0
  }
);
me("z-select", Be);
export {
  Be as ZSelect
};
