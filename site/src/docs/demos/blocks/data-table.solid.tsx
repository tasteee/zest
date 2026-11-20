import { createSignal } from 'solid-js'
import '@tasteee/zest'

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

export const Example = () => {
  const [query, setQuery] = createSignal('')
  const [status, setStatus] = createSignal('')

  const handleSearch = (event: CustomEvent<{ value: string }>) => setQuery(event.detail.value)
  const handleStatus = (event: CustomEvent<{ value: string }>) => setStatus(event.detail.value)

  const visibleRows = () => ROWS.filter((row) => checkRowMatches(row, query(), status()))

  return (
    <z-card gap="3" style="width: min(46rem, 100%); padding: 1.25rem">
      <z-row gap="2" aligns-y="center" does-wrap="">
        <z-input
          type="search"
          placeholder="Filter projects…"
          size="sm"
          style="flex: 1; min-width: 10rem"
          onInput={handleSearch}
        />
        <z-select label="Status" size="sm" placeholder="Status" prop:options={STATUS_OPTIONS} onChange={handleStatus} />
      </z-row>
      <z-table prop:columns={COLUMNS} prop:rows={visibleRows()} />
      <z-row aligns-x="between" aligns-y="center">
        <z-text size="sm" color="muted">
          {visibleRows().length} of {ROWS.length} projects
        </z-text>
        <z-pagination label="Projects" page="1" total="3" />
      </z-row>
    </z-card>
  )
}
