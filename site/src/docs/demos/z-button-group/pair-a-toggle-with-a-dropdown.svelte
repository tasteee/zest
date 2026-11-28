<script lang="ts">
  import '@tasteee/zest'

  const GRID_DIVISIONS = [
    { value: '1/4', label: '1/4' },
    { value: '1/8', label: '1/8' },
    { value: '1/16', label: '1/16' },
    { value: '1/32', label: '1/32' }
  ]
</script>

<z-button-group aria-label="Grid snapping">
  <z-toggle-button is-icon is-pressed tone="primary" kind="outline" size="sm" aria-label="Snap to grid">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 4h5v9a3 3 0 0 0 6 0V4h5v9a8 8 0 0 1-16 0zM4 9h5m6 0h5" ></path>
    </svg>
  </z-toggle-button>
  <z-select is-inline size="sm" value="1/16" aria-label="Grid division" options={GRID_DIVISIONS}></z-select>
</z-button-group>
