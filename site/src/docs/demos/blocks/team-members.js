const ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' }
]

for (const select of document.querySelectorAll('z-select')) {
  select.options = ROLES
}
