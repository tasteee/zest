import { useState } from 'react'
import '@tasteee/zest'

type MessageT = { id: string; from: string; subject: string; body: string }

const MESSAGES: MessageT[] = [
  { id: 'a', from: 'Grace Hopper', subject: 'Review the release notes', body: 'Can you read through them before Friday? Mostly wording changes.' },
  { id: 'b', from: 'Alan Turing', subject: 'Standup moved', body: 'We’re meeting at 10:30 instead. Same room.' },
  { id: 'c', from: 'Katherine Johnson', subject: 'New numbers', body: 'The updated figures are in the shared sheet.' }
]

const FRAME_STYLE = {
  width: 'min(48rem, 100%)',
  height: '20rem',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden'
}

const LIST_STYLE = {
  width: '16rem',
  flex: 'none',
  borderRight: '1px solid var(--border-default)',
  overflow: 'auto'
}

type MessageRowPropsT = { message: MessageT; onOpen: (message: MessageT) => void }

const MessageRow = (props: MessageRowPropsT) => {
  const openMessage = () => props.onOpen(props.message)

  return (
    <z-list-row onClick={openMessage}>
      <div>
        <z-text weight={600}>{props.message.from}</z-text>
        <z-text size="sm" color="muted" style={{ display: 'block' }}>{props.message.subject}</z-text>
      </div>
    </z-list-row>
  )
}

export const Example = () => {
  const [openMessage, setOpenMessage] = useState(MESSAGES[0])

  const messageRows = MESSAGES.map((message) => (
    <MessageRow key={message.id} message={message} onOpen={setOpenMessage} />
  ))

  const fromText = `From ${openMessage.from}`

  return (
    <z-row gap="0" style={FRAME_STYLE}>
      <z-list isPlain aria-label="Messages" style={LIST_STYLE}>
        {messageRows}
      </z-list>
      <z-column gap="3" padding="5" style={{ flex: '1', minWidth: '0' }}>
        <z-heading size="xs" tag="h2">{openMessage.subject}</z-heading>
        <z-text size="sm" color="muted">{fromText}</z-text>
        <z-text size="sm">{openMessage.body}</z-text>
      </z-column>
    </z-row>
  )
}
