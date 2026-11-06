const table = document.querySelector('#plans')

table.columns = [
  { key: 'feature', label: 'Feature' },
  { key: 'hobby', label: 'Hobby', align: 'center' },
  { key: 'pro', label: 'Pro', align: 'center' },
  { key: 'team', label: 'Team', align: 'center' }
]
table.rows = [
  { id: 1, feature: 'Projects', hobby: '1', pro: 'Unlimited', team: 'Unlimited' },
  { id: 2, feature: 'Custom domains', hobby: '—', pro: '✓', team: '✓' },
  { id: 3, feature: 'Priority support', hobby: '—', pro: '✓', team: '✓' },
  { id: 4, feature: 'SSO and audit log', hobby: '—', pro: '—', team: '✓' }
]
