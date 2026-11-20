<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const isEditorOpen = ref(false)

// the element reports its own closes (Esc, backdrop) through `close`
const openEditor = () => (isEditorOpen.value = true)
const closeEditor = () => (isEditorOpen.value = false)
</script>

<template>
  <z-column gap="3" aligns-x="center">
    <z-dialog
      heading="Edit profile"
      description="Opened by the application, not a slotted trigger."
      :isOpen="isEditorOpen"
      @open="openEditor"
      @close="closeEditor"
    >
      <z-field label="Display name">
        <z-input value="Ada Lovelace"></z-input>
      </z-field>
      <z-row slot="footer" gap="2" aligns-x="end">
        <z-button kind="plain" @click="closeEditor">Cancel</z-button>
        <z-button tone="secondary" @click="closeEditor">Save</z-button>
      </z-row>
    </z-dialog>

    <z-button kind="outline" @click="openEditor">Open from the app</z-button>
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">is-open: {{ isEditorOpen }}</z-text>
  </z-column>
</template>
