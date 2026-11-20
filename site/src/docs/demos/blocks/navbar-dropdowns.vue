<script setup lang="ts">
import '@tasteee/zest'

const MENU_ITEMS = [
  {
    value: 'products',
    label: 'Products',
    children: [
      { value: 'analytics', label: 'Analytics', description: 'Track the work that matters' },
      { value: 'automation', label: 'Automation', description: 'Make repeatable work disappear' },
      { value: 'insights', label: 'Insights', description: 'Answers without a spreadsheet' }
    ]
  },
  {
    value: 'resources',
    label: 'Resources',
    children: [
      { value: 'docs', label: 'Documentation', description: 'Guides and API reference' },
      { value: 'blog', label: 'Blog', description: 'Product news and write-ups' }
    ]
  },
  { value: 'pricing', label: 'Pricing', href: '#pricing' }
]
</script>

<template>
  <z-row aligns-x="between" aligns-y="center" gap="4" style="width: min(52rem, 100%); padding: 0.5rem 1rem; border: 1px solid var(--border-default); border-radius: var(--radius-lg)">
    <z-text weight="600">Acme</z-text>
    <z-nav-menu :items="MENU_ITEMS"></z-nav-menu>
    <z-button tone="secondary" size="sm">Get started</z-button>
  </z-row>
</template>
