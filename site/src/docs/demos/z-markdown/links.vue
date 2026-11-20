<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const CONTENT = 'Read the [docs](https://example.com/docs) or jump to [usage](#usage).'

const lastLink = ref('Click a link.')

const handleLinkClick = (event: CustomEvent<{ href: string }>) => (lastLink.value = `linkclick: ${event.detail.href}`)
</script>

<template>
  <z-markdown :content="CONTENT" @linkclick="handleLinkClick"></z-markdown>
  <z-text size="sm" color="muted">{{ lastLink }}</z-text>
</template>
