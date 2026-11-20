<script setup lang="ts">
import '@tasteee/zest'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'svelte', label: 'Svelte' }
]
</script>

<template>
  <z-column gap="4">
    <z-field label="Framework">
      <z-select placeholder="Choose one" :options="FRAMEWORKS"></z-select>
    </z-field>
    <z-field label="Project brief" description="A sentence or two is enough.">
      <z-textarea rows="3" placeholder="What are you making?"></z-textarea>
    </z-field>
  </z-column>
</template>
