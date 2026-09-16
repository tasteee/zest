// A complete messaging surface: inbox rail, thread, composer, and a details
// pane, composed entirely from the chat family. The thread is authored as
// plain markup — that is the point of the example — and a little wiring on
// top makes it behave: sending appends a bubble that walks through the
// delivery states, the other side "types" and replies, and reactions toggle.

import { buildFragmentFromMarkup, dedent } from '../component-docs/authoring'
import { Icons } from '../component-docs/icons'
import { applySiteBaseUrl } from '../dom-helpers'
import { ExampleKind, ExampleViewport } from './types'
import type { ExampleEntryT, ExampleInstanceT } from './types'

type ZReactionsElementT = HTMLElement & {
	reactions: { emoji: string; count: number; isMine?: boolean }[]
}

type ZReadReceiptElementT = HTMLElement & {
	avatars: { name: string; src?: string }[]
}

type ZImageMessageElementT = HTMLElement & {
	images: { src: string; alt: string }[]
}

type ZMessageListElementT = HTMLElement & {
	scrollToBottom: () => void
}

type ZComposerElementT = HTMLElement & {
	placeholder: string
}

// Timestamps are relative to "now" so the thread always reads as recent, and
// the source shows the same values so a reader can see what shape they take.
const minutesAgo = (minutes: number): string => {
	return new Date(Date.now() - minutes * 60_000).toISOString()
}

const THREAD_MARKUP = `
	<z-chat-shell class="chat" list-size="300px" details-size="272px" has-details>
		<z-conversation-list slot="list">
			<div slot="header" class="chat-rail-header">
				<div class="chat-rail-title">
					<z-heading size="sm" tag="h2">Messages</z-heading>
					<z-button kind="ghost" size="sm" aria-label="New message">${Icons.compose}</z-button>
				</div>
				<z-input size="sm" placeholder="Search conversations">
					<span slot="prefix" class="chat-search-icon">${Icons.search}</span>
				</z-input>
			</div>

			<z-conversation-item value="alice" name="Alice Rivera" preview="Sending the final frames now 🙌"
				timestamp="${minutesAgo(2)}" status="online" is-active is-pinned></z-conversation-item>
			<z-conversation-item value="crit" name="Design crit" preview="Priya: Love the motion pass"
				timestamp="${minutesAgo(26)}" unread="3"></z-conversation-item>
			<z-conversation-item value="marcus" name="Marcus Chen" preview="Can we move standup to 10?"
				timestamp="${minutesAgo(58)}" status="away" unread="1"></z-conversation-item>
			<z-conversation-item value="priya" name="Priya Natarajan" preview="🎉 Shipped!"
				timestamp="${minutesAgo(190)}" status="online"></z-conversation-item>
			<z-conversation-item value="launch" name="Launch week" preview="You: Countdown is live"
				timestamp="${minutesAgo(1_500)}" is-muted></z-conversation-item>
			<z-conversation-item value="sam" name="Sam Okafor" preview="Thanks for the review"
				timestamp="${minutesAgo(4_400)}" status="offline"></z-conversation-item>
		</z-conversation-list>

		<z-chat-header class="chat-header" name="Alice Rivera" subtitle="Active now" status="online">
			<z-button slot="actions" kind="ghost" size="sm" aria-label="Start call">${Icons.phone}</z-button>
			<z-button slot="actions" kind="ghost" size="sm" aria-label="Start video">${Icons.video}</z-button>
			<z-button slot="actions" kind="ghost" size="sm" aria-label="Conversation details">${Icons.info}</z-button>
		</z-chat-header>

		<z-message-list class="chat-thread">
			<z-date-divider label="Yesterday"></z-date-divider>

			<z-message-group side="start" name="Alice Rivera" timestamp="${minutesAgo(1_530)}">
				<z-message-bubble>Hey! Did the motion pass land in the build?</z-message-bubble>
				<z-message-bubble>The drawer easing felt a touch slow in the last cut.</z-message-bubble>
			</z-message-group>

			<z-message-group side="end" timestamp="${minutesAgo(1_520)}">
				<z-message-bubble>Landed this morning — I pulled the drawer down to 220ms.</z-message-bubble>
				<div class="chat-meta"><z-delivery-status status="read"></z-delivery-status></div>
			</z-message-group>

			<z-message-group side="start" name="Alice Rivera" timestamp="${minutesAgo(1_500)}">
				<z-image-message class="chat-album"></z-image-message>
				<z-message-bubble>Frames from the review. The second one is the keeper.</z-message-bubble>
				<z-reactions class="chat-reactions"></z-reactions>
			</z-message-group>

			<z-system-message label="Alice added Priya Natarajan"></z-system-message>

			<z-message-group side="start" name="Priya Natarajan" timestamp="${minutesAgo(1_440)}">
				<z-message-bubble>Late to this, but +1 on the second frame. The type hierarchy finally reads.</z-message-bubble>
			</z-message-group>

			<z-date-divider label="Today"></z-date-divider>

			<z-message-group side="end" timestamp="${minutesAgo(48)}">
				<!-- Bubbles keep whitespace (pre-wrap), so a reply's quote and text sit on one line. -->
				<z-message-bubble><z-quoted-message name="Priya Natarajan" text="+1 on the second frame."></z-quoted-message>Locking it. I'll cut the spec tonight.</z-message-bubble>
				<div class="chat-meta"><z-read-receipt class="chat-receipt" label="Seen by"></z-read-receipt></div>
			</z-message-group>

			<z-unread-divider label="2 new messages"></z-unread-divider>

			<z-message-group side="start" name="Alice Rivera" timestamp="${minutesAgo(2)}">
				<z-message-bubble>Sending the final frames now 🙌</z-message-bubble>
				<z-message-bubble accent="success">Export finished · 12 frames</z-message-bubble>
			</z-message-group>

			<z-typing-indicator class="chat-typing" name="Alice Rivera" is-hidden></z-typing-indicator>
		</z-message-list>

		<z-composer class="chat-composer" placeholder="Message Alice…">
			<z-button slot="leading" kind="ghost" size="sm" aria-label="Attach a file">${Icons.paperclip}</z-button>
			<z-button slot="leading" kind="ghost" size="sm" aria-label="Add an emoji">${Icons.smile}</z-button>
		</z-composer>

		<aside slot="details" class="chat-details">
			<div class="chat-profile">
				<z-avatar name="Alice Rivera" size="xl" status="online"></z-avatar>
				<z-heading size="sm" tag="h3">Alice Rivera</z-heading>
				<z-text size="sm" color="muted">Product design · Berlin</z-text>
				<z-badge label="Online" accent="success" kind="soft" size="sm" is-dot></z-badge>
			</div>
			<z-separator></z-separator>
			<div class="chat-details-section">
				<z-label>Shared media</z-label>
				<div class="chat-media-grid">
					<img src="/photos/a.svg" alt="Ridge line frame" />
					<img src="/photos/b.svg" alt="Harbour frame" />
					<img src="/photos/c.svg" alt="Studio frame" />
				</div>
			</div>
			<z-separator></z-separator>
			<div class="chat-details-section">
				<label class="chat-setting">
					<z-text size="sm">Mute notifications</z-text>
					<z-switch size="sm" aria-label="Mute notifications"></z-switch>
				</label>
				<label class="chat-setting">
					<z-text size="sm">Pin conversation</z-text>
					<z-switch size="sm" is-checked aria-label="Pin conversation"></z-switch>
				</label>
			</div>
		</aside>
	</z-chat-shell>
`

