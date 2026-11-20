<script lang="ts">
  import '@tasteee/zest'

  const FRAMEWORKS = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' }
  ]

  let framework = $state('react')

  const handleChange = (event: CustomEvent<{ value: string }>) => (framework = event.detail.value)
</script>

<z-column gap="3" style="width: min(20rem, 100%)">
  <z-field label="Framework">
    <z-combobox value={framework} options={FRAMEWORKS} placeholder="Search frameworks…" onchange={handleChange}></z-combobox>
  </z-field>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">change → {framework}</z-text>
</z-column>
