<script lang="ts">
  import '@tasteee/zest'

  const AREAS = [
    {
      value: 'work',
      label: 'Work',
      children: [
        { value: 'design', label: 'Design' },
        { value: 'engineering', label: 'Engineering' }
      ]
    },
    { value: 'life', label: 'Life', children: [{ value: 'travel', label: 'Travel' }] }
  ]
</script>

<z-filter is-drilldown label="Area" tone="secondary" options={AREAS}></z-filter>
