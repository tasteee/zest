const nav = document.querySelector('#nav')

nav.items = [
  { value: 'overview', label: 'Overview' },
  {
    label: 'Workspace',
    items: [
      { value: 'projects', label: 'Projects', badge: '8' },
      { value: 'tasks', label: 'Tasks' },
      { value: 'reports', label: 'Reports' }
    ]
  },
  {
    label: 'Settings',
    items: [
      { value: 'members', label: 'Members' },
      { value: 'billing', label: 'Billing' }
    ]
  }
]

nav.addEventListener('select', (event) => (nav.value = event.detail.value))
