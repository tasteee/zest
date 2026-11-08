import { defineElement } from '../shared/define-element'
import { c, css } from 'atomico'
import { themedScrollbarStyles } from '../shared/scrollbar-styles'

/*
 * z-conversation-list, the inbox rail: a scrolling column of
 * z-conversation-item children, with an optional sticky `header` slot (title,
 * search, new-chat button). Purely a layout/scroll container; selection is
 * handled by the items' own `select` events, which bubble.
 *
 *   <z-conversation-list>
 *     <div slot="header">…search…</div>
 *     <z-conversation-item …></z-conversation-item>
 *   </z-conversation-list>
 */
const styles = css`
	:host {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		background: var(--surface-default);
	}
	:host([is-hidden]) {
		display: none;
	}
	.header {
		flex: 0 0 auto;
		position: sticky;
		top: 0;
		z-index: 1;
		background: var(--surface-default);
		border-bottom: 1px solid var(--border-default);
	}
	.header:empty {
		display: none;
	}
	.scroll {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		padding: var(--space-1-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
	}
`

export const ZConversationList = c(
	() => (
		<host shadowDom>
			<div class="header">
				<slot name="header" />
			</div>
			<div class="scroll">
				<slot />
			</div>
		</host>
	),
	{
		props: {
			isHidden: { type: Boolean, reflect: true }
		},
		styles: [themedScrollbarStyles, styles]
	}
)

defineElement('z-conversation-list', ZConversationList)