// Scoped to `.chat` so the example's layout rules can't leak into the docs
// page around it. Everything here is layout the shell leaves to its consumer:
// the thread has to flex to fill the pane, the rail header stacks its title
// over its search, the details pane has an inner rhythm.
const THREAD_STYLES = `
	.chat {
		height: 100%;
		background: var(--background);
		color: var(--foreground);
	}
	.chat .chat-thread {
		flex: 1;
		min-height: 0;
		background: var(--background);
	}
	.chat .chat-composer {
		padding: var(--space-sm) var(--space-md) var(--space-md);
		background: var(--background);
	}
	.chat .chat-rail-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-md) var(--space-sm);
	}
	.chat .chat-rail-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.chat .chat-search-icon {
		display: inline-flex;
		color: var(--muted-foreground);
	}
	.chat .chat-meta {
		display: inline-flex;
		margin: 0 0.5rem;
	}
	/* A quote inside an outgoing bubble sits on the primary fill, so its
	   tones are re-pointed at the primary's foreground. */
	.chat z-message-bubble[side="end"] z-quoted-message {
		--bar: var(--primary-foreground);
		--foreground: var(--primary-foreground);
		--muted-foreground: color-mix(in oklch, var(--primary-foreground) 78%, transparent);
		margin-bottom: 0.375rem;
	}
	.chat .chat-album {
		max-width: 16rem;
		margin-bottom: 2px;
	}
	.chat .chat-details {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		height: 100%;
		padding: var(--space-lg) var(--space-md);
		box-sizing: border-box;
		overflow-y: auto;
		background: var(--card);
		border-left: 1px solid var(--border);
	}
	.chat .chat-profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		text-align: center;
		padding-bottom: var(--space-sm);
	}
	.chat .chat-details-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.chat .chat-media-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-xs);
	}
	.chat .chat-media-grid img {
		display: block;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius-sm);
	}
	.chat .chat-setting {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		cursor: pointer;
	}
`

