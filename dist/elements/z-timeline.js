// @ts-self-types="./z-timeline.d.ts"
import { c as s, a, j as e, d as r } from "../chunks/define-element-BZUk-KLk.js";
import { i as o } from "../chunks/interaction-styles-C6mMacCu.js";
import { o as t } from "../chunks/prop-types-CSJu2W-0.js";
import { u as c } from "../chunks/locale-BNhgEFKA.js";
import "./z-timeline-item.js";
const l = s`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 0;
		--z-timeline-accent: var(--text-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([tone='primary']) { --z-timeline-accent: var(--accent-primary); }
	:host([tone='secondary']) { --z-timeline-accent: var(--accent-secondary); }
	:host([tone='tertiary']) { --z-timeline-accent: var(--accent-tertiary); }
	:host([tone='success']) { --z-timeline-accent: var(--status-success); }
	:host([tone='warning']) { --z-timeline-accent: var(--status-warning); }
	:host([tone='danger']) { --z-timeline-accent: var(--status-danger); }

	:host([size='sm']) {
		--z-timeline-gap: var(--space-4);
	}

	::slotted(:last-child) {
		--z-timeline-line: none;
		--z-timeline-gap: 0px;
	}
`, m = a(
  (i) => {
    const n = c();
    return /* @__PURE__ */ e("host", { shadowDom: !0, role: "list", "aria-label": i.label || n("timeline"), children: /* @__PURE__ */ e("slot", {}) });
  },
  {
    props: {
      label: String,
      size: { type: t("sm", "md"), reflect: !0 },
      tone: { type: t("primary", "secondary", "tertiary", "success", "warning", "danger"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 }
    },
    styles: [l, o]
  }
);
r("z-timeline", m);
export {
  m as ZTimeline
};
