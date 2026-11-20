<script setup lang="ts">
import '@tasteee/zest'

const START_VALUE = [10, 60]

// the upper handle can only travel between 40 and 80
const HANDLES = [{}, { min: 40, max: 80, tone: 'tertiary' }]
</script>

<template>
  <z-range :value="START_VALUE" :handles="HANDLES" min="0" max="100" style="width: min(24rem, 100%)"></z-range>
</template>
