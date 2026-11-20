<script setup lang="ts">
import '@tasteee/zest'

const PRESETS = ['#BF40BF', '#F24A9B', '#5A67D8', '#10B981']
</script>

<template>
  <z-color-picker value="#BF40BF" :presets="PRESETS"></z-color-picker>
</template>
