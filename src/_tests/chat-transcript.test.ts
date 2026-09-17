import { describe, expect, it, vi } from 'vitest'
import '../index'
import type { ChatTranscriptT } from '../components/z-chat-types'
import { getShadowRoot, waitForRender } from './test-helpers'

const chat: ChatTranscriptT = {
	id: 'chat-1', displayName: 'Archive', isGroup: false, participants: ['You', 'Alice'],
	daySummaries: { '2024-01-01': 'The conversation begins.', '2024-01-02': 'Alice replies to the first message.' },
	messages: [
		{ id: 'm1', chatId: 'chat-1', sender: 'Alice', isFromMe: false, text: 'First', service: 'iMessage', sentAt: '2024-01-01T10:00:00Z', hasAttachments: false, attachments: [], attachmentIds: [], reactions: [
			{ id: 'r1', messageId: 'm1', actor: 'You', emoji: '❤️', createdAt: '2024-01-01T10:01:00Z' },
			{ id: 'r2', messageId: 'm1', actor: 'Alice', emoji: '❤️', createdAt: '2024-01-01T10:02:00Z' }
		] },
		{ id: 'm2', chatId: 'chat-1', sender: null, isFromMe: true, text: 'Second', service: 'iMessage', sentAt: '2024-01-01T10:01:00Z', hasAttachments: false, attachments: [], attachmentIds: [] },
		{ id: 'm3', chatId: 'chat-1', sender: 'Alice', isFromMe: false, text: 'Third', service: 'iMessage', sentAt: '2024-01-02T10:00:00Z', replyToMessageId: 'm1', hasAttachments: false, attachments: [], attachmentIds: [] }
	]
}

const mount = async () => {
	const element = document.createElement('z-chat-transcript') as HTMLElement & { chat: ChatTranscriptT }
	element.chat = chat
	document.body.append(element)
	await waitForRender()
	return element
}

describe('z-chat-transcript', () => {
	it('derives date separators and renders every archived message', async () => {
		const root = getShadowRoot(await mount())
		expect(root.querySelectorAll('.day')).toHaveLength(2)
		expect(root.querySelectorAll('.day-summary')).toHaveLength(2)
		expect(root.querySelectorAll('z-chat-message')).toHaveLength(3)
		expect(root.querySelector('.anchor, .ask-all')).toBeNull()
		await waitForRender()
		const messageRoot = getShadowRoot(root.querySelector('z-chat-message') as HTMLElement)
		expect(messageRoot.querySelector('.initial, .sender')).toBeNull()
		expect(messageRoot.querySelector('.bubble > .meta')).not.toBeNull()
		const reaction = messageRoot.querySelector('.bubble > .footer > .reactions .reaction') as HTMLElement
		expect(reaction.dataset.tooltip).toBe('You, Alice')
		expect(reaction.getAttribute('title')).toBeNull()
	})

	it('uses the visible message window as the starting AI context', async () => {
		const element = await mount()
		const listener = vi.fn()
		element.addEventListener('contextrequest', listener)
		element.dispatchEvent(new CustomEvent('ask', { bubbles: true, composed: true, detail: { value: 'What connects these?' } }))
		expect(listener.mock.calls[0][0].detail).toEqual({
			kind: 'visible',
			chatId: 'chat-1',
			query: 'What connects these?',
			messageIds: ['m1', 'm2', 'm3']
		})
	})

	it('does not expose transcript message selection', async () => {
		const root = getShadowRoot(await mount())
		expect(root.querySelector('z-chat-message[selectable], z-chat-message[selected]')).toBeNull()
		expect(root.querySelector('.selection-bar')).toBeNull()
	})

	it('keeps reply navigation isolated from message interaction', async () => {
		const root = getShadowRoot(await mount())
		const replyMessage = root.querySelectorAll('z-chat-message')[2] as HTMLElement
		await waitForRender()
		const jump = vi.fn()
		const select = vi.fn()
		replyMessage.addEventListener('replyjump', jump)
		replyMessage.addEventListener('messageselect', select)
		;(getShadowRoot(replyMessage).querySelector('.reply-link') as HTMLButtonElement).click()
		await waitForRender()
		expect(jump).toHaveBeenCalledOnce()
		expect(select).not.toHaveBeenCalled()
		expect(root.activeElement).toBe(root.querySelector('z-chat-message'))
	})

	it('offers copy text and copy link actions for a message bubble', async () => {
		const root = getShadowRoot(await mount())
		const message = root.querySelector('z-chat-message') as HTMLElement
		await waitForRender()
		const messageRoot = getShadowRoot(message)
		const copyText = messageRoot.querySelector('.copy-text') as HTMLButtonElement
		const copyLink = messageRoot.querySelector('.copy-link') as HTMLButtonElement
		expect(copyText.getAttribute('aria-label')).toBe('Copy text')
		expect(copyLink.getAttribute('aria-label')).toBe('Copy link')
		expect(messageRoot.querySelector('z-context-menu')).toBeNull()

		const writeText = vi.fn().mockResolvedValue(undefined)
		Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
		copyText.click()
		await waitForRender()
		expect(writeText).toHaveBeenCalledWith('First')
		copyLink.click()
		await waitForRender()
		expect(writeText.mock.calls[1][0]).toContain('message=m1')
	})
})

describe('z-chat-ai-dock', () => {
	it('keeps the composer visible and emits submitted questions', async () => {
		const dock = document.createElement('z-chat-ai-dock') as HTMLElement
		document.body.append(dock)
		await waitForRender()
		const root = getShadowRoot(dock)
		const textarea = root.querySelector('textarea') as HTMLTextAreaElement
		textarea.value = 'What happened that day?'
		textarea.dispatchEvent(new Event('input', { bubbles: true }))
		await waitForRender()

		const listener = vi.fn()
		dock.addEventListener('ask', listener)
		;(root.querySelector('.send') as HTMLButtonElement).click()
		expect(listener.mock.calls[0][0].detail).toEqual({ value: 'What happened that day?' })
	})

	it('opens the ongoing AI discussion above the composer', async () => {
		const dock = document.createElement('z-chat-ai-dock') as HTMLElement
		document.body.append(dock)
		await waitForRender()
		const root = getShadowRoot(dock)
		;(root.querySelector('.discussion-toggle') as HTMLButtonElement).click()
		await waitForRender()
		expect((root.querySelector('.discussion') as HTMLElement).hidden).toBe(false)
	})
})
