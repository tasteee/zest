import '@tasteee/zest'

const MEMBER_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', align: 'end' }
]

const MEMBERS = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Owner' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor' },
  { id: 3, name: 'Alan Turing', email: 'alan@example.com', role: 'Viewer' }
]

export const Example = () => (
  <z-card gap="0" style="width: min(40rem, 100%); padding: 0">
    <z-row
      aligns-x="between"
      aligns-y="center"
      gap="3"
      style="padding: 1.25rem; border-bottom: 1px solid var(--border-default)"
    >
      <z-column gap="1">
        <z-heading size="xs" tag="h2">Members</z-heading>
        <z-text size="sm" color="muted">3 people have access.</z-text>
      </z-column>
      <z-button tone="secondary" size="sm">Invite</z-button>
    </z-row>
    <div style="padding: 1.25rem">
      <z-table prop:columns={MEMBER_COLUMNS} prop:rows={MEMBERS} />
    </div>
  </z-card>
)
