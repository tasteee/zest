import { c as r } from "./define-element-BWC3wEPr.js";
const t = r`
	@supports not selector(::-webkit-scrollbar) {
		:host,
		* {
			scrollbar-width: thin;
			scrollbar-color: var(--color-neutral-3) transparent;
		}
	}

	:host::-webkit-scrollbar,
	*::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	:host::-webkit-scrollbar-track,
	*::-webkit-scrollbar-track,
	:host::-webkit-scrollbar-corner,
	*::-webkit-scrollbar-corner {
		background: transparent;
	}
	:host::-webkit-scrollbar-thumb,
	*::-webkit-scrollbar-thumb {
		background: var(--color-neutral-3);
		border: 2px solid transparent;
		border-radius: 999px;
		background-clip: padding-box;
	}
	:host::-webkit-scrollbar-thumb:hover,
	*::-webkit-scrollbar-thumb:hover {
		background: var(--color-neutral-4);
		background-clip: padding-box;
	}
	:host::-webkit-scrollbar-button,
	*::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}
`;
export {
  t
};
