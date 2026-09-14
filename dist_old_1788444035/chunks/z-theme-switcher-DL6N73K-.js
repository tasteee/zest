import { c as K, a as U, e as Q, b as Y, j as r, g, d as G } from "./define-element-BWC3wEPr.js";
import { u as x } from "./hooks-D9_x-ckD.js";
const h = {
  dark: "dark",
  light: "light",
  console: "console",
  studio: "studio"
}, n = {
  ...h,
  system: "system"
}, m = {
  dark: "dark",
  light: "light"
}, V = {
  dark: m.dark,
  light: m.light,
  console: m.dark,
  studio: m.light
}, R = (e) => V[e], xe = () => Object.values(h), B = "zest-theme-preference", F = "data-theme", W = "(prefers-color-scheme: dark)", k = /* @__PURE__ */ new Set();
let o = n.system;
const d = () => typeof document < "u", Z = Object.values(n), q = (e) => e === null ? !1 : Z.includes(e), J = () => {
  if (!d()) return null;
  try {
    const e = window.localStorage.getItem(B);
    return q(e) ? e : null;
  } catch {
    return null;
  }
}, X = (e) => {
  if (d())
    try {
      window.localStorage.setItem(B, e);
    } catch {
      return;
    }
}, L = () => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia(W) : null, $ = () => {
  const e = L();
  return e ? e.matches ? h.dark : h.light : h.dark;
}, p = (e) => e === n.system ? $() : e, y = () => o, f = () => p(o), v = () => ({ preference: o, theme: p(o) }), T = () => {
  d() && document.documentElement.setAttribute(F, p(o));
}, ee = Object.values(h), te = (e) => e === null ? !1 : ee.includes(e), re = () => {
  if (!d()) return null;
  const e = document.documentElement.getAttribute(F);
  return te(e) ? e : null;
}, ne = () => {
  const e = v();
  for (const t of k) t(e);
}, M = "isThemeFading", se = "--theme-transition-duration", E = 600, oe = (e) => {
  const t = e.trim();
  if (t.endsWith("ms")) {
    const c = Number.parseFloat(t);
    return Number.isFinite(c) ? c : null;
  }
  if (!t.endsWith("s")) return null;
  const u = Number.parseFloat(t);
  return Number.isFinite(u) ? u * 1e3 : null;
}, ie = () => {
  if (!d()) return E;
  const e = getComputedStyle(document.documentElement).getPropertyValue(se), t = oe(e);
  return t === null ? E : t;
}, ce = () => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : !1;
let z = 0;
const ae = (e) => {
  const t = document.documentElement, i = ie() / 2;
  window.clearTimeout(z), t.classList.add(M), z = window.setTimeout(() => {
    e(), t.classList.remove(M);
  }, i);
}, b = () => {
  T(), ne();
}, P = () => {
  if (!d()) {
    b();
    return;
  }
  if (ce()) {
    b();
    return;
  }
  ae(b);
}, D = (e) => {
  const t = p(o);
  if (o = e, X(e), p(e) === t) {
    b();
    return;
  }
  P();
}, le = () => {
  const e = R(f()) === m.dark;
  D(e ? n.light : n.dark);
}, he = (e) => (k.add(e), () => {
  k.delete(e);
}), de = () => {
  const e = L();
  e && e.addEventListener("change", () => {
    o === n.system && P();
  });
}, ue = () => {
  if (!d()) return v();
  const e = J();
  if (e)
    return o = e, T(), v();
  const t = re();
  return t && (o = t), T(), v();
};
let A = !1;
const me = () => {
  A || (A = !0, ue(), de());
};
me();
const ge = K`
	:host {
		display: inline-flex;
		user-select: none;
		-webkit-user-select: none;
		--switcher-height: var(--control-height-md);
		--switcher-padding-inline: 0.75rem;
		--switcher-font-size: var(--font-size-2);
		--switcher-icon-size: 0.9375rem;
		--switcher-gap: 0.4375rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([size='sm']) {
		--switcher-height: var(--control-height-sm);
		--switcher-padding-inline: 0.5625rem;
		--switcher-font-size: var(--font-size-1);
		--switcher-icon-size: 0.8125rem;
		--switcher-gap: 0.375rem;
	}

	:host([size='lg']) {
		--switcher-height: var(--control-height-lg);
		--switcher-padding-inline: 1rem;
		--switcher-font-size: var(--font-size-3);
		--switcher-icon-size: 1.125rem;
		--switcher-gap: 0.5rem;
	}

	/* The accent the selected segment and the icon button paint with. Neutral
	   by default so the control reads as chrome rather than as a call to
	   action; the tone attributes below opt into the accents. */
	:host {
		--switcher-accent: var(--foreground);
		--switcher-accent-foreground: var(--primary-foreground);
	}

	:host([accent='dom']) {
		--switcher-accent: var(--purple);
		--switcher-accent-foreground: white;
	}

	:host([accent='sub']) {
		--switcher-accent: var(--pink);
		--switcher-accent-foreground: white;
	}

	.segmented {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		padding: 3px;
		gap: 2px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		/* The track is a channel milled into the panel; the selected segment
		   rises out of it. Inert in the flat themes. */
		background: var(--material-surface);
		box-shadow: var(--elevation-carved);
	}

	.segment {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--switcher-gap);
		box-sizing: border-box;
		height: var(--switcher-height);
		padding-inline: var(--switcher-padding-inline);
		border: 1px solid transparent;
		border-radius: calc(var(--radius-lg) - 3px);
		background: transparent;
		color: var(--muted-foreground);
		font-family: inherit;
		font-size: var(--switcher-font-size);
		font-weight: var(--font-weight-medium);
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		transition: color 0.12s ease, background-color 0.12s ease, border-color 0.12s ease;
	}

	.segment:hover {
		color: var(--foreground);
	}

	.segment[aria-checked='true'] {
		--emissive-color: var(--switcher-accent);
		background: var(--material-tone), var(--switcher-accent);
		box-shadow: var(--elevation-raised), var(--emissive-tone);
		border-color: var(--switcher-accent);
		color: var(--switcher-accent-foreground);
	}

	.segment:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	.iconButton {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: calc(var(--switcher-height) + 6px);
		height: calc(var(--switcher-height) + 6px);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		/* A single pressable cap, so it is raised rather than carved. */
		background: var(--material-raised), transparent;
		box-shadow: var(--elevation-raised);
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			color 0.12s ease,
			border-color 0.12s ease,
			box-shadow var(--material-press-duration) ease;
	}

	.iconButton:active {
		box-shadow: var(--elevation-pressed);
	}

	.iconButton:hover {
		color: var(--foreground);
		border-color: var(--color-neutral-4);
	}

	.iconButton:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	/* The two glyphs are stacked in the same cell and cross-faded, so the
	   button never changes size and the swap reads as one object turning
	   rather than two icons replacing each other. */
	.glyphStack {
		display: grid;
		place-items: center;
		width: var(--switcher-icon-size);
		height: var(--switcher-icon-size);
	}

	.glyph {
		grid-area: 1 / 1;
		display: inline-flex;
		transition: opacity 0.18s ease, transform 0.18s ease;
	}

	.glyph.is-hidden {
		opacity: 0;
		transform: scale(0.7) rotate(-40deg);
	}

	.glyph.is-shown {
		opacity: 1;
		transform: none;
	}

	svg {
		display: block;
		width: var(--switcher-icon-size);
		height: var(--switcher-icon-size);
		stroke: currentColor;
		stroke-width: 1.6;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
`, _ = () => /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "4" }),
  /* @__PURE__ */ r("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" })
] }), N = () => /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ r("path", { d: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" }) }), fe = () => /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ r("rect", { x: "2.5", y: "4", width: "19", height: "13", rx: "2" }),
  /* @__PURE__ */ r("path", { d: "M9 20.5h6M12 17v3.5" })
] }), pe = () => /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ r("rect", { x: "2.5", y: "5", width: "19", height: "14", rx: "2" }),
  /* @__PURE__ */ r("path", { d: "M6 5v14M18 5v14M9.5 12h5" })
] }), we = () => /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ r("circle", { cx: "12", cy: "12.5", r: "6" }),
  /* @__PURE__ */ r("path", { d: "M12 12.5V8M4.8 18.2A9 9 0 0 1 19.2 18.2" })
] }), I = {
  [n.light]: { preference: n.light, label: "Light", icon: _ },
  [n.dark]: { preference: n.dark, label: "Dark", icon: N },
  [n.system]: { preference: n.system, label: "System", icon: fe },
  [n.console]: { preference: n.console, label: "Console", icon: pe },
  [n.studio]: { preference: n.studio, label: "Studio", icon: we }
}, C = [n.light, n.dark, n.system], ve = (e) => {
  const i = Array.isArray(e) && e.length > 0 ? e : C, a = [];
  for (const c of i) {
    const w = I[String(c)];
    w && a.push(w);
  }
  return a.length === 0 ? C.map((c) => I[c]) : a;
}, be = (e) => R(e) === m.dark ? "Switch to light theme" : "Switch to dark theme", ye = U(
  (e) => {
    const [t, i] = x(y), [a, u] = x(f);
    Y(() => {
      const s = he((l) => {
        i(l.preference), u(l.theme);
      });
      return i(y()), u(f()), s;
    }, []);
    const c = e.kind === "icon", w = !e.isIconOnly, j = (s) => {
      D(s), e.change({ preference: s, theme: f() });
    }, O = () => {
      le(), e.change({ preference: y(), theme: f() });
    };
    if (c) {
      const s = a === h.dark, l = be(a);
      return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("button", { class: "iconButton", type: "button", "aria-label": l, title: l, onclick: O, children: /* @__PURE__ */ g("span", { class: "glyphStack", children: [
        /* @__PURE__ */ r("span", { class: s ? "glyph is-hidden" : "glyph is-shown", children: /* @__PURE__ */ r(_, {}) }),
        /* @__PURE__ */ r("span", { class: s ? "glyph is-shown" : "glyph is-hidden", children: /* @__PURE__ */ r(N, {}) })
      ] }) }) });
    }
    const H = ve(e.themes).map((s) => {
      const l = s.preference === t, S = s.icon;
      return /* @__PURE__ */ g(
        "button",
        {
          class: "segment",
          type: "button",
          role: "radio",
          "aria-checked": l,
          "aria-label": s.label,
          title: s.label,
          onclick: () => j(s.preference),
          children: [
            /* @__PURE__ */ r(S, {}),
            w ? /* @__PURE__ */ r("span", { children: s.label }) : null
          ]
        }
      );
    });
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("div", { class: "segmented", role: "radiogroup", "aria-label": "Color theme", children: H }) });
  },
  {
    props: {
      kind: { type: String, reflect: !0 },
      accent: { type: String, reflect: !0 },
      themes: { type: Array },
      isIconOnly: { type: Boolean, reflect: !0 },
      size: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: Q({ bubbles: !0, composed: !0 })
    },
    styles: ge
  }
);
G("z-theme-switcher", ye);
export {
  h as T,
  ye as Z,
  n as a,
  m as b,
  $ as c,
  f as d,
  y as e,
  R as f,
  xe as g,
  me as h,
  ue as i,
  he as j,
  p as r,
  D as s,
  le as t
};
