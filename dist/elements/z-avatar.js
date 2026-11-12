// @ts-self-types="./z-avatar.d.ts"
import { c as n, a as o, g as l, j as a, d as c } from "../chunks/define-element-BZUk-KLk.js";
import { u as d } from "../chunks/hooks-DEFT8qqt.js";
import { o as r } from "../chunks/prop-types-B3Bpi956.js";
const u = n`
	:host {
		display: inline-flex;
		vertical-align: middle;
		position: relative;
		--size: 2.5rem;
		--tone: var(--text-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}
	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}
	:host([tone='primary']) {
		--tone: var(--text-tertiary);
	}
	:host([tone='success']) {
		--tone: var(--status-success);
	}
	:host([tone='warning']) {
		--tone: var(--status-warning);
	}
	:host([tone='danger']) {
		--tone: var(--status-danger);
	}

	:host([size='xs']) {
		--size: 1.5rem;
	}
	:host([size='sm']) {
		--size: 2rem;
	}
	:host([size='lg']) {
		--size: 3.25rem;
	}
	:host([size='xl']) {
		--size: 4rem;
	}

	.avatar {
		width: var(--size);
		height: var(--size);
		border-radius: var(--radius-full);
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 1px solid color-mix(in oklch, var(--text-primary) 14%, transparent);
		/* srgb: mixing a chromatic tone with the hue-carrying --surface-default in oklch
		   drifts the hue around the wheel. */
		background: color-mix(in srgb, var(--tone) 22%, var(--surface-default));
		/* Toward the theme's own text color, so the initials read in light and dark. */
		color: color-mix(in oklch, var(--tone) 55%, var(--text-primary));
		font-family: inherit;
		font-weight: var(--font-weight-semibold);
		font-size: calc(var(--size) * 0.4);
		line-height: var(--line-height-none);
		user-select: none;
	}

	:host([is-square]) .avatar {
		border-radius: var(--radius-md);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.status {
		position: absolute;
		right: 0;
		bottom: 0;
		width: calc(var(--size) * 0.28);
		height: calc(var(--size) * 0.28);
		border-radius: var(--radius-full);
		border: 2px solid var(--surface-page);
		box-sizing: border-box;
	}
	.status.is-online {
		background: var(--status-success);
	}
	.status.is-busy {
		background: var(--status-danger);
	}
	.status.is-away {
		background: var(--status-warning);
	}
	.status.is-offline {
		background: var(--text-tertiary);
	}
`, h = (e) => {
  if (e.initials) return e.initials.slice(0, 2).toUpperCase();
  if (!e.name) return "?";
  const t = String(e.name).trim().split(/\s+/);
  return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}, g = o(
  (e) => {
    const [t, s] = d(!1), i = e.src && !t;
    return /* @__PURE__ */ l("host", { shadowDom: !0, children: [
      /* @__PURE__ */ a("span", { class: "avatar", role: e.name ? "img" : void 0, "aria-label": e.name, children: i ? /* @__PURE__ */ a("img", { src: e.src, alt: e.name || "", onerror: () => s(!0) }) : /* @__PURE__ */ a("span", { "aria-hidden": "true", children: h(e) }) }),
      e.status && /* @__PURE__ */ a("span", { class: `status is-${e.status}`, "aria-hidden": "true" })
    ] });
  },
  {
    props: {
      src: String,
      name: String,
      initials: String,
      status: { type: r("online", "busy", "away", "offline"), reflect: !0 },
      size: { type: r("xs", "sm", "md", "lg", "xl"), reflect: !0 },
      tone: { type: r("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isSquare: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: u
  }
);
c("z-avatar", g);
export {
  g as ZAvatar
};
