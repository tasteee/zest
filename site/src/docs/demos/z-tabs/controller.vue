<script setup lang="ts">
import '@tasteee/zest'
import { computed, ref } from 'vue'

type RangeT = 'day' | 'week' | 'month'

const TOTALS: Record<RangeT, string> = { day: '$1,920', week: '$12,480', month: '$48,310' }

const range = ref<RangeT>('week')
const total = computed(() => TOTALS[range.value])

const handleChange = (event: CustomEvent<{ value: string }>) => (range.value = event.detail.value as RangeT)
</script>

<template>
  <z-column gap="4" style="width: min(32rem, 100%)">
    <z-tabs :value="range" @change="handleChange">
      <z-tab value="day">Day</z-tab>
      <z-tab value="week">Week</z-tab>
      <z-tab value="month">Month</z-tab>
    </z-tabs>

    <!-- the content lives anywhere: here it's a sibling card, not a panel slot -->
    <z-card gap="1">
      <z-label>Revenue this {{ range }}</z-label>
      <z-heading size="sm">{{ total }}</z-heading>
    </z-card>
  </z-column>
</template>
