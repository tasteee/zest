<script lang="ts">
  import '@tasteee/zest'

  const MISMATCH_MESSAGE = 'Passwords don’t match.'

  let password = $state('')
  let isMismatched = $state(false)

  const handlePasswordInput = (event: CustomEvent<{ value: string }>) => (password = event.detail.value)

  // show the mismatch after the second field is filled, not while typing
  const handleConfirmChange = (event: CustomEvent<{ value: string }>) => {
    isMismatched = event.detail.value !== password
  }

  const preventSubmit = (event: SubmitEvent) => event.preventDefault()
</script>

<z-card gap="5" style="width: min(24rem, 100%); padding: 1.75rem">
  <z-column gap="1">
    <z-heading size="xs" tag="h2">Choose a new password</z-heading>
    <z-text size="sm" color="muted">Use at least 8 characters.</z-text>
  </z-column>
  <form onsubmit={preventSubmit}>
    <z-column gap="4">
      <z-input
        label="New password"
        type="password"
        name="password"
        autocomplete="new-password"
        oninput={handlePasswordInput}
      ></z-input>
      <z-input
        label="Confirm password"
        type="password"
        name="confirm"
        autocomplete="new-password"
        isInvalid={isMismatched}
        error={isMismatched ? MISMATCH_MESSAGE : ''}
        onchange={handleConfirmChange}
      ></z-input>
      <z-button type="submit" tone="secondary" is-full-width>Update password</z-button>
    </z-column>
  </form>
</z-card>
