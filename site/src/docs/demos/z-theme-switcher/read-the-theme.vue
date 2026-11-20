<script setup lang="ts">
import { getTheme } from '@tasteee/zest'
import { ref } from 'vue'

const theme = ref(getTheme())

const handleChange = () => (theme.value = getTheme())
</script>

<template>
  <z-row gap="4" aligns-y="center" style="align-items: center">
    <z-theme-switcher @change="handleChange"></z-theme-switcher>
    <z-text color="muted">Painting {{ theme }}</z-text>
  </z-row>
</template>
