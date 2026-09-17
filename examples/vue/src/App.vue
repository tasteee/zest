<script setup lang="ts">
import { ref } from 'vue'

/*
 * The validated-form flow, in Vue 3.
 *
 * Vue sets a binding as a DOM property when the element has one and as an
 * attribute otherwise; `.prop` makes the rich `options` binding explicit.
 * `@change` is zest's `change` custom event, with `detail` on the event.
 */

const plans = [
	{ value: 'free', label: 'Free' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'team', label: 'Team', isDisabled: true }
]

const submitted = ref<Record<string, FormDataEntryValue> | null>(null)
const lastChange = ref('')

const onSubmit = (event: Event) => {
	event.preventDefault()
	submitted.value = Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement))
}

const onEmailChange = (event: Event) => {
	lastChange.value = (event as CustomEvent<{ value: string }>).detail.value
}
</script>

<template>
	<main style="max-width: 28rem; margin: 2rem auto; display: grid; gap: 1rem">
		<h1>Create an account</h1>
		<form style="display: grid; gap: 1rem" @submit="onSubmit">
			<z-field label="Email">
				<z-input name="email" type="email" is-required @change="onEmailChange"></z-input>
			</z-field>
			<z-field label="Plan">
				<z-select name="plan" is-required placeholder="Choose a plan" :options.prop="plans"></z-select>
			</z-field>
			<z-checkbox name="terms" value="accepted" is-required>I agree to the terms</z-checkbox>
			<z-button type="submit" accent="dom">Create account</z-button>
		</form>
		<p data-testid="last-change">Last email change: {{ lastChange || '—' }}</p>
		<pre data-testid="submitted">{{ submitted ? JSON.stringify(submitted, null, 2) : 'Not submitted yet' }}</pre>
	</main>
</template>
