import { createSignal } from 'solid-js'
import '@tasteee/zest'

export const Example = () => {
  const [brightness, setBrightness] = createSignal(64)

  return (
    <z-row gap="3" aligns-y="center">
      <z-slider
        label="Brightness"
        min={0}
        max={100}
        prop:value={brightness()}
        onInput={(event: CustomEvent<{ value: number }>) => setBrightness(event.detail.value)}
      />
      <z-text style={{ width: '3rem' }}>{brightness()}%</z-text>
    </z-row>
  )
}
