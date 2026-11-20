<script lang="ts">
  import '@tasteee/zest'

  const FRAMEWORKS = [
    { value: 'react', label: 'React' },
    { value: 'solid', label: 'Solid' },
    { value: 'svelte', label: 'Svelte' }
  ]
</script>

<z-combobox label="Filter framework" placeholder="Filter" options={FRAMEWORKS}></z-combobox>
