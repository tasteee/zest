import { c as ne, a as ae, e as Pt, u as ie, f as X, b as at, g as E, j as u, d as se } from "../chunks/define-element-BWC3wEPr.js";
import { u as Q } from "../chunks/use-prop-DBBKVpkc.js";
import { u as _, a as le } from "../chunks/hooks-D9_x-ckD.js";
import { t as ce } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const de = ne`
	:host {
		display: flex;
		flex-direction: column;
		height: 320px;
		background: var(--background);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		overflow: hidden;
		font-family: var(--font-sans);
		color: var(--foreground);
		--pr-line: color-mix(in oklch, var(--border) 88%, var(--foreground));
		--pr-bar-line: color-mix(in oklch, var(--border) 100%, transparent);
		--pr-note: var(--accent);
		--pr-note-sel: var(--accent-alt);
		outline: none;
	}
	:host([is-hidden]) {
		display: none;
	}
	:host([is-disabled]) {
		opacity: 0.55;
		pointer-events: none;
	}

	/* --- toolbar --- */
	.toolbar {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		border-bottom: 1px solid var(--border);
		background: var(--card);
		flex-shrink: 0;
		user-select: none;
	}
	.tb-group {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		background: color-mix(in oklch, var(--card) 89%, var(--foreground));
		border: 1px solid color-mix(in oklch, var(--border) 72%, var(--foreground));
		border-radius: var(--radius-sm);
		padding: 2px;
	}
	.tb-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		height: 1.75rem;
		padding-inline: 0.55rem;
		border: none;
		background: transparent;
		color: var(--muted-foreground);
		font-family: var(--font-sans);
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-medium);
		border-radius: var(--small-button-radius);
		cursor: pointer;
		transition:
			background 0.12s ease,
			color 0.12s ease;
	}
	.tb-btn:hover {
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
		color: var(--foreground);
	}
	.tb-btn:disabled {
		opacity: 0.4;
		cursor: default;
	}
	.tb-btn.is-active {
		background: var(--background);
		color: var(--foreground);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
	}
	.tb-sep {
		width: 1px;
		align-self: stretch;
		background: var(--border);
		margin-inline: 0.15rem;
	}
	.tb-label {
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
		font-variant-numeric: tabular-nums;
	}
	.tb-select {
		height: 1.75rem;
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
		color: var(--foreground);
		border: 1px solid var(--border);
		border-radius: var(--small-button-radius);
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
		padding-inline: 0.35rem;
		cursor: pointer;
	}
	.tb-spacer {
		flex: 1;
	}

	/* --- scroll surface + grid layout --- */
	.scroll {
		position: relative;
		flex: 1;
		overflow: auto;
		background: var(--background);
	}
	.layout {
		display: grid;
		position: relative;
	}
	.corner {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 4;
		background: var(--card);
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}
	.ruler {
		position: sticky;
		top: 0;
		z-index: 3;
		background: var(--card);
		border-bottom: 1px solid var(--border);
		overflow: hidden;
		cursor: ns-resize;
		user-select: none;
		touch-action: none;
	}
	.beat-label {
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		padding-left: 5px;
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
		border-left: 1px solid var(--pr-line);
		font-variant-numeric: tabular-nums;
		pointer-events: none;
	}
	.beat-label.is-bar {
		border-left-color: var(--pr-bar-line);
		color: var(--foreground);
	}
	.keys {
		position: sticky;
		left: 0;
		z-index: 3;
		border-right: 1px solid var(--border);
		overflow: hidden;
		background: var(--card);
		cursor: ew-resize;
		touch-action: none;
	}

	.deg {
		position: absolute;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: var(--font-weight-semibold);
		color: var(--muted-foreground);
		border-bottom: 1px solid var(--pr-line);
		cursor: default;
		user-select: none;
	}
	.deg.is-root {
		color: var(--foreground);
	}

	/* --- the signal world --- */
	.world {
		position: relative;
		z-index: 1;
		touch-action: none;
	}
	.world.mode-draw {
		cursor: crosshair;
	}
	.rowbg {
		position: absolute;
		left: 0;
		right: 0;
		box-sizing: border-box;
		border-top: 1px solid var(--pr-line);
		pointer-events: none;
		background: var(--background);
	}
	.gridlines {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 2;
	}
	.signal {
		position: absolute;
		box-sizing: border-box;
		background: var(--pr-note);
		border: 1px solid color-mix(in oklch, black 35%, var(--pr-note));
		border-radius: 3px;
		z-index: 3;
		pointer-events: none;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding-inline: 4px;
		gap: 3px;
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: var(--font-weight-semibold);
		color: color-mix(in oklch, black 78%, var(--pr-note));
		box-shadow: inset 0 1px 0 color-mix(in oklch, white 25%, transparent);
	}
	.signal.is-selected {
		background: var(--pr-note-sel);
		border-color: color-mix(in oklch, white 70%, var(--pr-note-sel));
		color: color-mix(in oklch, black 78%, var(--pr-note-sel));
		z-index: 4;
	}
	.signal.is-disabled {
		filter: grayscale(1);
		opacity: 0.4;
	}
	.signal .vel {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		background: color-mix(in oklch, black 22%, transparent);
		pointer-events: none;
	}
	.signal .prob {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 3px;
		background: color-mix(in oklch, white 55%, transparent);
		pointer-events: none;
	}
	.signal .label {
		position: relative;
		z-index: 1;
		white-space: nowrap;
	}
	.signal .oct {
		position: relative;
		z-index: 1;
		opacity: 0.85;
		font-size: 9px;
	}
	.marquee {
		position: absolute;
		z-index: 6;
		border: 1px solid var(--accent);
		background: color-mix(in oklch, var(--accent) 15%, transparent);
		pointer-events: none;
	}
	.playhead {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		background: var(--accent-alt);
		z-index: 7;
		pointer-events: none;
	}
`, T = 6, I = 1e-6, h = (s, R, g) => Math.min(g, Math.max(R, s)), Tt = (s) => `${s.tone}:${s.octave}`, ue = (s, R, g) => {
  let K = [[s, R]];
  for (const [M, v] of g) {
    const x = [];
    for (const [y, d] of K)
      v <= y + I || M >= d - I ? x.push([y, d]) : (y < M - I && x.push([y, M]), v < d - I && x.push([v, d]));
    K = x;
  }
  return K;
}, pe = ae(
  (s) => {
    const R = ie(), g = X(), K = X(), M = X(1), v = X(null), x = X(null), y = () => {
      const t = M.current ?? 1;
      return M.current = t + 1, t;
    }, [d, it] = _([]), [p, w] = _(() => /* @__PURE__ */ new Set()), [It, tt] = _(null), [W, st] = _(null), [Rt, lt] = Q("mode"), [Kt, Ht] = Q("snap"), [Nt, ct] = Q("beatWidth"), [Ct, At] = Q("rowHeight"), z = Math.max(1, s.tones || 8), dt = Math.max(0, s.toneMargin ?? 3), $ = 1 - dt * z, k = z + dt * z, Et = k - $ + 1, Wt = (t) => {
      const e = t - 1, r = Math.floor(e / z);
      return { degree: (e % z + z) % z + 1, band: r };
    }, ut = (t) => {
      const { degree: e, band: r } = Wt(t);
      return `N${e}${r === 0 ? "" : r > 0 ? `+${r}` : r}`;
    }, pt = s.chordSize && s.chordSize > 0 ? Math.round(s.chordSize) : 0, V = s.beatsPerBar || 4, Yt = s.length || 4, f = Nt || 48, D = Ct || 22, b = Kt ?? 0.25, H = b > 0 ? b : 0.0625, Y = Rt || "select", j = s.defaultVelocity ?? 100, et = s.defaultOctave ?? 0, bt = s.hasKeyboard ? 48 : 0, rt = 22, ft = (t) => {
      let e = M.current ?? 1;
      const r = (t || []).map((o, a) => {
        const n = typeof o.id == "number" ? o.id : e + a + 1;
        return e = Math.max(e, n), {
          id: n,
          tone: h(Math.round(o.tone ?? 1), $, k),
          octave: Math.round(o.octave ?? et),
          start: Math.max(0, o.start ?? 0),
          duration: Math.max(H, o.duration ?? H),
          velocity: h(Math.round(o.velocity ?? j), 1, 127),
          probability: h(o.probability ?? 1, 0, 1),
          enabled: o.enabled !== !1
        };
      });
      return M.current = e + 1, r;
    };
    at(() => {
      Array.isArray(s.signals) && it(ft(s.signals));
    }, [s.signals]);
    const O = It ?? d, ht = Math.max(
      Yt,
      O.reduce((t, e) => Math.max(t, e.start + e.duration), 0)
    ), mt = ht * f, vt = le(() => {
      const t = [];
      for (let e = k; e >= $; e--) t.push(e);
      return t;
    }, [$, k]), L = Et * D, Z = (t) => (k - t) * D, qt = (t) => h(k - Math.floor(t / D), $, k);
    at(() => {
      const t = K.current;
      if (!t) return;
      const e = t.clientWidth - bt;
      e > 0 && ct(h(e / 4, 12, 320));
      const r = t.clientHeight;
      if (r > 0) {
        const o = rt + L / 2 - r / 2;
        t.scrollTop = h(o, 0, Math.max(0, t.scrollHeight - r));
      }
    }, []);
    const q = (t) => b > 0 ? Math.round(t / b) * b : t, gt = (t) => b > 0 ? Math.floor(t / b) * b : t, F = (t, e) => {
      const r = t.filter((n) => e.has(n.id)), o = t.filter((n) => !e.has(n.id)), a = [...r];
      for (const n of o) {
        const i = r.filter((c) => Tt(c) === Tt(n)).map((c) => [c.start, c.start + c.duration]);
        ue(n.start, n.start + n.duration, i).forEach(([c, m], P) => {
          m - c <= I || a.push(P === 0 ? { ...n, start: c, duration: m - c } : { ...n, id: y(), start: c, duration: m - c });
        });
      }
      return a;
    }, Xt = (t, e, r) => {
      if (t.type === "draw" || t.type === "resize-r")
        return t.orig.map((n) => {
          if (t.type === "draw") return { ...n, duration: Math.max(H, q(e - t.startBeat)) };
          const i = q(e - t.startBeat);
          return { ...n, duration: Math.max(H, n.duration + i) };
        });
      if (t.type === "resize-l") {
        const n = q(e - t.startBeat);
        return t.orig.map((i) => {
          const l = i.start + i.duration, c = h(i.start + n, 0, l - H);
          return { ...i, start: c, duration: l - c };
        });
      }
      const o = q(e - t.startBeat), a = r - t.startTone;
      return t.orig.map((n) => ({
        ...n,
        start: Math.max(0, n.start + o),
        tone: h(n.tone + a, $, k)
      }));
    }, ot = (t, e, r) => {
      const o = Xt(t, e, r), a = d.filter((n) => !t.movingIds.has(n.id));
      return F([...a, ...o], t.movingIds);
    }, Vt = (t) => s.change({
      signals: t.map(({ id: e, tone: r, octave: o, start: a, duration: n, velocity: i, probability: l, enabled: c }) => ({
        id: e,
        tone: r,
        octave: o,
        start: a,
        duration: n,
        velocity: i,
        probability: l,
        enabled: c
      }))
    }), S = (t, e) => {
      it(t), e && w(e), Vt(t);
    }, N = (t) => {
      const e = g.current.getBoundingClientRect(), r = Math.max(0, (t.clientX - e.left) / f), o = qt(t.clientY - e.top);
      return { beat: r, tone: o, x: t.clientX - e.left, y: t.clientY - e.top };
    }, xt = (t, e) => {
      if (s.isDisabled || t.button !== 0) return;
      t.preventDefault(), t.currentTarget.setPointerCapture(t.pointerId), x.current = {
        pointerId: t.pointerId,
        startX: t.clientX,
        startY: t.clientY,
        startValue: e === "horizontal" ? f : D,
        axis: e
      };
    }, yt = (t) => {
      const e = x.current;
      if (!e || e.pointerId !== t.pointerId) return;
      t.preventDefault();
      const r = e.axis === "horizontal" ? t.clientY - e.startY : t.clientX - e.startX, o = Math.round(e.startValue * Math.exp(r / 160));
      e.axis === "horizontal" ? ct(h(o, 12, 320)) : At(h(o, 9, 40));
    }, U = (t) => {
      var r;
      if (((r = x.current) == null ? void 0 : r.pointerId) !== t.pointerId) return;
      const e = t.currentTarget;
      e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId), x.current = null;
    }, G = (t, e) => {
      for (let r = O.length - 1; r >= 0; r--) {
        const o = O[r];
        if (o.tone === e && t >= o.start - I && t <= o.start + o.duration + I) return o;
      }
      return null;
    }, jt = (t) => {
      var n, i;
      if (s.isDisabled || t.button === 2) return;
      (i = (n = R.current).focus) == null || i.call(n);
      const { beat: e, tone: r } = N(t), o = G(e, r), a = t.shiftKey || t.metaKey || t.ctrlKey;
      if (g.current.setPointerCapture(t.pointerId), o) {
        let l = new Set(p);
        a ? l.has(o.id) ? l.delete(o.id) : l.add(o.id) : l.has(o.id) || (l = /* @__PURE__ */ new Set([o.id])), w(l);
        const c = (e - o.start) * f, m = o.duration * f;
        let P = "move";
        m > 3 * T && c < T ? P = "resize-l" : m > 3 * T && m - c < T && (P = "resize-r");
        const J = l.has(o.id) ? l : /* @__PURE__ */ new Set([o.id]);
        v.current = {
          type: P,
          startBeat: e,
          startTone: r,
          movingIds: J,
          orig: d.filter((C) => J.has(C.id)).map((C) => ({ ...C })),
          additive: a,
          baseSelection: l
        };
        return;
      }
      if (Y === "draw") {
        const l = gt(e), c = {
          id: y(),
          tone: r,
          octave: et,
          start: l,
          duration: H,
          velocity: j,
          probability: 1,
          enabled: !0
        }, m = /* @__PURE__ */ new Set([c.id]);
        w(m), v.current = {
          type: "draw",
          startBeat: l,
          startTone: r,
          movingIds: m,
          orig: [c],
          additive: !1,
          baseSelection: m
        }, tt(ot(v.current, e, r));
      } else {
        const l = a ? new Set(p) : /* @__PURE__ */ new Set();
        a || w(l), v.current = {
          type: "marquee",
          startBeat: e,
          startTone: r,
          movingIds: /* @__PURE__ */ new Set(),
          orig: [],
          additive: a,
          baseSelection: l
        };
      }
    }, Ot = (t) => {
      const e = v.current;
      if (!e) {
        Lt(t);
        return;
      }
      const { beat: r, tone: o, x: a, y: n } = N(t);
      if (e.type === "marquee") {
        const i = e.startBeat * f, l = Z(e.startTone);
        st({ x: Math.min(i, a), y: Math.min(l, n), w: Math.abs(a - i), h: Math.abs(n - l) });
        const c = Math.min(e.startBeat, r), m = Math.max(e.startBeat, r), P = Math.min(e.startTone, o), J = Math.max(e.startTone, o), C = new Set(e.baseSelection);
        for (const A of d) {
          const re = A.start <= m && A.start + A.duration >= c, oe = A.tone >= P && A.tone <= J;
          re && oe && C.add(A.id);
        }
        w(C);
        return;
      }
      tt(ot(e, r, o));
    }, wt = (t) => {
      const e = v.current;
      if (!e) return;
      try {
        g.current.releasePointerCapture(t.pointerId);
      } catch {
      }
      if (e.type === "marquee") {
        st(null), v.current = null, s.select({ ids: [...p] });
        return;
      }
      const { beat: r, tone: o } = N(t), a = ot(e, r, o);
      tt(null), v.current = null, S(a, new Set(e.movingIds)), s.select({ ids: [...e.movingIds] });
    }, Lt = (t) => {
      const e = g.current;
      if (!e) return;
      if (Y === "draw") {
        e.style.cursor = "crosshair";
        return;
      }
      const { beat: r, tone: o } = N(t), a = G(r, o);
      if (!a) {
        e.style.cursor = "default";
        return;
      }
      const n = (r - a.start) * f, i = a.duration * f;
      i > 3 * T && (n < T || i - n < T) ? e.style.cursor = "ew-resize" : e.style.cursor = "move";
    }, Zt = (t) => {
      if (s.isDisabled) return;
      const { beat: e, tone: r } = N(t), o = G(e, r);
      if (o) {
        S(
          d.filter((i) => i.id !== o.id),
          /* @__PURE__ */ new Set()
        );
        return;
      }
      const a = {
        id: y(),
        tone: r,
        octave: et,
        start: gt(e),
        duration: b > 0 ? b : 1,
        velocity: j,
        probability: 1,
        enabled: !0
      }, n = /* @__PURE__ */ new Set([a.id]);
      S(F([...d, a], n), n);
    }, Ft = (t) => {
      if (s.isDisabled) return;
      t.preventDefault();
      const { beat: e, tone: r } = N(t), o = G(e, r);
      if (!o) return;
      const a = p.has(o.id) ? p : /* @__PURE__ */ new Set([o.id]);
      S(
        d.filter((n) => !a.has(n.id)),
        /* @__PURE__ */ new Set()
      );
    }, kt = () => {
      if (!p.size) return;
      const t = d.filter((i) => p.has(i.id)), e = Math.min(...t.map((i) => i.start)), r = Math.max(...t.map((i) => i.start + i.duration)), o = Math.max(b, q(r - e)), a = t.map((i) => ({ ...i, id: y(), start: i.start + o })), n = new Set(a.map((i) => i.id));
      S(F([...d, ...a], n), n);
    }, B = (t) => {
      if (!p.size) return;
      const e = d.map((r) => p.has(r.id) ? t(r) : r);
      S(F(e, p), new Set(p));
    }, St = (t) => B((e) => ({ ...e, start: Math.max(0, e.start + t) })), Mt = (t) => B((e) => ({ ...e, tone: h(e.tone + t, $, k) })), zt = (t) => B((e) => ({ ...e, octave: h(e.octave + t, -4, 4) })), $t = (t) => B((e) => ({ ...e, velocity: h(e.velocity + t, 1, 127) })), Dt = (t) => B((e) => ({ ...e, probability: h(Math.round((e.probability + t) * 100) / 100, 0, 1) })), Ut = () => B((t) => ({ ...t, enabled: !t.enabled })), Gt = () => B((t) => ({ ...t, octave: 0, velocity: j, probability: 1 })), Jt = (t) => {
      if (s.isDisabled) return;
      const e = t.metaKey || t.ctrlKey, r = t.key;
      r === "Delete" || r === "Backspace" ? (t.preventDefault(), S(
        d.filter((o) => !p.has(o.id)),
        /* @__PURE__ */ new Set()
      )) : e && (r === "d" || r === "D") ? (t.preventDefault(), kt()) : e && (r === "a" || r === "A") ? (t.preventDefault(), w(new Set(d.map((o) => o.id)))) : r === "Escape" ? w(/* @__PURE__ */ new Set()) : r === "ArrowLeft" ? (t.preventDefault(), St(-(b || 0.25))) : r === "ArrowRight" ? (t.preventDefault(), St(b || 0.25)) : r === "ArrowUp" ? (t.preventDefault(), t.shiftKey ? zt(1) : t.altKey ? $t(5) : Mt(1)) : r === "ArrowDown" ? (t.preventDefault(), t.shiftKey ? zt(-1) : t.altKey ? $t(-5) : Mt(-1)) : r === "," ? (t.preventDefault(), Dt(-0.1)) : r === "." ? (t.preventDefault(), Dt(0.1)) : r === "0" ? Ut() : (r === "r" || r === "R") && Gt();
    };
    at(() => {
      const t = R.current;
      t.getSignals = () => d.map(({ id: e, tone: r, octave: o, start: a, duration: n, velocity: i, probability: l, enabled: c }) => ({
        id: e,
        tone: r,
        octave: o,
        start: a,
        duration: n,
        velocity: i,
        probability: l,
        enabled: c
      })), t.setSignals = (e) => S(ft(e), /* @__PURE__ */ new Set()), t.selectAll = () => w(new Set(d.map((e) => e.id))), t.clearSelection = () => w(/* @__PURE__ */ new Set()), t.deleteSelection = () => S(
        d.filter((e) => !p.has(e.id)),
        /* @__PURE__ */ new Set()
      ), t.duplicateSelection = kt, t.getSelection = () => [...p];
    }, [d, p]);
    const Qt = b > 0 ? b * f : f, nt = f, _t = V * f, te = [
      `repeating-linear-gradient(90deg, var(--pr-line) 0 1px, transparent 1px ${Qt}px)`,
      `repeating-linear-gradient(90deg, color-mix(in oklch, var(--border) 80%, transparent) 0 1px, transparent 1px ${nt}px)`,
      `repeating-linear-gradient(90deg, var(--pr-bar-line) 0 1px, transparent 1px ${_t}px)`
    ].join(", "), Bt = [];
    for (let t = 0; t < Math.ceil(ht); t++) {
      const e = t % V === 0;
      Bt.push(
        /* @__PURE__ */ u("div", { class: e ? "beat-label is-bar" : "beat-label", style: { left: `${t * nt}px`, width: `${nt}px` }, children: e ? `${Math.floor(t / V) + 1}` : `.${t % V + 1}` })
      );
    }
    const ee = (t) => pt > 0 && (t - 1) % pt === 0;
    return /* @__PURE__ */ E("host", { shadowDom: !0, tabindex: "0", onkeydown: Jt, role: "application", "aria-label": "Chord pattern editor", children: [
      s.hasToolbar && /* @__PURE__ */ E("div", { class: "toolbar", children: [
        /* @__PURE__ */ E("div", { class: "tb-group", children: [
          /* @__PURE__ */ u(
            "button",
            {
              class: Y !== "draw" ? "tb-btn is-active" : "tb-btn",
              onclick: () => lt("select"),
              title: "Select / edit",
              children: "Select"
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              class: Y === "draw" ? "tb-btn is-active" : "tb-btn",
              onclick: () => lt("draw"),
              title: "Draw signals",
              children: "Draw"
            }
          )
        ] }),
        /* @__PURE__ */ u("div", { class: "tb-sep" }),
        /* @__PURE__ */ u("span", { class: "tb-label", children: "Grid" }),
        /* @__PURE__ */ u("select", { class: "tb-select", onchange: (t) => Ht(Number(t.target.value)), children: [
          ["1/1", 4],
          ["1/2", 2],
          ["1/4", 1],
          ["1/8", 0.5],
          ["1/16", 0.25],
          ["1/32", 0.125],
          ["1/64", 0.0625]
        ].map(([t, e]) => /* @__PURE__ */ u("option", { value: String(e), selected: b === e, children: t })) })
      ] }),
      /* @__PURE__ */ u("div", { class: "scroll", ref: K, children: /* @__PURE__ */ E(
        "div",
        {
          class: "layout",
          style: {
            gridTemplateColumns: `${bt}px ${mt}px`,
            gridTemplateRows: `${rt}px ${L}px`
          },
          children: [
            /* @__PURE__ */ u("div", { class: "corner" }),
            /* @__PURE__ */ u("div", { class: "ruler", style: { height: `${rt}px` }, onpointerdown: (t) => xt(t, "horizontal"), onpointermove: yt, onpointerup: U, onpointercancel: U, children: Bt }),
            s.hasKeyboard && /* @__PURE__ */ u("div", { class: "keys", style: { height: `${L}px` }, onpointerdown: (t) => xt(t, "vertical"), onpointermove: yt, onpointerup: U, onpointercancel: U, children: vt.map((t) => /* @__PURE__ */ u(
              "div",
              {
                class: ee(t) ? "deg is-root" : "deg",
                style: { top: `${Z(t)}px`, height: `${D}px` },
                children: ut(t)
              }
            )) }),
            /* @__PURE__ */ E(
              "div",
              {
                class: `world mode-${Y}`,
                ref: g,
                style: { width: `${mt}px`, height: `${L}px` },
                onpointerdown: jt,
                onpointermove: Ot,
                onpointerup: wt,
                onpointercancel: wt,
                ondblclick: Zt,
                oncontextmenu: Ft,
                children: [
                  vt.map((t) => /* @__PURE__ */ u("div", { class: "rowbg", style: { top: `${Z(t)}px`, height: `${D}px` } })),
                  /* @__PURE__ */ u("div", { class: "gridlines", style: { backgroundImage: te } }),
                  O.map((t) => {
                    const e = p.has(t.id), r = 1 - h(t.velocity, 1, 127) / 127, o = Math.max(3, t.duration * f);
                    let a = "signal";
                    return e && (a += " is-selected"), t.enabled || (a += " is-disabled"), /* @__PURE__ */ E(
                      "div",
                      {
                        class: a,
                        style: {
                          left: `${t.start * f}px`,
                          top: `${Z(t.tone)}px`,
                          width: `${o}px`,
                          height: `${D - 1}px`
                        },
                        children: [
                          /* @__PURE__ */ u("div", { class: "vel", style: { width: `${r * 100}%` } }),
                          t.probability < 1 && /* @__PURE__ */ u("div", { class: "prob", style: { width: `${t.probability * 100}%` } }),
                          o > 18 && /* @__PURE__ */ u("span", { class: "label", children: ut(t.tone) }),
                          t.octave !== 0 && o > 30 && /* @__PURE__ */ u("span", { class: "oct", children: t.octave > 0 ? `+${t.octave}` : t.octave })
                        ]
                      }
                    );
                  }),
                  W && /* @__PURE__ */ u(
                    "div",
                    {
                      class: "marquee",
                      style: {
                        left: `${W.x}px`,
                        top: `${W.y}px`,
                        width: `${W.w}px`,
                        height: `${W.h}px`
                      }
                    }
                  ),
                  s.playhead != null && s.playhead >= 0 && /* @__PURE__ */ u("div", { class: "playhead", style: { left: `${s.playhead * f}px` } })
                ]
              }
            )
          ]
        }
      ) })
    ] });
  },
  {
    props: {
      signals: { type: Array },
      tones: { type: Number, reflect: !0 },
      toneMargin: { type: Number, reflect: !0 },
      chordSize: { type: Number, reflect: !0 },
      length: { type: Number, reflect: !0 },
      beatsPerBar: { type: Number, reflect: !0 },
      snap: { type: Number, reflect: !0 },
      beatWidth: { type: Number, reflect: !0 },
      rowHeight: { type: Number, reflect: !0 },
      mode: { type: String, reflect: !0 },
      defaultVelocity: { type: Number, reflect: !0 },
      defaultOctave: { type: Number, reflect: !0 },
      playhead: { type: Number, reflect: !0 },
      hasToolbar: { type: Boolean, reflect: !0, value: () => !0 },
      hasKeyboard: { type: Boolean, reflect: !0, value: () => !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: Pt({ bubbles: !0, composed: !0 }),
      select: Pt({ bubbles: !0, composed: !0 })
    },
    styles: [ce, de]
  }
);
se("z-pattern-roll", pe);
export {
  pe as ZPatternRoll
};
