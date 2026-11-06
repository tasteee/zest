const ROWS = [
  { id: 1, project: 'Project Alpha', owner: '@creator', status: 'Active', updated: '2 min' },
  { id: 2, project: 'Campaign Beta', owner: '@team', status: 'Draft', updated: '1 day' },
  { id: 3, project: 'Legacy Drop', owner: '@archive', status: 'Archived', updated: '1 wk' },
  { id: 4, project: 'Atlas', owner: '@creator', status: 'Active', updated: '3 wk' }
]

const search = document.querySelector('#search')
const status = document.querySelector('#status')
const table = document.querySelector('#table')
const count = document.querySelector('#count')

table.columns = [
  { key: 'project', label: 'Project' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'updated', label: 'Updated', align: 'end', isMono: true }
]
status.options = [
  { value: '', label: 'All statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Archived', label: 'Archived' }
]

const render = () => {
  const query = (search.value ?? '').toLowerCase()
  const wanted = status.value
  const visible = ROWS.filter((row) => {
    const matchesQuery = row.project.toLowerCase().includes(query)
    const matchesStatus = !wanted || row.status === wanted
    return matchesQuery && matchesStatus
  })
  table.rows = visible
  count.textContent = `${visible.length} of ${ROWS.length} projects`
}

search.addEventListener('input', render)
status.addEventListener('change', render)
render()
