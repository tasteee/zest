import { createSignal } from 'solid-js'
import { getTheme } from '@tasteee/zest'

export const Example = () => {
  const [theme, setTheme] = createSignal(getTheme())

  const handleChange = () => setTheme(getTheme())

  return (
    <z-row gap="4" aligns-y="center" style="align-items: center">
      <z-theme-switcher onChange={handleChange} />
      <z-text color="muted">Painting {theme()}</z-text>
    </z-row>
  )
}
