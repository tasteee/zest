import { c as rt, a as st, e as X, u as ot, f as ue, b as ee, j as c, g as $, d as at } from "./define-element-BZUk-KLk.js";
import { i as it } from "./interaction-styles-C6mMacCu.js";
import { u as he } from "./use-prop-C0_HeSQ9.js";
import { u as fe } from "./hooks-DEFT8qqt.js";
import { o as lt } from "./prop-types-CSJu2W-0.js";
import { u as ct } from "./locale-BNhgEFKA.js";
const dt = "YYYY-MM-DD", ut = /^(\d{4})-(\d{2})-(\d{2})$/, F = (e, t) => String(e).padStart(t, "0"), A = (e, t, r) => {
  const o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(e, t, r), o.setHours(0, 0, 0, 0), o;
}, pe = (e, t, r) => {
  const o = A(e, t, r), a = o.getFullYear() === e, l = o.getMonth() === t, i = o.getDate() === r;
  return a && l && i;
}, w = (e) => {
  if (typeof e != "string") return null;
  const t = ut.exec(e.trim());
  if (!t) return null;
  const r = Number(t[1]), o = Number(t[2]) - 1, a = Number(t[3]);
  return pe(r, o, a) ? A(r, o, a) : null;
}, I = (e) => {
  const t = F(e.getFullYear(), 4), r = F(e.getMonth() + 1, 2), o = F(e.getDate(), 2);
  return `${t}-${r}-${o}`;
}, L = (e) => {
  const t = w(e);
  return t ? I(t) : null;
}, ht = () => I(/* @__PURE__ */ new Date()), v = (e, t) => {
  const r = w(e) ?? /* @__PURE__ */ new Date();
  return r.setDate(r.getDate() + t), I(r);
}, S = (e, t) => {
  const r = w(e) ?? /* @__PURE__ */ new Date(), o = r.getDate(), a = A(r.getFullYear(), r.getMonth() + t, 1), l = A(a.getFullYear(), a.getMonth() + 1, 0).getDate(), i = Math.min(o, l);
  return I(A(a.getFullYear(), a.getMonth(), i));
}, C = (e, t) => S(e, t * 12), p = (e) => e.slice(0, 7), U = (e) => `${e}-01`, ft = (e) => typeof e == "string" && /^\d{4}-\d{2}$/.test(e) && w(`${e}-01`) !== null, ge = (e, t, r) => t && e < t ? t : r && e > r ? r : e, me = (e, t, r) => {
  const o = !!t && e < t, a = !!r && e > r;
  return o || a;
}, gt = (e, t) => {
  const r = w(U(e)) ?? /* @__PURE__ */ new Date(), o = (r.getDay() - t + 7) % 7, a = I(r), l = [];
  for (const i of Array.from({ length: 42 }, (M, y) => y))
    l.push(v(a, i - o));
  return l;
}, mt = (e) => {
  const r = typeof e == "string" ? e.split("/") : Array.isArray(e) ? e : [], o = L(r[0]), a = L(r[1]);
  return [o, a];
}, pt = (e) => Array.isArray(e) ? L(e[0]) : L(e), ye = (e) => e[0] === null && e[1] === null ? null : `${e[0] ?? ""}/${e[1] ?? ""}`, yt = (e, t) => t ? { value: ye(e), start: e[0], end: e[1] } : { value: e[0], start: e[0], end: e[0] }, Lt = (e, t) => e[0] === t[0] && e[1] === t[1], ne = /YYYY|MM|DD/g, bt = (e) => {
  if (typeof e != "string") return !1;
  const t = e.match(ne) ?? [], r = t.length === 3, o = new Set(t).size === 3;
  return r && o;
}, It = (e) => bt(e) ? e : dt, be = (e) => {
  const t = [];
  let r = 0;
  for (const a of e.matchAll(ne)) {
    const l = a.index ?? 0;
    l > r && t.push({ kind: "literal", text: e.slice(r, l) }), t.push({ kind: "token", token: a[0] }), r = l + a[0].length;
  }
  return r < e.length && t.push({ kind: "literal", text: e.slice(r) }), t;
}, Ot = (e, t) => {
  const r = w(e);
  if (!r) return "";
  const o = {
    YYYY: F(r.getFullYear(), 4),
    MM: F(r.getMonth() + 1, 2),
    DD: F(r.getDate(), 2)
  };
  return t.replace(ne, (a) => o[a]);
}, Pt = (e, t) => {
  const r = be(t), o = {};
  let a = 0;
  for (const i of r) {
    if (i.kind === "literal") {
      if (!e.startsWith(i.text, a)) return null;
      a += i.text.length;
      continue;
    }
    const y = i.token.length, f = e.slice(a, a + y);
    if (!new RegExp(`^\\d{${y}}$`).test(f)) return null;
    o[i.token] = Number(f), a += y;
  }
  return a !== e.length || !pe(o.YYYY, o.MM - 1, o.DD) ? null : I(A(o.YYYY, o.MM - 1, o.DD));
}, vt = (e, t) => e === "MM" ? Number(t) > 1 : e === "DD" ? Number(t) > 3 : !1, Nt = (e, t, r) => {
  const o = be(t), a = o.filter((u) => u.kind === "token"), l = a.map(() => "");
  let i = 0;
  const M = (u) => l[u].length === a[u].token.length;
  for (const u of e) {
    if (!(i < a.length)) break;
    if (/\d/.test(u)) {
      const q = l[i].length === 0;
      l[i] += u, q && vt(a[i].token, u) && (l[i] = `0${u}`), M(i) && (i += 1);
      continue;
    }
    l[i].length > 0 && a[i].token !== "YYYY" && (l[i] = l[i].padStart(a[i].token.length, "0"), i += 1);
  }
  let y = "", f = 0;
  for (const u of o) {
    if (u.kind === "literal") {
      const D = f > 0 && M(f - 1);
      (f < a.length && l[f].length > 0 || D && !r.isDeleting) && (y += u.text);
      continue;
    }
    y += l[f], f += 1;
  }
  return y;
}, wt = rt`
	:host {
		display: inline-block;
		width: fit-content;
		max-width: 100%;
		--tone: var(--accent-primary);
		--day-size: 2.25rem;
		--calendar-padding: var(--space-3);
		--calendar-width: 17.875rem;
	}
	:host([tone='secondary']) { --tone: var(--accent-secondary); }
	:host([tone='tertiary']) { --tone: var(--accent-tertiary); }
	:host([is-hidden]) { display: none; }

	.calendar {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		width: var(--calendar-width);
		padding: var(--calendar-padding);
		background: var(--surface-default);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		user-select: none;
		-webkit-user-select: none;
	}
	:host([is-borderless]) { --calendar-padding: 0rem; --calendar-width: calc(17.875rem - 2px - var(--space-3) * 2); }
	:host([is-borderless]) .calendar {
		background: transparent;
		border: 0;
		border-radius: 0;
	}
	.calendar.is-disabled { opacity: var(--control-disabled-opacity); pointer-events: none; }

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
	}
	.stepper {
		display: inline-flex;
		align-items: center;
		gap: var(--space-0-5);
		min-width: 0;
	}
	.title {
		padding-inline: var(--space-1);
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-md);
		line-height: var(--line-height-tight);
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.title { box-sizing: border-box; text-align: center; }
	.title.is-month { min-inline-size: 5.5rem; }
	.title.is-year { min-inline-size: 3rem; }
	.title.is-year { color: var(--text-secondary); font-variant-numeric: tabular-nums; }

	.arrow {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}
	.arrow:hover:not(:disabled) { color: var(--text-primary); background: color-mix(in oklch, var(--text-primary) 8%, transparent); }
	.arrow:active:not(:disabled) { background: color-mix(in oklch, var(--tone) 14%, transparent); }
	.arrow:focus-visible { outline: 2px solid var(--border-focus); outline-offset: -2px; }
	.arrow:disabled { cursor: not-allowed; opacity: 0.35; }
	.arrow svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
	:host(:dir(rtl)) .arrow svg { scale: -1 1; }

	.grid { display: flex; flex-direction: column; }
	.week { display: grid; grid-template-columns: repeat(7, 1fr); }
	.weekday {
		display: grid;
		place-items: center;
		height: 1.75rem;
		color: var(--text-secondary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.cell { position: relative; display: grid; height: var(--day-size); }
	.cell::before {
		content: '';
		position: absolute;
		inset-block: 0;
		inset-inline: 0;
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		opacity: 0;
	}
	.cell.is-in-range::before,
	.cell.is-range-start::before,
	.cell.is-range-end::before { opacity: 1; }
	.cell.is-range-start::before { inset-inline-start: 50%; }
	.cell.is-range-end::before { inset-inline-end: 50%; }
	.cell.is-in-range:first-child::before { border-start-start-radius: var(--radius-md); border-end-start-radius: var(--radius-md); }
	.cell.is-in-range:last-child::before { border-start-end-radius: var(--radius-md); border-end-end-radius: var(--radius-md); }
	.cell.is-preview::before { background: color-mix(in oklch, var(--tone) 8%, transparent); }

	.day {
		position: relative;
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		padding: 0;
		background: transparent;
		border: 0;
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font: inherit;
		font-variant-numeric: tabular-nums;
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter);
	}
	.day:hover:not(.is-selected):not(.is-disabled) { background: color-mix(in oklch, var(--text-primary) 8%, transparent); }
	.day:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 1px; z-index: 1; }
	.day.is-outside { color: var(--text-secondary); }
	.day.is-today::after {
		content: '';
		position: absolute;
		inset-block-end: 0.3125rem;
		inset-inline-start: 50%;
		width: 0.25rem;
		height: 0.25rem;
		margin-inline-start: -0.125rem;
		border-radius: var(--radius-full);
		background: var(--tone);
	}
	.day.is-selected { background: var(--tone); color: var(--on-accent); font-weight: var(--font-weight-semibold); }
	.day.is-selected.is-today::after { background: var(--on-accent); }
	.day.is-disabled { opacity: 0.35; cursor: not-allowed; }
	.day.is-selected.is-outside { color: var(--on-accent); }
`, Dt = (e) => {
  const t = Number(e);
  return Number.isInteger(t) && t >= 0 && t <= 6 ? t : 0;
}, kt = (e, t) => {
  var o;
  if (typeof t == "string" && t) return t;
  const r = (o = e.closest("[lang]")) == null ? void 0 : o.getAttribute("lang");
  if (r) return r;
}, te = (e) => e.filter(Boolean).join(" "), xt = (e, t, r) => e ? t ? { low: e, high: t, isPreview: !1 } : r ? r < e ? { low: r, high: e, isPreview: !0 } : { low: e, high: r, isPreview: !0 } : null : null, St = st(
  (e) => {
    const t = ot(), r = ct(), o = ue(), a = ue(!1), l = he("value"), i = he("month"), M = l[0], y = l[1], f = i[0], u = i[1], O = fe(null), D = O[0], P = O[1], G = fe(null), q = G[0], N = G[1], R = !!e.isRange, re = !!e.isDisabled, ve = !!e.isReadOnly, T = L(e.min), B = L(e.max), se = Dt(e.firstDayOfWeek), z = kt(t.current, e.locale), E = ht(), oe = pt(M), ae = R ? mt(M) : [oe, oe], g = ae[0], Z = ae[1], j = R && g !== null && Z === null, we = ge(g ?? E, T, B), x = ft(f) ? f : p(we), b = U(x), V = gt(x, se), De = new Intl.DateTimeFormat(z, { month: "long" }), ke = new Intl.DateTimeFormat(z, { year: "numeric" }), xe = new Intl.DateTimeFormat(z, { weekday: "short" }), Se = new Intl.DateTimeFormat(z, { weekday: "long" }), Me = new Intl.DateTimeFormat(z, { weekday: "long", year: "numeric", month: "long", day: "numeric" }), ie = w(b), Ye = De.format(ie), Te = ke.format(ie), Be = V.slice(0, 7).map((n) => {
      const s = w(n);
      return { iso: n, short: xe.format(s), long: Se.format(s) };
    }), Fe = D !== null && V.includes(D), Ae = g !== null && V.includes(g), Le = V.includes(E), Ie = b, Oe = Le && p(E) === x ? E : Ie, Pe = Ae && p(g) === x ? g : Oe, W = Fe ? D : Pe, m = xt(g, Z, j ? q : null), le = m !== null && m.low !== m.high, Ne = (n) => {
      const s = w(n), d = p(n) !== x, h = me(n, T, B), Y = n === g || n === Z, de = n === E, Je = m !== null && n === m.low, Qe = m !== null && n === m.high, Xe = m !== null && n > m.low && n < m.high, et = m !== null && m.isPreview, tt = te([
        "cell",
        Xe && "is-in-range",
        le && Je && "is-range-start",
        le && Qe && "is-range-end",
        et && "is-preview"
      ]), nt = te([
        "day",
        d && "is-outside",
        de && "is-today",
        Y && "is-selected",
        h && "is-disabled"
      ]);
      return {
        iso: n,
        label: Me.format(s),
        dayNumber: s.getDate(),
        cellClass: tt,
        dayClass: nt,
        isDisabled: h,
        isSelected: Y,
        isToday: de,
        isTabbable: n === W
      };
    }, Re = Array.from({ length: 6 }, (n, s) => V.slice(s * 7, s * 7 + 7).map(Ne)), K = (n) => {
      const s = U(p(n)), d = v(S(s, 1), -1), h = T !== null && d < T, k = B !== null && s > B;
      return !h && !k;
    }, ze = K(S(b, -1)), Ee = K(S(b, 1)), Ve = K(C(b, -1)), $e = K(C(b, 1)), J = (n) => {
      n !== x && (u(n), e.monthchange({ month: n }));
    }, Ce = (n) => {
      const s = p(n), d = U(s);
      J(s);
      const h = Number((D ?? W ?? b).slice(8, 10)), k = v(d, h - 1), Y = p(k) === s ? k : v(S(d, 1), -1);
      P(Y);
    }, H = (n, s) => {
      const d = s === "month" ? S(b, n) : C(b, n);
      Ce(d);
    }, Q = (n, s) => {
      const d = R ? ye(n) : n[0], h = yt(n, R);
      y(d), e.input(h), s && e.change(h);
    }, Ge = (n) => {
      if (!(!re && !ve && !me(n, T, B))) return;
      if (P(n), N(null), p(n) !== x && J(p(n)), !R) {
        Q([n, null], !0);
        return;
      }
      if (!j) {
        Q([n, null], !1);
        return;
      }
      const h = g, _ = n < h ? [n, h] : [h, n];
      Q(_, !0);
    }, je = (n) => {
      const s = o.current;
      return s ? s.querySelector(`[data-iso="${n}"]`) : null;
    };
    ee(() => {
      if (!a.current) return;
      const n = D ?? W, s = n ? je(n) : null;
      s && (a.current = !1, s.focus());
    });
    const We = (n) => {
      const s = ge(n, T, B);
      a.current = !0, P(s), p(s) !== x && J(p(s)), j && N(s);
    }, Ke = () => getComputedStyle(t.current).direction === "rtl" ? -1 : 1, He = (n) => {
      const s = D ?? W ?? b, d = Ke(), k = (w(s).getDay() - se + 7) % 7, Y = {
        ArrowLeft: v(s, -1 * d),
        ArrowRight: v(s, d),
        ArrowUp: v(s, -7),
        ArrowDown: v(s, 7),
        Home: v(s, -k),
        End: v(s, 6 - k),
        PageUp: n.shiftKey ? C(s, -1) : S(s, -1),
        PageDown: n.shiftKey ? C(s, 1) : S(s, 1)
      }[n.key];
      Y && (n.preventDefault(), We(Y));
    }, _e = () => N(null), Ue = (n) => {
      j && N(n);
    };
    ee(() => {
      const n = t.current;
      n.focus = () => {
        var d;
        const s = (d = o.current) == null ? void 0 : d.querySelector('.day[tabindex="0"]');
        s == null || s.focus();
      };
    }, []), ee(() => {
      g && u(p(g));
    }, [g]);
    const qe = e.label || r("calendar"), Ze = te(["calendar", re && "is-disabled"]), ce = "z-calendar-title";
    return /* @__PURE__ */ c("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ $("div", { class: Ze, role: "group", "aria-label": qe, children: [
      /* @__PURE__ */ $("div", { class: "header", children: [
        /* @__PURE__ */ $("div", { class: "stepper", children: [
          /* @__PURE__ */ c("button", { class: "arrow", type: "button", "aria-label": r("previousMonth"), disabled: !ze, onclick: () => H(-1, "month"), children: /* @__PURE__ */ c("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ c("polyline", { points: "15 18 9 12 15 6" }) }) }),
          /* @__PURE__ */ c("span", { class: "title is-month", id: ce, "aria-live": "polite", children: Ye }),
          /* @__PURE__ */ c("button", { class: "arrow", type: "button", "aria-label": r("nextMonth"), disabled: !Ee, onclick: () => H(1, "month"), children: /* @__PURE__ */ c("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ c("polyline", { points: "9 18 15 12 9 6" }) }) })
        ] }),
        /* @__PURE__ */ $("div", { class: "stepper", children: [
          /* @__PURE__ */ c("button", { class: "arrow", type: "button", "aria-label": r("previousYear"), disabled: !Ve, onclick: () => H(-1, "year"), children: /* @__PURE__ */ c("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ c("polyline", { points: "15 18 9 12 15 6" }) }) }),
          /* @__PURE__ */ c("span", { class: "title is-year", "aria-live": "polite", children: Te }),
          /* @__PURE__ */ c("button", { class: "arrow", type: "button", "aria-label": r("nextYear"), disabled: !$e, onclick: () => H(1, "year"), children: /* @__PURE__ */ c("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ c("polyline", { points: "9 18 15 12 9 6" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ $("div", { ref: o, class: "grid", role: "grid", "aria-labelledby": ce, onkeydown: He, onpointerleave: _e, children: [
        /* @__PURE__ */ c("div", { class: "week", role: "row", children: Be.map((n) => /* @__PURE__ */ c("span", { class: "weekday", role: "columnheader", "aria-label": n.long, children: n.short }, n.iso)) }),
        Re.map((n) => /* @__PURE__ */ c("div", { class: "week", role: "row", children: n.map((s) => /* @__PURE__ */ c("div", { class: s.cellClass, role: "gridcell", "aria-selected": s.isSelected ? "true" : "false", children: /* @__PURE__ */ c(
          "button",
          {
            class: s.dayClass,
            type: "button",
            "data-iso": s.iso,
            tabindex: s.isTabbable ? 0 : -1,
            "aria-label": s.label,
            "aria-current": s.isToday ? "date" : void 0,
            "aria-disabled": s.isDisabled ? "true" : void 0,
            onclick: () => Ge(s.iso),
            onpointerenter: () => Ue(s.iso),
            children: s.dayNumber
          }
        ) }, s.iso)) }, n[0].iso))
      ] })
    ] }) });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      month: { type: String, reflect: !0 },
      min: { type: String, reflect: !0 },
      max: { type: String, reflect: !0 },
      firstDayOfWeek: { type: Number, reflect: !0 },
      locale: String,
      label: String,
      tone: { type: lt("primary", "secondary", "tertiary"), reflect: !0 },
      isRange: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isReadOnly: { type: Boolean, reflect: !0 },
      isBorderless: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: X({ bubbles: !0, composed: !0 }),
      change: X({ bubbles: !0, composed: !0 }),
      monthchange: X({ bubbles: !0, composed: !0 })
    },
    styles: [wt, it]
  }
);
at("z-calendar", St);
export {
  St as Z,
  mt as a,
  pt as b,
  Lt as c,
  yt as d,
  ge as e,
  Ot as f,
  ht as g,
  v as h,
  me as i,
  p as j,
  Nt as m,
  L as n,
  Pt as p,
  It as r,
  ye as t
};
