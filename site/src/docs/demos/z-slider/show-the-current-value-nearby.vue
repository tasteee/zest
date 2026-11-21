<script setup lang="ts">
import { ref } from 'vue'
import '@tasteee/zest'

const brightness = ref(64)
</script>

<template>
  <z-row gap="3" aligns-y="center">
    <z-slider
      label="Brightness"
      min="0"
      max="100"
      :value="brightness"
      @input="brightness = $event.detail.value"
    ></z-slider>
    <z-text style="width: 3rem">{{ brightness }}%</z-text>
  </z-row>
</template>
