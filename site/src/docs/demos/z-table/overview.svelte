<script lang="ts">
  import '@tasteee/zest'

  const TABLE_COLUMNS = [
    { key: 'project', label: 'Project' },
    { key: 'owner', label: 'Owner' },
    { key: 'status', label: 'Status' },
    { key: 'updated', label: 'Updated', align: 'end', isMono: true }
  ]

  const TABLE_ROWS = [
    { id: 1, project: 'Project Alpha', owner: '@creator', status: 'Active', updated: '2 min' },
    { id: 2, project: 'Campaign Beta', owner: '@team', status: 'Draft', updated: '1 day' },
    { id: 3, project: 'Legacy Drop', owner: '@archive', status: 'Archived', updated: '1 wk' }
  ]
</script>

<z-table columns={TABLE_COLUMNS} rows={TABLE_ROWS} is-clickable></z-table>
