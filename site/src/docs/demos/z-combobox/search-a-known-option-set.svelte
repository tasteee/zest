<script lang="ts">
  import '@tasteee/zest'

  const FRAMEWORKS = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' }
  ]
</script>

<z-field label="Framework">
  <z-combobox options={FRAMEWORKS} placeholder="Search frameworks..."></z-combobox>
</z-field>
