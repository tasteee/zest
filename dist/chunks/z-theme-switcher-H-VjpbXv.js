import { c as W, a as Z, e as V, b as q, j as r, g as v, d as J } from "./define-element-BZUk-KLk.js";
import { u as A } from "./hooks-DEFT8qqt.js";
import { o as T } from "./prop-types-B3Bpi956.js";
import { u as X } from "./locale-Bb4aqXuR.js";
const d = {
  dark: "dark",
  light: "light"
}, n = {
  ...d,
  system: "system"
}, b = {
  dark: "dark",
  light: "light"
}, $ = {
  dark: b.dark,
  light: b.light
}, D = (e) => $[e], Me = () => Object.values(d), _ = "zest-theme-preference", B = "data-theme", ee = "(prefers-color-scheme: dark)", S = /* @__PURE__ */ new Set();
let o = n.dark;
const c = () => typeof document < "u", te = Object.values(n), P = (e) => e === null ? !1 : te.includes(e), re = () => {
  if (!c()) return null;
  try {
    const e = window.localStorage.getItem(_);
    return P(e) ? e : null;
  } catch {
    return null;
  }
}, ne = (e) => {
  if (c())
    try {
      window.localStorage.setItem(_, e);
    } catch {
      return;
    }
}, R = () => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia(ee) : null, se = () => {
  const e = R();
  return e ? e.matches ? d.dark : d.light : d.dark;
}, g = (e) => e === n.system ? se() : e, k = () => o, m = () => g(o), w = () => ({ preference: o, theme: g(o) }), E = () => {
  c() && document.documentElement.setAttribute(B, g(o));
}, oe = Object.values(d), ie = (e) => e === null ? !1 : oe.includes(e), ce = () => {
  if (!c()) return null;
  const e = document.documentElement.getAttribute(B);
  return ie(e) ? e : null;
}, ae = () => {
  const e = w();
  for (const t of S) t(e);
}, x = "isThemeFading", le = "--theme-fade-out-duration", L = 500, he = (e) => {
  const t = e.trim();
  if (t.endsWith("ms")) {
    const i = Number.parseFloat(t);
    return Number.isFinite(i) ? i : null;
  }
  if (!t.endsWith("s")) return null;
  const u = Number.parseFloat(t);
  return Number.isFinite(u) ? u * 1e3 : null;
}, O = () => {
  if (!c()) return L;
  const e = getComputedStyle(document.documentElement).getPropertyValue(le), t = he(e);
  return t === null ? L : t;
};
let M = 0;
const de = (e) => {
  const t = document.documentElement, a = O();
  window.clearTimeout(M), t.classList.add(x), M = window.setTimeout(() => {
    e(), t.classList.remove(x);
  }, a);
}, y = () => {
  c() && (window.clearTimeout(M), document.documentElement.classList.remove(x)), E(), ae();
}, j = () => {
  if (!c()) {
    y();
    return;
  }
  if (O() <= 0) {
    y();
    return;
  }
  de(y);
}, N = (e) => {
  if (!P(e)) return;
  const t = g(o);
  if (o = e, ne(e), g(e) === t) {
    y();
    return;
  }
  j();
}, ue = () => {
  const e = D(m()) === b.dark;
  N(e ? n.light : n.dark);
}, me = (e) => (S.add(e), () => {
  S.delete(e);
}), ge = () => {
  const e = R();
  e && e.addEventListener("change", () => {
    o === n.system && j();
  });
}, fe = () => {
  if (!c()) return w();
  const e = re();
  if (e)
    return o = e, E(), w();
  const t = ce();
  return t && (o = t), E(), w();
};
let F = !1;
const pe = () => {
  F || !c() || (F = !0, fe(), ge());
};
pe();
const we = W`
	:host {
		display: inline-flex;
		user-select: none;
		-webkit-user-select: none;
		--switcher-height: var(--control-height-md);
		--switcher-padding-inline: 0.75rem;
		--switcher-font-size: var(--font-size-sm);
		--switcher-icon-size: 0.9375rem;
		--switcher-gap: 0.4375rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([size='sm']) {
		--switcher-height: var(--control-height-sm);
		--switcher-padding-inline: 0.5625rem;
		--switcher-font-size: var(--font-size-xs);
		--switcher-icon-size: 0.8125rem;
		--switcher-gap: 0.375rem;
	}

	:host([size='lg']) {
		--switcher-height: var(--control-height-lg);
		--switcher-padding-inline: 1rem;
		--switcher-font-size: var(--font-size-md);
		--switcher-icon-size: 1.125rem;
		--switcher-gap: 0.5rem;
	}

	/* The accent the selected segment and the icon button paint with. Neutral
	   by default so the control reads as chrome rather than as a call to
	   action; the tone attributes below opt into the accents. */
	:host {
		--switcher-accent: var(--text-primary);
		--switcher-accent-foreground: var(--on-accent);
	}

	:host([tone='secondary']) {
		--switcher-accent: var(--accent-secondary);
		--switcher-accent-foreground: white;
	}

	:host([tone='tertiary']) {
		--switcher-accent: var(--accent-tertiary);
		--switcher-accent-foreground: white;
	}

	.segmented {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		padding: 3px;
		gap: 2px;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		background: transparent;
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
		color: var(--text-secondary);
		font-family: inherit;
		font-size: var(--switcher-font-size);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-none);
		white-space: nowrap;
		cursor: pointer;
		transition: color var(--motion-fast) var(--ease-enter), background-color var(--motion-fast) var(--ease-enter), border-color var(--motion-fast) var(--ease-enter);
	}

	.segment:hover {
		color: var(--text-primary);
	}

	.segment[aria-checked='true'] {
		background: var(--switcher-accent);
		border-color: var(--switcher-accent);
		color: var(--switcher-accent-foreground);
	}

	.segment:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.iconButton {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: calc(var(--switcher-height) + var(--space-1));
		height: calc(var(--switcher-height) + var(--space-1));
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter);
	}


	.iconButton:hover {
		color: var(--text-primary);
		border-color: var(--border-strong);
	}

	.iconButton:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
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
		transition: opacity var(--motion-base) var(--ease-enter), transform var(--motion-base) var(--ease-enter);
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
`, K = () => /* @__PURE__ */ v("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "4" }),
  /* @__PURE__ */ r("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" })
] }), H = () => /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ r("path", { d: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" }) }), ye = () => /* @__PURE__ */ v("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ r("rect", { x: "2.5", y: "4", width: "19", height: "13", rx: "2" }),
  /* @__PURE__ */ r("path", { d: "M9 20.5h6M12 17v3.5" })
] }), C = {
  [n.light]: { preference: n.light, labelKey: "themeLight", icon: K },
  [n.dark]: { preference: n.dark, labelKey: "themeDark", icon: H },
  [n.system]: { preference: n.system, labelKey: "themeSystem", icon: ye }
}, I = [n.light, n.dark, n.system], ve = (e) => {
  const a = Array.isArray(e) && e.length > 0 ? e : I, l = [];
  for (const i of a) {
    const f = C[String(i)];
    f && l.push(f);
  }
  return l.length === 0 ? I.map((i) => C[i]) : l;
}, be = (e, t) => D(e) === b.dark ? t("switchToLight") : t("switchToDark"), Te = Z(
  (e) => {
    const t = X(), [a, l] = A(k), [u, i] = A(m);
    q(() => {
      const s = me((h) => {
        l(h.preference), i(h.theme);
      });
      return l(k()), i(m()), s;
    }, []);
    const f = e.kind === "icon", U = !e.isIconOnly, Q = (s) => {
      N(s), e.change({ preference: s, theme: m() });
    }, Y = () => {
      ue(), e.change({ preference: k(), theme: m() });
    };
    if (f) {
      const s = u === d.dark, h = be(u, t);
      return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("button", { class: "iconButton", type: "button", "aria-label": h, title: h, onclick: Y, children: /* @__PURE__ */ v("span", { class: "glyphStack", children: [
        /* @__PURE__ */ r("span", { class: s ? "glyph is-hidden" : "glyph is-shown", children: /* @__PURE__ */ r(K, {}) }),
        /* @__PURE__ */ r("span", { class: s ? "glyph is-shown" : "glyph is-hidden", children: /* @__PURE__ */ r(H, {}) })
      ] }) }) });
    }
    const G = ve(e.themes).map((s) => {
      const h = s.preference === a, z = s.icon, p = t(s.labelKey);
      return /* @__PURE__ */ v(
        "button",
        {
          class: "segment",
          type: "button",
          role: "radio",
          "aria-checked": h,
          "aria-label": p,
          title: p,
          onclick: () => Q(s.preference),
          children: [
            /* @__PURE__ */ r(z, {}),
            U ? /* @__PURE__ */ r("span", { children: p }) : null
          ]
        }
      );
    });
    return /* @__PURE__ */ r("host", { shadowDom: !0, children: /* @__PURE__ */ r("div", { class: "segmented", role: "radiogroup", "aria-label": t("colorTheme"), children: G }) });
  },
  {
    props: {
      kind: { type: T("segmented", "icon"), reflect: !0 },
      tone: { type: T("primary", "secondary", "tertiary"), reflect: !0 },
      themes: { type: Array },
      isIconOnly: { type: Boolean, reflect: !0 },
      size: { type: T("sm", "md", "lg"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      change: V({ bubbles: !0, composed: !0 })
    },
    styles: we
  }
);
J("z-theme-switcher", Te);
export {
  d as T,
  Te as Z,
  n as a,
  b,
  se as c,
  m as d,
  k as e,
  D as f,
  Me as g,
  pe as h,
  fe as i,
  me as j,
  g as r,
  N as s,
  ue as t
};
