const table = document.querySelector('#invoices')

table.columns = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount', isMono: true },
  { key: 'status', label: 'Status', align: 'end' }
]
table.rows = [
  { id: 1, date: 'Nov 6, 2026', amount: '$12.00', status: 'Paid' },
  { id: 2, date: 'Oct 6, 2026', amount: '$12.00', status: 'Paid' },
  { id: 3, date: 'Sep 6, 2026', amount: '$12.00', status: 'Paid' }
]
