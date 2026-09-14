import { c as f, a as p, f as d, b as u, g as s, j as l, d as x } from "../chunks/define-element-BWC3wEPr.js";
import { u as m } from "../chunks/hooks-D9_x-ckD.js";
import { d as w } from "../chunks/debounce-CRAeDgkb.js";
const y = f`
	:host {
		display: flex;
		align-items: center;
		gap: 1rem;
		box-sizing: border-box;
		width: 100%;
		padding: 0.375rem 0.875rem;
		background: var(--popover);
		border-top: 1px solid var(--border);
		color: var(--muted-foreground);
		font-size: var(--font-size-caption);
		position: sticky;
		bottom: 0;
	}

	.stat {
		display: inline-flex;
		align-items: center;
		gap: 0.3125rem;
		white-space: nowrap;
	}

	.spacer {
		flex: 1;
	}

	.save-state {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
	}

	.dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 999px;
		background: var(--muted-foreground);
	}

	.save-state.is-saving .dot {
		background: var(--warning);
	}

	.save-state.is-saved .dot {
		background: var(--success);
	}
`, g = (e, r) => {
  const n = e.trim(), t = n ? n.split(/\s+/).length : 0, i = e.length, o = t === 0 ? 0 : Math.max(1, Math.round(t / r));
  return { words: t, chars: i, readMinutes: o };
}, M = p(
  (e) => {
    const [r, n] = m(() => g(String(e.text || ""), e.wordsPerMinute || 200)), [t, i] = m(String(e.saveState || "idle")), o = d(), c = d();
    u(() => {
      const a = o.current ?? (o.current = w((b, S) => n(g(b, S)), 500));
      return a(String(e.text || ""), e.wordsPerMinute || 200), () => a.cancel();
    }, [e.text, e.wordsPerMinute]), u(() => {
      clearTimeout(c.current);
      const a = String(e.saveState || "idle");
      if (i(a), a === "saved")
        return c.current = setTimeout(() => i("idle"), 2e3), () => clearTimeout(c.current);
    }, [e.saveState]);
    const v = t === "saving" ? "Saving…" : t === "saved" ? "Saved" : "Idle", h = e.cursorLine != null;
    return /* @__PURE__ */ s("host", { shadowDom: !0, role: "status", "aria-label": "Document status", children: [
      /* @__PURE__ */ s("span", { class: "stat", children: [
        r.words,
        " words"
      ] }),
      /* @__PURE__ */ s("span", { class: "stat", children: [
        r.chars,
        " chars"
      ] }),
      /* @__PURE__ */ s("span", { class: "stat", children: [
        r.readMinutes,
        " min read"
      ] }),
      h && /* @__PURE__ */ s("span", { class: "stat", children: [
        "Ln ",
        e.cursorLine,
        ", Col ",
        e.cursorColumn ?? 1
      ] }),
      /* @__PURE__ */ l("span", { class: "spacer" }),
      /* @__PURE__ */ s("span", { class: ["save-state", `is-${t}`].join(" "), children: [
        /* @__PURE__ */ l("span", { class: "dot", "aria-hidden": "true" }),
        v
      ] })
    ] });
  },
  {
    props: {
      text: { type: String },
      cursorLine: { type: Number },
      cursorColumn: { type: Number },
      saveState: { type: String, reflect: !0 },
      wordsPerMinute: { type: Number }
    },
    styles: y
  }
);
x("z-status-bar", M);
export {
  M as ZStatusBar
};
