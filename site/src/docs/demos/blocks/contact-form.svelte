<script lang="ts">
  import { toaster } from '@tasteee/zest'

  const TOPICS = [
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Support' },
    { value: 'other', label: 'Something else' }
  ]

  let isSending = $state(false)

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    isSending = true

    // stand-in for a real request
    setTimeout(() => {
      isSending = false
      toaster.show({ id: 'contact', title: 'Message sent', description: 'We’ll be in touch soon.', tone: 'success' })
    }, 800)
  }
</script>

<z-card gap="5" style="width: min(30rem, 100%); padding: 1.75rem">
  <z-column gap="1">
    <z-heading size="xs" tag="h2">Contact us</z-heading>
    <z-text size="sm" color="muted">We reply within one business day.</z-text>
  </z-column>
  <form onsubmit={handleSubmit}>
    <z-column gap="4">
      <z-input label="Name" name="name" autocomplete="name"></z-input>
      <z-input label="Email" type="email" name="email" autocomplete="email"></z-input>
      <z-select label="Topic" placeholder="Choose a topic" options={TOPICS}></z-select>
      <z-textarea label="Message" name="message" rows="4"></z-textarea>
      <z-button type="submit" tone="secondary" is-full-width isLoading={isSending}>Send message</z-button>
    </z-column>
  </form>
</z-card>
