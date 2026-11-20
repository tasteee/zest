import { createSignal } from 'solid-js'
import '@tasteee/zest'

const CODE_LENGTH = 6

export const Example = () => {
  const [code, setCode] = createSignal('')

  const handleChange = (event: CustomEvent<{ value: string }>) => setCode(String(event.detail.value ?? ''))

  // the button unlocks only once every digit is in
  const isCodeIncomplete = () => code().length < CODE_LENGTH

  return (
    <z-card gap="5" style="width: min(24rem, 100%); padding: 1.75rem; text-align: center">
      <z-column gap="1">
        <z-heading size="xs" tag="h2">Check your email</z-heading>
        <z-text size="sm" color="muted">We sent a 6-digit code to ada@example.com.</z-text>
      </z-column>
      <z-row aligns-x="center">
        <z-input-otp prop:length={CODE_LENGTH} is-numeric="" label="Verification code" onChange={handleChange} />
      </z-row>
      <z-button tone="secondary" is-full-width="" prop:isDisabled={isCodeIncomplete()}>Verify</z-button>
      <z-text size="sm" color="muted">
        Didn’t get it? <z-link href="#">Resend code</z-link>
      </z-text>
    </z-card>
  )
}
