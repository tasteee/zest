<script setup lang="ts">
import '@tasteee/zest'

const ITEMS = [
  { value: 'home', label: 'Home', href: '/' },
  {
    value: 'products',
    label: 'Products',
    children: [
      { value: 'analytics', label: 'Analytics', description: 'Track the work that matters' },
      { value: 'automation', label: 'Automation', description: 'Make repeatable work disappear' }
    ]
  },
  { value: 'pricing', label: 'Pricing', href: '#pricing' }
]
</script>

<template>
  <z-nav-menu value="products" :items="ITEMS"></z-nav-menu>
</template>
