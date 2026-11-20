<script lang="ts">
  import '@tasteee/zest'

  const TRAIL = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '#projects' },
    { label: 'Aurora', isCurrent: true }
  ]
</script>

<z-breadcrumbs items={TRAIL}></z-breadcrumbs>
