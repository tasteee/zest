import { createSignal } from 'solid-js'
import '@tasteee/zest'

const MISMATCH_MESSAGE = 'Passwords don’t match.'

const preventSubmit = (event: SubmitEvent) => event.preventDefault()

export const Example = () => {
  const [password, setPassword] = createSignal('')
  const [isMismatched, setIsMismatched] = createSignal(false)

  const handlePasswordInput = (event: CustomEvent<{ value: string }>) => setPassword(event.detail.value)

  // show the mismatch after the second field is filled, not while typing
  const handleConfirmChange = (event: CustomEvent<{ value: string }>) => {
    setIsMismatched(event.detail.value !== password())
  }

  const confirmError = () => (isMismatched() ? MISMATCH_MESSAGE : '')

  return (
    <z-card gap="5" style="width: min(24rem, 100%); padding: 1.75rem">
      <z-column gap="1">
        <z-heading size="xs" tag="h2">Choose a new password</z-heading>
        <z-text size="sm" color="muted">Use at least 8 characters.</z-text>
      </z-column>
      <form onSubmit={preventSubmit}>
        <z-column gap="4">
          <z-input
            label="New password"
            type="password"
            name="password"
            autocomplete="new-password"
            onInput={handlePasswordInput}
          />
          <z-input
            label="Confirm password"
            type="password"
            name="confirm"
            autocomplete="new-password"
            prop:isInvalid={isMismatched()}
            prop:error={confirmError()}
            onChange={handleConfirmChange}
          />
          <z-button type="submit" tone="secondary" is-full-width="">Update password</z-button>
        </z-column>
      </form>
    </z-card>
  )
}
