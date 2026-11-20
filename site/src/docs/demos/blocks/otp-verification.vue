<script setup lang="ts">
import '@tasteee/zest'
import { computed, ref } from 'vue'

const CODE_LENGTH = 6

const code = ref('')

// the button unlocks only once every digit is in
const isCodeIncomplete = computed(() => code.value.length < CODE_LENGTH)

const handleChange = (event: CustomEvent<{ value: string }>) => (code.value = String(event.detail.value ?? ''))
</script>

<template>
  <z-card gap="5" style="width: min(24rem, 100%); padding: 1.75rem; text-align: center">
    <z-column gap="1">
      <z-heading size="xs" tag="h2">Check your email</z-heading>
      <z-text size="sm" color="muted">We sent a 6-digit code to ada@example.com.</z-text>
    </z-column>
    <z-row aligns-x="center">
      <z-input-otp :length="CODE_LENGTH" is-numeric label="Verification code" @change="handleChange"></z-input-otp>
    </z-row>
    <z-button tone="secondary" is-full-width :isDisabled="isCodeIncomplete">Verify</z-button>
    <z-text size="sm" color="muted">Didn’t get it? <z-link href="#">Resend code</z-link></z-text>
  </z-card>
</template>
