<script setup lang="ts">
import '@tasteee/zest'

const LINES = [
  { text: 'pnpm install', type: 'command' },
  { text: 'Resolving packages…', type: 'output', delay: 200 },
  { text: 'Done in 4.8s', type: 'output', delay: 1400 },
  { text: 'pnpm test', type: 'command', typeSpeed: 25, delay: 600 },
  { text: 'All tests passed', type: 'output', delay: 900 }
]
</script>

<template>
  <z-terminal shell="zsh" does-animate :lines="LINES"></z-terminal>
</template>
