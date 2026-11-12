// @ts-self-types="./z-avatar-stack.d.ts"
import { c as v, a as f, f as h, g as i, j as u, d as g } from "../chunks/define-element-BZUk-KLk.js";
import { u as p } from "../chunks/hooks-DEFT8qqt.js";
import { o as x } from "../chunks/prop-types-B3Bpi956.js";
const z = v`
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
		outline: 3px solid var(--stack-ring, var(--surface-page));
		border-radius: var(--radius-full);
		margin-inline-start: calc(-1 * var(--overlap));
		transition: transform var(--motion-base) var(--ease-enter);
	}

	::slotted(z-avatar:first-child) {
		margin-inline-start: 0;
	}

	::slotted(z-avatar:hover) {
		transform: translateY(-0.15rem);
	}

	.overflow {
		box-sizing: border-box;
		width: var(--size);
		height: var(--size);
		border-radius: var(--radius-full);
		margin-inline-start: calc(-1 * var(--overlap));
		outline: 3px solid var(--stack-ring, var(--surface-page));
		background: var(--border-default);
		color: var(--text-secondary);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: inherit;
		font-weight: var(--font-weight-semibold);
		font-size: calc(var(--size) * 0.34);
		line-height: var(--line-height-none);
		user-select: none;
	}
`, b = f(
  (t) => {
    const r = h(), [a, l] = p(0), e = t.max || 0, c = () => {
      const o = r.current;
      if (!o) return;
      const n = o.assignedElements();
      l(n.length), n.forEach((m, d) => {
        m.style.display = e > 0 && d >= e ? "none" : "";
      });
    }, s = t.total ? Math.max(0, t.total - Math.min(e || a, a)) : e > 0 ? Math.max(0, a - e) : 0;
    return /* @__PURE__ */ i("host", { shadowDom: !0, children: [
      /* @__PURE__ */ u("slot", { ref: r, onslotchange: c }),
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
      size: { type: x("xs", "sm", "md", "lg", "xl"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: z
  }
);
g("z-avatar-stack", b);
export {
  b as ZAvatarStack
};
