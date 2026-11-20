import '@tasteee/zest'

const MOOD_OPTIONS = [
  { value: 'calm', label: 'Calm' },
  { value: 'electric', label: 'Electric' },
  { value: 'minimal', label: 'Minimal', isDisabled: true }
]

export const Example = () => (
  <z-field label="Mood" style={{ width: 'min(18rem, 100%)' }}>
    <z-select placeholder="Pick a style" options={MOOD_OPTIONS} />
  </z-field>
)
