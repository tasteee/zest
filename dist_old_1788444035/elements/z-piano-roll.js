import { c as _t, a as Jt, e as St, u as Qt, f as X, b as Mt, g as R, j as u, d as te } from "../chunks/define-element-BWC3wEPr.js";
import { u as T } from "../chunks/use-prop-DBBKVpkc.js";
import { u as _, a as Pt } from "../chunks/hooks-D9_x-ckD.js";
import { t as ee } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const re = _t`
	:host {
		display: flex;
		flex-direction: column;
		height: 360px;
		background: var(--background);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		overflow: hidden;
		font-family: var(--font-sans);
		color: var(--foreground);
		--pr-white-key: color-mix(in oklch, var(--background) 88%, var(--foreground));
		--pr-black-key: color-mix(in oklch, var(--background) 96%, var(--foreground));
		--pr-line: color-mix(in oklch, var(--border) 55%, transparent);
		--pr-bar-line: color-mix(in oklch, var(--border) 100%, transparent);
		--pr-scale-row: color-mix(in oklch, var(--accent) 8%, transparent);
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
		transition: background 0.12s ease, color 0.12s ease;
	}
	.tb-btn:hover {
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
		color: var(--foreground);
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
	.bar-label {
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		padding-left: 5px;
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
		border-left: 1px solid var(--pr-bar-line);
		font-variant-numeric: tabular-nums;
		pointer-events: none;
	}
	.keys {
		position: sticky;
		left: 0;
		z-index: 3;
		border-right: 1px solid var(--border);
		overflow: hidden;
		cursor: ew-resize;
		touch-action: none;
	}
	.key {
		position: absolute;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 6px;
		box-sizing: border-box;
		font-family: var(--font-mono);
		font-size: 9px;
		color: var(--muted-foreground);
		border-bottom: 1px solid var(--pr-line);
		cursor: pointer;
		user-select: none;
	}
	.key.is-white {
		background: var(--pr-white-key);
	}
	.key.is-black {
		background: var(--pr-black-key);
		color: color-mix(in oklch, var(--muted-foreground) 70%, transparent);
	}
	.key.is-c {
		color: var(--foreground);
	}
	.key:hover {
		background: color-mix(in oklch, var(--accent) 22%, var(--pr-white-key));
	}

	/* --- the note world --- */
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
		border-bottom: 1px solid var(--pr-line);
		pointer-events: none;
	}
	.rowbg.is-black {
		background: color-mix(in oklch, var(--foreground) 3.5%, transparent);
	}
	.rowbg.is-scale {
		background: var(--pr-scale-row);
	}
	.rowbg.is-root {
		background: color-mix(in oklch, var(--accent) 15%, transparent);
	}
	.gridlines {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 2;
	}
	.note {
		position: absolute;
		box-sizing: border-box;
		background: var(--pr-note);
		border: 1px solid color-mix(in oklch, black 35%, var(--pr-note));
		border-radius: 2px;
		z-index: 3;
		pointer-events: none;
		overflow: hidden;
		box-shadow: inset 0 1px 0 color-mix(in oklch, white 25%, transparent);
	}
	.note.is-selected {
		background: var(--pr-note-sel);
		border-color: color-mix(in oklch, white 70%, var(--pr-note-sel));
		z-index: 4;
	}
	.note .vel {
		position: absolute;
		left: 0;
		bottom: 0;
		top: 0;
		background: color-mix(in oklch, black 22%, transparent);
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
`, oe = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], zt = /* @__PURE__ */ new Set([1, 3, 6, 8, 10]), B = 6, I = 1e-6, Dt = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  "harmonic-minor": [0, 2, 3, 5, 7, 8, 11],
  "melodic-minor": [0, 2, 3, 5, 7, 9, 11],
  "pentatonic-major": [0, 2, 4, 7, 9],
  "pentatonic-minor": [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}, ne = (s) => `${oe[(s % 12 + 12) % 12]}${Math.floor(s / 12) - 1}`, g = (s, N, v) => Math.min(v, Math.max(N, s)), ae = (s, N, v) => {
  let E = [[s, N]];
  for (const [x, m] of v) {
    const w = [];
    for (const [k, d] of E)
      m <= k + I || x >= d - I ? w.push([k, d]) : (k < x - I && w.push([k, x]), m < d - I && w.push([m, d]));
    E = w;
  }
  return E;
}, ie = Jt(
  (s) => {
    const N = Qt(), v = X(), E = X(), x = X(1), m = X(null), w = X(null), k = () => {
      const t = x.current ?? 1;
      return x.current = t + 1, t;
    }, [d, ct] = _([]), [h, S] = _(() => /* @__PURE__ */ new Set()), [$t, J] = _(null), [K, lt] = _(null), [Bt, dt] = T("mode"), [It, Q] = T("fold"), [Nt, Ct] = T("snap"), [At, Rt] = T("beatWidth"), [Et, Kt] = T("rowHeight"), tt = s.beatsPerBar || 4, Yt = s.bars || 8, p = At || 48, y = Et || 18, ut = s.minPitch ?? 24, j = s.maxPitch ?? 96, b = Nt ?? 0.25, P = b > 0 ? b : 0.0625, Y = Bt || "select", C = It || "none", et = s.scale || "", rt = ((s.root || 0) % 12 + 12) % 12, q = s.defaultVelocity ?? 100, Ft = s.hasKeyboard ? 56 : 0, pt = 22, ht = (t) => {
      const e = Dt[et];
      return e ? e.includes(((t - rt) % 12 + 12) % 12) : !1;
    };
    Mt(() => {
      const t = s.notes;
      if (!Array.isArray(t)) return;
      let e = x.current ?? 1;
      const r = t.map((o, a) => {
        const n = typeof o.id == "number" ? o.id : e + a + 1;
        return e = Math.max(e, n), {
          id: n,
          pitch: g(Math.round(o.pitch ?? 60), 0, 127),
          start: Math.max(0, o.start ?? 0),
          duration: Math.max(P, o.duration ?? P),
          velocity: g(o.velocity ?? q, 1, 127)
        };
      });
      x.current = e + 1, ct(r);
    }, [s.notes]);
    const W = $t ?? d, bt = Math.max(
      Yt * tt,
      W.reduce((t, e) => Math.max(t, e.start + e.duration), 0)
    ), ft = bt * p, D = Pt(() => {
      const t = /* @__PURE__ */ new Set();
      for (const r of d) t.add(r.pitch);
      const e = [];
      for (let r = j; r >= ut; r--)
        C === "used" ? t.has(r) && e.push(r) : C === "scale" ? (ht(r) || t.has(r)) && e.push(r) : e.push(r);
      if (!e.length) for (let r = j; r >= j - 12; r--) e.push(r);
      return e;
    }, [d, C, et, rt, ut, j]), z = Pt(() => {
      const t = /* @__PURE__ */ new Map();
      return D.forEach((e, r) => t.set(e, r)), t;
    }, [D]), ot = D.length * y, mt = (t) => (z.get(t) ?? -1) * y, nt = (t) => D[g(Math.floor(t / y), 0, D.length - 1)], F = (t) => b > 0 ? Math.round(t / b) * b : t, vt = (t) => b > 0 ? Math.floor(t / b) * b : t, V = (t, e) => {
      const r = t.filter((n) => e.has(n.id)), o = t.filter((n) => !e.has(n.id)), a = [...r];
      for (const n of o) {
        const i = r.filter((l) => l.pitch === n.pitch).map((l) => [l.start, l.start + l.duration]);
        ae(n.start, n.start + n.duration, i).forEach(([l, f], $) => {
          f - l <= I || a.push($ === 0 ? { ...n, start: l, duration: f - l } : { ...n, id: k(), start: l, duration: f - l });
        });
      }
      return a;
    }, Ht = (t, e, r) => {
      if (t.type === "draw" || t.type === "resize-r")
        return t.orig.map((n) => {
          if (t.type === "draw") return { ...n, duration: Math.max(P, F(e - t.startBeat)) };
          const i = F(e - t.startBeat);
          return { ...n, duration: Math.max(P, n.duration + i) };
        });
      if (t.type === "resize-l") {
        const n = F(e - t.startBeat);
        return t.orig.map((i) => {
          const c = i.start + i.duration, l = g(i.start + n, 0, c - P);
          return { ...i, start: l, duration: c - l };
        });
      }
      const o = F(e - t.startBeat), a = r - t.startPitch;
      return t.orig.map((n) => ({
        ...n,
        start: Math.max(0, n.start + o),
        pitch: g(n.pitch + a, 0, 127)
      }));
    }, at = (t, e, r) => {
      const o = Ht(t, e, r), a = d.filter((n) => !t.movingIds.has(n.id));
      return V([...a, ...o], t.movingIds);
    }, M = (t, e) => {
      ct(t), e && S(e), s.change({ notes: t.map(({ id: r, pitch: o, start: a, duration: n, velocity: i }) => ({ id: r, pitch: o, start: a, duration: n, velocity: i })) });
    }, L = (t) => {
      const e = v.current.getBoundingClientRect(), r = Math.max(0, (t.clientX - e.left) / p), o = nt(t.clientY - e.top);
      return { beat: r, pitch: o, x: t.clientX - e.left, y: t.clientY - e.top };
    }, gt = (t, e) => {
      if (s.isDisabled || t.button !== 0) return;
      t.preventDefault(), t.currentTarget.setPointerCapture(t.pointerId), w.current = {
        pointerId: t.pointerId,
        startX: t.clientX,
        startY: t.clientY,
        startValue: e === "horizontal" ? p : y,
        axis: e
      };
    }, xt = (t) => {
      const e = w.current;
      if (!e || e.pointerId !== t.pointerId) return;
      t.preventDefault();
      const r = e.axis === "horizontal" ? t.clientY - e.startY : t.clientX - e.startX, o = Math.round(e.startValue * Math.exp(r / 160));
      e.axis === "horizontal" ? Rt(g(o, 12, 320)) : Kt(g(o, 9, 40));
    }, G = (t) => {
      var r;
      if (((r = w.current) == null ? void 0 : r.pointerId) !== t.pointerId) return;
      const e = t.currentTarget;
      e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId), w.current = null;
    }, Z = (t, e) => {
      for (let r = W.length - 1; r >= 0; r--) {
        const o = W[r];
        if (o.pitch === e && t >= o.start - I && t <= o.start + o.duration + I) return o;
      }
      return null;
    }, Xt = (t) => {
      var n, i;
      if (s.isDisabled || t.button === 2) return;
      (i = (n = N.current).focus) == null || i.call(n);
      const { beat: e, pitch: r } = L(t), o = Z(e, r), a = t.shiftKey || t.metaKey || t.ctrlKey;
      if (v.current.setPointerCapture(t.pointerId), o) {
        let c = new Set(h);
        a ? c.has(o.id) ? c.delete(o.id) : c.add(o.id) : c.has(o.id) || (c = /* @__PURE__ */ new Set([o.id])), S(c);
        const l = (e - o.start) * p, f = o.duration * p;
        let $ = "move";
        f > 3 * B && l < B ? $ = "resize-l" : f > 3 * B && f - l < B && ($ = "resize-r");
        const U = c.has(o.id) ? c : /* @__PURE__ */ new Set([o.id]);
        m.current = {
          type: $,
          startBeat: e,
          startPitch: r,
          movingIds: U,
          orig: d.filter((A) => U.has(A.id)).map((A) => ({ ...A })),
          additive: a,
          baseSelection: c
        };
        return;
      }
      if (Y === "draw") {
        const c = vt(e), l = { id: k(), pitch: r, start: c, duration: P, velocity: q }, f = /* @__PURE__ */ new Set([l.id]);
        S(f), m.current = {
          type: "draw",
          startBeat: c,
          startPitch: r,
          movingIds: f,
          orig: [l],
          additive: !1,
          baseSelection: f
        }, J(at(m.current, e, r));
      } else {
        const c = a ? new Set(h) : /* @__PURE__ */ new Set();
        a || S(c), m.current = {
          type: "marquee",
          startBeat: e,
          startPitch: r,
          movingIds: /* @__PURE__ */ new Set(),
          orig: [],
          additive: a,
          baseSelection: c
        };
      }
    }, Tt = (t) => {
      const e = m.current;
      if (!e) {
        jt(t);
        return;
      }
      const { beat: r, pitch: o, x: a, y: n } = L(t);
      if (e.type === "marquee") {
        const i = e.startBeat * p, c = (z.get(e.startPitch) ?? 0) * y;
        lt({ x: Math.min(i, a), y: Math.min(c, n), w: Math.abs(a - i), h: Math.abs(n - c) });
        const l = Math.min(e.startBeat, r), f = Math.max(e.startBeat, r), $ = Math.min(z.get(e.startPitch) ?? 0, z.get(o) ?? 0), U = Math.max(z.get(e.startPitch) ?? 0, z.get(o) ?? 0), A = new Set(e.baseSelection);
        for (const H of d) {
          const st = z.get(H.pitch);
          if (st == null) continue;
          const Ot = H.start <= f && H.start + H.duration >= l, Ut = st >= $ && st <= U;
          Ot && Ut && A.add(H.id);
        }
        S(A);
        return;
      }
      J(at(e, r, o));
    }, yt = (t) => {
      const e = m.current;
      if (!e) return;
      try {
        v.current.releasePointerCapture(t.pointerId);
      } catch {
      }
      if (e.type === "marquee") {
        lt(null), m.current = null, s.select({ ids: [...h] });
        return;
      }
      const { beat: r, pitch: o } = L(t), a = at(e, r, o);
      J(null), m.current = null, M(a, new Set(e.movingIds)), s.select({ ids: [...e.movingIds] });
    }, jt = (t) => {
      const e = v.current;
      if (!e) return;
      if (Y === "draw") {
        e.style.cursor = "crosshair";
        return;
      }
      const { beat: r, pitch: o } = L(t), a = Z(r, o);
      if (!a) {
        e.style.cursor = "default";
        return;
      }
      const n = (r - a.start) * p, i = a.duration * p;
      i > 3 * B && (n < B || i - n < B) ? e.style.cursor = "ew-resize" : e.style.cursor = "move";
    }, qt = (t) => {
      if (s.isDisabled) return;
      const e = v.current.getBoundingClientRect(), r = Math.max(0, (t.clientX - e.left) / p), o = nt(t.clientY - e.top), a = Z(r, o);
      if (a) {
        M(d.filter((l) => l.id !== a.id), /* @__PURE__ */ new Set());
        return;
      }
      const n = vt(r), i = { id: k(), pitch: o, start: n, duration: b > 0 ? b : 1, velocity: q }, c = /* @__PURE__ */ new Set([i.id]);
      M(V([...d, i], c), c);
    }, Wt = (t) => {
      if (s.isDisabled) return;
      t.preventDefault();
      const e = v.current.getBoundingClientRect(), r = Math.max(0, (t.clientX - e.left) / p), o = nt(t.clientY - e.top), a = Z(r, o);
      if (!a) return;
      const n = h.has(a.id) ? h : /* @__PURE__ */ new Set([a.id]);
      M(d.filter((i) => !n.has(i.id)), /* @__PURE__ */ new Set());
    }, wt = () => {
      if (!h.size) return;
      const t = d.filter((i) => h.has(i.id)), e = Math.min(...t.map((i) => i.start)), r = Math.max(...t.map((i) => i.start + i.duration)), o = Math.max(b, F(r - e)), a = t.map((i) => ({ ...i, id: k(), start: i.start + o })), n = new Set(a.map((i) => i.id));
      M(V([...d, ...a], n), n);
    }, O = (t, e) => {
      if (!h.size) return;
      const r = d.map(
        (o) => h.has(o.id) ? { ...o, start: Math.max(0, o.start + t), pitch: g(o.pitch + e, 0, 127) } : o
      );
      M(V(r, h), new Set(h));
    }, Vt = (t) => {
      if (s.isDisabled) return;
      const e = t.metaKey || t.ctrlKey;
      t.key === "Delete" || t.key === "Backspace" ? (t.preventDefault(), M(d.filter((r) => !h.has(r.id)), /* @__PURE__ */ new Set())) : e && (t.key === "d" || t.key === "D") ? (t.preventDefault(), wt()) : e && (t.key === "a" || t.key === "A") ? (t.preventDefault(), S(new Set(d.map((r) => r.id)))) : t.key === "Escape" ? S(/* @__PURE__ */ new Set()) : t.key === "ArrowLeft" ? (t.preventDefault(), O(-(b || 0.25), 0)) : t.key === "ArrowRight" ? (t.preventDefault(), O(b || 0.25, 0)) : t.key === "ArrowUp" ? (t.preventDefault(), O(0, t.shiftKey ? 12 : 1)) : t.key === "ArrowDown" && (t.preventDefault(), O(0, t.shiftKey ? -12 : -1));
    };
    Mt(() => {
      const t = N.current;
      t.getNotes = () => d.map(({ id: e, pitch: r, start: o, duration: a, velocity: n }) => ({ id: e, pitch: r, start: o, duration: a, velocity: n })), t.setNotes = (e) => {
        let r = x.current ?? 1;
        const o = (e || []).map((a, n) => {
          const i = typeof a.id == "number" ? a.id : r + n + 1;
          return r = Math.max(r, i), {
            id: i,
            pitch: g(Math.round(a.pitch ?? 60), 0, 127),
            start: Math.max(0, a.start ?? 0),
            duration: Math.max(P, a.duration ?? P),
            velocity: g(a.velocity ?? q, 1, 127)
          };
        });
        x.current = r + 1, M(o, /* @__PURE__ */ new Set());
      }, t.selectAll = () => S(new Set(d.map((e) => e.id))), t.clearSelection = () => S(/* @__PURE__ */ new Set()), t.deleteSelection = () => M(d.filter((e) => !h.has(e.id)), /* @__PURE__ */ new Set()), t.duplicateSelection = wt, t.getSelection = () => [...h];
    }, [d, h]);
    const Lt = b > 0 ? b * p : p, Gt = p, it = tt * p, Zt = [
      `repeating-linear-gradient(90deg, var(--pr-line) 0 1px, transparent 1px ${Lt}px)`,
      `repeating-linear-gradient(90deg, color-mix(in oklch, var(--border) 80%, transparent) 0 1px, transparent 1px ${Gt}px)`,
      `repeating-linear-gradient(90deg, var(--pr-bar-line) 0 1px, transparent 1px ${it}px)`
    ].join(", "), kt = [];
    for (let t = 0; t <= Math.floor(bt / tt); t++)
      kt.push(
        /* @__PURE__ */ u("div", { class: "bar-label", style: { left: `${t * it}px`, width: `${it}px` }, children: t + 1 })
      );
    return /* @__PURE__ */ R(
      "host",
      {
        shadowDom: !0,
        tabindex: "0",
        onkeydown: Vt,
        role: "application",
        "aria-label": "Piano roll MIDI editor",
        children: [
          s.hasToolbar && /* @__PURE__ */ R("div", { class: "toolbar", children: [
            /* @__PURE__ */ R("div", { class: "tb-group", children: [
              /* @__PURE__ */ u(
                "button",
                {
                  class: Y !== "draw" ? "tb-btn is-active" : "tb-btn",
                  onclick: () => dt("select"),
                  title: "Select / edit (V)",
                  children: "Select"
                }
              ),
              /* @__PURE__ */ u(
                "button",
                {
                  class: Y === "draw" ? "tb-btn is-active" : "tb-btn",
                  onclick: () => dt("draw"),
                  title: "Draw notes (B)",
                  children: "Draw"
                }
              )
            ] }),
            /* @__PURE__ */ u("div", { class: "tb-sep" }),
            /* @__PURE__ */ u("span", { class: "tb-label", children: "Grid" }),
            /* @__PURE__ */ u(
              "select",
              {
                class: "tb-select",
                onchange: (t) => Ct(Number(t.target.value)),
                children: [
                  ["1/1", 4],
                  ["1/2", 2],
                  ["1/4", 1],
                  ["1/8", 0.5],
                  ["1/16", 0.25],
                  ["1/32", 0.125],
                  ["1/64", 0.0625]
                ].map(([t, e]) => /* @__PURE__ */ u("option", { value: String(e), selected: b === e, children: t }))
              }
            ),
            /* @__PURE__ */ u("div", { class: "tb-sep" }),
            /* @__PURE__ */ R("div", { class: "tb-group", children: [
              /* @__PURE__ */ u(
                "button",
                {
                  class: C === "none" ? "tb-btn is-active" : "tb-btn",
                  onclick: () => Q("none"),
                  title: "Show all pitches",
                  children: "All"
                }
              ),
              /* @__PURE__ */ u(
                "button",
                {
                  class: C === "used" ? "tb-btn is-active" : "tb-btn",
                  onclick: () => Q("used"),
                  title: "Fold to used notes",
                  children: "Fold"
                }
              ),
              /* @__PURE__ */ u(
                "button",
                {
                  class: C === "scale" ? "tb-btn is-active" : "tb-btn",
                  onclick: () => Q("scale"),
                  title: "Fold to scale",
                  children: "Scale"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ u("div", { class: "scroll", ref: E, children: /* @__PURE__ */ R(
            "div",
            {
              class: "layout",
              style: {
                gridTemplateColumns: `${Ft}px ${ft}px`,
                gridTemplateRows: `${pt}px ${ot}px`
              },
              children: [
                /* @__PURE__ */ u("div", { class: "corner" }),
                /* @__PURE__ */ u("div", { class: "ruler", style: { height: `${pt}px` }, onpointerdown: (t) => gt(t, "horizontal"), onpointermove: xt, onpointerup: G, onpointercancel: G, children: kt }),
                s.hasKeyboard && /* @__PURE__ */ u("div", { class: "keys", style: { height: `${ot}px` }, onpointerdown: (t) => gt(t, "vertical"), onpointermove: xt, onpointerup: G, onpointercancel: G, children: D.map((t) => {
                  const e = zt.has((t % 12 + 12) % 12), r = t % 12 === 0;
                  return /* @__PURE__ */ u(
                    "div",
                    {
                      class: `key ${e ? "is-black" : "is-white"} ${r ? "is-c" : ""}`,
                      style: { top: `${mt(t)}px`, height: `${y}px` },
                      children: r || y >= 16 ? ne(t) : ""
                    }
                  );
                }) }),
                /* @__PURE__ */ R(
                  "div",
                  {
                    class: `world mode-${Y}`,
                    ref: v,
                    style: { width: `${ft}px`, height: `${ot}px` },
                    onpointerdown: Xt,
                    onpointermove: Tt,
                    onpointerup: yt,
                    onpointercancel: yt,
                    ondblclick: qt,
                    oncontextmenu: Wt,
                    children: [
                      D.map((t) => {
                        const e = (t % 12 + 12) % 12, r = zt.has(e), o = !!Dt[et], a = o && e === rt, n = o && ht(t);
                        let i = "rowbg";
                        return a ? i += " is-root" : n ? i += " is-scale" : r && (i += " is-black"), /* @__PURE__ */ u("div", { class: i, style: { top: `${mt(t)}px`, height: `${y}px` } });
                      }),
                      /* @__PURE__ */ u("div", { class: "gridlines", style: { backgroundImage: Zt } }),
                      W.map((t) => {
                        const e = z.get(t.pitch);
                        if (e == null) return null;
                        const r = h.has(t.id), o = 1 - g(t.velocity, 1, 127) / 127;
                        return /* @__PURE__ */ u(
                          "div",
                          {
                            class: r ? "note is-selected" : "note",
                            style: {
                              left: `${t.start * p}px`,
                              top: `${e * y}px`,
                              width: `${Math.max(2, t.duration * p)}px`,
                              height: `${y - 1}px`
                            },
                            children: /* @__PURE__ */ u("div", { class: "vel", style: { width: `${o * 100}%` } })
                          }
                        );
                      }),
                      K && /* @__PURE__ */ u(
                        "div",
                        {
                          class: "marquee",
                          style: {
                            left: `${K.x}px`,
                            top: `${K.y}px`,
                            width: `${K.w}px`,
                            height: `${K.h}px`
                          }
                        }
                      ),
                      s.playhead != null && s.playhead >= 0 && /* @__PURE__ */ u("div", { class: "playhead", style: { left: `${s.playhead * p}px` } })
                    ]
                  }
                )
              ]
            }
          ) })
        ]
      }
    );
  },
  {
    props: {
      notes: { type: Array },
      bars: { type: Number, reflect: !0 },
      beatsPerBar: { type: Number, reflect: !0 },
      snap: { type: Number, reflect: !0 },
      beatWidth: { type: Number, reflect: !0 },
      rowHeight: { type: Number, reflect: !0 },
      minPitch: { type: Number, reflect: !0 },
      maxPitch: { type: Number, reflect: !0 },
      mode: { type: String, reflect: !0 },
      fold: { type: String, reflect: !0 },
      scale: { type: String, reflect: !0 },
      root: { type: Number, reflect: !0 },
      defaultVelocity: { type: Number, reflect: !0 },
      playhead: { type: Number, reflect: !0 },
      hasToolbar: { type: Boolean, reflect: !0, value: () => !0 },
      hasKeyboard: { type: Boolean, reflect: !0, value: () => !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: St({ bubbles: !0, composed: !0 }),
      select: St({ bubbles: !0, composed: !0 })
    },
    styles: [ee, re]
  }
);
te("z-piano-roll", ie);
export {
  ie as ZPianoRoll
};
