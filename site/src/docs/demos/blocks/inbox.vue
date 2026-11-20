<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

type MessageT = { id: string; from: string; subject: string; body: string }

const MESSAGES: MessageT[] = [
  { id: 'a', from: 'Grace Hopper', subject: 'Review the release notes', body: 'Can you read through them before Friday? Mostly wording changes.' },
  { id: 'b', from: 'Alan Turing', subject: 'Standup moved', body: 'We’re meeting at 10:30 instead. Same room.' },
  { id: 'c', from: 'Katherine Johnson', subject: 'New numbers', body: 'The updated figures are in the shared sheet.' }
]

const openMessage = ref(MESSAGES[0])
</script>

<template>
  <z-row gap="0" style="width: min(48rem, 100%); height: 20rem; border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden">
    <z-list is-plain aria-label="Messages" style="width: 16rem; flex: none; border-right: 1px solid var(--border-default); overflow: auto">
      <z-list-row v-for="message in MESSAGES" :key="message.id" @click="openMessage = message">
        <div>
          <z-text weight="600">{{ message.from }}</z-text>
          <z-text size="sm" color="muted" style="display: block">{{ message.subject }}</z-text>
        </div>
      </z-list-row>
    </z-list>
    <z-column gap="3" padding="5" style="flex: 1; min-width: 0">
      <z-heading size="xs" tag="h2">{{ openMessage.subject }}</z-heading>
      <z-text size="sm" color="muted">From {{ openMessage.from }}</z-text>
      <z-text size="sm">{{ openMessage.body }}</z-text>
    </z-column>
  </z-row>
</template>
