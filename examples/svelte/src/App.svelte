<script lang="ts">
	/*
	 * The validated-form flow, in Svelte 5.
	 *
	 * Svelte sets a binding as a DOM property when the element has one
	 * (`options`) and as an attribute otherwise (`is-required`). `onchange`
	 * is a plain DOM listener, so it receives zest's `change` custom event.
	 */

	const plans = [
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'team', label: 'Team', isDisabled: true }
	]

	let submitted = $state<Record<string, FormDataEntryValue> | null>(null)
	let lastChange = $state('')

	const onSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		submitted = Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement))
	}

	const onEmailChange = (event: Event) => {
		lastChange = (event as CustomEvent<{ value: string }>).detail.value
	}
</script>

<main style="max-width: 28rem; margin: 2rem auto; display: grid; gap: 1rem">
	<h1>Create an account</h1>
	<form style="display: grid; gap: 1rem" onsubmit={onSubmit}>
		<z-field label="Email">
			<z-input name="email" type="email" is-required onchange={onEmailChange}></z-input>
		</z-field>
		<z-field label="Plan">
			<z-select name="plan" is-required placeholder="Choose a plan" options={plans}></z-select>
		</z-field>
		<z-checkbox name="terms" value="accepted" is-required>I agree to the terms</z-checkbox>
		<z-button type="submit" accent="dom">Create account</z-button>
	</form>
	<p data-testid="last-change">Last email change: {lastChange || '—'}</p>
	<pre data-testid="submitted">{submitted ? JSON.stringify(submitted, null, 2) : 'Not submitted yet'}</pre>
</main>
