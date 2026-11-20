<script setup lang="ts">
import '@tasteee/zest'

const DEMO_CODE = `const resolveToneClass = (props: any): string => {
  if (props.tone === 'secondary') return 'is-secondary'
  if (props.tone === 'tertiary') return 'is-tertiary'
  return 'is-primary'
}`
</script>

<template>
  <z-code-block filename="overlay.tsx" language="tsx" has-line-numbers :code="DEMO_CODE"></z-code-block>
</template>
