import '@tasteee/zest'

const CARD_DATA = { id: 1, label: 'Task card' }

export const Example = () => (
  <z-column gap="4">
    <z-row gap="3" doesWrap alignsY="center" style={{ gap: '2rem', alignItems: 'flex-start' }}>
      <z-draggable type="card" group="demo" data={CARD_DATA}>
        <z-card style={{ width: '9rem', cursor: 'grab', textAlign: 'center' }}>Drag me</z-card>
      </z-draggable>
      <z-drop-target accept="card" group="demo">Drop here</z-drop-target>
    </z-row>
  </z-column>
)
