<script lang="ts">
  import { getTheme } from '@tasteee/zest'

  let theme = $state(getTheme())

  const handleChange = () => (theme = getTheme())
</script>

<z-row gap="4" aligns-y="center" style="align-items: center">
  <z-theme-switcher onchange={handleChange}></z-theme-switcher>
  <z-text color="muted">Painting {theme}</z-text>
</z-row>
