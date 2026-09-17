import { dedent } from '../component-docs/authoring'
import { ExampleKind, ExampleViewport } from './types'
import type { ExampleEntryT, ExampleInstanceT } from './types'
import type { ChatTranscriptT } from '../../../src/components/z-chat-types'

const archivedChat: ChatTranscriptT = {
	id: 'chat-alice', displayName: 'Alice Rivera', isGroup: false, participants: ['You', 'Alice Rivera'],
	daySummaries: {
		'2024-05-17': 'Alice shares that her balcony basil survived the cold. A playful debate establishes basil as her favorite vegetable.',
		'2024-05-18': 'Alice sends a photo of the first harvest. The exchange turns affectionate, ending with an edited declaration of love.',
		'2024-05-19': 'They return to the declaration with warmth and humor, making plans for dinner and a deliberately overdramatic basil centerpiece.',
		'2024-05-20': 'A plant-market invitation becomes a negotiation over mint, labels, and who can be trusted with an aggressively spreading herb.',
		'2024-05-21': 'The basil becomes pesto, and a small everyday update closes the thread with an easy plan to cook together.'
	},
	messages: [
		{ id: 'm-101', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'The basil finally came back after that cold week.', service: 'iMessage', sentAt: '2024-05-17T19:42:00Z', hasAttachments: false, attachments: [], attachmentIds: [], reactions: [{ id: 'r-1', messageId: 'm-101', actor: 'You', emoji: '❤️', createdAt: '2024-05-17T19:43:00Z' }] },
		{ id: 'm-102', chatId: 'chat-alice', sender: null, isFromMe: true, text: 'That balcony gets perfect afternoon light. Still your favorite vegetable?', service: 'iMessage', sentAt: '2024-05-17T19:44:00Z', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm-103', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'Always. Tomatoes are fruit, so basil wins by default.', service: 'iMessage', sentAt: '2024-05-17T19:45:00Z', replyToMessageId: 'm-102', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm-104', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'This was the first tiny harvest.', service: 'iMessage', sentAt: '2024-05-18T14:08:00Z', hasAttachments: true, attachmentIds: ['a-1'], attachments: [{ id: 'a-1', filename: 'IMG_1042.HEIC', transferName: 'balcony-basil.jpg', mimeType: 'image/jpeg', size: 842211, createdAt: '2024-05-18T14:08:00Z', dataPath: '/photos/a.svg', thumbnailPath: '/photos/a.svg', chatId: 'chat-alice', messageId: 'm-104' }] },
		{ id: 'm-105', chatId: 'chat-alice', sender: null, isFromMe: true, text: 'I love you. And your extremely defensible vegetable rankings.', service: 'iMessage', sentAt: '2024-05-18T14:11:00Z', hasAttachments: false, attachments: [], attachmentIds: [], isEdited: true, reactions: [{ id: 'r-2', messageId: 'm-105', actor: 'Alice Rivera', emoji: '❤️', createdAt: '2024-05-18T14:12:00Z' }] },
		{ id: 'm-106', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'I keep rereading that last message.', service: 'iMessage', sentAt: '2024-05-19T09:14:00Z', hasAttachments: false, attachments: [], attachmentIds: [], reactions: [{ id: 'r-3', messageId: 'm-106', actor: 'You', emoji: '🥹', createdAt: '2024-05-19T09:15:00Z' }] },
		{ id: 'm-107', chatId: 'chat-alice', sender: null, isFromMe: true, text: 'Me too. Even the edited version.', service: 'iMessage', sentAt: '2024-05-19T09:16:00Z', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm-108', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'For the record, the edit was only punctuation.', service: 'iMessage', sentAt: '2024-05-19T09:17:00Z', replyToMessageId: 'm-105', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm-109', chatId: 'chat-alice', sender: null, isFromMe: true, text: 'Dinner tonight? I will respect the basil ranking.', service: 'iMessage', sentAt: '2024-05-19T09:20:00Z', hasAttachments: false, attachments: [], attachmentIds: [], reactions: [{ id: 'r-4', messageId: 'm-109', actor: 'Alice Rivera', emoji: '👍', createdAt: '2024-05-19T09:21:00Z' }] },
		{ id: 'm-110', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'Plant market tomorrow morning?', service: 'iMessage', sentAt: '2024-05-20T16:02:00Z', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm-111', chatId: 'chat-alice', sender: null, isFromMe: true, text: 'Yes. I want mint for the window box.', service: 'iMessage', sentAt: '2024-05-20T16:05:00Z', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm-112', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'Only if it gets its own pot. Mint has no boundaries.', service: 'iMessage', sentAt: '2024-05-20T16:06:00Z', replyToMessageId: 'm-111', hasAttachments: false, attachments: [], attachmentIds: [], reactions: [{ id: 'r-5', messageId: 'm-112', actor: 'You', emoji: '😂', createdAt: '2024-05-20T16:07:00Z' }] },
		{ id: 'm-113', chatId: 'chat-alice', sender: null, isFromMe: true, text: 'You can supervise the pot and label it accordingly.', service: 'SMS', sentAt: '2024-05-20T16:09:00Z', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm-114', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'Accepted. “Containment mint.”', service: 'SMS', sentAt: '2024-05-20T16:10:00Z', hasAttachments: false, attachments: [], attachmentIds: [], reactions: [{ id: 'r-6', messageId: 'm-114', actor: 'You', emoji: '❤️', createdAt: '2024-05-20T16:11:00Z' }] },
		{ id: 'm-115', chatId: 'chat-alice', sender: null, isFromMe: true, text: 'How did the first basil harvest end up?', service: 'iMessage', sentAt: '2024-05-21T18:31:00Z', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm-116', chatId: 'chat-alice', sender: 'Alice Rivera', isFromMe: false, text: 'Tiny batch of pesto. Exactly enough for two people.', service: 'iMessage', sentAt: '2024-05-21T18:34:00Z', replyToMessageId: 'm-104', hasAttachments: false, attachments: [], attachmentIds: [], reactions: [{ id: 'r-7', messageId: 'm-116', actor: 'You', emoji: '✨', createdAt: '2024-05-21T18:35:00Z' }] },
		{ id: 'm-117', chatId: 'chat-alice', sender: null, isFromMe: true, text: 'Perfect. I will bring pasta and leave the vegetable taxonomy at home.', service: 'iMessage', sentAt: '2024-05-21T18:36:00Z', hasAttachments: false, attachments: [], attachmentIds: [], reactions: [{ id: 'r-8', messageId: 'm-117', actor: 'Alice Rivera', emoji: '❤️', createdAt: '2024-05-21T18:37:00Z' }] }
	]
}

const markup = `<z-chat-transcript class="archive" context-window="4">
	<z-chat-ai-dock class="assistant" slot="assistant"></z-chat-ai-dock>
</z-chat-transcript>`

const styles = `
	.archive-example { height: 100%; overflow: hidden; background: var(--background); }
	.archive { height: 100%; }
`

const wiring = `
	const transcript = document.querySelector('.archive')
	const assistant = document.querySelector('.assistant')
	transcript.chat = archivedChat
`

const build = (): ExampleInstanceT => {
	const root = document.createElement('div')
	root.className = 'archive-example exampleRoot'
	root.innerHTML = `<style>${styles}</style>${markup}`
	const transcript = root.querySelector('.archive') as HTMLElement & { chat: ChatTranscriptT }
	const assistant = root.querySelector('.assistant') as HTMLElement & { messages: Array<{ id: string; role: 'user' | 'assistant'; content: string }> }
	transcript.chat = archivedChat
	assistant.messages = [
		{ id: 'ai-1', role: 'user', content: 'Has Alice ever said what her favorite vegetable is?' },
		{ id: 'ai-2', role: 'assistant', content: 'Yes. On May 17, Alice said basil wins by default after ruling out tomatoes as fruit.' }
	]
	assistant.addEventListener('ask', (event) => {
		const value = (event as CustomEvent<{ value: string }>).detail.value
		assistant.messages = [...assistant.messages, { id: crypto.randomUUID(), role: 'user', content: value }]
	})
	return { root }
}

export const chatThreadExample: ExampleEntryT = {
	slug: 'chat-thread', title: 'Archived conversation',
	tagline: 'A single timestamped transcript with precise context selection for AI questions.',
	description: '`z-chat-transcript` renders one archived conversation as rounded messages with day summaries, attachments, reactions, reply references, and copy actions. The always-visible AI dock begins with the visible message window and can expand its search when the question needs broader history.',
	kind: ExampleKind.page, tags: ['chat', 'archive', 'ai', 'selection'],
	elements: ['z-chat-transcript', 'z-chat-message', 'z-chat-ai-dock'],
	viewports: [ExampleViewport.desktop, ExampleViewport.mobile], stageHeight: '42rem', thumbnail: { width: 1100, height: 780 },
	snippets: [{ label: 'HTML', language: 'html', code: dedent(markup) }, { label: 'JS', language: 'js', code: dedent(wiring) }, { label: 'CSS', language: 'css', code: dedent(styles) }],
	build
}
