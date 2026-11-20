<script lang="ts">
  import '@tasteee/zest'

  const CONTENT = 'Read the [docs](https://example.com/docs) or jump to [usage](#usage).'

  let lastLink = $state('Click a link.')

  const handleLinkClick = (event: CustomEvent<{ href: string }>) => (lastLink = `linkclick: ${event.detail.href}`)
</script>

<z-markdown content={CONTENT} onlinkclick={handleLinkClick}></z-markdown>
<z-text size="sm" color="muted">{lastLink}</z-text>
