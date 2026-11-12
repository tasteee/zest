// @ts-self-types="./z-terminal.d.ts"
import { c as ee, a as te, e as q, u as oe, f as _, b as R, j as r, g as v, F as ae, d as re } from "../chunks/define-element-BZUk-KLk.js";
import { u as T, a as j } from "../chunks/hooks-DEFT8qqt.js";
import { t as ne } from "../chunks/scrollbar-styles-CaLPixBv.js";
import { c as P } from "../chunks/clipboard-x9gcxjll.js";
import { u as se } from "../chunks/locale-Bb4aqXuR.js";
import { o as ie } from "../chunks/prop-types-B3Bpi956.js";
const ce = ee`
	:host {
		display: block;
		width: var(--z-terminal-width, auto);
		--tone: var(--status-success);
	}

	:host([tone='primary']) {
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='warning']) {
		--tone: var(--status-warning);
	}

	:host([tone='danger']) {
		--tone: var(--status-danger);
	}

	:host([is-hidden]) {
		display: none;
	}

	/* Column layout so a pinned height splits into a fixed bar + scrolling body
	   instead of letting the content stretch the window. */
	.window {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: var(--z-terminal-height, auto);
		max-height: var(--z-terminal-max-height, none);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background: var(--surface-page);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	/* Seamless header, same surface as the body, no divider (Hyper-clean). */
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		flex: 0 0 auto;
		padding: var(--space-2-5) var(--space-3-5) var(--space-1) var(--space-3-5);
		user-select: none;
	}

	.meta {
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
		min-width: 0;
		font-size: var(--font-size-xs);
	}

	.shell {
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.02em;
		color: var(--tone);
		white-space: nowrap;
	}

	.cwd {
		color: var(--text-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Traffic-light window dots. */
	.dots {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	.dot {
		width: 0.6875rem;
		height: 0.6875rem;
		border-radius: var(--radius-full);
		background: var(--border-default);
	}

	.dot.red {
		background: #ff5f57;
	}
	.dot.yellow {
		background: #febc2e;
	}
	.dot.green {
		background: #28c840;
	}

	.copy-selection {
		margin-inline-start: auto;
		margin-inline-end: var(--space-3);
		padding: var(--space-0-5) var(--space-2);
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		font-family: inherit;
		font-size: var(--font-size-xs);
		cursor: pointer;
	}
	.copy-selection:hover {
		color: var(--text-primary);
	}
	.copy-selection:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.scroll {
		flex: 1 1 auto;
		min-height: 0;
		overflow: auto;
	}
	/* Firefox only: Chromium uses the arrow-less ::-webkit-scrollbar below; giving
	   it scrollbar-width would swap in the OS bar (arrows on Windows). */
	@supports not selector(::-webkit-scrollbar) {
		.scroll {
			scrollbar-width: thin;
			scrollbar-color: var(--border-default) transparent;
		}
	}
	.scroll::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}
	.scroll::-webkit-scrollbar-thumb {
		background: var(--border-default);
		border-radius: var(--radius-full);
	}
	.scroll::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}

	/* max-content keeps lines at their natural width so a narrow terminal scrolls
	   sideways rather than squeezing text. */
	.body {
		min-width: max-content;
		padding: var(--space-1-5) 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		letter-spacing: 0.35px;
		text-align: start;
		color: var(--text-primary);
		tab-size: 2;
	}

	/* ::selection doesn't cross shadow boundaries, restate ink.css's selection
	   colors so terminal text highlights like the rest of the page. */
	.body ::selection {
		background: var(--surface-selection);
		color: var(--text-selection);
	}
	.body ::-moz-selection {
		background: var(--surface-selection);
		color: var(--text-selection);
	}

	.line {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: var(--space-3);
		padding: 0 var(--space-3-5);
		min-height: 1.75em;
	}

	.line.copyable {
		cursor: default;
	}

	.line.copyable:hover {
		background: color-mix(in oklch, var(--text-primary) 6%, transparent);
	}

	.text {
		flex: 1 1 auto;
		min-width: 0;
		text-align: start;
		white-space: pre;
		overflow: hidden;
		/* Terminal text stays selectable even though the page default opts out. */
		user-select: text;
		-webkit-user-select: text;
	}

	.prompt {
		color: var(--tone);
		user-select: none;
		margin-inline-end: var(--space-2);
	}

	.command {
		color: var(--text-primary);
	}

	.output {
		color: var(--text-secondary);
	}

	/* Blinking block caret that trails the typing head on the active command. */
	.caret {
		display: inline-block;
		width: 0.55em;
		height: 1.05em;
		margin-inline-start: 1px;
		vertical-align: text-bottom;
		background: var(--tone);
		animation: term-blink 1s step-end infinite;
	}

	@keyframes term-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	/* Output lines fade in quickly as they reveal (duration via --fade). */
	.line.appearing {
		animation: term-fade var(--fade, 240ms) ease both;
	}

	@keyframes term-fade {
		from {
			opacity: 0;
			transform: translateY(2px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.caret {
			animation: none;
		}
		.line.appearing {
			animation: none;
		}
	}

	/* Replay control, appears bottom-right once a run completes. */
	.replay {
		position: absolute;
		bottom: 0.5rem;
		right: 0.625rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		padding: 0;
		background: color-mix(in oklch, var(--surface-page) 82%, transparent);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-full);
		color: var(--text-secondary);
		cursor: pointer;
		opacity: 0;
		transform: scale(0.9);
		pointer-events: none;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			transform var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.replay.show {
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}

	.replay:hover {
		color: var(--text-primary);
	}

	.replay:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 0;
	}

	.replay svg {
		width: 0.95rem;
		height: 0.95rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.copy {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		opacity: 0;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.line.copyable:hover .copy,
	.copy:focus-visible {
		opacity: 1;
	}

	.copy:hover {
		color: var(--text-primary);
		background: color-mix(in oklch, var(--text-primary) 10%, transparent);
	}

	.copy:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: -1px;
	}

	.copy.is-copied {
		color: var(--status-success);
		opacity: 1;
	}

	.copy svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
`, H = (t, o) => {
  const c = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), n = new RegExp(`^\\s*${c}\\s+(.*)$`);
  return t.split(`
`).map((s) => {
    const l = s.match(n);
    return l ? { raw: s, isCommand: !0, marker: o, command: l[1] } : { raw: s, isCommand: !1, marker: "", command: "" };
  });
}, le = (t, o) => {
  const c = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), n = t.match(new RegExp(`^\\s*${c}\\s+(.*)$`));
  return n ? n[1] : t;
}, de = (t, o, c) => Array.isArray(c) && c.length ? c.map((n) => {
  if (typeof n == "string") return H(n, o)[0];
  const s = String(n.text ?? ""), l = n.type != null ? n.type === "command" : H(s, o)[0].isCommand;
  return {
    raw: s,
    isCommand: l,
    marker: l ? o : "",
    command: l ? le(s, o) : "",
    delay: n.delay,
    typeSpeed: n.typeSpeed,
    fade: n.fade
  };
}) : H(t, o), pe = (t, o) => {
  if (t == null || t === "") return o.map((s) => s.isCommand);
  if (Array.isArray(t)) {
    const s = new Set(t.map(Number));
    return o.map((l, y) => s.has(y + 1));
  }
  const c = String(t).trim().toLowerCase();
  if (c === "all") return o.map((s) => s.raw.length > 0);
  if (c === "none") return o.map(() => !1);
  if (c === "commands" || c === "prompt" || c === "auto") return o.map((s) => s.isCommand);
  const n = /* @__PURE__ */ new Set();
  for (const s of c.split(",")) {
    const l = s.trim();
    if (!l) continue;
    const y = l.match(/^(\d+)\s*-\s*(\d+)$/);
    if (y)
      for (let S = Number(y[1]); S <= Number(y[2]); S++) n.add(S);
    else /^\d+$/.test(l) && n.add(Number(l));
  }
  return o.map((s, l) => n.has(l + 1));
}, L = (t, o) => t == null || t === "" || Number.isNaN(Number(t)) ? o : Number(t), ue = te(
  (t) => {
    const o = oe(), c = se(), [n, s] = T(""), l = _(), [y, S] = T(-1), [b, w] = T({ shown: 0, active: -1, typed: 0, done: !1 }), M = (t.code ?? "").replace(/\n$/, ""), O = t.prompt || "$", u = j(() => de(M, O, t.lines), [M, O, t.lines]), W = j(() => pe(t.copyLines, u), [t.copyLines, u]), Y = !!t.doesAnimate, z = L(t.typeSpeed, 55), A = L(t.lineDelay, 380), $ = L(t.fadeDuration, 240), E = L(t.loopDelay, 2200), F = !!t.doesLoop, Z = j(
      () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches,
      []
    ), x = Y && !Z, G = _({}).current;
    R(() => {
      if (!x) {
        w({ shown: u.length, active: -1, typed: 0, done: !1 });
        return;
      }
      const e = G;
      e.cancelled = !1, e.paused = !1, e.done = !1, e.started = !1, e.i = 0, e.k = 0, e.mode = "gap";
      const i = () => {
        e.timer && clearTimeout(e.timer), e.timer = 0;
      }, d = (a, N) => {
        e.timer = window.setTimeout(N, a);
      }, p = () => {
        e.i += 1, C();
      }, m = () => {
        if (e.cancelled || e.paused) return;
        const a = u[e.i];
        e.k += 1, w({ shown: e.i, active: e.i, typed: e.k, done: !1 }), e.k >= a.command.length ? p() : d(a.typeSpeed ?? z, m);
      }, k = () => {
        if (e.cancelled || e.paused) return;
        const a = u[e.i];
        a.isCommand ? (e.mode = "typing", e.k = 0, w({ shown: e.i, active: e.i, typed: 0, done: !1 }), d(a.typeSpeed ?? z, m)) : (e.mode = "fading", w({ shown: e.i, active: e.i, typed: 0, done: !1 }), d(a.fade ?? $, p));
      }, C = () => {
        if (e.cancelled || e.paused) return;
        const a = e.i;
        if (a >= u.length) {
          D();
          return;
        }
        e.mode = "gap", w({ shown: a, active: -1, typed: 0, done: !1 });
        const X = u[a].delay ?? (a === 0 ? Math.min(A, 300) : A);
        d(X, k);
      }, D = () => {
        e.done = !0, e.mode = "done", w({ shown: u.length, active: -1, typed: 0, done: !0 }), t.done(), F && !e.cancelled && d(E, () => {
          e.cancelled || h();
        });
      }, h = () => {
        i(), e.cancelled = !1, e.paused = !1, e.done = !1, e.started = !0, e.i = 0, e.k = 0, w({ shown: 0, active: -1, typed: 0, done: !1 }), C();
      }, I = () => {
        if (e.done || !e.paused) return;
        e.paused = !1;
        const a = u[e.i];
        e.mode === "typing" ? d((a == null ? void 0 : a.typeSpeed) ?? z, m) : e.mode === "fading" ? d((a == null ? void 0 : a.fade) ?? $, p) : C();
      };
      e.start = h, e.pause = () => {
        e.paused = !0, i();
      }, e.resume = I;
      const f = o.current;
      f && (f.play = () => e.started && !e.done ? I() : h(), f.pause = () => e.pause(), f.restart = () => h());
      let g;
      return t.doesStartOnView && typeof IntersectionObserver == "function" && f ? (g = new IntersectionObserver(
        (a) => {
          a.some((N) => N.isIntersecting) && (g == null || g.disconnect(), h());
        },
        { threshold: 0.35 }
      ), g.observe(f)) : h(), () => {
        e.cancelled = !0, i(), g == null || g.disconnect(), f && (delete f.play, delete f.pause, delete f.restart);
      };
    }, [x, u, z, A, $, F, E, t.doesStartOnView]);
    const V = x && !t.isAutoScrollDisabled;
    R(() => {
      if (!V) return;
      const e = l.current;
      e && (e.scrollTop = e.scrollHeight);
    }, [V, b.shown, b.active, b.typed]), R(() => {
      var d;
      const e = (d = o.current) == null ? void 0 : d.shadowRoot;
      if (!e) return;
      const i = () => {
        var m, k;
        const p = ((k = ((m = e.getSelection) == null ? void 0 : m.call(e)) ?? document.getSelection()) == null ? void 0 : k.toString()) ?? "";
        s(p.trim() ? p : "");
      };
      return document.addEventListener("selectionchange", i), () => document.removeEventListener("selectionchange", i);
    }, []);
    const J = async () => {
      const e = n;
      e && (await P(e)).isCopied && t.copy(e);
    }, K = (e) => e.isCommand ? e.command : e.raw, Q = async (e, i) => {
      try {
        const d = K(e);
        if (!(await P(d)).isCopied) return;
        S(i), t.copy(d), setTimeout(() => S((p) => p === i ? -1 : p), 1600);
      } catch {
      }
    }, B = x && b.done && !t.isReplayHidden, U = {
      "--z-terminal-width": t.width || "",
      "--z-terminal-height": t.height || "",
      "--z-terminal-max-height": t.maxHeight || ""
    };
    return /* @__PURE__ */ r("host", { shadowDom: !0, style: U, children: /* @__PURE__ */ v("div", { class: "window", children: [
      /* @__PURE__ */ v("div", { class: "bar", children: [
        /* @__PURE__ */ v("div", { class: "meta", children: [
          t.shell && /* @__PURE__ */ r("span", { class: "shell", children: t.shell }),
          t.cwd && /* @__PURE__ */ r("span", { class: "cwd", children: t.cwd })
        ] }),
        n && /* @__PURE__ */ r("button", { type: "button", class: "copy-selection", onmousedown: (e) => e.preventDefault(), onclick: J, children: c("copySelection") }),
        /* @__PURE__ */ v("div", { class: "dots", "aria-hidden": "true", children: [
          /* @__PURE__ */ r("span", { class: "dot red" }),
          /* @__PURE__ */ r("span", { class: "dot yellow" }),
          /* @__PURE__ */ r("span", { class: "dot green" })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { class: "scroll", ref: l, children: /* @__PURE__ */ r("div", { class: "body", children: u.map((e, i) => {
        const d = !x || i < b.shown, p = x && i === b.active;
        if (x && !d && !p) return null;
        const m = p && e.isCommand, k = p && !e.isCommand, C = m ? e.command.slice(0, b.typed) : e.command, D = W[i] && d;
        let h = "line";
        return D && (h += " copyable"), k && (h += " appearing"), /* @__PURE__ */ v("div", { class: h, style: k ? `--fade:${e.fade ?? $}ms` : void 0, children: [
          /* @__PURE__ */ r("span", { class: "text", children: e.isCommand ? /* @__PURE__ */ v(ae, { children: [
            /* @__PURE__ */ r("span", { class: "prompt", children: e.marker }),
            /* @__PURE__ */ r("span", { class: "command", children: C || (m ? "" : " ") }),
            m && /* @__PURE__ */ r("span", { class: "caret", "aria-hidden": "true" })
          ] }) : /* @__PURE__ */ r("span", { class: "output", children: e.raw || " " }) }),
          D && /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              class: y === i ? "copy is-copied" : "copy",
              "aria-label": c("copyLine"),
              onclick: () => Q(e, i),
              children: y === i ? /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ r("polyline", { points: "4 12 10 18 20 6" }) }) : /* @__PURE__ */ v("svg", { viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ r("rect", { x: "9", y: "9", width: "11", height: "11", rx: "2" }),
                /* @__PURE__ */ r("path", { d: "M5 15V5a2 2 0 0 1 2-2h10" })
              ] })
            }
          )
        ] }, i);
      }) }) }),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          class: B ? "replay show" : "replay",
          "aria-label": c("replay"),
          "aria-hidden": B ? "false" : "true",
          tabindex: B ? "0" : "-1",
          onclick: () => {
            var e, i;
            return (i = (e = o.current) == null ? void 0 : e.restart) == null ? void 0 : i.call(e);
          },
          children: /* @__PURE__ */ v("svg", { viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ r("polyline", { points: "1 4 1 10 7 10" }),
            /* @__PURE__ */ r("path", { d: "M3.5 15a9 9 0 1 0 2.1-9.4L1 10" })
          ] })
        }
      )
    ] }) });
  },
  {
    props: {
      code: String,
      shell: String,
      cwd: String,
      prompt: String,
      copyLines: String,
      tone: { type: ie("success", "primary", "secondary", "warning", "danger"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      // Sizing — any CSS length; height pins the window and scrolls the body.
      width: String,
      height: String,
      maxHeight: String,
      // Animation
      doesAnimate: { type: Boolean, reflect: !0 },
      doesStartOnView: { type: Boolean },
      lines: { type: Array },
      typeSpeed: { type: Number },
      lineDelay: { type: Number },
      fadeDuration: { type: Number },
      doesLoop: { type: Boolean },
      loopDelay: { type: Number },
      isReplayHidden: { type: Boolean, reflect: !0 },
      isAutoScrollDisabled: { type: Boolean, reflect: !0 },
      copy: q({ bubbles: !0, composed: !0 }),
      done: q({ bubbles: !0, composed: !0 })
    },
    styles: [ne, ce]
  }
);
re("z-terminal", ue);
export {
  ue as ZTerminal
};
