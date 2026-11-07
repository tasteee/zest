import { c as i } from "./define-element-BZUk-KLk.js";
const o = i`
	@media (prefers-reduced-motion: reduce) {
		*, *::before, *::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}

	@media (forced-colors: active) {
		:host(:focus-visible),
		:focus-visible,
		:focus-visible + .box,
		:focus-visible + .ring,
		:focus-visible + .track,
		.field:focus-within {
			outline: 2px solid Highlight !important;
			outline-offset: 2px;
		}

		.is-checked,
		.is-on,
		.is-active,
		.is-selected,
		[aria-selected='true'],
		[aria-current] {
			forced-color-adjust: none;
			background: Highlight !important;
			border-color: Highlight !important;
			color: HighlightText !important;
		}

		.is-checked *,
		.is-on *,
		.is-active *,
		.is-selected *,
		[aria-selected='true'] * {
			color: HighlightText !important;
			stroke: HighlightText;
		}

		.is-disabled,
		:disabled,
		[aria-disabled='true'] {
			color: GrayText !important;
			border-color: GrayText !important;
			opacity: 1;
		}

		.field,
		.trigger,
		.panel,
		.surface,
		.box,
		.ring,
		.track,
		button {
			border-color: CanvasText;
		}
	}
`;
export {
  o as i
};
