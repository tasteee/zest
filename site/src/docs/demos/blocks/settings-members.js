const table = document.querySelector('#members')

table.columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', align: 'end' }
]
table.rows = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Owner' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor' },
  { id: 3, name: 'Alan Turing', email: 'alan@example.com', role: 'Viewer' }
]