const WIRING_SOURCE = `
	const thread = document.querySelector('.chat-thread')
	const composer = document.querySelector('.chat-composer')
	const typing = document.querySelector('.chat-typing')

	// Data-driven pieces take their arrays as properties.
	document.querySelector('.chat-album').images = [
		{ src: '/photos/a.svg', alt: 'Ridge line frame' },
		{ src: '/photos/b.svg', alt: 'Harbour frame' }
	]
	document.querySelector('.chat-reactions').reactions = [
		{ emoji: '🔥', count: 2, isMine: true },
		{ emoji: '👀', count: 1 }
	]
	document.querySelector('.chat-receipt').avatars = [{ name: 'Alice Rivera' }, { name: 'Priya Natarajan' }]

	// Sending: append to the trailing outgoing group if there is one, so
	// consecutive messages share a timestamp and tuck their corners.
	composer.addEventListener('send', (event) => {
		const bubble = document.createElement('z-message-bubble')
		bubble.textContent = event.detail.value

		const status = document.createElement('z-delivery-status')
		status.setAttribute('status', 'sending')
		const meta = document.createElement('div')
		meta.className = 'chat-meta'
		meta.append(status)

		const group = document.createElement('z-message-group')
		group.setAttribute('side', 'end')
		group.setAttribute('timestamp', new Date().toISOString())
		group.append(bubble, meta)
		typing.before(group)
		thread.scrollToBottom()

		// sending → sent → delivered → read, then the other side replies.
		setTimeout(() => status.setAttribute('status', 'sent'), 400)
		setTimeout(() => status.setAttribute('status', 'delivered'), 900)
		setTimeout(() => status.setAttribute('status', 'read'), 1600)
		setTimeout(() => { typing.isHidden = false; thread.scrollToBottom() }, 1800)
		setTimeout(() => {
			typing.isHidden = true
			const reply = document.createElement('z-message-group')
			reply.setAttribute('side', 'start')
			reply.setAttribute('name', 'Alice Rivera')
			reply.setAttribute('timestamp', new Date().toISOString())
			reply.innerHTML = '<z-message-bubble>Perfect, thanks!</z-message-bubble>'
			typing.before(reply)
			thread.scrollToBottom()
		}, 3600)
	})

	// Reactions toggle in place.
	document.querySelector('.chat-reactions').addEventListener('toggle', (event) => {
		const pills = event.currentTarget
		pills.reactions = pills.reactions.map((pill) => {
			if (pill.emoji !== event.detail.emoji) return pill
			const isMine = !pill.isMine
			return { ...pill, isMine, count: pill.count + (isMine ? 1 : -1) }
		})
	})

	// Picking a conversation moves the active row and retargets the header.
	document.querySelector('z-conversation-list').addEventListener('select', (event) => {
		for (const row of document.querySelectorAll('z-conversation-item')) {
			row.isActive = row.value === event.detail.value
		}
		event.target.unread = 0
		document.querySelector('.chat-header').name = event.target.name
		composer.placeholder = \`Message \${event.target.name}…\`
	})
`

const REPLIES = [
	'Perfect, thanks!',
	'On it — give me ten.',
	'Ha, same. Ship it.',
	'Yes! Saw that in the build, looks great.'
]

