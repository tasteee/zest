<script setup lang="ts">
import '@tasteee/zest'

// for menus built from data, pass items instead of writing children
const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'modified', label: 'Last modified' },
  { value: 'size', label: 'Size' }
]
</script>

<template>
  <z-menu :items="SORT_OPTIONS">
    <z-button slot="trigger" kind="outline">Sort by</z-button>
  </z-menu>
</template>
