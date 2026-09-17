export type ChatDateT = Date | string | null

export type ChatReactionT = {
	id: string
	messageId: string
	actor: string
	emoji: string
	createdAt: ChatDateT
}

export type ChatAttachmentT = {
	id: string
	filename: string
	transferName: string
	mimeType: string
	size: number
	createdAt: ChatDateT
	dataPath: string
	thumbnailPath?: string | null
	previewPath?: string | null
	chatId?: string
	messageId?: string
	backupId?: string
	path?: string
}

export type ChatMessageT = {
	id: string
	guid?: string | null
	chatId: string
	sender: string | null
	isFromMe: boolean
	text: string | null
	subject?: string | null
	service: 'iMessage' | 'SMS' | 'MMS' | 'Unknown'
	sentAt: ChatDateT
	deliveredAt?: ChatDateT
	readAt?: ChatDateT
	isEdited?: boolean
	isDeleted?: boolean
	isSystem?: boolean
	isTapback?: boolean
	replyToMessageId?: string | null
	threadId?: string | null
	hasAttachments: boolean
	attachments: ChatAttachmentT[]
	attachmentIds: string[]
	reactions?: ChatReactionT[]
}

export type ChatTranscriptT = {
	id: string
	displayName: string
	isGroup: boolean
	participants: string[]
	messageCount?: number
	messageDates?: string[]
	lastMessageAt?: ChatDateT
	daySummaries?: Record<string, string>
	messages: ChatMessageT[]
}

export type ChatContextRequestT = {
	kind: 'visible'
	chatId: string
	messageIds: string[]
	query: string
}
