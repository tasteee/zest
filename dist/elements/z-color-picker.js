// @ts-self-types="./z-color-picker.d.ts"
import { c as N, a as Q, e as ee, u as re, f as F, b as P, g as x, j as h } from "../chunks/define-element-BZUk-KLk.js";
import { u as te, d as oe } from "../chunks/form-control-CrK-0rhn.js";
import { u as ae } from "../chunks/use-prop-C0_HeSQ9.js";
import { u as I } from "../chunks/hooks-DEFT8qqt.js";
import { o as se } from "../chunks/prop-types-B3Bpi956.js";
import { u as ne } from "../chunks/locale-Bb4aqXuR.js";
const ie = N`
	:host {
		display: inline-flex;
		position: relative;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2-5);
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		height: var(--control-height-md);
		padding-inline: var(--space-2-5) var(--space-3-5);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: border-color var(--motion-fast) var(--ease-enter);
	}

	.trigger:hover {
		border-color: color-mix(in oklch, var(--text-primary) 30%, transparent);
	}

	.trigger.is-open {
		border-color: var(--tone);
	}

	.trigger:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.swatch {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: var(--radius-sm);
		border: 1px solid color-mix(in oklch, var(--text-primary) 25%, transparent);
		flex-shrink: 0;
	}

	.panel {
		position: fixed;
		top: 0;
		left: 0;
		visibility: hidden;
		z-index: var(--z-menu);
		width: 15rem;
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-3);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.area {
		position: relative;
		width: 100%;
		height: 8.5rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-default);
		cursor: crosshair;
		touch-action: none;
		outline: none;
		background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, var(--hue-color));
	}
	.area:focus-visible,
	.hue:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.hue {
		position: relative;
		width: 100%;
		height: 0.75rem;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-default);
		cursor: pointer;
		touch-action: none;
		outline: none;
		background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
	}

	.thumb {
		position: absolute;
		width: 0.875rem;
		height: 0.875rem;
		border-radius: var(--radius-full);
		border: 2px solid #fff;
		background: transparent;
		outline: 1px solid rgb(0 0 0 / 0.5);
		transform: translate(-50%, -50%);
		pointer-events: none;
	}
	.hue .thumb {
		top: 50%;
		background: var(--hue-color);
		width: 1rem;
		height: 1rem;
	}

	.hex-row {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-sm);
		padding-inline: var(--space-2);
		height: 2.25rem;
	}
	.hex-row:focus-within {
		border-color: var(--tone);
	}
	.hash {
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
	}
	.hex-input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		outline: none;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
	}

	.presets {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: var(--space-1-5);
	}
	.preset {
		aspect-ratio: 1;
		border-radius: var(--radius-full);
		border: 1px solid color-mix(in oklch, var(--text-primary) 20%, transparent);
		cursor: pointer;
		padding: 0;
		transition: transform var(--motion-instant) var(--ease-enter);
	}
	.preset:hover {
		transform: scale(1.15);
	}
	.preset.is-selected {
		outline: 2px solid var(--text-primary);
		outline-offset: 1px;
	}
`, le = ["#FAFAFA", "#BF40BF", "#FF1493", "#FF3B30", "#A0A0A0", "#707070", "#2A2F2A", "#0A0F0A"], K = (a) => {
  let s = a.trim().replace(/^#/, "");
  return /^[0-9a-fA-F]{3}$/.test(s) && (s = s.split("").map((n) => n + n).join("")), `#${s.toUpperCase()}`;
}, m = (a, s, n) => Math.min(n, Math.max(s, a)), w = (a) => {
  const s = K(a).slice(1), n = parseInt(s.slice(0, 2), 16) / 255, c = parseInt(s.slice(2, 4), 16) / 255, u = parseInt(s.slice(4, 6), 16) / 255, o = Math.max(n, c, u), d = o - Math.min(n, c, u);
  let v = 0;
  return d !== 0 && (o === n ? v = (c - u) / d % 6 : o === c ? v = (u - n) / d + 2 : v = (n - c) / d + 4), { h: (v * 60 + 360) % 360, s: o === 0 ? 0 : d / o, v: o };
}, C = ({ h: a, s, v: n }) => {
  const c = (u) => {
    const o = (u + a / 60) % 6, d = n - n * s * Math.max(0, Math.min(o, 4 - o, 1));
    return Math.round(d * 255).toString(16).padStart(2, "0");
  };
  return `#${c(5)}${c(3)}${c(1)}`.toUpperCase();
}, ce = (a) => /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(a.trim()), de = Q(
  (a) => {
    var U;
    const s = ne(), n = re(), [c, u] = ae("value"), [o, d] = I(!1), v = F(c), b = F(), D = F(), p = c || "#BF40BF", { isFormDisabled: j } = te({
      value: p,
      isDisabled: a.isDisabled,
      control: b,
      onReset: () => u(v.current),
      onRestore: (e) => {
        typeof e == "string" && e && u(e);
      }
    }), E = a.isDisabled || j, O = Array.isArray(a.presets) ? a.presets : le;
    P(() => {
      if (!o) return;
      const e = (t) => {
        t.composedPath().includes(n.current) || d(!1);
      }, r = (t) => {
        var l;
        t.key === "Escape" && (d(!1), (l = b.current) == null || l.focus());
      };
      return document.addEventListener("pointerdown", e), document.addEventListener("keydown", r), () => {
        document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", r);
      };
    }, [o]), P(() => {
      if (!o) return;
      const e = () => {
        const r = b.current, t = D.current;
        if (!r || !t) return;
        const l = 6, f = 8, g = r.getBoundingClientRect(), Z = document.documentElement.clientWidth, S = window.innerHeight, T = S - g.bottom - l - f, _ = g.top - l - f, q = t.offsetHeight <= T || T >= _ ? g.bottom + l : g.top - l - t.offsetHeight, G = Math.max(f, S - t.offsetHeight - f), J = Math.max(f, Z - t.offsetWidth - f);
        t.style.top = `${Math.round(m(q, f, G))}px`, t.style.left = `${Math.round(m(g.left, f, J))}px`, t.style.visibility = "visible";
      };
      return e(), window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
        window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
      };
    }, [o]);
    const [H, A] = I(() => w(p)), V = w(p), i = C(H) === p.toUpperCase() ? H : V, k = (e) => {
      u(e), a.change({ value: e });
    }, y = (e) => {
      A(e), k(C(e));
    }, L = (e) => {
      const r = e.currentTarget.getBoundingClientRect(), t = m((e.clientX - r.left) / r.width, 0, 1), l = 1 - m((e.clientY - r.top) / r.height, 0, 1);
      y({ h: i.h, s: t, v: l });
    }, M = (e) => {
      const r = e.currentTarget.getBoundingClientRect(), t = m((e.clientX - r.left) / r.width, 0, 1) * 360;
      y({ ...i, h: t });
    }, $ = (e) => (r) => {
      r.currentTarget.setPointerCapture(r.pointerId), e(r);
    }, B = (e) => (r) => {
      r.currentTarget.hasPointerCapture(r.pointerId) && e(r);
    }, W = (e) => {
      const r = e.shiftKey ? 0.1 : 0.02, l = {
        ArrowLeft: [-r, 0],
        ArrowRight: [r, 0],
        ArrowUp: [0, r],
        ArrowDown: [0, -r]
      }[e.key];
      l && (e.preventDefault(), y({ h: i.h, s: m(i.s + l[0], 0, 1), v: m(i.v + l[1], 0, 1) }));
    }, X = (e) => {
      const r = e.shiftKey ? 15 : 3, t = { ArrowLeft: -r, ArrowDown: -r, ArrowRight: r, ArrowUp: r };
      e.key in t && (e.preventDefault(), y({ ...i, h: m(i.h + t[e.key], 0, 360) }));
    }, z = C({ h: i.h, s: 1, v: 1 }), R = a.label || ((U = n.current) == null ? void 0 : U.getAttribute("aria-label")), Y = R ? `${R}, ${p.toUpperCase()}` : void 0;
    return /* @__PURE__ */ x("host", { shadowDom: { delegatesFocus: !0 }, children: [
      /* @__PURE__ */ x(
        "button",
        {
          ref: b,
          type: "button",
          class: o ? "trigger is-open" : "trigger",
          disabled: E,
          "aria-haspopup": "dialog",
          "aria-label": Y,
          "aria-expanded": o ? "true" : "false",
          onclick: () => d(!o),
          children: [
            /* @__PURE__ */ h("span", { class: "swatch", style: { background: p } }),
            /* @__PURE__ */ h("span", { children: p.toUpperCase() })
          ]
        }
      ),
      o && /* @__PURE__ */ x("div", { ref: D, class: "panel", role: "dialog", "aria-label": s("chooseColor"), children: [
        /* @__PURE__ */ h(
          "div",
          {
            class: "area",
            style: { "--hue-color": z },
            role: "slider",
            tabindex: "0",
            "aria-label": s("saturationAndBrightness"),
            "aria-valuetext": `Saturation ${Math.round(i.s * 100)}%, brightness ${Math.round(i.v * 100)}%`,
            onpointerdown: $(L),
            onpointermove: B(L),
            onkeydown: W,
            children: /* @__PURE__ */ h("span", { class: "thumb", style: { left: `${i.s * 100}%`, top: `${(1 - i.v) * 100}%` } })
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            class: "hue",
            style: { "--hue-color": z },
            role: "slider",
            tabindex: "0",
            "aria-label": s("hue"),
            "aria-valuemin": "0",
            "aria-valuemax": "360",
            "aria-valuenow": Math.round(i.h),
            onpointerdown: $(M),
            onpointermove: B(M),
            onkeydown: X,
            children: /* @__PURE__ */ h("span", { class: "thumb", style: { left: `${i.h / 360 * 100}%` } })
          }
        ),
        /* @__PURE__ */ x("div", { class: "hex-row", children: [
          /* @__PURE__ */ h("span", { class: "hash", children: "#" }),
          /* @__PURE__ */ h(
            "input",
            {
              class: "hex-input",
              type: "text",
              value: p.replace(/^#/, "").toUpperCase(),
              maxlength: 6,
              onchange: (e) => {
                if (!ce(e.target.value)) {
                  e.target.value = p.replace(/^#/, "");
                  return;
                }
                const r = K(e.target.value);
                A(w(r)), k(r);
              }
            }
          )
        ] }),
        /* @__PURE__ */ h("div", { class: "presets", children: O.map((e) => /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            class: e.toUpperCase() === p.toUpperCase() ? "preset is-selected" : "preset",
            style: { background: e },
            "aria-label": e,
            onclick: () => {
              A(w(e)), k(e.toUpperCase());
            }
          },
          e
        )) })
      ] })
    ] });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      name: { type: String, reflect: !0 },
      label: String,
      presets: { type: Array },
      tone: { type: se("primary", "secondary", "tertiary"), reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: ee({ bubbles: !0, composed: !0 })
    },
    styles: ie,
    form: !0
  }
);
oe("z-color-picker", de);
export {
  de as ZColorPicker
};
