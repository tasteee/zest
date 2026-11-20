<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

type DatesEventT = CustomEvent<{ value: string | null; start: string | null; end: string | null }>

const result = ref('No dates yet')

const handleChange = (event: DatesEventT) => {
  const start = event.detail.start ?? 'any day'
  const end = event.detail.end ?? 'any day'
  result.value = `Leaving ${start}, returning ${end}`
}
</script>

<template>
  <z-column gap="4">
    <z-field label="Trip" style="width: min(24rem, 100%)">
      <z-date-input
        is-range
        has-calendar
        start-placeholder="Leave"
        end-placeholder="Return"
        @change="handleChange"
      ></z-date-input>
    </z-field>
    <z-text>{{ result }}</z-text>
  </z-column>
</template>
