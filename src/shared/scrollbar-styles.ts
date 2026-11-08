import { css } from 'atomico'

/**
 * The single scrollbar treatment for every scroll surface inside a Zest shadow
 * root. Document-level rules in document.css cover application chrome; this sheet
 * covers internal component surfaces, where document CSS cannot cross the
 * shadow boundary.
 */
export const themedScrollbarStyles = css`
	@supports not selector(::-webkit-scrollbar) {
		:host,
		* {
			scrollbar-width: thin;
			scrollbar-color: var(--border-default) transparent;
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
		background: var(--border-default);
		border: 2px solid transparent;
		border-radius: 999px;
		background-clip: padding-box;
	}
	:host::-webkit-scrollbar-thumb:hover,
	*::-webkit-scrollbar-thumb:hover {
		background: var(--border-strong);
		background-clip: padding-box;
	}
	:host::-webkit-scrollbar-button,
	*::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}
`
