import { c as f, a as h, f as v, g as i, j as u, d as g } from "../chunks/define-element-BWC3wEPr.js";
import { u as p } from "../chunks/hooks-D9_x-ckD.js";
const z = f`
	:host {
		display: inline-flex;
		align-items: center;
		--size: 2.5rem;
		--overlap: 0.7rem;
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([size='xs']) {
		--size: 1.5rem;
		--overlap: 0.45rem;
	}
	:host([size='sm']) {
		--size: 2rem;
		--overlap: 0.55rem;
	}
	:host([size='lg']) {
		--size: 3.25rem;
		--overlap: 0.9rem;
	}
	:host([size='xl']) {
		--size: 4rem;
		--overlap: 1.1rem;
	}

	::slotted(z-avatar) {
		outline: 3px solid var(--stack-ring, var(--background));
		border-radius: 999px;
		margin-left: calc(-1 * var(--overlap));
		transition: transform 0.12s ease;
	}

	::slotted(z-avatar:first-child) {
		margin-left: 0;
	}

	::slotted(z-avatar:hover) {
		transform: translateY(-0.15rem);
	}

	.overflow {
		box-sizing: border-box;
		width: var(--size);
		height: var(--size);
		border-radius: 999px;
		margin-left: calc(-1 * var(--overlap));
		outline: 3px solid var(--stack-ring, var(--background));
		background: var(--color-neutral-3);
		color: var(--muted-foreground);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: inherit;
		font-weight: 600;
		font-size: calc(var(--size) * 0.34);
		line-height: 1;
		user-select: none;
	}
`, x = h(
  (t) => {
    const a = v(), [r, l] = p(0), e = t.max || 0, c = () => {
      const o = a.current;
      if (!o) return;
      const n = o.assignedElements();
      l(n.length), n.forEach((m, d) => {
        m.style.display = e > 0 && d >= e ? "none" : "";
      });
    }, s = t.total ? Math.max(0, t.total - Math.min(e || r, r)) : e > 0 ? Math.max(0, r - e) : 0;
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ u("slot", { ref: a, onslotchange: c }),
      s > 0 && /* @__PURE__ */ i("span", { class: "overflow", children: [
        "+",
        s
      ] })
    ] });
  },
  {
    props: {
      max: Number,
      total: Number,
      size: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: z
  }
);
g("z-avatar-stack", x);
export {
  x as ZAvatarStack
};
