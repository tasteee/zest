<script lang="ts">
  import '@tasteee/zest'

  const FOOD_OPTIONS = [
    {
      value: 'fruit',
      label: 'Fruit',
      children: [
        { value: 'apple', label: 'Apple' },
        {
          value: 'citrus',
          label: 'Citrus',
          children: [
            { value: 'lemon', label: 'Lemon' },
            { value: 'orange', label: 'Orange' }
          ]
        }
      ]
    },
    { value: 'water', label: 'Water' }
  ]

  let log = $state('change → none')

  const handleChange = (event: CustomEvent<{ value: string; path: string[] }>) => {
    log = `change → ${event.detail.path.join(' › ')}`
  }
</script>

<z-column gap="3" style="width: min(18rem, 100%)">
  <z-field label="Food">
    <z-select placeholder="Pick something" options={FOOD_OPTIONS} onchange={handleChange}></z-select>
  </z-field>
  <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
</z-column>
