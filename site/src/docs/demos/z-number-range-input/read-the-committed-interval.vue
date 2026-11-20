<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

type GuestRangeEventT = CustomEvent<{ value: [number | null, number | null] }>

const result = ref('No range yet')

const handleChange = (event: GuestRangeEventT) => {
  const lower = event.detail.value[0] ?? 'any'
  const upper = event.detail.value[1] ?? 'any'
  result.value = `${lower} to ${upper} guests`
}
</script>

<template>
  <z-column gap="4">
    <z-field label="Guests" style="width: min(22rem, 100%)">
      <z-number-range-input
        min="1"
        max="20"
        lower-placeholder="Min"
        upper-placeholder="Max"
        @change="handleChange"
      ></z-number-range-input>
    </z-field>
    <z-text>{{ result }}</z-text>
  </z-column>
</template>
