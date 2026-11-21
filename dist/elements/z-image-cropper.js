// @ts-self-types="./z-image-cropper.d.ts"
import { c as Vt, a as Yt, e as K, u as _t, f as I, b as Y, g as T, j as d, d as Wt } from "../chunks/define-element-BZUk-KLk.js";
import { i as Nt } from "../chunks/interaction-styles-C6mMacCu.js";
import { s as jt } from "../chunks/accessible-NC1hpH4S.js";
import { u as Ft } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as Z } from "../chunks/hooks-DEFT8qqt.js";
import { o as it } from "../chunks/prop-types-CSJu2W-0.js";
import { u as Xt } from "../chunks/locale-BNhgEFKA.js";
import "./z-slider.js";
const Kt = Vt`
	:host {
		display: block;
		width: 100%;
		min-width: 0;
		--z-image-cropper-height: 20rem;
		--frame-color: color-mix(in oklch, var(--text-strong) 90%, transparent);
		--grid-color: color-mix(in oklch, var(--text-strong) 35%, transparent);
	}

	:host([is-hidden]) {
		display: none;
	}

	.stage {
		position: relative;
		height: var(--z-image-cropper-height);
		overflow: hidden;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		background: var(--surface-subtle);
		cursor: grab;
		touch-action: none;
		user-select: none;
		-webkit-user-select: none;
		outline: none;
	}

	.stage:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.stage.is-dragging {
		cursor: grabbing;
	}

	.stage.is-disabled {
		cursor: default;
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.stage.is-empty {
		cursor: default;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		max-width: none;
		transform-origin: 0 0;
		will-change: transform;
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--motion-slow) var(--ease-enter);
	}

	img.is-ready {
		opacity: 1;
	}

	.overlay {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.veil {
		fill: var(--surface-scrim);
		fill-rule: evenodd;
	}

	.frame-line {
		fill: none;
		stroke: var(--frame-color);
		stroke-width: 1;
	}

	.corner {
		fill: none;
		stroke: var(--frame-color);
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.grid {
		stroke: var(--grid-color);
		stroke-width: 1;
		opacity: 0;
		transition: opacity var(--motion-fast) var(--ease-enter);
	}

	.stage.is-dragging .grid,
	.stage.is-zooming .grid {
		opacity: 1;
	}

	.placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-tertiary);
	}

	.placeholder svg {
		width: 1.75rem;
		height: 1.75rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-top: var(--space-3);
	}

	.controls[hidden] {
		display: none;
	}

	.controls z-slider {
		flex: 1 1 auto;
	}

	.zoom-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: var(--control-height-sm);
		height: var(--control-height-sm);
		padding: 0;
		border: none;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			background-color var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter);
	}

	.zoom-button:hover {
		background: color-mix(in oklch, var(--text-primary) 8%, transparent);
		color: var(--text-primary);
	}

	.zoom-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.zoom-button:disabled {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.zoom-button svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}
`, st = 24, Ut = 10, Gt = 50, U = 0.1, Qt = 220, A = (o, e, s) => Math.min(s, Math.max(e, o)), qt = (o) => {
  if (!o) return 1;
  const e = o.replace(":", "/").split("/"), s = Number(e[0]), c = e.length > 1 ? Number(e[1]) : 1;
  return s > 0 && c > 0 ? s / c : 1;
}, Jt = (o, e) => {
  const s = Math.max(0, o.width - st * 2), c = Math.max(0, o.height - st * 2);
  return s / Math.max(c, 1) > e ? { width: c * e, height: c } : { width: s, height: s / e };
}, Et = (o, e) => e.width > 0 && e.height > 0 ? Math.max(o.width / e.width, o.height / e.height) : 1, ct = (o, e, s, c) => {
  const l = e.width / 2 / c, a = e.height / 2 / c, m = A(o.x, l, Math.max(l, s.width - l)), y = A(o.y, a, Math.max(a, s.height - a));
  return { x: m, y };
}, at = (o) => ({ x: Math.round(o.x), y: Math.round(o.y), width: Math.round(o.width), height: Math.round(o.height) }), ht = (o, e) => Math.hypot(o.x - e.x, o.y - e.y), te = (o, e) => ({ x: (o.x + e.x) / 2, y: (o.y + e.y) / 2 }), ee = (o, e, s) => {
  const c = (o.width - e.width) / 2, l = (o.height - e.height) / 2, a = `M0 0H${o.width}V${o.height}H0Z`;
  if (!s) return `${a}M${c} ${l}h${e.width}v${e.height}h${-e.width}Z`;
  const m = e.width / 2, y = e.height / 2, B = l + y, _ = `M${c} ${B}a${m} ${y} 0 1 0 ${e.width} 0a${m} ${y} 0 1 0 ${-e.width} 0Z`;
  return `${a}${_}`;
}, oe = (o, e) => {
  const s = Math.min(16, e.width / 4, e.height / 4), c = (o.width - e.width) / 2, l = (o.height - e.height) / 2, a = c + e.width, m = l + e.height;
  return [
    `M${c} ${l + s}V${l}H${c + s}`,
    `M${a - s} ${l}H${a}V${l + s}`,
    `M${a} ${m - s}V${m}H${a - s}`,
    `M${c + s} ${m}H${c}V${m - s}`
  ];
}, ne = (o, e) => {
  const s = (o.width - e.width) / 2, c = (o.height - e.height) / 2, l = e.width / 3, a = e.height / 3, m = `M${s + l} ${c}v${e.height}M${s + l * 2} ${c}v${e.height}`, y = `M${s} ${c + a}h${e.width}M${s} ${c + a * 2}h${e.width}`;
  return `${m}${y}`;
}, re = () => /* @__PURE__ */ T("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ d("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2.5" }),
  /* @__PURE__ */ d("circle", { cx: "9", cy: "10", r: "1.75" }),
  /* @__PURE__ */ d("path", { d: "M21 16l-5-5-9 9" })
] }), ie = () => /* @__PURE__ */ d("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ d("path", { d: "M6 12h12" }) }), se = () => /* @__PURE__ */ d("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ d("path", { d: "M6 12h12M12 6v12" }) }), ce = Yt(
  (o) => {
    const e = Xt(), s = _t(), c = I(), l = I(), a = I(/* @__PURE__ */ new Map()), m = I(null), y = I(null), B = I(!1), [_, G] = Ft("zoom"), [g, lt] = Z({ width: 0, height: 0 }), [f, Q] = Z({ width: 0, height: 0 }), [dt, q] = Z({ x: 0, y: 0 }), [ut, J] = Z(!1), [gt, E] = Z(!1), [mt, wt] = Z(""), D = Math.max(1, o.maxZoom ?? 3), w = A(_ ?? 1, 1, D), W = qt(o.aspect), O = o.shape === "circle", z = !!o.isDisabled, M = f.width > 0 && f.height > 0, p = Jt(g, W), L = Et(p, f), b = L * w, u = ct(dt, p, f, b), N = (t, n) => {
      const r = p.width / n, i = p.height / n;
      return { x: t.x - r / 2, y: t.y - i / 2, width: r, height: i };
    }, tt = (t, n) => ({ ...at(N(t, L * n)), zoom: n }), pt = (t, n) => {
      const r = Math.round(t.x / Math.max(f.width, 1) * 100), i = Math.round(t.y / Math.max(f.height, 1) * 100);
      return e("cropPosition", { x: r, y: i, zoom: n.toFixed(1) });
    }, R = (t, n) => {
      const r = A(n, 1, D), i = L * r, h = ct(t, p, f, i);
      return q(h), G(r), o.input(tt(h, r)), { center: h, zoom: r };
    }, S = (t) => {
      o.change(tt(t.center, t.zoom));
    }, C = (t, n) => {
      const r = A(t, 1, D), i = n.x - g.width / 2, h = n.y - g.height / 2, P = u.x + i / b, v = u.y + h / b, k = L * r, H = { x: P - i / k, y: v - h / k };
      return R(H, r);
    }, j = () => ({ x: g.width / 2, y: g.height / 2 }), et = (t, n) => {
      var i;
      const r = (i = c.current) == null ? void 0 : i.getBoundingClientRect();
      return r ? { x: t - r.left, y: n - r.top } : { x: 0, y: 0 };
    }, ft = () => {
      const t = { x: f.width / 2, y: f.height / 2 }, n = R(t, 1);
      S(n);
    };
    Y(() => {
      const t = c.current;
      if (!t || !(typeof ResizeObserver < "u")) return;
      const r = new ResizeObserver((i) => {
        const h = i[0].contentRect;
        lt({ width: h.width, height: h.height });
      });
      return r.observe(t), () => r.disconnect();
    }, []), Y(() => {
      Q({ width: 0, height: 0 });
      const t = !B.current;
      B.current = !0, !t && G(1);
    }, [o.src]);
    const xt = () => {
      const t = l.current;
      if (!t) return;
      const n = { width: t.naturalWidth, height: t.naturalHeight };
      Q(n), q({ x: n.width / 2, y: n.height / 2 }), o.load({ width: n.width, height: n.height });
    }, yt = (t) => {
      if (!(M && !z)) return;
      const r = c.current;
      if (r == null || r.setPointerCapture(t.pointerId), a.current.set(t.pointerId, { x: t.clientX, y: t.clientY }), a.current.size === 2) {
        const h = [...a.current.values()];
        m.current = { distance: ht(h[0], h[1]), zoom: w };
      }
      J(!0);
    }, bt = (t) => {
      const n = a.current.get(t.pointerId);
      if (!n) return;
      const r = { x: t.clientX, y: t.clientY };
      if (a.current.set(t.pointerId, r), a.current.size >= 2 && m.current !== null) {
        const v = [...a.current.values()], H = ht(v[0], v[1]) / Math.max(1, m.current.distance), x = te(v[0], v[1]), $ = m.current.zoom * H;
        C($, et(x.x, x.y));
        return;
      }
      const h = r.x - n.x, P = r.y - n.y;
      R({ x: u.x - h / b, y: u.y - P / b }, w);
    }, ot = (t) => {
      !a.current.delete(t.pointerId) || (a.current.size < 2 && (m.current = null), !(a.current.size === 0)) || (J(!1), S({ center: u, zoom: w }));
    }, nt = (t) => {
      if (!(M && !z)) return;
      t.preventDefault();
      const r = Math.exp(-t.deltaY * 2e-3), i = C(w * r, et(t.clientX, t.clientY));
      E(!0), y.current && clearTimeout(y.current), y.current = setTimeout(() => {
        E(!1), S(i);
      }, Qt);
    };
    Y(() => {
      const t = c.current;
      if (t)
        return t.addEventListener("wheel", nt, { passive: !1 }), () => t.removeEventListener("wheel", nt);
    });
    const vt = (t) => {
      const n = (t.shiftKey ? Gt : Ut) / b;
      return t.key === "ArrowLeft" ? { center: { x: u.x - n, y: u.y }, zoom: w } : t.key === "ArrowRight" ? { center: { x: u.x + n, y: u.y }, zoom: w } : t.key === "ArrowUp" ? { center: { x: u.x, y: u.y - n }, zoom: w } : t.key === "ArrowDown" ? { center: { x: u.x, y: u.y + n }, zoom: w } : t.key === "+" || t.key === "=" ? { center: u, zoom: w + U } : t.key === "-" || t.key === "_" ? { center: u, zoom: w - U } : t.key === "0" ? { center: { x: f.width / 2, y: f.height / 2 }, zoom: 1 } : null;
    }, $t = (t) => {
      if (!(M && !z)) return;
      const r = vt(t);
      if (!(r !== null)) return;
      t.preventDefault();
      const h = R(r.center, r.zoom);
      S(h), wt(pt(h.center, h.zoom));
    }, Mt = (t) => {
      t.stopPropagation(), C(t.detail.value, j());
    }, zt = (t) => {
      t.stopPropagation();
      const n = C(t.detail.value, j());
      S(n);
    }, rt = (t) => {
      const n = C(w + t * U * 2, j());
      S(n);
    }, F = (t) => {
      const n = l.current;
      if (!(!!n && M)) return null;
      const i = N(u, b), h = typeof (t == null ? void 0 : t.width) == "number", P = typeof (t == null ? void 0 : t.height) == "number", v = P ? (t == null ? void 0 : t.height) * W : i.width, k = Math.round(h ? t == null ? void 0 : t.width : v), H = Math.round(P ? t == null ? void 0 : t.height : k / W), x = document.createElement("canvas");
      x.width = Math.max(1, k), x.height = Math.max(1, H);
      const $ = x.getContext("2d");
      return $ ? ($.imageSmoothingQuality = "high", O && ($.beginPath(), $.ellipse(x.width / 2, x.height / 2, x.width / 2, x.height / 2, 0, 0, Math.PI * 2), $.clip()), $.drawImage(n, i.x, i.y, i.width, i.height, 0, 0, x.width, x.height), x) : null;
    };
    Y(() => {
      const t = {
        getCrop: () => M ? at(N(u, b)) : null,
        toCanvas: (n) => F(n),
        toBlob: (n = "image/png", r) => {
          const i = F();
          return i ? new Promise((h) => i.toBlob(h, n, r)) : Promise.resolve(null);
        },
        toDataURL: (n = "image/png", r) => {
          const i = F();
          return i ? i.toDataURL(n, r) : null;
        },
        reset: () => ft()
      };
      Object.assign(s.current, t);
    });
    const St = g.width / 2 - u.x * b, Pt = g.height / 2 - u.y * b, kt = {
      width: `${f.width}px`,
      height: `${f.height}px`,
      transform: `translate(${St}px, ${Pt}px) scale(${b})`
    }, It = M ? "is-ready" : "", V = !!o.src, Zt = g.width > 0 && g.height > 0 && V, Dt = ee(g, p, O), Ct = (g.width - p.width) / 2, Ht = (g.height - p.height) / 2, Tt = O ? [] : oe(g, p), At = ne(g, p), Bt = o.alt ? `${e("cropImage")}: ${o.alt}` : e("cropImage"), Ot = w <= 1, Lt = w >= D, X = z || !M, Rt = ["stage"].concat(ut ? ["is-dragging"] : []).concat(gt ? ["is-zooming"] : []).concat(z ? ["is-disabled"] : []).concat(V ? [] : ["is-empty"]).join(" ");
    return /* @__PURE__ */ T("host", { shadowDom: !0, children: [
      /* @__PURE__ */ T(
        "div",
        {
          ref: c,
          class: Rt,
          part: "stage",
          role: "group",
          "aria-label": Bt,
          "aria-roledescription": e("cropImage"),
          tabindex: z ? "-1" : "0",
          onpointerdown: yt,
          onpointermove: bt,
          onpointerup: ot,
          onpointercancel: ot,
          onkeydown: $t,
          children: [
            V && /* @__PURE__ */ d(
              "img",
              {
                ref: l,
                class: It,
                crossorigin: o.crossOrigin,
                src: o.src,
                alt: "",
                draggable: !1,
                style: kt,
                onload: xt
              }
            ),
            !V && /* @__PURE__ */ d("div", { class: "placeholder", children: /* @__PURE__ */ d(re, {}) }),
            Zt && /* @__PURE__ */ T("svg", { class: "overlay", viewBox: `0 0 ${g.width} ${g.height}`, "aria-hidden": "true", children: [
              /* @__PURE__ */ d("path", { class: "veil", d: Dt }),
              /* @__PURE__ */ d("path", { class: "grid", d: At }),
              O ? /* @__PURE__ */ d(
                "ellipse",
                {
                  class: "frame-line",
                  cx: g.width / 2,
                  cy: g.height / 2,
                  rx: p.width / 2,
                  ry: p.height / 2
                }
              ) : /* @__PURE__ */ d("rect", { class: "frame-line", x: Ct, y: Ht, width: p.width, height: p.height }),
              Tt.map((t) => /* @__PURE__ */ d("path", { class: "corner", d: t }))
            ] }),
            /* @__PURE__ */ d("span", { class: "sr-only", "aria-live": "polite", children: mt })
          ]
        }
      ),
      /* @__PURE__ */ T("div", { class: "controls", part: "controls", hidden: !!o.isZoomHidden, children: [
        /* @__PURE__ */ d(
          "button",
          {
            class: "zoom-button",
            type: "button",
            "aria-label": e("zoomOut"),
            disabled: X || Ot,
            onclick: () => rt(-1),
            children: /* @__PURE__ */ d(ie, {})
          }
        ),
        /* @__PURE__ */ d(
          "z-slider",
          {
            "aria-label": e("zoom"),
            min: 1,
            max: D,
            step: 0.01,
            value: w,
            isDisabled: X,
            oninput: Mt,
            onchange: zt
          }
        ),
        /* @__PURE__ */ d(
          "button",
          {
            class: "zoom-button",
            type: "button",
            "aria-label": e("zoomIn"),
            disabled: X || Lt,
            onclick: () => rt(1),
            children: /* @__PURE__ */ d(se, {})
          }
        )
      ] })
    ] });
  },
  {
    props: {
      src: String,
      alt: String,
      aspect: String,
      zoom: { type: Number, reflect: !0 },
      maxZoom: { type: Number, reflect: !0 },
      shape: { type: it("rect", "circle"), reflect: !0 },
      crossOrigin: { type: it("anonymous", "use-credentials"), reflect: !0 },
      isZoomHidden: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      load: K({ bubbles: !0, composed: !0 }),
      // Written out, not CropDetailT, so the generated JSX types can
      // carry it: they only keep shapes a consumer could write.
      input: K({ bubbles: !0, composed: !0 }),
      change: K({ bubbles: !0, composed: !0 })
    },
    styles: [Kt, Nt, jt]
  }
);
Wt("z-image-cropper", ce);
export {
  ce as ZImageCropper
};
