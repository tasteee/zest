import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'

/*
 * The validated-form flow, in React 19, server-rendered and hydrated.
 *
 * On a client render React 19 sets a prop on a custom element as a property
 * when the element has one and as an attribute otherwise, and attaches
 * `on<event>` function props as listeners. On *hydration* it does neither:
 * react-dom's custom-element hydration path only diffs the attributes the
 * server wrote, so an `options` array prop and an `onchange` listener are
 * silently dropped (see `diffHydratedProperties` in react-dom-client).
 *
 * Refs are attached during hydration, so rich properties and custom-event
 * listeners go through ref callbacks here. React 19 ref cleanups make that
 * tidy. Everything the server can express — `name`, `type`, `is-required`,
 * `placeholder` — stays as plain attributes.
 */

type OptionT = { value: string; label: string; isDisabled?: boolean }
type SelectElementT = HTMLElement & { options?: OptionT[] }
type ChangeEventT = CustomEvent<{ value: string }>

const plans: OptionT[] = [
	{ value: 'free', label: 'Free' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'team', label: 'Team', isDisabled: true }
]

export function App() {
	const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null)
	const [lastChange, setLastChange] = useState('')

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setSubmitted(Object.fromEntries(new FormData(event.currentTarget)))
	}

	const bindOptions = useCallback((element: SelectElementT | null) => {
		if (element) element.options = plans
	}, [])

	const listenForChange = useCallback((element: HTMLElement | null) => {
		if (!element) return
		const onChange = (event: Event) => setLastChange((event as ChangeEventT).detail.value)
		element.addEventListener('change', onChange)
		return () => element.removeEventListener('change', onChange)
	}, [])

	return (
		<main style={{ maxWidth: '28rem', margin: '2rem auto', display: 'grid', gap: '1rem' }}>
			<h1>Create an account</h1>
			<form onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }}>
				<z-field label="Email">
					<z-input ref={listenForChange} name="email" type="email" is-required />
				</z-field>
				<z-field label="Plan">
					<z-select ref={bindOptions} name="plan" is-required placeholder="Choose a plan" />
				</z-field>
				<z-checkbox name="terms" value="accepted" is-required>
					I agree to the terms
				</z-checkbox>
				<z-button type="submit" accent="dom">Create account</z-button>
			</form>
			<p data-testid="last-change">Last email change: {lastChange || '—'}</p>
			<pre data-testid="submitted">{submitted ? JSON.stringify(submitted, null, 2) : 'Not submitted yet'}</pre>
		</main>
	)
}
