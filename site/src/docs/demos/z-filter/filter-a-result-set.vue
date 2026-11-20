<script setup lang="ts">
import '@tasteee/zest'

const TOPICS = [
  { value: 'all', label: 'All' },
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'research', label: 'Research' }
]
</script>

<template>
  <z-filter label="Topic" :options="TOPICS"></z-filter>
</template>
