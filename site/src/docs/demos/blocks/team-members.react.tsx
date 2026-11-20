import '@tasteee/zest'

const ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' }
]

type TeammateT = { name: string; email: string; role: string; status?: 'online'; tone?: 'tertiary' }

const TEAMMATES: TeammateT[] = [
  { name: 'Ada Lovelace', email: 'ada@example.com', role: 'owner', status: 'online' },
  { name: 'Grace Hopper', email: 'grace@example.com', role: 'editor', tone: 'tertiary' }
]

const TeammateRow = (props: { teammate: TeammateT }) => {
  const roleLabel = `Role for ${props.teammate.name}`

  return (
    <z-list-row>
      <z-avatar name={props.teammate.name} size="sm" status={props.teammate.status} tone={props.teammate.tone} />
      <div style={{ flex: '1', minWidth: '0' }}>
        <z-text weight={600}>{props.teammate.name}</z-text>
        <z-text size="sm" color="muted" style={{ display: 'block' }}>{props.teammate.email}</z-text>
      </div>
      <z-select label={roleLabel} size="sm" value={props.teammate.role} options={ROLES} style={{ width: '8rem' }} />
    </z-list-row>
  )
}

export const Example = () => {
  const teammateRows = TEAMMATES.map((teammate) => <TeammateRow key={teammate.email} teammate={teammate} />)

  return (
    <z-card gap="0" style={{ width: 'min(36rem, 100%)', padding: '0' }}>
      <z-column gap="1" style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-default)' }}>
        <z-heading size="xs" tag="h2">Team</z-heading>
        <z-text size="sm" color="muted">Invite people and choose what they can do.</z-text>
      </z-column>
      <z-list isPlain aria-label="Team members">
        {teammateRows}
      </z-list>
    </z-card>
  )
}
