import { c as J, a as K, e as H, u as Q, f as E, b as F, j as s, g, F as U, d as X } from "../chunks/define-element-BWC3wEPr.js";
import { u as V, a as D } from "../chunks/hooks-D9_x-ckD.js";
import { t as ee } from "../chunks/scrollbar-styles-DNEW5KBr.js";
const te = J`
	:host {
		display: block;
		width: var(--z-terminal-width, auto);
		--accent: var(--success);
	}

	:host([accent='sub']) {
		--accent: var(--purple);
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
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--color-neutral-0);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	/* Seamless header — same surface as the body, no divider (Hyper-clean). */
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex: 0 0 auto;
		padding: 0.625rem 0.875rem 0.25rem 0.875rem;
		user-select: none;
	}

	.meta {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		min-width: 0;
		font-size: var(--font-size-caption);
	}

	.shell {
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--accent);
		white-space: nowrap;
	}

	.cwd {
		color: var(--muted-foreground);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Traffic-light window dots. */
	.dots {
		display: inline-flex;
		align-items: center;
		gap: 0.4375rem;
		flex-shrink: 0;
	}

	.dot {
		width: 0.6875rem;
		height: 0.6875rem;
		border-radius: 999px;
		background: var(--color-neutral-3);
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

	.scroll {
		flex: 1 1 auto;
		min-height: 0;
		overflow: auto;
	}
	/* Firefox only — Chromium uses the arrow-less ::-webkit-scrollbar below; giving
	   it scrollbar-width would swap in the OS bar (arrows on Windows). */
	@supports not selector(::-webkit-scrollbar) {
		.scroll {
			scrollbar-width: thin;
			scrollbar-color: var(--color-neutral-3) transparent;
		}
	}
	.scroll::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}
	.scroll::-webkit-scrollbar-thumb {
		background: var(--color-neutral-3);
		border-radius: 999px;
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
		padding: 0.375rem 0 0.75rem 0;
		font-size: var(--font-size-small);
		line-height: 1.75;
		letter-spacing: 0.35px;
		text-align: left;
		color: var(--foreground);
		tab-size: 2;
	}

	/* ::selection doesn't cross shadow boundaries — restate ink.css's selection
	   colors so terminal text highlights like the rest of the page. */
	.body ::selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}
	.body ::-moz-selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}

	.line {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.75rem;
		padding: 0 0.875rem;
		min-height: 1.75em;
	}

	.line.copyable {
		cursor: default;
	}

	.line.copyable:hover {
		background: color-mix(in oklch, var(--foreground) 6%, transparent);
	}

	.text {
		flex: 1 1 auto;
		min-width: 0;
		text-align: left;
		white-space: pre;
		overflow: hidden;
		/* Terminal text stays selectable even though the page default opts out. */
		user-select: text;
		-webkit-user-select: text;
	}

	.prompt {
		color: var(--accent);
		user-select: none;
		margin-right: 0.5rem;
	}

	.command {
		color: var(--foreground);
	}

	.output {
		color: var(--muted-foreground);
	}

	/* Blinking block caret that trails the typing head on the active command. */
	.caret {
		display: inline-block;
		width: 0.55em;
		height: 1.05em;
		margin-left: 1px;
		vertical-align: text-bottom;
		background: var(--accent);
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

	/* Replay control — appears bottom-right once a run completes. */
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
		background: color-mix(in oklch, var(--color-neutral-0) 82%, transparent);
		border: 1px solid var(--border);
		border-radius: 999px;
		color: var(--muted-foreground);
		cursor: pointer;
		opacity: 0;
		transform: scale(0.9);
		pointer-events: none;
		transition:
			opacity 0.18s ease,
			transform 0.18s ease,
			color 0.12s ease,
			background-color 0.12s ease;
	}

	.replay.show {
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}

	.replay:hover {
		color: var(--foreground);
	}

	.replay:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
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
		color: var(--muted-foreground);
		cursor: pointer;
		opacity: 0;
		transition:
			opacity 0.12s ease,
			color 0.12s ease,
			background-color 0.12s ease;
	}

	.line.copyable:hover .copy,
	.copy:focus-visible {
		opacity: 1;
	}

	.copy:hover {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 10%, transparent);
	}

	.copy:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: -1px;
	}

	.copy.is-copied {
		color: var(--success);
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
`, R = (t, o) => {
  const l = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), i = new RegExp(`^\\s*${l}\\s+(.*)$`);
  return t.split(`
`).map((a) => {
    const n = a.match(i);
    return n ? { raw: a, isCommand: !0, marker: o, command: n[1] } : { raw: a, isCommand: !1, marker: "", command: "" };
  });
}, oe = (t, o) => {
  const l = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), i = t.match(new RegExp(`^\\s*${l}\\s+(.*)$`));
  return i ? i[1] : t;
}, ne = (t, o, l) => Array.isArray(l) && l.length ? l.map((i) => {
  if (typeof i == "string") return R(i, o)[0];
  const a = String(i.text ?? ""), n = i.type != null ? i.type === "command" : R(a, o)[0].isCommand;
  return {
    raw: a,
    isCommand: n,
    marker: n ? o : "",
    command: n ? oe(a, o) : "",
    delay: i.delay,
    typeSpeed: i.typeSpeed,
    fade: i.fade
  };
}) : R(t, o), re = (t, o) => {
  if (t == null || t === "") return o.map((a) => a.isCommand);
  if (Array.isArray(t)) {
    const a = new Set(t.map(Number));
    return o.map((n, d) => a.has(d + 1));
  }
  const l = String(t).trim().toLowerCase();
  if (l === "all") return o.map((a) => a.raw.length > 0);
  if (l === "none") return o.map(() => !1);
  if (l === "commands" || l === "prompt" || l === "auto") return o.map((a) => a.isCommand);
  const i = /* @__PURE__ */ new Set();
  for (const a of l.split(",")) {
    const n = a.trim();
    if (!n) continue;
    const d = n.match(/^(\d+)\s*-\s*(\d+)$/);
    if (d)
      for (let v = Number(d[1]); v <= Number(d[2]); v++) i.add(v);
    else /^\d+$/.test(n) && i.add(Number(n));
  }
  return o.map((a, n) => i.has(n + 1));
}, $ = (t, o) => t == null || t === "" || Number.isNaN(Number(t)) ? o : Number(t), ae = K(
  (t) => {
    const o = Q(), l = E(), [i, a] = V(-1), [n, d] = V({ shown: 0, active: -1, typed: 0, done: !1 }), v = (t.code ?? "").replace(/\n$/, ""), T = t.prompt || "$", m = D(() => ne(v, T, t.lines), [v, T, t.lines]), I = D(() => re(t.copyLines, m), [t.copyLines, m]), q = !!t.doesAnimate, k = $(t.typeSpeed, 55), A = $(t.lineDelay, 380), S = $(t.fadeDuration, 240), j = $(t.loopDelay, 2200), L = !!t.doesLoop, _ = D(
      () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches,
      []
    ), b = q && !_, P = E({}).current;
    F(() => {
      if (!b) {
        d({ shown: m.length, active: -1, typed: 0, done: !1 });
        return;
      }
      const e = P;
      e.cancelled = !1, e.paused = !1, e.done = !1, e.started = !1, e.i = 0, e.k = 0, e.mode = "gap";
      const c = () => {
        e.timer && clearTimeout(e.timer), e.timer = 0;
      }, p = (r, N) => {
        e.timer = window.setTimeout(N, r);
      }, u = () => {
        e.i += 1, x();
      }, w = () => {
        if (e.cancelled || e.paused) return;
        const r = m[e.i];
        e.k += 1, d({ shown: e.i, active: e.i, typed: e.k, done: !1 }), e.k >= r.command.length ? u() : p(r.typeSpeed ?? k, w);
      }, C = () => {
        if (e.cancelled || e.paused) return;
        const r = m[e.i];
        r.isCommand ? (e.mode = "typing", e.k = 0, d({ shown: e.i, active: e.i, typed: 0, done: !1 }), p(r.typeSpeed ?? k, w)) : (e.mode = "fading", d({ shown: e.i, active: e.i, typed: 0, done: !1 }), p(r.fade ?? S, u));
      }, x = () => {
        if (e.cancelled || e.paused) return;
        const r = e.i;
        if (r >= m.length) {
          z();
          return;
        }
        e.mode = "gap", d({ shown: r, active: -1, typed: 0, done: !1 });
        const G = m[r].delay ?? (r === 0 ? Math.min(A, 300) : A);
        p(G, C);
      }, z = () => {
        e.done = !0, e.mode = "done", d({ shown: m.length, active: -1, typed: 0, done: !0 }), t.done(), L && !e.cancelled && p(j, () => {
          e.cancelled || h();
        });
      }, h = () => {
        c(), e.cancelled = !1, e.paused = !1, e.done = !1, e.started = !0, e.i = 0, e.k = 0, d({ shown: 0, active: -1, typed: 0, done: !1 }), x();
      }, O = () => {
        if (e.done || !e.paused) return;
        e.paused = !1;
        const r = m[e.i];
        e.mode === "typing" ? p((r == null ? void 0 : r.typeSpeed) ?? k, w) : e.mode === "fading" ? p((r == null ? void 0 : r.fade) ?? S, u) : x();
      };
      e.start = h, e.pause = () => {
        e.paused = !0, c();
      }, e.resume = O;
      const f = o.current;
      f && (f.play = () => e.started && !e.done ? O() : h(), f.pause = () => e.pause(), f.restart = () => h());
      let y;
      return t.doesStartOnView && typeof IntersectionObserver == "function" && f ? (y = new IntersectionObserver(
        (r) => {
          r.some((N) => N.isIntersecting) && (y == null || y.disconnect(), h());
        },
        { threshold: 0.35 }
      ), y.observe(f)) : h(), () => {
        e.cancelled = !0, c(), y == null || y.disconnect(), f && (delete f.play, delete f.pause, delete f.restart);
      };
    }, [b, m, k, A, S, L, j, t.doesStartOnView]);
    const M = b && t.doesAutoScroll;
    F(() => {
      if (!M) return;
      const e = l.current;
      e && (e.scrollTop = e.scrollHeight);
    }, [M, n.shown, n.active, n.typed]);
    const W = (e) => e.isCommand ? e.command : e.raw, Y = async (e, c) => {
      try {
        const p = W(e);
        await navigator.clipboard.writeText(p), a(c), t.copy(p), setTimeout(() => a((u) => u === c ? -1 : u), 1600);
      } catch {
      }
    }, B = b && n.done && t.hasReplay, Z = {
      "--z-terminal-width": t.width || "",
      "--z-terminal-height": t.height || "",
      "--z-terminal-max-height": t.maxHeight || ""
    };
    return /* @__PURE__ */ s("host", { shadowDom: !0, style: Z, children: /* @__PURE__ */ g("div", { class: "window", children: [
      /* @__PURE__ */ g("div", { class: "bar", children: [
        /* @__PURE__ */ g("div", { class: "meta", children: [
          t.shell && /* @__PURE__ */ s("span", { class: "shell", children: t.shell }),
          t.cwd && /* @__PURE__ */ s("span", { class: "cwd", children: t.cwd })
        ] }),
        /* @__PURE__ */ g("div", { class: "dots", "aria-hidden": "true", children: [
          /* @__PURE__ */ s("span", { class: "dot red" }),
          /* @__PURE__ */ s("span", { class: "dot yellow" }),
          /* @__PURE__ */ s("span", { class: "dot green" })
        ] })
      ] }),
      /* @__PURE__ */ s("div", { class: "scroll", ref: l, children: /* @__PURE__ */ s("div", { class: "body", children: m.map((e, c) => {
        const p = !b || c < n.shown, u = b && c === n.active;
        if (b && !p && !u) return null;
        const w = u && e.isCommand, C = u && !e.isCommand, x = w ? e.command.slice(0, n.typed) : e.command, z = I[c] && p;
        let h = "line";
        return z && (h += " copyable"), C && (h += " appearing"), /* @__PURE__ */ g(
          "div",
          {
            class: h,
            style: C ? `--fade:${e.fade ?? S}ms` : void 0,
            children: [
              /* @__PURE__ */ s("span", { class: "text", children: e.isCommand ? /* @__PURE__ */ g(U, { children: [
                /* @__PURE__ */ s("span", { class: "prompt", children: e.marker }),
                /* @__PURE__ */ s("span", { class: "command", children: x || (w ? "" : " ") }),
                w && /* @__PURE__ */ s("span", { class: "caret", "aria-hidden": "true" })
              ] }) : /* @__PURE__ */ s("span", { class: "output", children: e.raw || " " }) }),
              z && /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  class: i === c ? "copy is-copied" : "copy",
                  "aria-label": "Copy line",
                  onclick: () => Y(e, c),
                  children: i === c ? /* @__PURE__ */ s("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ s("polyline", { points: "4 12 10 18 20 6" }) }) : /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ s("rect", { x: "9", y: "9", width: "11", height: "11", rx: "2" }),
                    /* @__PURE__ */ s("path", { d: "M5 15V5a2 2 0 0 1 2-2h10" })
                  ] })
                }
              )
            ]
          },
          c
        );
      }) }) }),
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          class: B ? "replay show" : "replay",
          "aria-label": "Replay",
          "aria-hidden": B ? "false" : "true",
          tabindex: B ? "0" : "-1",
          onclick: () => {
            var e, c;
            return (c = (e = o.current) == null ? void 0 : e.restart) == null ? void 0 : c.call(e);
          },
          children: /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ s("polyline", { points: "1 4 1 10 7 10" }),
            /* @__PURE__ */ s("path", { d: "M3.5 15a9 9 0 1 0 2.1-9.4L1 10" })
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
      accent: { type: String, reflect: !0 },
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
      hasReplay: { type: Boolean, value: () => !0 },
      doesAutoScroll: { type: Boolean, value: () => !0 },
      copy: H({ bubbles: !0, composed: !0 }),
      done: H({ bubbles: !0, composed: !0 })
    },
    styles: [ee, te]
  }
);
X("z-terminal", ae);
export {
  ae as ZTerminal
};
