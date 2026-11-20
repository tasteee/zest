<script lang="ts">
  import { toaster } from '@tasteee/zest'

  let isSending = $state(false)

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    isSending = true

    // stand-in for a real request
    setTimeout(() => {
      isSending = false
      toaster.show({ id: 'forgot', title: 'Check your email', description: 'The link expires in one hour.', tone: 'success' })
    }, 800)
  }
</script>

<z-card gap="5" style="width: min(24rem, 100%); padding: 1.75rem">
  <z-column gap="1">
    <z-heading size="xs" tag="h2">Forgot your password?</z-heading>
    <z-text size="sm" color="muted">Enter your email and we’ll send a reset link.</z-text>
  </z-column>
  <form onsubmit={handleSubmit}>
    <z-column gap="4">
      <z-input label="Email" type="email" name="email" placeholder="you@example.com" autocomplete="email"></z-input>
      <z-button type="submit" tone="secondary" is-full-width isLoading={isSending}>Send reset link</z-button>
    </z-column>
  </form>
  <z-text size="sm" color="muted" style="text-align: center"><z-link href="#">Back to sign in</z-link></z-text>
</z-card>
