<script setup lang="ts">
import '@tasteee/zest'

const ROLES = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Admin' }
]
</script>

<template>
  <z-dialog heading="Invite people" description="They’ll get an email with a link to join.">
    <z-button slot="trigger" tone="secondary">Invite</z-button>
    <z-column gap="4">
      <z-input label="Email addresses" placeholder="ada@example.com, grace@example.com"></z-input>
      <z-select label="Role" value="editor" :options="ROLES"></z-select>
    </z-column>
    <z-row slot="footer" gap="2" aligns-x="end">
      <z-button kind="plain">Cancel</z-button>
      <z-button tone="secondary">Send invites</z-button>
    </z-row>
  </z-dialog>
</template>
