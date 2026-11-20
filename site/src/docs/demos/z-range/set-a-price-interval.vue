<script setup lang="ts">
import '@tasteee/zest'

const PRICE_RANGE = [200, 750]
const HANDLES = [{ label: 'Minimum price' }, { label: 'Maximum price', tone: 'tertiary' }]
</script>

<template>
  <z-range
    :value="PRICE_RANGE"
    :handles="HANDLES"
    min="0"
    max="1000"
    label="Price"
    does-show-value
    value-prefix="$"
  ></z-range>
</template>
