import { useState, type FormEvent } from 'react'
import { toaster } from '@tasteee/zest'

export const Example = () => {
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSigningIn(true)

    // stand-in for a real request
    setTimeout(() => {
      setIsSigningIn(false)
      toaster.show({ id: 'sign-in', title: 'Signed in', description: 'Welcome back, Ada.', tone: 'success' })
    }, 900)
  }

  return (
    <z-card gap="5" style={{ width: 'min(24rem, 100%)', padding: '1.75rem' }}>
      <z-column gap="1">
        <z-heading size="xs" tag="h2">Welcome back</z-heading>
        <z-text size="sm" color="muted">Sign in to continue to your workspace.</z-text>
      </z-column>

      <form onSubmit={handleSubmit}>
        <z-column gap="4">
          <z-field label="Email">
            <z-input type="email" name="email" placeholder="you@example.com" autocomplete="email" />
          </z-field>
          <z-field label="Password">
            <z-input type="password" name="password" placeholder="••••••••" autocomplete="current-password" />
          </z-field>
          <z-row alignsX="between" alignsY="center">
            <z-checkbox name="remember" isChecked>Remember me</z-checkbox>
            <z-link href="#" size="sm">Forgot password?</z-link>
          </z-row>
          <z-button type="submit" tone="secondary" isFullWidth isLoading={isSigningIn}>Sign in</z-button>
        </z-column>
      </form>

      <z-separator label="or" />
      <z-button kind="outline" isFullWidth>Continue with GitHub</z-button>
    </z-card>
  )
}
