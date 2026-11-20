import { useState } from 'react'
import { getTheme } from '@tasteee/zest'

export const Example = () => {
  const [theme, setTheme] = useState(getTheme)

  const handleChange = () => setTheme(getTheme())
  const statusText = `Painting ${theme}`

  return (
    <z-row gap="4" alignsY="center" style={{ alignItems: 'center' }}>
      <z-theme-switcher onchange={handleChange} />
      <z-text color="muted">{statusText}</z-text>
    </z-row>
  )
}
