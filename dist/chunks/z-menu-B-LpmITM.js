import { f as x, b as f, c as $, a as k, e as q, u as N, g as M, j as a } from "./define-element-BZUk-KLk.js";
import { i as V } from "./interaction-styles-C6mMacCu.js";
import { u as w } from "./hooks-DEFT8qqt.js";
import { o as A } from "./prop-types-CSJu2W-0.js";
import { u as G } from "./child-items-CYeHgkFR.js";
import { m as J, r as Q, a as X, h as Y, g as ee, b as te, j as re, d as ne, c as se, e as oe, f as ae, i as ie, k as ce, M as le, l as de } from "./menu-nav-BA2XeNqK.js";
import { a as ue, b as pe, c as me } from "./overlay-DCHYaOiA.js";
const fe = () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, he = (i, c = 80) => {
  const [h, p] = w(i ? "open" : "closed"), m = x();
  return f(() => {
    if (clearTimeout(m.current), i) {
      p("open");
      return;
    }
    if (h !== "closed") {
      if (fe()) {
        p("closed");
        return;
      }
      return p("closing"), m.current = setTimeout(() => p("closed"), c), () => clearTimeout(m.current);
    }
  }, [i]), h;
}, ge = $`
	:host {
		display: inline-flex;
		position: relative;
		--tone: var(--accent-primary);
		user-select: none;
		-webkit-user-select: none;
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

	/* Fixed + top-layer (via [popover]) so no ancestor's overflow can clip the
	   panel. display is left unset until :popover-open so the UA stylesheet
	   still hides it while closed. shared/overlay.ts sets left/top. */
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
		min-width: 12rem;
		background: var(--surface-overlay);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-overlay);
		padding: var(--space-1-5);
		gap: 1px;
	}

	.panel:popover-open {
		display: flex;
		flex-direction: column;
	}

	/* enters on mount, exits via .is-closing while useVisibilityPhase keeps it rendered */
	.panel {
		transform-origin: top left;
		animation: z-menu-in var(--motion-fast) var(--ease-enter);
	}

	:host([align='end']) .panel {
		transform-origin: top right;
	}

	.panel.is-closing {
		opacity: 0;
		scale: var(--motion-scale-from);
		pointer-events: none;
		transition:
			opacity var(--motion-exit-fast) var(--ease-exit),
			scale var(--motion-exit-fast) var(--ease-exit);
	}

	.panel.is-committing {
		pointer-events: none;
	}

	@keyframes z-menu-in {
		from {
			opacity: 0;
			scale: var(--motion-scale-from);
			translate: 0 calc(var(--motion-distance-sm) * -1 * var(--motion-travel));
		}
	}

	.item.is-flashing {
		animation: z-menu-flash 220ms step-end;
	}

	@keyframes z-menu-flash {
		0%,
		50% {
			background: color-mix(in oklch, var(--tone) 14%, transparent);
		}
		25%,
		75% {
			background: transparent;
		}
	}

	.item {
		display: flex;
		align-items: center;
		gap: var(--space-2-5);
		padding: var(--space-2) var(--space-2-5);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
		background: transparent;
		border: 0;
		font-family: inherit;
		text-align: start;
		width: 100%;
		box-sizing: border-box;
	}

	.item.is-active {
		background: color-mix(in oklch, var(--tone) 14%, transparent);
		color: var(--tone);
	}

	.item.is-error {
		color: var(--status-danger);
	}

	.item.is-error.is-active {
		background: color-mix(in oklch, var(--status-danger) 14%, transparent);
		color: var(--status-danger);
	}

	.item.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.label {
		flex: 1;
	}

	.shortcut {
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
	}

	.sep {
		height: 1px;
		margin: var(--space-1-5) 0;
		background: var(--border-default);
	}

	::slotted([slot='trigger']) {
		cursor: pointer;
	}

	.icon {
		display: inline-flex;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}
`, Me = k(
  (i) => {
    const c = N(), h = x(), p = x(), m = x({ text: "", time: 0 }), [n, D] = w(!1), [o, l] = w(-1), [S, T] = w(-1), g = S >= 0, O = he(n, 140), C = G(de, le), s = [...C.map(Q), ...Array.isArray(i.items) ? i.items : []], z = (e) => re(s[e]), E = C.map((e) => e.attributes.type);
    f(() => X(c.current, s, E), [s.length, E.join("|"), s.map((e) => `${e.type}:${e.isChecked}`).join("|")]);
    const d = s.flatMap((e, t) => z(t) ? [t] : []), P = () => {
      var e;
      return (e = h.current) == null ? void 0 : e.assignedElements({ flatten: !0 })[0];
    }, W = () => {
      var e;
      return (e = P()) == null ? void 0 : e.focus();
    }, j = () => {
      const e = P();
      e && (e.setAttribute("aria-haspopup", "menu"), e.setAttribute("aria-expanded", n ? "true" : "false"));
    };
    f(j, [n]);
    const v = (e) => {
      D(!0), l(e);
    };
    f(() => {
      if (!n) return;
      const e = (t) => {
        t.composedPath().includes(c.current) || D(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [n]);
    const y = (e = !0) => {
      const t = n;
      D(!1), l(-1), t && e && W();
    }, B = (e, t) => {
      e.isSeparator || e.isHeading || e.isDisabled || g || (l(t), T(t), ce(() => {
        T(-1), y(), i.select({ value: e.value || e.label || "" });
      }));
    }, L = (e) => {
      let t = o;
      for (let r = 0; r < s.length && (t = (t + e + s.length) % s.length, !z(t)); r++)
        ;
      l(t);
    }, Z = (e) => {
      if (!g) {
        if (e.key === "Escape") {
          n && (e.preventDefault(), e.stopPropagation()), y();
          return;
        }
        if (e.key === "Tab") {
          y(!1);
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault(), n ? L(1) : v(d[0] ?? -1);
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault(), n ? L(-1) : v(d.at(-1) ?? -1);
          return;
        }
        if (e.key === "Home" && n) {
          e.preventDefault(), l(d[0] ?? -1);
          return;
        }
        if (e.key === "End" && n) {
          e.preventDefault(), l(d.at(-1) ?? -1);
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(), n ? o >= 0 && s[o] && B(s[o], o) : v(d[0] ?? -1);
          return;
        }
        if (n && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          const t = Date.now(), r = (t - m.current.time < 600 ? m.current.text : "") + e.key.toLowerCase();
          m.current = { text: r, time: t };
          const u = [...r].every((I) => I === r[0]) ? r[0] : r, b = d.indexOf(o), U = [...d.slice(b + 1), ...d.slice(0, b + 1)].find((I) => (s[I].label ?? "").toLowerCase().startsWith(u));
          U !== void 0 && l(U);
        }
      }
    }, R = !n && O === "closing", H = n || R;
    f(() => {
      const e = p.current;
      if (!e || !e.isConnected) return;
      e.matches(":popover-open") || e.showPopover();
      const t = i.align === "end" ? "bottom-end" : "bottom-start", r = () => {
        const u = c.current.getBoundingClientRect().width;
        e.style.minWidth = `max(12rem, ${u}px)`, pe(e, me(c.current, e, { placement: t, offset: 6, padding: 8 }));
      };
      return ue(c.current, e, r);
    }, [H, i.align]), f(() => {
      var r, u;
      const e = o >= 0;
      n && e && ((u = (r = c.current.shadowRoot) == null ? void 0 : r.querySelector(`#menu-item-${o}`)) == null || u.focus());
    }, [n, o]);
    const _ = ["panel", R ? "is-closing" : "", g ? "is-committing" : ""].join(" "), F = Y(s), K = (e) => {
      const t = e.row, r = e.index, u = ["item"].concat(r === o ? ["is-active"] : []).concat(t.isDanger ? ["is-error"] : []).concat(t.isDisabled ? ["is-disabled"] : []).concat(r === S ? ["is-flashing"] : []).join(" "), b = t.description ? ne(r) : void 0;
      return /* @__PURE__ */ M(
        "button",
        {
          type: "button",
          class: u,
          role: ie(t),
          "aria-checked": ae(t),
          "aria-describedby": b,
          "data-index": r,
          id: `menu-item-${r}`,
          tabindex: r === o ? "0" : "-1",
          disabled: t.isDisabled,
          onmouseenter: () => !g && l(r),
          onclick: () => B(t, r),
          children: [
            se(t, F),
            t.icon && /* @__PURE__ */ a("span", { class: "icon", innerHTML: t.icon }),
            oe(t, r),
            t.shortcut && /* @__PURE__ */ a("span", { class: "shortcut", children: t.shortcut })
          ]
        },
        t.slot || t.value || t.label || r
      );
    };
    return /* @__PURE__ */ M("host", { shadowDom: !0, onkeydown: Z, children: [
      /* @__PURE__ */ a("div", { class: "trigger", onclick: () => n ? y() : v(-1), children: /* @__PURE__ */ a("slot", { ref: h, name: "trigger", onslotchange: j }) }),
      H && /* @__PURE__ */ a(
        "div",
        {
          ref: p,
          popover: "manual",
          class: _,
          role: n ? "menu" : void 0,
          inert: R,
          children: ee(s).map((e) => {
            if (e.type === "separator") return /* @__PURE__ */ a("div", { class: "sep", role: "separator" }, `sep-${e.index}`);
            const t = e.entries.map(K);
            if (!e.heading) return t;
            const r = te(e.heading.index);
            return /* @__PURE__ */ M("div", { role: "group", "aria-labelledby": r, children: [
              /* @__PURE__ */ a("div", { class: "heading", id: r, role: "presentation", children: e.heading.row.label }),
              t
            ] }, r);
          })
        }
      )
    ] });
  },
  {
    props: {
      items: { type: Array },
      align: { type: A("start", "end"), reflect: !0 },
      tone: { type: A("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: q({ bubbles: !0, composed: !0 })
    },
    styles: [ge, J, V]
  }
), Ae = k(
  () => /* @__PURE__ */ a("host", { shadowDom: !0, children: /* @__PURE__ */ a("slot", {}) }),
  {
    props: {
      value: { type: String, reflect: !0 },
      label: { type: String, reflect: !0 },
      shortcut: { type: String, reflect: !0 },
      description: { type: String, reflect: !0 },
      type: { type: A("action", "radio", "checkbox"), reflect: !0 },
      isChecked: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isDanger: { type: Boolean, reflect: !0 }
    },
    styles: $`
			:host {
				display: inline-flex;
				align-items: center;
				gap: var(--space-2-5);
				min-width: 0;
			}
		`
  }
), Se = k(() => /* @__PURE__ */ a("host", {}), { props: {} }), Te = k(() => /* @__PURE__ */ a("host", {}), { props: {} });
export {
  Ae as Z,
  Te as a,
  Se as b,
  Me as c
};
