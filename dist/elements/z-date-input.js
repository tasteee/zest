// @ts-self-types="./z-date-input.d.ts"
import { c as tt, a as nt, e as De, u as rt, f as y, b as Y, g as _, j as g } from "../chunks/define-element-BZUk-KLk.js";
import { i as ot } from "../chunks/interaction-styles-C6mMacCu.js";
import { u as at, d as st } from "../chunks/form-control-CZ1HzNxT.js";
import { s as it, d as lt, u as ct, a as dt, r as ut } from "../chunks/accessible-NC1hpH4S.js";
import { f as ft } from "../chunks/overlay-styles-BeWhjeXT.js";
import { h as Se, s as mt, a as gt, b as pt, c as bt } from "../chunks/overlay-_7WIUBJ6.js";
import { u as ht } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as N } from "../chunks/hooks-DEFT8qqt.js";
import { o as Re } from "../chunks/prop-types-CSJu2W-0.js";
import { u as yt } from "../chunks/locale-BNhgEFKA.js";
import { r as vt, n as I, f as v, p as V, i as ee, t as Ie, m as xt, a as wt, b as Bt, c as Fe, d as ke, e as te, g as Ce, h as Dt, j as St } from "../chunks/z-calendar-DsIT85JI.js";
const Rt = tt`
	:host { display: inline-block; width: fit-content; max-width: 100%; --tone: var(--accent-primary); }
	:host([is-full-width]) { display: block; width: 100%; }
	:host([is-hidden]) { display: none; }
	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }

	.row { display: flex; align-items: stretch; box-sizing: border-box; width: 100%; background: transparent; border: 1px solid var(--border-default); border-radius: var(--radius-md); color: var(--text-primary); overflow: hidden; transition: border-color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.row.is-sm { height: var(--control-height-sm); font-size: var(--font-size-sm); }
	.row.is-md { height: var(--control-height-md); font-size: var(--font-size-sm); }
	.row.is-lg { height: var(--control-height-lg); font-size: var(--font-size-md); }
	.row:hover { border-color: color-mix(in oklch, var(--text-primary) 30%, transparent); }
	.row:focus-within, .row.is-open { border-color: var(--tone); background: color-mix(in oklch, var(--tone) 5%, transparent); }
	.row:focus-within { outline: 1px solid var(--border-focus); outline-offset: -1px; }
	.row.is-invalid { border-color: var(--status-danger); --tone: var(--status-danger); }
	.row.is-disabled { opacity: var(--control-disabled-opacity); pointer-events: none; }

	input { flex: 1 1 0; min-width: 0; box-sizing: border-box; padding-block: 0; padding-inline: var(--space-3); background: transparent; border: 0; outline: none; color: inherit; font: inherit; font-variant-numeric: tabular-nums; text-align: start; }
	.row.is-range input { padding-inline: var(--space-2); text-align: center; }
	input::placeholder { color: var(--text-secondary); user-select: none; -webkit-user-select: none; }
	.separator { display: flex; align-items: center; padding-inline: var(--space-1); color: var(--text-secondary); user-select: none; -webkit-user-select: none; }

	.calendar-button { display: grid; place-items: center; flex: 0 0 auto; width: 2.25rem; padding: 0; background: transparent; border: 0; border-inline-start: 1px solid var(--border-default); color: var(--text-secondary); cursor: pointer; transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter); }
	.calendar-button:hover:not(:disabled) { color: var(--text-primary); background: color-mix(in oklch, var(--text-primary) 6%, transparent); }
	.calendar-button:active:not(:disabled), .calendar-button.is-open { color: var(--tone); background: color-mix(in oklch, var(--tone) 12%, transparent); }
	.calendar-button:focus-visible { position: relative; z-index: 1; outline: 2px solid var(--border-focus); outline-offset: -2px; }
	.calendar-button:disabled { cursor: not-allowed; opacity: 0.35; }
	.calendar-button svg { width: 1.125rem; height: 1.125rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

	.surface { width: fit-content; max-width: none; padding: var(--space-3); border-radius: var(--radius-lg); }
`, Oe = (n) => n.filter(Boolean).join(" "), ne = (n, i) => i ? Ie(n) : n[0], re = (n, i) => i ? wt(n) : [Bt(n), null], W = (n, i, u, F) => {
  if (!F) return [i, null];
  const p = u[0], m = u[1];
  return n === "start" ? i !== null && m !== null && i > m ? [m, m] : [i, m] : i !== null && p !== null && i < p ? [p, p] : [p, i];
}, Ft = nt(
  (n) => {
    const i = rt(), u = yt(), F = ct(n.label), p = y(), m = y(), k = y(), K = y(), z = y(), P = y([null, null]), x = y("start"), oe = ht("value"), ze = oe[0], T = oe[1], o = !!n.isRange, a = vt(n.format), b = I(n.min), h = I(n.max), w = re(ze, o), B = w[0], D = w[1], H = y(null);
    H.current === null && (H.current = w);
    const ae = N(v(B, a)), A = ae[0], Z = ae[1], se = N(v(D, a)), E = se[0], $ = se[1], ie = N(null), U = ie[0], le = ie[1], ce = N(!1), S = ce[0], G = ce[1], c = y(w);
    c.current = w;
    const Pe = () => {
      if (!o) return B ?? "";
      const e = new FormData(), t = i.current.getAttribute("name") ?? "";
      return B !== null && e.append(t, B), D !== null && e.append(t, D), e;
    }, Te = (e) => {
      if (!o) {
        typeof e == "string" && T(I(e));
        return;
      }
      if (!(e instanceof FormData)) return;
      const r = i.current.getAttribute("name") ?? "", s = e.getAll(r);
      T(Ie([I(s[0]), I(s[1])]));
    }, C = V(A, a), O = V(E, a), Ae = A !== "" && C === null, Ee = o && E !== "" && O === null, Ue = C !== null && ee(C, b, h), qe = O !== null && ee(O, b, h), Me = Ue || qe, Le = o && !!n.isRequired && D === null, je = () => {
      var d;
      if (Ae || Ee) return { flags: { badInput: !0 }, message: u("enterADate", { format: a }) };
      const t = [C, O].filter(Boolean).sort()[0] ?? null, r = [C, O].filter(Boolean).sort().reverse()[0] ?? null;
      return t !== null && b !== null && t < b ? { flags: { rangeUnderflow: !0 }, message: u("dateOnOrAfter", { min: v(b, a) }) } : r !== null && h !== null && r > h ? { flags: { rangeOverflow: !0 }, message: u("dateOnOrBefore", { max: v(h, a) }) } : Le ? { flags: { valueMissing: !0 }, message: (d = k.current) == null ? void 0 : d.validationMessage } : { flags: {} };
    }, Ne = at({
      value: Pe(),
      isDisabled: n.isDisabled,
      isReadonly: n.isReadonly,
      control: m,
      validity: je(),
      submitsOnEnter: !0,
      onReset: () => {
        const e = H.current;
        T(ne(e, o));
      },
      onRestore: Te
    }), q = n.isDisabled || Ne.isFormDisabled, Ve = !!n.isReadonly, M = q || Ve;
    Y(() => {
      U !== "start" && Z(v(B, a));
    }, [B, U, a]), Y(() => {
      U !== "end" && $(v(D, a));
    }, [D, U, a]);
    const L = (e) => {
      Fe(e, P.current) || (P.current = e, n.change(ke(e, o)));
    }, R = (e) => {
      Fe(e, c.current) || (c.current = e, T(ne(e, o)), n.input(ke(e, o)));
    }, J = (e) => e === "start" ? 0 : 1, de = (e, t) => {
      e === "start" && Z(t), e === "end" && $(t);
    }, ue = (e, t) => {
      t.stopPropagation();
      const r = t.target, s = String(t.inputType ?? "").startsWith("delete"), l = xt(r.value, a, { isDeleting: s });
      if (l !== r.value && (r.value = l), de(e, l), l === "") {
        R(W(e, null, c.current, o));
        return;
      }
      const j = V(l, a);
      j === null || ee(j, b, h) || R(W(e, j, c.current, o));
    }, fe = (e, t) => {
      x.current = e, P.current = c.current, le(e), t.target.select();
    }, me = (e) => {
      const t = e === "start" ? A : E, r = t === "", s = V(t, a);
      if (!r && s === null) return;
      const d = r ? null : te(s, b, h), f = W(e, d, c.current, o);
      R(f), L(f);
    }, ge = (e) => {
      me(e), le(null);
    }, pe = (e, t) => {
      const r = c.current[J(e)], s = r ?? te(Ce(), b, h), l = r === null ? s : te(Dt(r, t), b, h), d = W(e, l, c.current, o);
      R(d), L(d), de(e, v(d[J(e)], a));
    }, be = (e, t) => {
      const r = !!n.hasCalendar && !M;
      if (t.altKey && t.key === "ArrowDown" && r) {
        t.preventDefault(), he(e);
        return;
      }
      M || (t.key === "Enter" && me(e), t.key === "ArrowUp" && (t.preventDefault(), pe(e, 1)), t.key === "ArrowDown" && (t.preventDefault(), pe(e, -1)));
    }, he = (e) => {
      x.current = e, P.current = c.current, G(!0);
    }, Q = (e) => {
      if (G(!1), L(c.current), !e) return;
      const t = x.current === "end" ? k.current : m.current;
      t == null || t.focus();
    }, We = () => {
      if (!M) {
        if (S) {
          Q(!0);
          return;
        }
        he(x.current);
      }
    }, ye = (e) => {
      Z(v(e[0], a)), $(v(e[1], a));
    }, Ke = (e) => {
      var r;
      e.stopPropagation();
      const t = re((r = e.detail) == null ? void 0 : r.value, o);
      R(t), ye(t);
    }, He = (e) => {
      var s;
      e.stopPropagation();
      const t = re((s = e.detail) == null ? void 0 : s.value, o);
      R(t), ye(t), L(t), G(!1);
      const r = x.current === "end" ? k.current : m.current;
      r == null || r.focus();
    }, Ze = (e) => {
      const t = c.current, r = J(x.current), s = t[r] ?? t[0] ?? t[1] ?? Ce();
      e.month = St(s);
    };
    Y(() => {
      const e = K.current;
      if (!e) return;
      if (!S) {
        Se(e);
        return;
      }
      mt(e), z.current && Ze(z.current);
      const t = requestAnimationFrame(() => {
        var f;
        return (f = z.current) == null ? void 0 : f.focus();
      }), r = () => pt(e, bt(p.current, e, { placement: "bottom-start", offset: 8 })), s = gt(p.current, e, r), l = (f) => {
        f.composedPath().includes(i.current) || Q(!1);
      }, d = (f) => {
        f.key === "Escape" && (f.preventDefault(), Q(!0));
      };
      return document.addEventListener("pointerdown", l), document.addEventListener("keydown", d), () => {
        cancelAnimationFrame(t), s(), document.removeEventListener("pointerdown", l), document.removeEventListener("keydown", d), Se(e);
      };
    }, [S]);
    const X = !!n.isInvalid || !!n.error || Me, $e = n.size ?? "md", Ge = Oe(["row", `is-${$e}`, o && "is-range", X && "is-invalid", q && "is-disabled", S && "is-open"]), Je = Oe(["calendar-button", S && "is-open"]), ve = dt(n.description, n.error), Qe = (o ? n.startPlaceholder : n.placeholder) || a, Xe = n.endPlaceholder || a, Ye = o ? u("startDate") : F, _e = u("endDate"), xe = a.length + 1, we = !!n.hasCalendar, et = ne(w, o), Be = F || u("calendar");
    return /* @__PURE__ */ _("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ _("div", { ref: p, class: Ge, role: o ? "group" : void 0, "aria-label": o ? F : void 0, "aria-describedby": o ? ve : void 0, children: [
        /* @__PURE__ */ g(
          "input",
          {
            ref: m,
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            size: xe,
            value: A,
            placeholder: Qe,
            disabled: q,
            readonly: n.isReadonly ? !0 : void 0,
            required: n.isRequired,
            "aria-label": Ye,
            "aria-describedby": o ? void 0 : ve,
            "aria-invalid": X ? "true" : void 0,
            oninput: (e) => ue("start", e),
            onfocus: (e) => fe("start", e),
            onblur: () => ge("start"),
            onkeydown: (e) => be("start", e)
          }
        ),
        o && /* @__PURE__ */ g("span", { class: "separator", "aria-hidden": "true", children: u("rangeSeparator") }),
        o && /* @__PURE__ */ g(
          "input",
          {
            ref: k,
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            size: xe,
            value: E,
            placeholder: Xe,
            disabled: q,
            readonly: n.isReadonly ? !0 : void 0,
            required: n.isRequired,
            "aria-label": _e,
            "aria-invalid": X ? "true" : void 0,
            oninput: (e) => ue("end", e),
            onfocus: (e) => fe("end", e),
            onblur: () => ge("end"),
            onkeydown: (e) => be("end", e)
          }
        ),
        we && /* @__PURE__ */ g(
          "button",
          {
            class: Je,
            type: "button",
            tabindex: "-1",
            disabled: M,
            "aria-label": u("openCalendar"),
            "aria-haspopup": "dialog",
            "aria-expanded": S ? "true" : "false",
            onclick: We,
            children: /* @__PURE__ */ _("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
              /* @__PURE__ */ g("rect", { x: "3", y: "4.5", width: "18", height: "16.5", rx: "3" }),
              /* @__PURE__ */ g("line", { x1: "3", y1: "10", x2: "21", y2: "10" }),
              /* @__PURE__ */ g("line", { x1: "8", y1: "2.5", x2: "8", y2: "6.5" }),
              /* @__PURE__ */ g("line", { x1: "16", y1: "2.5", x2: "16", y2: "6.5" })
            ] })
          }
        )
      ] }),
      we && /* @__PURE__ */ g("div", { ref: K, class: "surface", popover: "manual", role: "dialog", "aria-label": Be, children: /* @__PURE__ */ g(
        "z-calendar",
        {
          ref: z,
          isBorderless: !0,
          isRange: o,
          value: et ?? void 0,
          min: n.min,
          max: n.max,
          tone: n.tone,
          locale: n.locale,
          firstDayOfWeek: n.firstDayOfWeek,
          label: Be,
          oninput: Ke,
          onchange: He
        }
      ) }),
      ut(n.description, n.error)
    ] });
  },
  {
    props: {
      ...lt,
      value: { type: String, reflect: !0 },
      format: { type: String, reflect: !0 },
      min: { type: String, reflect: !0 },
      max: { type: String, reflect: !0 },
      firstDayOfWeek: { type: Number, reflect: !0 },
      locale: String,
      label: String,
      name: { type: String, reflect: !0 },
      placeholder: String,
      startPlaceholder: String,
      endPlaceholder: String,
      size: { type: Re("sm", "md", "lg"), reflect: !0 },
      tone: { type: Re("primary", "secondary", "tertiary"), reflect: !0 },
      isRange: { type: Boolean, reflect: !0 },
      hasCalendar: { type: Boolean, reflect: !0 },
      isInvalid: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadonly: { type: Boolean, reflect: !0 },
      isRequired: { type: Boolean, reflect: !0 },
      isFullWidth: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: De({ bubbles: !0, composed: !0 }),
      change: De({ bubbles: !0, composed: !0 })
    },
    styles: [ft, Rt, ot, it],
    form: !0
  }
);
st("z-date-input", Ft);
export {
  Ft as ZDateInput
};