const wireThread = (root: HTMLElement, timers: number[]): void => {
	const thread = root.querySelector('.chat-thread') as ZMessageListElementT
	const composer = root.querySelector('.chat-composer') as ZComposerElementT
	const typing = root.querySelector('.chat-typing') as HTMLElement & { isHidden: boolean }
	const header = root.querySelector('.chat-header') as HTMLElement & { name: string; status: string; subtitle: string }
	const conversationList = root.querySelector('z-conversation-list') as HTMLElement

	const album = root.querySelector('.chat-album') as ZImageMessageElementT
	album.images = [
		{ src: '/photos/a.svg', alt: 'Ridge line frame' },
		{ src: '/photos/b.svg', alt: 'Harbour frame' }
	]

	const reactions = root.querySelector('.chat-reactions') as ZReactionsElementT
	reactions.reactions = [
		{ emoji: '🔥', count: 2, isMine: true },
		{ emoji: '👀', count: 1 }
	]

	const receipt = root.querySelector('.chat-receipt') as ZReadReceiptElementT
	receipt.avatars = [{ name: 'Alice Rivera' }, { name: 'Priya Natarajan' }]

	const schedule = (callback: () => void, delay: number): void => {
		timers.push(window.setTimeout(callback, delay))
	}

	let replyIndex = 0

	composer.addEventListener('send', (event) => {
		const sendEvent = event as CustomEvent<{ value: string }>

		const bubble = document.createElement('z-message-bubble')
		bubble.textContent = sendEvent.detail.value

		const status = document.createElement('z-delivery-status')
		status.setAttribute('status', 'sending')
		const meta = document.createElement('div')
		meta.className = 'chat-meta'
		meta.append(status)

		const group = document.createElement('z-message-group')
		group.setAttribute('side', 'end')
		group.setAttribute('timestamp', new Date().toISOString())
		group.append(bubble, meta)
		typing.before(group)
		thread.scrollToBottom()

		schedule(() => status.setAttribute('status', 'sent'), 400)
		schedule(() => status.setAttribute('status', 'delivered'), 900)
		schedule(() => status.setAttribute('status', 'read'), 1600)
		schedule(() => {
			typing.isHidden = false
			thread.scrollToBottom()
		}, 1800)
		schedule(() => {
			typing.isHidden = true

			const reply = document.createElement('z-message-group')
			reply.setAttribute('side', 'start')
			reply.setAttribute('name', header.name)
			reply.setAttribute('timestamp', new Date().toISOString())

			const replyBubble = document.createElement('z-message-bubble')
			replyBubble.textContent = REPLIES[replyIndex % REPLIES.length]
			replyIndex += 1
			reply.append(replyBubble)

			typing.before(reply)
			thread.scrollToBottom()
		}, 3600)
	})

	// Typed as Event: the DOM lib assumes a "toggle" listener gets a
	// ToggleEvent, which this custom event is not.
	reactions.addEventListener('toggle', (event: Event) => {
		const toggleEvent = event as CustomEvent<{ emoji: string }>
		reactions.reactions = reactions.reactions.map((pill) => {
			if (pill.emoji !== toggleEvent.detail.emoji) return pill
			const isMine = !pill.isMine
			return { ...pill, isMine, count: pill.count + (isMine ? 1 : -1) }
		})
	})

	conversationList.addEventListener('select', (event) => {
		const selectEvent = event as CustomEvent<{ value?: string }>
		const selectedRow = event.target as HTMLElement & { name: string; status: string; unread: number }

		const rows = root.querySelectorAll('z-conversation-item') as NodeListOf<HTMLElement & { isActive: boolean; value: string }>
		for (const row of rows) row.isActive = row.value === selectEvent.detail.value

		selectedRow.unread = 0
		header.name = selectedRow.name
		header.status = selectedRow.status ?? ''
		header.subtitle = selectedRow.status === 'online' ? 'Active now' : selectedRow.status === 'away' ? 'Away' : ''
		typing.setAttribute('name', selectedRow.name)
		composer.placeholder = `Message ${selectedRow.name}…`
	})
}

const buildChatThread = (): ExampleInstanceT => {
	const root = document.createElement('div')
	root.className = 'exampleRoot'

	const style = document.createElement('style')
	style.textContent = THREAD_STYLES

	root.append(style, buildFragmentFromMarkup(THREAD_MARKUP))
	applySiteBaseUrl(root)

	const timers: number[] = []
	wireThread(root, timers)

	return {
		root,
		dispose: () => {
			for (const timer of timers) window.clearTimeout(timer)
		}
	}
}

export const chatThreadExample: ExampleEntryT = {
	slug: 'chat-thread',
	title: 'Chat thread',
	tagline: 'An inbox rail, a grouped message thread, and a composer that actually sends.',
	description:
		'The whole messaging surface, from the chat family alone. `z-chat-shell` frames three resizable panes; the rail is a `z-conversation-list` of `z-conversation-item` rows, the thread is a `z-message-list` of `z-message-group`s, and `z-composer` sits at the foot. The thread is plain markup — dividers, system lines, an image album, reactions, a quoted reply, receipts — and consecutive bubbles from one sender tuck their corners because the group positions them. Send a message: it walks through the delivery states, the other side starts typing, and a reply lands. Pick another conversation to retarget the header and composer.',
	kind: ExampleKind.page,
	tags: ['chat', 'messaging', 'layout'],
	elements: [
		'z-chat-shell',
		'z-conversation-list',
		'z-conversation-item',
		'z-chat-header',
		'z-message-list',
		'z-message-group',
		'z-message-bubble',
		'z-date-divider',
		'z-unread-divider',
		'z-system-message',
		'z-image-message',
		'z-reactions',
		'z-quoted-message',
		'z-delivery-status',
		'z-read-receipt',
		'z-typing-indicator',
		'z-composer',
		'z-avatar',
		'z-input',
		'z-button',
		'z-badge',
		'z-switch'
	],
	viewports: [ExampleViewport.desktop],
	stageHeight: '42rem',
	thumbnail: { width: 1240, height: 780 },
	snippets: [
		{ label: 'HTML', language: 'html', code: dedent(THREAD_MARKUP) },
		{ label: 'JS', language: 'js', code: dedent(WIRING_SOURCE) },
		{ label: 'CSS', language: 'css', code: dedent(THREAD_STYLES) }
	],
	build: buildChatThread
}
