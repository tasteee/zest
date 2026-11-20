<script setup lang="ts">
import { toaster } from '@tasteee/zest'
import { ref } from 'vue'

const activePanel = ref('general')

const handleTabChange = (event: CustomEvent<{ value: string }>) => (activePanel.value = event.detail.value)
const saveSettings = () => toaster.show('Settings saved')
</script>

<template>
  <z-card gap="0" style="width: min(36rem, 100%); padding: 0">
    <z-tabs :value="activePanel" style="padding: 0.25rem 1.25rem 0" @change="handleTabChange">
      <z-tab value="general">General</z-tab>
      <z-tab value="notifications">Notifications</z-tab>
      <z-tab value="billing" is-disabled>Billing</z-tab>
    </z-tabs>

    <!-- the tabs are a controller here: panels live outside z-tabs and follow its value -->
    <section style="padding: 1.25rem" :hidden="activePanel !== 'general'">
      <z-column gap="4">
        <z-field label="Workspace name">
          <z-input value="Acme Inc."></z-input>
        </z-field>
        <z-field label="Workspace URL" description="Changing this breaks existing links.">
          <z-input value="acme"></z-input>
        </z-field>
      </z-column>
    </section>
  
    <section style="padding: 1.25rem" :hidden="activePanel !== 'notifications'">
      <z-column gap="3">
        <z-switch is-checked>Email me about mentions</z-switch>
        <z-switch is-checked>Weekly summary</z-switch>
        <z-switch>Product updates</z-switch>
      </z-column>
    </section>
  
    <z-row gap="2" aligns-x="end" style="padding: 0.875rem 1.25rem; border-top: 1px solid var(--border-default)">
      <z-button kind="plain">Cancel</z-button>
      <z-button tone="secondary" @click="saveSettings">Save changes</z-button>
    </z-row>
  </z-card>
</template>
