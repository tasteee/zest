import '@tasteee/zest'

const ROLES = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Admin' }
]

export const Example = () => (
  <z-dialog heading="Invite people" description="They’ll get an email with a link to join.">
    <z-button slot="trigger" tone="secondary">Invite</z-button>
    <z-column gap="4">
      <z-input label="Email addresses" placeholder="ada@example.com, grace@example.com" />
      <z-select label="Role" value="editor" options={ROLES} />
    </z-column>
    <z-row slot="footer" gap="2" alignsX="end">
      <z-button kind="plain">Cancel</z-button>
      <z-button tone="secondary">Send invites</z-button>
    </z-row>
  </z-dialog>
)
