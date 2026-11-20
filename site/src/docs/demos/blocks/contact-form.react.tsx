import { useState, type FormEvent } from 'react'
import { toaster } from '@tasteee/zest'

const TOPICS = [
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'other', label: 'Something else' }
]

export const Example = () => {
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSending(true)

    // stand-in for a real request
    setTimeout(() => {
      setIsSending(false)
      toaster.show({ id: 'contact', title: 'Message sent', description: 'We’ll be in touch soon.', tone: 'success' })
    }, 800)
  }

  return (
    <z-card gap="5" style={{ width: 'min(30rem, 100%)', padding: '1.75rem' }}>
      <z-column gap="1">
        <z-heading size="xs" tag="h2">Contact us</z-heading>
        <z-text size="sm" color="muted">We reply within one business day.</z-text>
      </z-column>
      <form onSubmit={handleSubmit}>
        <z-column gap="4">
          <z-input label="Name" name="name" autocomplete="name" />
          <z-input label="Email" type="email" name="email" autocomplete="email" />
          <z-select label="Topic" placeholder="Choose a topic" options={TOPICS} />
          <z-textarea label="Message" name="message" rows={4} />
          <z-button type="submit" tone="secondary" isFullWidth isLoading={isSending}>Send message</z-button>
        </z-column>
      </form>
    </z-card>
  )
}
