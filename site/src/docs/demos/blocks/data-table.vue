<script setup lang="ts">
import '@tasteee/zest'
import { computed, ref } from 'vue'

type ProjectRowT = { id: number; project: string; owner: string; status: string; updated: string }

const ROWS: ProjectRowT[] = [
  { id: 1, project: 'Project Alpha', owner: '@creator', status: 'Active', updated: '2 min' },
  { id: 2, project: 'Campaign Beta', owner: '@team', status: 'Draft', updated: '1 day' },
  { id: 3, project: 'Legacy Drop', owner: '@archive', status: 'Archived', updated: '1 wk' },
  { id: 4, project: 'Atlas', owner: '@creator', status: 'Active', updated: '3 wk' }
]

const COLUMNS = [
  { key: 'project', label: 'Project' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'updated', label: 'Updated', align: 'end', isMono: true }
]

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Archived', label: 'Archived' }
]

const checkRowMatches = (row: ProjectRowT, query: string, status: string): boolean => {
  const matchesQuery = row.project.toLowerCase().includes(query.toLowerCase())
  const matchesStatus = status === '' || row.status === status
  return matchesQuery && matchesStatus
}

const query = ref('')
const status = ref('')
const visibleRows = computed(() => ROWS.filter((row) => checkRowMatches(row, query.value, status.value)))

const handleSearch = (event: CustomEvent<{ value: string }>) => (query.value = event.detail.value)
const handleStatus = (event: CustomEvent<{ value: string }>) => (status.value = event.detail.value)
</script>

<template>
  <z-card gap="3" style="width: min(46rem, 100%); padding: 1.25rem">
    <z-row gap="2" aligns-y="center" does-wrap>
      <z-input
        type="search"
        placeholder="Filter projects…"
        size="sm"
        style="flex: 1; min-width: 10rem"
        @input="handleSearch"
      ></z-input>
      <z-select label="Status" size="sm" placeholder="Status" :options="STATUS_OPTIONS" @change="handleStatus"></z-select>
    </z-row>
    <z-table :columns="COLUMNS" :rows="visibleRows"></z-table>
    <z-row aligns-x="between" aligns-y="center">
      <z-text size="sm" color="muted">{{ visibleRows.length }} of {{ ROWS.length }} projects</z-text>
      <z-pagination label="Projects" page="1" total="3"></z-pagination>
    </z-row>
  </z-card>
</template>
