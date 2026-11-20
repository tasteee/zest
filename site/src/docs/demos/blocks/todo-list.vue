<script setup lang="ts">
import '@tasteee/zest'
import { computed, ref } from 'vue'

type TaskT = { label: string; isDone: boolean }

const STARTING_TASKS: TaskT[] = [
  { label: 'Reply to Grace', isDone: false },
  { label: 'Review the release notes', isDone: true },
  { label: 'Book the offsite', isDone: false },
  { label: 'Update the changelog', isDone: false }
]

const tasks = ref(STARTING_TASKS.map((task) => ({ ...task })))
const openCount = computed(() => tasks.value.filter((task) => !task.isDone).length)

const handleChange = (task: TaskT, event: CustomEvent<{ checked: boolean }>) => (task.isDone = event.detail.checked)
</script>

<template>
  <z-card gap="3" style="width: min(26rem, 100%); padding: 1.25rem">
    <z-row aligns-x="between" aligns-y="center">
      <z-heading size="xs" tag="h2">Today</z-heading>
      <z-text size="sm" color="muted">{{ openCount }} left</z-text>
    </z-row>
    <z-column gap="3">
      <z-checkbox
        v-for="task in tasks"
        :key="task.label"
        :isChecked="task.isDone"
        @change="handleChange(task, $event)"
      >
        {{ task.label }}
      </z-checkbox>
    </z-column>
  </z-card>
</template>
