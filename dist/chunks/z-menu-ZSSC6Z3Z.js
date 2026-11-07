import { f as b, b as h, c as H, a as I, e as q, u as O, g as j, j as a } from "./define-element-BZUk-KLk.js";
import { i as W } from "./interaction-styles-XiKFAbWA.js";
import { u as x } from "./hooks-DEFT8qqt.js";
import { o as B } from "./prop-types-B3Bpi956.js";
import { u as V, h as F } from "./child-items-CYeHgkFR.js";
import { f as _ } from "./menu-nav-DEHIcWKa.js";
import { a as G, b as J, c as N } from "./overlay-BZjDggFA.js";
const Q = () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, X = (i, u = 80) => {
  const [f, p] = x(i ? "open" : "closed"), d = b();
  return h(() => {
    if (clearTimeout(d.current), i) {
      p("open");
      return;
    }
    if (f !== "closed") {
      if (Q()) {
        p("closed");
        return;
      }
      return p("closing"), d.current = setTimeout(() => p("closed"), u), () => clearTimeout(d.current);
    }
  }, [i]), f;
}, Y = H`
	:host {
		display: inline-flex;
		position: relative;
		--accent: var(--primary);
		user-select: none;
		-webkit-user-select: none;
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
		--accent: var(--pink);
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
		z-index: 50;
		min-width: 12rem;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 0.3125rem;
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
		animation: z-menu-flash 200ms step-end;
	}

	@keyframes z-menu-flash {
		0%,
		50% {
			background: color-mix(in oklch, var(--accent) 14%, transparent);
		}
		25%,
		75% {
			background: transparent;
		}
	}

	.item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.625rem;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-small);
		color: var(--foreground);
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
		background: color-mix(in oklch, var(--accent) 14%, transparent);
		color: var(--accent);
	}

	.item.is-error {
		color: var(--destructive);
	}

	.item.is-error.is-active {
		background: color-mix(in oklch, var(--destructive) 14%, transparent);
		color: var(--destructive);
	}

	.item.is-disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.label {
		flex: 1;
	}

	.shortcut {
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
	}

	.sep {
		height: 1px;
		margin: 0.3125rem 0;
		background: var(--border);
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
`, ee = ["shortcut", "is-disabled", "is-danger"], ue = I(
  (i) => {
    const u = O(), f = b(), p = b(), d = b({ text: "", time: 0 }), [r, k] = x(!1), [o, c] = x(-1), [z, S] = x(-1), g = z >= 0, K = X(r, 140), n = [...V(["z-menu-item", "z-menu-separator"], ee).map(
      (e) => e.tag === "z-menu-separator" ? { isSeparator: !0 } : {
        value: e.value,
        label: e.label,
        shortcut: e.attributes.shortcut || void 0,
        isDisabled: F(e, "is-disabled"),
        isDanger: F(e, "is-danger"),
        slot: e.slot
      }
    ), ...Array.isArray(i.items) ? i.items : []], A = (e) => n[e] && !n[e].isSeparator && !n[e].isDisabled, l = n.flatMap((e, t) => A(t) ? [t] : []), T = () => {
      var e;
      return (e = f.current) == null ? void 0 : e.assignedElements({ flatten: !0 })[0];
    }, U = () => {
      var e;
      return (e = T()) == null ? void 0 : e.focus();
    }, P = () => {
      var s;
      const e = T();
      if (!e) return;
      const t = ((s = e.shadowRoot) == null ? void 0 : s.querySelector("button, [role]")) ?? e;
      t.setAttribute("aria-haspopup", "menu"), t.setAttribute("aria-expanded", r ? "true" : "false");
    };
    h(P, [r]);
    const v = (e) => {
      k(!0), c(e);
    };
    h(() => {
      if (!r) return;
      const e = (t) => {
        t.composedPath().includes(u.current) || k(!1);
      };
      return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
    }, [r]);
    const y = (e = !0) => {
      const t = r;
      k(!1), c(-1), t && e && U();
    }, E = (e, t) => {
      e.isSeparator || e.isDisabled || g || (c(t), S(t), _(() => {
        S(-1), y(), i.select({ value: e.value || e.label || "" });
      }));
    }, R = (e) => {
      let t = o;
      for (let s = 0; s < n.length && (t = (t + e + n.length) % n.length, !A(t)); s++)
        ;
      c(t);
    }, Z = (e) => {
      if (!g) {
        if (e.key === "Escape") {
          r && (e.preventDefault(), e.stopPropagation()), y();
          return;
        }
        if (e.key === "Tab") {
          y(!1);
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault(), r ? R(1) : v(l[0] ?? -1);
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault(), r ? R(-1) : v(l.at(-1) ?? -1);
          return;
        }
        if (e.key === "Home" && r) {
          e.preventDefault(), c(l[0] ?? -1);
          return;
        }
        if (e.key === "End" && r) {
          e.preventDefault(), c(l.at(-1) ?? -1);
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(), r ? o >= 0 && n[o] && E(n[o], o) : v(l[0] ?? -1);
          return;
        }
        if (r && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          const t = Date.now(), s = (t - d.current.time < 600 ? d.current.text : "") + e.key.toLowerCase();
          d.current = { text: s, time: t };
          const m = [...s].every((D) => D === s[0]) ? s[0] : s, C = l.indexOf(o), L = [...l.slice(C + 1), ...l.slice(0, C + 1)].find((D) => (n[D].label ?? "").toLowerCase().startsWith(m));
          L !== void 0 && c(L);
        }
      }
    }, w = !r && K === "closing", M = r || w;
    h(() => {
      const e = p.current;
      if (!e || !e.isConnected) return;
      e.matches(":popover-open") || e.showPopover();
      const t = i.align === "end" ? "bottom-end" : "bottom-start", s = () => {
        const m = u.current.getBoundingClientRect().width;
        e.style.minWidth = `max(12rem, ${m}px)`, J(e, N(u.current, e, { placement: t, offset: 6, padding: 8 }));
      };
      return G(u.current, e, s);
    }, [M, i.align]), h(() => {
      var s, m;
      const e = o >= 0;
      r && e && ((m = (s = u.current.shadowRoot) == null ? void 0 : s.querySelector(`#menu-item-${o}`)) == null || m.focus());
    }, [r, o]);
    const $ = ["panel", w ? "is-closing" : "", g ? "is-committing" : ""].join(" ");
    return /* @__PURE__ */ j("host", { shadowDom: !0, onkeydown: Z, children: [
      /* @__PURE__ */ a("div", { class: "trigger", onclick: () => r ? y() : v(-1), children: /* @__PURE__ */ a("slot", { ref: f, name: "trigger", onslotchange: P }) }),
      M && /* @__PURE__ */ a(
        "div",
        {
          ref: p,
          popover: "manual",
          class: $,
          role: r ? "menu" : void 0,
          inert: w,
          children: n.map((e, t) => {
            if (e.isSeparator) return /* @__PURE__ */ a("div", { class: "sep", role: "separator" }, `sep-${t}`);
            const s = ["item"].concat(t === o ? ["is-active"] : []).concat(e.isDanger ? ["is-error"] : []).concat(e.isDisabled ? ["is-disabled"] : []).concat(t === z ? ["is-flashing"] : []).join(" ");
            return /* @__PURE__ */ j(
              "button",
              {
                type: "button",
                class: s,
                role: "menuitem",
                "data-index": t,
                id: `menu-item-${t}`,
                tabindex: t === o ? "0" : "-1",
                disabled: e.isDisabled,
                onmouseenter: () => !g && c(t),
                onclick: () => E(e, t),
                children: [
                  e.icon && /* @__PURE__ */ a("span", { class: "icon", innerHTML: e.icon }),
                  /* @__PURE__ */ a("span", { class: "label", children: e.slot ? /* @__PURE__ */ a("slot", { name: e.slot }) : e.label }),
                  e.shortcut && /* @__PURE__ */ a("span", { class: "shortcut", children: e.shortcut })
                ]
              },
              e.slot || e.value || e.label || t
            );
          })
        }
      )
    ] });
  },
  {
    props: {
      items: { type: Array },
      align: { type: B("start", "end"), reflect: !0 },
      tone: { type: B("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      select: q({ bubbles: !0, composed: !0 })
    },
    styles: [Y, W]
  }
), pe = I(
  () => /* @__PURE__ */ a("host", { shadowDom: !0, children: /* @__PURE__ */ a("slot", {}) }),
  {
    props: {
      value: { type: String, reflect: !0 },
      label: { type: String, reflect: !0 },
      shortcut: { type: String, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isDanger: { type: Boolean, reflect: !0 }
    },
    styles: H`
			:host {
				display: inline-flex;
				align-items: center;
				gap: 0.625rem;
				min-width: 0;
			}
		`
  }
), de = I(() => /* @__PURE__ */ a("host", {}), { props: {} });
export {
  pe as Z,
  de as a,
  ue as b
};
