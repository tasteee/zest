<script setup lang="ts">
import '@tasteee/zest'

const CRUMBS = [
  { label: 'Projects', href: '#' },
  { label: 'Acme', href: '#' },
  { label: 'Design system' }
]
</script>

<template>
  <z-column gap="3" style="width: min(44rem, 100%)">
    <z-breadcrumbs :items="CRUMBS"></z-breadcrumbs>
    <z-row aligns-x="between" aligns-y="center" does-wrap gap="3">
      <z-column gap="1">
        <z-heading size="md" tag="h1">Design system</z-heading>
        <z-text size="sm" color="muted">14 files · updated 2 hours ago</z-text>
      </z-column>
      <z-row gap="2">
        <z-button kind="outline">Share</z-button>
        <z-button tone="secondary">New file</z-button>
      </z-row>
    </z-row>
    <z-line></z-line>
  </z-column>
</template>
