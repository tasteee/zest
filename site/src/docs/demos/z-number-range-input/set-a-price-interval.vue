<script setup lang="ts">
import '@tasteee/zest'

const PRICE_RANGE = [20, 120]
</script>

<template>
  <z-field label="Price" style="width: min(22rem, 100%)">
    <z-number-range-input
      :value="PRICE_RANGE"
      min="0"
      max="500"
      step="5"
      has-stepper-buttons
      value-prefix="$"
    ></z-number-range-input>
  </z-field>
</template>
