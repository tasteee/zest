import { For } from 'solid-js'
import '@tasteee/zest'

const ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' }
]

type TeammateT = { name: string; email: string; role: string; status?: string; tone?: string }

const TEAMMATES: TeammateT[] = [
  { name: 'Ada Lovelace', email: 'ada@example.com', role: 'owner', status: 'online' },
  { name: 'Grace Hopper', email: 'grace@example.com', role: 'editor', tone: 'tertiary' }
]

const TeammateRow = (props: { teammate: TeammateT }) => (
  <z-list-row>
    <z-avatar
      prop:name={props.teammate.name}
      size="sm"
      prop:status={props.teammate.status}
      prop:tone={props.teammate.tone}
    />
    <div style="flex: 1; min-width: 0">
      <z-text weight="600">{props.teammate.name}</z-text>
      <z-text size="sm" color="muted" style="display: block">{props.teammate.email}</z-text>
    </div>
    <z-select
      prop:label={`Role for ${props.teammate.name}`}
      size="sm"
      prop:value={props.teammate.role}
      prop:options={ROLES}
      style="width: 8rem"
    />
  </z-list-row>
)

export const Example = () => (
  <z-card gap="0" style="width: min(36rem, 100%); padding: 0">
    <z-column gap="1" style="padding: 1.25rem; border-bottom: 1px solid var(--border-default)">
      <z-heading size="xs" tag="h2">Team</z-heading>
      <z-text size="sm" color="muted">Invite people and choose what they can do.</z-text>
    </z-column>
    <z-list is-plain="" aria-label="Team members">
      <For each={TEAMMATES}>{(teammate) => <TeammateRow teammate={teammate} />}</For>
    </z-list>
  </z-card>
)
